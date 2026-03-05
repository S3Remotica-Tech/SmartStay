
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseCircle } from "iconsax-react";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
dayjs.extend(customParseFormat);
import ErrorMessage from '../../Components/ErrorMessage'


function CustomerReAssign(props) {


  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [currentFloor, setCurrentFloor] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentBed, setCurrentBed] = useState("");
  // const [currentRoomId, setCurrentRoomId] = useState("");
  // const [currentBedId, setCurrentBedId] = useState("");
  const [currentRoomRent, setCurrentRoomRent] = useState("");
  const [newRoomRent, setNewRoomRent] = useState("");
  // const [currentHostel_id, setCurrentHostel_Id] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newBed, setNewBed] = useState("");
  const [userId, setUserId] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [rentError, setRentError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [availableBed, setAvailableBed] = useState('')
  // const [bedWarning, setBedWarning] = useState('')

  console.log("props", props)
  const rentRef = useRef(null);
  const floorRef = useRef(null);
  const roomRef = useRef(null);
  const BedRef = useRef(null);
  const selectedDateRef = useRef(null);
  const focusedRef = useRef(false);


  const handleCloseReAssign = () => {
    props.setCustomerReAssign(false);
    dispatch({ type: "REMOVE_CHANGE_BED_ERROR" });
    setRentError("");
    setRoomError("");
    setBedError("");
    setfloorError("");
    setDateError("");
    setNewFloor("");
    setNewRoom("");
    setNewBed("");
    setNewRoomRent("");
    setSelectedDate("");

    setUserId("")
    dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })

  };


  // const handleFloor = (selectedOption) => {
  //   setNewFloor(selectedOption?.value || "");

  //   setfloorError("");
  //   setNewRoom("")
  //   setNewBed("")
  //   setNewRoomRent("")
  // };

  const handleFloor = (selectedOption) => {
    setNewFloor(selectedOption?.value || "");
    setfloorError("");
    setNewRoom("");
    setNewBed("");
    setNewRoomRent("");
  };

  const handleRooms = (selectedOption) => {
    const value = selectedOption || "";
    setNewRoom(value);
    setRoomError("");
    setNewBed("");
    setNewRoomRent("");
  };




  useEffect(() => {
    if (newFloor && newRoom) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter(
        (view) => view.roomId === newRoom
      );
      setAvailableBed(filteredBed);
    }
  }, [newFloor, newRoom, state.UsersList?.availableBedList]);


  // view.floorId === newFloor && 
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, []);

  useEffect(() => {
    if (newFloor) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: newFloor } })
    }
  }, [newFloor]);


  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      }, 100)
    }

  }, [state?.PgList?.getAllRoomSuccessStatus])

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALL_FLOOR_LIST' })
      }, 500)
    }

  }, [state.UsersList.floorListStatusCode])


  const roomOptions =
    state.PgList?.roomsList?.map((item) => ({
      value: item.id,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontWeight: 600 }}>
            {item.name}
          </span>

          <span
            style={{
              backgroundColor: "#E9F2FF",
              color: "#2563EB",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {item?.sharingType || 0} 
          </span>
        </div>
      ),
    })) || [];














  // const handleRooms = (selectedOption) => {
  //   const value = selectedOption?.value || "";
  //   setNewRoom(value);
  //   if (value) {

  //  const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter((view) => {
  //           return view.floorId === newFloor && view.roomId === value
  //         });
  //         setAvailableBed(filteredBed)
  //   }

  //   setRoomError("");
  //   setNewBed("");
  //   setNewRoomRent("");
  // };

  //  useEffect(() => {
  //       if (Rooms) {
  //         const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter((view) => {
  //           return view.floorId === Floor && view.roomId === Rooms
  //         });
  //         setAvailableBed(filteredBed)
  //       }

  //     }, [Rooms, selectedDate,  state.UsersList?.availableBedList?.listBeds])


  const handleBed = (selectedOption) => {
    dispatch({ type: "REMOVE_CHANGE_BED_ERROR" });
    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
    // setBedWarning("");
    const selectedBedId = selectedOption?.value || "";
    setNewBed(selectedBedId);

    const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
      (bed) => String(bed.bedId) === String(selectedBedId)
    );


    if (selectedBed) {
      setNewRoomRent(selectedBed.rentAmount)
      // if (selectedBed.showWarning) {
      //   setBedWarning(selectedBed.warningMessage);
      // } else {
      //   setBedWarning("");
      // }

    }

    setBedError("");
    setRentError("");
  }

  // const handleBed = (selectedOption) => {
  //   const selectedBedId = selectedOption?.value || "";
  //   setNewBed(selectedBedId);

  //   const Bedfilter = state?.UsersList?.roomdetails?.filter(
  //     (u) =>
  //       String(u.Hostel_Id) === String(state.login.selectedHostel_Id) &&
  //       String(u.Floor_Id) === String(newFloor) &&
  //       String(u.Room_Id) === String(newRoom)
  //   );

  //   const Roomamountfilter =
  //     Bedfilter?.[0]?.bed_details?.filter(
  //       (amount) => String(amount.id) === String(selectedBedId)
  //     ) ?? [];




  //   if (Roomamountfilter.length > 0) {
  //     setNewRoomRent(Roomamountfilter[0]?.bed_amount);
  //   }

  //   setBedError("");
  //   setRentError("");

  // };


  const handleNewRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    if (/^0\d+/.test(newAmount)) return;
    setNewRoomRent(newAmount);
    setRentError("");
  };


  const validateAssignField = (value, fieldName, ref, focusedRef, setError) => {
    const isValueEmpty =
      (typeof value === "string" && (
        value.trim() === "" ||
        value === "Selected Room" ||
        value === "Selected Floor" ||
        value === "Selected Bed"
      )) ||
      value === undefined ||
      value === null ||
      value === "0";

    if (isValueEmpty) {
      switch (fieldName) {
        case "newRoomRent":
          setError("Please Enter New Rent Amount");
          break;
        case "newFloor":
          setError("Please Select New Floor");
          break;
        case "newRoom":
          setError("Please Select New Room");
          break;
        case "newBed":
          setError("Please Select New Bed");
          break;
        case "selectedDate":
          setError("Please Select Date");
          break;
        default:
          break;
      }

      if (!focusedRef.current && ref?.current) {
        ref.current.focus();
        focusedRef.current = true;
      }

      return false;
    }

    setError("");
    return true;
  };

  const [lastDate, setLastDate] = useState("");
  const [joiningdate, setJoiningDate] = useState("")
  const [reAssignDate, setReAssignDate] = useState("")





  useEffect(() => {
    dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props?.id } });
  }, [props]);


  useEffect(() => {
    if (selectedDate) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const joiningDateForFormatted = formatDate(selectedDate);
      dispatch({ type: 'AVAILBALEBEDDETAILS', payload: { hostelId: state.login.selectedHostel_Id, joiningDate: joiningDateForFormatted } })
    }

  }, [selectedDate])


  // useEffect(() => {
  //   if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
  //     const customerData = state.UsersList.customerdetails?.data?.[0]; 
  //     const invoiceDetails = state.UsersList.customerdetails?.invoice_details;


  //     if (customerData?.joining_Date) {
  //       const joining = new Date(customerData.joining_Date);
  //       const formattedJoining = `${String(joining.getDate()).padStart(2, "0")}-${String(
  //         joining.getMonth() + 1
  //       ).padStart(2, "0")}-${joining.getFullYear()}`;
  //       setJoiningDate(formattedJoining);
  //     } else {
  //       setJoiningDate("");
  //     }

  //      if (customerData?.reassign_date) {
  //       const rejoining = new Date(customerData.reassign_date);
  //       const formattedJoining = `${String(rejoining.getDate()).padStart(2, "0")}-${String(
  //         rejoining.getMonth() + 1
  //       ).padStart(2, "0")}-${rejoining.getFullYear()}`;
  //       setReAssignDate(formattedJoining);
  //     } else {
  //       setReAssignDate("");
  //     }


  //     if (invoiceDetails && invoiceDetails.length > 0) {
  //       const dates = invoiceDetails.map((item) => item.Date).filter(Boolean);
  //       if (dates.length > 0) {
  //         const maxDate = new Date(Math.max(...dates.map((d) => new Date(d))));
  //         const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(
  //           maxDate.getMonth() + 1
  //         ).padStart(2, "0")}-${maxDate.getFullYear()}`;
  //         setLastDate(formatted);
  //       } else {
  //         setLastDate("");
  //       }
  //     } else {
  //       setLastDate("");
  //     }


  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
  //     }, 1000);
  //   }
  // }, [state.UsersList.CustomerdetailsgetStatuscode]);



  const handleSaveReassignBed = () => {
    focusedRef.current = false;
    let hasError = false;

    if (!validateAssignField(newRoomRent, "newRoomRent", rentRef, focusedRef, setRentError)) hasError = true;
    if (!validateAssignField(newFloor, "newFloor", floorRef, focusedRef, setfloorError)) hasError = true;
    if (!validateAssignField(newRoom, "newRoom", roomRef, focusedRef, setRoomError)) hasError = true;
    if (!validateAssignField(newBed, "newBed", BedRef, focusedRef, setBedError)) hasError = true;
    if (!validateAssignField(selectedDate, "selectedDate", selectedDateRef, focusedRef, setDateError)) hasError = true;


    if (newRoom === "Selected Room") {
      setRoomError("Please Select a Valid Room");
      hasError = true;
    }


    if (!newBed || newBed === "") {
      setBedError("Please Select New Bed");
      return;
    }

    if (Number(newRoomRent) <= 0) {
      setRentError("Please enter  rent amount greater than 0");
      rentRef.current?.focus();
      hasError = true;
    }


    if (hasError) return;



    const formatToCustomDate = (date) => {
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${dd}-${mm}-${yyyy}`
    }
    const formattedDate = selectedDate ? formatToCustomDate(selectedDate) : "";

    const datum = {
      bedId: newBed,
      rentAmount: parseFloat(newRoomRent) || 0,
      joiningDate: formattedDate,
    }

    if (userId && state.login.selectedHostel_Id && datum) {
      dispatch({
        type: "CUSTOMERREASSINBED",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerId: userId,
          datum,
        },
      });
    }


    setFormLoading(true)
  };


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  // useEffect(() => {
  //   if (userId) {
  //     dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: userId } });
  //   }

  // }, [userId])

  // useEffect(() => {
  //   dispatch({
  //     type: "HOSTELDETAILLIST",
  //     payload: { hostel_Id: state.login.selectedHostel_Id },
  //   });
  // }, [currentHostel_id]);

  // useEffect(() => {
  //   if (currentHostel_id && newFloor) {
  //     dispatch({
  //       type: "ROOMDETAILS",
  //       payload: {
  //         hostel_Id: state.login.selectedHostel_Id,
  //         floor_Id: newFloor,
  //       },
  //     });
  //   }
  // }, [newFloor]);


  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
      }, 500)
    }

  }, [state.UsersList.CustomerdetailsgetStatuscode])




  // const [currentFloorId, setCurrentFloorId] = useState("")
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }

  }, [state.login.selectedHostel_Id])
  const [customerName, setCustomerName] = useState("")
  const [customerProfile, setCustomerProfile] = useState("")

  const userDetails = state?.UsersList?.Users?.listCustomers?.find(
    (user) => String(user.customerId) === String(props.customerId)
  );





  //   useEffect(()=>{
  // if(state.UsersList?.CustomerdetailsgetStatuscode === 200){
  // setTimeout(() => {
  //         dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
  //       }, 500);

  // }
  //   },[state.UsersList?.CustomerdetailsgetStatuscode])

  // useEffect(()=> {
  //    if(state.UsersList.CustomerdetailsgetStatuscode === 200){
  // setCurrentFloor(state.UsersList?.customerdetails?.hostelInfo?.floorName);
  // setCustomerName(state.UsersList?.customerdetails?.fullName)
  // setCurrentRoom(state.UsersList?.customerdetails?.hostelInfo?.roomName);
  // setCurrentBed(state.UsersList?.customerdetails?.hostelInfo?.bedName);
  // setCurrentRoomRent(state.UsersList?.customerdetails?.hostelInfo?.monthlyRent);
  // setUserId(state.UsersList?.customerdetails?.customerId);
  // setCurrentBedId(state.UsersList?.customerdetails?.hostelInfo?.bedId);
  // setCurrentRoomId(state.UsersList?.customerdetails?.hostelInfo?.roomId);
  // setCurrentFloorId(state.UsersList?.customerdetails?.hostelInfo?.floorId)
  // setCustomerProfile(state.UsersList?.customerdetails?.profilePic)
  //    }

  //    setTimeout(() => {
  //   dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
  // }, 500);
  // },[state.UsersList?.CustomerdetailsgetStatuscode])


  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200) {
      const customerData = state.UsersList?.customerdetails;
      if (!customerData) return;

      const hostelInfo = customerData.hostelInfo || {};
      const invoiceList = customerData.invoiceResponseList || [];
      const bedHistory = customerData.bedHistory || [];

      console.log("hostelInfo", hostelInfo)

      setCurrentFloor(hostelInfo.floorName || "");
      setCustomerName(customerData.fullName || "");
      setCurrentRoom(hostelInfo.roomName || "");
      setCurrentBed(hostelInfo.bedName || "");
      setCurrentRoomRent(hostelInfo.monthlyRent || "");
      setUserId(customerData.customerId || "");
      // setCurrentBedId(hostelInfo.bedId || "");
      // setCurrentRoomId(hostelInfo.roomId || "");
      // setCurrentFloorId(hostelInfo.floorId || "");
      setCustomerProfile(customerData.profilePic || null);

      if (hostelInfo.joiningDate) {
        const [dd, mm, yyyy] = hostelInfo.joiningDate.split("/");
        setJoiningDate(`${dd}-${mm}-${yyyy}`);
      } else {
        setJoiningDate("");
      }

      if (bedHistory.length > 0 && bedHistory[bedHistory.length - 1].startDate) {
        const [dd, mm, yyyy] = bedHistory[bedHistory.length - 1].startDate.split("/");
        setReAssignDate(`${dd}-${mm}-${yyyy}`);
      } else {
        setReAssignDate("");
      }

      if (invoiceList.length > 0) {
        const validDates = invoiceList
          .map((inv) => inv.invoiceGeneratedDate)
          .filter(Boolean)
          .map((d) => {
            const [dd, mm, yyyy] = d.split("/");
            return new Date(`${yyyy}-${mm}-${dd}`);
          });

        if (validDates.length > 0) {
          const maxDate = new Date(Math.max(...validDates));
          const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(
            maxDate.getMonth() + 1
          ).padStart(2, "0")}-${maxDate.getFullYear()}`;
          setLastDate(formatted);
        } else {
          setLastDate("");
        }
      } else {
        setLastDate("");
      }

      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);
    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode]);




  // useEffect(() => {
  //   if (props.reAssignDetail) {

  //     setCurrentFloor(props.reAssignDetail?.floor_name);
  //     setCustomerName(props.reAssignDetail?.Name)
  //     setCurrentRoom(props.reAssignDetail.Rooms);
  //     setCurrentBed(props.reAssignDetail.Bed);
  //     setCurrentRoomRent(props.reAssignDetail.RoomRent);
  //     setCurrentHostel_Id(state.login.selectedHostel_Id);
  //     setUserId(props.reAssignDetail.ID);
  //     setCurrentBedId(props.reAssignDetail.hstl_Bed);
  //     setCurrentRoomId(props.reAssignDetail.room_id);
  //     setCurrentFloorId(props.reAssignDetail.Floor)
  //     setCustomerProfile(props.reAssignDetail.profile)

  //   }
  //   else if (props.reAssignBedDetail) {

  //     setCurrentBed(props.reAssignBedDetail.bed?.bed_no);
  //     setCurrentRoomRent(props.reAssignBedDetail.bed?.bed_amount);
  //     setUserId(props.reAssignBedDetail.id);
  //     setCurrentRoom(props.reAssignBedDetail.room?.Room_Name);
  //     setCurrentRoomId(props.reAssignBedDetail.room?.Room_Id);
  //     setCurrentHostel_Id(props.reAssignBedDetail.room?.Hostel_Id);
  //     setCurrentBedId(props.reAssignBedDetail.bed?.id);
  //     setCurrentFloorId(props.reAssignBedDetail.room?.Floor_Id)
  //     const floorName =
  //       state.UsersList?.Users?.find(
  //         (item) => String(item.Floor) === String(props.reAssignBedDetail?.room?.Floor_Id)
  //       )?.floor_name || "";
  //     setCurrentFloor(floorName);



  //   }


  // }, [props.reAssignDetail, props.reAssignBedDetail]);


  useEffect(() => {
    if (state.UsersList.statusCodeForReassinBed === 200) {
      setFormLoading(false)
      handleCloseReAssign();
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_REASSIGN_BED" });
      }, 200);
    }
  }, [state.UsersList.statusCodeForReassinBed]);


  useEffect(() => {
    if (state.UsersList?.changeBedError) {
      setFormLoading(false)


    }

  }, [state.UsersList?.changeBedError])

  const getImageSrc = () => {
    if (
      customerProfile &&
      typeof customerProfile === "string" &&
      customerProfile.trim() !== ""
    ) {
      return customerProfile.startsWith("/9j/")
        ? `data:image/jpeg;base64,${customerProfile}`
        : customerProfile;
    }

    if (customerProfile && typeof customerProfile !== "string") {
      return URL.createObjectURL(customerProfile);
    }

    if (
      userDetails?.profile &&
      typeof userDetails.profile === "string" &&
      userDetails.profile.trim() !== ""
    ) {
      return userDetails.profile.startsWith("/9j/")
        ? `data:image/jpeg;base64,${userDetails.profile}`
        : userDetails.profile;
    }

    if (userDetails?.profile && typeof userDetails.profile !== "string") {
      return URL.createObjectURL(userDetails.profile);
    }

    return null;
  };





  return (
    <>
      <div>
        <Modal
          show={true}
          onHide={handleCloseReAssign}
          backdrop="static"
          centered dialogClassName="custom-modal-style"
        >
          <Modal.Dialog className="m-0 p-0 max-w-[666px] pr-2.5 rounded-[30px] bg-white"
          >
            <Modal.Header className="relative flex items-center justify-between px-4 py-3 border-b">
              <div className="text-xl font-semibold font-gilroy">
                Change Bed
              </div>

              <CloseCircle size="24" color="#000" onClick={handleCloseReAssign}
                className="cursor-pointer" />
            </Modal.Header>

            <Modal.Body className=" mt-1 mr-3 pt-1" >
              <div className="flex items-center">
                <div>

                  <div className="w-full">

                    <div className="flex justify-between items-center mb-2 mt-1 ml-2">

                      <div className="flex items-center gap-3">

                        {getImageSrc() ? (
                          <img
                            src={getImageSrc()}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => { e.target.src = Profileimage; }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-base font-gilroy">
                            {state.UsersList?.customerdetails?.initials}
                          </div>
                        )}
                        <div>
                          <p
                            className="mb-1 font-semibold text-[15px] font-gilroy truncate max-w-[160px]"
                            title={customerName || userDetails?.Name}
                          >
                            {customerName || userDetails?.Name}
                          </p>

                          <div className="flex gap-2">
                            <span className="bg-yellow-100 text-yellow-800 text-[12px] px-2 py-0.5 rounded-[12px] font-medium font-gilroy">
                              {currentFloor}
                            </span>

                            <span className="bg-red-100 text-red-800 text-[12px] px-2 py-0.5 rounded-[12px] font-medium font-gilroy">
                              {currentRoom} - {currentBed}
                            </span>
                          </div>
                        </div>

                      </div>

                      <div className="mr-4 text-right">
                        <p className="mb-1 text-[14px] font-normal text-gray-700 font-gilroy">
                          Rental Amount
                        </p>
                        <p className="mb-0 font-semibold text-base font-gilroy">
                          ₹ {currentRoomRent}
                        </p>
                      </div>

                    </div>
                  </div>



                  <div className="overflow-y-auto max-h-[380px] mt-1 pt-1 show-scroll p-2">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4 items-stretch">
                      <div>
                        <Form.Group controlId="purchaseDate">
                          <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                            Date <span className="text-red-500 text-[20px]">*</span>
                          </Form.Label>
                          <div className="relative w-full datepicker-wrapper">
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid lightgrey",
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              ref={selectedDateRef}
                              onChange={(date) => {
                                setDateError("");
                                setSelectedDate(date ? date.toDate() : null);
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
                              disabledDate={(current) => {
                                if (!current) return false;
                                const today = dayjs().endOf("day");

                                let joining = null;
                                if (joiningdate && /^\d{2}-\d{2}-\d{4}$/.test(joiningdate)) {
                                  const [dd, mm, yyyy] = joiningdate.split("-");
                                  joining = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
                                }

                                let lastBillDate = null;
                                if (lastDate && /^\d{2}-\d{2}-\d{4}$/.test(lastDate)) {
                                  const [dd, mm, yyyy] = lastDate.split("-");
                                  lastBillDate = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
                                }

                                let reAssign = null;
                                if (reAssignDate && /^\d{2}-\d{2}-\d{4}$/.test(reAssignDate)) {
                                  const [dd, mm, yyyy] = reAssignDate.split("-");
                                  reAssign = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
                                }

                                let minAllowedDate = null;

                                if (reAssign) {
                                  minAllowedDate = reAssign;
                                } else if (joining) {
                                  const sameMonth =
                                    joining.month() === today.month() &&
                                    joining.year() === today.year();

                                  if (sameMonth) {
                                    minAllowedDate = joining;
                                  } else if (lastBillDate) {
                                    minAllowedDate = lastBillDate;
                                  }
                                }

                                if (current.isAfter(today)) {
                                  return true;
                                }

                                if (minAllowedDate && current.isBefore(minAllowedDate)) {
                                  return true;
                                }

                                return false;
                              }}
                            />
                          </div>
                          {dateError && <ErrorMessage message={dateError} type="error" />}
                        </Form.Group>
                      </div>

                      <div>
                        <Form.Group >
                          <Form.Label className="text-[14px] font-medium font-gilroy">
                            New Floor <span className="text-red-500 text-[20px]">*</span>
                          </Form.Label>
                          <Select
                            isDisabled={!selectedDate}
                            options={
                              state.UsersList.floorList?.map((u) => ({
                                value: u.id,
                                label: u.name,
                              })) || []
                            }
                            onChange={handleFloor}
                            ref={floorRef}
                            value={
                              state.UsersList.floorList?.find((option) => option.id === newFloor)
                                ? {
                                  value: newFloor,
                                  label: state.UsersList.floorList.find(
                                    (option) => option.id === newFloor
                                  )?.name,
                                }
                                : null
                            }
                            placeholder="Selected Floor"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            noOptionsMessage={() => "No floors available"}
                            styles={{
                              control: (base) => ({
                                ...base,
                                height: "50px",
                                borderRadius: "0.5rem",
                                fontSize: "16px",
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: newFloor ? 600 : 500,
                                boxShadow: "none",
                              }),
                              menu: (base) => ({ ...base, backgroundColor: "#f8f9fa" }),
                              menuList: (base) => ({
                                ...base,
                                backgroundColor: "#f8f9fa",
                                maxHeight: "120px",
                                padding: 0,
                                overflowY: "auto",
                              }),
                              placeholder: (base) => ({ ...base, color: "#555" }),
                              dropdownIndicator: (base) => ({ ...base, color: "#555", cursor: "pointer" }),
                              indicatorSeparator: () => ({ display: "none" }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                color: "#000",
                              }),
                            }}
                          />
                          {floorError && <ErrorMessage message={floorError} type="error" />}
                        </Form.Group>
                      </div>

                      <div className="mb-2">
                        <Form.Group >
                          <Form.Label className="text-[14px] font-medium font-gilroy">
                            New Room <span className="text-red-500 text-[20px]">*</span>
                          </Form.Label>
                          <Select
                            options={roomOptions}
                            onChange={(selectedOption) => handleRooms(selectedOption?.value)}
                            ref={roomRef}
                            isDisabled={!newFloor}
                            value={
                              state.PgList?.roomsList?.find((option) => option.id === newRoom)
                                ? {
                                  value: newRoom,
                                  label: state.PgList?.roomsList.find((option) => option.id === newRoom)
                                    ?.name,
                                }
                                : null
                            }
                            placeholder="Selected Room"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            noOptionsMessage={() => "No rooms available"}
                            styles={{
                              control: (base) => ({
                                ...base,
                                height: "50px",
                                borderRadius: "0.5rem",
                                fontSize: "16px",
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: newRoom ? 600 : 500,
                                boxShadow: "none",
                              }),
                              menu: (base) => ({ ...base, backgroundColor: "#f8f9fa" }),
                              menuList: (base) => ({
                                ...base,
                                backgroundColor: "#f8f9fa",
                                maxHeight: "120px",
                                padding: 0,
                                overflowY: "auto",
                              }),
                              placeholder: (base) => ({ ...base, color: "#555" }),
                              dropdownIndicator: (base) => ({ ...base, color: "#555", cursor: "pointer" }),
                              indicatorSeparator: () => ({ display: "none" }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                color: "#000",
                              }),
                            }}
                          />
                          {roomError && <ErrorMessage message={roomError} type="error" />}
                        </Form.Group>
                      </div>

                      <div>
                        <Form.Group >
                          <Form.Label className="text-[14px] font-medium font-gilroy">
                            New Bed <span className="text-red-500 text-[20px]">*</span>
                          </Form.Label>
                          <Select
                            options={
                              availableBed
                                ? availableBed
                                  .filter(
                                    (item) =>
                                      item &&
                                      item?.bedName !== "0" &&
                                      item?.bedName !== "undefined" &&
                                      item?.bedName !== "" &&
                                      item?.bedName !== "null"
                                  )
                                  .map((item) => ({ value: item?.bedId, label: item?.bedName }))
                                : []
                            }
                            onChange={handleBed}
                            ref={BedRef}
                            value={
                              availableBed
                                ? (() => {
                                  const selected = availableBed?.find((option) => option?.bedId === newBed);
                                  return selected ? { value: selected.bedId, label: selected.bedName } : null;
                                })()
                                : null
                            }
                            placeholder="Select Bed"
                            isDisabled={!newRoom}
                            classNamePrefix="custom"
                            styles={{
                              control: (base) => ({
                                ...base,
                                height: "50px",
                                borderRadius: "0.5rem",
                                fontSize: "16px",
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: newBed ? 600 : 500,
                                boxShadow: "none",
                              }),
                              menu: (base) => ({ ...base, backgroundColor: "#f8f9fa" }),
                              menuList: (base) => ({
                                ...base,
                                backgroundColor: "#f8f9fa",
                                maxHeight: "120px",
                                padding: 0,
                                overflowY: "auto",
                              }),
                              placeholder: (base) => ({ ...base, color: "#555" }),
                              dropdownIndicator: (base) => ({ ...base, color: "#555", cursor: "pointer" }),
                              indicatorSeparator: () => ({ display: "none" }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                color: "#000",
                              }),
                            }}
                          />
                          {bedError && <ErrorMessage message={bedError} type="error" />}
                        </Form.Group>
                      </div>

                      {/* <div>
                        <Form.Group>
                          <Form.Label className="flex items-center whitespace-nowrap text-[14px] font-medium font-gilroy">
                            New Rent Amount <span className="text-red-500 text-[20px] ml-1">*</span>
                            <Form.Check
                              type="checkbox"
                              label={
                                <span className="text-[#1E45E1] font-medium text-[11px] font-gilroy whitespace-nowrap">
                                  Same as Current
                                </span>
                              }
                              className="ms-3 cursor-pointer"
                              ref={rentRef}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewRoomRent(currentRoomRent);
                                  setRentError("");
                                } else {
                                  setNewRoomRent("");
                                  setRentError("");
                                }
                              }}
                            />
                          </Form.Label>
                          <FormControl
                            onChange={(e) => handleNewRoomRent(e)}
                            value={newRoomRent}
                            type="text"
                            placeholder="Enter Amount"
                            className="mt-2 h-[50px] rounded-lg border border-[#D9D9D9] text-[16px] font-medium text-[#4B4B4B] font-gilroy shadow-none"
                          />
                          {rentError && <ErrorMessage message={rentError} type="error" />}
                        </Form.Group>
                      </div> */}
                      <div>
  <Form.Group>
    
    {/* Label + Checkbox in One Line */}
    <div className="flex items-center">
      <Form.Label className="mb-0 flex items-center whitespace-nowrap text-[14px] font-medium font-gilroy">
        New Rent Amount 
        <span className="text-red-500 text-[20px] ml-1">*</span>
      </Form.Label>

      <Form.Check
        type="checkbox"
        label={
          <span className="text-[#1E45E1] font-medium text-[12px] font-gilroy whitespace-nowrap">
            Same as Current
          </span>
        }
        className="ms-3 mb-0 cursor-pointer flex items-center"
        ref={rentRef}
        onChange={(e) => {
          if (e.target.checked) {
            setNewRoomRent(currentRoomRent);
            setRentError("");
          } else {
            setNewRoomRent("");
            setRentError("");
          }
        }}
      />
    </div>

    <FormControl
      onChange={(e) => handleNewRoomRent(e)}
      value={newRoomRent}
      type="text"
      placeholder="Enter Amount"
      className="mt-2 h-[50px] rounded-lg border border-[#D9D9D9] text-[16px] font-medium text-[#4B4B4B] font-gilroy shadow-none"
    />

    {rentError && <ErrorMessage message={rentError} type="error" />}

  </Form.Group>
</div>
                    </div>
                  </div>


                </div>

              </div>
            </Modal.Body>

            {state.UsersList?.changeBedError && <div className="d-flex justify-content-center">
              <ErrorMessage message={state.UsersList?.changeBedError} type="error" />
            </div>}

            {formLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="w-10 h-10 border-t-4 border-blue-700 border-r-4 border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}



            <Modal.Footer className="-mt-6 border-top-0">
              <Button disabled={formLoading}
                 className="w-full h-12 !bg-blue-700 rounded-lg !font-semibold text-base !font-gilroy"
                onClick={handleSaveReassignBed}
              >
                Change Bed
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}





CustomerReAssign.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  customerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setCustomerReAssign: PropTypes.func,
  reAssignDetail: PropTypes.shape({
    user_join_date: PropTypes.string,
    Floor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Rooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Bed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    RoomRent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hstl_Bed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    room_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    floor_name: PropTypes.string,
    Name: PropTypes.string,
    profile: PropTypes.string,
  }),

  reAssignBedDetail: PropTypes.shape({
    user_join_date: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bed: PropTypes.shape({
      user_join_date: PropTypes.string,
      bed_no: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bed_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    room: PropTypes.shape({
      Room_Name: PropTypes.string,
      Floor_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Room_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Hostel_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};


export default CustomerReAssign;