import React, { useState, useEffect } from 'react'
import styles from './modules/ThemeSwitcher.module.css'
import { XMarkIcon, SunIcon, MoonIcon, SwatchIcon } from '@heroicons/react/24/solid'
import { useSessionStorage } from '../hooks/useSessionStorage'

export const ThemeSwitcher = () => {

    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark").matches

    const [isColorPicking, setIsColorPicking] = useState(false)
    const [theme, setTheme] = useSessionStorage("to-do.theme",
        defaultTheme ? "dark" : "light"
    )
    const [hue, setHue] = useSessionStorage("to-do.color", 180)

    useEffect(() => {
        document.documentElement.setAttribute("color-scheme", theme)
    }, [theme])

    useEffect(() => {
        document.documentElement.style.setProperty("--_hue", hue)
    }, [hue])

    const handleThemeBtn = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <aside
            className={styles.wrapper}
        >
            {
                isColorPicking ?
                    (
                        <>
                            <button
                                className={`btn ${styles.close}`}
                                aria-label="Close color picking mode"
                                onClick={() => setIsColorPicking(false)}
                            >
                                <XMarkIcon />
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                className={styles.picker}
                                aria-label="Change color theme slide"
                                value={hue}
                                onInput={(e) => setHue(e.target.value)}
                            />
                        </>
                    ) : (
                        <div className={styles.btns}>
                            <button
                                className="btn"
                                aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
                                role="switch"
                                onClick={handleThemeBtn}
                            >
                                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <button
                                className="btn"
                                aria-label="Eneable color picking mode"
                                onClick={() => setIsColorPicking(true)}
                            >
                                <SwatchIcon />
                            </button>
                        </div>
                    )
            }
        </aside>
    )
}
