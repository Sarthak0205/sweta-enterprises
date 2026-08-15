const { body, param, query } = require("express-validator");

const { PRODUCT_CATEGORY_VALUES } = require("../constants/product-categories");
const { sanitizeText } = require("../utils/sanitizeInput");

const productIdParamValidator = [
    param("id").isMongoId().withMessage("Invalid product id"),
    query("includeInactive")
        .optional()
        .isBoolean()
        .withMessage("includeInactive must be a boolean"),
];

const productCategoryFilterValidator = [
    query("category")
        .optional({ values: "falsy" })
        .isIn(PRODUCT_CATEGORY_VALUES)
        .withMessage(`Category must be one of: ${PRODUCT_CATEGORY_VALUES.join(", ")}`),
    query("includeInactive")
        .optional()
        .isBoolean()
        .withMessage("includeInactive must be a boolean"),
];

const createProductValidator = [
    body("name")
        .exists({ checkFalsy: true }).withMessage("Name is required")
        .bail()
        .isLength({ min: 2, max: 160 }).withMessage("Name must be between 2 and 160 characters")
        .customSanitizer(sanitizeText),
    body("description")
        .optional({ values: "falsy" })
        .isLength({ max: 400 }).withMessage("Description must be at most 400 characters")
        .customSanitizer(sanitizeText),
    body("category")
        .exists({ checkFalsy: true }).withMessage("Category is required")
        .bail()
        .isIn(PRODUCT_CATEGORY_VALUES).withMessage(`Category must be one of: ${PRODUCT_CATEGORY_VALUES.join(", ")}`)
        .customSanitizer(sanitizeText),
    body("image")
        .optional({ values: "falsy" })
        .isString().withMessage("Image must be a string")
        .isLength({ max: 500 }).withMessage("Image must be at most 500 characters")
        .customSanitizer(sanitizeText),
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean"),
];

const updateProductValidator = [
    body("name")
        .optional({ values: "falsy" })
        .isLength({ min: 2, max: 160 }).withMessage("Name must be between 2 and 160 characters")
        .customSanitizer(sanitizeText),
    body("description")
        .optional({ values: "falsy" })
        .isLength({ max: 400 }).withMessage("Description must be at most 400 characters")
        .customSanitizer(sanitizeText),
    body("category")
        .optional({ values: "falsy" })
        .isIn(PRODUCT_CATEGORY_VALUES).withMessage(`Category must be one of: ${PRODUCT_CATEGORY_VALUES.join(", ")}`)
        .customSanitizer(sanitizeText),
    body("image")
        .optional({ values: "falsy" })
        .isString().withMessage("Image must be a string")
        .isLength({ max: 500 }).withMessage("Image must be at most 500 characters")
        .customSanitizer(sanitizeText),
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean"),
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdParamValidator,
    productCategoryFilterValidator,
};
