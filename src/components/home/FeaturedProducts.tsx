"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/admin-actions';

export function FeaturedProducts() {
    const { t, language } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="py-24 text-center">Loading products...</div>;

    return (
        <section className="py-24 bg-white" id="featured-products">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="max-w-xl">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">{t.products.collection}</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.products.catalog}</h2>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={language === 'th' ? 'ค้นหาสินค้าสุขภาพของคุณ...' : 'Search your health products...'}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:bg-white outline-none transition-all shadow-sm text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <Link href="#" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all underline md:no-underline">
                        {t.products.all_products} <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {filteredProducts.map((product) => (
                        <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                            className="group relative bg-white rounded-2xl md:rounded-3xl border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
                                <Image
                                    src={product.image || '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                                    <span className="bg-white/90 backdrop-blur text-gray-900 text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-sm">
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="hidden md:flex bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Info size={16} /> {t.products.view_details}
                                    </span>
                                </div>
                            </div>

                            <div className="p-3 md:p-6 mt-auto">
                                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50 flex items-center text-primary text-xs md:text-sm font-bold gap-1 md:gap-2">
                                    {t.products.read_more} <ArrowRight size={14} className="md:w-4 md:h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {language === 'th' ? 'ไม่พบสินค้าที่คุณค้นหา' : 'No products found'}
                        </h3>
                        <p className="text-gray-500">
                            {language === 'th' ? `ไม่พบสิ่งที่คุณต้องการสำหรับ "${searchTerm}" โปรดลองใหม่อีกครั้ง` : `we couldn't find anything matching "${searchTerm}". Please try again.`}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
