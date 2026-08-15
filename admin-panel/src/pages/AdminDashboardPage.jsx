import { useEffect, useState, useCallback } from "react";
import {
    Package,
    MessageSquare,
    Clock,
    CheckCircle,
    PhoneCall,
    XCircle,
    CalendarDays,
    RefreshCw,
} from "lucide-react";

import api from "../api/axios";
import StatCard from "../components/dashboard/StatCard";
import MonthlyChart from "../components/dashboard/MonthlyChart";
import StatusDonut from "../components/dashboard/StatusDonut";
import TopProductsChart from "../components/dashboard/TopProductsChart";
import LatestInquiries from "../components/dashboard/LatestInquiries";

// ─── helpers ────────────────────────────────────────────────────────────────

function today() {
    return new Date().toISOString().slice(0, 10);
}

function oneYearAgo() {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d.toISOString().slice(0, 10);
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function Skeleton({ className }) {
    return (
        <div className={`animate-pulse rounded-lg bg-beige ${className}`} />
    );
}

function LoadingState() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-28" />
                ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
            </div>
        </div>
    );
}

// ─── Error state ─────────────────────────────────────────────────────────────

function ErrorState({ message, onRetry }) {
    return (
        <div className="theme-panel p-10 text-center">
            <p className="text-sm font-semibold text-red-500">{message}</p>
            <button
                onClick={onRetry}
                className="theme-button-primary mt-4 gap-2 text-xs"
            >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
            </button>
        </div>
    );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Date filter local state (not yet applied)
    const [fromInput, setFromInput] = useState("");
    const [toInput, setToInput] = useState("");

    // Applied filter (what the last fetch used)
    const [appliedFrom, setAppliedFrom] = useState("");
    const [appliedTo, setAppliedTo] = useState("");

    const hasFilter = Boolean(appliedFrom && appliedTo);

    // ── Fetch ────────────────────────────────────────────────────────────────

    const fetchDashboard = useCallback(async (from, to) => {
        setLoading(true);
        setError("");
        try {
            const params = {};
            if (from && to) {
                params.from = from;
                params.to = to;
            }
            const res = await api.get("/dashboard/stats", { params });
            setData(res.data);
        } catch (err) {
            // 401 is handled globally by axios interceptor (auto-logout)
            if (err.response?.status !== 401) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load dashboard. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard("", "");
    }, [fetchDashboard]);

    // ── Filter handlers ──────────────────────────────────────────────────────

    const handleApply = () => {
        if (!fromInput || !toInput) return;
        setAppliedFrom(fromInput);
        setAppliedTo(toInput);
        fetchDashboard(fromInput, toInput);
    };

    const handleClear = () => {
        setFromInput("");
        setToInput("");
        setAppliedFrom("");
        setAppliedTo("");
        fetchDashboard("", "");
    };

    // Both inputs required before Apply is enabled
    const canApply = Boolean(fromInput && toInput);

    // ── Derived ──────────────────────────────────────────────────────────────

    const stats = data?.stats ?? {};
    const { totalProducts, totalInquiries, statusBreakdown = {} } = stats;
    const growth = data?.growth ?? null;

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                        Admin
                    </p>
                    <h1 className="mt-1 text-3xl font-heading font-bold text-darkText">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-darkText/55">
                        Overview of products, inquiries, and business activity.
                    </p>
                </div>

                {/* Date Filter */}
                <div className="theme-panel flex flex-wrap items-end gap-3 p-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-darkText/50">
                            From
                        </label>
                        <input
                            type="date"
                            id="dashboard-from"
                            value={fromInput}
                            max={toInput || today()}
                            onChange={(e) => setFromInput(e.target.value)}
                            className="theme-input py-2 text-xs"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-darkText/50">
                            To
                        </label>
                        <input
                            type="date"
                            id="dashboard-to"
                            value={toInput}
                            min={fromInput || undefined}
                            max={today()}
                            onChange={(e) => setToInput(e.target.value)}
                            className="theme-input py-2 text-xs"
                        />
                    </div>

                    <button
                        id="dashboard-apply"
                        onClick={handleApply}
                        disabled={!canApply}
                        className="theme-button-primary py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                        Apply
                    </button>

                    {hasFilter && (
                        <button
                            id="dashboard-clear"
                            onClick={handleClear}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#decf9f] px-4 py-2 text-xs font-semibold text-darkText/60 transition hover:border-accent hover:text-accent"
                        >
                            <RefreshCw className="h-3 w-3" />
                            Clear
                        </button>
                    )}

                    {hasFilter && (
                        <p className="text-[10px] text-darkText/40 self-end">
                            {appliedFrom} → {appliedTo}
                        </p>
                    )}
                </div>
            </div>

            {/* Body */}
            {loading ? (
                <LoadingState />
            ) : error ? (
                <ErrorState
                    message={error}
                    onRetry={() => fetchDashboard(appliedFrom, appliedTo)}
                />
            ) : (
                <div className="space-y-6">
                    {/* Stat Cards Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            label="Total Products"
                            value={totalProducts}
                            icon={<Package className="h-5 w-5 text-accent" />}
                            colorClass="bg-amber-50"
                        />
                        <StatCard
                            label="Total Inquiries"
                            value={totalInquiries}
                            icon={<MessageSquare className="h-5 w-5 text-accent" />}
                            colorClass="bg-amber-50"
                            growth={growth}
                            showGrowth={hasFilter}
                        />
                        <StatCard
                            label="Pending"
                            value={statusBreakdown.pending}
                            icon={<Clock className="h-5 w-5 text-amber-500" />}
                            colorClass="bg-amber-50"
                        />
                        <StatCard
                            label="Completed"
                            value={statusBreakdown.completed}
                            icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
                            colorClass="bg-emerald-50"
                        />
                        <StatCard
                            label="Contacted"
                            value={statusBreakdown.contacted}
                            icon={<PhoneCall className="h-5 w-5 text-blue-500" />}
                            colorClass="bg-blue-50"
                        />
                        <StatCard
                            label="Cancelled"
                            value={statusBreakdown.cancelled}
                            icon={<XCircle className="h-5 w-5 text-red-400" />}
                            colorClass="bg-red-50"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <MonthlyChart data={data?.monthlyInquiries} />
                        </div>
                        <div className="lg:col-span-1">
                            <StatusDonut statusBreakdown={statusBreakdown} />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <TopProductsChart topProducts={data?.topProducts} />
                        <LatestInquiries inquiries={data?.latestInquiries} />
                    </div>
                </div>
            )}
        </div>
    );
}
