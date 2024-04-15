import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
function LoaderComponent() {
  return (
    <div className='d-flex justify-content-center align-items-center me-5'><Spinner animation="border" variant="primary" /></div>
  )
}

export default LoaderComponent