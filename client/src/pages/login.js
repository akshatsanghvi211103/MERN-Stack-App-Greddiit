import React from 'react'
import { useState } from 'react'
import '../css/all.css'
import { Link } from 'react-router-dom';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useLogin } from '../hooks/useLogin'
import { createHashHistory } from "history";


export default function Login() {


    const [uname, setUname] = useState('') // of the form
    const [password, setPassword] = useState('')
    const { login, load, error, errRef } = useLogin()
    const history = createHashHistory();
    const submitForm = async (e) => {
        e.preventDefault()
        await login(uname, password)
        if (!errRef.current) {
            history.go("/login");
        }
    }
    return (
        <div className="form">
            <form onSubmit={submitForm} className='form-class2'>
                <div className="form">
                    <div className="text"><strong><FitbitIcon fontSize='large' />&nbsp;&nbsp;&nbsp;GREDDIIT</strong></div>
                    <div className="contain">
                        <Link to='/login' className="heading2 login link">LOGIN</Link>
                        <Link to='/register' className="heading2 link">REGISTER</Link>
                    </div>
                    <div className="input7">
                        <div className="uname">Username</div>
                        <input onChange={(e) => setUname(e.target.value)} value={uname} /* If changed from somewhere else */ type="text" name="username" placeholder="Username" className='input9' />
                    </div>
                    <div className="input7">
                        <div className="pwd">Password</div>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" className='input9' />
                    </div>
                    <div className="input7">
                        <button disabled={load} type="submit" className="btn">Login</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="notmember">Not a member? <Link className='reglink' to="/register">Register Now</Link></div>
                </div>
            </form>
        </div>
    )
}
