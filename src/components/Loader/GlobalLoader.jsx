import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Share2, Zap } from 'lucide-react'

/**
 * GlobalLoader: Prism Pulse Edition
 * High-fidelity atmospheric loading sequence for StudySync.
 */
const GlobalLoader = () => {
  const { isOpen, title, message } = useSelector((state) => state.ui.loader)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{
            background: 'rgba(5, 10, 20, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            zIndex: 10000,
            pointerEvents: 'all'
          }}
        >
          {/* 🔘 Atmospheric Pulse Rings */}
          <div className="position-relative mb-5" style={{ width: 120, height: 120 }}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="position-absolute start-50 top-50 translate-middle border border-cyan border-opacity-10 rounded-circle"
                style={{ width: 140, height: 140 }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Core Glowing Orb */}
            <motion.div
              className="position-absolute start-50 top-50 translate-middle rounded-circle shadow-lg d-flex align-items-center justify-content-center"
              style={{ 
                width: 100, 
                height: 100,
                background: 'linear-gradient(135deg, var(--prism-cobalt), var(--prism-cyan))',
                boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)'
              }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  '0 0 40px rgba(0, 245, 255, 0.3)',
                  '0 0 60px rgba(0, 245, 255, 0.5)',
                  '0 0 40px rgba(0, 245, 255, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Share2 size={42} className="text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* 📝 Dynamic Metadata */}
          <div className="text-center px-4">
            <motion.h3
              key={title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="display-6 fw-bold shiny-text mb-2 tracking-tighter"
            >
              {title}
            </motion.h3>

            <motion.p
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary mono smaller uppercase tracking-widest"
            >
              <Zap size={12} className="me-2 text-cyan" />
              {message}
            </motion.p>
          </div>

          {/* 🌊 Bottom Scanline (Atmospheric) */}
          <div className="position-absolute bottom-0 start-0 w-100 overflow-hidden" style={{ height: '3px' }}>
            <motion.div
              className="h-100 shadow-lg"
              style={{ 
                width: '40%', 
                background: 'linear-gradient(90deg, transparent, var(--prism-cyan), transparent)'
              }}
              animate={{
                x: ['-100%', '300%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GlobalLoader
