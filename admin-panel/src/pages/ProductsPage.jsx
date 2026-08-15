import { useEffect, useState } from "react";
import api from "../api/axios";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_FILTERS } from "../constants/productCategories";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES.ALL);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const params =
                    activeCategory === PRODUCT_CATEGORIES.ALL
                        ? {}
                        : { category: activeCategory };

                const response = await api.get("/products", { params });
                setProducts(response.data.data);
            } catch (fetchError) {
                setError(fetchError.response?.data?.message || "Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory]);

    return (
        <section className="bg-gradient-to-b from-[#ead39a] via-[#f3e0ad] to-[#e4c77d] section-space">
            <div className="site-shell">
                <div className="max-w-3xl rounded-lg bg-gradient-to-r from-[#f3cf61] via-[#e4b83d] to-[#c88a00] px-8 py-10 shadow-md">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Product Catalog
                    </p>
                    <h1 className="mt-3 text-4xl font-heading font-bold text-darkText md:text-5xl">
                        Our Product Range
                    </h1>
                    <p className="mt-4 text-base leading-8 text-darkText/80">
                        High-quality industrial and specialty chemicals for diverse applications
                    </p>
                </div>

                <div className="mt-10 border-b border-[#b68a2d]">
                    <div className="flex flex-wrap gap-6 text-sm font-semibold text-darkText/70">
                        {PRODUCT_CATEGORY_FILTERS.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`border-b-2 pb-4 transition ${
                                        isActive
                                            ? "border-accent text-darkText"
                                            : "border-transparent hover:text-darkText"
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 max-w-3xl">
                    <p className="text-sm leading-7 text-darkText/70">
                        Browse products by category and send a quote request directly from the catalog. Each listing is designed for quick scanning by industrial buyers and procurement teams.
                    </p>
                </div>

                {loading ? (
                    <div className="mt-10 border border-[#b68a2d] bg-[#fffaf0] px-6 py-10 text-center text-darkText/70 shadow-sm">
                        Loading products...
                    </div>
                ) : null}

                {error ? (
                    <div className="mt-10 border border-[#b68a2d] bg-[#fffaf0] px-6 py-5 text-sm text-darkText shadow-sm">
                        {error}
                    </div>
                ) : null}

                {!loading && !error ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
