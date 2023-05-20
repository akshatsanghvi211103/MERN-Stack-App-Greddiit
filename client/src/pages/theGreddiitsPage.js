import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSG } from '../hooks/useSG'
import Navbar from '../components/navbar'
import '../css/myGreddiits.css'
import { useNavigate } from 'react-router-dom'

let keyVals = 10;

export default function TheGreddiit() {

    const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];

    const [genSubGobj, setGenSubGobj] = useState()
    
    const partOf = useRef([])
    const requestedOrNot = useRef([])
    const rejectedOrNot = useRef([])
    
    let tempSubGobj = {}
    let sortByName = false
    let sortByFollowers = false
    let sortByCreated = false

    const filter = useRef(false)
    
    // let filter = false

    const [name, setName] = useState('')
    const [numInput1, setNumInput1] = useState(1)

    const [len, setLen] = useState(6)

    const { getGenGreddiits, requestJoin } = useSG()
    const navigate = useNavigate()

    useEffect(() => {
        async function getTheSubGs() {
            let obj = await getGenGreddiits()
            let objs = obj["mySubGs"]
            console.log(objs, "objs")
            let counts = 0
            let newObjs = []
            for (let i = 0; i < Object.keys(objs).length; i++) {
                if (objs[i]['members'].includes(uname))
                    partOf.current[objs[i]['name']] = 1
                else
                    partOf.current[objs[i]['name']] = 0
            }
            for (let i = 0; i < Object.keys(objs).length; i++) {
                if (objs[i]['requestedMembers'].includes(uname))
                    requestedOrNot.current[objs[i]['name']] = 1
                else
                    requestedOrNot.current[objs[i]['name']] = 0
            }
            for (let i = 0; i < Object.keys(objs).length; i++) {
                if (objs[i]['rejectedMembers'].includes(uname))
                    rejectedOrNot.current[objs[i]['name']] = 1
                else
                    rejectedOrNot.current[objs[i]['name']] = 0
            }
            for (let i = 0; i < objs.length; i++) {
                if (partOf.current[objs[i]['name']]) {
                    newObjs[counts] = objs[i]
                    counts++
                }
            }
            for (let i = 0; i < objs.length; i++) {
                if (!partOf.current[objs[i]['name']]) {
                    newObjs[counts] = objs[i]
                    counts++
                }
            }

            setGenSubGobj({ ...genSubGobj, ...newObjs })
            tempSubGobj = genSubGobj
            setLen(Object.keys(objs).length)
            
        }
        getTheSubGs()
    }, [])

    const addNewField1 = (e) => {
        e.preventDefault()
        setNumInput1(numInput1 + 1)
        // for (let i = 0; i < numInput1 + 1; i++) {
        //     document.getElementsByClassName('tags-class')[i].style.display = 'block'
        // }
    }

    const doSearch = (e) => {
        e.preventDefault()
        let counts = 0
        let newCounts = 0
        let lowerCase1 = name.toLowerCase()
        let lowerCase2;
        // tempsubgobj will have the object referencing thing of javascirpt ig
        for (let i = 0; i < Object.keys(genSubGobj).length; i++) {
            lowerCase2 = genSubGobj[i]["name"].toLowerCase()
            if (lowerCase2.includes(lowerCase1)) {
                tempSubGobj[counts] = genSubGobj[i]
                counts++
            }
        }
        // let temp = {}
        let temp2 = {}
        // for (let i = 0; i < Object.keys(genSubGobj).length; i++) {
        //     if (genSubGobj[i]["name"].includes(name)) {
        //         temp[counts] = genSubGobj[i]
        //         counts++
        //     }
        // }
        let tagsArr = []
        for (let i = 0; i < numInput1; i++) {
            tagsArr.push(document.getElementsByClassName('tags-class')[i].value)
        }
        if (tagsArr.length !== 1 || tagsArr[0] !== '') {
            for (let i = 0; i < Object.keys(tempSubGobj).length; i++) {
                let flag = false
                for (let j = 0; j < tagsArr.length; j++) {
                    if (tempSubGobj[i]["tags"].includes(tagsArr[j])) {
                        flag = true
                        break
                    }
                }
                if (flag) {
                    temp2[newCounts] = tempSubGobj[i]
                    newCounts++
                }
            }
        }
        else {
            temp2 = tempSubGobj
        }
        setGenSubGobj(temp2)
        setName('')
        setNumInput1(1)
        tagsArr = []
        tempSubGobj = {}
        temp2 = {}
        for (let i = 0; i < numInput1; i++) {
            document.getElementsByClassName('tags-class')[i].value = ''
        }
    }

    //merge all these below functions
    const nameSort = (e) => {
        e.preventDefault()
        sortByName = !sortByName
        if (sortByName)
            document.getElementsByClassName('sort')[0].style.backgroundColor = 'rgb(104 87 194)'
        else
            document.getElementsByClassName('sort')[0].style.backgroundColor = 'buttonface'
    }
    const followerSort = (e) => {
        e.preventDefault()
        sortByFollowers = !sortByFollowers
        if (sortByFollowers)
            document.getElementsByClassName('sort')[1].style.backgroundColor = 'rgb(104 87 194)'
        else
            document.getElementsByClassName('sort')[1].style.backgroundColor = 'buttonface'
    }
    const createdSort = (e) => {
        e.preventDefault()
        sortByCreated = !sortByCreated
        if (sortByCreated)
            document.getElementsByClassName('sort')[2].style.backgroundColor = 'rgb(104 87 194)'
        else
            document.getElementsByClassName('sort')[2].style.backgroundColor = 'buttonface'
    }

    const filterToggle = (e) => {
        filter.current = !(filter.current)
        document.getElementsByTagName('input')[1].disabled = !(filter.current)
        document.getElementsByTagName('input')[2].disabled = !(filter.current)
    }

    const goToMSG = (e) => {
        if (e.currentTarget.value === 'btn') return null
        else navigate(`/api/sg/subGreddiits/${e.currentTarget.id}`)
    }

    const requestForMSG = async (e, index) => {
        document.getElementById(e.currentTarget.id).innerHTML = 'Requested'
        document.getElementById(e.currentTarget.id).disabled = true
        await requestJoin(genSubGobj[index]['name'], uname)
    }


    return (
        <>
            <Navbar />
            <div className='myGreddiitsPage'>
                <div className='myGreddiits'>
                    <div className='heading-MSGs'>Sub Greddiits</div>
                    <div className="image2" style={{
                        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(len))}, 1fr)`
                    }} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                        {genSubGobj && Object.values(genSubGobj).map((eachMSG, theIndex) => {
                            // document.getElementsByClassName('image2')[0].style.gridTemplateColumns=`repeat ${Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}, 1fr`
                            // console.log(Math.ceil(Math.sqrt(Object.keys(genSubGobj).length)))
                            return (
                                <div onClick={partOf.current[eachMSG["name"]] ? goToMSG : null}  key={keyVals && keyVals++} id={eachMSG["name"]} className="eachMSG" style={{
                                    width: `${1100 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`,
                                    height: `${650 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`,
                                    paddingTop: `${50 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`,
                                    fontSize: `${40 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`
                                }}>
                                    <div key={keyVals && keyVals++} className="justforcentering">
                                        <strong><div style={{
                                            fontSize: `${50 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`,
                                            paddingBottom: `${10 / Math.ceil(Math.sqrt(Object.keys(genSubGobj).length))}px`
                                        }} className='nameOfMSG'>{eachMSG["name"]}</div></strong>
                                        CREATOR: {eachMSG["uname"]}<br />
                                        DESC: {eachMSG["description"]}<br />
                                        POSTS: {eachMSG["numPosts"]}<br />
                                        PEOPLE: {eachMSG["numMembers"]}<br />
                                        <div key={keyVals && keyVals++} className='bannedKeywords'>
                                            BANNED KEYWORDS {eachMSG["bannedKeywords"].map((eachBannedKeyword) => {
                                                return (
                                                    <div key={keyVals && keyVals++}>{eachBannedKeyword}</div>
                                                )
                                            })}
                                        </div>
                                        {/* make it approved once the user is approved, but isn't really nessecary */}
                                        {!(partOf.current[eachMSG["name"]]) ? <button value="btn" id={`${theIndex} *`} onClick={(e) => (requestedOrNot.current[eachMSG["name"]] ? null : (rejectedOrNot.current[eachMSG["name"]] ? null : requestForMSG(e, theIndex)))} className='open-btn2 giveZindex'><span id={eachMSG['_id']}>{requestedOrNot.current[eachMSG["name"]] ? "Requested" : (rejectedOrNot.current[eachMSG["name"]] ? "Rejected" : "Join")}</span></button> : null
                        }
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

                <div className='myGreddiitSearch'>
                    <div className='heading-MSGs'>Filter<span className='round'><input type='checkbox' id='checkbox' className='btn-MSGform-newer' onClick={filterToggle}></input><label for='checkbox'></label></span></div>
                    <form onSubmit={doSearch}>
                        <label className='label-MSGform'>Name</label><br />
                        <input onChange={(e) => setName(e.target.value)} value={name} className='input-MSGform label-search' disabled={!(filter.current)}></input>&nbsp;&nbsp;<br />
                        <label className='label-MSGform' id='tags-search'>Tags<button className='btn-MSGform-new' onClick={addNewField1}>+</button></label><br />
                        <div className='input-holder1'>
                            {Array(numInput1).fill().map((_, i) => {
                                return (
                                    <div key={i}>
                                        <input className='input-MSGform tags-class label-search' disabled={!(filter.current)}></input>
                                        <br />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <button className='submit-MSGform' type='submit'>Search</button>
                        <div className='label-MSGform'><strong>Sort By(Not yet)</strong></div>
                        <div><button className='sort' onClick={nameSort}>Name</button></div>
                        <div><button className='sort' onClick={followerSort}>Followers</button></div>
                        <div><button className='sort' onClick={createdSort}>Created on</button></div>
                    </form>
                </div>


            </div>
        </>
    )
}
