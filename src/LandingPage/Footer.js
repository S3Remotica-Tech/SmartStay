import React,{useEffect} from "react";
import SmartstayLogo from '../Assets/Images/New_images/Group 2.png';
import Facebook from '../Assets/Images/New_images/facebook (1).png';
import Twitter from '../Assets/Images/New_images/twitter.png';
import Linkedin from '../Assets/Images/New_images/linkedin.png';
import Instagram from '../Assets/Images/New_images/instagram.png';


const Footer = () => {



    useEffect(() => {
        const appearOptions = {
          threshold : 0.5
        };
        const faders = document.querySelectorAll('.fade-in'); 
        const appearOnScro1l = new IntersectionObserver(function(entries,appearOnScrool){
          entries.forEach(entry =>{
            if(!entry.isIntersecting){
              return;
            }
            else{
              entry.target.classList.add('appear');
              appearOnScro1l.unobserve(entry.target);
            }
          })
        }, appearOptions)
        faders.forEach(fader =>{
          appearOnScro1l.observe(fader);
        })
      });

    return (
        <>
             <div style={{backgroundColor:'#222222', color:'white',marginTop:'100px'}}>
            <div className="container mt-5 pb-2 pt-5" >
                <div className="d-flex row pt-3 pb-2">
                    <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 fade-in">
                    <img className="m-1 mb-3" src={SmartstayLogo}  />
                        <p style={{color:'#FFF', fontFamily:'Montserrat',fontSize:16,fontWeight:500,fontStyle:'normal',lineHeight:'160%'}}>Revolutionized way of <br></br>
                        managing your Paying Guest</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 d-flex flex-wrap">

                        <div className="col-lg-4 col-md-3 col-sm-10 ms-2 fade-in">
                        <h5 style={{color:'#FFF', fontFamily:'Montserrat',fontSize:20,fontWeight:600,fontStyle:'normal',lineHeight:'160%'}}>Company</h5>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>About</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Safety</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Product</p>
                        </div>

                        <div className="col-lg-4 col-md-3 col-sm-10 ms-2 fade-in">
                        <h5 style={{color:'#FFF', fontFamily:'Montserrat',fontSize:20,fontWeight:600,fontStyle:'normal',lineHeight:'160%'}} >Resources</h5>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Careers</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>downloads</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Contact us</p>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-10 col-xs-10 ms-2 fade-in">
                        <h5 style={{color:'#FFF', fontFamily:'Montserrat',fontSize:20,fontWeight:600,fontStyle:'normal',lineHeight:'160%'}} >Help</h5>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Terms of use</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Cookies</p>
                        <p style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:400,fontStyle:'normal',lineHeight:'160%'}}>Privacy policy</p>
                        </div>
                    </div>
                </div>
                <hr style={{color:'white',marginBottom:'20px'}}/>

                 <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}className= "col-lg-12 col-md-12 col-sm-12" >
                    <div className= "col-lg-6 col-md-6 col-sm-10">
                    <h5 style={{color:'#FFF', fontFamily:'Gilroy',fontSize:'16px',fontWeight:300,fontStyle:'normal',lineHeight:'160%'}}>&copy; 2024 Smartstay . All rights reserved</h5>
                    </div>
                    <div >
                    <img className="m-1 me-2" src={Facebook} style={{ height: 20, width: 20 }} />
                    <img className="mt-1 me-2" src={Twitter} style={{ height: 20, width: 20 }} />
                    <img className="m-1 me-2" src={Linkedin} style={{ height: 20, width: 20 }} />
                    <img className="m-1" src={Instagram} style={{ height: 20, width: 20 }} />
                    </div>
                 </div>
            </div>
            </div>
        </>
    )
}
export default Footer;