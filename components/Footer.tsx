'use client'

import { motion, useInView } from 'framer-motion'
import { Suspense, useRef, useState } from 'react'
import { slideUpVariants, staggerChildrenVariants } from '@/lib/framer-variants'
import dynamic from 'next/dynamic'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const NeonGrid = dynamic(
  () => import('@/three/NeonGrid').then((mod) => mod.NeonGrid),
  { ssr: false }
)

const socialLinks = [
  { name: 'Twitter', icon: '𝕏', href: '#' },
  { name: 'Instagram', icon: '📸', href: '#' },
  { name: 'Discord', icon: '💬', href: '#' },
  { name: 'YouTube', icon: '▶️', href: '#' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
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

    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer id="waitlist" className="relative bg-cyber-dark text-white overflow-hidden">
      {/* 3D Neon Grid Background */}
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <NeonGrid />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Final CTA */}
        <div className="section-container min-h-screen flex items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerChildrenVariants}
            className="w-full max-w-4xl mx-auto text-center space-y-12"
          >
            <motion.div variants={slideUpVariants} className="space-y-6">
              <h2 className="headline-xl">
                <span className="text-white">DROP</span>
                <span className="gradient-text">SET</span>
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90">
                Ready to track like you mean it?
              </p>
              <p className="body-text text-white/60 max-w-2xl mx-auto">
                Join the waitlist. Be first to experience the most powerful gym tracker built for serious athletes.
              </p>
            </motion.div>

            <motion.form
              variants={slideUpVariants}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="cyber-input flex-1 text-center sm:text-left"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary text-lg px-10 disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
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
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="glass-card !p-4 inline-flex items-center gap-3 mx-auto"
              >
                <span className="w-8 h-8 rounded-full bg-cyber-green/20 flex items-center justify-center text-cyber-green text-lg">✓</span>
                <span className="text-cyber-green text-lg font-medium">Welcome to the waitlist! Check your email.</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="glass-card !p-4 inline-flex items-center gap-3 mx-auto"
              >
                <span className="w-8 h-8 rounded-full bg-cyber-pink/20 flex items-center justify-center text-cyber-pink text-lg">×</span>
                <span className="text-cyber-pink text-lg font-medium">Something went wrong. Try again.</span>
              </motion.div>
            )}

            {/* Social Links */}
            <motion.div variants={slideUpVariants} className="flex justify-center gap-4 pt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="glass-card !p-4 hover:!border-electric-blue/50 transition-all duration-300 group"
                  aria-label={link.name}
                >
                  <span className="text-2xl group-hover:scale-110 inline-block transition-transform">{link.icon}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold gradient-text mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  DROPSET
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Serious tracking for serious workouts. Built for athletes who demand more.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Product</h4>
                <ul className="space-y-3">
                  <li><a href="#features" className="text-white/50 hover:text-electric-blue transition-colors">Features</a></li>
                  <li><a href="#stats" className="text-white/50 hover:text-electric-blue transition-colors">Stats</a></li>
                  <li><a href="#community" className="text-white/50 hover:text-electric-blue transition-colors">Community</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">About</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Blog</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Careers</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Press</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Terms</a></li>
                  <li><a href="#" className="text-white/50 hover:text-electric-blue transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © 2026 Dropset. Built for athletes, by athletes.
              </p>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
