import PropTypes from "prop-types";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import { FiRepeat } from "react-icons/fi";
// import building from "../../../Assets/Images/New_images/building.svg";
import building from '/src/Assets/Images/New_images/building1.svg';
import Frame from "/src/Assets/Images/New_images/Frame.svg";
import Group from "/src/Assets/Images/New_images/Group.png";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";


function ConfirmChangeBed({ show, handleClose }) {
ConfirmChangeBed.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
  const [date, setDate] = useState("2025-07-31");
  const [rent, setRent] = useState("₹ 6000");

  return (


    <div>
      <Modal
        show={show}
        backdrop="static"
        style={{ marginTop: 50 }}
      >
        <Modal.Dialog
          style={{
            minWidth: 570,
            paddingRight: "10px",
            borderRadius: "30px",
            border: "none",
            boxShadow: "none",
          }}
          className="m-0 p-0"
        >
          <Modal.Header
            style={{ position: "relative" }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Confirm Change Bed
            </div>


          </Modal.Header>


          <Modal.Body className="pb-1 pt-3" style={{ minHeight: 350, height: 350, }} >

            <div className="d-flex justify-content-between align-items-start mb-3" >

              <div>
                <p className="mb-2" style={{ fontFamily: 'Gilroy' }}>Current Bed</p>


                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>Ground Floor</span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room G2</span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed D6</span>
                </p>

              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 33,
                  height: 33,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: "#EEF1FF",
                  gap: 10,
                  opacity: 1,
                  transform: "rotate(0deg)",
                  marginTop: 80
                }}
              >
                <FiRepeat size={20} color="#1E45E1" />
              </div>



              <div>
                <h6 className="mb-3" style={{ fontFamily: 'Gilroy' }}>New Bed</h6>
                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>Second Floor</span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room S2</span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed 08</span>
                </p>
              </div>
            </div>


            <div className="d-flex gap-3 mb-3 align-items-end" style={{ fontSize: 13 }}>

              <div className="flex-fill" style={{ minWidth: 160 }}>
                <Form.Label style={{ fontSize: 13, marginBottom: 4 }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ fontSize: 13, height: 40 }}
                />
              </div>

              <div className="flex-fill" style={{ minWidth: 160 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Form.Label style={{ fontSize: 13, marginBottom: 4 }}>New Rent Amount</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Same as Current"
                    className="ms-2 d-inline-block"
                    style={{ fontSize: 12, marginBottom: 0 }}
                  />
                </div>
                <Form.Control
                  type="text"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  style={{ fontSize: 13, height: 40 }}
                />
              </div>
            </div>




            <div className="d-flex gap-3 mt-4 ">
              <Button
                variant="light"
                className="px-4"
                style={{ border: "1px solid #ddd", width: "260px", backgroundColor: "white" }}
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                className="px-4"
                style={{
                  backgroundColor: "#0056FF",
                  borderRadius: "8px",
                  width: "260px"
                }}
              >
                <img src={repeatOne} alt="icon" className="me-2" />
                Assign
              </Button>

            </div>
          </Modal.Body>


        </Modal.Dialog>
      </Modal>
      
     


    </div>

  );
}

export default ConfirmChangeBed;


