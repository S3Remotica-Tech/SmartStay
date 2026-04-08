/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
// import "../../Pages/Dashboard/Dashboard.css";
import "sweetalert2/dist/sweetalert2.min.css";
import PayingGuest from "../../Pages/PayingGuestFile/PayingGuestMap";
import AddPg from "../../Pages/PayingGuestFile/AddPg";
import AddFloor from "../../Pages/PayingGuestFile/AddFloor";
import "../../Pages/PayingGuestFile/PgList.css";
import Nav from "react-bootstrap/Nav";
import AddRoom from "../../Pages/PayingGuestFile/AddRoom";
import { ArrowLeft } from "iconsax-react";
import {
  ArrowUp2,
  ArrowDown2,
  Edit,
  Trash,
} from "iconsax-react";
import { Tab, Row, Col } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from "../../Pages/PayingGuestFile/DeleteFloor";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
// import "../../Pages/Settings/Settings.css";
import PropTypes from "prop-types";
// import '../../Pages/Settings/SettingManage.css';
import availabeimg from "../../Assets/Images/New_images/available-circle.png";
import occubiedimg from "../../Assets/Images/New_images/occubied-circle.png";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import overdueimg from "../../Assets/Images/New_images/overdueimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import ParticularHostelDetails from "../PayingGuestFile/ParticularHostelDetails";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";


function SettingManage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showHostelDetails, setShowHostelDetails] = useState("");
  // const [rolePermission, setRolePermission] = useState("");
  // const [permissionError, setPermissionError] = useState("");
  // const [addPermissionError, setAddPermissionError] = useState("");
  // const [editPermissionError, setEditPermissionError] = useState("");
  // const [deletePermissionError, setDeletePermissionError] = useState("");
  const [loading, setLoading] = useState(false)


  const popupRef = useRef(null);

  // const canWritePayingGuests = useHasPermission("Paying Guests", "canWrite");
  // const canUpdatePayingGuests = useHasPermission("Paying Guests", "canUpdate");
  // const canDeletePayingGuests = useHasPermission("Paying Guests", "canDelete");
  // const canReadPayingGuests = useHasPermission("Paying Guests", "canRead")

  const {
    canWriteModule: canWritePayingGuests,
    canReadModule: canReadPayingGuests,
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");








  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])



  useEffect(() => {
    if (!canReadPayingGuests) {
      setLoading(false);
    }
  }, [canReadPayingGuests]);

  const [hidePgList, setHidePgList] = useState(true);

  const [floorClick, setFloorClick] = useState("");

  const [floorName, setFloorName] = useState("");

  const [selectedHostel, setSelectedHostel] = useState(false);

  const [floorList, setFloorList] = useState([])
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });

  }, []);


  useEffect(() => {
    if (showHostelDetails) {
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: showHostelDetails.hostelId } })
    }
  }, [showHostelDetails])








  useEffect(() => {
    if (floorList?.length > 0 && selectedHostel) {
      setFloorClick(floorList?.[0]?.id);
    }
  }, [floorList, showHostelDetails.hostelId, selectedHostel]);


  useEffect(() => {
    if (floorList?.length === 1) {
      setFloorClick(floorList?.[0]?.id);
    }
  }, [floorList]);



  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setFloorList(state.UsersList?.floorList)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALL_FLOOR_LIST' })
      }, 500)
    }

  }, [state.UsersList.floorListStatusCode])







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
      state.UsersList.createFloorSuccessStatusCode === 201 ||
      state.PgList.updateFloorSuccessStatusCode === 200
    ) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: showHostelDetails.hostelId } })


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
    if (state.UsersList.createFloorSuccessStatusCode === 201 || state.PgList.updateFloorSuccessStatusCode === 200) {
      const updatedFloors = floorList || [];

      if (updatedFloors?.length > 0) {
        const lastFloor = updatedFloors[updatedFloors?.length - 1];
        const lastIndex = updatedFloors.length - 1;

        setFloorClick(lastFloor?.id || null);
        setKey(lastFloor?.id?.toString() || "");
        setFloorName(lastFloor?.name || "");

        const newStartIndex = Math.max(0, lastIndex - 2);
        const newEndIndex = lastIndex;

        setVisibleRange([newStartIndex, newEndIndex]);
      } else {
        setFloorClick(null);
        setKey("");
        setFloorName("");
      }
    }
  }, [state.UsersList.createFloorSuccessStatusCode, state.PgList.updateFloorSuccessStatusCode]);














  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });
      setShowDelete(false);
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: showHostelDetails.hostelId } })

      setTimeout(() => {
        const updatedFloors = floorList || [];

        if (updatedFloors.length > 0) {
          let [start, end] = visibleRange;

          if (end >= updatedFloors.length) {
            end = updatedFloors.length - 1;
          }
          if (start > end) {
            start = Math.max(0, end - 1);
          }

          const newRange = [start, end];

          const firstVisibleFloor = updatedFloors.find(
            (_, index) => index >= newRange[0] && index <= newRange[1]
          );


          if (firstVisibleFloor) {
            setFloorClick(firstVisibleFloor.id);
            setKey(firstVisibleFloor.id);
            setFloorName(firstVisibleFloor.name);
          } else {
            setFloorClick(updatedFloors[0]?.id || null);
            setKey(updatedFloors[0]?.id || "");
            setFloorName(updatedFloors[0]?.name || "");
          }


        } else {
          setFloorClick(null);
          setKey("");
          setFloorName("");
        }

        dispatch({ type: "CLEAR_DELETE_FLOOR" });
      }, 500);




    }
  }, [state.UsersList.deleteFloorSuccessStatusCode]);

  useEffect(() => {
    if (
      state.PgList.deletePgSuccessStatusCode === 200 ||
      state.PgList.dleteHostelImagesStatusCode === 200
    ) {
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
    state.PgList.dleteHostelImagesStatusCode,
  ]);

  useEffect(() => {
    if (state.PgList.createPgStatusCode === 201 || state.PgList?.updatePgStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: 'REMOVE_MANAGE_PG' })
      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
        dispatch({ type: 'REMOVE_UPDATE_PG' })
      }, 100);



    }
  }, [state.PgList.createPgStatusCode, state.PgList?.updatePgStatusCode]);

  useEffect(() => {
    if (selectedHostel) {
      const selected = state.UsersList.hostelList?.find(
        (item) => item.hostelId === showHostelDetails.hostelId
      );
      setShowHostelDetails(selected);
    }
  }, [state.UsersList.hostelList]);






  const handleSelectedHostel = (selectedHostelId) => {


    const selected = state.UsersList.hostelList?.find((item) => {

      return item.hostelId === selectedHostelId;
    });
    setSelectedHostel(true);
    setShowHostelDetails(selected);
  };

  const [showAddPg, setShowAddPg] = useState(false);

  const handleCloses = () => {
    setShowAddPg(false);
    dispatch({ type: 'REMOVE_MANAGE_PG' })

  };



  useEffect(() => {
    if (state.PgList.isManageEnable) {
      setShowAddPg(true);
      setEditHostelDetails("");
    }
  }, [state.PgList.isManageEnable]);



  const handleShowAddPg = () => {
    setShowAddPg(true);
    setEditHostelDetails("");
  };



  useEffect(() => {
    if (state.PgList.UpgradestatusCode === 201) {

      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_UPGRADE_PLAN' })
      }, 100)

    }

  }, [state.PgList.UpgradestatusCode])







  const handleDisplayPgList = (isVisible) => {
    setHidePgList(isVisible);
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
    // setVisibleRange([0, 2])
  };

  const handleDIsplayFloorClick = () => {
    setFloorClick(floorList[0]?.floor_id);
  };






  const [editHostelDetails, setEditHostelDetails] = useState("");




  const handleEditHostel = (hostelDetails) => {
    console.log("hostelDetails", hostelDetails)
    setShowAddPg(true);
    setEditHostelDetails(hostelDetails);
  };

  const [key, setKey] = useState("1");

  const [visibleRange, setVisibleRange] = useState([0, 2]);


  const numberOfFloors = floorList && floorList?.length;




  const handlePrev = () => {
    if (floorClick > 0) {

      const prevFloorIndex = floorList?.findIndex(
        (floor) => floor.id === floorClick
      ) - 1;

      if (prevFloorIndex >= 0) {
        const prevFloor = floorList[prevFloorIndex];


        setKey(prevFloor.id.toString());
        setFloorClick(prevFloor.id);
        setFloorName(prevFloor.name);


        if (prevFloorIndex < visibleRange[0]) {
          setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
        }
      }
    }
  };




  const handleNext = () => {
    const floorIndex = floorList?.findIndex(
      (floor) => floor.id === floorClick
    );

    if (floorIndex !== -1 && floorIndex < floorList?.length - 1) {
      const nextFloor = floorList[floorIndex + 1];


      setKey(nextFloor.id.toString());
      setFloorClick(nextFloor.id);
      setFloorName(nextFloor.name);

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
      const FloorNameData = floorList?.filter(
        (item) => item.id === floorClick
      ) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.name : "");
    }
  }, [selectedHostel, floorClick]);


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      dispatch({
        type: "ROOMCOUNT",
        payload: { floor_Id: floorClick, hostel_Id: showHostelDetails.id },
      });
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: floorClick } })
      dispatch({ type: "HOSTELLIST" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 4000);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    if (state.PgList.statusCodeCreateRoom === 201) {
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
  // useEffect(() => {
  //   setRolePermission(state.createAccount.accountList);
  // }, [state.createAccount.accountList]);


  // useEffect(() => {
  //   if (rolePermission[0]?.is_owner) {
  //     if (
  //       rolePermission[0]?.is_owner === 1 ||
  //       rolePermission[0]?.role_permissions[3]?.per_view === 1
  //     ) {
  //       setPermissionError("");
  //     } else {
  //       setPermissionError("Permission Denied");
  //     }
  //   }
  // }, [rolePermission]);
  // useEffect(() => {
  //   if (rolePermission[0]?.is_owner) {
  //     if (
  //       rolePermission[0]?.is_owner === 1 ||
  //       rolePermission[0]?.role_permissions[3]?.per_create === 1
  //     ) {
  //       setAddPermissionError("");
  //     } else {
  //       setAddPermissionError("Permission Denied");
  //     }
  //   }
  // }, [rolePermission]);
  // useEffect(() => {
  //   if (rolePermission[0]?.is_owner) {
  //     if (
  //       rolePermission[0]?.is_owner === 1 ||
  //       rolePermission[0]?.role_permissions[3]?.per_edit === 1
  //     ) {
  //       setEditPermissionError("");
  //     } else {
  //       setEditPermissionError("Permission Denied");
  //     }
  //   }
  // }, [rolePermission]);
  // useEffect(() => {
  //   if (rolePermission[0]?.is_owner) {
  //     if (
  //       rolePermission[0]?.is_owner === 1 ||
  //       rolePermission[0]?.role_permissions[3]?.per_delete === 1
  //     ) {
  //       setDeletePermissionError("");
  //     } else {
  //       setDeletePermissionError("Permission Denied");
  //     }
  //   }
  // }, [rolePermission]);



  return (
    <>


      {hidePgList && (
        <>

          <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center  px-1.5 whitespace-nowrap">
            <div className="w-full flex justify-center md:justify-start md:mt-0">
              <label className="text-black font-semibold text-[18px] font-gilroy whitespace-nowrap">
                Manage PG
              </label>
            </div>

            <div className="w-full flex justify-center md:justify-end mt-0 md:mt-0">
              <button
                onClick={handleShowAddPg}
                disabled={!canWritePayingGuests}
                className={`mt-[5px] h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy
            ${canWritePayingGuests
                    ? "bg-[#1E45E1] text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                + PG
              </button>
            </div>

          </div>

          {!canReadPayingGuests ? (
            <>
              <div className="flex flex-col items-center justify-center mt-24">
                <img src={EmptyState} alt="Empty State" className="mt-2" />
                <ErrorMessage message={['You do not have access to view paying guest']} type="warning" />
              </div>
            </>
          ) :

            <div className="mt-4 h-[512px] lg:h-[512px] xl:h-[512px] 2xl:h-[820px] 3xl:h-[820px] overflow-y-auto overflow-x-hidden flex flex-col show-scrolls">
              {filteredData?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
                  {filteredData.map((hostel) => (
                    <div key={hostel.id} className="ml-0 pr-7">
                      <PayingGuest
                        hostel={hostel}
                        key={hostel.id}
                        OnSelectHostel={handleSelectedHostel}
                        onRowVisiblity={handleDisplayPgList}
                        OnEditHostel={handleEditHostel}
                      // editPermissionError={editPermissionError}
                      // deletePermissionError={deletePermissionError}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                !loading &&
                filteredData.length === 0 && (
                 
                  <div className="flex items-center justify-center w-full mt-24 2xl:mt-52">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <img src={EmptyState} alt="Empty state" />
                      </div>

                      <div className="pb-1 text-center font-semibold font-gilroy text-lg text-[#4B4B4B]">
                        No Paying Guest available
                      </div>
                      <div className="text-center font-gilroy !font-medium !text-sm text-[#4B4B4B]">
                      There are no Paying Guest added.
                    </div>
                    </div>
                  </div>
                )
              )}
            </div>
          }

        </>
      )}

      {selectedHostel && (
        <div className=" mt-3">

          <div

            className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between w-100"
            style={{

              position: "sticky",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",

              whiteSpace: "nowrap",
              padding: "25px"

            }}>

            <div className="w-100 d-flex justify-content-start">

              <ArrowLeft
                size="32"
                color="#222222"
                onClick={handlebackToPG}
                style={{
                  cursor: "pointer",


                }}

              />
              <div className="w-100 text-center text-md-start mt-2 mt-md-0">
                <label

                  style={{
                    fontSize: 18,
                    color: "rgba(34, 34, 34, 1)",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    marginLeft: "20px"

                  }}
                >
                  {showHostelDetails?.name}
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-md-between align-items-center w-100 w-md-auto">

              <div
                className="d-flex justify-content-center justify-content-md-end w-100 mt-4 mt-md-0"
              >
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
                  disabled={!canWritePayingGuests}
                  onClick={() => handleAddFloors(showHostelDetails.hostelId)}
                >
                  +  Floor
                </Button>
              </div>
            </div>
          </div>

          <div >
            {floorList?.length > 0 ? (
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
                        {floorList?.map((floor, index) =>
                          index >= visibleRange[0] && index <= visibleRange[1] ? (
                            <Nav.Item
                              key={floor.id}
                              onClick={() =>
                                handleFloorClick(floor.id, floor.name)
                              }
                              className={`mb-3 d-flex justify-content-center align-items-center ${Number(floorClick) === Number(floor.id)
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
                                    Number(floorClick) === Number(floor.id)
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
                                  {floor.name
                                    ? isNaN(floor.name)
                                      ? floor.name.charAt(0)
                                      : floor.name
                                    : floor.id}
                                </div>
                                <div
                                  className={
                                    Number(floorClick) === Number(floor.id)
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
                                  {typeof floor.name === "string" &&
                                    floor.name.trim() !== "" &&
                                    floor.name !== "null"
                                    ? floor.name
                                    : floor.id}
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
                              Available                                </p>
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
                                      canUpdatePayingGuests
                                        ? () => handleEditFloor(floorClick, showHostelDetails.hostelId, floorName)
                                        : undefined
                                    }
                                    style={{
                                      padding: "8px 12px",
                                      borderRadius: 6,
                                      opacity: !canUpdatePayingGuests ? 0.5 : 1,
                                      cursor: !canUpdatePayingGuests ? "not-allowed" : "pointer",
                                    }}
                                  >
                                    <Edit size="16" color={!canUpdatePayingGuests ? "#A0A0A0" : "#1E45E1"} />
                                    <span
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: !canUpdatePayingGuests ? "#A0A0A0" : "#1E45E1",
                                        cursor: !canUpdatePayingGuests ? "not-allowed" : "pointer",
                                      }}
                                    >
                                      Edit
                                    </span>
                                  </div>

                                  <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "4px 0" }} />

                                  <div
                                    className="d-flex gap-2 align-items-center"
                                    onClick={
                                      canDeletePayingGuests
                                        ? () => handleShowDelete(floorClick, showHostelDetails.hostelId, floorName)
                                        : undefined
                                    }
                                    style={{
                                      padding: "8px 12px",
                                      borderRadius: 6,
                                      opacity: !canDeletePayingGuests ? 0.5 : 1,
                                      cursor: !canDeletePayingGuests ? "not-allowed" : "pointer",
                                    }}
                                  >
                                    <Trash size="16" color={!canDeletePayingGuests ? "#A0A0A0" : "#FF0000"} />
                                    <span
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: !canDeletePayingGuests ? "#A0A0A0" : "#FF0000",
                                        cursor: !canDeletePayingGuests ? "not-allowed" : "pointer",
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
                        hostel_Id={showHostelDetails.hostelId}
                        phoneNumber={showHostelDetails.hostel_PhoneNo}
                      // editPermissionError={editPermissionError}
                      // deletePermissionError={deletePermissionError}
                      // addPermissionError={addPermissionError}
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
        // editPermissionError={editPermissionError}
        // deletePermissionError={deletePermissionError}
        // addPermissionError={addPermissionError}
        />
      )}
      {showDelete && (
        <DeleteFloor
          show={showDelete}
          handleClose={handleCloseDelete}
          currentItem={deleteFloor}
        // editPermissionError={editPermissionError}
        // deletePermissionError={deletePermissionError}
        // addPermissionError={addPermissionError}
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
        // editPermissionError={editPermissionError}
        // deletePermissionError={deletePermissionError}
        // addPermissionError={addPermissionError}
        />
      )}
      {showRoom && (
        <AddRoom
          show={showRoom}
          handleClose={handlecloseRoom}
          hostelDetails={hostelDetails}
        // editPermissionError={editPermissionError}
        // deletePermissionError={deletePermissionError}
        // addPermissionError={addPermissionError}
        />
      )}


    </>
  );
}
SettingManage.propTypes = {
  setPgshow: PropTypes.func.isRequired,
  pgshow: PropTypes.func.isRequired,
};
export default withErrorBoundary(SettingManage);
