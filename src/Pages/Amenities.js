import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import { BsExclamationOctagonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AmenitiesView from '../Pages/AmenitiesView'
import Swal from 'sweetalert2';
import img2 from '../Assets/Images/edit.png';

function Amenities() {


    const state = useSelector(state => state)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'HOSTELLIST' })
        dispatch({ type: 'AMENITIESLIST' })
    }, [])

    console.log("state for Amenities", state)


    const [showModal, setShowModal] = useState(false);
    const [amenitiesName, setAmenitiesName] = useState('')
    const [amount, setAmount] = useState('')
    const [active, setActive] = useState(false)
    const [edit, setEdit] = useState('')
    const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
    const [status, setStatus] = useState('')

    const handleHostelChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        console.log("selectedIndex", selectedIndex)
        setSelectedHostel({
            id: e.target.value,
            name: e.target.options[selectedIndex].text
        });
    };
    const handleAmenitiesChange = (e) => {
        setAmenitiesName(e.target.value)
    }


    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSetAsDefault = (e) => {
        console.log("Switch", e.target.checked)
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




    const handleAmenitiesSetting = () => {
        dispatch({ type: 'AMENITIESSETTINGS', payload: { AmenitiesName: amenitiesName, Amount: amount, setAsDefault: active, Hostel_Id: selectedHostel.id, Status: status } })
        setAmenitiesName('')
        setAmount('')
        handleCloseModal()
    }

    const handleEdit = (item) => {
        console.log("amenities edit", item)

        setShowModal(true)
        setEdit('EDIT')
        console.log("edit", edit)
        setAmenitiesName(item.AmenitiesName)
        setAmount(item.Amount)
        setActive(item.setAsDefault)
        setStatus(item.Status)
        setSelectedHostel({
            id: item.Hostel_Id,

        });
    }


useEffect(()=>{
if(state.InvoiceList?.statusCode === 200){
    dispatch({ type: 'AMENITIESLIST' })
   }
setTimeout(()=>{
dispatch({type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE'})
},300)
},[state.InvoiceList?.statusCode])


const TurnOn = state.InvoiceList?.Amenities?.map((item)=>{
    return item
})

console.log("TurnOn",TurnOn)

    return (
        <div className='Amenities'>
            <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600 }}>Amenities Settings</h4>
                    <p style={{ color: '#67686C' }}>Lorem ipsum dolor sit amet consectetur.</p>
                </div>

                <div class="" >
                    <Button variant="outline-primary" onClick={handleShowModal} style={{ width: "fit-content" }}><FaPlus className="me-1" />Create Amenities </Button>
                </div>

            </div>
            {state.InvoiceList.AmenitiesList.length === 0 ? (
                <div className='d-flex justify-content-center'>
                    <label>Create a Amenities</label>
                </div>

            ) : (
                <div class="table-responsive mt-4" style={{ width: "100%" }}>

                    <table class="table text-center" >
                        <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                            <tr >
                                <th scope="col">Hostel Name</th>
                                <th scope="col">Amenities Name</th>
                                <th scope="col">Amount <BsExclamationOctagonFill className='ms-1' /></th>
                                <th scope="col">Set as Default <BsExclamationOctagonFill className='ms-1' /></th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: 13 }}>

                            {state.InvoiceList.AmenitiesList.map((item, index) => (
                                                            <AmenitiesView item={item} modalEditAmenities={handleEdit} selectedHostel={selectedHostel} />
                            ))}

                        </tbody>
                    </table>
                </div>


            )}



            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F5F5FF" }} className="text-center">
                    <Modal.Title style={{ fontSize: 18 }} className="text-center">{edit === 'EDIT' ? 'Update Amenities' : 'Create Amenities'}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='mb-3 ps-2  pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select PG</label>
                        <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            {state.UsersList.hostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </div>
                    <div className='mb-3 ps-2  pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amenities Name</label>
                        <Form.Control
                            placeholder="Amenities Name"
                            aria-label="Recipient's username"
                            className='border custom-input'
                            aria-describedby="basic-addon2"
                            value={amenitiesName}
                            onChange={(e) => handleAmenitiesChange(e)}
                            style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                            }}

                        />

                    </div>
                    <div className='mb-3 ps-2 pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amount</label>
                        <Form.Control
                            placeholder="Amount"
                            aria-label="Recipient's username"
                            className='border custom-input'
                            aria-describedby="basic-addon2"
                            value={amount}
                            onChange={(e) => handleAmountChange(e)}
                            style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                            }}

                        />
                    </div>

                    <div className='d-flex justify-content-between  ps-2 pe-2 '>
                        <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 650 }} >Set as Default</label>
                        <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                    </div>
                    {edit === 'EDIT' && <>

                        <div className='mb-3 ps-2  pe-2'>
                            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
                            <Form.Select aria-label="Default select example" value={status} onChange={(e) => handleStatusChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
                                <option style={{ fontSize: 14, fontWeight: 600, }} >Select Status</option>

                                <option value="1" >Active</option>
                                <option value="0" >In Active</option>
                            </Form.Select>
                        </div>

                    </>}

                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="outline-primary" onClick={handleCloseModal} size="sm" style={{ borderRadius: 8, width: '100px', marginRight: '15px' }}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" style={{ borderRadius: 8, width: '100px' }} onClick={handleAmenitiesSetting} >
                    {edit === 'EDIT' ? 'Update' : 'Create'} 
                    </Button>

                </Modal.Footer>
            </Modal>



        </div>

    )
}

export default Amenities