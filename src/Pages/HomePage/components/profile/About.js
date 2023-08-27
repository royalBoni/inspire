import React from 'react';
import './about.css';
import { FaUserAlt,FaBriefcase,FaGraduationCap,FaLocationArrow, FaSchool, FaPhone, FaMobile, FaAt } from 'react-icons/fa';
import { useState } from 'react';

const About = ({myInfo,editProfile}) => {
   
    const [activeItem,setActiveItem]=useState(1)

    const handleActiveAboutContent=(num)=>{
       setActiveItem(num)
    }
   
  return (
    
    <div className="about">
        <div className="about-title"><FaUserAlt className="about-title-icon"/>About</div>
        <div className="about-content">
            <div className="overview">
                <div className="overview-content">
                    <div className={`overview-content-item ${activeItem===1?'active':null}`} onClick={()=>handleActiveAboutContent(1)}>Overview</div>
                    <div className={`overview-content-item ${activeItem===2?'active':null}`} onClick={()=>handleActiveAboutContent(2)}>Education</div>
                    <div className={`overview-content-item ${activeItem===3?'active':null}`} onClick={()=>handleActiveAboutContent(3)}>Work</div>
                    <div className={`overview-content-item ${activeItem===4?'active':null}`} onClick={()=>handleActiveAboutContent(4)}>Contact and Basic Info</div>
                    <div className={`overview-content-item ${activeItem===5?'active':null}`} onClick={()=>handleActiveAboutContent(5)}>Details About You</div>
                </div>
            </div>
            <div className='overview-content-content'>
                {
                    activeItem===1?
                    <div className="overview-detail">
                         {myInfo?.work&&JSON.parse(myInfo?.work)?.position&&<p><FaBriefcase className='iconics'/>  <span>{JSON.parse(myInfo.work).company}</span> at <span>{JSON.parse(myInfo.work).position}</span></p>}
                        {myInfo?.education&&JSON.parse(myInfo?.education).institute&&
                        <>
                        <p><FaGraduationCap className='iconics'/> Studied <span>{JSON.parse(myInfo.education).level}</span> in <span>{JSON.parse(myInfo.education).program}</span></p>
                        <p><FaSchool className='iconics'/> At <span>{JSON.parse(myInfo.education).institute}</span> </p>
                        </>
                        }
                        {myInfo?.country&&<p><FaLocationArrow className='iconics'/> From <span>{myInfo.country}</span> </p>}
                        {myInfo?.email&&<p><FaAt className='iconics'/>{myInfo.email}</p>}
                        {myInfo?.phoneNumber&&<p><FaPhone className='iconics'/> {myInfo.phoneNumber}</p>}
                    </div>:

                    activeItem===2?
                    <div className='item'>
                        <div className='add-item' onClick={editProfile}>Add a college</div>
                        <div className='item-item'>
                            {
                                myInfo?.education&&JSON.parse(myInfo.education).institute&&
                                <p><FaGraduationCap className='iconics'/> Studied <span>{JSON.parse(myInfo.education).level}</span> in <span>{JSON.parse(myInfo.education).program}</span>{JSON.parse(myInfo.education).institute}</p>
                            }
                        </div>
                    </div>:

                    activeItem===3?
                    <div className='item'>
                        <div className='add-item' onClick={editProfile}>Add work</div>
                        <div className='item-item'>
                        {myInfo?.work&&JSON.parse(myInfo.work).position&&<p><FaBriefcase className='iconics'/>  <span>{JSON.parse(myInfo.work).position}</span> at <span>{JSON.parse(myInfo.work).company}</span></p>}
                        </div>
                    </div>:

                    activeItem===4?
                    <div className='item'>
                        <div className='add-item' onClick={editProfile}>Edit Info</div>
                        <div className='item-item'>
                            {myInfo?.country&&<p><FaLocationArrow className='iconics'/>From  <span>{myInfo.country}</span></p>}
                            {myInfo?.phoneNumber&&<p><FaMobile className='iconics'/> {myInfo.phoneNumber}</p>}
                        </div>
                    </div>:

                    <div className='item'>
                        <div className='add-item' onClick={editProfile}>Add details about you</div>
                        <div className='item-item'>
                            
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>

  )
}

export default About