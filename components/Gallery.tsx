'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'
import ImageReveal from '@/components/ui/image-reveal'

export default function Gallery() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section id="gallery" className="relative min-h-screen flex flex-col items-center justify-center overflow-visible py-20 bg-transparent">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyber-magenta/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={staggerChildrenVariants}
                className="w-full relative z-10"
            >
                {/* Header - constrained width */}
                <motion.div variants={slideUpVariants} className="text-center space-y-4 mb-16 px-8 max-w-7xl mx-auto">
                    <h2 className="headline-lg">
                        <span className="text-white">EXPLORE</span>
                        <br />
                        <span className="gradient-text">THE VIBE.</span>
                    </h2>
                    <p className="body-text text-white/60 max-w-2xl mx-auto">
                        Step into our world-class training facilities. Experience the future of fitness.
                    </p>
                </motion.div>

                {/* Full-width gallery */}
                <motion.div
                    variants={slideUpVariants}
                    className="w-full"
                >
                    <div className="w-full border-y border-white/10 bg-cyber-deep/30 backdrop-blur-sm">
                        <ImageReveal />
                    </div>
                </motion.div>

                <motion.p
                    variants={slideUpVariants}
                    className="text-center text-white/40 text-sm mt-8 px-8"
                >
                    Hover over items to preview • Click to explore
                </motion.p>
            </motion.div>
        </section>
    )
}
