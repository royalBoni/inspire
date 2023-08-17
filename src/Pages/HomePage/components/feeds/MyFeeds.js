import React from 'react'
import { FaEllipsisV,FaHeart,FaCommentDots,FaBookmark } from 'react-icons/fa'

const MyFeeds = ({userID,posts,handleSetLike,numberOfLikes,handleReadPost,numberOfComments,
    bookmarkAndUnbookmark,handleSetBookmark,postAuthorImg,postAuthorName,likeAndUnlike}) => {

  return (
    <div>
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
                          {/* <div className="read-time">{item.read_time} {'min read'}</div> */}
                      </div>
                      <div className="post-category">
                        {item.category?item.category:'uncategorized'} 
                        <div className="postMenu" /* onClick={()=>handlePostMenu(item._id,item.authorID)} */>
                          <FaEllipsisV/>
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