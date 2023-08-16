import React from 'react'

const Language = ({handleBack}) => {
  return (
    <div>
      <button className='nav-close-button' onClick={handleBack}>back</button>
      English
    </div>
  )
}

export default Language