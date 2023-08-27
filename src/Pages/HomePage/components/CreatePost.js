import React from 'react'
import './createPost.css';
import { FaTimes,FaImage,FaSpinner,FaPalette,FaFillDrip, FaItalic, FaFont} from 'react-icons/fa';
import { useState,useEffect  } from 'react';
import { format } from 'date-fns';
import { setIsOverColor,setIsCreatePost } from '../../../reducxSlices/actionStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAddNewInspirationMutation } from '../../../reducxSlices/inspirationsSlice';


const CreatePost = ({functionalityUnderDevelopment,userID,setTriggerCloseProfileMenu,profileImage}) => {

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

    const [inspiration_content,setInspiration_content]=useState('')
    const [inspiration_title,setInspiration_title]=useState('')

    const [image,setImage]=useState(null)
    const [uploadImageFile,setUploadImageFile]=useState(null)
    const [fileName,setFileName]=useState('no selected file');
    

    const [activeItem, setActiveItem]=useState(1)

    const [addNewInspiration, {isLoading, isSuccess}]=useAddNewInspirationMutation()

    const dispatch=useDispatch()
    const handleActiveMenu=(num)=>{
        setActiveItem(num)
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
        dispatch(setIsCreatePost())
        reset()
        setTriggerCloseProfileMenu(false)
    }

    const handleClosePreview=()=>{
        setImage(null) 
        setUploadImageFile(null)
    }

    useEffect(()=>{
        reset()
    },[isSuccess])

    const handleSubmit=async()=>{
        
        const datetime =format(new Date(), 'MMMM dd, yyyy pp');
        const formData=new FormData()
        if(uploadImageFile||inspiration_content){
            try{
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
                    formData.append('userID',userID)
                
                    await addNewInspiration(formData)
            
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
    <div className='createpost'>
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
                <div className={activeItem===1?'create-active':null} onClick={()=>handleActiveMenu(1)}><FaFillDrip className='activate-item-icon'/> <div className='activate-item'>Background Color</div></div>
                <div className={activeItem===2?'create-active':null} onClick={()=>handleActiveMenu(2)}><FaPalette className='activate-item-icon'/> <div className='activate-item'>Font Color</div></div>
                <div className={activeItem===3?'create-active':null} onClick={()=>handleActiveMenu(3)}><FaItalic className='activate-item-icon'/> <div className='activate-item'>Font Style</div></div>
                <div className={activeItem===4?'create-active':null} onClick={()=>handleActiveMenu(4)}><FaFont className='activate-item-icon'/> <div className='activate-item'>Font Family</div></div>
                <div className={activeItem===5?'create-active':null} onClick={()=>handleActiveMenu(5)}>Category</div>
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
                    activeItem===1?
                    <>
                     {
                        image?null:
                        <div className='contents'>
                            {
                                colors.map((item)=>{
                                    return(
                                        <div key={item} className='individual-color' style={{backgroundColor:item}} onClick={()=>setBg(item)}>A</div>
                                    )
                                })
                            }
                        </div>
                    }
                    </>:
                    activeItem===2?
                    <>
                    {
                        image?null:
                        <div className='contents'>
                            {
                                colors.map((item)=>{
                                    return(
                                        <div key={item} className='individual-color' style={{color:item}} onClick={()=>setFg(item)}>A</div>
                                    )
                                })
                            }
                        </div>
                    }
                    </>:
                    activeItem===3?
                    <>
                     {
                        image?null:
                        <div className='contents'>
                            {
                                fontStyle.map((item)=>{
                                    return(
                                        <div key={item} className='individual-color' style={{fontStyle:item}} onClick={()=>setFs(item)}>AaB</div>
                                    )
                                })
                            }
                        </div>
                    }
                    </>:
                    activeItem===4?
                    <>
                     {
                        image?null:
                        <div className='contents'>
                            {
                                fontFamily.map((item)=>{
                                    return(
                                        <div key={item} className='individual-color' style={{fontFamily:item}} onClick={()=>setFf(item)}>AaB</div>
                                    )
                                })
                            }
                        </div>
                    }
                    </>:
                    <div className={`contents cattt`}>
                     {
                         categories.map((item)=>{
                             return(
                                 <div key={item} className='individual-color'  onClick={()=>setC(item)}>{item}</div>
                             )
                         })
                     }
                    </div> 
                }
            </div>

            
             <button className='post-button' onClick={handleSubmit}>{isLoading?<FaSpinner className='loading-animation'/>:'Post'}</button>
            
        </form>
    </div>
  )
}

export default CreatePost