import React , { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Desktop  from '../Assets/Images/New_images/image 8.png'
import { Height } from '@material-ui/icons';
import Spring1 from '../Assets/Images/New_images/image 24.png'
import Spring2 from '../Assets/Images/New_images/image 23.png';
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';






function FirstPage() {



    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    let navigate = useNavigate();

    const handleStartNow = () =>{
        navigate('/create-account')
      } 

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);



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
    <div style={{backgroundColor:"#FFFFFF" ,height:"",paddingTop:40,width:"100%"}} className='animated-text'>

<div className='d-flex justify-content-center '>
    <label style={{fontWeight:600, fontFamily:"Montserrat", color:"rgba(0, 0, 0, 1)", fontSize:18}}>👋 MANAGE YOUR PG</label>

</div>
<div className='d-flex justify-content-center ' style={{}}>
    <label style={{fontSize:isMobile ? 40 : 70, textAlign:"center", wordSpacing:0.5}}>
        <span style={{fontFamily:"Kalam", color:"rgba(30, 69, 225, 1)",fontStyle: "italic",fontWeight:500}}>Simplify </span> <span style={{fontWeight:400, fontFamily:"Gilroy"}}>your</span>  <span style={{fontFamily:"Gilroy", color:"rgba(0, 0, 0, 1)", fontWeight:600}}>Paying Guest management</span> <span style={{fontWeight:400, fontFamily:"Gilroy"}}>with</span> <span style={{color:"rgba(30, 69, 225, 1)", fontWeight:700,fontFamily:"Gilroy"}}>SmartStay</span>
    </label>
</div>
<div className='d-flex justify-content-center mb-1' >
    <label style={{fontWeight:400, fontSize:18, color:"rgba(0, 0, 0, 1)", fontFamily:"Montserrat", textAlign:"center"}}>Efficiently manage rooms, customers, inventory, vendors, 
        </label>
</div>
<div className='d-flex justify-content-center mb-1 '>
<label style={{fontWeight:400, fontSize:18, color:"rgba(0, 0, 0, 1)", fontFamily:"Montserrat",textAlign:"center"}}>complaints, expenses, and reports—all in one place.</label>

</div>


<div className='d-flex justify-content-center  mt-3  '>
<Button onClick={handleStartNow} variant="" style={{backgroundColor:"rgba(30, 69, 225, 1)", color:"rgba(255, 255, 255, 1)", fontWeight:600, fontSize:16, fontFamily:"Montserrat", width:220,height:70, borderRadius:16, padding:"24px 32px 24px 32px"}}>Get Started</Button>

</div>

<div className='row d-flex justify-content-center mt-3' style={{position:"relative", backgroundColor:""}}>
       <img src={Desktop } className='img-fluid' style={{height:776, width:1000}}/>
       <img src={Spring1}  style={{position:"absolute", left:0,  bottom:0, width:220, height:219 ,display:isMobile ? "none": "flex",transform: "rotate(360deg)"}}/>
       <img src={Spring2}   style={{position:"absolute", top:0, right:0, width:220, height:219,display:isMobile ? "none": "flex"}} />

</div>

<div className="d-flex justify-content-around flex-wrap mt-5 mb-5" style={{backgroundColor:"rgba(250, 249, 255, 1)",padding:"50px 30px"}}>

<div className='text-center'>
    <div style={{fontSize:60,fontWeight:700,fontFamily:"Montserrat",color:"rgba(30, 69, 225, 1)"}}> <CountUp start={1} end={200} delay={2}/>K</div>
    <div style={{fontSize:18,fontWeight:400,fontFamily:"Montserrat",color:"rgba(0, 0, 0, 1)"}}>Users use this platform</div>
</div>

<div className='text-center'>
    <div style={{fontSize:60,fontWeight:700,fontFamily:"Montserrat",color:"rgba(30, 69, 225, 1)"}}><CountUp start={1} end={30} delay={2}/>K+</div>
    <div style={{fontSize:18,fontWeight:400,fontFamily:"Montserrat",color:"rgba(0, 0, 0, 1)"}}>Active users this month</div>
</div>
<div className='text-center'>
    <div style={{fontSize:60,fontWeight:700,fontFamily:"Montserrat",color:"rgba(30, 69, 225, 1)"}}><CountUp start={1} end={25} delay={2}/>K+</div>
    <div style={{fontSize:18,fontWeight:400,fontFamily:"Montserrat",color:"rgba(0, 0, 0, 1)"}}>Available states</div>
</div>
</div>








</div>

  )
}

export default FirstPage