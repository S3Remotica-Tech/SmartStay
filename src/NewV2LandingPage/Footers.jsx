import React, { useEffect } from "react";
import SmartstayLogo from '../Assets/Images/New_images/Samrtstay_logo.png';
import Facebook from '../Assets/Images/New_images/facebook_icon.png';
import Instagram from '../Assets/Images/New_images/instagram.png';
import { Link } from "react-scroll";
import PropTypes from "prop-types";
import GooglePlay from "../Assets/v2LandingImages/GooglePlay.svg";
import { Mobile } from "iconsax-react";
import { CiMail } from "react-icons/ci";
import FooterSmartstay from '../Assets/v2LandingImages/FooterSmartstay.png';

const Footers = (props) => {



  // const dispatch = useDispatch();
  // let navigate = useNavigate();

  // const handleNavigateTerms = () => {
  //   dispatch({ type: 'TERMS_CONDITION' })
  //   navigate('/Terms-Condition');
  // };


  // const handleNavigatePrivacy = () => {
  //   dispatch({ type: 'PRIVACY_POLICY' })
  //   navigate('/Privacy-Policy');

  // }

  // const handleNavigateContactUs = () => {
  //   dispatch({ type : 'CONTACT_US'})
  //   navigate('/Contact-Us')
  // }

  // const handleNavigateCookies = () => {
  //   dispatch({ type: 'COOKIES_FOOTER' });
  //      navigate('/Cookies')
  // }

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
      <div className="bg-[#222222] text-white font-tasa">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">


          <div className="grid grid-cols-12 gap-8">


            <div className="col-span-12 md:col-span-3 fade-in">
              <img
                className="mb-3"
                src={SmartstayLogo}
                alt="SmartStay hostel management software logo"
              />

              <p className="text-sm font-light leading-6">
                Revolutionizing the way of <br />
                managing your Paying Guest and Hostel services
              </p>
            </div>


            <div className="col-span-12 md:col-span-9 px-2">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


                <div className="fade-in">
                  <h5 className="text-xl font-medium mb-3">Company</h5>

                  <Link to="firstPage" smooth duration={500}>
                    <p className="text-base font-light cursor-pointer">
                      About
                    </p>
                  </Link>

                  <Link to="pricing" smooth duration={500}>
                    <p
                      className="text-base font-light cursor-pointer"
                      onClick={() => handleLink("Pricing")}
                    >
                      Product
                    </p>
                  </Link>
                </div>


                <div className="fade-in">
                  <h5 className="text-xl font-medium mb-3">Resources</h5>

                  <p
                    className="text-base font-light cursor-pointer"
                    onClick={() => handleLink("Contact_us")}
                  >
                    Contact us
                  </p>
                </div>


                <div className="fade-in">
                  <h5 className="text-xl font-medium mb-3">Help</h5>

                  <p
                    className="text-base font-light cursor-pointer"
                    onClick={() => handleLink("terms_use")}
                  >
                    Terms of use
                  </p>

                  <p
                    className="text-base font-light cursor-pointer"
                    onClick={() => handleLink("cookies")}
                  >
                    Cookies
                  </p>

                  <p
                    className="text-base font-light cursor-pointer"
                    onClick={() => handleLink("privacy_policy")}
                  >
                    Privacy policy
                  </p>

                  <p
                    className="text-base font-light cursor-pointer"
                    onClick={() => handleLink("refund_policy")}
                  >
                    Refund policy
                  </p>
                </div>


                <div className="fade-in">
                  <h5 className="text-xl font-medium mb-3 font-tasa whitespace-nowrap">
                    Available on Platforms
                  </h5>

                  <img src={GooglePlay} alt="google play" className="mb-4" />

                  <div className="flex items-start gap-3 mb-4">

                    <div className="bg-[#EFF2FF1A] p-2 rounded flex items-center justify-center mt-1">
                      <Mobile color="#FFFFFF" size="16" />
                    </div>

                    <div className="font-tasa leading-tight">
                      <div className="text-xs text-white/80 whitespace-nowrap">
                        We are Available
                      </div>

                      <div className="text-base font-medium whitespace-nowrap">
                        +91 94296 93581
                      </div>

                      <div className="text-xs text-white/80 flex items-center gap-2 whitespace-nowrap">
                        (10:00 AM to 06:00PM)

                        <span className="bg-[#FF95001A] text-[#FF9500] px-2 py-[2px] rounded text-xs whitespace-nowrap">
                          Mon-Sat
                        </span>
                      </div>
                    </div>

                  </div>

                  <div className="flex items-start gap-3 mb-2">

                    <div className="bg-[#EFF2FF1A] p-2 rounded flex items-center justify-center mt-1">
                      <CiMail color="#FFFFFF" size="16" />
                    </div>

                    <div className="font-tasa leading-tight">
                      <div className="text-xs text-white/80 whitespace-nowrap">
                        You can also email us here
                      </div>

                      <div className="text-base font-medium whitespace-nowrap">
                        dm@s3remotica.com
                      </div>

                    </div>

                  </div>


                </div>

              </div>
            </div>

          </div>

          {/* Divider */}
          <hr className="border-white/30 my-6" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <h5 className="text-sm font-light">
              © 2025 S3 Remotica Technologies. All rights reserved
            </h5>

            <div className="flex items-center gap-4">

              <a
                href="https://www.facebook.com/profile.php?id=61583256096108"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Facebook} alt="facebook" className="h-6 w-6" />
              </a>

              <a
                href="https://www.instagram.com/smartstayapp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="instagram" className="h-6 w-6" />
              </a>

            </div>
          </div>

        </div>

        <div>
          <img src={FooterSmartstay} alt="image" />
        </div>

      </div>
    </>
  )
}
Footers.propTypes = {
  handleLinkName: PropTypes.func.isRequired,
};
export default Footers;