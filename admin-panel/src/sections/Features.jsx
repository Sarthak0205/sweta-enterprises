export default function Features() {
    const features = [
        "Wide Product Range",
        "Fast & Secure Shipping",
        "Transparent Pricing",
        "Industrial-Grade Quality",
        "Scalable Supply",
        "Sustainable Packaging",
    ];

    return (
        <section className="bg-beige py-24">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-darkText mb-14">
                    Why Partner with Sweta Enterprises?
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="font-semibold text-darkText">{feature}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}