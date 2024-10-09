import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './addAsset.css'
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import Calendars from '../Assets/Images/New_images/calendar.png'
import { MdError } from "react-icons/md";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort ,Edit, Trash} from 'iconsax-react';





function StaticExample({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state", state)

    console.log("currentItem", currentItem)

    const [initialState, setInitialState] = useState({
        pglist: '',
        room: '',
        selectedDate: '',
        floor_id: ''
    });



    useEffect(() => {
        if (currentItem.hostel_id) {
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
        } else {
            setPgList('')
            setRoom('')
            setSelectedDate('')
        }
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

    const [pglist, setPgList] = useState('')
    const [room, setRoom] = useState('')
    const [date, setDate] = useState('')
    const [Floor, setFloor] = useState('')

    const [pglistError, setPglistError] = useState('');
    const [roomError, setRoomError] = useState('');
    const [dateError, setDateError] = useState('');
    const [floorError, setFloorError] = useState('');
    const [noChangeError, setNoChangeError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);

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



    const handlePgChange = (e) => {
        setPgList(e.target.value)
        setGeneralError('')
        setPglistError('')
        setNoChangeError('');
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
        setGeneralError('')
        setRoomError('')
        setNoChangeError('');
    }

    const handleDateChange = (selectedDates) => {
        setSelectedDate(selectedDates[0]);
        setGeneralError('')
        setDateError('');
        setNoChangeError('');
    }

    const handleFloor = (e) => {
        setFloor(e.target.value)
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
    }, [pglist]);


    const handleAddAssignAsset = () => {

        setPglistError('');
        setRoomError('');
        setDateError('');
        setFloorError('');
        setNoChangeError('');


        if (!pglist && !room && !selectedDate && !Floor) {
            setGeneralError('Please enter all required fields')
            return;
        }

        if (!pglist) {
            setPglistError('Please select a PG List');
            return;
        }

        if (!Floor) {
            setFloorError('Please select a Floor');
            return;
        }

        if (!room) {
            setRoomError('Please select a Room');
            return;
        }

        if (!selectedDate) {
            setDateError('Please select a Date');
            return;
        }



        let formattedSelectedDate;
        let formattedInitialDate;

        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
            formattedSelectedDate = `${year}/${month}/${day}`;
        } else {
            setDateError('Invalid date');
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

        console.log("isChanged", isChanged, initialState, pglist, room, Floor, selectedDate)

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


        } else {

        }
    }

    useEffect(() => {
        if (state.AssetList.addAssignAssetStatusCode == 200) {
            setPgList('')
            setRoom('')
            setSelectedDate('')
            setFloor('')
            handleClose()

        }

    }, [state.AssetList.addAssignAssetStatusCode])














    console.log("pglist", room)
    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial', fontFamily: "Gilroy",
            }}
        >
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header  style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}</Modal.Title>
                   
                        <CloseCircle size="24" color="#000"  onClick={handleClose}/>
                   
                   
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>
                        {pglistError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {pglistError}
                                </label>
                            </div>
                        )}
                        {roomError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {roomError}
                                </label>
                            </div>
                        )}

                        {dateError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {dateError}
                                </label>
                            </div>
                        )}

                        {floorError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {floorError}
                                </label>
                            </div>
                        )}

                        {noChangeError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {noChangeError}
                                </label>
                            </div>
                        )}
                        {generalError && (
                            <div className="d-flex align-items-center p-1 mb-2">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {generalError}
                                </label>
                            </div>
                        )}

                        <div className='row mt-1'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select" value={pglist} onChange={handlePgChange} style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: pglist ? 600 : 500 }}>
                                        <option value="" disabled>Select a PG</option>
                                        {
                                            state.UsersList?.hostelList?.map((item) => {
                                                return (
                                                    <>
                                                        <option key={item.id} value={item.id}>{item.Name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Floor <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    placeholder='Select no. of floor'
                                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: Floor ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                    id="form-selects"
                                    className='border'
                                    value={Floor}
                                    onChange={(e) => handleFloor(e)}
                                >
                                    <option>Selected Floor</option>
                                    {state.UsersList?.hosteldetailslist
                                        ?.map((u) => (
                                            <option key={u.floor_id}>
                                                {u.floor_id}
                                            </option>
                                        ))}
                                </Form.Select>
                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Select a room <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select" value={room} onChange={handleRoomChange} style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: room ? 600 : 500 }}>
                                        <option value="" disabled>Select a room</option>
                                        {state.AssetList.GetRoomList && state.AssetList.GetRoomList.map((item) => {
                                            return (
                                                <>
                                                    <option key={item.Room_Id} value={item.Room_Id} >
                                                        {item.Room_Id}</option>
                                                </>
                                            )

                                        })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Date <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                                    <div style={{ position: 'relative' }}>
                                        <label
                                            htmlFor="date-input"
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                borderRadius: 8,
                                                padding: 12,
                                                fontSize: 14,
                                                fontFamily: "Gilroy",
                                                fontWeight: selectedDate ? 600 : 500,
                                                color: "#222222",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                            onClick={() => {
                                                if (calendarRef.current) {
                                                    calendarRef.current.flatpickr.open();
                                                }
                                            }}
                                        >
                                            {selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                                            <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                                        </label>
                                        <Flatpickr
                                            ref={calendarRef}
                                            options={options}
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className='d-none d-sm-none d-md-none'
                                            style={{
                                                padding: 10,
                                                fontSize: 16,
                                                width: "100%",
                                                borderRadius: 8,
                                                border: "1px solid #D9D9D9",
                                                position: 'absolute',
                                                top: 100,
                                                left: 100,
                                                zIndex: 1000,
                                                display: "none"
                                            }}
                                        />
                                    </div>












                                </Form.Group>








                            </div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button className='w-100' onClick={handleAddAssignAsset} style={{ backgroundColor: "#1E45E1", fontWeight: 600,  borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", padding:12  }} >
                            {currentItem.hostel_id ? 'Save Changes' : 'Assign asset'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;