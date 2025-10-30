import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Vendors from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import { Edit, Trash } from "iconsax-react";
import PropTypes from "prop-types";
import "./VendorListMap.css";
import "./vendor.css";
import { useHasPermission } from '../../Utils/Permission';

function VendorListMap(props) {
  const [showDots, setShowDots] = useState(null);

  
 const {
     canWriteModule: canWriteVendor,
     canReadModule: canReadVendor,
     canUpdateModule: canUpdateVendor,
     canDeleteModule: canDeleteVendor,
   } = useHasPermission("Vendor");


  // const canUpdateVendor = useHasPermission("Vendor", "canUpdate")
  // const canDeleteVendor = useHasPermission("Vendor", "canDelete")

  

  const popupRef = useRef(null);

  const handleShowDots = () => {
    setShowDots(!showDots);
  };

  const handleEdit = (item) => {
    props.onEditVendor(item);
  };

  const handleDelete = (item) => {
    props.onDeleteVendor(item);
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




  const isValid = (value) => {
    return value !== null && value !== undefined && value !== "undefined" && value !== "";
  };


  return (
    <>
      <Card
        className="h-100 animated-text "
        key={props.vendor && props.vendor.id}
        style={{ borderRadius: 16, border: "1px solid #E6E6E6", marginTop: 20 }}
      >
        <Card.Body style={{ padding: 20 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-2">
              <div className="">
                <Image
                  src={
                    props.vendor && props.vendor.profilePic
                      ? props.vendor.profilePic
                      : Vendors
                  }
                  roundedCircle
                  style={{ height: "60px", width: "60px" }}
                />
              </div>
              <div>
                <div className="">
                  <label
                    style={{
                      fontSize: 16,
                      color: "#222222",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {props.vendor && props.vendor.fullName}
                  </label>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#FFEFCF",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      width: "fit-content",
                      padding: 5,
                      borderRadius: 10,
                      fontSize: 14,
                    }}
                  >
                    {props.vendor?.businessName || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
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
                  backgroundColor: showDots ? "#E7F1FF" : "white",
                }}
                onClick={() => handleShowDots(props.vendor.id)}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />

                {showDots && (
                  <div
                    ref={popupRef}
                    className="ven-popup showdots-btn"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#F9F9F9",
                      position: "absolute",
                      right: 45,
                      top: '-20px',
                      width: 160,
                      height: "auto",
                      border: "1px solid #EBEBEB",
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      alignItems: "flex-start",
                      zIndex: 1000,
                    }}
                  >
                    <div style={{ width: "100%", backgroundColor: "#F9F9F9", borderRadius: 10 }}>


                      <div
                        onClick={() => {
                          if (canUpdateVendor) {
                            handleEdit(props.vendor);
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (canUpdateVendor)
                            e.currentTarget.style.backgroundColor = "#EDF2FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "8px 12px",
                          width: "100%",
                          backgroundColor: "#F9F9F9",
                          cursor: !canUpdateVendor ? "not-allowed" : "pointer",
                                                   opacity: !canUpdateVendor ? 0.5 : 1,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      >
                        <Edit size="16" color={!canUpdateVendor ? "#A9A9A9" : "#1E45E1"} />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",

                            color: !canUpdateVendor ? "#A9A9A9" : "#222222",
                            cursor: !canUpdateVendor ? "not-allowed" : "pointer",
                          }}
                        >
                          Edit
                        </label>
                      </div>


                      <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                      <div
                        onClick={() => {
                          if (canDeleteVendor) {
                            handleDelete(props.vendor);
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (canDeleteVendor)
                            e.currentTarget.style.backgroundColor = "#FFF0F0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "8px 12px",
                          width: "100%",
                          backgroundColor: "#F9F9F9",
                          cursor: !canDeleteVendor ? "not-allowed" : "pointer",
                                                   opacity: !canDeleteVendor ? 0.5 : 1,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      >

                        <Trash
                          size="16"
                          color={!canDeleteVendor ? "#292828ff" : "red"}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",

                            color: !canDeleteVendor ? "#A9A9A9" : "#FF0000",
                            cursor:!canDeleteVendor ? "not-allowed" : "pointer",
                          }}
                        >
                          Delete
                        </label>
                      </div>
                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>
          <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />

          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="mb-2" style={{ lineHeight: 1 }}>
              <div className="pb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 13,
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
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  {props.vendor &&
                    props.vendor.emailId &&
                    props.vendor.emailId !== "undefined"
                    ? props.vendor.emailId
                    : "N/A"}
                </label>
              </div>
            </div>
            <div className="mb-2" style={{ lineHeight: 1 }}>
              <div className="pb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Contact Number
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >

                  {props.vendor && props.vendor.mobile && (
                    <>
                      +{props.vendor.mobile.slice(0, 2)} {props.vendor.mobile.slice(2)}
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>



          <div className="mb-2" style={{ lineHeight: 1 }}>
            <div className="d-flex justify-content-between flex-wrap">

              <div style={{ maxWidth: "75%" }}>
                <div className="pb-1">
                  <label
                    style={{
                      color: "#939393",
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Address
                  </label>
                </div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    wordBreak: "break-word",
                  }}
                >
                  <>
                    {isValid(props.vendor?.houseNo) && <>{props.vendor.houseNo}, </>}
                    {isValid(props.vendor?.area) && <>{props.vendor.area}, </>}
                    {isValid(props.vendor?.landMark) && <>{props.vendor.landMark}, </>}
                    {isValid(props.vendor?.city) && <>{props.vendor.city}, </>}
                    {isValid(props.vendor?.state) && <>{props.vendor.state}{props.vendor.country ? ' ' : ''},</>}

                    <br />

                    {props.vendor.country} - {isValid(props.vendor?.pinCode) && <>{props.vendor.pinCode}</>}
                  </>
                </label>
              </div>

            </div>
          </div>



        </Card.Body>
      </Card>
    </>
  );
}
VendorListMap.propTypes = {
  onEditVendor: PropTypes.func.isRequired,
  onDeleteVendor: PropTypes.func.isRequired,
  vendor: PropTypes.func.isRequired,
  vendorEditPermission: PropTypes.func.isRequired,
  vendorDeletePermission: PropTypes.func.isRequired,
};

export default VendorListMap;
