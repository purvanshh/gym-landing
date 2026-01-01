'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'

const quotes = [
  {
    text: "Finally, an app that gets it. No fluff, just raw tracking power.",
    author: "Marcus T.",
    role: "Powerlifter",
    rating: 5,
    avatar: "🏋️"
  },
  {
    text: "RPE tracking changed my training. I'm pushing smarter, not just harder.",
    author: "Sarah K.",
    role: "CrossFit Athlete",
    rating: 5,
    avatar: "🔥"
  },
  {
    text: "The community feature is gold. Learning from lifters worldwide daily.",
    author: "James R.",
    role: "Bodybuilder",
    rating: 5,
    avatar: "💪"
  },
]

export default function Quotes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="community" className="section-white relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyber-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <motion.div variants={slideUpVariants} className="space-y-4">
            <h2 className="headline-md">
              <span className="text-white">FULLY</span>
              <br />
              <span className="gradient-text">FEATURED.</span>
            </h2>
            <p className="body-text text-white/60 max-w-2xl mx-auto">
              See what athletes are saying about their training transformation.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={slideUpVariants} className="relative">
            <div className="glass-card !p-8 md:!p-12 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-cyber-magenta/5" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="relative space-y-8"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: quotes[activeIndex].rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-3xl"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed">
                    "{quotes[activeIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue to-cyber-magenta flex items-center justify-center text-3xl shadow-lg shadow-electric-blue/20">
                      {quotes[activeIndex].avatar}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{quotes[activeIndex].author}</p>
                      <p className="text-white/50">{quotes[activeIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                      ? 'w-12 bg-gradient-to-r from-electric-blue to-cyber-magenta'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`View quote ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={slideUpVariants} className="space-y-6 pt-8">
            <p className="body-text text-white/60">
              Join the community of serious athletes who track what matters.
            </p>
            <motion.button
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
