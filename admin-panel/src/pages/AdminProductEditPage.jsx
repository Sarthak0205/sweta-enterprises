import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";

export default function AdminProductEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch states
    const [product, setProduct] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    // Save states
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [saveSuccess, setSaveSuccess] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setFetchLoading(true);
                setFetchError("");
                const response = await api.get(`/products/${id}`, {
                    params: { includeInactive: true }
                });
                setProduct(response.data.data);
            } catch (err) {
                setFetchError(
                    err.response?.data?.message || "Failed to load product details for editing."
                );
            } finally {
                setFetchLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (formData) => {
        setSaveLoading(true);
        setSaveError("");
        setSaveSuccess("");

        try {
            const response = await api.put(`/products/${id}`, formData);
            setSaveSuccess(response.data.message || "Product updated successfully!");
            
            // Re-sync local form states
            setProduct(response.data.data);

            // Wait a brief moment for success feedback, then redirect
            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);
        } catch (err) {
            setSaveError(
                err.response?.data?.message ||
                "Failed to update product details. Make sure the name is unique."
            );
        } finally {
            setSaveLoading(false);
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
                        Edit Product Details
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Modify specifications, toggle catalog visibility, or update specifications of an active/archived product.
                    </p>
                </div>
            </div>

            {/* Main Content Conditional Render */}
            {fetchLoading ? (
                <div className="theme-panel py-20 text-center text-slate-500 font-semibold">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-accent shrink-0" />
                        <span>Loading product specifications...</span>
                    </div>
                </div>
            ) : fetchError ? (
                <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <div>{fetchError}</div>
                </div>
            ) : (
                <div className="theme-panel p-6 md:p-8">
                    {/* Status Badge */}
                    <div className="mb-6 flex justify-end">
                        {product?.isActive ? (
                            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
                                Active Status
                            </span>
                        ) : (
                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                                Archived Status
                            </span>
                        )}
                    </div>

                    <ProductForm
                        initialData={product}
                        onSubmit={handleSubmit}
                        submitLabel="Save Changes"
                        loading={saveLoading}
                        error={saveError}
                        success={saveSuccess}
                    />
                </div>
            )}
        </section>
    );
}
