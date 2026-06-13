import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.p
          className="text-xs text-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built with <span className="text-[#FF6B6B]">❤️</span> by{' '}
          <span className="text-white/40">VoidX3D</span> &bull; Pokhara, Nepal 🇳🇵
        </motion.p>
        <motion.p
          className="text-[11px] text-white/10 mt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          &copy; 2024&ndash;2026 &bull; All projects open source
        </motion.p>
      </div>
    </footer>
  )
}
