export default function TrustBar() {
    const items = [
        "Bulk Supply Available",
        "Pan-India Distribution",
        "Quality Assured Chemicals",
        "Fast Response Time",
    ];

    return (
        <section className="bg-white py-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid gap-4 border border-[#eedfb8] bg-cream px-6 py-5 md:grid-cols-2 xl:grid-cols-4">
                    {items.map((item) => (
                        <div
                            key={item}
                            className="text-center text-sm font-semibold tracking-[0.08em] text-darkText"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
