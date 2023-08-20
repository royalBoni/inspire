import React from 'react'
import { FaTimes,FaHeart,FaCommentDots,FaBookmark, FaLongArrowAltDown, FaSpinner } from 'react-icons/fa'
import './myFeeds.css'
import { useDeleteInspirationMutation } from '../../../../reducxSlices/inspirationsSlice'
import { selectAllLikes, useDeleteLikeMutation, useAddNewLikeMutation } from '../../../../reducxSlices/likesSlice'
import { useAddNewNotificationMutation } from '../../../../reducxSlices/notificationsSlice'
import { selectAllBookmarks, useAddNewBookmarkMutation,useDeleteBookmarkMutation } from '../../../../reducxSlices/bookmarksSlice'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

const MyFeeds = ({userID,posts,handleReadPost,numberOfComments,bookmarkAndUnbookmark,postAuthorImg,postAuthorName}) => {

    const likes = useSelector(selectAllLikes)
    const [deleteLike]=useDeleteLikeMutation()
    const [addNewLike]=useAddNewLikeMutation()
    const [addNewNotification]=useAddNewNotificationMutation()

    const bookmarks= useSelector(selectAllBookmarks)
    const [deleteBookmark]=useDeleteBookmarkMutation()
    const [addNewBookmark] = useAddNewBookmarkMutation()

    const likeAndUnlike=(id)=>{
        const userLiked=likes?.filter((item)=>item.post_id===id)
        const findLiked=userLiked?.filter((item)=>item.liker_id===userID);
        if(findLiked?.length>0){
            return 'activeLikeBtn'
        }
    }

    const numberOfLikes=(id)=>{
      const total=likes?.filter((item)=>item.post_id===id)
      return total?.length
  }

    const handleSetLike=async(id,authorID)=>{
        const findLikes=likes.find((item)=>item.post_id===id&&item.liker_id===userID)
        if(findLikes){
            try{  
            await deleteLike({userID,postID:findLikes.post_id}).unwrap()
            }
            catch(err){
            if(err.message==='Failed to fetch'){
                console.log(`network or server might be down`)
            }
            else{
                console.log(`Error: ${err.message}`)
            }
            } 
        }
        else{
            try{
                await addNewNotification({date:format(new Date(), 'EE MM dd, yyyy pp'),operation:"liked your post",post_id:id,userID,authorID}).unwrap()
                await addNewLike({userID,postID:id}).unwrap()
            }
            catch(err){
                if(err.message==='Failed to fetch'){
                console.log(`network or server might be down`)
                }
                else{
                console.log(`Error: ${err.message}`)
                }
            }
        }
        
    }

    const handleSetBookmark=async(id)=>{
        const findBookmark=bookmarks?.find((item)=>item.post_id===id&&item.bookmarker_id===userID)
        
        try{
          if(findBookmark){
            await deleteBookmark({bookmarkID:findBookmark.post_id,userID:userID})
          }
          else{
            await addNewBookmark({bookmarkID:id,userID})
          }
        }
        catch(err){
          if(err.message==='Failed to fetch'){
            console.log(`network or server might be down`)
          }
          else{
            console.log(`Error: ${err.message}`)
          }
        } 
          
         
      }

    const [deleteInspiration, {isLoading}]=useDeleteInspirationMutation()

    const handleDeletePost=async(postID)=>{
      try{
        await deleteInspiration({postID,userID})
      }
      catch(err){
          console.log(err)
      }
     
    }
  return (
    <div className='my-feed'>
    {
       posts.filter((item)=>item.authorID===userID).length>0?
       posts.filter((item)=>item.authorID===userID).map((item)=>{
            return(
                <div key={item._id} className="individual-post">

                    <div className='post-info'>
                      <div className="post-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>handleReadPost(item._id)}>
                          {item.inspiration_image_avatar?<img src={item.inspiration_image_avatar} alt="" />:null}
                          {
                              !item.inspiration_image_avatar?<div className='text'>{item.inspiration_content}</div>:null    
                          }
                      </div>
                      <div className="post-category">
                        {item.category?item.category:'uncategorized'} 
                        <div className="postMenu" onClick={()=>handleDeletePost(item._id)}>
                            {
                                isLoading?
                                <FaSpinner/>:
                                <FaTimes/>
                            }
                          
                        </div>
                      </div>
                      <div className="post-title">{item.inspiration_title}</div>
                      <div className="item-content">{!item.inspiration_image_avatar?null:`${(item.inspiration_content).slice(0,80)}...`}</div>
                    </div>
                    <div className="interaction">
                        <div className="author">
                            <div className="author-info">
                                <div className="author-image">
                                    <img src={postAuthorImg(item.authorID)} alt="" />
                                </div>
                                <div className="author-name">{postAuthorName(item.authorID)?postAuthorName(item.authorID):'anonymous'}</div>
                            </div>
                            {/* <div className="post-operation">
                                <div className="settings">...</div>
                                <div className="close"><FaTimes/></div>
                            </div> */}
                        </div>
                        <div className="metrics">
                            <div className="likes">
                                <FaHeart className={likeAndUnlike(item._id)} onClick={()=>handleSetLike(item._id,item.authorID)}/>
                                <div className="number">{numberOfLikes(item._id)}</div>
                            </div>
                           <div className="comments"/*  onClick={()=>handleReadMyInspiration(item._id)} */>
                                <FaCommentDots/>
                                <div className="number">{numberOfComments(item._id)}</div>
                            </div>
                            <div className="comments">
                                <FaBookmark className={bookmarkAndUnbookmark(item._id)} onClick={()=>handleSetBookmark(item._id)}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }):
        <p className='inspiration-notice'>You Have Not Created an Inspiration Yet</p>

    }
</div>
  )
}

export default MyFeeds