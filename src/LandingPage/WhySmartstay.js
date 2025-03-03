import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import './whysmart.css';
import Image from '../Assets/Images/New_images/PG page.png'


const steps = [
  {
    label: 'Efficiency',
    description: `Automate routine tasks and save time.`,
  },
  {
    label: 'Visibility',
    description:
      'Gain insights with real-time data and analytics.',
  },
  {
    label: 'Scalability',
    description: `Scale effortlessly as your business grows.`,
  },
  {
    label: 'User-Friendly',
    description: `Intuitive interface designed for ease of use.`,
  },
  {
    label: 'Support',
    description: `24/7 customer support to assist you at every step.`,
  },
];

export default function VerticalLinearStepper() {
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const appearOptions = {
      threshold : 0.5
    };
    const faders = document.querySelectorAll('.fade-in'); 
    const appearOnScro1l = new IntersectionObserver(function(entries){
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
    <div className='row'>

<div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 d-flex justify-content-center align-items-center'>
<div>



<label style={{fontFamily:"Gilroy", fontSize:56, fontWeight:700,color:"#222" }}>Why Smart<span style={{fontFamily:"Gilroy", fontSize:56, fontWeight:700,color:"#1E45E1"}}>Stay?</span></label>

<Box sx={{ maxWidth: "auto" }}>
      <Stepper  orientation="vertical" style={{backgroundColor:"", height:"100%"}} >
        {steps.map((step) => (
          <Step key={step.label} active={true} style={{color:"none",paddingBottom:5 }}>
            <StepLabel className='fade-in' style={{fontFamily:"Gilroy", fontSize:24, fontWeight:600,color:"rgba(0, 0, 0, 1)"}}>
              {step.label}
            </StepLabel>
            <StepContent className='content-mui fade-in'>
              <Typography style={{fontFamily:"Montserrat", fontSize:18, fontWeight:400,color:"rgba(0, 0, 0, 1)"}}>{step.description}</Typography>
             
            </StepContent>
          </Step>
        ))}
      </Stepper>
         </Box>
         </div>
</div>
<div className='col-lg-6 col-md-6 col-xs-12 col-sm-12'>
<img src={Image} alt='imagee'  className='img-fluid'/>
</div>
    </div>
    
    
    
    
   
  
         </>
  );
}