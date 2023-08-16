import React from 'react'
import './reportbug.css'
import {FaTimes,FaSpinner} from 'react-icons/fa'
import { useState } from 'react'
import Warning from '../../Warning';

const ReportBug = ({handleBack,warning,setWarning,setWarningMessage}) => {
  const{userName,userEmail}=JSON.parse(localStorage.getItem("myInspireAccount"));
  const [closeInstruction,setCloseInstruction]=useState('no-instruction')
  const [closeForm,setCloseForm]=useState('report-bug-page-content-content-form')
  const [bugTitle,setBugTitle]=useState('')
  const [bugDescription,setBugDescription]=useState('')
  const [browserUsed,setBrowserUsed]=useState('')
  const [loading,setLoading]=useState(false)

  const handleCloseInstruction=()=>{
    setCloseInstruction('no-instruction')
    setCloseForm('report-bug-page-content-content-form')
  }

  const handleReadInstructions=()=>{
    setCloseInstruction('report-bug-page-content-content-instruction')
    setCloseForm('no-form')
  }

  const handleReset=()=>{
    setBugTitle('')
    setBugDescription('')
    setBrowserUsed('')
  }

  const handleSubmitReport=async()=>{
    if(bugDescription){
      try{
        setLoading(true)
        const date=new Date()
        const newReport={
          userName:userName,
          userEmail:userEmail,
          dateTime:date,
          bugTitle:bugTitle,
          bugDescription:bugDescription,
          browserUsed:browserUsed
        }
        const postOptions ={
          method : 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body:JSON.stringify(newReport)
        }
        const response=await fetch(`http://localhost:5000/help`,postOptions)
        const jsonfile=await response.json()
        if(!response.ok){
          setWarningMessage(jsonfile.message)
          setWarning(true)
          setTimeout(() => {
              setWarning(false)
              setWarningMessage(null)
          }, 17000);
        }
       
       else{
         handleReset()
         setWarningMessage('Report successfully sent.')
         setWarning(true)
         setTimeout(() => {
             setWarning(false)
             setWarningMessage(null)
         }, 17000);
       }
      }
      catch(err){
        if(err.message==='Failed to fetch'){
          setWarningMessage('network or server might be down')
          setWarning(true)
          setTimeout(() => {
              setWarning(false)
              setWarningMessage(null)
      }, 17000);
          
        }
      else{
          setWarningMessage(`Error: ${err.message}`)
          setWarning(true)
          setTimeout(() => {
              setWarning(false)
              setWarningMessage(null)
      }, 17000);
        }
      }
      finally{
        setLoading(false)
      }
    }
    else{
      setWarningMessage('please describe the bug')
      setWarning(true)
      setTimeout(() => {
          setWarning(false)
          setWarningMessage(null)
  }, 17000);
    }
   
  }

  return (
    <div>
    <div className='report-bug-page'>
    <div className="report-bug-page-header">
      <button className='back-button' onClick={handleBack}>Back</button>
      <h3>Form <div className='instruction-button' onClick={handleReadInstructions}>Instructions</div></h3>
    </div>
    
    <div className="report-bug-page-content">
      <div className="report-bug-page-content-title">Report a Bug</div>
      <div className="report-bug-page-content-content">
        <div className={`${closeForm}`}>
          <h3>Form <div className='instruction-button' onClick={handleReadInstructions}>Instructions</div></h3>
          <form action="" onSubmit={(e)=>e.preventDefault()}>
            <div className="form-row">
              <label htmlFor="bug-title">Bug Title</label>
              <input type="text" placeholder='enter a bug title' value={bugTitle} onChange={(e)=>setBugTitle(e.target.value)}/>
            </div>

            <div className="form-row">
              <label htmlFor="bug-title">Bug Description</label>
              <textarea name="" id="" cols="30" rows="10" 
              placeholder='describe bug and how it was encountered'  value={bugDescription} onChange={(e)=>setBugDescription(e.target.value)}>
              </textarea>
            </div>

            <div className="form-row">
              <label htmlFor="bug-title">Browser Used</label>
              <input type="text" placeholder='enter a browser when bug was encountered' value={browserUsed} onChange={(e)=>setBrowserUsed(e.target.value)}/>
            </div>  

            <div className="form-row">
              <button className='submit' onClick={handleSubmitReport}>
                {
                  loading?<FaSpinner className='loading-animation'/>:'Submit Report'
                }
              </button>
            </div> 
          </form>
        </div>
        <div className={`${closeInstruction}`}>
          <h3>Instructions <FaTimes className='close-instruction'  onClick={handleCloseInstruction} /></h3>
          <p>
             To report a bug in our social application, please follow these steps:
            <ol>
              <li>Click on the "Settings" or "Menu" button in the app to open the app's main menu.</li>
              <li>Select the "Help & Feedback" option.</li>
              <li>Click on the "Report a Bug" button.</li>
              <li>Fill out the bug report form with as much detail as possible. Be sure to include a clear description of the issue, steps to reproduce it, any error messages you saw, and the device you were using.</li>
              <li>If possible, attach a screenshot or video of the bug in action to help us better understand the issue.</li>
              <li>Click the "Submit" button to send your report to our development team.</li>
              Once you've submitted your bug report, our team will investigate the issue and work to fix it as quickly as possible. Thank you for helping us improve our app!
            </ol>
          </p>
        </div>
      </div>
    </div>
  </div>
    
    </div>
  )
}

export default ReportBug