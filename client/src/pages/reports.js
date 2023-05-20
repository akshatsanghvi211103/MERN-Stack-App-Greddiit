import React, { useState, useEffect, useRef } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useSG } from '../hooks/useSG'
import { useNavigate } from 'react-router-dom'

import NewNavbar from '../components/newnavbar'

let keyVal = 0;

export default function Reports() {

    const ind = useRef(0);

    const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];

    const [reportedUsers, setReportedUsers] = useState([])
    const [postText, setPostText] = useState('')
    const [concern, setConcern] = useState('')

    const clicked = useRef(false)
    const blocked = useRef(false)
    const running = useRef(false)

    const navigate = useNavigate()

    const url = window.location.href
    let subG = url.split('/')[3]
    let urlSubG = subG
    for (let i = 0; i < subG.length; i++) {
        if (subG[i] === '%') {
            subG = subG.substring(0, i) + ' ' + subG.substring(i + 3);
        }
    }

    const { getReports, deleteReportedPost, ignoreTheReport } = usePosts()
    const { blockUser } = useSG();

    useEffect(() => {
        const rep = async () => {
            const obj = await getReports(subG, uname)
            const objs = obj["myReports"]
            setReportedUsers([...objs]) // this works!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        rep()
    }, [])

    const openModal = (e) => {
        e.preventDefault()
        const index = e.currentTarget.id
        setTimeout(() => {
            if (!clicked.current) {
                ind.current = index
                setPostText(reportedUsers[index]['postText'])
                setConcern(reportedUsers[index]['reportText'])
                document.getElementsByClassName('details-modal')[0].style.display = 'block'
                document.getElementsByClassName('join-requests')[0].style.filter = 'blur(10px)'
                clicked.current = false // shud I do this or not?
            }
        }, 100)
    }

    const closeModal = (e) => {
        e.preventDefault()
        document.getElementsByClassName('details-modal')[0].style.display = 'none'
        document.getElementsByClassName('join-requests')[0].style.filter = 'blur(0px)'
    }

    const deletePost = async (e, subG, _id) => {
        e.preventDefault()
        clicked.current = true
        const postName = e.currentTarget.id
        await deleteReportedPost(postName, subG, _id)
        // remove the post from the list
        let arr = reportedUsers
        arr.splice(ind.current, 1)
        setReportedUsers([...arr])
    }

    const ignoreReport = async (e, subG, _id) => {
        e.preventDefault()
        clicked.current = true
        const postName = e.currentTarget.id
        await ignoreTheReport(subG, _id)
        // remove the post from the list
        // let arr = reportedUsers
        // arr.splice(ind.current, 1)
        // setReportedUsers([...arr])
        document.getElementById(`${_id}1`).innerHTML = ""
        document.getElementById(`${_id}2`).innerHTML = "Handled"
        document.getElementById(`${_id}3`).innerHTML = ""
    }

    const time = useRef(3)
    const blockTheUser = async (e, postName, subG, _id) => {
        e.preventDefault()
        if (!running.current) {
            running.current = true
            const blockedUser = e.currentTarget.id
            clicked.current = true
            let elem = document.getElementById(e.currentTarget.id)
            elem.innerHTML = 'Cancel 3s'
            blocked.current = true
            const cancelBlock = () => {
                blocked.current = false
                elem.innerHTML = 'Block'
            }
            elem.addEventListener("click", cancelBlock)
            const interval = setInterval(async () => {
                if (!blocked.current) {
                    clearInterval(interval)
                    running.current = false
                    time.current = 3
                    elem.removeEventListener("click", cancelBlock)
                }
                if (time.current === 1) {
                    time.current = 3
                    clearInterval(interval)
                    blocked.current = false
                    running.current = false
                    // elem.innerHTML = 'Block'
                    elem.removeEventListener("click", cancelBlock)
                    // let arr = reportedUsers
                    // arr.splice(ind.current, 1)
                    // setReportedUsers([...arr])
                    await blockUser(blockedUser, subG, postName, _id)
                    document.getElementById(`${_id}1`).innerHTML = ""
                    document.getElementById(`${_id}2`).innerHTML = "Handled"
                    document.getElementById(`${_id}3`).innerHTML = ""
                }
                if (blocked.current) {
                    time.current -= 1
                    elem.innerHTML = `Cancel ${time.current}s`
                }
            }, 1000)
        }
    }

    const goToMSG = (e) => {
        e.preventDefault()
        navigate(`/api/sg/subGreddiits/${urlSubG}`)
    }

    return (
        <>
            <NewNavbar urlSubG={urlSubG} />

            {/* modal */}
            <div className='details-modal'>
                <div className='details-modal-content'>
                    <div className='details-modal-header'>
                        <span className='details-modal-title'><strong>Details</strong></span>
                        <span onClick={closeModal} className='details-modal-close'>&times;</span>
                    </div>
                    <div className='details-modal-body'>
                        <div className='texts1'><strong>Reported Post Text</strong></div>
                        <span className='details-modal-body-content'>{postText}</span>
                        <div className='texts1'><strong>Concern</strong></div>
                        <span className='details-modal-body-content'>{concern}</span>
                    </div>
                </div>
            </div>

            <div className='join-requests'>
                <h1><btn className='extra-subG-heading' onClick={goToMSG}>SubGreddiit: {subG}</btn></h1>
                <div className='join-requests-header'>Reports</div>
                <div className='details-header'>Click to see details</div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Reported</th>
                            <th>Reported By</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedUsers.map((user, index) => {
                            return (
                                <tr value={'yeah'} onClick={openModal} key={keyVal++} className='users' id={index}>
                                    <td className='user-name'>{user['postName']}</td>
                                    <td className='user-name'>{user['who']}</td>
                                    <td className='user-name'>{user['uname']}</td>
                                    {user['handledOrNot'] ? <td></td> : <td id={`${user['_id']}1`}><button id={user['who']} onClick={(e) => blockTheUser(e, user['postName'], user['subG'], user['_id'])} className='table-btn block-btn-table'>Block</button></td>}
                                    {user['handledOrNot'] ? <td>Handled</td> : <td id={`${user['_id']}2`}><button onClick={(e) => deletePost(e, user['subG'], user['_id'])} id={user['postName']} className='table-btn delete-btn-table'>Delete Post</button></td>}
                                    {user['handledOrNot'] ? <td></td> : <td id={`${user['_id']}3`}><button id={user['postName']} onClick={(e) => ignoreReport(e, user['subG'], user['_id'])} className='table-btn ignore-btn-table'>Ignore</button></td>}
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
