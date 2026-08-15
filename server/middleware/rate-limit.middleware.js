const rateLimit = require("express-rate-limit");

const buildRateLimiter = ({ windowMs, max, message }) =>
    rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message,
            errors: [],
        },
    });

const inquiryRateLimiter = buildRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many inquiry requests. Please try again later.",
});

const adminLoginRateLimiter = buildRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again later.",
});

module.exports = {
    inquiryRateLimiter,
    adminLoginRateLimiter,
};
