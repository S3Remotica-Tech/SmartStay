/* eslint-disable react-hooks/exhaustive-deps */
/* global APP_VERSION, BUILD_NUMBER */
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ThreeDots } from "react-bootstrap-icons";
import { NotificationBing, CloseCircle, Chart21 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import ComplaintsView from "../Pages/Compliants/ComplaintsView";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Notification({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [showComplaint, setShowComplaint] = useState(false);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "ALLNOTIFICATION",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.login?.Notification?.unreadCount > 0)
      setTimeout(() => {
        dispatch({
          type: "READNOTIFICATION",
          payload: state.login.selectedHostel_Id,
        });
      }, 5000);
  }, [state.login?.Notification?.unreadCount]);

  useEffect(() => {
    if (state.login.readNotificationSuccess === 200) {
      dispatch({
        type: "ALLNOTIFICATION",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({
        type: "PARTICULAR_HOSTEL_DETAILS",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_READ_NOTIFICATION" });
      }, 100);
    }
  }, [state.login.readNotificationSuccess]);

  useEffect(() => {
    if (state.login.notificationStatus === 200) {
      setNotification(state.login?.Notification);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL_NOTIFICATION_STATUS" });
      }, 100);
    }
  }, [state.login.notificationStatus]);

  function getDateLabel(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${monthNames[month - 1]} ${year}`;
  }

  const handleNavigateComplaintsView = (complaintId) => {
    setShowComplaint(true);
    if (complaintId) {
      dispatch({
        type: "COMPLAINTSVIEWUPDATES",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          complaintsId: complaintId,
        },
      });
    }
  };

  const handleCloseComplaintsView = () => {
    setShowComplaint(false);
  };

  const handleNavigateAmenitiesView = (customer) => {
    setShowComplaint(false);
    handleClose();
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: customer?.userId },
    });
    navigate(`/tenant/details/${customer.userId}`, {
      state: {
        customerId: customer?.userId,
        hostelId: state.login?.selectedHostel_Id,
        name: customer?.fullName,
        IsOverView: true,
        scrollTo: "amenities",
      },
    });
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{
          width: 350,
          fontFamily: "Gilroy",
        }}
      >
        <div className="flex h-full w-[350px] flex-col rounded-l-[10px] border-l border-[#E5E7EB] bg-white font-[Gilroy]">
          <div className="flex items-center justify-between gap-0 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#1E45E1] font-semibold text-[#1e293b]">
                <NotificationBing size={24} color="#FFFFFF" />
              </div>

              <div>
                <div className="text-[20px] font-semibold text-[#1F2633]">
                  Notifications
                </div>

                <div className="text-[13px] font-normal text-[#3C3C4399]">
                  {state.login?.Notification?.unreadCount || "0"} unread
                  notifications
                </div>
              </div>
            </div>

            <CloseCircle
              size={24}
              color="#FF0000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>

          <hr className="m-0 border border-[#ccc]" />

          <div className="flex-1 overflow-y-auto p-0">
            {notification?.listOfNotifications?.length > 0 ? (
              notification?.listOfNotifications?.map((item) => {
                return (
                  <div key={item.notificationId}>
                    <div className="my-[5px] pl-3 text-[12px] font-semibold text-[#4B4B4B]">
                      {getDateLabel(item?.requestedAt)}
                    </div>

                    <div className={item.isRead ? "bg-white" : "bg-[#EDF3FF]"}>
                      <div className="flex gap-3 rounded-[10px] px-[14px] py-3">
                        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] font-semibold text-[#44536A]">
                          {item.initials ? (
                            item.initials
                          ) : (
                            <Chart21 size={18} color="#73839B" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-[6px]">
                            <div className="flex-1 text-[14px] font-semibold">
                              {item.notificationTitle}
                            </div>

                            <div className="text-[12px]"></div>

                            <ThreeDots size={20} />
                          </div>

                          <div className="text-[12px] text-[#374151]">
                            {item.notificationDescription}
                          </div>

                          {item.isRead && (
                            <hr className="mb-1 mt-3 border border-[#ccc]" />
                          )}

                          {item.typeCode === 4 ? (
                            <button
                              onClick={() =>
                                handleNavigateComplaintsView(item.requestId)
                              }
                              className="mt-[10px] cursor-pointer rounded-[6px] border-none bg-[#1E45E1] px-4 py-[6px] text-[13px] text-white"
                            >
                              Review
                            </button>
                          ) : item.typeCode === 1 ? (
                            <button
                              onClick={() => handleNavigateAmenitiesView(item)}
                              className="mt-[10px] cursor-pointer rounded-[6px] border-none bg-[#1E45E1] px-4 py-[6px] text-[13px] text-white"
                            >
                              Amenities
                            </button>
                          ) : item.typeCode === 2 ? (
                            <button className="mt-[10px] cursor-pointer rounded-[6px] border-none bg-[#1E45E1] px-4 py-[6px] text-[13px] text-white">
                              Change Bed
                            </button>
                          ) : item.typeCode === 5 ? (
                            <button className="mt-[10px] cursor-pointer rounded-[6px] border-none bg-[#1E45E1] px-4 py-[6px] text-[13px] text-white">
                              Maintenance
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-[60px] text-center text-[15px] font-medium text-[#6B7280]">
                No notifications available
              </div>
            )}
          </div>

          <div className="sticky bottom-0 flex w-full items-center justify-between rounded-bl-[10px] rounded-br-[10px] border-t border-[#E5E7EB] bg-white px-4 py-3 font-[Gilroy]">
            <div className="text-[12px] text-[#6B7280]">
              <img
                src={Smartstay}
                alt="smartstay"
                className="Title h-[19px] w-[105px]"
              />
            </div>

            <label className="text-[13px] text-[#222222]">
              {" "}
              v {APP_VERSION} - ({BUILD_NUMBER})
            </label>
          </div>
        </div>
      </Offcanvas>

      {showComplaint && (
        <ComplaintsView
          show={showComplaint}
          handleClose={handleCloseComplaintsView}
        />
      )}
    </>
  );
}
Notification.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Notification;
