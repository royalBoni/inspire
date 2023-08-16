import React from 'react'
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

const Settings = ({settingsPage,warning,setWarning,setWarningMessage}) => {
    const [notificationActive,setNotificationActive]=useState('active')
    const [darkThemesActive,setDarkThemesActive]=useState('')
    const [languageActive,setLanguageActive]=useState('')
    const [privacyActive,setPrivacyActive]=useState('')
    const [cookiesActive,setCookiesActive]=useState('')
    const [communityActive,setCommunityActive]=useState('')
    const [reportBugActive,setReportBugActive]=useState('')
    const [reportProblemActive,setReportProblemActive]=useState('')

    const [closeNav,setCloseNav]=useState('settings-page-nav')
    const [mainContent,setMainContent]=useState('settings-page-item-content')
    const [pageTitle,setPageTitle]=useState("settings-page-title")

    const [notificationComp,setNotificationComp]=useState('')
    const [darkThemesComp,setDarkThemesComp]=useState('deactivate_feed_page')
    const [languageComp,setLanguageComp]=useState('deactivate_feed_page')
    const [privacyComp,setPrivacyComp]=useState('deactivate_feed_page')
    const [cookiesComp,setCookiesComp]=useState('deactivate_feed_page')
    const [communityComp,setCommunityComp]=useState('deactivate_feed_page')
    const [reportBugComp,setReportBugComp]=useState('deactivate_feed_page')
    const [reportProblemComp,setReportProblemComp]=useState('deactivate_feed_page')

    const handleSelectActiveMenuItem=(num)=>{
        if(num===1){
            setNotificationActive('active')

            setDarkThemesActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportBugActive('')
            setReportProblemActive('')


            setNotificationComp('')

            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page')
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')


            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===2){
            setDarkThemesActive('active')

            setNotificationActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportBugActive('')
            setReportProblemActive('')


            setDarkThemesComp('')

            setNotificationComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page')
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===3){
            setLanguageActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportBugActive('')
            setReportProblemActive('')

            setLanguageComp('')            

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===4){
            setPrivacyActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setLanguageActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportBugActive('')
            setReportProblemActive('')

            setPrivacyComp('')                       

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page') 
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===5){
            setCookiesActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCommunityActive('')
            setReportBugActive('')
            setReportProblemActive('')

            setCookiesComp('')                                  

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page') 
            setPrivacyComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===6){
            setCommunityActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setReportBugActive('')
            setReportProblemActive('')

            setCommunityComp('')                          

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page') 
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }

        if(num===8){
            setReportProblemActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportBugActive('')
 
            setReportProblemComp('')                         

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page') 
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportBugComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings') 
        }

        if(num===9){
            setReportBugActive('active')

            setNotificationActive('')
            setDarkThemesActive('')
            setLanguageActive('')
            setPrivacyActive('')
            setCookiesActive('')
            setCommunityActive('')
            setReportProblemActive('')
 
            setReportBugComp('')                         

            setNotificationComp('deactivate_feed_page')
            setDarkThemesComp('deactivate_feed_page')
            setLanguageComp('deactivate_feed_page') 
            setPrivacyComp('deactivate_feed_page')
            setCookiesComp('deactivate_feed_page')
            setCommunityComp('deactivate_feed_page')
            setReportProblemComp('deactivate_feed_page')

            setCloseNav('deactivate-nav')
            setMainContent('display-settings-page-item-content')
            setPageTitle('no-settings')
        }
    }

    const handleBack=()=>{
        setMainContent('settings-page-item-content')
        setCloseNav('settings-page-nav')
        setWarning(false)
        setWarningMessage(null)
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
    <div className={`settings-page ${settingsPage}`}>
        <div className={`${pageTitle}`}>Settings</div>
        <div className="settings-page-item">
            <div className={`${closeNav}`}>
                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">General</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item ${notificationActive}`} onClick={()=>handleSelectActiveMenuItem(1)}><FaRegBell/> Notifications</div>
                        <div className={`settings-page-nav-item-content-item ${darkThemesActive}`} onClick={()=>handleSelectActiveMenuItem(2)}><FaMoon/> Dark Mode /Themes</div>
                        <div className={`settings-page-nav-item-content-item ${languageActive}`} onClick={()=>handleSelectActiveMenuItem(3)}><FaGlobe/> Language</div>
                    </div>
                </div>

                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">Terms of Service</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item ${privacyActive}`} onClick={()=>handleSelectActiveMenuItem(4)}><FaLock/>
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
                        <div className={`settings-page-nav-item-content-item ${cookiesActive}`} onClick={()=>handleSelectActiveMenuItem(5)}><FaCookieBite/> Cookies policy</div>
                        <div className={`settings-page-nav-item-content-item ${communityActive}`} onClick={()=>handleSelectActiveMenuItem(6)}><FaUsersCog/> Community Standards</div>
                    </div>
                </div>

                <div className="settings-page-nav-item">
                    <div className="settings-page-nav-item-title">Help and Support</div>
                    <div className="settings-page-nav-item-content">
                        <div className={`settings-page-nav-item-content-item`}><FaLifeRing/>Help Center</div>
                        <div className={`settings-page-nav-item-content-item ${reportProblemActive}`} onClick={()=>handleSelectActiveMenuItem(8)}><FaTools/> Report a problem</div>
                        <div className={`settings-page-nav-item-content-item ${reportBugActive}`} onClick={()=>handleSelectActiveMenuItem(9)}><FaBug/> Report a bug</div>
                    </div>
                </div>
            </div>
            <div className={`${mainContent}`}>
                <div className={`${notificationComp}`}>
                    <NotificationComponent 
                    handleBack={handleBack}
                    />
                </div>   
                <div className={`${darkThemesComp}`}>
                    <DarkOrThemes 
                    handleBack={handleBack}
                    />
                </div>
                <div className={`${languageComp}`}>
                    <Language 
                    handleBack={handleBack}
                    />
                </div>
                <div className={`${privacyComp}`}>
                    <Privacy 
                    handleBack={handleBack}
                    />
                </div>
                <div className={`${cookiesComp}`}>
                    <Cookies
                    handleBack={handleBack}
                     />
                </div>
                <div className={`${communityComp}`}>
                    <Community 
                    handleBack={handleBack}
                    />
                </div>

                <div className={`${reportProblemComp}`}>
                    <ReportProblem
                    handleBack={handleBack}
                    warning={warning}
                    setWarning={setWarning}
                    setWarningMessage={setWarningMessage}
                    />
                </div>

                <div className={`${reportBugComp}`}>
                    <ReportBug
                    handleBack={handleBack}
                    warning={warning}
                    setWarning={setWarning}
                    setWarningMessage={setWarningMessage}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings