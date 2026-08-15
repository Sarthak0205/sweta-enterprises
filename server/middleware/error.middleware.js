const AppError = require("../utils/appError");

const notFoundHandler = (req, res, next) => {
    next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    if (res.headersSent) {
        return next(error);
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errors: error.errors || [],
    });
};

module.exports = {
    notFoundHandler,
    errorHandler,
};
