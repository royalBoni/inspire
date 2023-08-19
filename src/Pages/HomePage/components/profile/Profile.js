import React from 'react'
import { useState,useEffect } from 'react';
import './profile.css'
import { FaAngleDown,FaAngleUp,FaBars,FaEllipsisH, FaList, FaListAlt,FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Timeline from './Timeline';
import About from './About';
import Inspirers from './Inspirers';
import ProfileMenu from '../ProfileMenu';
import MyInspiration from './MyInspiration';
import { selectAllInspirations } from '../../../../reducxSlices/inspirationsSlice';


const Profile = ({bookmarked,allFeed,setAllFeed,
    removeFeedSection,deactivatePostCss,suggestedNoDuplicate,beenFollowed,
    inspirersFollowed,accountProfiles,loadingInspiration,fetchInspirationError,setLowerSection,setUpperSection,myInfo,
    setLikes,likes,likeAndUnlike,bookmarkAndUnbookmark,numberOfLikes,numberOfComments,comments,setComments,
    postAuthorName,postAuthorImg,switchFeedPage,setSwitchReadPage,setSwitchFeedPage,switchReadPage,selectedPost,profiles,
    setTriggerInspirers,triggerInspirers,loadingInspirers,inspirersError,triggerCloseProfileMenu,handleFollowUnfollow,userID,
    handleSetLike,handleReadPost,handleSetBookmark,setBackID,handleOpenUserProfilePage}) => {
    const [timeline,setTimeline]=useState('')
    const [about,setAbout]=useState('active_contol')
    const [inspirers,setInspirers]=useState('')
    const [inspirations,setInspirations]=useState('')
    const [more,SetMore]=useState('')
   
    const [profileOver,setProfileOver]=useState('no-profile-over-color')

    const [activeItem, setActiveItem]=useState(1)


    const[profileMenu,setProfileMenu]=useState('no-profile-menu')

    const handleProfileMenu=()=>{
        setProfileMenu('profile-menu')
        setProfileOver('profile-over-color')
    }

    const handleCloseProfileMenu=()=>{
        setProfileMenu('no-profile-menu')
        setProfileOver('no-profile-over-color')
    }

    const handleControlActive=(id)=>{
        setActiveItem(id)
    }
    
    const posts = useSelector(selectAllInspirations)

    useEffect(()=>{
        if(triggerCloseProfileMenu){
            handleCloseProfileMenu()
        }
    },[triggerCloseProfileMenu])
  return (
    
    <div className='profile-page'>
        <div className={profileOver}></div>
        <ProfileMenu
        handleCloseProfileMenu={handleCloseProfileMenu}
        profileMenu={profileMenu}
        handleControlActive={handleControlActive}/>

        <div className={`upper-section`}>
            <div className="first-info-profile-image">
                {myInfo?.profile_image_avatar?<img src={myInfo?.profile_image_avatar} alt="" />:<FaUserAlt className='profile-emoji'/>}
            </div>
            <div className="upper-section-info" style={{backgroundImage:`url(${myInfo?.profile_image_avatar})`}}>
                <div className="upper-section-info-profile-image">
                    {myInfo?.profile_image_avatar?<img src={myInfo?.profile_image_avatar} alt="" />:<FaUserAlt className='profile-emoji'/>}
                </div>
                <div className="first-info">
                    
                </div>
                <div className="second-info">
                    <div className="names">
                        <div className="userName">{myInfo?.userName}</div>
                        <div className="profileName">{`${myInfo?.profileName}`}</div>
                    </div>
                    <div className="editActivities">
                        <button className="edit">Edit Profile</button>
                        <button className="activities">View Activities</button>
                    </div>
                </div>
            </div>
            <div className="upper-section-controls">
                <div className="first-upper-section-controls">
                </div>
                <div className="second-upper-section-controls">
                    <div className={`upper-section-controls-content ${activeItem===1?'active_contol':null}`} onClick={()=>handleControlActive(1)}>Timeline</div>
                    <div className={`upper-section-controls-content ${activeItem===2?'active_contol':null}`} onClick={()=>handleControlActive(2)}>About</div>
                    <div className={`upper-section-controls-content ${activeItem===3?'active_contol':null}`} onClick={()=>handleControlActive(3)}>Inspirers</div>
                    <div className={`upper-section-controls-content ${activeItem===4?'active_contol':null}`} onClick={()=>handleControlActive(4)}>My Inspirations</div>
                    <div className={`upper-section-controls-content ${activeItem===5?'active_contol':null}`} onClick={()=>handleControlActive(5)}><FaBars/></div>
                </div>
                <div className="mobile-upper-section-controls">
                    <div className="names">
                        <div className="userName">{myInfo?.userName}</div>
                        <div className="profileName">{`${myInfo?.profileName}`}</div>
                    </div>
                    <div className="editActivities">
                        <button className="edit">Edit Profile</button>
                        <button className="activities">View Activities</button>
                        <button className="more" onClick={handleProfileMenu}><FaEllipsisH/></button>
                    </div>
                    <div className="new-section-controls">
                        <div className={`upper-section-controls-content ${timeline}`} onClick={()=>handleControlActive(1)}>Timeline</div>
                        <div className={`upper-section-controls-content ${about}`} onClick={()=>handleControlActive(2)}>About</div>
                        <div className={`upper-section-controls-content ${inspirers}`} onClick={()=>handleControlActive(3)}>Inspirers</div>
                        <div className={`upper-section-controls-content ${inspirations}`} onClick={()=>handleControlActive(4)}>Inspirations</div>
                        <div className={`upper-section-controls-content ${more}`} onClick={()=>handleControlActive(5)}><FaBars/></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='lower-section'>
            {
                activeItem===1?
                <Timeline
                posts={posts}
                loadingInspiration={loadingInspiration}
                fetchInspirationError={fetchInspirationError}
                bookmarked={bookmarked}
                allFeed={allFeed} 
                setAllFeed={setAllFeed}
                removeFeedSection={removeFeedSection}
                deactivatePostCss={deactivatePostCss}
                setLowerSection={setLowerSection}
                setUpperSection={setUpperSection}
                setLikes={setLikes}
                likes={likes}
                likeAndUnlike={likeAndUnlike}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                numberOfLikes={numberOfLikes}
                numberOfComments={numberOfComments}
                comments={comments}
                setComments={setComments}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                switchFeedPage={switchFeedPage}
                setSwitchReadPage={setSwitchReadPage}
                setSwitchFeedPage={setSwitchFeedPage}
                switchReadPage={switchReadPage}
                selectedPost={selectedPost}/>
                :
                activeItem===2?
                <About />
                :
                activeItem===3?
                <Inspirers 
                inspirersFollowed={inspirersFollowed}
                accountProfiles={accountProfiles}
                suggestedNoDuplicate={suggestedNoDuplicate}
                beenFollowed={beenFollowed}
                profiles={profiles}
                setTriggerInspirers={setTriggerInspirers}
                triggerInspirers={triggerInspirers}
                loadingInspirers={loadingInspirers}
                inspirersError={inspirersError}
                handleFollowUnfollow={handleFollowUnfollow}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />
                :
                activeItem===4?
                <MyInspiration 
                userID={userID}
                posts={posts}
                handleSetLike={handleSetLike}
                numberOfLikes={numberOfLikes}
                handleReadPost={handleReadPost}
                numberOfComments={numberOfComments}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                handleSetBookmark={handleSetBookmark}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                likeAndUnlike={likeAndUnlike}
                setBackID={setBackID}/>
                :
                null
            }
        </div>
    </div>
  )
}

export default Profile