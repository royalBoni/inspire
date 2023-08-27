import React from 'react'
import './timeline.css'
import Feeds from '../feeds/Feeds'
import { useParams } from 'react-router-dom'

const Timeline = ({handleSetBookmark,postAuthorImg,postAuthorName,setWarning,setWarningMessage,handleFollowUnfollow,functionalityUnderDevelopment,handleOpenUserProfilePage,
setOpenCloseUserProfilePage,activateSearch,searchInput,setSearchInput}) => {

    const {userID}=useParams()

  return (
   
    <div className='timeline'>
        <Feeds       
        userID={userID}
        handleSetBookmark={handleSetBookmark}
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
        />
    </div>
  )
}

export default Timeline