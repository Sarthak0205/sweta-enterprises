import { ShieldCheck, Truck, PackageCheck, Layers } from "lucide-react";
export default function Solutions() {
    const solutions = [
        {
            icon: <ShieldCheck size={40} />,
            title: "Smart Labeling & Compliance",
            description:
                "Regulatory compliant packaging with clear batch tracking and documentation support.",
        },
        {
            icon: <Truck size={40} />,
            title: "Safe Transit Packaging",
            description:
                "Damage-resistant containers designed for secure and optimized transportation.",
        },
        {
            icon: <PackageCheck size={40} />,
            title: "Space-Saving Packaging",
            description:
                "Compact bulk packaging solutions that reduce storage and transportation costs.",
        },
        {
            icon: <Layers size={40} />,
            title: "Flexible Order Volumes",
            description:
                "Flexible MOQ options with subscription-based supply support for growing businesses.",
        },
    ];
    return (
        <section className="bg-cream py-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <h2 className="text-4xl font-heading font-bold mb-4">
                        Built for Modern Businesses
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {solutions.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white p-8 rounded-xl shadow-md border-t-4 border-transparent hover:border-accent hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-heading font-semibold mb-4">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}