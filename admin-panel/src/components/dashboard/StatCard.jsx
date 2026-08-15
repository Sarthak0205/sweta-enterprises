import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * StatCard
 * @param {string}  label       - Card title
 * @param {number}  value       - Numeric value to display
 * @param {React.ReactNode} icon - Lucide icon element
 * @param {string}  colorClass  - Tailwind text-color class for the icon bg
 * @param {object|null} growth  - { percentageChange, currentPeriod, previousPeriod } or null
 * @param {boolean} showGrowth  - Whether to render the growth badge at all
 */
export default function StatCard({ label, value, icon, colorClass, growth, showGrowth }) {
    const renderGrowth = () => {
        if (!showGrowth || growth === null || growth === undefined) return null;

        const pct = growth.percentageChange;

        if (pct > 0) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +{pct}%
                </span>
            );
        }
        if (pct < 0) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-500">
                    <TrendingDown className="h-3 w-3" />
                    {pct}%
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                <Minus className="h-3 w-3" />
                0%
            </span>
        );
    };

    return (
        <div className="theme-panel flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2.5 ${colorClass}`}>
                    {icon}
                </div>
                {renderGrowth()}
            </div>

            <div>
                <p className="text-2xl font-bold text-darkText tabular-nums">{value ?? "—"}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-darkText/50">
                    {label}
                </p>
            </div>
        </div>
    );
}
