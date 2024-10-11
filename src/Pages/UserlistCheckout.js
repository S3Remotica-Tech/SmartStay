import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Room from '../Assets/Images/RoomImg.svg';
import More from '../Assets/Images/more.svg';
import People from '../Assets/Images/People (2).svg';
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/edit (1).svg';
import ArrowDown from '../Assets/Images/arrow-down.svg';
import Calender from '../Assets/Images/calendar.svg';
import DatePicker from 'react-datepicker';
import { Modal, Button } from 'react-bootstrap';
import Closecircle from '../Assets/Images/close-circle.svg';

function CheckOut() {
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [selectedCustomer, setSelectedCustomer] = useState("Customer 1");
  const [modalType, setModalType] = useState(null);
  const datePickerRef = useRef(null);

  const handleEdit = (id) => {
    console.log('Edit clicked for card', id);
    setActiveDotsId(null);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    console.log('Delete clicked for card', id);
    setActiveDotsId(null);
    setModalType('delete');
  };

  const confirmDelete = () => {
    console.log('Confirmed deletion');
    setModalType(null); 
  };

  const handleModalClose = () => {
    setModalType(null);
  };

  const toggleMoreOptions = (id) => {
    if (activeDotsId === id) {
      setActiveDotsId(null);
    } else {
      setActiveDotsId(id);
    }
  };

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.getAttribute("data-value"));
  };

  const handleClose = () => setShowForm(false);

  const renderCard = (index) => (
    <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
      <div className="border p-3" style={{ borderColor: '#E6E6E6', borderWidth: '1px', borderRadius: '16px', position: 'relative' }}>
        <div className="d-flex align-items-center">
          <img src={Room} alt="Room Image" />
          <div style={{ marginLeft: '10px' }}>
            <p className="mb-0 font-weight-bold" style={{ fontFamily: "Gilroy", fontSize: '16px', fontWeight: '600', color: '#222222' }}>
              Royal Grand Hostel
            </p>
            <p className="mb-0 mt-2" style={{
              fontFamily: "Gilroy",
              fontSize: '14px',
              fontWeight: '500',
              color: 'black',
              borderRadius: '60px',
              backgroundColor: '#FFEFCF',
              textAlign: 'center',
              width: '110px',
              border: '1px solid #FFEFCF',
            }}>
              Paying Guest
            </p>
          </div>

          <img
            src={More}
            alt="More Icon"
            className="ml-auto border p-2"
            style={{
              borderRadius: '60px',
              color: '#E6E6E6',
              borderWidth: '1px',
              marginLeft: 'auto',
              cursor: 'pointer'
            }}
            onClick={() => toggleMoreOptions(index)}
          />

          {activeDotsId === index && (
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#EBEBEB",
                position: "absolute",
                right: 0,
                width: 163,
                border: "1px solid #EBEBEB",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 15,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
                marginTop: "140px",
                marginRight: "20px",
              }}
            >
              <div
                className="mb-2 d-flex align-items-center"
                onClick={() => handleEdit(index)}
                style={{ cursor: "pointer" }}
              >
                <img src={Edit} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Edit icon" />
                <label style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  color: "#222222"
                }}>
                  Edit
                </label>
              </div>
              <div
                className="d-flex align-items-center"
                onClick={() => handleDelete(index)}
                style={{ cursor: "pointer" }}
              >
                <img src={Delete} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Delete icon" />
                <label style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  color: "#FF0000"
                }}>
                  Delete
                </label>
              </div>
            </div>
          )}
        </div>

        <hr style={{ border: '1px solid #E7E7E7' }} />

        <div className="d-flex justify-content-between" style={{ whiteSpace: 'nowrap' }}>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Customer</p>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', marginLeft: '20px' }}>Check-out Date</p>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Notice Days</p>
        </div>

        <div className="d-flex justify-content-between align-items-center" style={{ whiteSpace: 'nowrap', marginTop: '-10px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '20px', lineHeight: '1' }}>
            <img src={People} alt="People Icon" style={{ marginRight: '5px' }} /> Kellie Turcotte
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '68px', lineHeight: '1' }}>20 Mar 2024</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '16px', lineHeight: '1' }}>20 Days</p>
        </div>

        <div>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B' }}>Comment</p>
        </div>

        <div style={{ marginTop: '-10px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>kafjafbafafkafa</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-10">
      <div className="row mt-3">
        {Array.from({ length: 6 }).map((_, index) => renderCard(index))}
      </div>

      <Modal show={showForm} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title style={{ fontWeight: '600', fontSize: '16px' }}>Edit Check-out</Modal.Title>
          <img src={Closecircle} alt="Close Icon" onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body>
        <form className="space-y-4">
            <div className="form-group">
              <label  style={{ fontSize: '14px',fontWeight:'500' }}>Paying Guest</label>
              <div className="input-group d-flex position-relative">
                <select id="category" className="form-control mt-2" style={{ borderRadius: '8px' }}>
                  <option value="Royal Grand Hostel">Royal Grand Hostel</option>
                  <option value="1">Product 1</option>
                  <option value="2">Product 2</option>
                  <option value="3">Product 3</option>
                  <option value="4">Product 4</option>
                </select>
                <img src={ArrowDown} style={{
                  position: 'absolute',
                  right: '10px',
                  top: '59%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }} alt="Arrow Down" />
              </div>
            </div>

            <div className="form-group">
              <label className='mt-2' style={{ fontSize: '14px',fontWeight:'500' }}>Customer</label>
              <div className="input-group d-flex position-relative">
                <div className="form-control d-flex align-items-center mt-2" style={{ borderRadius: '8px' }}>
                  <img src={People} alt="Customer Icon" style={{ marginRight: '5px' }} />
                  {selectedCustomer}
                </div>
                <img src={ArrowDown} style={{
                  position: 'absolute',
                  right: '10px',
                  top: '59%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }} alt="Arrow Down" />
              </div>
            </div>

<div className='d-flex mt-2'>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 position-relative">
                  <label htmlFor="payment-mode" style={{ fontSize: '14px',fontWeight:'500' }}>Check-out Date</label>
                  <div className='position-relative'>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="form-control mt-2"
                      ref={datePickerRef}
                    />
                    <img
                      src={Calender}
                      onClick={handleCalendarClick}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '59%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer'
                      }}
                      alt="Calendar Icon"
                    />
                  </div>
                </div>

                <div className="form-group col-md-6" style={{ marginLeft: '25px' }}>
                  <label htmlFor="notice-days" style={{ fontSize: '14px',fontWeight:'500' }}>Notice Days</label>
                  <input
                    type="text"
                    name="notice-days"
                    id="notice-days"
                    className="form-control mt-2"
                    placeholder='20 days'
                    required
                  />
<img src={ArrowDown} style={{
                  position: 'absolute',
                  right: '30px',
                  top: '54%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  
                }} alt="Arrow Down" />
                </div>
              </div>
            </div>


            <div className="form-group">
              <label className='mt-2' style={{ fontSize: '14px',fontWeight:'500' }}>Comments</label>
              <input
                id="comments"
                className="form-control mt-2"
                rows="3"
                style={{ borderRadius: '8px' }}
                placeholder="anfankfjafbjkafajnfja"
              />
            </div>
             <Button type="submit" className="btn btn-primary mt-4" style={{
              borderRadius: '8px',
              fontFamily: "Gilroy",
              fontWeight: '600',
              fontSize: '14px',
              padding: '16px 24px', width: '100%'
            }}>Save Changes</Button>

          </form>
        </Modal.Body>
      </Modal>

<Modal
  show={modalType === 'delete'}
  onHide={handleModalClose}
  centered
  backdrop="static"
  style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }} 
>
  <Modal.Header style={{ borderBottom: 'none' }}> 
    <Modal.Title 
      style={{
        fontSize: '18px',
        fontFamily: 'Gilroy',
        textAlign: 'center',
        fontWeight: 600,
        color: '#222222',
        flex: 1
      }}
    >
      Delete Check-out
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Gilroy',
      color: '#646464',
      textAlign: 'center',
      marginTop: '-20px'
    }}
  >
    Are you sure you want to delete this check-out?
  </Modal.Body>
  
  <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}> 
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#fff',
        color: '#1E45E1',
        border: '1px solid #1E45E1',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px',
        marginRight: 10
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
        padding: '12px 20px',
        background: '#1E45E1',
        color: '#FFFFFF',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px'
      }}
      onClick={confirmDelete}
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>

<Modal
  show={modalType === 'delete'}
  onHide={handleModalClose}
  centered
  backdrop="static"
  style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }} 
>
  <Modal.Header style={{ borderBottom: 'none' }}> 
    <Modal.Title 
      style={{
        fontSize: '18px',
        fontFamily: 'Gilroy',
        textAlign: 'center',
        fontWeight: 600,
        color: '#222222',
        flex: 1
      }}
    >
      Delete Check-out?
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Gilroy',
      color: '#646464',
      textAlign: 'center',
      marginTop: '-20px'
    }}
  >
    Are you sure you want to delete this check-out?
  </Modal.Body>
  
  <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}> 
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#fff',
        color: '#1E45E1',
        border: '1px solid #1E45E1',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px',
        marginRight: 10
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
        padding: '12px 20px',
        background: '#1E45E1',
        color: '#FFFFFF',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px'
      }}
      onClick={confirmDelete}
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default CheckOut;
