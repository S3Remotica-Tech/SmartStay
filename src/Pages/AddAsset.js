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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { MdError } from "react-icons/md";


function StaticExample({ show, handleClose, currentItem }) {

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
    const [id, setId] = useState('')
    const [productName, setProductName] = useState('')

    const [errors, setErrors] = useState({});
    const [initialState, setInitialState] = useState({
        assetName: '',
        vendorName: '',
        brandName: '',
        serialNumber: '',
        productCount: '',
        selectedDate: null,
        price: '',
        productName: '',
    });




    const [productNameError, setProductNameError] = useState('');
    const [serialNumberError, setSerialNumberError] = useState('');
    const [selectedDateError, setSelectedDateError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [isChangedError, setIsChangedError] = useState('');
    const [generalError, setGeneralError] = useState('');









    const handleAssetNameChange = (e) => {
        setGeneralError('')
        const value = e.target.value;

        dispatch({ type: 'CLEAR_SERIAL_NUMBER_ERROR'})
        setIsChangedError('')

        if (value === "") {
            setAssetName(value);
            setErrors(prevErrors => ({ ...prevErrors, assetName: "Asset name cannot be empty or spaces only" }));
            return;
        }

        if (value.trim() !== "") {
            setAssetName(value);
            setErrors(prevErrors => ({ ...prevErrors, assetName: "" }));
        }
    };


    const handleVendorNameChange = (e) => {
        setVendorName(e.target.value);
        setIsChangedError('')
        setGeneralError('')

    }

    const handleBrandNameChange = (e) => {
        const value = e.target.value;
        setIsChangedError('')
        setGeneralError('')

        if (value === "") {
            setBrandName(value);
            setErrors(prevErrors => ({ ...prevErrors, brandName: "Brand name cannot be empty or spaces only" }));
            return;
        }


        if (value.trim() !== "") {
            setBrandName(value);
            setErrors(prevErrors => ({ ...prevErrors, brandName: "" }));
        }
    };


    const handleSerialNumberChange = (e) => {
        const value = e.target.value;
        setSerialNumberError('');
        setIsChangedError('')
        setGeneralError('')
        if (value === "") {
            setSerialNumber(value);
            setErrors(prevErrors => ({ ...prevErrors, serial_Number: "Serial number cannot be empty or spaces only" }));
            return;
        }

        if (value.trim() !== "") {
            setSerialNumber(value);
            setErrors(prevErrors => ({ ...prevErrors, serial_Number: "" }));
        }
    };




    const handleProductCountChange = (e) => {
        setProductCount(e.target.value);
    }

    const handlePurchaseDateChange = (e) => {
        setPurchaseDate(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        setPriceError('');
        setIsChangedError('')
        setGeneralError('')


    }





    const handleProductNameChange = (e) => {
        const value = e.target.value;
        setGeneralError('')
        setProductNameError('')
        setIsChangedError('')

        if (value === "") {
            setProductName(value);
            setErrors(prevErrors => ({ ...prevErrors, productName: "Product name cannot be empty or spaces only" }));
            return;
        }


        if (value.trim() !== "") {
            setProductName(value);
            setErrors(prevErrors => ({ ...prevErrors, productName: "" }));
        }
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

    const cleanSerialNumber = (serialNumber) => {
        return serialNumber
          .trim()
          .replace(/[\t\n\r]+/g, ''); 
      };
      


    const handleAddAsset = () => {



        const cleanedSerialNumber = cleanSerialNumber(serialNumber);



        if( !productName && !serialNumber &&  !selectedDate && !price ){
            setGeneralError('Please enter all mandatory fields')
            return;
        }

        // if (!assetName) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Please Enter a Valid Asset Name',
        //     });
        //     return;
        // }
        if (!productName) {
            setProductNameError('Please Enter a Valid Product Name');

            return;
        }
        // if (!vendorName) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Please Enter a Valid Vendor Name',
        //     });
        //     return;
        // }

        // if (!brandName) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Please Enter a Valid Brand Name',
        //     });
        //     return;
        // }

        if (!cleanedSerialNumber) {
            setSerialNumberError('Please Enter a Valid Serial Number');
            return;
        }

        // if (!productCount || isNaN(productCount) || productCount <= 0) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Please Enter a Valid Product Count',
        //     });
        //     return;
        // }

        if (!selectedDate) {
            setSelectedDateError('Please Select a Valid Date');
            return;
        }

        if (!price || isNaN(price) || price <= 0) {
            setPriceError('Please Enter a Valid Price');
            return;
        }






        const isChanged = initialState.assetName !== assetName ||
            initialState.vendorName !== vendorName ||
            initialState.brandName !== brandName ||
            initialState.serialNumber !== serialNumber ||
            Number(initialState.productCount) !== Number(productCount) ||
            (initialState.selectedDate && selectedDate && initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
            Number(initialState.price) !== Number(price) ||
            initialState.productName !== productName

        console.log("isChanged", isChanged)


        if (!isChanged) {
            setIsChangedError('No changes detected. Please make some changes before saving.');
            return;
        }





        if (productName && serialNumber && selectedDate && price) {

            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

            dispatch({ type: 'ADDASSET', payload: { asset_name: assetName, product_name: productName, vendor_id: vendorName, brand_name: brandName, serial_number: serialNumber, product_count: 1, purchase_date: formattedDate, price: price, id: id } })



            // setAssetName('');
            // setVendorName('');
            // setBrandName('');
            // setSerialNumber('');
            // setProductCount('');
            // setPurchaseDate('');
            // setPrice('');
            // setTotalPrice('');



        } else {

        }
    }


    // useEffect(() => {
    //     if (currentItem) {
    //         setAssetName(currentItem.asset_name || '');
    //         setVendorName(currentItem.vendor_id || '');
    //         setBrandName(currentItem.brand_name || '');
    //         setSerialNumber(currentItem.serial_number || '');
    //         setProductCount(currentItem.product_count || '');
    //         setSelectedDate(moment(currentItem.purchase_date).toDate());
    //         setPrice(currentItem.price || '');
    //         setTotalPrice(currentItem.product_count * currentItem.price || '');
    //         setId(currentItem.id || 0)
    //         setProductName(currentItem.product_name || 0)
    //     }
    // }, [currentItem]);





    useEffect(() => {
        if (currentItem) {

            setAssetName(currentItem.asset_name || '');
            setVendorName(currentItem.vendor_id || '');
            setBrandName(currentItem.brand_name || '');
            setSerialNumber(currentItem.serial_number || '');
            setProductCount(currentItem.product_count || '');
            setSelectedDate(moment(currentItem.purchase_date).toDate());
            setPrice(currentItem.price || '');
            setTotalPrice(currentItem.product_count * currentItem.price || '');
            setId(currentItem.id || 0)
            setProductName(currentItem.product_name || 0)


            setInitialState({
                assetName: currentItem.asset_name || '',
                vendorName: currentItem.vendor_id || '',
                brandName: currentItem.brand_name || '',
                serialNumber: currentItem.serial_number || '',
                productCount: currentItem.product_count || '',
                selectedDate: currentItem.purchase_date ? moment(currentItem.purchase_date).toDate() : null,
                price: currentItem.price || '',
                productName: currentItem.product_name || '',
            })

        }
    }, [currentItem]);


    console.log("currentItem", currentItem)

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

    const formatDateForPayload = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split('T')[0];
    };


    const [formattedDate, setFormattedDate] = useState('')


    const handleDateChange = (selectedDates) => {
        setSelectedDateError('')
        setIsChangedError('')
        //    const date = selectedDates[0];
        // const formatedDate = formatDateForPayload(date);
        setSelectedDate(selectedDates[0]);

    };
    console.log("selectedDate", selectedDate, formattedDate)








    useEffect(() => {
        if (state.AssetList.addAssetStatusCode == 200) {

            setAssetName('');
            setVendorName('');
            setBrandName('');
            setSerialNumber('');
            setProductCount('');
            setPurchaseDate('');
            setPrice('');
            setTotalPrice('');
            handleClose()



        }

    }, [state.AssetList.addAssetStatusCode])





















    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial',
            }}
        >
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem ? 'Edit an asset' : 'Add an asset'}</Modal.Title>
                    </Modal.Header>

                    {isChangedError && (
                        <div className="d-flex align-items-center p-1 mt-4">
                            <MdError style={{ color: "red", marginRight: '5px' }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                {isChangedError}
                            </label>
                        </div>
                    )}
 {generalError && (
    <div className="d-flex align-items-center p-1 mb-2 mt-2">
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
            {generalError}
        </label>
    </div>
)}
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Asset Name <span style={{ color: 'transparent', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Control
                                        value={assetName}
                                        onChange={handleAssetNameChange}
                                        type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: assetName ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Product Name <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Control
                                        value={productName}
                                        onChange={handleProductNameChange}
                                        type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: productName ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>



                                {productNameError && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {productNameError}
                                        </label>
                                    </div>
                                )}


                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Vendor Name</Form.Label>
                                    <Form.Select aria-label="Default select example" value={vendorName} onChange={handleVendorNameChange} className='' id="vendor-select" style={{ fontWeight: vendorName ? 600 : 500 }}>
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
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Brand Name  <span style={{ color: 'white', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Control
                                        value={brandName}
                                        onChange={handleBrandNameChange}
                                        type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: brandName ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Serial Number <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Control
                                        value={serialNumber}
                                        onChange={handleSerialNumberChange}
                                        type="text" placeholder="Enter number" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: serialNumber ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>


                                {serialNumberError && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {serialNumberError}
                                        </label>
                                    </div>
                                )}



{state.AssetList?.alreadySerialNumberHere && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {state.AssetList?.alreadySerialNumberHere}
                                        </label>
                                    </div>
                                )}


                            </div>

                            {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Product Count</Form.Label>
                                    <Form.Control
                                        value={productCount}
                                        onChange={handleProductCountChange}
                                        type="text" placeholder="Enter count" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: productCount ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div> */}



                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Purchase Date <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
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
                                            style={{
                                                padding: 15,
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

                                {selectedDateError && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {selectedDateError}
                                        </label>
                                    </div>
                                )}

                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Price <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: price ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>
                                {priceError && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {priceError}
                                        </label>
                                    </div>
                                )}
                            </div>
                            {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Total Price</Form.Label>
                                    <Form.Control
                                        value={productCount * price}
                                        readOnly
                                        type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 600, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div> */}
                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button onClick={handleAddAsset} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }} >
                            {currentItem ? 'Save' : 'Add  asset'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;