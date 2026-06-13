import { motion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

export default function MathCurveSVG() {
  const { x, y } = useMousePosition()

  return (
    <div className="math-curve" style={{ top: '30%', left: '0', width: '100%', height: '200px' }}>
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100"
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="1"
          animate={{
            d: [
              "M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100",
              "M0,80 Q150,130 300,80 T600,80 T900,80 T1200,80",
              "M0,120 Q150,60 300,120 T600,120 T900,120 T1200,120",
              "M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,120 Q200,80 400,120 T800,120 T1200,120"
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="0.5"
          animate={{
            d: [
              "M0,120 Q200,80 400,120 T800,120 T1200,120",
              "M0,100 Q200,140 400,100 T800,100 T1200,100",
              "M0,140 Q200,90 400,140 T800,140 T1200,140",
              "M0,120 Q200,80 400,120 T800,120 T1200,120",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  )
}
