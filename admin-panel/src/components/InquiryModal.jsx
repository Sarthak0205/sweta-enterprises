import { useState } from "react";

export default function InquiryModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/inquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit inquiry");
            }

            setSuccess(true);

            // Reset form
            setFormData({
                name: "",
                company: "",
                phone: "",
                email: "",
                message: "",
            });
        } catch (error) {
            alert("Error submitting inquiry");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-xl relative">

                <button
                    className="absolute top-4 right-4 text-gray-500 text-lg"
                    onClick={() => {
                        setSuccess(false);
                        onClose();
                    }}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-heading font-bold mb-6">
                    Request Bulk Quote
                </h2>

                {success ? (
                    <div className="text-green-600 font-semibold">
                        Inquiry submitted successfully!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Requirement"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-white py-3 rounded font-semibold uppercase tracking-wide hover:opacity-90 transition"
                        >
                            {loading ? "Submitting..." : "Submit Inquiry"}
                        </button>

                    </form>
                )}
            </div>
        </div>
    );
}