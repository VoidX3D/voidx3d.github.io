import { motion } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: Props) {
  return (
    <motion.span
      className="animated-number"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <CountUp to={value} duration={duration} />
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function CountUp({ to, duration }: { to: number; duration: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ textShadow: '0 0 20px rgba(0,217,255,0.5)' }}
        whileInView={{ textShadow: '0 0 0px rgba(0,217,255,0)' }}
        transition={{ duration: 0.5, delay: duration }}
      >
        {to}
      </motion.span>
    </motion.span>
  )
}
