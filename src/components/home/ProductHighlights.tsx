import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

const products = [
    { id: 1, name: 'Vit C + Selenium', category: 'Immunity', badge: 'Best Seller', color: 'bg-amber-50' },
    { id: 2, name: 'Gluta Complex', category: 'Skin Health', badge: 'New', color: 'bg-rose-50' },
    { id: 3, name: 'Zinc Advanced', category: 'Performance', color: 'bg-blue-50' },
    { id: 4, name: 'Multi-B Plus', category: 'Brain Health', color: 'bg-indigo-50' },
];

export function ProductHighlights() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-accent font-bold uppercase tracking-wider text-sm">Our Recommendations</span>
                        <h2 className="text-4xl font-serif font-bold text-primary mt-2">Recommended for You</h2>
                    </div>
                    <Link href="#" className="hidden md:flex items-center gap-2 text-secondary font-medium hover:text-accent transition-colors cursor-hover">
                        View All Products <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div key={product.id} className={`group cursor-pointer animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                            <TiltCard>
                                <div className={`h-80 rounded-3xl ${product.color} relative overflow-hidden mb-6 border border-gray-100`}>
                                    <div className="absolute top-4 left-4 z-10">
                                        {product.badge && (
                                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Mock Product Bottle */}
                                        <div className="w-32 h-48 bg-white rounded-lg shadow-md border border-gray-100 flex flex-col items-center justify-center p-2 transform transition-transform duration-500">
                                            <span className="text-2xl font-serif font-bold text-primary">Here</span>
                                            <div className="w-16 h-1 w-full bg-accent/50 my-2"></div>
                                            <span className="text-[10px] text-center text-gray-500 leading-tight">{product.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                            <span className="block text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">{product.category}</span>
                            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="#" className="inline-flex items-center gap-2 text-primary font-bold">
                        View All Products <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
