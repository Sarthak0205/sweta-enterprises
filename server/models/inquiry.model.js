const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        company: String,
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "contacted", "completed", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);