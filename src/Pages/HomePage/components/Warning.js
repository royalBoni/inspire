import React from 'react'
import './warning.css'
import { FaCircleNotch } from 'react-icons/fa'

const Warning = ({warningMessage}) => {
  return (
    <div className='warning'>
        <div className="warning-spinner"><FaCircleNotch className='spin'/></div>
        <div className="warning-message">{JSON.stringify(warningMessage)}</div>
    </div>
  )
}

export default Warning