"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load dashboard stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview Dashboard</h1>
                <p className="text-gray-500 mt-2">Real-time status of the admission process</p>
            </div>

            {stats ? (
                <>
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Intake" value={stats.totalIntake} color="border-indigo-500" />
                        <StatCard title="Total Applicants" value={stats.totalApplicants} color="border-blue-500" />
                        <StatCard title="Seats Admitted" value={stats.totalAdmissions} color="border-emerald-500" />
                        <StatCard title="Remaining Seats" value={stats.remainingSeats} color="border-amber-500" />
                    </div>

                    {/* Detailed Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">Quota-wise Filled Seats</h3>
                            <div className="space-y-4">
                                <ProgressBar label="KCET" value={stats.quotaWiseFilled.KCET} total={stats.totalIntake} color="bg-blue-500" />
                                <ProgressBar label="COMEDK" value={stats.quotaWiseFilled.COMEDK} total={stats.totalIntake} color="bg-indigo-500" />
                                <ProgressBar label="Management" value={stats.quotaWiseFilled.Management} total={stats.totalIntake} color="bg-emerald-500" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 opacity-50"></div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">Action Required</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center p-4 bg-orange-50 rounded-lg text-orange-900">
                                    <span className="font-medium">Pending Documents</span>
                                    <span className="bg-orange-200 text-orange-800 py-1 px-3 rounded-full text-sm font-bold shadow-sm">{stats.pendingDocuments}</span>
                                </li>
                                <li className="flex justify-between items-center p-4 bg-red-50 rounded-lg text-red-900">
                                    <span className="font-medium">Pending Fees</span>
                                    <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-bold shadow-sm">{stats.pendingFees}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">Failed to load stats. Please ensure backend is running.</div>
            )}
        </div>
    );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} p-6 hover:shadow-md transition-shadow`}>
            <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">{title}</h3>
            <div className="text-4xl font-bold text-gray-800">{value}</div>
        </div>
    );
}

function ProgressBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
        <div>
            <div className="flex justify-between text-sm mb-1 pb-1">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-500">{value} seats ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
                <div className={`${color} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}
