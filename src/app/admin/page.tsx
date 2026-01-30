"use client";

import { getStats, seedInitialData } from "@/actions/admin-actions";
import { useEffect, useState } from "react";
import { Package, Users, DollarSign, List, BarChart3, CloudLightning, Eye } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ productCount: 0, categoryCount: 0, userCount: 0 });
    const [isSeeding, setIsSeeding] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        const data = await getStats();
        setStats(data);
    }

    async function handleSeed() {
        setIsSeeding(true);
        await seedInitialData();
        await loadStats();
        setIsSeeding(false);
        alert("Database seeded with initial values!");
    }

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Products', value: stats.productCount, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Total Categories', value: stats.categoryCount, icon: List, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Staff Members', value: stats.userCount, icon: Users, color: 'text-teal-500', bg: 'bg-teal-50' },
                    { label: 'Total Visits', value: (stats as any).visitCount || 0, icon: Eye, color: 'text-orange-500', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-[#00bcd4] to-[#0097a7] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Welcome to Here-Pro Admin</h2>
                        <p className="text-white/80 mb-8 max-w-md leading-relaxed">
                            Manage your products, categories, and staff members from one central dashboard. Keep your customers updated with the latest health solutions.
                        </p>
                        <div className="flex gap-4">
                            {stats.categoryCount === 0 && (
                                <button
                                    onClick={handleSeed}
                                    disabled={isSeeding}
                                    className="bg-white text-[#0097a7] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg flex items-center gap-2"
                                >
                                    <CloudLightning size={20} />
                                    {isSeeding ? 'Setting up...' : 'Setup Initial Data'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Quick Tips */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="text-primary" />
                        System Status
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-600">Database Connection</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-600">Server Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-600">Last Backup</span>
                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full uppercase">Auto (Daily)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
