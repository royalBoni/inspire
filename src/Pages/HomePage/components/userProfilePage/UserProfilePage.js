import React from 'react'
import './userProfilePage.css'
import {FaBriefcase,FaGraduationCap,FaCalendarAlt,FaMapMarkerAlt,FaArrowLeft,FaUserAlt} from 'react-icons/fa'
import MyFeeds from '../feeds/MyFeeds'
import { useState } from 'react'
import Activities from './components/Activities'
import Groups from './components/Groups'
import UserInspirations from './components/UserInspirations'
import { selectAllProfiles } from '../../../../reducxSlices/profilesSlice'
import { useSelector} from 'react-redux'

const UserProfilePage = ({handleCloseUserProfilePage,myInfo,usersFollowed,myFollowers,postAuthorImg,postAuthorName,handleFollowUnfollow}) => {
  
 
  const profiles = useSelector(selectAllProfiles)
  
  const userProfileID = useSelector((state)=>state.myStates.selectedProfileID)

  const userProfile=profiles.find((item)=>item.userID===userProfileID)

  const [activeItem, setActiveItem]=useState(1)

  const handleDownHeaderActive=(id)=>{
    setActiveItem(id)
  }

  const inspirersFollowed = useSelector((state)=>state.myStates.inspirersFollowed)

  
  {/* <MyFeeds 
              postAuthorImg={postAuthorImg}
              postAuthorName={postAuthorName}
              userID={userProfileID}/> */}


  return (
    <div className='user-profile-page'>

      <div className="user-profile-content">
        <div className="search-nav">
          <div className="back-icon" onClick={handleCloseUserProfilePage}><FaArrowLeft/></div>
          <input type="text" placeholder='search' />
          <div className="my-profile">
            <img src={myInfo?.profile_image_avatar} alt="" />
          </div>
        </div>
        <div className="top"> 
          <div className={`top-top`}  style={{backgroundImage:`url(${userProfile?.profile_image_avatar})`}}>
            <div className="top-top-image">
                {userProfile?.profile_image_avatar?<img src={userProfile?.profile_image_avatar} alt="" />:<FaUserAlt className='profile-emoji'/>}
            </div>
          </div> 
          <div className="top-down">
              <div className="top-down-names">
                <div className="top-down-userName">{userProfile?.userName}</div>
                <div className="top-down-profieName">{userProfile?.profileName}</div>
              </div>

              <div className="top-down-buttons">
                <button /* className="follow" */ className={inspirersFollowed.find((followed)=>followed.inspirer_id===userProfile?.userID)?'message':'follow-button'} onClick={()=>handleFollowUnfollow(userProfile?.userID)}>
                  {inspirersFollowed.find((followed)=>followed.inspirer_id===userProfile?.userID)?'following':'follow'}
                </button>
                <button className="message">Message</button>
              </div>
          </div>
        </div>

        <div className="down">
          <div className="user-tagline">"i am a tech savy who will stop at nothing until i achieve my aim"</div>
          
          <div className="down-user-info">
            <div className="down-user-info-experience">
              <div className="item">
                <FaBriefcase/> 
                <p>Web Developer</p>
              </div>
              <div className="item">
                <FaGraduationCap/> 
                <p>University of energy and natural resources</p>
              </div>
              <div className="item">
                <FaMapMarkerAlt/> 
                <p>Brahabebome</p>
              </div>
              <div className="item">
                <FaCalendarAlt/> 
                <p>Joined May 2015</p>
              </div>
            </div>
            <div className="down-user-analytics">
              <div className="down-user-analytics-item">{usersFollowed(userProfile?.userID)} <p>Following</p></div>
              <div className="down-user-analytics-item">{myFollowers(userProfile?.userID)} <p>Followers</p></div>
            </div>
          </div>

          <div className="down-header">
            <ul>
              <li className={activeItem===1?'down-header-active':null} onClick={()=>handleDownHeaderActive(1)}>Inpirations</li>
              <li className={activeItem===2?'down-header-active':null} onClick={()=>handleDownHeaderActive(2)}>Activities</li>
              <li className={activeItem===3?'down-header-active':null} onClick={()=>handleDownHeaderActive(3)}>Groups</li>
            </ul>
          </div>

          
          <div className="down-content">
            {
              activeItem===1?
              <UserInspirations
              postAuthorImg={postAuthorImg}
              postAuthorName={postAuthorName}
              userProfileID={userProfileID}
              />:
              activeItem===2?
              <Activities/>:
              <Groups/>
            }
           
          </div>


        </div>
      </div>
      
    </div>
  )
}

export default UserProfilePage