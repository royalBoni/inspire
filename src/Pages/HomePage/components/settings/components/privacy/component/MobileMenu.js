import React from 'react'
import './mobileMenu.css'

const MobileMenu = ({mobileMenuPage,handleCloseMenuPage}) => {
  return (
    <div className={`${mobileMenuPage}`}>
      <div className="mobile-menu-header">
         <button  className="back-button" onClick={handleCloseMenuPage}>Back</button>
         Privacy Policy
      </div>

      <div className="mobile-menu-items">
         <a href="#collect" onClick={handleCloseMenuPage}>Information Collection</a>
         <a href="#use" onClick={handleCloseMenuPage}>Information Usage</a>
         <a href="#share" onClick={handleCloseMenuPage}>Information Sharing</a>
         <a href="#security" onClick={handleCloseMenuPage}>Security and Retention</a>
         <a href="#right" onClick={handleCloseMenuPage}>Your Right and Choices</a>
         <a href="#changes" onClick={handleCloseMenuPage}>Changes to Policies</a>
         <a href="#contact" onClick={handleCloseMenuPage}>Contact Us</a>
      </div>
    </div>
  )
}

export default MobileMenu