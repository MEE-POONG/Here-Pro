"use client";

import { createProduct, deleteProduct, updateProduct, getProducts, getCategories, createCategory } from "@/actions/admin-actions";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { Trash2, Plus, Search, Image as ImageIcon, Pencil, X, Check, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminProductsPage() {
    const { t, language } = useLanguage();
    const trans = t.admin.products_page;

    type Product = {
        id: string;
        name: string;
        price: number;
        category: { name: string };
        categoryId: string;
        image: string | null;
        description: string;
        featured: boolean;
        benefits: string[];
    };

    type Category = { id: string; name: string };

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    // New Category State
    const [isAddingCat, setIsAddingCat] = useState(false);
    const [newCatName, setNewCatName] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function loadData() {
        const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prodData as any);
        setCategories(catData as any);
        setIsLoading(false);
    }

    async function handleCreateCategory() {
        if (!newCatName.trim()) return;
        try {
            const formData = new FormData();
            formData.append("name", newCatName);
            await createCategory(formData);

            // Refresh categories
            const newCats = await getCategories();
            setCategories(newCats as any);

            setIsAddingCat(false);
            setNewCatName("");
            alert(language === 'th' ? "สร้างหมวดหมู่สำเร็จ!" : "Category created successfully!");
        } catch (error) {
            console.error("Failed to create category", error);
            alert(language === 'th' ? "สร้างหมวดหมู่ไม่สำเร็จ" : "Failed to create category");
        }
    }

    async function handleSubmit(formData: FormData) {
        if (!confirm(language === 'th' ? "คุณแน่ใจหรือไม่ว่าต้องการบันทึกสินค้านี้?" : "Are you sure you want to save this product?")) {
            return;
        }

        setIsLoading(true);
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
            } else {
                await createProduct(formData);
            }
            if (formRef.current) formRef.current.reset();
            await loadData();
            setIsFormOpen(false);
            setEditingProduct(null);
            setPreviewImage(null);
            alert(language === 'th' ? "บันทึกสินค้าเรียบร้อยแล้ว!" : "Product saved successfully!");
        } catch (error) {
            alert(language === 'th' ? "เกิดข้อผิดพลาดในการบันทึกสินค้า" : "Error saving product");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm(language === 'th' ? "ยืนยันการลบสินค้าชิ้นนี้?" : "Delete this product?")) return;
        setIsLoading(true);
        await deleteProduct(id);
        await loadData();
    }

    function openEdit(product: Product) {
        setEditingProduct(product);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setEditingProduct(null);
        setPreviewImage(null);
        setIsAddingCat(false);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{trans.title}</h1>
                    <p className="text-gray-500 mt-1">{trans.subtitle}</p>
                </div>
                {!isFormOpen && (
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={language === 'th' ? 'ค้นหาสินค้าหรือหมวดหมู่...' : 'Search products or categories...'}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-gradient-to-r from-primary to-[#00bcd4] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            <Plus size={20} /> {trans.add_title}
                        </button>
                    </div>
                )}
            </div>

            {/* Create/Edit Form (Expandable) */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-primary/20 animate-fade-in-up mb-8 relative">
                    <button onClick={closeForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        {editingProduct ? (language === 'th' ? 'แก้ไขสินค้า' : 'Edit Product') : trans.add_title}
                    </h3>
                    <form ref={formRef} action={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.table_name}</label>
                                <input
                                    name="name"
                                    defaultValue={editingProduct?.name}
                                    required
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder={trans.table_name}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.table_price} (THB)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct?.price}
                                    required
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{trans.table_category}</label>
                                {isAddingCat ? (
                                    <div className="flex gap-2 animate-fade-in-up">
                                        <input
                                            type="text"
                                            value={newCatName}
                                            onChange={(e) => setNewCatName(e.target.value)}
                                            placeholder={language === 'th' ? "ชื่อหมวดหมู่ใหม่" : "New category name"}
                                            className="flex-grow p-3 bg-white border border-primary ring-2 ring-primary/20 rounded-xl text-gray-900 outline-none"
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCreateCategory}
                                            className="px-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-md"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingCat(false)}
                                            className="px-4 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <select
                                            name="categoryId"
                                            required
                                            defaultValue={editingProduct?.categoryId || ""}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900"
                                        >
                                            <option value="" disabled>-- {language === 'th' ? 'เลือกหมวดหมู่' : 'Select Category'} --</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingCat(true)}
                                            className="px-3 bg-blue-50 text-primary border border-blue-100 rounded-xl hover:bg-white hover:shadow-md transition-all whitespace-nowrap font-bold text-sm flex items-center gap-1"
                                        >
                                            <Plus size={16} /> {language === 'th' ? 'เพิ่ม' : 'New'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'th' ? 'คุณสมบัติเด่น' : 'Key Benefits'}</label>
                                <textarea
                                    name="benefits"
                                    rows={4}
                                    defaultValue={editingProduct?.benefits?.join('\n')}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder={`- ${language === 'th' ? 'สรรพคุณข้อที่ 1' : 'Benefit 1'}\n- ${language === 'th' ? 'สรรพคุณข้อที่ 2' : 'Benefit 2'}`}
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">{language === 'th' ? 'ใส่สรรพคุณทีละบรรทัด' : 'Enter each benefit on a new line.'}</p>
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
                                    />

                                    {(previewImage || editingProduct?.image) ? (
                                        <div className="absolute inset-0 w-full h-full">
                                            <img
                                                src={previewImage || editingProduct?.image || ''}
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
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{t.admin.categories_page.item_desc}</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    defaultValue={editingProduct?.description}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400"
                                    placeholder={language === 'th' ? 'รายละเอียดสินค้า...' : 'Product details...'}
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    defaultChecked={editingProduct?.featured}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                                />
                                <label htmlFor="featured" className="text-gray-700 font-medium">{language === 'th' ? 'กำหนดเป็นสินค้าแนะนำ' : 'Mark as Featured Product'}</label>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                            <button type="button" onClick={closeForm} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">{trans.btn_cancel}</button>
                            <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-transform active:scale-95">
                                {editingProduct ? trans.btn_save : trans.btn_create}
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
                            <th className="p-4 font-bold text-gray-700">{trans.table_category}</th>
                            <th className="p-4 font-bold text-gray-700">{trans.table_price}</th>
                            <th className="p-4 font-bold text-gray-700 text-right pr-6">{trans.table_action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 relative">
                                            {p.image ? (
                                                <img src={p.image} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{p.name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{p.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {p.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-gray-700">฿{Number(p.price).toLocaleString()}</td>
                                <td className="p-4 text-right pr-6">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(p)}
                                            className="text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'แก้ไข' : 'Edit'}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title={language === 'th' ? 'ลบ' : 'Delete'}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-gray-400">
                                    {searchTerm
                                        ? (language === 'th' ? `ไม่พบสิ่งที่คุณค้นหาสำหรับ "${searchTerm}"` : `No results found for "${searchTerm}"`)
                                        : (language === 'th' ? 'ไม่พบสินค้าในระบบ กด "เพิ่มสินค้าใหม่" เพื่อเริ่มใช้งาน' : 'No products found. Click "Add Product" to start.')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
