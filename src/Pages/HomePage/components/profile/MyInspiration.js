import React from 'react'
import './myInspiration.css'
import MyFeeds from '../feeds/MyFeeds'

const MyInspiration = ({userID,posts,handleReadPost,numberOfComments,
    bookmarkAndUnbookmark,postAuthorImg,postAuthorName}) => {
    /* const myPosts=posts.filter((item)=>item.authorID===userID) */

    const handleReadMyInspiration=(id)=>{
        handleReadPost(id)
    }
    
  return (
    <div className='my-inspiration'> 
         <MyFeeds 
            posts={posts}
            handleReadPost={handleReadPost}
            postAuthorImg={postAuthorImg}
            postAuthorName={postAuthorName}
            numberOfComments={numberOfComments}
            bookmarkAndUnbookmark={bookmarkAndUnbookmark}
            userID={userID}/>
    </div>
  )
}

export default MyInspiration