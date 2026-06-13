import ShaderBg from './components/ShaderBg'
import ParticleField from './components/ParticleField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import ProjectGrid from './components/ProjectGrid'
import About from './components/About'
import Social from './components/Social'
import Footer from './components/Footer'
import { useGithubData } from './hooks/useGithubData'

export default function App() {
  const { user, repos, featured, totalStars, languages, loading } = useGithubData('VoidX3D')

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border border-white/[0.06] rounded-full mx-auto mb-3 flex items-center justify-center">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <path d="M12 2a10 10 0 019.95 9" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-white/15 text-sm">Loading projects from GitHub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <ShaderBg />
      <div className="grid-overlay" />
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsBar
          repoCount={user?.public_repos ?? 0}
          starCount={totalStars}
          followerCount={user?.followers ?? 0}
          following={user?.following ?? 0}
        />
        <ProjectGrid repos={repos} featured={featured} languages={languages} />
        <About />
        <Social />
      </main>
      <Footer />
    </div>
  )
}
