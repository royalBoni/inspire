import React from 'react'
import './menu.css'
import { FaTimes,FaUsers,FaAngleDown,FaAngleUp,FaBookmark, FaPalette, FaFont,FaUserAlt,FaBug,FaLifeRing,FaTools,FaBook,FaRegSun } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import pic from './me.jpeg'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Menu = ({displayMenu,handleCloseMenu,myInfo,handleActive}) => {
    const [pageWidth,setPageWidth]=useState('')

    const navigate = useNavigate()

    const inspirersFollowed=useSelector((state)=>state.myStates.inspirersFollowed)
    const beenFollowed=useSelector((state)=>state.myStates.beenFollowed)

    const screen =()=>{
        const myWidth = window.innerWidth;
        setPageWidth(myWidth)
    }
    window.onresize = screen;
    window.onload = screen;

    const handleActivateSettings=()=>{
        if(pageWidth<=992){
            handleActive(4)
            handleCloseMenu()
        }
        else{
            handleActive(4)
        }
    }

    const logout =()=>{
        localStorage.removeItem('myInspireAccount')
        navigate('/')
    }
    
  return (
    <div className={displayMenu}>
        <div className='static-top'>
            <div className="menu-header">
                <FaTimes className='menu-close-btn' onClick={handleCloseMenu}/>
                <div className="menu-header-name">Menu</div>
            </div>
                <div className="page-menu-items">
                    <div className="page-menu-profile">
                        <div className="page-menu-profile-pic">
                            {
                            myInfo?.profile_image_avatar?
                            <img src={myInfo?.profile_image_avatar} alt="" />:
                            <FaUserAlt className='user-icon'/>
                            }
                        </div>
                        <div className="page-menu-profile-username">{myInfo?.userName?myInfo?.userName:'undefine'}</div>
                        <div className="page-menu-profile-profilename">{myInfo?.profileName?myInfo?.profileName:'@undefine'}</div>
                        <div className="page-menu-profile-metrics">
                            <div className="metrics-item">
                                <div className="item-number">{inspirersFollowed.length}</div>
                                <div className="item-word">Following</div>
                            </div>
                            <div className="metrics-item">
                                <div className="item-number">{beenFollowed.length}</div>
                                <div className="item-word">Followers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shortcuts">
                <div className="shortcuts-title">Shortcuts</div>
                <ul className="shortcut-items">
                    <li>Group <FaUsers/></li>
                    <li>Bookmarks <FaBookmark/></li>
                    <li onClick={handleActivateSettings}>Settings <FaRegSun/></li>
                </ul>
            </div>

            <div className="profile-page-links">
                <div className="profile-page-links-title">Links</div>
                <ul className="links-items">
                    <li>Blog</li>
                    <li>About</li>
                    <li>Terms and Conditions</li>
                    <li>Help Center</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="profile-page-links">
                <div className="profile-page-links-title">Help and Support</div>
                <ul className="links-items">
                    <li>Help Center <FaLifeRing/></li>
                    <li>Report a problem <FaTools/></li>
                    <li>Report a bug <FaBug/></li>
                    <li>Terms and Policies <FaBook/></li>
                </ul>
            </div>
        

        <button className="log-out-button" onClick={logout}>Log Out</button>
    </div>
  )
}

export default Menu