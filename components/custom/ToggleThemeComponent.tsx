'use client'
import React, { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

const ToggleThemeComponent = () => {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        }
        return 'light'
    })

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        
        // Apply theme changes with smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
        document.body.classList.toggle('dark', newTheme === 'dark')
        document.documentElement.setAttribute('data-theme', newTheme)
        
        // Add a subtle animation to the icon
        const icon = document.querySelector('.theme-icon')
        if (icon) {
            icon.classList.add('rotate-scale')
            setTimeout(() => icon.classList.remove('rotate-scale'), 300)
        }
    }

    useEffect(() => {
        setMounted(true)
        // Get initial theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        
        setTheme(savedTheme)
        document.body.classList.toggle('dark', savedTheme === 'dark')
        document.documentElement.setAttribute('data-theme', savedTheme)

        // Sync with system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if there's no user preference saved
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light'
                setTheme(newTheme)
                document.body.classList.toggle('dark', newTheme === 'dark')
                document.documentElement.setAttribute('data-theme', newTheme)
            }
        }
        
        // Add keyboard shortcut (Ctrl/Cmd + J) for theme toggle
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
                e.preventDefault()
                toggleTheme()
            }
        }
        
        mediaQuery.addEventListener('change', handleChange)
        document.addEventListener('keydown', handleKeyPress)
        
        return () => {
            mediaQuery.removeEventListener('change', handleChange)
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    // Prevent flash of wrong theme
    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center justify-center">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme (Ctrl/Cmd + J)`}
            >
                {theme === 'light' ? (
                    <FaMoon className="w-5 h-5 theme-icon transition-all hover:rotate-12 text-gray-600" />
                ) : (
                    <FaSun className="w-5 h-5 theme-icon transition-all hover:rotate-90 text-yellow-400" />
                )}
            </button>
            <style jsx>{`
                .rotate-scale {
                    animation: rotateAndScale 0.3s ease;
                }
                @keyframes rotateAndScale {
                    0% { transform: rotate(0) scale(1); }
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
            `}</style>
        </div>
    )
}

export default ToggleThemeComponent
