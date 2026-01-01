"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { MoveUpRight as ArrowIcon } from "lucide-react";

interface VisualItem {
    key: number;
    url: string;
    label: string;
}

const visualData: VisualItem[] = [
    {
        key: 1,
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        label: "Power Zone",
    },
    {
        key: 2,
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
        label: "Cardio Arena",
    },
    {
        key: 3,
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
        label: "Iron Paradise",
    },
    {
        key: 4,
        url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
        label: "Beast Mode",
    },
    {
        key: 5,
        url: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80",
        label: "Elite Training",
    },
];

const ImageReveal: React.FC = () => {
    const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
    const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

    useEffect(() => {
        const updateScreen = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    const onMouseTrack = (e: React.MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };

    const onHoverActivate = (item: VisualItem) => {
        setFocusedItem(item);
    };

    const onHoverDeactivate = () => {
        setFocusedItem(null);
    };

    return (
        <>
            <div
                className="relative w-full min-h-fit"
                onMouseMove={onMouseTrack}
                onMouseLeave={onHoverDeactivate}
            >
                {visualData.map((item, index) => (
                    <div
                        key={item.key}
                        className={`px-8 md:px-16 lg:px-24 py-6 cursor-pointer relative sm:flex items-center justify-between group transition-all duration-300 hover:bg-white/5 ${index !== visualData.length - 1 ? 'border-b border-white/10' : ''
                            }`}
                        onMouseEnter={() => onHoverActivate(item)}
                    >
                        {!isLargeScreen && (
                            <img
                                src={item.url}
                                className="w-full h-52 object-cover rounded-xl mb-4"
                                alt={item.label}
                            />
                        )}
                        <div className="flex items-center gap-4">
                            <span className="text-white/30 text-sm font-mono w-8">
                                {String(item.key).padStart(2, '0')}
                            </span>
                            <h2
                                className={`uppercase md:text-7xl lg:text-8xl sm:text-4xl text-2xl font-bold leading-[100%] transition-all duration-300 ${focusedItem?.key === item.key
                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-cyber-purple to-cyber-magenta"
                                        : "text-white/80 group-hover:text-white"
                                    }`}
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                {item.label}
                            </h2>
                        </div>
                        <button
                            className={`sm:flex hidden items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ease-out border-2 ${focusedItem?.key === item.key
                                    ? "bg-gradient-to-r from-electric-blue to-cyber-magenta border-transparent text-cyber-dark scale-110"
                                    : "border-white/20 text-white/60 group-hover:border-electric-blue/50 group-hover:text-white"
                                }`}
                        >
                            <ArrowIcon className="w-7 h-7" />
                        </button>
                        <div
                            className={`h-[2px] bg-gradient-to-r from-electric-blue via-cyber-purple to-cyber-magenta absolute bottom-0 left-0 transition-all duration-500 ease-out ${focusedItem?.key === item.key ? "w-full" : "w-0"
                                }`}
                        />
                    </div>
                ))}
            </div>

            {/* Floating image - rendered at body level via portal-like fixed positioning */}
            <AnimatePresence>
                {isLargeScreen && focusedItem && (
                    <motion.img
                        src={focusedItem.url}
                        alt={focusedItem.label}
                        className="fixed z-[9999] object-cover w-[350px] h-[450px] rounded-2xl pointer-events-none"
                        style={{
                            left: smoothX,
                            top: smoothY,
                            x: "-50%",
                            y: "-50%",
                            boxShadow: "0 0 80px rgba(0, 212, 255, 0.4), 0 0 150px rgba(255, 0, 255, 0.25)",
                            border: "2px solid rgba(0, 212, 255, 0.4)",
                        }}
                        initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageReveal;
