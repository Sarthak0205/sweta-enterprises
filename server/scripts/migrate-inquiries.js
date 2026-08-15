const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Inquiry = require("../models/inquiry.model");
const Product = require("../models/product.model");

const SHORTHAND_MAPPINGS = {
    "sles": "Sodium Lauryl Ether Sulphate (SLES)",
    "sls": "Sodium Lauryl Sulphate (SLS Powder)",
    "sls powder": "Sodium Lauryl Sulphate (SLS Powder)",
    "sls liquid": "Sodium Lauryl Sulphate (SLS Liquid)",
};

const migrateInquiries = async () => {
    await connectDB();

    console.log("Fetching all inquiries and products for migration...");
    const inquiries = await Inquiry.find({});
    const products = await Product.find({});

    console.log(`Found ${inquiries.length} inquiries and ${products.length} products.`);

    let migratedCount = 0;
    let fallbackCount = 0;
    let skippedCount = 0;

    for (const inq of inquiries) {
        let updated = false;

        // 1. Initialize quantity for legacy records
        if (inq.quantity === undefined) {
            inq.quantity = "Not specified";
            inq.markModified("quantity");
            updated = true;
        }

        const currentProduct = inq.product;

        // 2. Check if product is already a valid MongoDB ObjectId
        const isValidObjectId = mongoose.isValidObjectId(currentProduct);

        if (!isValidObjectId && typeof currentProduct === "string") {
            const trimmedProduct = currentProduct.trim().toLowerCase();

            // Try to resolve the product string using our strategies
            let matchedProduct = null;

            // Strategy A: Shorthand dictionary lookup
            if (SHORTHAND_MAPPINGS[trimmedProduct]) {
                const mappedName = SHORTHAND_MAPPINGS[trimmedProduct];
                matchedProduct = products.find(
                    (p) => p.name.toLowerCase() === mappedName.toLowerCase()
                );
            }

            // Strategy B: Exact match (case insensitive)
            if (!matchedProduct) {
                matchedProduct = products.find(
                    (p) => p.name.toLowerCase() === trimmedProduct
                );
            }

            // Strategy C: Substring match (e.g. "SLES" matching "Sodium Lauryl Ether Sulphate (SLES)")
            if (!matchedProduct) {
                matchedProduct = products.find(
                    (p) => p.name.toLowerCase().includes(trimmedProduct) || 
                           trimmedProduct.includes(p.name.toLowerCase())
                );
            }

            if (matchedProduct) {
                console.log(`  Resolving legacy product name "${currentProduct}" to Product ObjectId "${matchedProduct._id}" (${matchedProduct.name})`);
                inq.product = matchedProduct._id;
                inq.markModified("product");
                updated = true;
                migratedCount++;
            } else {
                console.log(`  [Fallback] Unresolved legacy product name "${currentProduct}". Keeping as text reference.`);
                fallbackCount++;
            }
        } else {
            skippedCount++;
        }

        if (updated) {
            await inq.save();
        }
    }

    console.log("\nMigration completed:");
    console.log(`- Migrated to ObjectIds: ${migratedCount}`);
    console.log(`- Preserved as legacy text: ${fallbackCount}`);
    console.log(`- Already migrated / skipped: ${skippedCount}`);

    process.exit(0);
};

migrateInquiries().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
