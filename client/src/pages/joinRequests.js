import React, { useEffect, useState } from 'react'
import { useSG } from '../hooks/useSG'
import { useNavigate } from 'react-router-dom'

import NewNavbar from '../components/newnavbar'
import '../css/extrapages.css'

let keyVal = 0;

export default function JoinRequests() {

    const [reqUsers, setReqUsers] = useState([])
    
    const navigate = useNavigate()
    
    let url = window.location.href
    let subG = url.split('/')[3]
    let urlSubG = subG
    for (let i = 0; i < subG.length; i++) {
        if (subG[i] === '%') {
            subG = subG.substring(0, i) + ' ' + subG.substring(i + 3);
        }
    }

    const { getRequestingUsers, acceptRequest, rejectRequest } = useSG()
    
    useEffect(() => {

        async function getTheRequestingUsers() {
            let obj = await getRequestingUsers(subG)
            let requestingUsers = obj["requestingUsers"]
            setReqUsers([...reqUsers, ...requestingUsers])
        }
        getTheRequestingUsers()
    }, [])

    const acceptReq = async (e) => {
        e.preventDefault()
        let user = e.target.id
        await acceptRequest(subG, user)
        // remove the user from the list
        let arr = reqUsers
        arr.splice(arr.indexOf(user), 1)
        setReqUsers([...arr])
    }
    
    const rejectReq = async (e) => {
        e.preventDefault()
        let user = e.target.id
        await rejectRequest(subG, user)
        // remove the user from the list
        let arr = reqUsers
        arr.splice(arr.indexOf(user), 1)
        setReqUsers([...arr])
    }

    const goToMSG = (e) => {
        e.preventDefault()
        navigate(`/api/sg/subGreddiits/${urlSubG}`)
    }
    
    return (
        <>
            <NewNavbar urlSubG={urlSubG} />
            <div className='join-requests'>
            <h1><btn className='extra-subG-heading' onClick={goToMSG}>SubGreddiit: {subG}</btn></h1>
                <div className='join-requests-header'>Join Requests</div>
                <div className='users-container'>
                    {reqUsers.map((user) => {
                        return (
                            <div key={keyVal++} className='users2'>
                                <span className='user-name'>{user}</span>
                                <span>
                                    <button id={user} onClick={acceptReq} className='accept'>Accept</button>
                                    <button id={user} onClick={rejectReq} className='reject'>Reject</button>
                                </span>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
