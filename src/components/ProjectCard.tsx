import { motion } from 'framer-motion'

interface Repo {
  id: number; name: string; description: string | null
  html_url: string; language: string | null
  stargazers_count: number; forks_count: number; topics: string[]
}

interface Props { repo: Repo; featured?: boolean; index: number }

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3572a5',
  Kotlin: '#A97BFF', Java: '#b07219', Go: '#00ADD8', Rust: '#dea584',
  HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', Swift: '#F05138',
  Ruby: '#701516', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600',
}

function LangColor(lang: string | null) {
  return lang ? (LANG_COLORS[lang] || '#8b949e') : '#8b949e'
}

const GlowIcon = ({ lang }: { lang: string | null }) => {
  const color = LangColor(lang)
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" style={{ color }}>
      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
    </svg>
  )
}

export default function ProjectCard({ repo, featured = false, index }: Props) {
  const color = LangColor(repo.language)

  if (featured) {
    return (
      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glow block rounded-xl bg-white/[0.015] p-5"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <GlowIcon lang={repo.language} />
            <span className="font-semibold text-sm text-white/80 truncate">{repo.name}</span>
          </div>
          {repo.stargazers_count > 0 && (
            <span className="shrink-0 flex items-center gap-1 text-[11px] text-white/25">
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#f0c040' }}>
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              {repo.stargazers_count}
            </span>
          )}
        </div>
        {repo.description && (
          <p className="text-xs text-white/30 leading-relaxed line-clamp-2 mb-3">{repo.description}</p>
        )}
        <div className="flex items-center gap-2.5 flex-wrap">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-[10px] text-white/25">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 2).map(t => (
            <span key={t} className="text-[10px] text-white/15 bg-white/[0.03] rounded-full px-2 py-0.5">{t}</span>
          ))}
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glow block rounded-lg bg-white/[0.01] p-3.5"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-medium text-white/70 text-xs truncate">{repo.name}</span>
        {repo.language && (
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: LangColor(repo.language) }} />
            <span className="text-[9px] text-white/15">{repo.language}</span>
          </span>
        )}
      </div>
      {repo.description && (
        <p className="text-[10px] text-white/25 leading-relaxed line-clamp-1">{repo.description}</p>
      )}
      <div className="flex items-center gap-2.5 mt-1.5 text-[9px] text-white/15">
        {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
        {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
      </div>
    </motion.a>
  )
}
