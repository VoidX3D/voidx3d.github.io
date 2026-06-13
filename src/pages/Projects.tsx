import { motion } from 'framer-motion'
import ProjectGrid from '../components/ProjectGrid'
import { useGithubData } from '../hooks/useGithubData'

export default function Projects() {
  const { repos, featured, languages } = useGithubData('VoidX3D')

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl sm:text-4xl font-black tracking-tight gradient-text mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Projects
        </motion.h1>
        <motion.p
          className="text-sm mb-8"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Every repository I&apos;ve built — from AI-powered APIs to interactive games, mobile apps to developer tools.
        </motion.p>
      </div>
      <ProjectGrid repos={repos} featured={featured} languages={languages} />
    </div>
  )
}
