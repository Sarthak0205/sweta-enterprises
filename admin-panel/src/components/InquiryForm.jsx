import { useEffect, useState } from "react";

const emptyForm = {
    name: "",
    company: "",
    phone: "",
    email: "",
    product: "",
    quantity: "",
    gst: "",
    message: "",
};

export default function InquiryForm({
    initialProduct = "",
    title = "Request Bulk Quote",
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        ...emptyForm,
        product: "",
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Fetch active products list
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                if (response.ok && data.success) {
                    setProducts(data.data);
                }
            } catch (err) {
                console.error("Failed to load products list:", err);
            }
        };
        fetchProducts();
    }, []);

    // Pre-select product based on initialProduct prop (e.g. name or ID)
    useEffect(() => {
        if (products.length > 0 && initialProduct) {
            const matched = products.find(
                (p) =>
                    p.name.toLowerCase() === initialProduct.toLowerCase() ||
                    p._id === initialProduct
            );
            if (matched) {
                setFormData((current) => ({
                    ...current,
                    product: matched._id,
                }));
            }
        }
    }, [products, initialProduct]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/inquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // If there are express-validator error fields, format them nicely
                if (data.errors && data.errors.length > 0) {
                    const validationMsgs = data.errors
                        .map((err) => `${err.field}: ${err.message}`)
                        .join(" | ");
                    throw new Error(validationMsgs || data.message);
                }
                throw new Error(data.message || "Failed to submit inquiry");
            }

            setSuccess(true);
            setFormData({
                ...emptyForm,
                product: formData.product || "",
            });

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (submitError) {
            setError(submitError.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="theme-panel p-8 text-center">
                <h2 className="text-2xl font-heading font-bold text-darkText">
                    Inquiry Submitted
                </h2>
                <p className="mt-3 text-sm text-darkText/70">
                    Our team will review your requirement and get back to you shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="theme-panel p-8 md:p-10">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                    Sweta Enterprises
                </p>
                <h2 className="mt-3 text-3xl font-heading font-bold text-darkText">
                    {title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Share your product requirement, expected volume, and business details. We will respond with the right commercial and technical support.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                {error ? (
                    <div className="md:col-span-2 rounded-lg border border-[#d9b4a8] bg-cream px-4 py-3 text-sm text-darkText">
                        {error}
                    </div>
                ) : null}

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Full Name
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Company Name
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Phone Number
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Email Address
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Product
                    <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        className="theme-input"
                    >
                        <option value="">-- Select Product --</option>
                        {products.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText">
                    Quantity Required
                    <input
                        type="text"
                        name="quantity"
                        placeholder="e.g. 500 kg, 5 barrels"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText md:col-span-2">
                    GST Number (Optional)
                    <input
                        type="text"
                        name="gst"
                        placeholder="15-digit GSTIN (e.g. 27AHYPC0260H1ZB)"
                        value={formData.gst}
                        onChange={handleChange}
                        maxLength={15}
                        className="theme-input"
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-darkText md:col-span-2">
                    Requirement Details
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        placeholder="Mention application, packaging preference, or dispatch requirements."
                        className="theme-input"
                    />
                </label>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="theme-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </div>
            </form>
        </div>
    );
}
