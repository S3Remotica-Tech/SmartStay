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
   
    <div className="container-fluid">
  <div className="row px-4 pb-5">

    <div className="mt-4 mb-4 text-center">
      <h5 className="fw-bold" style={{ fontSize: "60px", color: "#222" }}>
        Key <span style={{ color: "rgba(30, 69, 225, 1)", fontSize: "56px" }}>Features</span>
      </h5>
    </div>

  
    {keyValue.map((item) => (
      <div 
        key={item.id} 
        className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch mb-4"
      >
        <Card className="w-100 shadow-sm fade-in" style={{ backgroundColor: "#e7f1ff", borderRadius: 24, border: "1px solid #e7f1ff" }}>
          <Card.Body className="d-flex flex-column">
            
           
            <div className="mb-3">
              <img src={item.KeyImage} alt="feature icon" className="img-fluid" style={{ height: 60, width: 60 }} />
            </div>

            <h5 className="fw-bold" style={{ fontSize: "28px", fontFamily: "Gilroy" }}>
              {item.Heading}
            </h5>

          
            <p style={{ fontSize: "16px", fontFamily: "Montserrat", flexGrow: 1 }}>
              {item.Title}
            </p>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</div>

  )
}

export default KeyFeature