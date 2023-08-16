import React from 'react'
import './notification.css'
import { FaEllipsisH } from 'react-icons/fa'
import {useState,useEffect} from 'react'

const NotificationComponent = ({handleBack}) => {
  /* const [checkRadio,setCheckRadio]=useState('') */

  /* useEffect(()=>{
    console.log(checkRadio)
  },[checkRadio]) */
 
  return (
    <div className='notification-settings-page'>
        <div className="notification-settings-page-header">
            <p>Notification</p>
            <button className='nav-close-button' onClick={handleBack}>Back</button>
        </div>

        <div className="notification-settings-page-content">
          <div className="individual-notification-settings">
            System
            {/* <input type='radio' checked={true} onClick={(e)=>{setCheckRadio(e.target.value)}} /> */}
          </div>
          <div className="individual-notification-settings">Likes</div>
          <div className="individual-notification-settings">Comments</div>
          <div className="individual-notification-settings">Follow</div>
          <div className="individual-notification-settings">New post</div>
        </div>
    </div>
  )
}

export default NotificationComponent