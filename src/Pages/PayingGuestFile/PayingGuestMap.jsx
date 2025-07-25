/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Vendors from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import { Edit, Trash } from "iconsax-react";
import PropTypes from "prop-types";

function PayingGuestMap(props) {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState(false);
  const [hoverPgCard, setHoverPgCard] = useState(false);
  const [pgDeleteError, setPgDeleteError] = useState("");
  const popupRef = useRef(null);

  const handleEdit = (item) => {
    props.OnEditHostel(item);
  };

  const handleDeletePG = (item) => {
    if (item) {
      dispatch({ type: "DELETEPG", payload: { hostel_Id: item.id } });
    }
  };

  const handleSelectedHostel = (selectedHostel) => {
    props.OnSelectHostel(selectedHostel);
    props.onRowVisiblity(false);
  };

  const handleDotsClick = () => {
    setShowDots(!showDots);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  const [show, setShow] = useState(false);

  const handleDelete = () => {
    setShow(true);
  };




  useEffect(() => {
    if (state.PgList?.deletePgError) {
      setPgDeleteError(state.PgList.deletePgError);
    }
  }, [state.PgList?.deletePgError]);
  const handleClose = () => {
    setShow(false);
    setPgDeleteError("");
    dispatch({ type: "CLEAR_DELETE_PG_ERROR" });
  };

  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      handleClose();
    }
  }, [state.PgList.deletePgSuccessStatusCode]);

  useEffect(() => {
    if (state.PgList?.deletePgError) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_ERROR" });
      }, 3000);
    }
  }, [state.PgList?.deletePgError]);

  const handleMouseEnter = () => {
    setHoverPgCard(true);
  };

  const handleMouseLeave = () => {
    setHoverPgCard(false);
  };

  return (
    <>
      <Card
        className="animated-text ms-0 h-100 p-0"
        key={props.hostel && props.hostel.id}
        style={{
          borderRadius: 16,
          border: hoverPgCard
            ? " 1px solid #1E45E1"
            : hoverPgCard
              ? "1px solid #9C9C9C"
              : "1px solid #E6E6E6",
          transition: "border 0.3s ease",
          height: "auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card.Body style={{ padding: 10 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-1 align-items-center">
              <div className="">
                <Image
                  src={
                    props.hostel &&
                      props.hostel.profile !== undefined &&
                      props.hostel.profile !== null &&
                      props.hostel.profile !== "0"
                      ? props.hostel.profile
                      : Vendors
                  }
                  roundedCircle
                  style={{ height: "60px", width: "60px" }}
                />
              </div>
              <div>
                <div
                  className="pb-2"
                  onClick={() => handleSelectedHostel(props.hostel.id)}
                >
                  <label
                    className="hover-hostel-name"
                    style={{
                      fontSize: 14,
                      color: "#1E45E1",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      textDecoration: "underline",
                    }}
                  >
                    {props.hostel && props.hostel.Name}
                  </label>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 239, 207, 1)",
                      fontWeight: 500,
                      width: "fit-content",
                      padding: 5,
                      borderRadius: 10,
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    Paying Guest
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  backgroundColor: showDots ? "#E7F1FF" : "#fff",
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  border: "1px solid #EFEFEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  zIndex: showDots ? 1000 : "auto",
                }}
                onClick={handleDotsClick}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />

                {showDots && (
                  <>
                    <div
                      ref={popupRef}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        position: "absolute",
                        right:
                          window.innerWidth <= 331
                            ? "auto"
                            : window.innerWidth <= 420
                              ? 50
                              : window.innerWidth <= 576
                                ? 30
                                : 50,
                        left: window.innerWidth <= 331 ? 10 : "auto",
                        top: 0,
                        width: 140,
                        border: "1px solid #E0E0E0",
                        borderRadius: 10,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        zIndex: 1050,
                      }}
                    >

                      <div
                        className="d-flex gap-2 align-items-center w-100"
                        onClick={
                          !props.editPermissionError
                            ? () => handleEdit(props.hostel)
                            : undefined
                        }
                        style={{
                          padding: "8px 12px",
                          width: "100%",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          pointerEvents: props.editPermissionError ? "none" : "auto",
                          opacity: props.editPermissionError ? 0.5 : 1,
                          cursor: props.editPermissionError ? "not-allowed" : "pointer",
                          transition: "background 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          !props.editPermissionError &&
                          (e.currentTarget.style.backgroundColor = "#F0F4FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <Edit
                          size="16"
                          color={props.editPermissionError ? "#A0A0A0" : "#1E45E1"}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            color: props.editPermissionError ? "#A0A0A0" : "#1E45E1",
                            cursor: "pointer",
                            marginBottom: 0,
                          }}
                        >
                          Edit
                        </label>
                      </div>


                      <div style={{ height: 1, backgroundColor: "#F0F0F0", width: "100%" }} />


                      <div
                        className="d-flex gap-2 align-items-center w-100"
                        onClick={
                          !props.editPermissionError
                            ? () => handleDelete(props.hostel)
                            : undefined
                        }
                        style={{
                          padding: "8px 12px",
                          width: "100%",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          pointerEvents: props.editPermissionError ? "none" : "auto",
                          opacity: props.editPermissionError ? 0.5 : 1,
                          cursor: props.editPermissionError ? "not-allowed" : "pointer",
                          transition: "background 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          !props.editPermissionError &&
                          (e.currentTarget.style.backgroundColor = "#FFF3F3")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <Trash
                          size="16"
                          color={props.editPermissionError ? "#A0A0A0" : "#FF0000"}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            color: props.editPermissionError ? "#A0A0A0" : "#FF0000",
                            cursor: "pointer",
                            marginBottom: 0,
                          }}
                        >
                          Delete
                        </label>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
          <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />

          <div className="row g-2  d-flex justify-content-between m-0">
            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100">
              <Card
                className="pt-2 ps-3  m-0"
                style={{
                  border: "1px solid  rgba(220, 220, 220, 1)",
                  borderRadius: 12,
                }}
              >
                <label
                  style={{
                    color: "#222",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Available Beds
                </label>
                <div className="">
                  <label
                    style={{
                      color: "#222222",
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      textAlign: "center",
                    }}
                  >
                    {props.hostel && props.hostel.Bed}
                  </label>
                </div>
              </Card>
            </div>
            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100">
              <Card
                className="pt-2 ps-3 m-0"
                style={{
                  border: "1px solid  rgba(220, 220, 220, 1)",
                  borderRadius: 12,
                }}
              >
                <label
                  style={{
                    color: "#222",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Total Rooms
                </label>
                <div className="">
                  <label
                    style={{
                      color: "#222222",
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      textAlign: "center",
                    }}
                  >
                    {props.hostel && props.hostel.roomCount}
                  </label>
                </div>
              </Card>
            </div>
            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100">
              <Card
                className="pt-2 ps-3 m-0"
                style={{
                  border: "1px solid  rgba(220, 220, 220, 1)",
                  borderRadius: 12,
                }}
              >
                <label
                  style={{
                    color: "#222",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Occupied Beds
                </label>
                <div className="">
                  <label
                    style={{
                      color: "#222222",
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {props.hostel && props.hostel.occupied_Bed}
                  </label>
                </div>
              </Card>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-1 mt-1 ms-2 flex-wrap">
            <div className="pb-1" style={{ lineHeight: 1 }}>
              <div className="pb-1">
                <label
                  style={{
                    color: "#000000",
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Email ID{" "}
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  {props.hostel.email_id &&
                    props.hostel.email_id !== "undefined"
                    ? props.hostel.email_id
                    : "N/A"}
                </label>
              </div>
            </div>

            <div className="pb-1" style={{ lineHeight: 1 }}>
              <div className="">
                <label
                  style={{
                    color: "#000000",
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Floor
                </label>
              </div>
              <div className="text-center">
                <label
                  style={{
                    color: "#222222",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  {" "}
                  {props.hostel && props.hostel.floorcount}
                </label>
              </div>
            </div>
            <div className="pb-1 ms-2" style={{ lineHeight: 1 }}>
              <div className="">
                <label
                  style={{
                    color: "#000000",
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    textAlign: "center",
                  }}
                >
                  Contact Number
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    textAlign: "center",
                    marginRight: 5,
                  }}
                >
                  +
                  {props.hostel &&
                    String(props.hostel.hostel_PhoneNo).slice(
                      0,
                      String(props.hostel.hostel_PhoneNo).length - 10
                    )}{" "}
                  {props.hostel &&
                    String(props.hostel.hostel_PhoneNo).slice(-10)}
                </label>
              </div>
            </div>

          </div>

          <div className="mb-2 col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12 ms-2" style={{ lineHeight: 1 }}>
            <div className="mb-1" style={{}}>
              <label
                style={{
                  color: "#000000",
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                {" "}
                Address
              </label>
            </div>

            <div
              style={{
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
              title={`
                        ${props.hostel?.Address || ""}
                        ${props.hostel?.area ? ", " + props.hostel.area : ""}
                        ${props.hostel?.city ? ", " + props.hostel.city : ""}
                        ${props.hostel?.pincode
                  ? " - " + props.hostel.pincode
                  : ""
                }
                        ${props.hostel?.state ? ", " + props.hostel.state : ""}
                      `}
            >
              {(
                props.hostel?.city ||
                props.hostel?.pincode ||
                props.hostel?.state) && (
                  <>
                    {props.hostel?.Address ? props.hostel.Address + ", " : ""}
                    {props.hostel?.area || ""}
                    {props.hostel?.landmark || ""}<br></br>
                    {props.hostel?.city ? props.hostel.city : ""}
                    {props.hostel?.pin_code
                      ? " - " + props.hostel.pin_code
                      : ""}{" "} {props.hostel?.state ? props.hostel.state : ""}
                    <br></br>

                  </>
                )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop="static"
          dialogClassName="custom-delete-modal"

        >
          <Modal.Header
            style={{
              borderBottom: "none",
            }}
          >
            <Modal.Title
              className="w-100 text-center mt-2"
              style={{
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "Gilroy",
                color: "#222222",
              }}
            >
              Delete paying guest?
            </Modal.Title>

          </Modal.Header>

          <Modal.Body
            className="text-center"
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Gilroy",
              marginTop: "-27px",
            }}
          >
            Are you sure you want to delete this paying guest?
          </Modal.Body>
          {pgDeleteError && (
            <div className="d-flex justify-content-center align-items-center gap-2 ">
              <MdError style={{ color: "red" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {pgDeleteError}
              </label>
            </div>
          )}
          <Modal.Footer
            className="d-flex justify-content-center"
            style={{ border: "none" }}
          >
            <Button
              className="me-2"
              onClick={handleClose}
              style={{
                width: "100%",
                maxWidth: 160,
                borderRadius: 8,
                height: 52,
                padding: "12px 20px",
                border: "1px solid rgba(36, 0, 255, 1)",
                backgroundColor: "#FFF",
                color: "rgba(36, 0, 255, 1)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "100%",
                maxWidth: 160,
                height: 52,
                borderRadius: 8,
                padding: "12px 20px",
                border: "1px solid rgba(36, 0, 255, 1)",
                backgroundColor: "rgba(36, 0, 255, 1)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
              onClick={() => handleDeletePG(props.hostel)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
PayingGuestMap.propTypes = {
  hostel: PropTypes.func.isRequired,
  OnEditHostel: PropTypes.func.isRequired,
  OnSelectHostel: PropTypes.func.isRequired,
  onRowVisiblity: PropTypes.func.isRequired,
  editPermissionError: PropTypes.func.isRequired,
};
export default PayingGuestMap;
