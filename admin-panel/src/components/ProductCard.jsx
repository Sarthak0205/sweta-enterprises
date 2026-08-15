import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
    return (
        <article className="rounded-lg border border-[#b68a2d] bg-[#fff8e7] p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <Link to={`/products/${product._id}`} className="block">
                <ProductImage
                    image={product.image}
                    name={product.name}
                    category={product.category}
                />
            </Link>

            <div className="mt-4">
                <Link to={`/products/${product._id}`} className="block">
                    <h2 className="text-lg font-semibold text-darkText transition hover:text-accent">
                        {product.name}
                    </h2>
                </Link>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-darkText/80">
                    {product.description}
                </p>
                <p className="mt-3 inline-flex border border-[#b68a2d] bg-[#f2ddb0] px-2 py-1 text-xs uppercase tracking-wide text-darkText/75">
                    {product.category}
                </p>
            </div>

            <Link
                to={`/inquiry?product=${encodeURIComponent(product.name)}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[#9a6d00] bg-[#f7ebc7] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-darkText transition duration-300 hover:bg-darkText hover:text-white"
            >
                Request Quote
            </Link>
        </article>
    );
}
