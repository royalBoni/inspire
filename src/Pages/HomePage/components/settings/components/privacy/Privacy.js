import React from 'react'
import { FaBars } from 'react-icons/fa'
import './privacy.css'
import MobileMenu from './component/MobileMenu'
import { useState } from 'react'

const Privacy = ({handleBack}) => {

  const [mobileMenuPage,setMobileMenuPage]=useState('none-mobile-menu-page')
  const handleMenuPage=()=>{
    setMobileMenuPage('mobile-menu-page')
  }

  const handleCloseMenuPage=()=>{
    setMobileMenuPage('none-mobile-menu-page')
  }

  return (
    <div className='privacy-page'>
      <MobileMenu 
      mobileMenuPage={mobileMenuPage}
      handleCloseMenuPage={handleCloseMenuPage}
      />
      <div className="privacy-page-header">
        <button className='back-button' onClick={handleBack}>Back</button>
        <FaBars className="privacy-page-header-nav" onClick={handleMenuPage}/>
      </div>
      
      <div className="privacy-page-content">
        <div className="privacy-page-content-title">Privacy Policy</div>

        <div className="privacy-page-content-foreword">
            <div className="privacy-page-content-foreword-date">Effective March 10, 2023</div>
            <div className="privacy-page-content-foreword-message">
              At InspireMe, we are committed to protecting your privacy and ensuring that your personal information is
               kept secure. This Privacy Policy explains how we collect, use, and disclose your personal information when
                you use our social application with an aim of users inspiring other users.
            </div>
        </div>
        <div className="privacy-page-content-content">
          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='collect'>Information We Collect</div>
            <div className="privacy-page-content-content-item-message">
              When you use our application, we may collect personal information that you provide to us, including:
              <ul>
                <li>Your name and email address</li>
                <li>Your profile picture and other profile information</li>
                <li>Your posts, comments, and other content you create and share on the platform</li>
                <li>Your interactions with other users, including messages and chat conversations</li>
              </ul>
              In addition, we may collect information automatically when you use our application, including:
              <ul>
                <li>Device information, such as your device type, operating system, and IP address</li>
                <li>Usage information, such as the pages you visit, the content you view and interact with, and the time and date of your visits</li>
              </ul>
            </div>
          </div>

          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='use'>How We Use Your Information</div>
            <div className="privacy-page-content-content-item-message">
            We use your personal information for the following purposes:
              <ul>
                <li>To create and maintain your user account and profile</li>
                <li>To enable you to create and share inspiring content with other users</li>
                <li>To connect you with other users and facilitate interactions between users</li>
                <li>To personalize your experience and provide you with relevant content and recommendations</li>
                <li>To analyze and improve our application and services</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
              In addition, we may collect information automatically when you use our application, including:
              <ul>
                <li>Device information, such as your device type, operating system, and IP address</li>
                <li>Usage information, such as the pages you visit, the content you view and interact with, and the time and date of your visits</li>
              </ul>
            </div>
          </div>


          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='share'>How We Share Your Information</div>
            <div className="privacy-page-content-content-item-message">
            We may share your personal information with the following parties:
              <ul>
                <li>Other users of the application, to enable interactions and communication between users</li>
                <li>Service providers and vendors who provide services on our behalf, such as hosting, data storage, and analytics</li>
                <li>Law enforcement agencies or other government authorities if required by law or to protect our rights or the rights of others</li>
              </ul>
            </div>
          </div>

          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='security'>Security and Retention of Your Information</div>
            <div className="privacy-page-content-content-item-message">
              We take appropriate technical and organizational measures to protect your personal information from unauthorized
               access, use, or disclosure. We retain your personal information for as long as necessary to fulfill the purposes
                for which it was collected, unless a longer retention period is required by law.
            </div>
          </div>


          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='right'>Your Rights and Choices</div>
            <div className="privacy-page-content-content-item-message">
              You have the right to access, correct, and delete your personal information, as well as to object to its
               processing and request its restriction or portability, in accordance with applicable law. You can exercise 
               these rights by contacting us
            </div>
          </div>

          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='changes'>Changes to this Policy</div>
            <div className="privacy-page-content-content-item-message">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. 
              We will notify you of any material changes to this Policy by posting a notice on our application or by other
               means as required by law.
            </div>
          </div>

          <div className="privacy-page-content-content-item">
            <div className="privacy-page-content-content-item-title" id='contact'>Contact Us</div>
            <div className="privacy-page-content-content-item-message">
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us 
              at [contact email].
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Privacy