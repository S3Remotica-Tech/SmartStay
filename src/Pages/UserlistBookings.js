import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Image, Modal, Pagination } from 'react-bootstrap';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingModal from './Addbookingform';
import AssignBooking from './Assignbooking';
import { FaCheckCircle } from 'react-icons/fa';
import check from '../Assets/Images/add-circle.png';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Emptystate from '../Assets/Images/Empty-State.jpg';
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
  const [modalType, setModalType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(initialCustomers);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const popupRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current customers to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

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
  const handleShowbook = () => {
    setModalType("add");
    
    setSelectedCustomer(null);
}

  const handleDelete = (id) => {
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomer(customer);
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

  const showToast = (successMessage) => {
    toast.success(successMessage, {
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
      <div className="p-10" style={{marginLeft:"-20px"}}>
        <div>

          {customers.length > 0 ? (
            <div className="p-10 booking-table-userlist" style={{ paddingBottom: '20px' }}>


              <Table className="table-booking" responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', padding: '10px', background: '#E7F1FF', border: 'none', borderTopLeftRadius:'16px'}}>
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
                         borderTopRightRadius:'16px'
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
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
                                backgroundColor: '#F9F9F9',
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

              {totalPages > 1 && (
                <Pagination className="mt-4 d-flex justify-content-end align-items-center">
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
              )}
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
                   fontSize: "16px",
                   padding: "10px 20px", 
                   height: "50px",
                  
               }}
              />
            </div>
          ) : (
            <div className='d-flex align-items-center justify-content-center ' style={{ width: "100%", height: 350, margin: "0px auto" }}>
            <div>

                <div className="no-data-container">
                    <Image src={Emptystate} alt="No Data" />
                    <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No Walk-in available</div>
                    <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no Walk-in added. </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button
                        onClick={handleShowbook}
                        style={{
                            fontSize: 16,
                            backgroundColor: "#1E45E1",
                            color: "white",
                            height: 56,
                            fontWeight: 600,
                            borderRadius: 12,
                            width: 200,
                            padding: "18px 20px",
                            fontFamily: 'Montserrat'
                        }}
                    >
                        + Add Walk-in
                    </Button>

                </div>
            </div>
            <div>

            </div>
        </div>
          )
          }

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
       
          <Modal.Title style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "18px", textAlign: "center", color: "#222222", paddingTop: "20px" }}>Delete Booking?</Modal.Title>
       
        <p style={{ color: "#646464", fontFamily: "Gilroy", fontWeight: 500, textAlign: "center", fontSize: "16px", paddingTop: "20px" }}>
          Are you sure you want to delete this booking for booking?
        </p>
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
            onClick={handleModalClose}
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



    </>
  );
}

export default Booking;