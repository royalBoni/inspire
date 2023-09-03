
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { FaCommentDots,FaHeart,FaSearch,FaTimes,FaAngleUp,FaAngleDown,FaBookmark, FaPlus } from 'react-icons/fa'
import { format } from 'date-fns'
import intervalToDuration from 'date-fns/intervalToDuration'
import './feeds.css'
import ReadFeed from './ReadFeed'
import ProductLoadingPage from '../ProductLoadingPage'
import { FaEllipsisV } from 'react-icons/fa'
import FeedPostMenu from './FeedPostMenu'
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice'
import { selectAllComments } from '../../../../reducxSlices/commentsSlice'
import { selectAllBookmarks,useAddNewBookmarkMutation ,useDeleteBookmarkMutation} from '../../../../reducxSlices/bookmarksSlice'
import { selectAllLikes, useDeleteLikeMutation, useAddNewLikeMutation } from '../../../../reducxSlices/likesSlice'
import { useAddNewNotificationMutation } from '../../../../reducxSlices/notificationsSlice'
import { useSelector,useDispatch } from 'react-redux'
import { setIsOverColor,setIsCreatePost,setViewInspiration,setFeedPosts,setSelectedInspiration } from '../../../../reducxSlices/actionStateSlice'

const Feeds = ({userID,postAuthorName,postAuthorImg,handleFollowUnfollow,functionalityUnderDevelopment,handleOpenUserProfilePage,setOpenCloseUserProfilePage,
  activateSearch,searchInput,setSearchInput}) => {
   
const dispatch=useDispatch()

const comments = useSelector(selectAllComments)
const likes = useSelector(selectAllLikes)
const [deleteLike]=useDeleteLikeMutation()
const [addNewLike]=useAddNewLikeMutation()
const [addNewNotification]=useAddNewNotificationMutation()

const bookmarks= useSelector(selectAllBookmarks)
const [deleteBookmark]=useDeleteBookmarkMutation()
const [addNewBookmark] = useAddNewBookmarkMutation()

const [activeFeedButton, setActiveFeedButton]=useState(0)
const [toggleActiveFeedNavBoard, setToggleActiveFeedNavBoard]=useState(false)

const [feedMenu, setFeedMenu]=useState(false)

const inspirations= useSelector(selectAllInspirations)

const feedButtonList=['All','Category','Following','Oldest','Popular']
const [limitOfInspirationsToDisplay, setLimitOfInspirationsToDisplay]=useState(4)

const [resourceLoading, setResourceLoading]=useState(false)

const handleCreatePost=()=>{
  dispatch(setIsOverColor())
  dispatch(setIsCreatePost())
} 

const scrolling =(e)=>{
  if ((e.target.scrollHeight - e.target.scrollTop)-4 < e.target.clientHeight) { 
      setLimitOfInspirationsToDisplay(limitOfInspirationsToDisplay+4)
  }
}

const datePosted=(rawDate)=>{
  const interval=intervalToDuration({
    start: new Date(rawDate),
      end: new Date()
  })
  const decision=interval.years>0?`${interval.years}years`:
  interval.months>0?format(new Date(rawDate),"MMM dd, yyyy"):
  interval.weeks>0?`${interval.weeks}w`:
  interval.days>0?`${interval.days}d`:
  interval.hours>0?`${interval.hours}h`:
  interval.minutes>0?`${interval.minutes}m`:
  interval.seconds>0?`${interval.seconds}s`:
  null
  
  return decision
}

const feedPosts=useSelector((state)=>state.myStates.feedPosts)
const isSearched=useSelector((state)=>state.myStates.isSearched)
const viewInspiration=useSelector((state)=>state.myStates.viewInspiration)
const openMobileSearchComponent=useSelector((state)=>state.myStates.openMobileSearchComponent)

const handleReadPost =(item)=>{
    dispatch(setViewInspiration())
    dispatch(setSelectedInspiration(item))
}

const handleFilterFeedItems=(filterValue,key)=>{
  setActiveFeedButton(key)
  
  if(filterValue==='Category'){
    setToggleActiveFeedNavBoard(!toggleActiveFeedNavBoard)
    return null
  }

  else if(filterValue==='Oldest'){
    const arrayTobeSorted=[...inspirations]
    const sortedItems = arrayTobeSorted.sort((a,b)=>{
      return (format(new Date(a.datetime),"t")) - (format(new Date(b.datetime),"t"))
    })
    dispatch(setFeedPosts(sortedItems))
  }

  else if(filterValue==='All'||filterValue==='Following'||filterValue==='Popular'){
    const arrayTobeSorted=[...inspirations]
      const sortedItems = arrayTobeSorted.sort((a,b)=>{
        return (format(new Date(b.datetime),"t")) - (format(new Date(a.datetime),"t"))
      })
      dispatch(setFeedPosts(sortedItems))
  }

  else{
    dispatch(setFeedPosts(inspirations.filter((item)=>item.category===filterValue)))
  }
}


const [postID,setPostID]=useState('')
const [creatorID,setCreatorID]=useState('')
const handlePostMenu=(id,author)=>{
  setCreatorID(author)
  setPostID(id)
  setFeedMenu(!feedMenu)
  dispatch(setIsOverColor()) 
}

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
        if(userID===authorID){
          await addNewLike({userID,postID:id})
        }
        else{
          await addNewLike({userID,postID:id})
          await addNewNotification({date:format(new Date(), 'EE MM dd, yyyy pp'),operation:"liked your post",post_id:id,userID,authorID})
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

const bookmarkAndUnbookmark=(id)=>{
  const userbook=bookmarks?.filter((item)=>item.post_id===id)
  const findbook=userbook?.find((item)=>item.bookmarker_id===userID);
  if(findbook){
      return 'activeLikeBtn'
  } 
}

const numberOfComments=(id)=>{
  const total=comments.filter((item)=>item.post_id===id)
  return total?.length
}
   

return (
  
  <>
    {
      resourceLoading?
      <ProductLoadingPage message='loading inspirations'/>:
    <>
    {
    !viewInspiration?
    <div className='feed-box'>
      {
        feedMenu&&
        <FeedPostMenu 
        userID={userID}
        postID={postID}
        handlePostMenu={handlePostMenu}
        creatorID={creatorID}
        postAuthorName={postAuthorName}
        handleFollowUnfollow={handleFollowUnfollow}
        functionalityUnderDevelopment={functionalityUnderDevelopment}/>
        }

      <div className='feed-box-content favorite-inspires'>
          <div className="feed-box-content-title i">Favorite Authors</div>
          <div className="feed-box-content-content">
              
          </div>
      </div>

      <div className='feed-box-content feeds'>
          {
            openMobileSearchComponent?
            
            <div className='input'>
                <input type='search' className='headerHeight' placeholder='search' value={searchInput}
                          onChange={(e)=>setSearchInput(e.target.value)}/>
                <button onClick={activateSearch}><FaSearch/></button>
            </div>:
            !isSearched||feedPosts.length===inspirations.length?
            <div className='feed-title'>
              <div>Feeds</div>
              <div className='feed-nav'>
              {
                feedButtonList.map((value, key)=>{
                  return(
                    <div className={`feed-nav-item ${activeFeedButton===key?'active-feed':null}`} key={key} onClick={()=>handleFilterFeedItems(value,key)}>{value}
                    {value==='Category' &&activeFeedButton===key &&toggleActiveFeedNavBoard&&
                      <div className="category-list">
                          <div className="category-list-item" onClick={()=>handleFilterFeedItems('Motivation',5)}>Motivation</div>
                          <div className="category-list-item" onClick={()=>handleFilterFeedItems('Love',6)}>love</div>
                      </div>}
                    </div>
                  )
                })
              }
              </div>
              
            </div>
            :
            <div className='feed-title'>
                <div>Search Items</div>
                <div className='feed-nav'>{feedPosts.length}</div>
            </div>
            
          }
    

        <div className="feed-box-content-content feeds-content" onScroll={scrolling}>
          <div className='feed-box-content-content-item'>
              {
                resourceLoading?
                <ProductLoadingPage
                message='Loading Inspirations'/>:
                
                  feedPosts.length===0?
                  <div className='no-post'>
                    <p>No Post</p>
                    <div className='add-new-post' onClick={handleCreatePost}>
                      <FaPlus/>
                      Add a Post
                    </div>
                  </div>:
                  feedPosts?.slice(0,limitOfInspirationsToDisplay).map((item)=>{
                    return(
                        <div key={item._id} className="individual-post">
                          <div className="post-category">
                            {item.category?item.category:'General'} 
                            <div className="postMenu" onClick={()=>handlePostMenu(item._id,item.authorID)}>
                              <FaEllipsisV/>
                            </div>
                          </div>
                          <div className='post-info'>
                            <div className="post-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>handleReadPost(item)}>
                                {item.inspiration_image_avatar?<img src={item.inspiration_image_avatar} alt="" />:null}
                                {
                                    !item.inspiration_image_avatar?<div className='text'>{item.inspiration_content}</div>:null    
                                }
                            </div>

                            <div className="post-title">
                              {item.inspiration_title}
                              <div className="commenter-content-iteraction-item">{datePosted(item.datetime)}</div>
                            </div>
                            <div className="item-content">{!item.inspiration_image_avatar?null:`${(item.inspiration_content).slice(0,80)}...`}</div>
                          </div>
                          <div className="interaction">
                              <div className="author" onClick={()=>handleOpenUserProfilePage(item.authorID)}>
                                  <div className="author-info">
                                      <div className="author-image">
                                          <img src={postAuthorImg(item.authorID)} alt="" />
                                      </div>
                                      <div className="author-name">{postAuthorName(item.authorID)?postAuthorName(item.authorID):'anonymous'}</div>
                                  </div>
                              </div>
                              <div className="metrics">
                                  <div className="likes">
                                      <FaHeart className={likeAndUnlike(item._id)} onClick={()=>handleSetLike(item._id,item.authorID)}/>
                                      <div className="number">{numberOfLikes(item._id)}</div>
                                  </div>
                                  <div className="comments" onClick={()=>handleReadPost(item)}>
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
                  })
                }
            </div>
                    
          </div>            
        </div>
                
      </div>:
      <ReadFeed 
      userID={userID} numberOfComments={numberOfComments} numberOfLikes={numberOfLikes} likeAndUnlike={likeAndUnlike} bookmarkAndUnbookmark={bookmarkAndUnbookmark}
      handleSetBookmark={handleSetBookmark} handleSetLike={handleSetLike}  postAuthorImg={postAuthorImg} datePosted={datePosted} 
      postAuthorName={postAuthorName} setOpenCloseUserProfilePage={setOpenCloseUserProfilePage} handleOpenUserProfilePage={handleOpenUserProfilePage} />
      }
      </>
    }  
  </>
)
}

export default Feeds