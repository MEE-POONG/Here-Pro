"use client";
import React, { useRef, useState } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    max?: number; // max tilt rotation
    perspective?: number;
}

export function TiltCard({ children, className = "", max = 15, perspective = 1000 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Calculate tilt
        const tiltX = (0.5 - y) * max; // Rotate around X axis (up/down)
        const tiltY = (x - 0.5) * max; // Rotate around Y axis (left/right) - inverted logic fixed

        // Invert X because moving mouse up (lower Y) should tilt top away? 
        // Usually:
        // Mouse Top (y=0) -> RotateX positive (top away/bottom close)? Or RotateX positive is bottom away.
        // CSS rotateX: positive = top moves back. 
        // Let's standard: Mouse Top -> top tilts DOWN (closer)? No, usually tilts towards mouse?
        // Let's stick to simple: Mouse Top -> rotateX(positive).

        // Correct math for "Look at mouse":
        // Mouse Left (x=0) -> rotateY(-deg) [Left side goes down/back?] -> Actually standard tilt is Left side comes UP?
        // Let's use standard logic: 
        const rX = (0.5 - y) * (max * 2); // +/- max
        const rY = (x - 0.5) * (max * 2);

        setStyle({
            transform: `perspective(${perspective}px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.05, 1.05, 1.05)`,
            transition: 'none',
        });

        // Glare position
        setGlareStyle({
            opacity: 0.25 + (Math.abs(x - 0.5) + Math.abs(y - 0.5)) * 0.5,
            transform: `translate(${x * 100}%, ${y * 100}%)`,
            transition: 'none',
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: 'all 0.5s ease',
        });
        setGlareStyle({
            opacity: 0,
            transition: 'all 0.5s ease',
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 preserve-3d ${className}`}
            style={{ transformStyle: 'preserve-3d', ...style }}
        >
            {children}
            {/* Glare Effect */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden rounded-[inherit]"
            >
                <div
                    className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/40 to-transparent blur-md rounded-full pointer-events-none"
                    style={glareStyle}
                />
            </div>
        </div>
    );
}
