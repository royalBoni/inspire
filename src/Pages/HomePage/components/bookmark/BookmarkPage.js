import React from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import './bookmarkpage.css'

const BookmarkPage = ({bookmarkPage,handleSeeLess,bookmarked,posts,postAuthorImg,postAuthorName,readBookmark,functionalityUnderDevelopment}) => {
 
  return (
    <div className={`${bookmarkPage}`}>
    <div className="bookmark-page">
                <div className="bookmark-title">
                    <div>Bookmarked</div>
                    <button className='back-button' onClick={()=>handleSeeLess(1)}>Home</button>
                </div>
                <div className="bookmark-content">
                    {
                        bookmarked.map((bkmark)=>{
                            return(
                               <div key={bkmark._id} className='individual-bookmark-content'>
                                   
                                   {
                                       posts.map(item => {
                                        if(item._id===bkmark.post_id){
                                            return(
                                                <div key={item._id} className="content-items">
                                                    {/* <div className="bookmark-image"></div> */}
                                                    <div className="content-items-details">
                                                        <div className="bookmark-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>readBookmark(bkmark.post_id)}>
                                                            {item.inspiration_image_avatar?<img src={item.inspiration_image_avatar} alt="" />:null}
                                                            {
                                                                !item.inspiration_image_avatar?<div className='post-image-text'>{item.inspiration_content}</div>:null    
                                                            }
                                                        </div>
                                                        <div className="bookmark-info">
                                                            <div className="post-category" onClick={()=>readBookmark(bkmark.post_id)}>{item.category?(item.category):'Uncategorized'}</div>
                                                            <div className="title" onClick={()=>readBookmark(bkmark.post_id)}>{item.inspiration_title}</div>
                                                            <div className="author">
                                                                <div className="author-info" onClick={()=>readBookmark(bkmark.post_id)}>
                                                                    <div className="author-image">
                                                                        <img src={postAuthorImg(item.authorID)} alt="" />
                                                                    </div>
                                                                    <div className="author-name">{postAuthorName(item.authorID)?postAuthorName(item.authorID):'anonymous'}</div>
                                                                </div>
                                                                <div className="post-operation-menu" onClick={functionalityUnderDevelopment}>
                                                                    <FaEllipsisH/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            )
                                        }
                                    })
                                   }
                               </div>
                            )
                            
                                    
                            
                        })
                    }
                </div>
            </div>
    
    </div>
  )
}

export default BookmarkPage