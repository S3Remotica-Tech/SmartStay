/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import arrowSwap from "../../Assets/Images/New_images/arrow-swap.svg";
import Group from "../../Assets/Images/New_images/Group.svg";
import { CloseCircle } from "iconsax-react";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import building from '/src/Assets/Images/New_images/building1.svg';
import Form from "react-bootstrap/Form";
import PaginationList from "../../Components/PaginationList";
import EB_RoomOverview from "./EB_RoomOverview";




const RoomReadingTable = () => {


  const [activeTab, setActiveTab] = useState("customer");

  const data = [
    {
      floor: "Ground floor",
      room: "Room 001",
      occupants: 3,
      billingMonth: "Aug",
      previous: 100,
      current: 400,
      units: 300,
      amount: "₹0.00",
      note: "EB reading was already entered for this room.",
    },
    {
      floor: "Ground floor",
      room: "Room 002",
      occupants: 3,
      billingMonth: "Aug",
      previous: 220,
      current: 440,
      units: 220,
      amount: "₹2,200",
    },
    {
      floor: "Ground floor",
      room: "Room 003",
      occupants: 2,
      billingMonth: "Aug",
      previous: 270,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "Ground floor",
      room: "Room 004",
      occupants: 3,
      billingMonth: "Aug",
      previous: 300,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "Ground floor",
      room: "Room 005",
      occupants: 2,
      billingMonth: "Aug",
      previous: 120,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "1st floor",
      room: "Room 101",
      occupants: 2,
      billingMonth: "Aug",
      previous: 250,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "1st floor",
      room: "Room 102",
      occupants: 3,
      billingMonth: "Aug",
      previous: 234,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "1st floor",
      room: "Room 103",
      occupants: 3,
      billingMonth: "Aug",
      previous: 213,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "1st floor",
      room: "Room 104",
      occupants: 3,
      billingMonth: "Aug",
      previous: 220,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
    {
      floor: "1st floor",
      room: "Room 105",
      occupants: 1,
      billingMonth: "Aug",
      previous: 120,
      current: "---",
      units: "---",
      amount: "₹0.00",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [roomDetail, setRoomDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);


  const handleRoomDetailsPage = (room) => {
    setSelectedRoom(room);
    setRoomDetail(true);
  };

  const handleBack = () => {
    setRoomDetail(false);
  };

  const handleActionClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);


  return (


    <>
      {!roomDetail ? (
        <div className="container-fluid p-4" style={{ fontFamily: "Gilroy" }}>
          <div className="mb-4">
            <label
              style={{
                fontSize: 18,
                color: "#000",
                fontWeight: 600,
                marginRight: "16px",
              }}
            >
              Electricity
            </label>
          </div>

          <div className="d-flex align-items-center mb-3">
            <div
              className="d-flex"
              style={{ marginLeft: "2px", marginTop: "-10px" }}
            >
              <div
                onClick={() => setActiveTab("customer")}
                style={{
                  fontSize: 17,
                  fontFamily: "Gilroy",
                  color: activeTab === "customer" ? "black" : "#4B4B4B",
                  fontWeight: activeTab === "customer" ? "semibold" : "normal",
                  textTransform: "none",
                  cursor: "pointer",
                  marginRight: 24,
                  paddingBottom: 6,
                  borderBottom:
                    activeTab === "customer"
                      ? "2px solid #1E45E1"
                      : "2px solid transparent",
                }}
              >
                Room Reading
              </div>
              <div
                onClick={() => setActiveTab("room")}
                style={{
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  color: activeTab === "room" ? "black" : "#4B4B4B",
                  fontWeight: activeTab === "customer" ? "semibold" : "normal",
                  textTransform: "none",
                  cursor: "pointer",
                  paddingBottom: 6,
                  borderBottom:
                    activeTab === "room"
                      ? "2px solid #1E45E1"
                      : "2px solid transparent",
                }}
              >
                Tenant Reading
              </div>
            </div>
            <div className="ms-auto d-flex gap-2 me-2">
              <div className="ms-auto d-flex gap-3 me-2 p-1" style={{ backgroundColor: "white", borderRadius: 5, padding: 6, boxShadow: "0px 2px 2px rgba(0,0,0,0.2)" }}>
                <img src={searchteam} height="20" width="20" alt="search" />
              </div>

              <div className="ms-auto d-flex gap-3 me-2 p-1" style={{ backgroundColor: "white", borderRadius: 5, padding: 6, boxShadow: "0px 2px 2px rgba(0,0,0,0.2)" }}>
                <FiFilter size={20} style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>

          <div
            className="table-responsive"
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
              maxHeight: "420px",
              overflowY: "auto",
            }}
          >
            <Table bordered={false} className="align-middle mb-0">
              <thead
                style={{
                  backgroundColor: "rgba(231, 241, 255, 1)",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                <tr className="text-uppercase">
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                    FLOOR <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                  </th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                    ROOM <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                  </th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>OCCUPANTS</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>BILLING MONTH</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>PREVIOUS</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>CURRENT</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>TOTAL UNITS</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>AMOUNT</th>
                  <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>ACTION</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 14, color: "#000" }}>
                <PaginationList>
                  {data.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>
                      <td style={{ fontSize: 15, fontWeight: 600 }}>{row.floor}</td>
                      <td
                        style={{ color: "#1E45E1", cursor: "pointer", fontWeight: 500 }}
                        onClick={() => handleRoomDetailsPage(row.room)}
                      >
                        {row.room}
                      </td>
                      <td style={{ paddingLeft: "40px" }}>{row.occupants}</td>
                      <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                      <td style={{ paddingLeft: "40px" }}>{row.previous}</td>
                      <td style={{ paddingLeft: "40px" }}>{row.current}</td>
                      <td style={{ paddingLeft: "40px" }}>{row.units}</td>
                      <td style={{ paddingLeft: "30px" }}>{row.amount}</td>
                      <td style={{ paddingLeft: "40px" }}>
                        <img
                          src={Group}
                          alt="action"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleActionClick(row)}
                        />
                      </td>
                    </tr>
                  ))}
                </PaginationList>
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <EB_RoomOverview room={selectedRoom} onBack={handleBack} />
      )}

      
      {showModal && selectedRow && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>

          <Modal.Header className="d-flex justify-content-between align-items-center" style={{ borderBottom: "none" }}>
            <Modal.Title
              style={{
                fontFamily: 'Gilroy, sans-serif',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '20px',
              }}>
              Add Room Reading
            </Modal.Title>

            <CloseCircle
              size={26}
              color="black"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Modal.Header>
          <Modal.Body >

            <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", borderBottom: "1px solid #E0E0E0", paddingBottom: 10, marginTop: "-15px" }}>
              <div className="d-flex align-items-center">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#E7F1FF",
                    borderRadius: "50%",
                    width: 46,
                    height: 46,
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <img
                    src={electricity}
                    alt="electricity"
                    style={{ width: 20, height: 20 }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: 14,
                    color: "#222",
                    fontWeight: 600,
                  }}
                >
                  {selectedRow.room}
                  <div className="d-flex justify-content-start align-items-center" style={{ gap: 6, marginTop: 4 }}>
                    <img src={building} height="14" width="14" alt="Ground Floor" />
                    <div style={{ color: "#4B4B4B", fontSize: 12 }}>{selectedRow.floor}</div>
                  </div>
                </span>
              </div>


            </div>

            <Form.Group className="mt-4">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 5
                }}
              >
                <Form.Label
                  style={{
                    fontFamily: 'Gilroy',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    marginBottom: 0,
                    padding: 0
                  }}
                >
                  Current Reading
                </Form.Label>

                <span
                  style={{
                    fontFamily: 'Gilroy',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    color: "gray"
                  }}
                >
                  Last Reading: <span style={{ color: '#1E45E1' }}>310.12</span>
                </span>
              </div>

              <Form.Control
                style={{ marginTop: 10, fontSize: 14, fontWeight: 600, padding: "12px 14px" }}
                type="number"
                placeholder="471.55"
              />
            </Form.Group>


          </Modal.Body>
          <Modal.Footer style={{ border: 'none' }}>
            <Button style={{ backgroundColor: "transparent", border: "none", color: "black" }} onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#1E45E1", width: '130px' }}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>

  );
};

export default RoomReadingTable;

