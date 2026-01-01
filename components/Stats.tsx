'use client'

import { motion, useInView } from 'framer-motion'
import { Suspense, useRef } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'
import dynamic from 'next/dynamic'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const BarChart = dynamic(
  () => import('@/three/BarChart').then((mod) => mod.BarChart),
  { ssr: false }
)

const stats = [
  {
    value: '190',
    unit: 'lbs',
    label: 'Average Weight Logged',
    icon: '🏋️',
    color: 'electric-blue',
  },
  {
    value: '32:08',
    unit: 'min/km',
    label: 'Average Pace',
    icon: '⏱️',
    color: 'cyber-magenta',
  },
  {
    value: '+28%',
    unit: '',
    label: 'Community Growth',
    icon: '📈',
    color: 'cyber-purple',
  },
  {
    value: '4.9',
    unit: '/5.0',
    label: 'User Rating',
    icon: '⭐',
    color: 'cyber-pink',
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="stats" className="section-black relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyber-magenta/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerChildrenVariants}
            className="space-y-12"
          >
            <motion.div variants={slideUpVariants} className="space-y-4">
              <h2 className="headline-lg">
                <span className="text-white">ATHLETIC</span>
                <br />
                <span className="gradient-text">BY DESIGN.</span>
              </h2>
              <p className="body-text text-white/60 max-w-xl">
                Join thousands of serious lifters tracking real progress with real data.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={slideUpVariants}
                  className="glass-card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{stat.icon}</span>
                    <div className={`w-2 h-2 rounded-full bg-${stat.color} animate-pulse`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold gradient-text" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        {stat.value}
                      </span>
                      <span className="text-lg text-white/40">{stat.unit}</span>
                    </div>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>

                  {/* Progress bar decoration */}
                  <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${70 + index * 8}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r from-electric-blue to-cyber-magenta rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px]"
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
              <Canvas camera={{ position: [0, 3, 8], fov: 50 }} dpr={[1, 2]}>
                <BarChart />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
