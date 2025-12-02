/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import { Table } from "react-bootstrap";
import { Modal, Offcanvas, Button, Form, Dropdown, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import arrowSwap from "../../Assets/Images/New_images/arrow-swap.svg";
import Group from "../../Assets/Images/New_images/Group.svg";
import { CloseCircle, ArrowUp2, ArrowDown2 } from "iconsax-react";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import building from '/src/Assets/Images/New_images/building1.svg';
import PaginationList from "../../Components/PaginationList";
import EB_RoomOverview from "./EB_RoomOverview";
import Ellipse1 from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import EB_TenantOverview from "./EB_TenantOverview";
//  import WhiteCalender from "../../Assets/Images/New_images/ClipPathGroup.svg";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddRoomReading from "./AddRoomReading";
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import ErrorMessage from '../../Components/ErrorMessage';
import Select from "react-select";
import AddHostelReading from "./AddHostelReading";
// import WhiteCalender from  "../../../Assets/Images/New_images/ClipPathGroup.svg";
import withErrorBoundary from "../../Hoc/WithErrorBountry"; 

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

  const [filters, setFilters] = useState([]);

  console.log("roomReadingList", roomReadingList)
  console.log("customerReadingList", customerReadingList)


  useEffect(() => {
    if (!canReadElectricity) {
      setLoading(false);
    } else {
      setLoading(true);
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
  };

  const handleActionReadingClick = () => {
    setShowHostelModal(true);
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
    if (state.UsersList?.getCustomerReadingStatus === 200) {
      setLoading(false)
      setCustomerReadingList(state.UsersList?.getCustomerReadingList)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_CUSTOMER_READING' })
      }, 100)

    }

  }, [state.UsersList?.getCustomerReadingStatus])




  useEffect(() => {
    if (state.UsersList?.addRoomReadingStatusCode === 201) {
      dispatch({ type: 'GETROOMREADING', payload: state.login.selectedHostel_Id })
      dispatch({ type: 'GETCUSTOMERREADING', payload: state.login.selectedHostel_Id })
      setShowModal(false)
      setShowHostelModal(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ADD_ROOM_READING' })
      }, 100)
    }

  }, [state.UsersList?.addRoomReadingStatusCode])






  const isEbBased = state.UsersList?.getRoomReadingList?.isHostelBased




  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);



  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);

  };

  const formattedReadings = customerReadingList?.map((item) => {
    const [day, month, year] = item.startDate.split("/");
    const billingMonth = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    const formatReadingDate = (dateStr) => {
      if (!dateStr) return "-";
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };


    return {
      fullName: item.fullName,
      billingMonth: billingMonth,
      from: formatDate(item.startDate),
      to: formatDate(item.endDate),
      // totalUnits: item.consumption,
      amount: item.consumption * item.unitPrice,
      floorName: item.floorName,
      roomName: item.roomName,
      bedName: item.bedName,
      totalUnits: item.totalUnits,
      totalAmount: item.totalAmount,
    };
  });



  return (


    <>


      {!roomDetail && !tenantsDetail ? (
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
                      boxShadow: "0px 2px 2px rgba(0,0,0,0.2)",
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
                    {/* {isEbBased && ( */}

                    {roomReadingList?.length === 0 && !loading ? (
                      <div style={{ textAlign: "center", marginTop: 40 }}>
                        <img src={emptyimg} width={240} height={240} alt="emptystate" />
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                          No Room Reading
                        </div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                          There are no Room Reading available.
                        </div>
                      </div>
                    ) : (
                      <div className="table-responsive"
                        style={{
                          background: "#fff",
                          borderRadius: 12,
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                          maxHeight: "420px",
                          overflowY: "auto",
                          position: "relative"
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
                            <tr className="text-uppercase" style={{ textAlign: "center" }}>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                FLOOR <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                              </th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                ROOM <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" />
                              </th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>OCCUPANTS</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>BILLING MONTH</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>FROM</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>TO</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>TOTAL UNITS</th>
                              <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>AMOUNT</th>
                              {
                                !isEbBased && <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>ACTION</th>

                              }
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: 14, color: "#000" }}>
                            <PaginationList>
                              {roomReadingList?.map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "", textAlign:"center" }}>
                                  <td style={{ fontSize: 15, fontWeight: 600, textAlign:"center",padding: "12px 16px" }}>{row.floorName}</td>
                                  <td
                                    style={{textAlign:"center",padding: "12px 16px" , color: canReadElectricity ? "#1E45E1" : "#DBDBDB", cursor: "pointer", fontWeight: 600, paddingLeft: "40px" }}
                                    onClick={() => canReadElectricity && handleRoomDetailsPage(row)}
                                  >
                                    {row.roomName}
                                  </td>
                                  <td style={{padding: "12px 16px" }} >{row.noOfTenants}</td>
                                  <td style={{ paddingLeft: "",padding: "12px 16px"  }}>
                                    {row.entryDate !== "N/A"
                                      ? new Date(row.entryDate.split("/").reverse().join("-")).toLocaleString(
                                        "en-US",
                                        { month: "short", year: "numeric" }
                                      )
                                      : "N/A"}
                                  </td>

                                  <td style={{ paddingLeft: "" ,padding: "12px 16px" }}>{row.startDate || "N/A"}</td>
                                  <td style={{ paddingLeft: "" ,padding: "12px 16px" }}>{row.endDate || "N/A"}</td>
                                  <td style={{ paddingLeft: "" ,padding: "12px 16px" }}>{row.consumption}</td>
                                  <td style={{ paddingLeft: "",padding: "12px 16px"  }}>{row.totalPrice || '0'}</td>
                                  {
                                    !isEbBased &&
                                    <td style={{  cursor: canWriteElectricity ? "pointer" : "not-allowed" }}>
                                      <img
                                        src={Group}
                                        alt="action"
                                        style={{
                                          filter: canWriteElectricity ? "none" : "grayscale(100%) brightness(60%)",
                                          opacity: canWriteElectricity ? 1 : 0.6,
                                          cursor: canWriteElectricity ? "pointer" : "not-allowed"
                                        }}
                                        onClick={() => canWriteElectricity && handleActionClick(row)}
                                      />
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
                              position: 'absolute',
                              top: '70%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
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
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                      <img src={emptyimg} width={240} height={240} alt="emptystate" />
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                        No Tenant Reading
                      </div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                        There are no  tenant reading available.
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive"
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
                          <tr className="text-uppercase" style={{ textAlign: "center" }}>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>NAME</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>BILLING MONTH</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>FROM</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>TO</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>FLOOR <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>ROOM <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>BED</th>

                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>TOTAL UNITS</th>
                            <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>AMOUNT <img src={arrowSwap} style={{ marginLeft: "4px" }} alt="swap" /></th>

                          </tr>
                        </thead>
                        <tbody style={{ fontSize: 14, color: "" }}>
                          <PaginationList>
                            {formattedReadings?.map((row, i) => (
                              <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" , color:""}}>

                                <td style={{ paddingLeft: "", fontWeight: 600, color: "#1E45E1", cursor: "pointer", textAlign:"start"  }}
                                  onClick={() => handleTenantsDetailsPage(row)}>
                                  <img src={row.profilePic ? row.profilePic : Ellipse1} alt="" style={{ marginRight: "12px", height: 45, width: 45 }} />
                                  {row.fullName}
                                </td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.billingMonth}</td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.from}</td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.to}</td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.floorName}</td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.roomName}</td>
                                <td style={{ fontWeight: 500 ,textAlign:"center" }}>{row.bedName}</td>

                                <td style={{ fontWeight: 500, paddingLeft: "",textAlign:"center"  }}>{row.totalUnits}</td>
                                <td style={{ fontWeight: 500, paddingLeft: "", textAlign:"center" }}>{row.totalAmount}</td>

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

      {showModal && selectedRow && (
        <AddRoomReading show={showModal} handleClose={handleCloseShowModal} selectedRowDetails={selectedRow} />
      )}

      {showHostelModal && (
        <AddHostelReading show={showHostelModal} handleClose={handleCloseHostelShowModal} roomReadingList={roomReadingList} />
      )}
    </>

  );
};

export default withErrorBoundary(RoomReadingTable);

