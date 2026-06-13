import { motion } from 'framer-motion'
import { TIMELINE } from '../data/site'
import { useInView } from '../hooks/useInView'

export default function Timeline() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--border)' }} ref={ref}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >Journey</motion.p>

        <div className="relative pl-10">
          <div className="timeline-line" />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year + item.title}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="timeline-dot absolute" style={{ left: '-38px', top: '4px' }}>
                <div className="timeline-dot-inner" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{item.year}</span>
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
