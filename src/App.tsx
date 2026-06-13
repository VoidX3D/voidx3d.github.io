import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import ShaderBg from './components/ShaderBg'
import ParticleField from './components/ParticleField'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ErrorBoundary>
          <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
            <ShaderBg />
            <div className="grid-overlay" />
            <ParticleField />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </div>
        </ErrorBoundary>
      </HashRouter>
    </ThemeProvider>
  )
}
