
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './UserlistWalkin.css';
import minus from '../Assets/Images/New_images/minus-square.png';
import Ellipse1 from '../Assets/Images/Ellipse 1.png';
import Ellipse2 from '../Assets/Images/Group 1 (2).png';
import Ellipse3 from '../Assets/Images/Ellipse 1 (1).png';
import Ellipse4 from '../Assets/Images/Group 1 (1).png';
import Ellipse5 from '../Assets/Images/Group 1.png';
import Ellipse6 from '../Assets/Images/New_images/Ellipse 1.png';
import Ellipse7 from '../Assets/Images/Ellipse 1 (5).png';
import Ellipse8 from '../Assets/Images/Ellipse 1 (6).png';
import Ellipse9 from '../Assets/Images/Ellipse 1 (7).png';
import Ellipse10 from '../Assets/Images/Ellipse 1 (8).png';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/New_images/edit.png';
import CustomerForm from './UserlistWalkinForm'; // Import CustomerForm
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const initialCustomers = [
    { id: 1, name: "Kellie Turcotte", email: "kellie@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", Comments: "smartstay", avatar: Ellipse1 },
    { id: 2, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse2, Comments: "smartstay" },
    { id: 3, name: "Esther Williamson", email: "esther@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse3, Comments: "smartstay" },
    { id: 4, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse4, Comments: "smartstay" },
    { id: 5, name: "Sabrina Gleason", email: "sabrina@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse5, Comments: "smartstay" },
    { id: 6, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse6, Comments: "smartstay" },
    { id: 7, name: "Homer Renner", email: "homer@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse7, Comments: "smartstay" },
    { id: 8, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse8, Comments: "smartstay" },
    { id: 9, name: "Emmett Cormier III", email: "emmett@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse9, Comments: "smartstay" },
    { id: 10, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse10, Comments: "smartstay" },
];

function UserlistWalkin() {
    const [customers, setCustomers] = useState(initialCustomers); // Manage customers with state
    const [showForm, setShowForm] = useState(false);
    const [dotsButton, setDotsButton] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const popupRef = useRef(null);

    const handleDotsClick = (id) => {
        setDotsButton(prevId => (prevId === id ? null : id));
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);
        setDotsButton(null);
    };

    const handleDelete = (customer) => {
        // Ask for confirmation before deletion
        const confirmDelete = window.confirm(`Are you sure you want to delete ${customer.name}?`);
        if (confirmDelete) {
            // Remove customer from the list
            setCustomers(customers.filter((item) => item.id !== customer.id));
            toast.success(`${customer.name} has been deleted successfully!`);
        }
        setDotsButton(null);
    };


    const handleFormClose = () => {
        setShowForm(false);
        setSelectedCustomer(null);
        setModalType(null);
    };

    // const handleFormSubmit = () => {
        
    // }



    return (
        <>
            <Container>
                <div>
                    <Table className="table" responsive>
                        <thead style={{ border: "none" }}>
                            <tr>
                                <th style={headerStyle}>
                                    <img src={minus} height={20} width={20} alt="minus icon" />
                                </th>
                                <th style={headerStyle}>Name</th>
                                <th style={headerStyle}>Email ID</th>
                                <th style={headerStyle}>Mobile no</th>
                                <th style={headerStyle}>Walkin date</th>
                                <th style={headerStyle}>Comments</th>
                                <th style={headerStyle}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="customer-row">
                                    <td style={cellStyle}>
                                        <img src={minus} height={20} width={20} alt="minus icon" />
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" />
                                            <span style={nameStyle} className="ms-2 customer-name">
                                                {customer.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={dataStyle}>{customer.email}</td>
                                    <td style={dataStyle}>{customer.mobile}</td>
                                    <td style={dateStyle}>
                                        <span style={dateBadgeStyle}>
                                            {customer.walkInDate}
                                        </span>
                                    </td>
                                    <td style={dataStyle}>{customer.Comments}</td>
                                    <td>

                                       

                                        <div
                                            style={dotsStyle(dotsButton === customer.id)}
                                            onClick={() => handleDotsClick(customer.id)}
                                        >
                                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                            {dotsButton === customer.id && (
                                                <div
                                                    ref={popupRef}
                                                    style={popupStyle}
                                                >
                                                    <div
                                                        className="mb-2 d-flex align-items-center"
                                                        onClick={() => handleEdit(customer)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <img src={Edit} style={iconStyle} alt="Edit icon" />
                                                        <label style={editLabelStyle}>
                                                            Edit
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="d-flex align-items-center"
                                                        onClick={() => handleDelete(customer)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <img src={Delete} style={iconStyle} alt="Delete icon" />
                                                        <label style={deleteLabelStyle}>
                                                            Delete
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <CustomerForm
                show={showForm}
                handleClose={handleFormClose}
                // onSubmit={handleFormSubmit}
                initialData={selectedCustomer}
                modalType={modalType}
            />

            {/* Toast Notifications */}
            <ToastContainer />
        </>
    );
}

// Styles (for cleaner code)
const headerStyle = {
    textAlign: "start",
    padding: "10px",
    color: "#4B4B4B",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Gilroy",
    background: "#E7F1FF",
    border: "none"
};

const cellStyle = {
    textAlign: "center",
    padding: "10px",
    border: "none"
};

const nameStyle = {
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Gilroy",
    color: "#222222",
    paddingLeft: "4px"
};

const dataStyle = {
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Gilroy",
    color: "#000000",
    textAlign: "start"
};

const dateStyle = {
    padding: "10px",
    border: "none",
    textAlign: "start",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Gilroy"
};

const dateBadgeStyle = {
    padding: "3px 10px",
    borderRadius: "60px",
    backgroundColor: "#EBEBEB",
    textAlign: "start",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Gilroy"
};

const dotsStyle = (isActive) => ({
    cursor: "pointer",
    height: 40,
    width: 40,
    borderRadius: "50%",
    border: "1px solid #EFEFEF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: isActive ? 1000 : 'auto'
});

const popupStyle = {
    cursor: "pointer",
    backgroundColor: "#fff",
    position: "absolute",
    right: 0,
    top: 50,
    width: 163,
    height: 92,
    border: "1px solid #EBEBEB",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
};

const iconStyle = {
    height: 16,
    width: 16,
    marginRight: "8px"
};

const editLabelStyle = {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Gilroy",
    color: "#222222"
};

const deleteLabelStyle = {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Gilroy",
    color: "#FF0000"
};

export default UserlistWalkin;








