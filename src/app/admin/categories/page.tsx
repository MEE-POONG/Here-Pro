"use client";

import { createCategory, deleteCategory, getCategories } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminCategoriesPage() {
    const { t, language } = useLanguage();
    const trans = t.admin.categories_page;

    // Define type for category matching Prisma model
    type Category = {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    };

    const [categories, setCategories] = useState<Category[]>([]);
    const [isInternalLoading, setIsInternalLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function loadData() {
        const data = await getCategories();
        setCategories(data as unknown as Category[]);
        setIsInternalLoading(false);
    }

    async function handleCreate(formData: FormData) {
        setIsInternalLoading(true);
        await createCategory(formData);
        if (formRef.current) formRef.current.reset();
        await loadData();
    }

    async function handleDelete(id: string) {
        if (!confirm(language === 'th' ? "ยืนยันการลบหมวดหมู่นี้?" : "Are you sure?")) return;
        setIsInternalLoading(true);
        await deleteCategory(id);
        await loadData();
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{trans.title}</h1>
                    <p className="text-gray-500 mt-1">{trans.subtitle}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={language === 'th' ? 'ค้นหาหมวดหมู่...' : 'Search categories...'}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-bold text-gray-700">{trans.item_name}</th>
                                        <th className="p-4 font-bold text-gray-700">{trans.item_slug}</th>
                                        <th className="p-4 font-bold text-gray-700">{trans.item_desc}</th>
                                        <th className="p-4 font-bold text-gray-700 text-right">{trans.item_action}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredCategories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 font-bold text-gray-900">{cat.name}</td>
                                            <td className="p-4 text-gray-500 font-mono text-sm">{cat.slug}</td>
                                            <td className="p-4 text-gray-500 text-sm">{cat.description}</td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCategories.length === 0 && !isInternalLoading && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-400">
                                                {searchTerm
                                                    ? (language === 'th' ? `ไม่พบสิ่งที่คุณค้นหาสำหรับ "${searchTerm}"` : `No results found for "${searchTerm}"`)
                                                    : (language === 'th' ? "ไม่พบข้อมูลหมวดหมู่" : "No categories found.")}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form ref={formRef} action={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Plus size={20} className="text-primary" />
                            {trans.add_title}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.item_name}</label>
                                <input name="name" required placeholder={trans.placeholder_name} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.item_desc}</label>
                                <textarea name="description" rows={3} placeholder={trans.placeholder_desc} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400"></textarea>
                            </div>
                            <button type="submit" disabled={isInternalLoading} className="w-full py-3 bg-gradient-to-r from-[#4dd0e1] to-[#00bcd4] text-white font-bold rounded-xl shadow-lg shadow-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50">
                                {isInternalLoading ? '...' : trans.btn_create}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
