const mongoose = require("mongoose");
const { INQUIRY_STATUS_VALUES, INQUIRY_STATUS } = require("../constants/inquiry-status");

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
            type: mongoose.Schema.Types.Mixed,
            ref: "Product",
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        gst: {
            type: String
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: INQUIRY_STATUS_VALUES,
            default: INQUIRY_STATUS.PENDING
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
