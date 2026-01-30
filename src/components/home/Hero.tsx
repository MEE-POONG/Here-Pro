"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, ShieldCheck, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

const SLIDES = [
    {
        id: 1,
        image: "/1356cdcaefe2356df18e5ba31f088507.jpg_720x720q80.jpg",
        title: { en: "Vit C + Selenium", th: "วิตามินซี + ซีลีเนียม" },
        subtitle: { en: "Premium Dietary Supplement", th: "ผลิตภัณฑ์เสริมอาหารพรีเมียม" },
        badge: { en: "Best Seller", th: "ขายดีอันดับ 1" }
    },
    {
        id: 2,
        image: "/cover-viruno-1024x538.webp", // Assuming this is wide, might need object-cover adjustment
        title: { en: "Immunity Plus Viruno", th: "อิมมูนิตี้ พลัส วิรูโน" },
        subtitle: { en: "Advanced Viral Defense", th: "สมุนไพรปกป้องขั้นสูง" },
        badge: { en: "New Arrival", th: "สินค้าใหม่" }
    },
    // Add more slides if you want, pointing to other images
    {
        id: 4,
        image: "/vn-11134207-7r98o-lntxcsf53ipm2c.jpeg",
        title: { en: "Vit C + Selenium", th: "วิตามินซี + ซีลีเนียม" }, // Reusing text for demo
        subtitle: { en: "Boost Immunity", th: "เสริมภูมิคุ้มกันแข็งแรง" },
        badge: { en: "Hot Promotion", th: "โปรโมชั่นแรง" }
    }
];

import { getBanners } from '@/actions/admin-actions'; // Add import

// ...

export function Hero() {
    const { t, language } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<any[]>(SLIDES); // Use state for slides

    useEffect(() => {
        async function loadBanners() {
            try {
                const data = await getBanners();
                if (data && data.length > 0) {
                    // Filter active and map to shape
                    const activeBanners = data.filter((b: any) => b.active).map((b: any) => ({
                        id: b.id,
                        image: b.image,
                        title: { en: b.title, th: b.title },
                        subtitle: { en: b.subtitle || '', th: b.subtitle || '' },
                        badge: { en: b.badge || '', th: b.badge || '' }
                    }));
                    if (activeBanners.length > 0) {
                        setSlides(activeBanners);
                    }
                }
            } catch (e) {
                console.error("Failed to load banners", e);
            }
        }
        loadBanners();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length); // Use slides.length
        }, 5000);
        return () => clearInterval(timer);
    }, [slides]); // Add dependency

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative bg-gradient-to-br from-[#4dd0e1]/20 to-[#b2dfdb]/30 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            {/* Background shapes - Animated */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#4dd0e1]/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-pulse-slow delay-300"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content - Staggered Fade In */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e0f7fa] text-[#0097a7] rounded-full text-xs font-bold uppercase tracking-wider shadow-sm animate-fade-in-up">
                            <ShieldCheck size={14} />
                            <span>{t.hero.certified}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up delay-100 mb-4">
                            {t.hero.title_line1} <br />
                            <span className="text-primary">{t.hero.title_line2}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-lg leading-relaxed animate-fade-in-up delay-200">
                            {t.hero.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-5 pt-8 animate-fade-in-up delay-300">
                            <Link href="#products" className="bg-gradient-to-r from-primary to-accent text-white text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full font-bold shadow-xl shadow-cyan-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                {t.hero.btn_discover} <ArrowRight size={20} />
                            </Link>
                            <Link href="/about" className="px-8 py-3 md:px-10 md:py-4 rounded-full font-bold border-2 border-[#4dd0e1] text-[#0097a7] hover:bg-[#e0f7fa] transition-all">
                                {t.hero.btn_about}
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 pt-10 mt-10 border-t border-gray-200/50 animate-fade-in-up delay-300">
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3">
                                <Zap className="text-primary" size={24} />
                                <span className="text-xs md:text-sm font-bold text-gray-700">{t.hero.badges.effective}</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3">
                                <ShieldCheck className="text-primary" size={24} />
                                <span className="text-xs md:text-sm font-bold text-gray-700">{t.hero.badges.certified}</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3">
                                <Star className="text-primary" size={24} />
                                <span className="text-xs md:text-sm font-bold text-gray-700">{t.hero.badges.premium}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Carousel - Stacked Cards */}
                    <div className="relative h-[550px] flex items-center justify-center animate-fade-in-up delay-200 lg:-mr-12 perspective-1000">
                        <div className="relative w-full max-w-md h-full flex items-center justify-center">
                            {slides.map((slide, index) => {
                                // Calculate position relative to current slide
                                const length = slides.length;
                                const offset = (index - currentSlide + length) % length;

                                // Determine styles based on position
                                let cardStyle = "absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-bottom";
                                let contentStyle = "opacity-100";

                                if (offset === 0) {
                                    // Active Card (Front)
                                    cardStyle += " z-30 scale-100 translate-y-0 rotate-0 opacity-100 hover:scale-105 hover:-translate-y-2";
                                } else if (offset === 1) {
                                    // Next Card (Behind Right)
                                    cardStyle += " z-20 scale-90 translate-x-12 translate-y-4 rotate-6 opacity-60 cursor-pointer hover:opacity-80 hover:rotate-12";
                                } else if (offset === length - 1) {
                                    // Prev Card (Behind Left)
                                    cardStyle += " z-10 scale-90 -translate-x-12 translate-y-4 -rotate-6 opacity-60 cursor-pointer hover:opacity-80 hover:-rotate-12";
                                } else {
                                    // Hidden others
                                    cardStyle += " z-0 scale-50 opacity-0 pointer-events-none";
                                }

                                return (
                                    <div
                                        key={slide.id}
                                        className={`${cardStyle}`}
                                        onClick={() => {
                                            if (offset === 1) nextSlide();
                                            if (offset === length - 1) prevSlide();
                                        }}
                                    >
                                        <div className="w-[85vw] max-w-[320px] md:w-[380px] bg-white rounded-[2.5rem] p-6 pb-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60 backdrop-blur-sm select-none">
                                            {/* Image Area */}
                                            <div className="relative aspect-square bg-gray-50 rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                                                <Image
                                                    src={slide.image}
                                                    alt={language === 'th' ? slide.title.th : slide.title.en}
                                                    fill
                                                    className="object-cover"
                                                    priority={offset === 0}
                                                />
                                                {/* Overlay Gradient on Inactive */}
                                                <div className={`absolute inset-0 bg-white/20 transition-opacity duration-500 ${offset === 0 ? 'opacity-0' : 'opacity-100'}`}></div>
                                            </div>

                                            {/* Content */}
                                            <div className={`text-center transition-all duration-500 ${offset === 0 ? 'opacity-100 transform-none' : 'opacity-50 grayscale'}`}>
                                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                                                    {language === 'th' ? slide.title.th : slide.title.en}
                                                </h3>
                                                <p className="text-gray-500 mt-2 text-sm font-medium">
                                                    {language === 'th' ? slide.subtitle.th : slide.subtitle.en}
                                                </p>
                                                <span className={`inline-block mt-4 text-xs font-bold px-3 py-1 rounded-full ${offset === 0 ? 'bg-primary/10 text-primary animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                                                    {language === 'th' ? slide.badge.th : slide.badge.en}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentSlide ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
