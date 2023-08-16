import React from 'react'
import{FaCommentDots,FaHeart,FaBookmark} from 'react-icons/fa'

const Posts = ({posts,handleReadPost,likeAndUnlike,numberOfLikes,numberOfComments,bookmarkAndUnbookmark}) => {
    const param=1
    
  return (
    <div className={`posts`}>
                    {
                        posts.map((item)=>{
                            return(
                                <div key={item._id} className="individual-post">

                                    <div className='post-info' onClick={()=>handleReadPost(item._id)}>
                                    <div className="post-image">
                                        <div className="read-time">{item.read_time} min read</div>
                                    </div>
                                    <div className="post-category">{(item.category).toUpperCase()}</div>
                                    <div className="post-title">{item.inspiration_title}</div>
                                    <div className="item-content">{`${(item.inspiration_content).slice(0,80)}...`}</div>
                                    </div>
                                    <div className="interaction">
                                        <div className="author">
                                            <div className="author-info">
                                                <div className="author-image"></div>
                                                <div className="author-name">{item.author_name}</div>
                                            </div>
                                           
                                        </div>
                                        <div className="metrics">
                                            <div className="likes">
                                                <FaHeart className={likeAndUnlike(item._id)} />
                                                <div className="number">{numberOfLikes(item._id)}</div>
                                            </div>
                                            <div className="comments">
                                                <FaCommentDots/>
                                                <div className="number">{numberOfComments(item._id)}</div>
                                            </div>
                                            <div className="comments">
                                                <FaBookmark className={bookmarkAndUnbookmark(item._id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            
  )
}

export default Posts