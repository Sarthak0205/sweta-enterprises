import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InquiryForm from "../components/InquiryForm";

export default function PublicInquiryPage() {
    const [searchParams] = useSearchParams();

    const initialProduct = useMemo(
        () => searchParams.get("product") || "",
        [searchParams]
    );

    return (
        <section className="bg-cream section-space">
            <div className="site-shell max-w-6xl">
                <div className="theme-panel mb-10 flex flex-wrap items-center justify-between gap-4 px-8 py-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                            Quote Request
                        </p>
                        <h1 className="mt-2 text-3xl font-heading font-bold text-darkText">
                            Share your requirement with our sales team
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            {initialProduct
                                ? `Preparing an inquiry for ${initialProduct}.`
                                : "Select a product or enter the product name manually in the form."}
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="theme-button-secondary"
                    >
                        Browse Products
                    </Link>
                </div>

                <InquiryForm
                    initialProduct={initialProduct}
                    title="Request a Quote for Your Product Requirement"
                />
            </div>
        </section>
    );
}
