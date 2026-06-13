import { useState, useEffect, useCallback } from 'react'

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

export function useGithubData(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true)
      const [userRes, ...repoPages] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        ...Array.from({ length: 5 }, (_, i) =>
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${i + 1}&sort=updated&type=public`)
        ),
      ])

      if (!userRes.ok) throw new Error('Failed to fetch user')
      const userData: GitHubUser = await userRes.json()
      setUser(userData)

      const allRepos: GitHubRepo[] = []
      for (const res of repoPages) {
        if (res.ok) {
          const data: GitHubRepo[] = await res.json()
          allRepos.push(...data)
        }
      }
      setRepos(allRepos.filter(r => r.name !== username))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => { fetchAll() }, [fetchAll])

  const ownRepos = repos.filter(r => !r.fork)
  const starredRepos = repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)
  const featured = starredRepos.slice(0, 8)
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const languages = [...new Set(ownRepos.map(r => r.language).filter(Boolean))].sort()

  return { user, repos: ownRepos, featured, totalStars, languages, loading, error, refetch: fetchAll }
}
