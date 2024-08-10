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
import { FileX } from 'react-bootstrap-icons';
import moment from 'moment';
import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';



function StaticExample({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state for Add expenses", state)

    console.log("currentItem  expense", currentItem)


    const [assetName, setAssetName] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [price, setPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [category, setCategory] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [description, setDescription] = useState('');
    const [count, setCount] = useState('')
    const [id, setId] = useState('')
    const [hostelName, setHostelName] = useState('')




    const [initialState, setInitialState] = useState({
        
        assetName:'',
        vendorName: '',
        selectedDate: '',
        price:'',
        category:'',
        modeOfPayment:'',
        description:'',
        count:'',
        hostelName:'',
      
            });



    const handleHostelNameChange = (e) => {
        setHostelName(e.target.value)
    }


    const handleCountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCount(value);
        }
    };

    const handleAssetNameChange = (e) => {
        setAssetName(e.target.value);
    };

    const handleVendorNameChange = (e) => {
        setVendorName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };


    console.log("category", category)


    const handleModeOfPaymentChange = (e) => {
        setModeOfPayment(e.target.value);
    };

    const handlePurchaseDateChange = (e) => {
        setPurchaseDate(e.target.value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };







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

    console.log("category", category, initialState)

    useEffect(() => {
        if (currentItem) {
            setId(currentItem && currentItem.id || '')
            setAssetName(currentItem && currentItem.asset_id || '');
            setVendorName(currentItem && currentItem.vendor_id || '');
            setSelectedDate(moment(currentItem.purchase_date).toDate());
            setPrice(currentItem && currentItem.unit_amount || '');
            setCategory(currentItem && currentItem.category_id || '');
            setModeOfPayment(currentItem && currentItem.payment_mode || '');
            setDescription(currentItem && currentItem.description || '');
            setCount(currentItem && currentItem.unit_count || '')
            setHostelName(currentItem && currentItem.hostel_id || '')

            setInitialState({

                assetName: currentItem.asset_id || '',
                vendorName: currentItem.vendor_id || '',
                selectedDate: currentItem.purchase_date ? moment(currentItem.purchase_date).toDate() : null,
                price:currentItem.unit_amount || '',
                category:currentItem.category_id || '',
                modeOfPayment:currentItem.payment_mode || '',
                description:currentItem.description || '',
                count:currentItem.unit_count || '',
                hostelName:currentItem.hostel_id || '',
         

            })


        }
    }, [currentItem])









    const handleAddExpenses = () => {
        const isChanged = 
        initialState.assetName !== assetName ||
        initialState.vendorName !== vendorName ||
        initialState.selectedDate && selectedDate && initialState.selectedDate.getTime() !== selectedDate.getTime() ||
        initialState.price !== price ||
        initialState.category !== category ||
        initialState.modeOfPayment !== modeOfPayment ||
        initialState.description !== description ||
        initialState.count !== count ||
        initialState.hostelName !== hostelName;

    console.log("isChanged", isChanged);

    if (!isChanged) {
        Swal.fire({
            icon: 'warning',
            title: 'No changes detected',
            text: 'Please make some changes before saving.',
            timer: 2000,
        });
        return;
    }

       if (!vendorName) {
            Swal.fire('Error', 'Please select a vendor', 'error');
            return;
        }
        if (!category) {
            Swal.fire('Error', 'Please select a category', 'error');
            return;
        }
        if (!selectedDate) {
            Swal.fire('Error', 'Please select a purchase date', 'error');
            return;
        }
        if (!count) {
            Swal.fire('Error', 'Please enter a unit count', 'error');
            return;
        }
        if (!price) {
            Swal.fire('Error', 'Please enter a price', 'error');
            return;
        }
        if (!modeOfPayment) {
            Swal.fire('Error', 'Please enter a mode of payment', 'error');
            return;
        }

        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');  
        dispatch({
            type: 'ADDEXPENSE',
            payload: {
                vendor_id: vendorName,
                asset_id: assetName,
                category_id: category,
                purchase_date: formattedDate,
                unit_count: count,
                unit_amount: price,
                description: description,
                payment_mode: modeOfPayment,
                hostel_id:hostelName,
                id: currentItem ? currentItem.id : null
            }
        });

        handleClose();
    };


    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);


  console.log("selectedDate",selectedDate)



    const options = {
        dateFormat: 'd/m/Y',
        defaultDate: selectedDate || new Date(),
    };

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.flatpickr.set(options);
        }
    }, [selectedDate])

    const formatDateForPayload = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split('T')[0]; 
      };
    

const [formattedDate, setFormattedDate] = useState('')


      const handleDateChange = (selectedDates) => {
     
    setSelectedDate(selectedDates[0]); 
    
              };


    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial', fontFamily: "Gilroy",
            }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem ? 'Edit an expense' : 'Add an expense'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Hostel Name</Form.Label>
                                    <Form.Select aria-label="Default select example" value={hostelName} onChange={handleHostelNameChange} className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        <option>Select an hostel</option>
                                        {state.UsersList.hostelList && state.UsersList.hostelList.map((view) => (
                                            <>

                                                <option key={view.id} value={view.id}>{view.Name}</option>

                                            </>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Vendor Name <span style={{ color: "#FF0000", display: vendorName ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" value={vendorName} onChange={handleVendorNameChange} className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        <option>Select a vendor</option>
                                        {state.ComplianceList.VendorList && state.ComplianceList.VendorList.map((view) => (
                                            <>

                                                <option key={view.id} value={view.id}>{view.Vendor_Name}</option>

                                            </>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Asset Name</Form.Label>
                                    <Form.Select aria-label="Default select example" value={assetName} onChange={handleAssetNameChange} className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        <option>Select an asset</option>
                                        {state.AssetList.assetList && state.AssetList.assetList.map((view) => (
                                            <>

                                                <option key={view.id} value={view.id}>{view.asset_name}</option>

                                            </>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            {state.ExpenseList.categoryList && state.ExpenseList.categoryList.length ==0 && 
                            <label className="pb-1" style={{ fontSize: 14, color: "red", fontFamily: "Gilroy", fontWeight: 500 }}> Please add a 'Category' option in Settings, accessible after adding an expense.</label>}

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>

                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Category <span style={{ color: "#FF0000", display: category ? "none" : "inline-block" }}>*</span></Form.Label>
                                   
                                   
                                    <Form.Select aria-label="Default select example"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        <option>Select a Category</option>
                                        {state.ExpenseList.categoryList && state.ExpenseList.categoryList.map((view) => (
                                            <>

                                                <option  key={view.category_Id} value={view.category_Id}>{view.category_Name}</option>

                                            </>
                                        ))}

                                    </Form.Select>
                                   
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Purchase Date <span style={{ color: "#FF0000", display: purchaseDate ? "none" : "inline-block" }}>*</span></Form.Label>
                                    {/* <Form.Control
                                        value={purchaseDate}
                                        onChange={handlePurchaseDateChange}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} /> */}
                               
                               
                               <div style={{ position: 'relative' }}>
                                        <label
                                            htmlFor="date-input"
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                borderRadius: 8,
                                                padding: 7,
                                                fontSize: 14,
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                color: "rgba(75, 75, 75, 1)",
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
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unit count <span style={{ color: "#FF0000", display: count ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Control
                                        value={count}
                                        onChange={handleCountChange}
                                        type="text" placeholder="Enter unit count" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Per unit amount <span style={{ color: "#FF0000", display: price ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Purchase Amount</Form.Label>
                                    <Form.Control
                                        value={count * price}
                                        disabled
                                        type="text" placeholder="" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Mode of payment <span style={{ color: "#FF0000", display: modeOfPayment ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={modeOfPayment}
                                        onChange={handleModeOfPaymentChange}
                                        className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        <option value="">Select mode of payment</option>
                                        <option value="UPI/BHIM">UPI/BHIM</option>
                                        <option value="CASH">CASH</option>
                                        <option value="Net Banking">Net Banking</option>
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-12 col-md-12  col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Description</Form.Label>
                                    <Form.Control
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        type="email" placeholder="Enter description" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>




                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>
                        <Button onClick={handleAddExpenses} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }} >
                            {currentItem ? 'Edit  expense' : 'Add  expense'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;