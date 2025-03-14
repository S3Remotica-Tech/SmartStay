/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import "../../Pages/AssetFile/addAsset.css";
import moment from 'moment';
// import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import Calendars from '../../Assets/Images/New_images/calendar.png'
import { MdError } from "react-icons/md";
import {CloseCircle } from 'iconsax-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";
import Select from "react-select";



function StaticExample({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [pglist, setPgList] = useState(state.login.selectedHostel_Id)
    const [room, setRoom] = useState('')
    // const [date, setDate] = useState('')
    const [Floor, setFloor] = useState('')

    // const [pglistError, setPglistError] = useState('');
    const [roomError, setRoomError] = useState('');
    const [dateError, setDateError] = useState('');
    const [floorError, setFloorError] = useState('');
    const [noChangeError, setNoChangeError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);
    const [roomList, setRoomList] = useState([])


  

    const [initialState, setInitialState] = useState({
        pglist: '',
        room: '',
        selectedDate: '',
        floor_id: ''
    });

    useEffect(() => {
        setPgList(state.login.selectedHostel_Id)
    }, [state.login.selectedHostel_Id])

    useEffect(() => {
        setPgList(state.login.selectedHostel_Id)
    }, [])



    useEffect(() => {
        if (currentItem.hostel_id !== 'null' && currentItem.hostel_id !== null) {
            setPgList(currentItem.hostel_id)
            setRoom(currentItem.room_id)
            setSelectedDate(moment(currentItem.assigned_date).toDate())
            setFloor(currentItem.floor_id)
            setInitialState({
                pglist: currentItem.hostel_id || '',
                room: currentItem.room_id || '',
                selectedDate: currentItem.assigned_date ? moment(currentItem.assigned_date).toDate() : null,
                floor_id: currentItem.floor_id || ''
            });
        }
        // else {
        //     setPgList('')
        //     setRoom('')
        //     setSelectedDate('')
        // }
    }, [currentItem])




    useEffect(() => {
        const closeButton = document.querySelector('button[aria-label="close-button"]');
        if (closeButton) {
            closeButton.style.backgroundColor = 'white';
            closeButton.style.borderRadius = '50%';
            closeButton.style.width = '10px';
            closeButton.style.height = '10px';
            closeButton.style.border = '1.5px solid #222222';
            closeButton.style.padding = '9px';
        }
    }, []);



    const options = {
        dateFormat: 'd/m/Y',
        defaultDate: selectedDate || new Date(),
        maxDate: 'today',
    };

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.flatpickr.set(options);
        }
    }, [selectedDate])




    // const handlePgChange = (e) => {
    //     setPgList(e.target.value)
    //     setGeneralError('')
    //     setPglistError('')
    //     setNoChangeError('');
    // }

    const handleRoomChange = (selectedOption) => {
        setRoom(selectedOption?.value || '')
        setGeneralError('')
        setRoomError('')
        setNoChangeError('');
    }

    // const handleDateChange = (selectedDates) => {
    //     setSelectedDate(selectedDates[0]);
    //     setGeneralError('')
    //     setDateError('');
    //     setNoChangeError('');
    // }

    const handleFloor = (selectedOption) => {
        setFloor(selectedOption?.value || '')
        setGeneralError('')
        setFloorError('')
        setNoChangeError('');
    }


    useEffect(() => {
        if (Floor) {
            dispatch({ type: 'GETROOMS', payload: { hostel_Id: pglist, floor_Id: Floor } })
        }
    }, [Floor])

    useEffect(() => {
        dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: pglist } })
    }, []);


    useEffect(() => {
        if (state.AssetList.getRoomStatusCode === 200) {
            setRoomList(state.AssetList?.GetRoomList)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_ROOMS' })
            }, 1000)

        }

    }, [state.AssetList.getRoomStatusCode])



    const handleAddAssignAsset = () => {

        // setPglistError('');
        setRoomError('');
        setDateError('');
        setFloorError('');
        setNoChangeError('');


        if (!pglist && !room && !selectedDate && !Floor) {
            setGeneralError('Please enter all required fields')
            return;
        }

        // if (!pglist) {
        //     setPglistError('Please select a PG List');
        //     // return;
        // }

        if (!Floor) {
            setFloorError('Please Select a Floor');
            // return;
        }

        if (!room) {
            setRoomError('Please Select a Room');
            // return;
        }

        if (!selectedDate) {
            setDateError('Please Select a Date');
            // return;
        }



        let formattedSelectedDate;
        let formattedInitialDate;

        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
            formattedSelectedDate = `${year}/${month}/${day}`;
        } else {
            setDateError('Please select a Date');
            return;
        }

        if (initialState.selectedDate instanceof Date && !isNaN(initialState.selectedDate)) {
            const day = initialState.selectedDate.getDate().toString().padStart(2, '0');
            const month = (initialState.selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = initialState.selectedDate.getFullYear();
            formattedInitialDate = `${year}/${month}/${day}`;
        } else {
            formattedInitialDate = '';
        }


        const isChanged =
            Number(initialState.pglist) !== Number(pglist) ||
            Number(initialState.room) !== Number(room) ||
            formattedInitialDate !== formattedSelectedDate ||
            Number(initialState.floor_id) !== Number(Floor);


        if (!isChanged) {
            setNoChangeError('No changes detected');
            return;
        }


        if (pglist && room && selectedDate && currentItem.id && Floor) {
            dispatch({
                type: 'ASSIGNASSET', payload: {
                    asset_id: currentItem.id, hostel_id: pglist, room_id: room, asseign_date: formattedSelectedDate,
                    floor_id: Floor
                }
            })


        } 
    }

    useEffect(() => {
        if (state.AssetList.addAssignAssetStatusCode === 200) {
            setPgList('')
            setRoom('')
            setSelectedDate('')
            setFloor('')
            handleClose()

        }

    }, [state.AssetList.addAssignAssetStatusCode])





    const customDateInput = (props) => {
        return (
            <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
                <FormControl
                    type="text"
                    className='date_input'
                    value={props.value || 'DD/MM/YYYY'}
                    readOnly
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: props.value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none"
                    }}
                />
                <img
                    src={Calendars}
                    style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }}
                    alt="Calendar"
                    onClick={props.onClick}
                />
            </div>
        );
    };









    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial', fontFamily: "Gilroy",
            }}
        >
            <Modal show={show} onHide={handleClose} backdrop="static" centered
            //  dialogClassName="custom-modal"
             >
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header>
                        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}</Modal.Title>

                        <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />


                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>







                        {/* {noChangeError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {noChangeError}
                                </label>
                            </div>
                        )} */}
                        {generalError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {generalError}
                                </label>
                            </div>
                        )}

                        <div className='row '>
                    
                            <div className='col-lg-12 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Floor <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                {/* <Form.Select
                                    aria-label="Default select example"
                                    placeholder="Select no. of floor"
                                    style={{
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: Floor ? 600 : 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 50,
                                        borderRadius: 8,
                                    }}
                                    id="form-selects"
                                    className="border"
                                    value={Floor}
                                    onChange={(e) => handleFloor(e)}
                                >
                                    <option value="">Select a Floor</option>
                                    {state.UsersList?.hosteldetailslist?.length > 0 ? (
                                        state.UsersList.hosteldetailslist.map((u) => (
                                            <option key={u.floor_id} value={u.floor_id}>
                                                {u.floor_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No floors available
                                        </option>
                                    )}
                                </Form.Select> */}

  <Select
    options={
      state.UsersList?.hosteldetailslist?.length > 0
        ? state.UsersList.hosteldetailslist.map((u) => ({
            value: u.floor_id,
            label: u.floor_name,
          }))
        : []
    }
    onChange={handleFloor}
    value={
      state.UsersList?.hosteldetailslist?.find((f) => f.floor_id === Floor)
        ? {
            value: Floor,
            label: state.UsersList.hosteldetailslist.find(
              (f) => f.floor_id === Floor
            )?.floor_name,
          }
        : null
    }
    placeholder="Select a Floor"
    classNamePrefix="custom"
    menuPlacement="auto"
    noOptionsMessage={() => "No floors available"} // Handles empty state
    styles={{
      control: (base) => ({
        ...base,
        height: "50px",
        border: "1px solid #D9D9D9",
        borderRadius: "8px",
        fontSize: "16px",
        color: "#4B4B4B",
        fontFamily: "Gilroy",
        fontWeight: Floor ? 600 : 500,
        boxShadow: "none",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "120px", // Enables scrolling
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#555",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#555",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


                                {floorError && (
                                    <div className="d-flex align-items-center p-1 mb-2">
                                        <MdError style={{ color: "red", marginRight: '5px',fontSize:"13px" }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {floorError}
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2'>
                                <Form.Group  controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Select a room <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    {/* <Form.Select
                                        aria-label="Select a room"
                                        id="vendor-select"
                                        value={room}
                                        onChange={handleRoomChange}
                                        style={{
                                            fontSize: 16,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: room ? 600 : 500,
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select a room
                                        </option>
                                        {roomList && roomList.length > 0 ? (
                                            roomList.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.Room_Id}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Rooms Available</option>
                                        )}
                                    </Form.Select> */}

  <Select
    options={
      roomList?.length > 0
        ? roomList.map((item) => ({
            value: item.id,
            label: item.Room_Id,
          }))
        : []
    }
    onChange={handleRoomChange}
    value={
      roomList?.find((r) => r.id === room)
        ? {
            value: room,
            label: roomList.find((r) => r.id === room)?.Room_Id,
          }
        : null
    }
    placeholder="Select a Room"
    classNamePrefix="custom"
    menuPlacement="auto"
    noOptionsMessage={() => "No Rooms Available"} // Handles empty state
    styles={{
      control: (base) => ({
        ...base,
        height: "50px",
        border: "1px solid #D9D9D9",
        borderRadius: "8px",
        fontSize: "16px",
        color: "#222222",
        fontFamily: "Gilroy",
        fontWeight: room ? 600 : 500,
        boxShadow: "none",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "120px", // Enables scrolling
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#555",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#555",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


                                </Form.Group>
                                {roomError && (
                                    <div className="d-flex align-items-center p-1 mb-2">
                                        <MdError style={{ color: "red", marginRight: '5px',fontSize:"13px" }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {roomError}
                                        </label>
                                    </div>
                                )}
                            </div>
                         
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2'>
                                <Form.Group  controlId="purchaseDate">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                    </Form.Label>
                                    <div style={{ position: 'relative', width: "100%" }}>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => {
                                                setGeneralError('')
                                                setDateError('')
                                                setNoChangeError('')
                                                setSelectedDate(date);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={null}
                                            customInput={customDateInput({
                                                value: selectedDate ? selectedDate.toLocaleDateString('en-GB') : '',
                                            })}
                                        />
                                    </div>
                                </Form.Group>
                                {dateError && (
                                    <div className="d-flex align-items-center p-1 mb-2">
                                        <MdError style={{ color: "red", marginRight: '5px',fontSize:"13px" }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {dateError}
                                        </label>
                                    </div>
                                )}

                            </div>





                        </div>

                    </Modal.Body>


{noChangeError && (
 
                             <div className="d-flex align-items-center p-1 mb-2 mt-2" style={{width:"100%",marginLeft:170,
                             textAlign:"center"}}>
                                          <MdError style={{ color: "red", marginRight: "5px" }} />
                                          <label
                                            className="mb-0"
                                            style={{
                                              color: "red",
                                              fontSize: "12px",
                                              fontFamily: "Gilroy",
                                              fontWeight: 500,textAlign:"center"
                                            }}
                                          >
                                            {noChangeError}
                                          </label>
                                        </div>
                        )}
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button className='w-100' onClick={handleAddAssignAsset} style={{ backgroundColor: "#1E45E1", 
                            fontWeight: 600, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", padding: 12 }} >
                            {currentItem.hostel_id ? 'Save Changes' : 'Assign asset'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}
StaticExample.propTypes = {
    show: PropTypes.func.isRequired,
    currentItem: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired 
};
export default StaticExample;