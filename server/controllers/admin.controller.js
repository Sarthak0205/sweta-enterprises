const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const generateToken = require("../utils/generateToken");

// Login Admin
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return next(new AppError(401, "Invalid credentials"));
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return next(new AppError(401, "Invalid credentials"));
        }

        const token = generateToken({ id: admin._id });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        next(error);
    }
};
