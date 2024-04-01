import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/menu.jpeg'
import Form from 'react-bootstrap/Form';
import '../Pages/Settings.css'


function InvoiceSettings() {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
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
    return (
        <div>
            <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600, }}>Invoice Settings</h4>
                    <p className='mb-1'>Lorem Ipsum dolor sit amet consectetur</p>
                </div>
                <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>

            </div>

            <hr></hr>
            <h4 style={{ fontSize: 16, fontWeight: 600, }}>Upload Logo</h4>
            <div className='d-flex justify-content-start gap-3 align-items-center mt-3'>
                <div style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5 }}>
                <Image src={selectedImage ? URL.createObjectURL(selectedImage) : Logo} roundedCircle
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: '50%',
                       
                    }} />

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
                            <th scope="col">Starting Number</th>
                            <th scope="col">Preview</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td className='text-center' style={{ fontSize: 14 }} >Royal Grand</td>
                            <td ><div className='d-flex justify-content-center align-items-center'>
                                <Form.Control
                                    placeholder="RG-"
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
                            <td ><div className='d-flex justify-content-center align-items-center'>
                                <Form.Control
                                    placeholder="0001"
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
                            <td className='text-center' style={{ fontSize: 14 }}>{prefix}{startNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>




        </div>
    )
}

export default InvoiceSettings