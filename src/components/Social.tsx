import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const links = [
  { label: 'GitHub', href: 'https://github.com/VoidX3D', icon: '🐙' },
  { label: 'X (Twitter)', href: 'https://x.com/VortexVoidX3D', icon: '𝕏' },
  { label: 'Instagram', href: 'https://www.instagram.com/sincerebhattarai/', icon: '📸' },
  { label: 'Email', href: 'mailto:playzspreston2@gmail.com', icon: '✉️' },
  { label: 'Portfolio', href: 'https://ubuntu-sincere.vercel.app', icon: '🌐' },
  { label: 'Buy Me a Coffee', href: 'https://www.buymeacoffee.com/voidx3d', icon: '☕' },
]

export default function Social() {
  const { ref, inView } = useInView(0.3)

  return (
    <section className="py-12 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 text-sm hover:border-white/10 hover:text-white/70 hover:bg-white/[0.04] transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <span>{link.icon}</span>
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
