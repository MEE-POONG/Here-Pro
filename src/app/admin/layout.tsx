"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, List, Users, LogOut, Settings, Store, Image as ImageIcon } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: Package, label: 'Products', href: '/admin/products' },
        { icon: List, label: 'Categories', href: '/admin/categories' },
        { icon: ImageIcon, label: 'Banners', href: '/admin/banners' },
        { icon: Users, label: 'Staff Management', href: '/admin/users' },
    ];

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
                            <p className="text-xs text-white/70 font-medium">Backoffice System</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-white/50 uppercase tracking-widest mb-4 mt-2">Menu</p>
                    {menuItems.map((item) => {
                        const isActive = item.href === '/admin'
                            ? pathname === '/admin'
                            : pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${isActive
                                    ? 'bg-white text-[#0097a7] shadow-lg translate-x-1'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? "" : "opacity-70"} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="px-4 text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Shortcuts</p>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-medium"
                        >
                            <Store size={20} className="opacity-70" />
                            Visit Store
                        </Link>
                    </div>
                </nav>

                <div className="p-6 bg-[#008ba3]">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-white/90 hover:bg-white/10 rounded-xl transition-colors font-medium">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-50 relative">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 py-5 flex justify-between items-center border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">
                            {pathname === '/admin' ? 'Dashboard Overview' : pathname.split('/').slice(-1)[0].replace('-', ' ')}
                        </h2>
                        <p className="text-sm text-gray-500">Welcome back, Admin</p>
                    </div>

                    <div className="flex items-center gap-4">
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
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
