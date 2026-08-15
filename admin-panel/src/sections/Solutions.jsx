import { ClipboardList, FlaskConical, FileText, Truck } from "lucide-react";
export default function Solutions() {
    const solutions = [
        {
            icon: <ClipboardList size={40} />,
            title: "Select Product",
            description:
                "Browse our catalog by category and shortlist the right product based on application and supply requirement.",
        },
        {
            icon: <FileText size={40} />,
            title: "Submit Inquiry",
            description:
                "Send your requirement with quantity, application, and commercial details through the structured inquiry flow.",
        },
        {
            icon: <FlaskConical size={40} />,
            title: "Receive Quote",
            description:
                "Our team reviews the inquiry and responds with product guidance, pricing direction, and supply coordination.",
        },
        {
            icon: <Truck size={40} />,
            title: "Dispatch & Delivery",
            description:
                "Once aligned, orders move into dispatch planning and delivery support for repeat or project-based procurement.",
        },
    ];
    return (
        <section className="bg-cream py-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Process
                    </p>
                    <h2 className="text-4xl font-heading font-bold mb-4">
                        How Sweta Enterprises works with your team
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

                            <p className="text-sm text-darkText/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
