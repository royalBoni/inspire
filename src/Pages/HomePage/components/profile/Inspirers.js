import React from 'react'
import './inspirers.css'
import { useState } from 'react'
import ProductLoadingPage from '../ProductLoadingPage'
import ProductLoadingErrorPage from '../ProductLoadingErrorPage'
import {format} from 'date-fns'

const Inspirers = ({deactivateInspirers,inspirersFollowed,accountProfiles,suggestedNoDuplicate,beenFollowed,profiles,
    setTriggerInspirers,triggerInspirers,loadingInspirers,inspirersError,userID,setInspirersFollowed,handleFollowUnfollow,handleOpenUserProfilePage}) => {
    const [allFollowed,setAllFollowed]=useState('inspirer-active')
    const [suggestions,setSuggestions]=useState('')
    const [followingYou,setFollowingYou]=useState('')

 
    const handleInspirers=(num)=>{
        setTriggerInspirers(!triggerInspirers)
        if(num===1){
            setAllFollowed('inspirer-active')

            setSuggestions('')
            setFollowingYou('')
        }
        else if(num===2){
            setSuggestions('inspirer-active')

            setAllFollowed('')
            setFollowingYou('')
        }
        else if(num===3){
            setFollowingYou('inspirer-active')

            setAllFollowed('')
            setSuggestions('')
        }
    } 
  return (
    <div className={`${deactivateInspirers}`}>
        <div className="inspirers">
            <div className="inspirers-nav">
                <div className="inspirers-nav-content">
                    <div className={`inspirers-nav-content-item ${allFollowed}`} onClick={()=>handleInspirers(1)}>Following</div>
                    <div className={`inspirers-nav-content-item ${suggestions}`} onClick={()=>handleInspirers(2)}>Suggestions</div>
                    <div className={`inspirers-nav-content-item ${followingYou}`} onClick={()=>handleInspirers(3)}>Following You</div>
                </div>
                <div className="inspires-nav-search">
                    <input type="text" placeholder='search' />
                </div>
            </div>
            <div className="inspirers-content">
                
                {
                    loadingInspirers?
                    <ProductLoadingPage
                    message='Loading Inspirers'
                    />
                    :inspirersError?
                    <ProductLoadingErrorPage
                    fetchInspirationError={inspirersError}/>

                    :allFollowed==='inspirer-active'?
                    <div className="all-followed">
                        
                            {
                                inspirersFollowed.map((item)=>{
                                    return(
                                        <div key={item._id} className="individual-account">
                                            {
                                                profiles.map((prof)=>{
                                                  if(item.inspirer_id===prof.userID){
                                                        return(
                                                            <div key={prof.userID} className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                                                <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                                <div className="account-details-info">
                                                                    <div className="account-details-info-name">{prof.userName}</div>
                                                                    <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                                </div>
                                                            </div>
                                                        )

                                                    }
                                                    else{
                                                        
                                                    }
                                                })
                                            }
                                            <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following-button':'follow-button'}
                                            onClick={()=>handleFollowUnfollow(item.inspirer_id)}>
                                                {inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following':'follow'}
                                            </button>
                                        </div>
                                        
                                    )
                                })
                            }
                        
                        
                    </div>
                    :
                    /* suggestions==='inspirer-active'?
                    <div className="suggestions">
                        {
                                suggestedNoDuplicate?.map((item)=>{
                                    return(
                                        <div key={item?.id} className="individual-account">
                                            {
                                                profiles?.map((prof)=>{
                                                    if(item.inspirer_id===prof.userID){
                                                        return(

                                                            <div className="d">
                                                            <div key={prof.profile_id} className="account-details">
                                                                <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                                <div className="account-details-info">
                                                                    <div className="account-details-info-name">{prof.userName}</div>
                                                                    <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        )

                                                    }
                                                   
                                                    
                                                })
                                            }
                                            <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following-button':'follow-button'}>
                                                {inspirersFollowed.find((followed)=>followed.inspirer_id===item.inspirer_id)?'following':'follow'}
                                            </button>
                                        </div>
                                        
                                    )
                                })
                            }
                    </div> */
                    suggestions==='inspirer-active'?
                    <div className="suggestions">
                        {
                                suggestedNoDuplicate?.map((item)=>{
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
                                beenFollowed.map((item)=>{
                                    return(
                                        <div key={item._id} className="individual-account">
                                            {
                                                profiles.map((prof)=>{
                                                    if(item.fan_id===prof.userID){
                                                        return(
                                                            <div key={prof.userID} className="account-details" onClick={()=>handleOpenUserProfilePage(prof.userID)}>
                                                                <div className="account-image"><img src={prof.profile_image_avatar} alt="" /></div>
                                                                <div className="account-details-info">
                                                                    <div className="account-details-info-name">{prof.userName}</div>
                                                                    <div className="account-details-info-profile-name">{prof.profileName}</div>
                                                                </div>
                                                            </div>
                                                        )

                                                    }
                                                })
                                            }
                                            <button className={inspirersFollowed.find((followed)=>followed.inspirer_id===item.fan_id)?'following-button':'follow-button'}
                                            onClick={()=>handleFollowUnfollow(item.fan_id)}>
                                                {inspirersFollowed.find((followed)=>followed.inspirer_id===item.fan_id)?'following':'follow'}
                                            </button>
                                        </div>
                                        
                                    )
                                })
                            }
                    </div>
                }
                    
            </div>
        </div>
    </div>
  )
}

export default Inspirers