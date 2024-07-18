import React from 'react';
import NavBarIs from '../LandingPage/Navbar';
import FirstPage from './FirstPage';
import KeyFeature from './KeyFeature';

function All_landing_pages() {
    return (
        <>
            <div className=''>
                <NavBarIs />
            </div>
            <div>
                <FirstPage />
            </div>
            <div>
                <KeyFeature />
            </div>
        </>
    )
}

export default All_landing_pages