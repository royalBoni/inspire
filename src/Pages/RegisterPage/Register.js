import React from 'react'
import { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaSpinner,FaTimes} from 'react-icons/fa'
import './register.css'

const Register = () => {
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [passwordTest,setPasswordTest]=useState('');
    const [passwordMatch,setPasswordMatch]=useState('')
    const [loading,setLoading]=useState(false)
    const [fetchError,setFetchError]=useState('')
    const [inputError,setInputError]=useState('')
    const [emailInputError,setEmailInputError]=useState('')
    const [activateInputError,setActivateInputEror]=useState(false);

    const navigate=useNavigate()

    useEffect(()=>{
        password.length>=10 ?setPasswordTest('very-strong')
        :password.length>=6 ?setPasswordTest('fairly-strong')
        :password.length>=1 ?setPasswordTest('weak')
        :setPasswordTest('');
    },[password])

    useEffect(()=>{
        confirmPassword.length>=0&&confirmPassword!==password ?setPasswordMatch('doesnt match'):setPasswordMatch('')
    })
    const handleRegister=async()=>{
      setLoading(true)
      
        const testEmail= /\w+@\w+.com/.test(email);
        if(!testEmail){
            setEmailInputError('your email is not valid')
            setActivateInputEror(true)
        }

        try{
          if(testEmail&&passwordMatch!=='doesnt match'&&passwordTest!==''&&passwordTest!=='weak'){
            const newAcc={email:email,username:username,password:password}
            const postOptions ={
              method : 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(newAcc)
            }
            const response=await fetch('http://localhost:5000/user/register',postOptions)

            const jsonfile= await response.json()
            console.log(jsonfile.message)

            if(!response.ok){
              setFetchError(jsonfile.message)
              console.log(jsonfile.message)
            }
           
           else{
             
             alert('account successfully created')
             navigate(`/`)
             
           }
        }

        else{
            setInputError('please check your input')
            setActivateInputEror(true)
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

    const handleCloseButton=()=>{
      setActivateInputEror(false)
      setInputError('')
      setEmailInputError('')
    }
    
  return (
    <div className="register">
    <div className="background-layer">
      <div className="words">inspire</div>
      <div className="main-content">
        <Link to='/'><button className="signUp-button">Sign In</button></Link>
        <div className="main-content-content">
        {
          activateInputError&&
          <div className="input-error">
              
              <FaTimes className='input-error-close-button' onClick={handleCloseButton}/>
             
              <div className="input-error-content">
                {`${inputError} `}{
                emailInputError.length>1?emailInputError:'your password is not valid'
                }
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
           {/*  {
            fetchError && <div className='error'>{JSON.stringify(fetchError)}</div>
            } */}
            <div className="welcome">Welcome <span>Back</span></div>
            <form action="" onSubmit={(e)=>e.preventDefault()}>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder='user@123gmail.com' value={email} 
              onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="form-row">
              <label htmlFor="username">User Name</label>
              <input type="text" name="username" id="username" placeholder='Enter your username' value={username} 
              onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className="form-row relative">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder='Enter your password' value={password} 
              onChange={(e)=>setPassword(e.target.value)}/>
              <div className={`test ${passwordTest}`}>{passwordTest}</div>
            </div>

            <div className="form-row relative">
              <label htmlFor="password">Confirm Password</label>
              <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm your password' value={confirmPassword} 
              onChange={(e)=>setConfirmPassword(e.target.value)}/>
              <div className={`test ${passwordTest}`}>{passwordMatch}</div>
            </div>

            <div className="form-row">
              <button className="register-button" onClick={handleRegister}>
                {
                  loading?<FaSpinner className='loading-animation'/>:'Register'
                }
              </button>
            </div>

          </form> 
          </div>
        
        </div>
      
      </div>

      
    </div>
      
  </div>
  )
}

export default Register



