import React, { useEffect } from 'react'
import './notification.css'
import {useState} from 'react'

const NotificationComponent = ({handleBack}) => {
  const [checkNotification,setCheckNotification]=useState(false) 
  const [checkLikeNotification, setCheckLikeNotification]=useState(false)
  const [checkCommentNotification, setCheckCommentNotification]=useState(false)
  const [checkFollowNotification, setCheckFollowNotification]=useState(false)

  const notificationSettingsObject ={like:!checkNotification?false:checkLikeNotification,
  follow:!checkNotification?false:checkFollowNotification,
  comment:!checkNotification?false:checkCommentNotification,
  }

 
  return (
    <div className='notification-settings-page'>
        <div className="notification-settings-page-header">
            <p>Notification</p>
            <button className='nav-close-button' onClick={handleBack}>Back</button>
        </div>

        <div className="notification-settings-page-content">
          <div className="individual-notification-settings">
            Turn off notification
            <input type='checkbox' checked={checkNotification} onChange={()=>setCheckNotification(!checkNotification)} /* onClick={()=>handleSetNotificationOnAndOff('all')} */ />
          </div>
          {
            checkNotification&&
            <>
              <div className="individual-settings">Likes <input type='checkbox' checked={checkLikeNotification} onChange={()=>setCheckLikeNotification(!checkLikeNotification)}/></div>
              <div className="individual-settings">Comments <input type='checkbox' checked={checkCommentNotification} onChange={()=>setCheckCommentNotification(!checkCommentNotification)} /></div>
              <div className="individual-settings">Follow <input type='checkbox' checked={checkFollowNotification} onChange={()=>setCheckFollowNotification(!checkFollowNotification)}/></div>
            </>
          } 
        </div>
    </div>
  )
}

export default NotificationComponent