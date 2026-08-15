import { Link } from "react-router-dom";

const categories = [
    {
        title: "Surfactants",
        description: "Core sourcing support for foaming, cleaning, and formulation applications across industrial and personal care use cases.",
    },
    {
        title: "Personal Care",
        description: "Functional inputs and ready-use bases for shampoo, handwash, and daily-use personal care manufacturing requirements.",
    },
    {
        title: "Emulsifiers",
        description: "Blending and stabilizing materials suited to formulation systems that require dependable phase compatibility.",
    },
    {
        title: "Industrial",
        description: "Factory-grade chemical solutions for treatment, handling, cleaning, and industrial process support applications.",
    },
];

export default function ProductCategories() {
    return (
        <section className="bg-beige py-28">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Product Categories
                    </p>
                    <h2 className="mt-3 text-4xl font-heading font-bold text-darkText">
                        Browse our product range by application and supply need
                    </h2>
                    <p className="mt-4 text-base leading-8 text-darkText/75">
                        Our catalog is organized to help industrial buyers move quickly from requirement discovery to product inquiry and quote submission.
                    </p>
                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.title}
                            className="rounded-lg border border-[#eedfb8] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                                Category
                            </p>
                            <h3 className="mt-4 text-2xl font-heading font-semibold text-darkText">
                                {category.title}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-darkText/70">
                                {category.description}
                            </p>
                            <Link
                                to="/products"
                                className="theme-button-secondary mt-6"
                            >
                                View Products
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
