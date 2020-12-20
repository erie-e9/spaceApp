import React, { useContext } from 'react'
import { ThemePickerContext } from './ThemePickerProvider'

export const useThemePicker = () => {
  return useContext(ThemePickerContext) // !
}