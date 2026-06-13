import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animate, stagger } from 'animejs'
import ProjectCard from './ProjectCard'

interface Repo { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; forks_count: number; topics: string[] }
interface Props { repos: Repo[]; featured: Repo[]; languages: string[] }

export default function ProjectGrid({ repos, featured, languages }: Props) {
  const [filter, setFilter] = useState('all')
  const headerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => filter === 'all' ? repos : repos.filter(r => r.language === filter), [repos, filter])

  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current.querySelectorAll('.filter-btn'), { opacity: [0, 1], translateY: [8, 0], delay: stagger(0.04), duration: 400, ease: 'out(3)' })
    }
  }, [])

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        {featured.length > 0 && (
          <>
            <p className="section-label">Featured</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
              {featured.map((repo, i) => <ProjectCard key={repo.id} repo={repo} featured index={i} />)}
            </div>
          </>
        )}

        <div className="flex items-center justify-between gap-4 mb-5" ref={headerRef}>
          <p className="section-label" style={{ marginBottom: 0 }}>All Projects <span style={{ color: 'var(--text-quaternary)', fontWeight: 400 }}>({repos.length})</span></p>
          <div className="flex gap-1.5 flex-wrap justify-end">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            {languages.map(lang => (
              <button key={lang} className={`filter-btn ${filter === lang ? 'active' : ''}`} onClick={() => setFilter(lang)}>{lang}</button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <AnimatePresence mode="popLayout">
            {filtered.map((repo, i) => (
              <motion.div key={`${repo.id}-${filter}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2, delay: Math.min(i * 0.015, 0.2) }}>
                <ProjectCard repo={repo} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && <p className="text-xs text-center py-10" style={{ color: 'var(--text-tertiary)' }}>No projects for this language.</p>}
      </div>
    </section>
  )
}
