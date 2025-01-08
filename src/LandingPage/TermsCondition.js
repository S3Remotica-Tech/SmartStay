
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
import Condition from './Condition';
import Policy from './Policy';
import ContactUs from './ContactUs';
import CookiesFooter from './Cookies';


function All_landing_pages() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login-Page');
  };

  const handleSignUp = () => {
    navigate('/create-account');
  };



  const linkStyle = (isActive) => ({
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'rgba(30, 69, 225, 1)' : '#000',
    fontFamily: 'Montserrat',
    padding: '10px 25px',
  });


  const hanldeDisplayLink = (linkName) => {

    setActiveLink(linkName)
    dispatch({ type: 'CLOSE_TERMS_PRIVACY' })
  }


// console.log("state.login?.IsVisible",state.login?.IsVisible)
useEffect(() => {
  if (
    state.login?.IsVisible === 1 || 
    state.login?.IsVisible === 2 || 
    state.login?.IsVisible === 3 || 
    state.login?.IsVisible === 4
  ) {
    setActiveLink('');
  }
}, [state.login?.IsVisible]);

console.log("state.login?.IsVisible",state.login?.IsVisible)

console.log("state",state)

const renderComponent = () => {
  switch (state.login?.IsVisible) {
    case 1:
      return <Condition />;
    case 2:
      return <Policy />;
    case 3:
      return <ContactUs />;
    case 4:
      return <CookiesFooter />;
    default:
      return null;
  }
};






  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" style={{ backgroundColor: '#FFFFFF' }}>
        <Container fluid className="ms-5 me-5">
          <Navbar.Brand onClick={() => hanldeDisplayLink('firstPage')}>
            <img src={Logo} style={{ width: 176.45, height: 33 }} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {['firstPage', 'keyFeature', 'pricing', 'testimonials'].map((linkName) => (
                <Nav.Link
                  key={linkName}
                  as={Link}
                  to={linkName}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="active-link"
                  style={linkStyle(activeLink === linkName)}
                  onClick={() => hanldeDisplayLink(linkName)}
                >
                  {linkName === 'firstPage'
                    ? 'Home'
                    : linkName.charAt(0).toUpperCase() + linkName.slice(1)}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="justify-content-end">
              <div className="d-lg-flex d-sm-block d-md-block align-items-center gap-3">
                <Nav.Link
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#000',
                    fontFamily: 'Montserrat',
                    marginRight: 20,
                  }}
                  onClick={handleSignIn}
                >
                  Sign in
                </Nav.Link>
                <Button
                  onClick={handleSignUp}
                  style={{
                    backgroundColor: 'rgba(30, 69, 225, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: 'Montserrat',
                    borderRadius: 16,
                    padding: '20px 24px 20px 24px',
                  }}
                >
                  Get Started
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: 100 }}>
  {state.login?.IsVisible === 1 ? (
    <Condition />
  ) : state.login?.IsVisible === 2 ? (
    <Policy />
  ) : state.login?.IsVisible === 3 ? (
    <ContactUs />
  ) : state.login?.IsVisible === 4 ? (
    <CookiesFooter />
  ) : null}
</div>




      
      {activeLink === 'firstPage' && (
        <Element name="firstPage" style={{ paddingTop: '90px' }}>
          <FirstPage />
        </Element>
      )}
      {activeLink === 'keyFeature' && (
        <Element name="keyFeature">
          <KeyFeature />
        </Element>
      )}
      {activeLink === 'pricing' && (
        <Element name="pricing">
          <Pricing />
        </Element>
      )}
      {activeLink === 'testimonials' && (
        <Element name="testimonials">
          <Testimonials />
          <div>
            <GetAnswer />
          </div>
        </Element>
      )}

 

      <Element name="footer">
        <Footer handleLinkName={hanldeDisplayLink}/>
      </Element>
    </>
  );
}

export default All_landing_pages;
