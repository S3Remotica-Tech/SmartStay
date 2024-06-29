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



function StaticExample({ show, handleClose }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state", state)




    const [assetName, setAssetName] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [productCount, setProductCount] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [price, setPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');


    console.log("vendorName",vendorName)


    const handleAssetNameChange = (e) => {
        setAssetName(e.target.value);
    }

    const handleVendorNameChange = (e) => {
        setVendorName(e.target.value);

    }

    const handleBrandNameChange = (e) => {
        setBrandName(e.target.value);
    }

    const handleSerialNumberChange = (e) => {
        setSerialNumber(e.target.value);
    }



    const handleProductCountChange = (e) => {
        setProductCount(e.target.value);
    }

    const handlePurchaseDateChange = (e) => {
        setPurchaseDate(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);


    }

    // const handleTotalPriceChange = () => {
    //     

    // }



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


    const handleAddAsset = () => {
        if(assetName && vendorName && brandName && serialNumber &&  productCount && purchaseDate && price ){
            dispatch({ type: 'ADDASSET', payload: { asset_name: assetName, vendor_id: vendorName, brand_name: brandName, serial_number: serialNumber, product_count: productCount, purchase_date: purchaseDate, price: price } })


handleClose()
setAssetName('');
setVendorName('');
setBrandName('');
setSerialNumber('');
setProductCount('');
setPurchaseDate('');
setPrice('');
setTotalPrice('');



        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter All Fields',
                timer: 1000
              });
        }
    }



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
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add an asset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:20}}>


                        <div className='row mt-1'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight:600 }}>Asset Name</Form.Label>
                                    <Form.Control
                                        value={assetName}
                                        onChange={handleAssetNameChange}
                                        type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Vendor Name</Form.Label>
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
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Brand Name</Form.Label>
                                    <Form.Control
                                        value={brandName}
                                        onChange={handleBrandNameChange}
                                        type="text" placeholder="Enter Name" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Serial Number</Form.Label>
                                    <Form.Control
                                        value={serialNumber}
                                        onChange={handleSerialNumberChange}
                                        type="email" placeholder="Enter Number" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Product Count</Form.Label>
                                    <Form.Control
                                        value={productCount}
                                        onChange={handleProductCountChange}
                                        type="email" placeholder="Enter Count" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>



                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Purchase Date</Form.Label>
                                    <Form.Control
                                        value={purchaseDate}
                                        onChange={handlePurchaseDateChange}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight:600 }}>Price</Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="text" placeholder="Enter Amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Total Price</Form.Label>
                                    <Form.Control
                                        value={productCount * price}
                                        readOnly
                                        type="text" placeholder="Enter Amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button onClick={handleAddAsset} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }} >
                            Add  asset
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;