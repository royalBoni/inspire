import React from 'react'
import './readFeed.css'
import {FaGenderless,FaHeart,FaCommentDots,FaBookmark,FaRegPaperPlane,FaSpinner,FaEllipsisH} from 'react-icons/fa'
import { useState,useRef,useEffect } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { setViewInspiration } from '../../../../reducxSlices/actionStateSlice'
import { parseISO, formatDistanceToNow } from 'date-fns';

const ReadFeed = ({switchReadPage,setSwitchFeedPage,setSwitchReadPage,selectedPost,numberOfComments,numberOfLikes,likeAndUnlike,bookmarkAndUnbookmark,
  handleSetBookmark,handleSetLike,profiles,postAuthorImg,postAuthorName,userID,comments,setComments,setLowerSection,
  setUpperSection,setHeader,triggerFetchComments,setTriggerFetchComments,handleActive,backID,setOpenCloseUserProfilePage,handleOpenUserProfilePage,
  dayPosted}) => {
    const dispatch=useDispatch()
    const [comment,setComment]=useState('')
    const [loading,setLoading]=useState(false)
    const [placeholder,setPlaceholder]=useState('write a comment...')

    const bottomRef=useRef()
    const commentShowRef=useRef()

    const handleCommentInfo=(id)=>{
      console.log(`${id} is clicked`)
    }

    const handleClickReply=(id)=>{
      commentShowRef.current.scrollIntoView({behavior:'smooth'});
      setComment(postAuthorName(id))
    }

  /* useEffect(()=>{
    bottomRef.current.scrollIntoView({behavior:'smooth'});
  },[triggerFetchComments]) */
    
    const handleSubmitComment=async(id,authorID)=>{
      const datetime =format(new Date(), 'MMMM dd, yyyy pp');
      
      if(comment.length>0){
        try{
          /* const date =format(new Date(), 'EE MM dd, yyyy pp'); */
          const date =new Date();
          const newNotification={date:date,operation:"commented on your post",post_id:id}
          const postNotificationOptions ={
            method : 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(newNotification)
            }

          const notificationResponse=await fetch(`http://localhost:5000/notification/${userID}/${authorID}`,postNotificationOptions)
          const jsonNotificationResponse=notificationResponse.json()
          if(!notificationResponse.ok){
            console.log(jsonNotificationResponse.message)
          }
          else{
            console.log(jsonNotificationResponse.message)
          }
          setLoading(true)
              const newComment={comment:comment,datetime:datetime}
      
              const postOptions ={
              method : 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(newComment)
              }

              const response=await fetch(`http://localhost:5000/comment/${userID}/${id}`,postOptions)

              const jsonfile= await response.json()

              if(!response.ok){
              console.log(jsonfile.message)
              setPlaceholder(jsonfile.message)
             
              }
          
              else{
              
              console.log('successful')
              setTriggerFetchComments(!triggerFetchComments)
              bottomRef.current.scrollIntoView({behavior:'smooth'});
              setComment('')
              setPlaceholder('write a comment...')
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
          finally{
              setLoading(false)
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
            <div className="read-image">{!selectedPost?.inspiration_image_avatar?
            <div className='text' style={{backgroundColor:selectedPost.bgColor,color:selectedPost.fgColor,fontFamily:selectedPost.fStyle}}>{selectedPost.inspiration_content}</div>
            :<img src={selectedPost.inspiration_image_avatar} alt="" />}</div>
            <div className="categoryDateRead">
              <div className='categoryDate'>
                <div className="contentCategory">{selectedPost.category?selectedPost.category:'uncategorized'}</div>
                <FaGenderless/>
                <div className="contentDate">{dayPosted(selectedPost.datetime)}</div>
              </div>
              <div className="contentReadtime">{`${selectedPost.read_time} min read`}</div>
            </div>
            <div className="read-title">{selectedPost.inspiration_title}</div>
            <div className="read-inspiration">{selectedPost.inspiration_content}</div> 

            <div className="interaction">
              <div className="author" onClick={()=>handleOpenUserProfilePage(selectedPost.authorID)}>
                  <div className="author-info">
                      <div className="author-image"><img src={postAuthorImg(selectedPost.authorID)} alt="" /></div>
                      <div className="author-name">{postAuthorName(selectedPost.authorID)?postAuthorName(selectedPost.authorID):'anonymous'}</div>
                  </div>
                                            {/* <div className="post-operation">
                                                <div className="settings">...</div>
                                                <div className="close"><FaTimes/></div>
                                            </div> */}
              </div>
              <div className="metrics" ref={commentShowRef}>
                      <div className="likes">
                        <FaHeart className={likeAndUnlike(selectedPost._id)} onClick={()=>handleSetLike(selectedPost._id,selectedPost.authorID)}/>
                        <div className="number">{numberOfLikes(selectedPost._id)}</div>
                      </div>
                      <div className="comments">
                        <FaCommentDots/>
                        <div className="number">{numberOfComments(selectedPost._id)}</div>
                      </div>
                      <div className="comments">
                        <FaBookmark className={bookmarkAndUnbookmark(selectedPost._id)}  onClick={()=>handleSetBookmark(selectedPost._id)}/>
                      </div>
              </div>
           
                                                           
            </div>
            {/*<div className="comment-input">
             <input type="text" placeholder={placeholder} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            {
              loading?<FaSpinner className='loading-animation post-animation'/>:<FaRegPaperPlane className='post-comment' onClick={()=>handleSubmitComment(selectedPost._id)}/>
            }
          </div> */}
            
        </div>
        <div className="read-content-comment-section">
          <div className="comment-input">
            <input type="text" placeholder={placeholder} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            {
              loading?<FaSpinner className='loading-animation post-animation'/>:<FaRegPaperPlane className='post-comment' onClick={()=>handleSubmitComment(selectedPost._id,selectedPost.authorID)}/>
            }
          </div>
          <div className="comment-read">
            {
              comments.map((item)=>{
                if(item.post_id===selectedPost._id){
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
                              <div className="commenter-content-iteraction-item">{dayPosted(item.comment_date)}</div>
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
        {/* <button onClick={handleBack}>Back</button> */}

      </div>
        
    </div>
  )
}

export default ReadFeed