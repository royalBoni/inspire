
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { FaCommentDots,FaHeart,FaSearch,FaTimes,FaAngleUp,FaAngleDown,FaBookmark } from 'react-icons/fa'
import { format } from 'date-fns'
import intervalToDuration from 'date-fns/intervalToDuration'
import './feeds.css'
import ReadFeed from './ReadFeed'
import ProductLoadingPage from '../ProductLoadingPage'
import { FaEllipsisV } from 'react-icons/fa'
import FeedPostMenu from './FeedPostMenu'
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice'
import { useSelector,useDispatch } from 'react-redux'
import { setFeedPosts } from '../../../../reducxSlices/actionStateSlice'
import { setViewInspiration } from '../../../../reducxSlices/actionStateSlice'

const Feeds = ({posts,setPosts,userID,profiles,setUpperSection,setLowerSection,loadingInspiration,setHeader,likeAndUnlike,bookmarkAndUnbookmark,
  numberOfLikes,numberOfComments,comments,setComments,handleSetBookmark,handleSetLike, postAuthorName,postAuthorImg,
setSwitchReadPage,setSwitchFeedPage,switchReadPage,selectedPost,triggerFetchComments,setTriggerFetchComments,setOverColor,setWarningMessage,setWarning,
  inspirersFollowed,handleFollowUnfollow,functionalityUnderDevelopment,backID,handleOpenUserProfilePage,setOpenCloseUserProfilePage,
  activateSearch,searchInput,setSearchInput}) => {
   
const dispatch=useDispatch()

const [activeFeedButton, setActiveFeedButton]=useState(0)
const [toggleActiveFeedNavBoard, setToggleActiveFeedNavBoard]=useState(false)

const inspirations= useSelector(selectAllInspirations)

const feedButtonList=['All','Category','Following','Newest','Popular']
const [limitOfInspirationsToDisplay, setLimitOfInspirationsToDisplay]=useState(4)

const [resourceLoading, setResourceLoading]=useState(false)


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

const handleReadPost =()=>{
    dispatch(setViewInspiration())
}

const handleFilterFeedItems=(filterValue,key)=>{
  setActiveFeedButton(key)
  
  if(filterValue==='Category'){
    setToggleActiveFeedNavBoard(!toggleActiveFeedNavBoard)
    return null
  }

  else if(filterValue==='Newest'){
    const arrayTobeSorted=[...inspirations]
    const sortedItems = arrayTobeSorted.sort((a,b)=>{
      return (format(new Date(b.datetime),"t")) - (format(new Date(a.datetime),"t"))
    })
    dispatch(setFeedPosts(sortedItems))
  }

  else if(filterValue==='All'||filterValue==='Following'||filterValue==='Popular'){
    dispatch(setFeedPosts(inspirations))
  }

  else{
    dispatch(setFeedPosts(inspirations.filter((item)=>item.category===filterValue)))
  }
}


const [postID,setPostID]=useState('')
const [creatorID,setCreatorID]=useState('')
const [postMenuStyle,setPostMenuStyle]=useState('no-feed-post-menu')
const handlePostMenu=(id,author)=>{
  setPostMenuStyle('feed-post-menu')
  setPostID(id)
  setCreatorID(author)
  setOverColor('over-color') 
}

const handleUnpostMenu=()=>{
  setPostMenuStyle('no-feed-post-menu')
  setOverColor('no-over-color') 
  setWarning(false)
  setWarningMessage(null)
}
   
    

const dayPosted=(timestamp)=>{
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
      <FeedPostMenu 
      userID={userID}
      postID={postID}
      posts={posts}
      setPosts={setPosts}
      postMenuStyle={postMenuStyle}
      handleUnpostMenu={handleUnpostMenu}
      setWarningMessage={setWarningMessage}
      setWarning={setWarning}
      creatorID={creatorID}
      postAuthorName={postAuthorName}
      inspirersFollowed={inspirersFollowed}
      handleFollowUnfollow={handleFollowUnfollow}
      functionalityUnderDevelopment={functionalityUnderDevelopment}/>

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
                loadingInspiration?
                <ProductLoadingPage
                message='Loading Inspirations'/>:
                
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
                              <div className="post-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>handleReadPost(item._id)}>
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
                                    <div className="comments" onClick={()=>handleReadPost(item._id)}>
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
      <ReadFeed setSwitchReadPage={setSwitchReadPage} setSwitchFeedPage={setSwitchFeedPage} 
      switchReadPage={switchReadPage} selectedPost={selectedPost} numberOfComments={numberOfComments}
      numberOfLikes={numberOfLikes} likeAndUnlike={likeAndUnlike} bookmarkAndUnbookmark={bookmarkAndUnbookmark}
      handleSetBookmark={handleSetBookmark} handleSetLike={handleSetLike} profiles={profiles} postAuthorImg={postAuthorImg}
      postAuthorName={postAuthorName} userID={userID} comments={comments} setComments={setComments}
      setUpperSection={setUpperSection} setLowerSection={setLowerSection} setHeader={setHeader} triggerFetchComments={triggerFetchComments}
      setTriggerFetchComments={setTriggerFetchComments} backID={backID} setOpenCloseUserProfilePage={setOpenCloseUserProfilePage}
      handleOpenUserProfilePage={handleOpenUserProfilePage} dayPosted={dayPosted} />
      }
      </>
    }  
  </>
)
}

export default Feeds