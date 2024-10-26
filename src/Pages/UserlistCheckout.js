import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Room from '../Assets/Images/RoomImg.svg';
import More from '../Assets/Images/more.svg';
import People from '../Assets/Images/New_images/profile-picture.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/edit (1).svg';
import Calender from '../Assets/Images/calendar.svg';
import { Modal, Button, Pagination, Form ,Card} from 'react-bootstrap';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Closecircle from '../Assets/Images/close-circle.svg';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CheckOutForm from "./UserListCheckoutForm";
import Emptystate from '../Assets/Images/Empty-State.jpg'
import Image from 'react-bootstrap/Image';


function CheckOut() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();



  console.log("state for cHECKoUT", state)

  const [activeDotsId, setActiveDotsId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [selectedCustomer, setSelectedCustomer] = useState("Customer 1");
  const [modalType, setModalType] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const datePickerRef = useRef(null);


  const [checkOutCustomer, setCheckOutCustomer] = useState([])




  useEffect(() => {
    dispatch({ type: 'CHECKOUTCUSTOMERLIST' })
  }, [])




  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode == 200) {
      setCheckOutCustomer(state.UsersList.CheckOutCustomerList)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CHECKOUT_CUSTOMER_LIST' })
      }, 2000)

    }

  }, [state.UsersList.GetCheckOutCustomerStatusCode])




  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode == 200 || state.UsersList.deleteCheckoutCustomerStatusCode == 200) {
      dispatch({ type: 'CHECKOUTCUSTOMERLIST' })
      setcheckoutForm(false);
      setModalType(null);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER' })
      }, 3000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR _DELETE_CHECK_OUT_CUSTOMER' })
      }, 3000)


    }

  }, [state.UsersList.addCheckoutCustomerStatusCode, state.UsersList.deleteCheckoutCustomerStatusCode])




  // Pagination logic
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = checkOutCustomer.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(checkOutCustomer.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [checkOutCustomer, currentPage, totalPages]);


  const [checkOutEdit, setCheckOutEdit] = useState('')
  const [deleteCheckOutCustomer, setDeleteCheckOutCustomer] = useState('')

  const handleEdit = (checkout) => {

    setActiveDotsId(null);
    setcheckoutForm(true);
    setCheckOutEdit(checkout)

  };

  const handleDelete = (checkout) => {
    console.log('Delete clicked for card', checkout);
    setActiveDotsId(null);
    setDeleteCheckOutCustomer(checkout)
    setModalType('delete');
  };

  const confirmDelete = () => {
    console.log('Confirmed deletion');
    if (deleteCheckOutCustomer.ID) {
      dispatch({ type: 'DELETECHECKOUTCUSTOMER', payload: { user_id: deleteCheckOutCustomer.ID } })
    }

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


  //edit form
  const initialDate = new Date();
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [checkOutDates, setCheckOutDates] = useState(formatDate(initialDate));
  const [selectedCustomers, setSelectedCustomers] = useState("Customer 1");
  const [noticeDays, setNoticeDays] = useState("");
  const calendarRef = useRef(null);

  const handleCustomerChanges = (event) => {
    setSelectedCustomers(event.target.value);
  };

  const handleNoticeDaysChange = (event) => {
    setNoticeDays(event.target.value);
  };

  const handleDateChange = (date) => {
    setCheckOutDates(formatDate(date[0]));
    calendarRef.current.flatpickr.close();
  };





  const [checkoutForm, setcheckoutForm] = useState(false);


  const checkOutForm = () => {
    setcheckoutForm(!checkoutForm);
  };

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };






  return (
    <div className="">
      {currentCustomers.length > 0 ?
        <div className="row mt-3 row-gap-3">
          {currentCustomers.map((checkout, index) =>

            <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Card className=" h-100 border p-3" style={{ borderColor: '#E6E6E6', borderWidth: '1px', borderRadius: '16px', position: 'relative' }}>
                <div className="d-flex align-items-center">
                  <Image
                    src={checkout.profile && checkout.profile !== "0" && checkout.profile.trim() !== "" ? checkout.profile : People}
                    roundedCircle
                    style={{ height: "60px", width: "60px" }}
                    alt="profile"
                  />

                  {/* <img src={Room} alt="Room Image" /> */}
                  <div style={{ marginLeft: '10px' }}>
                    <p className="mb-0 font-weight-bold" style={{ fontFamily: "Gilroy", fontSize: '16px', fontWeight: '600', color: '#222222' }}>
                      {checkout.HostelName}
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
                        onClick={() => handleEdit(checkout)}
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
                        onClick={() => handleDelete(checkout)}
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

                {/* <div className="d-flex justify-content-between" style={{ whiteSpace: 'nowrap' }}>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', fontFamily:"Gilroy" }}>Customer</p>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', marginLeft: '20px', fontFamily: 'Gilroy' }}>Check-out Date</p>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', fontFamily: 'Gilroy' }}>Notice Days</p>
                </div>

                <div className="d-flex justify-content-between align-items-center" style={{ whiteSpace: 'nowrap', marginTop: '-10px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '20px', lineHeight: '1' }}>
                    <Image src={
                      checkout.user_profile && checkout.user_profile !== "0" && checkout.user_profile.trim() !== ""
                        ? checkout.user_profile
                        : People
                    } roundedCircle
                      style={{ height: "30px", width: "30px", marginRight: '5px' }}
                    />

                    {checkout.Name}
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '68px', lineHeight: '1', fontFamily: 'Gilroy' }}>{moment(checkout.CheckoutDate, 'YYYY-MM-DD').format('DD MMM YYYY')}</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '16px', lineHeight: '1' , fontFamily: 'Gilroy'}}>{checkout.notice_period}</p>
                </div> */}

<div className="d-flex justify-content-between align-items-center mb-1 mt-1 flex-wrap" >

<div className='pb-1' style={{lineHeight:1}} >
    <div className='pb-1'>
        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Customer</label>
    </div>

    <div >
        <label style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '20px', lineHeight: '1' }}>
<Image src={
  checkout.user_profile && checkout.user_profile !== "0" && checkout.user_profile.trim() !== ""
    ? checkout.user_profile
    : People
} roundedCircle
  style={{ height: "30px", width: "30px", marginRight: '5px' }}
/>

{checkout.Name}
        </label>
    </div></div>


<div className='pb-1' style={{lineHeight:1}}>
    <div className=''>
        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Check-out Date</label>
    </div>
    <div className='text-center' >
        <label style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '68px', lineHeight: '1', fontFamily: 'Gilroy' }}>
{moment(checkout.CheckoutDate, 'YYYY-MM-DD').format('DD MMM YYYY')}
        </label>
    </div>
</div>


<div className='pb-1' style={{lineHeight:1}}>
    <div className=''>
        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Notice Days</label>
    </div>
    <div>
        <label style={{ fontSize: '14px', fontWeight: '600', color: 'Black', marginRight: '16px', lineHeight: '1' , fontFamily: 'Gilroy'}}>{checkout.notice_period}
        </label>
    </div>
</div>


</div>

                <div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#4B4B4B', fontFamily: 'Gilroy' }}>Comment</p>
                </div>

                <div style={{ marginTop: '-10px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#222222', fontFamily: 'Gilroy' }}>{checkout.checkout_comment}</p>
                </div>
                    
              </Card>


            </div>
          )}

        </div>
        :
        <div className='d-flex align-items-center justify-content-center ' style={{ width: "100%", height: 350, margin: "0px auto" }}>
          <div>

            <div className="no-data-container">
              <Image src={Emptystate} alt="No Data" />
              <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)", paddingTop: "10px" }}>No Check-out available</div>
              <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no Check-out added.</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={checkOutForm}
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
                + Add Check-out
              </Button>

            </div>
          </div>
          <div>

          </div>
        </div>



      }






{currentCustomers.length > 0 && 

   
<Pagination className="mt-4 d-flex justify-content-end align-items-center">
<Pagination.Prev style={{ visibility: "visible" }}
  onClick={() => paginate(currentPage - 1)}
  disabled={currentPage === 1}
/>
{/* <span style={{fontSize:8, color:"#1E45E1"}}>Previous</span> */}
{renderPagination()}
{/* <span style={{fontSize:8, color:"#1E45E1"}}>Next</span> */}
<Pagination.Next style={{ visibility: "visible" }}
  onClick={() => paginate(currentPage + 1)}
  disabled={currentPage === totalPages}
/>
</Pagination>



}








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


      {
        checkoutForm && <CheckOutForm show={checkoutForm} handleClose={checkoutcloseModal} currentItem={checkOutEdit} />
      }



    </div>
  );
}

export default CheckOut;




