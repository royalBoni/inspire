import React from 'react';
import './about.css';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from 'react';

const About = ({deactivateAbout}) => {
    const [activeWork,setActiveWork]=useState('active')
    const [activePlaces,setActivePlaces]=useState('')
    const [activeContact,setActiveContact]=useState('')
    const [activeFamily,setActiveFamily]=useState('')
    const [activeDetails,setActiveDetails]=useState('')
    const [activeLife,setActiveLife]=useState('')

    const handleActiveAboutContent=(num)=>{
        if(num===1){
            setActiveWork('active');

            setActivePlaces('');
            setActiveContact('');
            setActiveFamily('');
            setActiveDetails('');
            setActiveLife('');
        }
        else if(num===2){
            setActivePlaces('active');
            
            setActiveWork('');
            setActiveContact('');
            setActiveFamily('');
            setActiveDetails('');
            setActiveLife('');
        }
        else if(num===3){
            setActiveContact('active');

            setActiveWork('');
            setActivePlaces('');
            setActiveFamily('');
            setActiveDetails('');
            setActiveLife('');
        }
        else if(num===4){
            setActiveFamily('active');

            setActiveWork('');
            setActivePlaces('');
            setActiveContact('');
            setActiveDetails('');
            setActiveLife('');
        }
        else if(num===5){
            setActiveDetails('active');

            setActiveWork('');
            setActivePlaces('');
            setActiveContact('');
            setActiveFamily('');
            setActiveLife('');
        }
        else if(num===6){
            setActiveLife('active');

            setActiveWork('');
            setActivePlaces('');
            setActiveContact('');
            setActiveFamily('');
            setActiveDetails('');
        }
    }
  return (
    <div className={`${deactivateAbout}`}>
        <div className="about">
            <div className="about-title"><FaUserAlt className="about-title-icon"/>About</div>
            <div className="about-content">
                <div className="overview">
                    <div className="overview-title">Overview</div>
                    <div className="overview-content">
                        <div className={`overview-content-item ${activeWork}`} onClick={()=>handleActiveAboutContent(1)}>Work and Education</div>
                        <div className={`overview-content-item ${activePlaces}`} onClick={()=>handleActiveAboutContent(2)}>Places You Have Lived</div>
                        <div className={`overview-content-item ${activeContact}`} onClick={()=>handleActiveAboutContent(3)}>Contact and Basic Info</div>
                        <div className={`overview-content-item ${activeFamily}`} onClick={()=>handleActiveAboutContent(4)}>Family and Relationships</div>
                        <div className={`overview-content-item ${activeDetails}`} onClick={()=>handleActiveAboutContent(5)}>Details About You</div>
                        <div className={`overview-content-item ${activeLife}`} onClick={()=>handleActiveAboutContent(6)}>Life Events</div>
                    </div>
                </div>
                <div className="overview-detail"></div>
            </div>
        </div>
    </div>
  )
}

export default About