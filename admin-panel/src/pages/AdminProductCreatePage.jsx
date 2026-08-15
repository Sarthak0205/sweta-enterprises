import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import { ChevronLeft } from "lucide-react";

export default function AdminProductCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post("/products", formData);
            setSuccess(response.data.message || "Product created successfully!");
            
            // Wait a brief moment for success to register and then redirect
            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create product. Make sure the name is unique."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="space-y-6">
            {/* Header / Back Navigation */}
            <div className="flex flex-col gap-2">
                <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Products</span>
                </Link>
                <div className="mt-2">
                    <h1 className="text-3xl font-heading font-bold text-darkText">
                        Create New Product
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Add a new chemical solution, emulsifier, or surfactant to the catalog list.
                    </p>
                </div>
            </div>

            {/* Form Panel Container */}
            <div className="theme-panel p-6 md:p-8">
                <ProductForm
                    onSubmit={handleSubmit}
                    submitLabel="Create Product"
                    loading={loading}
                    error={error}
                    success={success}
                />
            </div>
        </section>
    );
}
