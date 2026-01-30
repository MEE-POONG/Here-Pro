"use client";

import { createBanner, deleteBanner, updateBanner, getBanners } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Search, Image as ImageIcon, Pencil, X, Check, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminBannersPage() {
    const { t, language } = useLanguage();
    const trans = t.admin.banners_page;

    type Banner = {
        id: string;
        title: string;
        subtitle: string | null;
        badge: string | null;
        image: string;
        active: boolean;
        order: number;
    };

    const [banners, setBanners] = useState<Banner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getBanners();
        setBanners(data as any);
        setIsLoading(false);
    }

    async function handleSubmit(formData: FormData) {
        if (!confirm(language === 'th' ? "ต้องการบันทึกแบนเนอร์นี้?" : "Save this banner?")) return;
        setIsLoading(true);
        try {
            if (editingBanner) {
                await updateBanner(editingBanner.id, formData);
            } else {
                await createBanner(formData);
            }
            if (formRef.current) formRef.current.reset();
            await loadData();
            setIsFormOpen(false);
            setEditingBanner(null);
            setPreviewImage(null);
            alert(language === 'th' ? "บันทึกเรียบร้อย!" : "Saved successfully!");
        } catch (error) {
            alert(language === 'th' ? "เกิดข้อผิดพลาดในการบันทึก" : "Error saving banner");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm(language === 'th' ? "ลบแบนเนอร์นี้?" : "Delete this banner?")) return;
        setIsLoading(true);
        await deleteBanner(id);
        await loadData();
    }

    function openEdit(banner: Banner) {
        setEditingBanner(banner);
        setPreviewImage(null); // Reset preview
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setEditingBanner(null);
        setPreviewImage(null);
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
                        className="bg-gradient-to-r from-primary to-[#00bcd4] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> {trans.add_title}
                    </button>
                )}
            </div>

            {/* Create/Edit Form */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-primary/20 animate-fade-in-up mb-8 relative">
                    <button onClick={closeForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        {editingBanner ? (language === 'th' ? 'แก้ไขแบนเนอร์' : 'Edit Banner') : trans.add_title}
                    </h3>
                    <form ref={formRef} action={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'th' ? 'หัวข้อ' : 'Title'}</label>
                                <input
                                    name="title"
                                    defaultValue={editingBanner?.title}
                                    required
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder="e.g. Immunity Plus Viruno"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'th' ? 'หัวข้อย่อย' : 'Subtitle'}</label>
                                <input
                                    name="subtitle"
                                    defaultValue={editingBanner?.subtitle || ''}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder="e.g. Advanced Viral Defense"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.table_badge}</label>
                                <input
                                    name="badge"
                                    defaultValue={editingBanner?.badge || ''}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder="e.g. New Arrival"
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    name="active"
                                    id="active"
                                    defaultChecked={editingBanner ? editingBanner.active : true}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                                />
                                <label htmlFor="active" className="text-gray-700 font-medium">{trans.table_active}</label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.table_image}</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden h-48 flex items-center justify-center group">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setPreviewImage(url);
                                            }
                                        }}
                                        required={!editingBanner?.image}
                                    />

                                    {(previewImage || editingBanner?.image) ? (
                                        <div className="absolute inset-0 w-full h-full">
                                            <img
                                                src={previewImage || editingBanner?.image || ''}
                                                className="w-full h-full object-contain p-2"
                                                alt="Preview"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                                                <ImageIcon size={32} className="mb-2" />
                                                <span className="text-sm font-medium">{language === 'th' ? 'คลิกเพื่อเปลี่ยนรูปภาพ' : 'Click to change image'}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-500 py-2">
                                            <ImageIcon size={32} />
                                            <span className="text-sm font-medium">{language === 'th' ? 'คลิกเพื่ออัปโหลดรูปภาพ' : 'Click to upload image'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                            <button type="button" onClick={closeForm} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">{language === 'th' ? 'ยกเลิก' : 'Cancel'}</button>
                            <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-transform active:scale-95">
                                {editingBanner ? (language === 'th' ? 'อัปเดตแบนเนอร์' : 'Update Banner') : trans.btn_create}
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
                            <th className="p-4 font-bold text-gray-700 pl-6">{trans.table_image}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_title}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_badge}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_status}</th>
                            <th className="p-4 font-bold text-gray-700 text-right pr-6">{trans.table_action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {banners.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6 w-32">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={b.image} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">{b.title}</div>
                                    <div className="text-sm text-gray-500">{b.subtitle}</div>
                                </td>
                                <td className="p-4">
                                    {b.badge && (
                                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            {b.badge}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {b.active ? (
                                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded w-fit">
                                            <Check size={14} /> {language === 'th' ? 'เปิดใช้งาน' : 'Active'}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-gray-400 font-bold text-xs bg-gray-100 px-2 py-1 rounded w-fit">
                                            <XCircle size={14} /> {language === 'th' ? 'ปิดใช้งาน' : 'Inactive'}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right pr-6">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(b)}
                                            className="text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'แก้ไข' : 'Edit'}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'ลบ' : 'Delete'}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {banners.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400">
                                    {language === 'th' ? 'ไม่พบแบนเนอร์ เพิ่มข้อมูลเพื่อโชว์ที่หน้าแรก' : 'No banners found. Add one to show on homepage.'}
                                </td>
                            </tr>
                        )}
                        {isLoading && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400">
                                    {language === 'th' ? 'กำลังโหลด...' : 'Loading...'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
