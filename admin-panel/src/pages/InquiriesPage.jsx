import { useEffect, useState } from "react";
import api from "../api/axios";
import { INQUIRY_STATUS_OPTIONS } from "../constants/inquiryStatus";

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await api.get("/inquiries");
                setInquiries(res.data.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to load inquiries.");
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, []);

    // ✅ Update status
    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/inquiries/${id}`, { status: newStatus });

            // update UI instantly
            setInquiries((prev) =>
                prev.map((inq) =>
                    inq._id === id ? { ...inq, status: newStatus } : inq
                )
            );
        } catch (error) {
            setError(error.response?.data?.message || "Status update failed.");
        }
    };

    if (loading) {
        return (
            <section className="bg-cream section-space">
                <div className="site-shell">
                    <div className="theme-panel p-10 text-center text-darkText/70">
                        Loading inquiries...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-cream section-space">
            <div className="site-shell">
                <div className="bg-primary rounded-xl px-8 py-10 text-darkText shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Admin
                    </p>
                    <h1 className="mt-3 text-4xl font-heading font-bold">
                        Customer Inquiries
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-darkText/75">
                        Review incoming product requests, track communication progress, and keep inquiry handling aligned with the public catalog workflow.
                    </p>
                </div>

                {error ? (
                    <div className="mt-6 rounded-xl border border-[#d9b4a8] bg-white px-5 py-4 text-sm text-darkText shadow-sm">
                        {error}
                    </div>
                ) : null}

                <div className="theme-panel mt-8 overflow-x-auto">
                    <table className="theme-table">
                        <thead>
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">GST</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inquiries.map((inq) => (
                            <tr key={inq._id}>
                                <td>{inq.name}</td>
                                <td>{inq.company || "—"}</td>
                                <td>{inq.phone}</td>
                                <td>{inq.email}</td>
                                <td className="font-medium">{inq.product?.name || inq.product || "—"}</td>
                                <td>{inq.quantity || "—"}</td>
                                <td className="font-mono text-xs uppercase">{inq.gst || "—"}</td>

                                <td className="max-w-xs">
                                    {inq.message}
                                </td>

                                <td>
                                    <select
                                        value={inq.status}
                                        onChange={(e) =>
                                            updateStatus(inq._id, e.target.value)
                                        }
                                        className="theme-input min-w-[150px] py-2"
                                    >
                                        {INQUIRY_STATUS_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </section>
    );
}
