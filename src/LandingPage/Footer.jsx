import React, { useEffect } from "react";
import SmartstayLogo from '../Assets/Images/New_images/Samrtstay_logo.png';
import Facebook from '../Assets/Images/New_images/facebook_icon.png';
import Twitter from '../Assets/Images/New_images/twitter.png';
import Linkedin from '../Assets/Images/New_images/linkedin.png';
import Instagram from '../Assets/Images/New_images/instagram.png';
import {useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { Link } from "react-scroll";
import PropTypes from "prop-types";


const Footer = (props) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleNavigateTerms = () => {
    dispatch({ type: 'TERMS_CONDITION' })
    navigate('/Terms-Condition');
  };


  const handleNavigatePrivacy = () => {
    dispatch({ type: 'PRIVACY_POLICY' })
    navigate('/Privacy-Policy');

  }

  const handleNavigateContactUs = () => {
    dispatch({ type : 'CONTACT_US'})
    navigate('/Contact-Us')
  }

  const handleNavigateCookies = () => {
    dispatch({ type: 'COOKIES_FOOTER' });
       navigate('/Cookies')
  }

  const handleLink = (link) => {
    props.handleLinkName(link)
  }



  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });

  return (
    <>
      <div style={{ backgroundColor: '#222222', color: 'white', marginTop: '100px' }}>
        <div className="container mt-5 pb-2 pt-5" >
          <div className="d-flex row pt-3 pb-2">
            <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 fade-in">
              <img className="m-1 mb-3" src={SmartstayLogo} alt="smart"/>
              <p style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: 14, fontWeight: 200, fontStyle: 'normal', lineHeight: '25px' }}>Revolutionized way of <br></br>
                managing your Paying Guest</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10">
              <div className="row">


                <div className="col-lg-4 offset-lg-4 col-md-4 col-sm-10  fade-in">
                  <h5 style={{ color: '#FFFFFF', fontFamily: 'Montserrat', fontSize: 20, fontWeight: 500, fontStyle: 'normal', lineHeight: '32px' }}>Company</h5>
                  {/* <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer"  }} onClick={() => hanldeLink('firstPage')}>Home</p>
                  <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => hanldeLink('keyFeature')}>Features</p>
                  <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => hanldeLink('pricing')}>Pricing</p>
                  <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => hanldeLink('testimonials')}>Testimonials</p> */}

<Link to="firstPage" smooth={true} duration={500}>
                    <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => handleLink('firstPage')}>Home</p>
                  </Link>
                  <Link to="keyFeature" smooth={true} duration={500}>
                    <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => handleLink('keyFeature')}>Features</p>
                  </Link>
                  <Link to="pricing" smooth={true} duration={500}>
                    <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => handleLink('pricing')}>Pricing</p>
                  </Link>
                  <Link to="testimonials" smooth={true} duration={500}>
                    <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => handleLink('testimonials')}>Testimonials</p>
                  </Link>



                </div>

                {/* <div className="col-lg-4 col-md-3 col-sm-10 ms-2 fade-in">
                <h5 style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: 20, fontWeight: 500, fontStyle: 'normal', lineHeight: '160%' }} >Resources</h5>
                <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%' }}>Careers</p>
                <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%' }}>downloads</p>
               
              </div> */}

                <div className="col-lg-4 col-md-4 col-sm-10 col-xs-10  fade-in">
                  <h5 style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: 20, fontWeight: 500, fontStyle: 'normal', lineHeight: '160%' }} >Help</h5>
                  <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%', cursor: "pointer" }} onClick={handleNavigateTerms}>Terms of use</p>
                  <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%' , cursor: "pointer"}} onClick={ handleNavigateCookies}>Cookies</p>
                  <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%', cursor: "pointer" }} onClick={handleNavigatePrivacy}>Privacy policy</p>
                  <p style={{ color: '#FFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '160%', cursor: "pointer" }}  onClick={handleNavigateContactUs}>Contact us</p>
                </div>
              </div>
            </div>




          </div>
          <hr style={{ color: 'white', marginBottom: '20px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} className="col-lg-12 col-md-12 col-sm-12" >
            <div className="col-lg-6 col-md-6 col-sm-10">
              <h5 style={{ color: '#FFF', fontFamily: 'Outfit', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25.6px' }}>&copy; 2025 S3 Remotica Technologies. All rights reserved</h5>
            </div>
            <div>
              <img className="m-1 me-2" src={Facebook} alt="facebook" style={{ height: 24, width: 24 }} />
              <img className="mt-1 me-2" src={Twitter} alt="twitter" style={{ height: 24, width: 24 }} />
              <img className="m-1 me-2" src={Linkedin} alt="linkedin" style={{ height: 24, width: 24 }} />
              <img className="m-1" src={Instagram} alt="insta" style={{ height: 24, width: 24 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
Footer.propTypes = {
  handleLinkName: PropTypes.func.isRequired,
};
export default Footer;