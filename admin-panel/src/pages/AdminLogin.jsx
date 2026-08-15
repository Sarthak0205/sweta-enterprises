import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/admin/login", form);

            // ✅ Store token
            localStorage.setItem("adminToken", res.data.token);

            // ✅ Redirect to dashboard
            navigate("/admin/inquiries");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-cream section-space min-h-screen">
            <div className="site-shell flex items-center justify-center">
                <div className="theme-panel w-full max-w-md p-8">
                <h2 className="mb-2 text-center text-2xl font-heading font-bold text-darkText">
                    Admin Login
                </h2>
                <p className="mb-6 text-center text-sm text-darkText/70">
                    Secure access for inquiry and catalog management.
                </p>

                {error && (
                    <p className="mb-4 text-center text-sm text-darkText">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="theme-input w-full"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="theme-input w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="theme-button-primary w-full disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
            </div>
        </section>
    );
}
