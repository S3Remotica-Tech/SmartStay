/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Table
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

function StayHistory({ show, handleClose }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [data,setData] = useState("")
  console.log("StayHistory",state)

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }
  }, [state.createAccount?.networkError]);

useEffect(()=>{
  if(state.UsersList.customerdetails.bedHistory){
setData(state.UsersList.customerdetails.bedHistory)
  }

},[state.UsersList.customerdetails.bedHistory])
console.log("setData",data)

  // const data = [
  //   { room: "A-101 / Bed 1", duration: "30 Mar 2025 – 03 May 2025", reason: "Room Maintenance", rent: "₹4,000" },
  //   { room: "B-205 / Bed 2", duration: "30 Mar 2025 – 03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹5,500" },
  //   { room: "C-310 / Bed 3", duration: "30 Mar 2025 – 03 May 2025", reason: "Shifting 5 to 2 Sharing", rent: "₹6000" },
  //   { room: "D-413 / Bed 6", duration: "03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹4000" },
  //       { room: "D-413 / Bed 6", duration: "03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹4000" },
  //           { room: "D-413 / Bed 6", duration: "03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹4000" },
  //               { room: "D-413 / Bed 6", duration: "03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹4000" },
  //                   { room: "D-413 / Bed 6", duration: "03 May 2025", reason: "Shifting 2 to 3 Sharing", rent: "₹4000" },




  // ];

  return (
    <div className="modal show" style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}>
      <Modal show={show} onHide={handleClose} centered backdrop="static" >
       <Modal.Dialog
                 className="m-0 p-0"
                 style={{ margin: "0 0px" }}
               >
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>
              Stay Details
            </Modal.Title>
            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>

          <Modal.Body  style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll pt-1 ps-3  mt-2 me-0" >
            <div style={{ border: "1px solid #D9E8F4", borderRadius: 8, overflow: "hidden" }}>
              <Table responsive bordered={false} className="m-0">
                <thead style={{ backgroundColor: "#E9F5FE" }}>
                  <tr>
                    <th style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: "#222",
                      padding: "12px 16px",
                      whiteSpace:"nowrap"
                      
                    }}>
                      Room No / Bed
                    </th>
                    <th style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: "#222",
                      padding: "12px 16px",
                      whiteSpace:"nowrap"
                    }}>
                      Duration
                    </th>
                    <th style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: "#222",
                      padding: "12px 16px",
                      whiteSpace:"nowrap"
                    }}>
                      Reason
                    </th>
                    <th style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: "#222",
                      padding: "12px 16px",
                      whiteSpace:"nowrap"
                    }}>
                      Segmental Rent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && data.map((row, index) =>  (
                    <tr key={index} style={{ borderBottom: "1px solid #E0E0E0" }}>
                      <td style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: "#222",
                        padding: "12px 16px",
                        verticalAlign: "middle",
                        whiteSpace:"nowrap"
                      }}>
                        {row.roomName}/{row.bedName}
                      </td>
                      <td style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: "#222",
                        padding: "12px 16px",
                        verticalAlign: "middle",
                        whiteSpace:"nowrap"
                      }}>
                      {`${dayjs(row.startDate, "DD/MM/YYYY").format("DD MMM YYYY")} - ${
  row.endDate === "Till date"
    ? "Till date"
    : dayjs(row.endDate, "DD/MM/YYYY").format("DD MMM YYYY")
}`}
                         {/* {dayjs(row.startDate).format("DD MMM YYYY")}
  {row.endDate !== "Till date" && (
    <> - {dayjs(row.endDate).format("DD MMM YYYY")}</>
  )} */}
                      </td>
                      <td style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: "#222",
                        padding: "12px 16px",
                        verticalAlign: "middle",
                        whiteSpace:"nowrap"
                      }}>
                       {row.reason ? row.reason : "N/A"}
                      </td>
                      <td style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: "#222",
                        padding: "12px 16px",
                        verticalAlign: "middle",
                        whiteSpace:"nowrap"
                      }}>
                        {row.rentAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>

          
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
StayHistory.propTypes = {
  show: PropTypes.func.isRequired,
 handleClose: PropTypes.func.isRequired,
  
};
export default StayHistory;
