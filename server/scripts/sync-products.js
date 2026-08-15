const connectDB = require("../config/db");
const Product = require("../models/product.model");
const { productCatalog } = require("../data/products.catalog");

const syncProducts = async () => {
    await connectDB();
    await Product.collection.dropIndex("slug_1").catch(() => null);

    const catalogNames = productCatalog.map((product) => product.name);

    await Promise.all(
        productCatalog.map((product) =>
            Product.findOneAndUpdate(
                { name: product.name },
                {
                    $set: {
                        description: product.description,
                        category: product.category,
                        image: product.image,
                        isActive: true,
                    },
                    $unset: {
                        slug: "",
                        shortDescription: "",
                        fullDescription: "",
                        hsnCode: "",
                        applications: "",
                        specifications: "",
                        featured: "",
                    },
                },
                {
                    returnDocument: "after",
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            )
        )
    );

    await Product.updateMany(
        { name: { $nin: catalogNames } },
        { $set: { isActive: false } }
    );

    console.log(`Catalog synced successfully with ${productCatalog.length} products.`);
    process.exit(0);
};

syncProducts().catch((error) => {
    console.error("Failed to sync products:", error.message);
    process.exit(1);
});
