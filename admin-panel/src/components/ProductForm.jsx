import { useState, useEffect } from "react";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import { AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";

export default function ProductForm({
    initialData = {},
    onSubmit,
    submitLabel = "Save Product",
    loading = false,
    error = "",
    success = ""
}) {
    const [form, setForm] = useState({
        name: "",
        category: "",
        description: "",
        image: "",
        isActive: true
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Keep form values in sync with initialData when editing
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setForm({
                name: initialData.name || "",
                category: initialData.category || "",
                description: initialData.description || "",
                image: initialData.image || "",
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        }
    }, [initialData]);

    const categories = Object.values(PRODUCT_CATEGORIES).filter(
        (cat) => cat !== PRODUCT_CATEGORIES.ALL
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // Clear specific validation error as user types
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleToggleActive = () => {
        setForm((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    const validate = () => {
        const errors = {};
        if (!form.name.trim()) {
            errors.name = "Product name is required";
        } else if (form.name.length < 2 || form.name.length > 160) {
            errors.name = "Name must be between 2 and 160 characters";
        }

        if (!form.category) {
            errors.category = "Category is required";
        }

        if (form.description && form.description.length > 400) {
            errors.description = "Description must be at most 400 characters";
        }

        if (form.image && form.image.length > 500) {
            errors.image = "Image URL must be at most 500 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global Errors / Alert */}
            {error && (
                <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <div>{error}</div>
                </div>
            )}

            {/* Global Success / Alert */}
            {success && (
                <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <div>{success}</div>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column: Form Inputs */}
                <div className="space-y-5">
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Sodium Lauryl Sulfate"
                            required
                            disabled={loading}
                            className={`theme-input w-full ${
                                validationErrors.name ? "border-red-400 focus:border-red-500" : ""
                            }`}
                        />
                        {validationErrors.name && (
                            <span className="text-xs text-red-600 font-medium mt-1">{validationErrors.name}</span>
                        )}
                    </div>

                    {/* Category Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Category *
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={`theme-input w-full ${
                                validationErrors.category ? "border-red-400 focus:border-red-500" : ""
                            }`}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        {validationErrors.category && (
                            <span className="text-xs text-red-600 font-medium mt-1">{validationErrors.category}</span>
                        )}
                    </div>

                    {/* Image URL Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="image" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            disabled={loading}
                            className={`theme-input w-full ${
                                validationErrors.image ? "border-red-400 focus:border-red-500" : ""
                            }`}
                        />
                        {validationErrors.image && (
                            <span className="text-xs text-red-600 font-medium mt-1">{validationErrors.image}</span>
                        )}
                    </div>

                    {/* Active Status Toggle */}
                    <div className="flex items-center justify-between rounded-lg border border-[#ead9ad]/60 bg-cream/20 p-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-darkText">Active Status</span>
                            <span className="text-xs text-slate-500">
                                {form.isActive
                                    ? "Visible in the public catalog"
                                    : "Hidden from the public catalog"}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleToggleActive}
                            disabled={loading}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                                form.isActive ? "bg-accent" : "bg-slate-300"
                            } disabled:opacity-50`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    form.isActive ? "translate-x-5" : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Right Column: Description & Image Preview */}
                <div className="space-y-5">
                    {/* Description Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter chemical specifications, properties, and applications..."
                            disabled={loading}
                            className={`theme-input w-full resize-none ${
                                validationErrors.description ? "border-red-400 focus:border-red-500" : ""
                            }`}
                        />
                        <div className="flex justify-between mt-1 text-[11px] text-slate-500">
                            {validationErrors.description ? (
                                <span className="text-xs text-red-600 font-medium">{validationErrors.description}</span>
                            ) : (
                                <span />
                            )}
                            <span>{form.description.length}/400 chars</span>
                        </div>
                    </div>

                    {/* Image Preview Container */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Live Preview
                        </span>
                        <div className="flex h-[178px] w-full items-center justify-center rounded-lg border border-dashed border-[#decf9f] bg-cream/10 p-2 overflow-hidden">
                            {form.image ? (
                                <img
                                    src={form.image}
                                    alt="Product preview"
                                    className="h-full w-full object-contain rounded"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "";
                                        // Trigger placeholder display if image fails to load
                                        setValidationErrors((prev) => ({
                                            ...prev,
                                            image: "Provided URL failed to load as an image"
                                        }));
                                    }}
                                />
                            ) : (
                                <div className="text-center text-slate-400 space-y-1">
                                    <ImageIcon className="mx-auto h-8 w-8 stroke-1 text-slate-300" />
                                    <span className="text-xs">No image URL specified</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-[#ead9ad] pt-6 flex justify-end gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="theme-button-primary min-w-[140px] disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                            Saving...
                        </>
                    ) : (
                        submitLabel
                    )}
                </button>
            </div>
        </form>
    );
}
