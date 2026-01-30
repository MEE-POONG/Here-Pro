"use client";
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Send, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { createContactMessage } from '@/actions/admin-actions';

export default function ContactPage() {
    const { t, language } = useLanguage();

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20"> {/* PT-20 to clear fixed header */}

                {/* 1. Top Section: Contact Info */}
                <div className="py-20 border-b border-gray-100">
                    <div className="container-custom text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.info.title}</h1>
                        <p className="text-xl text-primary font-bold">{t.contact.info.company}</p>
                    </div>

                    <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Contact Details */}
                        <div className="space-y-6 md:pl-10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-600 leading-relaxed">
                                        123 Wellness Building, Sukhumvit Road,<br />
                                        Bangkok, Thailand 10110
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-800 text-lg">+66 2 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-800">contact@here-pro.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-600">{t.contact.info.hours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Social & Follow */}
                        <div className="flex flex-col items-center md:items-start space-y-6 md:border-l md:border-gray-100 md:pl-20">
                            <h3 className="font-bold text-gray-900 text-lg">{t.contact.info.follow}</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                                    <Youtube size={20} />
                                </a>
                            </div>

                            {/* Order Channels as Badges */}
                            <div className="pt-6">
                                <h3 className="font-bold text-gray-900 text-sm mb-4">{t.contact.order_channels}</h3>
                                <div className="flex flex-wrap gap-2">
                                    <a href="https://shopee.co.th" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-200 text-xs font-bold hover:bg-orange-100 transition-colors">
                                        Shopee <ExternalLink size={12} />
                                    </a>
                                    <a href="https://lazada.co.th" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors">
                                        Lazada <ExternalLink size={12} />
                                    </a>
                                    <a href="https://tiktok.com" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-100 transition-colors">
                                        TikTok <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Map Section */}
                <div className="py-20 bg-gradient-to-b from-[#f0f9ff] to-white relative overflow-hidden">
                    <div className="container-custom text-center mb-10 relative z-10">
                        <h2 className="text-3xl font-bold text-primary mb-3">{t.contact.map.title}</h2>
                        <p className="text-gray-500">{t.contact.map.subtitle}</p>
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 relative">
                            <div className="relative rounded-[2rem] overflow-hidden h-[450px] w-full bg-gray-100 group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15503.655866164215!2d100.5898384!3d13.7225152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e4fe2155555%3A0x6e32230000000000!2sThong%20Lor!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                ></iframe>

                                {/* Overlay Button */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        className="bg-gradient-to-r from-blue-600 to-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        <ExternalLink size={18} /> {t.contact.map.open_map}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                </div>

                {/* 3. Contact Form Section */}
                <div className="bg-[#f8fdff] py-20">
                    <div className="container-custom">
                        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row">

                            {/* Left: Image */}
                            <div className="md:w-5/12 relative min-h-[400px]">
                                <Image
                                    src="/2f20cd83f9076d1e95d49eed49c6ea9e.jpg"
                                    alt="Contact Support"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/80 opacity-60"></div>
                                <div className="absolute bottom-10 left-10 text-white z-10 p-4">
                                    <h3 className="text-3xl font-bold mb-2">We&apos;re here to help</h3>
                                    <p className="opacity-90">Send us a message and we&apos;ll reply as soon as possible.</p>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="md:w-7/12 p-8 md:p-14">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contact.form.title}</h3>
                                <form
                                    action={async (formData) => {
                                        try {
                                            const res = await createContactMessage(formData);
                                            alert(language === 'th' ? "ส่งข้อความเรียบร้อยแล้ว!" : "Message sent successfully!");
                                            (document.getElementById('contact-form') as HTMLFormElement).reset();
                                        } catch (e: any) {
                                            console.error("Form Error:", e);
                                            alert((language === 'th' ? "เกิดข้อผิดพลาด: " : "An error occurred: ") + (e.message || "Unknown error"));
                                        }
                                    }}
                                    id="contact-form"
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">{t.contact.form.name}</label>
                                        <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 font-medium" />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">{t.contact.form.email}</label>
                                            <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">{t.contact.form.phone}</label>
                                            <input name="phone" type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">{t.contact.form.subject}</label>
                                        <input name="subject" type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">{t.contact.form.message}</label>
                                        <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 font-medium"></textarea>
                                    </div>

                                    <button type="submit" className="bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary-dark transition-all w-full md:w-auto min-w-[160px] shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                                        <Send size={18} />
                                        {t.contact.form.submit}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
