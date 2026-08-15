const TAGS_REGEX = /<[^>]*>/g;

const sanitizeText = (value) => {
    if (typeof value !== "string") {
        return value;
    }

    return value
        .replace(TAGS_REGEX, "")
        .replace(/\s+/g, " ")
        .trim();
};

module.exports = {
    sanitizeText,
};
