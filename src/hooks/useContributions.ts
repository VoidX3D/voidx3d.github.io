import { useState, useEffect } from 'react'

interface Day { date: string; count: number; level: number }
interface Yearly { total: Record<string, number>; contributions: Day[] }

export function useContributions(username: string, year = new Date().getFullYear()) {
  const [data, setData] = useState<Day[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
      .then(r => r.json())
      .then((json: Yearly) => {
        if (cancelled) return
        setData(json.contributions)
        setTotal(json.total[String(year)] || 0)
      })
      .catch(() => {
        if (!cancelled) setData([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [username, year])

  const weeks: Day[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  return { data, total, weeks, loading }
}
