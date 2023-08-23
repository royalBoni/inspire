import React from 'react';
import './about.css';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from 'react';

const About = ({deactivateAbout}) => {
    const [activeItem,setActiveItem]=useState(1)
   

    const handleActiveAboutContent=(num)=>{
       setActiveItem(num)
    }
  return (
    <div className={`${deactivateAbout}`}>
        <div className="about">
            <div className="about-title"><FaUserAlt className="about-title-icon"/>About</div>
            <div className="about-content">
                <div className="overview">
                    <div className="overview-content">
                        <div className={`overview-content-item ${activeItem===1?'active':null}`} onClick={()=>handleActiveAboutContent(1)}>Overview</div>
                        <div className={`overview-content-item ${activeItem===2?'active':null}`} onClick={()=>handleActiveAboutContent(2)}>Work and Education</div>
                        <div className={`overview-content-item ${activeItem===3?'active':null}`} onClick={()=>handleActiveAboutContent(3)}>Places You Have Lived</div>
                        <div className={`overview-content-item ${activeItem===4?'active':null}`} onClick={()=>handleActiveAboutContent(4)}>Contact and Basic Info</div>
                        <div className={`overview-content-item ${activeItem===5?'active':null}`} onClick={()=>handleActiveAboutContent(5)}>Family and Relationships</div>
                        <div className={`overview-content-item ${activeItem===6?'active':null}`} onClick={()=>handleActiveAboutContent(6)}>Details About You</div>
                        <div className={`overview-content-item ${activeItem===7?'active':null}`} onClick={()=>handleActiveAboutContent(7)}>Life Events</div>
                    </div>
                </div>
                <div className="overview-detail">
                    {
                        activeItem===1?
                        <div>Overview</div>:

                        activeItem===2?
                        <div>Work and Education</div>:

                        activeItem===3?
                        <div>Place you have lived</div>:

                        activeItem===4?
                        <div>Contact and basic info</div>:

                        activeItem===5?
                        <div>Family and Relationships</div>:

                        activeItem===5?
                        <div>Details about you</div>:

                        <div>Life Events</div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default About