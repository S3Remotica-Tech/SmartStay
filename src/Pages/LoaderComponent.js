import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
function LoaderComponent() {
  return (
    <div className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></div>
  )
}

export default LoaderComponent