const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Admin = require("../models/admin.model");

const [name, email, password] = process.argv.slice(2);

const printUsageAndExit = (message) => {
    console.error(message);
    console.error("Usage: npm run create-admin -- \"Admin Name\" admin@example.com strongPassword");
    process.exit(1);
};

const createAdmin = async () => {
    if (!name || !email || !password) {
        printUsageAndExit("Missing required arguments.");
    }

    if (password.length < 12) {
        printUsageAndExit("Password must be at least 12 characters long.");
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({ email: normalizedEmail });
    if (existingAdmin) {
        printUsageAndExit("An admin with that email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
    });

    console.log(`Admin created successfully for ${normalizedEmail}`);
    process.exit(0);
};

createAdmin().catch((error) => {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
});
