import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import Closecircle from '../Assets/Images/close-circle.svg';
import Calender from '../Assets/Images/calendar.svg';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import People from '../Assets/Images/New_images/profile-picture.png';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, FormControl } from 'react-bootstrap';







const CheckOutForm = ({item,uniqueostel_Id, show, handleClose, currentItem ,checkoutaction ,data ,checkouteditaction}) => {


  const state = useSelector(state => state)
  const dispatch = useDispatch();






  const initialDate = new Date();
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutrequestDate, setCheckOutRequestDate] = useState('');
  const [currentFloor,setCurrentFloor] = useState("")
  const [currentBed,setCurrentBed]= useState("")
  const [selectedHostel, setSelectedHostel] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [noticeDays, setNoticeDays] = useState('');
  const [comments, setComments] = useState('');
  const [advanceamount,setAdvanceAmount] = useState('')
  const [dueamount, SetDueAmount] = useState('')
  const [invoicenumber, SetInvoiceNumber] = useState('')

  const calendarRef = useRef(null);

  const handlecloseform = () => {
    handleClose()
    setSelectedCustomer('');
    setCurrentBed('')
    setCurrentFloor('')
    setNoticeDays('');
    setComments('');
    setCheckOutDate('');
    setCheckOutRequestDate('')
  }

  const [isChecked, setIsChecked] = useState(false);



  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value);
    setGeneralError('')
    setHostelError('')
    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })
  };

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption ? selectedOption.value : '');
    setGeneralError('');
    setCustomerError('');
  };




  const handleNoticeDaysChange = (event) => {
    setNoticeDays(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setGeneralError('')
    setComments(event.target.value);
  };

  const handleDateChange = (date) => {
    setCheckOutDateError('')
    setGeneralError('')
    const formattedDate = moment(date[0]).format('DD-MM-YYYY');
    setCheckOutDate(formattedDate);
    calendarRef.current.flatpickr.close();

    const current_date = new Date();
    const notice_period = Math.ceil((new Date(date[0]) - current_date) / (1000 * 60 * 60 * 24));
    setNoticeDays(notice_period);
  };

  const [dateDifference, setDateDifference] = useState(null);

  const calculateDateDifference = (checkOutDate, checkOutrequestDate) => {
    if (checkOutDate && checkOutrequestDate) {
      const diffInMs = checkOutDate - checkOutrequestDate; 
      const diffInDays = Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)) + 1;
      setDateDifference(diffInDays);
    } else {
      setDateDifference(null);
    }
  };


  useEffect(() => {
    if (currentItem) {
      

      setCheckOutDate(currentItem.CheckoutDate  ? new Date(currentItem.CheckoutDate) : null);
      setCheckOutRequestDate(currentItem.req_date ? new Date(currentItem.req_date) : null)
      // setSelectedHostel(currentItem.Hostel_Id);
      setSelectedCustomer(currentItem.ID);
      setCurrentBed(currentItem.Bed )
      setCurrentFloor(currentItem.Floor )
      setNoticeDays(currentItem.notice_period);
      setComments(currentItem.checkout_comment );

    } else {
      setCheckOutDate('');
      setCheckOutRequestDate('')
      // setSelectedHostel('');
      setSelectedCustomer('');
      setCurrentBed('')
      setCurrentFloor('')
      setNoticeDays('');
      setComments('');
      dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })
    }
  }, [currentItem, show ])


  useEffect(() => {
    if (data) {
      

      setCheckOutDate( data.CheckoutDate ? new Date(data.CheckoutDate) : null);
      setCheckOutRequestDate(data.req_date ? new Date(data.req_date) : null)
      // setSelectedHostel(currentItem.Hostel_Id);
      setSelectedCustomer(data.ID);
      setCurrentBed(data.Bed )
      setCurrentFloor(data.Floor)
      setNoticeDays(data.notice_period);
      setComments( data.checkout_comment);

    } else {
      setCheckOutDate('');
      setCheckOutRequestDate('')
      // setSelectedHostel('');
      setSelectedCustomer('');
      setCurrentBed('')
      setCurrentFloor('')
      setNoticeDays('');
      setComments('');
      dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })
    }
  }, [data, show ])


  useEffect(() => {

    if (selectedCustomer && !data && !currentItem) {
     
  
    
      const filteruserlist = state.UsersList.Users?.filter((u) => u.ID === selectedCustomer);
      if (filteruserlist && filteruserlist.length > 0) {
        setCurrentBed(filteruserlist[0].Bed);
        setCurrentFloor(filteruserlist[0].Floor);
      } else {
        console.log("No matching user found for selectedCustomer:", selectedCustomer);
      }
    }
  }, [selectedCustomer, state.UsersList.Users, data, currentItem]);
  





  const [generalError, setGeneralError] = useState('')
  const [customerWError, setCustomerError] = useState('')
  const [hostelError, setHostelError] = useState('')
  const [checkoUtDateError, setCheckOutDateError] = useState('')
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState('')
  const [isChangedError, setIsChangedError] = useState('')

  const handleCheckOutCustomer = () => {

    const formattedDate = moment(checkOutDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const formattedrequestDate = moment(checkOutrequestDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    if (!selectedCustomer && !uniqueostel_Id && !checkOutDate && !checkOutrequestDate) {
      setGeneralError('Please select all mandatory fields');
      return;
    }
    if (!selectedCustomer) {
      setCustomerError('Please select a customer.');
      // return;
    }

    if (!uniqueostel_Id) {
      setHostelError('Please select a hostel.');
      // return;
    }

    if (!checkOutDate) {
      setCheckOutDateError('Please select a checkout date.');
      // return;
    }

    if (!checkOutrequestDate) {
      setCheckOutRequestDateError('Please select a request date.');
      // return;
    }

    const formattedCheckOutDate = checkOutDate
    ? checkOutDate.toISOString().split('T')[0] 
    : '';

    const formattedCheckOutRequestDate = checkOutrequestDate
    ? checkOutrequestDate.toISOString().split('T')[0] 
    : '';


    const hasChanges = formattedCheckOutDate !== currentItem?.CheckoutDate ||
      // selectedHostel !== currentItem?.Hostel_Id ||
      selectedCustomer !== currentItem?.ID ||
      noticeDays !== currentItem?.notice_period ||
      comments !== currentItem?.checkout_comment || formattedCheckOutRequestDate !== currentItem?.checkOutrequestDate

      
    if (!hasChanges) {
      setIsChangedError('No Changes detected');
      return;
    }
    if (selectedCustomer || currentItem.ID && uniqueostel_Id || currentItem.Hostel_Id &&  checkOutDate && checkOutrequestDate) {
      dispatch({
        type: 'ADDCHECKOUTCUSTOMER', payload: {
          checkout_date: formattedDate,
          user_id: selectedCustomer || currentItem.ID, 
          hostel_id: uniqueostel_Id || currentItem.Hostel_Id,
          comments: comments,
          action: currentItem ? 2 : 1,
          req_date:formattedrequestDate
        }
      })
    }

  }
 

  



  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: 50,
      fontSize: 16,
      color: selectedCustomer ? "#222" : "#4b4b4b",
      fontFamily: "Gilroy",
      fontWeight: selectedCustomer ? 600 : 500,
      border: "1px solid rgb(217, 217, 217)",
      borderRadius: '8px',
      marginTop: '10px',
    }),
    option: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
    }),
  };


  const formatOptions = () => {
    return state.UsersList?.availableCheckOutCustomerList.map((user) => ({
      value: user.ID,
      label: (
        <div className="d-flex align-items-center">
          <Image
            src={user.profile && user.profile !== "0" && user.profile.trim() !== "" ? user.profile : People}
            roundedCircle
            style={{ height: "30px", width: "30px", marginRight: '10px' }}
          />
          <span>{user.Name}</span>
        </div>
      ),
    }));
  };


  useEffect(() => {
    if (uniqueostel_Id) {
      dispatch({ type: 'AVAILABLECHECKOUTCUSTOMER', payload: { hostel_id: uniqueostel_Id } })
    }
  }, [uniqueostel_Id])


  useEffect(() => {
    
    if (selectedCustomer && data) {
      dispatch({ type: 'GETCONFIRMCHECKOUTCUSTOMER', 
        payload: {id:selectedCustomer, hostel_id:  data.Hostel_Id } })      
    } 
  }, [selectedCustomer ,data])


  useEffect(()=> {
    if(state.UsersList.statusCodegetConfirmCheckout === 200){
      setAdvanceAmount(state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount)
      SetDueAmount(state?.UsersList?.GetconfirmcheckoutBillDetails[0]?.balance || 0)
      SetInvoiceNumber(state?.UsersList?.GetconfirmcheckoutBillDetails[0]?.invoiceid || 0) 
      setTimeout(()=>{   
        dispatch({type:"CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER"})
      },500)  
    }
    
   
  },[state.UsersList.statusCodegetConfirmCheckout])


  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  
    if (checked && dueamount > 0) {
      const updatedAdvanceAmount = advanceamount - dueamount;
      setAdvanceAmount(updatedAdvanceAmount); 
      SetDueAmount(0); 
    }
  };

  useEffect(() => {
    if (!isChecked) {
      setAdvanceAmount(state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount); 
      SetDueAmount(state?.UsersList?.GetconfirmcheckoutBillDetails[0]?.balance || 0); 
    }
  }, [isChecked]);

  
  const handleConfirmCheckout = () => {

    if (!selectedCustomer && !data.Hostel_Id && !checkOutDate ) {
      setGeneralError('Please select all mandatory fields');
      return;
    }
    if (!selectedCustomer) {
      setCustomerError('Please select a customer.');
      // return;
    }

    if (!uniqueostel_Id) {
      setHostelError('Please select a hostel.');
      // return;
    }

    if (!checkOutDate) {
      setCheckOutDateError('Please select a checkout date.');
      // return;
    }

   

    // const formattedCheckOutDate = checkOutDate
    // ? checkOutDate.toISOString().split('T')[0] 
    // : '';

    const formattedDate = moment(checkOutDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const Reinburse = isChecked == "true" ? 1 : 0

    const hasChanges = formattedDate !== data?.CheckoutDate ||
    selectedCustomer !== data?.ID ||
    noticeDays !== data?.notice_period ||
    comments !== data?.checkout_comment;

  
    
  // if (!hasChanges) {
  //   setIsChangedError('No Changes detected');
  //   return;
  // }

    if (selectedCustomer && data.Hostel_Id && formattedDate && advanceamount ) {
      dispatch({
        type: 'ADDCONFIRMCHECKOUTCUSTOMER', payload: {
          checkout_date: formattedDate,
          id: selectedCustomer,
          hostel_id: data.Hostel_Id,
          comments: comments,
          advance_return: advanceamount,
          reinburse:Reinburse  // click ==> 1 or 0
        }
      })
    }
  
    setSelectedCustomer('');
    setCurrentBed('')
    setCurrentFloor('')
    setNoticeDays('');
    setComments('');
    setCheckOutDate('');
    setCheckOutRequestDate('')
  }

  

  const customDateInput = (props) => {
    return (
      <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
        <FormControl
          type="text"
          className='date_input'
          value={props.value || 'DD/MM/YYYY'}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none"
          }}
        />
        <img
          src={Calender}
          style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };


  useEffect(()=>{
if(checkOutDate){
  const current_date = new Date();
    const notice_period = Math.ceil((new Date(checkOutDate) - current_date) / (1000 * 60 * 60 * 24));
    setNoticeDays(notice_period || 0);
}
  

  },[checkOutDate])



  return (<>
    <Modal show={show} onHide={handlecloseform} centered backdrop="static">
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title style={{ fontWeight: '600', fontSize: '18px', fontFamily: "Gilroy" }}>
          {data && checkoutaction ? 'Confirm Check-out'  : (currentItem && checkouteditaction ? 'Edit check-out' : 'Add Check-out')}</Modal.Title>
        <img
          src={Closecircle}
          alt="Close"
          style={{ cursor: 'pointer', width: '24px', height: '24px' }}
          onClick={handlecloseform}
        />
      </Modal.Header>
      {state.UsersList.errorMessageAddCheckOut && (
        <div className="d-flex align-items-center p-1 mb-2 mt-2">
          <MdError style={{ color: "red", marginRight: '5px' }} />
          <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
            {state.UsersList.errorMessageAddCheckOut}
          </label>
        </div>
      )}
      {isChangedError && (
        <div className="d-flex align-items-center p-1 mb-2 mt-2">
          <MdError style={{ color: "red", marginRight: '5px' }} />
          <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
            {isChangedError}
          </label>
        </div>
      )}
      {generalError && (
        <div className="d-flex align-items-center p-1 mb-2 mt-2">
          <MdError style={{ color: "red", marginRight: '5px' }} />
          <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
            {generalError}
          </label>
        </div>
      )}

      <Modal.Body>
        <div className='row row-gap-2'>
    
 {
            !checkoutaction && !checkouteditaction &&

          <div className='col-lg-12 col-md-12 col-sm-12 colxs-12'>
            <div className="form-group">
              <label className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Customer <span style={{ color: 'red', fontSize: '20px' }}>*</span></label>
              <Select
                styles={customStyles}
                value={formatOptions().find(opt => opt.value === selectedCustomer)}
                onChange={handleCustomerChange}
                options={formatOptions()}
                placeholder="Select a customer"
                isDisabled={checkouteditaction}
              />

              {customerWError && (
                <div className="d-flex align-items-center p-1 mb-2 mt-1">
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {customerWError}
                  </label>
                </div>
              )}


            </div>
          </div>
}


          {/* <div className='col-lg-6 col-md-6 col-sm-12 colxs-12'>
            <label htmlFor="check-out-date" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Check-out Date <span style={{ color: 'red', fontSize: '20px' }}>*</span></label>
            <div className='position-relative'>
              <input
                type="text"
                readOnly

                className="form-control mt-2"
                placeholder="DD-MM-YYYY"
                value={checkOutDate}
                onClick={() => calendarRef.current.flatpickr.open()}
                style={{ fontSize: 16, height: '50px', borderRadius: '8px', width: '220px', color: checkOutDate ? "#222" : "#4B4B4B", fontWeight: checkOutDate ? 600 : 500 }}
              />
              <img
                src={Calender}
                onClick={() => calendarRef.current.flatpickr.open()}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
                alt="Calendar Icon"
              />
              <Flatpickr
                ref={calendarRef}
                onChange={handleDateChange}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: "today"
                }}
                style={{
                  display: 'none',
                  padding: 15,
                  fontSize: 16,
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #D9D9D9",
                  position: 'absolute',
                  top: 100,
                  left: 100,
                  zIndex: 1000,
                }}
              />
            </div>
            {checkoUtDateError && (
              <div className="d-flex align-items-center p-1 mb-2 mt-2">
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {checkoUtDateError}
                </label>
              </div>
            )}

          </div> */}

<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Current Floor{" "}
                          {/* <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span> */}
                        </Form.Label>
                        <FormControl
                          id="form-controls"
                          placeholder="Enter name"
                          type="text"
                          value={currentFloor}
                        //   onChange={(e) => handleFirstName(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Current Bed{" "}
                          {/* <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span> */}
                        </Form.Label>
                        <FormControl
                          id="form-controls"
                          placeholder="Enter name"
                          type="text"
                          value={currentBed}
                        //   onChange={(e) => handleFirstName(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
                    </div>



          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-2" controlId="purchaseDate">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                Check-out Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
              </Form.Label>
              <div style={{ position: 'relative', width: "100%" }}>
                <DatePicker
                selected={checkOutDate instanceof Date ? checkOutDate : null}
                
                  onChange={(date) => {
                    setCheckOutDateError('');
                    setCheckOutDate(date);
                    calculateDateDifference(date, checkOutrequestDate);
                    setIsChangedError('')
                    setGeneralError('')
                  }}
                  dateFormat="dd/MM/yyyy"
                  maxDate={null}
                minDate={null}
                isDisabled={checkoutaction}
                  customInput={customDateInput({
                    value: checkOutDate instanceof Date ? checkOutDate.toLocaleDateString('en-GB') : '',
                  })}
                />
              </div>
            </Form.Group>
            {checkoUtDateError && (
              <div className="d-flex align-items-center p-1"style={{marginTop:"-6px" }}>
                <MdError style={{ color: "red", marginRight: '5px'}} />
                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {checkoUtDateError}
                </label>
              </div>
            )}

          </div>

          {
            !checkoutaction &&
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-2" controlId="purchaseDate">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                Request  Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
              </Form.Label>
              <div style={{ position: 'relative', width: "100%" }}>
                <DatePicker
                selected={checkOutrequestDate instanceof Date ? checkOutrequestDate : null}
                  onChange={(date) => {
                    setCheckOutRequestDateError('');
                    setCheckOutRequestDate(date);
                    calculateDateDifference(checkOutDate, date);
                    setIsChangedError('')
                    setGeneralError('')
                  }}
                 
                  dateFormat="dd/MM/yyyy"
                  maxDate={null}
                  minDate={null}
                  customInput={customDateInput({
                    value: checkOutrequestDate instanceof Date ? checkOutrequestDate.toLocaleDateString('en-GB') : '',
                  })}
                />
              </div>
            </Form.Group>
            {checkoUtrequestDateError && (
              <div className="d-flex align-items-center p-1 mb-2"style={{marginTop:"-6px" }}>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {checkoUtrequestDateError}
                </label>
              </div>
            )}

          </div>}

          {
            checkoutaction && 
            <>
  <div className='col-lg-6 col-md-6 col-sm-12 colxs-12 mt-2'>
           
           <div style={{display:'flex',flexDirection:'row'}}>
  <label htmlFor="Advance" style={{fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500}}>
  Advance Return
</label>
<div
  className="d-flex align-items-center ms-1"
  style={{ gap: 5 }} 
>
<input
  type="checkbox"
  style={{
    width: "16px",
    height: "16px",
    border: "2px solid #1E45E1", 
    borderRadius: "3px", 
    appearance: "auto", 
    cursor: "pointer", 
  }}
  onChange={handleCheckboxChange}
/>




  <p
    style={{
      margin: 0, 
      fontSize: 10,
      color: "#1E45E1",
      fontFamily: "Gilroy",
      fontWeight: 500,
    }}
  >
    Reimburse with Rent
  </p>
</div></div>

 
            <input
              type="text"
              name="Advance"
              id="Advance"
              value={advanceamount}
              // onChange={handleCommentsChange}
              className="form-control mt-2"
              placeholder="Add Advance amount"
              required
              style={{ height: '50px', borderRadius: '8px', fontSize: 16, color: comments ? "#222" : "#4b4b4b", fontFamily: "Gilroy", fontWeight: comments ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9" }}
            />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Due Invoice{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
      id="form-controls"
      placeholder="Enter invoice"
      type="text"
      value={`${invoicenumber}- ${dueamount}`} 
      readOnly
      style={{
        fontSize: 16,
        color: "#4B4B4B",
        fontFamily: "Gilroy",
        fontWeight: 500,
        boxShadow: "none",
        border: "1px solid #E7F1FF",
        height: 50,
        borderRadius: 8,
        backgroundColor: "#E7F1FF",
      }}
    />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
                    </div>
            </>
          }

        




         




          {/* <div className='col-lg-6 col-md-6 col-sm-12 colxs-12'>
            <label htmlFor="notice-days" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Notice Days</label>
            <Form.Group controlId="notice-days" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
              <Form.Control
                disabled
                value={noticeDays}
                type="text" placeholder="" style={{ fontSize: 16, color: "#222", fontFamily: "Gilroy", fontWeight: 600, boxShadow: "none", border: "1px solid #ced4da", height: 50, borderRadius: 8 }} />
            </Form.Group>
          </div> */}


          <div className='col-lg-12 col-md-12 col-sm-12 colxs-12'>
            <label htmlFor="comments" className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Comments</label>
            <input
              type="text"
              name="comments"
              id="comments"
              value={comments}
              onChange={handleCommentsChange}
              className="form-control mt-2"
              placeholder="Add Comments"
              required
              style={{ height: '50px', borderRadius: '8px', fontSize: 16, color: comments ? "#222" : "#4b4b4b", fontFamily: "Gilroy", fontWeight: comments ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9" }}
            />
          </div>

          {dateDifference !== null && (
        <div className="col-12 mt-3">
          <p
            style={{
              fontSize: 15,
              fontFamily: "Gilroy",
              fontWeight: 500,
              color: "#1E45E1",
            }}
          >
           ( Notice Days* - {dateDifference} days )
          </p>
        </div>
      )}
        </div>
        <Button  className="mt-4" 
          style={{ borderRadius: '8px', fontFamily: "Gilroy", fontWeight: '600', fontSize: '14px', padding: '16px 24px', 
            width: '100%',  backgroundColor: "#1E45E1"}}
  disabled={dueamount > 0}
  onClick={
    checkoutaction ? handleConfirmCheckout // Confirm Check-out
      : checkouteditaction 
        ? handleCheckOutCustomer // Save Changes 
        : handleCheckOutCustomer // Add Check-out
  }
>
  {data && checkoutaction 
    ? 'Confirm Check-out' 
    : (currentItem && checkouteditaction 
        ? 'Save Changes' 
        : 'Add Check-out')}
</Button>

    
      </Modal.Body>
    </Modal>

    

    </>
  );
};

export default CheckOutForm;
