const PRODUCT_CATEGORIES = Object.freeze({
    SURFACTANTS: "Surfactants",
    PERSONAL_CARE: "Personal Care",
    EMULSIFIERS: "Emulsifiers",
    INDUSTRIAL: "Industrial",
});

const PRODUCT_CATEGORY_VALUES = Object.values(PRODUCT_CATEGORIES);

module.exports = {
    PRODUCT_CATEGORIES,
    PRODUCT_CATEGORY_VALUES,
};
