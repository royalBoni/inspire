import React from 'react'
import './timeline.css'
import Feeds from '../feeds/Feeds'

const Timeline = ({deactivateTimeline,posts,bookmarked,allFeed,setAllFeed,removeFeedSection,deactivatePostCss,
  loadingInspiration,fetchInspirationError,setUpperSection,setLowerSection,setLikes,likes,likeAndUnlike,bookmarkAndUnbookmark,
  numberOfLikes,numberOfComments,comments,setComments,postAuthorName,postAuthorImg,switchFeedPage,setSwitchReadPage,setSwitchFeedPage,switchReadPage,selectedPost}) => {
  return (
    <div className='timeline'>
        <Feeds
        posts={posts}
        loadingInspiration={loadingInspiration}
        fetchInspirationError={fetchInspirationError}
        bookmarked={bookmarked}
        allFeed={allFeed} 
        setAllFeed={setAllFeed}
        removeFeedSection={removeFeedSection}
        deactivatePostCss={deactivatePostCss}
        setUpperSection={setUpperSection}
        setLowerSection={setLowerSection}
        setLikes={setLikes}
        likes={likes}
        likeAndUnlike={likeAndUnlike}
        bookmarkAndUnbookmark={bookmarkAndUnbookmark}
        numberOfLikes={numberOfLikes}
        numberOfComments={numberOfComments}
        comments={comments}
        setComments={setComments}
        postAuthorImg={postAuthorImg}
        postAuthorName={postAuthorName}
        switchFeedPage={switchFeedPage}
        setSwitchReadPage={setSwitchReadPage}
        setSwitchFeedPage={setSwitchFeedPage}
        switchReadPage={switchReadPage}
        selectedPost={selectedPost}
        />
    </div>
  )
}

export default Timeline