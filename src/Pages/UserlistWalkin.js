import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Modal, Button, Pagination } from 'react-bootstrap';
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
import Edit from '../Assets/Images/Edit-Linear-32px.png';
import CustomerForm from './UserlistWalkinForm';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import 'react-toastify/dist/ReactToastify.css';
import { color } from '@mui/system';
import Emptystate from '../Assets/Images/Empty-State.jpg'
import UserlistWalkinForm from './UserlistWalkinForm'

const initialCustomers = [
    { id: 1, name: "Kellie Turcotte", email: "kellie@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", comments: "smartstay", avatar: Ellipse1 },
    { id: 2, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse2, comments: "smartstay" },
    { id: 3, name: "Esther Williamson", email: "esther@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse3, comments: "smartstay" },
    { id: 4, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse4, comments: "smartstay" },
    { id: 5, name: "Sabrina Gleason", email: "sabrina@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse5, comments: "smartstay" },
    { id: 6, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse6, comments: "smartstay" },
    { id: 7, name: "Homer Renner", email: "homer@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse7, comments: "smartstay" },
    { id: 8, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse8, comments: "smartstay" },
    { id: 9, name: "Emmett Cormier III", email: "emmett@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse9, comments: "smartstay" },
    { id: 10, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", walkInDate: "20 Mar 2024", avatar: Ellipse10, comments: "smartstay" },
];

function UserlistWalkin() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [showForm, setShowForm] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [dotsButton, setDotsButton] = useState(null);

    const popupRef = useRef(null);
    const itemsPerPage = 5;
    // delete

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);


    const handleDotsClick = (id) => {
        setDotsButton(prevId => (prevId === id ? null : id));
    };

    const handleDelete = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
        setDotsButton(null);
    };


    const confirmDelete = () => {
        if (customerToDelete) {
            setCustomers(customers.filter((item) => item.id !== customerToDelete.id));
            toast.success('Deleted successfully!');
            setShowDeleteModal(false);
            setCustomerToDelete(null);
        }
    };


    const cancelDelete = () => {
        setShowDeleteModal(false);
        setCustomerToDelete(null);
    };



    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);
        setDotsButton(null);
        setModalType("edit");
    };



    const handleFormClose = () => {
        setShowForm(false);
        setSelectedCustomer(null);
        setModalType(null);
    };

    const handleFormSubmit = (data) => {
        if (modalType === "edit") {

            setCustomers(customers.map((customer) =>
                customer.id === data.id ? { ...customer, ...data } : customer
            ));

            toast.success('Changes saved successfully!');
        } else {

            const newCustomer = {
                ...data,
                id: customers.length + 1,
                avatar: Ellipse1
            };
            setCustomers([...customers, newCustomer]);
            // toast.success);
            toast.success('Walk-in added successfully!!');
        }
        handleFormClose();
        setDotsButton(null);
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setDotsButton(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);



    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(customers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [customers, currentPage, totalPages]);


    const handleShowWalk = () => {
        setModalType("add");
        setShowForm(true);
        setSelectedCustomer(null);
    }


    return (
        <>

            <div style={{marginLeft:"-20px"}}>
                {customers.length > 0 ? (
                    <div className=' walkin_table_custom'>
                        <Table responsive="md" className="table_walkin">
                            <thead style={{ border: "none" }}>
                                <tr>
                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none",
                                        borderTopLeftRadius: "24px"
                                    }}>
                                        <img src={minus} height={20} width={20} alt="minus icon" style={{}} />
                                    </th>
                                    <th style={{
                                        textAlign: "start",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Name</th>
                                    <th style={{
                                        textAlign: "start",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Email ID</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Mobile no</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Walkin date</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Comments</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none",
                                        borderTopRightRadius: "24px"
                                    }}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {currentCustomers.map((customer) => (
                                    <tr key={customer.id} className="customer-row">
                                        <td style={{
                                            textAlign: "center",
                                            padding: "10px",
                                            border: "none"
                                        }}>
                                            <img src={minus} height={20} width={20} alt="minus icon" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" />
                                                <span style={{
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    fontFamily: "Gilroy",
                                                    color: "#222222",
                                                    paddingLeft: "12px"
                                                }}
                                                    className=" customer-name">
                                                    {customer.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "start"
                                        }}>{customer.email}</td>
                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "center"
                                        }}>{customer.mobile}</td>

                                        <td style={{
                                            padding: "8px",
                                            border: "none",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy"
                                        }}>
                                            <span style={{
                                                padding: "3px 7px",
                                                borderRadius: "60px",
                                                backgroundColor: "#EBEBEB",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                fontFamily: "Gilroy"
                                            }}>
                                                {customer.walkInDate}
                                            </span>
                                        </td>

                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "center"
                                        }}>{customer.comments}</td>


                                        <td>

                                            <div

                                                style={{
                                                    cursor: "pointer",
                                                    height: 40,
                                                    width: 40,
                                                    borderRadius: "50%",
                                                    border: "1px solid #EFEFEF",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    position: "relative",
                                                    zIndex: dotsButton === customer.id ? 1000 : 'auto'
                                                }}
                                                onClick={() => handleDotsClick(customer.id)}
                                            >
                                                <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                                {dotsButton === customer.id && (
                                                    <div
                                                        ref={popupRef}
                                                        style={{
                                                            cursor: "pointer",
                                                            backgroundColor: "#F9F9F9",
                                                            position: "absolute",
                                                            right: 0,
                                                            // top: 50,
                                                            overflow: "visible ! important",
                                                            marginButtom: "30px",
                                                            width: 163,
                                                            height: 92,
                                                            border: "1px solid #EBEBEB",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center",
                                                            padding: 15,
                                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                                                        }}
                                                    >
                                                        <div
                                                            className="mb-2 d-flex align-items-center"
                                                            onClick={() => handleEdit(customer)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <img src={Edit} style={{
                                                                height: 16,
                                                                width: 16,
                                                                marginRight: "8px"
                                                            }} alt="Edit icon" />
                                                            <label style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy",
                                                                color: "#222222"
                                                            }}>
                                                                Edit
                                                            </label>
                                                        </div>

                                                        <div
                                                            className="d-flex align-items-center"
                                                            onClick={() => handleDelete(customer)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <img src={Delete} style={{
                                                                height: 16,
                                                                width: 16,
                                                                marginRight: "8px"
                                                            }} alt="Delete icon" />
                                                            <label style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy",
                                                                color: "#FF0000"
                                                            }}>
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


                        <Pagination className=" d-flex justify-content-end align-items-center">
                            <Pagination.Prev
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                <ArrowLeft2 size="16" color="#1E45E1" />
                            </Pagination.Prev>

                            {Array.from({ length: totalPages }, (_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={idx + 1 === currentPage}
                                    onClick={() => handlePageChange(idx + 1)}
                                    style={{
                                        fontSize: '8px',
                                    }}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                <ArrowRight2 size="16" color="#1E45E1" />
                            </Pagination.Next>
                        </Pagination>
                    </div>
                ) : (

                    <div className='d-flex align-items-center justify-content-center ' style={{ width: "100%", height: 350, margin: "0px auto" }}>
                        <div>

                            <div className="no-data-container">
                                <Image src={Emptystate} alt="No Data" />
                                <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)", paddingTop: "10px" }}>No Walk-in available</div>
                                <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no Walk-in added. </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button
                                    onClick={handleShowWalk}
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#1E45E1",
                                        color: "white",
                                        height: 56,
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        width: 200,
                                        padding: "18px 20px",
                                        fontFamily: 'Montserrat',
                                        marginTop: "20px"
                                    }}
                                >
                                    + Add Walk-in
                                </Button>

                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                )}
            </div>


            <CustomerForm
                show={showForm}
                handleClose={handleFormClose}
                onSubmit={handleFormSubmit}
                initialData={selectedCustomer}
                modalType={modalType}
            />

            {/* Delete  Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered style={{ margin: "40px" }}>

                <Modal.Title style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "18px", textAlign: "center", color: "#222222", paddingTop: "20px" }}>
                    Delete walk-in?</Modal.Title>

                {customerToDelete && (
                    <p style={{ color: "#646464", fontFamily: "Gilroy", fontWeight: 500, textAlign: "center", fontSize: "16px", paddingTop: "20px" }}>Are you sure you want to delete this walk-in?</p>
                )}




                <div class="d-flex justify-content-evenly" style={{ margin: "20px" }}>
                    <button
                        style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "16px",
                            width: "160px",
                            height: "52px",
                            borderColor: "#1E45E1",
                            color: "#1E45E1",
                            transition: "all 0.3s ease"
                        }}
                        type="button"
                        className="btn hover-button"
                        onClick={cancelDelete}
                    >
                        Cancel
                    </button>

                    <button
                        style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "16px",
                            width: "160px",
                            height: "52px",
                            borderColor: "#1E45E1",
                            color: "#1E45E1",
                            transition: "all 0.3s ease"
                        }}
                        type="button"
                        className="btn hover-button"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                </div>



            </Modal>

            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
                toastStyle={{
                    backgroundColor: "#EBF5FF",
                    color: "#222222",
                    borderRadius: "60px",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "16px"
                }}
            />

        </>
    );
}
export default UserlistWalkin;














