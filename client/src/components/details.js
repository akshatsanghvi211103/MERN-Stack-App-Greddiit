import React, { useEffect } from 'react'
import '../css/all.css'
import { useDetails } from '../hooks/useDetails'
import { useState } from 'react'

let translate = 380;
let invalid = 0;
let enable_toggle = true;
export default function Details({ fname, setFname, lname, setLname, email, setEmail }) {

    // useState for all input fields
    const [age, setAge] = useState('')
    const [contact, setContact] = useState('')
    const [uname, setUname] = useState('')
    
    const { updateDetails, getDetails, load, error } = useDetails();

    useEffect(() => {
        let theuname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];
        setUname(theuname)
        async function loadDetails() {
            let details = await getDetails(theuname)
            setFname(details['user']['fname']);
            setLname(details['user']['lname']);
            setAge(details['user']['age']);
            setContact(details['user']['contact']);
            setEmail(details['user']['email']);
            // let objs = 
        }
        loadDetails();
        // const userObject = JSON.parse(localStorage.getItem('theuser'));
        // setFname(userObject['user']['fname']);
        // setLname(userObject['user']['lname']);
        // setAge(userObject['user']['age']);
        // setContact(userObject['user']['contact']);
        // setUname(userObject['user']['uname']);
        // setEmail(userObject['user']['email']);
    }, [])

    const enable = async (e) => {
        e.preventDefault();
        enable_toggle = !enable_toggle;
        let input8list = document.getElementsByClassName('input8');
        for (let i = 0; i < 7; i++) {
            if (i !== 1 && i !== 5 && i !== 6)
                input8list[i].disabled = enable_toggle;
        }
        if (enable_toggle) {
            await updateDetails(fname, lname, age, contact, uname);
            // update the variables in the local storage
            // const userObject = JSON.parse(localStorage.getItem('theuser'));
            // userObject['user']['fname'] = fname;
            // userObject['user']['lname'] = lname;
            // userObject['user']['age'] = age;
            // userObject['user']['contact'] = contact;
            // localStorage.setItem('theuser', JSON.stringify(userObject));
        }
    }
    const onHover = () => {
        let input8list = document.getElementsByClassName('input8');
        let chek = 0;
        for (let i = 0; i < 7; i++) {
            if (i !== 1 && i !== 5 && i !==6 && input8list[i].value === '') {
                invalid = 1;
                chek = 1;
                break;
            }
        }
        if (!chek) invalid = 0;
        if (invalid) {
            document.getElementsByTagName('button')[0].style.transform = `translateX(${translate}px)`;
            translate = translate * -1;
        }
    }

    return (
        <div className='details-container'>
            <form id='user-details' className='form-class1'>
                <div className='details1'>DETAILS</div>
                <div className='flex-box-outer'>
                    <div className='flex-box-inner'>
                        <label className='flex-items' id="fname_label">First Name</label>
                        <input onChange={(e) => setFname(e.target.value)} value={fname} disabled={enable_toggle} className='input8 flex-items' type="text" id="fname" name="fname"  /><br />
                        <label className='flex-items' id="uname_label">User Name</label>
                        <input onChange={(e) => setUname(e.target.value)} value={uname} disabled={1} className='input8 flex-items' type="text" id="uname" name="uname" /><br />
                        <div className='new-flex'>
                            <label className='flex-items contact' id="phnum_label">Contact Number</label>
                            <label className='flex-items age' id="age_label">Age</label>
                        </div>
                        <div className='new-flex'>
                            <input onChange={(e) => setContact(e.target.value)} value={contact} disabled={enable_toggle} className='input8 flex-items phn-input' type="text" id="phnum" name="phnum"  /><br />
                            <input onChange={(e) => setAge(e.target.value)} value={age} disabled={enable_toggle} className='input8 flex-items age-input' type="number" id="age" name="age"  /><br />
                        </div>
                    </div>
                    <div className='flex-box-inner'>
                        <label className='flex-items' id="lname_label">Last Name</label>
                        <input onChange={(e) => setLname(e.target.value)} value={lname} disabled={enable_toggle} className='input8 flex-items' type="text" id="lname" name="lname"  /><br />
                        <label className='flex-items' id="pwd_label">Password</label>
                        <input disabled={1} className='input8 flex-items' type="text" id="pwd" name="pwd" defaultValue={"*****"} /><br />
                        <label className='flex-items' id="email_label">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} disabled={1} className='input8 flex-items' type="text" id="email" name="email" /><br />
                        <br />
                    </div>
                </div>
                {error && <div className='error'>{error}</div>}
                <button onClick={enable} disabled={load} onMouseOver={onHover} className='submit-button' form='user-details' >Change</button>
            </form>
        </div>
    )
}