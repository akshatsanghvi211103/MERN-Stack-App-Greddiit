import { useState, useRef } from 'react'
export const useLogin = () => {

    const errRef = useRef(null)
    const [error, setError] = useState(null)
    const [load, setLoad] = useState(null)
    const login = async (uname, password) => {
        setLoad(true)
        setError(null)

        const res = await fetch('http://localhost:5000/api/user/login', {
            // callback
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uname, password })
        })
        const data = await res.json()
        errRef.current = data.err // even if it is null, it shud be set to null
        if (!res.ok) {
            setError(data.err)
        } else {
            localStorage.setItem('theuser', JSON.stringify(data))
        }
        setLoad(false)
    }
    return {login, load, error, errRef}
}