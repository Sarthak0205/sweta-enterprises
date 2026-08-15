const Product = require("../models/product.model");
const AppError = require("../utils/appError");
const { PRODUCT_CATEGORY_VALUES } = require("../constants/product-categories");

exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, includeInactive } = req.query;
        const query = {};

        if (includeInactive !== "true") {
            query.isActive = true;
        }

        if (category) {
            if (!PRODUCT_CATEGORY_VALUES.includes(category)) {
                return next(new AppError(400, `Invalid category. Allowed values: ${PRODUCT_CATEGORY_VALUES.join(", ")}`));
            }

            query.category = category;
        }

        const products = await Product.find(query).sort({ category: 1, name: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSingleProduct = async (req, res, next) => {
    try {
        const { includeInactive } = req.query;
        const query = { _id: req.params.id };

        if (includeInactive !== "true") {
            query.isActive = true;
        }

        const product = await Product.findOne(query);

        if (!product) {
            return next(new AppError(404, "Product not found"));
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return next(new AppError(400, "Product already exists"));
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const currentProduct = await Product.findById(req.params.id);

        if (!currentProduct) {
            return next(new AppError(404, "Product not found"));
        }

        if (req.body.name && req.body.name !== currentProduct.name) {
            const existingProduct = await Product.findOne({ name: req.body.name });
            if (existingProduct) {
                return next(new AppError(400, "Product already exists"));
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true, runValidators: true }
        );

        if (!product) {
            return next(new AppError(404, "Product not found"));
        }

        res.status(200).json({
            success: true,
            message: "Product archived successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
