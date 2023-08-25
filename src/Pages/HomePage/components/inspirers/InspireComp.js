import React from 'react'
import './inspireComp.css'
import Inspirers from '../profile/Inspirers'

const InspireComp = ({handleOpenUserProfilePage,handleFollowUnfollow}) => {
  return (
    <div className='inspireCompPage'>
        <Inspirers 
        handleOpenUserProfilePage={handleOpenUserProfilePage}
        handleFollowUnfollow={handleFollowUnfollow}/>
    </div>
  )
}

export default InspireComp