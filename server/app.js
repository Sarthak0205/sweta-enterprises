const express = require('express');
const cors = require('cors');
const helmet = require("helmet");

const productRoutes = require('./routes/product.routes');
const inquiryRoutes = require('./routes/inquiry.routes');
const adminRoutes = require('./routes/admin.routes');
const dashboardRoutes = require("./routes/dashboard.routes");
const { env } = require("./config/env");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.disable("x-powered-by");

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'none'"],
            baseUri: ["'none'"],
            frameAncestors: ["'none'"],
            formAction: ["'self'"],
        },
    },
    crossOriginResourcePolicy: false,
}));

// CORS (handles preflight automatically)
app.use(cors({
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Body parser
app.use(express.json({ limit: "100kb" }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
