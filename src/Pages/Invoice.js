import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Button, Offcanvas, Form, Dropdown, FormControl } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import Profile from '../Assets/Images/Profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import InvoiceDetail from './InvoiceDetails';
import MessageModal from './MessageModal';
import LoaderComponent from './LoaderComponent';
import CryptoJS from "crypto-js";



const InvoicePage = () => {


  const state = useSelector(state => state)
  const [editOption, setEditOption] = useState('')
  const dispatch = useDispatch()
  //offcanvas style
  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "",
    paddingLeft: "2px"
  };

  const bottomBorderStyles = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "3px",
    backgroundColor: "#F8F9FA",
    paddingLeft: "3px",
    borderRadius: "2px"
  };
  const [data, setData] = useState([]);
  //offcanvas variable
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [invoiceDetail, setInvoiceDetails] = useState(false)
  const [invoiceValue, setInvoiceValue] = useState("")

  const [file, setFile] = useState(null)
  const d = new Date();
  const [invoiceList, setInvoiceList] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    hostel_Name: '',
    hostel_Id: '',
    FloorNo: '',
    RoomNo: '',
    date: '',
    // total_amount: '',
    paymentType: '',
    amount: '',
    balanceDue: '',
    dueDate: '',
    payableAmount: '',
    InvoiceId: '',
    invoice_type: ''
  })

  console.log("invoiceList", invoiceList);

  const [invoicePage, setInvoicePage] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [selectedItems, setSelectedItems] = useState('')




  const handleInvoiceDetail = (item) => {
    setSelectedItems(item)
    if (item.User_Id) {
      const originalDate = new Date(item.Date);
      originalDate.setDate(originalDate.getDate());
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const day = originalDate.getDate().toString().padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;
      dispatch({ type: 'INVOICEPDF', payload: { Date: newDate, User_Id: item.User_Id, id: item.id } });
      setShowLoader(true);
    }
  };


  useEffect(() => {
    if (state.InvoiceList.statusCodeForPDf === 200) {
      dispatch({ type: 'INVOICELIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 100);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_PDF_STATUS_CODE' });
      }, 200);
    }
  }, [state.InvoiceList?.statusCodeForPDf]);


  useEffect(() => {
    dispatch({ type: 'INVOICELIST' })
    setData(state.InvoiceList.Invoice)
  }, [])


console.log("InvoiceList",state.InvoiceList);

  useEffect(() => {
    console.log("statuscode", state.InvoiceList.message);
    if (state.InvoiceList.message != "" && state.InvoiceList.message != null) {
      console.log("statuscode", state.InvoiceList.UpdateInvoiceStatusCode);
      dispatch({ type: 'INVOICELIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_UPDATE_LIST' });
      }, 100);
      setData(state.InvoiceList.Invoice)

    }
  }, [state.InvoiceList])


  useEffect(() => {
    const toTriggerPDF = state.InvoiceList?.toTriggerPDF;
    if (toTriggerPDF) {

      setTimeout(() => {
        let pdfWindow;
        const InvoicePDf = state.InvoiceList?.Invoice &&
          state.InvoiceList.Invoice.filter(view => view.User_Id == selectedItems.User_Id && view.id == selectedItems.id);
        if (InvoicePDf[0]?.invoicePDF) {
          pdfWindow = window.open(InvoicePDf[0]?.invoicePDF, '_blank');
          if (pdfWindow) {
            setShowLoader(false);
          }


        } else {
          // setShowLoader(true);
        }
      }, 0);
    } else {
      console.log("to trigger pdf is false so pdf not working");
    }
  }, [state.InvoiceList?.Invoice, state.InvoiceList?.toTriggerPDF]);




  const handleInvoiceback = (isVisible) => {
    setInvoiceDetails(isVisible)
  }



  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])


  const LoginId = localStorage.getItem("loginId")

  const [loginID, setLoginID] = useState('')




  console.log("data", data)



  // useEffect(() => {
  //     dispatch({ type: 'INVOICELIST' })
  //     setData(state.InvoiceList.Invoice)
  //       }, [state.InvoiceList.Invoice])

  console.log("invoice list", state);




  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [filtericon, setFiltericon] = useState(false)

  const [statusfilter, setStatusfilter] = useState('')

  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handlePhoneNo = (e) => {
    const result = e.target.value.replace(/\D/g, '');
    const phoneError = document.getElementById("phoneError");
    setInvoiceList({ ...invoiceList, phone: result })
    if (result.length < 10) {
      phoneError.textContent = "Please put 10 digit mobile number";
    }
    else {
      phoneError.textContent = "";
    }
  }

  const handleEmailID = (e) => {
    const emailID = e.target.value;
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailID)) {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "Invalid email format";
    } else {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "";
    }

  }

  // pagination
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
  };


  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };



  const handleClose = () => {
    setInvoiceList({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      hostel_Name: '',
      hostel_Id: '',
      FloorNo: '',
      RoomNo: '',
      amount: '',
      balanceDue: '',
      dueDate: '',
      // total_amount:'',
      paymentType: ''
    })
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };




  const handleShow = (item) => {
    setInvoiceValue(item);
    if (item.id !== undefined) {
      setEditOption('Edit');
      const dateObject = new Date(item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;

      // const EditCheck = state.InvoiceList.Invoice.find(view => view.User_Id === item.User_Id && view.BalanceDue === 0 && view.Date.includes(`${year}-${month}`));
      const EditCheck = state.InvoiceList.Invoice.find(view => {
        const viewDate = new Date(view.Date);
        return (
          view.User_Id === item.User_Id &&
          view.BalanceDue === 0 &&
          viewDate.getFullYear() === year &&
          viewDate.getMonth() === month - 1
        );
      });


      setShowMenu(true);
      setShowForm(true);
      let value = item.Name.split(" ");
      setSelectedUserId(item.User_Id);
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setInvoiceList({
        id: item.id,
        firstName: value[0],
        lastName: value[1],
        phone: item.phoneNo,
        email: item.EmailID,
        hostel_Name: item.Hostel_Name,
        hostel_Id: item.Hostel_Id,
        FloorNo: item.Floor_Id,
        RoomNo: item.Room_No,
        date: formattedDate,
        // total_amount: Number(item.Amount)+Number(item.AmnitiesAmount)+Number(item.EbAmount),
        amount: item.Amount,
        paidAmount: item.PaidAmount,
        balanceDue: item.BalanceDue == 0 ? '00' : item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: item.Invoices,
        invoice_type: item.invoice_type
      });
      // }
    } else {
      setEditOption('Add');
      setSelectedUserId('');
      setShowForm(true);
      setUserClicked(true);
      setShowMenu(true);
    }
  };


  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePageSelect = (eventKey) => {
    const selectedPage = parseInt(eventKey, 10);
    setCurrentPage(selectedPage);
  };

  const [searchItem, setSearchItem] = useState('')
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchItem != '') {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems.slice(indexOfFirstItem, indexOfLastItem))
    }
    else {
      setData(state.InvoiceList.Invoice)
    }
  }

  const [searchicon, setSearchicon] = useState(false);

  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }
  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: invoiceList.hostel_Id } });
  }, [invoiceList.hostel_Id])
  const handleHostelId = (e) => {
    const hostelName = state.UsersList?.hostelList.filter((item) => {
      return item.id == e.target.value
    })
    const hosName = hostelName[0].Name
    setInvoiceList({ ...invoiceList, hostel_Name: hosName, hostel_Id: e.target.value, RoomNo: '', FloorNo: '' })


  }

  const handleFloor = (e) => {
    setInvoiceList({ ...invoiceList, FloorNo: e.target.value })

  }
  useEffect(() => {
    dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: invoiceList.hostel_Id, floor_Id: invoiceList.FloorNo } })
  }, [invoiceList.FloorNo])

  const handleRooms = (e) => {
    setInvoiceList({ ...invoiceList, RoomNo: e.target.value })

  }


  const [updatemessage, setUpdatemessage] = useState('')

  useEffect(() => {
    setUpdatemessage(state.InvoiceList.message)
  }, [state.InvoiceList.message])



  const handleSaveInvoiceList = () => {
    const invoiceNo = randomNumberInRange(invoiceList.hostel_Name, 1, new Date())
    const CheckInvoiceNo = state.InvoiceList?.Invoice.some(item =>
      item.User_Id === selectedUserId && item.Invoices !== undefined
    );



    if (invoiceList.InvoiceId && invoiceList.payableAmount) {
      dispatch({
        type: 'UPDATEINVOICEDETAILS',
        payload: {
          id: invoiceList.id,
          invoice_id: invoiceList.InvoiceId,
          invoice_type: invoiceList.invoice_type,
          amount: invoiceList.payableAmount,
          balance_due: invoiceList.balanceDue
        }
      });

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Update Successfully",
          confirmButtonText: "ok"
        });
      }, 300);
      setShowMenu(false);
      setShowForm(false);
    }


    else {
      Swal.fire({
        icon: "warning",
        title: 'Please Enter All Field',
        confirmButtonText: "ok"
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }


  }







  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }

  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setData(state.InvoiceList.Invoice.slice(indexOfFirstItem, indexOfLastItem))
    }
    else {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
  }

  const randomNumberInRange = (hostelName, min, max) => {
    const prefix = hostelName.slice(0, 4)
    const invoice = prefix + (Math.floor(Math.random()
      * (max - min + 1)) + min);
    return invoice
  };





  const userIds = state.UsersList?.Users?.filter(item => item.User_Id !== '');


  const [selectedUserId, setSelectedUserId] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);


  const handleUserIdChange = (e) => {
    setSelectedUserId(e.target.value);

  };




  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users.find(item => item.User_Id === selectedUserId);
      if (filteredDetails) {
        setFilteredUserDetails([filteredDetails]);
        setInvoiceList({
          ...invoiceList,
          firstName: filteredDetails.Name.split(' ')[0] || '',
          lastName: filteredDetails.Name.split(' ')[1] || '',
          phone: filteredDetails.Phone || '',
          email: filteredDetails.Email || '',
          hostel_Name: filteredDetails.HostelName || '',
          hostel_Id: filteredDetails.Hostel_Id || '',
          FloorNo: filteredDetails.Floor || '',
          RoomNo: filteredDetails.Rooms || '',
          // dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
        });
      } else {
        setFilteredUserDetails([]);
      }
    } else {
      setFilteredUserDetails([]);
    }
  }, [selectedUserId, state.UsersList?.Users, state.InvoiceList?.Invoice]);

  // const [displayText, setDisplayText] = useState(false)
  const [isSaveDisabled, setIsSaveDisabled] = useState(false)
  const [totalPaidAmount, setTotalPaidAmount] = useState('')





  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0);
    const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
    const selectedMonth = selectedDate.getMonth();
    const roomRent = filteredUserDetails[0]?.RoomRent;
    const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter(item => {
      const itemDate = new Date(item.Date);
      const itemMonth = itemDate.getMonth();
      return itemMonth === selectedMonth && item.User_Id === selectedUserId;
    });

    let totalPaidAmount = 0;
    AlreadyPaidRoomRent.forEach(item => {
      const paidAmount = parseFloat(item.Amount) || 0;
      totalPaidAmount += paidAmount;
    });

    const isRoomRentPaid = roomRent === totalPaidAmount;
    // setDisplayText(isRoomRentPaid);
    setIsSaveDisabled(isRoomRentPaid);

    setInvoiceList(prevState => ({
      ...prevState,
      date: e.target.value,
      dueDate: formattedDueDate,
    }));
  }

  const handleAmount = (e) => {
    const AmountValue = e.target.value.trim() !== "" ? parseFloat(e.target.value) : "";
    console.log("AmountValue", AmountValue);
    const selectedDate = new Date(invoiceList.date);
    const selectedMonth = selectedDate.getMonth();
    const roomRent = filteredUserDetails[0]?.RoomRent;
    console.log("roomRent", roomRent);

    const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter(item => {
      const itemDate = new Date(item.Date);
      const itemMonth = itemDate.getMonth();
      return itemMonth === selectedMonth && item.User_Id === selectedUserId;
    });



    let totalPaidAmount = 0;
    AlreadyPaidRoomRent.forEach(item => {
      const paidAmount = parseFloat(item.Amount) || 0;
      totalPaidAmount += paidAmount;
    });


    setTotalPaidAmount(totalPaidAmount)

    if (!isNaN(AmountValue) && !isNaN(invoiceList.amount) && !isNaN(invoiceList.paidAmount) && !isNaN(invoiceList.balanceDue)) {

      var total_amount = invoiceList.amount; // Total Amount values
      var paid_amount = invoiceList.paidAmount; // Already Paid Amount
      var payablAmount = AmountValue; // New Amount
      var balance_due = invoiceList.balanceDue; // Balance Amount

      // Calculate the new total paid amount
      var cal1 = paid_amount + payablAmount;

      // Calculate the new balance due
      var new_balance_due = total_amount - cal1;
      // Validate the new amount to ensure it does not exceed the remaining balance
      if (total_amount < cal1) {
        console.log("This is Not crt value");
      } else {
        // Update the invoice list with the new payable amount and balance due
        setInvoiceList(prevState => ({
          ...prevState,
          payableAmount: payablAmount,
          balanceDue: new_balance_due,
        }));
      }
    }
  };

  const [showModal, setShowModal] = useState(false);


  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <>


      {invoiceDetail ?
        <>

          <InvoiceDetail sendInvoiceDetail={invoicePage} handleInvoiceback={handleInvoiceback} />
        </> : <>
          <div class=' ps-3 pe-3' style={{ marginTop: "20px", position: "relative" }} >

            <div class="row g-0" style={{ width: "100%" }}>
              <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
                <div class="pt-1 ps-0" >
                  <h6 style={{ fontSize: "16px" }}>Invoices</h6>
                </div>
              </div>
              <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="p-1 d-flex justify-content-end align-items-center"  >

                  {showLoader && <LoaderComponent />}
                  {
                    searchicon &&
                    <>
                      <input
                        type="text"
                        value={searchItem}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='Search By Name'
                        class="form-control ps-4 pe-1   searchinput"
                        style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

                      />
                    </>
                  }
                  <BsSearch class=" me-4" onClick={handleiconshow} />
                  {
                    filtericon &&
                    <>
                      <select value={statusfilter} onChange={(e) => handleStatusFilter(e)}
                        class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
                      >
                        <option selected value="ALL"> ALL</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </>
                  }
                  <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
                  {/* <button type="button" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Invoice</button> */}
                </div>
              </div>
              <div>
              </div>
            </div>



            <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>
              <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >{editOption == 'Add' ? "Add Invoice" : "Edit Invoice"}</Offcanvas.Title>
              <Offcanvas.Body>
                <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
                  <div class="p-1 bd-highlight user-menu">
                    <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
                      User Details
                    </ul>
                  </div>
                </div>
                {showForm && (
                  <Form>
                    <p style={{ textAlign: 'center', marginTop: '-25px', marginBottom: 2 }}>Upload Profile</p>
                    <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                      {file ? <>
                        <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                      </> :
                        <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                      }
                      <label htmlFor="imageInput" className=''>
                        <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        id="imageInput"
                        onChange={handleImageChange}
                        style={{ display: "none" }} />
                    </div>
                    <div className='container' style={{ marginTop: "30px" }}>
                      {/* {displayText && (
                        <div className="row mb-3">
                          <div className="col-lg-12">
                            <label style={{ color: "red", fontSize: "14px", fontWeight: 700 }}>This user has already paid the room rent.</label>
                          </div>
                        </div>
                      )} */}

                      <div className="row mb-3">
                        <div className='col-lg-12 col-12 col-md-12'>
                          <Form.Label style={{ fontSize: "12px", marginRight: 10 }}>User ID:</Form.Label>
                          <Form.Label
                            disabled={editOption == 'edit'}
                          >{invoiceValue.User_Id}</Form.Label>
                          {/* <Form.Select aria-label="Default select example" style={bottomBorderStyles}
                            // value={selectedUserId}
                            value={invoiceValue.User_Id}
                            disabled={editOption == 'edit'}
                            onChange={handleUserIdChange} >
                            <option>Select User Id</option>
                            {
                              userIds && userIds.map((item) => {
                                return (
                                  <>
                                    <option value={item.id}>{item.User_Id}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select> */}

                        </div>
                      </div>

                      {/* {filteredUserDetails.length > 0 && filteredUserDetails.map((item) => ( */}
                      <>
                        <div className='row'>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                              <FormControl
                                type="text"
                                value={invoiceList.firstName}
                                // value={editOption == 'Add' ? item.Name.split(' ')[0] : invoiceList.firstName}
                                onChange={(e) => { setInvoiceList({ ...invoiceList, firstName: e.target.value }) }}
                                style={bottomBorderStyle}
                                disabled
                              />
                            </Form.Group>
                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Last Name</Form.Label>
                              <FormControl
                                type="text"
                                disabled
                                value={invoiceList.lastName}
                                // value={editOption == 'Add' ? item.Name.split(' ')[1] : invoiceList.lastName}
                                onChange={(e) => { setInvoiceList({ ...invoiceList, lastName: e.target.value }) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Phone Number</Form.Label>
                              <FormControl
                                type="text"
                                disabled
                                value={invoiceList.phone}
                                // value={editOption == 'Add' ? item.Phone : invoiceList.phone}
                                onChange={(e) => { handlePhoneNo(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                            <p id='phoneError' style={{ color: 'red', fontSize: 14 }}></p>
                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Email ID</Form.Label>
                              <FormControl
                                type="email"
                                disabled
                                value={invoiceList.email}
                                // value={editOption == 'Add' ? item.Email : invoiceList.email}
                                onChange={(e) => { handleEmailID(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                            <p id='emailError' style={{ color: 'red', fontSize: 14 }}></p>
                          </div>

                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-12'>
                            <Form.Label style={{ fontSize: "12px" }}>User PG</Form.Label>
                            <Form.Select aria-label="Default select example"
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.hostel_Id}
                            // value={editOption == 'Add' ? item.HostelName : invoiceList.hostel_Id} onChange={(e) => handleHostelId(e)} 
                            >
                              <option>Select hostel</option>
                              <option selected>{invoiceList.hostel_Id}</option>

                              {/* {editOption == 'Add' ?

                                <option selected>{item.HostelName}</option>

                                :
                                state.UsersList?.hostelList?.map((item) => {
                                  return (
                                    <>
                                      <option value={item.id}>{item.Name}</option>
                                    </>
                                  )
                                })

                              } */}

                            </Form.Select>

                          </div>
                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-6'>
                            <Form.Label style={{ fontSize: "12px" }}>User Floor</Form.Label>
                            <Form.Select aria-label="Default select example"
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.FloorNo}
                            // value={editOption == 'Add' ? item.Floor : invoiceList.FloorNo} onChange={(e) => handleFloor(e)}
                            >
                              <option>Selected Floor</option>
                              <option selected>{invoiceList.FloorNo}</option>
                              {/* {editOption == 'Add' ?

                                <option selected>{item.Floor}</option>
                                :
                                state.UsersList?.hosteldetailslist
                                  ?.filter((item, index, array) => array.findIndex(i => i.Floor_Id === item.Floor_Id) === index)
                                  .map((u) => (
                                    <option key={u.Floor_Id}>{u.Floor_Id}</option>
                                  ))
                              } */}
                            </Form.Select>

                          </div>
                          <div className='col-lg-6'>
                            <Form.Label style={{ fontSize: '12px' }}>User Room</Form.Label>
                            <Form.Select
                              aria-label='Default select example'
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.RoomNo}
                              // value={editOption == 'Add' ? item.Rooms : invoiceList.RoomNo}
                              onChange={(e) => handleRooms(e)}
                            >
                              <option>Selected Room</option>
                              <option selected>{invoiceList.RoomNo}</option>
                              {/* {editOption == 'Add' ?

                                <option selected>{item.Rooms}</option>
                                :
                                state.UsersList?.roomdetails
                                  ?.filter((item, index, self) => self.findIndex((i) => i.Room_Id === item.Room_Id) === index)
                                  .map((item) => (
                                    <option key={item.Room_Id}>{item.Room_Id}</option>
                                  ))} */}
                            </Form.Select>

                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-6 col-12 col-md-12' >
                            <Form.Label style={{ fontSize: "12px" }}>Select Date</Form.Label>
                            <FormControl
                              className='position-sticky'
                              type="date"
                              value={invoiceList.date}
                              onChange={(e) => { handleDateChange(e) }}
                              style={bottomBorderStyle}
                            // disabled={displayText}
                            />
                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Amount</Form.Label>
                              <FormControl
                                type="text"
                                value={invoiceList.amount}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>


                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}> Payable Amount</Form.Label>
                              <p style={{ fontSize: "10px" }}>Already you have paid <b>RS.{invoiceList.paidAmount == 0 ? '0' : invoiceList.paidAmount}</b></p>
                              <FormControl
                                type="text"
                                value={invoiceList.payableAmount}
                                onChange={(e) => { handleAmount(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>

                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Balance Due</Form.Label>
                              <h1 style={{ fontSize: "12px", backgroundColor: "#F6F7FB", padding: 15 }}>{invoiceList.balanceDue}</h1>
                            </Form.Group>
                          </div>
                        </div>


                      </>
                      {/* ))} */}

                    </div>

                    <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                      <Button variant="white" size="sm" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant={isSaveDisabled ? "outline-secondary" : "outline-primary"} size="sm" style={{ backgroundColor: isSaveDisabled && "gray", color: isSaveDisabled && "white", borderRadius: "20vh", width: "80px" }}
                        onClick={handleSaveInvoiceList}
                        disabled={isSaveDisabled}
                      >
                        {editOption === 'Add' ? "Save" : "Update"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Offcanvas.Body>
            </Offcanvas>



            {/* <MessageModal show={displayText} handleClose={toggleDisplayText} /> */}




            <Table responsive >
              <thead class='pt-0' style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
                <tr style={{}}>
                  <th style={{ color: "#91969E" }} >ID</th>
                  <th style={{ color: "#91969E" }} >Date</th>
                  <th style={{ color: "#91969E" }} >Invoices#</th>
                  <th style={{ color: "#91969E" }} >Name & Phone</th>
                  <th style={{ color: "#91969E" }} >HostelName</th>
                  <th style={{ color: "#91969E" }} >Floor</th>
                  <th style={{ color: "#91969E" }} >Room</th>
                  <th style={{ color: "#91969E" }} >Bed</th>
                  <th style={{ color: "#91969E" }} >Amount</th>
                  <th style={{ color: "#91969E" }} >Due Amount</th>
                  <th style={{ color: "#91969E" }} >Due Date</th>
                  <th style={{ color: "#91969E" }} >Record Payment</th>
                  {/* <th style={{ color: "#91969E" }} >Action</th> */}
                </tr>
              </thead>
              <tbody style={{ fontSize: "10px" }}>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ color: "black", fontWeight: 500 }} >{item.id}</td>
                    <td style={{ color: "black", fontWeight: 500 }} >{moment(item.Date).format('DD/MM/YY')}</td>
                    <td style={{ color: "#0D99FF", fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleInvoiceDetail(item)}>{item.Invoices == null || item.Invoices == '' ? '0.00' : item.Invoices}</td>
                    <td style={{ color: "#0D99FF", fontWeight: 600 }}>
                      <div class="d-flex">
                        {/* <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name && item.Name.split(" ")[0].slice(0, 1, 0)}{item.Name.split(" ")[1].slice(0, 1, 0)}</p></span> */}
                        <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name && item.Name.split(" ")[0].slice(0, 1, 0).toUpperCase()}{item.Name.split(" ")[1] && item.Name.split(" ")[1].slice(0, 1).toUpperCase()}</p></span>

                        <div class="ms-2">
                          <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
                          <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.phoneNo}</label>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.Hostel_Name}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.Floor_Id}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.Room_No}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.Bed}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.Amount}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{item.BalanceDue}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{moment(item.DueDate).format('DD/MM/YY')}</td>
                    <td style={item.BalanceDue == 0 ? { color: "green", fontWeight: 700 } : { color: "red", fontWeight: 700 }}>{item.BalanceDue == 0 ? "Paid" : <img class="ms-1" src={Edit} height="20" width="20" alt='Edit' onClick={() => { handleShow(item) }} />}</td>
                    {/* <td class="justify-content-between">
                      <img src={List} height="20" width="20" alt='List' onClick={() => handleInvoiceDetail(item)} /> */}
                    {/* <img class="ms-1" src={Edit} height="20" width="20" alt='Edit' onClick={() => { handleShow(item) }} /> */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
                </div>
                <Dropdown onSelect={(eventKey) => handlePageSelect(eventKey)}>
                  <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
                    {currentPage} - {currentPage}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {generatePageNumbers().map((page) => (
                      <Dropdown.Item key={page} eventKey={page}>
                        {currentPage} - {page}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
                  of <label>{currentPage}</label>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
                  Prev
                </div>
                <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
                <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
                  Next
                </div>
              </div>
            </div>




          </div>

        </>

      }





    </>
  );
};

export default InvoicePage;
