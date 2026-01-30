"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'; // Reuse for consistency
import { TiltCard } from '@/components/ui/TiltCard';
import { Target, Heart, Shield, Users, Trophy, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; // Use existing hook

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-gradient-brand overflow-hidden">
                    {/* Animated blobs reused for theme consistency */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-pulse-slow delay-300"></div>

                    <div className="container-custom relative z-10 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-bold tracking-wider mb-4 animate-fade-in-up backdrop-blur-sm border border-white/30">
                            {t.about.new_hero.badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up delay-100 drop-shadow-sm">
                            {t.about.new_hero.title_line1} <br />
                            <span className="text-white">{t.about.new_hero.title_highlight}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed font-medium">
                            {t.about.new_hero.subtitle}
                        </p>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up delay-300">
                            {[
                                { label: t.about.new_hero.stats.customers, value: "10k+" },
                                { label: t.about.new_hero.stats.sold, value: "50k+" },
                                { label: t.about.new_hero.stats.experience, value: "5+" },
                                { label: t.about.new_hero.stats.team, value: "25+" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-blue-50 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <InfiniteMarquee />

                {/* Mission & Vision Section */}
                <section className="py-20 bg-white">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider">
                                    <Target size={20} />
                                    <span>{t.about.mission.badge}</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                    {t.about.mission.title_prefix} <span className="text-primary">{t.about.mission.title_highlight}</span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">{t.about.mission.desc1}</p>
                                <p className="text-gray-600 text-lg leading-relaxed">{t.about.mission.desc2}</p>

                                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: Shield, text: t.about.mission.points.quality },
                                        { icon: Heart, text: t.about.mission.points.customer },
                                        { icon: Lightbulb, text: t.about.mission.points.innovation },
                                        { icon: Users, text: t.about.mission.points.community }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-700 font-bold">
                                            <item.icon className="text-primary" size={20} />
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Card */}
                            <div className="relative">
                                <TiltCard perspective={2000} className="w-full">
                                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white">
                                        {/* Mock Image Placeholder since real assets might not be available */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
                                            <div className="text-center">
                                                <span className="block text-6xl">🏢</span>
                                                <span className="block mt-4 text-sm font-medium">{t.about.mission.hq_mockup}</span>
                                            </div>
                                        </div>

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                                    <Trophy size={24} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{t.about.mission.award_title}</div>
                                                    <div className="text-xs text-gray-500">{t.about.mission.award_desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>

                                {/* Decorative Graphic */}
                                <div className="absolute -z-10 top-1/2 right-0 -mr-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values / Why Choose Us */}
                <section className="py-20 bg-gray-50 relative overflow-hidden">
                    {/* Bg Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
                        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
                        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.about.why_choose.title}</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">{t.about.why_choose.subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: t.about.why_choose.items.science.title,
                                    desc: t.about.why_choose.items.science.desc,
                                    icon: "🔬",
                                    color: "bg-blue-50 border-blue-100"
                                },
                                {
                                    title: t.about.why_choose.items.pure.title,
                                    desc: t.about.why_choose.items.pure.desc,
                                    icon: "🌿",
                                    color: "bg-green-50 border-green-100"
                                },
                                {
                                    title: t.about.why_choose.items.transparent.title,
                                    desc: t.about.why_choose.items.transparent.desc,
                                    icon: "📋",
                                    color: "bg-amber-50 border-amber-100"
                                }
                            ].map((item, idx) => (
                                <TiltCard key={idx} perspective={1000} className="h-full">
                                    <div className={`${item.color} border p-8 rounded-[2rem] h-full transition-all hover:shadow-xl`}>
                                        <div className="text-5xl mb-6">{item.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Teaser (Mock) */}
                <section className="py-20 bg-white">
                    <div className="container-custom">
                        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
                            <div>
                                <span className="text-primary font-bold uppercase tracking-wider text-sm">{t.about.team.badge}</span>
                                <h2 className="text-3xl font-bold text-gray-900 mt-2">{t.about.team.title}</h2>
                            </div>
                            <button className="px-6 py-2 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all">
                                {t.about.team.btn_join}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="group">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative cursor-pointer">
                                        {/* Gradient Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                                        {/* Mock Image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl group-hover:scale-110 transition-transform duration-500">
                                            👤
                                        </div>

                                        <div className="absolute bottom-4 left-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white">
                                            <span className="text-xs font-bold uppercase tracking-wider">{t.about.team.connect}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">Member {i}</h3>
                                    <p className="text-primary font-medium text-sm">Position Title</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
