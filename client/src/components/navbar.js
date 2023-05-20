import React from 'react'
import '../css/all.css'
import { Link, Navigate } from "react-router-dom";
import FitbitIcon from '@mui/icons-material/Fitbit';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';

export default function navbar() {
  const logoutNav = () => {
    // remove the user details from local storage
    localStorage.removeItem('theuser')
    Navigate('/')
  }
  const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];
  return (
      <div className='navbar'>
        <ul className='nav'>
          <li className='heading-nav'><Link to='/greddiit' className='info-links'><FitbitIcon fontSize='large'/>&nbsp;&nbsp;&nbsp;GREDDIIT</Link></li>
          <li className='items-nav'><Link to='/profile' className='info-links'><PersonIcon fontSize='small' /> {uname}</Link></li>
          <li className='items-nav'><Link to='/mygreddiits' className='info-links'><DashboardCustomizeIcon fontSize='small' /> My SubGs</Link></li>
          <li className='items-nav'><Link to='/subgreddiits' className='info-links'><DashboardIcon fontSize='small' /> SubGs</Link></li>
          <li className='items-nav'><Link to='/savedPosts' className='info-links'><BookmarkIcon fontSize='small' /> Saved Posts</Link></li>
          <li className='items-nav'><Link onClick={logoutNav} to='/login' className='info-links'>Logout <LogoutIcon fontSize='small' /></Link></li>
        </ul>
      </div>
  )
}
