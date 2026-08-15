import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const ALL_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Normalise sparse monthlyInquiries from the API into a full 12-month array.
 * @param {Array<{month: string, count: number}>} data
 */
function fillMonths(data) {
    const lookup = {};
    (data || []).forEach(({ month, count }) => {
        lookup[month] = count;
    });
    return ALL_MONTHS.map((month) => ({ month, count: lookup[month] ?? 0 }));
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-[#ead9ad] bg-white px-3 py-2 shadow-md text-sm">
                <p className="font-semibold text-darkText">{label}</p>
                <p className="text-accent">{payload[0].value} inquiries</p>
            </div>
        );
    }
    return null;
};

export default function MonthlyChart({ data }) {
    const chartData = fillMonths(data);

    return (
        <div className="theme-panel p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-darkText/60">
                Monthly Inquiries
            </h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e6c8" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#2B2B2B", opacity: 0.55 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#2B2B2B", opacity: 0.55 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#FFF8E1" }} />
                    <Bar dataKey="count" fill="#C88A00" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
