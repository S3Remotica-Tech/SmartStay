/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "../../Pages/Dashboard.css";
import "sweetalert2/dist/sweetalert2.min.css";
import ParticularHostelDetails from "../../Pages/PayingGuestFile/ParticularHostelDetails";
import AddPg from "./AddPg";
import AddFloor from "./AddFloor";
import "./PgList.css";
import Nav from "react-bootstrap/Nav";
import AddRoom from "./AddRoom";
import PropTypes from "prop-types";
import {
  ArrowUp2,
  ArrowDown2,
  Edit,
  Trash,
} from "iconsax-react";
import { Tab, Row, Col } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from "./DeleteFloor";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import availabeimg from "../../Assets/Images/New_images/available-circle.png";
import occubiedimg from "../../Assets/Images/New_images/occubied-circle.png";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import overdueimg from "../../Assets/Images/New_images/overdueimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import { MdError } from "react-icons/md";
import './PgList.css';

function PgList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [showHostelDetails, setShowHostelDetails] = useState("");
  const [rolePermission, setRolePermission] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [addPermissionError, setAddPermissionError] = useState("");
  const [editPermissionError, setEditPermissionError] = useState("");
  const [deletePermissionError, setDeletePermissionError] = useState("");


  const [key, setKey] = useState("1");

  const [visibleRange, setVisibleRange] = useState([0, 2]);

  const popupRef = useRef(null);




 
  const [floorClick, setFloorClick] = useState("");
  const [floorName, setFloorName] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

 

  const [showAddPg, setShowAddPg] = useState(false);



  const [showFloor, setShowFloor] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [hostelFloor, setHostelFloor] = useState("");
  const hostelDetails = {
    room: null,
    selectedFloor: null,
  };

  const [editFloor, setEditFloor] = useState({
    hostel_Id: null,
    floor_Id: null,
    floorName: null,
  });

  
  const [hostel_Id, setHostel_Id] = useState("")


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
          }
  }, [state?.login?.selectedHostel_Id]);




  useEffect(() => {
    if (hostel_Id) {
  
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
    }
  }, [hostel_Id]);




  useEffect(() => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  }, [selectedHostel, hostel_Id]);





  useEffect(() => {

    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {


    

      setFilteredData(state.UsersList.hotelDetailsinPg);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      }, 100);
    }
  }, [state.UsersList?.statuscodeForhotelDetailsinPg]);

  useEffect(() => {
    if (state.UsersList?.noAllHosteListStatusCode === 201) {
          setFilteredData([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_HOSTEL_DETAILS" });
      }, 1000);
    }
  }, [state.UsersList?.noAllHosteListStatusCode]);

  useEffect(() => {
    if (showHostelDetails?.floorDetails?.length === 1) {
      setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
    }
  }, [filteredData[0]]);



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.UsersList?.noHosteListStatusCode === 201) {
           setTimeout(() => {
        dispatch({ type: "CLEAR_NO_HOSTEL_STATUS_CODE" });
      }, 100);
    }
  }, [state.UsersList?.noHosteListStatusCode]);


  useEffect(() => {
    if (
      state.UsersList.createFloorSuccessStatusCode === 200 ||
      state.PgList.updateFloorSuccessStatusCode === 200
    ) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });



      setShowFloor(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_FLOOR_STATUS_CODE" });
        dispatch({ type: "CLEAR_UPDATE_FLOOR_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.UsersList.createFloorSuccessStatusCode,
    state.PgList.updateFloorSuccessStatusCode,
  ]);




  useEffect(() => {
    if (state.UsersList.createFloorSuccessStatusCode === 200 && showHostelDetails?.floorDetails.length > 0) {
      const updatedFloors = showHostelDetails?.floorDetails || [];
      if (updatedFloors.length > 0) {
        const lastFloor = updatedFloors[updatedFloors.length - 1];
        const lastIndex = updatedFloors.length - 1;
        setFloorClick(lastFloor?.floor_id || null);
        setKey(lastFloor?.floor_id?.toString() || "");
        setFloorName(lastFloor?.floor_name || "");


        const newStart = Math.max(0, lastIndex - 2);
        const newEnd = lastIndex;
        setVisibleRange([newStart, newEnd]);




      } else {
        setFloorClick(null);
        setKey("");
        setFloorName("");
      }
    }
  }, [state.UsersList.createFloorSuccessStatusCode, showHostelDetails?.floorDetails])


  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
      dispatch({ type: "HOSTELLIST" });
      setShowDelete(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_FLOOR" });

        const updatedFloors = showHostelDetails?.floorDetails || [];

        if (updatedFloors.length > 0) {

          const firstVisibleFloor = updatedFloors.find(
            (_, index) => index >= visibleRange[0] && index <= visibleRange[1]
          );

          if (firstVisibleFloor) {
            setFloorClick(firstVisibleFloor.floor_id);
            setKey(firstVisibleFloor.floor_id.toString());
            setFloorName(firstVisibleFloor.floor_name);
          } else {

            setFloorClick(updatedFloors[0]?.floor_id || null);
            setKey(updatedFloors[0]?.floor_id?.toString() || "");
            setFloorName(updatedFloors[0]?.floor_name || "");
          }
        } else {
          setFloorClick(null);
          setKey("");
          setFloorName("");
        }
      }, 500);
    }
  }, [state.UsersList.deleteFloorSuccessStatusCode,]);







  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELIDDETAILS" });
      dispatch({ type: "HOSTELLIST" });
      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_IMAGES" });

      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.PgList.deletePgSuccessStatusCode,
  ]);

  useEffect(() => {
    if (state.PgList.dleteHostelImagesStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" })

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_IMAGES" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [state.PgList.dleteHostelImagesStatusCode,]);

  useEffect(() => {
    if (state.PgList.createPgStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });

      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
      }, 1000);


    }
  }, [state.PgList.createPgStatusCode]);

  useEffect(() => {
    if (selectedHostel && showHostelDetails) {
      const selected = state.UsersList.hotelDetailsinPg?.find(
        (item) => item.id === showHostelDetails.id
      );
      setShowHostelDetails(selected);

      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");


    }
  }, [state.UsersList.hotelDetailsinPg]);




  useEffect(() => {
    if (floorClick) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");
    }
  }, [selectedHostel, floorClick]);

  useEffect(() => {
    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {

        return item.floor_id === floorClick;
      }) || [];
      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");

    }
  }, [state.UsersList.statuscodeForhotelDetailsinPg, showHostelDetails, floorClick]);

  useEffect(() => {
    if (state.UsersList.hosteListStatusCode === 200) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");

      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTELLIST_STATUS_CODE' })
      }, 1000)
    }

  }, [state.UsersList.hosteListStatusCode])




  useEffect(() => {
    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");


    }

  }, [state.UsersList?.statuscodeForhotelDetailsinPg])


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      dispatch({
        type: "ROOMCOUNT",
        payload: { floor_Id: floorClick, hostel_Id: showHostelDetails.id },
      });

      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 100);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    if (state.PgList.statusCodeCreateRoom === 200) {
      setShowRoom(false);
    }
  }, [state.PgList.statusCodeCreateRoom]);


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
      appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });
  useEffect(() => {
    setRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);


  useEffect(() => {
    const userType = rolePermission[0]?.user_details?.user_type;
const isAdmin = userType === "admin" || userType === "agent";

     if (isAdmin) {
    if (state?.login?.planStatus === 0) {
      setPermissionError("");
      setAddPermissionError("Permission Denied");
      setEditPermissionError("Permission Denied");
      setDeletePermissionError("Permission Denied");

    } else if (state?.login?.planStatus === 1) {
      setPermissionError("");
      setAddPermissionError("");
      setEditPermissionError("");
      setDeletePermissionError("");
    }
  }

  }, [state?.login?.planStatus, state?.login?.selectedHostel_Id,rolePermission ])


  useEffect(() => {
  if (rolePermission[0]?.user_details?.user_type === "staff") {
    const rolesPermission = rolePermission[0]?.role_permissions?.find(
      (perm) => perm.permission_name === "Paying Guest"
    );

    const planActive = state?.login?.planStatus === 1;

    if (rolesPermission) {
      if (rolesPermission.per_view === 1 && planActive) {
        setPermissionError("");
      } else {
        setPermissionError("Permission Denied");
      }

 
      if (rolesPermission.per_create === 1 && planActive) {
        setAddPermissionError("");
      } else {
        setAddPermissionError("Permission Denied");
      }

 
      if (rolesPermission.per_edit === 1 && planActive) {
        setEditPermissionError("");
      } else {
        setEditPermissionError("Permission Denied");
      }


      if (rolesPermission.per_delete === 1 && planActive) {
        setDeletePermissionError("");
      } else {
        setDeletePermissionError("Permission Denied");
      }
    }
  } 
}, [state?.login?.planStatus, state?.login?.selectedHostel_Id, rolePermission]);



useEffect(() => {
    if (state.login.selectedHostel_Id) {
    const selected = state.UsersList.hotelDetailsinPg?.find((item) => {
      return item.id === state.login.selectedHostel_Id;
    });
    setSelectedHostel(true);

    setShowHostelDetails(selected);

    }
  }, [state.login?.selectedHostel_Id, selectedHostel,state.UsersList.hotelDetailsinPg])



  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  






  const handleCloses = () => {
    setShowAddPg(false);

  };






  
 








  const handleAddFloors = (hostel_Id) => {
    setShowFloor(true);
    setHostelFloor(hostel_Id);
    setUpdate(false);
    setEditFloor({ hostel_Id: null, floor_Id: null, floorName: null });
  };

  const handleCloseFloor = () => {
    setShowFloor(false);
    dispatch({ type: "CLEAR_ALREADY_FLOOR_ERROR" });
    dispatch({ type: "CLEAR_UPDATE_FLOOR_ERROR" });
  };



  const handlecloseRoom = () => {
    setShowRoom(false);
  };

 

  const handleDIsplayFloorClick = () => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  };






 

  





 



  const numberOfFloors =
    showHostelDetails && showHostelDetails?.floorDetails?.length;



  const handlePrev = () => {
    if (floorClick > 0) {

      const prevFloorIndex = showHostelDetails.floorDetails.findIndex(
        (floor) => floor.floor_id === floorClick
      ) - 1;

      if (prevFloorIndex >= 0) {
        const prevFloor = showHostelDetails.floorDetails[prevFloorIndex];


        setKey(prevFloor.floor_id.toString());
        setFloorClick(prevFloor.floor_id);
        setFloorName(prevFloor.floor_name);


        if (prevFloorIndex < visibleRange[0]) {
          setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
        }
      }
    }
  };




  const handleNext = () => {
    const floorIndex = showHostelDetails.floorDetails.findIndex(
      (floor) => floor.floor_id === floorClick
    );

    if (floorIndex !== -1 && floorIndex < showHostelDetails.floorDetails.length - 1) {
      const nextFloor = showHostelDetails.floorDetails[floorIndex + 1];


      setKey(nextFloor.floor_id.toString());
      setFloorClick(nextFloor.floor_id);
      setFloorName(nextFloor.floor_name);

      if (floorIndex + 1 > visibleRange[1]) {
        setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
      }
    }
  };








  const handleFloorClick = (floorNumber, floorName) => {
    setFloorClick(floorNumber);
    setKey(floorNumber.toString());
    setFloorName(floorName);
  };



  const handleShowDots = () => {
    setShowDots(!showDots);
  };

  const [showDelete, setShowDelete] = useState(false);
  const [deleteFloor, setDeleteFloor] = useState({
    floor_Id: null,
    hostel_Id: null,
    floor_Name: null,
  });


 

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (FloorNumber, hostel_Id, floorName) => {

    setShowDelete(true);
    setDeleteFloor({
      floor_Id: FloorNumber,
      hostel_Id: hostel_Id,
      floor_Name: floorName,
    });

  };

  const [update, setUpdate] = useState(false);

  const handleEditFloor = (floor_Id, hostel_Id, floorName) => {
    setShowFloor(true);
    setEditFloor({ hostel_Id, floor_Id, floorName });
    setUpdate(true);
  };






  return (
    <>
      {permissionError ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >

            <img
              src={EmptyState}
              alt="Empty State"

            />


            {permissionError && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <MdError size={20} />
                <span style={{
                  fontSize: "12px",
                  color: "red",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}>{permissionError}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container">
    
          {selectedHostel && (
            <div className="container mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                 
                  <label
                    className="ms-4"
                    style={{
                      fontSize: 18,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {showHostelDetails?.Name}
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">

                  </div>

                  <div style={{ marginTop: 5 }}>
                    <Button
                      style={{
                        fontSize: 14,
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "11px 50px",
                        paddingLeft: 52,
                        fontFamily: "Gilroy",
                      }}
                      disabled={addPermissionError}
                      onClick={() => handleAddFloors(state.login.selectedHostel_Id)}
                    >
                      +  Floor
                    </Button>
                  </div>
                </div>
              </div>

              <div className="show-scroll"
              >
                {showHostelDetails?.floorDetails?.length > 0 ? (
                  <Tab.Container
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    id="vertical-tabs-example"
                  >
                 <Row className="g-0">
 
  <Col xs={12} md={1} className="mb-3 mb-md-0">
    <div style={{ position: "sticky", top: 80, zIndex: 10 }}>
      <div className="d-flex justify-content-center mb-2">
        <div
          onClick={handlePrev}
          disabled={visibleRange[0] === 0}
          style={{
            border: "1px solid rgba(239, 239, 239, 1)",
            width: "fit-content",
            borderRadius: 50,
            cursor: "pointer",
            padding: 3,
          }}
        >
          <ArrowUp2
            size="32"
            color={
              visibleRange[0] === 0 ? "rgba(156, 156, 156, 1)" : "#000000"
            }
            variant="Bold"
          />
        </div>
      </div>

      <Nav variant="" className="flex-column align-items-center">
        {showHostelDetails.floorDetails.map((floor, index) =>
          index >= visibleRange[0] && index <= visibleRange[1] ? (
            <Nav.Item
              key={floor.floor_id}
              onClick={() =>
                handleFloorClick(floor.floor_id, floor.floor_name)
              }
              className={`mb-3 d-flex justify-content-center align-items-center ${
                Number(floorClick) === Number(floor.floor_id)
                  ? "active-floor"
                  : "Navs-Item"
              }`}
              style={{
                border: "1px solid rgba(156, 156, 156, 1)",
                borderRadius: 16,
                height: 95,
                width: 95,
                overflowY: "auto",
              }}
            >
              <Nav.Link
                className="text-center Paying-Guest"
                style={{ padding: "unset" }}
              >
                <div
                  className={
                    Number(floorClick) === Number(floor.floor_id)
                      ? "ActiveNumberFloor"
                      : "UnActiveNumberFloor"
                  }
                  style={{
                    fontSize: 32,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {floor.floor_name
                    ? isNaN(floor.floor_name)
                      ? floor.floor_name.charAt(0)
                      : floor.floor_name
                    : floor.floor_id}
                </div>
                <div
                  className={
                    Number(floorClick) === Number(floor.floor_id)
                      ? "ActiveFloortext"
                      : "UnActiveFloortext"
                  }
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    width: "100%",
                    textAlign: "center",
                    padding: "1px 8px",
                  }}
                >
                  {typeof floor.floor_name === "string" &&
                  floor.floor_name.trim() !== "" &&
                  floor.floor_name !== "null"
                    ? floor.floor_name
                    : floor.floor_id}
                </div>
              </Nav.Link>
            </Nav.Item>
          ) : null
        )}
      </Nav>

      <div className="d-flex justify-content-center mt-2">
        <div
          onClick={handleNext}
          disabled={visibleRange[1] === numberOfFloors - 1}
          style={{
            border: "1px solid rgba(239, 239, 239, 1)",
            width: "fit-content",
            borderRadius: 50,
            padding: 3,
            cursor: "pointer",
          }}
        >
          <ArrowDown2
            size="32"
            color={
              visibleRange[1] === numberOfFloors - 1
                ? "rgba(156, 156, 156, 1)"
                : "#000000"
            }
            variant="Bold"
          />
        </div>
      </div>
    </div>
  </Col>

  
  <Col xs={12} md={11} className="ps-md-4"  >
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          style={{
            fontSize: 20,
            fontFamily: "Gilroy",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {floorName && floorName.trim() !== "" ? floorName : ""}
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex flex-row flex-wrap">
            <p style={{ margin: 10, fontFamily: "Gilroy", fontSize: 14, fontWeight: 500 }}>
              <img className="me-1 mb-1" src={availabeimg} alt="available" />
              Available
            </p>
            <p style={{ margin: 10, fontFamily: "Gilroy", fontSize: 14, fontWeight: 500 }}>
              <img className="me-1 mb-1" src={occubiedimg} alt="occupied" />
              Occupied
            </p>
            <p style={{ margin: 10, fontFamily: "Gilroy", fontSize: 14, fontWeight: 500 }}>
              <img className="me-1 mb-1" src={recerverimg} alt="reserved" />
              Reserved
            </p>
            <p style={{ margin: 10, fontFamily: "Gilroy", fontSize: 14, fontWeight: 500 }}>
              <img className="me-1 mb-1" src={overdueimg} alt="overdue" />
              Overdue
            </p>
            <p style={{ margin: 10, fontFamily: "Gilroy", fontSize: 14, fontWeight: 500 }}>
              <img className="me-1 mb-1" src={noticeimg} alt="notice" />
              Notice Period
            </p>
          </div>

    
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
              backgroundColor: showDots ? "#E7F1FF" : "#fff",
            }}
            onClick={handleShowDots}
          >
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
            {showDots && (
              <div
                ref={popupRef}
                className="pg-card"
                style={{
                  backgroundColor: "#fff",
                  position: "absolute",
                  right: 40,
                  top: 10,
                  border: "1px solid #E0E0E0",
                  borderRadius: 10,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  width: 140,
                  zIndex: 1000,
                }}
              >
                <div>
                  <div
                    className="d-flex gap-2 align-items-center"
                    onClick={
                      !editPermissionError
                        ? () => handleEditFloor(floorClick, showHostelDetails.id, floorName)
                        : undefined
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      pointerEvents: editPermissionError ? "none" : "auto",
                      opacity: editPermissionError ? 0.5 : 1,
                      cursor: editPermissionError ? "not-allowed" : "pointer",
                    }}
                  >
                    <Edit size="16" color={editPermissionError ? "#A0A0A0" : "#1E45E1"} />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: editPermissionError ? "#A0A0A0" : "#1E45E1",
                      }}
                    >
                      Edit
                    </span>
                  </div>

                  <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "4px 0" }} />

                  <div
                    className="d-flex gap-2 align-items-center"
                    onClick={
                      !deletePermissionError
                        ? () => handleShowDelete(floorClick, showHostelDetails.id, floorName)
                        : undefined
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      pointerEvents: deletePermissionError ? "none" : "auto",
                      opacity: deletePermissionError ? 0.5 : 1,
                      cursor: deletePermissionError ? "not-allowed" : "pointer",
                    }}
                  >
                    <Trash size="16" color={deletePermissionError ? "#A0A0A0" : "#FF0000"} />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: deletePermissionError ? "#A0A0A0" : "#FF0000",
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>

    <Tab.Content>
      <ParticularHostelDetails
        floorID={floorClick}
        hostel_Id={state.login?.selectedHostel_Id}
        phoneNumber={showHostelDetails.hostel_PhoneNo}
        editPermissionError={editPermissionError}
        deletePermissionError={deletePermissionError}
        addPermissionError={addPermissionError}
      />
    </Tab.Content>
  </Col>
</Row>

                  </Tab.Container>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center animated-text mt-5"
                    style={{
                      width: "100%",
                      margin: "0px auto",
                      backgroundColor: "",
                    }}
                  >
                    <div>
                      <div className="d-flex  justify-content-center">
                        <img
                          src={EmptyState}
                          style={{ height: 240, width: 240 }}
                          alt="Empty state"
                        />
                      </div>
                      <div
                        className="pb-1 mt-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 20,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        No floors available
                      </div>
                      <div
                        className="pb-1 mt-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        There is no floor added to this paying guest.
                      </div>
                      <div className="d-flex justify-content-center pb-1 mt-3">
                        {" "}

                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {showAddPg && (



            <AddPg
              show={showAddPg}
              handleClose={handleCloses}
                   editPermissionError={editPermissionError}
              deletePermissionError={deletePermissionError}
              addPermissionError={addPermissionError}
            />
          )}
          {showDelete && (
            <DeleteFloor
              show={showDelete}
              handleClose={handleCloseDelete}
              currentItem={deleteFloor}
              editPermissionError={editPermissionError}
              deletePermissionError={deletePermissionError}
              addPermissionError={addPermissionError}
            />
          )}
          {showFloor && (
            <AddFloor
              updateFloor={update}
              show={showFloor}
              handleClose={handleCloseFloor}
              hostelFloor={hostelFloor}
              openFloor={handleDIsplayFloorClick}
              editFloor={editFloor}
              editPermissionError={editPermissionError}
              deletePermissionError={deletePermissionError}
              addPermissionError={addPermissionError}
            />
          )}
          {showRoom && (
            <AddRoom
              show={showRoom}
              handleClose={handlecloseRoom}
              hostelDetails={hostelDetails}
              editPermissionError={editPermissionError}
              deletePermissionError={deletePermissionError}
              addPermissionError={addPermissionError}
            />
          )}


        </div>
      )}


    </>
  );
}
PgList.propTypes = {
  displaysettings: PropTypes.func.isRequired,
};
export default PgList;
