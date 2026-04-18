/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Image } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/LoginAction";
import { Trash } from 'iconsax-react';
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import ErrorMessage from '../../Components/ErrorMessage'




function UserlistForm(props) {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");


  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [formLoading, setFormLoading] = useState(false)
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState("LONG");


  const [availableBed, setAvailableBed] = useState('')
  const [bedWarning, setBedWarning] = useState('')


  const [fields, setFields] = useState([]);


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









  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };


  const options = {
    dateFormat: "Y/m/d",
    maxDate: null,
    minDate: new Date(),
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);




  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, []);

  useEffect(() => {
    if (Floor) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: Floor } })
    }
  }, [Floor]);


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











  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setRooms("");
    setBed("");
    setRoomRent("");
    setfloorError("");
  };

  const handleRooms = (selectedValue) => {
    setRooms(selectedValue);
    setBed('');

    setRoomRent("");
    setRoomError("");
  };


  useEffect(() => {
    if (Rooms) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter((view) => {
        return view.roomId === Rooms
      });
      setAvailableBed(filteredBed)
    }

  }, [Rooms, selectedDate, state.UsersList?.availableBedList?.listBeds])




  const handleBed = (selectedOption) => {
    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
    setBedWarning("");
    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);


    setBedError("");

  };

  useEffect(() => {
    if (Bed) {
      const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
        (bed) => String(bed.bedId) === String(Bed)
      );
      if (selectedBed) {
        setPlaceHolderRoomRent(selectedBed.rentAmount)
        if (selectedBed.showWarning) {
          setBedWarning(selectedBed.warningMessage);
        } else {
          setBedWarning("");
        }

      }

      setBedError("");

    }

  }, [Bed])


  const handleRoomRent = (e) => {
    const value = e.target.value;


    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setRoomRent(value);
      setRoomRentError("");
    }
  };



  const handleAdvanceAmount = (e) => {
    const value = e.target.value;

    if (value === "" || /^(0|[1-9]\d*)$/.test(value)) {
      setAdvanceAmount(value);
      setAdvanceAmountError("");
    }
  };





  const handleCloseAssign = () => {
    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    if (props?.setShowAssignMenu) props.setShowAssignMenu(false);
    if (props?.setShowForm) props.setShowForm(false);
    if (props?.OnShowTable) props.OnShowTable(true);
    if (props.edit === "Edit") {
      if (props?.OnShowTable) props.OnShowTable(true);
    } else {
      if (props?.setRoomDetail) props.setRoomDetail(false);
    }
  }

  console.log("props.EditObj", props.EditObj )

  useEffect(() => {
    if (props.EditObj && props.EditObj.customerId) {
      setId(props.EditObj.customerId);
      if (props.EditObj.profilePic === 0) setFile(null);
      else {
        setFile(props.EditObj.profilePic);
      }


      setFirstname(props.EditObj?.firstName || props.EditObj?.name);
      setLastname(props.EditObj?.lastName);

      setRooms(props.EditObj.Rooms || props.EditObj?.room);

    } else {

      if (typeof props.setEdit === "function") {
        props.setEdit("Add");
      }
    }
  }, [props.EditObj]);










  const handleSaveUserlistAddUser = async () => {

    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })

    let newErrors = [];
    let isHasError = false;


    if (!Floor) {
      setfloorError("Please Select Floor");
      isHasError = true;
    }
    if (!Rooms) {
      setRoomError("Please Select Room");
      isHasError = true;
    }
    if (!Bed) {
      setBedError("Please Select Bed");
      isHasError = true;
    }
    if (!selectedDate) {
      setDateError("Please Select Date");
      isHasError = true;
    }
    if (!AdvanceAmount) {
      setAdvanceAmountError("Please Enter Advance Amount");
      isHasError = true;
    }

    if (!RoomRent) {
      setRoomRentError("Please Enter Room Rent");
      isHasError = true;
    }

    if (Floor === "Selected Floor" || floorError) {
      setfloorError("Please Select Floor");
      isHasError = true;
    }
    if (Rooms === "Selected Room" || roomError) {
      setRoomError("Please Select Room");
      isHasError = true;
    }


    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      isHasError = true;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter  Rental Amount");
      isHasError = true;
    }

    if (
      AdvanceAmount === "" ||
      AdvanceAmount === null ||
      AdvanceAmount === undefined
    ) {
      setAdvanceAmountError("Please Enter Advance Amount");
      isHasError = true;
    }
    // if (Number(AdvanceAmount) <= 0) {
    //   setAdvanceAmountError("Please Enter  Advance Amount");
    //   isHasError = true;
    // }
    const formattedReasons = fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        isHasError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        isHasError = true;
      }

      newErrors.push(error);
      return {
        type: reason_name,
        amount: item.amount || "",
      };
    }).filter((item) => item.type !== "" || item.amount !== "")

    setErrors(newErrors)

    if (isHasError) return;

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";






    const invoiceDateObj = new Date(formattedDate);

    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0));


    if (
      Floor && Rooms && Bed &&
      selectedDate &&
      AdvanceAmount &&
      Number(RoomRent) > 0
    ) {
      dispatch({
        type: 'CHECKIN',
        payload: {
          customerId: id,
          // hostelId: state.login?.selectedHostel_Id,
          floorId: Floor,
          bedId: Bed,
          roomId: Rooms,
          joiningDate: formattedDate,
          advanceAmount: AdvanceAmount,
          rentalAmount: RoomRent,
          stayType: activeTab,
          deductions: formattedReasons

        }
      })
      setFormLoading(true)



    }


  };







  useEffect(() => {
    if (props.BookingAssignForm) {
      setId(props.EditObj.ID);
      if (props.EditObj.profile === 0) setFile(null);
      else {
        setFile(props.EditObj.profile);
      }


      if (props.EditObj?.Name) {
        const value = props.EditObj.Name.trim().split(" ");
        setFirstname(value[0] || "");
        setLastname(value[1] || "");
      } else {
        setFirstname("");
        setLastname("");
      }

      setRooms(props.EditObj.booking_room_id);
      setBed(props.EditObj.booking_bed_id)

      setFloor(props.EditObj.booking_floor_id)
      setSelectedDate(props.EditObj.booking_joining_date)

      setFile(props.EditObj.profile)


      const Bedfilter = state?.UsersList?.roomdetails?.filter(
        (u) =>
          String(u.Hostel_Id) === String(props?.EditObj?.Hostel_Id) &&
          String(u.Floor_Id) === String(props?.EditObj?.booking_floor_id) &&
          String(u.Room_Id) === String(props?.EditObj?.booking_room_id)
      );

      const Roomamountfilter =
        Bedfilter?.[0]?.bed_details?.filter(
          (amount) => String(amount.id) === String(props?.EditObj?.booking_bed_id)
        ) ?? [];

      if (Roomamountfilter.length > 0) {
        setRoomRent(Roomamountfilter[0]?.bed_amount);
      }




    }

  }, [props.BookingAssignForm]);







  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      setFormLoading(false)
      setLoading(false)
      if (props?.setShowForm) props.setShowForm(false);
      if (props?.OnShowTable) props.OnShowTable(true);

      if (props.edit === "Edit") {
        if (props?.setRoomDetail) props.setRoomDetail(true);
        if (props?.OnShowTable) props.OnShowTable(true);
      } else {
        if (props?.setRoomDetail) props.setRoomDetail(false);
      }

    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);


  useEffect(() => {
    if (state.createAccount?.networkError || state.UsersList?.bedAvailableError) {
      setFormLoading(false)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })

      }, 3000)
    }

  }, [state.createAccount?.networkError, state.UsersList?.bedAvailableError])















  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    if (field === "reason" || field === "customReason") {
      const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

      if (field === "reason") {
        if (cleanedValue.toLowerCase() === "others") {
          updatedFields[index].showInput = true;
          updatedFields[index].reason_name = "others";
          updatedFields[index].customReason = "";
        } else {
          updatedFields[index].showInput = false;
          updatedFields[index].reason = cleanedValue;
          updatedFields[index].reason_name = cleanedValue;
          updatedFields[index].customReason = "";
        }
      } else if (field === "customReason") {
        updatedFields[index].customReason = cleanedValue;
      }

      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      let numericValue = value.replace(/[^0-9.]/g, "");

      if (numericValue.startsWith("0")) {
        numericValue = numericValue.replace(/^0+/, "");
      }


      if (numericValue === "") {
        numericValue = "";
      }

      updatedFields[index].amount = numericValue;

      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
  };


  const handleJoiningDateChange = (date) => {
    setDateError("");
    setSelectedDate(date ? date.toDate() : null);
    setJoingDateErrmsg('')
    dispatch(JoininDatecustomer(date ? date.toDate() : null));
  }

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(dayjs());
    }
  }, []);


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


  const handleCloseBacktoCheckin = () => {
    if (props?.setBacktoCheckInForm) props.setBacktoCheckInForm(false);
    if (props?.handleCloseBed) props.handleCloseBed();
  }




  // const [RequestDate, setRequestDate] = useState(null)

  useEffect(() => {
    if (props?.bactocheckinForm) {

      setId(props?.EditObj?.ID || props?.customer_details?.ID);
      if (props?.EditObj?.profile === 0 || props?.customer_details?.profile === 0) setFile(null);
      else {
        setFile(props?.EditObj?.profile || props?.customer_details?.profile);
      }


      if (props?.EditObj?.Name || props?.customer_details?.Name) {
        const value = props?.EditObj?.Name.trim().split(" ") || props?.customer_details?.Name.trim().split(" ")
        setFirstname(value[0] || "");
        setLastname(value[1] || "");
      } else {
        setFirstname("");
        setLastname("");
      }

      // setRecheckinbedName(props?.EditObj?.Bed || props?.customer_details?.Bed)

      setRooms(props?.EditObj?.hstl_Rooms || props?.customer_details?.hstl_Rooms);
      setBed(props?.EditObj?.hstl_Bed || props?.customer_details?.hstl_Bed)

      setFloor(props.EditObj?.Floor || props?.customer_details?.Floor)
      setSelectedDate(props.EditObj?.joining_Date || props?.customer_details?.joining_Date)

      // setBookingFloorId(props.EditObj?.floor_name || props?.customer_details?.floor_name)
      // setBookingRoomId(props.EditObj?.Room_Id || props?.customer_details?.Room_Id)
      // setBookingBedId(props.EditObj?.Bed || props?.customer_details?.Bed)
      setAdvanceAmount(props.EditObj?.AdvanceAmount || props?.customer_details?.AdvanceAmount)
      setRoomRent(props.EditObj?.RoomRent || props?.customer_details?.RoomRent)
      // if (props.EditObj?.req_date || props.customer_details?.req_date) {
      //   setRequestDate(dayjs(props.EditObj?.req_date || props.customer_details?.req_date));
      // }
    }


    const reasonData =
      Array.isArray(props?.EditObj?.reasonData) && props.EditObj.reasonData.length > 0
        ? props.EditObj.reasonData
        : Array.isArray(props?.customer_details?.reasonData)
          ? props.customer_details.reasonData
          : [];

    if (reasonData.length > 0) {
      const formattedFields = reasonData.map((entry) => {
        const isCustom = String(entry.reason) !== "maintenance";

        return {
          reason_name: entry.reason,
          amount: entry.amount || "",
          showInput: isCustom,
          customReason: isCustom ? entry.reason : "",
          id: entry.id || ""
        };
      });

      setFields(formattedFields);
    }

  }, [props.bactocheckinForm, props?.customer_details, props.recheckin])







  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      setFormLoading(false)
      handleCloseBacktoCheckin()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);

    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);





  return (
    <div>

      <Modal
        show={props.showAssignMenu}
        onHide={handleCloseAssign}
        backdrop="static"
        centered
        dialogClassName="custom-modals-style font-gilroy"
      >
        <Modal.Dialog className="m-0 p-0 max-w-[950px] pr-2.5 rounded-2xl">
          <Modal.Body>
            <div>

              <div>
                <Modal.Header className="pt-0 relative border-0">
                  <div className="text-xl font-semibold font-gilroy">
                    Tenant Check-In
                  </div>

                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleCloseAssign}
                    className="cursor-pointer"
                  />
                </Modal.Header>

                <div className="flex items-center gap-3 mb-3 ml-3">
                  {file && file !== "0" ? (
                    <Image
                      src={file || props.EditObj?.name}
                      roundedCircle
                      className="h-14 w-14"
                      alt="image"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center text-xl !font-semibold font-gilroy">
                      {props.EditObj?.initials || "-"}
                    </div>
                  )}

                  <div>
                    <p className="mb-1 mt-2 text-lg font-gilroy font-semibold  truncate max-w-[150px]">
                      {firstname} {lastname} {props.EditObj?.name}
                    </p>
                  </div>
                </div>

                <div className="mt-1 p-1 w-full bg-[#F7F9FF] rounded-lg">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => setActiveTab("LONG")}
                      className={`flex-1 py-2 text-center rounded-md font-gilroy font-semibold ${activeTab === "LONG" ? "!bg-[#1E45E1] text-white" : "!bg-[#F7F9FF] text-black"
                        }`}
                    >
                      Long Stay
                    </button>

                    <button
                      onClick={() => setActiveTab("SHORT")}
                      className={`flex-1 py-2 text-center rounded font-gilroy font-semibold ${activeTab === "SHORT" ? "!bg-[#1E45E1] text-white" : "!bg-[#F7F9FF] text-black"
                        }`}
                    >
                      Short Stay
                    </button>
                  </div>
                </div>

                {activeTab === "LONG" ? <>
                  <div className="show-scroll p-2 mt-2 me-1 max-h-[300px] overflow-y-scroll">
                    <div className="grid grid-cols-12 gap-x-4">

                      <div className="col-span-12 mb-2">
                        <Form.Group controlId="purchaseDate">
                          <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                            Joining Date{" "}
                            <span className="text-red-500 text-xl">*</span>
                          </Form.Label>

                          <div className="datepicker-wrapper relative w-full">
                            <DatePicker
                              className="w-full h-12 cursor-pointer font-gilroy"
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => handleJoiningDateChange(date)}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <ErrorMessage message={dateError} type="error" />
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <ErrorMessage message={joiningDateErrmsg} type="error" />
                        )}
                      </div>

                      <div className="col-span-12 mb-2">
                        <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                          Floor  {" "}
                          <span className="text-red-500 text-xl">*</span>
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
                          value={
                            state.UsersList.floorList?.find(
                              (option) => option.id === Floor
                            )
                              ? {
                                value: Floor,
                                label: state.UsersList.floorList.find(
                                  (option) => option.id === Floor
                                )?.name,
                              }
                              : null
                          }
                          placeholder="Select a Floor"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#9aa0a6",
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              display: "inline-block",
                              fill: "currentColor",
                              lineHeight: 1,
                              stroke: "currentColor",
                              strokeWidth: 0,
                              cursor: "pointer",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {floorError && (
                          <ErrorMessage message={floorError} type="error" />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 mb-2">
                        <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                          Room {" "}
                          <span className="text-red-500 text-xl">*</span>
                        </Form.Label>

                        <Select
                          isDisabled={!selectedDate || !Floor}
                          options={roomOptions}
                          onChange={(selectedOption) =>
                            handleRooms(selectedOption?.value)
                          }
                          value={
                            state.PgList?.roomsList?.find(
                              (option) => option.id === Rooms
                            )
                              ? {
                                value: Rooms,
                                label: state.PgList?.roomsList.find(
                                  (option) => option.id === Rooms
                                )?.name,
                              }
                              : null
                          }
                          placeholder="Select a Room"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#9aa0a6",
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              display: "inline-block",
                              fill: "currentColor",
                              lineHeight: 1,
                              stroke: "currentColor",
                              strokeWidth: 0,
                              cursor: "pointer",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {roomError && (
                          <ErrorMessage message={roomError} type="error" />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 mb-2">
                        <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                          Bed {" "}
                          <span className="text-red-500 text-xl">*</span>
                        </Form.Label>

                        <Select
                          isDisabled={!selectedDate}
                          options={
                            availableBed
                              ? availableBed
                                .filter(
                                  (item) => item &&
                                    item?.bedName !== "0" &&
                                    item?.bedName !== "undefined" &&
                                    item?.bedName !== "" &&
                                    item?.bedName !== "null"
                                )
                                .map((item) => ({
                                  value: item?.bedId,
                                  label: item?.bedName,
                                }))
                              : []
                          }
                          onChange={handleBed}
                          value={
                            availableBed
                              ? (() => {
                                const selected = availableBed?.find(
                                  (option) => option?.bedId === Bed
                                );
                                return selected
                                  ? { value: selected.bedId, label: selected.bedName }
                                  : null;
                              })()
                              : null
                          }
                          placeholder="Select a Bed"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#9aa0a6",
                              fontWeight: 500
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              display: "inline-block",
                              fill: "currentColor",
                              lineHeight: 1,
                              stroke: "currentColor",
                              strokeWidth: 0,
                              cursor: "pointer",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {state.UsersList?.bedAvailableError ?
                          <ErrorMessage message={state.UsersList?.bedAvailableError} type="error" />
                          : null}
                        {bedWarning ?
                          <ErrorMessage message={bedWarning} type="error" />
                          : null}

                        {bedError && (
                          <ErrorMessage message={bedError} type="error" />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                        <Form.Group>
                          <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                            Advance Amount
                            <span className="text-red-500 text-xl">*</span>

                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={AdvanceAmount}
                            onChange={handleAdvanceAmount}
                            className={`text-base text-gray-700 font-gilroy ${AdvanceAmount ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                          />
                        </Form.Group>
                        {advanceAmountError && (
                          <ErrorMessage message={advanceAmountError} type="error" />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                        <Form.Group>
                          <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                            Rental Amount
                            <span className="text-red-500 text-xl">*</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            value={RoomRent}
                            placeholder={
                              placeHolderRoomRent
                                ? `Selected Bed Rent is ${placeHolderRoomRent}`
                                : "Enter Amount"
                            }
                            onChange={handleRoomRent}
                            className={`text-base text-gray-700 font-gilroy ${RoomRent ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                          />
                        </Form.Group>
                        {roomrentError && (
                          <ErrorMessage message={roomrentError} type="error" />
                        )}
                      </div>

                    </div>



                    <div className="mt-3 mb-3 bg-[#F7F9FF] rounded pb-1">
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <label className="text-sm font-medium font-gilroy">
                            Non Refundable Amount
                          </label>
                        </div>
                        <div>
                          <button
                            onClick={handleAddField}
                            className="flex items-center gap-1.5 bg-blue-700 text-white font-gilroy font-semibold text-sm rounded-lg px-4 py-1.5 mb-2.5"
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              className="h-4 w-4 filter brightness-0 invert"
                            />
                            Add
                          </button>
                        </div>
                      </div>


                      {fields.map((item, index) => {
                        const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                        const filteredOptions = reasonOptions.map((opt) => {
                          if (opt.value === "maintenance") {
                            return {
                              ...opt,
                              isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                            };
                          }
                          return opt;
                        });

                        return (
                          <div className="flex gap-3 mb-3 px-4" key={index}>
                            <div className="flex-1">


                              {!item.showInput ? (
                                <Select
                                  options={filteredOptions}
                                  value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption.value;

                                    if (selectedValue === "others") {
                                      handleInputChange(index, "reason", "others");
                                    } else {
                                      handleInputChange(index, "reason", selectedValue);
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
                                  menuPlacement="auto"
                                  styles={{
                                    control: (base) => ({
                                      ...base,
                                      height: "50px",
                                      border: "1px solid #D9D9D9",
                                      borderRadius: "8px",
                                      fontSize: "16px",
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      boxShadow: "none",
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      border: "1px solid #ced4da",
                                      fontFamily: "Gilroy",
                                    }),
                                    menuList: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      maxHeight: "120px",
                                      padding: 0,
                                      scrollbarWidth: "thin",
                                      overflowY: "auto",
                                      fontFamily: "Gilroy",
                                    }),
                                    placeholder: (base) => ({
                                      ...base,
                                      color: "#555",
                                    }),
                                    dropdownIndicator: (base) => ({
                                      ...base,
                                      color: "#555",
                                      display: "inline-block",
                                      fill: "currentColor",
                                      lineHeight: 1,
                                      stroke: "currentColor",
                                      strokeWidth: 0,
                                      cursor: "pointer",
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                    option: (base, state) => ({
                                      ...base,
                                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                                      backgroundColor: state.isFocused
                                        ? "#E7F1FF"
                                        : state.isDisabled
                                          ? "#f0f0f0"
                                          : "#fff",
                                      color: state.isDisabled ? "#aaa" : "#000",
                                    }),
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
                                    className="form-control text-base text-gray-700 font-gilroy font-medium shadow-none border border-gray-300 h-12 rounded"
                                  />
                                </>
                              )}
                              {errors[index]?.reason && (
                                <ErrorMessage message={errors[index]?.reason} type="error" />
                              )}
                            </div>


                            <div className="flex-1">

                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
  //                               onKeyDown={(e) => {
  //   if (e.key === "." || e.key === "e" || e.key === "-") {
  //     e.preventDefault();
  //   }
  // }}
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="form-control text-[16px] text-[#4B4B4B] font-gilroy font-medium shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px]"

                              />
                              {errors[index]?.amount && (
                                <ErrorMessage message={errors[index]?.amount} type="error" />
                              )}
                            </div>

                            <div className="col-md-1 flex justify-center items-center p-0">
                              <Trash
                                size={20}
                                color="red"
                                variant="Bold"
                                className="cursor-pointer"
                                onClick={() => handleRemoveField(index)}
                              />
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  <Button
                    disabled={formLoading}
                    className="w-full mt-2 h-[50px] !bg-[#1E45E1] text-white !font-semibold !text-lg !rounded-xl !font-gilroy"
                    style={{ fontFamily: "Montserrat" }}
                    onClick={handleSaveUserlistAddUser}
                  >
                    Check-In
                  </Button>
                </>

                  :



                  activeTab === "SHORT" && (

                    <div className="flex justify-center items-center mt-5 mr-0 h-[320px] bg-[#f2f6fc] rounded-lg shadow-sm border border-dashed border-[#b0c4de]">
                      <div className="text-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                          alt="Coming Soon"
                          width={80}
                          height={80}
                          className="mb-4 opacity-70"
                        />
                        <p className="text-[#7a7a7a] text-sm" style={{ fontFamily: "Gilroy" }}>
                          Coming Soon. Stay tuned!
                        </p>
                      </div>
                    </div>

                  )
                }

              </div>

            </div>
          </Modal.Body>

          {(formLoading || loading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10 top-[100px]">
              <div className="w-10 h-10 border-t-4 border-r-4 border-t-blue-600 border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </Modal.Dialog>
      </Modal>



      {/* advanceForm */}

      {/* <Modal
        show={props.advanceForm}
        onHide={handleCloseAdvanceForm}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 666,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >

          <Modal.Header style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Generate Advance
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseAdvanceForm}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body style={{ paddingTop: 2 }}>
            <div className="d-flex align-items-center">
              <div className="container">



                <div className="row mb-3">
                  <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Invoice Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDate ? dayjs(advanceDate) : null}
                          onChange={(date) => {
                            setAdvanceDateError("");
                            setAdvanceDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                          disabledDate={(current) => current && current > dayjs().endOf("day")}
                        />
                      </div>
                    </Form.Group>
                    {advanceDateError && (
                      <ErrorMessage message={advanceDateError} type="error" />
                    )}
                  </div>
                  <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Due Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDueDate ? dayjs(advanceDueDate) : null}
                          onChange={(date) => {
                            setAdvanceDueDateError("");
                            setAdvanceDueDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                        />
                      </div>
                    </Form.Group>
                    {advanceDueDateError && (
                      <ErrorMessage message={advanceDueDateError} type="error" />
                    )}
                  </div>
                </div>

                <div className="row col-md-12 col-lg-12">
                  <div className="col-md-6 col-lg-6">
                    <Button
                      variant="secondary"
                      className="w-100"
                      style={{
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    // onClick={handleSaveUserlistAddUserButon}
                    //                          onClick={() => {
                    //   if (props.BookingAssignForm) {
                    //     handleSaveBookingCancel();
                    //   } else {
                    //     handleSaveUserlistAddUserButon();
                    //   }
                    // }}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="col-md-6 col-lg-6 mb-2">
                    <Button disabled={loading}
                      variant="primary"
                      className="w-100"
                      style={{
                        backgroundColor: "#1E45E1",
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                    // onClick={handleSaveAdvance}
                    //                       onClick={() => {
                    //   if (props.BookingAssignForm) {
                    //     handleSaveBookingAdvance();
                    //   } else {
                    //     handleSaveAdvance();
                    //   }
                    // }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </Modal.Body>
          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
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
          </div>}


        </Modal.Dialog>
      </Modal> */}




    </div>
  );
}

UserlistForm.propTypes = {
  EditObj: PropTypes.func.isRequired,
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  OnShowTable: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  AfterEditFloors: PropTypes.func.isRequired,
  AfterEditRoomses: PropTypes.func.isRequired,
  AfterEditBeds: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  displayDetail: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  advanceForm: PropTypes.func.isRequired,
  setAdvanceForm: PropTypes.func.isRequired,
  setShowAssignMenu: PropTypes.func.isRequired,
  showAssignMenu: PropTypes.func.isRequired,
  bactocheckinForm: PropTypes.func.isRequired,
  setBacktoCheckInForm: PropTypes.func.isRequired,
  BookingAssignForm: PropTypes.func.isRequired,
  setBookingAssignForm: PropTypes.func.isRequired,
  customer_details: PropTypes.func.isRequired,
  recheckin: PropTypes.func.isRequired,
  handleCloseBed: PropTypes.func.isRequired,
};
export default UserlistForm;