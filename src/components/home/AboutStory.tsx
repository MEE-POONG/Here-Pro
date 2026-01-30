"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutStory() {
    const { t } = useLanguage();

    const parseMarkdown = (text: string) => {
        // Simple parser for bold text (**text**)
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full opacity-50 blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{t.about.title}</h2>
                        <h3 className="text-4xl font-bold text-gray-900 mb-6">{t.about.heading}</h3>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-4">
                                {parseMarkdown(t.about.p1)}
                            </p>
                            <p>
                                {parseMarkdown(t.about.p2)}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">{t.about.policy_title}</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">✓</div>
                                    <span className="text-gray-700">{parseMarkdown(t.about.policies.quality)}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">✓</div>
                                    <span className="text-gray-700">{parseMarkdown(t.about.policies.innovation)}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">✓</div>
                                    <span className="text-gray-700">{parseMarkdown(t.about.policies.transparency)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-900 text-white rounded-[3rem] p-10 md:p-16 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">{t.about.founder_quote}</h3>
                        <span className="text-gray-400 font-medium tracking-wider uppercase text-sm">{t.about.founder_role}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
