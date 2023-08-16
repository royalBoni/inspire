import React from 'react'
import './inspireComp.css'
import Inspirers from '../profile/Inspirers'

const InspireComp = ({deactivateInspirers,inspirersFollowed,accountProfiles,suggestedNoDuplicate,beenFollowed,profiles,
    setTriggerInspirers,triggerInspirers,loadingInspirers,inspirersError,userID,setInspirersFollowed,handleFollowUnfollow}) => {
  return (
    <div className='inspireCompPage'>
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
        userID={userID}
        setInspirersFollowed={setInspirersFollowed}
        handleFollowUnfollow={handleFollowUnfollow}/>
    </div>
  )
}

export default InspireComp