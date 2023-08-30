import React from 'react'
import './forgotpassword.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaSpinner,FaTimes } from 'react-icons/fa'

const ForgotPassword = () => {
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const [emailInputError,setEmailInputError]=useState('')
    const [activateInputEror,setActivateInputEror]=useState(false)
    const [fetchError,setFetchError]=useState('')

    const handleClose=()=>{
        setEmailInputError('')
        setActivateInputEror(false)
    }

    const handleSubmitEmmail=async()=>{
        
        const testEmail= /\w+@\w+.com/.test(email);
        if(!testEmail){
        setEmailInputError('your email is not valid')
        setActivateInputEror(true)
        if(activateInputEror){
            console.log(emailInputError)
        }
        }
        
        else{
            try{
            setLoading(true)
            const newEmail={email:email}
            const postOptions ={
              method : 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(newEmail)
            }
            const response=await fetch('http://localhost:5000/email',postOptions)

            const jsonfile= await response.json()
            console.log(jsonfile.message)

            if(!response.ok){
              setFetchError(jsonfile.message)
              console.log(jsonfile.message)
            }
           
           else{
             
             alert('password reset link have been sent to your email')
             
           }
        }
        catch(err){
          if(err.message==='Failed to fetch'){
            setFetchError(`network or server might be down`)
          }
          else{
            setFetchError(`Error: ${err.message}`)
          }
        }
        finally{
          setLoading(false)
        }
    }

    }

  return (
    <main className="forgot">
      <div className="background-layer">
        <div className="words">inspire</div>
        <div className="main-content">
          <div className='navigation-buttons'>
          <Link to='/register'><button className="signUp-button">Sign Up</button></Link>
          <Link to='/'><button className="signUp-button">Sign In</button></Link>
          </div>
          <div className="main-content-content">
            {
            activateInputEror&&
            <div className="input-error">
                
                <FaTimes className='input-error-close-button' onClick={handleClose}/>
                
                <div className="input-error-content">
                    {emailInputError}
                </div>
            </div>
            }

            {
                fetchError &&
                <div className='input-error'>
                    <FaTimes className='input-error-close-button' onClick={()=>setFetchError('')}/>
                    <div className="input-error-content">
                    {JSON.stringify(fetchError)}
                    </div>
                </div>
            }
        
            <div className="content left-content"></div>
            <div className="content right-content">
              <div className="welcome">Submit <span>Email</span></div>
              <form action="" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={email}
                  onChange={(e)=>setEmail(e.target.value)} placeholder='user@123gmail.com'/>
                </div>
                
                <div className="form-row">
                  <button className="forgot-button" onClick={handleSubmitEmmail}>
                    {
                    loading?<FaSpinner className='loading-animation'/>:'Submit'
                    }
                  </button>
                </div>
              </form>
            </div>
          
          </div>
        
        </div>
        
      </div>
    </main>
  )
}

export default ForgotPassword