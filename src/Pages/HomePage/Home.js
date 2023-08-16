import React from 'react'
import './home.css'
import { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Feeds from './components/feeds/Feeds';
import SearchCreate from './components/SearchCreate';
import Profile from './components/profile/Profile';
import CreatePost from './components/CreatePost';
import Warning from './components/Warning';
import Menu from './components/Menu';
import Notifications from './components/notifications/Notifications';
import Groups from './components/groups/Groups';
import BookmarkPage from './components/bookmark/BookmarkPage';
import InspireComp from './components/inspirers/InspireComp';
import Settings from './components/settings/Settings';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import { selectAllInspirations } from '../../reducxSlices/inspirationsSlice';
import { selectNotifications } from '../../reducxSlices/notificationsSlice';
import { useSelector,useDispatch } from 'react-redux';
import { FaHome,FaRegEnvelope,FaUserAlt,FaBookmark,FaUsers,FaRegSun,FaUserFriends,FaAngleDown,FaSearch,FaAngleUp,FaPlus, FaBell} from 'react-icons/fa';
import { selectNotificationsCounter } from '../../reducxSlices/notificationCounterSlice';
import { selectAllProfiles } from '../../reducxSlices/profilesSlice';
import { selectAllBookmarks } from '../../reducxSlices/bookmarksSlice';
import { setFeedPosts } from '../../reducxSlices/actionStateSlice';
import { setIsSearched } from '../../reducxSlices/actionStateSlice';
import { setOpenMobileSearchComponent } from '../../reducxSlices/actionStateSlice';
import { selectAllLikes } from '../../reducxSlices/likesSlice';
import { useDeleteLikeMutation } from '../../reducxSlices/likesSlice';
import { useAddNewLikeMutation } from '../../reducxSlices/likesSlice';
import { useAddNewNotificationMutation } from '../../reducxSlices/notificationsSlice';
import { useDeleteBookmarkMutation } from '../../reducxSlices/bookmarksSlice';
import { useAddNewBookmarkMutation } from '../../reducxSlices/bookmarksSlice';

const Home = () => {

    const {userID}= useParams();
    const param=1
    const dispatch = useDispatch()
    const [trigger,setTrigger]=useState('')
    const [removeFeedSection,setRemoveFeedSection]=useState('')
    const [deactivatePostCss,setDeactivatePostCss]=useState('posts')
    const [deactivateFeed,setDeactivateFeed]=useState('')
    const [home,setHome]=useState('activee')
    const [homeIcon,setHomeIcon]=useState('active-icon')
    const [header,setHeader]=useState('header')

    const [deleteLike]=useDeleteLikeMutation()
    const [addNewLike]=useAddNewLikeMutation()
    const [addNewNotification]=useAddNewNotificationMutation()
    const [deleteBookmark]=useDeleteBookmarkMutation()
    const [addNewBookmark]=useAddNewBookmarkMutation()
    const [posts, setPosts]=useState()
    const bookmarks = useSelector(selectAllBookmarks)
    const inspirations = useSelector(selectAllInspirations)
    const myNotifications = useSelector(selectNotifications)
    const myNotificationsCounter  = useSelector(selectNotificationsCounter)
    const profiles = useSelector(selectAllProfiles)
    const likes = useSelector(selectAllLikes)

    useEffect(()=>{
      setPosts(inspirations)
    },[])
    dispatch(setFeedPosts(inspirations))
    

    const activateSearch=()=>{
        const search=inspirations.filter((item)=>(((item.inspiration_title).toLowerCase()).includes(searchInput.toLowerCase()) ||
        (((item.inspiration_content).toLocaleLowerCase()).includes(searchInput.toLowerCase()))) )       
            /* setinspirations(search)
            setMobileSearchResult(search) */
        dispatch(setFeedPosts(search))    
        if(searchInput){
            dispatch(setIsSearched(true))
        }
    }
    

    const [activeComponent, setActiveComponent]=useState(1)

    const [upperSection,setUpperSection]=useState('')
    const [lowerSection,setLowerSection]=useState('')

    const [triggerCloseProfileMenu,setTriggerCloseProfileMenu]=useState(false)

    const [overColor,setOverColor]=useState('no-over-color')
    const [creatingPost,setCreatingPost]=useState('no-createpost')

    const [message,setMessage]=useState('')
    const [messageIcon,setMessageIcon]=useState('')

    const [profile,setProfile]=useState('')
    const [profileIcon,setProfileIcon]=useState('')

    const [settings,setSettings]=useState('')
    const [settingsIcon,setSettingsIcon]=useState('')

    const [friends,setFriends]=useState('')
    const [friendsIcon,setFriendsIcon]=useState('')

    

    const [inspiration,setInspiration]=useState('')
    const [inspirationIcon,setInspirationIcon]=useState('')

    const [warning,setWarning]=useState(false)
    const [warningMessage,setWarningMessage]=useState('')

    const [activateHomePage,setActivateHomePage]=useState(false);
    const handleCreatePost=()=>{
        setOverColor('over-color')
        setCreatingPost('createpost')
        setDisplayMenu('no-menu')
        setToggle(!toggle)
        setTriggerCloseProfileMenu(true)
    } 

    const [displayMobileSearch,setDisplayMobileSearch]=useState('no-display-mobile-search')
    const [mobileSearchResult,setMobileSearchResult]=useState([])

    const handleMobileSearch=()=>{
        setDisplayMobileSearch('display-mobile-search')
        setDisplayMenu('no-menu')
        setToggle(!toggle)
        setTriggerCloseProfileMenu(true)
    }

    const [toggle,setToggle]=useState(true)
    const toggleProfile=()=>{
        setToggle(!toggle)
        if(toggle){
          handleDisplayMenu()
          setTriggerInspirers(!triggerInspirers)
        }
        else{
          handleCloseMenu()
        }
    }
  

    const handleActive=(num)=>{
      setActiveComponent(num)
    }

    const [allFeed,setAllFeed]=useState('active-feed');
    const [searchTrigger,setSearchTrigger]=useState(false);
    const [searchInput,setSearchInput]=useState('')

    useEffect(()=>{
        if(searchInput.length>0){
            setSearchTrigger(true)
        }
        else{
            setSearchTrigger(false)
        }
    },[searchInput])
  
    
   
    
    const inspirers_url='http://localhost:5000/inspirer';
    const [inspirersFollowed,setInspirersFollowed]=useState([])
    const [suggested,setSuggested]=useState([])
    const [suggestedNoDuplicate,setSuggestedNoDuplicate]=useState([])
    const [allInspirers,setAllInspirers]=useState([])
    const [beenFollowed,setBeenFollowed]=useState([])
    const [triggerInspirers,setTriggerInspirers]=useState(true)
    const [loadingInspirers,setLoadingInspirers]=useState(false)
    const [inspirersError,setFetchInspirersError]=useState('')
    useEffect(()=>{
    const fetchInspirers =async () => {
        try{
          setLoadingInspirers(true)
          const response = await fetch(inspirers_url);
          if(!response.ok) throw Error("did not recieve expected data");
          const jsonInspirers = await response.json();
          setAllInspirers(jsonInspirers.inspirersResults)
          const userInspirers=await (jsonInspirers.inspirersResults).filter((item)=>item.fan_id===userID)
          setInspirersFollowed(userInspirers);
         
          const followed=allInspirers.filter((item)=>item.inspirer_id===userID)
          setBeenFollowed(followed)
        
         const suggestedInspires=profiles.filter((item)=>item.userID!=userID)
         setSuggestedNoDuplicate(suggestedInspires)
     
        
        }
        catch(err){
          if(err.message==='Failed to fetch'){
            setFetchInspirersError(`network or server might be down`)
          }
          else{
            setFetchInspirersError(`Error: ${err.message}`)
          }
        }
        finally{
          setLoadingInspirers(false)
        }
  
      } 

      fetchInspirers();
},[triggerInspirers])

const usersFollowed=(id)=>{
  const uF=allInspirers.filter((item)=>item.fan_id===id)
  return uF.length
}

const myFollowers=(id)=>{
  const uF=allInspirers.filter((item)=>item.inspirer_id===id)
  return uF.length
}

   

    const account_profiles_url='http://localhost:3002/account-profiles';
    const [accountProfiles,setAccountProfiles]=useState([]);
    useEffect(()=>{
        const fetchAccountProfile =async () => {

            try{
            const response = await fetch(account_profiles_url);
            if(!response.ok) throw Error("did not recieve expected data");
            const jsonAccountProfiles = await response.json();
            setAccountProfiles(jsonAccountProfiles);
            }
            catch(err){
            console.log(err)
            }
    
        } 

        fetchAccountProfile();
    },[])

    const [myProfile,setMyProfile]=useState([])

    useEffect(()=>{
        const personalProfile=accountProfiles.find((item)=>item.profile_id===param)
        setMyProfile(personalProfile)
    },[]);

    const [myInfo,setMyInfo]=useState()
    useEffect(()=>{
        const myInfoResult=profiles?.find((item)=>item.userID===userID)
        setMyInfo(myInfoResult)
    },)
    const {profile_image_avatar}=myInfo||[]
    

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
          await addNewNotification({date:format(new Date(), 'EE MM dd, yyyy pp'),operation:"liked your post",post_id:id,userID,authorID}).unwrap()
          await addNewLike({userID,postID:id}).unwrap()
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

    const comments_url='http://localhost:5000/comment';
    const [comments,setComments]=useState([]);
    const [triggerFetchComments,setTriggerFetchComments]=useState(false)

    useEffect(()=>{
        const fetchComments =async () => {
  
            try{
              const response = await fetch(comments_url);
              if(!response.ok) throw Error("did not recieve expected data");
              const jsoncomments = await response.json();
              setComments(jsoncomments.commentsResults);
            }
            catch(err){
              console.log(err)
            }
      
          } 

          fetchComments();
    },[triggerFetchComments])

    const numberOfComments=(id)=>{
        const total=comments.filter((item)=>item.post_id===id)
        return total?.length
    }
    

    const bookmarkAndUnbookmark=(id)=>{
      const userbook=bookmarks?.filter((item)=>item.post_id===id)
      const findbook=userbook?.find((item)=>item.bookmarker_id===userID);
      if(findbook){
          return 'activeLikeBtn'
      } 
  }

    const handleSetBookmark=async(id)=>{
      const findBookmark=bookmarks?.find((item)=>item.post_id===id&&item.bookmarker_id===userID)
      console.log(findBookmark)
      
      try{
        if(findBookmark){
          await deleteBookmark({bookmarkID:findBookmark.post_id,userID}).unwrap()
        }
        else{
          await addNewBookmark({bookmarkID:id,userID}).unwrap()
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

    
    const postAuthorImg=(id)=>{
        const image=profiles?.find((item)=>item.userID===id)
        if(image){
          return image.profile_image_avatar
        }
      }
    
      const postAuthorName=(id)=>{
        const name=profiles?.find((item)=>item.userID===id)
        if(name){
          return name.userName
        }
      }


      const [switchReadPage,setSwitchReadPage]=useState('no-feed');
      const [switchFeedPage,setSwitchFeedPage]=useState('');
      const [selectedPost,setSelectedPost]=useState([]);
      const [backID,setBackID]=useState(1)

      const handleReadPost=(post_id)=>{
    }

    const handleCloseMobileSearch=()=>{
        setDisplayMobileSearch('no-display-mobile-search')
        setSearchInput('')
        setMobileSearchResult(null)
        setTriggerCloseProfileMenu(false)
    }

    const[displayMenu,setDisplayMenu]=useState('no-menu')
    const handleDisplayMenu=()=>{
      setDisplayMenu('menu')
      setTriggerCloseProfileMenu(true)
    }

    const handleCloseMenu=()=>{
      setDisplayMenu('no-menu')
      setToggle(!toggle)
      setTriggerCloseProfileMenu(false)
    }


    const handleFollowUnfollow=async(item)=>{

      const checkFollowed=inspirersFollowed.find((element)=>element.inspirer_id===item)
      if(checkFollowed){
          const newFollow=inspirersFollowed.filter((ins)=>ins.inspirer_id!==item)
          setInspirersFollowed(newFollow)
      
         try{
          
              const postOptions ={
              method : 'DELETE'
              }

              const response=await fetch(`http://localhost:5000/inspirer/${userID}/${checkFollowed._id}`,postOptions)
              if(!response.ok){
              console.log('there was a problem')
              }
              
              }
              catch(err){
                 console.log(err)
              }  
            
      } 
      else{
          const newFollow={inspirer_id:item,fan_id:userID,_id:item}
          setInspirersFollowed([...inspirersFollowed,newFollow])
          console.log(inspirersFollowed)
          try{
          
              const postOptions ={
              method : 'POST'
              }

              const response=await fetch(`http://localhost:5000/inspirer/${userID}/${item}`,postOptions)
              if(!response.ok){
              console.log('there was a problem')
              }

              const date =format(new Date(), 'EE MM dd, yyyy pp');
              const newNotification={date:date,operation:"followed you"}
              const postNotificationOptions ={
              method : 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(newNotification)
              }

            const notificationResponse=await fetch(`http://localhost:5000/notification/${userID}/${item}`,postNotificationOptions)
            const jsonNotificationResponse=notificationResponse.json()
            if(!notificationResponse.ok){
              console.log(jsonNotificationResponse.message)
            }
            else{
              console.log(jsonNotificationResponse.message)
            }
              
              }
              catch(err){
                 console.log(err)
              }    
      
      }
  }

  const [friendSuggestionBox,setFriendSuggestionBox]=useState('')

  const handleSeeAll=()=>{
      setFriendSuggestionBox('no-box')
      handleActive(8)
  }

  const handleSeeLess=(num)=>{
      setFriendSuggestionBox('')
      handleActive(num)
  }

  const readBookmark=(id)=>{
    handleSeeLess(1)
    handleReadPost(id)
  }

  const functionalityUnderDevelopment=()=>{
    setWarningMessage('functionality under construction')
    setWarning(true)
    setTimeout(() => {
        setWarning(false)
        setWarningMessage(null)
    }, 17000);
  }

  const [openCloseUserProfilePage,setOpenCloseUserProfilePage]=useState('no-user-profile-page')
  const [userProfileID,setUserProfileID]=useState('')
  const handleOpenUserProfilePage=(id)=>{
    setUserProfileID(id)
    setOpenCloseUserProfilePage('user-profile-page')
  }

  const handleCloseUserProfilePage=()=>{
    setOpenCloseUserProfilePage('no-user-profile-page')
  }


  return (
    <div className='home'>
      <div className="bookmark-icon" onClick={handleSeeAll}><FaBookmark className='real-icon'/></div>
        <div className={`${header}`}>
             <div className="header-content">
                <div className="header-brand">inspire</div>
                <div className='input'>
                  <input type='search' className='headerHeight' placeholder='search' value={searchInput}
                            onChange={(e)=>setSearchInput(e.target.value)}/>
                  <button onClick={activateSearch}><FaSearch/></button>
                </div>
                <div className="profileAndCreate">
                    <div className="header-search-button" role='button' onClick={handleMobileSearch}>
                            <FaSearch className='search-icon' onClick={()=>dispatch(setOpenMobileSearchComponent())}/> 
                    </div>
                    <div className="header-create-button" role='button' onClick={handleCreatePost}>
                            <FaPlus/> 
                            <div className="button-name">inspire</div>
                    </div>
                    <div className="header-profile">
                            <div className="profile-image">
                                <img src={profile_image_avatar} alt="" />
                            </div>
                            <div className="profile-dropdown" onClick={toggleProfile}>{toggle?<FaAngleUp/>:<FaAngleDown/>}</div>
                    </div>
                </div>
             </div> 
             <div className="header-nav">
                <div className={`icon ${homeIcon} ${home}`}  onClick={()=>handleActive(1)}><FaHome /></div>
                <div className={`icon ${messageIcon} ${message}`} onClick={()=>handleActive(2)}><FaRegEnvelope/></div>
                <div className={`icon ${profileIcon} ${profile}`} onClick={()=>handleActive(3)}><FaUserAlt/></div>
                <div className={`icon ${friendsIcon} ${friends}`} onClick={()=>handleActive(5)}><FaUserFriends/></div>
                <div className={`icon ${inspirationIcon} ${inspiration}`} onClick={()=>handleActive(7)}>
                  <FaBell/> 
                  {
                    myNotificationsCounter===0?
                    null
                    :
                    <div className="notification-counter">{'3'}</div>
                  }
                </div>
                
             </div>
        </div>
        <div className={`${overColor}`}></div>
        <CreatePost 
        creatingPost={creatingPost}
        warning={warning}
        setWarning={setWarning}
        setWarningMessage={setWarningMessage}
        setCreatingPost={setCreatingPost}
        setOverColor={setOverColor}
        userID={userID}
        setTriggerCloseProfileMenu={setTriggerCloseProfileMenu}
        posts={posts}
        profileImage={profile_image_avatar}
        />

        <Menu
        displayMenu={displayMenu}
        handleCloseMenu={handleCloseMenu}
        myInfo={myInfo}
        handleActive={handleActive}
        inspirersFollowed={inspirersFollowed}
        beenFollowed={beenFollowed}
        />

        {
            warning &&
            <Warning 
            warningMessage={warningMessage}/>
        }

        <div className="main-container">
            
            <div className="flex-box first">
                <div className="first-content">
                    <div className="brand">inspire</div>
                </div>
                <div className="first-content">
                    <div className="menu-title">MENU</div>
                    <div className="menu-content">
                        <div className={`menu-content-item ${activeComponent===1?'activee':null}`} onClick={()=>handleActive(1)}>
                            <div className={`icon ${activeComponent===1?'active-icon':null}`}><FaHome /></div>
                            <div className="item">Home</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===2?'activee':null}`} onClick={()=>handleActive(2)}>
                            <div className={`icon ${activeComponent===2?'active-icon':null}`}><FaRegEnvelope/></div>
                            <div className="item">Messages</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===3?'activee':null}`} onClick={()=>handleActive(3)}>
                            <div className={`icon ${activeComponent===3?'active-icon':null}`}><FaUserAlt/></div>
                            <div className="item">Profile</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===4?'activee':null}`} onClick={()=>handleActive(4)}>
                            <div className={`icon ${activeComponent===4?'active-icon':null}`}><FaRegSun/></div>
                            <div className="item">Settings</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===5?'activee':null}`} onClick={()=>handleActive(5)}>
                            <div className={`icon ${activeComponent===5?'active-icon':null}`}><FaUserFriends/></div>
                            <div className="item">Inspirers</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===6?'activee':null}`} onClick={()=>handleActive(6)}>
                            <div className={`icon ${activeComponent===6?'active-icon':null}`}><FaUsers/></div>
                            <div className="item">Groups</div>
                        </div>
                        <div className={`menu-content-item ${activeComponent===7?'activee':null}`} onClick={()=>handleActive(7)}>
                            <div className={`icon ${activeComponent===7?'active-icon':null} `}>
                              <FaBell/>
                              {
                                myNotificationsCounter===0?
                                null
                                :
                                <div className="notification-counter">{'3'}</div>
                              }
                            </div>
                            <div className="item">Notifications</div>
                        </div>
                    </div>
                </div>
               
                <div className="first-content">
                    <div className="menu-title">OTHERS</div>
                    <div className="menu-content">
                        <div className="menu-content-item">
                            <div className="icon">@</div>
                            <Link className='link' to={'/'}><div className="item">Log Out</div></Link> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-box second">
              {
                activeComponent===1?
                <Feeds 
                posts={posts}
                setPosts={setPosts}
                allFeed={allFeed} 
                setAllFeed={setAllFeed}
                searchTrigger={searchTrigger} 
                activateHomePage={activateHomePage}
                deactivateFeed={deactivateFeed}
                trigger={trigger}
                removeFeedSection={removeFeedSection}
                deactivatePostCss={deactivatePostCss}
                profiles={profiles}
                userID={userID}

                setUpperSection={setUpperSection}
                setLowerSection={setLowerSection}
                setHeader={setHeader}
                /* setLikes={setLikes} */
                likes={likes}
                likeAndUnlike={likeAndUnlike}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                numberOfLikes={numberOfLikes}
                numberOfComments={numberOfComments}
                comments={comments}
                setComments={setComments}
                handleSetBookmark={handleSetBookmark}
                handleSetLike={handleSetLike}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleReadPost={handleReadPost}
                switchFeedPage={switchFeedPage}
                setSwitchReadPage={setSwitchReadPage}
                setSwitchFeedPage={setSwitchFeedPage}
                switchReadPage={switchReadPage}
                selectedPost={selectedPost}
                triggerFetchComments={triggerFetchComments}
                setTriggerFetchComments={setTriggerFetchComments}
                setOverColor={setOverColor}
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                inspirersFollowed={inspirersFollowed}
                handleFollowUnfollow={handleFollowUnfollow}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleActive={handleActive}
                backID={backID}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                setOpenCloseUserProfilePage={setOpenCloseUserProfilePage}
                activateSearch={activateSearch}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />:
                activeComponent===3?
                <Profile 
                myProfile={myProfile}
                posts={posts}
                trigger={trigger}
                setTrigger={setTrigger}
                post={posts}
                allFeed={allFeed} 
                setAllFeed={setAllFeed}
                removeFeedSection={removeFeedSection}
                deactivatePostCss={deactivatePostCss}
                inspirersFollowed={inspirersFollowed}
                accountProfiles={accountProfiles}
                profiles={profiles}
                suggestedNoDuplicate={suggestedNoDuplicate}
                beenFollowed={beenFollowed}
                upperSection={upperSection}
                lowerSection={lowerSection}
                setLowerSection={setLowerSection}
                setUpperSection={setUpperSection}
                myInfo={myInfo}
                /* setLikes={setLikes} */
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
                selectedPost={selectedPost}
                triggerInspirers={triggerInspirers}
                setTriggerInspirers={setTriggerInspirers}
                loadingInspirers={loadingInspirers}
                inspirersError={inspirersError}
                triggerCloseProfileMenu={triggerCloseProfileMenu}
                handleFollowUnfollow={handleFollowUnfollow}
                userID={userID}
                handleSetLike={handleSetLike}
                handleReadPost={handleReadPost}
                handleSetBookmark={handleSetBookmark}
                setBackID={setBackID}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />:
                activeComponent===4?
                <Settings
                warning={warning}
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                />:
                activeComponent===5?
                <InspireComp
                inspirersFollowed={inspirersFollowed}
                accountProfiles={accountProfiles}
                suggestedNoDuplicate={suggestedNoDuplicate}
                beenFollowed={beenFollowed}
                profiles={profiles}
                setTriggerInspirers={setTriggerInspirers}
                triggerInspirers={triggerInspirers}
                loadingInspirers={loadingInspirers}
                inspirersError={inspirersError} 
                userID={userID}
                setInspirersFollowed={setInspirersFollowed}
                handleFollowUnfollow={handleFollowUnfollow}
                />:
                activeComponent===6?
                <Groups/>:
                activeComponent===7?
                <Notifications 
                setOverColor={setOverColor}
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                />:
                activeComponent===9?
                <BookmarkPage
                handleSeeLess={handleSeeLess}
                posts={posts}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                readBookmark={readBookmark}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                />:
                <p>component under construction</p>
              }

              {/* 
              <UserProfilePage
                openCloseUserProfilePage={openCloseUserProfilePage}
                handleCloseUserProfilePage={handleCloseUserProfilePage}
                userProfileID={userProfileID}
                profiles={profiles}
                myInfo={myInfo}
                usersFollowed={usersFollowed}
                myFollowers={myFollowers}
                posts={posts}
                handleReadPost={handleReadPost}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                likeAndUnlike={likeAndUnlike}
                handleSetLike={handleSetLike}
                numberOfLikes={numberOfLikes}
                numberOfComments={numberOfComments}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                handleSetBookmark={handleSetBookmark}
                inspirersFollowed={inspirersFollowed}
                handleFollowUnfollow={handleFollowUnfollow}
                /> */}
                
            </div>
            <div className="flex-box third">
                <SearchCreate 
                setPosts={setPosts}
                posts={posts}
                handleActive={handleActive}
                setAllFeed={setAllFeed}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                accountProfiles={accountProfiles}
                handleCreatePost={handleCreatePost}
                setOverColor={setOverColor}
                toggleProfile={toggleProfile}
                toggle={toggle}
                profiles={profiles}
                profile_image_avatar={profile_image_avatar}
                setMobileSearchResult={setMobileSearchResult}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleReadPost={handleReadPost}
                friendSuggestionBox={friendSuggestionBox}
                handleSeeAll={handleSeeAll}
                readBookmark={readBookmark}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                suggestedNoDuplicate={suggestedNoDuplicate}
                inspirersFollowed={inspirersFollowed}
                handleFollowUnfollow={handleFollowUnfollow}
                setTriggerInspirers={setTriggerInspirers}
                triggerInspirers={triggerInspirers}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                activateSearch={activateSearch}
                />
            </div>
        </div>
    </div>
   
    
  )
}

export default Home