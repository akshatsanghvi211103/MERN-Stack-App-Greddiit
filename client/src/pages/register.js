import React from 'react'
import '../css/all.css'
import { Link, useNavigate } from 'react-router-dom';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister'
import { createHashHistory } from "history";

export default function Register() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [contact, setContact] = useState('')
    const {register, load, error, errRef} = useRegister()
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault()
        // register request
        await register(fname, lname, uname, password, email, age, contact)
        if (!errRef.current) {
            navigate("/login")
        }
    }
    return (
        <div className="form">
            <form onSubmit={submitForm} className='form-class3'>
                <div className="form">
                    <div className="text"><strong><FitbitIcon fontSize='large'/>&nbsp;&nbsp;&nbsp;GREDDIIT</strong></div>
                    <div className="contain">
                        <Link to='/login' className="heading2 link">LOGIN</Link>
                        <Link to='/register' className="heading2 register link">REGISTER</Link>
                    </div>
                    <div className="details2">Please fill in your details</div>
                    <div className="row-flex extra">
                        <div className="input1">
                            <input onChange={(e) => setFname(e.target.value)} value={fname} /* If changed from somewhere else */ className="input11 row-flex-input" type="text" name="first_name" placeholder="First Name"/>
                        </div>
                        <div className="input1">
                            <input onChange={(e) => setLname(e.target.value)} value={lname} className="input11 row-flex-input" type="text" name="last_name" placeholder="Last Name"/>
                        </div>
                    </div>
                    <div className="row-flex extra">
                        <div className="input1">
                            <input onChange={(e) => setUname(e.target.value)} value={uname} className="input11 row-flex-input" type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="input1">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="input11 row-flex-input" type="password" name="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="input10 extra">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='input11' type="text" name="email" placeholder="Email"/>
                    </div>
                    <div className="row-flex extra">
                        <div className="input2">
                            <input onChange={(e) => setAge(e.target.value)} value={age} className="input11 row-flex-input2" type="text" name="age" placeholder="Age"/>
                        </div>
                        <div className="input3">
                            <input onChange={(e) => setContact(e.target.value)} value={contact} className="input11 row-flex-input3" type="number" name="contact_number" placeholder="Contact Number"/>
                        </div>
                    </div>
                    <div className="input10 extra">
                        <button type='submit' disabled={load} className="btn2">Register</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
            </form>
        </div>
    )
}
