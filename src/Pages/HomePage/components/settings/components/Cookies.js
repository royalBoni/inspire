import React from 'react'
import {FaBars} from 'react-icons/fa'
import './cookies.css'

const Cookies = ({handleBack}) => {
  return (
    <div>
      <div className='cookies-page'>
      <div className="cookies-page-header">
        <button className='back-button' onClick={handleBack}>Back</button>
        <FaBars className="cookies-page-header-nav"/>
      </div>
      
      <div className="cookies-page-content">
        <div className="cookies-page-content-title">Cookies Policy</div>

        <div className="cookies-page-content-foreword">
            <div className="cookies-page-content-foreword-date">Effective March 10, 2023</div>
            <div className="cookies-page-content-foreword-message">
            This Cookie Policy explains how our social application uses cookies and similar technologies to provide you 
            with the best possible user experience. By using our social application, you consent to our use of cookies in 
            accordance with this Cookie Policy.
            </div>
        </div>
        <div className="cookies-page-content-content">
          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='collect'>What Are Cookies?</div>
            <div className="cookies-page-content-content-item-message">
              Cookies are small text files that are placed on your device (e.g., computer, smartphone, or tablet) when you
               access our social application. Cookies enable our social application to recognize your device and store 
               information about your preferences or past actions. Cookies also help us to provide you with customized 
               content and to improve our social application.
            </div>
          </div>

          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='use'>Types of Cookies We Use</div>
            <div className="cookies-page-content-content-item-message">
            We use the following types of cookies:
              <ul>
                <li>Essential Cookies: These cookies are necessary for our social application to function properly. For 
                  example, they allow you to log in to your account and use our social application's features.
                </li>
                <li>Analytical Cookies: These cookies help us to understand how our social application is used and how we 
                  can improve it. For example, they allow us to track user behavior and to see which pages are most 
                  popular.
                </li>
                <li>
                Advertising Cookies: These cookies are used to deliver targeted ads to you based on your interests. For 
                example, if you have recently searched for a particular product or service, you may see ads for that 
                product or service on our social application.
                </li>
                <li>Social Media Cookies: These cookies are used to enable you to share content from our social 
                  application on social media platforms. For example, if you want to share a post with your friends on 
                  Facebook, you can use the social media sharing buttons on our social application.
                </li>
              </ul>
              In addition, we may collect information automatically when you use our application, including:
              <ul>
                <li>Device information, such as your device type, operating system, and IP address</li>
                <li>Usage information, such as the pages you visit, the content you view and interact with, and the time and date of your visits</li>
              </ul>
            </div>
          </div>


          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='share'>How We Use Cookies</div>
            <div className="cookies-page-content-content-item-message">
            We use cookies to:
              <ul>
                <li>Provide you with customized content and advertisements</li>
                <li>Improve our social application</li>
                <li>Understand how our social application is used</li>
                <li>Allow you to log in to your account</li>
                <li>Enable you to share content on social media platforms</li>
              </ul>
            </div>
          </div>

          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='security'>Third-Party Cookies</div>
            <div className="cookies-page-content-content-item-message">
              We may also use cookies from third-party providers, such as Google Analytics, to analyze how our social 
              application is used. These cookies may collect information about your browsing behavior, such as the pages 
              you visit or the links you click on. This information may be used to deliver targeted advertisements to you 
              or to improve our social application.
            </div>
          </div>


          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='right'>How to Control Cookies</div>
            <div className="cookies-page-content-content-item-message">
            You can control the use of cookies on our social application by adjusting your browser settings. Most 
            browsers allow you to block or delete cookies. However, if you do this, some features of our social 
            application may not work properly.
            </div>
          </div>

          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='changes'>Updates to this Cookie Policy</div>
            <div className="cookies-page-content-content-item-message">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on our 
            social application. You are advised to review this Cookie Policy periodically for any changes.
            </div>
          </div>

          <div className="cookies-page-content-content-item">
            <div className="cookies-page-content-content-item-title" id='contact'>Contact Us</div>
            <div className="cookies-page-content-content-item-message">
              If you have any questions or concerns about this cookies Policy or our cookies practices, please contact us 
              at [contact email].
            </div>
          </div>

        </div>
      </div>
    </div>
      
      </div>
  )
}

export default Cookies