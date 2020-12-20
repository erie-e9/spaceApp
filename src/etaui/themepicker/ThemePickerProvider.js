import React, { useState, createContext } from 'react'

export const ThemePickerContext = createContext(null)
export const ThemePickerProvider = ({ children }) => {
  // Calls setThemePickerConfig in order to control the themepicker
  // themepickerConfig is null by default so the themepicker is hidden
    const [ themepickerConfig, setThemePickerConfig ] = useState(0)

    const chooseThemePicker = (theme) => {
    // Calls setThemePickerConfig to show the themepicker
        setThemePickerConfig({ theme })
    }

  return (
    <ThemePickerContext.Provider value={{ chooseThemePicker, themepickerConfig }}>
        {children}
    </ThemePickerContext.Provider>
  )
}