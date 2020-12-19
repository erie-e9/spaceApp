import React, { useState, createContext } from 'react'

export const ToastContext = createContext(null)
export const ToastProvider = ({ children }) => {
  // Calls setToastConfig in order to control the toast
  // toastConfig is null by default so the toast is hidden
    const [ toastConfig, setToastConfig ] = useState(null)

    const showToast = (type, message, duration = 4000) => {
    // Calls setToastConfig to show the toast
        setToastConfig({ type, message, duration })
    }

    const hideToast = () => {
    // Sets toast config to null in order to hide the toast
        setToastConfig(null)
    }

  return (
    <ToastContext.Provider value={{ toastConfig, showToast, hideToast }}>
        {children}
    </ToastContext.Provider>
  )
}