const INQUIRY_STATUS = Object.freeze({
    PENDING: "pending",
    CONTACTED: "contacted",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
});

const INQUIRY_STATUS_VALUES = Object.values(INQUIRY_STATUS);

module.exports = {
    INQUIRY_STATUS,
    INQUIRY_STATUS_VALUES,
};
