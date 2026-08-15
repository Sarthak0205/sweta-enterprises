export const INQUIRY_STATUS = Object.freeze({
    PENDING: "pending",
    CONTACTED: "contacted",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
});

export const INQUIRY_STATUS_OPTIONS = [
    { value: INQUIRY_STATUS.PENDING, label: "Pending" },
    { value: INQUIRY_STATUS.CONTACTED, label: "Contacted" },
    { value: INQUIRY_STATUS.COMPLETED, label: "Completed" },
    { value: INQUIRY_STATUS.CANCELLED, label: "Cancelled" },
];
