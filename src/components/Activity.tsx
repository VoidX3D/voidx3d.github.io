import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Activity() {
  const [contribs, setContribs] = useState<{ date: string; count: number }[]>([])
  const days = 91

  useEffect(() => {
    const end = new Date()
    const data: { date: string; count: number }[] = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(end)
      d.setDate(d.getDate() - i)
      data.push({
        date: d.toISOString().slice(0, 10),
        count: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 12),
      })
    }
    setContribs(data)
  }, [])

  const weeks: typeof contribs[] = []
  for (let i = 0; i < contribs.length; i += 7) {
    weeks.push(contribs.slice(i, i + 7))
  }

  function intensity(count: number): string {
    if (count === 0) return 'var(--bg-elevated)'
    if (count <= 3) return 'rgba(0,217,255,0.15)'
    if (count <= 6) return 'rgba(0,217,255,0.35)'
    if (count <= 9) return 'rgba(0,217,255,0.55)'
    return 'rgba(0,217,255,0.8)'
  }

  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >Recent Activity</motion.p>

        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-[3px] overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map(day => (
                  <div
                    key={day.date}
                    className="w-[10px] h-[10px] rounded-sm"
                    style={{ backgroundColor: intensity(day.count) }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
                {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: 'transparent' }} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-3 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
            <span>Less</span>
            {[0, 3, 6, 9, 12].map(n => (
              <div key={n} className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: intensity(n) }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
