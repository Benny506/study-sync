import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: {
    isOpen: false,
    title: 'Initializing...',
    message: 'Synchronizing laboratory assets...',
  },
  alerts: [],
}

/**
 * Unique ID generator for alerts
 */
const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.loader.isOpen = true
      if (typeof action.payload === 'string') {
        state.loader.title = action.payload
      } else if (action.payload?.title) {
        state.loader.title = action.payload.title
        state.loader.message = action.payload.message ?? ''
      }
    },
    hideLoader: (state) => {
      state.loader.isOpen = false
    },
    addAlert: (state, action) => {
      const payload = action.payload ?? {}
      const alert = {
        id: createId(),
        type: payload.type ?? 'info', // success, warning, error, info
        title: payload.title ?? '',
        message: payload.message ?? '',
        timeoutMs: payload.timeoutMs ?? 5000,
        createdAt: Date.now(),
      }
      state.alerts.unshift(alert) // Newest on top
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter((a) => a.id !== action.payload)
    },
    clearAlerts: (state) => {
      state.alerts = []
    },
  },
})

export const {
  showLoader,
  hideLoader,
  addAlert,
  removeAlert,
  clearAlerts,
} = uiSlice.actions
export default uiSlice.reducer
