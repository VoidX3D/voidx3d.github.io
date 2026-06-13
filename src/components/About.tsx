import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref, inView } = useInView(0.1)

  const sections = [
    {
      title: '👤 Profile',
      items: [
        'Full Stack Developer & Backend Engineer',
        '17 years old, self-taught since age 12',
        '14+ programming languages',
        'Building production-ready systems',
      ],
    },
    {
      title: '🎯 Focus',
      items: [
        'Backend Architecture & System Design',
        'AI/ML Integration into Production Apps',
        'Microservices & Event-Driven Architecture',
        'Performance Optimization',
      ],
    },
    {
      title: '🛠️ Tech Stack',
      items: [
        'TypeScript, JavaScript, Python, Go, Rust',
        'React, Next.js, Vue, Svelte, Tailwind',
        'Node.js, Express, NestJS, FastAPI',
        'Docker, K8s, AWS, GCP, Vercel',
      ],
    },
    {
      title: '🌐 Links',
      items: [
        'GitHub — VoidX3D',
        'X — @VortexVoidX3D',
        'Instagram — @sincerebhattarai',
        'playzspreston2@gmail.com',
      ],
    },
  ]

  return (
    <section id="about" className="py-20 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-4" ref={ref}>
        <motion.h2
          className="text-lg font-semibold text-white/60 tracking-widest uppercase mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          About
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-sm font-medium text-white/50 mb-3">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.items.map((item, j) => (
                  <li key={j} className="text-xs text-white/30 flex items-start gap-2">
                    <span className="text-white/10 mt-px">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
