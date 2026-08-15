const { body } = require("express-validator");

const loginAdminValidator = [
    body("email")
        .exists({ checkFalsy: true }).withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),
    body("password")
        .exists({ checkFalsy: true }).withMessage("Password is required")
        .bail()
        .isLength({ min: 8, max: 128 }).withMessage("Password must be between 8 and 128 characters"),
];

module.exports = {
    loginAdminValidator,
};
