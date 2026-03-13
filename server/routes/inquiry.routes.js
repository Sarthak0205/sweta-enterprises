const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    createInquiry,
    getAllInquiries,
    updateInquiryStatus
} = require("../controllers/inquiry.controller");

// Public
router.post("/", createInquiry);

// Admin
router.get("/", authMiddleware, getAllInquiries);
router.put("/:id", authMiddleware, updateInquiryStatus);

module.exports = router;