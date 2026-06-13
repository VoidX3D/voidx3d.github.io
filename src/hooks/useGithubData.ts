import { useState, useEffect, useCallback, useRef } from 'react'

const CACHE_KEY = 'gh_data'
const CACHE_TTL = 5 * 60 * 1000

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  topics: string[]
  updated_at: string
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
}

interface Cache {
  user: GitHubUser | null
  repos: GitHubRepo[]
  ts: number
}

function loadCache(): Cache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: Cache = JSON.parse(raw)
    if (Date.now() - parsed.ts > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

function saveCache(user: GitHubUser | null, repos: GitHubRepo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ user, repos, ts: Date.now() }))
  } catch { /* quota */ }
}

export function useGithubData(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    const cached = loadCache()
    if (cached) {
      setUser(cached.user)
      setRepos(cached.repos)
      setLoading(false)
    }
    return () => { mounted.current = false }
  }, [])

  const fetchAll = useCallback(async () => {
    try {
      if (!loadCache()) setLoading(true)
      setError(null)

      const headers: Record<string, string> = {}
      if (import.meta.env.VITE_GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      }

      const [userRes, page1, page2] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=1&sort=updated&type=public`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=2&sort=updated&type=public`, { headers }),
      ])

      if (userRes.status === 403) {
        const cached = loadCache()
        if (cached) { setUser(cached.user); setRepos(cached.repos); return }
        throw new Error('GitHub API rate limit — try again later')
      }

      if (!userRes.ok) throw new Error('Failed to fetch user')
      const userData: GitHubUser = await userRes.json()

      const allRepos: GitHubRepo[] = []
      for (const res of [page1, page2]) {
        if (res.ok) allRepos.push(...(await res.json()))
      }

      const filtered = allRepos.filter(r => r.name !== username)
      if (!mounted.current) return
      setUser(userData)
      setRepos(filtered)
      saveCache(userData, filtered)
      setError(null)
    } catch (err) {
      if (!mounted.current) return
      const cached = loadCache()
      if (cached) { setUser(cached.user); setRepos(cached.repos); return }
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [username])

  useEffect(() => { fetchAll() }, [fetchAll])

  const ownRepos = repos.filter(r => !r.fork)
  const starredRepos = ownRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  const featured = starredRepos.slice(0, 8)
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const languages = [...new Set(ownRepos.map(r => r.language).filter(Boolean))].sort() as string[]

  return { user, repos: ownRepos, featured, totalStars, languages, loading, error, refetch: fetchAll }
}
