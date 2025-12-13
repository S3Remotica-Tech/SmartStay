import React from 'react'

function LoaderComponent() {
  return (
    <div
    style={{
      position: 'absolute',
        top: 180,
        right: 0,
        bottom: 0,
        left: 0,
      display: 'flex',
      height: "50vh",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      opacity: 0.75,
      zIndex: 10,
    }}
  >
    <div
      style={{
        borderTop: '4px solid #1E45E1',
        borderRight: '4px solid transparent',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
      }}
    ></div>
  </div>
  )
}

export default LoaderComponent