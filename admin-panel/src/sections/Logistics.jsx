import { Link } from "react-router-dom";

export default function Logistics() {
    return (
        <section className="bg-cream py-28">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                <div className="rounded-xl border border-[#eedfb8] bg-white p-8 shadow-md">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Operations Strength
                    </p>
                    <h2 className="mt-3 text-4xl font-heading font-bold text-darkText">
                        Ready to supply. Ready to scale.
                    </h2>
                    <div className="mt-8 space-y-4">
                        {[
                            "Bulk supply coordination for industrial buyers and distributors",
                            "Dispatch planning aligned with repeat procurement schedules",
                            "Responsive inquiry handling from product selection to quotation",
                            "Structured support for long-term sourcing relationships",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border border-[#eedfb8] bg-cream px-5 py-4 text-sm leading-7 text-darkText/75"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary p-10 rounded-xl shadow-xl text-darkText">
                    <h2 className="text-4xl font-heading font-bold mb-6">
                        Commercial support that moves buyers forward
                    </h2>

                    <p className="text-lg mb-8 leading-8">
                        From inquiry to quote to dispatch planning, our workflow is designed to help procurement teams, production units, and distribution partners act quickly with confidence.
                    </p>
                    <p className="mb-8 text-sm leading-7 text-darkText/80">
                        Serving clients across Maharashtra and major industrial regions in India.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            to="/products"
                            className="theme-button-primary px-8 py-4"
                        >
                            Explore Products
                        </Link>
                        <Link
                            to="/inquiry?product=General%20Inquiry"
                            className="theme-button-secondary px-8 py-4"
                        >
                            Start Inquiry
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
