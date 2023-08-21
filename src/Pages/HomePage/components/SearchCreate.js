import React from 'react'
import './searchcreate.css'
import {FaPlus,FaAngleDown,FaAngleUp,FaSearch,FaGenderless,FaEllipsisH} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { selectAllBookmarks } from '../../../reducxSlices/bookmarksSlice'
import { selectAllInspirations } from '../../../reducxSlices/inspirationsSlice'
import { setViewInspiration } from '../../../reducxSlices/actionStateSlice'
import { setSelectedInspiration } from '../../../reducxSlices/actionStateSlice'

const SearchCreate = ({setSearchInput,searchInput,handleCreatePost,toggleProfile,toggle,profile_image_avatar,
    postAuthorImg,postAuthorName,functionalityUnderDevelopment,handleActive,
    handleFollowUnfollow,handleOpenUserProfilePage,activateSearch}) => {


  const {userID}= useParams();
  const dispatch = useDispatch()

  const bookmarks=useSelector(selectAllBookmarks)
  const inspirations=useSelector(selectAllInspirations)
  const bookmarked=bookmarks?.filter((item)=>item.bookmarker_id===userID)

  const suggested=useSelector((state)=>state.myStates.suggested)
  const inspirersFollowed=useSelector((state)=>state.myStates.inspirersFollowed)

  const readBookmark = (item)=>{
    dispatch(setViewInspiration())
    dispatch(setSelectedInspiration(item))
    console.log(item)
  }

  return (
    <div className="third-box">
        <div className="third-box-content">
            <div className="searchCreateProf">
                <div className="searchCreateProf-item">
                    <input type='search' className='headerHeight' placeholder='search' value={searchInput}
                            onChange={(e)=>setSearchInput(e.target.value)}/>
                    <button onClick={activateSearch}><FaSearch/></button>
                </div>
                <div className="searchCreateProf-item" role='button' onClick={handleCreatePost}>
                    <FaPlus/> inspire
                </div>
                <div className="searchCreateProf-item">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={profile_image_avatar} alt="" />
                        </div>
                        <div className="profile-dropdown" onClick={toggleProfile}>{toggle?<FaAngleUp/>:<FaAngleDown/>}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='third-box-content'>
            <div className="friend-suggest">
                <div className="friend-suggest-title">
                    <div>Suggestions For You</div>
                    <div className="see-all" onClick={()=>handleActive(5)}>See All</div>
                </div>
                <div className="friend-suggest-content">
                    <div className='suggestions'>
                            {
                                suggested?.slice(0,3).map((item)=>{
                                    return(
                                        <div key={item?._id} className="individual-account">
                                            {
                                                            <div className="d">
                                                            <div className="account-details" onClick={()=>handleOpenUserProfilePage(item.userID)}>
                                                                <div className="account-image"><img src={item.profile_image_avatar} alt="" /></div>
                                                                <div className="account-details-info">
                                                                    <div className="account-details-info-name">{item.userName}</div>
                                                                    <div className="account-details-info-profile-name">{item.profileName}</div>
                                                                </div>
                                                            </div>
                                                            </div>      
                                            }
                                            <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.userID)?'following-button':'follow-button'}
                                            onClick={()=>handleFollowUnfollow(item.userID)}>
                                                {inspirersFollowed.find((followed)=>followed.inspirer_id===item.userID)?'following':'follow'}
                                            </button>
                                        </div>
                                        
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        </div>
        <div className='third-box-content'>
            <div className="bookmark">
                <div className="bookmarked-title">
                    <div>Bookmarked</div>
                    <div className="see-all" onClick={()=>handleActive(9)}>See All</div>
                </div>
                <div className="bookmark-content">
                    {
                        (bookmarked.slice(0,3)).map((bkmark)=>{
                            return(
                               <div key={bkmark._id} className='individual-bookmark-content'>
                                   
                                   {
                                       inspirations.map(item => {
                                        if(item._id===bkmark.post_id){
                                            return(
                                                <div key={item._id} className="content-items">
                                                    {/* <div className="bookmark-image"></div> */}
                                                    <div className="content-items-details">
                                                        <div className="bookmark-image" style={{backgroundColor:item.bgColor,color:item.fgColor,fontFamily:item.fStyle}} onClick={()=>readBookmark(item)} >
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
                                                                <div className="post-operation-menu" onClick={()=>functionalityUnderDevelopment('functionality under construction')}>
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
        <div className="third-box-content">
            <ul>
                <li>Blog</li><FaGenderless className='dot-icon'/>
                <li>About</li><FaGenderless className='dot-icon'/>
                <li>Terms</li><FaGenderless className='dot-icon'/>
                <li>Help</li><FaGenderless className='dot-icon'/>
                <li>Contact</li>
            </ul>
        </div>
    </div>
  )
}

export default SearchCreate