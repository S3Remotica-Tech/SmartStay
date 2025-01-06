import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Logo from '../Assets/Images/New_images/Group 2.svg';
import Smart from '../Assets/Images/New_images/logo_front.png';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import FirstPage from './FirstPage';
import KeyFeature from './KeyFeature';
import WhySmartstay from './WhySmartstay';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Pricing from './Pricing';
import GetAnswer from './GetAnswer';



function All_landing_pages() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    let navigate = useNavigate();


    console.log("state",state)

    const handleSignIn = () => {
        navigate('/login-Page');
    };

    const handleSignUp = () => {
        navigate('/create-account');
    };


    const [activeLink, setActiveLink] = useState('');
    

    const handleSetActive = (linkName) => {
        console.log('Active link:', linkName);
             setActiveLink(linkName);
    };

     



    const linkStyle = (isActive) => ({
        cursor: "pointer",
        fontSize: 16,
        fontWeight: isActive ? 700 : 500,
        color: isActive ? "rgba(30, 69, 225, 1)" : "#000",
        fontFamily: "Montserrat",
        padding: '10px 25px'

    });

    return (
        <>
            <div>

                <Navbar collapseOnSelect expand="lg" fixed="top" className="" style={{ backgroundColor: "#FFFFFF", }} transparent>

                    <Container fluid className="ms-5 me-5">
                        <Navbar.Brand><img src={Logo} style={{ width: 176.45, height: 33 }} />
                            {/* <img src={Smart} style={{ height: 20, width: 133 }} /> */}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mx-auto">
                                <Nav.Link
                                   className="custom-link"
                                    as={Link}
                                    style={linkStyle(activeLink === 'firstPage')}
                                    onSetActive={() => handleSetActive('firstPage')}
                                    to="firstPage"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    activeClass="active-link"
                                    
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                  
                                    as={Link}
                                    to="keyFeature"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    activeClass="active-link"
                                    style={linkStyle(activeLink === 'keyFeature')}
                                    onSetActive={() => handleSetActive('keyFeature')}
                                    
                                >
                                    Features
                                </Nav.Link>
                                <Nav.Link
                                    
                                    as={Link}
                                    to="pricing"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    activeClass="active-link"
                                    style={linkStyle(activeLink === 'pricing')}
                                    onSetActive={() => handleSetActive('pricing')}
                                    
                                >
                                    Pricing
                                </Nav.Link>
                                <Nav.Link
                                   
                                    as={Link}
                                    to="testimonials"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    activeClass="active-link"
                                    style={linkStyle(activeLink === 'testimonials')}
                                    onSetActive={() => handleSetActive('testimonials')}
                                    
                                >
                                    Testimonials
                                </Nav.Link>
                            </Nav>
                            <Nav className=' justi-content-end'>
                                <div className='d-lg-flex d-sm-block d-md-block align-items-center gap-3'>
                                    <Nav.Link style={{ fontSize: 16, fontWeight: 500, color: "#000", fontFamily: "Montserrat", marginRight: 20 }} onClick={handleSignIn}>Sign in</Nav.Link>
                                    <Button onClick={handleSignUp} variant="" style={{ backgroundColor: "rgba(30, 69, 225, 1)", color: "rgba(255, 255, 255, 1)", fontWeight: 600, fontSize: 16, fontFamily: "Montserrat", borderRadius: 16, padding: "20px 24px 20px 24px" }}>Get Started</Button>
                                </div>


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>



            <Element name="firstPage" style={{ paddingTop: "90px" }}>

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


            <Element name="pricing">
                <Pricing />
            </Element>

            <div>
                <GetAnswer />
            </div>

  






            <Element name="footer">
                <Footer  handleLinkName={handleSetActive}/>
            </Element>


        </>
    );
}

export default All_landing_pages;






