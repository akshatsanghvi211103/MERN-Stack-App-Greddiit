import React from 'react'
import Details from './details';
import PorfilePic from './profilePic';
import '../css/all.css'
import { useState } from 'react'
import Navbar from './navbar'

export default function Container() {
  const [fname, setFname] = useState('') // make these 2 states global and pass them thru props
  const [lname, setLname] = useState('') // make these 2 states global and pass them thru props
  const [email, setEmail] = useState('') // make these 2 states global and pass them thru props
  return (
    <>
      <Navbar />
      <div className='container'>
        <PorfilePic fname={fname} setFname={setFname} lname={lname} setLname={setLname} email={email} setEmail={setEmail} />
        <Details fname={fname} setFname={setFname} lname={lname} setLname={setLname} email={email} setEmail={setEmail} />
      </div>
    </>
  )
}
