import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Men from '../Assets/Images/men.jpg';
import { Dropdown, Table } from 'react-bootstrap';
import { FaCircleExclamation } from "react-icons/fa6";
import SecurityIcon from '@mui/icons-material/Security';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Settings.css";
import { Tabs } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form';
import InvoiceSettings from './InvoiceSettings';
import Amenities from './Amenities';
import Billings from './Billing';
import imageCompression from 'browser-image-compression';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Complaintsettings from './Complaint_settings';
import ExpencesSettings from './Expences_settings';
import dottt from "../Assets/Images/dot_round.png"
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import EBBillingUnitlist from './EBUnitsettingsList';
import Modal from 'react-bootstrap/Modal';
import UserSettings from './UserSettings';
import { MdError } from "react-icons/md";
import RolePage from './SettingRole';  
import EmptyState from '../Assets/Images/New_images/empty_image.png';


function Settings() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const cookies = new Cookies()

  const [selectedTab, setSelectedTab] = useState('Personal');
  const [Name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [Address, setAddress] = useState("")
  const [Country, setCountry] = useState("")
  const [City, setCity] = useState("")
  const [statee, setStatee] = useState("")
  const [id, setId] = useState("")
  const [updateval, setUpdateval] = useState("")
  const [login_Password, setLogin_Password] = useState("")
  const [unitError, setunitError] = useState("")
  const [ebrolePermission, setEbRolePermission] = useState("");
  const [ebpermissionError, setEbPermissionError] = useState("");
  const [ebAddPermission,setEbAddPermission]= useState("")
  const [ebDeletePermission,setEbDeletePermission]=useState("")
  const [ebEditPermission,setEbEditPermission]=useState("")
  const [settingRole,setSettingRole]=useState("")




  useEffect(() => {
    setEbRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (ebrolePermission[0]?.is_owner == 1) {
        setSettingRole("");
    } else {
      setSettingRole("Permission Denied");
    }
  }, [ebrolePermission]);


  useEffect(() => {
    if (ebrolePermission[0]?.is_owner == 1 || ebrolePermission[0]?.role_permissions[12]?.per_view == 1) {
      setEbPermissionError("");
    } else {
      setEbPermissionError("Permission Denied");
    }
  }, [ebrolePermission]);



  useEffect(() => {
    if (ebrolePermission[0]?.is_owner == 1 || ebrolePermission[0]?.role_permissions[12]?.per_create == 1) {
      setEbAddPermission("");
    } else {
      setEbAddPermission("Permission Denied");
    }
  }, [ebrolePermission]);


  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_delete == 1
    ) {
      setEbDeletePermission("");
    } else {
      setEbDeletePermission("Permission Denied");
    }
  }, [ebrolePermission]);
  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_edit == 1
    ) {
      setEbEditPermission("");
    } else {
      setEbEditPermission("Permission Denied");
    }
  }, [ebrolePermission]);


  
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };


  const LoginId = localStorage.getItem("loginId")
  const Loginname = localStorage.getItem("NameId")
  const Loginemail = localStorage.getItem("emilidd")
  const Loginphone = localStorage.getItem("phoneId")
  const LoginIsEnable = localStorage.getItem("IsEnable")
  const LoginPassword = localStorage.getItem("Password")


  const [email_IdForLoginUser, setEmail_IdForLoginUser] = useState('')
  const [isEnableCheck, setIsEnableCheck] = useState('')


  useEffect(() => {
    if (LoginId) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = decryptedString;
        setId(parsedData)

        const decryptedDataname = CryptoJS.AES.decrypt(Loginname, 'abcd');
        const decryptedStringname = decryptedDataname.toString(CryptoJS.enc.Utf8);
        const parsedDataname = decryptedStringname;
        // setName(parsedDataname)

        const decryptedDataphone = CryptoJS.AES.decrypt(Loginphone, 'abcd');
        const decryptedStringphone = decryptedDataphone.toString(CryptoJS.enc.Utf8);
        const parsedDatphone = decryptedStringphone;
        // setPhone(parsedDatphone)

        const decryptedDataemail = CryptoJS.AES.decrypt(Loginemail, 'abcd');
        const decryptedStringemail = decryptedDataemail.toString(CryptoJS.enc.Utf8);
        // setEmail(decryptedStringemail)
        setEmail_IdForLoginUser(decryptedStringemail)


        const decryptedDataIsEnable = CryptoJS.AES.decrypt(LoginIsEnable, 'abcd');
        const decryptedStringIsEnable = decryptedDataIsEnable.toString(CryptoJS.enc.Utf8);
        setIsEnableCheck(decryptedStringIsEnable)

        const decryptedDataPassword = CryptoJS.AES.decrypt(LoginPassword, 'abcd');
        const decryptedStringPassword = decryptedDataPassword.toString(CryptoJS.enc.Utf8);
        setLogin_Password(decryptedStringPassword)

      } catch (error) {
        console.error('Error decrypting LoginId:', error);
      }
    }

  }, [LoginId])





  const handleName = (e) => {
    setName(e.target.value)
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }
  const handleEmailId = (e) => {
    setEmail(e.target.value)
  }
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleState = (e) => {
    setStatee(e.target.value)
  }

  const handleSaveUpdate = () => {
    if (selectedImage) {
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id, profile: selectedImage }
      });
      Swal.fire({
        text: "Update successfully",
        icon: "success",
        confirmButtonText: 'Ok'
      });
    } else {
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id }
      });
      Swal.fire({
        text: "Update successfully",
        icon: "success",

        confirmButtonText: 'Ok'
        // timer: 1000,

      });
    }

    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCountry('');
    setCity("");
    setStatee("");
  }




  const [isChecked, setIsChecked] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [initialIsEnable, setInitialIsEnable] = useState(null);


  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);

    if (newValue !== initialIsEnable) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };




  const handleTwoStepVerify = () => {
    dispatch({ type: 'TWOSTEPVERIFY', payload: { emailId: email_IdForLoginUser, isEnable: isChecked } })
    dispatch({ type: 'CLEAR_ERROR' })
  }


useEffect(()=>{
setunitError(state.Settings.ebUnitError)
},[state.Settings.ebUnitError])

  useEffect(() => {
    if (state.createAccount.statusCodeTwo === 200) {
      dispatch({ type: 'ACCOUNTDETAILS' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_TWO_STEP' })
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' });
      }, 200);
    }

  }, [state.createAccount.statusCodeTwo])


  useEffect(() => {
    const UserIsEnable = state.createAccount.accountList[0]?.user_details.isEnable;
    const isEnableInitialValue = UserIsEnable === 1;

    setIsChecked(isEnableInitialValue);
    setInitialIsEnable(isEnableInitialValue);

    if (UserIsEnable === 1) {
      localStorage.setItem("IsEnable", '');
    }

    setIsChanged(false);
  }, [state.createAccount.accountList]);


  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');



  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setSelectedImage(compressedFile);
    } catch (error) {
      console.error('Image compression error:', error);
    }
  };



 



  const tokenCookies = cookies.get('token');



  const [editunit, setEditUnit] = useState('')
  const [editamount, setEditAmount] = useState('')
  const [editHostel, setEditHostel] = useState({ id: '', name: '' })
  const [isModified, setIsModified] = useState(false);
  const [editamounterrormsg,setEditAmountErrmsg] = useState('')
  const [show, setShow] = useState(false);


  useEffect(() => {
    dispatch({ type: 'EB-BILLING-UNIT-LIST' })
    
  }, [])

  useEffect(() => {
    dispatch({ type: 'EB-BILLING-UNIT-LIST' })
    setData(state.Settings.EBBillingUnitlist.eb_settings) 
  }, [])

  const [data, setData] = useState([])
  

  useEffect(() => {
    if (state.Settings.addEbbillingUnitStatuscode === 200) {
      setSelectedHostel('')
      setAmount("")

      setTimeout(() => {
        dispatch({ type: 'EB-BILLING-UNIT-LIST' })
        setData(state.Settings.EBBillingUnitlist.eb_settings) 
      }, 100)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EB_BILLING_STATUS_CODE' })
      }, 1000)   
    }
  }, [state.Settings.addEbbillingUnitStatuscode])



  const handleEdit = (item) => {
    setShow(true);
    setEditUnit(item.unit)
    setEditAmount(item.amount)
    setEditHostel({ id: item.hostel_id, name: item.Name })
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleUnitChange = (e) => {
    const newValue = e.target.value;
    if (newValue !== editunit) {
      setEditUnit(newValue);
      setIsModified(true);
    }
  };
  
  const handleAmountChange = (e) => {
    const newValue = e.target.value;
   
    if (newValue !== editamount) {
      setEditAmount(newValue);
      setIsModified(true);
    }
    if(!e.target.value){
      setEditAmountErrmsg("Please enter amount")
    }
    else {
      setEditAmountErrmsg("")
    }
  };

  const handleUpdateEB = () => {

    if(!editamount){
      setEditAmountErrmsg("Please enter a Amount")
      return;
    }

    if (editHostel && editamount  && isModified) {
      dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { hostel_id: editHostel.id, unit: 1, amount: editamount } })
      handleClose();
      setEditHostel({ id: '', name: '' })
      setEditUnit('');
      setEditAmount('')
    }
  }


  useEffect(() => {
    if (state.createAccount.statusCodeForAccount == 200) {
      dispatch({ type: 'ACCOUNTDETAILS' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_ACCOUNT' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
      }, 1000)

    } else {
      console.log("create account not working")
    }
  }, [state.createAccount?.statusCodeForAccount])



  const [value, setValue] = React.useState('1');

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  }

  const [selectedHostel, setSelectedHostel] = useState('');
  const [unit, setUnit] = useState(1);
  const [amount, setAmount] = useState(0)

  const [hostelerrormsg, setHostelErrmsg] = useState('');
  const [amounterrormsg, setAmountErrmsg] = useState('');
  const [totalErrormsg ,setTotalErrmsg]= useState('')

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value)
    setTotalErrmsg('')
    if (!e.target.value) {
      setHostelErrmsg("Please Select Hostel");
    } else {
      setHostelErrmsg("");
    }
  };

  const handleAmount = (e) => {
    setAmount(e.target.value)
    setTotalErrmsg('')
    if (!e.target.value) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
      setunitError("")
    }
    dispatch({ type: 'CLEAR_EB_UNIT_ERROR' });
  }




  const handlesaveEbbill = () => {
    if (!selectedHostel && !amount ) {
        setTotalErrmsg('Please enter all field')          
      return; 
    }

   if(!selectedHostel){
    setHostelErrmsg("Please select hostel");
    }
   if(!amount){
    setAmountErrmsg('Please enter amount')
    }

   if (selectedHostel && amount ) {
      dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { hostel_id: selectedHostel, unit: 1, amount: amount } })      
    }
  }



  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  if (state.Settings.EBBillingUnitlist?.length != 0) {
    var currentRows = state?.Settings?.EBBillingUnitlist?.eb_settings?.slice(indexOfFirstRow, indexOfLastRow);
    var totalPages = Math.ceil(state?.Settings?.EBBillingUnitlist?.eb_settings?.length / rowsPerPage);
  } else {
    var currentRows = 0;
    var totalPages = 0;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className='container'>



      <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
        <div className='col-lg-8 col-md-6 col-sm-12 mb-4'>
          <h1 style={{ fontSize: 24, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Settings</h1>
        </div>


      </div>

      <TabContext value={value}>
        <div >
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <TabList orientation={isSmallScreen ? 'vertical' : 'horizontal'} onChange={handleChanges} aria-label="lab API tabs example" style={{ marginLeft: '20px' }} className='d-flex flex-column flex-xs-column flex-sm-column flex-lg-row'>
              <Tab label="EB Billing" value="1" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "1" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
              <Tab label="Invoice" value="2" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "2" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
              <Tab label="Expences" value="3" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "3" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
              <Tab label="Complaint type" value="4" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "4" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
              <Tab label="Amenities" value="5" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "5" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
              {!settingRole && ( <Tab label="Users" value="6" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "6" ? "#222222" : "#4B4B4B", lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />)}
              {!settingRole && (
  <Tab label="Roles" value="7" style={{ fontSize: 16, fontFamily: "Gilroy", color: value === "7" ? "#222222" : "#4B4B4B", lineHeight: "normal", fontStyle: "normal", fontWeight: 500, textTransform: "none" }} />)}

            </TabList>
          </Box>
        </div>

        <TabPanel value="1">
          <>
          {
            ebpermissionError ? (
              <>
              <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // height: "100vh",
    }}
  >
    <img
      src={EmptyState}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {ebpermissionError && (
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
        <span>{ebpermissionError}</span>
      </div>
    )}
  </div>
              </>
            ):
            <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
            <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>
              <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                    Select Hostel
                  </Form.Label>
                  <Form.Select aria-label="Default select example"
                    className='border' value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                    <option style={{ fontSize: 14, fontWeight: 600, }} selected value=''>Select PG</option>
                    {state.UsersList.hostelList && state.UsersList.hostelList.filter((item) => !item.eb_amount) 
                            .map((item) => (
                   <option key={item.id} value={item.id}>
                        {item.Name}
                   </option>
                      ))}


                  </Form.Select>
    
            {hostelerrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {hostelerrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {hostelerrormsg}
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
                        Unit
                      </Form.Label>
                      <Form.Control
                        style={{ padding: '10px', marginTop: '10px', backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
                        type="text"
                        placeholder="Unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        readOnly
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Amount / Unit
                      </Form.Label>
                      <Form.Control
                        style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={handleAmount}
                      />   
                      {unitError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {unitError}
                        </div>
                      )}

          {amounterrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {amounterrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {amounterrormsg}
    </p>
  </div>
)}
                    </Form.Group>
                  </div>
                </div>
      

           {totalErrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {totalErrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {totalErrormsg}
    </p>
  </div>
)}
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                  <Button  className='col-lg-11 col-md-12 col-sm-12 col-xs-12' disabled={ebAddPermission} onClick={handlesaveEbbill} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12 }}>
                    Save Changes</Button>
                </div>

              </div>
      
            </div>

            <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} />


            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0">
              <Table className="ebtable mt-3" responsive  >
                <thead style={{ backgroundColor: "#E7F1FF",
                  position:"sticky",
                  top:0,
                  zIndex:1, 
                 }}>
                  <tr>
                    <th style={{ color: '#222', fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px", fontStyle: 'normal', lineHeight: 'normal', }}></th>
                    <th style={{ color: '#222',  fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal', paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Paying guest</th>
                    <th style={{ color: '#222', fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px", fontStyle: 'normal', lineHeight: 'normal' }}>Unit</th>
                    <th style={{ color: '#222', fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px", fontStyle: 'normal', lineHeight: 'normal' }}>Amount </th>
                    <th style={{ color: '#222', fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px", fontStyle: 'normal', lineHeight: 'normal', }}></th>

                  </tr>
                </thead>
                <tbody style={{ height: "50px", fontSize: "11px" }}>

                  {state.Settings.EBBillingUnitlist?.eb_settings && state.Settings.EBBillingUnitlist.eb_settings?.length > 0 && state.Settings.EBBillingUnitlist.eb_settings?.map((item) => (
                    <EBBillingUnitlist item={item} modalEditEbunit={handleEdit} ebEditPermission={ebEditPermission}/>
                  ))}
                  {currentRows?.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "red", fontSize: 14 }}>No data found</td>
                    </tr>
                  )}

                </tbody>
              </Table>
              {currentRows?.length > 0 && (
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
                        <ArrowLeft2 size="16" color="#1E45E1" />
                      </button>

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

            {show &&
              <div
                className="modal show"
                style={{
                  display: 'block', position: 'initial', fontFamily: "Gilroy",
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
                          <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Update EB</div>
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
                              value={editHostel.name}
                              // readOnly
                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                            />
                          </Form.Group>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label
                              style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                            >
                              Unit
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="unit"
                              value={editunit}
                              onChange={handleUnitChange}
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
                              placeholder="Amount"
                              value={editamount}
                              onChange={handleAmountChange}
                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                            />
                                                       {editamounterrormsg && (
        <div >
           <p style={{ fontSize: '15px', color: 'red' ,marginTop:'3px'}}><MdError style={{ fontSize: '15px', color: 'red' }} /> {editamounterrormsg}</p>
        </div>
      )}
                          </Form.Group>
                        </div>


                      </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }}>

                      <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
                           disabled={!isModified }   onClick={handleUpdateEB}
                      >
                        Update EB
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal>
              </div>
            }
          </div>
          }
          </>
          
        </TabPanel>
        <TabPanel value="2"><InvoiceSettings /> </TabPanel>
        <TabPanel value="3"><ExpencesSettings /> </TabPanel>
        <TabPanel value="4"><Complaintsettings /> </TabPanel>
        <TabPanel value="5"><Amenities /> </TabPanel>
        <TabPanel value="6"><UserSettings /> </TabPanel>
        <TabPanel value="7"><RolePage /> </TabPanel>
      </TabContext>

    

    </div>
  )
}

export default Settings