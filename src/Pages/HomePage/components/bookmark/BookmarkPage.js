import React from 'react'
import { FaEllipsisH,FaTimes } from 'react-icons/fa'
import { selectAllBookmarks } from '../../../../reducxSlices/bookmarksSlice'
import { useParams } from 'react-router-dom'
import './bookmarkpage.css'
import { useSelector } from 'react-redux'
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice'
import { useDispatch } from 'react-redux'
import { setViewInspiration,setSelectedInspiration } from '../../../../reducxSlices/actionStateSlice'

const BookmarkPage = ({handleSeeLess,postAuthorImg,postAuthorName,functionalityUnderDevelopment}) => {
 
    const {userID} = useParams()
    const bookmarks = useSelector(selectAllBookmarks)
    const posts = useSelector(selectAllInspirations)
    const bookmarked=bookmarks?.filter((item)=>item.bookmarker_id===userID)
    const pageWidth = useSelector((state)=>state.myStates.pageWidth)

    const dispatch = useDispatch()

    const readBookmark = (item)=>{
        dispatch(setViewInspiration())
        dispatch(setSelectedInspiration(item))
        handleSeeLess(1)
      }

  return (

    <div className="bookmark-page">
        <div className="bookmark-title">
            <div>Bookmarked</div>
            <button className='back-button' onClick={()=>handleSeeLess(1)}><FaTimes/></button>
        </div>
        <div className="bookmark-content">
            {
               bookmarked.length===0?
               <div className='no-item'>No inspiration bookmarked yet</div>:
               bookmarked.map((bkmark)=>{
                return(
                    <div key={bkmark._id} className='individual-bookmark-content'>
                        
                        {
                            posts.map(item => {
                            if(item._id===bkmark.post_id){
                                return(
                                    <div key={item._id} className="content-items">
                                        <div className="content-items-details">
                                            <div className="bookmark-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>readBookmark(item/* bkmark.post_id */)}>
                                                {item.inspiration_image_avatar?<img src={item.inspiration_image_avatar} alt="" />:null}
                                                {
                                                    !item.inspiration_image_avatar?<div className='post-image-text'>{item.inspiration_content}</div>:null    
                                                }
                                            </div>
                                            <div className="bookmark-info">
                                                <div className="post-category" onClick={()=>readBookmark(item)}>{item.category?(item.category):'General'}</div>
                                                <div className="title" onClick={()=>readBookmark(item)}>{item.inspiration_title}</div>
                                                <div className="author">
                                                    <div className="author-info" onClick={()=>readBookmark(item)}>
                                                        <div className="author-image">
                                                            <img src={postAuthorImg(item.authorID)} alt="" />
                                                        </div>
                                                        <div className="author-name">{postAuthorName(item.authorID)?postAuthorName(item.authorID):'anonymous'}</div>
                                                    </div>
                                                    {
                                                        pageWidth>992&&
                                                        <div className="post-operation-menu" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
                                                        <FaEllipsisH/>
                                                        </div>
                                                    }
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
  )
}

export default BookmarkPage