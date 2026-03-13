const Inquiry = require("../models/inquiry.model");

// ==============================
// CREATE INQUIRY (Public)
// ==============================
exports.createInquiry = async (req, res, next) => {
    try {
        const { name, company, phone, email, product, message } = req.body;

        const inquiry = await Inquiry.create({
            name,
            company,
            phone,
            email,
            product,
            message,
        });

        res.status(201).json({
            message: "Inquiry submitted successfully",
            inquiry,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// GET ALL INQUIRIES (Protected)
// Advanced Search + Filter + Pagination
// ==============================
exports.getAllInquiries = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            search,
            from,
            to,
            sort = "createdAt",
            order = "desc",
        } = req.query;

        const query = {};

        // 🔹 Status Filter
        if (status) {
            query.status = status;
        }

        // 🔹 Search Filter (name/company/email/phone)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }

        // 🔹 Date Filter
        if (from || to) {
            query.createdAt = {};

            if (from) {
                const startDate = new Date(from);
                startDate.setHours(0, 0, 0, 0);
                query.createdAt.$gte = startDate;
            }

            if (to) {
                const endDate = new Date(to);
                endDate.setHours(23, 59, 59, 999);
                query.createdAt.$lte = endDate;
            }
        }

        // 🔹 Sorting
        const sortOrder = order === "asc" ? 1 : -1;
        const sortOptions = { [sort]: sortOrder };

        // 🔹 Pagination
        const skip = (page - 1) * limit;

        const total = await Inquiry.countDocuments(query);

        const inquiries = await Inquiry.find(query)
            .populate("product", "name slug")
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            filters: {
                status: status || null,
                search: search || null,
                from: from || null,
                to: to || null,
            },
            data: inquiries,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// UPDATE INQUIRY STATUS (Protected)
// ==============================
exports.updateInquiryStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.status(200).json({
            message: "Inquiry status updated",
            inquiry,
        });
    } catch (error) {
        next(error);
    }
};