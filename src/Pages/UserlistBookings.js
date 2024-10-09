// src/Components/Booking/Booking.js

import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Image,Modal } from 'react-bootstrap';
import './Userlistbooking.css';
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
import Calendars from '../Assets/Images/New_images/calendar.png';
import { CloseCircle } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import BookingModal from './Addbookingform';
import AssignBooking from './Assignbooking';
import { FaCheckCircle } from 'react-icons/fa';
import check from '../Assets/Images/add-circle.png';

const initialCustomers = [
  { id: 1, name: 'Kellie Turcotte', email: 'kellie@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse1 },
  { id: 2, name: 'Tatiana Rosser', email: 'tatiana@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse2 },
  { id: 3, name: 'Esther Williamson', email: 'esther@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse3 },
  { id: 4, name: 'Kaylynn Kenter', email: 'kaylynn@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse4 },
  { id: 5, name: 'Sabrina Gleason', email: 'sabrina@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse5 },
  { id: 6, name: 'Tatiana Rosser', email: 'tatiana@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse6 },
  { id: 7, name: 'Homer Renner', email: 'homer@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse7 },
  { id: 8, name: 'Kaylynn Kenter', email: 'kaylynn@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse8 },
  { id: 9, name: 'Emmett Cormier III', email: 'emmett@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse9 },
  { id: 10, name: 'Tatiana Rosser', email: 'tatiana@gmail.com', mobile: '+91 9876543210', bookingDate: '20 Mar 2024', joiningDate: '20 Mar 2024', amount: '$2500', avatar: Ellipse10 },
];

function Booking() {
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit' or 'add'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(initialCustomers);


  const popupRef = useRef(null);

  const handleDotsClick = (id) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (id) => {
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomer(customer);
    setModalType('edit');
    setActiveDotsId(null);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setModalType('add');
  };

  const handleDelete = (id) => {
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomer(customer); // Set the selected customer for deletion
    setModalType("delete");
    setActiveDotsId(null);
  };
  const handleCheckin = (id) => {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      setSelectedCustomer(customer);
      setModalType('checkin');
      setActiveDotsId(null);
    } else {
      toast.error('Customer not found!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };


  const handleSave = (updatedCustomer) => {
    if (modalType === 'edit' || modalType === 'checkin') {
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
      );
      const message = modalType === 'edit' ? 'Saved changes successfully!' : 'Check-in assigned successfully!';
      showToast(message);
    } else if (modalType === 'add') {
      setCustomers((prevCustomers) => [updatedCustomer, ...prevCustomers]);
      showToast('Booking added successfully!');
    }
    handleModalClose();
  };

const showToast=(successMessage)=>{
  toast.success(successMessage, {
    position: "bottom-center",
    autoClose: 3000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: 'toast-custom',
    icon: <FaCheckCircle />,
  });

} 
  
  
  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers((prevCustomers) => prevCustomers.filter((c) => c.id !== selectedCustomer.id));
      toast.success(` booking deleted successfully!`, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    handleModalClose();
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveDotsId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="p-10">
        <div className="p-10 booking-table-userlist" style={{ paddingBottom: '20px' }}>
          
          {/* <div className="mb-3 d-flex justify-content-end">
            <Button
              onClick={handleAdd}
              style={{
                fontSize: 16,
                backgroundColor: '#1E45E1',
                color: 'white',
                height: 56,
                fontWeight: 600,
                borderRadius: 12,
                width: 171,
                padding: '18px 20px',
                fontFamily: 'Montserrat',
                border: 'none',
              }}
            >
              + Add Bookings
            </Button>
          </div> */}

          {/* Booking Table */}
          <Table className="table-booking"  responsive>
            <thead style={{ border: 'none' }}>
              <tr>
                <th style={{ textAlign: 'center', padding: '10px', background: '#E7F1FF', border: 'none' }}>
                  <img src={minus} height={20} width={20} alt="minus icon" />
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Email ID
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Mobile No
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Booking Date
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Joining Date
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    textAlign: 'start',
                    padding: '10px',
                    color: '#4B4B4B',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    background: '#E7F1FF',
                    border: 'none',
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="customer-row">
                  <td style={{ textAlign: 'center', padding: '10px', border: 'none' }}>
                    <img src={minus} height={20} width={20} alt="minus icon" />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" />
                      <span
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          fontFamily: 'Gilroy',
                          color: '#222222',
                          paddingLeft: '4px',
                        }}
                        className="ms-2 customer-name"
                      >
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      fontFamily: 'Gilroy',
                      color: '#000000',
                      textAlign: 'start',
                    }}
                  >
                    {customer.email}
                  </td>
                  <td
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      fontFamily: 'Gilroy',
                      color: '#000000',
                      textAlign: 'start',
                    }}
                  >
                    {customer.mobile}
                  </td>

                  <td
                    style={{
                      padding: '10px',
                      border: 'none',
                      textAlign: 'start',
                      fontSize: '16px',
                      fontWeight: 600,
                      fontFamily: 'Gilroy',
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '60px',
                        backgroundColor: '#EBEBEB',
                        textAlign: 'start',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                      }}
                    >
                      {customer.bookingDate}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: '10px',
                      border: 'none',
                      textAlign: 'start',
                      fontSize: '16px',
                      fontWeight: 600,
                      fontFamily: 'Gilroy',
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '60px',
                        backgroundColor: '#EBEBEB',
                        textAlign: 'start',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                      }}
                    >
                      {customer.joiningDate}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      border: 'none',
                      textAlign: 'start',
                      fontSize: '16px',
                      fontWeight: 600,
                      fontFamily: 'Gilroy',
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '60px',
                        backgroundColor: '#EBEBEB',
                        textAlign: 'start',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                      }}
                    >
                      {customer.amount}
                    </span>
                  </td>

                  <td>
                    <div
                      style={{
                        cursor: 'pointer',
                        height: 40,
                        width: 40,
                        borderRadius: '50%',
                        border: '1px solid #EFEFEF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: activeDotsId === customer.id ? 1000 : 'auto',
                      }}
                      onClick={() => handleDotsClick(customer.id)}
                    >
                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                      {activeDotsId === customer.id && (
                        <div
                          ref={popupRef}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            right: 0,
                            top: 50,
                            width: 163,
                            height: 92,
                            border: '1px solid #EBEBEB',
                            borderRadius: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 15,
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                           <div
                            className="mb-2 d-flex align-items-center"
                            onClick={() => handleCheckin(customer.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={check} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Checkin icon" />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: 'Gilroy',
                                color: '#222222',
                              }}
                            >
                              Check In
                            </label>
                          </div>
                          <div
                            className="mb-2 d-flex align-items-center"
                            onClick={() => handleEdit(customer.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={Edit} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Edit icon" />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: 'Gilroy',
                                color: '#222222',
                              }}
                            >
                              Edit
                            </label>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            onClick={() => handleDelete(customer.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={Delete} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Delete icon" />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: 'Gilroy',
                                color: '#FF0000',
                              }}
                            >
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
          <ToastContainer />
        </div>
      </div>

      {/* Booking Modal (Add/Edit) */}
      <BookingModal
        show={modalType === 'edit' || modalType === 'add'}
        handleClose={handleModalClose}
        mode={modalType} // 'edit' or 'add'
        customer={selectedCustomer}
        handleSave={handleSave}
      />

<AssignBooking
        show={modalType === 'checkin'}
        handleClose={handleModalClose}
        mode={modalType}
        customer={selectedCustomer}
        handleSave={handleSave}
      />

      {/* Delete Modal */}
      <Modal show={modalType === 'delete'} onHide={handleModalClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>
          Are you sure you want to delete this booking for booking?
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "16px 45px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "#FFF",
              color: "rgba(36, 0, 255, 1)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy"
            }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "16px 45px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "rgba(36, 0, 255, 1)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy"
            }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    
    
    </>
  );
}

export default Booking;
