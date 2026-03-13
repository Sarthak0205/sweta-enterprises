export default function Logistics() {
    return (
        <section className="bg-cream py-28">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Left Image Placeholder */}
                <div className="h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-500">
                        Warehouse / Shipment Image
                    </span>
                </div>

                {/* Right Content Card */}
                <div className="bg-primary p-10 rounded-xl shadow-xl text-darkText">
                    <h2 className="text-4xl font-heading font-bold mb-6">
                        Ready to Supply. Ready to Scale.
                    </h2>

                    <p className="text-lg mb-8">
                        Sweta Enterprises ensures streamlined warehousing,
                        quality assurance checks, and efficient dispatch systems
                        for all bulk orders.
                    </p>

                    <button className="bg-accent text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition">
                        Start Distribution Partnership
                    </button>
                </div>
            </div>
        </section>
    );
}