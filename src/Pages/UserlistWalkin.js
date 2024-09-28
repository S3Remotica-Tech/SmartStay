import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './UserlistWalkin.css';
import minus from '../Photos/minus-square.png'
import Ellipse1 from '../Photos/Ellipse 1.png'
import Ellipse2 from '../Photos/Ellipse 2.png'
import Ellipse3 from '../Photos/Ellipse 3.png'
import Ellipse4 from '../Photos/Ellipse 4.png'
import Ellipse5 from '../Photos/Ellipse 5.png'
import Ellipse6 from '../Photos/Ellipse 6.png'
import Ellipse7 from '../Photos/Ellipse 7.png'
import Ellipse8 from '../Photos/Ellipse 8.png'
import Ellipse9 from '../Photos/Ellipse 9.png'
import Ellipse10 from '../Photos/Ellipse 10.png'
import Group from '../Photos/Group .png'
import Search from '../Photos/Search.png'
import Filters from  '../Photos/Filters .png'
import UserlistWalkinForm from './UserlistWalkinForm'


const customers = [
    { id: 1, name: "Kellie Turcotte", email: "kellie@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse1 },
    { id: 2, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse2 },
    { id: 3, name: "Esther Williamson", email: "esther@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse3 },
    { id: 4, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse4 },
    { id: 5, name: "Sabrina Gleason", email: "sabrina@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse5 },
    { id: 6, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse6 },
    { id: 7, name: "Homer Renner", email: "homer@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse7 },
    { id: 8, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse8 },
    { id: 9, name: "Emmett Cormier III", email: "emmett@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse9 },
    { id: 10, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", avatar: Ellipse10 },
];

function UserlistWalkin() {

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const closeModal = () => {
        setShowForm(false);
    };

    return (
        <Container>
            <div>
                <div className="customer p-4" >



                    <div class="d-flex justify-content-end">
                        <div class="p-2 ">
                            <Image src={Search} roundedCircle style={{ height: "30px", width: "30px", marginTop: "12px" }} />
                        </div>
                        <div class="p-2 ">
                            <Image src={Filters} roundedCircle style={{ height: "30px", width: "30px", marginTop: "12px" }} />
                        </div>
                        <div class="p-2 ">
                            <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Montserrat" }} onClick={toggleForm}> + Add Walk-in</Button>
                        </div>
                    </div>
                </div>

                <UserlistWalkinForm show={showForm} handleClose={closeModal} />

                <Table className="table" responsive>
                    <thead style={{ border: "none" }}>
                        <tr>
                            <th style={{ textAlign: "center", padding: "10px", background: "#E7F1FF", border: "none" }}>
                                <img src={minus} height={20} width={20} alt="minus icon" />
                            </th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Name</th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Email ID</th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Mobile no</th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Booking date</th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Joining date</th>
                            <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="customer-row">
                                <td><img src={minus} height={20} width={20} alt="minus icon" /></td>
                                <td style={{ textAlign: "start" }}>
                                    <img src={customer.avatar} height={20} width={20} alt="avatar" />
                                    <span style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy", color: "#222222", paddingLeft: "4px" }}>{customer.name}</span>
                                </td>
                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", color: "#000000", textAlign: "start" }}>{customer.email}</td>
                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", color: "#000000", textAlign: "start" }}>{customer.mobile}</td>

                                <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>
                                    <span style={{ paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "60px", backgroundColor: "#EBEBEB", textAlign: "start", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}> {customer.bookingDate}</span>
                                </td>

                                <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>
                                    <span style={{ paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "60px", backgroundColor: "#EBEBEB", textAlign: "start", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>   {customer.joiningDate}</span>
                                </td>

                                <td><img src={Group} height={30} width={30} alt="options" /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default UserlistWalkin;




