import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site'

export default function Footer() {
  const socialLinks = [
    { label: 'GitHub', href: SITE.social.github },
    { label: 'X / Twitter', href: SITE.social.x },
    { label: 'Instagram', href: SITE.social.instagram },
    { label: 'Email', href: `mailto:${SITE.email}` },
    { label: 'Portfolio', href: SITE.social.portfolio },
    { label: 'Buy Me a Coffee', href: SITE.social.coffee },
  ]

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <Link to="/" className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            void<span style={{ color: 'var(--accent)' }}>x</span>3d
          </Link>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <motion.span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: 'var(--accent4)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available
          </div>
        </div>

        <div className="text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
          Built with <span style={{ color: 'var(--accent3)' }}>❤️</span> by{' '}
          <strong style={{ color: 'var(--text-secondary)' }}>VoidX3D</strong> &bull; Pokhara, Nepal &bull; &copy; 2024&ndash;2026
        </div>
      </div>
    </footer>
  )
}
