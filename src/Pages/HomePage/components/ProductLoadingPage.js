import React from 'react'
import './productloading.css'
import { FaSpinner } from 'react-icons/fa'

const ProductLoadingPage = ({message}) => {
  return (
    <div className='pageLoading'>
        <FaSpinner className='run'/>
        <div className="text">{message}</div>
    </div>
  )
}

export default ProductLoadingPage