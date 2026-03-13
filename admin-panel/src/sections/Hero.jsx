import { useState } from "react";
import InquiryModal from "../components/InquiryModal";

export default function Hero() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <section className="relative bg-gradient-to-br from-secondary via-primary to-accent overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>

                    <h1 className="font-heading font-bold leading-[1.1] mb-6">
                        <span className="block text-5xl md:text-6xl">
                            Sweta Enterprises
                        </span>

                        <span className="block text-3xl md:text-4xl mt-2 font-semibold">
                            Trusted Bulk Chemical Supplier for Modern Industries
                        </span>
                    </h1>

                    <p className="text-lg mb-8 max-w-xl">
                        We specialize in sourcing and supplying high-quality industrial
                        chemicals with dependable logistics, transparent pricing,
                        and scalable distribution partnerships across India.
                    </p>

                    <div className="flex gap-6">

                        <button className="bg-accent text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition">
                            Become a Distributor
                        </button>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="border-2 border-darkText text-darkText px-8 py-4 rounded-lg font-semibold uppercase tracking-wide hover:bg-darkText hover:text-white transition"
                        >
                            Request Bulk Quote
                        </button>

                    </div>
                </div>

                {/* Right Image Placeholder */}
                <div className="bg-white h-96 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-400">
                        Product / Packaging Visual
                    </span>
                </div>

            </div>

            {/* Modal */}
            <InquiryModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </section>
    );
}``