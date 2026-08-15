/**
 * Safely extract a product name from the top-product entry.
 * Handles:  { product: { _id, name } }  or  { product: "some string" }
 */
function getProductName(product) {
    if (!product) return "Unknown";
    if (typeof product === "string") return product;
    if (typeof product === "object" && product.name) return product.name;
    return "Unknown";
}

export default function TopProductsChart({ topProducts }) {
    if (!topProducts || topProducts.length === 0) {
        return (
            <div className="theme-panel p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-darkText/60">
                    Top Products by Inquiries
                </h3>
                <div className="flex h-32 items-center justify-center text-sm text-darkText/40">
                    No product inquiry data available
                </div>
            </div>
        );
    }

    const max = topProducts[0]?.inquiryCount || 1;

    return (
        <div className="theme-panel p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-darkText/60">
                Top Products by Inquiries
            </h3>

            <ol className="space-y-3">
                {topProducts.map((item, index) => {
                    const name = getProductName(item.product);
                    const count = item.inquiryCount ?? 0;
                    const barPct = max > 0 ? Math.round((count / max) * 100) : 0;

                    return (
                        <li key={index} className="flex items-center gap-3">
                            {/* Rank */}
                            <span className="w-5 shrink-0 text-right text-xs font-bold text-darkText/30">
                                {index + 1}
                            </span>

                            {/* Name + Bar */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="truncate text-sm font-semibold text-darkText">
                                        {name}
                                    </p>
                                    <p className="ml-2 shrink-0 text-xs font-bold text-accent">
                                        {count}
                                    </p>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-beige overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-accent transition-all duration-500"
                                        style={{ width: `${barPct}%` }}
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
