import React from 'react'
import './loadingError.css'
import { FaTimesCircle } from 'react-icons/fa'

const ProductLoadingErrorPage = ({fetchInspirationError}) => {
  console.log(JSON.stringify(fetchInspirationError))
  return (

    <div className='pageError'>
        <FaTimesCircle className='error-icon'/>
        <div className="error-text">{JSON.stringify(fetchInspirationError)}</div> 
    </div>
  )
}

export default ProductLoadingErrorPage