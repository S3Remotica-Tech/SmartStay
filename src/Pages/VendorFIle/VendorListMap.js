import React, { useState, useEffect, useRef } from "react";
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from "../../Assets/Images/New_images/trash.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Vendors from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import { Edit } from "iconsax-react";
import PropTypes from "prop-types";

function VendorListMap(props) {
  const [showDots, setShowDots] = useState(null);

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

  return (
    <>
      <Card
        className="h-100 animated-text ms-0"
        key={props.vendor && props.vendor.id}
        style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}
      >
        <Card.Body style={{ padding: 20 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-2">
              <div className="">
                <Image
                  src={
                    props.vendor && props.vendor.Vendor_profile
                      ? props.vendor.Vendor_profile
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
                    {props.vendor && props.vendor.Vendor_Name}
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
                    {props.vendor && props.vendor.Business_Name}
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
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#F9F9F9",
                      position: "absolute",
                      right: 0,
                      top: 50,
                      width: 120,
                      height: 92,
                      border: "1px solid #EBEBEB",
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "15px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      className="gap-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: props.vendorEditPermission
                          ? "not-allowed"
                          : "pointer",
                        pointerEvents: props.vendorEditPermission
                          ? "none"
                          : "auto",
                        opacity: props.vendorEditPermission ? 0.5 : 1,
                      }}
                      onClick={() => {
                        if (!props.vendorEditPermission) {
                          handleEdit(props.vendor);
                        }
                      }}
                    >
                      <Edit size="16" color="#1E45E1" />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "#222222",
                          cursor: props.vendorEditPermission
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        Edit
                      </label>
                    </div>

                    <div
                      className="gap-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: props.vendorDeletePermission
                          ? "not-allowed"
                          : "pointer",
                        pointerEvents: props.vendorDeletePermission
                          ? "none"
                          : "auto",
                        opacity: props.vendorDeletePermission ? 0.5 : 1,
                      }}
                      onClick={() => {
                        if (!props.vendorDeletePermission) {
                          handleDelete(props.vendor);
                        }
                      }}
                    >
                      <img
                        src={Delete}
                        alt="Delete"
                        style={{ height: 16, width: 16 }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "#FF0000",
                          cursor: props.vendorDeletePermission
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        Delete
                      </label>
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
                    fontSize: 12,
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
                  props.vendor.Vendor_Email &&
                  props.vendor.Vendor_Email !== "undefined"
                    ? props.vendor.Vendor_Email
                    : "N/A"}
                </label>
              </div>
            </div>
            <div className="mb-2" style={{ lineHeight: 1 }}>
              <div className="pb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
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
                  {/* +{props.vendor && props.vendor.Vendor_Mobile} */}+
                  {props.vendor &&
                    String(props.vendor.Vendor_Mobile).slice(
                      0,
                      String(props.vendor.Vendor_Mobile).length - 10
                    )}{" "}
                  {props.vendor &&
                    String(props.vendor.Vendor_Mobile).slice(-10)}
                </label>
              </div>
            </div>
          </div>

          <div className="mb-2" style={{ lineHeight: 1 }}>
            <div className="pb-1">
              <label
                style={{
                  color: "#939393",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                {" "}
                Address
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
                {props.vendor && props.vendor.Vendor_Address} {""}{" "}
                {props.vendor.Country} {""} {props.vendor.Pincode}
              </label>
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
