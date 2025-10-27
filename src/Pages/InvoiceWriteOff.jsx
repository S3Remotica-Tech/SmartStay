import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { CloseCircle, DocumentDownload } from "iconsax-react";
import Profile2 from "../Assets/Images/New_images/bank.png";
import homearrow from "../Assets/Images/New_images/bank.png";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";
import ErrorMessage from '../Components/ErrorMessage'


function WriteOffForm(props) {



  return (
    <>
      <Modal show={props.WriteoffForm} onHide={props.handleCloseWriteOffForm} centered >

        <Modal.Header
          style={{ marginBottom: "10px", position: "relative", borderBottom: "none" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Write-off
            </div>

            {/* Subtext description */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#555",
                marginTop: 2,
                fontFamily: "Gilroy",
              }}
            >
              Use when tenant has absconded and all pending dues must be written off.
            </div>
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={props.handleCloseWriteOffForm}
            style={{ cursor: "pointer", marginTop: "-10px" }}
          />
        </Modal.Header>

        <Modal.Body>


          <div className="d-flex align-items-center " style={{ marginTop: "-30px" }}>
            <img
              //    src={
              //   data?.user_profile && data?.user_profile !== "0"
              //     ? data?.user_profile
              //     : dataBed[0]?.profile && dataBed[0]?.profile !== "0"
              //     ? dataBed[0].profile
              //     : Profile2
              // }
              src={Profile2}

              style={{ height: 55, width: 55, cursor: "pointer" }}
              alt="profile"
              className="rounded-circle me-3"
            />
            <div>
              <p style={{ fontSize: "1.25rem", fontFamily: "Gilroy", fontWeight: 600 }} className="mb-0">
                {/* {data?.Name || dataBed[0]?.Name} */}Priya
              </p>
              <div className="d-flex mb-2">
                <span className="badge rounded-pill bg-warning text-dark me-2" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                  {/* {hostelData.floor_name} */}first_floor
                </span>
                <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                  {/* {hostelData["Room Name"]} - {hostelData["Bed Name"]} */} room_1 -bed_1
                </span>
              </div>
            </div>
            <div className="ms-auto text-end mt-2">
              <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, padding: 0, margin: 0, color: "blue" }}><img src={homearrow} alt="homearrow" width={16} height={16} /> Due Pending</p>
              <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600, }}>
                {/* {checkOutDate} */}1000
              </p>
            </div>
          </div>




          <>

          </>

          <Form.Group >
            <Form.Label style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400 }}>Reason/Write-off Note</Form.Label>
            <Form.Control
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, height: 52 }}
              as="textarea"
              placeholder="Please Enter Comments"
              rows={3}
            //     value={comments}
            //   onChange={handleCommentsChange}
            />
          </Form.Group>


        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", marginTop: "-10px" }}>
          <Button style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }} className="btn btn-light"
          //  onClick={handleClose}
          >
            Cancel
          </Button>
          <Button style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }} variant="primary">Conform</Button>
        </Modal.Footer>
      </Modal>






     
    </>
  )
}
export default WriteOffForm;