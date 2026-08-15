const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { inquiryRateLimiter } = require("../middleware/rate-limit.middleware");
const { validateRequest } = require("../middleware/validate.middleware");
const {
    createInquiryValidator,
    updateInquiryStatusValidator,
} = require("../validators/inquiry.validator");

const {
    createInquiry,
    getAllInquiries,
    updateInquiryStatus
} = require("../controllers/inquiry.controller");

// Public
router.post("/", inquiryRateLimiter, createInquiryValidator, validateRequest, createInquiry);
// Admin
router.get("/", authMiddleware, getAllInquiries);
router.put("/:id", authMiddleware, updateInquiryStatusValidator, validateRequest, updateInquiryStatus);

module.exports = router;
