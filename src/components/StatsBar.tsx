import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

interface Props {
  repoCount: number
  starCount: number
  followerCount: number
  following: number
}

export default function StatsBar({ repoCount, starCount, followerCount, following }: Props) {
  const { ref, inView } = useInView(0.3)

  const stats = [
    { label: 'Repositories', value: repoCount, suffix: '+' },
    { label: 'Total Stars', value: starCount, suffix: '+' },
    { label: 'Followers', value: followerCount, suffix: '' },
    { label: 'Following', value: following, suffix: '' },
  ]

  return (
    <section ref={ref} className="py-12 border-y border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] bg-clip-text text-transparent"
                >
                  {inView ? stat.value : 0}{stat.suffix}
                </motion.span>
              </div>
              <div className="text-xs text-white/30 uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
