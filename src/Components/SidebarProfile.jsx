/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "../Assets/Images/New_images/Icon.svg";
import Sms from "../Assets/Images/New_images/sms.svg";
import Rectangle from "../Assets/Images/New_images/Rectangle 1047.svg";
import Buildings from "../Assets/Images/New_images/buildings (1).svg";
import User from "../Assets/Images/New_images/user.svg";
import ArchieveTick from "../Assets/Images/New_images/ArchieveTick.svg";
import LogoutIcon from "../Assets/Images/New_images/logout.svg";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import { useSelector } from "react-redux";

function SidebarProfile({
  profiles,
  stateData,
  profilename,
  payingGuestName,
  showProfileCard,
  setShowProfileCard,
  handleShowLogout,
  handleShowsettingsGenaral,
  profileCardRef,
}) {
  const state = useSelector((state) => state);

  console.log("state.UsersList.hostelList", state.UsersList.hostelList)
  return (
    <Offcanvas
      show={showProfileCard}
      onHide={() => setShowProfileCard(false)}
      placement="end"
      // backdrop="static"
      ref={profileCardRef}
      style={{
        width: 350,
        fontFamily: "Gilroy",
        borderLeft: "1px solid #E5E7EB",
        borderRadius: 10,
      }}
    >
      <Offcanvas.Header className="gap-0 d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center gap-3">
          {profiles ? (
            <Image
              src={profiles}
              alt="profile"
              roundedCircle
              style={{ width: 56, height: 56, objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-semibold"
              style={{ width: 56, height: 56, fontFamily: "Gilroy" }}
            >
              {stateData?.accountList?.initial || ""}
            </div>
          )}

          <div>

            <div className="fw-semibold mb-2 fs-5">
              {[stateData?.accountList?.firstName || profilename, stateData?.accountList?.lastName]
                .filter(Boolean)
                .join(" ")}
            </div>


            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    backgroundColor: "#FFF3D9",
                    padding: 6,
                    borderRadius: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 26,
                    height: 24,
                  }}
                >
                  <img src={ArchieveTick} style={{ width: 15, height: 15, backgroundColor: "transparent" }} alt="icon" />
                </span>
                <span style={{ fontSize: 14, color: "black", fontWeight: 400, marginLeft: 5 }}>
                  {stateData?.accountList?.roleName}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          onClick={() => setShowProfileCard(false)}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
        // title="Close"
        >
          <img src={Icon} alt="close" />
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ fontFamily: "Gilroy", padding: 0, display: "flex", flexDirection: "column" }}>
        <div className="p-3" style={{ flex: 1, overflowY: "auto" }}>
          {/* Details */}
          <div className="d-flex flex-column gap-2 mb-3">
            {stateData?.accountList?.mailId && (
              <div className="d-flex align-items-center gap-2 text-secondary">
                <span><img src={Sms} alt="sms" style={{ width: 16, height: 16 }} /></span>
                <span className="small">{stateData?.accountList?.mailId}</span>
              </div>
            )}

            {stateData?.accountList?.mobileNo && (
              <div className="d-flex align-items-center gap-2 text-secondary">
                <span><img src={Rectangle} alt="sms" style={{ width: 16, height: 16 }} /></span>
                <span className="small">{stateData?.accountList?.mobileNo}</span>
              </div>
            )}

            {payingGuestName && (
              <div className="d-flex align-items-center gap-2 text-secondary">
                <span><img src={Buildings} alt="sms" style={{ width: 16, height: 16 }} /></span>
                <span className="small">
                  {payingGuestName}
                  {state.UsersList.hostelList.length > 2 && (
                    <span className="text-primary ms-1">
                      +{state.UsersList.hostelList.length - 2} more
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <hr />

          {/* View Profile */}
          <div
            className="d-flex align-items-center justify-content-between gap-2 p-2 rounded-3 cursor-pointer mb-2"
            role="button"
          // onClick={() => {
          //   setShowProfileCard(false);
          //   navigate("/profile");
          // }}
          >
            <div className="d-flex align-items-start gap-2" onClick={handleShowsettingsGenaral}>
              <div style={{
                backgroundColor: "#F6EFFF",

                borderRadius: 8,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
              }}
              >
                <span className="fs-5 text-primary"><img src={User} alt="sms" style={{ width: 18, height: 18 }} /></span>
              </div>
              <div>
                <div className="" style={{ fontSize: '13px' }}>View Profile</div>
                <div className="text-muted small" style={{ fontSize: '11px' }}>
                  Manage your Personal Information
                </div>
              </div>
            </div>
            <div style={{ fontSize: 20, color: "#999", marginTop: 2 }}>›</div>
          </div>

          {/* Logout */}
          <div
            role="button"
            onClick={() => {
              setShowProfileCard(false);
              handleShowLogout();
            }}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: "#FFF7F7",
              cursor: "pointer",
            }}
          >
            <img
              src={LogoutIcon}
              alt="logout"
              style={{
                width: 18,
                height: 18,
                display: "block",
              }}
            />

            <span
              style={{
                color: "#FF3B30",
                fontSize: 14,
                fontWeight: 500,
                lineHeight: "18px",
                fontFamily: "Gilroy",
              }}
            >
              Logout
            </span>
          </div>

        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Gilroy",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

          }}
        >
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            <img
              src={Smartstay}
              alt="smartstay"
              style={{ height: 19, width: 105 }}
              className="Title"
            />
          </div>

          <label style={{ color: "#222222", fontSize: 13 }}>v 2.0</label>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}


SidebarProfile.propTypes = {
  profiles: PropTypes.string,
  profilename: PropTypes.string,
  payingGuestName: PropTypes.string,

  showProfileCard: PropTypes.bool.isRequired,
  setShowProfileCard: PropTypes.func.isRequired,
  handleShowLogout: PropTypes.func.isRequired,
  handleShowsettingsGenaral: PropTypes.func.isRequired,
  profileCardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),

  stateData: PropTypes.shape({
    accountList: PropTypes.shape({
      initial: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      roleName: PropTypes.string,
      mailId: PropTypes.string,
      mobileNo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    }),
  }),
};

export default SidebarProfile;