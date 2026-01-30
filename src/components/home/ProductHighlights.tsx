"use client";
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/admin-actions';
import Image from 'next/image';

export function ProductHighlights() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getProducts();
                // Take first 4 as recommendations
                setProducts(data.slice(0, 4));
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const colors = ['bg-amber-50', 'bg-rose-50', 'bg-blue-50', 'bg-indigo-50'];

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-secondary font-bold uppercase tracking-wider text-sm">Our Recommendations</span>
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">Recommended for You</h2>
                    </div>
                    <Link href="/categories/all" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                        View All Products <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[450px] bg-gray-50 animate-pulse rounded-[3rem]" />
                        ))
                    ) : (
                        products.map((product, index) => (
                            <div key={product.id} className={`group cursor-pointer animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                                <Link href={`/products/${product.id}`}>
                                    <TiltCard>
                                        <div className={`h-80 rounded-[2.5rem] ${colors[index % colors.length]} relative overflow-hidden mb-6 border border-white/60 shadow-sm group-hover:shadow-xl transition-all duration-500`}>
                                            <div className="absolute top-4 left-4 z-10">
                                                {product.featured && (
                                                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                                                        FEATURED
                                                    </span>
                                                )}
                                            </div>

                                            <div className="absolute inset-0 p-8 flex items-center justify-center">
                                                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700">
                                                    <Image
                                                        src={product.image || '/placeholder.png'}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain drop-shadow-2xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                    <span className="block text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-[0.2em]">{product.category?.name || 'General'}</span>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

                {!isLoading && products.length === 0 && (
                    <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <p className="text-gray-400">Add products in Admin panel to see them here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
