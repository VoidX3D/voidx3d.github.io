import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useSearch } from '../context/SearchContext'
import { SITE } from '../data/site'

export default function Navbar() {
  const { setQuery: onSearch } = useSearch()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const handleSearch = (val: string) => {
    setSearchVal(val)
    onSearch(val)
    if (val && pathname !== '/projects') navigate('/projects')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16" style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold tracking-tight shrink-0" style={{ color: 'var(--text)' }}>
            void<span style={{ color: 'var(--accent)' }}>x</span>3d
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {SITE.nav.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  color: pathname === link.href ? 'var(--text)' : 'var(--text-secondary)',
                  background: pathname === link.href ? 'var(--bg-elevated)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search - always visible on desktop */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search projects..."
                value={searchVal}
                onChange={e => handleSearch(e.target.value)}
                className="w-[140px] bg-transparent text-sm outline-none"
                style={{ color: 'var(--text)' }}
                onFocus={() => searchRef.current?.select()}
              />
              {searchVal && (
                <button onClick={() => handleSearch('')} style={{ color: 'var(--text-tertiary)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile menu + search */}
            <div className="flex sm:hidden items-center gap-1">
              {/* Search toggle */}
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onClick={() => { setOpen(true); setTimeout(() => searchRef.current?.focus(), 100) }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 5h16M4 12h16M4 19h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 sm:hidden"
            style={{ background: 'var(--bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Mobile search */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-[80%]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-tertiary)' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchVal}
                onChange={e => handleSearch(e.target.value)}
                className="flex-1 bg-transparent text-base outline-none"
                style={{ color: 'var(--text)' }}
                autoFocus
              />
            </div>

            {SITE.nav.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xl font-medium"
                style={{ color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
