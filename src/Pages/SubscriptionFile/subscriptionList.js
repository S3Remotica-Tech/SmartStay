import React from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Guest from '../../Assets/pricing/house.png'
import Custom from '../../Assets/pricing/Manage customer.png'
import Vendor from '../../Assets/pricing/shop.png';
import Asset from '../../Assets/pricing/Money.png';
import Invoice from '../../Assets/pricing/note.png';
import Expense from '../../Assets/Images/New_images/coin.png';
import Report from '../../Assets/pricing/clipboard-text.png';

function SubscriptionList(){
    return(


    <div style={{marginTop:20}}>

<div className='d-flex justify-content-center'>
<Card  style={{backgroundColor:"rgba(34, 34, 34, 1)", borderRadius:"40px", maxWidth:400, width:"100%", padding:"15px 20px",boxShadow:'0px 0px 16px 0px #C7C7C7',height:600,maxHeight:580}}>
      <Card.Body>


<label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:18,lineHeight:"28px" }}> Get SmartStay</label>

<label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Montserrat", fontWeight:'lighter', fontSize:14,lineHeight:"22px",paddingTop:"10px" }}>Get access to your very own Rental Product and elevate your rental business with <span style={{fontWeight:700}}> Limited-time offer 👇 </span></label>
 
 <div className='gap-3 d-flex align-items-center mb-3 mt-2'>
    <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:700, fontSize:25}}>₹599</label>
    <label style={{color:"rgba(100, 100, 100, 1)",fontFamily:"Gilroy", fontWeight:500, fontSize:20, textDecoration:"line-through" }}>₹999</label>
    <div>
    <Badge bg="rgba(0, 163, 46, 1) " style={{backgroundColor:"rgba(0, 163, 46, 1)", fontSize:12, fontWeight:500, fontFamily:"Gilroy"}}>20 % off</Badge>
    </div>
   
  
 </div>
 <div className='mb-2'>
    <Button className="w-100" style={{height:52, backgroundColor:"rgba(30, 69, 225, 1)", borderRadius:16, fontSize:16, fontWeight:600, fontFamily:"Montserrat"}}>Get Started</Button>
 </div>
 
 <div className='d-flex justify-content-start pt-2 pb-3'>

<label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Montserrat", fontWeight:'lighter', fontSize:14 }}>Get free <span style={{fontWeight:700}}>30 days trail </span> as an introductory offer.</label>


    </div>

    <div className=' pt-2 pb-3'>
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Montserrat", fontWeight:400, fontSize:15 }}>You will get access to these features:</label>
    </div>
    <div className='pt-2 pb-3'>

        <div className=' pb-1 gap-1 d-flex'>
            <img src={Guest} />
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Paying Guest</label>
            </div>
     
     <div className=' pb-1 gap-1 d-flex'>
     <img src={Custom} />
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Manage customers</label>
     </div>
     <div className=' pb-1 gap-1 d-flex' >   
     <img src={Vendor} />     
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Manage Vendors</label>
     </div>
     <div className=' pb-1 gap-1 d-flex'>
     <img src={Asset} />       
         <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Asset Management</label>
     </div>
     <div className=' pb-1 gap-1 d-flex'>  
     <img src={Invoice} />      
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}> Invoice Management</label>
     </div>
     <div className=' pb-1 gap-1 d-flex'>
     <img src={Expense} />        
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Expenses Management</label>
     </div>
     <div className=' pb-1 gap-1 d-flex'> 
     <img src={Report} />       
        <label style={{color:"rgba(255, 255, 255, 1)",fontFamily:"Gilroy", fontWeight:600, fontSize:14 }}>Reports Management</label>
     </div>
        </div>
      </Card.Body>
    </Card>



    </div>



    </div>

   
    )
}
export default SubscriptionList;