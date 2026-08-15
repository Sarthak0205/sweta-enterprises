import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("adminToken");

    // ❌ No token → go to login
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    // ✅ Token exists → allow access
    return children;
}