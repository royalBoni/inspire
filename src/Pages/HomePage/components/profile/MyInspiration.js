import React from 'react'
import './myInspiration.css'
import MyFeeds from '../feeds/MyFeeds'

const MyInspiration = ({userID,handleReadPost,postAuthorImg,postAuthorName}) => {
    /* const myPosts=posts.filter((item)=>item.authorID===userID) */

    
  return (
    <div className='my-inspiration'> 
         <MyFeeds 

            handleReadPost={handleReadPost}
            postAuthorImg={postAuthorImg}
            postAuthorName={postAuthorName}
            userID={userID}/>
    </div>
  )
}

export default MyInspiration