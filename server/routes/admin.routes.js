const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/admin.controller");
const { adminLoginRateLimiter } = require("../middleware/rate-limit.middleware");
const { validateRequest } = require("../middleware/validate.middleware");
const { loginAdminValidator } = require("../validators/admin.validator");

router.post("/login", adminLoginRateLimiter, loginAdminValidator, validateRequest, loginAdmin);

module.exports = router;
