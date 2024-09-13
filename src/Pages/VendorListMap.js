import React, { useState, useEffect ,useRef} from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import Vendors from '../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';


function VendorListMap(props) {



  const [showDots, setShowDots] = useState(null);

  const popupRef = useRef(null);

  const handleShowDots = () => {
    setShowDots(!showDots);
   
};
     

const handleMouseEnter = () => {
  setShowDots(true)
}

const handleMouseLeave = () => {
  setShowDots(false)

}
  
  const handleEdit = (item) => {
                   props.onEditVendor(item); 
            };

console.log("handleSow props",props)

const handleDelete = (item) =>{
  props.onDeleteVendor(item)
}



const handleClickOutside = (event) => {
  if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
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
    <Card className="h-100 fade-in" key={props.vendor && props.vendor.id} style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}>
    <Card.Body style={{ padding: 20 }}>
      <div className="d-flex justify-content-between align-items-center flex-wrap" >
        <div className='d-flex gap-2'>
          <div className="">
            <Image src={props.vendor && props.vendor.Vendor_profile ? props.vendor.Vendor_profile : Vendors} roundedCircle style={{ height: "60px", width: "60px" }} />
          </div>
          <div >
            <div className='pb-2'>
              <label style={{ fontSize: 16, color: "#222222", fontWeight: 600, fontFamily: "Gilroy"}} >{props.vendor && props.vendor.Vendor_Name}</label>
            </div>
            <div>
              <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500,fontFamily: "Gilroy", width: "fit-content", padding: 5, borderRadius: 10, fontSize: 14 }}>{props.vendor && props.vendor.Business_Name}</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ cursor:"pointer",height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" ,  zIndex: showDots  ? 1000 : 'auto' }} onClick={()=>handleShowDots(props.vendor.id)}>
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

            {showDots && <>
              <div  ref={popupRef} style={{cursor:"pointer",backgroundColor: "#fff", position: "absolute", right: 0, top: 50, width: 163, height:92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                <div >
                  <div className='mb-2' onClick={()=>handleEdit(props.vendor)} >
                    <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ cursor:"pointer",fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >Edit</label>
                  </div>
                  <div  onClick={()=>handleDelete(props.vendor)}> 
                    <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{cursor:"pointer", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000" }}>Delete</label>
                  </div>
                </div>
              </div>


            </>}

          </div>
        </div>
      </div>
      <hr style={{ border: "1px solid #E7E7E7" }} />

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

        <div className='mb-2'>
          <div className='mb-1'>
            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email ID </label>
          </div>
          <div >
          <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
  {props.vendor && props.vendor.Vendor_Email && props.vendor.Vendor_Email !== "undefined" ? props.vendor.Vendor_Email : ''}
</label>
          </div>

        </div>
        <div className='mb-2'>
          <div className='mb-1'>
            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Contact Number</label>
          </div>
          <div>
            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
              
              {/* +{props.vendor && props.vendor.Vendor_Mobile} */}
              
              +{props.vendor && String(props.vendor.Vendor_Mobile).slice(0, String(props.vendor.Vendor_Mobile).length - 10)}
                                {' '}
                                {props.vendor && String(props.vendor.Vendor_Mobile).slice(-10)}
              </label>
         
         
         
          </div>

        </div>
      </div>

      <div className='mb-2'>
        <div className='mb-1'>
          <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}> Address</label>

        </div>

        <div>
          <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.vendor && props.vendor.Vendor_Address}</label>
        </div>

      </div>




    </Card.Body>
  </Card>
  )
}

export default VendorListMap