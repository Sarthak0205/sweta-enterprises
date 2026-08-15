import { useEffect, useState } from "react";
import { INQUIRY_STATUS_OPTIONS } from "../constants/inquiryStatus";

export default function InquiriesPage() {

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await fetch("/api/inquiries", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                setInquiries(data);
            } catch (error) {
                console.error("Failed to fetch inquiries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, [token]);

    const updateStatus = async (id, status) => {

        try {
            const res = await fetch(`/api/inquiries/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            setInquiries(prev =>
                prev.map(inq =>
                    inq._id === id ? { ...inq, status } : inq
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                Loading inquiries...
            </div>
        );
    }

    return (
        <div className="p-8">

            <h1 className="text-2xl font-bold mb-6">
                Customer Inquiries
            </h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 text-sm uppercase text-gray-600">

                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {inquiries.map((inq) => (

                            <tr key={inq._id} className="border-t">

                                <td className="p-4">{inq.name}</td>

                                <td className="p-4">{inq.company}</td>

                                <td className="p-4">{inq.phone}</td>

                                <td className="p-4">{inq.email}</td>

                                <td className="p-4">{inq.product}</td>

                                <td className="p-4 max-w-xs truncate">
                                    {inq.message}
                                </td>

                                <td className="p-4">

                                    <select
                                        value={inq.status}
                                        onChange={(e) =>
                                            updateStatus(inq._id, e.target.value)
                                        }
                                        className="border p-2 rounded"
                                    >

                                        {INQUIRY_STATUS_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}

                                    </select>

                                </td>

                                <td className="p-4">
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
