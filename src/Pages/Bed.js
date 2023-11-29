import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Bed from '../Assets/Images/bed.png';
import Plus from '../Assets/Images/Create-button.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Room from '../Assets/Images/Room.png';


function BedDetails() {
  const [floors, setFloors] = useState([
    {
      name: 'Ground Floor',
      rooms: [
        { name: 'G001', beds: ['BED 1', 'BED 2', 'BED 3', 'BED 4'] },
        { name: 'G002', beds: ['BED 1', 'BED 2', 'BED 3'] },
      ],
    },
  ]);

  const filteredRooms = floors.filter((floor) => floor.name === 'Ground Floor');

  return (
    <div className="" style={{ width: "100%" }}>
      {filteredRooms.map((floor) => (
        <div key={floor.name} className="row" style={{ backgroundColor: "", padding: 50 }}>
          {floor.rooms.map((room) => (
            <>
              <div className='col-lg-2 col-md-6 col-xs-12 col-sm-12 mb-3'>
                <div key={room.name} className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>
                  <div className="card-header d-flex justify-content-between p-2">
                    <strong style={{ fontSize: "13px" }}>ROOM-{room.name}</strong>
                    <FaAngleRight style={{ height: "15px", width: "15px", color: "grey" }} />
                  </div>
                  <div className="card-body">
                    <p className="card-title text-center">({room.beds.length}) Beds</p>
                    <div className="row row-gap-3 pe-3">
                      {room.beds.map((bed, index) => (
                        <div key={index} className="col-4">
                          <div className="card text-bg-light text-center align-items-center justify-content-center pt-3" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                            <img src={Bed} style={{ height: "100px", width: "29px", color: "gray" }} className="img-fluid mb-0" alt="Room" />
                            <p style={{ marginTop: "2px", fontSize: "10px" }}>{bed}</p>
                          </div>
                        </div>
                      ))}
                      <div className="col-4">
                        <div className="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }}>
                          <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt="Room" />
                          <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} className="mb-0">Create Room</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </>
          )

          )}
          <div className='col-lg-2 col-md-6 col-xs-12 col-sm-12 mb-3'>
            <div className="card d-flex justify-content-center align-items-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", height: "234px" }} id="card-hover">
              <div className="">
                <img src={Plus} height="18" width="16" alt="Plus" />
              </div>
              <div className="">
                <p style={{ color: "#1F75FE", paddingLeft: "", fontSize: "15px" }}>Create Room</p>
              </div>
            </div>

          </div>

        </div>
      ))}




    </div>
  );
}

export default BedDetails;
