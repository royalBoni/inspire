import React from 'react'
import './community.css'

const Community = ({handleBack}) => {
  return (
    <div>
      <div className='community-page'>
      <div className="community-page-header">
        <button className='back-button' onClick={handleBack}>Back</button>
      </div>
      
      <div className="community-page-content">
        <div className="community-page-content-title">Community Policy</div>

        <div className="community-page-content-foreword">
            <div className="community-page-content-foreword-message">
              Our social application is committed to creating a safe and welcoming environment for all users. To 
              achieve 
              this goal, we have developed the following community standards that all users must abide by:
              <ol>
                <li>Respect for Others: We expect all users to treat others with respect, kindness, and empathy. Hate 
                  speech, bullying, harassment, and discrimination are not tolerated on our platform.
                </li>
                <li>
                 Appropriate Content: Users are responsible for the content they share on our platform. Nudity, sexual 
                 content, violence, and other graphic or explicit content are not allowed. Users must also respect 
                 intellectual property rights and not post copyrighted material without permission.
                </li>
                <li>
                  Safety: Users must not engage in activities that put themselves or others in danger. This includes 
                  incitement to violence, self-harm, and illegal activities.
                </li>
                <li>
                  Authenticity: Users must use their real identities on our platform and not create fake accounts or impersonate others.
                </li>
                <li>
                  Community Building: Our social application is a place where users can inspire and motivate each other. 
                  We encourage users to share positive and uplifting content and engage in meaningful conversations that 
                  build a supportive community.
                </li>
              </ol>
            </div>
        </div>
        <div className="community-page-content-content">
          <div className="community-page-content-content-item">
            <div className="community-page-content-content-item-title" id='collect'>Consequences for Violations:</div>
            <div className="community-page-content-content-item-message">
              We take violations of our community standards seriously and may take a range of actions in response, 
              depending on the severity of the violation. These actions may include:
              <ul>
                <li>Warning the user</li>
                <li>Removing the content</li>
                <li>Temporarily or permanently suspending the user's account</li>
                <li>Reporting the violation to law enforcement if necessary</li>
              </ul>
              Our social application reserves the right to remove any content or suspend any user account that violates 
              these community standards.
            </div>
          </div>

          <div className="community-page-content-content-item">
            <div className="community-page-content-content-item-title" id='use'>Reporting Violations:</div>
            <div className="community-page-content-content-item-message">
            Users who encounter content or behavior that violates our community standards are encouraged to report it to 
            us immediately. We will investigate all reports and take appropriate action to address the violation.
            </div>
          </div>


          <div className="community-page-content-content-item">
            <div className="community-page-content-content-item-title" id='share'>Conclusion:</div>
            <div className="community-page-content-content-item-message">
            By adhering to these community standards, our social application can create a positive and supportive 
            community where users can inspire and motivate each other. We appreciate your cooperation in helping us to 
            maintain a safe and welcoming environment for all users.
            </div>
          </div>

        </div>
      </div>
    </div>
      
      </div>
  )
}

export default Community