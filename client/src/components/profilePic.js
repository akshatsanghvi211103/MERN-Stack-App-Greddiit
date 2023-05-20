import React from 'react'
import Follow from './follow';

export default function profilePic({ fname, lname, email }) {
    return (
        <div>
            <div className='image-container'><div className='image'></div></div>
            <div className='profile'>{fname} {lname}</div>
            <div className='profile-email'>{email}</div>
            <Follow />
        </div>
    )
}
