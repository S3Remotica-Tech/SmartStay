import React from 'react'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./Amenities.css";

function UserSettings() {






    return (

        <>

            <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
                <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>
                  
                    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12' style={{ border: '1px solid #ced4da', padding: '30px', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                      
                        <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                                 User
                            </Form.Label>
                            <Form.Select aria-label="Default select example"
                                className='border' style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>
                                <option>Select a user</option>
                                <option>Annai</option>
                                <option>suresh</option>
                            </Form.Select>
                        </Form.Group>
                            </div>


                            <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                                 Permission
                            </Form.Label>
                            <Form.Select aria-label="Default select example"
                                className='border' style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>
                               <option>Select a permission</option>
                                <option>Admin</option>
                                <option>Agent</option>
                            </Form.Select>
                        </Form.Group>
                            </div>



                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Button className='col-lg-11 col-md-12 col-sm-12 col-xs-12' style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12 }}>
                                Save </Button>
                        </div>

                    </div>
                </div>

                <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} />

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0">
                    <Table className="ebtable mt-3" responsive  >
                        <thead style={{ backgroundColor: "#E7F1FF" }}>
                            <tr>

                                <th className='ps-1 ps-lg-5' style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>users</th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Permission</th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Member since </th>
                                <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>

                            </tr>
                        </thead>
                        <tbody style={{ height: "50px", fontSize: "11px" }}>



                                <tr style={{ lineHeight: "40px" }}>
                                    <td className='ps-1 ps-lg-5' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>umesh yadav</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>Admin</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>July 2024</td>
                                    <td>
                                        <div>
                                            <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} >
                                                <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                                            </div>
                                        </div></td>
                                </tr>
                          
                           


                        </tbody>
                    </Table>



                 

                </div>
            </div>



        </>
    )
}

export default UserSettings;