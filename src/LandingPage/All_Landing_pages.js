// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Logo from '../Assets/Images/New_images/Group.png';
// import Smart from '../Assets/Images/New_images/logo_front.png';
// import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import NavBarIs from '../LandingPage/Navbar';
// import FirstPage from './FirstPage';
// import KeyFeature from './KeyFeature';
// import WhySmartstay from './WhySmartstay';
// import Testimonials from './Testimonials'

// function All_landing_pages() {


//     useEffect(() => {
//         window.scrollTo(0, 0);
//       }, []);
    
    
//       const dispatch = useDispatch()
//       const state = useSelector(state => state)
      
//       let navigate = useNavigate();
    
//       const handleSignIn = () => { 
//         // alert('click sign in success')
//         navigate('/login-Page')
//       }
     
//       const handleSignUp = () => {
//         navigate('/create-account')
//       }


//     return (
//         <>
//             <div className=''>
//             <Navbar collapseOnSelect expand="lg" className="" style={{backgroundColor:"#FFFFFF"}} transparent>
//       <Container>
//         <Navbar.Brand ><img src={Logo} style={{ height: 33, width: 33 }} /> <img src={Smart} style={{ height: 20, width: 133 }} />
//        </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
            
//           <Nav className="mx-auto">
//             <Nav.Link  style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Home</Nav.Link>
//             <Nav.Link  style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Features</Nav.Link>
//             <Nav.Link  style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Pricing</Nav.Link>
//             <Nav.Link  style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Testimonials</Nav.Link>
//           </Nav>
//           <Nav className='align-items-center justi-content-start'>
//             <Nav.Link  style={{fontSize:16, fontWeight:500, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}} onClick={handleSignIn}>Sign in</Nav.Link>
//             <Button onClick={handleSignUp} variant="" style={{backgroundColor:"rgba(30, 69, 225, 1)", color:"rgba(255, 255, 255, 1)", fontWeight:600, fontSize:16, fontFamily:"Montserrat",width:161,height:60, borderRadius:16, padding:"20px 24px 20px 24px"}}>Get Started</Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>

//             </div>
//             <div>
//                 <FirstPage />
//             </div>
//             <div>
//                 <KeyFeature />
//             </div>
//             <div>
//                 <WhySmartstay />
//             </div>
//             <div>
//                 <Testimonials />
//             </div>
//         </>
//     )
// }

// export default All_landing_pages


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Logo from '../Assets/Images/New_images/Group.png';
import Smart from '../Assets/Images/New_images/logo_front.png';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import FirstPage from './FirstPage';
import KeyFeature from './KeyFeature';
import WhySmartstay from './WhySmartstay';
import Testimonials from './Testimonials';

function All_landing_pages() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    let navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login-Page');
    };

    const handleSignUp = () => {
        navigate('/create-account');
    };

    return (
        <>
            <div>
                <Navbar collapseOnSelect expand="lg" className="" style={{ backgroundColor: "#FFFFFF" }} transparent>
                    <Container>
                        <Navbar.Brand><img src={Logo} style={{ height: 33, width: 33 }} /> <img src={Smart} style={{ height: 20, width: 133 }} /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mx-auto">
                                <Nav.Link
                                    style={{cursor:"pointer", fontSize: 16, fontWeight: 600, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat" }}
                                    as={Link}
                                    to="firstPage"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    style={{ cursor:"pointer",fontSize: 16, fontWeight: 600, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat" }}
                                    as={Link}
                                    to="keyFeature"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Features
                                </Nav.Link>
                                <Nav.Link
                                    style={{ cursor:"pointer",fontSize: 16, fontWeight: 600, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat" }}
                                    as={Link}
                                    to="pricing"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Pricing
                                </Nav.Link>
                                <Nav.Link
                                    style={{cursor:"pointer", fontSize: 16, fontWeight: 600, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat" }}
                                    as={Link}
                                    to="testimonials"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Testimonials
                                </Nav.Link>
                            </Nav>
                            <Nav className='align-items-center justi-content-start'>
                                <Nav.Link style={{ fontSize: 16, fontWeight: 500, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat" }} onClick={handleSignIn}>Sign in</Nav.Link>
                                <Button onClick={handleSignUp} variant="" style={{ backgroundColor: "rgba(30, 69, 225, 1)", color: "rgba(255, 255, 255, 1)", fontWeight: 600, fontSize: 16, fontFamily: "Montserrat", width: 161, height: 60, borderRadius: 16, padding: "20px 24px 20px 24px" }}>Get Started</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <Element name="firstPage">
                <FirstPage />
            </Element>
            <Element name="keyFeature">
                <KeyFeature />
            </Element>
            <Element name="whySmartstay">
                <WhySmartstay />
            </Element>
            <Element name="testimonials">
                <Testimonials />
            </Element>
        </>
    );
}

export default All_landing_pages;
