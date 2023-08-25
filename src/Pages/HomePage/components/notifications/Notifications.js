import React from 'react'
import './notification.css'
import { FaEllipsisH,FaComment, FaThumbsUp, FaUserPlus } from 'react-icons/fa'
import {useState,useEffect} from 'react'
import NotificationMenu from './components/NotificationMenu';
import { selectNotifications } from '../../../../reducxSlices/notificationsSlice';
import { useUnloadNotificationCounterMutation } from '../../../../reducxSlices/notificationCounterSlice';
import { useSelector,useDispatch } from 'react-redux';
import { setSelectedNotification } from '../../../../reducxSlices/actionStateSlice';
import { selectAllProfiles } from '../../../../reducxSlices/profilesSlice';
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice';
import { setIsOverColor } from '../../../../reducxSlices/actionStateSlice';

const Notifications = ({functionalityUnderDevelopment,handleOpenUserProfilePage}) => {
  const dispatch = useDispatch()
  const [openClose,setOpenClose]=useState(false)
  const notifications = useSelector(selectNotifications)
  const profiles=useSelector(selectAllProfiles)
  const inspirations = useSelector(selectAllInspirations)

  const [unloadNotificationCounter]=useUnloadNotificationCounterMutation()

  useEffect(()=>{
    unloadNotificationCounter() 
  },[])

  const handleOpenNotificationMenu=(data)=>{
    if(!openClose){
      dispatch(setSelectedNotification(data))
      setOpenClose(!openClose) 
      dispatch(setIsOverColor())
    }
    else{
      dispatch(setSelectedNotification(null))
      setOpenClose(!openClose) 
      dispatch(setIsOverColor()) 
    }
    
  }

  /* const fetchNotification=useSelector(selectNotifications)

  useEffect(()=>{
    console.log(fetchNotification)
  },) */

  return (
    <div className='notification'>
      {
        openClose&&
        <NotificationMenu
        handleOpenNotificationMenu={handleOpenNotificationMenu}
        functionalityUnderDevelopment={functionalityUnderDevelopment}
        />
      }
     
        <div className='notification-page'>
        <div className="notification-page-header">
            <p>Notifications</p>
        </div>

        <div className="notification-page-content">
        {
            notifications?.map((item)=>{
              return(
                <div key={item._id} className="individual-notification">
                  {
                    profiles.map((prof)=>{
                      if(item.initiator_id===prof.userID){
                        return(
                         <div key={prof.userID} className="notification-details">
                            <div className="notification-image">
                              <img src={prof.profile_image_avatar} alt="" onClick={()=>handleOpenUserProfilePage(prof.userID)}/>
                              <div className="operation-icon">
                                {
                                  item.operation==="liked your post"?<FaThumbsUp/>:
                                  item.operation==="commented on your post"?<FaComment/>:
                                  item.operation==="followed you"?<FaUserPlus/>:
                                  null
                                }
                              </div>
                            </div>
                            <div className="notification-details-info">
                              {
                                !item.post_id?
                                <div className="notification-details-message">{`${prof.userName}`} {`${item.operation}`}</div>
                                :
                                <div>
                                  {
                                    inspirations.map((post)=>{
                                      if(post._id===item.post_id){
                                        return(
                                          <div key={post._id} className="notification-details-message">{`${prof.userName}`} {`${item.operation} "${post.inspiration_title}"`}</div>
                                        )
                                      }
                                    })
                                  }
                                </div>                               
                              }

                              <div className="notification-details-date">{`${item.date}`}</div>
                            </div>
                            <FaEllipsisH className="more-icon" onClick={()=>handleOpenNotificationMenu({clickedNotification:item,originatorProfile:prof}/* item._id,prof.userName,item.operation,prof.profile_image_avatar,item.post_id */)}/>
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
    </div>
    </div>
  )
}

export default Notifications