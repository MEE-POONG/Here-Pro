"use client";

import { createCategory, deleteCategory, getCategories } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Search } from "lucide-react";

export default function AdminCategoriesPage() {
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
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getCategories();
        // Manually cast or ensure data is treated as Category array. 
        // Since server actions return dates as Dates, this should be fine in Client Component if passed directly? 
        // No, Server Actions return JSON. Dates might be strings. 
        // Let's assume standard behavior for now.
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
        if (!confirm("Are you sure?")) return;
        setIsInternalLoading(true);
        await deleteCategory(id);
        await loadData();
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
                    <p className="text-gray-500 mt-1">Manage product categories</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* List Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-bold text-gray-700">Name</th>
                                    <th className="p-4 font-bold text-gray-700">Slug</th>
                                    <th className="p-4 font-bold text-gray-700">Description</th>
                                    <th className="p-4 font-bold text-gray-700 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {categories.map((cat) => (
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
                                {categories.length === 0 && !isInternalLoading && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-400">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form ref={formRef} action={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Plus size={20} className="text-primary" />
                            Add New Category
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                                <input name="name" required placeholder="e.g. Medicine" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea name="description" rows={3} placeholder="Short description..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400"></textarea>
                            </div>
                            <button type="submit" disabled={isInternalLoading} className="w-full py-3 bg-gradient-to-r from-[#4dd0e1] to-[#00bcd4] text-white font-bold rounded-xl shadow-lg shadow-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50">
                                {isInternalLoading ? 'Saving...' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
