const { body } = require("express-validator");

const { INQUIRY_STATUS_VALUES } = require("../constants/inquiry-status");
const { sanitizeText } = require("../utils/sanitizeInput");

const createInquiryValidator = [
    body("name")
        .exists({ checkFalsy: true }).withMessage("Name is required")
        .bail()
        .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters")
        .customSanitizer(sanitizeText),
    body("company")
        .optional({ values: "falsy" })
        .isLength({ max: 120 }).withMessage("Company must be at most 120 characters")
        .customSanitizer(sanitizeText),
    body("phone")
        .exists({ checkFalsy: true }).withMessage("Phone is required")
        .bail()
        .isLength({ min: 7, max: 20 }).withMessage("Phone must be between 7 and 20 characters")
        .matches(/^[0-9+\-() ]+$/).withMessage("Phone contains invalid characters")
        .customSanitizer(sanitizeText),
    body("email")
        .exists({ checkFalsy: true }).withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),
    body("product")
        .exists({ checkFalsy: true }).withMessage("Product is required")
        .bail()
        .isMongoId().withMessage("Product must be a valid product ID"),
    body("quantity")
        .exists({ checkFalsy: true }).withMessage("Quantity is required")
        .bail()
        .isLength({ min: 1, max: 100 }).withMessage("Quantity must be between 1 and 100 characters")
        .customSanitizer(sanitizeText),
    body("gst")
        .optional({ values: "falsy" })
        .trim()
        .toUpperCase()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
        .withMessage("Invalid GST format"),
    body("message")
        .exists({ checkFalsy: true }).withMessage("Message is required")
        .bail()
        .isLength({ min: 10, max: 2000 }).withMessage("Message must be between 10 and 2000 characters")
        .customSanitizer(sanitizeText),
];

const updateInquiryStatusValidator = [
    body("status")
        .exists({ checkFalsy: true }).withMessage("Status is required")
        .bail()
        .isIn(INQUIRY_STATUS_VALUES).withMessage(`Status must be one of: ${INQUIRY_STATUS_VALUES.join(", ")}`),
];

module.exports = {
    createInquiryValidator,
    updateInquiryStatusValidator,
};
