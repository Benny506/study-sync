import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  X,
  Bell
} from 'lucide-react'
import { removeAlert } from '../../store/uiSlice'

/**
 * GlobalAlerts: Sync Notifications Edition
 * Premium glass notification stack for StudySync.
 */
const GlobalAlerts = () => {
  const dispatch = useDispatch()
  const alerts = useSelector((state) => state.ui.alerts)
  const timersRef = useRef(new Map())

  const pickIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={18} className="text-cyan" />
      case 'warning': return <AlertTriangle size={18} className="text-warning" />
      case 'error': return <AlertOctagon size={18} className="text-danger" />
      case 'info':
      default: return <Info size={18} className="text-cobalt" />
    }
  }

  const handleClose = (id) => {
    dispatch(removeAlert(id))
  }

  useEffect(() => {
    // Set auto-dismiss timers
    alerts.forEach((alert) => {
      if (timersRef.current.has(alert.id)) return
      
      const timer = setTimeout(() => {
        handleClose(alert.id)
      }, alert.timeoutMs || 5000)
      
      timersRef.current.set(alert.id, timer)
    })

    // Cleanup timers for labels that were removed manually
    const alertIds = new Set(alerts.map(a => a.id))
    for (const [id, timer] of timersRef.current.entries()) {
      if (!alertIds.has(id)) {
        clearTimeout(timer)
        timersRef.current.delete(id)
      }
    }
  }, [alerts])

  return (
    <div 
      className="position-fixed top-0 end-0 p-4" 
      style={{ zIndex: 11000, width: '100%', maxWidth: '420px', pointerEvents: 'none' }}
    >
      <div className="d-flex flex-column gap-3 align-items-end">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className="glass-card shadow-lg d-flex align-items-start gap-3 position-relative overflow-hidden"
              style={{ 
                pointerEvents: 'all', 
                minWidth: '320px',
                background: 'rgba(10, 15, 25, 0.95)', // Deepest opaque glass for contrast
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(25px)',
                borderRadius: '16px',
                padding: '16px 20px'
              }}
            >
              {/* 🎨 Status Accent Bar */}
              <div 
                className="position-absolute start-0 top-0 h-100" 
                style={{ 
                  width: '4px', 
                  background: alert.type === 'success' ? 'var(--prism-cyan)' : 
                              alert.type === 'error' ? '#ff4d4d' : 
                              alert.type === 'warning' ? '#ffcc00' : 'var(--prism-cobalt)',
                  boxShadow: `2px 0 10px ${alert.type === 'success' ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0,0,0,0.5)'}`
                }} 
              />

              <div className="bg-white bg-opacity-5 rounded-circle p-2 d-flex align-items-center justify-content-center shadow-inner">
                {pickIcon(alert.type)}
              </div>
              
              <div className="flex-grow-1">
                {alert.title && (
                  <h6 className="mb-1 fw-bold tracking-tighter" style={{ fontSize: '0.9rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {alert.title}
                  </h6>
                )}
                <p className="mb-0 mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.3' }}>
                  {alert.message}
                </p>
              </div>

              <button 
                onClick={() => handleClose(alert.id)}
                className="btn btn-link p-0 text-white opacity-40 hover-glow"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GlobalAlerts
