'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'glass border-b border-electric-blue/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl md:text-3xl font-bold tracking-tight gradient-text-shimmer" style={{ fontFamily: 'var(--font-stalinist)' }}>
            DROPSET
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-magenta group-hover:w-full transition-all duration-300"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#stats">Stats</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#community">Community</NavLink>
        </div>

        {/* CTA Button - Desktop */}
        <motion.button
          onClick={() => {
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="hidden md:block btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Join the waitlist"
        >
          Join Waitlist <span className="ml-1">→</span>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-magenta origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-magenta"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-magenta origin-center"
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden glass"
      >
        <div className="px-8 py-6 flex flex-col gap-4">
          <NavLink href="#features" mobile>Features</NavLink>
          <NavLink href="#stats" mobile>Stats</NavLink>
          <NavLink href="#gallery" mobile>Gallery</NavLink>
          <NavLink href="#community" mobile>Community</NavLink>
          <button
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              setMenuOpen(false)
            }}
            className="btn-primary mt-4"
          >
            Join Waitlist →
          </button>
        </div>
      </motion.div>

      {/* Mobile CTA - Sticky Bottom */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 glass border-t border-electric-blue/20"
      >
        <button
          onClick={() => {
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="w-full btn-primary"
          aria-label="Join the waitlist"
        >
          Join Waitlist →
        </button>
      </motion.div>
    </motion.nav>
  )
}

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  return (
    <motion.a
      href={href}
      className={`relative group font-medium transition-colors ${mobile ? 'text-xl text-white/90' : 'text-lg text-white/70 hover:text-white'
        }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-magenta group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}
