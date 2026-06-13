import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--text-secondary)' }}>
            Full Stack Developer &bull; Backend Engineer &bull; AI Builder
          </p>
        </motion.div>

          <motion.h1
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight leading-none mb-5 gradient-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ backgroundSize: '200% 200%' }}
        >
          {SITE.name}
        </motion.h1>

          <motion.p
          className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 flex-wrap mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: '🇳🇵', label: 'Pokhara, Nepal' },
            { icon: '⚡', label: '17 y/o' },
            { icon: '🎓', label: 'Self-Taught' },
            { icon: '🎌', label: 'Bleach Fan' },
          ].map(item => (
            <span
              key={item.label}
              className="px-3 py-1.5 rounded-full text-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              {item.icon} {item.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/projects" className="btn-primary text-sm">
            Explore Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: 'var(--text)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85 0 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.04 10.04 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
            GitHub
          </a>

          <a href={SITE.social.x} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: 'var(--text)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-4 h-7 rounded-full flex items-start justify-center p-1" style={{ border: '1px solid var(--border)' }}>
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: 'var(--text-quaternary)' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
