import React from 'react'
import './userProfilePage.css'
import {FaBriefcase,FaGraduationCap,FaCalendarAlt,FaMapMarkerAlt,FaArrowLeft,FaUserAlt,FaBookmark,FaCommentDots,FaEllipsisV,FaHeart} from 'react-icons/fa'
import MyFeeds from '../feeds/MyFeeds'
import { useState } from 'react'
import Activities from './components/Activities'
import Groups from './components/Groups'

const UserProfilePage = ({openCloseUserProfilePage,handleCloseUserProfilePage,userProfileID,profiles,myInfo,usersFollowed,myFollowers,
  posts,handleReadPost,postAuthorImg,postAuthorName,likeAndUnlike,handleSetLike,numberOfLikes,numberOfComments,bookmarkAndUnbookmark,
  handleSetBookmark,inspirersFollowed,handleFollowUnfollow}) => {
  const userProfile=profiles.find((item)=>item.userID===userProfileID)



  const [inspirationActive,setInspirationActive]=useState('down-header-active')
  const [activitiesActive,setActivitiesActive]=useState('')
  const [groupsActive,setGroupsActive]=useState('')

  const [inspirationCss,setInspirationCss]=useState('')
  const [activitiesCss,setActivitiesCss]=useState('no-activities')
  const [groupsCss,setGroupCss]=useState('no-groups')

  const handleDownHeaderActive=(id)=>{
    if(id===1){
      setInspirationActive('down-header-active')
      setInspirationCss('')

      setActivitiesActive('')
      setGroupsActive('')

      setActivitiesCss('no-activities')
      setGroupCss('no-groups')
    }

    else if(id===2){
      setActivitiesActive('down-header-active')
      setActivitiesCss('')

      setInspirationActive('')
      setGroupsActive('')

      setGroupCss('no-groups')
      setInspirationCss('no-inspiration')
    }

    else if(id===3){
      setGroupsActive('down-header-active')
      setGroupCss('')

      setInspirationActive('')
      setActivitiesActive('')

      setActivitiesCss('no-activities')
      setInspirationCss('no-inspiration')
    }
    
  }
  return (
    <div className={`${openCloseUserProfilePage}`}>

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
              <li className={`${inspirationActive}`} onClick={()=>handleDownHeaderActive(1)}>Inpirations</li>
              <li className={`${activitiesActive}`} onClick={()=>handleDownHeaderActive(2)}>Activities</li>
              <li className={`${groupsActive}`} onClick={()=>handleDownHeaderActive(3)}>Groups</li>
            </ul>
          </div>

          
          <div className="down-content">
            <div className={`${inspirationCss}`}>
              <MyFeeds 
              posts={posts}
              handleReadPost={handleReadPost}
              postAuthorImg={postAuthorImg}
              postAuthorName={postAuthorName}
              likeAndUnlike={likeAndUnlike}
              handleSetLike={handleSetLike}
              numberOfLikes={numberOfLikes}
              numberOfComments={numberOfComments}
              bookmarkAndUnbookmark={bookmarkAndUnbookmark}
              handleSetBookmark={handleSetBookmark}
              userID={userProfileID}/>
            </div>
            

            <Activities 
            activitiesCss={activitiesCss}/>

            <Groups 
            groupsCss={groupsCss}
            />
   
          </div>


        </div>
              </div>
     
      {/* <button onClick={handleCloseUserProfilePage}>Back</button> */}
      
    </div>
  )
}

export default UserProfilePage