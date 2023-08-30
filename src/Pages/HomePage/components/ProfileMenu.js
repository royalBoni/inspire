import React from 'react'
import { useState } from 'react'
import './profileMenu.css'
import { FaTimes } from 'react-icons/fa'

const ProfileMenu = ({ handleProfileMenu,handleControlActive}) => {
  return (
    <div className='profile-menu'>
        <FaTimes onClick={handleProfileMenu}/>
        <ul className='profile-menu-items'>
            <li onClick={()=>handleControlActive(1)}>Timeline</li>
            <li onClick={()=>handleControlActive(2)}>About</li>
            <li onClick={()=>handleControlActive(3)}>Inspirers</li>
            <li onClick={()=>handleControlActive(4)}>Inspiration</li>
        </ul>
        
    </div>
  )
}

export default ProfileMenu