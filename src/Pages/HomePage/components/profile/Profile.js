import React from 'react'
import { useState,useEffect } from 'react';
import './profile.css'
import { FaBars,FaEllipsisH,FaUserAlt } from 'react-icons/fa';
import Timeline from './Timeline';
import About from './About';
import Inspirers from './Inspirers';
import ProfileMenu from '../ProfileMenu';
import MyInspiration from './MyInspiration';
import { useDispatch,useSelector } from 'react-redux';
import { setIsEditProfile,setIsOverColor } from '../../../../reducxSlices/actionStateSlice';


const Profile = ({setWarning,setWarningMessage,functionalityUnderDevelopment,setOpenCloseUserProfilePage,activateSearch,searchInput,setSearchInput,myInfo,
    postAuthorName,postAuthorImg,triggerCloseProfileMenu,handleFollowUnfollow,userID,handleReadPost,handleOpenUserProfilePage}) => {
   
   
    const dispatch = useDispatch()    
    const [profileOver,setProfileOver]=useState('no-profile-over-color')

    const [activeItem, setActiveItem]=useState(1)


    const[profileMenu,setProfileMenu]=useState('no-profile-menu')

    const handleProfileMenu=()=>{
        setProfileMenu('profile-menu')
        setProfileOver('profile-over-color')
    }

    const handleCloseProfileMenu=()=>{
        setProfileMenu('no-profile-menu')
        setProfileOver('no-profile-over-color')
    }

    const handleControlActive=(id)=>{
        setActiveItem(id)
    }
    
    const editProfile =()=>{
        dispatch(setIsEditProfile())
        dispatch(setIsOverColor())
    }

    useEffect(()=>{
        if(triggerCloseProfileMenu){
            handleCloseProfileMenu()
        }
    },[triggerCloseProfileMenu])
  return (
    
    <div className='profile-page'>
        <div className={profileOver}></div>
        <ProfileMenu
        handleCloseProfileMenu={handleCloseProfileMenu}
        profileMenu={profileMenu}
        handleControlActive={handleControlActive}/>

        <div className={`upper-section`}>
            <div className="first-info-profile-image">
                {myInfo?.profile_image_avatar?<img src={myInfo?.profile_image_avatar} alt="" />:<FaUserAlt className='profile-emoji'/>}
            </div>
            <div className="upper-section-info" style={{backgroundImage:`url(${myInfo?.profile_image_avatar})`}}>
                <div className="upper-section-info-profile-image">
                    {myInfo?.profile_image_avatar?<img src={myInfo?.profile_image_avatar} alt="" />:<FaUserAlt className='profile-emoji'/>}
                </div>
                <div className="first-info">
                    
                </div>
                <div className="second-info">
                    <div className="names">
                        <div className="userName">{myInfo?.userName}</div>
                        <div className="profileName">{`${myInfo?.profileName}`}</div>
                    </div>
                    <div className="editActivities">
                        <button className="edit" onClick={editProfile}>Edit Profile</button>
                        <button className="activities">View Activities</button>
                    </div>
                </div>
            </div>
            <div className="upper-section-controls">
                <div className="first-upper-section-controls">
                </div>
                <div className="second-upper-section-controls">
                    <div className={`upper-section-controls-content ${activeItem===1?'active_contol':null}`} onClick={()=>handleControlActive(1)}>Timeline</div>
                    <div className={`upper-section-controls-content ${activeItem===2?'active_contol':null}`} onClick={()=>handleControlActive(2)}>About</div>
                    <div className={`upper-section-controls-content ${activeItem===3?'active_contol':null}`} onClick={()=>handleControlActive(3)}>Inspirers</div>
                    <div className={`upper-section-controls-content ${activeItem===4?'active_contol':null}`} onClick={()=>handleControlActive(4)}>My Inspirations</div>
                    <div className={`upper-section-controls-content ${activeItem===5?'active_contol':null}`} onClick={()=>handleControlActive(5)}><FaBars/></div>
                </div>
                <div className="mobile-upper-section-controls">
                    <div className="names">
                        <div className="userName">{myInfo?.userName}</div>
                        <div className="profileName">{`${myInfo?.profileName}`}</div>
                    </div>
                    <div className="editActivities">
                        <button className="edit" onClick={editProfile}>Edit Profile</button>
                        <button className="activities">View Activities</button>
                        <button className="more" onClick={handleProfileMenu}><FaEllipsisH/></button>
                    </div>
                    <div className="new-section-controls">
                        <div className={`upper-section-controls-content ${activeItem===1?'active_contol':null}`} onClick={()=>handleControlActive(1)}>Timeline</div>
                        <div className={`upper-section-controls-content ${activeItem===2?'active_contol':null}`} onClick={()=>handleControlActive(2)}>About</div>
                        <div className={`upper-section-controls-content ${activeItem===3?'active_contol':null}`} onClick={()=>handleControlActive(3)}>Inspirers</div>
                        <div className={`upper-section-controls-content ${activeItem===4?'active_contol':null}`} onClick={()=>handleControlActive(4)}>Inspirations</div>
                        <div className={`upper-section-controls-content ${activeItem===5?'active_contol':null}`} onClick={()=>handleControlActive(5)}><FaBars/></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='lower-section'>
            {
                activeItem===1?
                <Timeline
                userID={userID}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                handleFollowUnfollow={handleFollowUnfollow}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                setOpenCloseUserProfilePage={setOpenCloseUserProfilePage}
                activateSearch={activateSearch}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />

                :
                activeItem===2?
                <About 
                myInfo={myInfo}
                editProfile={editProfile}/>
                :
                activeItem===3?
                <Inspirers 
                handleFollowUnfollow={handleFollowUnfollow}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />
                :
                activeItem===4?
                <MyInspiration 
                userID={userID}
                handleReadPost={handleReadPost}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}/>
                :
                null
            }
        </div>
    </div>
  )
}

export default Profile