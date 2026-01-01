'use client'

import { motion, useInView } from 'framer-motion'
import { Suspense, useRef } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'
import dynamic from 'next/dynamic'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const AssemblingGym = dynamic(
  () => import('@/three/AssemblingGym').then((mod) => mod.AssemblingGym),
  { ssr: false }
)

const features = [
  {
    title: 'Supersets',
    description: 'Chain exercises together. Track rest, reps, and intensity—all in one flow.',
    icon: '🔗',
    gradient: 'from-electric-blue to-cyber-cyan',
  },
  {
    title: 'Dropsets',
    description: 'Log progressive weight drops. No more mental math mid-set.',
    icon: '📉',
    gradient: 'from-cyber-magenta to-cyber-pink',
  },
  {
    title: 'RPE Tracking',
    description: 'Rate your effort. Build better programs based on how you feel.',
    icon: '💪',
    gradient: 'from-cyber-purple to-electric-blue',
  },
  {
    title: 'Pace Monitoring',
    description: 'Track your tempo. Optimize time under tension for maximum gains.',
    icon: '⏱️',
    gradient: 'from-cyber-pink to-cyber-magenta',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Adapt your program on the fly. Life happens, your training adjusts.',
    icon: '📅',
    gradient: 'from-cyber-cyan to-cyber-green',
  },
  {
    title: 'Community',
    description: 'Share workouts. Learn from lifters worldwide. Get motivated daily.',
    icon: '🌍',
    gradient: 'from-cyber-purple to-cyber-magenta',
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="features" className="section-white relative min-h-screen flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-electric-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Canvas */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] order-2 lg:order-1"
            aria-hidden="true"
          >
            <Suspense fallback={
              <div className="canvas-fallback">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
                  <p className="gradient-text font-medium">Loading...</p>
                </div>
              </div>
            }>
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }} dpr={[1, 2]}>
                <AssemblingGym />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerChildrenVariants}
            className="space-y-12 order-1 lg:order-2"
          >
            <motion.div variants={slideUpVariants} className="space-y-4">
              <h2 className="headline-lg">
                <span className="text-white">NOT JUST</span>
                <br />
                <span className="gradient-text">REPS.</span>
              </h2>
              <p className="body-text text-white/60 max-w-xl">
                Track like you mean it. Every metric that matters for serious progress.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={slideUpVariants}
                  className="glass-card group cursor-pointer"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
