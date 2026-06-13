import { motion } from 'framer-motion'
import { useContributions } from '../hooks/useContributions'

export default function Activity() {
  const { weeks, total, loading } = useContributions('VoidX3D')

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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 rounded-full" style={{ border: '2px solid var(--border)', borderTopColor: 'var(--accent)' }}>
                <div className="w-full h-full rounded-full" style={{ animation: 'spin 0.6s linear infinite', borderTop: '2px solid var(--accent)', borderRadius: '50%' }} />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span>{total.toLocaleString()} contributions in {new Date().getFullYear()}</span>
              </div>
              <div className="flex gap-[3px] overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map(day => (
                      <div
                        key={day.date}
                        className="w-[11px] h-[11px] rounded-sm"
                        style={{ backgroundColor: intensity(day.count) }}
                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span>Less</span>
                {[0, 3, 6, 9, 12].map(n => (
                  <div key={n} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: intensity(n) }} />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
