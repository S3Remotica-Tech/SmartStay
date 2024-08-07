import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './whysmart.css';
import Image from '../Assets/Images/New_images/image 9.png'

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
  const [activeStep, setActiveStep] = React.useState(0);

 

  return (
    <>
    <div className='row'>

<div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 d-flex justify-content-center align-items-center'>
<div>



<label style={{fontFamily:"Gilroy", fontSize:56, fontWeight:700,color:"#222" }}>Why Smart<span style={{fontFamily:"Gilroy", fontSize:56, fontWeight:700,color:"#1E45E1"}}>Stay?</span></label>

<Box sx={{ maxWidth: "auto" }}>
      <Stepper  orientation="vertical" style={{backgroundColor:"", height:"100%"}} >
        {steps.map((step, index) => (
          <Step key={step.label} active={true} style={{color:"none",paddingBottom:5 }}>
            <StepLabel  style={{fontFamily:"Gilroy", fontSize:24, fontWeight:600,color:"rgba(0, 0, 0, 1)"}}>
              {step.label}
            </StepLabel>
            <StepContent className='content-mui'>
              <Typography style={{fontFamily:"Montserrat", fontSize:18, fontWeight:400,color:"rgba(0, 0, 0, 1)"}}>{step.description}</Typography>
             
            </StepContent>
          </Step>
        ))}
      </Stepper>
         </Box>
         </div>
</div>
<div className='col-lg-6 col-md-6 col-xs-12 col-sm-12'>
<img src={Image}  className='img-fluid'/>
</div>
    </div>
    
    
    
    
   
  
         </>
  );
}