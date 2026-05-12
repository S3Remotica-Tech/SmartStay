/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { Offcanvas, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import arrowSwap from "../../Assets/Images/New_images/arrow-swap.svg";
import Group from "../../Assets/Images/New_images/Group.svg";
import { CloseCircle, ArrowUp2, ArrowDown2, Flash } from "iconsax-react";
import PaginationList from "../../Components/PaginationList";
import EB_RoomOverview from "./EB_RoomOverview";
// import Ellipse1 from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import EB_TenantOverview from "./EB_TenantOverview";
import { useDispatch, useSelector } from "react-redux";
import AddRoomReading from "./AddRoomReading";
import { useHasPermission } from "../../Utils/Permission";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import ErrorMessage from "../../Components/ErrorMessage";
import Select from "react-select";
import AddHostelReading from "./AddHostelReading";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import DeleteReading from "./DeleteReading";

const RoomReadingTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("room");

  // const canReadElectricity = useHasPermission("Electricity", "canRead")
  // const canWriteElectricity = useHasPermission("Electricity", "canWrite");
  // const canUpdateElectricity = useHasPermission("Electricity", "canUpdate");
  // const canDeleteElectricity = useHasPermission("Electricity", "canDelete");

  const {
    canWriteModule: canWriteElectricity,
    canReadModule: canReadElectricity,
    canUpdateModule: canUpdateElectricity,
    canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Electricity");

  const isEbBased = state.UsersList?.getRoomReadingList?.isHostelBased;

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [roomDetail, setRoomDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tenantsDetail, setTenantsDetail] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [filterShow, setFilterShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomReadingList, setRoomReadingList] = useState([]);
  const [customerReadingList, setCustomerReadingList] = useState([]);
  const [showHostelModal, setShowHostelModal] = useState(false);
  const [showDots, setShowDots] = useState("");
  const [showDotsRoom, setShowDotsRoom] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState([]);
  const [showAbove, setShowAbove] = useState(false);
  const [editHostelReading, setEditHostelReading] = useState("");
  const [editRoomReading, setEditRoomReading] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState("");

  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
      setShowDotsRoom("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;

      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  useEffect(() => {
    if (!canReadElectricity) {
      setLoading(false);
    }
  }, [canReadElectricity]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 1000);
    }
  }, [state.UsersList?.accessRestrictionError]);
  useEffect(() => {
    if (roomReadingList.length === 0) {
      setLoading(false);
    }
  }, [roomReadingList]);

  const removeFilter = (item) => {
    setFilters(filters.filter((f) => f !== item));
  };

  const handleFilterClose = () => setFilterShow(false);
  const handleFilterShow = () => setFilterShow(true);

  const handleRoomDetailsPage = (room) => {
    setSelectedRoom(room);
    setRoomDetail(true);
  };
  const handleTenantsDetailsPage = (tenant) => {
    // console.log("")
    setSelectedTenant(tenant);
    setTenantsDetail(true);
  };

  const handleBack = () => {
    setRoomDetail(false);
  };
  const handleBackTenant = () => {
    setTenantsDetail(false);
    setSelectedTenant(null);
  };

  const handleActionClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    setEditRoomReading("");
  };

  const handleReadingDelete = (row) => {
    // console.log("delete", row)
    setShowDelete(true);
    setDeleteDetails(row);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleActionReadingClick = () => {
    setShowHostelModal(true);
    setEditHostelReading("");
  };

  const handleCloseShowModal = () => {
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    setShowModal(false);
  };
  const handleCloseHostelShowModal = () => {
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    setShowHostelModal(false);
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "GETROOMREADING",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({
        type: "GETCUSTOMERREADING",
        payload: state.login.selectedHostel_Id,
      });
      setLoading(true);
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.getRoomReadingStatus === 200) {
      setLoading(false);
      setRoomReadingList(state.UsersList?.getRoomReadingList?.listReadings);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_ROOM_READING" });
      }, 100);
    }
  }, [state.UsersList?.getRoomReadingStatus]);

  useEffect(() => {
    setLoading(false);
  }, [
    state.UsersList?.getRoomReadingList?.listReadings,
    state.UsersList?.getCustomerReadingList,
  ]);

  useEffect(() => {
    if (state.UsersList?.getCustomerReadingStatus === 200) {
      setLoading(false);
      setCustomerReadingList(state.UsersList?.getCustomerReadingList);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_CUSTOMER_READING" });
      }, 100);
    }
  }, [state.UsersList?.getCustomerReadingStatus]);

  useEffect(() => {
    setLoading(false);
  }, [
    state.UsersList?.getCustomerReadingList,
    state.UsersList?.getRoomReadingList?.listReadings,
  ]);

  useEffect(() => {
    if (
      state.UsersList?.addRoomReadingStatusCode === 201 ||
      state.UsersList?.addRoomReadingStatusCode === 200
    ) {
      dispatch({
        type: "GETROOMREADING",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({
        type: "GETCUSTOMERREADING",
        payload: state.login.selectedHostel_Id,
      });
      setShowModal(false);
      setShowHostelModal(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ADD_ROOM_READING" });
      }, 100);
    }
  }, [state.UsersList?.addRoomReadingStatusCode]);

  useEffect(() => {
    if (state.UsersList?.editHostelStatusCode === 200) {
      dispatch({
        type: "GETROOMREADING",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({
        type: "GETCUSTOMERREADING",
        payload: state.login.selectedHostel_Id,
      });
      setShowModal(false);
      setShowHostelModal(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_HOSTEL_READING" });
      }, 100);
    }
  }, [state.UsersList?.editHostelStatusCode]);

  useEffect(() => {
    if (state.UsersList?.deleteReadingStatusCode === 204) {
      dispatch({
        type: "GETROOMREADING",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({
        type: "GETCUSTOMERREADING",
        payload: state.login.selectedHostel_Id,
      });
      setShowDelete(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_READING" });
      }, 100);
    }
  }, [state.UsersList?.deleteReadingStatusCode]);

  const handleShowDotsHostelReading = (row, index) => {
    setShowDots(index);

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleShowDotsRoomReading = (row, index) => {
    setShowDotsRoom(index);

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleEdit = (rowData) => {
    setShowHostelModal(true);
    setEditHostelReading(rowData);
  };

  const handleEditRoomReading = (rowData) => {
    // console.log("rowData", rowData)
    setShowModal(true);
    setEditRoomReading(rowData);
  };

  const formattedReadings = customerReadingList?.map((item) => {
    // const [month, year] = item.startDate.split("/");
    // const billingMonth = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
    //   month: "short",
    //   year: "numeric",
    // });

    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    const getBillingMonth = (dateStr) => {
      if (!dateStr) return "-";

      const parts = dateStr.split("/");
      if (parts.length !== 3) return "-";

      const [day, month, year] = parts.map(Number);
      if (!day || !month || !year) return "-";

      return new Date(year, month - 1, 1).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    };

    return {
      fullName: item.fullName,
      profilePic: item.profilePic,
      billingMonth: getBillingMonth(item.startDate),
      from: formatDate(item.startDate),
      to: formatDate(item.endDate),
      // totalUnits: item.consumption,
      amount: item.consumption * item.unitPrice,
      floorName: item.floorName,
      roomName: item.roomName,
      bedName: item.bedName,
      totalUnits: item.totalUnits,
      totalAmount: item.totalAmount,
      initials: item.initials,
      customerId: item.customerId,
    };
  });

  const formattedRoomReadings = roomReadingList?.map((item) => {
    const getBillingMonth = (dateStr) => {
      if (dateStr === "N/A") return "N/A";
      if (!dateStr) return "N/A";
      const [day, month, year] = dateStr.split("/");
      if (!day || !month || !year) return "N/A";

      return new Date(`${year}-${month}-01`).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    };

    const formatDate = (dateStr) => {
      if (dateStr === "N/A") return "N/A";
      if (!dateStr) return "N/A";

      const [d, m, y] = dateStr.split("/").map(Number);
      if (!d || !m || !y) return "N/A";

      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    return {
      floorName: item.floorName,
      roomName: item.roomName,
      roomId: item.roomId,
      hostelId: item.hostelId,
      noOfTenants: item.noOfTenants,

      billingMonth: getBillingMonth(item.entryDate),

      from: formatDate(item.startDate),
      to: formatDate(item.endDate),

      totalUnits: item.consumption,
      totalPrice: item.totalPrice,
      currentReading: item.currentReading,
      entryDate: item.entryDate,
      readingId: item.readingId,
    };
  });

  // const totals = formattedRoomReadings?.reduce(
  //   (acc, item) => {
  //     acc.totalUnits += item.totalUnits;
  //     acc.totalAmount += item.totalPrice;
  //     acc.totalCurrentReading += item.currentReading;
  //     return acc;
  //   },
  //   {
  //     totalUnits: 0,
  //     totalAmount: 0,
  //     totalCurrentReading: 0,
  //   }
  // );

  // console.log("mathu", roomReadingList);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = formattedRoomReadings?.slice(startIndex, endIndex);

  const paginatedTenantdData = formattedReadings?.slice(startIndex, endIndex);

  return (
    <>
      {!roomDetail && !tenantsDetail ? (
        <div className="sticky top-0 bg-white font-gilroy p-1">
          <div className="flex items-center justify-between mb-3">
            <div className="mb-0">
              <label className="text-lg text-black font-semibold">
                Electricity
              </label>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white rounded p-2 shadow-sm h-fit">
                <img
                  src={searchteam}
                  height={20}
                  width={20}
                  alt="search"
                  className={`transition-opacity duration-300 ${
                    canReadElectricity
                      ? "cursor-pointer opacity-100 pointer-events-auto"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                  }`}
                />
              </div>

              {!isEbBased && (
                <div
                  className="flex gap-3 p-1.5 bg-white rounded cursor-pointer"
                  onClick={() => canReadElectricity && handleFilterShow()}
                >
                  <FiFilter
                    size={20}
                    className={`${canReadElectricity ? "opacity-100" : "opacity-40"}`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-2 ml-0.5 -mt-2">
            <div
              onClick={() => setActiveTab("room")}
              className={`cursor-pointer pb-1.5 font-gilroy ${
                activeTab === "room"
                  ? "text-black font-semibold border-b-2 border-blue-700"
                  : "text-gray-700 font-normal border-b-2 border-transparent"
              }`}
            >
              {isEbBased ? "Hostel Reading" : "Room Reading"}
            </div>

            <div
              onClick={() => setActiveTab("customer")}
              className={`cursor-pointer pb-1.5 font-gilroy ${
                activeTab === "customer"
                  ? "text-black font-semibold border-b-2 border-blue-700"
                  : "text-gray-700 font-normal border-b-2 border-transparent"
              }`}
            >
              Tenants Reading
            </div>
          </div>

          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.map((item, index) => {
                let label = item;
                let value = "";
                if (item.includes("is ")) {
                  const parts = item.split("is ");
                  label = parts[0] + "is";
                  value = parts[1];
                }
                return (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-2xl px-3 py-0.5 text-xs text-gray-800 font-medium border border-gray-200 max-w-fit min-h-6 gap-1.5"
                  >
                    <span className="text-gray-500 font-normal mr-0.5 whitespace-nowrap">
                      {label}
                    </span>
                    {value && (
                      <span className="text-gray-800 font-semibold mr-1.5 whitespace-nowrap">
                        {value}
                      </span>
                    )}
                    {!value && (
                      <span className="text-gray-800 font-semibold mr-1.5 whitespace-nowrap">
                        {item}
                      </span>
                    )}
                    <span
                      className="flex items-center justify-center bg-gray-100 rounded-full w-4.5 h-4.5 ml-0.5 cursor-pointer"
                      onClick={() => removeFilter(item)}
                    >
                      <CloseCircle size="13" color="#222" />
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {!canReadElectricity ? (
            <div className="flex flex-col items-center justify-center mt-24">
              <img src={Emptystate} alt="Empty State" />
              <ErrorMessage
                message={["You do not have access to view Electricity"]}
                type="warning"
              />
            </div>
          ) : (
            <div>
              {activeTab === "room" && (
                <>
                  {isEbBased && (
                    <div className="mb-3">
                      {state.UsersList?.getRoomReadingList?.hostelReadings
                        ?.length > 0 ? (
                        state.UsersList.getRoomReadingList.hostelReadings.map(
                          (row, i) => (
                            <div
                              key={i}
                              className="bg-white rounded-xl p-2.5 mb-3.5 flex items-center justify-between gap-2.5 border border-gray-300"
                            >
                              <div className="flex items-center">
                                {state.UsersList.getRoomReadingList?.hostelInfo
                                  ?.hostelImage ? (
                                  <img
                                    src={
                                      state.UsersList.getRoomReadingList
                                        .hostelInfo.hostelImage
                                    }
                                    alt="hostel_logo"
                                    className="h-25 w-25 rounded-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg uppercase">
                                    {state.UsersList.getRoomReadingList
                                      ?.hostelInfo?.initials || "H"}
                                  </div>
                                )}
                                <div>
                                  <div className="w-full ml-4">
                                    <div className="font-semibold text-xl mb-3">
                                      {
                                        state.UsersList.getRoomReadingList
                                          ?.hostelInfo?.hostelName
                                      }
                                    </div>

                                    <div>
                                      <div className="mb-1 text-xs text-gray-500">
                                        Occupants
                                      </div>
                                      <div className="font-semibold">
                                        {state.UsersList.getRoomReadingList
                                          ?.hostelInfo?.noOfOccupants || "0"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-7/12">
                                <div className="flex items-center justify-between w-full mt-11">
                                  <div>
                                    <div className="mb-1 text-xs text-gray-500">
                                      Billing Month
                                    </div>
                                    <div className="font-semibold">
                                      {
                                        state.UsersList.getRoomReadingList
                                          ?.hostelInfo?.billingMonth
                                      }
                                    </div>
                                  </div>

                                  <div>
                                    <div className="mb-1 text-xs text-gray-500">
                                      Previous Unit
                                    </div>
                                    <div className="font-semibold">
                                      {row?.lastReading}
                                    </div>
                                  </div>

                                  <div className="flex gap-5">
                                    <div>
                                      <div className="mb-1 text-xs text-gray-500">
                                        Total Units
                                      </div>
                                      <div className="font-semibold">
                                        {row?.consumption || "N/A"}
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        cursor: canWriteElectricity
                                          ? "pointer"
                                          : "not-allowed",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        size={20}
                                        className={`${
                                          showDots === i
                                            ? "text-blue-700"
                                            : "text-gray-500"
                                        }`}
                                        onClick={() =>
                                          handleShowDotsHostelReading(row, i)
                                        }
                                      />

                                      {showDots === i && (
                                        <>
                                          <div
                                            ref={popupRef}
                                            className={`fixed w-36 bg-gray-50 border border-gray-200 rounded-lg flex flex-col cursor-pointer ${
                                              showDots === i ? "z-50" : ""
                                            }`}
                                            style={{
                                              top: showAbove
                                                ? popupPosition.top -
                                                  (popupRef.current
                                                    ?.offsetHeight || 100) -
                                                  20
                                                : popupPosition.top,
                                              left: popupPosition.left - 10,
                                            }}
                                          >
                                            <div className="w-full">
                                              <div
                                                className={`flex justify-start items-center gap-2 rounded-t-lg bg-gray-50 px-3 py-2 ${
                                                  !canUpdateElectricity
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "cursor-pointer opacity-100"
                                                }`}
                                                onClick={() => {
                                                  if (canUpdateElectricity)
                                                    handleEdit(row);
                                                }}
                                                onMouseEnter={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#EDF2FF";
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#F9F9F9";
                                                }}
                                              >
                                                <img
                                                  src={Edit}
                                                  alt="Edit"
                                                  className={`h-4 w-4 ${
                                                    !canUpdateElectricity
                                                      ? "grayscale"
                                                      : ""
                                                  }`}
                                                />
                                                <label
                                                  className={`text-sm font-medium font-gilroy text-gray-800 ${
                                                    !canUpdateElectricity
                                                      ? "cursor-not-allowed"
                                                      : "cursor-pointer"
                                                  }`}
                                                >
                                                  Edit
                                                </label>
                                              </div>

                                              <div
                                                className={`flex justify-start items-center gap-2 rounded-b-lg px-3 py-2 ${
                                                  !canDeleteElectricity
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "cursor-pointer opacity-100"
                                                }`}
                                                onClick={() => {
                                                  if (canDeleteElectricity)
                                                    handleReadingDelete(row);
                                                }}
                                                onMouseEnter={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#FFF0F0";
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#F9F9F9";
                                                }}
                                              >
                                                <img
                                                  src={Delete}
                                                  alt="Delete"
                                                  className={`h-4 w-4 ${
                                                    !canDeleteElectricity
                                                      ? "grayscale"
                                                      : ""
                                                  }`}
                                                />
                                                <label
                                                  className={`text-sm font-medium font-gilroy text-red-600 ${
                                                    !canDeleteElectricity
                                                      ? "cursor-not-allowed"
                                                      : "cursor-pointer"
                                                  }`}
                                                >
                                                  Delete
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-amber-50 p-4 rounded-lg font-medium text-center">
                                <div>
                                  <label className="text-sm text-gray-600">
                                    Total Amount
                                  </label>
                                </div>
                                <div className="text-base">
                                  {" "}
                                  ₹
                                  {state.UsersList.getRoomReadingList.hostelInfo
                                    ?.totalAmount || "0"}
                                </div>
                              </div>
                            </div>
                          ),
                        )
                      ) : (
                        <div className="bg-white rounded-2xl px-5 py-4.5 mb-3.5 flex items-center gap-3 border border-dashed border-gray-300 text-gray-500">
                          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                            <Flash />
                          </div>

                          <div>
                            <div className="text-lg font-semibold font-gilroy text-gray-800">
                              No readings available
                            </div>

                            <div className="text-sm font-medium font-gilroy text-gray-600">
                              Hostel electricity readings have not been added
                              yet
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {roomReadingList?.length === 0 && !loading ? (
                    <div className="animated-text flex items-center justify-center h-[77vh] 2xl:-mt-8">
                      <div className="2xl:mt-24">
                        <img src={emptyimg} alt="emptystate" />
                        <div className="pb-1 mt-2 text-center font-semibold font-gilroy text-lg text-gray-600">
                          No Room Reading
                        </div>
                        <div className="pb-1 text-center font-medium font-gilroy text-sm text-gray-600">
                          There are no Room Reading available.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex justify-end mr-2 ${formattedRoomReadings.length > 10 ? "-mt-8 mb-3" : "mt-0 mb-3"}`}
                      >
                        <PaginationList
                          totalItems={formattedRoomReadings.length}
                          itemsPerPage={pageSize}
                          currentPage={page}
                          onPageChange={(p) => setPage(p)}
                          onPageSizeChange={(size) => setPageSize(size)}
                        />
                      </div>

                      <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                        <div
                          id="tableContainer"
                          // ref={tableContainerRef}
                          className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                        >
                          <table className=" w-full font-gilroy">
                            <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                              <tr className="h-9">
                                <th className="w-[230px] px-4">
                                  <div className="flex items-center gap-1">
                                    Floor
                                    <img src={arrowSwap} alt="swap" />
                                  </div>
                                </th>
                                <th className="w-[230px] px-2">
                                  <div className="flex items-center gap-1">
                                    Room
                                    <img src={arrowSwap} alt="swap" />
                                  </div>
                                </th>

                                <th className="w-[230px] px-2">Occupants</th>
                                <th className="w-[230px] px-2">
                                  Billing month
                                </th>
                                <th className="w-[230px] px-2">From</th>
                                <th className="w-[230px] px-2">To</th>
                                <th className="w-[230px] px-2">Total units</th>
                                <th className="w-[230px] px-2">Amount</th>
                                {!isEbBased && (
                                  <th className="w-[230px] px-2">Action</th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="text-[13px] text-black font-gilroy">
                              {paginatedData?.map((row, i) => (
                                <tr
                                  key={i}
                                  className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                                >
                                  <td className="w-[230px] px-4 py-1 whitespace-nowrap">
                                    {row?.floorName}
                                  </td>

                                  <td
                                    className={`${canReadElectricity ? "!text-blue-600" : "!text-gray-300"} cursor-pointer font-semibold px-2 py-1`}
                                    onClick={() =>
                                      canReadElectricity &&
                                      handleRoomDetailsPage(row)
                                    }
                                  >
                                    {row?.roomName}
                                  </td>

                                  <td className="w-[230px] px-2 py-1">
                                    {row?.noOfTenants}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                    {row.billingMonth || "N/A"}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                    {row?.from || "N/A"}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                    {row?.to || "N/A"}
                                  </td>
                                  <td className="w-[230px] px-2 py-1">
                                    {row?.totalUnits}
                                  </td>
                                  <td className="w-[230px] px-2 py-1">
                                    {row?.totalPrice || "0"}
                                  </td>
                                  {!isEbBased && (
                                    <td
                                      className="px-2 py-1"
                                      style={{
                                        cursor: canWriteElectricity
                                          ? "pointer"
                                          : "not-allowed",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        className={`w-5 h-5 cursor-pointer transition-transform ${
                                          showDotsRoom === i
                                            ? "text-blue-700"
                                            : "text-gray-500"
                                        }`}
                                        style={{ transform: "rotate(90deg)" }}
                                        onClick={() =>
                                          handleShowDotsRoomReading(row, i)
                                        }
                                      />
                                      {showDotsRoom === i && (
                                        <>
                                          <div
                                            ref={popupRef}
                                            className={`cursor-pointer bg-gray-100 border border-gray-300 rounded-[10px] flex flex-col`}
                                            style={{
                                              position: "fixed",
                                              top: showAbove
                                                ? popupPosition.top -
                                                  (popupRef.current
                                                    ?.offsetHeight || 100) -
                                                  20
                                                : popupPosition.top - 35,
                                              left: popupPosition.left,
                                              width: 130,
                                              height: "auto",
                                              zIndex:
                                                showDotsRoom === i
                                                  ? 3000
                                                  : "auto",
                                            }}
                                          >
                                            <div className="w-full">
                                              <div
                                                className={`flex justify-start items-center gap-2 px-3 py-2.5 rounded-t-lg 
    ${!canWriteElectricity ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
    bg-gray-100`}
                                                onClick={() =>
                                                  canWriteElectricity &&
                                                  handleActionClick(row)
                                                }
                                                onMouseEnter={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#EDF2FF";
                                                  e.currentTarget.style.borderBottomLeftRadius =
                                                    "10px";
                                                  e.currentTarget.style.borderBottomRightRadius =
                                                    "10px";
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.backgroundColor =
                                                    "#F9F9F9";
                                                }}
                                              >
                                                <img
                                                  src={Group}
                                                  alt="Group"
                                                  className={`w-4 h-4 ${!canWriteElectricity ? "filter grayscale" : ""}`}
                                                />
                                                <label
                                                  className={`text-sm font-medium font-gilroy text-[#222] ${
                                                    !canWriteElectricity
                                                      ? "cursor-not-allowed"
                                                      : "cursor-pointer"
                                                  }`}
                                                >
                                                  Add
                                                </label>
                                              </div>
                                              {row?.currentReading ? (
                                                <>
                                                  <div
                                                    className={`flex justify-start items-center gap-2 px-3 py-2.5 rounded-t-lg bg-gray-100
    ${!canUpdateElectricity ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                                    onClick={() => {
                                                      if (canUpdateElectricity)
                                                        handleEditRoomReading(
                                                          row,
                                                        );
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      e.currentTarget.style.backgroundColor =
                                                        "#EDF2FF";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor =
                                                        "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={Edit}
                                                      alt="Edit"
                                                      className={`w-4 h-4 ${!canUpdateElectricity ? "filter grayscale" : ""}`}
                                                    />
                                                    <label
                                                      className={`text-sm font-medium font-gilroy text-[#222] ${
                                                        !canUpdateElectricity
                                                          ? "cursor-not-allowed"
                                                          : "cursor-pointer"
                                                      }`}
                                                    >
                                                      Edit
                                                    </label>
                                                  </div>

                                                  <div
                                                    className={`flex justify-start items-center gap-2 px-3 py-2.5 rounded-b-lg 
                                                    ${!canDeleteElectricity ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                                    onClick={() => {
                                                      if (canDeleteElectricity)
                                                        handleReadingDelete(
                                                          row,
                                                        );
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      e.currentTarget.style.backgroundColor =
                                                        "#FFF0F0";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor =
                                                        "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={Delete}
                                                      alt="Delete"
                                                      className={`w-4 h-4 ${!canDeleteElectricity ? "filter grayscale" : ""}`}
                                                    />
                                                    <label
                                                      className={`text-sm font-medium font-gilroy text-red-500 ${
                                                        !canDeleteElectricity
                                                          ? "cursor-not-allowed"
                                                          : "cursor-pointer"
                                                      }`}
                                                    >
                                                      Delete
                                                    </label>
                                                  </div>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {loading && (
                            <div
                              className="fixed inset-0 flex items-center justify-center bg-transparent"
                              style={{ opacity: 0.75, zIndex: 10 }}
                            >
                              <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "customer" &&
                (customerReadingList?.length === 0 ? (
                  <div className="animated-text flex items-center justify-center h-[76vh]">
                    <div className="">
                      <img src={emptyimg} alt="emptystate" />

                      <div className="pb-1 mt-1 text-center font-gilroy font-semibold text-lg text-gray-700">
                        No Tenant Readings
                      </div>

                      <div className="text-center font-gilroy font-medium text-sm text-gray-700">
                        There are no tenant reading available.
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex justify-end mr-2 ${formattedReadings.length > 10 ? "-mt-8 mb-3" : "mt-0 mb-3"}`}
                    >
                      <PaginationList
                        totalItems={formattedReadings.length}
                        itemsPerPage={pageSize}
                        currentPage={page}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(size) => setPageSize(size)}
                      />
                    </div>

                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        // ref={tableContainerRef}
                        className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                      >
                        <table className=" w-full font-gilroy">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                            <tr className="h-9">
                              <th className="text-left">
                                <div className="px-4">Name</div>
                              </th>

                              <th className="w-[230px] px-2 whitespace-nowrap">
                                Billing month
                              </th>
                              <th className="w-[230px] px-2">From</th>
                              <th className="w-[230px] px-2">To</th>
                              <th className="w-[230px] px-2">
                                <div className="flex items-center gap-1 justify-start">
                                  <img
                                    src={arrowSwap}
                                    alt="swap"
                                    className="w-4 h-4"
                                  />
                                  <span>Floor</span>
                                </div>
                              </th>

                              <th className="w-[230px] px-2">
                                <div className="flex items-center gap-1 justify-start">
                                  <img
                                    src={arrowSwap}
                                    alt="swap"
                                    className="w-4 h-4"
                                  />
                                  <span>Room</span>
                                </div>
                              </th>
                              <th className="w-[230px] px-2">Bed</th>
                              <th className="w-[230px] px-2 whitespace-nowrap">
                                Total units
                              </th>
                              <th className="w-[230px] px-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="font-gilroy text-[13px]">
                            {paginatedTenantdData?.map((row, i) => (
                              <tr
                                key={i}
                                className="!border-b !border-gray-300"
                              >
                                <td
                                  className="flex items-center gap-2 p-2 text-left cursor-pointer"
                                  onClick={() => handleTenantsDetailsPage(row)}
                                >
                                  {row.profilePic ? (
                                    <img
                                      src={row.profilePic}
                                      alt="profilepic"
                                      className="w-10 h-10 rounded-full flex-shrink-0"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 text-[#44536A] flex items-center justify-center font-semibold font-gilroy flex-shrink-0">
                                      {row?.initials || "-"}
                                    </div>
                                  )}

                                  <span className="block max-w-32 truncate whitespace-nowrap text-sm font-semibold font-gilroy text-blue-700 underline">
                                    {row.fullName}
                                  </span>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.billingMonth}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.from}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.to}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.floorName}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.roomName}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.bedName}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.totalUnits}</div>
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <div className="mt-2">{row.totalAmount}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          )}
        </div>
      ) : roomDetail ? (
        <EB_RoomOverview room={selectedRoom} onBack={handleBack} />
      ) : tenantsDetail ? (
        <EB_TenantOverview tenant={selectedTenant} onBack={handleBackTenant} />
      ) : null}

      {showModal && (
        <AddRoomReading
          show={showModal}
          handleClose={handleCloseShowModal}
          selectedRowDetails={selectedRow}
          editRoomReading={editRoomReading}
          finalSettlementWay={false}
        />
      )}

      {showHostelModal && (
        <AddHostelReading
          show={showHostelModal}
          handleClose={handleCloseHostelShowModal}
          roomReadingList={roomReadingList}
          editHostelReading={editHostelReading}
        />
      )}

      {showDelete && (
        <DeleteReading
          show={showDelete}
          handleClose={handleCloseDelete}
          deleteDetails={deleteDetails}
        />
      )}
    </>
  );
};

export default withErrorBoundary(RoomReadingTable);
