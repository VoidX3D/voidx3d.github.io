import { motion } from 'framer-motion'
import Skills from '../components/Skills'
import Timeline from '../components/Timeline'
import { SITE } from '../data/site'

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl sm:text-4xl font-black tracking-tight gradient-text mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundSize: '200% 200%' }}
        >
          About
        </motion.h1>

        <motion.div
          className="card p-6 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            Hey! I'm VoidX3D — a 17-year-old Full Stack Developer & Backend Engineer from Pokhara, Nepal. With 3+ years of self-taught experience, I build production-ready systems, engineer AI-powered APIs, and ship real projects that matter.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            My coding journey started at age 12 with HTML/CSS, building my first calculator. Since then, it's been a non-stop grind across 14+ languages, countless frameworks, and a growing collection of shipped projects — from Android music players to anime tracking platforms, admin dashboards to streaming APIs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: 'Location', value: SITE.location },
            { label: 'Age', value: '17' },
            { label: 'Experience', value: '3+ Years' },
            { label: 'Languages', value: '14+' },
          ].map(stat => (
            <div key={stat.label} className="card p-4 text-center">
              <div className="text-lg font-bold gradient-text">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div className="card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Philosophy</p>
          <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
            "Code with passion, debug with patience, deploy with pride. Every bug is a lesson, every project is progress. Just like Ichigo's journey in Bleach — always pushing limits, never giving up."
          </p>
        </motion.div>
      </div>

      <Skills />
      <Timeline />
    </div>
  )
}
