import { motion } from 'framer-motion'
import { SKILLS } from '../data/site'
import { useInView } from '../hooks/useInView'

export default function Skills() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >Skills &amp; Technologies</motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              className="card p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: gi * 0.06 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>{group.category}</p>
              <div className="space-y-2.5">
                {group.items.map(item => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                      <span style={{ color: 'var(--text-quaternary)' }}>{item.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: gi * 0.06 + item.name.length * 0.02 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
