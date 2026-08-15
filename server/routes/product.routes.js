const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validate.middleware");
const {
    createProductValidator,
    updateProductValidator,
    productIdParamValidator,
    productCategoryFilterValidator,
} = require("../validators/product.validator");
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", productCategoryFilterValidator, validateRequest, getAllProducts);
router.get("/:id", productIdParamValidator, validateRequest, getSingleProduct);
router.post("/", authMiddleware, createProductValidator, validateRequest, createProduct);
router.put("/:id", authMiddleware, productIdParamValidator, updateProductValidator, validateRequest, updateProduct);
router.delete("/:id", authMiddleware, productIdParamValidator, validateRequest, deleteProduct);

module.exports = router;
