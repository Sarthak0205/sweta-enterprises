import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Inquiry", to: "/inquiry" },
];

const navLinkClass = ({ isActive }) =>
    `transition ${isActive ? "text-accent" : "text-darkText hover:text-accent"}`;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    if (location.pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <nav className="fixed w-full z-50 bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Sweta Enterprises Logo"
                        className="h-14 w-auto object-contain"
                    />
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                            Sweta Enterprises
                        </p>
                        <p className="text-xs text-slate-500">
                            Industrial Chemical Solutions
                        </p>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={navLinkClass}>
                            {item.label}
                        </NavLink>
                    ))}

                    <Link
                        to="/inquiry?product=General%20Inquiry"
                        className="theme-button-primary px-5 py-2"
                    >
                        Request Quote
                    </Link>
                </div>

                <button
                    type="button"
                    className="md:hidden text-2xl text-darkText"
                    onClick={() => setOpen((current) => !current)}
                >
                    ☰
                </button>
            </div>

            {open ? (
                <div className="border-t border-[#efe3c4] bg-white px-6 pb-5 pt-2 md:hidden">
                    <div className="flex flex-col gap-3 text-sm font-semibold">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={navLinkClass}
                                onClick={() => setOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        <Link
                            to="/inquiry?product=General%20Inquiry"
                            className="theme-button-primary mt-2 justify-center px-5 py-2"
                            onClick={() => setOpen(false)}
                        >
                            Request Quote
                        </Link>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}
