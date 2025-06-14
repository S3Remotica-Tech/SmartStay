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
import { ArrowLeft} from "iconsax-react";
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
  console.log('PgList', state)
  const [showHostelDetails, setShowHostelDetails] = useState("");
  const [rolePermission, setRolePermission] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [addPermissionError, setAddPermissionError] = useState("");
  const [editPermissionError, setEditPermissionError] = useState("");
  const [deletePermissionError, setDeletePermissionError] = useState("");


  const [key, setKey] = useState("1");

  const [visibleRange, setVisibleRange] = useState([0, 2]);

  const popupRef = useRef(null);

  console.log("showHostelDetails", showHostelDetails)

  const [hidePgList, setHidePgList] = useState(true);
  const [floorClick, setFloorClick] = useState("");
  const [floorName, setFloorName] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const [loader, setLoader] = useState(null);
  const [trigger, setTrigger] = useState(true)
  const [editHostelDetails, setEditHostelDetails] = useState("");
  const [showAddPg, setShowAddPg] = useState(false);

  // const stateAccount = useSelector((state) => state.createAccount);

  // const [profile, setProfile] = useState(
  //   stateAccount.accountList[0]?.user_details.profile
  // );

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // const [currentItem, setCurrentItem] = useState("");

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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


  //  useEffect

  useEffect(() => {
    if (hostel_Id) {
      setLoader(true)
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
    }
  }, [hostel_Id]);




  useEffect(() => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id);
  }, [selectedHostel]);


  console.log("state", state)


  useEffect(() => {

    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      setLoader(false);

      setTimeout(() => {
        setTrigger(false)
      }, 100)

      setFilteredData(state.UsersList.hotelDetailsinPg);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      }, 100);
    }
  }, [state.UsersList?.statuscodeForhotelDetailsinPg]);

  useEffect(() => {
    if (state.UsersList?.noAllHosteListStatusCode === 201) {
      setFilteredData([]);
      setLoader(false);
      setTimeout(() => {
        setTrigger(false)
      }, 100)
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

  console.log("filteredData", filteredData)

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
      // dispatch({ type: "HOSTELIDDETAILS" });


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

console.log("visible range", visibleRange)


useEffect(()=>{
  if(state.UsersList.createFloorSuccessStatusCode === 200 && showHostelDetails?.floorDetails.length > 0){
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
},[state.UsersList.createFloorSuccessStatusCode, showHostelDetails?.floorDetails])
  

  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
      dispatch({ type: "HOSTELLIST" });
      // dispatch({ type: "HOSTELIDDETAILS" });
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
    if ( state.PgList.deletePgSuccessStatusCode === 200 ) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });
      // dispatch({ type: "HOSTELIDDETAILS" });
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
    if ( state.PgList.dleteHostelImagesStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" })

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_IMAGES" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [ state.PgList.dleteHostelImagesStatusCode,]);

  useEffect(() => {
    if (state.PgList.createPgStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });
      // dispatch({ type: "HOSTELIDDETAILS" });
      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
      }, 1000);

      // setPgList({
      //   Name: "",
      //   phoneNumber: "",
      //   email_Id: "",
      //   location: "",
      // });
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

  // useEffect(() => {
  //   if (stateAccount.statusCodeForAccountList === 200) {
  //     const loginProfile = stateAccount.accountList[0].user_details.profile;

  //     setProfile(loginProfile);
  //   }
  // }, [stateAccount.statusCodeForAccountList]);


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
      // setTimeout(() => {

      //   dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      // }, 1000);
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


  console.log("all hostel", state.UsersList?.statuscodeForhotelDetailsinPg)


  useEffect(() => {
    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
        return item.floor_id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");

      // setTimeout(() => {
      //   dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      // }, 100);
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
      // dispatch({ type: "HOSTELIDDETAILS" });

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









  // const handleClose = () => {
  //   setFloorDetails([{ number_of_floor: "" }]);
  //   setShow(false);
  // };
  // const handleShow = () => setShow(true);

  // const handleCancels = () => {
  //   handlecloseHostelForm();
  // };

  // const handleshowHostelForm = () => {
  //   setAddhostelForm(true);
  // };
  // const handlecloseHostelForm = () => {
  //   setPgList({
  //     Name: "",
  //     phoneNumber: "",
  //     email_Id: "",
  //     location: "",
  //   });
  //   setEmailError("");
  //   setAddhostelForm(false);
  // };



  // const [emailError, setEmailError] = useState("");

  // const validateEmail = (email) => {
  //   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (pattern.test(email)) {
  //     setEmailError("");
  //     return true;
  //   } else {
  //     setEmailError("Please Enter a Valid Email");
  //     return false;
  //   }
  // };

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
    console.log("selected", selected)
    setShowHostelDetails(selected);
  };




  console.log("showHostelDetails", showHostelDetails)

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



  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const handleItemsPerPageChange = (event) => {
  //   setItemsPerPage(Number(event.target.value));
  // };






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
    // setCurrentPage(1);
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
    // setCurrentPage(1);
    setShowDropDown(false);
  };





  const handleEditHostel = (hostelDetails) => {
    setShowAddPg(true);
    setEditHostelDetails(hostelDetails);
  };



  const numberOfFloors =
    showHostelDetails && showHostelDetails?.floorDetails?.length;
  // const floorsPerPage = 5;


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
    // setFloorClick(1)
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
                {/* <div className="d-flex justify-content-between align-items-center"> */}
               
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
                      {/* <SearchNormal1 size="26" color="#222" /> */}
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
                            //  '::placeholder': { color: "#222", fontWeight: 500 }
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
                                // position: 'absolute',
                                // top: '50px',
                                // left: 0,
                                width: 260,
                                backgroundColor: "#fff",
                                // border: '1px solid #D9D9D9',
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
                              {/* {filteredData.map((user, index) => ( */}
                              <li
                                // key={index}
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
                              {/* ))} */}
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
                        whiteSpace:"nowrap"

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
                  {filteredData?.length > 0 ?

                    <div
                      // key={hostel.id}
                      className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                    >
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

                    :
                    !loader && !trigger && filteredData?.length === 0 && (
                      <div
                        className="d-flex align-items-center justify-content-center fade-in"
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
                    )


                  }


                  {
                    !hostel_Id && <div
                      className="d-flex align-items-center justify-content-center fade-in"
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
                  }


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
                </div>
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
                    {/* <Sort Size="24" color="#222" variant="Outline" /> */}
                    {/* <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} /> */}
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

              <div className="show-scroll" style={{ maxHeight: "500px", overflowY: "auto",overflowX:"hidden"}}>
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
                        <div style={{position:"fixed"}}>
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
                                  style={{ height: 20, width:20 }}
                                />

                                {showDots && (
                                  <>
                                    <div
                                      ref={popupRef}
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: "#f9f9f9",
                                        position: "absolute",
                                        right: 40,
                                        top: 10,
                                        width: 100,
                                        height: "auto",
                                        border: "1px solid #EBEBEB",
                                        borderRadius: 10,
                                        display: "flex",
                                        justifyContent: "start",
                                        padding: 10,
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
                                                fontWeight: 500,
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
                                                fontWeight: 500,
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
                            // currentPage={1}
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
