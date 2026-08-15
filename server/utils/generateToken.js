const jwt = require("jsonwebtoken");

const { env } = require("../config/env");

const generateToken = (payload) =>
    jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE });

module.exports = generateToken;
