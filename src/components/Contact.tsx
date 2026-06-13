import { motion } from 'framer-motion'
import { SITE } from '../data/site'

export default function Contact() {
  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >Get In Touch</motion.p>

        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Name" className="contact-input" />
            <input type="email" placeholder="Email" className="contact-input" />
          </div>
          <input type="text" placeholder="Subject" className="contact-input mb-4" />
          <textarea placeholder="Message" rows={4} className="contact-input mb-4 resize-none" />
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Or email me directly at{' '}
              <a href={`mailto:${SITE.email}`} style={{ color: 'var(--accent)' }}>{SITE.email}</a>
            </p>
            <button className="btn-primary" type="button">
              Send
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
