import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircle } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { fontFamily } from '@mui/system';

function RecurringEnable({ show, handleCloseRecurring, amenityDetails }) {

    const state = useSelector(state => state)

    const dispatch = useDispatch();

    const [formLoading, setFormLoading] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState('');
    const [recurringDay, setRecurringDay] = useState('');

    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');
    const [errorRecurringDay, setErrorRecurringDay] = useState('');





    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
    }));

    const dayOptionsEnd = Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
    }));




    const customStyles = {

        control: (base) => ({
            ...base,
            height: "40px",
            fontFamily:"Gilroy",
            border: "1px solid #ced4da",
        }),
        option: (provided, state) => ({
            ...provided,
            padding: "6px 10px",
            backgroundColor: state.isFocused
                ? "lightblue"
                : "white",
            color: "#222",
            cursor: "pointer",
             fontFamily:"Gilroy",
        }),
        menu: (base) => ({
            ...base,
            maxHeight: "120px",
            overflowY: "auto",
            scrollbarWidth: "thin",
             fontFamily:"Gilroy",
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
             fontFamily:"Gilroy",
        }),
        valueContainer: (base) => ({
            ...base,
            maxHeight: "40px",
            overflow: "hidden",
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

    }

    const handleStartDateChange = (selectedOption) => {
        setStartDate(selectedOption ? selectedOption.value : null);
        setErrorStartDate("")
    };
    const handleEndDateChange = (selectedOption) => {
        setEndDate(selectedOption ? selectedOption.value : null);
        setErrorEndDate('');
    };



    const handleRecurringDayChange = (e) => {
        setRecurringDay(e.target.value);
        setErrorRecurringDay('');

    };








    const handleSubmit = () => {
        let isValid = true;

        if (!startDate) {
            setErrorStartDate('Start Date is Required');
            isValid = false;
        } else {
            setErrorStartDate('');
        }

        if (!endDate) {
            setErrorEndDate('End Date is Required');
            isValid = false;
        } else {
            setErrorEndDate('');
        }



        if (isValid) {
            dispatch({
                type: 'RECURRINGROLE', payload: {

                    type: "amenities",
                    recure: 1,
                    hostel_id: state.login.selectedHostel_Id,
                    start_date: startDate,
                    end_date: endDate,
                    am_id: amenityDetails.id,
                }
            })
            setFormLoading(true)


        }
    };


    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial'
            }}
        >
            <Modal show={show} onHide={handleCloseRecurring} centered backdrop="static" >
                <Modal.Dialog style={{
                    maxWidth: 850,
                    width: '100%',

                }} className='m-0 p-0'>
                    <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Recurring Enable</Modal.Title>
                        <CloseCircle cursor="pointer" size="24" color="#000" onClick={handleCloseRecurring} />
                    </Modal.Header>


                    {errorRecurringDay && (
                        <div style={{ color: 'red', fontSize: 12, marginLeft: 10, fontFamily: "Gilroy" }}>{errorRecurringDay}</div>
                    )}
                    <Modal.Body>
                        <div className='row mt-2 row-gap-2'>
                            <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenities Calculation Start Date Will Be
                                        <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                                    {errorStartDate && (
                                        <div className="d-flex align-items-center">
                                            <MdError style={{ color: "red", marginRight: "5px" }} />
                                            <span
                                                style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {errorStartDate}
                                            </span>
                                        </div>
                                    )}
                                </Form.Group>

                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Select
                                    options={dayOptions}
                                    value={dayOptions.find((option) => option.value === startDate) || null}
                                    onChange={handleStartDateChange}
                                    placeholder="Start Day"
                                    styles={customStyles}

                                />
                            </div>





                            <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenities Calculation End Date Will Be
                                        <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                                    {errorEndDate && (
                                        <div className="d-flex align-items-center">
                                            <MdError style={{ color: "red", marginRight: "5px" }} />
                                            <span
                                                style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {errorEndDate}
                                            </span>
                                        </div>
                                    )}
                                </Form.Group>

                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Select
                                    options={dayOptionsEnd}
                                    value={dayOptionsEnd.find((option) => option.value === endDate) || null}
                                    onChange={handleEndDateChange}
                                    placeholder="End Day"
                                    styles={customStyles}

                                />
                            </div>


                            <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>On Every<span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                                </Form.Group>

                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Form.Select
                                    id="vendor-select"
                                    style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}
                                    value={recurringDay}
                                    onChange={handleRecurringDayChange}
                                >


                                    <option selected value="Monthly">Monthly</option>

                                </Form.Select>

                            </div>
                        </div>

                    </Modal.Body>
{formLoading &&
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
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
                    }
                    <Modal.Footer style={{ border: "none" }}>

                        <Button
                            onClick={handleSubmit}
                            className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, padding: 12, borderRadius: 8, fontSize: 16, fontFamily: "Gilroy" }}>
                            Add Amenities
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>

    )
}

RecurringEnable.propTypes = {
    show: PropTypes.func.isRequired,
    handleCloseRecurring: PropTypes.func.isRequired,
    amenityDetails: PropTypes.func.isRequired,
};

export default RecurringEnable