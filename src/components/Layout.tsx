import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { SearchProvider } from '../context/SearchContext'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <SearchProvider>
      <Navbar />
      <main className="relative z-10 min-h-screen pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </SearchProvider>
  )
}
