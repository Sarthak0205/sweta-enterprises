import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const STATUS_STYLES = {
    pending:   "bg-amber-50 text-amber-700 border border-amber-200",
    contacted: "bg-blue-50 text-blue-700 border border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cancelled: "bg-red-50 text-red-500 border border-red-200",
};

function StatusBadge({ status }) {
    const cls = STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600 border border-slate-200";
    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${cls}`}>
            {status}
        </span>
    );
}

function getProductName(product) {
    if (!product) return "—";
    if (typeof product === "string") return product;
    if (typeof product === "object" && product.name) return product.name;
    return "—";
}

export default function LatestInquiries({ inquiries }) {
    return (
        <div className="theme-panel p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-darkText/60">
                    Latest Inquiries
                </h3>
                <Link
                    to="/admin/inquiries"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition hover:text-darkText"
                >
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            {!inquiries || inquiries.length === 0 ? (
                <div className="flex h-24 items-center justify-center text-sm text-darkText/40">
                    No recent inquiries
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Company</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr key={inq._id}>
                                    <td className="font-medium text-darkText">{inq.name}</td>
                                    <td className="text-darkText/60">{inq.company || "—"}</td>
                                    <td className="font-medium">{getProductName(inq.product)}</td>
                                    <td>
                                        <StatusBadge status={inq.status} />
                                    </td>
                                    <td className="text-darkText/60 text-xs">
                                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
