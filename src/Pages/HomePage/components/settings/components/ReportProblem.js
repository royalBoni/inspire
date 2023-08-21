import React from 'react'
import './reportproblem.css'
import {useState} from 'react'
import{FaImage,FaTimes,FaSpinner} from 'react-icons/fa'

const ReportProblem = ({handleBack,functionalityUnderDevelopment}) => {
    const{userName,userEmail}=JSON.parse(localStorage.getItem("myInspireAccount"));
    const [problemImage,setProblemImage]=useState(null)
    const [uploadProblemImageFile,setUploadProblemImageFile]=useState(null)
    const [problemfileName,setProblemFileName]=useState('no selected file');
    const [problemDescription,setProblemDescription]=useState('')
    const [problemSteps,setProblemSteps]=useState('')
    const [problemError,setProblemError]=useState('')
    const [problemDeviceBrowser,setDeviceBrowser]=useState('')
    const [loading,setLoading]=useState(false)

    const formData=new FormData()

    const handleClosePreview=()=>{
        setProblemImage(null) 
        setUploadProblemImageFile(null)
    }

    const handleReset=()=>{
        handleClosePreview()
        setProblemFileName('');
        setProblemDescription('')
        setProblemSteps('')
        setProblemError('')
        setDeviceBrowser('')
    }

    const handleSubmitProblem=async()=>{
        const date=new Date()

        if(problemDescription&&problemDeviceBrowser&&problemError){
            try{
                setLoading(true)
                formData.append('image',uploadProblemImageFile)
                formData.append('problemfileName',problemfileName)
                formData.append('problemDescription',problemDescription)
                formData.append('problemDeviceBrowser',problemDeviceBrowser)
                formData.append('problemError',problemError)
                formData.append('problemSteps',problemSteps)
                formData.append('problemDate',date)
                formData.append('userEmail',userEmail)
                formData.append('userName',userName)
                        
                const postOptions ={
                    method : 'POST',
                    body: formData
                    }

                    const response=await fetch(`http://localhost:5000/help/problem`,postOptions)

                    const jsonfile= await response.json()
                    if(!response.ok){
                        functionalityUnderDevelopment(jsonfile.message)
                      }
                     
                     else{
                       handleReset()
                       functionalityUnderDevelopment('Problem successfully sent.')
                     }
            }
            catch(err){
                if(err.message==='Failed to fetch'){
                    functionalityUnderDevelopment('network or server might be down')
                    
                  }
                else{
                    functionalityUnderDevelopment(`Error: ${err.message}`)
                  }
                
            }
            finally{
                setLoading(false)
            }
        
        }
        else{
            functionalityUnderDevelopment('please make sure the form is filled')
        }
    }

  return (
    <div className='problem-page'>
        <div className="probllem-page-header">
            <p>Report a Problem</p>
            <button className='nav-close-button' onClick={handleBack}>Back</button>
        </div>

        <div className="probllem-page-form">
            <form action="" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-row">
                    <label htmlFor="description">Problem Description:</label>
                    <textarea name="description" id="" cols="30" rows="7" placeholder='enter the description of the problem'
                    value={problemDescription} onChange={(e)=>setProblemDescription(e.target.value)}></textarea>
                </div>
                <div className="form-row">
                    <label htmlFor="image">Screeshot / Image:</label>
                    {
                    problemImage&&
                            <div className='preview-image'>
                                <img src={problemImage} className='selected_img'/>
                                <FaTimes className='preview-close' onClick={handleClosePreview}/>
                            </div>
                    }

                    {
                        !problemImage&&
                        <div className="image-post c" onClick={()=>document.querySelector('.problem-input-field').click()}>
                        <input type='file' accept='image' className='problem-input-field' hidden
                            onChange={({target:{files}})=>{
                                files[0] &&setProblemFileName(files[0].name)
                                setUploadProblemImageFile(files[0])
                                if(files){
                                    setProblemImage(URL.createObjectURL(files[0]))
                                }
                            }}/>
                            <FaImage className='image-icon'/>  
                            <p>select an image of the problem</p>  
                    </div>
                    }
               
                </div>
                <div className="form-row">
                    <label htmlFor="steps">Steps to reproduce problem:</label>
                    <textarea name="steps" id="" cols="30" rows="7" placeholder='enter the steps you took that led to the problem'
                    value={problemSteps} onChange={(e)=>setProblemSteps(e.target.value)}></textarea>
                </div>
                <div className="form-row">
                    <label htmlFor="device">Device and Browser Name:</label>
                    <textarea name="device" id="" cols="30" rows="7" placeholder='enter the browser and device used when the problem was encountered'
                    value={problemDeviceBrowser} onChange={(e)=>setDeviceBrowser(e.target.value)}></textarea>
                </div>
                <div className="form-row">
                    <label htmlFor="description">Any Error Information:</label>
                    <textarea name="description" id="" cols="30" rows="7" placeholder='enter the error you got from the system'
                    value={problemError} onChange={(e)=>setProblemError(e.target.value)}></textarea>
                </div>
                <div className="form-row">
                    <button className='close-button' onClick={handleSubmitProblem}>
                        {
                         loading?<FaSpinner className='loading-animation'/>:'Submit Problem'
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ReportProblem