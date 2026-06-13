import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

interface Distro {
  name: string
  arch: string
  kernel: string
  exp: string
  color: string
  Logo: () => JSX.Element
}

function UbuntuLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="48" fill="#E95420" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="5" opacity="0.3" />
      <circle cx="50" cy="50" r="6" fill="#fff" />
      <circle cx="24" cy="28" r="4" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="76" cy="28" r="4" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="50" cy="78" r="4" fill="none" stroke="#fff" strokeWidth="3" />
      <line x1="30" y1="34" x2="44" y2="46" stroke="#fff" strokeWidth="3" opacity="0.6" />
      <line x1="70" y1="34" x2="56" y2="46" stroke="#fff" strokeWidth="3" opacity="0.6" />
      <line x1="50" y1="72" x2="50" y2="58" stroke="#fff" strokeWidth="3" opacity="0.6" />
    </svg>
  )
}

function ArchLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <polygon points="50,12 80,85 72,82 50,24 28,82 20,85" fill="#1793D1" />
      <polygon points="50,30 38,78 44,75 50,40 56,75 62,78" fill="#fff" opacity="0.4" />
    </svg>
  )
}

function DebianLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#A81D33" strokeWidth="3" />
      <path d="M50 12 C68 12 82 26 82 44 C82 60 70 74 54 76 L50 88 L46 76 C30 74 18 60 18 44 C18 26 32 12 50 12Z" fill="#A81D33" opacity="0.85" />
      <path d="M50 20 C60 20 68 28 68 38 C68 48 60 56 52 58 L50 66 L48 58 C40 56 32 48 32 38 C32 28 40 20 50 20Z" fill="#fff" opacity="0.15" />
    </svg>
  )
}

function FedoraLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="48" fill="#294172" />
      <path d="M50 20 C38 20 28 30 28 42 L28 54 C28 58 30 62 34 62 C38 62 40 58 40 54 L40 48 C40 42 44 38 50 38 C56 38 60 42 60 48 L60 56 C60 72 72 80 72 80 C72 80 65 68 65 56 L65 42 C65 30 62 20 50 20Z" fill="#fff" />
    </svg>
  )
}

function PopLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="48" fill="#48B9C7" />
      <text x="50" y="56" textAnchor="middle" fill="#fff" fontSize="40" fontFamily="sans-serif" fontWeight="bold">P</text>
      <text x="66" y="82" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="sans-serif" fontWeight="bold">OS</text>
    </svg>
  )
}

function ManjaroLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="48" fill="#35BF5C" />
      <path d="M38 28 L38 72 L52 72 L52 28 L45 28 L45 62 L38 28Z" fill="#fff" />
      <path d="M52 28 L52 72 L60 72 L60 28Z" fill="#fff" opacity="0.5" />
    </svg>
  )
}

function NixOSLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <polygon points="50,15 62,35 50,35" fill="#7EBAE4" />
      <polygon points="62,35 50,55 62,55 74,35" fill="#5277C3" />
      <polygon points="50,55 62,75 50,75 38,55" fill="#7EBAE4" />
      <polygon points="38,35 50,55 38,55 26,35" fill="#5277C3" />
      <polygon points="38,35 50,15 50,35" fill="#7EBAE4" />
      <polygon points="50,75 62,55 62,75" fill="#5277C3" />
      <polygon points="26,35 38,35 38,55" fill="#415E9A" />
      <polygon points="74,35 62,35 62,55" fill="#415E9A" />
      <polygon points="50,55 38,55 50,75" fill="#415E9A" />
      <polygon points="50,55 62,55 50,35" fill="#fff" opacity="0.08" />
    </svg>
  )
}

function VoidLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="48" fill="#478061" />
      <text x="50" y="48" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="sans-serif" fontWeight="bold">VOID</text>
      <text x="50" y="66" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="sans-serif" opacity="0.7">LINUX</text>
    </svg>
  )
}

const distros: Distro[] = [
  { name: 'Ubuntu', arch: 'x86_64 / aarch64', kernel: '6.8+', exp: 'Daily driver, 3+ years', color: '#E95420', Logo: UbuntuLogo },
  { name: 'Arch Linux', arch: 'x86_64', kernel: 'latest', exp: 'Rolling release, 1+ year', color: '#1793D1', Logo: ArchLogo },
  { name: 'Debian', arch: 'x86_64 / aarch64', kernel: '6.1+', exp: 'Servers & containers', color: '#A81D33', Logo: DebianLogo },
  { name: 'Fedora', arch: 'x86_64', kernel: '6.8+', exp: 'Workstation, 6+ months', color: '#51A2DA', Logo: FedoraLogo },
  { name: 'Pop!_OS', arch: 'x86_64', kernel: '6.8+', exp: 'Dev environment, 1+ year', color: '#48A9C5', Logo: PopLogo },
  { name: 'Manjaro', arch: 'x86_64', kernel: 'latest', exp: 'Gaming, 6+ months', color: '#35BF5C', Logo: ManjaroLogo },
  { name: 'NixOS', arch: 'x86_64', kernel: '6.6+', exp: 'Experimental, learning', color: '#7EBAE4', Logo: NixOSLogo },
  { name: 'Void Linux', arch: 'x86_64 / musl', kernel: '6.6+', exp: 'Minimal setups', color: '#478061', Logo: VoidLogo },
]

export default function DistroShowcase() {
  const { ref, inView } = useInView(0.1)
  const [failed, setFailed] = useState<Set<string>>(new Set())

  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--border)' }} ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >Linux Journey</motion.p>

        <motion.p
          className="text-sm mb-8 max-w-xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          From Ubuntu to Arch — distros I&apos;ve daily-driven, experimented with, and learned from across x86_64 and ARM.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {distros.map((d, i) => (
            <motion.div
              key={d.name}
              className="card p-4 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center mb-2">
                {!failed.has(d.name) ? (
                  <div onError={() => setFailed(prev => new Set(prev).add(d.name))}>
                    <d.Logo />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: d.color }}
                  >
                    {d.name[0]}
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{d.name}</div>
              <div className="text-xs mb-2 font-mono" style={{ color: d.color }}>{d.arch}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{d.exp}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
