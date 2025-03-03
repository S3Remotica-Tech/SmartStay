/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "../Pages/Dashboard.css";
import "sweetalert2/dist/sweetalert2.min.css";
import PayingGuest from "../Pages/PayingGuestFile/PayingGuestMap";
import ParticularHostelDetails from "../Pages/PayingGuestFile/ParticularHostelDetails";
import AddPg from "../Pages/PayingGuestFile/AddPg";
import AddFloor from "../Pages/PayingGuestFile/AddFloor";
import "../Pages/PayingGuestFile/PgList.css";
import Nav from "react-bootstrap/Nav";
import AddRoom from "../Pages/PayingGuestFile/AddRoom";
import { ArrowLeft } from "iconsax-react";
import {
  ArrowUp2,
  ArrowDown2,
  Edit,
  Trash,
} from "iconsax-react";
import { Tab, Row, Col } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from "../Pages/PayingGuestFile/DeleteFloor";
import "react-toastify/dist/ReactToastify.css";
// import Edit from '../Assets/Images/New_images/edit.png';
import EmptyState from "../Assets/Images/New_images/empty_image.png";
import { MdError } from "react-icons/md";
import "./Settings.css";
import { ArrowLeft2, ArrowRight2} from "iconsax-react";
import PropTypes from "prop-types";



function SettingManage(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showHostelDetails, setShowHostelDetails] = useState("");
  const [rolePermission, setRolePermission] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [addPermissionError, setAddPermissionError] = useState("");
  const [editPermissionError, setEditPermissionError] = useState("");
  const [deletePermissionError, setDeletePermissionError] = useState("");
  const [loading, setLoading] = useState(true)


  const popupRef = useRef(null);

  

  const [hidePgList, setHidePgList] = useState(true);

  const [floorClick, setFloorClick] = useState("");

  const [floorName, setFloorName] = useState("");

  const [selectedHostel, setSelectedHostel] = useState(false);

  // showHostelDetails?.floorDetails?.[0]?.floor_name,showHostelDetails?.floorDetails?.[0]?.floor_id

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);


  useEffect(() => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  }, [selectedHostel]);


  useEffect(() => {
    if (state.UsersList?.hosteListStatusCode === 200) {
      setLoading(false);
      setFilteredData(state.UsersList.hostelList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList?.hosteListStatusCode]);

  useEffect(() => {
    if (state.UsersList?.noHosteListStatusCode === 201) {
      setLoading(false);
      setFilteredData([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_HOSTEL_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList?.noHosteListStatusCode]);

  useEffect(() => {
    if (showHostelDetails?.floorDetails?.length === 1) {
      setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
    }
  }, [filteredData]);

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
    if (state.UsersList?.noHosteListStatusCode === 201) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_HOSTEL_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList?.noHosteListStatusCode]);



  useEffect(() => {
    if (
      state.UsersList.createFloorSuccessStatusCode === 200 ||
      state.PgList.updateFloorSuccessStatusCode === 200
    ) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "HOSTELIDDETAILS" });
      // setTimeout(()=>{
      //   setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id)
      // },3000)

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
  
        console.log("updatedFloors", updatedFloors, "lastFloor", lastFloor, "showHostelDetails", showHostelDetails);
        console.log("floorClick", floorClick, "key", key, "floorName", floorName);
  
      
        const newStartIndex = Math.max(0, lastIndex - 2); 
        const newEndIndex = lastIndex; 
  
        
        // const newStart = updatedFloors[newStartIndex]?.floor_id || 0;
        // const newEnd = updatedFloors[newEndIndex]?.floor_id || 0;
  
      
        setVisibleRange([newStartIndex, newEndIndex]);
      } else {
        setFloorClick(null);
        setKey("");
        setFloorName("");
      }
    }
  }, [state.UsersList.createFloorSuccessStatusCode, showHostelDetails?.floorDetails]);
  














  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "HOSTELIDDETAILS" });
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
  }, [state.UsersList.deleteFloorSuccessStatusCode]);

  useEffect(() => {
    if (
      state.PgList.deletePgSuccessStatusCode === 200 ||
      state.PgList.dleteHostelImagesStatusCode === 200
    ) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "HOSTELIDDETAILS" });
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
    state.PgList.dleteHostelImagesStatusCode,
  ]);

  useEffect(() => {
    if (state.PgList.createPgStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "HOSTELIDDETAILS" });

      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
      },100);

      // setPgList({
      //   Name: "",
      //   phoneNumber: "",
      //   email_Id: "",
      //   location: "",
      // });
    }
  }, [state.PgList.createPgStatusCode]);

  useEffect(() => {
    if (selectedHostel) {
      const selected = state.UsersList.hostelList?.find(
        (item) => item.id === showHostelDetails.id
      );
      setShowHostelDetails(selected);
    }
  }, [state.UsersList.hostelList]);

 
 
 

  

  const handleSelectedHostel = (selectedHostelId) => {
    const selected = state.UsersList.hostelList?.find((item) => {
      // setHostelIndex(index);
      return item.id === selectedHostelId;
    });
    setSelectedHostel(true);
    setShowHostelDetails(selected);
  };

  const [showAddPg, setShowAddPg] = useState(false);

  const handleCloses = () => {
    setShowAddPg(false);
    console.log("props:", props);
    if (props.setPgshow) {
      props.setPgshow(false);
    } else {
      console.error("setPgshow is not passed correctly.");
    }
  };

  console.log("props", props);


  useEffect(() => {
    if (props.pgshow) {
      setShowAddPg(true);
      setEditHostelDetails("");
    }
  }, [props.pgshow]);



  const handleShowAddPg = () => {
    setShowAddPg(true);
    setEditHostelDetails("");
  };

  const handleDisplayPgList = (isVisible) => {
    setHidePgList(isVisible);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };


 
  const [showFloor, setShowFloor] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [hostelFloor, setHostelFloor] = useState("");
  const hostelDetails = {
    room: null,
    selectedFloor: null
};
  const [editFloor, setEditFloor] = useState({
    hostel_Id: null,
    floor_Id: null,
    floorName: null,
  });

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

  const handlebackToPG = () => {
    setSelectedHostel(false);
    setFloorClick("");
    setFloorName("");
    setHidePgList(true);
    setVisibleRange([0,2])
  };

  const handleDIsplayFloorClick = () => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  };


 

  // useEffect(() => {
  //   if (stateAccount.statusCodeForAccountList == 200) {
  //     const loginProfile = stateAccount.accountList[0].user_details.profile;

  //     setProfile(loginProfile);
  //   }
  // }, [stateAccount.statusCodeForAccountList]);

  const [editHostelDetails, setEditHostelDetails] = useState("");


  

  const handleEditHostel = (hostelDetails) => {
    setShowAddPg(true);
    setEditHostelDetails(hostelDetails);
  };

  const [key, setKey] = useState("1");

  const [visibleRange, setVisibleRange] = useState([0, 2]);


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

  useEffect(() => {
    if (floorClick) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      });

      setFloorName(FloorNameData[0]?.floor_name);
    }
  }, [selectedHostel, floorClick]);


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      dispatch({
        type: "ROOMCOUNT",
        payload: { floor_Id: floorClick, hostel_Id: showHostelDetails.id },
      });

      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "HOSTELIDDETAILS" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 4000);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    if (state.PgList.statusCodeCreateRoom === 200) {
      setShowRoom(false);
    }
  }, [state.PgList.statusCodeCreateRoom]);

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
    // setFloorClick(1)
  };

  const [update, setUpdate] = useState(false);

  const handleEditFloor = (floor_Id, hostel_Id, floorName) => {
    setShowFloor(true);
    setEditFloor({ hostel_Id, floor_Id, floorName });
    setUpdate(true);
  };

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries
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
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[3]?.per_view === 1
    ) {
      setPermissionError("");
    } else {
      setPermissionError("Permission Denied");
    }
  }, [rolePermission]);
  useEffect(() => {

    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[3]?.per_create === 1
    ) {
      setAddPermissionError("");
    } else {
      setAddPermissionError("Permission Denied");
    }
  }, [rolePermission]);
  useEffect(() => {

    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[3]?.per_edit === 1
    ) {
      setEditPermissionError("");
    } else {
      setEditPermissionError("Permission Denied");
    }
  }, [rolePermission]);
  useEffect(() => {

    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[3]?.per_delete === 1
    ) {
      setDeletePermissionError("");
    } else {
      setDeletePermissionError("Permission Denied");
    }
  }, [rolePermission]);




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
            {/* Image */}
            <img
              src={EmptyState}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            {/* Permission Error */}
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
                <span>{permissionError}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container" style={{ position: "relative" }}>


          {loading &&
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: '200px',
                display: 'flex',
                height: "50vh",
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




          {hidePgList && (
            <>
              <div
                className=" justify-content-between d-flex align-items-center"
                style={{
                  position: "sticky",
                  top: 0,
                  right: 0,
                  left: 0,
                  zIndex: 1000,
                  backgroundColor: "#FFFFFF",
                  height: 83,
                }}
              >
              
                <div >
                  <label
                    style={{
                      fontSize: 18,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Manage PG
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                 

                  <div>
                    <Button
                      onClick={handleShowAddPg}
                      disabled={addPermissionError}
                     
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "12px 57px",
                        width: "auto",
                        maxWidth: "100%",
                        marginBottom: "10px",
                        maxHeight: 45,
                        marginTop: "15px",

                      }}
                    >
                      {" "}
                      + PG
                    </Button>
                  </div>
                </div>
                
              </div>

              {/* {searchQuery && (
                <div
                  className="container ms-4 mb-4"
                  style={{ marginTop: "20px", fontWeight: 600, fontSize: 16 }}
                >
                  {filteredData.length > 0 ? (
                    <span
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 16,
                        color: "rgba(100, 100, 100, 1)",
                      }}
                    >
                      {filteredData.length} result
                      {filteredData.length > 1 ? "s" : ""} found for{" "}
                      <span
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(34, 34, 34, 1)",
                        }}
                      >
                        "{searchQuery}"
                      </span>
                    </span>
                  ) : (
                    <span
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 16,
                        color: "rgba(100, 100, 100, 1)",
                      }}
                    >
                      No results found for{" "}
                      <span
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(34, 34, 34, 1)",
                        }}
                      >
                        "{searchQuery}"
                      </span>
                    </span>
                  )}
                </div>
              )} */}
              <div className="mt-2" style={{
                maxHeight: "400px",
                overflowY: "auto",
                overflowX:"hidden"
              }}>
                <div className="row row-gap-3">
                  {currentItems?.length > 0 ?
                    currentItems.map((hostel) => {
                      return (
                        <>
                          <div
                            key={hostel.id}
                            className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12 settingmanage"
                          >
                            <PayingGuest
                              hostel={hostel}
                              key={hostel.id}
                              OnSelectHostel={handleSelectedHostel}
                              onRowVisiblity={handleDisplayPgList}
                              OnEditHostel={handleEditHostel}
                              editPermissionError={editPermissionError}
                              deletePermissionError={deletePermissionError}
                            />
                          </div>
                        </>
                      );
                    })
                    :
                    !loading && (
                      <div
                        className="d-flex align-items-center justify-content-center fade-in"
                        style={{
                          width: "100%",
                          margin: "0px auto",
                          backgroundColor: "",
                          marginTop: 90,
                          justifyContent: "center", alignItems: "center"
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
                            No Paying Guest available
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
                            There are no Paying Guest added.
                          </div>

                        </div>
                        <div></div>
                      </div>
                    )}


                </div>
              </div>
              {filteredData.length >= 5 && (
                <nav className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center"
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "end", 
                //   padding: "10px",

                // }}
                >
                  {/* Dropdown for Items Per Page */}
                  <div>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      style={{
                        padding: "5px",
                        border: "1px solid #1E45E1",
                        borderRadius: "5px",
                        color: "#1E45E1",
                        fontWeight: "bold",
                        cursor: "pointer",
                        outline: "none",
                        boxShadow: "none",

                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>

                  {/* Pagination Controls */}
                  <ul
                    style={{
                      display: "flex",
                      alignItems: "center",
                      listStyleType: "none",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {/* Previous Button */}
                    <li style={{ margin: "0 10px" }}>
                      <button
                        style={{
                          padding: "5px",
                          textDecoration: "none",
                          color: currentPage === 1 ? "#ccc" : "#1E45E1",
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                          borderRadius: "50%",
                          display: "inline-block",
                          minWidth: "30px",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                      </button>
                    </li>

                    {/* Current Page Indicator */}
                    <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                      {currentPage} of {totalPages}
                    </li>

                    {/* Next Button */}
                    <li style={{ margin: "0 10px" }}>
                      <button
                        style={{
                          padding: "5px",
                          textDecoration: "none",
                          color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                          borderRadius: "50%",
                          display: "inline-block",
                          minWidth: "30px",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ArrowRight2
                          size="16"
                          color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                        />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

             
            </>
          )}

{selectedHostel && (
            <div className="container mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <ArrowLeft
                    size="32"
                    color="#222222"
                    onClick={handlebackToPG}
                    style={{ cursor: "pointer" }}
                  />

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
                    {/* <Sort Size="24" color="#222" variant="Outline" /> */}
                    {/* <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} /> */}
                  </div>

                  <div style={{marginTop:5}}>
                    <Button
                      style={{
                        fontSize: 14,
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "11px 50px",
                        paddingLeft:52,
                        fontFamily: "Gilroy",
                      }}
                      disabled={addPermissionError}
                      onClick={() => handleAddFloors(showHostelDetails.id)}
                    >
                      +  Floor
                    </Button>
                  </div>
                </div>
              </div>

              <div className="show-scroll"  style={{ maxHeight: "500px", overflowY: "auto" }}>
                {showHostelDetails?.floorDetails?.length > 0 ? (
                  <Tab.Container
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    id="vertical-tabs-example"
                  >
                    <Row className="g-0">
                      <Col
                        sm={12}
                        xs={12}
                        md={2}
                        lg={2}
                        className="d-flex justify-content-start"
                      >
                        <div>
                          <div className="d-flex justify-content-center">
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
                                  visibleRange[0] === 0
                                    ? "rgba(156, 156, 156, 1)"
                                    : "#000000"
                                }
                                variant="Bold"
                              />
                            </div>
                          </div>

                          <Nav variant="" className="flex-column">
                            {showHostelDetails.floorDetails.map(
                              (floor, index) =>
                                index >= visibleRange[0] &&
                                index <= visibleRange[1] && (
                                  <Nav.Item
                                    key={floor.floor_id}
                                    onClick={() =>
                                      handleFloorClick(
                                        floor.floor_id,
                                        floor.floor_name
                                      )
                                    }
                                    className={`mb-3 mt-2 d-flex justify-content-center a
                              lign-items-center  ${Number(floorClick) === Number(floor.floor_id)
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
                                          Number(floorClick) ===
                                            Number(floor.floor_id)
                                            ? "ActiveNumberFloor"
                                            : "UnActiveNumberFloor"
                                        }
                                        style={{
                                          fontSize: 32,
                                          fontFamily: "Gilroy",
                                          fontWeight: 600,
                                          textTransform: "capitalize",
                                          height: "fit-content",
                                        }}
                                      >
                                                                                {floor.floor_name
                                          ? isNaN(floor.floor_name)
                                            ? floor.floor_name.charAt(0) 
                                            : floor.floor_name            
                                          : floor.floor.id                
                                        }
                                      </div>
                                      <div
                                        className={
                                          Number(floorClick) ===
                                            Number(floor.floor_id)
                                            ? "ActiveFloortext"
                                            : "UnActiveFloortext"
                                        }
                                        style={{
                                          fontSize: 14,
                                          fontFamily: "Gilroy",
                                          fontWeight: 600,
                                          textTransform: "capitalize",
                                          wordBreak: "break-word",
                                          whiteSpace: "normal",
                                          overflowWrap: "break-word",
                                          width: "100%",
                                          textAlign: "center",
                                          padding: "1px 16px ",
                                        }}
                                      >
                                                                               {typeof floor.floor_name === "string" &&
                                          floor.floor_name.trim() !== "" &&
                                          floor.floor_name !== "null"
                                          ? isNaN(floor.floor_name)
                                            ? floor.floor_name
                                            : floor.floor_name
                                          : floor.floor_id}
                                      </div>

                                    </Nav.Link>
                                  </Nav.Item>
                                )
                            )}
                          </Nav>

                          <div className="d-flex justify-content-center">
                            <div
                              onClick={handleNext}
                              disabled={
                                key === (showHostelDetails.number_Of_Floor - 1).toString()
                              }
                              style={{
                                border: "1px solid rgba(239, 239, 239, 1)",
                                width: "fit-content",
                                borderRadius: 50,
                                padding: 3,
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
                               style={{cursor:"pointer"}}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col sm={12} xs={12} md={10} lg={10}>
                        <div className="container">
                          <div className="d-flex justify-content-between align-items-center">
                            <div
                              style={{
                                fontSize: 20,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                textTransform: "capitalize",
                              }}
                            >
                              {floorName !== null &&
                                floorName !== undefined &&
                                floorName.trim() !== ""
                                ? floorName
                                : ""}
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
                                   backgroundColor: showDots ? "#E7F1FF" : '#fff'
                                }}
                                onClick={() => handleShowDots()}
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
                                        backgroundColor: "#f9f9f9",
                                        position: "absolute",
                                        right: 0,
                                        top: 50,
                                        width: 140,
                                        height: "auto",
                                        border: "1px solid #EBEBEB",
                                        borderRadius: 10,
                                        display: "flex",
                                        justifyContent: "start",
                                        padding:'6px',
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        <div
                                          className="d-flex gap-2 mb-2 align-items-center"
                                          // onClick={() => {
                                          //   if (editPermissionError) {
                                          //     handleEditFloor(floorClick, showHostelDetails.id, floorName);
                                          //   }
                                          // }}
                                          onClick={() => handleEditFloor(floorClick, showHostelDetails.id, floorName)}
                                          style={{
                                            cursor: editPermissionError ? "not-allowed" : "pointer",
                                            opacity: editPermissionError ? 0.6 : 1,
                                          }}
                                        >
                                          <div>
                                            <Edit
                                              size="16"
                                              color={editPermissionError ? "#888888" : "#1E45E1"}
                                            />
                                          </div>
                                          <div>
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                fontFamily: "Outfit, sans-serif",
                                                color: editPermissionError ? "#888888" : "#222222",
                                                cursor: editPermissionError ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Edit
                                            </label>
                                          </div>
                                        </div>


                                        <div
                                          className="d-flex gap-2 mb-2 align-items-center"
                                          onClick={() => {
                                            if (!deletePermissionError) {
                                              handleShowDelete(floorClick, showHostelDetails.id, floorName);
                                            }
                                          }}
                                          style={{
                                            cursor: deletePermissionError ? "not-allowed" : "pointer",
                                            opacity: deletePermissionError ? 0.6 : 1,
                                          }}
                                        >
                                          <div>
                                            <Trash
                                              size="16"
                                              color={deletePermissionError ? "#888888" : "red"}
                                            />
                                          </div>
                                          <div>
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                fontFamily: "Gilroy",
                                                color: deletePermissionError ? "#888888" : "#FF0000",
                                                cursor: deletePermissionError ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Delete
                                            </label>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Tab.Content>
                          <ParticularHostelDetails
                            floorID={floorClick}
                            hostel_Id={showHostelDetails.id}
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
                        <Button
                          style={{
                            fontSize: 16,
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: 12,
                            padding: "20px 40px",
                            fontFamily: "Gilroy",
                          }}
                          onClick={() => handleAddFloors(showHostelDetails.id)}
                        >
                          {" "}
                          + Add floor
                        </Button>
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
              currentItem={editHostelDetails}
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
SettingManage.propTypes = {
  setPgshow: PropTypes.func.isRequired,
  pgshow: PropTypes.func.isRequired,
};
export default SettingManage;
