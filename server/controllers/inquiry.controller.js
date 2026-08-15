const mongoose = require("mongoose");
const Inquiry = require("../models/inquiry.model");
const Product = require("../models/product.model");
const { INQUIRY_STATUS_VALUES } = require("../constants/inquiry-status");
const AppError = require("../utils/appError");

// ==============================
// CREATE INQUIRY (Public)
// ==============================
exports.createInquiry = async (req, res, next) => {
    try {
        const { name, company, phone, email, product, message, quantity, gst } = req.body;

        const inquiry = new Inquiry({
            name,
            company,
            phone,
            email,
            product,
            quantity,
            gst,
            message
        });

        await inquiry.save();

        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            data: inquiry,
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
            if (!INQUIRY_STATUS_VALUES.includes(status)) {
                return next(new AppError(400, `Invalid status filter. Allowed values: ${INQUIRY_STATUS_VALUES.join(", ")}`));
            }
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
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const populatedInquiries = await Promise.all(inquiries.map(async (inq) => {
            const inqObj = inq.toObject();
            if (mongoose.isValidObjectId(inqObj.product)) {
                const prod = await Product.findById(inqObj.product).select("name");
                if (prod) {
                    inqObj.product = { _id: prod._id, name: prod.name };
                } else {
                    inqObj.product = { name: "Unknown Product" };
                }
            } else if (typeof inqObj.product === "string") {
                inqObj.product = { name: inqObj.product };
            }
            return inqObj;
        }));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            filters: {
                status: status || null,
                search: search || null,
                from: from || null,
                to: to || null,
            },
            data: populatedInquiries,
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
            return next(new AppError(404, "Inquiry not found"));
        }

        res.status(200).json({
            success: true,
            message: "Inquiry status updated",
            inquiry,
        });
    } catch (error) {
        next(error);
    }
};
