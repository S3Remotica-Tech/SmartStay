import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/Logo-Icon.png'
import Form from 'react-bootstrap/Form';
import '../Pages/Settings.css'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import CryptoJS from "crypto-js";

function InvoiceSettings() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

console.log("state for invoice settings",state)

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
        setStartNumber(e.target.value)
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
        });
    } else {
        Swal.fire({
            text: "Please provide the necessary information.",
            icon: "warning",
            timer: 2000,
        });
    }

    setShowTable(false);
    setSelectedHostel({ id: '', name: '' });
    setPrefix('');
    setStartNumber('');
    setSelectedImage('')
};









    const loginId = localStorage.getItem('loginId');


    useEffect(() => {
        if (state.InvoiceList?.invoiceSettingsStatusCode == 200) {
                   const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
          const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
          const parsedData = Number(decryptedIdString);
  
          dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
          
                setTimeout(() => {
                dispatch({ type: 'CLEAR_INVOICE_SETTINS_STATUSCODE' });
            }, 2000);
        }
    }, [state.InvoiceList?.invoiceSettingsStatusCode]);

   



    const [logo, setLogo] = useState('')


    console.log("logo for",logo)

    useEffect(() => {

                const filteredHostels = state.UsersList?.hostelList?.filter((item) => (
            item.id === Number(selectedHostel.id)
        ));
       
console.log("filteredHostels",filteredHostels)

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
        <div>
            <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600, }}>Invoice Settings</h4>
                    {/* <p className='mb-1'>Lorem Ipsum dolor sit amet consectetur</p> */}
                </div>
                <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={handleInvoiceSettings}  >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>

            </div>

            <hr></hr>
            <div className='row'>
                <div className='col-lg-6 col-12'>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: 14, fontWeight: 600, }}>Select Hostel</Form.Label>
                        <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, fontWeight: 600, backgroundColor: "#E6EDF5" }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            { state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </Form.Group>
                </div>
            </div>

            {showTable && <>
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
                                <th scope="col" style={{textAlign:'left'}}>Hostel Name</th>
                                <th scope="col" style={{textAlign:'left'}}>Prefix</th>
                                <th scope="col" style={{textAlign:'left'}}>Suffix</th>
                                <th scope="col" style={{textAlign:'left'}}>Preview</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td  style={{ fontSize: 14,textAlign:'left' }} >{selectedHostel.name}</td>
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

            </>}


        </div>
    )
}

export default InvoiceSettings