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
import { selectAllInspirations } from '../../reducxSlices/inspirationsSlice';
import { useSelector,useDispatch } from 'react-redux';
import { FaHome,FaRegEnvelope,FaUserAlt,FaBookmark,FaUsers,FaRegSun,FaUserFriends,FaAngleDown,FaSearch,FaAngleUp,FaPlus, FaBell} from 'react-icons/fa';
import { selectNotificationsCounter } from '../../reducxSlices/notificationCounterSlice';
import { selectAllProfiles} from '../../reducxSlices/profilesSlice';
import { selectAllInspirers } from '../../reducxSlices/inspirersSlice';
import { selectAllBookmarks } from '../../reducxSlices/bookmarksSlice';
import { selectAllComments } from '../../reducxSlices/commentsSlice';
import { setFeedPosts, setOpenMobileSearchComponent, setIsSearched, setInspirersFollowed,setSuggested,setBeenFollowed,setIsOverColor,setPageWidth } from '../../reducxSlices/actionStateSlice';
import { useDeleteLikeMutation,useAddNewLikeMutation,selectAllLikes } from '../../reducxSlices/likesSlice';
import { useAddNewNotificationMutation } from '../../reducxSlices/notificationsSlice';
import { useDeleteBookmarkMutation,useAddNewBookmarkMutation } from '../../reducxSlices/bookmarksSlice';
import { useDeleteInspirerMutation, useAddNewInspirerMutation } from '../../reducxSlices/inspirersSlice'; 
import ProductLoadingPage from './components/ProductLoadingPage';

const Home = () => {

    const {userID}= useParams();
    const dispatch = useDispatch()

    const [deleteLike]=useDeleteLikeMutation()
    const [addNewLike]=useAddNewLikeMutation()
    const [addNewNotification]=useAddNewNotificationMutation()
    const [deleteBookmark]=useDeleteBookmarkMutation()
    const [addNewBookmark]=useAddNewBookmarkMutation()
    const [deleteInspirer]=useDeleteInspirerMutation()
    const [addNewInspirer]=useAddNewInspirerMutation()
    const bookmarks = useSelector(selectAllBookmarks)
    const inspirations = useSelector(selectAllInspirations)
    const myNotificationsCounter  = useSelector(selectNotificationsCounter)
    const profiles = useSelector(selectAllProfiles)
    const likes = useSelector(selectAllLikes)
    const inspirers= useSelector(selectAllInspirers)
    const comments= useSelector(selectAllComments)
    const [resourceLoading,setResourceLoading]=useState(true)

    const isOverColor=useSelector((state)=>state.myStates.isOverColor)

    setTimeout(() => {
      setResourceLoading(false)
    }, 5000);
  
    
    dispatch(setFeedPosts(inspirations))

    useEffect(()=>{
      const width=window.innerWidth
      dispatch(setPageWidth(width))
    })
    
   
    const screen = () =>{
      const width=window.innerWidth
      dispatch(setPageWidth(width))
   
   }
    window.onload=screen
    window.onresize=screen

    const activateSearch=()=>{
        const search=inspirations.filter((item)=>(((item.inspiration_title).toLowerCase()).includes(searchInput.toLowerCase()) ||
        (((item.inspiration_content).toLocaleLowerCase()).includes(searchInput.toLowerCase()))) )       
        dispatch(setFeedPosts(search))    
        if(searchInput){
            dispatch(setIsSearched(true))
        }
    }
    

    const [activeComponent, setActiveComponent]=useState(1)

    const [upperSection,setUpperSection]=useState('')
    const [lowerSection,setLowerSection]=useState('')

    const [triggerCloseProfileMenu,setTriggerCloseProfileMenu]=useState(false)
    const [creatingPost,setCreatingPost]=useState('no-createpost')

    const [warning,setWarning]=useState(false)
    const [warningMessage,setWarningMessage]=useState('')

    const handleCreatePost=()=>{
      dispatch(setIsOverColor())
      setCreatingPost('createpost')
    } 

    const [toggle,setToggle]=useState(true)
    const toggleProfile=()=>{
        setToggle(!toggle)
        if(toggle){
          handleDisplayMenu()
        }
        else{
          handleCloseMenu()
        }
    }
  

    const handleActive=(num)=>{
      setActiveComponent(num)
    }

    const [allFeed,setAllFeed]=useState('active-feed');
    const [searchInput,setSearchInput]=useState('')

    

    useEffect(()=>{
      dispatch(setInspirersFollowed(inspirers.filter((item)=>item.fan_id===userID)))
      dispatch(setBeenFollowed(inspirers.filter((item)=>item.inspirer_id===userID)))
      dispatch(setSuggested(profiles.filter((item)=>item.userID!=userID)))
    })

const usersFollowed=(id)=>{
  const uF=inspirers.filter((item)=>item.fan_id===id)
  return uF.length
}

const myFollowers=(id)=>{
  const uF=inspirers.filter((item)=>item.inspirer_id===id)
  return uF.length
}

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

      const handleReadPost=(post_id)=>{
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

     const inspirersFollowed=inspirers.filter((item)=>item.fan_id===userID)
     const checkFollowed=inspirersFollowed.find((element)=>element.inspirer_id===item)
     try{
      if(checkFollowed){
        await deleteInspirer({userID,followID:checkFollowed._id}).unwrap()     
      } 
      else{
        await addNewNotification({date:format(new Date(), 'EE MM dd, yyyy pp'),operation:"followed you",userID,authorID:item}).unwrap()
        await addNewInspirer({userID,item}).unwrap()
      }
      }
      catch(err){
        console.log(err)
      }  
               
    } 


  const handleSeeAll=()=>{
      handleActive(9)
  }

  const handleSeeLess=(num)=>{
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
      {
        resourceLoading?
        <ProductLoadingPage message='loading resources'/>:
        <>
        <div className="bookmark-icon" onClick={handleSeeAll}><FaBookmark className='real-icon'/></div>
        <div className='header'>
             <div className="header-content">
                <div className="header-brand">inspire</div>
                <div className='input'>
                  <input type='search' className='headerHeight' placeholder='search' value={searchInput}
                            onChange={(e)=>setSearchInput(e.target.value)}/>
                  <button onClick={activateSearch}><FaSearch/></button>
                </div>
                <div className="profileAndCreate">
                    <div className="header-search-button" role='button'>
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
                <div className={`icon ${activeComponent===1?'active-icon':null}`}  onClick={()=>handleActive(1)}><FaHome /></div>
                <div className={`icon ${activeComponent===2?'active-icon':null}`} onClick={()=>handleActive(2)}><FaRegEnvelope/></div>
                <div className={`icon ${activeComponent===3?'active-icon':null}`} onClick={()=>handleActive(3)}><FaUserAlt/></div>
                <div className={`icon ${activeComponent===5?'active-icon':null}`} onClick={()=>handleActive(5)}><FaUserFriends/></div>
                <div className={`icon ${activeComponent===7?'active-icon':null}`} onClick={()=>handleActive(7)}>
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
        <div className={isOverColor?'over-color':'no-over-color'}></div>
        <CreatePost 
        creatingPost={creatingPost}
        warning={warning}
        setWarning={setWarning}
        setWarningMessage={setWarningMessage}
        setCreatingPost={setCreatingPost}
        userID={userID}
        setTriggerCloseProfileMenu={setTriggerCloseProfileMenu}
        profileImage={profile_image_avatar}
        />

        <Menu
        displayMenu={displayMenu}
        handleCloseMenu={handleCloseMenu}
        myInfo={myInfo}
        handleActive={handleActive}
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
                userID={userID}
                likeAndUnlike={likeAndUnlike}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                numberOfLikes={numberOfLikes}
                numberOfComments={numberOfComments}
                handleSetBookmark={handleSetBookmark}
                handleSetLike={handleSetLike}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                handleFollowUnfollow={handleFollowUnfollow}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                setOpenCloseUserProfilePage={setOpenCloseUserProfilePage}
                activateSearch={activateSearch}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />:
                activeComponent===3?
                <Profile 
                allFeed={allFeed} 
                setAllFeed={setAllFeed}
                upperSection={upperSection}
                lowerSection={lowerSection}
                setLowerSection={setLowerSection}
                setUpperSection={setUpperSection}
                myInfo={myInfo}
                likes={likes}
                likeAndUnlike={likeAndUnlike}
                bookmarkAndUnbookmark={bookmarkAndUnbookmark}
                numberOfLikes={numberOfLikes}
                numberOfComments={numberOfComments}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                switchFeedPage={switchFeedPage}
                setSwitchReadPage={setSwitchReadPage}
                setSwitchFeedPage={setSwitchFeedPage}
                switchReadPage={switchReadPage}
                triggerCloseProfileMenu={triggerCloseProfileMenu}
                handleFollowUnfollow={handleFollowUnfollow}
                userID={userID}
                handleSetLike={handleSetLike}
                handleReadPost={handleReadPost}
                handleSetBookmark={handleSetBookmark}
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
                profiles={profiles}       
                userID={userID}
                handleFollowUnfollow={handleFollowUnfollow}
                />:
                activeComponent===6?
                <Groups/>:
                activeComponent===7?
                <Notifications 
                setWarning={setWarning}
                setWarningMessage={setWarningMessage}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                />:
                activeComponent===9?
                <BookmarkPage
                handleSeeLess={handleSeeLess}
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
                handleActive={handleActive}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleCreatePost={handleCreatePost}
                toggleProfile={toggleProfile}
                toggle={toggle}
                profile_image_avatar={profile_image_avatar}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleReadPost={handleReadPost}
                readBookmark={readBookmark}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleFollowUnfollow={handleFollowUnfollow}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                activateSearch={activateSearch}
                />
            </div>
        </div>
        </>
      }
    </div>
  )
}

export default Home