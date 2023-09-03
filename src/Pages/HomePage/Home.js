import React from 'react'
import './home.css'
import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Feeds from './components/feeds/Feeds';
import SearchCreate from './components/SearchCreate';
import Profile from './components/profile/Profile';
import CreatePost from './components/CreatePost';
import Warning from './components/Warning';
import Menu from './components/Menu';
import Notifications from './components/notifications/Notifications';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import Groups from './components/groups/Groups';
import BookmarkPage from './components/bookmark/BookmarkPage';
import InspireComp from './components/inspirers/InspireComp';
import Settings from './components/settings/Settings';
import ProfileEditor from './components/profile/ProfileEditor';
import { selectAllInspirations } from '../../reducxSlices/inspirationsSlice';
import { useSelector,useDispatch } from 'react-redux';
import { FaHome,FaRegEnvelope,FaUserAlt,FaBookmark,FaUsers,FaRegSun,FaUserFriends,FaAngleDown,FaSearch,FaAngleUp,FaPlus, FaBell} from 'react-icons/fa';
import { selectNotificationsCounter } from '../../reducxSlices/notificationCounterSlice';
import { selectAllProfiles} from '../../reducxSlices/profilesSlice';
import { selectAllInspirers } from '../../reducxSlices/inspirersSlice';
import { setFeedPosts, setOpenMobileSearchComponent,setSelectedProfileID, setIsCreatePost,setIsSearched,
   setInspirersFollowed,setSuggested,setBeenFollowed,setIsOverColor,setPageWidth,setIsEditProfile } from '../../reducxSlices/actionStateSlice';
import { useAddNewNotificationMutation } from '../../reducxSlices/notificationsSlice';
import { useDeleteInspirerMutation, useAddNewInspirerMutation } from '../../reducxSlices/inspirersSlice'; 
import ProductLoadingPage from './components/ProductLoadingPage';
import { extendedNotificationsApiSlice } from '../../reducxSlices/notificationsSlice';
import { extendedNotificationsCounterApiSlice } from '../../reducxSlices/notificationCounterSlice';

import { store } from '../../app/store';

const Home = () => {

  store.dispatch(extendedNotificationsApiSlice.endpoints.getNotifications.initiate())
  store.dispatch(extendedNotificationsCounterApiSlice.endpoints.getNotificationsCounter.initiate())

  const {userID}= useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [addNewNotification]=useAddNewNotificationMutation()
    const [deleteInspirer]=useDeleteInspirerMutation()
    const [addNewInspirer]=useAddNewInspirerMutation()
    const inspirations = useSelector(selectAllInspirations)
    const myNotificationsCounter  = useSelector(selectNotificationsCounter)
    const profiles = useSelector(selectAllProfiles)
    const inspirers= useSelector(selectAllInspirers)
    const [resourceLoading,setResourceLoading]=useState(true)

    const isOverColor=useSelector((state)=>state.myStates.isOverColor)
    const isEditProfile = useSelector((state)=>state.myStates.isEditProfile)
    const isCreatePost = useSelector((state)=>state.myStates.isCreatePost)
    const [openUserProfilePage,setOpenUserProfilePage]= useState(false)

    setTimeout(() => {
      setResourceLoading(false)
    }, 5000);
  

    useEffect(()=>{
      const arrayTobeSorted=[...inspirations]
      const sortedItems = arrayTobeSorted?.sort((a,b)=>{
        return (format(new Date(b.datetime),"t")) - (format(new Date(a.datetime),"t"))
      })
      dispatch(setFeedPosts(sortedItems))
    },[inspirations])

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

    const [warning,setWarning]=useState(false)
    const [warningMessage,setWarningMessage]=useState('')

    const handleCreatePost=()=>{
      dispatch(setIsOverColor())
      dispatch(setIsCreatePost())
      /* functionalityUnderDevelopment('we are creating') */
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
      if(num===8){
        navigate('/')
      }
      else{
        setActiveComponent(num)
        handleCloseUserProfilePage()
      }
    }

    const [searchInput,setSearchInput]=useState('')

    useEffect(()=>{
      dispatch(setInspirersFollowed(inspirers.filter((item)=>item.fan_id===userID)))
      dispatch(setBeenFollowed(inspirers.filter((item)=>item.inspirer_id===userID)))
      dispatch(setSuggested(profiles.filter((item)=>item.userID!=userID)))
      
    }) 

  const [myInfo,setMyInfo]=useState()
  useEffect(()=>{
      const myInfoResult=profiles?.find((item)=>item.userID===userID)
      setMyInfo(myInfoResult)
  },)
  const {profile_image_avatar}=myInfo||[]
    
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

    const[displayMenu,setDisplayMenu]=useState('no-menu')
    const handleDisplayMenu=()=>{
      setDisplayMenu('menu')
    }

    const handleCloseMenu=()=>{
      setDisplayMenu('no-menu')
      setToggle(!toggle)
    }


    const handleFollowUnfollow=async(item)=>{

     const inspirersFollowed=inspirers.filter((item)=>item.fan_id===userID)
     const checkFollowed=inspirersFollowed.find((element)=>element.inspirer_id===item)
     try{
      if(checkFollowed){
        await deleteInspirer({userID,followID:checkFollowed._id})     
      } 
      else{
        await addNewNotification({date:format(new Date(), 'EE MM dd, yyyy pp'),operation:"followed you",userID,authorID:item}).unwrap()
        await addNewInspirer({userID,item})
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

  const functionalityUnderDevelopment=(message)=>{
    setWarningMessage(message)
    setWarning(true)
    setTimeout(() => {
        setWarning(false)
        setWarningMessage(null)
    }, 17000);
  }

  const handleOpenUserProfilePage=(item)=>{
    dispatch(setSelectedProfileID(item))
    setOpenUserProfilePage(true)
  }

  const handleCloseUserProfilePage=()=>{
    setOpenUserProfilePage(false)
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
                            {/* <div className="button-name">inspire</div> */}
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
                    myNotificationsCounter[0]?.difference===0 || !myNotificationsCounter[0]?
                    null
                    :
                    <div className="notification-counter">{myNotificationsCounter[0]?.difference}</div>
                  }
                </div>
                
             </div>
        </div>
        <div className={isOverColor?'over-color':'no-over-color'}></div>
        {
        isCreatePost?
        <CreatePost 
        functionalityUnderDevelopment={functionalityUnderDevelopment}
        userID={userID}
        profileImage={profile_image_avatar}
        />:
        isEditProfile?
        <ProfileEditor 
        myInfo={myInfo}
        functionalityUnderDevelopment={functionalityUnderDevelopment}/>:
        null
        }

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
                        {/* <div className={`menu-content-item ${activeComponent===6?'activee':null}`} onClick={()=>handleActive(6)}>
                            <div className={`icon ${activeComponent===6?'active-icon':null}`}><FaUsers/></div>
                            <div className="item">Groups</div>
                        </div> */}
                        <div className={`menu-content-item ${activeComponent===7?'activee':null}`} onClick={()=>handleActive(7)}>
                            <div className={`icon ${activeComponent===7?'active-icon':null} `}>
                              <FaBell/>
                              {
                                myNotificationsCounter[0]?.difference===0 || !myNotificationsCounter[0]?
                                null
                                :
                                <div className="notification-counter">{myNotificationsCounter[0]?.difference}</div>
                              }
                            </div>
                            <div className="item">Notifications</div>
                        </div>
                        <div className="menu-content-item" onClick={()=>handleActive(8)}>
                            <div className="icon">@</div>
                            <div className="item">Log Out</div> 
                        </div>
                    </div>
                </div>
               
                {/* <div className="first-content">
                    <div className="menu-title">OTHERS</div>
                    <div className="menu-content">
                        <div className="menu-content-item">
                            <div className="icon">@</div>
                            <Link className='link' to={'/'}><div className="item">Log Out</div></Link> 
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="flex-box second">
              {
                openUserProfilePage&&
                <UserProfilePage
                handleCloseUserProfilePage={handleCloseUserProfilePage}
                myInfo={myInfo}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleFollowUnfollow={handleFollowUnfollow}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />
              }
              {
                activeComponent===1?
                <Feeds 
                userID={userID}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleFollowUnfollow={handleFollowUnfollow}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                activateSearch={activateSearch}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />:
                activeComponent===3?
                <Profile 
                myInfo={myInfo}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                handleFollowUnfollow={handleFollowUnfollow}
                userID={userID}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />:
                activeComponent===4?
                <Settings
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                />:
                activeComponent===5?
                <InspireComp
                handleFollowUnfollow={handleFollowUnfollow}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />:
                activeComponent===6?
                <Groups/>:
                activeComponent===7?
                <Notifications 
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                handleOpenUserProfilePage={handleOpenUserProfilePage}
                />:
                activeComponent===9?
                <BookmarkPage
                handleSeeLess={handleSeeLess}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
                functionalityUnderDevelopment={functionalityUnderDevelopment}
                />
                :
                <p>component under construction</p>
              }

            </div>
            <div className="flex-box third">
                <SearchCreate 
                handleActive={handleActive}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                toggleProfile={toggleProfile}
                toggle={toggle}
                profile_image_avatar={profile_image_avatar}
                postAuthorImg={postAuthorImg}
                postAuthorName={postAuthorName}
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