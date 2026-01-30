"use client";
import { useEffect, useRef } from "react";

export function InfiniteMarquee() {
    return (
        <div className="relative w-full overflow-hidden bg-primary py-4">
            {/* Gradient Overlay for fade effect */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-primary to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-primary to-transparent z-10"></div>

            <div className="flex whitespace-nowrap animate-marquee">
                {/* Repeater items - enough to cover screen */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center mx-4 text-white font-bold text-lg tracking-widest uppercase gap-8">
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> Premium Quality</span>
                        <span className="text-white/40">•</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> Certified Standard</span>
                        <span className="text-white/40">•</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> 100% Organic Ingredients</span>
                        <span className="text-white/40">•</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> Fast Delivery</span>
                        <span className="text-white/40">•</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
