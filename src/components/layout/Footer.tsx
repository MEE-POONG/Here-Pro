"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white py-20 mt-20 relative overflow-hidden">
            {/* Background Image Overlay Simulation */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm text-gray-300">

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.about_us}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.resources}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/categories/medicine" className="hover:text-white transition-colors">Medicine</Link></li>
                            <li><Link href="/categories/supplements" className="hover:text-white transition-colors">Supplements</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.community}</h4>
                        <ul className="space-y-3">
                            <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="hover:text-white transition-colors">Brand Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded-sm"></div>
                        <span className="font-bold text-white">Here-Pro</span>
                    </div>
                    <p>{t.footer.rights}</p>
                    <div className="flex gap-4 text-white">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Fb</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">In</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
