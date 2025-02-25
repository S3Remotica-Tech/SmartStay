import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/menu.jpeg'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import SmartLogo from '../Assets/Images/Logo-Icon.png'


import "./EB_Roombased.css"

const EBROOM = (props) => {

    const handlebackbtn = () => {
        props.visibility(true)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'EBLIST' })
        dispatch({ type: 'EBSTARTMETERLIST' })
    }, [])



    useEffect(() => {
        if (props.hosteldetails.id) {
            dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: props.hosteldetails.id } })
        }

    }, [props.hosteldetails.id])


    const state = useSelector((state) => state);

    const [floorId, setFloorId] = useState('');
    const [RoomId, setRoomID] = useState('');
    const [startmeter, setStartmeter] = useState();
    const [endmeter, setEndmeter] = useState('');
    const [amount, setAmount] = useState('');
    const [roomsByFloor, setRoomsByFloor] = useState([]);



    const handleFloorChange = (e) => {
        const selectedFloorId = e.target.value;
        setFloorId(e.target.value);
        const filteredRooms = state.UsersList.hosteldetailslist.filter(room => room.Floor_Id == selectedFloorId);
        setRoomsByFloor(filteredRooms);
    }

    const handleRoomchange = (e) => {
        setRoomID(e.target.value)
    }

    const handlestartmeter = (e) => {
        setStartmeter(e.target.value)
    }

    const handleendmeter = (e) => {
        setEndmeter(e.target.value)
    }

    const handleamount = (e) => {
        setAmount(e.target.value)
    }

    const handleSaveEbBill = () => {
        if (props.hosteldetails.id && floorId && RoomId && endmeter && amount) {
            dispatch({ type: 'CREATEEB', payload: { Hostel_Id: props.hosteldetails.id, Floor: floorId, Room: RoomId, end_Meter_Reading: endmeter, EbAmount: amount } });
            setFloorId('')
            setRoomID('')
            setEndmeter('')
            setAmount('')
            Swal.fire({
                icon: "success",
                title: 'EB Added successfully',
                confirmButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });
        }
        else if (props.hosteldetails.id && endmeter && amount) {
            dispatch({ type: 'CREATEEB', payload: { Hostel_Id: props.hosteldetails.id, end_Meter_Reading: endmeter, EbAmount: amount } });
            setEndmeter('')
            setAmount('')
            Swal.fire({
                icon: "success",
                title: 'EB Added successfully',
                confirmButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });
        }
        else {
            Swal.fire({
                icon: "warning",
                title: 'Please Enter All Fields',
                confirmButtonText: "ok"
            }).then((result) => {
                // Handle confirmation if needed
            });
        }
    }

    const [filtervalue, setFilteredvalue] = useState([]);

    useEffect(() => {
        const filteredArray = state.PgList.EB_Customerlist.filter(item => item.Hostel_Id == props.hosteldetails.id);
        setFilteredvalue(filteredArray);
    }, [props.hosteldetails.id, state.PgList.EB_Customerlist]);


    const [startmeterdata, setStartmeterData] = useState([])

    useEffect(() => {
        const filteredstartmeter = state.PgList.EB_startmeterlist.filter(item => item.Floor == 0 && item.Room == 0 ? item?.hostel_Id == props?.hosteldetails.id : item?.hostel_Id == props?.hosteldetails.id && item.Floor == floorId && item.Room == RoomId);
        const lastItem = filteredstartmeter[filteredstartmeter.length - 1];
        setStartmeterData(lastItem);
    }, [props.hosteldetails.id, state.PgList.EB_startmeterlist, floorId, RoomId]);





    return (
        <div className="container ms-2 me-2">
            <div className="d-flex row justify-content-between mt-2 me-4 pt-3">
                <div className='col-lg-8 col-md-6 col-sm-12 d-flex '>
                    <div className="me-2 d-flex justify-content-center align-items-center" title="Back" onClick={handlebackbtn} style={{ height: 40, width: 40, backgroundColor: "#E6EDF5", borderRadius: 50 }}>

                        <MdOutlineKeyboardDoubleArrowLeft style={{ fontSize: '22px' }} />

                    </div>
                    <div>
                        <h1 style={{ fontSize: "20px" }}>{props.hosteldetails.isHostelBased == 0 ? "Equally divided by Room based" : "Equally divided by Hostel based"}</h1>
                        <p>Manage your account settings</p>
                    </div>
                </div>


            </div>

            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "#F6F7FB", borderRadius: '10px', padding: '10px' }} className="col-3 ">
                <div style={{ backgroundColor: 'white', height: '60px', width: '60px', borderRadius: '50%' }}>
                    <Image src={props.hosteldetails.profile || SmartLogo} roundedCircle
                        style={{
                            height: 35,
                            width: 35,
                            borderRadius: '50%',
                            border: "1px solid lightgray",
                            marginLeft: '12px',
                            marginTop: '12px'
                        }} />
                </div>


                <h6 className="ms-4 mt-3">{props.hosteldetails.Name}</h6>
            </div>
            {props.hosteldetails.isHostelBased == 0 &&
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="col-4 mt-3 mb-2 me-4" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, marginBottom: '5px' }}>Select floor</label>
                        <select
                            className="RoomSelectBox"
                            aria-label="Default select example"
                            value={floorId}
                            onChange={(e) => handleFloorChange(e)}
                        >
                            <option value="" disabled>
                                Select floor
                            </option>
                            {state.UsersList?.hosteldetailslist?.length > 0 ? (
                                state.UsersList.hosteldetailslist
                                    .filter(
                                        (item, index, array) =>
                                            array.findIndex((i) => i.Floor_Id === item.Floor_Id) === index
                                    )
                                    .map((u) => (
                                        <option key={u.Floor_Id} value={u.Floor_Id}>
                                            {u.Floor_Id}
                                        </option>
                                    ))
                            ) : (
                                <option value="" disabled>
                                    No floors available
                                </option>
                            )}
                        </select>

                    </div>

                    <div className="col-4 mt-3 mb-2" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, marginBottom: '5px' }}>Select Room</label>
                        <select
                            className="RoomSelectBox"
                            aria-label="Default select example"
                            value={RoomId}
                            onChange={(e) => handleRoomchange(e)}
                        >
                            <option value="" disabled>
                                Select Room
                            </option>
                            {roomsByFloor?.length > 0 ? (
                                roomsByFloor.map((item) => (
                                    <option key={item.Room_Id} value={item.Room_Id}>
                                        {item.Room_Id}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No rooms available
                                </option>
                            )}
                        </select>

                    </div>
                </div>
            }



            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div className="col-4 mt-2 mb-2 me-4">
                    <label style={{ fontSize: '13px', fontWeight: 700 }}>Start Meter Reading</label>

                    <Form.Control
                        placeholder="123-098"
                        aria-label='Start Meter Reading'
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        disabled
                        value={startmeterdata ? startmeterdata.end_Meter_Reading : 0}
                        onChange={(e) => handlestartmeter(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop: '9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}
                    />

                </div>


                <div className="col-4 mt-2 mb-2">
                    <label style={{ fontSize: '13px', fontWeight: 700 }}>End Meter Reading</label>
                    <Form.Control
                        placeholder="123-098"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        value={endmeter}
                        onChange={(e) => handleendmeter(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop: '9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}

                    /></div>


            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="col-4 mt-2 mb-2 me-4">
                    <label style={{ fontSize: '13px', fontWeight: 700 }}>Amount</label>
                    <Form.Control
                        placeholder="Amount"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        value={amount}
                        onChange={(e) => handleamount(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop: '9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}

                    /></div>
                <div className="col-4 mt-2 mb-2 me-4">
                    <button onClick={handleSaveEbBill}
                        type="button" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px', marginTop: '34px' }}  >Submit</button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
                <div className="col-3">
                    <h4 style={{ fontSize: '20px' }}>EB Detail</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div >
                        <input className="input-field date" type="date" placeholder="Previous month EB" />
                    </div>
                    <div>
                        <button type="button" className="mb-2 ms-2" style={{ backgroundColor: "#E1EAFF", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA", marginRight: '10px' }}  >See All</button>
                    </div>
                </div>
            </div>

            <div className="table-responsive mt-3" style={{ width: "100%" }}>
                <table className="table text-center" >
                    <thead style={{
                        backgroundColor: "#E6EDF5", color: "rgb(147, 147, 147)",fontWeight:500, fontSize: "10px", position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}>
                        <tr >
                            <th scope="col">Customer <i className="bi bi-caret-down-fill ms-2"></i></th>
                            <th scope="col">Room Number <i className="bi bi-caret-down-fill ms-2"></i></th>
                            <th scope="col">Unit <i className="bi bi-caret-down-fill ms-2"></i></th>
                            <th scope="col">EB Amount <i className="bi bi-caret-down-fill ms-2"></i></th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {filtervalue.length > 0 && filtervalue.map((item) => (
                            <tr>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Name}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Room_No}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Eb_Unit}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{props.hosteldetails.isHostelBased == 0 ? item.Room_Based : item.Hostel_Based}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >
                                    <span><i className="bi bi-pencil-fill me-2"></i></span>
                                    <span><i className="bi bi-trash3"></i></span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>
    )

}
export default EBROOM;