"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/admin-actions';

export function FeaturedProducts() {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) return <div className="py-24 text-center">Loading products...</div>;

    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">{t.products.collection}</span>
                        <h2 className="text-4xl font-bold text-gray-900">{t.products.catalog}</h2>
                    </div>
                    <Link href="#" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        {t.products.all_products} <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                    {products.map((product) => (
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
            </div>
        </section>
    );
}
