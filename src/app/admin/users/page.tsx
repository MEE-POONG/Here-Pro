"use client";

import { createUser, deleteUser, updateUser, getUsers } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Pencil, X, Shield, Lock, Mail, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminUsersPage() {
    const { t, language } = useLanguage();
    const trans = t.admin.staff_page;

    type User = {
        id: string;
        name: string | null;
        email: string;
        role: string;
    };

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getUsers();
        setUsers(data as any);
        setIsLoading(false);
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            if (editingUser) {
                await updateUser(editingUser.id, formData);
            } else {
                await createUser(formData);
            }
            if (formRef.current) formRef.current.reset();
            await loadData();
            closeForm();
        } catch (error) {
            alert(language === 'th' ? "เกิดข้อผิดพลาดในการบันทึก" : "Error saving user");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm(trans.confirm_delete)) return;
        setIsLoading(true);
        await deleteUser(id);
        await loadData();
    }

    function openEdit(user: User) {
        setEditingUser(user);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setEditingUser(null);
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{trans.title}</h1>
                    <p className="text-gray-500 mt-1">{trans.subtitle}</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> {trans.add_title}
                    </button>
                )}
            </div>

            {/* Create/Edit Form (Expandable) */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up mb-8 relative">
                    <button onClick={closeForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                        {editingUser ? <Pencil size={20} /> : <Plus size={20} />}
                        {editingUser ? trans.edit_title : trans.add_title}
                    </h3>
                    <form ref={formRef} action={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.form_name}</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        name="name"
                                        required
                                        defaultValue={editingUser?.name || ''}
                                        placeholder="John Doe"
                                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-800 outline-none text-gray-900 placeholder:text-gray-400 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.form_email}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        defaultValue={editingUser?.email}
                                        placeholder="staff@here-pro.com"
                                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-800 outline-none text-gray-900 placeholder:text-gray-400 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    {editingUser ? trans.form_pass_optional : trans.form_pass}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        name="password"
                                        type="password"
                                        required={!editingUser}
                                        placeholder={editingUser ? trans.form_pass_placeholder : "••••••••"}
                                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-800 outline-none text-gray-900 placeholder:text-gray-400 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.form_role}</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select
                                        name="role"
                                        defaultValue={editingUser?.role || 'ADMIN'}
                                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-800 outline-none text-gray-900 appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="ADMIN">{trans.role_admin}</option>
                                        <option value="EDITOR">{trans.role_editor}</option>
                                        <option value="VIEWER">{trans.role_viewer}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                            <button type="button" onClick={closeForm} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">{trans.btn_cancel}</button>
                            <button type="submit" className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95">
                                {editingUser ? trans.btn_update : trans.btn_create}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-gray-700 pl-6">{trans.table_name}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_email}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_role}</th>
                            <th className="p-4 font-bold text-gray-700 text-right pr-6">{trans.table_action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 p-[2px]">
                                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                                                {user.name ? user.name[0].toUpperCase() : 'U'}
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-900">{user.name || trans.unnamed}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600">{user.email}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' :
                                        user.role === 'EDITOR' ? 'bg-blue-50 text-blue-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        <Shield size={12} /> {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right pr-6">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(user)}
                                            className="text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'แก้ไข' : 'Edit'}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'ลบ' : 'Remove'}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-gray-400">
                                    {trans.no_staff}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
