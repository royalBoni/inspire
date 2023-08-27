import React from 'react'
import './profileEditor.css'
import { FaTimes,FaImage,FaPlus, FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateProfileMutation } from '../../../../reducxSlices/profilesSlice'
import { setIsEditProfile,setIsOverColor } from '../../../../reducxSlices/actionStateSlice'

const ProfileEditor = ({myInfo,functionalityUnderDevelopment}) => {

  const dispatch = useDispatch()
  console.log(myInfo)

  const [updateProfile, {isLoading}]= useUpdateProfileMutation()
  
  const closeEditProfile =()=>{
    dispatch(setIsEditProfile())
    dispatch(setIsOverColor())
  }

  const countries = ['Ghana','Nigeria','South Africa']
  const educationalLevel = ['Phd','Msc','Mphil','MTech','Bsc','BTech','High School']


  const [profileImage,setProfileImage]=useState(null)
  const [uploadProfileImageFile,setUploadProfileImageFile]=useState(null)

  const [coverImage,setCoverImage]=useState(null)
  const [uploadCoverImageFile,setUploadCoverImageFile]=useState(null)
  
  const [bio, setBio] = useState(myInfo?myInfo?.bio:'')

  const [profileName, setProfileName] = useState(myInfo?myInfo?.profileName:'')
  const [dateOfBirth, setDateOfBirth] = useState(myInfo?myInfo?.dateOfBirth:'')
  const [phoneNumber, setPhoneNumber] = useState(myInfo?myInfo?.phoneNumber:'')
  const [country, setCountry] = useState(myInfo?myInfo?.country:'')

  const [program, setProgram]=useState(myInfo?(JSON.parse(myInfo?.education))?.program:'')
  const [level, setLevel] = useState(myInfo?(JSON.parse(myInfo?.education))?.level:'')
  const [institute, setInstitute] = useState(myInfo?(JSON.parse(myInfo?.education))?.institute:'')

  const [company, setCompany] = useState(myInfo?(JSON.parse(myInfo?.work))?.company:'')
  const [position, setPosition] = useState(myInfo?(JSON.parse(myInfo?.work))?.position:'')


  const onChangeBio = (e)=>setBio(e.target.value)

  const onChangeProfileName = (e)=>setProfileName(e.target.value)
  const onChangeDateOfBirth = (e)=>setDateOfBirth(e.target.value)
  const onChangePhoneNumber = (e)=>setPhoneNumber(e.target.value)
  const OnChangeCountry =(e)=>{setCountry(e.target.value)}

  const OnChangeProgram =(e)=>{setProgram(e.target.value)}
  const OnChangeLevel =(e)=>{setLevel(e.target.value)}
  const OnChangeInstitute =(e)=>{setInstitute(e.target.value)}

  const OnChangeCompany =(e)=>{setCompany(e.target.value)}
  const OnChangePosition =(e)=>{setPosition(e.target.value)}

  const isCheckComplete= true

  /* console.log(myInfo) */

  const handleUpdate = async()=>{
    const formData=new FormData()
    if(isCheckComplete){
        try{
            formData.append('userID',myInfo.userID)
            formData.append('userName',myInfo.userName)
            formData.append('profileName',profileName)
            formData.append('image',uploadProfileImageFile)
            formData.append('dateOfBirth',dateOfBirth)
            formData.append('phoneNumber',phoneNumber)
            formData.append('country',country)
            formData.append('bio',bio)
            formData.append('education',JSON.stringify({program,level,institute}))
            formData.append('work',JSON.stringify({company,position}))

            const profileObject ={userID:myInfo.userID, userName:myInfo.userName,profileName,uploadProfileImageFile,dateOfBirth,phoneNumber,country,
              education:{program,level,institute},work:{company,position},bio}
        
            await updateProfile(formData)
            /* console.log(profileObject) */
        
          }
          catch(err){
            if(err.message==='Failed to fetch'){
                functionalityUnderDevelopment('network or server might be down') 
              }
            else{
                functionalityUnderDevelopment(`Error: ${err.message}`)
              }
          }
            
        }
       
        
        else{
          functionalityUnderDevelopment('please enter a content') 
        }
  }

  return (
    <div className='editor'>
      <div className='editProfile-sections'>
          <div className='section-title'>Edit Profile</div>
          <div className='close-editor' onClick={closeEditProfile}><FaTimes/></div>
      </div>

      <div className='editProfile-sections'>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className='form-section'>
            <div className='form-section-title'>Profile Picture</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
                <div className='image-previewed'>
                    <img src={profileImage?profileImage:myInfo?.profile_image_avatar} className='selected_img' />
                    <div className="uploader" onClick={()=>document.querySelector('.input-field').click()}>
                      <input type='file' accept='image' className='input-field' hidden
                          onChange={({target:{files}})=>{
                              setUploadProfileImageFile(files[0])
                              if(files){
                                  setProfileImage(URL.createObjectURL(files[0]))
                              }
                          }}/>
                          <FaPlus/>    
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className='form-section-title'>Cover Picture</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
                <div className='cover-image-previewed'>
                    <img src={coverImage?coverImage:myInfo?.profile_image_avatar} className='selected_img' />
                    <div className="uploader" onClick={()=>document.querySelector('.cover-input-field').click()}>
                      <input type='file' accept='image' className='cover-input-field' hidden
                          onChange={({target:{files}})=>{
                              setUploadCoverImageFile(files[0])
                              if(files){
                                  setCoverImage(URL.createObjectURL(files[0]))
                              }
                          }}/>
                          <FaPlus/>    
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className='form-section-title'>Bio</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
              <input value={bio} onChange={onChangeBio}/>
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className='form-section-title'>Basic Personal Info</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
                <label>Profile Name:</label>
                <input value={profileName} onChange={onChangeProfileName}/>
              </div>

              <div className="posts-form-row">
                <label>Date of Birth:</label>
                <input type='date' value={dateOfBirth} onChange={onChangeDateOfBirth}/>
              </div>

              <div className="posts-form-row">
                <label>Phone Number:</label>
                <input value={phoneNumber} onChange={onChangePhoneNumber}/>
              </div>

              <div className='posts-form-row'>
                <label htmlFor="">Country</label>
                <div className="input">
                    <select id='country' onChange={OnChangeCountry}>
                        <option>{myInfo?myInfo.country:'select a country'}</option>
                        {
                            countries.map((value,key)=>{
                                return(
                                    <option key={key} value={value}>{value}</option>
                                )
                            })
                        } 
                    </select>       
                </div>
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className='form-section-title'>Education</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
                <label htmlFor="">Program:</label>
                <input value={program} onChange={OnChangeProgram}/>
              </div>

              <div className="posts-form-row">
                <label htmlFor="">Level:</label>
                <div className="input">
                    <select id='country' onChange={OnChangeLevel}>
                        <option>{myInfo?(JSON.parse(myInfo.education)).level:'select a level'}</option>
                        {
                            educationalLevel.map((value,key)=>{
                                return(
                                    <option key={key} value={value}>{value}</option>
                                )
                            })
                        } 
                    </select>       
                </div>
              </div>

              <div className="posts-form-row">
                <label htmlFor="">Institute Name:</label>
                <input value={institute} onChange={OnChangeInstitute}/>
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className='form-section-title'>Work</div>
            <div className='form-section-content'>
              <div className="posts-form-row">
                <label htmlFor="">Company Name:</label>
                <input value={company} onChange={OnChangeCompany}/>
              </div>

              <div className="posts-form-row">
                <label htmlFor="">Position:</label>
                <input value={position} onChange={OnChangePosition}/>
              </div>
            </div>
          </div>

          <div className='form-section'>
           <button onClick={handleUpdate}>{isLoading?<FaSpinner/>:'Save'}</button>
          </div>


        </form>
      </div>
            
    </div>
  )
}

export default ProfileEditor