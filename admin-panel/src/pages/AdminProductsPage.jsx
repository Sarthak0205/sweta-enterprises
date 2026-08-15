import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import {
    Plus,
    Search,
    Edit2,
    Archive,
    CheckCircle2,
    AlertCircle,
    X,
    Filter,
    PackageOpen
} from "lucide-react";

export default function AdminProductsPage() {
    const navigate = useNavigate();

    // Data states
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Modal state
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
    const [productToArchive, setProductToArchive] = useState(null);
    const [archiveLoading, setArchiveLoading] = useState(false);

    const categories = Object.values(PRODUCT_CATEGORIES);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get("/products", {
                params: { includeInactive: true }
            });
            setProducts(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load product catalog.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Clear success message after 4 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Handle Archive Action
    const openArchiveModal = (product) => {
        setProductToArchive(product);
        setArchiveModalOpen(true);
    };

    const closeArchiveModal = () => {
        setProductToArchive(null);
        setArchiveModalOpen(false);
    };

    const handleConfirmArchive = async () => {
        if (!productToArchive) return;
        try {
            setArchiveLoading(true);
            setError("");
            await api.delete(`/products/${productToArchive._id}`);
            setSuccess(`Successfully archived product "${productToArchive.name}"`);
            closeArchiveModal();
            // Re-fetch listing
            await fetchProducts();
        } catch (err) {
            setError(err.response?.data?.message || "Archiving failed.");
            closeArchiveModal();
        } finally {
            setArchiveLoading(false);
        }
    };

    // Handle Quick Restore Action
    const handleRestoreProduct = async (product) => {
        try {
            setError("");
            setSuccess("");
            await api.put(`/products/${product._id}`, {
                ...product,
                isActive: true
            });
            setSuccess(`Successfully restored product "${product.name}"`);
            await fetchProducts();
        } catch (err) {
            setError(err.response?.data?.message || "Restoration failed.");
        }
    };

    // Reset filters
    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedStatus("All");
    };

    // Filter logic
    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchesStatus =
            selectedStatus === "All"
                ? true
                : selectedStatus === "Active"
                ? product.isActive === true
                : product.isActive === false;

        return matchesName && matchesCategory && matchesStatus;
    });

    return (
        <section className="space-y-6">
            {/* Header Block */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-primary px-8 py-8 text-darkText shadow-lg">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                        Catalog Management
                    </span>
                    <h1 className="mt-2 text-3xl font-heading font-bold">
                        Products Catalog
                    </h1>
                    <p className="mt-2 text-xs leading-5 text-darkText/75 max-w-xl">
                        Add new products, update specifications, toggle active visibility, and archive products from the public listing.
                    </p>
                </div>

                <Link
                    to="/admin/products/new"
                    className="theme-button-primary inline-flex h-11 shrink-0 items-center gap-2 self-start sm:self-center"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Notification Messages */}
            {success && (
                <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <div>{success}</div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <div>{error}</div>
                </div>
            )}

            {/* Filters Dashboard Panel */}
            <div className="theme-panel p-4 md:p-6">
                <div className="grid gap-4 md:grid-cols-12 md:items-end">
                    {/* Search Field */}
                    <div className="flex flex-col gap-1.5 md:col-span-5">
                        <label htmlFor="search" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Search Products
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="theme-input w-full pl-10"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-col gap-1.5 md:col-span-3">
                        <label htmlFor="categoryFilter" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Category
                        </label>
                        <select
                            id="categoryFilter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="theme-input w-full"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "All" ? "All Categories" : cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-col gap-1.5 md:col-span-3">
                        <label htmlFor="statusFilter" className="text-xs font-bold uppercase tracking-wider text-darkText/70">
                            Status
                        </label>
                        <select
                            id="statusFilter"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="theme-input w-full"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active Only</option>
                            <option value="Archived">Archived Only</option>
                        </select>
                    </div>

                    {/* Clear Button */}
                    <div className="md:col-span-1">
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            title="Reset filters"
                            className="flex h-11 w-full items-center justify-center rounded-lg border border-[#ead9ad] bg-cream/20 text-darkText/70 transition hover:bg-beige hover:text-darkText"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Products List Table */}
            {loading ? (
                <div className="theme-panel py-20 text-center text-slate-500 font-semibold">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#decf9f] border-t-accent" />
                        <span>Fetching products...</span>
                    </div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="theme-panel py-20 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-accent mb-4">
                        <PackageOpen className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-darkText">No Products Found</h3>
                    <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                        We couldn't find any products matching your search terms or filters. Try adjusting them.
                    </p>
                    {(searchQuery || selectedCategory !== "All" || selectedStatus !== "All") && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="theme-button-secondary mt-6 px-4 py-2 text-xs"
                        >
                            Reset Search & Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="theme-panel overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="theme-table">
                            <thead>
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Created Date</th>
                                    <th className="p-4">Updated Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td className="font-semibold text-darkText">
                                            {product.name}
                                        </td>
                                        <td>
                                            <span className="inline-flex rounded-md border border-[#decf9f]/60 bg-cream/50 px-2 py-0.5 text-xs font-semibold text-darkText/80">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td>
                                            {product.isActive ? (
                                                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                                    Archived
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-xs text-slate-500">
                                            {new Date(product.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="text-xs text-slate-500">
                                            {new Date(product.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    title="Edit Product"
                                                    onClick={() =>
                                                        navigate(`/admin/products/${product._id}/edit`)
                                                    }
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-accent hover:text-accent transition shadow-sm"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                
                                                {product.isActive ? (
                                                    <button
                                                        type="button"
                                                        title="Archive Product"
                                                        onClick={() => openArchiveModal(product)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-150 bg-white text-red-600 hover:bg-red-50 transition shadow-sm"
                                                    >
                                                        <Archive className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    // Quick restore action
                                                    <button
                                                        type="button"
                                                        title="Restore Product"
                                                        onClick={() => handleRestoreProduct(product)}
                                                        className="inline-flex px-2.5 py-1.5 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition shadow-sm"
                                                    >
                                                        Restore
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Archive Confirmation Dialog */}
            <DeleteConfirmationModal
                isOpen={archiveModalOpen}
                onClose={closeArchiveModal}
                onConfirm={handleConfirmArchive}
                productName={productToArchive?.name}
                loading={archiveLoading}
            />
        </section>
    );
}
