/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/Dashboard/Dashboard.css";
import "sweetalert2/dist/sweetalert2.min.css";
import ParticularHostelDetails from "../../Pages/PayingGuestFile/ParticularHostelDetails";
import AddPg from "./AddPg";
import AddFloor from "./AddFloor";
import "./PgList.css";
import AddRoom from "./AddRoom";
import PropTypes from "prop-types";
import {
  ArrowUp2,
  ArrowDown2,
  Edit,
  Trash,
} from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from "./DeleteFloor";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import availabeimg from "../../Assets/Images/New_images/available-circle.png";
import occubiedimg from "../../Assets/Images/New_images/occubied-circle.png";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import overdueimg from "../../Assets/Images/New_images/overdueimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
// import { MdError } from "react-icons/md";
import './PgList.css';
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import Group from "../../Assets/Images/Group.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import { triggerPG } from '../../Redux/Action/LoginAction';
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";

function PgList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [showHostelDetails, setShowHostelDetails] = useState("");
  // const [rolePermission, setRolePermission] = useState("");
  // const [permissionError, setPermissionError] = useState("");
  // const [addPermissionError, setAddPermissionError] = useState("");
  // const [editPermissionError, setEditPermissionError] = useState("");
  // const [deletePermissionError, setDeletePermissionError] = useState("");


  const [key, setKey] = useState("1");

  const [visibleRange, setVisibleRange] = useState([0, 2]);

  const popupRef = useRef(null);


  // const canReadPayingGuests = useHasPermission("Paying Guests", "canRead");
  // const canWritePayingGuests = useHasPermission("Paying Guests", "canWrite");
  // const canUpdatePayingGuests = useHasPermission("Paying Guests", "canUpdate");
  // const canDeletePayingGuests = useHasPermission("Paying Guests", "canDelete");


  const {
    canWriteModule: canWritePayingGuests,
    canReadModule: canReadPayingGuests,
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");





  const [floorClick, setFloorClick] = useState("");
  const [floorName, setFloorName] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(true);

  // const [filteredData, setFilteredData] = useState([]);



  const [showAddPg, setShowAddPg] = useState(false);
  const [floorList, setFloorList] = useState([])




  const [showFloor, setShowFloor] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [hostelFloor, setHostelFloor] = useState("");
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (!canReadPayingGuests) {
      setLoading(false);
    }
  }, [canReadPayingGuests]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])

  useEffect(() => {
    if (floorList.length === 0) {
      setLoading(false);
    }

  }, [floorList])




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
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: hostel_Id } })
      setLoading(true)
    }
  }, [hostel_Id]);



  useEffect(() => {
    if (floorList?.length > 0) {
      setFloorClick(floorList[0]?.id);

    } else {
      setFloorClick(null);
    }
  }, [floorList]);

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setLoading(false)
      setFloorList(state.UsersList.floorList)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALL_FLOOR_LIST' })
      }, 500)
    }

  }, [state.UsersList.floorListStatusCode])



  useEffect(() => {
    setLoading(false)
  }, [state.UsersList.floorList])

  useEffect(() => {

    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      // setFilteredData(state.UsersList.hotelDetailsinPg);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      }, 100);
    }
  }, [state.UsersList?.statuscodeForhotelDetailsinPg]);

  // useEffect(() => {
  //   if (state.UsersList?.noAllHosteListStatusCode === 201) {
  //     setFilteredData([]);
  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_NO_HOSTEL_DETAILS" });
  //     }, 1000);
  //   }
  // }, [state.UsersList?.noAllHosteListStatusCode]);






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
      state.UsersList.createFloorSuccessStatusCode === 201 ||
      state.PgList.updateFloorSuccessStatusCode === 200
    ) {
      // dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      // dispatch({ type: "HOSTELLIST" });
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: hostel_Id } })



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
    if (state.UsersList.createFloorSuccessStatusCode === 201 && floorList.length > 0) {
      const updatedFloors = floorList || [];
      if (updatedFloors.length > 0) {
        const lastFloor = updatedFloors[updatedFloors.length - 1];
        const lastIndex = updatedFloors.length - 1;
        setFloorClick(lastFloor?.id || null);
        setKey(lastFloor?.id?.toString() || "");
        setFloorName(lastFloor?.name || "");


        const newStart = Math.max(0, lastIndex - 2);
        const newEnd = lastIndex;
        setVisibleRange([newStart, newEnd]);

      } else {
        setFloorClick(null);
        setKey("");
        setFloorName("");
      }
    }
  }, [state.UsersList.createFloorSuccessStatusCode, floorList, floorClick])







  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      // dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } });
      // dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "ALLFLOORLIST", payload: { hostel_id: hostel_Id } });
      setShowDelete(false);

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
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      // dispatch({ type: "HOSTELLIST" });
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
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      // dispatch({ type: "HOSTELLIST" })

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_IMAGES" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [state.PgList.dleteHostelImagesStatusCode,]);

  useEffect(() => {
    if (state.PgList?.createPgStatusCode === 201 || state.PgList?.updatePgStatusCode === 200) {
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      dispatch({ type: "HOSTELLIST" });

      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
        dispatch({ type: 'REMOVE_UPDATE_PG' })
      }, 100);


    }
  }, [state.PgList.createPgStatusCode, state.PgList.updatePgStatusCode]);



  useEffect(() => {
    if (selectedHostel) {

      if (state.UsersList?.hotelDetailsinPg) {
        setShowHostelDetails(state.UsersList?.hotelDetailsinPg);
        const FloorNameData = floorList?.filter(
          (item) => item.id === floorClick
        ) || [];

        setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.name : "");
      }
    }
  }, [state.UsersList.hotelDetailsinPg, floorClick, selectedHostel, floorList]);





  useEffect(() => {
    if (floorClick) {
      const FloorNameData = floorList?.filter(
        (item) => item.id === floorClick
      ) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.name : "");
    }
  }, [selectedHostel, floorClick]);

  useEffect(() => {
    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      const FloorNameData = floorList?.filter((item) => {
        return item.id === floorClick;
      }) || [];
      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.name : "");

    }
  }, [state.UsersList.statuscodeForhotelDetailsinPg, floorClick, floorList]);

  useEffect(() => {
    if (state.UsersList.hosteListStatusCode === 200) {
      const FloorNameData = floorList?.filter((item) => {
        return item.id === floorClick;
      }) || [];

      setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.name : "");

      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTELLIST_STATUS_CODE' })
      }, 1000)
    }

  }, [state.UsersList.hosteListStatusCode])



  // useEffect(() => {
  //   if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
  //     const FloorNameData = showHostelDetails?.floorDetails?.filter((item) => {
  //       return item.floor_id === floorClick;
  //     }) || [];

  //     setFloorName(FloorNameData.length > 0 ? FloorNameData[0]?.floor_name : "");


  //   }

  // }, [state.UsersList?.statuscodeForhotelDetailsinPg])


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      // dispatch({
      //   type: "ROOMCOUNT",
      //   payload: { floor_Id: floorClick, hostel_Id: showHostelDetails.id },
      // });

      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: hostel_Id } })
      // dispatch({ type: "HOSTELLIST" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 100);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    if (state.PgList.statusCodeCreateRoom === 201) {
      setShowRoom(false);
    }
  }, [state.PgList.statusCodeCreateRoom]);

  useEffect(() => {
    if (state.PgList.statusCodeUpdateRoom === 200) {
      setShowRoom(false);
    }

  }, [state.PgList.statusCodeUpdateRoom])


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
  // useEffect(() => {
  //   setRolePermission(state.createAccount.accountList);
  // }, [state.createAccount.accountList]);


  // useEffect(() => {
  //   const userType = rolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";

  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setPermissionError("");
  //       setAddPermissionError("Permission Denied");
  //       setEditPermissionError("Permission Denied");
  //       setDeletePermissionError("Permission Denied");

  //     } else if (state?.login?.planStatus === 1) {
  //       setPermissionError("");
  //       setAddPermissionError("");
  //       setEditPermissionError("");
  //       setDeletePermissionError("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, rolePermission])


  // useEffect(() => {
  //   if (rolePermission[0]?.user_details?.user_type === "staff") {
  //     const rolesPermission = rolePermission[0]?.role_permissions?.find(
  //       (perm) => perm.permission_name === "Paying Guest"
  //     );

  //     const planActive = state?.login?.planStatus === 1;

  //     if (rolesPermission) {
  //       if (rolesPermission.per_view === 1 && planActive) {
  //         setPermissionError("");
  //       } else {
  //         setPermissionError("Permission Denied");
  //       }


  //       if (rolesPermission.per_create === 1 && planActive) {
  //         setAddPermissionError("");
  //       } else {
  //         setAddPermissionError("Permission Denied");
  //       }


  //       if (rolesPermission.per_edit === 1 && planActive) {
  //         setEditPermissionError("");
  //       } else {
  //         setEditPermissionError("Permission Denied");
  //       }


  //       if (rolesPermission.per_delete === 1 && planActive) {
  //         setDeletePermissionError("");
  //       } else {
  //         setDeletePermissionError("Permission Denied");
  //       }
  //     }
  //   }
  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, rolePermission]);



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setSelectedHostel(true);
      setShowHostelDetails(state.UsersList?.hotelDetailsinPg);
    }
  }, [
    state.login?.selectedHostel_Id,
    selectedHostel,
    state.UsersList?.hotelDetailsinPg
  ]);


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };


  const handleCloses = () => {
    setShowAddPg(false);
    dispatch({ type: 'CLEAR_NETWORK_ERROR' })

  };



  const handleAddFloors = (hostel_Id) => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding floor", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
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
    setFloorClick(floorList?.[0]?.id);
  };


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


  const handleCloseChangeBed = () => {
    dispatch(triggerPG(false))
  }

  useEffect(() => {
    dispatch(triggerPG(false))
  }, [])

  return (
    <>

      {loading &&
        <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10 h-full">
          <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
        </div>
      }

      <div className="sticky top-0 bg-white z-40 p-2">

        {state.login.isTrigger && (
          <>
            <div className="sticky top-0 z-50 bg-white flex items-center px-5 h-12 -ml-6">
              <FaArrowLeftLong
                onClick={handleCloseChangeBed}
                className="cursor-pointer"
              />
              <span className="font-semibold text-lg font-gilroy pl-2.5">
                Change Bed
              </span>
            </div>

            <div className="mt-1 ml-5 rounded-[14px] border border-gray-200 bg-white mb-2">
              <div className="p-3 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">

                  {state.PgList?.isClickedBed?.currentTenantInfo?.[0]?.profilePic ? (
                    <img
                      src={state.PgList?.isClicedBed?.currentTenantInfo?.[0]?.profilePic || Profiles}
                      alt="Tenant Profile"
                      className="h-16 w-16 rounded-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = Profiles; }}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg uppercase font-gilroy">
                      {state.PgList?.isClickedBed?.currentTenantInfo?.[0].tenantInitials || "?"}
                    </div>
                  )}

                  <div className="ml-2.5">
                    <span className="block font-semibold text-lg font-gilroy">
                      {state.PgList?.isClickedBed?.currentTenantInfo?.[0].tenantFullName}
                    </span>

                    <div className="flex gap-6 mt-1 text-xs font-gilroy">
                      <div className="flex items-center gap-1">
                        <img src={Floorimage} alt="Floor" className="w-4 h-4" />
                        {state.PgList?.isClickedBed?.floorName}
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={RoomImage} alt="Room" className="w-4 h-4" />
                        {state.PgList?.isClickedBed?.roomName}
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={Group} alt="Group" className="w-4 h-4" />
                        {state.PgList?.isClickedBed?.bedName}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {selectedHostel && (
          <div>

            {!state.login.isTrigger && (
              <div className="flex justify-between items-center mb-6">
                <label className="ms-2 text-lg font-semibold font-gilroy text-gray-900">
                  {showHostelDetails?.name}
                </label>

                <button
                  className="font-gilroy text-sm font-semibold bg-blue-700 text-white rounded-lg px-3 py-2 w-[146px] disabled:opacity-50"
                  disabled={!canWritePayingGuests}
                  onClick={() => handleAddFloors(state.login.selectedHostel_Id)}
                >
                  + Floor
                </button>
              </div>
            )}

            {!canReadPayingGuests ? (
              <div className="flex flex-col items-center justify-center h-screen">
                <img src={EmptyState} alt="Empty State" className="-mt-28" />
                <ErrorMessage message={['You do not have access to view paying guest']} type="warning" />
              </div>
            ) : floorList?.length > 0 ? (
              <div className="flex flex-col md:flex-row gap-0 h-[calc(100vh-90px)] ms-2">

                <div className="md:w-1/12 sticky top-24 z-10">

                  <div className="flex justify-center mb-2">
                    <div
                      onClick={handlePrev}
                      className="border border-gray-200 rounded-full  cursor-pointer"
                    >
                      <ArrowUp2 size={32} variant="Bold" color={visibleRange[0] === 0 ? "gray" : "#000"} />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    {floorList?.map((floor, index) =>
                      index >= visibleRange[0] && index <= visibleRange[1] ? (
                        <div
                          key={floor.id}
                          onClick={() => handleFloorClick(floor.id, floor.name)}
                          className={`mb-3 flex flex-col justify-center items-center rounded-xl h-24 w-24 cursor-pointer
                    ${Number(floorClick) === Number(floor.id) ? "bg-blue-50 border-2 border-[#1E45E1]" : "bg-white border-1 border-gray-300"}`}
                        >
                          <div className={`text-2xl font-gilroy font-semibold ${Number(floorClick) === Number(floor.id) ? "text-blue-700" : "text-gray-700"}`}>
                            {floor.name ? (isNaN(floor.name) ? floor.name.charAt(0) : floor.name) : floor.id}
                          </div>

                          <div className={`text-sm font-gilroy font-semibold text-center px-2 break-words ${Number(floorClick) === Number(floor.id) ? "text-blue-700" : "text-gray-700"}`}>
                            {typeof floor.name === "string" && floor.name.trim() !== "" && floor.name !== "null" ? floor.name : floor.id}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="flex justify-center mt-2">
                    <div
                      onClick={handleNext}
                      className="border border-gray-200 rounded-full cursor-pointer"
                    >
                      <ArrowDown2 size={32} variant="Bold" color={visibleRange[1] === numberOfFloors - 1 ? "gray" : "#000"} />
                    </div>
                  </div>
                </div>


                <div className="md:w-11/12 md:pl-4 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xl font-gilroy font-semibold capitalize">
                      {floorName && floorName.trim() !== "" ? floorName : ""}
                    </div>

                    <div className="flex items-center gap-3 flex-nowrap mr-4">
                      <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                        <img className="w-4 h-4" alt="Available" src={availabeimg} />
                        Available
                      </span>

                      {!state.login.isTrigger && (
                        <>
                          <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                            <img className="w-4 h-4" alt="Occupied" src={occubiedimg} />
                            Occupied
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                            <img className="w-4 h-4" alt="Reserved" src={recerverimg} />
                            Reserved
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                            <img className="w-4 h-4" alt="Overdue" src={overdueimg} />
                            Overdue
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                            <img className="w-4 h-4" alt="Notice Period" src={noticeimg} />
                            Notice Period
                          </span>
                        </>
                      )}

                      {

                        !state.login.isTrigger &&
                        <div
                          className={`cursor-pointer h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center relative ${showDots ? 'z-[1000] bg-[#E7F1FF]' : 'z-auto bg-white'}`}
                          onClick={handleShowDots}
                        >
                          <PiDotsThreeOutlineVerticalFill className="h-4 w-4" />
                          {showDots && (
                            <div
                              ref={popupRef}
                              className="pg-card bg-white absolute right-10 top-4 border border-gray-300 rounded-lg shadow-md w-36 z-50"
                            >
                              <div>
                                <div
                                  onClick={
                                    canUpdatePayingGuests
                                      ? () => handleEditFloor(floorClick, showHostelDetails.id, floorName)
                                      : undefined
                                  }
                                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${!canUpdatePayingGuests ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                                >
                                  <Edit size="16" color={!canUpdatePayingGuests ? "#A0A0A0" : "#1E45E1"} />
                                  <span className={`text-sm font-medium font-gilroy ${!canUpdatePayingGuests ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700 cursor-pointer'}`}
                                  >
                                    Edit
                                  </span>
                                </div>
                                <div className="h-px bg-gray-200 my-1" />

                                <div
                                  onClick={
                                    canDeletePayingGuests
                                      ? () => handleShowDelete(floorClick, showHostelDetails.id, floorName)
                                      : undefined
                                  }

                                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${!canDeletePayingGuests ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                                >
                                  <Trash size="16" color={!canDeletePayingGuests ? "#A0A0A0" : "#FF0000"} />
                                  <span
                                    className={`text-sm font-medium font-gilroy ${!canDeletePayingGuests ? 'text-[#A0A0A0] cursor-not-allowed' : 'text-[#FF0000] cursor-pointer'}`}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      }

                    </div>
                  </div>

                  <div className="overflow-y-auto h-full pr-2">
                    <ParticularHostelDetails
                      floorID={floorClick}
                      hostel_Id={state.login?.selectedHostel_Id}
                      phoneNumber={showHostelDetails.hostel_PhoneNo}
                    />
                  </div>

                </div>
              </div>
            )
              :
              (!loading) && (
                <div className="w-full flex flex-col items-center justify-center animated-text">
                  <div>
                    <div className="flex justify-center mt-28 2xl:mt-52">
                      <img
                        src={EmptyState}
                         alt="Empty state"
                      />
                    </div>
                    <div className="pb-1 mt-1 text-center font-gilroy font-semibold text-lg text-gray-700">
                      No floors available
                    </div>
                    <div className="text-center font-gilroy font-medium text-sm text-gray-700">
                      There is no floor added to this paying guest.
                    </div>
                   
                  </div>
                </div>
              
              )}
          </div>
        )}

        {showAddPg && <AddPg show={showAddPg} handleClose={handleCloses} />}
        {showDelete && <DeleteFloor show={showDelete} handleClose={handleCloseDelete} currentItem={deleteFloor} />}
        {showFloor && <AddFloor updateFloor={update} show={showFloor} handleClose={handleCloseFloor} hostelFloor={hostelFloor} openFloor={handleDIsplayFloorClick} editFloor={editFloor} />}
        {showRoom && <AddRoom show={showRoom} handleClose={handlecloseRoom} hostelDetails={hostelDetails} />}

      </div>

    </>
  );
}
PgList.propTypes = {
  displaysettings: PropTypes.func.isRequired,
};
export default withErrorBoundary(PgList);
