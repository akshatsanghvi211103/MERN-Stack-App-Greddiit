import { useRef, useState } from 'react';

export const useSG = () => {
    
    const errRef1 = useRef(null);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(null);

    const user = localStorage.getItem('theuser')
    const token = JSON.parse(user).token

    const createSG = async (uname, name, description, tags, bannedKeywords) => {
        setLoad(true);
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/createSubG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ uname, name, description, tags, bannedKeywords })
        });
        const data = await res.json();
        if (!res.ok) {
            errRef1.current = data.err;
            setError(data.err);
        }
        setLoad(false);
        return data; // we need the data to update the page again
    }
    const getMyGreddiits = async (uname) => {
        const res = await fetch('http://localhost:5000/api/sg/getMySubGs', {
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
            return data; // we need the data to update the page
        }
    }

    const getGenGreddiits = async () => {
        const res = await fetch('http://localhost:5000/api/sg/getGenSubGs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data; // we need the data to update the page
        }
    }

    const deleteSG = async (uname, name) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/deleteSubG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, name })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data; // we need the data to update the page
        }
    }

    const requestJoin = async (subGName, uname) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/requestJoinSubG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subGName, uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
    }

    const getRequestingUsers = async (subGName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/getRequestingUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subGName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const acceptRequest = async (subGName, uname) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/acceptRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subGName, uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
    }

    const rejectRequest = async (subGName, uname) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/rejectRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subGName, uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
    }

    const leaveSubGFunc = async (uname, subGName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/leaveSubG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, subGName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
    }

    const getSubGDetails = async (subGNameRef) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/getSubGDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subGNameRef })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const blockUser = async (blockedUser, subGName, postName, _id) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/sg/blockUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ blockedUser, subGName, postName, _id })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
    }

    return { createSG, deleteSG, getMyGreddiits, getGenGreddiits, requestJoin, getRequestingUsers, acceptRequest, rejectRequest, leaveSubGFunc, getSubGDetails, blockUser, load, error, errRef1 };
}
