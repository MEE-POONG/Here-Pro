"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, List, Users, LogOut, Settings, Store, Image as ImageIcon, Mail, Bell } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { getStats } from '@/actions/admin-actions';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { t, language, setLanguage } = useLanguage();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getStats();
                setUnreadCount(data.unreadCount || 0);
            } catch (e) { }
        }
        fetchStats();
        // Refresh periodically
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, [pathname]);

    const menuItems = [
        { icon: LayoutDashboard, label: t.admin.dashboard, href: '/admin' },
        { icon: Package, label: t.admin.products, href: '/admin/products' },
        { icon: ImageIcon, label: t.admin.banners, href: '/admin/banners' },
        { icon: Users, label: t.admin.staff, href: '/admin/users' },
        { icon: Mail, label: t.admin.messages, href: '/admin/messages', badge: unreadCount },
    ];

    const getPageTitle = () => {
        if (pathname === '/admin') return t.admin.overview;
        const parts = pathname.split('/');
        const lastPart = parts[parts.length - 1];

        switch (lastPart) {
            case 'products': return t.admin.products;
            case 'categories': return t.admin.categories;
            case 'banners': return t.admin.banners;
            case 'users': return t.admin.staff;
            case 'messages': return t.admin.messages;
            default: return lastPart.replace('-', ' ');
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar - Brand Theme */}
            <aside className="w-72 bg-gradient-to-b from-[#00bcd4] to-[#0097a7] text-white flex flex-col shadow-xl z-20">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00bcd4] font-bold shadow-md group-hover:scale-105 transition-transform">
                            H
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white">
                                Here-Pro
                            </h1>
                            <p className="text-xs text-white/70 font-medium">{language === 'th' ? 'ระบบหลังบ้าน' : 'Backoffice System'}</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-white/50 uppercase tracking-widest mb-4 mt-2">{t.admin.menu}</p>
                    {menuItems.map((item) => {
                        const isActive = item.href === '/admin'
                            ? pathname === '/admin'
                            : pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-medium ${isActive
                                    ? 'bg-white text-[#0097a7] shadow-lg translate-x-1'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={isActive ? "" : "opacity-70"} />
                                    {item.label}
                                </div>
                                {item.badge !== undefined && item.badge > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="px-4 text-xs font-bold text-white/50 uppercase tracking-widest mb-4">{t.admin.shortcuts}</p>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-medium"
                        >
                            <Store size={20} className="opacity-70" />
                            {t.admin.visit_store}
                        </Link>
                    </div>
                </nav>

                <div className="p-6 bg-[#008ba3]">
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="flex items-center gap-3 w-full px-4 py-3 text-white/90 hover:bg-white/10 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        {t.admin.logout}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-50 relative">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 py-5 flex justify-between items-center border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">
                            {getPageTitle()}
                        </h2>
                        <p className="text-sm text-gray-500">{t.admin.welcome}, Admin</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Language Switcher */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200 shadow-sm">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('th')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'th' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                TH
                            </button>
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4dd0e1] to-[#00bcd4] p-[2px]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="rounded-full" />
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-sm font-bold text-gray-900">Super Admin</div>
                                <div className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {t.admin.online}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>

                {/* Floating Notification Bell */}
                <Link
                    href="/admin/messages"
                    className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#00bcd4] hover:scale-110 active:scale-95 transition-all border border-gray-100 group z-50"
                >
                    <Bell size={28} className="group-hover:animate-ring" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                            {unreadCount}
                        </span>
                    )}
                </Link>
            </main>
            <style jsx global>{`
                @keyframes ring {
                    0% { transform: rotate(0); }
                    10% { transform: rotate(15deg); }
                    20% { transform: rotate(-10deg); }
                    30% { transform: rotate(5deg); }
                    40% { transform: rotate(-5deg); }
                    50% { transform: rotate(0); }
                    100% { transform: rotate(0); }
                }
                .animate-ring {
                    animation: ring 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
