import React from 'react'
import { useState, useEffect } from 'react'

export const useSessionStorage = (key, initialValue) => {

    const [value, setValue] = useState(() => {
        try {
            const localValue = window.sessionStorage.getItem(key)
            return localValue ?
                JSON.parse(localValue)
                : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])


    return [value, setValue]
}
