import React from 'react';
import NavBarIs from '../LandingPage/Navbar';
import FirstPage from './FirstPage';

function All_landing_pages() {
    return (
        <>
            <div className=''>
                <NavBarIs />
            </div>
            <div>
                <FirstPage />
            </div>
        </>
    )
}

export default All_landing_pages