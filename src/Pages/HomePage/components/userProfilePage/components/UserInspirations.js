import React from 'react'
import './userInspirations.css'
import MyFeeds from '../../feeds/MyFeeds'

const UserInspirations = ({postAuthorImg,postAuthorName,userProfileID}) => {

  return (
    <div className='user-inspirations'>
    <MyFeeds
    postAuthorImg={postAuthorImg}
    postAuthorName={postAuthorName}
    userID={userProfileID}
    />
    </div>
  )
}

export default UserInspirations