import React from 'react'
import './userProfilePage.css'
import {FaBriefcase,FaGraduationCap,FaCalendarAlt,FaMapMarkerAlt,FaArrowLeft,FaUserAlt} from 'react-icons/fa'
import { useState } from 'react'
import UserInspirations from './components/UserInspirations'
import { selectAllProfiles } from '../../../../reducxSlices/profilesSlice'
import { selectAllInspirers } from '../../../../reducxSlices/inspirersSlice'
import { useSelector, useDispatch} from 'react-redux'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { setIsEditProfile,setIsOverColor } from '../../../../reducxSlices/actionStateSlice'

const UserProfilePage = ({handleCloseUserProfilePage,myInfo,postAuthorImg,postAuthorName,handleFollowUnfollow,
  handleOpenUserProfilePage}) => {
  
  const {userID}=useParams()
  const dispatch=useDispatch()
  const pageWidth = useSelector((state)=>state.myStates.pageWidth)

  const profiles = useSelector(selectAllProfiles)
  
  const userProfileID = useSelector((state)=>state.myStates.selectedProfileID)

  const userProfile=profiles.find((item)=>item.userID===userProfileID)

  const [activeItem, setActiveItem]=useState(1)

  const handleDownHeaderActive=(id)=>{
    setActiveItem(id)
  }

  const editProfile =()=>{
    dispatch(setIsEditProfile())
    dispatch(setIsOverColor())
}

  const inspirersFollowed = useSelector((state)=>state.myStates.inspirersFollowed)

  const inspirers = useSelector(selectAllInspirers)
  const usersFollowed=(id)=>{
    const uF=inspirers.filter((item)=>item.fan_id===id)
    return uF
  }
  
  const myFollowers=(id)=>{
    const uF=inspirers.filter((item)=>item.inspirer_id===id)
    return uF
  }


  return (
    <div className='user-profile-page'>

      <div className="user-profile-content">
        <div className="search-nav">
          <div className="back-icon" onClick={handleCloseUserProfilePage}>{pageWidth<768?<button>Back</button>:<FaArrowLeft/>}</div>
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
                {
                  userID===userProfile.userID?
                  <>
                  <button className="message" onClick={editProfile}>Edit Profile</button>
                  <button className="message">View Activities</button>
                  </>:
                  <>
                  <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===userProfile?.userID)?'message':'follow-button'} onClick={()=>handleFollowUnfollow(userProfile?.userID)}>
                  {inspirersFollowed.find((followed)=>followed.inspirer_id===userProfile?.userID)?'following':'follow'}
                  </button>
                  <button className="message">Message</button>
                  </>
                }
                
              </div>
          </div>
        </div>

        <div className="down">
          <div className="user-tagline">{userProfile.bio}</div>
          
          <div className="down-user-info">
            <div className="down-user-info-experience">
              <div className="item">
                {
                  (JSON.parse(userProfile?.work))?.position&&
                  <>
                   <FaBriefcase/> 
                   <p>{`${(JSON.parse(userProfile?.work))?.position} ${(JSON.parse(userProfile?.work))?.company&& `at ${(JSON.parse(userProfile?.work))?.company}`}`}</p>
                  </>
                }

              </div>
              <div className="item">
                {
                  (JSON.parse(userProfile?.education))?.program &&
                  <>
                    <FaGraduationCap/> 
                    <p>{`${(JSON.parse(userProfile?.education))?.program} ${(JSON.parse(userProfile?.education))?.institute&& `at ${(JSON.parse(userProfile?.education))?.institute}`}`}</p>
                  </>
                }
              </div>
                {
                  userProfile.country&&
                  <div className="item">
                    <FaMapMarkerAlt/> 
                    <p>{userProfile.country}</p>
                  </div>
                }
              
              <div className="item">
                <FaCalendarAlt/> 
                <p>{`Joined on ${format(new Date(myInfo?.dateCreated),"MMM dd, yyyy")}`}</p>
              </div>
            </div>
            <div className="down-user-analytics">
              <div className="down-user-analytics-item">{(usersFollowed(userProfile?.userID)).length} <p>Following</p></div>
              <div className="down-user-analytics-item">{(myFollowers(userProfile?.userID)).length} <p>Followers</p></div>
            </div>
          </div>

          <div className="down-header">
            <ul>
              <li className={activeItem===1?'down-header-active':null} onClick={()=>handleDownHeaderActive(1)}>Inpirations</li>
              <li className={activeItem===2?'down-header-active':null} onClick={()=>handleDownHeaderActive(2)}>Following</li>
              <li className={activeItem===3?'down-header-active':null} onClick={()=>handleDownHeaderActive(3)}>Followers</li>
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
           
              <div className="all-followed">
                
                {
                  usersFollowed(userProfile?.userID).length===0?
                  <div className='no-item'>Yet to follow an inspirer</div>:
                  usersFollowed(userProfile?.userID)?.map((item)=>{
                      return(
                          <div key={item._id}>
                              {
                                profiles.map((prof)=>{
                                    if(item.inspirer_id===prof.userID){
                                        return(
                                          <div key={prof.userID} className="individual-account">
                                            <div className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                                <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                <div className="account-details-info">
                                                    <div className="account-details-info-name">{prof.userName}</div>
                                                    <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                </div>
                                            </div>
                                            {
                                              item.inspirer_id!==userID&&
                                              <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following-button':'follow-button'}
                                              onClick={()=>handleFollowUnfollow(prof.userID)}>
                                                  {inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following':'follow'}
                                              </button>
                                            }
                                          </div>
                                        )

                                    }
                                    
                                })
                              }
                          
                          </div>
                          
                      )
                  })
                } 
            </div>
              :
              <div className="all-followed">
                
                {
                  myFollowers(userProfile?.userID).length===0?
                  <div className='no-item'>Yet to follow an inspirer</div>:
                  myFollowers(userProfile?.userID)?.map((item)=>{
                      return(
                          <div key={item._id}>
                              {
                                profiles.map((prof)=>{
                                    if(item.fan_id===prof.userID){
                                        return(
                                          <div key={prof.userID} className="individual-account">
                                            <div className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                                <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                <div className="account-details-info">
                                                    <div className="account-details-info-name">{prof.userName}</div>
                                                    <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                </div>
                                            </div>
                                            {
                                              item.fan_id!==userID&&
                                              <button className={inspirersFollowed.find((followed)=>followed.fan_id===userID)?'following-button':'follow-button'}
                                              onClick={()=>handleFollowUnfollow(prof.userID)}>
                                                  {inspirersFollowed.find((followed)=>followed.fan_id===userID)?'following':'follow'}
                                              </button>

                                              
                                            }
                                          </div>
                                        )

                                    }
                                    
                                })
                              }
                              
                          </div>
                          
                      )
                  })
                } 
            </div>
            }
           
          </div>


        </div>
      </div>
      
    </div>
  )
}

export default UserProfilePage