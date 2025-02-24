import React, {useEffect} from 'react';
import Room from '../Assets/Images/Key/Rooms.png'
import Custom from '../Assets/Images/Key/People.png'
import Inventry from '../Assets/Images/Key/Inventory.png'
import Vendor from '../Assets/Images/Key/man_setting.png';
import Compliant from '../Assets/Images/Key/callmsg.png'
import Bill from '../Assets/Images/Key/Bills.png'
import Card from 'react-bootstrap/Card';


function KeyFeature() {
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const keyValue = [
    { id: 1, Heading: "Room Management", Title: "Easily manage room availability, bookings, and occupancy status.", KeyImage: Room },
    { id: 2, Heading: "Customer Management", Title: "Keep track of customer details, stay history, and preferences.", KeyImage: Custom },
    { id: 3, Heading: "Inventory Management", Title: "Monitor and manage your inventory with real-time updates.", KeyImage: Inventry },
    { id: 4, Heading: "Vendor Management", Title: "Seamlessly coordinate with your vendors and suppliers.", KeyImage: Vendor },
    { id: 5, Heading: "Complaint Management", Title: "Efficiently handle customer complaints and feedback.", KeyImage: Compliant },
    { id: 6, Heading: "Utility Bill Management", Title: "Track and manage electricity bills and other expenses.", KeyImage: Bill }

  ]

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
    <div className='' style={{ width: "100%" }}>
      <div className='row  ps-5 pe-5 'style={{paddingBottom:"72px"}} >

        <div className='mt-4 mb-4'>
          <h5 style={{ fontSize:"60px", color: "rgba(34, 34, 34, 1)", fontWeight: 700, fontFamily: "Gilroy", textAlign: "center" }}> Key <span style={{ fontSize: 56, color: "rgba(30, 69, 225, 1)", fontWeight: 700, fontFamily: "Gilroy" }} >Features </span></h5>

        </div>

        {keyValue.map((item) => (
          <div key={item.id} className='col-lg-4 col-md-6 col-xs-12 col-sm-12' style={{padding:"40px 20px 40px 20px"}}>
            <Card className="h-100 fade-in" style={{ backgroundColor: "#e7f1ff", borderRadius: 24, border: "1px solid #e7f1ff" }}>
              <Card.Body>

                <div className='ps-2 mb-2'>
                  <img src={item.KeyImage} style={{height:60, width:60}} />
                </div>

                <div className='ps-2 pe-5 mb-2 w-100'>
                  <label style={{fontSize:32, fontWeight:700, fontFamily:"Gilroy",wordSpacing:5}}>{item.Heading}</label>
                </div>


                <div className='ps-2 mb-2'>
                  <label style={{fontSize:16, fontWeight:400, fontFamily:"Montserrat"}}>{item.Title}</label>
                </div>




              </Card.Body>
            </Card>


          </div>
        ))}
      </div>


    </div>
  )
}

export default KeyFeature