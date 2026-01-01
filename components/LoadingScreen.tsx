"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function LoadingScreen() {
    return (
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-electric-blue via-cyber-purple to-cyber-magenta py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl"
                style={{ fontFamily: 'var(--font-orbitron)' }}
            >
                Build Muscles <br /> The Right Way
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 1,
                    duration: 0.5,
                }}
                className="mt-6 text-white/50 text-lg md:text-xl text-center"
            >
                Loading your experience...
            </motion.p>

            {/* Loading bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
            >
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 2.5,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}
                    className="h-full bg-gradient-to-r from-electric-blue via-cyber-purple to-cyber-magenta rounded-full"
                />
            </motion.div>
        </LampContainer>
    );
}
