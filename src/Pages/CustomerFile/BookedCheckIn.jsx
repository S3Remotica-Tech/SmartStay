/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Image } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/LoginAction";
import { Trash } from 'iconsax-react';
import addcircle from "../../Assets/Images/New_images/add-circle.png";
// import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from '../../Components/ErrorMessage'
import customParseFormat from "dayjs/plugin/customParseFormat";



function BookedCheckIn({ BookingAssignForm, handleClose, bookingDetails }) {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("LONG");
    const [formLoading, setFormLoading] = useState(false)
    // const [floor_name, setFloorName] = useState("")
    //   const [room_name, setRoomName] = useState("")
    //   const [bed_name, setBedName] = useState("")
    const calendarRef = useRef(null);
    const [dateError, setDateError] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    dayjs.extend(customParseFormat);
    const [fields, setFields] = useState([]);
    const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
    const [AdvanceAmount, setAdvanceAmount] = useState("");
    const [advanceAmountError, setAdvanceAmountError] = useState("");
    const [RoomRent, setRoomRent] = useState("");
    const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");
    const [roomrentError, setRoomRentError] = useState("");
    const [errors, setErrors] = useState('')
    const [bookingAmount, setBookingAmount] = useState('')

    const reasonOptions = [
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];




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





    const handleAdvanceAmount = (e) => {
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
        const advanceAmount = e.target.value;
        if (!/^\d*$/.test(advanceAmount)) {
            return;
        }
        setAdvanceAmount(advanceAmount);
        setAdvanceAmountError("");
    };


    const handleRoomRent = (e) => {
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
        const newAmount = e.target.value;
        if (!/^\d*$/.test(newAmount)) {
            return;
        }
        setRoomRent(newAmount);
        setRoomRentError("");
    };







    const handleAddField = () => {
        setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
    };


    const handleInputChange = (index, field, value) => {
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
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





    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
        const updatedErrors = [...errors];
        updatedErrors.splice(index, 1);
        setErrors(updatedErrors);
    };


    const handleSaveBooking = async () => {
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
        let hasError = false;
        setRoomRentError("");
        setAdvanceAmountError("");
        let newErrors = [];
        let hasReasonAmountError = false;

        if (!selectedDate) {
            setJoingDateErrmsg("Please Select Joining Date");
            hasError = true;

        }

        if (!RoomRent) {
            setRoomRentError("Please Enter Rental Amount");
            hasError = true;
        } else if (Number(RoomRent) <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            hasError = true;
        }

        if (!AdvanceAmount) {
            setAdvanceAmountError("Please Enter Advance Amount");
            hasError = true;
        }




        if (hasError) return;

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






        setErrors(newErrors)

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
                hasReasonAmountError = true;
            }


            if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
                error.reason = "Please enter reason";
                hasReasonAmountError = true;
            }

            newErrors.push(error);
            return {
                type: reason_name,
                amount: item.amount || "",
            };
        }).filter((item) => item.type !== "" || item.amount !== "")

        if (hasReasonAmountError) return;

        if (

            AdvanceAmount &&
            Number(RoomRent) > 0 && state.UsersList?.bookedDetails?.canCheckIn
        ) {

            dispatch({
                type: 'BOOKINGTOCHECKIN',
                payload: {
                    customerId: bookingDetails?.customerId,
                    bookingId: state.UsersList?.bookedDetails?.bookingId,
                    joiningDate: formattedDate,
                    advanceAmount: Number(AdvanceAmount),
                    rentalAmount: Number(RoomRent),
                    stayType: activeTab,
                    deductions: formattedReasons?.map(item => ({
                        type: item.type,
                        amount: Number(item.amount),
                    })),
                    isAdvanceIncludedInBooking: true
                }
            });

            setFormLoading(true)



        }

    };

console.log("bookingDetails",bookingDetails)



    useEffect(() => {
        if (bookingDetails?.customerId) {
            dispatch({ type: 'BOOKEDDETAILS', payload: { hostelId: state.login.selectedHostel_Id, customerId: bookingDetails?.customerId } })
            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: bookingDetails?.customerId } });
        }

    }, [bookingDetails])



    useEffect(() => {
        if (state.UsersList?.customerdetails?.bookingInfo || state.UsersList.bookedDetails?.rent) {
            setBookingAmount(state.UsersList?.customerdetails?.bookingInfo?.bookingAmount)
            // setPlaceHolderRoomRent(state.UsersList.bookedDetails?.rent || 0)
        }

    }, [state.UsersList?.customerdetails?.bookingInfo, state.UsersList.bookedDetails?.rent])








    useEffect(() => {
        if (state.UsersList?.bookingToCheckinStatusCode === 200 || state.UsersList?.bookingToCheckinStatusCode === 201) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_BOOKING_TO_CHECKIN' })
            }, 100)
        }

    }, [state.UsersList?.bookingToCheckinStatusCode])


    useEffect(() => {
        if (state.UsersList?.bedError) {
            setFormLoading(false)
            // setPlaceHolderRoomRent(0)
            // setTimeout(() => {
            //     dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
            // }, 3000)

        }

    }, [state.UsersList?.bedError])

    return (
        <Modal
            show={BookingAssignForm}
            onHide={handleClose}
            backdrop="static"
            centered
            dialogClassName="custom-modals-style"
        >
            <Modal.Dialog className="m-0 p-0 max-w-4xl pr-2.5 rounded-3xl font-gilroy">
                <Modal.Body>
                    <div className="flex flex-col max-h-[90vh]">
                        <Modal.Header className="pt-0 relative border-0" >
                            <div className="text-xl font-semibold font-gilroy">
                                Tenant Check-In
                            </div>

                            <CloseCircle
                                size="24"
                                color="#000"
                                onClick={handleClose}
                                className="cursor-pointer"
                            />
                        </Modal.Header>

                        <div className="flex items-center gap-3 mb-3 ml-3">
                            {bookingDetails?.profilePic && bookingDetails?.profilePic !== "0" ? (
                                <Image
                                    src={bookingDetails?.profilePic}
                                    roundedCircle
                                    className="h-14 w-14"
                                    alt="image"
                                />
                            ) : (
                                <div className="h-14 w-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xl font-semibold font-gilroy">
                                    {bookingDetails?.initials || "-"}
                                </div>
                            )}

                            <div>

                                <p
                                    className="mb-1 text-lg font-semibold font-gilroy truncate max-w-[120px]"
                                    title={`${bookingDetails?.firstName || ""} ${bookingDetails?.lastName || ""}`}
                                >
                                    {bookingDetails?.firstName} {bookingDetails?.lastName} {bookingDetails?.name}
                                </p>

                                <div className="flex gap-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                                        {bookingDetails?.floorName || bookingDetails?.hostelInfo?.floorName || state.UsersList?.customerdetails?.hostelInfo?.floorName} 
                                    </span>

                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                                        {bookingDetails?.roomName || bookingDetails?.hostelInfo?.roomName ||  bookingDetails?.room} -{" "}
                                        {bookingDetails?.bedName || bookingDetails?.hostelInfo?.bedName ||  bookingDetails?.bed}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-1 p-1 w-full bg-indigo-50 rounded-lg">
                            <div className="flex gap-2 justify-between w-full">
                                <button
                                    onClick={() => setActiveTab("LONG")}
                                    className={`flex-1 py-2 rounded-md font-semibold font-gilroy
        ${activeTab === "LONG"
                                            ? "bg-blue-700 text-white"
                                            : "bg-blue-50 text-black"
                                        }`}
                                >
                                    Long Stay
                                </button>

                                <button
                                    onClick={() => setActiveTab("SHORT")}
                                    className={`flex-1 py-2 rounded-md font-semibold font-gilroy
        ${activeTab === "SHORT"
                                            ? "bg-blue-700 text-white"
                                            : "bg-blue-50 text-black"
                                        }`}
                                >
                                    Short Stay
                                </button>
                            </div>
                        </div>

                        {activeTab === "LONG" ? <>
                            <div className="show-scroll p-2 mt-2 me-1 max-h-64 md:max-h-36 lg:max-h-[250px] overflow-y-auto">

                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium font-gilroy">
                                        Booking Date
                                    </label>
                                    <label className="text-sm font-semibold text-gray-900 font-gilroy">
                                        {state.UsersList?.customerdetails?.bookingInfo?.bookingDate}
                                    </label>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium font-gilroy">
                                        Booking Amount
                                    </label>
                                    <label className="text-sm font-semibold text-gray-900 font-gilroy">
                                        {bookingAmount}
                                    </label>
                                </div>


                                <hr className="my-2 border-t border-gray-300" />
                                <div className="flex flex-col gap-2">

                                    <div className="w-full">
                                        <Form.Group controlId="purchaseDate">
                                            <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
                                                Joining Date <span className="text-red-500 text-xl">*</span>
                                            </Form.Label>

                                            <div className="relative w-full">
                                                <DatePicker
                                                    className="w-full h-12 cursor-pointer font-gilroy"
                                                    format="DD/MM/YYYY"
                                                    value={selectedDate ? dayjs(selectedDate) : null}
                                                    onChange={(date) => {
                                                        setDateError("");
                                                        setSelectedDate(date);
                                                        setJoingDateErrmsg("");
                                                        dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR_BOOKED" });
                                                        dispatch(JoininDatecustomer(date ? date.toDate() : null));
                                                    }}
                                                    disabledDate={(current) => {
                                                        if (!current) return false;

                                                        const bookedAtDayjs =
                                                            state.UsersList?.bookedDetails?.bookedDate
                                                                ? dayjs(
                                                                    state.UsersList?.bookedDetails?.bookedDate,
                                                                    "DD/MM/YYYY"
                                                                )
                                                                : null;

                                                        return (
                                                            (bookedAtDayjs &&
                                                                current.isBefore(bookedAtDayjs.startOf("day"))) ||
                                                            current.isAfter(dayjs().endOf("day"))
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </Form.Group>

                                        {dateError && <ErrorMessage message={dateError} type="error" />}
                                        {joiningDateErrmsg.trim() !== "" && (
                                            <ErrorMessage message={joiningDateErrmsg} type="error" />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0 mb-4">

                                        <div>
                                            <Form.Group>
                                                <Form.Label className="text-sm font-medium font-gilroy">
                                                    Advance Amount <span className="text-red-500 text-xl">*</span>
                                                </Form.Label>

                                                <FormControl
                                                    type="text"
                                                    placeholder="Enter Amount"
                                                    value={AdvanceAmount}
                                                    onChange={handleAdvanceAmount}
                                                    className={`h-12 text-base font-gilroy text-gray-600 border border-gray-300 rounded-lg shadow-none ${AdvanceAmount ? "font-semibold" : "font-medium"
                                                        }`}
                                                />
                                            </Form.Group>

                                            {advanceAmountError && (
                                                <ErrorMessage message={advanceAmountError} type="error" />
                                            )}
                                        </div>

                                        <div>
                                            <Form.Group>
                                                <Form.Label className="text-sm font-medium font-gilroy">
                                                    Rental Amount <span className="text-red-500 text-xl">*</span>
                                                </Form.Label>

                                                <FormControl
                                                    type="text"
                                                    placeholder={
                                                        state.UsersList.bookedDetails?.rent
                                                            ? `Selected Bed Rent is ${state.UsersList.bookedDetails?.rent}`
                                                            : "Enter Amount"
                                                    }
                                                    value={RoomRent}
                                                    onChange={handleRoomRent}
                                                    className={`h-12 text-base font-gilroy text-gray-600 border border-gray-300 rounded-lg shadow-none ${RoomRent ? "font-semibold" : "font-medium"
                                                        }`}
                                                />
                                            </Form.Group>

                                            {roomrentError && (
                                                <ErrorMessage message={roomrentError} type="error" />
                                            )}
                                        </div>
                                    </div>
                                </div>





                                <div className="mt-3 mb-3 bg-[#F7F9FF] rounded-lg pb-1.5">

                                    <div className="flex justify-between items-center p-4">
                                        <div>
                                            <label className="text-[14px] font-medium font-gilroy">
                                                Non Refundable Amount
                                            </label>
                                        </div>
                                        <div>

                                            <button
                                                onClick={handleAddField}
                                                className="flex items-center gap-1.5 bg-[#1E45E1] text-white font-gilroy font-semibold text-[14px] rounded-[10px] px-4 py-1.5 hover:bg-blue-700"
                                            >
                                                <img
                                                    src={addcircle}
                                                    alt="Add"
                                                    className="h-4 w-4 brightness-0 invert"
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

                                            <div className="grid grid-cols-12 gap-3 px-4 mb-3 items-start" key={index}>
                                                <div className="col-span-12 md:col-span-6">
                                                    {!item.showInput ? (
                                                        <Select
                                                            options={filteredOptions}
                                                            value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                                            onChange={(selectedOption) => {
                                                                const selectedValue = selectedOption.value;
                                                                handleInputChange(index, "reason", selectedValue === "others" ? "others" : selectedValue);
                                                            }}
                                                            isDisabled={item.reason === "maintenance"}
                                                            menuPlacement="auto"
                                                            styles={{
                                                                control: (base) => ({
                                                                    ...base,
                                                                    height: "50px",
                                                                    border: "1px solid #D9D9D9",
                                                                    borderRadius: "0.5rem",
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
                                                                    cursor: "pointer",
                                                                }),
                                                                indicatorSeparator: () => ({ display: "none" }),
                                                                option: (base, state) => ({
                                                                    ...base,
                                                                    cursor: state.isDisabled ? "not-allowed" : "pointer",
                                                                    backgroundColor: state.isFocused ? "#E7F1FF" : state.isDisabled ? "#f0f0f0" : "#fff",
                                                                    color: state.isDisabled ? "#aaa" : "#000",
                                                                }),
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            placeholder="Enter custom reason"
                                                            value={item.customReason}
                                                            onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
                                                            className="w-full h-12 px-3 text-base font-medium text-gray-700 font-gilroy rounded-lg border border-gray-300 shadow-none"
                                                        />
                                                    )}
                                                    {errors[index]?.reason && (
                                                        <ErrorMessage message={errors[index]?.reason} type="error" />
                                                    )}
                                                </div>

                                                <div className="col-span-12 md:col-span-5">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter amount"
                                                        value={item.amount}
onKeyDown={(e) => {
    if (e.key === "." || e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  }}
                                                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                                        className="w-full h-12 px-3 text-base font-medium text-gray-700 font-gilroy rounded-lg border border-gray-300 shadow-none"
                                                    />
                                                    {errors[index]?.amount && (
                                                        <ErrorMessage message={errors[index]?.amount} type="error" />
                                                    )}
                                                </div>

                                                <div className="col-span-12 md:col-span-1 flex justify-center items-start mt-3 p-0">
                                                    <Trash
                                                        size="20"
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


                            {state.UsersList.bedError &&
                                <div className="d-flex justify-center">
                                    <ErrorMessage message={state.UsersList.bedError} type="error" />

                                </div>
                            }


                            <Button
                                className="w-full h-12 mt-2 !rounded-[10px] !bg-[#1E45E1] text-white !text-lg !font-semibold font-gilroy"
                                disabled={
                                    state.UsersList.bedError ||
                                    formLoading ||
                                    !state.UsersList?.bookedDetails?.canCheckIn
                                }
                                onClick={handleSaveBooking}
                            >
                                Assign Bed
                            </Button>
                        </>

                            :

                            activeTab === "SHORT" && (

                                <div className="h-80 mt-5 flex items-center justify-center rounded-lg bg-slate-100 border border-dashed border-slate-300 shadow-sm">
                                    <div className="text-center">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                            alt="Coming Soon"
                                            className="mx-auto mb-4 h-20 w-20 opacity-70"
                                        />
                                        <p className="text-sm text-gray-500 font-gilroy">
                                            Coming Soon. Stay tuned!
                                        </p>
                                    </div>
                                </div>

                            )
                        }


                    </div>

                    {/* </div> */}
                </Modal.Body>

                {formLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-transparent opacity-75">
                        <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-r-transparent animate-spin"></div>
                    </div>
                )}

            </Modal.Dialog>
        </Modal>

    )
}
BookedCheckIn.propTypes = {
    BookingAssignForm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    bookingDetails: PropTypes.func.isRequired,
}
export default BookedCheckIn