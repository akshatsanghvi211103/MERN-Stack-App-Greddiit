import { useRef, useState } from "react";

export const useRegister = () => {
    const [error, setError] = useState('')
    const [load, setLoad] = useState('')
    const errRef = useRef(null)

    const register = async (fname, lname, uname, password, email, age, contact) => {
        setError(null)
        setLoad(true)
        const res = await fetch('http://localhost:5000/api/user/register', {
            // callback
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fname, lname, uname, password, email, age, contact })
        })
        const data = await res.json()
        errRef.current = data.err // even if it is null, it shud be set to null
        if (!res.ok)
            setError(data.err)
        else {
            // localStorage.setItem('theuser', 'true') // not nessesary, we want the user to login after register
        }
        setLoad(false)
    }
    return {register, load, error, errRef}
}