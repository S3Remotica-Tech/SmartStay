import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Image, Modal, Form ,Row,Col} from 'react-bootstrap';
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
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/New_images/edit.png';
import Calendars from '../Assets/Images/New_images/calendar.png'
import Vector1 from '../Photos/Search.png'
import Filters from  '../Photos/Filters .png'
import Addbooking from './Addbookingform';
import { CloseCircle } from 'iconsax-react';

const initialCustomers = [
  { id: 1, name: "Kellie Turcotte", email: "kellie@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse1 },
  { id: 2, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount:'$2500',avatar: Ellipse2 },
  { id: 3, name: "Esther Williamson", email: "esther@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse3 },
  { id: 4, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse4 },
  { id: 5, name: "Sabrina Gleason", email: "sabrina@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse5 },
  { id: 6, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse6 },
  { id: 7, name: "Homer Renner", email: "homer@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount:'$2500',avatar: Ellipse7 },
  { id: 8, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse8 },
  { id: 9, name: "Emmett Cormier III", email: "emmett@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse9 },
  { id: 10, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024",amount:'$2500', avatar: Ellipse10 },
];

function Booking() {

  const [showForm, setShowForm] = useState(false);
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(initialCustomers);
  
  const popupRef = useRef(null);
  const calendarRef = useRef(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  const handleDotsClick = (id) => {
    setActiveDotsId(prevId => (prevId === id ? null : id));
  };

  const handleEdit = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setModalType('edit');
    setActiveDotsId(null);
  };

  const handleDelete = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setModalType('delete');
    setActiveDotsId(null);
  };

  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const handleEditSave = () => {
  
    console.log(`Saving changes for customer with id: ${selectedCustomer.id}`);
  
    setCustomers(prevCustomers => prevCustomers.map(c => c.id === selectedCustomer.id ? selectedCustomer : c));
    handleModalClose();
  };

  const confirmDelete = () => {
 
    console.log(`Deleting customer with id: ${selectedCustomer.id}`);
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== selectedCustomer.id));
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
    <Container>
      <div>
        <div className="customer p-4">
          <div className="d-flex justify-content-end">
            <div className="p-2">
              <Image src={Vector1} roundedCircle style={{ height: "30px", width: "30px", marginTop: "12px" }} alt="User Icon" />
            </div>
            <div className="p-2">
            <Image src={Filters} roundedCircle style={{ height: "30px", width: "30px", marginTop: "12px" }} />
            </div>
            <div className="p-2">
              <Button
                style={{
                  fontSize: 16,
                  backgroundColor: "#1E45E1",
                  color: "white",
                  height: 56,
                  fontWeight: 600,
                  borderRadius: 12,
                  width: 171,
                  padding: "18px 20px",
                  fontFamily: "Gilroy"
                }}
                onClick={toggleForm}
              >
                + New Booking
              </Button>
            </div>
          </div>
        </div>

        <Addbooking show={showForm} handleClose={closeModal} />

        <Table className="table" responsive>
        <thead style={{ border: "none"}}>
            <tr>
              <th style={{ textAlign: "center", padding: "10px", background: "#E7F1FF", border: "none" }}>
                <img src={minus} height={20} width={20} alt="minus icon" />
              </th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Name</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Email ID</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Mobile no</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Booking date</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Joining date</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Amount</th>
              <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="customer-row">
                <td>
                  <img src={minus} height={20} width={20} alt="minus icon"style={{marginLeft:"20px"}}  />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" />
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        color: "#222222",
                        paddingLeft: "4px"
                      }}
                      className="ms-2 customer-name"
                    >
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
                  textAlign: "start"
                }}>{customer.mobile}</td>

                <td style={{
                  padding: "10px",
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Gilroy"
                }}>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "60px",
                    backgroundColor: "#EBEBEB",
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy"
                  }}>
                    {customer.bookingDate}
                  </span>
                </td>

                <td style={{
                  padding: "10px",
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Gilroy"
                }}>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "60px",
                    backgroundColor: "#EBEBEB",
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy"
                  }}>
                    {customer.joiningDate}
                  </span>
                </td>
                <td style={{
                  padding: "10px",
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Gilroy"
                }}>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "60px",
                    backgroundColor: "#EBEBEB",
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy"
                  }}>
                    {customer.amount}
                  </span>
                </td>

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
                      zIndex: activeDotsId === customer.id ? 1000 : 'auto'
                    }}
                    onClick={() => handleDotsClick(customer.id)}
                  >
                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                    {activeDotsId === customer.id && (
                      <div
                        ref={popupRef}
                        style={{
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
                        }}
                      >
                        <div
                          className="mb-2 d-flex align-items-center"
                          onClick={() => handleEdit(customer.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={Edit} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Edit icon" />
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
                          onClick={() => handleDelete(customer.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={Delete} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Delete icon" />
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
      </div>

     
    {/* Edit Modal */}
    <Modal show={modalType === 'edit'}  centered backdrop="static">
  <Modal.Header className="d-flex justify-content-between">
    <Modal.Title>Edit booking</Modal.Title>
    <CloseCircle size="32" color="#222222" onClick={handleModalClose} />
  </Modal.Header>
  {selectedCustomer && (
    <Modal.Body>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formCustomerFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.firstName}
                style={{height:"50px"}}
                onChange={(e) => setSelectedCustomer({ ...selectedCustomer, firstName: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCustomerLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.lastName}
                style={{height:"50px"}}
                onChange={(e) => setSelectedCustomer({ ...selectedCustomer, lastName: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
        <Col md={6}>
  {/* <Form.Group controlId="formJoiningDate" className="mb-3" style={{ position: 'relative' }}>
    <Form.Label>Joining Date</Form.Label>
    
    <Flatpickr
      className="form-control"
      placeholder="DD-MM-YYYY"
      value={selectedCustomer.joiningDate}
      onChange={([date]) => setSelectedCustomer({ ...selectedCustomer, joiningDate: date })}
      options={{
        dateFormat: 'Y-m-d',  
        altInput: true,       
        altFormat: 'd-m-Y',   
        defaultDate: null,    
      }}
      style={{ paddingRight: '40px' }} 
    />

  
    <img
      src={Calendars}
      alt="Calendar"
      style={{
        position: 'absolute',
        top: '70%',
        right: '10px',
        transform: 'translateY(-50%)',
        height: 24,
        width: 24,
        pointerEvents: 'none', 
      }}
    />
  </Form.Group> */}
  <Form.Group className="mb-2" controlId="formJoiningDate">
  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    Joining Date 
  </Form.Label>

  <div style={{ position: 'relative',}}>
    {/* Label for the input field styled like a button with the calendar icon */}
    <label
      htmlFor="date-input"
      style={{
        border: "1px solid #D9D9D9",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        fontFamily: "Gilroy",
        fontWeight: selectedCustomer.joiningDate ? 500 : 500,
        color: "#222222",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onClick={() => {
        if (calendarRef.current) {
          calendarRef.current.flatpickr.open(); // Opens the calendar on click
        }
      }}
    >
      {/* Displaying the selected date or placeholder text */}
      {selectedCustomer.joiningDate instanceof Date && !isNaN(selectedCustomer.joiningDate)
        ? selectedCustomer.joiningDate.toLocaleDateString('en-GB') // Formats date as DD/MM/YYYY
        : 'DD/MM/YYYY'}
      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
    </label>

    {/* Flatpickr component with custom options */}
    <Flatpickr
      ref={calendarRef}
      value={selectedCustomer.joiningDate}
      onChange={([date]) => setSelectedCustomer({ ...selectedCustomer, joiningDate: date })}
     
      style={{
        padding: 15,
        fontSize: 16,
        width: "100%",
        borderRadius: 8,
        border: "1px solid #D9D9D9",
        position: 'absolute',
        top: 100,
        left: 100,
        zIndex: 1000,
        display: "none",  
      }}
    />
  </div>
</Form.Group>

</Col>



          <Col md={6}>
            <Form.Group controlId="formCustomerMobile" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.amount}
                style={{height:"50px"}}
                onChange={(e) => setSelectedCustomer({ ...selectedCustomer, amount: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="formComments" className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.comments}
                style={{height:"50px"}}
                onChange={(e) => setSelectedCustomer({ ...selectedCustomer, comments: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
  )}
  <Modal.Footer>
   
    <Button variant="primary"  className="w-100" onClick={handleEditSave}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>



      {/* Delete Confirmation Modal */}
      <Modal show={modalType === 'delete'} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          {selectedCustomer && (
            <p>Are you sure you want to delete this booking?
              
           
              </p>
          )}
        </Modal.Body> */}

        <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>
       
                    Are you sure you want to delete this booking?
      
                </Modal.Body>
        <Modal.Footer>
          <Button style={{ width: 160, height: 52, borderRadius: 8, padding: "16px, 45px, 16px, 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF", color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
           onClick={handleModalClose}>
            Cancel
          </Button>
          <Button style={{ width: 160, height: 52, borderRadius: 8, padding: "16px, 45px, 16px, 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
           onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Booking;
