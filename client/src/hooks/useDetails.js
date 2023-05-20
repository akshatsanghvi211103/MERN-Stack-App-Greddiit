import { useState } from 'react';
export const useDetails = () => {
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(null);

    const updateDetails = async (fname, lname, age, contact, uname) => {
        setLoad(true);
        setError(null);

        const user = localStorage.getItem('theuser')
        const token = JSON.parse(user).token

        const res = await fetch('http://localhost:5000/api/user/details', {
            // callback
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ fname, lname, age, contact, uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            // localStorage.setItem('user', JSON.stringify(data)); // not required ig
        }
        setLoad(false);
    };

    const getDetails = async (uname) => {
        setError(null);
        const user = localStorage.getItem('theuser')
        const token = JSON.parse(user).token

        const res = await fetch('http://localhost:5000/api/user/getDetails', {
            // callback
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            // localStorage.setItem('user', JSON.stringify(data)); // not required ig
            console.log(JSON.stringify(data));
            return data;
        }
    };
    
    return { updateDetails, getDetails, load, error };
}