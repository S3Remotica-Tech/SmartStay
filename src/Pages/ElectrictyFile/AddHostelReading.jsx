/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle, } from "iconsax-react";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../Components/ErrorMessage'
import PropTypes from "prop-types";



function AddHostelReading({ show, handleClose
    ,
    editHostelReading,
    //  selectedRowDetails, roomReadingList 
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [readingError, setReadingError] = useState("");
    const [changesError, setChangesError] = useState("");
    const [dateError, setDateError] = useState("");
    const [currentReading, setCurrentReading] = useState("");
    const [readingDate, setReadingDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        reading: "",
        date: "",
    });
    const readingDateRef = useRef(null);

    useEffect(() => {

        readingDateRef.current?.focus();
    }, []);


    const handleCurrentReadingChange = (e) => {
        setChangesError('')
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setCurrentReading(value);
            setReadingError('')
        }
    };

    const handleReadingDateChange = (date) => {
        setChangesError('')
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        setReadingDate(date ? date : null);
        setDateError('')
    };

    const formatToInputDate = (dateStr) => {
        if (!dateStr) return "";
        const [dd, mm, yyyy] = dateStr.split("/");
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        if (editHostelReading) {
            setReadingDate(formatToInputDate(editHostelReading.entryDate));
            setCurrentReading(editHostelReading?.lastReading)
            const formattedInputDate = formatToInputDate(editHostelReading.entryDate);
            setInitialValues({
                reading: Number(editHostelReading?.lastReading),
                date: formattedInputDate,
            });
        }

    }, [editHostelReading])


    // console.log("editHostelReading", editHostelReading)





    const handleSubmit = () => {
        setChangesError('')
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        let hasError = false;

        if (!currentReading) {
            setReadingError("Please enter  reading");
            hasError = true;
        } else {
            setReadingError("");
        }

        if (!readingDate) {
            setDateError("Please select reading date");
            hasError = true;
        } else {
            setDateError("");
        }

        if (hasError) return;
        const formattedDate = readingDate ? dayjs(readingDate).format("DD-MM-YYYY") : "";
        if (editHostelReading && currentReading) {


            const isReadingChanged =
                Number(currentReading) !== Number(initialValues.reading);

            const isDateChanged = !dayjs(readingDate).isSame(
                dayjs(initialValues.date),
                "day"
            );

            if (!isReadingChanged && !isDateChanged) {
                setChangesError("No changes detected");
                return;
            }

            dispatch({
                type: 'EDITHOSTELREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    readingId: editHostelReading?.id,
                    reading: Number(currentReading),
                    entryDate: formattedDate,

                }
            })
            setLoading(true)
        }
        else if (currentReading) {
            dispatch({
                type: 'ADDROOMREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    reading: Number(currentReading),
                    readingDate: formattedDate,
                }
            })
            setLoading(true)


        }


    };



    useEffect(() => {
        if (state.UsersList?.addRoomReadingStatusCode === 201 || state.UsersList?.addRoomReadingStatusCode === 200 || state.UsersList?.editHostelStatusCode === 200) {
            setLoading(false)
        }

    }, [state.UsersList?.addRoomReadingStatusCode, state.UsersList?.editHostelStatusCode])

    useEffect(() => {
        if (state.UsersList?.roomReadingError) {
            setLoading(false)
        }

    }, [state.UsersList?.roomReadingError])





    return (
        <div>
            <Modal show={show} onHide={handleClose} centered backdrop="static">

                <Modal.Header
                    className="flex justify-between items-center p-3 mb-0"
                >
                    <Modal.Title className="!text-xl !font-semibold !font-gilroy">
                        {editHostelReading ? "Edit Hostel Reading" : "Add Hostel Reading"}
                    </Modal.Title>

                    <CloseCircle
                        size={26}
                        color="black"
                        className="cursor-pointer"
                        onClick={handleClose}
                    />
                </Modal.Header>
                <Modal.Body className="">

                    {state.UsersList?.roomReadingError && (
                        <ErrorMessage message={state.UsersList?.roomReadingError} type="error" />
                    )}

                    <Form.Group className="mt-0">

                        <Form.Label className="block text-sm font-medium font-gilroy mb-1"
                        >
                            Reading Date <span className="text-red-500 text-xl">*</span>
                        </Form.Label>

                        <div
                            className="datepicker-wrapper relative w-full mt-1"
                        >

                            <div className="datepicker-wrapper  relative w-full">
                                <DatePicker ref={readingDateRef}
                                    className="w-full h-12 px-2 cursor-pointer font-gilroy"
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    value={readingDate ? dayjs(readingDate) : null}
                                    onChange={handleReadingDateChange}
                                    getPopupContainer={() => document.body}
                                    disabledDate={(current) => current && current > dayjs()}
                                />
                            </div>



                        </div>

                        {dateError && (
                            <ErrorMessage message={dateError} type="error" />

                        )}


                    </Form.Group>

                    <Form.Group className="mt-2">
                        <div className="flex justify-between items-center w-full mb-1">
                            <Form.Label>
                                Reading  {" "}  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                            </Form.Label>
                            {
                                !editHostelReading &&

                                <span className="font-gilroy font-normal text-sm leading-none text-gray-500">
                                    Last Reading : {" "}
                                    <span className="text-[#1E45E1] font-gilroy">
                                        {state.UsersList?.getRoomReadingList?.hostelReadings[0]?.lastReading}
                                    </span>

                                </span>
                            }
                        </div>

                        <Form.Control className={`mt-2 w-full px-3 py-3 text-sm font-gilroy ${currentReading ? "font-semibold" : "font-medium"
                            }`}
                            type="number"
                            placeholder="Enter Reading"
                            value={currentReading}
                            onChange={handleCurrentReadingChange}
                        />
                        {readingError && (
                            <ErrorMessage message={readingError} type="error" />

                        )}

                    </Form.Group>

                    {
                        changesError &&
                        <div className="flex justify-center">
                            <ErrorMessage message={changesError} type="error" />
                        </div>
                    }



                </Modal.Body>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                        <div className="w-10 h-10 border-t-4 border-r-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <Modal.Footer className="!border-t-0">
                    <Button className="bg-transparent border-0 !text-black !font-gilroy"
                     onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="!bg-blue-700 w-[130px] !font-gilroy"
                    onClick={handleSubmit}>
                        {editHostelReading ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
AddHostelReading.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    editHostelReading: PropTypes.func.isRequired,
}


export default AddHostelReading