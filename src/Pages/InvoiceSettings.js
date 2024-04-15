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
    console.log("state for invoice", state)



    const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
    const [showTable, setShowTable] = useState(false)

    useEffect(() => {
        dispatch({ type: 'HOSTELLIST' })
    }, [])


    const handleHostelChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        console.log("selectedIndex", selectedIndex)
        setShowTable(true)
        setSelectedHostel({
            id: e.target.value,
            name: e.target.options[selectedIndex].text
        });
    };

    console.log("selectedHostel", selectedHostel)


    const [selectedImage, setSelectedImage] = useState(null);


    console.log("selectedImage size", selectedImage)

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
        console.log("e.target.value", e.target.value)
        setPrefix(e.target.value)
    }

    const handleStartingNumber = (e) => {
        setStartNumber(e.target.value)
    }

    const handleInvoiceSettings = () => {
        if (selectedImage) {
            dispatch({ type: 'INVOICESETTINGS', payload: { hostel_Id: selectedHostel.id, prefix: prefix, suffix: startNumber, profile: selectedImage } })
        } else {
            dispatch({ type: 'INVOICESETTINGS', payload: { hostel_Id: selectedHostel.id, prefix: prefix, suffix: startNumber } })
        }
        setShowTable(false)
        setSelectedHostel({
            id: '', name: ''
        })
        setPrefix('')
        setStartNumber('')
        dispatch({ type: 'HOSTELLIST' });

    }

    // useEffect(() => {
    //     if (state.InvoiceList?.statusCode === 200) {
    //         dispatch({ type: 'HOSTELLIST' });
    //             setTimeout(() => {
    //             dispatch({ type: 'CLEAR_INVOICE_SETTINS_STATUSCODE' });
    //         }, 200);
    //     }
    // }, [state.InvoiceList?.statusCode]);

    useEffect(() => {
        if (selectedHostel) {
            dispatch({ type: 'HOSTELLIST' });
               
        }
    }, [selectedHostel]);



    const [logo, setLogo] = useState('')

    useEffect(() => {
        const filteredHostels = state.UsersList?.hostelList?.filter((item) => (
            item.id === Number(selectedHostel.id)
        ));
       
        if (filteredHostels.length > 0) {
            const profileURL = filteredHostels[0]?.profile;
            console.log("profileURL", profileURL)
           
            setLogo(profileURL);
        } else {

            setLogo(Logo);
        }
    }, [selectedHostel, state.UsersList?.hostelList]);


    console.log("logo state", logo)


    const LoginId = localStorage.getItem("loginId")
    console.log("LoginId",LoginId)


    const [filteredHostelList, setFilteredHostelList] = useState([]);

useEffect(() => {
    if (LoginId) {
        try {
            const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
            const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
            const parsedData = decryptedString;
            console.log("parsedData", parsedData);

            const filteredList = state.UsersList?.hostelList?.filter((view) => {
                console.log("created_By:", view.created_By); 
                console.log("parsedData:", parsedData); 
                return view.created_By == parsedData;
            });
            console.log("filteredDataforLoginID", filteredList);
            setFilteredHostelList(filteredList);

        } catch (error) {
            console.error('Error decrypting LoginId:', error);
        }
    }
}, [LoginId,state.UsersList?.hostelList ]);
    
console.log("UsersList:", state.UsersList?.hostelList);



    return (
        <div>
            <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600, }}>Invoice Settings</h4>
                    <p className='mb-1'>Lorem Ipsum dolor sit amet consectetur</p>
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
                            { filteredHostelList && filteredHostelList.map((item) => (
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
                                <th scope="col">Hostel Name</th>
                                <th scope="col">Prefix</th>
                                <th scope="col">Suffix</th>
                                <th scope="col">Preview</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className='text-center' style={{ fontSize: 14 }} >{selectedHostel.name}</td>
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