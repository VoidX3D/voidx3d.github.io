import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'GitHub', href: 'https://github.com/VoidX3D' },
]

export default function Navbar() {
  const { ref, inView } = useInView(0.1)

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-sm font-semibold text-white/60 tracking-wider">
          void<span className="text-[#00D9FF]">x</span>3d
        </a>
        <div className="flex items-center gap-6">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-white/30 hover:text-white/70 transition-colors"
              {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
