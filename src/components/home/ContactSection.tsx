"use client";
import { Phone, MapPin, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function ContactSection() {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container-custom">
                <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-12 md:p-16 bg-primary text-white">
                            <span className="opacity-80 font-bold uppercase tracking-wider text-sm mb-2 block">{t.contact.get_touch}</span>
                            <h2 className="text-4xl font-bold mb-8">{t.contact.title}</h2>
                            <p className="text-white/80 mb-12 text-lg">
                                {t.contact.subtitle}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 mt-1 text-white" />
                                    <div>
                                        <h4 className="font-bold text-lg">{t.contact.phone}</h4>
                                        <p className="opacity-90">+66 2 123 4567</p>
                                        <p className="opacity-90">+66 89 999 8888</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 mt-1 text-white" />
                                    <div>
                                        <h4 className="font-bold text-lg">{t.contact.address}</h4>
                                        <p className="opacity-90">
                                            123 Wellness Building, Sukhumvit Road,<br />
                                            Bangkok, Thailand 10110
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 mt-1 text-white" />
                                    <div>
                                        <h4 className="font-bold text-lg">{t.contact.email}</h4>
                                        <p className="opacity-90">contact@here-pro.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 md:p-16 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.order_channels}</h3>
                            <p className="text-gray-600 mb-8">
                                {t.contact.order_desc}
                            </p>

                            <div className="space-y-4">
                                <a href="https://shopee.co.th" target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group">
                                    <span className="font-bold text-gray-800">{t.contact.btn_shopee}</span>
                                    <ExternalLink size={20} className="text-gray-400 group-hover:text-orange-500" />
                                </a>
                                <a href="https://lazada.co.th" target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <span className="font-bold text-gray-800">{t.contact.btn_lazada}</span>
                                    <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-500" />
                                </a>
                                <a href="https://tiktok.com" target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-100 transition-all group">
                                    <span className="font-bold text-gray-800">{t.contact.btn_tiktok}</span>
                                    <ExternalLink size={20} className="text-gray-400 group-hover:text-black" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
