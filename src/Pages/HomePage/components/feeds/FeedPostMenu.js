import React from 'react'
import './feedpostmenu.css'
import { FaWindowClose,FaToggleOff,FaFlag,FaTimes,FaFrown, FaUserPlus } from 'react-icons/fa'

const FeedPostMenu = ({ userID,postID,posts,setPosts,postMenuStyle,handleUnpostMenu,creatorID,postAuthorName,
  inspirersFollowed,handleFollowUnfollow,functionalityUnderDevelopment}) => {
    const findFollowedOrUnfollowed=inspirersFollowed?.filter((item)=>item.inspirer_id===creatorID)
    const checkForMatch=posts?.find((item)=>item._id===postID)
    const handleDeletePost=async()=>{
      const newPosts=posts.filter((item)=>item._id!==postID)
      handleUnpostMenu()
      setPosts(newPosts)
      console.log(postID)
      try{
        const deleteResponse= await fetch(`http://localhost:5000/inspiration/${postID}/${userID}`,{
          method : 'DELETE'
        })
        const jsonNotification = await deleteResponse.json();
        if(!deleteResponse.ok) throw Error(jsonNotification.message);
        console.log(jsonNotification.message)
        
      }
      catch(err){
          console.log(err)
      }
     
    }

   /*  const functionalityUnderDevelopment=()=>{
      setWarningMessage('functionality under construction')
      setWarning(true)
      setTimeout(() => {
          setWarning(false)
          setWarningMessage(null)
      }, 17000);
    } */
     
  return (
    <div className={`${postMenuStyle}`}>
    <div className="close-post-menu" onClick={handleUnpostMenu}><FaTimes/></div>
    
    {
        checkForMatch?.authorID===userID?
        <div className="feed-post-menu-control" onClick={handleDeletePost}>
          <div className="feed-post-menu-control-item">
            <div className="feed-post-menu-icon">
              <FaWindowClose className='feed-post-menu-control-item-icon'/>
            </div>
            Remove this inspiration
          </div>
        </div>
        :
        <div className="feed-post-menu-control">
          <div className="feed-post-menu-control-item" onClick={functionalityUnderDevelopment}>
            <div className="feed-post-menu-icon">
              <FaFrown className='feed-post-menu-control-item-icon'/>
            </div>
            Not interested in this Inpiration
          </div>
          <div className="feed-post-menu-control-item" onClick={()=>handleFollowUnfollow(creatorID)}>
            <div className="feed-post-menu-icon">
              <FaUserPlus className='feed-post-menu-control-item-icon'/>
            </div>
            {
               findFollowedOrUnfollowed?.length>0?`Unfollow @${postAuthorName(creatorID)}`:`Follow @${postAuthorName(creatorID)}`
            }
            
          </div>
          <div className="feed-post-menu-control-item" onClick={functionalityUnderDevelopment}>
            <div className="feed-post-menu-icon">
              <FaToggleOff className='feed-post-menu-control-item-icon'/>
            </div>
            Turn off notifications about this Inspiration
          </div>
          <div className="feed-post-menu-control-item" onClick={functionalityUnderDevelopment}>
            <div className="feed-post-menu-icon">
              <FaFlag className='feed-post-menu-control-item-icon'/>
            </div>
            Report Inspiration
          </div>
        </div>
    }

    </div>

    
  )
}

export default FeedPostMenu