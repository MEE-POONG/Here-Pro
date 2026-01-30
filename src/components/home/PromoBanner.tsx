"use client";
import { Factory, Award, Globe, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function PromoBanner() {
    const { t } = useLanguage();

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3">
                        <div className="w-12 h-12 bg-[#4dd0e1]/10 rounded-full flex items-center justify-center text-[#0097a7]">
                            <Factory size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{t.promo.factory}</h4>
                            <p className="text-gray-500 text-sm">{t.promo.factory_desc}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3">
                        <div className="w-12 h-12 bg-[#4dd0e1]/10 rounded-full flex items-center justify-center text-[#0097a7]">
                            <Users size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{t.promo.team}</h4>
                            <p className="text-gray-500 text-sm">{t.promo.team_desc}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3">
                        <div className="w-12 h-12 bg-[#4dd0e1]/10 rounded-full flex items-center justify-center text-[#0097a7]">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{t.promo.global}</h4>
                            <p className="text-gray-500 text-sm">{t.promo.global_desc}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3">
                        <div className="w-12 h-12 bg-[#4dd0e1]/10 rounded-full flex items-center justify-center text-[#0097a7]">
                            <Award size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{t.promo.certified}</h4>
                            <p className="text-gray-500 text-sm">{t.promo.certified_desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
