import { useState } from "react";
import './login.css';
import { Link,useNavigate } from "react-router-dom";
import {FaSpinner,FaTimes} from 'react-icons/fa'

const Login = () => {
  const [loginEmail,setLoginEmail]=useState('');
  const [loginPassword, setLoginPassword]=useState('')
  const [fetchError,setFetchError]=useState('')
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const handleLogin =async ()=>{
    setLoading(true)
      const data ={email:loginEmail,password:loginPassword}
      const postOptions ={
        method : 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      
      try{
         const result=await fetch("http://localhost:5000/user/login", postOptions);
         const jsonresult= await result.json()
         if(!result.ok){
           setFetchError(jsonresult.message)
         }
        
        else{
          localStorage.setItem("myInspireAccount", JSON.stringify(jsonresult.message)); 
          navigate(`/home/${jsonresult.message._id}`)
          
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
  
    
  return (
    <div className="login">
      <div className="background-layer">
        <div className="words">inspire</div>
        <div className="main-content">
          <Link to='/register'><button className="signUp-button">Sign Up</button></Link>
          <div className="main-content-content">
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
              <div className="welcome">Welcome <span>Back</span></div>
              <form action="" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={loginEmail}
                  onChange={(e)=>setLoginEmail(e.target.value)} placeholder='user@123gmail.com'/>
                </div>

                <div className="form-row">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" value={loginPassword}
                  onChange={(e)=>setLoginPassword(e.target.value)} placeholder='Enter your password'/>
                </div>
                

                <div className="form-row">
                  <button className="login-button" onClick={handleLogin}>
                    {
                    loading?<FaSpinner className='loading-animation'/>:'Log In'
                    }
                  </button>
                </div>

                <div className="form-row">
                  <div className="forgetOrRegister">
                  <Link to='/forgot'><div className="forget">Forgot Password?</div></Link>
                  </div>
                </div>
              </form>
            </div>
          
          </div>
        
        </div>
        
      </div>
    </div>
    
  )
}

export default Login