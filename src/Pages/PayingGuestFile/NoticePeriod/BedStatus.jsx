/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types"; 
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import CalenderTick from "/src/Assets/Images/New_images/calendar-tick.png";
import Timer from "/src/Assets/Images/New_images/timer-pause.svg";
import logout from "/src/Assets/Images/New_images/logout.svg";

const CustomToggle = React.forwardRef(function CustomToggle({ onClick }, ref) {
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
      }}
    >
      <BsThreeDotsVertical size={16} />
    </div>
  );
});

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired, 
};

const BedStatusCard = () => {
  return (
    <div
      className="card shadow-sm rounded-4 p-4"
      style={{ width: "450px", height: "240px", border: "1px solid #eee" }}
    >
      <div className="d-flex justify-content-between align-items-start pb-2 mb-2 border-bottom">
        <div>
          <p className="fw-semibold m-0" style={{ fontFamily: 'Gilroy', fontSize: '18px', lineHeight: '100%' }}>
            Bed Status
          </p>
          <span className="text-primary" style={{ fontSize: "13px", fontFamily: 'Gilroy-Medium', color: '#1E45E1' }}>
            Room No G3 &nbsp; | &nbsp; Bed 9
          </span>
        </div>

        <Dropdown align="end">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />
          <Dropdown.Menu
            style={{
              borderRadius: "12px",
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.08)",
              minHeight: "100px",
              width: "10px",
            }}
          >
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "13px" }}
            >
              <img src={CalenderTick} alt="Re Check-in" style={{ width: 16, height: 16 }} />
              Re Check-in Bed
            </Dropdown.Item>

            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "13px" }}
            >
              <img src={Timer} alt="timer" style={{ width: 16, height: 16 }} />
              New Booking
            </Dropdown.Item>

            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "13px", color: "black" }}
            >
              <img src={logout} alt="Checkout" style={{ width: 16, height: 16 }} />
              Checkout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


      </div>

      <div className="mt-2">
        <p className="mb-2 fw-medium" style={{ fontSize: "13px", fontFamily: 'Gilroy', }}>
          Occupied by
        </p>
       
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="rounded-circle"
            width="35"
            height="35"
          />
          <div>
            <p
              className="mb-0 fw-semibold text-primary"
              style={{
                fontSize: "14px",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "Gilroy",
                color: "#1E45E1",
              }}
            >
              Rajesh
            </p>
            <p
              className="mb-0 text-dark"
              style={{
                fontSize: "14px",
                fontFamily: "Gilroy",
              }}
            >
              +91 98765 43210
            </p>
          </div>
        </div>

      </div>

      <div
        className="mt-3 text-center fw-medium"
        style={{
          color: "red",
          border: "1px solid red",
          borderRadius: "30px",
          padding: "8px 12px",
          fontSize: "13px",
        }}
      >
        Notice Period
      </div>
    </div>
  );
};

export default BedStatusCard;