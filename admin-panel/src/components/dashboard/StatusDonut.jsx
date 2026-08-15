import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const STATUS_CONFIG = [
    { key: "pending",   label: "Pending",   color: "#F4B400" },
    { key: "contacted", label: "Contacted", color: "#3B82F6" },
    { key: "completed", label: "Completed", color: "#10B981" },
    { key: "cancelled", label: "Cancelled", color: "#EF4444" },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
            <div className="rounded-lg border border-[#ead9ad] bg-white px-3 py-2 shadow-md text-sm">
                <p className="font-semibold text-darkText">{name}</p>
                <p className="text-accent">{value} inquiries</p>
            </div>
        );
    }
    return null;
};

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {payload.map((entry) => (
                <li key={entry.value} className="flex items-center gap-1.5 text-xs text-darkText/70">
                    <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

export default function StatusDonut({ statusBreakdown }) {
    const data = STATUS_CONFIG.map(({ key, label, color }) => ({
        name: label,
        value: statusBreakdown?.[key] ?? 0,
        color,
    }));

    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="theme-panel p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-darkText/60">
                Status Breakdown
            </h3>

            {total === 0 ? (
                <div className="flex h-[220px] items-center justify-center text-sm text-darkText/40">
                    No inquiry data available
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
