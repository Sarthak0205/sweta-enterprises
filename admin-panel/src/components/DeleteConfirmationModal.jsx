import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    productName = "",
    loading = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 transition-all duration-300">
            <div className="relative w-full max-w-md transform rounded-xl border border-[#ead9ad] bg-white p-6 shadow-2xl transition-all">
                {/* Close Button top-right */}
                <button
                    type="button"
                    disabled={loading}
                    className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-cream hover:text-slate-600 disabled:opacity-50"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>

                    <div>
                        <h2 className="text-xl font-heading font-bold text-darkText">
                            Archive Product
                        </h2>
                        {productName && (
                            <p className="mt-1 text-xs font-semibold text-accent">
                                {productName}
                            </p>
                        )}
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            This product will be hidden from the public catalog but can be restored later.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 shadow"
                    >
                        {loading ? "Archiving..." : "Archive Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}
