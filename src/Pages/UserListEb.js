import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";


function UserEb(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch();


  useEffect(() => {
    if (props.id) {
      dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: props.id } })
      // setAmnityuserdetail(state.UsersList?.customerdetail.all_amenities)
    }
    console.log("userIduserId", props.id)
  }, [props.id]);

  const EbrowsPerPage = 10;

  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);



  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;
  const currentRowsEb = EbFilterddata?.slice(indexOfFirstRowEb, indexOfLastRowEb);
  console.log("currentRowsEb", currentRowsEb)
  const handleEbPageChange = (EbpageNumber) => {
    setEbCurrentPage(EbpageNumber);
  };
  const totalPagesEb = Math.ceil(EbFilterddata?.length / EbrowsPerPage);
  const renderPageNumbersEb = () => {
    const pageNumbersEb = [];
    let startPageEb = EbcurrentPage - 1;
    let endPageEb = EbcurrentPage + 1;

    if (EbcurrentPage === 1) {
      startPageEb = 1;
      endPageEb = 3;
    }

    if (EbcurrentPage === totalPagesEb) {
      startPageEb = totalPagesEb - 2;
      endPageEb = totalPagesEb;
    }

    if (EbcurrentPage === 2) {
      startPageEb = 1;
      endPageEb = 3;
    }

    if (EbcurrentPage === totalPagesEb - 1) {
      startPageEb = totalPagesEb - 2;
      endPageEb = totalPagesEb;
    }

    for (let i = startPageEb; i <= endPageEb; i++) {
      if (i > 0 && i <= totalPagesEb) {
        pageNumbersEb.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === EbcurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === EbcurrentPage ? 'transparent' : 'transparent',
                border: i === EbcurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleEbPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersEb;
  };

  useEffect(() => {
    setEbFilterddata(state.UsersList.customerdetails.eb_data)
  }, [state.UsersList.customerdetails.eb_data])
  return (
    <>

      <div>

        <div>
          <Table className="ebtable mt-3" responsive  >
            <thead style={{ backgroundColor: "#E7F1FF" }}>
              <tr >

                <th style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Floor</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Room</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Start meter</th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>End meter</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Date</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>unit</th>
                {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Units used</th> */}
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amount</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>
              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" }}>
              {currentRowsEb?.map((u) => {
                let Dated = new Date(u.Date);
                console.log("Dated..?", Dated);

                let day = Dated.getDate();
                let month = Dated.getMonth() + 1; // Months are zero-based
                let year = Dated.getFullYear();

                let formattedDate = `${day}/${month}/${year}`;
                console.log("Formatted Date:", formattedDate);
                return (
                  <tr key={u.id} style={{ lineHeight: "20px" }}>

                    <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Floor_Id}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Room_No}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{u.start_Meter_Reading}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.end_Meter_Reading}</td>
                    <td> <span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td>
                    {/* <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td> */}
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.pay_eb_amount}</td>
                    <td style={{ cursor: "pointer" }}>
                      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                      </div>
                      {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                    </td>

                  </tr>
                )

              })}
              {currentRowsEb?.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                </tr>
              )}

            </tbody>
          </Table>

        </div>

        {currentRowsEb?.length > 0 && (

          <nav>
            <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
              <li style={{ margin: '0 5px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    textDecoration: 'none',
                    color: EbcurrentPage === 1 ? '#ccc' : '#007bff',
                    cursor: EbcurrentPage === 1 ? 'not-allowed' : 'pointer',
                    borderRadius: '5px',
                    display: 'inline-block',
                    minWidth: '30px',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    border: "none"
                  }}
                  onClick={() => handleEbPageChange(EbcurrentPage - 1)}
                  disabled={EbcurrentPage === 1}
                >
                  {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                  <ArrowLeft2
                    size="16"
                    color="#1E45E1"
                  />
                </button>
                <span
                  onClick={() => handleEbPageChange(EbcurrentPage - 1)}
                  style={{
                    marginTop: '20px',
                    cursor: EbcurrentPage === 1 ? 'not-allowed' : 'pointer',
                    color: EbcurrentPage === 1 ? '#ccc' : '#007bff'
                  }}
                >
                  Previous
                </span>
              </li>
              {EbcurrentPage > 3 && (
                <li style={{ margin: '0 5px' }}>
                  <button
                    style={{
                      padding: '5px 10px',
                      textDecoration: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      display: 'inline-block',
                      minWidth: '30px',
                      textAlign: 'center',
                      backgroundColor: 'transparent',
                      border: "none"

                    }}
                    onClick={() => handleEbPageChange(1)}
                  >
                    1
                  </button>
                </li>
              )}
              {EbcurrentPage > 3 && <span>...</span>}
              {renderPageNumbersEb()}
              {EbcurrentPage < totalPagesEb - 2 && <span>...</span>}
              {EbcurrentPage < totalPagesEb - 2 && (
                <li style={{ margin: '0 5px' }}>
                  <button
                    style={{
                      padding: '5px 10px',
                      textDecoration: 'none',

                      cursor: 'pointer',
                      borderRadius: '5px',
                      display: 'inline-block',
                      minWidth: '30px',
                      textAlign: 'center',
                      backgroundColor: 'transparent',
                      border: "none"

                    }}
                    onClick={() => handleEbPageChange(totalPagesEb)}
                  >
                    {totalPagesEb}
                  </button>
                </li>
              )}
              <li style={{ margin: '0 5px' }}>
                <span
                  onClick={() => handleEbPageChange(EbcurrentPage + 1)}
                  style={{
                    marginTop: '20px',
                    cursor: EbcurrentPage === totalPagesEb ? 'not-allowed' : 'pointer',
                    color: EbcurrentPage === totalPagesEb ? '#ccc' : '#007bff'
                  }}
                >
                  Next
                </span>
                <button
                  style={{
                    padding: '5px 10px',
                    textDecoration: 'none',
                    color: EbcurrentPage === EbcurrentPage ? '#ccc' : '#007bff',
                    cursor: EbcurrentPage === EbcurrentPage ? 'not-allowed' : 'pointer',
                    borderRadius: '5px',
                    display: 'inline-block',
                    minWidth: '30px',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    border: "none"
                  }}
                  onClick={() => handleEbPageChange(EbcurrentPage + 1)}
                  disabled={EbcurrentPage === totalPagesEb}
                >
                  {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
                  <ArrowRight2
                    size="16"
                    color="#1E45E1"
                  />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}
export default UserEb;