const Product = require("../models/product.model");

// ===============================
// GET ALL PRODUCTS (Public)
// ===============================
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===============================
// GET SINGLE PRODUCT BY SLUG (Public)
// ===============================
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===============================
// CREATE PRODUCT (Protected)
// ===============================
exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            shortDescription,
            fullDescription,
            hsnCode,
            applications,
            specifications,
            featured
        } = req.body;

        // Generate slug safely
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")   // remove special chars like %
            .replace(/\s+/g, "-");

        // Check duplicate slug
        const existing = await Product.findOne({ slug });
        if (existing) {
            return res.status(400).json({ message: "Product already exists" });
        }

        const product = await Product.create({
            name,
            slug,
            shortDescription,
            fullDescription,
            hsnCode,
            applications,
            specifications,
            featured
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===============================
// UPDATE PRODUCT (Protected)
// ===============================
exports.updateProduct = async (req, res) => {
    try {

        // If name is being updated, regenerate slug
        if (req.body.name) {
            req.body.slug = req.body.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===============================
// DELETE PRODUCT (Protected)
// ===============================
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};