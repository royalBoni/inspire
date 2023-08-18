import React from 'react'
import './createPost.css';
import { FaTimes,FaImage,FaSpinner,FaPalette,FaFillDrip, FaItalic, FaFont} from 'react-icons/fa';
import { useState,useEffect  } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { setIsOverColor } from '../../../reducxSlices/actionStateSlice';
import { useDispatch } from 'react-redux';


const CreatePost = ({creatingPost,warning,setWarning,setWarningMessage,setCreatingPost,userID,setTriggerCloseProfileMenu,
    posts,setPosts,profileImage}) => {
    const colors=['rgba(243, 240, 237, 0.884)','red','blue','yellow','aqua','pink','antiquewhite','#ffffff','#ffff00','#ccff00',
    '#99ff00','#99ccff','#ccff99','#333300']
    const fontFamily=["times","sans-serif","Franklin","Courier New","Georgia","arial"]
    const fontStyle=['normal','italic']
    const categories=['Love','Motivation','best','good']
    const [bg,setBg]=useState('')
    const [ff,setFf]=useState('')
    const [fg,setFg]=useState('')
    const [fs,setFs]=useState('')
    const [c,setC]=useState('')

    const [fetchError,setFetchError]=useState('')
    const [loading,setLoading]=useState(false)

    const [inspiration_content,setInspiration_content]=useState('')
    const [inspiration_title,setInspiration_title]=useState('')
    const navigate=useNavigate()

    const [image,setImage]=useState(null)
    const [uploadImageFile,setUploadImageFile]=useState(null)
    const [fileName,setFileName]=useState('no selected file');
    
    const [activateBg,setActivateBg]=useState('create-active')
    const [activateFg,setActivateFg]=useState('')
    const [activateFs,setActivateFs]=useState('')
    const [activateFf,setActivateFf]=useState('')
    const [activateC,setActivateC]=useState('')

    const [bgContent,setBgContent]=useState('contents')
    const [fgContent,setFgContent]=useState('no-content')
    const [fsContent,setFsContent]=useState('no-content')
    const [ffContent,setFfContent]=useState('no-content')
    const [cContent,setCContent]=useState('no-content')

    const dispatch=useDispatch()
    const handleActiveMenu=(num)=>{
        if(num===1){
            setActivateBg('create-active')

            setActivateFg('')
            setActivateFs('')
            setActivateFf('')
            setActivateC('')

            setBgContent('contents')

            setFgContent('no-content')
            setFsContent('no-content')
            setFfContent('no-content')
            setCContent('no-content')
        }

        else if(num===2){
            setActivateFg('create-active')

            setActivateBg('')
            setActivateFs('')
            setActivateFf('')
            setActivateC('')

            setFgContent('contents')

            setBgContent('no-content')
            setFsContent('no-content')
            setFfContent('no-content')
            setCContent('no-content')
        }

        else if(num===3){
            setActivateFs('create-active')

            setActivateBg('')
            setActivateFg('')
            setActivateFf('')
            setActivateC('')

            setFsContent('contents')

            setBgContent('no-content')
            setFgContent('no-content')
            setFfContent('no-content')
            setCContent('no-content')
        }

        else if(num===4){
            setActivateFf('create-active')

            setActivateBg('')
            setActivateFg('')
            setActivateFs('')
            setActivateC('')

            setFfContent('contents')

            setBgContent('no-content')
            setFgContent('no-content')
            setFsContent('no-content')
            setCContent('no-content')
        }

        else if(num===5){
            setActivateC('create-active')

            setActivateBg('')
            setActivateFg('')
            setActivateFs('')
            setActivateFf('')

            setCContent('contents')

            setBgContent('no-content')
            setFgContent('no-content')
            setFsContent('no-content')
            setFfContent('no-content')
        }
    }

    useEffect(()=>{
        if(image){
            handleActiveMenu(5)
        }
        else{
            handleActiveMenu(1)
        }
    },[image])
 
    const reset=()=>{
        setWarning(false)
        setInspiration_content('')
        setInspiration_title('')
        setImage(null) 
        setUploadImageFile(null)
        setFs('')
        setFf('')
        setBg('')
        setFg('')
    }
    const handleCloseCreatePost=()=>{
        dispatch(setIsOverColor())
        setCreatingPost('no-createpost')
        reset()
        setTriggerCloseProfileMenu(false)
    }

    const handleClosePreview=()=>{
        setImage(null) 
        setUploadImageFile(null)
    }

    const handleSubmit=async()=>{
        
        const datetime =format(new Date(), 'MMMM dd, yyyy pp');
        const formData=new FormData()
        if(uploadImageFile||inspiration_content){
            setWarning(false)
            try{
                setLoading(true)
                    formData.append('authorID','')
                    formData.append('category',c)
                    formData.append('datetime',JSON.stringify(datetime))
                    formData.append('inspiration_title',inspiration_title)
                    formData.append('inspiration_content',inspiration_content)
                    formData.append('image',uploadImageFile)
                    formData.append('bgColor',bg)
                    formData.append('fgColor',fg)
                    formData.append('fStyle',fs)
                    formData.append('fFamily',ff)
                
            
                    const postOptions ={
                    method : 'POST',
                    body: formData
                    }

                    const response=await fetch(`http://localhost:5000/inspiration/${userID}`,postOptions)

                    const jsonfile= await response.json()

                    if(!response.ok){
                    setFetchError(jsonfile.message)
                    console.log(jsonfile.message)
                    setWarningMessage(jsonfile.message)
                    setWarning(true)
                    setTimeout(() => {
                        setWarning(false)
                        setWarningMessage(null)
                    }, 17000);
                    }
                
                    else{
                    
                    setPosts([...posts,jsonfile.inspiration])
                    reset()
                    handleCloseCreatePost()
                    setWarningMessage('inspiration successfully created')
                    setWarning(true)
                    setTimeout(() => {
                        setWarning(false)
                        setWarningMessage(null)
                    }, 17000);
                }
                }
                catch(err){
                    if(err.message==='Failed to fetch'){
                        setFetchError(`network or server might be down`)
                        setWarningMessage('network or server might be down')
                        setWarning(true)
                        setTimeout(() => {
                            setWarning(false)
                            setWarningMessage(null)
                    }, 17000);
                        
                      }
                    else{
                        setFetchError(`Error: ${err.message}`)
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
                setWarning(true)
                setWarningMessage('please enter a content')
                setTimeout(() => {
                    setWarning(false)
                    setWarningMessage('')
                }, 17000);
            }
    }
  return (
    <div className={`${creatingPost}`}>
        <div className="close-create-post-button" onClick={handleCloseCreatePost}><FaTimes/></div>
        <div className="createControls">
            <button className="back-button" onClick={handleCloseCreatePost}>Back</button>
            <div className="control-title">Create Post</div>
        </div>
        <div className="profile-line">
            <div className="profile"><img src={profileImage} alt="" /></div>
            <div className="profile-info">
                <div className="user-name">Boniface Emmanuel</div>
                <div className="profile-name">@boni</div>
            </div>
        </div>
        <form action="" onSubmit={(e)=>e.preventDefault()}>
            <div className="post-form-row">
                <input type="text" placeholder='Put a Title Here' 
                value={inspiration_title} 
                onChange={(e)=>setInspiration_title(e.target.value)}/>

                <div className="image-post"  onClick={()=>document.querySelector('.input-field').click()}>
                    <input type='file' accept='image' className='input-field' hidden
                        onChange={({target:{files}})=>{
                            files[0] &&setFileName(files[0].name)
                            setUploadImageFile(files[0])
                            if(files){
                                setImage(URL.createObjectURL(files[0]))
                            }
                        }}/>
                        <FaImage/>    
                </div>
            </div>
            
            <div className="post-form-row">
                <div className="profile-control">
                    <div className="profile"><img src={profileImage} alt="" /></div>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder='Write a Post' style=
                {{backgroundColor:bg,fontFamily:ff,color:fg,fontStyle:fs}}
                value={inspiration_content} 
                onChange={(e)=>setInspiration_content(e.target.value)}></textarea>
                {
                    image&&
                            <div className='preview-image'>
                                <img src={image} className='selected_img' />
                                <FaTimes className='preview-close' onClick={handleClosePreview}/>
                            </div>
                }
                <div className="image-post c" onClick={()=>document.querySelector('.input-field').click()}>
                    <input type='file' accept='image' className='input-field' hidden
                        onChange={({target:{files}})=>{
                            files[0] &&setFileName(files[0].name)
                            setUploadImageFile(files[0])
                            if(files){
                                setImage(URL.createObjectURL(files[0]))
                            }
                        }}/>
                        <FaImage/>    
                </div>
            </div>

            <div className="post-form-row">
                <div className={activateBg} onClick={()=>handleActiveMenu(1)}><FaFillDrip className='activate-item-icon'/> <div className='activate-item'>Background Color</div></div>
                <div className={activateFg} onClick={()=>handleActiveMenu(2)}><FaPalette className='activate-item-icon'/> <div className='activate-item'>Font Color</div></div>
                <div className={activateFs} onClick={()=>handleActiveMenu(3)}><FaItalic className='activate-item-icon'/> <div className='activate-item'>Font Style</div></div>
                <div className={activateFf} onClick={()=>handleActiveMenu(4)}><FaFont className='activate-item-icon'/> <div className='activate-item'>Font Family</div></div>
                <div className={activateC} onClick={()=>handleActiveMenu(5)}>Category</div>
                {/* <div className="image-submit" onClick={()=>document.querySelector('.input-field').click()}>
                    <input type='file' accept='image' className='input-field' hidden
                    onChange={({target:{files}})=>{
                        files[0] &&setFileName(files[0].name)
                        if(files){
                            setImage(URL.createObjectURL(files[0]))
                        }
                    }}/>
                    {
                        image?
                        <img src={image} width={60} height={60} />: <FaImage width={60} height={60}/>
                    }

                    <section>
                        <FaTimes/>
                        <span>
                            {fileName}
                            <FaTimes onClick={()=>{setFileName('no selected file') 
                            setImage(null)}}/>
                        </span>
                    </section>
                </div> */}
            </div>

           
                <div className="post-form-row">
                {
                image?null:
                <div className={bgContent}>
                    {
                        colors.map((item)=>{
                            return(
                                <div key={item} className='individual-color' style={{backgroundColor:item}} onClick={()=>setBg(item)}>A</div>
                            )
                        })
                    }
                </div>
                }

                {
                image?null:
                <div className={fgContent}>
                    {
                        colors.map((item)=>{
                            return(
                                <div key={item} className='individual-color' style={{color:item}} onClick={()=>setFg(item)}>A</div>
                            )
                        })
                    }
                </div>
                }

                {
                image?null:
                <div className={fsContent}>
                    {
                        fontStyle.map((item)=>{
                            return(
                                <div key={item} className='individual-color' style={{fontStyle:item}} onClick={()=>setFs(item)}>AaB</div>
                            )
                        })
                    }
                </div>
                }

                {
                image?null:
                <div className={ffContent}>
                    {
                        fontFamily.map((item)=>{
                            return(
                                <div key={item} className='individual-color' style={{fontFamily:item}} onClick={()=>setFf(item)}>AaB</div>
                            )
                        })
                    }
                </div>
                }
                <div className={`${cContent} cattt`}>
                    {
                        categories.map((item)=>{
                            return(
                                <div key={item} className='individual-color'  onClick={()=>setC(item)}>{item}</div>
                            )
                        })
                    }
                </div>
            </div>

            
             <button className='post-button' onClick={handleSubmit}>{loading?<FaSpinner className='loading-animation'/>:'Post'}</button>
            
        </form>
    </div>
  )
}

export default CreatePost