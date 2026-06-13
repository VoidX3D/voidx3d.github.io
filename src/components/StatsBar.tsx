import { motion } from 'framer-motion'

interface Props { repoCount: number; starCount: number; followerCount: number; following: number }

export default function StatsBar({ repoCount, starCount, followerCount, following }: Props) {
  const stats = [
    { label: 'Repositories', value: repoCount },
    { label: 'Total Stars', value: starCount },
    { label: 'Followers', value: followerCount },
    { label: 'Following', value: following },
  ]

  return (
    <section className="py-12" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
