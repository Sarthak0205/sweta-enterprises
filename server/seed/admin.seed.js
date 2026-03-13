const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("../models/admin.model");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected for seeding");

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            name: "Super Admin",
            email: "admin@sweta.com",
            password: hashedPassword
        });

        console.log("Admin created successfully");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });