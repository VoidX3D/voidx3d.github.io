import { motion } from 'framer-motion'
import { SITE } from '../data/site'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--text-tertiary)' }}>GitHub</a>
            <a href={SITE.social.x} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--text-tertiary)' }}>X</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Instagram</a>
            <a href={`mailto:${SITE.email}`} className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Email</a>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--accent4)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for collaboration
          </div>
        </div>
        <div className="text-center text-[11px]" style={{ color: 'var(--text-quaternary)' }}>
          Built with <span style={{ color: 'var(--accent3)' }}>❤️</span> by <strong style={{ color: 'var(--text-secondary)' }}>VoidX3D</strong> &bull; Pokhara, Nepal 🇳🇵 &bull; &copy; 2024&ndash;2026
        </div>
      </div>
    </footer>
  )
}
