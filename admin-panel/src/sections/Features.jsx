export default function Features() {
    const features = [
        {
            title: "Reliable Bulk Supply",
            description: "Structured procurement and dispatch support for repeat industrial orders and scheduled supply requirements.",
        },
        {
            title: "Quality Assurance Focus",
            description: "Built around dependable quality checks, consistent handling practices, and application-aligned product support.",
        },
        {
            title: "Transparent Commercials",
            description: "Clear quote handling, practical communication, and straightforward bulk supply coordination for procurement teams.",
        },
        {
            title: "Scalable Distribution Support",
            description: "Designed to support manufacturers, regional distributors, and growing commercial networks across India.",
        },
    ];

    return (
        <section className="bg-beige py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Why Choose Us
                    </p>
                    <h2 className="mt-3 text-4xl font-heading font-bold text-darkText">
                        A supply partner built for industrial consistency
                    </h2>
                    <p className="mt-4 text-base leading-8 text-darkText/75">
                        Sweta Enterprises supports buyers who need dependable materials, responsive commercial coordination, and a sourcing partner that can scale with production demand.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-darkText/80">
                        Serving clients across Maharashtra and major industrial regions in India.
                    </p>
                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-lg border border-[#eedfb8] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                                Sweta Advantage
                            </p>
                            <h3 className="mt-4 text-xl font-heading font-semibold text-darkText">
                                {feature.title}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-darkText/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
