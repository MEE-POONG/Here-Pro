"use client";
import React, { use, useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Info, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts } from '@/actions/admin-actions';

export default function CategoryPage(props: { params: Promise<{ category: string }> }) {
    const { t } = useLanguage();
    const params = use(props.params);
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

    // Filter products by category slug (we need to match the slug from URL to category.slug in DB)
    // However, DB product has `category: { name, slug }`.
    // Let's assume `getProducts` includes category.
    const categoryProducts = products.filter(p => p.category?.slug === params.category || p.category?.name.toLowerCase().replace(/ /g, '-') === params.category);

    const title = categoryProducts.length > 0 ? categoryProducts[0].category.name : params.category.replace(/-/g, ' ').toUpperCase();

    if (isLoading) return <div className="min-h-screen bg-white"><Header /><div className="pt-32 text-center">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-28 pb-20 md:pt-32">
                <div className="container-custom">
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors hover:translate-x-[-4px]">
                            <ArrowLeft size={20} /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">{title}</h1>
                        <p className="text-gray-500 text-lg">Discover our premium range of {title}</p>
                    </div>

                    {categoryProducts.length === 0 ? (
                        <div className="py-20 text-center bg-gray-50 rounded-3xl">
                            <p className="text-xl text-gray-500">No products found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                            {categoryProducts.map((product) => (
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
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
