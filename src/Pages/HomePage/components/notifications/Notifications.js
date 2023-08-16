import React from 'react'
import './notification.css'
import { FaEllipsisH,FaComment, FaThumbsUp, FaUserPlus } from 'react-icons/fa'
import {useState} from 'react'
import NotificationMenu from './components/NotificationMenu';
import { selectNotifications } from '../../../../reducxSlices/notificationsSlice';
import { useSelector,useDispatch } from 'react-redux';
import { setSelectedNotification } from '../../../../reducxSlices/actionStateSlice';
import { selectAllProfiles } from '../../../../reducxSlices/profilesSlice';

const Notifications = ({setOverColor,setWarning,setWarningMessage,functionalityUnderDevelopment}) => {
  const dispatch = useDispatch()
  const [openClose,setOpenClose]=useState(false)
  const notifications = useSelector(selectNotifications)
  const profiles=useSelector(selectAllProfiles)

  const handleOpenNotificationMenu=(data)=>{
    if(!openClose){
      dispatch(setSelectedNotification(data))
      setOpenClose(!openClose) 
      setOverColor('over-color')
    }
    else{
      dispatch(setSelectedNotification(null))
      setOpenClose(!openClose) 
      setOverColor('no-over-color') 
    }
    
  }

  return (
    <div className='notification'>
      {
        openClose&&
        <NotificationMenu
        handleOpenNotificationMenu={handleOpenNotificationMenu}
        setWarning={setWarning}
        setWarningMessage={setWarningMessage}
        functionalityUnderDevelopment={functionalityUnderDevelopment}
        />
      }
     
        <div className='notification-page'>
        <div className="notification-page-header">
            Notification
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
                              <img src={prof.profile_image_avatar} alt="" />
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
                                !item.post_id&&
                                <div className="notification-details-message">{`${prof.userName}`} {`${item.operation}`}</div>
                              }

                              {
                                item.post_id&&   
                                <div>
                                  {
                                    notifications.map((post)=>{
                                      if(post._id===item.post_id){
                                        return(
                                          <div key={post._id} className="notification-details-message">{`${prof.userName}`} {`${item.operation}: ${post.inspiration_title}`}</div>
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