/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "../../Pages/Dashboard.css";
import "sweetalert2/dist/sweetalert2.min.css";
import PayingHostel from "./PayingHostel";
import ParticularHostelDetails from "../../Pages/PayingGuestFile/ParticularHostelDetails";
import AddPg from "./AddPg";
import AddFloor from "./AddFloor";
import "./PgList.css";
import Nav from "react-bootstrap/Nav";
import AddRoom from "./AddRoom";
import { ArrowLeft } from "iconsax-react";
import { FormControl, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  ArrowUp2,
  ArrowDown2,
  CloseCircle,
  Edit,
  Trash,
} from "iconsax-react";
import { Tab, Row, Col } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from "./DeleteFloor";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { MdError } from "react-icons/md";
import './PgList.css';

function PgList(props) {
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

 
  

  const [hidePgList, setHidePgList] = useState(true);
  const [floorClick, setFloorClick] = useState("");
  const [floorName, setFloorName] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const [loader, setLoader] = useState(false);
  const [editHostelDetails, setEditHostelDetails] = useState("");
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

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [hostel_Id, setHostel_Id] = useState("")


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
      setSelectedHostel(false);
      setFloorClick("");
      setFloorName("");
      setHidePgList(true);
    }
  }, [state?.login?.selectedHostel_Id]);


 

  useEffect(() => {
    if (hostel_Id) {
      setLoader(true)
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
    }
  }, [hostel_Id]);




  useEffect(() => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  }, [selectedHostel]);


 
   
   

  useEffect(() => {

    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
    

      setTimeout(() => {
          setLoader(false);
     
      }, 100)

      setFilteredData(state.UsersList.hotelDetailsinPg);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      }, 100);
    }
  }, [state.UsersList?.statuscodeForhotelDetailsinPg]);

  useEffect(() => {
    if (state.UsersList?.noAllHosteListStatusCode === 201) {
        setLoader(false);
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
      setLoader(false);
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












  

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  const handleSelectedHostel = (selectedHostelId) => {
    const selected = state.UsersList.hotelDetailsinPg?.find((item) => {
      return item.id === selectedHostelId;
    });
    setSelectedHostel(true);
   
    setShowHostelDetails(selected);
  };




  

  const handleCloses = () => {
    setShowAddPg(false);

  };






  const handleShowsettingsPG = (settingNewDesign) => {
    props.displaysettings(settingNewDesign);
    dispatch({ type: 'MANAGE_PG' })
  };

  const handleDisplayPgList = (isVisible) => {
    setHidePgList(isVisible);
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

  const handlebackToPG = () => {
    setSelectedHostel(false);
    setFloorClick("");
    setFloorName("");
    setHidePgList(true);
    setVisibleRange([0, 2])
  };

  const handleDIsplayFloorClick = () => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  };






  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.UsersList.hotelDetailsinPg &&
        state.UsersList.hotelDetailsinPg.filter(
          (user) =>
            user.Name &&
            user.Name.toLowerCase().includes(searchItem.toLowerCase())
        );

      setFilteredData(filteredItems);
      setShowDropDown(true);
    } else {
      setFilteredData(state.UsersList.hotelDetailsinPg);
    }
   
  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.UsersList.hotelDetailsinPg &&
        state.UsersList.hotelDetailsinPg.filter(
          (user) =>
            user.Name &&
            user.Name.toLowerCase().includes(searchItem.toLowerCase())
        );

      setFilteredData(filteredItems);
      setShowDropDown(true);
    } else {
      setFilteredData(state.UsersList.hotelDetailsinPg);
    }
   
    setShowDropDown(false);
  };





  const handleEditHostel = (hostelDetails) => {
    setShowAddPg(true);
    setEditHostelDetails(hostelDetails);
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
  const [showFilter, setShowFilter] = useState(false);

  const handleShowSearch = () => {
    setShowFilter(!showFilter);
  };

  const handleCloseSearch = () => {
    setShowFilter(false);
    setFilteredData(state.UsersList.hotelDetailsinPg);
    setSearchQuery("");
  };

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
                <span  style={{
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
          {hidePgList && (
            <>
              <div
                className="container justify-content-between d-flex align-items-center flex-wrap "
                style={{
                  height: 83,
                  position: "sticky",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  backgroundColor: "#fff",
                }}
              >
               

                <div className="pglistlable" style={{ marginTop: -5 }}>
                  <label
                    style={{
                      fontSize: 18,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Paying Guest
                  </label>
                </div>

                <div className="d-flex justify-content-between flex-wrap align-items-center">
                  {!showFilter && (
                    <div className="me-3" onClick={handleShowSearch}>
                     
                    </div>
                  )}
                  {showFilter && (
                    <div className="me-3 flex flex-wrap" style={{ position: "relative" }}>
                      <InputGroup style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        width: '100%',
                      }}>
                        <FormControl
                          size="lg"
                          value={searchQuery}
                          onChange={handleInputChange}
                          style={{
                            width: 235,
                            boxShadow: "none",
                            borderColor: "lightgray",
                            borderRight: "none",
                            fontSize: 15,
                            fontWeight: 500,
                            color: "#222",
                            
                          }}
                          placeholder="Search..."
                        />
                        <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                          <CloseCircle
                            size="24"
                            color="#222"
                            onClick={handleCloseSearch}
                          />
                        </InputGroup.Text>
                      </InputGroup>

                      {filteredData[0]?.length > 0 &&
                        searchQuery !== "" &&
                        showDropDown && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 50,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                            }}
                          >
                            <ul
                              className="show-scroll"
                              style={{

                              
                                width: 260,
                                backgroundColor: "#fff",
                                                               maxHeight: 174,
                                minHeight: 100,
                                overflowY: "auto",
                                padding: "5px 10px",
                                margin: "0",
                                listStyleType: "none",

                                borderRadius: 8,
                                boxSizing: "border-box",
                              }}
                            >
                             
                              <li
                              
                                onClick={() => {
                                  handleDropDown(filteredData[0].Name);
                                }}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #dcdcdc",
                                  fontSize: "14px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                {filteredData[0].Name}
                              </li>
                              
                            </ul>
                          </div>
                        )}
                    </div>
                  )}
                  <div style={{ marginTop: 5 }}>
                    <Button
                      onClick={handleShowsettingsPG}
                      disabled={addPermissionError}

                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "11px",
                        paddingLeft: 30,
                        paddingRight: 27,
                        whiteSpace: "nowrap"

                      }}
                    >
                      {" "}
                      + Manage PG
                    </Button>
                  </div>


                </div>
              </div>

              {searchQuery && (
                <div
                  className="container ms-4 mb-4"
                  style={{ marginTop: "20px", fontWeight: 600, fontSize: 16 }}
                >
                  {filteredData[0]?.length > 0 ? (
                    <span
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 16,
                        color: "rgba(100, 100, 100, 1)",
                      }}
                    >
                      {filteredData[0]?.length} result
                      {filteredData[0]?.length > 1 ? "s" : ""} found for{" "}
                      <span
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(34, 34, 34, 1)",
                        }}
                      >
                        &quot;${searchQuery}&quot;
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
                        &quot;${searchQuery}&quot;
                      </span>
                    </span>
                  )}
                </div>
              )}
              <div className="container mt-2 pg-card" style={{}}>
                <div className="row row-gap-3">
                
                  {filteredData?.length > 0 ? (
  <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12">
    <PayingHostel
      OnSelectHostel={handleSelectedHostel}
      onRowVisiblity={handleDisplayPgList}
      OnEditHostel={handleEditHostel}
      editPermissionError={editPermissionError}
      deletePermissionError={deletePermissionError}
      filteredData={filteredData}
      handleShowsettingsPG={handleShowsettingsPG}
    />
  </div>
) : (
  !loader && filteredData?.length === 0 && (
    <div
      className="d-flex align-items-center justify-content-center fade-in"
      style={{
        width: "100%",
        margin: "0px auto",
        marginTop: 90,
      }}
    >
      <div>
        <div className="d-flex justify-content-center">
          <img src={EmptyState} alt="Empty state" />
        </div>
        <div
          className="pb-1 mt-1"
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontFamily: "Gilroy",
            fontSize: 18,
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
            fontSize: 14,
            color: "rgba(75, 75, 75, 1)",
          }}
        >
          There are no Paying Guest added.
        </div>
      </div>
    </div>
  )
)}





                </div>
              </div>


                  <div className="mt-2 mb-2 d-flex justify-content-center w-100">
                    {loader && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: '200px',
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


                    )}
                  </div>

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
                      onClick={() => handleAddFloors(showHostelDetails.id)}
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
                      <Col
                        sm={12}
                        xs={12}
                        md={2}
                        lg={2}
                        className="d-flex justify-content-start"
                      >
                        <div style={{ position: "fixed" }}>
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
                                style={{ cursor: "pointer" }}
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
                                  backgroundColor: showDots ? "#E7F1FF" : '#fff',
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
                                      className="pg-card"
                                      style={{
                                        cursor: "pointer",
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
                                            width: "100%",
                                            pointerEvents: editPermissionError ? "none" : "auto",
                                            opacity: editPermissionError ? 0.5 : 1,
                                            cursor: editPermissionError ? "not-allowed" : "pointer",
                                            transition: "background 0.2s ease-in-out",
                                          }}
                                          onMouseEnter={(e) =>
                                            !editPermissionError && (e.currentTarget.style.backgroundColor = "#F0F4FF")
                                          }
                                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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

                                       
                                        <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

                                      
                                        <div
                                          className="d-flex gap-2 align-items-center"
                                          onClick={
                                            !deletePermissionError
                                              ? () => handleShowDelete(floorClick, showHostelDetails.id, floorName)
                                              : undefined
                                          }
                                          style={{
                                            padding: "8px 12px",
                                            width: "100%",
                                             borderRadius: 6,
                                            pointerEvents: deletePermissionError ? "none" : "auto",
                                            opacity: deletePermissionError ? 0.5 : 1,
                                            cursor: deletePermissionError ? "not-allowed" : "pointer",
                                            transition: "background 0.2s ease-in-out",
                                          }}
                                          onMouseEnter={(e) =>
                                            !deletePermissionError && (e.currentTarget.style.backgroundColor = "#FFF3F3")
                                          }
                                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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
PgList.propTypes = {
  displaysettings: PropTypes.func.isRequired,
};
export default PgList;
