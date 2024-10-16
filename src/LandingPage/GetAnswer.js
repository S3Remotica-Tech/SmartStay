import React,{useEffect} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Smart from '../Assets/Images/get.png'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function GetAnswer() {





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
    <div className='mt-3 mb-3'>

<div className='d-flex justify-content-center mt-3 mb-5'>
    <label style={{fontFamily:"Gilroy", fontWeight:600, fontSize:60,lineHeight:"72px"}}>Get answers to some <span style={{color:"rgba(30, 69, 225, 1)"}}>FAQs</span></label>
</div>

<div className='d-flex justify-content-center  mb-5'>
  <label style={{fontFamily:"Montserrat", fontWeight:400, fontSize:18, color:"rgba(34, 34, 34, 1)" }}>Take a look at our most Frequently Asked Questions</label>
  </div>
  <div className='row mb-5'>

  
<div className='col-lg-8 offset-lg-2 col-md-12 col-xs-12 col-sm-12 fade-in'  style={{backgroundColor:""}}>
<Accordion 
// defaultActiveKey="0"
 style={{backgroundColor:"", border:"1px solid rgba(30, 69, 225, 1)", borderRadius:24, padding:20}}>
      <Accordion.Item eventKey="0" style={{border:"none", borderBottom:"1px solid rgba(220, 220, 220, 1)", }}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight: "bold !important", fontSize:20 ,lineHeight:"32px"}}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" style={{border:"none", borderBottom:"1px solid rgba(220, 220, 220, 1)"}}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20,lineHeight:"32px" }}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" style={{border:"none", borderBottom:"1px solid rgba(220, 220, 220, 1)"}}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 ,lineHeight:"32px"}}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" style={{border:"none", borderBottom:"1px solid rgba(220, 220, 220, 1)"}}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20,lineHeight:"32px" }}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" style={{border:"none", borderBottom:"1px solid rgba(220, 220, 220, 1)"}}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 ,lineHeight:"32px"}}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" style={{border:"none"}}>
        <Accordion.Header  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 ,lineHeight:"32px",color:'#000000'}}>The blue whale is the biggest animal to have ever lived</Accordion.Header>
        <Accordion.Body  style={{boxShadow:"none",fontFamily:"Gilroy", fontWeight:600, fontSize:20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
</div>
</div>

<div className='row mb-5 mt-2'>
<div className='col-lg-8 offset-lg-2 col-md-12 col-xs-12 col-sm-12 d-flex justify-content-start' style={{backgroundColor:""}}>

<Card  style={{position:"relative",backgroundColor:"rgba(30, 69, 225, 1)", marginLeft:0, borderRadius:24,width:"100%", maxWidth:1000, padding:40}} className='d-flex justify-content-center align-items-center fade-in'>
      <Card.Body>

<div style={{border:"1px solid rgba(255, 255, 255, 1)", width:150, height:100, borderRadius:70, position:"absolute", top:-20, left:-100}}>

</div>

<div style={{border:"1px solid rgba(255, 255, 255, 1)", width:200, height:200, borderRadius:70, position:"absolute", top:-80, left:-100}}>

</div>

<div style={{border:"1px solid rgba(255, 255, 255, 1)", width:150, height:100, borderRadius:70, position:"absolute", bottom:-20, right:-100}}>

</div>

<div style={{border:"1px solid rgba(255, 255, 255, 1)", width:200, height:200, borderRadius:70, position:"absolute", bottom:-80, right:-100}}>

</div>

<div className='d-flex justify-content-center gap-2 mb-2' >
<div>
  <img src={Smart} />
</div>
<div>
  <label style={{fontFamily:"Gilroy", fontWeight:700, fontSize:20 , color:"rgba(255, 255, 255, 1)"}}>Smartstay</label>
</div>
</div>


<div className='d-flex justify-content-center mb-2 mt-2' >
  <label style={{fontFamily:"Gilroy", fontWeight:700, fontSize:56 , color:"rgba(255, 255, 255, 1)", textAlign:"center"}}>Ready to Simplify Your PG Management?</label>
</div>

<div className='d-flex justify-content-center mb-2 mt-2'>
  <label style={{fontFamily:"Montserrat", fontWeight:400, fontSize:18 , color:"rgba(255, 255, 255, 1)", textAlign:"center"}}>Join now and be part of a new era of PG management.</label>
</div>

<div className='mb-2 d-flex justify-content-center mt-4'>
    <Button className="w-25" style={{height:62, color:"rgba(30, 69, 225, 1)", borderRadius:16, fontSize:18, fontWeight:600, fontFamily:"Montserrat", backgroundColor:"#FFF"}}>Get Started</Button>
 </div>

      </Card.Body>
    </Card>
</div>
</div>






    </div>
  )
}

export default GetAnswer