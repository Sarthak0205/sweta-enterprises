import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";

export default function About() {
    return (
        <footer className="border-t border-[#eedfb8] bg-beige">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.4fr_0.8fr_1.2fr]">
                    {/* Brand Info & Core Details */}
                    <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                            Sweta Enterprises
                        </p>
                        <p className="max-w-sm text-sm leading-relaxed text-darkText/75">
                            Bulk chemical sourcing and supply support for industrial buyers, manufacturers, and distribution partners.
                        </p>
                        <div className="pt-2 space-y-1 text-xs leading-relaxed text-darkText/50 font-sans">
                            <p>Bulk supply and distributor inquiries welcome.</p>
                            <p>Serving Maharashtra and major industrial regions across India.</p>
                            <p>Response time: typically within 24 hours.</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-6 lg:pl-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-darkText/60">
                            Quick Links
                        </p>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-darkText/75">
                            <Link to="/" className="transition hover:text-accent">
                                Home
                            </Link>
                            <Link to="/products" className="transition hover:text-accent">
                                Products
                            </Link>
                            <Link
                                to="/inquiry?product=General%20Inquiry"
                                className="transition hover:text-accent"
                            >
                                Inquiry
                            </Link>
                        </div>
                    </div>

                    {/* Office & Manufacturing Unit */}
                    <div className="border-t border-[#eedfb8]/50 pt-8 md:border-t-0 md:pt-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-darkText/60 mb-4">
                            Office & Manufacturing Unit
                        </p>
                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <div className="text-sm leading-relaxed text-darkText/75 font-sans space-y-1">
                                <p>I-4 Balaji Industry Park</p>
                                <p>Village - Tondre, Behind Hindalco</p>
                                <p>Water Tank, Taloja MIDC</p>
                                <p>Dist. Raigad - 410208</p>
                                <p>Maharashtra, India</p>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="mt-6 pt-5 border-t border-[#eedfb8]/50">
                            <a
                                href="mailto:swetaenterprises04@gmail.com"
                                className="inline-flex items-center gap-3 text-sm text-darkText/75 hover:text-accent transition duration-200 group font-sans font-medium"
                            >
                                <div className="h-8 w-8 rounded-lg bg-cream flex items-center justify-center border border-[#eedfb8]/40 group-hover:border-accent/40 group-hover:bg-white transition duration-200">
                                    <Mail className="h-4 w-4 text-accent shrink-0" />
                                </div>
                                <span className="underline decoration-[#eedfb8] underline-offset-4 group-hover:decoration-accent transition duration-200">
                                    swetaenterprises04@gmail.com
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#eedfb8] py-4">
                <p className="text-center text-xs text-darkText/60">
                    © 2026 Sweta Enterprises. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

