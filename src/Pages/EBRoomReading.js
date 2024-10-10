import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table} from "react-bootstrap";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import squre from '../Assets/Images/New_images/minus-square.png';
import Image from "react-bootstrap/Image";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import Button from "react-bootstrap/Button";
import {
    Autobrightness,
    Call,
    Sms,
    House,
    Buildings,
    ArrowLeft2,
    ArrowRight2,
  } from "iconsax-react";

function EBRoomReading(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

console.log("state",state)
  useEffect(() => {
    dispatch({ type: "EBLIST" });
    dispatch({ type: "EBSTARTMETERLIST" });
  }, []);
  
  const electricityrowsPerPage = 5;
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;
  const currentRowelectricity = electricityFilterddata?.slice(
    indexOfFirstRowelectricity,
    indexOfLastRowelectricity
  );

  const handleElectricityPageChange = (InvoicepageNumber) => {
    setelectricitycurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(
    electricityFilterddata?.length / electricityrowsPerPage
  );

  const renderPageNumberselectricity = () => {
    const pageNumberselectricity = [];
    let startPageelectricity = electricitycurrentPage - 1;
    let endPageelectricity = electricitycurrentPage + 1;

    if (electricitycurrentPage === 1) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    if (electricitycurrentPage === 2) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice - 1) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    for (let i = startPageelectricity; i <= endPageelectricity; i++) {
      if (i > 0 && i <= totalPagesinvoice) {
        pageNumberselectricity.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === electricitycurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === electricitycurrentPage ? "transparent" : "transparent",
                border:
                  i === electricitycurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleElectricityPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumberselectricity;
  };

  useEffect(() => {
    setelectricityFilterddata(state.PgList?.EB_startmeterlist);
  }, [state.PgList?.EB_startmeterlist]);
  return (
  <>
    <div >
      {currentRowelectricity.length > 0 && (
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
          Room no
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
          Previous
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
          Current
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
          Dated
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
          Units
        </th>
        <th
          style={{
            textAlign: "center",
            fontFamily: "Gilroy",
            color: "#939393",
            fontSize: 14,
            fontWeight: 600,
            // borderTopRightRadius: 24
          }}
        >
          Amount
        </th>
        <th  style={{
            textAlign: "center",
            fontFamily: "Gilroy",
            color: "rgba(34, 34, 34, 1)",
            fontSize: 14,
            fontWeight: 600,
            borderTopRightRadius: 24
          }}> </th>
      </tr>
    </thead>
    <tbody style={{ fontSize: "12px" }}>
      {currentRowelectricity &&
        currentRowelectricity.map((v) => {
          const imageUrl = v.profile || Profile;
          let Dated = new Date(v.createAt);
          let day = Dated.getDate();
          let month = Dated.getMonth() + 1;
          let year = Dated.getFullYear();
          let formattedDate = `${day}/${month}/${year}`;

          return (
            <tr key={v.id}>
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
                    src={imageUrl}
                    alt={v.hoatel_Name || "Default Profile"}
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
                    {v.hoatel_Name}
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
                {v.Floor}
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
                {v.Room}
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
                {v.start_Meter_Reading}
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
                {v.end_Meter_Reading}
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
                  {formattedDate}
                </span>
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
                {v.Eb_Unit}
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
                {v.EbAmount}
              </td>
            </tr>
          );
        })}
    </tbody>
  </Table>
)}

  {state.PgList?.EB_startmeterlist?.length === 0 && (
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={emptyimg} alt="emptystate" />
      </div>
      <div
        className="pb-1"
        style={{
          textAlign: "center",
          fontWeight: 600,
          fontFamily: "Gilroy",
          fontSize: 24,
          color: "rgba(75, 75, 75, 1)",
        }}
      >
        No Active Electricity{" "}
      </div>
      <div
        className="pb-1"
        style={{
          textAlign: "center",
          fontWeight: 500,
          fontFamily: "Gilroy",
          fontSize: 20,
          color: "rgba(75, 75, 75, 1)",
        }}
      >
        There are no active Electricity{" "}
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          onClick={props.handleAddEbDetails}
          style={{
            fontSize: 16,
            backgroundColor: "#1E45E1",
            color: "white",
            height: 56,
            fontWeight: 600,
            borderRadius: 12,
            width: 200,
            padding: "18px, 20px, 18px, 20px",
            fontFamily: "Montserrat",
          }}
        >
          + Record Reading
        </Button>
      </div>
    </div>
  )}
</div>


        {currentRowelectricity.length > 0 && (
          <nav>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyleType: "none",
                padding: 0,
                justifyContent: "end",
              }}
            >
              <li style={{ margin: "0 5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    textDecoration: "none",
                    color: electricitycurrentPage === 1 ? "#ccc" : "#007bff",
                    cursor:
                      electricitycurrentPage === 1 ? "not-allowed" : "pointer",
                    borderRadius: "5px",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() =>
                    handleElectricityPageChange(electricitycurrentPage - 1)
                  }
                  disabled={electricitycurrentPage === 1}
                >
                  {" "}
                  <ArrowLeft2 size="16" color="#1E45E1" />
                </button>
              </li>
              {electricitycurrentPage > 3 && (
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handleElectricityPageChange(1)}
                  >
                    1
                  </button>
                </li>
              )}
              {electricitycurrentPage > 3 && <span>...</span>}
              {renderPageNumberselectricity()}
              {electricitycurrentPage < totalPagesinvoice - 2 && (
                <span>...</span>
              )}
              {electricitycurrentPage < totalPagesinvoice - 2 && (
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",

                      cursor: "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() =>
                      handleElectricityPageChange(totalPagesinvoice)
                    }
                  >
                    {totalPagesinvoice}
                  </button>
                </li>
              )}
              <li style={{ margin: "0 5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    textDecoration: "none",
                    color:
                      electricitycurrentPage === electricitycurrentPage
                        ? "#ccc"
                        : "#007bff",
                    cursor:
                      electricitycurrentPage === electricitycurrentPage
                        ? "not-allowed"
                        : "pointer",
                    borderRadius: "5px",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() =>
                    handleElectricityPageChange(electricitycurrentPage + 1)
                  }
                  disabled={electricitycurrentPage === totalPagesinvoice}
                >
                  <ArrowRight2 size="16" color="#1E45E1" />
                </button>
              </li>
            </ul>
          </nav>
        )}</>
  );
}
export default EBRoomReading;
