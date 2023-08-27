import React, { useEffect } from 'react'
import './settings.css'
import {FaBug, FaCookieBite, FaGlobe, FaLock, FaMoon, FaRegBell,FaLifeRing,FaUsersCog, FaBook, FaTools,FaAngleUp,FaAngleDown} from 'react-icons/fa'
import { useState } from 'react'
import NotificationComponent from './components/NotificationComponent'
import DarkOrThemes from './components/DarkOrThemes'
import Language from './components/Language'
import Privacy from './components/privacy/Privacy'
import Cookies from './components/Cookies'
import Community from './components/Community'
import ReportBug from './components/ReportBug'
import ReportProblem from './components/ReportProblem'
import { useSelector } from 'react-redux'

const Settings = ({functionalityUnderDevelopment}) => {
    const [activeItem, setActiveItem] = useState(1)

    const pageWidth = useSelector((state)=>state.myStates.pageWidth)
    console.log(pageWidth)

    const [closeNav,setCloseNav]=useState('settings-page-nav')
    const [mainContent,setMainContent]=useState('settings-page-item-content')
    const [pageTitle,setPageTitle]=useState("settings-page-title")

    const handleSelectActiveMenuItem=(num)=>{
        setActiveItem(num)
        if(num===1){
            
            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===2){
          
            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===3){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===4){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===5){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===6){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===8){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings') 
        }

        if(num===9){
           

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }
    }

    const handleBack=()=>{
        setMainContent('settings-page-item-content')
        setCloseNav('settings-page-nav')
    }


    const [toggle,setToggle]=useState(false)
    const [toggleStyle,setToggleStyle]=useState('')
    const [toggleSettings,setToggleSettings]=useState('no-settings')

    const handleToggle=()=>{
        setToggle(!toggle)
        if(toggle){
            setToggleStyle('rotate-forward')
            setToggleSettings('settings')
        }
        else{
            setToggleStyle('rotate-backward')
            setToggleSettings('no-settings')
        }
    }

  return (
    <div className='settings-page'>
        <div className='settings-page-title'>{pageWidth<768&&'Settings'}</div>
        <div className="settings-page-item">
            <div className={`${closeNav}`}>
                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">General</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item ${activeItem===1?'active':null}`} onClick={()=>handleSelectActiveMenuItem(1)}><FaRegBell/> Notifications</div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===2?'active':null}`} onClick={()=>handleSelectActiveMenuItem(2)}><FaMoon/> Dark Mode /Themes</div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===3?'active':null}`} onClick={()=>handleSelectActiveMenuItem(3)}><FaGlobe/> Language</div>
                    </div>
                </div>

                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">Terms of Service</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item ${activeItem===4?'active':null}`} onClick={()=>handleSelectActiveMenuItem(4)}><FaLock/>
                         Privacy policy <div className='toggle-icon' onClick={handleToggle}>{toggle?<FaAngleUp className={`${toggleStyle}`}/>:<FaAngleDown className={`${toggleStyle}`}/>}</div>
                         </div>
                         <div className={`${toggleSettings}`}>
                             <a href="#collect">Information Collection</a>
                             <a href="#use">Information Usage</a>
                             <a href="#share">Information Sharing</a>
                             <a href="#security">Security and Retention</a>
                             <a href="#right">Your Right and Choices</a>
                             <a href="#changes">Changes to Policies</a>
                             <a href="#contact">Contact Us</a>
                         </div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===5?'active':null}`} onClick={()=>handleSelectActiveMenuItem(5)}><FaCookieBite/> Cookies policy</div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===6?'active':null}`} onClick={()=>handleSelectActiveMenuItem(6)}><FaUsersCog/> Community Standards</div>
                    </div>
                </div>

                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">Help and Support</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item`}><FaLifeRing/>Help Center</div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===8?'active':null}`} onClick={()=>handleSelectActiveMenuItem(8)}><FaTools/> Report a problem</div>
                        <div className={`settings-page-nav-item-content-item ${activeItem===9?'active':null}`} onClick={()=>handleSelectActiveMenuItem(9)}><FaBug/> Report a bug</div>
                    </div>
                </div>
            </div>
            <div className={`${mainContent}`}>
                {
                    activeItem===1?
                    <NotificationComponent 
                    handleBack={handleBack}
                    />:
                    activeItem===2?
                    <DarkOrThemes 
                    handleBack={handleBack}
                    />:
                    activeItem===3?
                    <Language 
                    handleBack={handleBack}
                    />:
                    activeItem===4?
                    <Privacy 
                    handleBack={handleBack}
                    />:
                    activeItem===5?
                    <Cookies
                    handleBack={handleBack}
                     />:
                     activeItem===6?
                     <Community 
                    handleBack={handleBack}
                    />:
                    activeItem===8?
                    <ReportProblem
                    handleBack={handleBack}
                    functionalityUnderDevelopment={functionalityUnderDevelopment}
                    />:
                    <ReportBug
                    handleBack={handleBack}
                    functionalityUnderDevelopment={functionalityUnderDevelopment}
                    />
                }
            </div>
        </div>
    </div>
  )
}

export default Settings