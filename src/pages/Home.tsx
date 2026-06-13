import { useGithubData } from '../hooks/useGithubData'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import ProjectGrid from '../components/ProjectGrid'
import Skills, { computeLanguageStats } from '../components/Skills'
import Timeline from '../components/Timeline'
import DistroShowcase from '../components/DistroShowcase'
import Activity from '../components/Activity'
import Contact from '../components/Contact'

export default function Home() {
  const { user, repos, featured, totalStars, languages, loading, error } = useGithubData('VoidX3D')
  const langStats = repos.length > 0 ? computeLanguageStats(repos) : undefined

  return (
    <>
      {/* Hero is always static — no loading dependency */}
      <Hero />

      {/* Error banner */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="text-xs text-center rounded-lg p-3" style={{ background: 'rgba(255,107,107,0.08)', color: 'var(--accent3)', border: '1px solid rgba(255,107,107,0.15)' }}>
            {error}
          </div>
        </div>
      )}

      {/* Stats — shows zeros while loading, fills in when data arrives */}
      <StatsBar
        repoCount={user?.public_repos ?? 0}
        starCount={totalStars}
        followerCount={user?.followers ?? 0}
        following={user?.following ?? 0}
      />

      {/* Project grid — empty while loading, fills in when repos arrive */}
      <ProjectGrid repos={repos} featured={featured} languages={languages} />

      {/* Skills — real language stats when data is available, static otherwise */}
      <Skills languageStats={langStats} />

      {/* All static sections below */}
      <Timeline />
      <DistroShowcase />
      <Activity />
      <Contact />
    </>
  )
}
