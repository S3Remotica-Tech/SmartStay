import React, { useRef, useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import Button from 'react-bootstrap/Button';
import { Dropdown, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import { BsExclamationOctagonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AmenitiesView from '../Pages/AmenitiesView'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import "./Amenities.css";
import dottt from "../Assets/Images/Group 14.png"
import Swal from 'sweetalert2';
import { MdError } from "react-icons/md"; 
import EmptyState from '../Assets/Images/New_images/empty_image.png';

function Amenities() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const initialValuesRef = useRef({});

  useEffect(() => {
    dispatch({ type: 'AMENITIESLIST' })
    dispatch({ type: 'HOSTELLIST' })
  }, [])


  const loginId = localStorage.getItem('loginId');
  const [createdby, setCreatedby] = useState('')



  const [showModal, setShowModal] = useState(false);
  const [id, setID] = useState('')
  const [amenitiesName, setAmenitiesName] = useState('')
  const [amount, setAmount] = useState('')
  const [active, setActive] = useState(false)
  const [edit, setEdit] = useState('')
  const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
  const [status, setStatus] = useState('')
  const [showTable, setShowTable] = useState(false)
  const [filteredamenities, setFilteredAmenities] = useState([])
  const [hostelerrormsg, setHostelErrmsg] = useState('');
  const [amenityerrormsg, setAmenityErrmsg] = useState('');
  const [amounterrormsg, setAmountErrmsg] = useState('');
  const [totalErrormsg ,setTotalErrmsg]= useState('')
  const [amenitiesrolePermission, setAmenitiesRolePermission] = useState("");
  const [amenitiespermissionError, setAmenitiesPermissionError] = useState("");
  const [amenitiesAddPermission,setAmenitiesAddPermission]= useState("")
  const [amenitiesDeletePermission,setAmenitiesDeletePermission]=useState("")
  const [amenitiesEditPermission,setAmenitiesEditPermission]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedhostel, setSelecteDHostel] = useState('');
  const [show, setShow] = useState(false);
  const [edithostelId, setEdithostelId] = useState()


  useEffect(() => {
    setAmenitiesRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      amenitiesrolePermission[0]?.is_owner == 1 ||
      amenitiesrolePermission[0]?.role_permissions[18]?.per_view == 1
    ) {
      setAmenitiesPermissionError("");
    } else {
      setAmenitiesPermissionError("Permission Denied");
    }
  }, [amenitiesrolePermission]);



  useEffect(() => {
    if (
      amenitiesrolePermission[0]?.is_owner == 1 ||
      amenitiesrolePermission[0]?.role_permissions[18]?.per_create == 1
    ) {
      setAmenitiesAddPermission("");
    } else {
      setAmenitiesAddPermission("Permission Denied");
    }
  }, [amenitiesrolePermission]);


  useEffect(() => {
    if (
      amenitiesrolePermission[0]?.is_owner == 1 ||
      amenitiesrolePermission[0]?.role_permissions[18]?.per_delete == 1
    ) {
      setAmenitiesDeletePermission("");
    } else {
      setAmenitiesDeletePermission("Permission Denied");
    }
  }, [amenitiesrolePermission]);
  useEffect(() => {
    if (
      amenitiesrolePermission[0]?.is_owner == 1 ||
      amenitiesrolePermission[0]?.role_permissions[18]?.per_edit == 1
    ) {
      setAmenitiesEditPermission("");
    } else {
      setAmenitiesEditPermission("Permission Denied");
    }
  }, [amenitiesrolePermission]);

  const handleHostelChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setShowTable(true)
    setSelectedHostel({
      id: e.target.value,
      name: e.target.options[selectedIndex].text
    });
   
  };


  useEffect(() => {
    const filteredamenities = state.InvoiceList.AmenitiesList.filter(item => item.Hostel_Id == selectedHostel.id);
    setFilteredAmenities(filteredamenities);

    setTimeout(() => {
      dispatch({ type: 'CLEAR_AMENITIES_STATUS_CODE' })
    }, 1000)

  }, [state.InvoiceList.StatusCodeAmenitiesGet, selectedHostel])



  const handleAmenitiesChange = (event, newValue) => {
    setTotalErrmsg('')
    if (!event.target.value) {
      setAmenityErrmsg("Please Enter Amenity");
    } else {
      setAmenityErrmsg("");
    }
    setAmenitiesName(event.target.value);
  };

  const handleInputChange = (event, newInputValue) => {
    setAmenitiesName(newInputValue);
  };




  const handleAmountChange = (e) => {
    setTotalErrmsg('')
    if (!e.target.value) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
    }
    setAmount(e.target.value)

  }

  const handleSetAsDefault = (e) => {
    setActive(e.target.checked);
  }

  const handleShowModal = () => {
    setShowModal(true);
    setEdit('ADD')
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }


  const handleChange = (e) => {
    setStatus(e.target.value);
  };


  // const handleAmenitiesSetting = () => {
  //     const setAsDefault = active || false;
  //     if (edit === 'EDIT') {
  //         dispatch({ type: 'AMENITIESUPDATE', payload: { id: id, Amount: amount, setAsDefault: setAsDefault, Status: status, Hostel_Id: selectedHostel.id } })
  //         setAmenitiesName('')
  //         setAmount('')
  //         setActive('')
  //         setStatus('')
  //         handleCloseModal()
  //     } else {
  //         dispatch({ type: 'AMENITIESSETTINGS', payload: { id: id, AmenitiesName: amenitiesName, Amount: amount, setAsDefault: setAsDefault, Hostel_Id: selectedHostel.id, Status: status} })
  //         setAmenitiesName('')
  //         setAmount('')
  //         setActive('')
  //         setStatus('')
  //         handleCloseModal()
  //     }


  // }
  

  const handleHostelClick = (e) => {
    setTotalErrmsg('')
    if (!e.target.value) {
      setHostelErrmsg("Please Select Hostel");
    } else {
      setHostelErrmsg("");
    }
    setSelecteDHostel(e.target.value)
  };


  const handleEdit = (item) => {
    setShow(true);

    setEdit('EDIT')
    setID(item.Amnities_Id)
    setEdithostelId(item.Hostel_Id)
    setSelecteDHostel(item.Name)
    setAmenitiesName(item.Amnities_Name)
    setAmount(item.Amount)
    setActive(item.setAsDefault)
    setStatus(item.Status)

    initialValuesRef.current = {
      hostelname: item.Name,
      Amenityname: item.Amnities_Name,
      Amount: item.Amount,
      Active: item.setAsDefault,
      Status: item.Status
    };

  }

  let hasChanges = selectedhostel !== initialValuesRef.current.hostelname ||
                   amenitiesName !== initialValuesRef.current.Amenityname || 
                   amount !== initialValuesRef.current.Amount || 
                   active !== initialValuesRef.current.Active || 
                   status !== initialValuesRef.current.Status 

  

  const handleShow = () => {
    // setEdit(false)
    setShow(true);
  }


 





  const handleClose = () => {
    setShow(false)
    setSelecteDHostel('')
    setAmenitiesName('');
    setAmount('');
    // setAsDefault('')
    setActive('');
    setStatus('')
  }


  const handleAmenitiesSetting = () => {
    const setAsDefault = active || false;

    if (!selectedhostel  ) {
      setHostelErrmsg('Please Select Hostel')  
    }
    if (!amenitiesName  ) {
      setAmenityErrmsg("Please Enter Amenity") 
    }
    if (!amount  ) {
      setAmountErrmsg("Please Enter Amount") 
    }
  
    if (!selectedhostel && !amenitiesName && !amount ) {
      setTotalErrmsg('Please Enter All Field') 
     return; 
  }

    if (id && hasChanges) {
      dispatch({ type: 'AMENITIESUPDATE', payload: { id: id, amenitiesName: amenitiesName, Amount: amount, setAsDefault: setAsDefault, Status: status, Hostel_Id: edithostelId } });
      handleClose()
      setSelecteDHostel('')
      setAmenitiesName('');
      setAmount('');
      // setAsDefault('')
      setActive('');

    }

    else if (amenitiesName && amount && selectedhostel) {
      dispatch({ type: 'AMENITIESSETTINGS', payload: { amenitiesName: amenitiesName, Amount: amount, setAsDefault: setAsDefault, Hostel_Id: selectedhostel ,hostel_id: selectedhostel,} });

      setSelecteDHostel('')
      setAmenitiesName('');
      setAmount('');
      // setAsDefault('')
      setActive('');
    }

  }

  useEffect(() => {
    if (state.InvoiceList?.statusCode === 200 || state.InvoiceList?.AmenitiesUpdateStatusCode == 200) {
      dispatch({ type: 'AMENITIESLIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
      }, 1000)
    }

  }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])


  const TurnOn = state.InvoiceList?.Amenities?.map((item) => {
    return item
  })


  const uniqueOptions = Array.from(new Set(state?.InvoiceList?.AmenitiesList.map((item) => item.Amnities_Name)));

  const rowsPerPage = 10;
  

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = state?.InvoiceList?.AmenitiesList.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(state?.InvoiceList?.AmenitiesList.length / rowsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    if (currentPage === 2) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === currentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === currentPage ? 'transparent' : 'transparent',
                border: i === currentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (

    <>
{
  amenitiespermissionError ? (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // height: "100vh",
    }}
  >
    {/* Image */}
    <img
      src={EmptyState}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {/* Permission Error */}
    {amenitiespermissionError && (
      <div
        style={{
          color: "red",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <MdError size={20} />
        <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{amenitiespermissionError}</span>
      </div>
    )}
  </div>
  ):
  <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
  <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>
    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
          Select Hostel
        </Form.Label>
        <Form.Select aria-label="Default select example"
          className='border' value={selectedhostel} onChange={(e) => handleHostelClick(e)} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

          <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
          {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
            <>
              <option key={item.id} value={item.id} >{item.Name}</option></>
          ))}

        </Form.Select>
        {hostelerrormsg.trim() !== "" && (
        <div>
   <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
{hostelerrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{hostelerrormsg}</span>
</p>
</div>
)}
      </Form.Group>

    </div>
    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12' style={{ border: '1px solid #ced4da', padding: '30px', borderRadius: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
            >
              Amenity
            </Form.Label>
            <Form.Control
              style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
              type="text"
              placeholder="Enter amenity"
              value={amenitiesName}
              onChange={handleAmenitiesChange}

            />
                      {amenityerrormsg.trim() !== "" && (
        <div>
   <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
{amenityerrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{amenityerrormsg}</span>
</p>
</div>
)}
          </Form.Group>
        </div>

        <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
            >
              Set Amount
            </Form.Label>
            <Form.Control
              style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => handleAmountChange(e)}

            />
                      {amounterrormsg.trim() !== "" && (
        <div>
   <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
{amounterrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{amounterrormsg}</span>
</p>
</div>
)}
          </Form.Group>
        </div>

        <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
          <div className='d-flex justify-content-between  ps-2 pe-2 '>
            <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 600 }} >Set as Default</label>
            <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
          </div>
        </div>

      </div>
      {totalErrormsg.trim() !== "" && (
        <div>
   <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
{totalErrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{totalErrormsg}</span>
</p>
</div>
)}
      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <Button className='col-lg-11 col-md-12 col-sm-12 col-xs-12' disabled={amenitiesAddPermission} onClick={handleAmenitiesSetting} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12 }}>
          Save Changes</Button>
      </div>

    </div>
  </div>

  <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} />

  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0">
    <Table className="ebtable mt-3" responsive  >
      <thead style={{ backgroundColor: "#E7F1FF",  position:"sticky",
                top:0,
                zIndex:1,}}>
        <tr>
        <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>
          <th className='ps-1 ps-lg-2' style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Paying guest</th>
          <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amenity</th>
          <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amount </th>
          <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Status</th>
          <th style={{ color: '#222', fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>

        </tr>
      </thead>
      <tbody style={{ height: "50px", fontSize: "11px" }}>

        {state.InvoiceList.AmenitiesList.length > 0 && state.InvoiceList.AmenitiesList.map((item) => (
          <AmenitiesView item={item} modalEditAmenities={handleEdit}  amenitiesEditPermission={amenitiesEditPermission}/>
        )
        )}
        {currentRows.length === 0 && (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", color: "red", fontSize: 14 }}>No data found</td>
          </tr>
        )}


      </tbody>
    </Table>



    {currentRows.length > 0 && (
      <nav>
        <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
          <li style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: currentPage === 1 ? '#ccc' : '#007bff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: "none"
              }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
              <ArrowLeft2 size="16" color="#1E45E1" />
            </button>
            {/* <span
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              marginTop: '20px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              color: currentPage === 1 ? '#ccc' : '#007bff'
            }}
          >
            Previous
          </span> */}
          </li>
          {currentPage > 3 && (
            <li style={{ margin: '0 5px' }}>
              <button
                style={{
                  padding: '5px 10px',
                  textDecoration: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  display: 'inline-block',
                  minWidth: '30px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: "none"
                }}
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
          )}
          {currentPage > 3 && <span>...</span>}
          {renderPageNumbers()}
          {currentPage < totalPages - 2 && <span>...</span>}
          {currentPage < totalPages - 2 && (
            <li style={{ margin: '0 5px' }}>
              <button
                style={{
                  padding: '5px 10px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  display: 'inline-block',
                  minWidth: '30px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: "none"
                }}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          )}
          <li style={{ margin: '0 5px' }}>
            {/* <span
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              marginTop: '20px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              color: currentPage === totalPages ? '#ccc' : '#007bff'
            }}
          >
            Next
          </span> */}
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: currentPage === totalPages ? '#ccc' : '#007bff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: "none"
              }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
              <ArrowRight2 size="16" color="#1E45E1" />
            </button>
          </li>
        </ul>
      </nav>
    )}

  </div>
</div>

}

     


      {show &&
        <div
          className="modal show"
          style={{
            display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={show}
            onHide={handleClose}
            centered>
            <Modal.Dialog style={{ maxWidth: 950, paddingRight: "10px", paddingRight: "10px", borderRadius: "30px" }} className='m-0 p-0'>


              <Modal.Body>
                <div>

                  <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                    <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Update Amenities</div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleClose}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '16px',
                        border: '1px solid black',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',

                      }}
                    >
                      <span aria-hidden="true" style={{
                        fontSize: '30px',
                        paddingBottom: "6px"

                      }}>&times;</span>
                    </button>

                    {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                  </Modal.Header>
                </div>

                <div className='row mt-4'>


                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Paying Guests
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Paying Guests"
                        value={selectedhostel}
                        readOnly
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Amenitiy Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Beds"
                        value={amenitiesName}
                        onChange={handleAmenitiesChange}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                  </div>



                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Amount
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Rooms"
                        value={amount}
                        onChange={(e) => handleAmountChange(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                                              {amounterrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {amounterrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{amounterrormsg}</span>
    </p>
  </div>
)}
                    </Form.Group>
                  </div>



                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222",
                          fontFamily: "'Gilroy'",
                          fontWeight: 500,
                          fontStyle: 'normal',
                          lineHeight: 'normal'
                        }}
                      >
                        Status
                      </Form.Label>

                      <Form.Select
                        aria-label="Default select example"
                        className="border"
                        value={status}
                        onChange={handleChange}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          lineHeight: '18.83px',
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8
                        }}
                      >
                        <option style={{ fontSize: 14, fontWeight: 600 }} value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </div>



                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Set as default</Form.Label>
                    <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer style={{ border: "none" }}>

                <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
                  onClick={handleAmenitiesSetting} disabled={!hasChanges}
                >
                  Update Ameniteies
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      }


      {/* <div className='container'>

          

            <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                      <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#222", fontStyle:'normal', lineHeight:'normal'}}>
                        Select Hostel
                      </Form.Label>
                    <Form.Select aria-label="Default select example" 
           className='border'     value={selectedhostel} onChange={(e) => handleHostelClick(e)}  style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                        <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                        {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                            <>
                                <option key={item.id} value={item.id} >{item.Name}</option></>
                        ))}

                    </Form.Select>
                </Form.Group>

            </div>

            <div className='col-lg-10 col-md-8 col-sm-12 col-xs-12' style={{ border: '1px solid #ced4da', padding: '30px', paddingRight: '100px', borderRadius: '20px' }}>
             

                  <>
                <div className='d-flex row ' style={{width:'auto'}}>
                  
                    
                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
                            >
                                Amenity
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '20px', marginTop: '10px' }}
                                type="text"
                                placeholder="Enter amenity"
                                value={amenitiesName}
                                onChange={handleAmenitiesChange}
                            
                            />
                        </Form.Group>
                    </div>

                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
                            >
                                Set Amount
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '20px', marginTop: '10px' }}
                                type="text"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => handleAmountChange(e)}
                            
                            />
                        </Form.Group>
                    </div>

              

                 
                </div>
                <div style={{display:'flex',flexDirection:'column'}} className='col-lg-8'>
                <div className='d-flex justify-content-between  ps-2 pe-2 '>
                         <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 600 }} >Set as Default</label>
                         <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                    </div>
               
                        </div>
          
            
            <div>
                <p style={{fontFamily:'Gilroy', fontSize: 16,fontWeight:600, color: "#1E45E1", fontStyle:'normal', lineHeight:'normal'}}>+ Add new amenity</p>
            </div>

           
        </>

                <div style={{ marginTop: '30px' }}>
                    <Button onClick={handleAmenitiesSetting} style={{fontFamily:'Montserrat', fontSize: 16,fontWeight:500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing:1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}> Save Changes</Button>
                </div>

            </div>


        </div> */}

    </>

    // <div className='Amenities'>
    //     <div className='d-flex justify-content-between'>

    //         <div>
    //             <h4 style={{ fontSize: 20, fontWeight: 600 }}>Amenities Settings</h4>
    //         </div>

    //         <div class="" >
    //             <Button variant="outline-primary" onClick={handleShowModal} style={{ width: "fit-content" }}><FaPlus className="me-1" />Create Amenities </Button>
    //         </div>

    //     </div>
    //     <div className='row'>
    //         <div className='col-lg-6 col-12'>
    //             <Form.Group className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, fontWeight: 600, }}>Select Hostel</Form.Label>
    //                 <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, fontWeight: 600, backgroundColor: "#E6EDF5" }}>

    //                     <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
    //                     {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((item) => (
    //                         <>
    //                             <option key={item.id} value={item.id} >{item.Name}</option></>
    //                     ))}

    //                 </Form.Select>
    //             </Form.Group>
    //         </div>
    //     </div>

    //     {showTable && <>
    //         <div class="table-responsive mt-4" style={{ width: "100%" }}>

    //             <table class="table text-center" >
    //                 <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
    //                     <tr >
    //                         {/* <th scope="col" style={{ textAlign: 'left' }}>Hostel Name</th> */}
    //                         <th scope="col">Amenities Name</th>
    //                         <th scope="col">Amount <BsExclamationOctagonFill className='ms-1' /></th>
    //                         <th scope="col">Set as Default <BsExclamationOctagonFill className='ms-1' /></th>
    //                         <th scope="col">Action</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody style={{ fontSize: 13 }}>

    //                     {filteredamenities.length > 0 && filteredamenities.map((item, index) => (
    //                         <AmenitiesView item={item} modalEditAmenities={handleEdit} selectedHostel={selectedHostel} />
    //                     ))}

    //                 </tbody>
    //             </table>
    //         </div>
    //     </>}






    //     <Modal show={showModal} onHide={handleCloseModal} centered>
    //         <Modal.Header closeButton style={{ backgroundColor: "#F5F5FF" }} className="text-center">
    //             <Modal.Title style={{ fontSize: 18 }} className="text-center">{edit === 'EDIT' ? 'Update Amenities' : 'Create Amenities'}</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body >
    //             <div className='mb-3 ps-2  pe-2'>
    //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select PG</label>
    //                 <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>

    //                     <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
    //                     {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((item) => (
    //                         <>
    //                             <option key={item.id} value={item.id} >{item.Name}</option></>
    //                     ))}

    //                 </Form.Select>
    //             </div>


    //             <div className='mb-3 '>
    //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amenities Name</label>
    //                 <Autocomplete
    //                     value={amenitiesName}
    //                     onChange={handleAmenitiesChange}
    //                     onInputChange={handleInputChange}
    //                     label='Amenities'
    //                     id="free-solo-dialog-demo"
    //                     options={uniqueOptions}
    //                     selectOnFocus
    //                     clearOnBlur
    //                     disabled={edit === 'EDIT'}
    //                     handleHomeEndKeys
    //                     renderOption={(props, option) => (
    //                         <li {...props}>
    //                             {option}
    //                         </li>
    //                     )}

    //                     style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa", width: '97%', marginLeft: '1%' }}
    //                     sx={{ width: 300 }}

    //                     renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, placeholder: 'Amenities Name' }} />}
    //                 />
    //             </div>

    //             <div className='mb-3 ps-2 pe-2'>
    //                 <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amount</label>
    //                 <Form.Control
    //                     placeholder="Amount"
    //                     aria-label="Recipient's username"
    //                     className='border custom-input'
    //                     aria-describedby="basic-addon2"
    //                     value={amount}
    //                     onChange={(e) => handleAmountChange(e)}
    //                     style={{
    //                         fontSize: 12,
    //                         fontWeight: "530",
    //                         opacity: 1,
    //                         borderRadius: "4px",
    //                         color: "gray",
    //                         '::placeholder': { color: "gray", fontSize: 12 }
    //                     }}

    //                 />
    //             </div>

    //             <div className='d-flex justify-content-between  ps-2 pe-2 '>
    //                 <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 650 }} >Set as Default</label>
    //                 <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
    //             </div>
    //             {edit === 'EDIT' && <>

    //                 <div className='mb-3 ps-2  pe-2'>
    //                     <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
    //                     <Form.Select aria-label="Default select example" value={status} onChange={(e) => handleStatusChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
    //                         <option style={{ fontSize: 14, fontWeight: 600, }} >Select Status</option>

    //                         <option value="1" >Active</option>
    //                         <option value="0" >In Active</option>
    //                     </Form.Select>
    //                 </div>

    //             </>}

    //         </Modal.Body>
    //         <Modal.Footer className='d-flex justify-content-center'>
    //             <Button variant="outline-primary" onClick={handleCloseModal} size="sm" style={{ borderRadius: 8, width: '100px', marginRight: '15px' }}>
    //                 Cancel
    //             </Button>
    //             <Button variant="primary" size="sm" style={{ borderRadius: 8, width: '100px' }} onClick={handleAmenitiesSetting} >
    //                 {edit === 'EDIT' ? 'Update' : 'Create'}
    //             </Button>

    //         </Modal.Footer>
    //     </Modal>



    // </div>

  )
}

export default Amenities