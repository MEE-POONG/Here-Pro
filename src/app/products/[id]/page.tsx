"use client";
import React, { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/data/mockProducts';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductDetail(props: { params: Promise<{ id: string }> }) {
    const { t, language } = useLanguage();
    const params = use(props.params); // Unwrap params with use() since it's a promise in Next 15, or async/await in SC. But this is Client Component now due to hook usage.

    const product = products.find((p) => p.id.toString() === params.id);

    if (!product) {
        notFound();
    }

    const title = language === 'th' && product.titleTH ? product.titleTH : product.title;
    const category = language === 'th' && product.categoryTH ? product.categoryTH : product.category;
    const details = language === 'th' && product.detailsTH ? product.detailsTH : product.details;
    const benefits = language === 'th' && product.benefitsTH ? product.benefitsTH : product.benefits;

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container-custom">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
                        <ArrowLeft size={20} /> {t.detail.back}
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Product Image */}
                        <div className="bg-gray-50 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden">
                            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                                <Image
                                    src={product.image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Information */}
                        <div className="pt-4">
                            <span className="text-primary font-bold uppercase tracking-wider text-sm bg-blue-50 px-3 py-1 rounded-full">
                                {category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 mb-8">
                                {title}
                            </h1>

                            {/* Key Benefits */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {benefits?.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                                        <CheckCircle size={18} className="text-primary flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white border-t border-b border-gray-100 py-8 mb-8 space-y-6">
                                <h3 className="text-xl font-bold text-gray-900">{t.detail.details_title}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {details}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Link href="/#contact" className="w-full md:w-auto bg-gray-900 text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3">
                                    {t.detail.inquiry} <ArrowRight size={20} />
                                </Link>
                                <p className="text-center md:text-left text-sm text-gray-500">
                                    <Info size={14} className="inline mr-1" />
                                    {t.detail.bulk_info}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
