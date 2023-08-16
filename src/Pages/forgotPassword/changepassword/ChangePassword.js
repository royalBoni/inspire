import React from 'react'
import { FaSpinner,FaTimes } from 'react-icons/fa'
import { useState,useEffect } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const {tokenized,email}= useParams();

    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [passwordTest,setPasswordTest]=useState('');
    const [passwordMatch,setPasswordMatch]=useState('')
    const [loading,setLoading]=useState(false)
    const [passwordInputError,setPasswordInputError]=useState('')
    const [activateInputEror,setActivateInputEror]=useState(false)
    const [fetchError,setFetchError]=useState('')

    const navigate=useNavigate()

     /*  useEffect(()=>{
      console.log(tokenized)
      console.log(email)
    },[])
 */

    useEffect(()=>{
      password.length>=10 ?
      setPasswordTest('very-strong')
      :password.length>=6 ?setPasswordTest('fairly-strong')
      :password.length>=1 ?setPasswordTest('weak')
      :setPasswordTest('');
  },[password])

  useEffect(()=>{
      confirmPassword.length>=0&&confirmPassword!==password ?setPasswordMatch('doesnt match'):setPasswordMatch('')
  })

    const handleSubmitPassword=async()=>{
      if(passwordMatch!=='doesnt match'&&passwordTest!==''&&passwordTest!=='weak'){
        setLoading(true)
       try{
        const newEmail={email:email,password}
        const postOptions ={
          method : 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization':tokenized
          },
          body: JSON.stringify(newEmail)
        }
        const response=await fetch('http://localhost:5000/user/update/password',postOptions)
  
        const jsonfile= await response.json()
        if(!response.ok){
          setFetchError(jsonfile.message)
          console.log(jsonfile.message)
        }
        else{
          console.log(jsonfile.message)
          alert(jsonfile.message)
          navigate('/')
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

      else{
        setActivateInputEror(true)
        if(passwordTest==='weak'){
          setPasswordInputError('password need to be more than 5 characters')
        }
        else if(passwordMatch==='doesnt match'){
          setPasswordInputError('password doesnt match')
        }
        else{
          setPasswordInputError('please enter a new password')
        }
      }
    }

    const handleCloseButton=()=>{
      setActivateInputEror(false)
      setPasswordInputError('')
    }

  return (
    <main className="forgot">
      <div className="background-layer">
        <div className="words">inspire</div>
        <div className="main-content">
          <header>
            <div className="brand">inspire</div>
            <nav>
              <ul>
                <li>Blog</li>
                <li>About</li>
                <li>Terms</li>
                <li>Help</li>
                <li>Contact</li>
              </ul>
            </nav>
            <Link to='/register'><button className="signUp-button">Sign Up</button></Link>
          </header>
          <div className="main-content-content">
            {
            activateInputEror&&
            <div className="input-error">
                
                <FaTimes className='input-error-close-button' onClick={handleCloseButton}/>
                
                <div className="input-error-content">
                    {passwordInputError}
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
              <div className="welcome">Change <span>Password</span></div>
              <form action="" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-row">
                    <label htmlFor="email">Password</label>
                    <input type="password" name="password" id="password" placeholder='Confirm your password' value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className="form-row">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm your password' value={confirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                
                <div className="form-row">
                  <button className="forgot-button" onClick={handleSubmitPassword}>
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

export default ChangePassword