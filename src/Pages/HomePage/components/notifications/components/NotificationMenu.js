import React from 'react'
import './notificationMenu.css'
import { FaTimes,FaTools,FaWindowClose,FaToggleOff } from 'react-icons/fa'
import { useDeleteNotificationMutation } from '../../../../../reducxSlices/notificationsSlice'
import { selectInspirationById } from '../../../../../reducxSlices/inspirationsSlice'
import { useSelector } from 'react-redux'

const NotificationMenu = ({handleOpenNotificationMenu,functionalityUnderDevelopment}) => {

  const notificationData=useSelector((state)=>state.myStates.selectedNotification)
  const inspiration = useSelector((state)=>selectInspirationById(state,notificationData?.clickedNotification.post_id))
  const [deleteNotification,{isSuccess}]=useDeleteNotificationMutation()

  if(isSuccess){
    functionalityUnderDevelopment('Notification removed')
  }

  const handleDeleteNotification=async()=>{
    try{
      if(window.navigator.onLine){

          await deleteNotification({notificationId:notificationData.clickedNotification._id})
          handleOpenNotificationMenu(null)
      }
      else{
        console.log('there is no network connectivity')
      }
    }
    catch(err){
        console.log(err)
    }
   
  }

  return (
    <div className='open'>
    <div onClick={()=>handleOpenNotificationMenu(null)} className="closeNotificationItem"><FaTimes/></div>
    <div className="notificationImage"><img src={notificationData?.originatorProfile.profile_image_avatar} alt="" /></div>
    <div className="notification-message-item">{`${notificationData?.originatorProfile.profileName} ${notificationData?.clickedNotification.operation}: ${notificationData?.clickedNotification.post_id?JSON.stringify(inspiration?.inspiration_title):''}`}</div>
    <div className="notificationControls">
      <div className="notificationControls-item" onClick={handleDeleteNotification}>
        <div className="noti-icon">
          <FaWindowClose className='notificationControls-item-icon'/>
        </div>
         Remove this notification
      </div>
      <div className="notificationControls-item" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
        <div className="noti-icon">
          <FaToggleOff className='notificationControls-item-icon'/>
        </div>
         Turn off notifications about this photo
      </div>
      <div className="notificationControls-item" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
        <div className="noti-icon">
          <FaTools className='notificationControls-item-icon'/>
        </div>
         Report issue to inspire Notification Team
      </div>
    </div>
    </div>
  )
}

export default NotificationMenu