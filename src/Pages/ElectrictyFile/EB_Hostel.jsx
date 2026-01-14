/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { Offcanvas, Button, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import arrowSwap from "../../Assets/Images/New_images/arrow-swap.svg";
import Group from "../../Assets/Images/New_images/Group.svg";
import { CloseCircle, ArrowUp2, ArrowDown2,Flash } from "iconsax-react";
import PaginationList from "../../Components/PaginationList";
import EB_RoomOverview from "./EB_RoomOverview";
// import Ellipse1 from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import EB_TenantOverview from "./EB_TenantOverview";
import { useDispatch, useSelector } from "react-redux";
import AddRoomReading from "./AddRoomReading";
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import ErrorMessage from '../../Components/ErrorMessage';
import Select from "react-select";
import AddHostelReading from "./AddHostelReading";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../../Assets/Images/Edit-blue.png';
import Delete from '../../Assets/Images/Delete_red.png';
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




  const isEbBased = state.UsersList?.getRoomReadingList?.isHostelBased



  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [roomDetail, setRoomDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tenantsDetail, setTenantsDetail] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [filterShow, setFilterShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomReadingList, setRoomReadingList] = useState([])
  const [customerReadingList, setCustomerReadingList] = useState([])
  const [showHostelModal, setShowHostelModal] = useState(false)
  const [showDots, setShowDots] = useState('')
  const [showDotsRoom, setShowDotsRoom] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState([]);
  const [showAbove, setShowAbove] = useState(false);
  const [editHostelReading, setEditHostelReading] = useState('')
  const [editRoomReading, setEditRoomReading] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [deleteDetails, setDeleteDetails] = useState("")

  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
      setShowDotsRoom('')
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    if (roomReadingList.length === 0) {
      setLoading(false);
    }

  }, [roomReadingList])


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
    setEditRoomReading('')
  };




  const handleReadingDelete = (row) => {
    // console.log("delete", row)
    setShowDelete(true)
    setDeleteDetails(row)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }


  const handleActionReadingClick = () => {
    setShowHostelModal(true);
    setEditHostelReading('')
  };


  const handleCloseShowModal = () => {
    dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
    setShowModal(false)
  }
    ;


  const handleCloseHostelShowModal = () => {
    dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
    setShowHostelModal(false);
  }

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'GETROOMREADING', payload: state.login.selectedHostel_Id })
      dispatch({ type: 'GETCUSTOMERREADING', payload: state.login.selectedHostel_Id })
      setLoading(true)
    }
  }, [state.login.selectedHostel_Id])

  useEffect(() => {
    if (state.UsersList?.getRoomReadingStatus === 200) {
      setLoading(false)
      setRoomReadingList(state.UsersList?.getRoomReadingList?.listReadings)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_ROOM_READING' })
      }, 100)

    }

  }, [state.UsersList?.getRoomReadingStatus])


  useEffect(() => {
    setLoading(false)
  }, [state.UsersList?.getRoomReadingList?.listReadings, state.UsersList?.getCustomerReadingList])

  useEffect(() => {
    if (state.UsersList?.getCustomerReadingStatus === 200) {
      setLoading(false)
      setCustomerReadingList(state.UsersList?.getCustomerReadingList)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_CUSTOMER_READING' })
      }, 100)

    }

  }, [state.UsersList?.getCustomerReadingStatus])


  useEffect(() => {
    setLoading(false)
  }, [state.UsersList?.getCustomerReadingList, state.UsersList?.getRoomReadingList?.listReadings])



  useEffect(() => {
    if (state.UsersList?.addRoomReadingStatusCode === 201 || state.UsersList?.addRoomReadingStatusCode === 200) {
      dispatch({ type: 'GETROOMREADING', payload: state.login.selectedHostel_Id })
      dispatch({ type: 'GETCUSTOMERREADING', payload: state.login.selectedHostel_Id })
      setShowModal(false)
      setShowHostelModal(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ADD_ROOM_READING' })
      }, 100)
    }

  }, [state.UsersList?.addRoomReadingStatusCode])

  useEffect(() => {
    if (state.UsersList?.editHostelStatusCode === 200) {
      dispatch({ type: 'GETROOMREADING', payload: state.login.selectedHostel_Id })
      dispatch({ type: 'GETCUSTOMERREADING', payload: state.login.selectedHostel_Id })
      setShowModal(false)
      setShowHostelModal(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_EDIT_HOSTEL_READING' })
      }, 100)
    }

  }, [state.UsersList?.editHostelStatusCode])



  useEffect(() => {
    if (state.UsersList?.deleteReadingStatusCode === 204) {
      dispatch({ type: 'GETROOMREADING', payload: state.login.selectedHostel_Id })
      dispatch({ type: 'GETCUSTOMERREADING', payload: state.login.selectedHostel_Id })
      setShowDelete(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_DELETE_READING' })
      }, 100)
    }

  }, [state.UsersList?.deleteReadingStatusCode])

  const handleShowDotsHostelReading = (row, index) => {
    setShowDots(index)

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }


  const handleShowDotsRoomReading = (row, index) => {
    setShowDotsRoom(index)

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }


  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);



  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);

  };

  const handleEdit = (rowData) => {
    setShowHostelModal(true)
    setEditHostelReading(rowData)
  }


  const handleEditRoomReading = (rowData) => {
    // console.log("rowData", rowData)
    setShowModal(true);
    setEditRoomReading(rowData)
  }



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
      customerId: item.customerId
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
      readingId: item.readingId
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



  return (


    <>


      {!roomDetail && !tenantsDetail ? (
        <div className="sticky-top bg-white" style={{ fontFamily: "Gilroy" }}>
          <div className="mb-3">
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

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div
              className="d-flex"
              style={{ marginLeft: "2px", marginTop: "-10px" }}
            >
              <div
                onClick={() => setActiveTab("room")}
                style={{
                  fontSize: 17,
                  fontFamily: "Gilroy",
                  color: activeTab === "room" ? "black" : "#4B4B4B",
                  fontWeight: activeTab === "room" ? "semibold" : "normal",
                  textTransform: "none",
                  cursor: "pointer",
                  marginRight: 24,
                  paddingBottom: 6,
                  borderBottom:
                    activeTab === "room"
                      ? "2px solid #1E45E1"
                      : "2px solid transparent",
                }}
              >
                {isEbBased ? "Hostel Reading" : "Room Reading"}
              </div>
              <div
                onClick={() => setActiveTab("customer")}
                style={{
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  color: activeTab === "room" ? "black" : "#4B4B4B",
                  fontWeight: activeTab === "customer" ? "semibold" : "normal",
                  textTransform: "none",
                  cursor: "pointer",
                  paddingBottom: 6,
                  borderBottom:
                    activeTab === "customer"
                      ? "2px solid #1E45E1"
                      : "2px solid transparent",
                }}
              >
                Tenants Reading
              </div>


            </div>
            <div className="d-flex  align-items-center justify-content-center">


              {/* {isEbBased && activeTab === "room" && (
                <div className="d-flex justify-content-center align-items-center  gap-3 me-2 ">

                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#E5F0FF",
                      color: "#1D4ED8",
                      fontSize: 14,
                      padding: "12px 12px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    Total Units :
                    <span style={{ fontWeight: 700, marginLeft: 4 }}>
                      {totals?.totalUnits?.toFixed(0)}
                    </span>
                  </span>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#E5F0FF",
                      color: "#1D4ED8",
                      fontSize: 14,
                      padding: "12px 12px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    Total Amount :
                    <span style={{ fontWeight: 700, marginLeft: 4 }}>
                      ₹ {totals?.totalAmount?.toFixed(0)}
                    </span>
                  </span>

                </div>
              )} */}




              <div className="ms-auto d-flex gap-2 me-2 align-items-center">
                <div className="ms-auto d-flex gap-3 me-2" style={{ backgroundColor: "white", borderRadius: 5, padding: 8, boxShadow: "0px 2px 2px rgba(0,0,0,0.2)", height: "fit-content" }}>
                  <img
                    // onClick={()=> canReadElectricity && handleSearch()}
                    src={searchteam} height="20" width="20" alt="search" style={{
                      cursor: canReadElectricity ? "pointer" : "not-allowed",
                      opacity: canReadElectricity ? 1 : 0.4,
                      pointerEvents: canReadElectricity ? "auto" : "none",
                      transition: "opacity 0.3s ease"
                    }} />
                </div>
                {
                  !isEbBased &&

                  <div>
                    {/* Filter Button */}
                    <div
                      className="ms-auto d-flex gap-3 me-2 p-1"
                      style={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding: 6,
                        // boxShadow: "0px 2px 2px rgba(0,0,0,0.2)",
                      }}
                      onClick={() => canReadElectricity && handleFilterShow()}
                    >
                      <FiFilter size={20} style={{
                        cursor: canReadElectricity ? "pointer" : "not-allowed",
                        opacity: canReadElectricity ? 1 : 0.4,
                        pointerEvents: canReadElectricity ? "auto" : "none",
                        transition: "opacity 0.3s ease"
                      }} />
                    </div>

                    {/* Right Side Offcanvas */}
                    <Offcanvas
                      show={filterShow}
                      onHide={handleFilterClose}
                      placement="end"
                      style={{ width: "320px" }}
                    >
                      <Offcanvas.Header className="d-flex justify-content-between align-items-center">
                        <Offcanvas.Title style={{ fontWeight: 600 }}>Filter</Offcanvas.Title>
                        <CloseCircle
                          size="26"
                          color="#000000"
                          style={{ cursor: "pointer" }}
                          onClick={handleFilterClose}
                        />
                      </Offcanvas.Header>

                      <Offcanvas.Body>
                        <Form>

                          <Form.Group className="mb-3" style={{ position: "relative" }}>
                            <Form.Label>Datas</Form.Label>
                            <Form.Control
                              as="select"
                              style={{ appearance: "none", paddingRight: "2.5rem" }}
                            >
                              <option>All</option>
                              <option>Active</option>
                              <option>Inactive</option>
                            </Form.Control>
                            <span
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "65%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                              }}
                            >
                              <ArrowDown2 size="20" color="black" style={{ marginTop: 12 }} />
                            </span>
                          </Form.Group>

                          <div>
                            {/* System Filter Header */}
                            <Form.Group className="mb-3" style={{ position: "relative", cursor: "pointer" }}>
                              <Form.Label
                                className="d-flex justify-content-between align-items-center"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                System Filter
                                <span>
                                  {isOpen ? <ArrowUp2 size="20" color="black" /> : <ArrowDown2 size="20" color="black" />}
                                </span>
                              </Form.Label>
                            </Form.Group>

                            {/* Filter Contents - Toggle visibility */}
                            {isOpen && (
                              <div className="mb-3">
                                {/* Month & Year */}
                                <Form.Group className="mb-3" style={{ position: "relative" }}>
                                  <Form.Label>Month &amp; Year</Form.Label>
                                  <Form.Control
                                    as="select"
                                    style={{ appearance: "none", paddingRight: "2.5rem" }}
                                  >
                                    <option>August</option>
                                    <option>July</option>
                                    <option>June</option>
                                  </Form.Control>
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "65%",
                                      transform: "translateY(-50%)",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <ArrowDown2 size="20" color="black" style={{ marginTop: 12 }} />
                                  </span>
                                </Form.Group>

                                {/* Custom Date */}
                                <Form.Group className="mb-3">
                                  <Form.Label>Custom Date</Form.Label>
                                  <div className="d-flex gap-2">
                                    <Form.Control type="date" />
                                    <Form.Control type="date" />
                                  </div>
                                </Form.Group>

                                {/* Floor */}
                                <Form.Group className="mb-3" style={{ position: "relative" }}>
                                  <Form.Label>Floor</Form.Label>
                                  <Form.Control
                                    as="select"
                                    style={{ appearance: "none", paddingRight: "2.5rem" }}
                                  >
                                    <option>Ground Floor</option>
                                    <option>First Floor</option>
                                    <option>Second Floor</option>
                                  </Form.Control>
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "65%",
                                      transform: "translateY(-50%)",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <ArrowDown2 size="20" color="black" style={{ marginTop: 12 }} />
                                  </span>
                                </Form.Group>
                              </div>
                            )}
                          </div>





                          <div className="d-flex justify-content-between mt-4">
                            <Button
                              variant="secondary"
                              onClick={handleFilterClose}
                              style={{ minWidth: "100px" }}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleFilterClose}
                              style={{ minWidth: "100px" }}
                            >
                              Apply
                            </Button>
                          </div>
                        </Form>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                }



                {
                  isEbBased &&
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      zIndex: 20
                    }}
                  >
                    <Select
                      options={monthOptions}
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      noOptionsMessage={() => "No options"}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          height: 40,
                          minHeight: 40,
                          borderRadius: 6,
                          border: state.isFocused ? "1px solid #1E45E1" : "1px solid #ccc",
                          boxShadow: state.isFocused ? "0 0 0 1px #1E45E1" : "none",
                          padding: "0 5px",
                          fontSize: 14,
                          color: "#1E45E1",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          cursor: "pointer",
                          width: 180,
                          zIndex: 2,
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          fontFamily: "Gilroy",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#1E45E1" : "#fff",
                          color: state.isFocused ? "#fff" : "#000",
                          fontWeight: 500,
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({ display: "none" }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#1E45E1",
                          cursor: "pointer",
                        }),
                      }}

                    />




                    <Button
                      onClick={() => canWriteElectricity && handleActionReadingClick()}
                      style={{
                        backgroundColor: "#1E45E1",
                        borderRadius: "8px",
                        padding: "10px 18px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      <img
                        src={Group}
                        alt="action"
                        style={{
                          filter: canWriteElectricity
                            ? "brightness(0) invert(1)"
                            : "grayscale(100%) brightness(60%)",
                          opacity: canWriteElectricity ? 1 : 0.6,
                          cursor: canWriteElectricity ? "pointer" : "default",
                        }}

                      />
                      Reading
                    </Button>
                  </div>
                }





              </div>
            </div>


          </div>

          {filters.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F5F7FB",
                      borderRadius: "16px",
                      padding: "2px 12px 2px 10px",
                      fontSize: "12px",
                      color: "#222",
                      fontWeight: 500,
                      border: "1px solid #E3E6ED",
                      maxWidth: "fit-content",
                      minHeight: "26px",
                      gap: "6px"
                    }}
                  >
                    <span style={{ color: "#6C757D", fontWeight: 400, marginRight: "2px", whiteSpace: "nowrap" }}>{label}</span>
                    {value && (
                      <span style={{ color: "#222", fontWeight: 700, marginRight: "6px", whiteSpace: "nowrap" }}>{value}</span>
                    )}
                    {!value && (
                      <span style={{ color: "#222", fontWeight: 700, marginRight: "6px", whiteSpace: "nowrap" }}>{item}</span>
                    )}
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#F5F7FB",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        marginLeft: "2px",
                        cursor: "pointer"
                      }}
                      onClick={() => removeFilter(item)}
                    >
                      <CloseCircle size="13" color="#222" />
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {
            !canReadElectricity ? (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 100
                }}
              >

                <img
                  src={Emptystate}
                  alt="Empty State"

                />



                <ErrorMessage message={['You do not have access to view Electricity']} type="warning" />

              </div>
            )

              :
              <div>
                {activeTab === "room" && (


                  <>

                    {/* {isEbBased ?
                      <div className="table-responsive show-scrolls mb-3"
                        style={{
                          background: "#fff",
                          borderRadius: 12,
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                          maxHeight: "460px",
                          overflowY: "auto",
                          position: "relative"
                        }}
                      >
                        <Table bordered={false} className="align-middle mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
                          <thead
                            style={{
                              backgroundColor: "rgba(231, 241, 255, 1)",
                              position: "sticky",
                              top: 0,
                              zIndex: 2,
                            }}
                          >
                            <tr className="text-uppercase" style={{ textAlign: "" }}>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>DATE</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                LAST READING
                              </th>

                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                TOTAL UNITS
                              </th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>AMOUNT</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>ACTION</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: 14, color: "#000" }}>
                            <PaginationList>
                              {state.UsersList?.getRoomReadingList?.hostelReadings.length > 0 ? state.UsersList?.getRoomReadingList?.hostelReadings.map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "", textAlign: "" }}>
                                  <td
                                    style={{ textAlign: "", color: "#222222", cursor: "pointer", fontWeight: 600, }}
                                  >
                                    {row?.entryDate}
                                  </td>
                                  <td style={{}} >{row?.lastReading}</td>
                                  <td style={{}}>{row?.consumption || "N/A"}</td>

                                  <td style={{}}>{row?.amount || "N/A"}</td>

                                  <td style={{ cursor: canWriteElectricity ? "pointer" : "not-allowed" }}>
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, transform: "rotate(90deg)", color: showDots === i ? "#1E45E1" : "#6B7280", }} onClick={() => handleShowDotsHostelReading(row, i)} />
                                    {showDots === i && <>
                                      <div
                                        ref={popupRef}
                                        style={{
                                          cursor: "pointer",
                                          backgroundColor: "#F9F9F9",
                                          position: "fixed",
                                          top: showAbove
                                            ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
                                            : popupPosition.top - 35,
                                          left: popupPosition.left,
                                          width: 170,
                                          height: "auto",
                                          border: "1px solid #EBEBEB",
                                          borderRadius: 10,
                                          display: "flex",
                                          flexDirection: "column",
                                          zIndex: showDots === i ? 3000 : "auto",
                                        }}
                                      >
                                        <div style={{ width: "100%" }}>




                                          <div
                                            className={`d-flex justify-content-start align-items-center gap-2 ${!canUpdateElectricity ? 'disabled' : ''}`}
                                            style={{
                                              cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                              borderTopLeftRadius: 10,
                                              borderTopRightRadius: 10,
                                              backgroundColor: "#F9F9F9",
                                              padding: "8px 12px",
                                              opacity: !canUpdateElectricity ? 0.5 : 1,
                                            }}
                                            onClick={() => {
                                              if (canUpdateElectricity) handleEdit(row);
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#EDF2FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F9F9F9";
                                            }}
                                          >
                                            <img
                                              src={Edit}
                                              alt="Edit"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canUpdateElectricity ? "grayscale(100%)" : "none",
                                              }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: "#222",
                                                cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Edit
                                            </label>
                                          </div>

                                          <div
                                            className={`d-flex justify-content-start align-items-center gap-2  ${!canDeleteElectricity ? 'disabled' : ''}`}
                                            style={{
                                              cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                              borderBottomLeftRadius: 10,
                                              borderBottomRightRadius: 10,
                                              padding: "8px 12px",
                                              opacity: !canDeleteElectricity ? 0.5 : 1,
                                            }}
                                            onClick={() => {
                                              if (canDeleteElectricity) handleReadingDelete(row);
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#FFF0F0";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F9F9F9";
                                            }}
                                          >
                                            <img
                                              src={Delete}
                                              alt="Delete"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canDeleteElectricity ? "grayscale(100%)" : "none",
                                              }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: "#FF0000",
                                                cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Delete
                                            </label>
                                          </div>

                                        </div>
                                      </div>

                                    </>}
                                  </td>

                                </tr>
                              ))

                                :
                                <tr>

                                  <td colSpan={4}
                                    style={{
                                      textAlign: "center",
                                      padding: "20px",
                                      fontWeight: 600,
                                      color: "#4B4B4B",
                                    }}> There are no hostel reading available</td>

                                </tr>



                              }
                            </PaginationList>
                          </tbody>
                        </Table>











                      </div>
                      : null} */}


                    {isEbBased && (
                      <div className="mb-3">
                        {state.UsersList?.getRoomReadingList?.hostelReadings?.length > 0 ? (
                          state.UsersList.getRoomReadingList.hostelReadings.map((row, i) => (
                            <div
                              key={i}
                              style={{
                                background: "#fff",
                                borderRadius: 14,
                                padding: 10,
                                marginBottom: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 10,
                                border: "1px solid #DCDCDC"
                              }}
                            >

                              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div
                                  style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: "50%",
                                    background: "#EEF2FF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    color: "#1E45E1",
                                    fontSize: 18,
                                  }}
                                >
                                  <Flash />
                                </div>


                              </div>
                              <div style={{
                                width: "70%"


                              }}>
                                <div style={{ width: "100%" }}>
                                  <div className="" style={{ fontWeight: 600, fontSize: 15 }}>
                                    {row?.hostelName || "SRK HOMES"}
                                  </div>

                                </div>
                                <div style={{

                                  display: "flex",
                                  alignItems: "center",

                                  justifyContent: "space-between",
                                  backgroundColor: "", width: "100%"

                                }}>
                                  <div>
                                    <div className="mb-1" style={{ fontSize: 12, color: "#6B7280" }}>Occupants</div>
                                    <div style={{ fontWeight: 600 }}>N/A</div>
                                  </div>

                                  <div>
                                    <div className="mb-1" style={{ fontSize: 12, color: "#6B7280" }}>
                                      Billing Month
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{row?.entryDate}</div>
                                  </div>
                                  {/* Previous Unit */}
                                  <div>
                                    <div className="mb-1" style={{ fontSize: 12, color: "#6B7280" }}>Previous Unit</div>
                                    <div style={{ fontWeight: 600 }}>{row?.lastReading}</div>
                                  </div>

                                  {/* Total Units */}
                                  <div className="d-flex gap-5">
                                    <div>
                                      <div style={{ fontSize: 12, color: "#6B7280" }}>Total Units</div>
                                      <div style={{ fontWeight: 600 }}>
                                        {row?.consumption || "N/A"}
                                      </div>
                                    </div>


                                    <div
                                      style={{
                                        cursor: canWriteElectricity ? "pointer" : "not-allowed",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        size={20}
                                        style={{
                                          // transform: "rotate(90deg)",
                                          color: showDots === i ? "#1E45E1" : "#6B7280",
                                        }}
                                        onClick={() => handleShowDotsHostelReading(row, i)}
                                      />


                                      {showDots === i && <>
                                        <div
                                          ref={popupRef}
                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#F9F9F9",
                                            position: "fixed",
                                            top: showAbove
                                              ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
                                              : popupPosition.top,
                                            left: popupPosition.left - 10,
                                            width: 150,
                                            height: "auto",
                                            border: "1px solid #EBEBEB",
                                            borderRadius: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            zIndex: showDots === i ? 3000 : "auto",
                                          }}
                                        >
                                          <div style={{ width: "100%" }}>




                                            <div
                                              className={`d-flex justify-content-start align-items-center gap-2 ${!canUpdateElectricity ? 'disabled' : ''}`}
                                              style={{
                                                cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: "#F9F9F9",
                                                padding: "8px 12px",
                                                opacity: !canUpdateElectricity ? 0.5 : 1,
                                              }}
                                              onClick={() => {
                                                if (canUpdateElectricity) handleEdit(row);
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#EDF2FF";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#F9F9F9";
                                              }}
                                            >
                                              <img
                                                src={Edit}
                                                alt="Edit"
                                                style={{
                                                  height: 16,
                                                  width: 16,
                                                  filter: !canUpdateElectricity ? "grayscale(100%)" : "none",
                                                }}
                                              />
                                              <label
                                                style={{
                                                  fontSize: 14,
                                                  fontWeight: 500,
                                                  fontFamily: "Gilroy, sans-serif",
                                                  color: "#222",
                                                  cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                                }}
                                              >
                                                Edit
                                              </label>
                                            </div>

                                            <div
                                              className={`d-flex justify-content-start align-items-center gap-2  ${!canDeleteElectricity ? 'disabled' : ''}`}
                                              style={{
                                                cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                padding: "8px 12px",
                                                opacity: !canDeleteElectricity ? 0.5 : 1,
                                              }}
                                              onClick={() => {
                                                if (canDeleteElectricity) handleReadingDelete(row);
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#FFF0F0";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#F9F9F9";
                                              }}
                                            >
                                              <img
                                                src={Delete}
                                                alt="Delete"
                                                style={{
                                                  height: 16,
                                                  width: 16,
                                                  filter: !canDeleteElectricity ? "grayscale(100%)" : "none",
                                                }}
                                              />
                                              <label
                                                style={{
                                                  fontSize: 14,
                                                  fontWeight: 500,
                                                  fontFamily: "Gilroy, sans-serif",
                                                  color: "#FF0000",
                                                  cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                                }}
                                              >
                                                Delete
                                              </label>
                                            </div>

                                          </div>
                                        </div>

                                      </>}

                                    </div>
                                  </div>






                                  {/* Action */}



                                </div>
                              </div>
                              <div className="ms-0"
                                style={{
                                  background: "#FFF6E5",
                                  padding: "22px 22px",
                                  borderRadius: 10,
                                  fontWeight: 500,
                                  textAlign: "center",
                                }}
                              >
                                <div>
                                  <label style={{ color: "#4B4B4B", fontSize: 14 }}>Total Amount</label>
                                </div>
                                <div style={{ fontSize: 16 }}> ₹{row?.amount || "0"}</div>


                              </div>
                            </div>
                          ))
                        ) : (
                          <div
                            style={{
                              background: "#FFFFFF",
                              borderRadius: 16,
                              padding: "18px 20px",
                              marginBottom: 14,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              border: "1px dashed #DCDCDC",
                              color: "#6B6B6B",
                            }}
                          >
                            <div
                              style={{
                                height: 36,
                                width: 36,
                                borderRadius: "50%",
                                background: "#F5F5F5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                              }}
                            >
                            <Flash />
                            </div>

                            <div style={{ lineHeight: 1.4 }}>
                              <div
                                style={{
                                  fontSize: 18,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy",
                                  color: "#2B2B2B",
                                }}
                              >
                                No readings available
                              </div>

                              <div
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Gilroy",
                                  color: "#7A7A7A",
                                }}
                              >
                                Hostel electricity readings have not been added yet
                              </div>
                            </div>
                          </div>

                        )}
                      </div>
                    )}



                    {roomReadingList?.length === 0 && !loading ? (
                      <div className="d-flex justify-content-center" style={{ textAlign: "center", marginTop: 40 }}>
                        <div>
                        <img src={emptyimg} width={240} height={240} alt="emptystate" />
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                          No Room Reading
                        </div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                          There are no Room Reading available.
                        </div>
                        </div>
                      </div>
                    ) : (
                      <div className="table-responsive show-scrolls"
                        style={{
                          background: "#fff",
                          borderRadius: 12,
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                          maxHeight: "460px",
                          overflowY: "auto",
                          position: "relative"
                        }}
                      >
                        <Table bordered={false} className="align-middle mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
                          <thead
                            style={{
                              backgroundColor: "rgba(231, 241, 255, 1)",
                              position: "sticky",
                              top: 0,
                              zIndex: 2,
                            }}
                          >
                            <tr className="text-uppercase" style={{ textAlign: "" }}>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                FLOOR <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                              </th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                ROOM <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                              </th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>OCCUPANTS</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>BILLING MONTH</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>FROM</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>TO</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>TOTAL UNITS</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>AMOUNT</th>
                              {
                                !isEbBased && <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>ACTION</th>

                              }
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: 14, color: "#000" }}>
                            <PaginationList>
                              {formattedRoomReadings?.map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "", textAlign: "" }}>
                                  <td style={{ fontSize: 15, fontWeight: 600, textAlign: "", }}>{row?.floorName}</td>
                                  <td
                                    style={{ textAlign: "", color: canReadElectricity ? "#1E45E1" : "#DBDBDB", cursor: "pointer", fontWeight: 600, }}
                                    onClick={() => canReadElectricity && handleRoomDetailsPage(row)}
                                  >
                                    {row?.roomName}
                                  </td>
                                  <td style={{}} >{row?.noOfTenants}</td>
                                  <td style={{ paddingLeft: "", }}>
                                    {row.billingMonth || "N/A"}
                                  </td>

                                  <td style={{}}>{row?.from || "N/A"}</td>
                                  <td style={{}}>{row?.to || "N/A"}</td>
                                  <td style={{}}>{row?.totalUnits}</td>
                                  <td style={{}}>{row?.totalPrice || '0'}</td>
                                  {
                                    !isEbBased &&
                                    <td style={{ cursor: canWriteElectricity ? "pointer" : "not-allowed" }}>
                                      {/* <img
                                        src={Group}
                                        alt="action"
                                         onClick={() => canWriteElectricity && handleActionClick(row)}
                                        style={{
                                          filter: canWriteElectricity ? "none" : "grayscale(100%) brightness(60%)",
                                          opacity: canWriteElectricity ? 1 : 0.6,
                                          cursor: canWriteElectricity ? "pointer" : "not-allowed"
                                        }}
                                        
                                      /> */}
                                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, transform: "rotate(90deg)", color: showDotsRoom === i ? "#1E45E1" : "#6B7280", }} onClick={() => handleShowDotsRoomReading(row, i)} />
                                      {showDotsRoom === i && <>
                                        <div
                                          ref={popupRef}
                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#F9F9F9",
                                            position: "fixed",
                                            top: showAbove
                                              ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
                                              : popupPosition.top - 35,
                                            left: popupPosition.left,
                                            width: 130,
                                            height: "auto",
                                            border: "1px solid #EBEBEB",
                                            borderRadius: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            zIndex: showDotsRoom === i ? 3000 : "auto",
                                          }}
                                        >
                                          <div style={{ width: "100%" }}>


                                            <div
                                              className={`d-flex justify-content-start align-items-center gap-2 ${!canWriteElectricity ? 'disabled' : ''}`}
                                              style={{
                                                cursor: !canWriteElectricity ? "not-allowed" : "pointer",
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: "#F9F9F9",
                                                padding: "8px 12px",
                                                opacity: !canWriteElectricity ? 0.5 : 1,
                                              }}
                                              onClick={() => canWriteElectricity && handleActionClick(row)}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#EDF2FF";
                                                e.currentTarget.style.borderBottomLeftRadius = "10px";
                                                e.currentTarget.style.borderBottomRightRadius = "10px";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#F9F9F9";
                                              }}
                                            >
                                              <img
                                                src={Group}
                                                alt="Group"
                                                style={{
                                                  height: 16,
                                                  width: 16,
                                                  filter: !canWriteElectricity ? "grayscale(100%)" : "none",
                                                }}
                                              />
                                              <label
                                                style={{
                                                  fontSize: 14,
                                                  fontWeight: 500,
                                                  fontFamily: "Gilroy, sans-serif",
                                                  color: "#222",
                                                  cursor: !canWriteElectricity ? "not-allowed" : "pointer",
                                                }}
                                              >
                                                Add
                                              </label>
                                            </div>
                                            {
                                              row?.currentReading ?
                                                <>
                                                  <div
                                                    className={`d-flex justify-content-start align-items-center gap-2 ${!canUpdateElectricity ? 'disabled' : ''}`}
                                                    style={{
                                                      cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                                      borderTopLeftRadius: 10,
                                                      borderTopRightRadius: 10,
                                                      backgroundColor: "#F9F9F9",
                                                      padding: "8px 12px",
                                                      opacity: !canUpdateElectricity ? 0.5 : 1,
                                                    }}
                                                    onClick={() => {
                                                      if (canUpdateElectricity) handleEditRoomReading(row);
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#EDF2FF";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={Edit}
                                                      alt="Edit"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter: !canUpdateElectricity ? "grayscale(100%)" : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy, sans-serif",
                                                        color: "#222",
                                                        cursor: !canUpdateElectricity ? "not-allowed" : "pointer",
                                                      }}
                                                    >
                                                      Edit
                                                    </label>
                                                  </div>


                                                  <div
                                                    className={`d-flex justify-content-start align-items-center gap-2  ${!canDeleteElectricity ? 'disabled' : ''}`}
                                                    style={{
                                                      cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                                      borderBottomLeftRadius: 10,
                                                      borderBottomRightRadius: 10,
                                                      padding: "8px 12px",
                                                      opacity: !canDeleteElectricity ? 0.5 : 1,
                                                    }}
                                                    onClick={() => {
                                                      if (canDeleteElectricity) handleReadingDelete(row);
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#FFF0F0";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={Delete}
                                                      alt="Delete"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter: !canDeleteElectricity ? "grayscale(100%)" : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy, sans-serif",
                                                        color: "#FF0000",
                                                        cursor: !canDeleteElectricity ? "not-allowed" : "pointer",
                                                      }}
                                                    >
                                                      Delete
                                                    </label>
                                                  </div>
                                                </>
                                                :
                                                ""

                                            }


                                          </div>
                                        </div>

                                      </>}
                                    </td>
                                  }
                                </tr>
                              ))}
                            </PaginationList>
                          </tbody>
                        </Table>



                        {loading &&
                          <div
                            style={{
                              position: 'fixed',
                              top: 0,
                              right: 0,
                              bottom: 0,
                              left: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'transparent',
                              opacity: 0.75,
                              zIndex: 10,
                            }}
                          >
                            <div
                              style={{
                                borderTop: '4px solid #1E45E1',
                                borderRight: '4px solid transparent',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                animation: 'spin 1s linear infinite',
                              }}
                            ></div>
                          </div>
                        }











                      </div>
                    )}






                  </>







                )}










                {activeTab === "customer" && (
                  customerReadingList?.length === 0 ? (
                    <div className="d-flex justify-content-center" style={{ textAlign: "center", marginTop: 40 }}>
                      <div>
                      <img src={emptyimg} width={240} height={240} alt="emptystate" />
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                        No Tenant Reading
                      </div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                        There are no  tenant reading available.
                      </div>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive show-scrolls"
                      style={{
                        background: "#fff",
                        borderRadius: 12,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                        maxHeight: "480px",
                        overflowY: "auto",
                      }}
                    >
                      <Table bordered={false} className="align-middle mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
                        <thead
                          style={{
                            backgroundColor: "rgba(231, 241, 255, 1)",
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                          }}
                        >
                          <tr className="text-uppercase" style={{ textAlign: "center" }}>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>NAME</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>BILLING MONTH</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>FROM</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>TO</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>FLOOR <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>ROOM <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>BED</th>

                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>TOTAL UNITS</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>AMOUNT <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>

                          </tr>
                        </thead>
                        <tbody style={{ fontSize: 13, color: "" }}>
                          <PaginationList>
                            {formattedReadings?.map((row, i) => (
                              <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "", color: "" }}>

                                <td className="p-0 d-flex align-items-center gap-2 ms-4 p-1" style={{ paddingLeft: "", fontWeight: 600, color: "#1E45E1", cursor: "pointer", textAlign: "start" }}
                                  onClick={() => handleTenantsDetailsPage(row)}>
                                  {row.profilePic ?
                                    <img src={row.profilePic} alt="" style={{ marginRight: "12px", height: 40, width: 40 }} />
                                    :
                                    <div
                                      style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#E2E8F0",
                          color: "#44536A",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 11,
                                        fontWeight: "600",
                                         fontFamily: "Gilroy"
                                      }}
                                    >
                                      {row?.initials || "-"}
                                    </div>
                                  }
                                  {row.fullName}
                                </td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.billingMonth}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.from}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.to}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.floorName}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.roomName}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.bedName}</td>

                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.totalUnits}</td>
                                <td style={{ fontWeight: 500, textAlign: "center" }}>{row.totalAmount}</td>

                              </tr>
                            ))}
                          </PaginationList>
                        </tbody>
                      </Table>
                    </div>
                  )
                )}
              </div>
          }
        </div>
      ) : roomDetail ? (
        <EB_RoomOverview room={selectedRoom} onBack={handleBack} />
      ) : tenantsDetail ? (
        <EB_TenantOverview tenant={selectedTenant} onBack={handleBackTenant} />
      ) : null
      }

      {showModal && (
        <AddRoomReading show={showModal} handleClose={handleCloseShowModal} selectedRowDetails={selectedRow} editRoomReading={editRoomReading} />
      )}

      {showHostelModal && (
        <AddHostelReading show={showHostelModal} handleClose={handleCloseHostelShowModal} roomReadingList={roomReadingList} editHostelReading={editHostelReading} />
      )}

      {
        showDelete &&
        <DeleteReading show={showDelete} handleClose={handleCloseDelete} deleteDetails={deleteDetails} />
      }
    </>

  );
};

export default withErrorBoundary(RoomReadingTable);

