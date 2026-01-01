import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Utility function to create scroll-triggered animations
export const createScrollAnimation = (
  element: string | Element,
  animationProps: gsap.TweenVars,
  scrollTriggerProps?: ScrollTrigger.Vars
) => {
  return gsap.to(element, {
    ...animationProps,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerProps,
    },
  })
}

// Text reveal animation
export const animateTextReveal = (element: string | Element) => {
  return gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
}

// Stagger animation for multiple elements
export const animateStagger = (elements: string | Element[], delay = 0.05) => {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
}

export { gsap, ScrollTrigger }
