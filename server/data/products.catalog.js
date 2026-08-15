const { PRODUCT_CATEGORIES } = require("../constants/product-categories");

const CATEGORY_DESCRIPTIONS = {
    [PRODUCT_CATEGORIES.SURFACTANTS]: "Widely used surfactant for detergents, cleaning formulations, and personal care products.",
    [PRODUCT_CATEGORIES.PERSONAL_CARE]: "Used in shampoo, handwash, and personal care base formulations for daily-use products.",
    [PRODUCT_CATEGORIES.EMULSIFIERS]: "Supports stable blending of oil and water phases in cosmetic and industrial formulations.",
    [PRODUCT_CATEGORIES.INDUSTRIAL]: "Suitable for industrial treatment, cleaning, and process-support applications.",
};

const productCatalog = [
    { name: "Sodium Lauryl Ether Sulphate (SLES)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/SLES.jpeg" },
    { name: "Sodium Lauryl Sulphate (SLS Liquid)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/SLS Liquid.jpeg" },
    { name: "Sodium Lauryl Sulphate (SLS Needle)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/SLS-needle.jpeg" },
    { name: "Triethanolamine Lauryl Sulphate (TLS)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/TLS.jpeg" },
    { name: "Ammonium Lauryl Sulphate (ALS)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/ALS.jpeg" },
    { name: "Ammonium Lauryl Ether Sulphate (ALES)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/ALES.jpeg" },
    { name: "Acid Slurry", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/Acid-Slurry.jpeg" },
    { name: "Fatty Alcohol Ether Sulphate (FAES)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/FAES.jpeg" },
    { name: "Cocodiethanolamide (CDEA)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/CMEA.jpeg" },
    { name: "Cocoamidopropyl Betaine (CAPB 28%)", category: PRODUCT_CATEGORIES.SURFACTANTS, image: "/products/CAPB 28%.jpeg" },
    { name: "Pearly Shampoo Base", category: PRODUCT_CATEGORIES.PERSONAL_CARE, image: "/products/Pearly-Shampoo-Base.jpeg" },
    { name: "Clear Shampoo Base", category: PRODUCT_CATEGORIES.PERSONAL_CARE, image: "/products/Pearly-Base.jpeg" },
    { name: "Ethylene Glycol Monostearate (EGMS)", category: PRODUCT_CATEGORIES.EMULSIFIERS, image: "/products/EGMS.jpeg" },
    { name: "Glyceryl Monostearate (GMS)", category: PRODUCT_CATEGORIES.EMULSIFIERS, image: "/products/GMS.jpeg" },
    { name: "Benzalkonium Chloride (BKC 50%)", category: PRODUCT_CATEGORIES.INDUSTRIAL, image: "/products/BKC 50%.jpeg" },
].map((product) => ({
    ...product,
    description: CATEGORY_DESCRIPTIONS[product.category],
    image: product.image || "",
    isActive: true,
}));

module.exports = {
    productCatalog,
};
