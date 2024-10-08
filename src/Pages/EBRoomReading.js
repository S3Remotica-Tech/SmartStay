import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table} from "react-bootstrap";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import squre from '../Assets/Images/New_images/minus-square.png';
import Image from "react-bootstrap/Image";

function EBRoomReading() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  return (
    <div>
        <Table
  responsive ="md"
  className='Table_Design'
  style={{
    height: "auto",
    overflow: "visible",
    tableLayout: "auto",
    borderRadius: "24px",
    border: "1px solid #DCDCDC",
    

  }} 
  >
    <thead
      style={{
        color: "gray",
        fontSize: "11px",
        backgroundColor: "#E7F1FF",
      }}
    >
      <tr style={{ height: "30px" }}>
        <th
          style={{
            textAlign: "center",
            fontFamily: "Gilroy",
            color: "rgba(34, 34, 34, 1)",
            fontSize: 14,
            fontWeight: 600,
            borderTopLeftRadius: 24
          }}
        >
          <img src={squre} height={20} width={20} />
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Paying Guest
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Floor
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Room 
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Date
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
         Reading
        </th>
        <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
            borderTopRightRadius: 24
          }}
        >
          Units
        </th>
        {/* <th
          style={{
            color: "#939393",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Units
        </th>
        <th
          style={{
            textAlign: "center",
            fontFamily: "Gilroy",
            color: "rgba(34, 34, 34, 1)",
            fontSize: 14,
            fontWeight: 600,
            borderTopRightRadius: 24
          }}
        >
          Amount
        </th> */}
      </tr>
    </thead>
    <tbody style={{ fontSize: "12px" }}>
      {/* {currentRowelectricity &&
        currentRowelectricity.map((v) => { */}
          {/* const imageUrl = v.profile || Profile;
          let Dated = new Date(v.createAt);
          let day = Dated.getDate();
          let month = Dated.getMonth() + 1;
          let year = Dated.getFullYear();
          let formattedDate = `${day}/${month}/${year}`; */}

          {/* return ( */}
            <tr >
              <td
                style={{
                  padding: "10px",
                  border: "none",
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                }}
              >
                <img src={squre} height={20} width={20} />
              </td>
              <td
                style={{
                  border: "none",
                  padding: "10px",
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={Profile}
                    // alt={v.hoatel_Name || "Default Profile"}
                    roundedCircle
                    style={{
                      height: "40px",
                      width: "40px",
                      marginRight: "10px",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Profile;
                    }}
                  />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {/* {v.hoatel_Name} */}HOSTEL
                  </span>
                </div>
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom:"none"
                }}
              >
                {/* {v.Floor} */}FLOOR
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom:"none" 
                }}
              >
                {/* {v.Room} */}ROOM
              </td>


              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                   borderBottom:"none"
                }}
              >
                <span
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingTop: "5px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "5px",
                    borderRadius: "60px",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  {/* {formattedDate} */}DATE
                </span>
              </td>
             
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle", 
                   borderBottom:"none"
                }}
              >
                {/* {v.end_Meter_Reading} */}READING
              </td>
             
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                   borderBottom:"none"
                }}
              >
                {/* {v.Eb_Unit} */}UNIT
              </td>
          
            </tr>
          {/* ); */}
        {/* }) */}
        {/* } */}
    </tbody>
  </Table>
    </div>
  );
}
export default EBRoomReading;
