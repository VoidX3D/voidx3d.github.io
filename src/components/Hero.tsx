import { useEffect, useRef } from 'react'
import { animate, stagger, scroll, createTimeline } from 'animejs'
import { motion } from 'framer-motion'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = createTimeline({ defaults: { ease: 'out(3)' } })

    timeline
      .add(titleRef.current, { opacity: [0, 1], translateY: [30, 0], duration: 800 })
      .add(subtitleRef.current, { opacity: [0, 1], translateY: [15, 0], duration: 600 }, '-=400')
      .add(ctaRef.current, { opacity: [0, 1], translateY: [10, 0], duration: 500 }, '-=300')

    return () => timeline.seek(timeline.totalDuration)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Haikei-style blob scene decoration */}
      <div className="haikei-blob" style={{ top: '-20%', right: '-15%', width: '700px', height: '700px' }}>
        <svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
          <path d="M350,50C450,50 550,100 600,200C650,300 650,400 600,500C550,600 450,650 350,650C250,650 150,600 100,500C50,400 50,300 100,200C150,100 250,50 350,50Z" fill="url(#blobGrad)" opacity="0.3">
            <animate attributeName="d" dur="20s" repeatCount="indefinite"
              values="M350,50C450,50 550,100 600,200C650,300 650,400 600,500C550,600 450,650 350,650C250,650 150,600 100,500C50,400 50,300 100,200C150,100 250,50 350,50Z;
                      M350,30C480,10 580,120 620,240C660,360 630,480 560,580C490,680 380,650 280,620C180,590 100,500 80,380C60,260 120,130 220,60C270,30 310,40 350,30Z;
                      M350,50C450,50 550,100 600,200C650,300 650,400 600,500C550,600 450,650 350,650C250,650 150,600 100,500C50,400 50,300 100,200C150,100 250,50 350,50Z"/>
          </path>
        </svg>
      </div>

      <div className="haikei-blob" style={{ bottom: '-20%', left: '-10%', width: '500px', height: '500px' }}>
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <path d="M250,30C380,30 470,130 470,250C470,370 380,470 250,470C120,470 30,370 30,250C30,130 120,30 250,30Z" fill="url(#blobGrad2)" opacity="0.2">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M250,30C380,30 470,130 470,250C470,370 380,470 250,470C120,470 30,370 30,250C30,130 120,30 250,30Z;
                      M250,50C360,10 490,140 480,260C470,380 370,450 250,460C130,470 40,390 40,270C40,150 140,90 250,50Z;
                      M250,30C380,30 470,130 470,250C470,370 380,470 250,470C120,470 30,370 30,250C30,130 120,30 250,30Z"/>
          </path>
        </svg>
      </div>

      {/* Haikei layered waves at bottom */}
      <div className="haikei-waves">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 L1200,200 L0,200 Z" fill="url(#waveGrad)">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 L1200,200 L0,200 Z;
                      M0,120 C200,60 400,140 600,80 C800,120 1000,70 1200,110 L1200,200 L0,200 Z;
                      M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 L1200,200 L0,200 Z"/>
          </path>
          <path d="M0,140 C200,100 400,160 600,120 C800,80 1000,140 1200,100 L1200,200 L0,200 Z" fill="url(#waveGrad)" opacity="0.5">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M0,140 C200,100 400,160 600,120 C800,80 1000,140 1200,100 L1200,200 L0,200 Z;
                      M0,110 C200,150 400,90 600,140 C800,110 1000,150 1200,120 L1200,200 L0,200 Z;
                      M0,140 C200,100 400,160 600,120 C800,80 1000,140 1200,100 L1200,200 L0,200 Z"/>
          </path>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4 gradient-text"
          style={{ backgroundSize: '200% 200%' }}
        >
          VoidX3D
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base font-mono text-white/30 tracking-[0.3em] uppercase mb-4"
        >
          Full Stack Developer &bull; Backend Engineer &bull; AI Builder
        </p>

        <div ref={ctaRef}>
          <p className="text-white/25 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            Shipping production-ready systems, building AI-powered APIs, and crafting open-source tools from Pokhara, Nepal.
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {[
              { icon: '🇳🇵', label: 'Pokhara, Nepal' },
              { icon: '⚡', label: '17 y/o' },
              { icon: '🎓', label: 'Self-Taught' },
              { icon: '🎌', label: 'Bleach Fan' },
            ].map((item, i) => (
              <span
                key={item.label}
                className="px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-white/30 text-xs"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {item.icon} {item.label}
              </span>
            ))}
          </div>

          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-white/40 text-sm hover:border-[#00D9FF]/30 hover:text-white/70 hover:bg-[#00D9FF]/[0.03] transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-4 h-7 rounded-full border border-white/10 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
