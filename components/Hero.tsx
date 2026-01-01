'use client'

import { motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'
import dynamic from 'next/dynamic'

// Dynamically import 3D components for better code splitting
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const DumbbellScene = dynamic(
  () => import('@/three/Dumbbells').then((mod) => mod.DumbbellScene),
  { ssr: false }
)

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section className="section-black relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-blue w-96 h-96 -top-48 -left-48" style={{ animationDelay: '0s' }} />
        <div className="floating-orb floating-orb-magenta w-72 h-72 top-1/4 right-0" style={{ animationDelay: '2s' }} />
        <div className="floating-orb floating-orb-purple w-80 h-80 bottom-0 left-1/3" style={{ animationDelay: '4s' }} />
      </div>

      <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildrenVariants}
          className="space-y-8 z-10"
        >
          <motion.h1 variants={slideUpVariants} className="headline-xl">
            <span className="text-white">Serious</span>
            <br />
            <span className="gradient-text">tracking</span>
            <br />
            <span className="text-white">for serious</span>
            <br />
            <span className="text-white">workouts.</span>
          </motion.h1>

          <motion.p variants={slideUpVariants} className="body-text max-w-xl text-white/70">
            Supersets, dropsets, RPE, pace, community—ditch the notebook. Track like a pro, lift like a beast.
          </motion.p>

          <motion.form
            variants={slideUpVariants}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="cyber-input flex-1"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join Waitlist →'
              )}
            </button>
          </motion.form>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyber-green font-medium flex items-center gap-2"
            >
              <span className="inline-block w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center text-cyber-green">✓</span>
              You're on the list! Check your email.
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyber-pink font-medium flex items-center gap-2"
            >
              <span className="inline-block w-5 h-5 rounded-full bg-cyber-pink/20 flex items-center justify-center text-cyber-pink">×</span>
              Something went wrong. Try again.
            </motion.p>
          )}

          <motion.div variants={slideUpVariants} className="flex items-center gap-8 text-white/50">
            <div className="flex items-center gap-3 glass-card !p-3 !rounded-xl">
              <div className="text-2xl">⭐</div>
              <div>
                <div className="font-bold text-white">4.9</div>
                <div className="text-sm">App Store</div>
              </div>
            </div>
            <div className="flex items-center gap-3 glass-card !p-3 !rounded-xl">
              <div className="text-2xl">🔥</div>
              <div>
                <div className="font-bold text-white">10k+</div>
                <div className="text-sm">Athletes</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[400px] lg:h-[600px] canvas-container"
          aria-hidden="true"
        >
          <Suspense
            fallback={
              <div className="canvas-fallback">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
                  <p className="gradient-text font-medium">Loading 3D experience...</p>
                </div>
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
            >
              <DumbbellScene />
            </Canvas>
          </Suspense>

          {/* Fallback for no WebGL */}
          <noscript>
            <div className="canvas-fallback">
              <p>3D graphics require JavaScript</p>
            </div>
          </noscript>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-electric-blue/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-electric-blue"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
