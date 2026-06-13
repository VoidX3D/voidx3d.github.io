import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          className="text-6xl font-black gradient-text mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ backgroundSize: '200% 200%' }}
        >
          404
        </motion.h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>This page doesn&apos;t exist.</p>
        <Link to="/" className="btn-primary">
          Go Home
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
