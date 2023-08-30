import React from 'react'
import './readFeed.css'
import {FaGenderless,FaHeart,FaCommentDots,FaBookmark,FaRegPaperPlane,FaSpinner,FaEllipsisH} from 'react-icons/fa'
import { useState,useRef,useEffect } from 'react'
import { format } from 'date-fns'
import { useDispatch,useSelector } from 'react-redux'
import { setViewInspiration } from '../../../../reducxSlices/actionStateSlice'
import { selectAllComments } from '../../../../reducxSlices/commentsSlice'
import { useAddNewNotificationMutation } from '../../../../reducxSlices/notificationsSlice'
import { useAddNewCommentMutation } from '../../../../reducxSlices/commentsSlice'

const ReadFeed = ({numberOfComments,numberOfLikes,likeAndUnlike,bookmarkAndUnbookmark,handleSetBookmark,handleSetLike,postAuthorImg,postAuthorName,handleOpenUserProfilePage,
  datePosted,userID}) => {

    const dispatch=useDispatch()
    const selectedInspiration = useSelector((state)=>state.myStates.selectedInspiration)
    const [addNewNotification]=useAddNewNotificationMutation()
    const [addNewComment,{isLoading,isSuccess}]=useAddNewCommentMutation()
    const [comment,setComment]=useState('')
    const [placeholder,setPlaceholder]=useState('write a comment...')

    const comments = useSelector(selectAllComments)

    const bottomRef=useRef()
    const commentShowRef=useRef()

    const handleCommentInfo=(id)=>{
      console.log(`${id} is clicked`)
    }

    const handleClickReply=(id)=>{
      commentShowRef.current.scrollIntoView({behavior:'smooth'});
      setComment(postAuthorName(id))
    }

    useEffect(()=>{
      setComment('')
    },[isSuccess])
    
    const handleSubmitComment=async(id,authorID)=>{
      const datetime =format(new Date(), 'MMMM dd, yyyy pp');
      
      if(comment.length>0){
        try{
          if(authorID === userID){
            await addNewComment({comment:comment,datetime:datetime,id,userID})
          }
          else{
            await addNewComment({comment:comment,datetime:datetime,id,userID})
            await addNewNotification({date:new Date(),operation:"commented on your post",post_id:id,userID,authorID})
          }
          }
        catch(err){
          if(err.message==='Failed to fetch'){
              console.log('server or network might be down')
              setPlaceholder('server or network might be down')
            }
          else{
              console.log(err.message)
              setPlaceholder(err.message)
            }
          }
      }
    }

  return (
    <div>
        <div className="read-content">
          <div className="post-header">
            <button onClick={()=>dispatch(setViewInspiration())}>Back</button>
            <div className="post-name">Post</div>
          </div>
          <div className="read-content-details">
            <div className="read-image">{!selectedInspiration?.inspiration_image_avatar?
            <div className='text' style={{backgroundColor:selectedInspiration.bgColor,color:selectedInspiration.fgColor,fontFamily:selectedInspiration.fStyle}}>{selectedInspiration.inspiration_content}</div>
            :<img src={selectedInspiration.inspiration_image_avatar} alt="" />}</div>
            <div className="categoryDateRead">
              <div className='categoryDate'>
                <div className="contentCategory">{selectedInspiration.category?selectedInspiration.category:'General'}</div>
              </div>
              <div className="contentReadtime">{datePosted(selectedInspiration.datetime)}</div>
            </div>
            <div className="read-title">{selectedInspiration.inspiration_title}</div>
            <div className="read-inspiration">{selectedInspiration?.inspiration_image_avatar && selectedInspiration.inspiration_content}</div> 

            <div className="interaction">
              <div className="author" onClick={()=>handleOpenUserProfilePage(selectedInspiration.authorID)}>
                  <div className="author-info">
                      <div className="author-image"><img src={postAuthorImg(selectedInspiration.authorID)} alt="" /></div>
                      <div className="author-name">{postAuthorName(selectedInspiration.authorID)?postAuthorName(selectedInspiration.authorID):'anonymous'}</div>
                  </div>
              </div>
              <div className="metrics" ref={commentShowRef}>
                      <div className="likes">
                        <FaHeart className={likeAndUnlike(selectedInspiration._id)} onClick={()=>handleSetLike(selectedInspiration._id,selectedInspiration.authorID)}/>
                        <div className="number">{numberOfLikes(selectedInspiration._id)}</div>
                      </div>
                      <div className="comments">
                        <FaCommentDots/>
                        <div className="number">{numberOfComments(selectedInspiration._id)}</div>
                      </div>
                      <div className="comments">
                        <FaBookmark className={bookmarkAndUnbookmark(selectedInspiration._id)}  onClick={()=>handleSetBookmark(selectedInspiration._id)}/>
                      </div>
              </div>
           
                                                           
            </div>
            
        </div>
        <div className="read-content-comment-section">
          <div className="comment-input">
            <input type="text" placeholder={placeholder} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            {
              isLoading?<FaSpinner className='loading-animation post-animation'/>:<FaRegPaperPlane className='post-comment' onClick={()=>handleSubmitComment(selectedInspiration._id,selectedInspiration.authorID)}/>
            }
          </div>
          <div className="comment-read">
            {
              comments.map((item)=>{
                if(item.post_id===selectedInspiration._id){
                  return(
                    <div key={item._id} className="individual-comment">
                      <div className="commenter-profile-image" onClick={()=>handleOpenUserProfilePage(item.commenter_id)}>
                        <img src={postAuthorImg(item.commenter_id)} alt="" />
                      </div>
                      <div className="commenter-content">
                        <div className="commenter-content-content">
                          <div className="commenter-content-item">
                            <div className="commenter-name-more">
                              <div className="commenter-name" onClick={()=>handleOpenUserProfilePage(item.commenter_id)}>{postAuthorName(item.commenter_id)?postAuthorName(item.commenter_id):'anonymous'}</div>
                              <div className="commenter-more">{item.commenter_id===userID?<FaEllipsisH onClick={()=>handleCommentInfo(item._id)}/>:null}</div>
                            </div>
                            <div className="commenter-comment">{item.comment}</div>
                          </div>
                          <div className="commenter-content-iteractions">
                            <div className="commenter-content-interactions-actions">
                              <div className="commenter-content-iteraction-item">{datePosted(item.comment_date)}</div>
                              <div className={`commenter-content-iteraction-item ${likeAndUnlike(item._id)}`} onClick={()=>handleSetLike(item._id)}>Like</div>
                              <div className="commenter-content-iteraction-item" onClick={()=>handleClickReply(item.commenter_id)}>Reply</div>
                            </div>
                            <div className="likes">
                              <div className="number">{numberOfLikes(item._id)?numberOfLikes(item._id):null}</div>
                              {
                                numberOfLikes(item._id)?<FaHeart className={likeAndUnlike(item._id)}/>:null
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
            <p className='ref' ref={bottomRef}>.</p>
          </div>
        </div>

      </div>
        
    </div>
  )
}

export default ReadFeed