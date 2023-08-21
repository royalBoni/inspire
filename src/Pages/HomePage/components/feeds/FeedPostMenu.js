import React from 'react'
import './feedpostmenu.css'
import { useSelector } from 'react-redux'
import { FaWindowClose,FaToggleOff,FaFlag,FaTimes,FaFrown, FaUserPlus,FaSpinner } from 'react-icons/fa'
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice'
import { useDeleteInspirationMutation } from '../../../../reducxSlices/inspirationsSlice'

const FeedPostMenu = ({ userID,postID,handlePostMenu,creatorID,postAuthorName,handleFollowUnfollow,functionalityUnderDevelopment}) => {

    const posts = useSelector(selectAllInspirations)
    const inspirersFollowed=useSelector((state)=>state.myStates.inspirersFollowed)
    const findFollowedOrUnfollowed=inspirersFollowed?.filter((item)=>item.inspirer_id===creatorID)
    const checkForMatch=posts?.find((item)=>item._id===postID)

    const [deleteInspiration, {isLoading}]=useDeleteInspirationMutation()

    const handleDeletePost=async()=>{
      try{
        await deleteInspiration({postID,userID})
        handlePostMenu()
      }
      catch(err){
          console.log(err)
      }
     
    }

  return (
    <div className='feed-post-menu'>
    <div className="close-post-menu" onClick={handlePostMenu}><FaTimes/></div>
    
    {
        checkForMatch?.authorID===userID?
        <>
        {
          isLoading?
          <FaSpinner className='run'/>
          :
          <div className="feed-post-menu-control" onClick={handleDeletePost}>
            <div className="feed-post-menu-control-item">
              <div className="feed-post-menu-icon">
                <FaWindowClose className='feed-post-menu-control-item-icon'/>
              </div>
              Remove this inspiration
            </div>
          </div>
        }
        </>
        :
        <div className="feed-post-menu-control">
          <div className="feed-post-menu-control-item" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
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
          <div className="feed-post-menu-control-item" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
            <div className="feed-post-menu-icon">
              <FaToggleOff className='feed-post-menu-control-item-icon'/>
            </div>
            Turn off notifications about this Inspiration
          </div>
          <div className="feed-post-menu-control-item" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
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