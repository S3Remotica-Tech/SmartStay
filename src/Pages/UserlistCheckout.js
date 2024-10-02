import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Room from '../Assets/Images/RoomImg.svg';
import More from '../Assets/Images/more.svg';
import People from '../Assets/Images/People (2).svg';


function CheckOut() {
  const renderCard = (index) => (
    <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4" >
      <div className="border p-3" style={{ borderColor: '#E6E6E6', borderWidth: '1px', borderRadius: '16px' }}>
        <div className="d-flex align-items-center">
          <img src={Room} alt="Room Image" />
          <div style={{ marginLeft: '10px' }}>
            <p className="mb-0 font-weight-bold" style={{ fontFamily: "Gilroy", fontSize: '16px', fontWeight: '600', color: '#222222' }}>
              Royal Grand Hostel
            </p>
            <p className="mb-0 mt-2" style={{
              fontFamily: "Gilroy",
              fontSize: '14px',
              fontWeight: '500',
              color: 'black',
              borderRadius: '60px',
              backgroundColor: '#FFEFCF',
              textAlign: 'center',
              width: '110px',
              border: '1px solid #FFEFCF',
            }}>
              Paying Guest
            </p>
          </div>
          <img src={More} alt="More Icon" className="ml-auto border p-2" style={{
            borderRadius: '60px',
            color: '#E6E6E6',
            borderWidth: '1px',
            marginLeft: 'auto',
          }} />
        </div>

        <hr style={{ border: '1px solid #E7E7E7' }} />

        <div className="d-flex justify-content-between" style={{ whiteSpace: 'nowrap' }}>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Customer</p>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', marginLeft:'20px' }}>Check-out Date</p>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Notice Days</p>
        </div>

        <div className="d-flex justify-content-between align-items-center" style={{ whiteSpace: 'nowrap',
          marginTop:'-10px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '20px',lineHeight: '1' }}>
            <img src={People} alt="People Icon" style={{ marginRight: '5px' }} /> Kellie Turcotte
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '68px',lineHeight: '1' }}>20 Mar 2024</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black',marginRight:'16px',lineHeight: '1' }}>20 Days</p>
        </div>

        <div>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Comment</p>
        </div>

        <div style={{marginTop:'-10px'}}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>kafjafbafafkafa</p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="container">


      <div className="row mt-3" >
        {Array.from({ length: 6 }).map((_, index) => renderCard(index))}
      </div>

    </div>
  );
}

export default CheckOut;
