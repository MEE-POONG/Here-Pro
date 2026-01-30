"use client";
import React, { useState } from 'react';
import { MessageSquareText, Phone, X, MessageSquare } from 'lucide-react';

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Expanded Options */}
            <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-20'}`}>

                {/* Line */}
                <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-[#06c755] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <span className="font-bold text-[10px] md:text-xs">LINE</span>
                </a>

                {/* Messenger */}
                <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-[#0084ff] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <MessageSquare size={20} className="md:w-6 md:h-6" />
                </a>

                {/* Call Center */}
                <a href="tel:+6621234567" className="w-12 h-12 md:w-14 md:h-14 bg-[#ff9800] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <Phone size={20} className="md:w-6 md:h-6" />
                </a>
            </div>
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(77,208,225,0.4)] transition-all duration-300 ${isOpen ? 'bg-gray-800 rotate-90 scale-90' : 'bg-gradient-to-tr from-[#26c6da] to-[#4dd0e1] hover:scale-110'}`}
            >
                {isOpen ? (
                    <X size={28} className="text-white" />
                ) : (
                    <MessageSquareText size={32} className="text-white fill-white/20" />
                )}
            </button>
        </div>
    );
}
