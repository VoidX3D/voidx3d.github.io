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
  const { user, repos, featured, totalStars, languages, loading } = useGithubData('VoidX3D')
  const langStats = repos.length > 0 ? computeLanguageStats(repos) : undefined

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ border: '1px solid var(--border)' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--accent)' }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
              <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <StatsBar
        repoCount={user?.public_repos ?? 0}
        starCount={totalStars}
        followerCount={user?.followers ?? 0}
        following={user?.following ?? 0}
      />
      <ProjectGrid repos={repos} featured={featured} languages={languages} />
      <Skills languageStats={langStats} />
      <Timeline />
      <DistroShowcase />
      <Activity />
      <Contact />
    </>
  )
}
