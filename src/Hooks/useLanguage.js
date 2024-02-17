import { useLayoutEffect, useState } from 'react'

export const useLanguage = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'EN'
  )

  useLayoutEffect(() => {
    document.documentElement.setAttribute('language', language)
    localStorage.setItem('language', language)
  }, [language])

  return { language, setLanguage }
}