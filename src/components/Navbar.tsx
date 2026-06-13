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
  const [searchOpen, setSearchOpen] = useState(false)
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

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname])

  const handleSearch = (val: string) => {
    setSearchVal(val)
    onSearch?.(val)
    if (val && pathname !== '/projects') navigate('/projects')
  }

  return (
    <>
      <nav className={`navbar`} style={{
        height: scrolled ? '56px' : '64px',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-base font-bold tracking-wide shrink-0" style={{ color: 'var(--text)' }}>
            void<span style={{ color: 'var(--accent)' }}>x</span>3d
          </Link>

          {/* Desktop nav + search */}
          <div className="hidden md:flex items-center gap-1">
            {SITE.nav.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link px-3 py-1.5 rounded-lg text-sm"
                style={{
                  color: pathname === link.href ? 'var(--text)' : 'var(--text-tertiary)',
                  background: pathname === link.href ? 'var(--bg-elevated)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" style={{ width: searchOpen ? '200px' : '36px', transition: 'width 0.3s' }}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search projects..."
                value={searchVal}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => { if (!searchVal) setSearchOpen(false) }}
                className="w-full h-9 rounded-lg text-xs outline-none bg-transparent border transition-all"
                style={{
                  paddingLeft: searchOpen ? '32px' : '8px',
                  borderColor: searchOpen ? 'var(--border-hover)' : 'transparent',
                  color: 'var(--text)',
                  cursor: searchOpen ? 'text' : 'pointer',
                }}
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2"
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ color: 'var(--text-tertiary)', opacity: searchOpen ? 1 : 0.4 }}
                onClick={() => { setSearchOpen(true); searchRef.current?.focus() }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchVal && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-tertiary)' }}
                  onClick={() => handleSearch('')}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0"
              style={{ color: 'var(--text-tertiary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="w-9 h-9 rounded-lg flex md:hidden items-center justify-center"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: 'var(--bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {SITE.nav.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-lg font-medium"
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
