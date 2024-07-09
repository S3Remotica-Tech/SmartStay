import React, { useState, useEffect } from 'react';
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
const [id, setId] =useState('')

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
        dispatch({ type: 'VENDORLIST' })
    }, [])


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

    console.log("category",category )

    useEffect(() => {
        if (currentItem) {
setId(currentItem && currentItem.id || '')
            setAssetName(currentItem && currentItem.asset_id || '');
            setVendorName(currentItem && currentItem.vendor_id || '');
            setPurchaseDate(currentItem && moment(currentItem.purchase_date).format('YYYY-MM-DD') || '');
            setPrice(currentItem && currentItem.unit_amount || '');
            setCategory(currentItem && currentItem.category_id  || '');
            setModeOfPayment(currentItem && currentItem.payment_mode || '');
            setDescription(currentItem && currentItem.description || '');
            setCount(currentItem && currentItem.unit_count || '')

        }
    }, [currentItem])









    const handleAddExpenses = () => {
        if (!vendorName) {
            Swal.fire('Error', 'Please select a vendor', 'error');
            return;
        }
        if (!category) {
            Swal.fire('Error', 'Please select a category', 'error');
            return;
        }
        if (!purchaseDate) {
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
if( !modeOfPayment){
    Swal.fire('Error', 'Please enter a mode of payment', 'error');
    return;
}
        dispatch({
            type: 'ADDEXPENSE',
            payload: {
                vendor_id: vendorName,
                asset_id: assetName,
                category_id: category,
                purchase_date: purchaseDate,
                unit_count: count,
                unit_amount: price,
                description: description,
                payment_mode: modeOfPayment,
                id: currentItem ? currentItem.id : null
            }
        });

        handleClose();
    };





    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
            }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>{currentItem ? 'Edit an expense' : 'Add an expense'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Vendor Name <span style={{ color: "#FF0000", display: vendorName ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" value={vendorName} onChange={handleVendorNameChange} className='' id="vendor-select">
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
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 600 }}>Asset Name</Form.Label>
                                    <Form.Select aria-label="Default select example" value={assetName} onChange={handleAssetNameChange} className='' id="vendor-select">
                                        <option>Select an asset</option>
                                        {state.AssetList.assetList && state.AssetList.assetList.map((view) => (
                                            <>

                                                <option key={view.id} value={view.id}>{view.asset_name}</option>

                                            </>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Category <span style={{ color: "#FF0000", display: category ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className='' id="vendor-select">
                                        <option>Select a Category</option>
                                        {state.ExpenseList.categoryList && state.ExpenseList.categoryList.map((view) => (
                                            <>

                                                <option key={view.id} value={view.id}>{view.category_Name}</option>

                                            </>
                                        ))}

                                    </Form.Select>
                                </Form.Group>

                            </div>
                           
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Purchase Date <span style={{ color: "#FF0000", display: purchaseDate ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Control
                                        value={purchaseDate}
                                        onChange={handlePurchaseDateChange}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Unit count <span style={{ color: "#FF0000", display: count ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Control
                                        value={count}
                                        onChange={handleCountChange}
                                        type="text" placeholder="Enter unit count" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Per unit amount <span style={{ color: "#FF0000", display: price ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Purchase Amount</Form.Label>
                                    <Form.Control
                                        value={count * price}
                                        disabled
                                        type="text" placeholder="" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 600 }}>Mode of payment <span style={{ color: "#FF0000", display: modeOfPayment ? "none" : "inline-block" }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={modeOfPayment}
                                        onChange={handleModeOfPaymentChange}
                                        className='' id="vendor-select">
                                        <option value="">Select mode of payment</option>
                                        <option value="UPI/BHIM">UPI/BHIM</option>
                                        <option value="CASH">CASH</option>
                                        <option value="Net Banking">Net Banking</option>
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-12 col-md-12  col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Description</Form.Label>
                                    <Form.Control
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        type="email" placeholder="Enter description" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>




                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>
                        <Button onClick={handleAddExpenses} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }} >
                            {currentItem ? 'Edit  expense' : 'Add  expense'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;