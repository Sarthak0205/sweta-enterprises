import InquiryForm from "./InquiryForm";

export default function InquiryModal({ isOpen, onClose, initialProduct = "" }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4">
            <div className="relative w-full max-w-3xl">
                <button
                    type="button"
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 shadow"
                    onClick={onClose}
                >
                    Close
                </button>
                <InquiryForm
                    initialProduct={initialProduct}
                    title="Request Bulk Quote"
                    onSuccess={onClose}
                />
            </div>
        </div>
    );
}
