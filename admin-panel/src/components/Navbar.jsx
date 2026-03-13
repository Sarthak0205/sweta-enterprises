import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Sweta Enterprises Logo"
                        className="h-16 w-auto object-contain"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-darkText hover:text-accent transition">
                        Home
                    </a>
                    <a href="#" className="text-darkText hover:text-accent transition">
                        Solutions
                    </a>
                    <a href="#" className="text-darkText hover:text-accent transition">
                        About
                    </a>
                    <a href="#" className="text-darkText hover:text-accent transition">
                        Contact
                    </a>

                    <button className="bg-primary text-white px-5 py-2 rounded font-semibold hover:opacity-90 transition">
                        Become Distributor
                    </button>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-darkText text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white shadow-lg px-6 pb-4">
                    <a href="#" className="block py-2 text-darkText">
                        Home
                    </a>
                    <a href="#" className="block py-2 text-darkText">
                        Solutions
                    </a>
                    <a href="#" className="block py-2 text-darkText">
                        About
                    </a>
                    <a href="#" className="block py-2 text-darkText">
                        Contact
                    </a>

                    <button className="w-full mt-3 bg-primary text-white py-2 rounded font-semibold">
                        Become Distributor
                    </button>
                </div>
            )}
        </nav>
    );
}