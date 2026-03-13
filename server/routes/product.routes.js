const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

// Public routes
router.get('/', getAllProducts);
router.get('/:slug', getSingleProduct);

// Protected routes (Admin only)
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;