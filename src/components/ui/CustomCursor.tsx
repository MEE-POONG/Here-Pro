"use client";
import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible && e.clientX > 5 && e.clientX < window.innerWidth - 5) {
                setIsVisible(true);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        // Don't show custom cursor on touch devices potentially
        return null;
    }

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, .cursor-hover {
          cursor: none;
        }
      `}</style>
            <div
                className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            >
                {/* Main Dot */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 backdrop-blur-sm transition-all duration-300 ease-out border border-white/50 ${isHovering ? 'w-8 h-8 bg-transparent border-primary border-2' : 'w-4 h-4'}`}></div>

                {/* Trailing Dot (optional, for effect) */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 transition-all duration-500 ease-out ${isHovering ? 'w-12 h-12 opacity-30 delay-75' : 'w-2 h-2 opacity-0'}`}></div>
            </div>
        </>
    );
}
