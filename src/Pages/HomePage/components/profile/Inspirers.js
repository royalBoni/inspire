import React from 'react'
import './inspirers.css'
import { useState } from 'react'
import {format} from 'date-fns'
import { useSelector } from 'react-redux'
import { selectAllProfiles } from '../../../../reducxSlices/profilesSlice'

const Inspirers = ({handleFollowUnfollow,handleOpenUserProfilePage}) => {
    const [activeInspirerItem, setActiveInspirerItem]=useState(1)

    const suggested=useSelector((state)=>state.myStates.suggested)
    const inspirersFollowed=useSelector((state)=>state.myStates.inspirersFollowed)
    const beenFollowed=useSelector((state)=>state.myStates.beenFollowed)

    const profiles = useSelector(selectAllProfiles)

  return (
    <div className="inspirers">
        <div className="inspirers-nav">
            <div className="inspirers-nav-content">
                <div className={`inspirers-nav-content-item ${activeInspirerItem===1?`inspirer-active`:null}`} onClick={()=>setActiveInspirerItem(1)}>Following</div>
                <div className={`inspirers-nav-content-item ${activeInspirerItem===2?`inspirer-active`:null}`} onClick={()=>setActiveInspirerItem(2)}>Suggestions</div>
                <div className={`inspirers-nav-content-item ${activeInspirerItem===3?`inspirer-active`:null}`} onClick={()=>setActiveInspirerItem(3)}>Following You</div>
            </div>
            <div className="inspires-nav-search">
                <input type="text" placeholder='search' />
            </div>
        </div>
        <div className="inspirers-content">
            
            {
            activeInspirerItem===1?
            <div className="all-followed">
                
                {
                    inspirersFollowed.length===0?
                    <div className='no-item'>Yet to follow an inspirer</div>:
                    inspirersFollowed?.map((item)=>{
                        return(
                            <div key={item._id}>
                                {
                                profiles.map((prof)=>{
                                    if(item.inspirer_id===prof.userID){
                                        return(
                                            <div key={prof.userID} className="individual-account">
                                                <div className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                                    <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                    <div className="account-details-info">
                                                        <div className="account-details-info-name">{prof.userName}</div>
                                                        <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                    </div>
                                                </div>
                                                <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following-button':'follow-button'}
                                                onClick={()=>handleFollowUnfollow(item.inspirer_id)}>
                                                    {inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following':'follow'}
                                                </button>
                                            </div>
                                        )

                                    }
                                    else{
                                        
                                    }
                                })
                                }
                            </div>
                            
                        )
                    })
                } 
            </div>
            :
            activeInspirerItem===2?
            <div className="suggestions">
                {
                suggested.map((item)=>{
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
            :
            <div className="followed-you">
                {
                   beenFollowed.length===0?
                   <div className='no-item'>No followership yet</div>:
                   beenFollowed.map((item)=>{
                    return(
                        <div key={item._id}>
                            {
                            profiles.map((prof)=>{
                            if(item.fan_id===prof.userID){
                                return(
                                    <div key={item._id} className="individual-account">
                                        <div key={prof.userID} className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                            <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                            <div className="account-details-info">
                                                <div className="account-details-info-name">{prof.userName}</div>
                                                <div className="account-details-info-profile-name">{prof.profileName}</div>
                                            </div>
                                            
                                        </div>
                                        <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.fan_id)?'following-button':'follow-button'}
                                            onClick={()=>handleFollowUnfollow(item.fan_id)}>
                                                {inspirersFollowed.find((followed)=>followed.inspirer_id===item.fan_id)?'following':'follow'}
                                        </button>
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
            }
                
        </div>
    </div>
 
  )
}

export default Inspirers