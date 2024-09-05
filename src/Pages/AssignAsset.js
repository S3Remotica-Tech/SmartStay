import React, { useState, useEffect ,useRef} from 'react';
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


function StaticExample({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state", state)

    console.log("currentItem", currentItem)

    const [initialState, setInitialState] = useState({
        pglist: '',
        room: '',
        selectedDate: ''
    });



    useEffect(() => {
        if (currentItem.hostel_id) {
            setPgList(currentItem.hostel_id)
            setRoom(currentItem.room_id)
            setSelectedDate(moment(currentItem.assigned_date).toDate())
                       setInitialState({
                pglist: currentItem.hostel_id || '',
                room: currentItem.room_id || '',
               selectedDate: currentItem.assigned_date ? moment(currentItem.assigned_date).toDate() : null,
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
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleDateChange = (selectedDates) => {
        setSelectedDate(selectedDates[0]); 
    }

   const handleFloor = (e) => {
    setFloor(e.target.value)
   }


    useEffect(() => {
        if (Floor) {
            dispatch({ type: 'GETROOMS', payload: { hostel_Id: pglist ,floor_Id: Floor } })
        }
    }, [Floor])

    useEffect(() => {
        dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: pglist } })
      }, [pglist]);
    

    const handleAddAssignAsset = () => {


        if (!pglist && !room && !selectedDate && !Floor) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter All Fields',

            });
            return;
        }

        if (!pglist) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Select a PG List',
            });
            return;
        }
        
        if (!room) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Select a Room',
            });
            return;
        }
        
        if (!selectedDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Select a Date',
            });
            return;
        }

        if (!Floor) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Select a Floor',
            });
            return;
        }

        
        const isChanged = 
          Number(initialState.pglist) !== Number(pglist) ||
        Number(initialState.room) !== Number(room)||
        initialState.selectedDate !== selectedDate;


        if (!isChanged) {
            Swal.fire({
                icon: 'warning',
                title: 'No changes detected',
            });
            return;
        }
        if (pglist && room && selectedDate && currentItem.id) {
            dispatch({ type: 'ASSIGNASSET', payload: { asset_id: currentItem.id, hostel_id: pglist, room_id: room, asseign_date: selectedDate,
                //  floor_Id: Floor
                 } })
           
            handleClose()
        } else {

        }
    }

    useEffect(() => {
        if (state.AssetList.addAssignAssetStatusCode == 200) {
                   setPgList('')
            setRoom('')
            setSelectedDate('')
          
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
            <Modal show={show} onHide={handleClose}  backdrop="static">
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest</Form.Label>
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
<Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Floor</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        placeholder='Select no. of floor'
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:Floor ? 600 :  500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
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
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Select a room</Form.Label>
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
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Date</Form.Label>
                                    {/* <Form.Control className="custom-date-input"
                                        value={date}
                                        onChange={handleDateChange}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: date ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} /> */}
                              
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
                                            {selectedDate instanceof Date && !isNaN(selectedDate) ?  selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                                            <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                                        </label>
                                        <Flatpickr
                                            ref={calendarRef}
                                            options={options}
                                            value={selectedDate}
                                            onChange={handleDateChange}
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

                        <Button className='w-100' onClick={handleAddAssignAsset} style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }} >
                            {currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;