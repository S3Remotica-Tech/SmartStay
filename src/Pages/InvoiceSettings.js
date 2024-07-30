import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Dropdown, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/Logo-Icon.png'
import Form from 'react-bootstrap/Form';
import '../Pages/Settings.css'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import dottt from "../Assets/Images/Group 14.png"
import CryptoJS from "crypto-js";

function InvoiceSettings() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    console.log("state for invoice settings", state)

    const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
    const [showTable, setShowTable] = useState(false)

    // useEffect(() => {
    //     dispatch({ type: 'HOSTELLIST' })
    // }, [])


    const handleHostelChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setShowTable(true)
        setSelectedHostel({
            id: e.target.value,
            name: e.target.options[selectedIndex].text
        });
    };



    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(file, options);
            setSelectedImage(compressedFile);
        } catch (error) {
            console.error('Image compression error:', error);
        }
    };

    const [prefix, setPrefix] = useState("")
    const [startNumber, setStartNumber] = useState('')

    const handlePrefix = (e) => {
        setPrefix(e.target.value)
    }

    const handleStartingNumber = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setStartNumber(value);
        }
    }


    const handleInvoiceSettings = () => {
        const isPrefixValid = prefix !== undefined && prefix !== null && prefix !== '';
        const isStartNumberValid = startNumber !== undefined && startNumber !== null && startNumber !== '';
        const isSelectedImageValid = selectedImage !== undefined && selectedImage !== null;

        console.log("isPrefixValid:", isPrefixValid);
        console.log("isStartNumberValid:", isStartNumberValid);
        console.log("isSelectedImageValid:", isSelectedImageValid);

        if (isPrefixValid && isStartNumberValid && isSelectedImageValid) {
            dispatch({
                type: 'INVOICESETTINGS',
                payload: {
                    hostel_Id: selectedHostel.id,
                    prefix: prefix,
                    suffix: startNumber,
                    profile: selectedImage
                }
            });
            Swal.fire({
                text: "Prefix, Suffix, Profile Update successfully",
                icon: "success",
                timer: 1000,
            }).then(() => {
                setShowTable(false);
                setSelectedHostel({ id: '', name: '' });
                setPrefix('');
                setStartNumber('');
                setSelectedImage('');
            });
        } else if (!isPrefixValid && !isStartNumberValid && isSelectedImageValid) {
            dispatch({
                type: 'INVOICESETTINGS',
                payload: {
                    hostel_Id: selectedHostel.id,
                    profile: selectedImage
                }
            });
            Swal.fire({
                text: "Profile Update successfully",
                icon: "success",
                timer: 1000,
            }).then(() => {
                setShowTable(false);
                setSelectedHostel({ id: '', name: '' });
                setPrefix('');
                setStartNumber('');
                setSelectedImage('');
            });
        } else if (isPrefixValid && isStartNumberValid && !isSelectedImageValid) {
            dispatch({
                type: 'INVOICESETTINGS',
                payload: {
                    hostel_Id: selectedHostel.id,
                    prefix: prefix,
                    suffix: startNumber
                }
            });
            Swal.fire({
                text: "Prefix, Suffix Update successfully",
                icon: "success",
                timer: 1000,
            }).then(() => {
                setShowTable(false);
                setSelectedHostel({ id: '', name: '' });
                setPrefix('');
                setStartNumber('');
                setSelectedImage('');
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: 'Please Enter All Field',
                confirmButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });
        }
    };










    const loginId = localStorage.getItem('loginId');


    // console.log("state.InvoiceList?.invoiceSettingsStatusCode == 200", state.InvoiceList?.invoiceSettingsStatusCode === 200)
    useEffect(() => {
        dispatch({ type: 'HOSTELLIST' })
    }, [])


    useEffect(() => {
        if (state.InvoiceList?.invoiceSettingsStatusCode == 200) {
            console.log("executed hostel list")

            dispatch({ type: 'HOSTELLIST' })

            setTimeout(() => {
                dispatch({ type: 'CLEAR_INVOICE_SETTINS_STATUSCODE' });
            }, 2000);
        }
    }, [state.InvoiceList?.invoiceSettingsStatusCode]);





    const [logo, setLogo] = useState('')


    console.log("logo for", logo)

    useEffect(() => {

        const filteredHostels = state.UsersList?.hostelList?.filter((item) => (
            item.id === Number(selectedHostel.id)
        ));

        console.log("filteredHostels", filteredHostels)

        if (filteredHostels.length > 0) {
            const profileURL = filteredHostels[0]?.profile;
            setLogo(profileURL);
        } else {

            setLogo(Logo);
        }
    }, [selectedHostel]);




    // const loginId = localStorage.getItem('loginId');

    // useEffect(() => {
    //   if (loginId) {
    //     try {
    //       const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
    //       const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
    //       console.log('Decrypted Login Id:', decryptedIdString);
    //       const parsedData = Number(decryptedIdString);

    //       dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })

    //     } catch (error) {
    //       console.error('Error decrypting loginId:', error);
    //     }
    //   }
    // }, []);



    return (
        <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
            <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>

                <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                            Select Hostel
                        </Form.Label>
                        <Form.Select aria-label="Default select example"
                            className='border' value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </Form.Group>

                </div>



                <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12 ps-4' style={{ border: '1px solid #ced4da', borderRadius: '20px' }}>
                    {/* <div className='d-flex row'> */}

                    <div className='d-flex justify-content-start gap-3 align-items-center '>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5, marginBottom: '20px' }}>


                            <Image
                                src={selectedImage ? URL.createObjectURL(selectedImage) : logo == null ? Logo : logo}
                                roundedCircle
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: '50%',
                                }}
                            />
                            <div style={{ marginLeft: '30px', marginTop: '10px' }}>
                                <h2 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>PG Logo</h2>
                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} id="upload-photo" />
                                <p onClick={() => document.getElementById('upload-photo').click()} style={{ fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600, color: "#1E45E1", fontStyle: 'normal', lineHeight: 'normal' }}>Update image</p>

                            </div>
                        </div>
                    </div>

                    <div className='d-flex row '>
                        <div className='col-lg-5 col-md-5 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label
                                    style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                                >
                                    Prefix
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px' }}
                                    type="text"
                                    placeholder="prefix"
                                    value={prefix}
                                    onChange={(e) => handlePrefix(e)}
                                // readOnly
                                // style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className='col-lg-5 col-md-5 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                                >
                                    Suffix
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px', fontSize: 14 }}
                                    type="text"
                                    placeholder="suffix"
                                    value={startNumber}
                                    onChange={(e) => handleStartingNumber(e)}
                                // readOnly
                                />
                            </Form.Group>
                        </div>
                    </div>
                    {/* </div> */}

                    <div className='col-lg-10 col-md-10 col-sm-11 col-xs-11'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                            // style={labelStyle}
                            >
                                Preview
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '10px', marginTop: '10px', fontSize: 14, backgroundColor: "#E7F1FF" }}
                                type="text"
                                placeholder="preview"
                                disabled
                                value={prefix + startNumber}
                            // readOnly
                            />
                        </Form.Group>
                    </div>
                    <div style={{ marginTop: '20px' }} className='col-lg-12 col-md-10 col-sm-12 col-xs-12' >

                        <Button className='col-lg-10 col-md-10 col-sm-11 col-xs-9 mb-2 me-sm-2' onClick={handleInvoiceSettings} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", letterSpacing: 1, borderRadius: 12, padding: "10px" }}> Save </Button>


                        <Button className='col-lg-10 col-md-10 col-sm-11 col-xs-9 mb-2' style={{ fontFamily: 'Montserrat', fontSize: 16, backgroundColor: "#FFFFFF", color: "red", border: '1px solid red ', fontWeight: 500, letterSpacing: 1, borderRadius: 12, padding: "10px" }}> Delete</Button>

                    </div>

                </div>
            </div>

            <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} />
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0">
                <Table className="ebtable mt-3" responsive  >
                    <thead style={{ backgroundColor: "#E7F1FF" }}>
                        <tr>

                            <th style={{ color: '#222', paddingLeft: "40px", fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Paying guest</th>
                            <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Prefix</th>
                            <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>suffix </th>
                            <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>
                            {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Dated</th> */}

                        </tr>
                    </thead>
                    <tbody style={{ height: "50px", fontSize: "11px" }}>
                        {state?.UsersList?.hostelList && state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((invoice) => (
                            <tr style={{ lineHeight: "40px" }} key={invoice.id}> {/* Assuming `invoice.id` is a unique identifier */}
                                <td style={{ paddingLeft: "40px", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>
                                    {(invoice.prefix !== null && invoice.suffix !== null) ? invoice.Name : ''}
                                </td>
                                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{invoice.prefix}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{invoice.suffix}</td>
                                {(invoice.prefix !== null && invoice.suffix !== null) && (
                                    <td><img src={dottt} style={{ height: 30, width: 30 }} /></td>
                                )}
                            </tr>
                        ))}


                        {state.UsersList.hostelList.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", color: "red", fontSize: 14 }}>No data found</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>


            {/* <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600, }}>Invoice Settings</h4>
                </div>
                <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={handleInvoiceSettings}  >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>

            </div> */}

            {/* <hr></hr>
            <div className='row'>
                <div className='col-lg-6 col-12'>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: 14, fontWeight: 600, }}>Select Hostel</Form.Label>
                        <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, fontWeight: 600, backgroundColor: "#E6EDF5" }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </Form.Group>
                </div>
            </div> */}

            {/* {showTable && <>
                <h4 style={{ fontSize: 16, fontWeight: 600, }}>Upload Logo</h4>
                <div className='d-flex justify-content-start gap-3 align-items-center mt-3'>
                    <div style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5 }}>


                        <Image
                            src={selectedImage ? URL.createObjectURL(selectedImage) : logo == null ? Logo : logo}
                            roundedCircle
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: '50%',
                            }}
                        />



                    </div>
                    <button type="button" className="mb-2 upload-button" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={() => document.getElementById('upload-photo').click()}>Change Photo</button>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} id="upload-photo" />
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Delete</button>

                </div>
                <div class="table-responsive mt-4" style={{ width: "100%" }}>
                    <table class="table text-center" >
                        <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                            <tr >
                                <th scope="col" style={{ textAlign: 'left' }}>Hostel Name</th>
                                <th scope="col" style={{ textAlign: 'left' }}>Prefix</th>
                                <th scope="col" style={{ textAlign: 'left' }}>Suffix</th>
                                <th scope="col" style={{ textAlign: 'left' }}>Preview</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td style={{ fontSize: 14, textAlign: 'left' }} >{selectedHostel.name}</td>
                                <td style={{ width: "20%" }}><div className='d-flex justify-content-center align-items-center'>
                                    <Form.Control
                                        placeholder="Ex:RG"
                                        aria-label="Recipient's username"
                                        className='custom-input'
                                        aria-describedby="basic-addon2"
                                        autoFocus
                                        value={prefix}
                                        onChange={(e) => handlePrefix(e)}
                                        style={{
                                            border: "1px solid lightgray",
                                            fontSize: 12,
                                            fontWeight: "530",
                                            opacity: 1,
                                            borderRadius: "4px",
                                            color: "gray",
                                            '::placeholder': { color: "gray", fontSize: 12 }
                                        }}

                                    />
                                </div></td>
                                <td style={{ width: "20%" }}><div className='d-flex justify-content-center align-items-center'>
                                    <Form.Control
                                        placeholder="Ex:0001"
                                        aria-label="Recipient's username"
                                        className='border custom-input'
                                        aria-describedby="basic-addon2"
                                        value={startNumber}
                                        onChange={(e) => handleStartingNumber(e)}
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "530",
                                            opacity: 1,
                                            borderRadius: "4px",
                                            color: "gray",
                                            '::placeholder': { color: "gray", fontSize: 12 }
                                        }}

                                    />


                                </div></td>
                                <td className='text-center' style={{ fontSize: 12, color: "gray" }}>{prefix}{startNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </>} */}


        </div>
    )
}

export default InvoiceSettings