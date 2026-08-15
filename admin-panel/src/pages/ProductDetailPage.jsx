import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import api from "../api/axios";

const getUsageItems = (category) => {
    switch (category) {
        case "Surfactants":
            return [
                "Detergent and cleaning liquid formulations",
                "Foaming and wetting systems for industrial blends",
                "Personal care and wash-base development",
            ];
        case "Personal Care":
            return [
                "Shampoo and handwash manufacturing",
                "Salon, hotel, and institutional hygiene products",
                "Contract manufacturing base formulations",
            ];
        case "Emulsifiers":
            return [
                "Oil and water phase stabilization",
                "Cosmetic cream and lotion processing",
                "Industrial formulation blending support",
            ];
        case "Industrial":
            return [
                "Plant maintenance and industrial cleaning",
                "Water treatment and process handling",
                "Factory-grade chemical support operations",
            ];
        default:
            return [
                "Industrial manufacturing support",
                "Commercial formulation requirements",
                "Application-specific procurement needs",
            ];
    }
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/products/${id}`);
                const currentProduct = response.data.data;
                setProduct(currentProduct);

                const relatedResponse = await api.get("/products", {
                    params: { category: currentProduct.category },
                });

                const related = relatedResponse.data.data
                    .filter((item) => item._id !== currentProduct._id)
                    .slice(0, 3);

                setRelatedProducts(related);
            } catch (fetchError) {
                setError(fetchError.response?.data?.message || "Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const usageItems = useMemo(
        () => getUsageItems(product?.category),
        [product?.category]
    );

    if (loading || !product) {
        return (
            <section className="bg-cream section-space">
                <div className="site-shell">
                    <div className="border border-[#eedfb8] bg-[#fffaf0] px-6 py-20 text-center text-darkText/70 shadow-sm">
                        Loading product details...
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-cream section-space">
                <div className="site-shell">
                    <div className="border border-[#eedfb8] bg-[#fffaf0] px-6 py-5 text-sm text-darkText shadow-sm">
                        {error}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-[#ead39a] via-[#f3e0ad] to-[#e4c77d] section-space">
            <div className="site-shell">
                <div className="mb-4">
                    <Link
                        to="/products"
                        className="text-sm font-medium text-accent transition hover:underline"
                    >
                        ← Back to Products
                    </Link>
                </div>

                <nav className="mb-8 text-sm text-darkText/70">
                    <div className="flex flex-wrap items-center gap-2">
                        <Link to="/" className="transition hover:text-darkText">
                            Home
                        </Link>
                        <span>/</span>
                        <Link to="/products" className="transition hover:text-darkText">
                            Products
                        </Link>
                        <span>/</span>
                        <span className="font-medium text-darkText">{product.name}</span>
                    </div>
                </nav>

                <div className="grid gap-10 rounded-lg border border-[#b68a2d] bg-[#fff8e7] p-6 shadow-sm md:grid-cols-[1.1fr_1fr] md:p-8">
                    <div>
                        <ProductImage
                            image={product.image}
                            name={product.name}
                            category={product.category}
                            heightClass="h-72 md:h-[420px]"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-darkText/60">
                            {product.category}
                        </p>
                        <h1 className="mt-3 text-3xl font-heading font-bold text-darkText md:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mt-6 text-base leading-8 text-darkText/80">
                            {product.description}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/inquiry?product=${encodeURIComponent(product.name)}`)
                            }
                            className="theme-button-primary mt-8 w-full md:w-auto"
                        >
                            Request Quote
                        </button>
                    </div>
                </div>

                <div className="my-10 border-t border-[#eedfb8]" />

                <div className="mt-10 rounded-lg border border-[#b68a2d] bg-[#fff8e7] p-6 shadow-sm md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                        Applications
                    </p>
                    <h2 className="mt-3 text-2xl font-heading font-bold text-darkText">
                        Usage and Application Areas
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {usageItems.map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border border-[#b68a2d] bg-[#f7ebc7] p-4"
                            >
                                <p className="text-sm leading-7 text-darkText/80">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-10 border-t border-[#eedfb8]" />

                {relatedProducts.length ? (
                    <div className="mt-12">
                        <h2 className="mb-4 text-xl font-semibold text-darkText">
                            Related Products
                        </h2>
                        <p className="text-sm leading-7 text-darkText/70">
                            More products from the {product.category} category.
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {relatedProducts.map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
