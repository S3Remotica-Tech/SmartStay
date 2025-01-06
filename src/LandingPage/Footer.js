import React, { useEffect } from "react";
import SmartstayLogo from '../Assets/Images/New_images/Group 2.png';
import Facebook from '../Assets/Images/New_images/facebook (1).png';
import Twitter from '../Assets/Images/New_images/twitter.png';
import Linkedin from '../Assets/Images/New_images/linkedin.png';
import Instagram from '../Assets/Images/New_images/instagram.png';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";


const Footer = (props) => {


  const state = useSelector((state) => state);
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
    const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
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
              <img className="m-1 mb-3" src={SmartstayLogo} />
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

<Link to="home" smooth={true} duration={500}>
                    <p style={{ color: '#FFFFFF', fontFamily: 'Gilroy', fontSize: '16px', fontWeight: 200, fontStyle: 'normal', lineHeight: '25px', cursor: "pointer" }} onClick={() => handleLink('firstPage')}>Home</p>
                  </Link>
                  <Link to="features" smooth={true} duration={500}>
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
              <img className="m-1 me-2" src={Facebook} style={{ height: 24, width: 24 }} />
              <img className="mt-1 me-2" src={Twitter} style={{ height: 24, width: 24 }} />
              <img className="m-1 me-2" src={Linkedin} style={{ height: 24, width: 24 }} />
              <img className="m-1" src={Instagram} style={{ height: 24, width: 24 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer;