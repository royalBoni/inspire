import React from 'react'
import { useState,useEffect } from 'react';
import './profile.css'
import { FaAngleDown,FaAngleUp,FaBars,FaEllipsisH, FaList, FaListAlt,FaUserAlt } from 'react-icons/fa';
import Timeline from './Timeline';
import About from './About';
import Inspirers from './Inspirers';
import ProfileMenu from '../ProfileMenu';
import MyInspiration from './MyInspiration';


const Profile = ({deactivateProfile,myProfile,setTrigger,posts,bookmarked,setBookmarked,allFeed,setAllFeed,
    removeFeedSection,deactivatePostCss,suggestedNoDuplicate,beenFollowed,upperSection,lowerSection,
    inspirersFollowed,accountProfiles,loadingInspiration,fetchInspirationError,setLowerSection,setUpperSection,myInfo,
    setLikes,likes,likeAndUnlike,bookmarkAndUnbookmark,numberOfLikes,numberOfComments,comments,setComments,
    postAuthorName,postAuthorImg,switchFeedPage,setSwitchReadPage,setSwitchFeedPage,switchReadPage,selectedPost,profiles,
    setTriggerInspirers,triggerInspirers,loadingInspirers,inspirersError,triggerCloseProfileMenu,handleFollowUnfollow,userID,
    handleSetLike,handleReadPost,handleSetBookmark,setBackID,handleOpenUserProfilePage}) => {
    const {profile_holder_name,profile_name}=myProfile||[];
    const [timeline,setTimeline]=useState('')
    const [about,setAbout]=useState('active_contol')
    const [inspirers,setInspirers]=useState('')
    const [inspirations,setInspirations]=useState('')
    const [more,SetMore]=useState('')
    const [deactivateTimeline,setDeactivateTimeline]=useState('no_timeline')
    const [deactivateAbout,setDeactivateAbout]=useState('')
    const [deactivateInspirers,setDeactivateInspirers]=useState('no_inspirers')
    const [deactivateMyInspirations,setDeactivateMyInspirations]=useState('no_inspiration')
    const [profileOver,setProfileOver]=useState('no-profile-over-color')


    const[profileMenu,setProfileMenu]=useState('no-profile-menu')

    const handleProfileMenu=()=>{
        setProfileMenu('profile-menu')
        setProfileOver('profile-over-color')
    }

    const handleCloseProfileMenu=()=>{
        setProfileMenu('no-profile-menu')
        setProfileOver('no-profile-over-color')
    }
    
    const handleControlActive=(num)=>{
        setProfileMenu('no-profile-menu')
        setProfileOver('no-profile-over-color')
        if(num===1){
            setTimeline('active_contol')
            setDeactivateTimeline('')
            setTrigger('no-feed')

            setDeactivateAbout('no_about')
            setDeactivateInspirers('no_inspirers')
            setDeactivateMyInspirations('no_inspiration')

            setAbout('')
            setInspirers('')
            setInspirations('')
            SetMore('')
        }

        else if(num===2){
            setAbout('active_contol')
            setDeactivateAbout('')

            setDeactivateTimeline('no_timeline')
            setDeactivateInspirers('no_inspirers')
            setDeactivateMyInspirations('no_inspiration')

            setTimeline('')
            setInspirers('')
            setInspirations('')
            SetMore('')
        }

        else if(num===3){
            setInspirers('active_contol')
            setDeactivateInspirers('')

            setDeactivateTimeline('no_timeline')
            setDeactivateAbout('no_about')
            setDeactivateMyInspirations('no_inspiration')

            setTimeline('')
            setAbout('')
            setInspirations('')
            SetMore('')
        }

        else if(num===4){
            setInspirations('active_contol')
            setDeactivateMyInspirations('')

            setDeactivateTimeline('no_timeline')
            setDeactivateAbout('no_about')
            setDeactivateInspirers('no_inspiration')

            setTimeline('')
            setInspirers('')
            setAbout('')
            SetMore('')
        }

        else if(num===5){
            SetMore('active_contol')

            setTimeline('')
            setInspirers('')
            setAbout('')
            setInspirations('')
        }
    }

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

        <div className={`upper-section ${upperSection}`}>
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
                    <div className={`upper-section-controls-content ${timeline}`} onClick={()=>handleControlActive(1)}>Timeline</div>
                    <div className={`upper-section-controls-content ${about}`} onClick={()=>handleControlActive(2)}>About</div>
                    <div className={`upper-section-controls-content ${inspirers}`} onClick={()=>handleControlActive(3)}>Inspirers</div>
                    <div className={`upper-section-controls-content ${inspirations}`} onClick={()=>handleControlActive(4)}>My Inspirations</div>
                    <div className={`upper-section-controls-content ${more}`} onClick={()=>handleControlActive(5)}><FaBars/></div>
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
        <div className={`lower-section ${lowerSection}`}>
            <Timeline
            deactivateTimeline={deactivateTimeline}
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

            <About
            deactivateAbout={deactivateAbout}/>

            <Inspirers 
            deactivateInspirers={deactivateInspirers}
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

            <MyInspiration 
            deactivateMyInspirations={deactivateMyInspirations}
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
        
        </div>
    </div>
  )
}

export default Profile