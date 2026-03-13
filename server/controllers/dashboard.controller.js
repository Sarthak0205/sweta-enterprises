const Product = require("../models/product.model");
const Inquiry = require("../models/inquiry.model");

exports.getDashboardStats = async (req, res, next) => {
    try {
        const { from, to } = req.query;

        let dateFilter = {};
        let currentStart, currentEnd;
        let previousStart, previousEnd;

        // ===============================
        // 1️⃣ Date Handling
        // ===============================

        if (from && to) {
            currentStart = new Date(from);
            currentStart.setHours(0, 0, 0, 0);

            currentEnd = new Date(to);
            currentEnd.setHours(23, 59, 59, 999);

            dateFilter.createdAt = {
                $gte: currentStart,
                $lte: currentEnd,
            };

            // Calculate duration
            const diffTime = currentEnd - currentStart;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Previous period calculation
            previousEnd = new Date(currentStart);
            previousEnd.setMilliseconds(-1);

            previousStart = new Date(previousEnd);
            previousStart.setDate(previousEnd.getDate() - diffDays);
        }

        // ===============================
        // 2️⃣ Basic Counts
        // ===============================

        const totalProducts = await Product.countDocuments();

        const totalInquiries = await Inquiry.countDocuments(dateFilter);

        const pending = await Inquiry.countDocuments({
            ...dateFilter,
            status: "pending",
        });

        const contacted = await Inquiry.countDocuments({
            ...dateFilter,
            status: "contacted",
        });

        const completed = await Inquiry.countDocuments({
            ...dateFilter,
            status: "completed",
        });

        const cancelled = await Inquiry.countDocuments({
            ...dateFilter,
            status: "cancelled",
        });

        // ===============================
        // 3️⃣ Latest Inquiries
        // ===============================

        const latestInquiries = await Inquiry.find(dateFilter)
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("product", "name slug");

        // ===============================
        // 4️⃣ Monthly Analytics
        // ===============================

        const monthlyAggregation = await Inquiry.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const monthNames = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const monthlyInquiries = monthlyAggregation.map((item) => ({
            month: monthNames[item._id],
            count: item.count,
        }));

        // ===============================
        // 5️⃣ Top Products
        // ===============================

        const topProductsAggregation = await Inquiry.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: "$product",
                    inquiryCount: { $sum: 1 },
                },
            },
            { $sort: { inquiryCount: -1 } },
            { $limit: 5 },
        ]);

        const populatedTopProducts = await Product.populate(
            topProductsAggregation,
            {
                path: "_id",
                select: "name slug",
            }
        );

        const topProducts = populatedTopProducts.map((item) => ({
            product: item._id,
            inquiryCount: item.inquiryCount,
        }));

        // ===============================
        // 6️⃣ Growth Comparison
        // ===============================

        let growth = null;

        if (from && to) {
            const previousCount = await Inquiry.countDocuments({
                createdAt: {
                    $gte: previousStart,
                    $lte: previousEnd,
                },
            });

            const currentCount = totalInquiries;

            let percentageChange = 0;

            if (previousCount === 0 && currentCount > 0) {
                percentageChange = 100;
            } else if (previousCount === 0 && currentCount === 0) {
                percentageChange = 0;
            } else {
                percentageChange =
                    ((currentCount - previousCount) / previousCount) * 100;
            }

            growth = {
                currentPeriod: currentCount,
                previousPeriod: previousCount,
                percentageChange: Number(percentageChange.toFixed(2)),
            };
        }

        // ===============================
        // Final Response
        // ===============================

        res.json({
            stats: {
                totalProducts,
                totalInquiries,
                statusBreakdown: {
                    pending,
                    contacted,
                    completed,
                    cancelled,
                },
            },
            latestInquiries,
            monthlyInquiries,
            topProducts,
            growth,
            filters: {
                from: from || null,
                to: to || null,
            },
        });
    } catch (error) {
        next(error);
    }
};