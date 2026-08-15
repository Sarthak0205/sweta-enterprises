const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            return next();
        }

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(new AppError(401, "Authorization token is required"));
        }

        if (!authHeader.startsWith("Bearer ")) {
            return next(new AppError(401, "Authorization header must use Bearer token format"));
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return next(new AppError(401, "Authorization token is required"));
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);

        if (!decoded?.id) {
            return next(new AppError(401, "Invalid token payload"));
        }

        req.adminId = decoded.id;

        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new AppError(401, "Token expired"));
        }

        if (error.name === "JsonWebTokenError") {
            return next(new AppError(401, "Invalid token"));
        }

        return next(new AppError(401, "Unauthorized"));
    }
};
