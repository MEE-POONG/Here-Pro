"use client";

import { createUser, deleteUser, getUsers } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import { Trash2, UserPlus, Shield } from "lucide-react";

export default function AdminUsersPage() {
    type User = {
        id: string;
        name: string | null;
        email: string;
        role: string;
    };

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getUsers();
        setUsers(data as any);
        setIsLoading(false);
    }

    async function handleCreate(formData: FormData) {
        setIsLoading(true);
        await createUser(formData);
        if (formRef.current) formRef.current.reset();
        await loadData();
    }

    async function handleDelete(id: string) {
        if (!confirm("Remove this staff member?")) return;
        setIsLoading(true);
        await deleteUser(id);
        await loadData();
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
                    <p className="text-gray-500 mt-1">Manage admin access and roles</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* User List */}
                <div className="lg:col-span-2 grid gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 p-1">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xl">
                                        {user.name ? user.name[0] : 'U'}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{user.name || 'Unnamed Staff'}</h3>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                    <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        <Shield size={10} /> {user.role}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all"
                                title="Remove Staff"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {users.length === 0 && !isLoading && (
                        <div className="text-center p-10 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300">
                            No staff members found.
                        </div>
                    )}
                </div>

                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form ref={formRef} action={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                            <UserPlus size={24} className="text-primary" />
                            New Staff Member
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input name="name" required placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                <input name="email" type="email" required placeholder="staff@here-pro.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                                <input name="password" type="password" required placeholder="••••••••" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                                <select name="role" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900">
                                    <option value="ADMIN">Administrator</option>
                                    <option value="EDITOR">Editor</option>
                                    <option value="VIEWER">Viewer</option>
                                </select>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all disabled:opacity-70">
                                {isLoading ? 'Creating...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
