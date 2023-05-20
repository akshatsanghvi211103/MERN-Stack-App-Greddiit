import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSG } from '../hooks/useSG'
import { useNavigate } from 'react-router-dom'

import '../css/extrapages.css'

import NewNavbar from '../components/newnavbar'

let keyVal = 0

export default function ShowUsers() {
    let url = window.location.href
    let subG = url.split('/')[3]
    let urlSubG = subG
    for (let i = 0; i < subG.length; i++) {
        if (subG[i] === '%') {
            subG = subG.substring(0, i) + ' ' + subG.substring(i + 3);
        }
    }

    const [users, setUsers] = useState([])
    const [blocked, setBlocked] = useState([])

    const { getSubGDetails } = useSG()
    const navigate = useNavigate()

    useEffect(() => {
        async function getTheUsers() {
            let final = []
            let objs = await getSubGDetails(subG)
            let obj = objs['subGDetails'][0]
            let all = obj['members']
            let blockedUsers = obj['blockedMembers']
            for (let i = 0; i < all.length; i++) {
                if (blockedUsers.includes(all[i])) {
                    continue
                }
                final.push(all[i])
            }
            setBlocked([...blockedUsers])
            setUsers([...final])
        }
        getTheUsers()
    }, [])

    const goToMSG = (e) => {
        e.preventDefault()
        navigate(`/api/sg/subGreddiits/${urlSubG}`)
    }

    return (
        <>
            <NewNavbar urlSubG={urlSubG} />
            <div className='join-requests'>
            <h1><btn className='extra-subG-heading' onClick={goToMSG}>SubGreddiit: {subG}</btn></h1>                
                <div className='join-requests-header'>Users</div>
                <div className='users-container'>
                    {users.map((user) => {
                        return (
                            <div key={keyVal++} className='users2'>
                                <span className='user-name'>{user}</span>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='join-requests-header'>Blocked Users</div>
                <div className='users-container'>
                    {blocked.map((user) => {
                        return (
                            <div key={keyVal++} className='users2 blocked-users'>
                                <span className='user-name'>{user}</span>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
