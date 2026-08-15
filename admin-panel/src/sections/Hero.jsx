import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent">
            <div className="absolute inset-0 bg-black/5" />

            <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:py-32">
                <div className="text-darkText">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-darkText/70">
                        Sweta Enterprises
                    </p>
                    <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] md:text-6xl">
                        Trusted Bulk Chemical Supplier & Manufacturer for Modern Industries
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-darkText/80">
                        We specialize in sourcing, supplying & manufacturing high-quality industrial chemicals with dependable logistics, transparent pricing, and scalable distribution partnerships across India.
                    </p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-darkText/70">
                        Trusted by industrial clients across India
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            to="/inquiry?product=General%20Inquiry"
                            className="theme-button-primary px-8 py-4"
                        >
                            Request Bulk Quote
                        </Link>
                        <Link
                            to="/inquiry"
                            className="theme-button-secondary px-8 py-4"
                        >
                            Become Distributor
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-xl">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            "Surfactants",
                            "Personal Care",
                            "Emulsifiers",
                            "Industrial",
                            "Admin Inquiry Tracking",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border border-[#eedfb8] bg-cream px-5 py-6 text-sm font-semibold text-darkText shadow-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-lg bg-beige p-6 text-darkText">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                            Why Businesses Choose Us
                        </p>
                        <p className="mt-3 text-lg font-heading font-bold">
                            Reliable sourcing, compliant supply, and commercial support for long-term industrial procurement
                        </p>
                        <p className="mt-3 text-sm leading-7 text-darkText/70">
                            Built around quality assurance, stable dispatch systems, responsive inquiry handling, and scalable supply support for manufacturers, distributors, and institutional buyers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
