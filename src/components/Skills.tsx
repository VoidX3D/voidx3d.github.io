import { motion } from 'framer-motion'
import { SKILLS } from '../data/site'
import { useInView } from '../hooks/useInView'

interface Repo { stargazers_count: number; language: string | null }

interface Props {
  languageStats?: { name: string; level: number }[]
}

function computeLanguageStats(repos: Repo[]): { name: string; level: number }[] {
  const counts: Record<string, { repos: number; stars: number }> = {}
  for (const r of repos) {
    if (!r.language) continue
    if (!counts[r.language]) counts[r.language] = { repos: 0, stars: 0 }
    counts[r.language].repos++
    counts[r.language].stars += r.stargazers_count
  }
  const items = Object.entries(counts)
    .map(([name, v]) => ({ name, level: Math.round(Math.min(v.repos * 12 + v.stars * 2, 100)) }))
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
  const max = Math.max(...items.map(i => i.level), 1)
  return items.map(i => ({ ...i, level: Math.round((i.level / max) * 90 + 10) }))
}

export default function Skills({ languageStats }: Props) {
  const { ref, inView } = useInView(0.1)

  const groups = SKILLS.map(g => {
    if (g.category === 'Languages' && languageStats) {
      return { ...g, items: languageStats }
    }
    return g
  })

  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >Skills &amp; Technologies</motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {groups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="card p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: gi * 0.06 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>{group.category}</p>
              <div className="space-y-2.5">
                {group.items.map(item => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>{item.level}%</span>
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

export { computeLanguageStats }
