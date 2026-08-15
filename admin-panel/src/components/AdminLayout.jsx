import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    MessageSquare,
    Package,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    ChevronRight
} from "lucide-react";

export default function AdminLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        // Redirect to login page
        navigate("/admin/login", { replace: true });
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
            isActive
                ? "bg-darkText text-white shadow-md"
                : "text-darkText hover:bg-beige/70 hover:text-accent"
        }`;

    const sidebarContent = (
        <div className="flex h-full flex-col justify-between bg-cream p-6">
            <div className="space-y-6">
                {/* Logo and Brand */}
                <div className="flex items-center gap-3 border-b border-[#ead9ad] pb-6">
                    <img
                        src="/logo.png"
                        alt="Sweta Enterprises Logo"
                        className="h-10 w-auto object-contain"
                    />
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                            Sweta Admin
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold">
                            Control Panel
                        </p>
                    </div>
                </div>

                {/* Primary Nav Links */}
                <nav className="space-y-2">
                    <NavLink
                        to="/admin/inquiries"
                        className={navLinkClass}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <MessageSquare className="h-5 w-5 shrink-0" />
                        <span>Inquiries</span>
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        className={navLinkClass}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Package className="h-5 w-5 shrink-0" />
                        <span>Products</span>
                    </NavLink>
                </nav>

                <div className="border-t border-[#ead9ad] my-4" />

                {/* Secondary Nav Links / Disabled / Dashboard */}
                <div className="space-y-2">
                    <div
                        className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-400 bg-slate-100/50"
                        title="Dashboard metrics coming soon"
                    >
                        <div className="flex items-center gap-3">
                            <LayoutDashboard className="h-5 w-5 shrink-0" />
                            <span>Dashboard</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                            Soon
                        </span>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="border-t border-[#ead9ad] pt-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-cream/30 text-darkText font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 border-r border-[#ead9ad] bg-cream md:block shrink-0">
                <div className="sticky top-0 h-screen">
                    {sidebarContent}
                </div>
            </aside>

            {/* Mobile Header and Drawer */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-[#ead9ad] bg-white px-6 md:hidden">
                    <Link to="/admin/inquiries" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Sweta Enterprises Logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                            Sweta Admin
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="rounded-lg p-2 hover:bg-cream"
                    >
                        <Menu className="h-6 w-6 text-darkText" />
                    </button>
                </header>

                {/* Mobile Drawer Backdrop */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile Drawer Content */}
                <div
                    className={`fixed inset-y-0 right-0 z-50 w-64 transform border-l border-[#ead9ad] bg-cream transition duration-300 md:hidden ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="absolute left-4 top-4">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg p-2 hover:bg-beige"
                        >
                            <X className="h-6 w-6 text-darkText" />
                        </button>
                    </div>
                    <div className="h-full pt-16">
                        {sidebarContent}
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-10">
                    <div className="mx-auto max-w-6xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
