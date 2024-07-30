import React, { useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import Button from 'react-bootstrap/Button';
import { Dropdown, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import { BsExclamationOctagonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AmenitiesView from '../Pages/AmenitiesView'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import "./Amenities.css";
import dottt from "../Assets/Images/Group 14.png"
import Swal from 'sweetalert2';

function Amenities() {


    const state = useSelector(state => state)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'AMENITIESLIST' })
        dispatch({ type: 'HOSTELLIST' })
    }, [])


    const loginId = localStorage.getItem('loginId');
    const [createdby, setCreatedby] = useState('')



    const [showModal, setShowModal] = useState(false);
    const [id, setID] = useState('')
    const [amenitiesName, setAmenitiesName] = useState('')
    console.log("amenitiesName", amenitiesName);
    const [amount, setAmount] = useState('')
    const [active, setActive] = useState(false)
    const [edit, setEdit] = useState('')
    const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
    const [status, setStatus] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [filteredamenities, setFilteredAmenities] = useState([])

    const handleHostelChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setShowTable(true)
        setSelectedHostel({
            id: e.target.value,
            name: e.target.options[selectedIndex].text
        });
        // const filteredamenities = state.InvoiceList.AmenitiesList.filter(item => item.Hostel_Id == e.target.value);
        // console.log('filteredamenities', filteredamenities);
        // setFilteredAmenities(filteredamenities);
    };


    useEffect(() => {
        const filteredamenities = state.InvoiceList.AmenitiesList.filter(item => item.Hostel_Id == selectedHostel.id);
        setFilteredAmenities(filteredamenities);

        setTimeout(() => {
            dispatch({ type: 'CLEAR_AMENITIES_STATUS_CODE' })
        }, 1000)

    }, [state.InvoiceList.StatusCodeAmenitiesGet, selectedHostel])



    const handleAmenitiesChange = (event, newValue) => {
        setAmenitiesName(event.target.value);
    };

    const handleInputChange = (event, newInputValue) => {
        setAmenitiesName(newInputValue);
    };




    const handleAmountChange = (e) => {
        setAmount(e.target.value)

    }

    const handleSetAsDefault = (e) => {
        setActive(e.target.checked);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setEdit('ADD')
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }





    // const handleAmenitiesSetting = () => {
    //     const setAsDefault = active || false;
    //     if (edit === 'EDIT') {
    //         dispatch({ type: 'AMENITIESUPDATE', payload: { id: id, Amount: amount, setAsDefault: setAsDefault, Status: status, Hostel_Id: selectedHostel.id } })
    //         setAmenitiesName('')
    //         setAmount('')
    //         setActive('')
    //         setStatus('')
    //         handleCloseModal()
    //     } else {
    //         dispatch({ type: 'AMENITIESSETTINGS', payload: { id: id, AmenitiesName: amenitiesName, Amount: amount, setAsDefault: setAsDefault, Hostel_Id: selectedHostel.id, Status: status} })
    //         setAmenitiesName('')
    //         setAmount('')
    //         setActive('')
    //         setStatus('')
    //         handleCloseModal()
    //     }


    // }
    const [selectedhostel, setSelecteDHostel] = useState('');
    // const [unit , setUnit] = useState('');
    // const [amount , setAmount] = useState('')
    console.log("selectedHostel", selectedhostel);

    const handleHostelClick = (e) => {
        setSelecteDHostel(e.target.value)
    };


    const handleAmenitiesSetting = () => {
        const setAsDefault = active || false;

        // console.log("amount", amount);
        // console.log("status", status);
        // console.log("edit", edit);
        // console.log("amenitiesName", amenitiesName);
        // console.log("selectedHostel.id", selectedHostel.id);
        // console.log("setAsDefault ",setAsDefault )


        // if (edit === 'ADD') {
        //     if (!amenitiesName || !amount || !selectedhostel) {
        //         console.log("Validation failed for ADD mode");
        //         Swal.fire({
        //             icon: 'warning',
        //             title: 'Error',
        //             text: 'Please Enter All Fields',
        //             timer: 3000,
        //             showConfirmButton: false,
        //         });
        //         return;
        //     }
        // } 
        // else if (edit === 'EDIT') {
        //     if (!amount || !status || !selectedhostel) {
        //         console.log("Validation failed for EDIT mode");
        //         Swal.fire({
        //             icon: 'warning',
        //             title: 'Error',
        //             text: 'Please Enter All Fields',
        //             timer: 3000,
        //             showConfirmButton: false,
        //         });
        //         return;
        //     }
        // }


        // if (edit === 'EDIT') {
        //     dispatch({ type: 'AMENITIESUPDATE', payload: { id: id, Amount: amount, setAsDefault: setAsDefault, Status: status, Hostel_Id: selectedhostel } });
        // }
        //  else {
        // }
        if (amenitiesName && amount && selectedhostel) {
            dispatch({ type: 'AMENITIESSETTINGS', payload: { amenitiesName: amenitiesName, Amount: amount, setAsDefault: setAsDefault, Hostel_Id: selectedhostel } });

            setSelecteDHostel('')
            setAmenitiesName('');
            setAmount('');
            // setAsDefault('')
            setActive('');
        }
        else {
            Swal.fire({
                icon: "warning",
                title: 'Please Enter All Field',
                confirmButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });
        }

        // setStatus('');
        // handleCloseModal();
    }





    // const handleEdit = (item) => {
    //     setShowModal(true)
    //     setEdit('EDIT')
    //     setID(item.Amnities_Id)
    //     setAmenitiesName(item.Amnities_Name)
    //     setAmount(item.Amount)
    //     setActive(item.setAsDefault)
    //     setStatus(item.Status)
    //     setSelectedHostel({
    //         id: item.Hostel_Id,

    //     });
    // }


    useEffect(() => {
        if (state.InvoiceList?.statusCode === 200 || state.InvoiceList?.AmenitiesUpdateStatusCode == 200) {
            dispatch({ type: 'AMENITIESLIST' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
            }, 1000)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
            }, 1000)
        }

    }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])


    const TurnOn = state.InvoiceList?.Amenities?.map((item) => {
        return item
    })


    const uniqueOptions = Array.from(new Set(state?.InvoiceList?.AmenitiesList.map((item) => item.Amnities_Name)));

    //     const[ hostelname , setHostelname] = useState([])
    //    const  Hostelnamefilterlist = state.UsersList.hostelList.filter((u)=> u.id == state?.InvoiceList?.AmenitiesList.id )
    //     setHostelname(Hostelnamefilterlist)
    //     console.log("Hostelnamefilterlist", hostelname);



    return (

        <>

            <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
                <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>
                    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                                Select Hostel
                            </Form.Label>
                            <Form.Select aria-label="Default select example"
                                className='border' value={selectedhostel} onChange={(e) => handleHostelClick(e)} style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                                <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                                {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                                    <>
                                        <option key={item.id} value={item.id} >{item.Name}</option></>
                                ))}

                            </Form.Select>
                        </Form.Group>

                    </div>
                    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12' style={{ border: '1px solid #ced4da', padding: '30px', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                                    >
                                        Amenity
                                    </Form.Label>
                                    <Form.Control
                                        style={{ padding: '10px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter amenity"
                                        value={amenitiesName}
                                        onChange={handleAmenitiesChange}

                                    />
                                </Form.Group>
                            </div>

                            <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                                    >
                                        Set Amount
                                    </Form.Label>
                                    <Form.Control
                                        style={{ padding: '10px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={amount}
                                        onChange={(e) => handleAmountChange(e)}

                                    />
                                </Form.Group>
                            </div>

                            <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                                <div className='d-flex justify-content-between  ps-2 pe-2 '>
                                    <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 600 }} >Set as Default</label>
                                    <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Button className='col-lg-11 col-md-12 col-sm-12 col-xs-12' onClick={handleAmenitiesSetting} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12 }}>
                                Save Changes</Button>
                        </div>

                    </div>
                </div>

                <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} />

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0">
                    <Table className="ebtable mt-3" responsive  >
                        <thead style={{ backgroundColor: "#E7F1FF" }}>
                            <tr>

                                <th className='ps-1 ps-lg-5' style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Paying guest</th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amenity</th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amount </th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Status</th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>

                            </tr>
                        </thead>
                        <tbody style={{ height: "50px", fontSize: "11px" }}>

                            {state.InvoiceList.AmenitiesList.length > 0 && state.InvoiceList.AmenitiesList.map((amenity) => (
                                <tr style={{ lineHeight: "40px" }}>
                                    <td className='ps-1 ps-lg-5' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{amenity.Name}</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{amenity.Amnities_Name}</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>₹ {amenity.Amount}</td>
                                    {/* <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{amenity.Status == 1 ? "Active" : "Inactive"}</td> */}
                                    <td style={{
                                        // paddingTop: 20,
                                        fontSize: "16px",
                                        color: amenity.Status == 1 ? "green" : "red",
                                        fontWeight: 500
                                    }}>
                                        {amenity.Status == 1 ? <span style={{ backgroundColor: '#D9FFD9', padding: '8px 12px', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy' }}>Active</span> : <span
                                            // onClick={() => handleShow(props.item)}
                                            style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', padding: '8px 12px', color: '#000', borderRadius: '14px' }}>Inactive</span>}</td>
                                    <td> <img src={dottt} style={{ height: 30, width: 30 }} /></td>
                                </tr>
                            )
                            )}

                            {state.InvoiceList.AmenitiesList.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", color: "red", fontSize: 14 }}>No data found</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </div>
            </div>




            {/* <div className='container'>

          

            <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                      <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#222", fontStyle:'normal', lineHeight:'normal'}}>
                        Select Hostel
                      </Form.Label>
                    <Form.Select aria-label="Default select example" 
           className='border'     value={selectedhostel} onChange={(e) => handleHostelClick(e)}  style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                        <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                        {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                            <>
                                <option key={item.id} value={item.id} >{item.Name}</option></>
                        ))}

                    </Form.Select>
                </Form.Group>

            </div>

            <div className='col-lg-10 col-md-8 col-sm-12 col-xs-12' style={{ border: '1px solid #ced4da', padding: '30px', paddingRight: '100px', borderRadius: '20px' }}>
             

                  <>
                <div className='d-flex row ' style={{width:'auto'}}>
                  
                    
                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
                            >
                                Amenity
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '20px', marginTop: '10px' }}
                                type="text"
                                placeholder="Enter amenity"
                                value={amenitiesName}
                                onChange={handleAmenitiesChange}
                            
                            />
                        </Form.Group>
                    </div>

                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
                            >
                                Set Amount
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '20px', marginTop: '10px' }}
                                type="text"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => handleAmountChange(e)}
                            
                            />
                        </Form.Group>
                    </div>

              

                 
                </div>
                <div style={{display:'flex',flexDirection:'column'}} className='col-lg-8'>
                <div className='d-flex justify-content-between  ps-2 pe-2 '>
                         <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 600 }} >Set as Default</label>
                         <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                    </div>
               
                        </div>
          
            
            <div>
                <p style={{fontFamily:'Gilroy', fontSize: 16,fontWeight:600, color: "#1E45E1", fontStyle:'normal', lineHeight:'normal'}}>+ Add new amenity</p>
            </div>

           
        </>

                <div style={{ marginTop: '30px' }}>
                    <Button onClick={handleAmenitiesSetting} style={{fontFamily:'Montserrat', fontSize: 16,fontWeight:500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing:1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}> Save Changes</Button>
                </div>

            </div>


        </div> */}

        </>

        // <div className='Amenities'>
        //     <div className='d-flex justify-content-between'>

        //         <div>
        //             <h4 style={{ fontSize: 20, fontWeight: 600 }}>Amenities Settings</h4>
        //         </div>

        //         <div class="" >
        //             <Button variant="outline-primary" onClick={handleShowModal} style={{ width: "fit-content" }}><FaPlus className="me-1" />Create Amenities </Button>
        //         </div>

        //     </div>
        //     <div className='row'>
        //         <div className='col-lg-6 col-12'>
        //             <Form.Group className="mb-3">
        //                 <Form.Label style={{ fontSize: 14, fontWeight: 600, }}>Select Hostel</Form.Label>
        //                 <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, fontWeight: 600, backgroundColor: "#E6EDF5" }}>

        //                     <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
        //                     {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((item) => (
        //                         <>
        //                             <option key={item.id} value={item.id} >{item.Name}</option></>
        //                     ))}

        //                 </Form.Select>
        //             </Form.Group>
        //         </div>
        //     </div>

        //     {showTable && <>
        //         <div class="table-responsive mt-4" style={{ width: "100%" }}>

        //             <table class="table text-center" >
        //                 <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
        //                     <tr >
        //                         {/* <th scope="col" style={{ textAlign: 'left' }}>Hostel Name</th> */}
        //                         <th scope="col">Amenities Name</th>
        //                         <th scope="col">Amount <BsExclamationOctagonFill className='ms-1' /></th>
        //                         <th scope="col">Set as Default <BsExclamationOctagonFill className='ms-1' /></th>
        //                         <th scope="col">Action</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody style={{ fontSize: 13 }}>

        //                     {filteredamenities.length > 0 && filteredamenities.map((item, index) => (
        //                         <AmenitiesView item={item} modalEditAmenities={handleEdit} selectedHostel={selectedHostel} />
        //                     ))}

        //                 </tbody>
        //             </table>
        //         </div>
        //     </>}






        //     <Modal show={showModal} onHide={handleCloseModal} centered>
        //         <Modal.Header closeButton style={{ backgroundColor: "#F5F5FF" }} className="text-center">
        //             <Modal.Title style={{ fontSize: 18 }} className="text-center">{edit === 'EDIT' ? 'Update Amenities' : 'Create Amenities'}</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body >
        //             <div className='mb-3 ps-2  pe-2'>
        //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select PG</label>
        //                 <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>

        //                     <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
        //                     {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((item) => (
        //                         <>
        //                             <option key={item.id} value={item.id} >{item.Name}</option></>
        //                     ))}

        //                 </Form.Select>
        //             </div>


        //             <div className='mb-3 '>
        //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amenities Name</label>
        //                 <Autocomplete
        //                     value={amenitiesName}
        //                     onChange={handleAmenitiesChange}
        //                     onInputChange={handleInputChange}
        //                     label='Amenities'
        //                     id="free-solo-dialog-demo"
        //                     options={uniqueOptions}
        //                     selectOnFocus
        //                     clearOnBlur
        //                     disabled={edit === 'EDIT'}
        //                     handleHomeEndKeys
        //                     renderOption={(props, option) => (
        //                         <li {...props}>
        //                             {option}
        //                         </li>
        //                     )}

        //                     style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa", width: '97%', marginLeft: '1%' }}
        //                     sx={{ width: 300 }}

        //                     renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, placeholder: 'Amenities Name' }} />}
        //                 />
        //             </div>

        //             <div className='mb-3 ps-2 pe-2'>
        //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amount</label>
        //                 <Form.Control
        //                     placeholder="Amount"
        //                     aria-label="Recipient's username"
        //                     className='border custom-input'
        //                     aria-describedby="basic-addon2"
        //                     value={amount}
        //                     onChange={(e) => handleAmountChange(e)}
        //                     style={{
        //                         fontSize: 12,
        //                         fontWeight: "530",
        //                         opacity: 1,
        //                         borderRadius: "4px",
        //                         color: "gray",
        //                         '::placeholder': { color: "gray", fontSize: 12 }
        //                     }}

        //                 />
        //             </div>

        //             <div className='d-flex justify-content-between  ps-2 pe-2 '>
        //                 <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 650 }} >Set as Default</label>
        //                 <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
        //             </div>
        //             {edit === 'EDIT' && <>

        //                 <div className='mb-3 ps-2  pe-2'>
        //                     <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
        //                     <Form.Select aria-label="Default select example" value={status} onChange={(e) => handleStatusChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
        //                         <option style={{ fontSize: 14, fontWeight: 600, }} >Select Status</option>

        //                         <option value="1" >Active</option>
        //                         <option value="0" >In Active</option>
        //                     </Form.Select>
        //                 </div>

        //             </>}

        //         </Modal.Body>
        //         <Modal.Footer className='d-flex justify-content-center'>
        //             <Button variant="outline-primary" onClick={handleCloseModal} size="sm" style={{ borderRadius: 8, width: '100px', marginRight: '15px' }}>
        //                 Cancel
        //             </Button>
        //             <Button variant="primary" size="sm" style={{ borderRadius: 8, width: '100px' }} onClick={handleAmenitiesSetting} >
        //                 {edit === 'EDIT' ? 'Update' : 'Create'}
        //             </Button>

        //         </Modal.Footer>
        //     </Modal>



        // </div>

    )
}

export default Amenities