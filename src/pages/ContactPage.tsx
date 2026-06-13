import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import { SITE } from '../data/site'

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl sm:text-4xl font-black tracking-tight gradient-text mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Contact
        </motion.h1>
        <motion.p
          className="text-sm mb-8"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          className="grid sm:grid-cols-3 gap-3 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
            { label: 'GitHub', value: '@VoidX3D', href: SITE.social.github },
            { label: 'X', value: '@VortexVoidX3D', href: SITE.social.x },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="card p-4 text-center hover:-translate-y-1 transition-transform">
              <div className="text-xs font-semibold gradient-text">{item.label}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{item.value}</div>
            </a>
          ))}
        </motion.div>
      </div>
      <Contact />
    </div>
  )
}
