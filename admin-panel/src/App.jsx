import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import InquiriesPage from "./pages/InquiriesPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import PublicInquiryPage from "./pages/PublicInquiryPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminProductCreatePage from "./pages/AdminProductCreatePage";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import About from "./sections/About";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Logistics from "./sections/Logistics";
import ProductCategories from "./sections/ProductCategories";
import Solutions from "./sections/Solutions";
import TrustBar from "./sections/TrustBar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="pt-20">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <TrustBar />
                                <Features />
                                <ProductCategories />
                                <Solutions />
                                <Logistics />
                                <About />
                            </>
                        }
                    />

                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/inquiry" element={<PublicInquiryPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Protected Admin Shell */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="/admin"
                            element={<Navigate to="/admin/dashboard" replace />}
                        />
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/inquiries" element={<InquiriesPage />} />
                        <Route path="/admin/products" element={<AdminProductsPage />} />
                        <Route path="/admin/products/new" element={<AdminProductCreatePage />} />
                        <Route path="/admin/products/:id/edit" element={<AdminProductEditPage />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
