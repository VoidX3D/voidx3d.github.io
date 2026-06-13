import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const distros = [
  { name: 'Ubuntu', arch: 'x86_64 / aarch64', kernel: '6.8+', exp: 'Daily driver, 3+ years', icon: '', color: '#E95420' },
  { name: 'Arch Linux', arch: 'x86_64', kernel: 'latest', exp: 'Rolling release, 1+ year', icon: '', color: '#1793D1' },
  { name: 'Debian', arch: 'x86_64 / aarch64', kernel: '6.1+', exp: 'Servers & containers', icon: '', color: '#A81D33' },
  { name: 'Fedora', arch: 'x86_64', kernel: '6.8+', exp: 'Workstation, 6+ months', icon: '', color: '#51A2DA' },
  { name: 'Pop!_OS', arch: 'x86_64', kernel: '6.8+', exp: 'Dev environment, 1+ year', icon: '', color: '#48A9C5' },
  { name: 'Manjaro', arch: 'x86_64', kernel: 'latest', exp: 'Gaming, 6+ months', icon: '', color: '#35BF5C' },
  { name: 'NixOS', arch: 'x86_64', kernel: '6.6+', exp: 'Experimental, learning', icon: '', color: '#7EBAE4' },
  { name: 'Void Linux', arch: 'x86_64 / musl', kernel: '6.6+', exp: 'Minimal setups', icon: '', color: '#478061' },
]

export default function DistroShowcase() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--border)' }} ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >Linux Journey</motion.p>

        <motion.p
          className="text-sm mb-8 max-w-xl"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          From Ubuntu to Arch — distros I&apos;ve daily-driven, experimented with, and learned from across x86_64 and ARM.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {distros.map((d, i) => (
            <motion.div
              key={d.name}
              className="card p-4 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-2">{d.icon}</div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{d.name}</div>
              <div className="text-[10px] mb-2 font-mono" style={{ color: d.color }}>{d.arch}</div>
              <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{d.exp}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
