"use client";

import { getStats, seedInitialData } from "@/actions/admin-actions";
import { useEffect, useState } from "react";
import { Package, Users, DollarSign, List, BarChart3, CloudLightning, Eye, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { getContactMessages, getMonthlyVisits } from "@/actions/admin-actions";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
    const { t, language } = useLanguage();
    const trans = t.admin.dashboard_page;
    const [stats, setStats] = useState({ productCount: 0, categoryCount: 0, userCount: 0, unreadCount: 0 });
    const [latestMessages, setLatestMessages] = useState<any[]>([]);
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [isSeeding, setIsSeeding] = useState(false);

    useEffect(() => {
        loadStats();
        loadLatestMessages();
        loadMonthlyStats();
    }, []);

    async function loadStats() {
        const data = await getStats();
        setStats(data);
    }

    async function loadLatestMessages() {
        try {
            const data = await getContactMessages();
            setLatestMessages(data.slice(0, 5));
        } catch { }
    }

    async function loadMonthlyStats() {
        try {
            const data = await getMonthlyVisits();
            const monthsToShow = 6;
            const result = [];
            const now = new Date();

            for (let i = monthsToShow - 1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                const monthName = d.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', { month: 'short' });

                const existing = data.find((item: any) => item.month === monthKey);
                result.push({
                    name: monthName,
                    visits: existing ? existing.count : 0
                });
            }
            setMonthlyData(result);
        } catch { }
    }

    async function handleSeed() {
        setIsSeeding(true);
        await seedInitialData();
        await loadStats();
        setIsSeeding(false);
        alert(trans.seeded_alert);
    }

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: trans.total_products, value: stats.productCount, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: trans.total_categories, value: stats.categoryCount, icon: List, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: trans.staff_members, value: stats.userCount, icon: Users, color: 'text-teal-500', bg: 'bg-teal-50' },
                    { label: trans.total_visits, value: (stats as any).visitCount || 0, icon: Eye, color: 'text-orange-500', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
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

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Statistics Graph */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <BarChart3 className="text-primary" />
                                {language === 'th' ? 'สถิติการเข้าชม' : 'Visit Statistics'}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-sm text-gray-500 font-medium">{language === 'th' ? 'ยอดเข้าชม' : 'Visits'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#00bcd4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#00bcd4', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#00bcd4"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Latest Inquiries */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Mail className="text-primary" />
                                {t.admin.messages_page.title}
                            </h3>
                            <Link href="/admin/messages" className="text-primary hover:text-primary-dark font-bold text-sm flex items-center gap-1 transition-colors">
                                {language === 'th' ? 'ดูทั้งหมด' : 'View All'}
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {latestMessages.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">{t.admin.messages_page.no_messages}</p>
                            ) : (
                                latestMessages.map((msg) => (
                                    <div key={msg.id} className={`flex items-center justify-between p-4 rounded-2xl border ${!msg.isRead ? 'bg-blue-50/20 border-blue-100 shadow-sm' : 'bg-gray-50/50 border-gray-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${!msg.isRead ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                {msg.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${!msg.isRead ? 'text-gray-900' : 'text-gray-600'}`}>{msg.name}</p>
                                                <p className="text-xs text-gray-400 truncate max-w-[200px]">{msg.subject || msg.message}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* System Status Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <BarChart3 className="text-primary" />
                            {trans.system_status}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="font-medium text-gray-600">{trans.db_connection}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">{trans.db_connected}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="font-medium text-gray-600">{trans.server_status}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">{trans.server_online}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
