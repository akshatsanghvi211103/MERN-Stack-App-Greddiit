import React, { useRef } from 'react'
import Navbar from '../components/navbar'

// import MyGreddiits from '../components/myGreddiits'
// import GreddiitForm from '../components/greddiitForm'

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useSG } from '../hooks/useSG'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import '../css/myGreddiits.css'
let keyVals = 10;
let invalid = 0;
let translate = 125;

export default function MyGreddiitsPage() {

    const btn = useRef(0);

    const [subGobj, setSubGobj] = useState() // null
    const [len, setLen] = useState(6)

    const navigate = useNavigate();

    const { getMyGreddiits } = useSG()

    useEffect(() => {
        const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];
        async function getTheSubGs() {
            let obj = await getMyGreddiits(uname)
            let objs = obj["mySubGs"]
            setSubGobj({ ...subGobj, ...objs })
            setLen(Object.keys(objs).length)
        }
        getTheSubGs()
    }, [])

    let bannedArr = [];
    let tagsArr = [];

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [numInput1, setNumInput1] = useState(1)
    const [numInput2, setNumInput2] = useState(1)

    const { createSG, deleteSG, errRef1, error } = useSG()

    const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];


    const onHovering = () => {
        if (name === '' || description === '')
            invalid = 1;
        else
            invalid = 0;
        if (invalid) {
            let buttonArr = document.getElementsByTagName('button');
            let button = buttonArr[buttonArr.length - 2];
            button.style.transform = `translateX(${translate}px)`;
            translate *= -1;
        }
    }

    const createMSG = async (e) => {
        e.preventDefault()

        for (let i = 0; i < numInput1; i++) {
            tagsArr.push(document.getElementsByClassName('tags-class')[i].value)
        }
        for (let i = 0; i < numInput2; i++) {
            bannedArr.push(document.getElementsByClassName('banned-class')[i].value)
        }
        let lengths = Object.keys(subGobj).length
        await createSG(uname, name, description, tagsArr, bannedArr)
        if (errRef1.current) {
            errRef1.current = null;
            return;
        }
        let obj = {
            [lengths]: {
                uname: uname,
                name: name,
                description: description,
                tags: tagsArr,
                bannedKeywords: bannedArr,
                posts: [],
                numPosts: 0,
                members: [uname],
                numMembers: 1,
            }
        }
        var newObj = Object.assign({}, subGobj, obj)
        setSubGobj(newObj)
        setLen(len + 1)

        // clear the form and also all the nessecary arrays and stuff
        for (let i = 0; i < numInput1; i++) {
            document.getElementsByClassName('tags-class')[i].value = ''
        }
        for (let i = 0; i < numInput2; i++) {
            document.getElementsByClassName('banned-class')[i].value = ''
        }
        tagsArr = []
        bannedArr = []
        setName('')
        setDescription('')
        setNumInput1(1)
        setNumInput2(1)

        document.getElementsByClassName('open-form-btn')[0].style.display = 'block'
        document.getElementsByClassName('creation-form')[0].style.display = 'none'

    }

    const goToMSG = (e) => {
        e.preventDefault()
        let MSG = e.currentTarget.id
        setTimeout(() => {
            if (btn.current === 0)
                navigate(`/api/sg/subGreddiits/${MSG}`)
        }, 200);
    }

    const deleteMSG = async (e, index) => {
        e.preventDefault()
        btn.current = 1;
        let id = e.currentTarget.id // name of the subG
        await deleteSG(uname, id)
        let newObj = { ...subGobj }
        delete newObj[index]
        setSubGobj(newObj)
        setLen(len - 1)
        btn.current = 0;
    }

    const addNewField1 = (e) => {
        e.preventDefault()
        setNumInput1(numInput1 + 1)
    }
    const addNewField2 = (e) => {
        e.preventDefault()
        setNumInput2(numInput2 + 1)
    }

    const openForm = (e) => {
        e.preventDefault()
        document.getElementsByClassName('open-form-btn')[0].style.display = 'none'
        document.getElementsByClassName('creation-form')[0].style.display = 'block'
    }

    return (
        <>
            <Navbar />
            <div className='myGreddiitsPage'>
                <div className='myGreddiits'>
                    <div className='heading-MSGs'>My Sub Greddiits</div>
                    <div className="image2" style={{
                        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(len))}, 1fr)`
                    }} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                        {subGobj && Object.values(subGobj).map((eachMSG, index) => {
                            // document.getElementsByClassName('image2')[0].style.gridTemplateColumns=`repeat ${Math.ceil(Math.sqrt(Object.keys(subGobj).length))}, 1fr`
                            // console.log(Math.ceil(Math.sqrt(Object.keys(subGobj).length)))
                            return (
                                <div id={eachMSG['name']} onClick={goToMSG} key={keyVals && keyVals++} className="eachMSG" style={{
                                    width: `${900 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`,
                                    height: `${650 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`,
                                    paddingTop: `${30 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`,
                                    fontSize: `${40 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`
                                }}>
                                    <div key={keyVals && keyVals++} className="justforcentering">
                                        <strong><div style={{
                                            fontSize: `${60 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`,
                                            paddingBottom: `${30 / Math.ceil(Math.sqrt(Object.keys(subGobj).length))}px`
                                        }} className='nameOfMSG'>{eachMSG["name"]}</div></strong>
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
                                        {/* <button id={eachMSG["name"]} onClick={goToMSG} className='open-btn'>OPEN</button> */}
                                        <button value={"btns"} id={eachMSG["name"]} onClick={(e) => deleteMSG(e, index)} className='delete-btn'><DeleteOutlineIcon fontSize='large' /></button>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

                <div className='myGreddiitForm'>
                    <div className='heading-MSGs'>Create a new Greddiit</div>
                    <form className='creation-form' onSubmit={createMSG}>
                        <label className='label-MSGform'>Name</label><br />
                        <input onChange={(e) => setName(e.target.value)} value={name} className='input-MSGform'></input>&nbsp;&nbsp;<br />
                        <br /><br />
                        <label className='label-MSGform'>Desrciption</label><br />
                        <input onChange={(e) => setDescription(e.target.value)} value={description} className='input-MSGform'></input>&nbsp;&nbsp;<br />
                        <br /><br />
                        <label className='label-MSGform'>Tags</label><br />
                        <div className='input-holder1'>
                            {Array(numInput1).fill().map((_, i) => {
                                return (
                                    <div key={i}>
                                        <input className='input-MSGform tags-class'></input>
                                        <button className='btn-MSGform btn-MSGform1' onClick={addNewField1}>+</button><br />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <br /><br />
                        <label className='label-MSGform'>Banned Keywords</label><br />
                        <div className='input-holder2'>
                            {Array(numInput2).fill().map((_, i) => {
                                return (
                                    <div key={i}>
                                        <input className='input-MSGform banned-class'></input>
                                        <button className='btn-MSGform btn-MSGform2' onClick={addNewField2}>+</button><br />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <button id='submit-btn-random' className='submit-MSGform' type='submit' onMouseOver={onHovering}>Submit</button>
                        {error && <div className='error-create-modal'>{error}</div>}
                    </form>
                <div className='open-form-btn'>
                    <button className='open-form-btn1' onClick={openForm}>Create subGreddiit</button>
                </div>
                </div>
            </div>
        </>
    )
}
