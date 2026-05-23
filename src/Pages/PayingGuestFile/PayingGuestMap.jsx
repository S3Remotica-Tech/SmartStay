/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
// import Vendors from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import { Edit, Trash } from "iconsax-react";
import PropTypes from "prop-types";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
function PayingGuestMap(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState(false);
  const [hoverPgCard, setHoverPgCard] = useState(false);
  const [pgDeleteError, setPgDeleteError] = useState("");
  const popupRef = useRef(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // const canReadPayingGuests = useHasPermission("Paying Guests", "canRead");
  // const canWritePayingGuests = useHasPermission("Paying Guests", "canWrite");
  // const canUpdatePayingGuests = useHasPermission("Paying Guests", "canUpdate");
  // const canDeletePayingGuests = useHasPermission("Paying Guests", "canDelete");

  const {
    // canWriteModule: canWritePayingGuests,
    canReadModule: canReadPayingGuests,
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");

  const handleEdit = (item) => {
    props.OnEditHostel(item);
  };

  const handleDeletePG = (item) => {
    dispatch({ type: "CLEAR_DELETE_PG_ERROR" });
    if (item) {
      dispatch({ type: "DELETEHOSTEL", payload: { hostelId: item.hostelId } });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.PgList.statusCodeDeleteHostel === 200) {
      dispatch({ type: "HOSTELLIST" });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_STATUS_CODE" });
      }, 1000);
    }
  }, [state.PgList.statusCodeDeleteHostel]);

  // const handleSelectedHostel = (selectedHostel) => {

  //   props.OnSelectHostel(selectedHostel);
  //   props.onRowVisiblity(false);
  // };

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
      setDeleteLoading(false);
      // setPgDeleteError(state.PgList.deletePgError);
    }
  }, [state.PgList?.deletePgError]);
  const handleClose = () => {
    setShow(false);
    setPgDeleteError("");
    dispatch({ type: "CLEAR_DELETE_PG_ERROR" });
  };

  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      setDeleteLoading(false);
      handleClose();
    }
  }, [state.PgList.deletePgSuccessStatusCode]);

  const handleMouseEnter = () => {
    setHoverPgCard(true);
  };

  const handleMouseLeave = () => {
    setHoverPgCard(false);
  };

  console.log("state.PgList", state.PgList.deletePgError);

  return (
    <>
      <Card
        className="animated-text h-100 p-0"
        key={props.hostel && props.hostel.hostelId}
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
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex gap-1 items-center">
              <div>
                {props.hostel &&
                props.hostel.mainImage !== undefined &&
                props.hostel.mainImage !== null &&
                props.hostel.mainImage !== "0" ? (
                  <Image
                    src={props.hostel.mainImage}
                    roundedCircle
                    className="h-[60px] w-[60px] object-cover"
                  />
                ) : (
                  <div className="h-[50px] w-[50px] rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center font-semibold text-[16px] uppercase">
                    {props.hostel?.initials}
                  </div>
                )}
              </div>
              <div>
                <div
                  className="pb-2"
                  // onClick={() =>
                  //   canWritePayingGuests && props.hostel?.isSubscriptionValid
                  //     ? handleSelectedHostel(props.hostel.hostelId)
                  //     : null
                  // }
                >
                  <label
                    className={`text-[14px] font-semibold font-[Gilroy] inline-block max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis align-middle ${
                      !props.hostel?.isSubscriptionValid
                        ? "text-gray-500"
                        : "text-[#1E45E1]"
                    }`}
                    title={props?.hostel?.name}
                  >
                    {props?.hostel?.name}
                  </label>
                </div>
                <div>
                  <div className="bg-[rgba(255,239,207,1)] font-medium w-fit p-[5px] rounded-[10px] text-[12px] font-[Gilroy] text-[rgba(34,34,34,1)]">
                    Paying Guest
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className={`h-[40px] w-[40px] rounded-full border border-[#EFEFEF] flex justify-center items-center relative cursor-pointer ${
                  showDots ? "bg-[#E7F1FF] z-[1000]" : "bg-white"
                }`}
                onClick={handleDotsClick}
              >
                <PiDotsThreeOutlineVerticalFill className="h-[20px] w-[20px]" />

                {showDots && (
                  <>
                    <div
                      ref={popupRef}
                      className="absolute bg-white w-[140px] border border-[#E0E0E0] rounded-[10px] flex flex-col items-start z-[1050] cursor-pointer top-0"
                      style={{
                        right:
                          window.innerWidth <= 331
                            ? "auto"
                            : window.innerWidth <= 420
                              ? 50
                              : window.innerWidth <= 576
                                ? 30
                                : 50,
                        left: window.innerWidth <= 331 ? 10 : "auto",
                      }}
                    >
                      <div
                        className={`flex gap-2 items-center w-full px-3 py-2 rounded-tl-[10px] rounded-tr-[10px] transition-colors duration-200 ease-in-out ${
                          !canUpdatePayingGuests
                            ? "opacity-50 cursor-not-allowed"
                            : "opacity-100 cursor-pointer"
                        }`}
                        onClick={
                          canUpdatePayingGuests &&
                          props.hostel?.isSubscriptionValid
                            ? () => handleEdit(props.hostel)
                            : undefined
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#F0F4FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <Edit
                          size="16"
                          color={!canUpdatePayingGuests ? "#A0A0A0" : "#1E45E1"}
                        />
                        <label
                          className={`text-[14px] font-semibold font-[Gilroy] mb-0 cursor-pointer ${
                            !canUpdatePayingGuests
                              ? "text-[#A0A0A0]"
                              : "text-[#1E45E1]"
                          }`}
                        >
                          Edit
                        </label>
                      </div>

                      <div className="h-[1px] bg-[#F0F0F0] w-full" />

                      <div
                        className={`flex gap-2 items-center w-full px-3 py-2 rounded-bl-[10px] rounded-br-[10px] transition-colors duration-200 ease-in-out ${
                          !canDeletePayingGuests
                            ? "opacity-50 cursor-not-allowed"
                            : "opacity-100 cursor-pointer"
                        }`}
                        onClick={
                          canDeletePayingGuests &&
                          props.hostel?.isSubscriptionValid
                            ? () => handleDelete(props.hostel)
                            : undefined
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#FFF3F3")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <Trash
                          size="16"
                          color={!canDeletePayingGuests ? "#A0A0A0" : "#FF0000"}
                        />
                        <label
                          className={`text-[14px] font-semibold font-[Gilroy] pt-1 ${
                            !canDeletePayingGuests
                              ? "text-[#A0A0A0] cursor-not-allowed"
                              : "text-[#FF0000] cursor-pointer"
                          }`}
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
          <hr className="border border-[#E7E7E7] my-2" />

          <div className="flex flex-col lg:flex-row gap-2 m-0">
            <div className="w-full lg:w-1/3">
              <Card className="pt-2 pl-3 m-0 border border-[#DCDCDC] !rounded-xl">
                <label className="text-[#222] text-[12px] font-medium font-gilroy">
                  Available Beds
                </label>

                <div>
                  <label className="text-[#222222] text-[20px] font-semibold font-gilroy text-left block">
                    {props.hostel?.noOfAvailableBeds || "0"}
                  </label>
                </div>
              </Card>
            </div>

            <div className="w-full lg:w-1/3">
              <Card className="pt-2 pl-3 m-0 border border-[#DCDCDC] !rounded-xl">
                <label className="text-[#222] text-[12px] font-medium font-gilroy">
                  Total Rooms
                </label>

                <div>
                  <label className="text-[#222222] text-[20px] font-semibold font-gilroy text-left block">
                    {props.hostel?.noOfRooms || "0"}
                  </label>
                </div>
              </Card>
            </div>

            <div className="w-full lg:w-1/3">
              <Card className="pt-2 pl-3 m-0 border border-[#DCDCDC] !rounded-xl">
                <label className="text-[#222] text-[12px] font-medium font-gilroy">
                  Occupied Beds
                </label>

                <div>
                  <label className="text-[#222222] text-[20px] font-semibold font-gilroy text-left  block">
                    {props.hostel?.noOfOccupiedBeds || "0"}
                  </label>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-between items-center flex-wrap mb-1 mt-1 ml-2">
            <div className="pb-1 leading-[1]">
              <div>
                <label className="text-black text-[11px] font-medium font-gilroy">
                  Email ID
                </label>
              </div>

              <div>
                <label className="text-[#222222] text-[14px] font-semibold font-gilroy">
                  {props.hostel.emailId && props.hostel.emailId !== "undefined"
                    ? props.hostel.emailId
                    : "N/A"}
                </label>
              </div>
            </div>

            <div className="pb-1 leading-[1]">
              <div>
                <label className="text-black text-[11px] font-medium font-gilroy">
                  Floor
                </label>
              </div>

              <div className="text-center">
                <label className="text-[#222222] text-[14px] font-semibold font-gilroy">
                  {props.hostel?.noOfFloors || "0"}
                </label>
              </div>
            </div>

            <div className="pb-1 leading-[1]">
              <div>
                <label className="text-black text-[11px] font-medium font-gilroy">
                  Contact Number
                </label>
              </div>

              <div className="text-center">
                <label className="text-[#222222] text-[14px] font-semibold font-gilroy">
                  {props.hostel &&
                    String(props.hostel.mobile).slice(
                      0,
                      String(props.hostel.mobile).length - 10,
                    )}{" "}
                  {props.hostel && String(props.hostel.mobile).slice(-10)}
                </label>
              </div>
            </div>
          </div>

          <div className="mb-2 w-full ml-2 leading-[1]">
            <div className="mb-1">
              <label className="text-black text-[11px] font-medium font-[Gilroy]">
                Address
              </label>
            </div>

            <div
              className="leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap block text-[14px] font-semibold font-[Gilroy]"
              title={[
                props.hostel?.houseNo,
                props.hostel?.street,
                props.hostel?.area,
                props.hostel?.landmark,
                props.hostel?.city,
                props.hostel?.pincode ? `- ${props.hostel.pincode}` : "",
                props.hostel?.state,
              ]
                .filter(Boolean)
                .join(", ")}
            >
              {(() => {
                const addressParts = [
                  props.hostel?.houseNo,
                  props.hostel?.street,
                  props.hostel?.area,
                  props.hostel?.landmark,
                ].filter(Boolean);

                const cityStatePin = [
                  props.hostel?.city,
                  props.hostel?.state,
                  props.hostel?.pincode ? `- ${props.hostel.pincode}` : "",
                ].filter(Boolean);

                return (
                  <>
                    {addressParts.length > 0 && (
                      <>
                        {addressParts.join(", ")}
                        <br />
                      </>
                    )}
                    {cityStatePin.length > 0 && (
                      <>
                        {cityStatePin.join(" ")}
                        <br />
                      </>
                    )}
                  </>
                );
              })()}
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
          <Modal.Header className="!border-b-0">
            <Modal.Title className="w-100 text-center mt-2 !text-lg !font-semibold !font-gilroy text-gray-800 mb-1">
              Delete paying guest?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center text-sm font-medium font-gilroy -mt-7">
            Are you sure you want to delete this paying guest?
          </Modal.Body>
          {/* {pgDeleteError && (
            <div className="flex justify-center items-center gap-2 ">
              <ErrorMessage message={pgDeleteError} type="error" />
            </div>
          )} */}

          <Modal.Footer className="!flex !justify-center !border-t-0 !gap-1 !w-full flex-nowrap">
            <Button
              onClick={handleClose}
              className="!px-14 !py-3.5 !rounded-md !border !border-[#1E45E1] !bg-[white] !text-[#1E45E1] !text-sm !font-semibold !font-gilroy"
            >
              Cancel
            </Button>

            <Button
              disabled={deleteLoading}
              onClick={() => handleDeletePG(props.hostel)}
              className={`
    !px-14 
    !py-3.5 
    !rounded-md 
    !border 
    !border-[#1E45E1] 
    !bg-[#1E45E1] 
    !text-white 
    !text-sm 
    !font-semibold 
    !font-gilroy
    !flex
    !items-center
    !justify-center
    !gap-2
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
            >
              {deleteLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
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
