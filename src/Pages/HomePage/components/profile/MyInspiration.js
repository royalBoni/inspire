import React from 'react'
import './myInspiration.css'
import MyFeeds from '../feeds/MyFeeds'

const MyInspiration = ({deactivateMyInspirations,userID,posts,handleSetLike,numberOfLikes,handleReadPost,numberOfComments,
    bookmarkAndUnbookmark,handleSetBookmark,postAuthorImg,postAuthorName,likeAndUnlike,setBackID}) => {
    /* const myPosts=posts.filter((item)=>item.authorID===userID) */

    const handleReadMyInspiration=(id)=>{
        setBackID('3')
        handleReadPost(id)
    }
    
  return (
    <div className={`${deactivateMyInspirations}`}> 
         <MyFeeds 
            posts={posts}
            handleReadPost={handleReadPost}
            postAuthorImg={postAuthorImg}
            postAuthorName={postAuthorName}
            likeAndUnlike={likeAndUnlike}
            handleSetLike={handleSetLike}
            numberOfLikes={numberOfLikes}
            numberOfComments={numberOfComments}
            bookmarkAndUnbookmark={bookmarkAndUnbookmark}
            handleSetBookmark={handleSetBookmark}
            userID={userID}/>
   
    </div>
  )
}

export default MyInspiration