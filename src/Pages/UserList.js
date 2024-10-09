import React, { useState, useEffect, useRef } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./UserList.css";
import { Dropdown, Table } from 'react-bootstrap';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BsSearch } from "react-icons/bs";
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Image from 'react-bootstrap/Image';
import UserlistForm from "./UserlistForm";
import UserListRoomDetail from "./UserListRoomDetail";
import CryptoJS from "crypto-js";
import Filters from '../Assets/Images/Filters.svg';
import squre from '../Assets/Images/New_images/minus-square.png';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Search from '../Assets/Images/search-normal.png';
import Close from '../Assets/Images/close.svg';
import UserlistBookings from './UserlistBookings';
import UserlistCheckout from './UserlistCheckout';
import UserlistWalkin from './UserlistWalkin';
import Addbooking from './Addbookingform';
import CheckOutForm from './UserListCheckoutForm';
import UserlistWalkinForm from './UserlistWalkinForm'

function UserList(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const selectRef = useRef('select');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch({ type: 'USERLIST' })

  }, [])


  const [showLoader, setShowLoader] = useState(false)
  const [selectedItems, setSelectedItems] = useState('')


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


  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isUserClicked, setUserClicked] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [edit, setEdit] = useState('')
  const [filtericon, setFiltericon] = useState(false)
  const [statusfilter, setStatusfilter] = useState('')
  const [EditObj, setEditObj] = useState('')
  const [addBasicDetail, setAddBasicDetail] = useState('')
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [originalData, setOriginalData] = useState([]);  // Store original data from API
  const [filteredDataPagination, setfilteredDataPagination] = useState([]);


  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDataPagination.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDataPagination.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDataPagination.length / itemsPerPage);

  const renderPageNumbers = () => {

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} style={{ margin: '0 5px' }}>
          <button
            style={{
              padding: '5px 10px',
              color: i === currentPage ? '#007bff' : '#000',
              cursor: 'pointer',
              border: i === currentPage ? '1px solid #ddd' : 'none',
              backgroundColor: i === currentPage ? 'transparent' : 'transparent'
            }}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };


  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleShow = (u) => {
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(true)
    setEditObj(u)
    setemail_id(u.Email)
    console.log("u.Email...r?", u.Email)

  };

  const [value, setValue] = React.useState("1");
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleCloseClick = () => {
    setSearchValue('');
    setShowInput(false);
  };




  console.log("state", state)



  useEffect(() => {

    if (state.UsersList?.UserListStatusCode == 200) {
      console.log("invoice added executed");

      setOriginalData(state.UsersList.Users);

      const uniqueUsersList = state.UsersList.Users.filter((user, index, self) =>
        index === self.findIndex((u) => u.Email === user.Email)
      );

      console.log("Filtered Unique Data:", uniqueUsersList);

      setfilteredDataPagination(state.UsersList.Users)
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_USER' });
      }, 1000);
    }
  }, [state.UsersList?.UserListStatusCode])


  const generatepagenumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchItem != '') {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredData(filteredItems);
    }
    else {
      setFilteredData(state.UsersList.Users)
    }
  }

  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }
  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }
  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setFilteredData(state.UsersList.Users)
    }
    else {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  }


  const [roomDetail, setRoomDetail] = useState(false)
  const [userList, setUserList] = useState(true)
  const [clickedUserData, setClickedUserData] = useState([]);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterStatus, setFilterStatus] = useState(false)
  const [filterByStatus, setFilterByStatus] = useState('ALL')


  const [hostel, sethostel] = useState('')
  const [floors_Id, setFloors_Id] = useState('')
  const [rooms_id, setRoomsId] = useState('')
  const [beds_id, setBed_Id] = useState('')
  const [emaill_id, setemaill_id] = useState('')
  const [id, setId] = useState('');
  const [hostelName, sethosName] = useState("")
  const [customerUser_Id, setcustomerUser_Id] = useState("")
  const [createbyamni, setcreatebyamni] = useState("")
  const [amnitytableshow, setamnitytableshow] = useState(false)

  const handleRoomDetailsPage = (userData) => {

    const clickedUserDataArray = Array.isArray(userData) ? userData : [userData];
    console.log("userData", userData)
    setHostelIds(userData.Hostel_Id)
    setBedIds(userData.Bed)
    setFloorIds(userData.Floor)
    setRoomsIds(userData.Rooms)
    setemail_id(userData.Email)
    setId(userData.ID)
    setcreatebyamni(userData.created_By)
    sethosName(userData.HostelName)
    setcustomerUser_Id(userData.User_Id)
    setRoomDetail(true)
    setUserList(false)
    setClickedUserData(clickedUserDataArray);

  }
  const handleShowAddBed = (u) => {
    setEdit('Edit')

    console.log("u for assign bed", u)
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(false)
    setEditObj(u)
    console.log("uu", u)
    setemail_id(u.Email)
    console.log("u.Email", u.Email)

  };

  const [propsHostel, setPropsHostel] = useState('')
  const [propsFloor, setPropsFloor] = useState('')
  const [propsRooms, setPropsRooms] = useState('')
  const [propsBeds, setPropsBeds] = useState('')
  const [propsEmil, setPropsemail] = useState('')

  const AfterEditHostel = (hostel_id) => {
    setPropsHostel(hostel_id)
  }

  const AfterEditFloor = (Floor_ID) => {
    setPropsFloor(Floor_ID)
  }

  const AfterEditRooms = (room) => {
    setPropsRooms(room)
  }

  const AfterEditBed = (bedsId) => {
    setPropsBeds(bedsId)
  }
  const AfterEditEmail = (emmail) => {
    setPropsemail(emmail)
  }


  const [hostelIds, setHostelIds] = useState(hostel);
  const [bedIds, setBedIds] = useState(beds_id);
  const [floorIds, setFloorIds] = useState(floors_Id);
  const [roomsIds, setRoomsIds] = useState(rooms_id);
  const [email_id, setemail_id] = useState("");



  const [filteredDataForUser, setFilteredDataForUser] = useState([]);
  const [userDetails, setUserDetails] = useState([])
  console.log("userDetails", userDetails)

  console.log("bedIds", bedIds, hostelIds, floorIds, roomsIds)
  useEffect(() => {
    const ParticularUserDetails = state.UsersList?.Users?.filter(item => {

      console.log("item", item)

      return item.User_Id == customerUser_Id
    }

    );
    console.log("ParticularUserDetails", ParticularUserDetails)

    setUserDetails(ParticularUserDetails);

    let User_Id = null;
    if (ParticularUserDetails.length > 0) {
      User_Id = ParticularUserDetails[0]?.User_Id;
      const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice?.filter(user => user.User_Id == User_Id);

      setFilteredDataForUser(filteredData);

    }

  }, [roomDetail, state.UsersList?.Users, hostelIds, bedIds, floorIds, roomsIds, email_id]);

  const customCheckboxStyle = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid #DCDCDC',
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',

  };

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({ type: 'USERLIST' })

      setHostelIds(propsHostel);
      setBedIds(propsBeds);
      setFloorIds(propsFloor);
      setRoomsIds(propsRooms);
      setemail_id(propsEmil)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 2000)
    }
  }, [state.UsersList?.statusCodeForAddUser, propsHostel, propsBeds, propsFloor, propsRooms, propsEmil]);
  useEffect(() => {
    dispatch({ type: 'COUNTRYLIST' })
  }, [])

  const [search, setSearch] = useState(false)
  const [isOpenTab, setIsOpenTab] = useState(true)


  const Amenitiesname = state.UsersList?.customerdetails?.data?.amentites
  console.log("amenties", Amenitiesname);

  const billPaymentHistory = state.UsersList.billPaymentHistory;
  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  const [filterByInvoice, setFilterByInvoice] = useState('');




  useEffect(() => {
    if (state.InvoiceList?.Invoice && filteredDataForUser.length > 0) {
      let filteredData = [...filteredDataForUser];

      if (filterByStatus !== 'ALL') {
        filteredData = filteredData.filter((item) => item.Status === filterByStatus);
      }

      if (filterByInvoice) {
        filteredData = filteredData.filter((item) => item.Invoices.toLowerCase().includes(filterByInvoice.toLowerCase()));
      }

      setFilteredDatas(filteredData);
    }
  }, [filterByStatus, filterByInvoice, filteredDataForUser, state.InvoiceList?.Invoice]);

  const getFloorName = (Floor) => {
    if (Floor === 1) {
      return 'Ground Floor';
    } else if (Floor === 2) {
      return '1st Floor';
    } else if (Floor === 3) {
      return '2nd Floor';
    } else {

      const adjustedFloor = Floor - 1;
      const lastDigit = adjustedFloor % 10;
      let suffix = 'th';

      switch (lastDigit) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
      }

      return `${adjustedFloor}${suffix} Floor`;
    }
  }

  const getFormattedRoomId = (Floor, Rooms) => {

    const floor = parseInt(Floor)
    const roomIdString = String(Rooms);
    switch (floor) {
      case 1:
        return `G${roomIdString.padStart(3, '0')}`;
      case 2:
        return `F${roomIdString.padStart(3, '0')}`;
      case 3:
        return `S${roomIdString.padStart(3, '0')}`;
      case 4:
        return `T${roomIdString.padStart(3, '0')}`;
      default:
        const floorAbbreviation = getFloorAbbreviation(floor);
        return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
    }
  };

  const getFloorAbbreviation = (floor) => {
    switch (floor) {
      case 5:
        return 'F';
      case 6:
        return 'S';
      case 8:
        return 'E';
      case 9:
        return 'N';
      case 10:
        return 'T';
      default:
        return `${floor}`;
    }
  };



  const handleBack = () => {
    setUserList(true)
    setRoomDetail(false)
  }
  const handleFilterByDate = (e) => {
    const searchDate = e.target.value;
    setFilterByDate(searchDate);
  }
  const handleSearch = () => {
    setSearch(!search)
    setFilterStatus(false)
  }
  const handleFliterByStatus = () => {
    setFilterStatus(!filterStatus)
    setSearch(false)
  }

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterByStatus(selectedStatus);
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
      // setAmnityuserdetail(state.UsersList?.customerdetail.all_amenities)
    }
    console.log("userIduserId", id)
  }, [id]);
  useEffect(() => {
    if (id) {
      console.log("user_id", id)
      dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } })
      // setAmnnityhistory(state.UsersList?.amnetieshistory)
    }
    console.log("userIduserId....?", id)
  }, [id]);


  const [selectAmneties, setselectAmneties] = useState("")
  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  console.log("selectedAmenityName", selectedAmenityName)
  const [addamenityShow, setaddamenityShow] = useState(false)
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('')
  const [createby, setcreateby] = useState('')
  const [amnityEdit, setamnityEdit] = useState('')
  console.log("createby", createby)

  const handleselect = (e) => {
    const value = e.target.value;
    setselectAmneties(value);
    setamnitytableshow(true);
    console.log("e.target.value", value);

    const amenitiesHistory = state.UsersList.amnetieshistory.filter((item) => {
      return item.amenity_Id == value
    });
    console.log("state.UsersList.amnetieshistory.data", amenitiesHistory);

    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory && amenitiesHistory[0].status == 0) {
        console.log("Status is 0, setting add amenity show to true");
        setaddamenityShow(true);
        setstatusShow(false);

      }

    } else {
      console.log("else");
      setaddamenityShow(true);
      setstatusShow(false);
      setSelectedAmenityName([]);
    }
  };
  useEffect(() => {
    if (state.UsersList.customerdetails.all_amenities && state.UsersList.customerdetails.all_amenities.length > 0 && selectAmneties) {

      console.log("state.UsersList.customerdetails.all_amenities", state.UsersList.customerdetails.all_amenities);
      const AmnitiesNamelist = state.UsersList.customerdetails.all_amenities.filter((item) => {
        return item.Amnities_Id == selectAmneties

      })
      console.log("AmnitiesNamelist", AmnitiesNamelist)
      setcreateby(AmnitiesNamelist)
    }
  }, [state.UsersList?.customerdetails?.all_amenities, selectAmneties])

  const uniqueAmenities = [];
  const seenNames = new Set();

  if (state.UsersList?.amnetieshistory) {
    state.UsersList.amnetieshistory.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }

  const handleSetAsDefault = (e) => {
    setActive(e.target.checked);
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    dispatch({ type: 'AMENITESNAMES' })
  }, [])

  const amenities = state.UsersList?.amnetieshistory;

  if (amenities) {
    amenities.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }
  const handleCloseModal = () => {

    setaddamenityShow(false);
  };

  const [statusAmni, setStatusAmni] = useState(false)
  const [statusShow, setstatusShow] = useState(false);
  const [amnitynotshow, setamnitynotshow] = useState([])
  const handleStatusAmnities = (e) => {
    setStatusAmni(e.target.value)
    console.log("eee.ttt.v", e.target.value)
  }

  const handleAddUserAmnities = () => {
    if (statusAmni) {
      dispatch({
        type: 'AddUserAmnities',
        payload: {
          userID: customerUser_Id,
          amenityID: selectAmneties,
          Status: statusAmni,
          hostelID: hostelIds,
        }

      });
      setStatusAmni('')
      setselectAmneties('')
    } else {
      dispatch({
        type: 'AddUserAmnities',
        payload: {
          hostelID: hostelIds,
          userID: customerUser_Id,
          amenityID: selectAmneties,
        }
      });
      setStatusAmni('')
      setselectAmneties('')
    }
  };
  console.log("state.UsersList?.customerdetails?.all_amenities?", state.UsersList?.customerdetails?.all_amenities);

  console.log("state.UsersList?.statusCustomerAddUser", state.UsersList.statusCustomerAddUser)
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser == 200) {
      setaddamenityShow(false)
      setTimeout(() => {
        dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } });
        dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } });
      }, 1000)


      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADDUSER_AMNETIES' })
      }, 1000)


    }
  }, [state.UsersList.statusCustomerAddUser])

  console.log("state For Add userAminity", state);
  const handleEdit = (v) => {
    console.log("vvv", v)

    setamnityEdit(v)
    setaddamenityShow(true);
    setstatusShow(true)
    setselectAmneties(v.amenity_Id)


  }
  const OnShowTableForCustomer = (isVisible) => {
    setUserList(isVisible)
    setRoomDetail(false)
  }


  const amentiesrowsPerPage = 10;
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(indexOfFirstRowamnities, indexOfLastRowamneties);
  console.log("currentRowAmnities", currentRowAmnities)

  const [showOtpValidation, setShowOtpValidation] = useState(false)
  const [showValidate, setShowValidate] = useState(true)
  const [aadhaarNo, setAdhaarNo] = useState('')

  const handleAdhaarChange = (e) => {
    setAdhaarNo(e.target.value)
  }

  const handleValidateAadhaar = (customer_Id) => {


    if (!aadhaarNo || !/^\d+$/.test(aadhaarNo)) {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid aadhaar no.',
      });
      return;
    }
    if (aadhaarNo) {
      dispatch({ type: 'KYCVALIDATE', payload: { user_id: customer_Id, aadhar_number: aadhaarNo } })
    }

  }


  const [ref_id, setRef_Id] = useState('')

  const handleVerifyOtp = (customer_Id) => {

    if (!kycOtpValue || !/^\d+$/.test(kycOtpValue)) {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid otp',
      });
      return;
    }
    if (kycOtpValue) {
      dispatch({ type: 'KYCVALIDATEOTPVERIFY', payload: { user_id: customer_Id, aadhar_number: aadhaarNo, ref_id: ref_id, otp: kycOtpValue } })

      setKycOtpValue('')
      setAdhaarNo('')
      setShowOtpValidation(false)

    }

  }

  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess == 200) {
      setShowOtpValidation(true)
      setShowValidate(false)
      setRef_Id(state.UsersList && state.UsersList.Kyc_Ref_Id)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_KYC_VALIDATE_SATUS_CODE' })
      }, 2000)
    }
  }, [state.UsersList.kycValidateSendOtpSuccess])

  const [kycOtpValue, setKycOtpValue] = useState('')

  const handleKycOtpChange = (e) => {
    setKycOtpValue(e.target.value)
  }
  // Add form
  const [showbookingForm, setShowbookingForm] = useState(false);
  const toggleForm = () => {
    setShowbookingForm(!showbookingForm);
  };
  const closeModal = () => {
    setShowbookingForm(false);
  };
  //checkout form
  const [checkoutForm, setcheckoutForm] = useState(false)
  const checkOutForm = () => {
    setcheckoutForm(!checkoutForm);
  };
  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };
  // walkin from 
  const [walkInForm, setWalkinForm] = useState(false)
  const walkinForm = () => {
    setWalkinForm(!checkoutForm);
  };
  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  return (
    <div className=' p-2' >
      <Addbooking show={showbookingForm} handleClose={closeModal} />

      <CheckOutForm show={checkoutForm} handleClose={checkoutcloseModal} />

      <UserlistWalkinForm show={walkInForm} handleClose={walkinFormcloseModal} />

      {userList && <>

        <div className="customer p-4">
          <div className="cuslable">

            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Customers</label>

           

          </div>

          <div className="customerfilling d-flex justify-content-between align-items-center ">

           <div style={{ display: 'flex', alignItems: 'center' }}>
           {value === "1" && (
               <div style={{ display: 'flex', alignItems: 'center' }}>
               {!showInput && (
                 <div onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                   <Image src={Search} roundedCircle style={{ height: 26, width: 24, color: '#222222', marginRight: '10px' }} />
                 </div>
               )}
 
               {showInput && (
                 <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', marginRight: "20px" }}>
                   <Image src={Search} roundedCircle style={{ height: 20, width: 20, color: '#222222', marginRight: '5px' }} />
                   <input
                     type="text"
                     placeholder="Search"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '200px' }}
                   />
                   <div onClick={handleCloseClick} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                     <Image src={Close} roundedCircle style={{ height: 20, width: 20, color: '#222222' }} />
                   </div>
                 </div>
               )}
             </div>
            )}
           {value === "2" && (
               <div style={{ display: 'flex', alignItems: 'center' }}>
               {!showInput && (
                 <div onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                   <Image src={Search} roundedCircle style={{ height: 26, width: 24, color: '#222222', marginRight: '10px' }} />
                 </div>
               )}
 
               {showInput && (
                 <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', marginRight: "20px" }}>
                   <Image src={Search} roundedCircle style={{ height: 20, width: 20, color: '#222222', marginRight: '5px' }} />
                   <input
                     type="text"
                     placeholder="Search"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '200px' }}
                   />
                   <div onClick={handleCloseClick} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                     <Image src={Close} roundedCircle style={{ height: 20, width: 20, color: '#222222' }} />
                   </div>
                 </div>
               )}
             </div>
            )}
              {value === "3" && (
               <div style={{ display: 'flex', alignItems: 'center' }}>
               {!showInput && (
                 <div onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                   <Image src={Search} roundedCircle style={{ height: 26, width: 24, color: '#222222', marginRight: '10px' }} />
                 </div>
               )}
 
               {showInput && (
                 <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', marginRight: "20px" }}>
                   <Image src={Search} roundedCircle style={{ height: 20, width: 20, color: '#222222', marginRight: '5px' }} />
                   <input
                     type="text"
                     placeholder="Search"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '200px' }}
                   />
                   <div onClick={handleCloseClick} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                     <Image src={Close} roundedCircle style={{ height: 20, width: 20, color: '#222222' }} />
                   </div>
                 </div>
               )}
             </div>
            )}
              {value === "4" && (
               <div style={{ display: 'flex', alignItems: 'center' }}>
               {!showInput && (
                 <div onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                   <Image src={Search} roundedCircle style={{ height: 26, width: 24, color: '#222222', marginRight: '10px' }} />
                 </div>
               )}
 
               {showInput && (
                 <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', marginRight: "20px" }}>
                   <Image src={Search} roundedCircle style={{ height: 20, width: 20, color: '#222222', marginRight: '5px' }} />
                   <input
                     type="text"
                     placeholder="Search"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '200px' }}
                   />
                   <div onClick={handleCloseClick} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                     <Image src={Close} roundedCircle style={{ height: 20, width: 20, color: '#222222' }} />
                   </div>
                 </div>
               )}
             </div>
            )}
              
            </div> 

            <div className='me-3'>
              <Image src={Filters} roundedCircle style={{ height: "50px", width: "50px" }} />
            </div>

            <div className="buttons" >

            {value === "1" && (
              <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Gilroy" }}>
                + Add Customer
              </Button>
            )}
            {value === "2" && (
              <Button onClick={toggleForm} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Gilroy" }}>
                + Add Bookings
              </Button>
            )}
            {value === "3" && (
              <Button onClick={checkOutForm} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Gilroy" }}>
                + Add Check-out
              </Button>
            )}
            {value === "4" && (
              <Button onClick={walkinForm} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Montserrat" }}>
                + Add Walkin
              </Button>
            )}
          
            </div>

          </div>
        </div>
       

        <div className="pl-4" style={{ paddingLeft: "10px", fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, textAlign: "left" }} >
          <TabContext value={value}>
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="" >
              <Tab className="tab-label" style={{ textTransform: "capitalize" }} label="All Customers" value="1" />
              <Tab className="tab-label" style={{ textTransform: "capitalize" }} label="Bookings" value="2" />
              <Tab className="tab-label" style={{ textTransform: "capitalize" }} label="Check-out" value="3" />
              <Tab className="tab-label" style={{ textTransform: "capitalize" }} label="Walk-in" value="4" />
            </Tabs>

            <TabPanel value="1">
              {/* <AllCustomer id={props.id} /> */}
            </TabPanel>
            <TabPanel value="2">
              <UserlistBookings id={props.id} />
            </TabPanel>
            <TabPanel value="3">
              <UserlistCheckout id={props.id} />
            </TabPanel>
            <TabPanel value="4">
              <UserlistWalkin id={props.id} />
            </TabPanel>
          </TabContext>
        </div>

        {/*  */}


        <div className="p-4" style={{ paddingBottom: "20px" }} >

          <Table className="ebtable" responsive  >
            <thead style={{ backgroundColor: "#E7F1FF" }}>
              <tr>
                <th style={{ textAlign: "center", padding: "10px" }}>
                  <img src={squre} height={20} width={20} />
                </th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Name</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Email ID</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Phone</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Paying Guest</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Room</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#939393", fontSize: "14px", fontWeight: 600, fontFamily: "Gilroy" }}>Bed</th>
                <th style={{ textAlign: "start", padding: "10px" }}></th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {loading ? (
                Array.from({ length: currentItems?.length || 5 }).map((_, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton circle={true} height={40} width={40} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={80} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={120} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={120} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={120} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={50} /></td>
                    <td style={{ padding: "10px", border: "none" }}><Skeleton width={50} /></td>
                  </tr>
                ))
              ) : (
                currentItems.map((user) => {
                  console.log("userrr", user)
                  const imageUrl = user.profile || Profile;;
                  return (
                    <tr key={user.ID} style={{ fontSize: "16px", fontWeight: 600, textAlign: "center", marginTop: 10 }}>
                      <td style={{ padding: "10px", border: "none" }}>
                        <img src={squre} height={20} width={20} />
                      </td>
                      <td style={{ border: "none", display: "flex", padding: "10px" }}>

                        <Image
                          src={imageUrl}
                          alt={user.Name || "Default Profile"}
                          roundedCircle
                          style={{ height: "40px", width: "40px", marginRight: "10px" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Profile;
                          }}
                        />
                        <span className="Customer_Name_Hover" style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy", color: "#1E45E1", cursor: "pointer" }} onClick={() => handleRoomDetailsPage(user)}>
                          {user.Name}
                        </span>
                      </td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>{user.Email}</td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>+{user && String(user.Phone).slice(0, String(user.Phone).length - 10)}
                        {' '}
                        {user && String(user.Phone).slice(-10)}</td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>
                        <span style={{ paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "60px", backgroundColor: "#FFEFCF", textAlign: "start", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{user.HostelName}</span>
                      </td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>{user.Rooms}</td>
                      <td
                        className={user.Bed === 0 ? 'assign-bed' : ''}
                        onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
                        style={{
                          padding: "10px",
                          border: "none",
                          cursor: "pointer",
                          color: user.Bed === 0 ? "blue" : "inherit",
                          textDecoration: user.Bed === 0 ? "none" : "initial",
                          textAlign: "start",
                          fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy"
                        }}
                      >
                        {user.Bed === 0 ? '+ Assign Bed' : user.Bed}
                      </td>
                      <td style={{ padding: "10px", border: "none" }}>
                        {/* <MoreCircle  variant="Outline"  size="40" color="#dcdcdc" style={{transform:"rotate(90deg)"}}/> */}

                        {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                        </div> */}

                        {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                      </td>
                    </tr>

                  )

                })
              )}


              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "red", fontSize: 14 }}>No data found</td>
                </tr>
              )}
            </tbody>
          </Table>


        </div>
        {currentItems.length > 0 && (
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

      </>
      }
      {
        roomDetail == true ? <UserListRoomDetail
          AfterEditHostels={AfterEditHostel}
          AfterEditFloors={AfterEditFloor}
          AfterEditRoomses={AfterEditRooms}
          AfterEditBeds={AfterEditBed}

          showMenu={showMenu} displayDetail={addBasicDetail} setShowMenu={setShowMenu} handleShow={handleShow} edit={edit} setEdit={setEdit} EditObj={EditObj} setEditObj={setEditObj} handleMenuClick={handleMenuClick} setShowForm={setShowForm} showForm={showForm} setUserClicked={setUserClicked} handleEdit={handleEdit} handleShowAddBed={handleShowAddBed} roomDetail={roomDetail} setRoomDetail={setRoomDetail} userList={userList} setUserList={setUserList} OnShowTable={OnShowTableForCustomer} userDetails={userDetails} handleBack={handleBack} getFormattedRoomId={getFormattedRoomId} getFloorName={getFloorName} id={id} aadhaarNo={aadhaarNo}
          handleValidateAadhaar={handleValidateAadhaar} showOtpValidation={showOtpValidation} kycOtpValue={kycOtpValue} handleKycOtpChange={handleKycOtpChange} showValidate={showValidate} handleVerifyOtp={handleVerifyOtp} selectAmneties={selectAmneties} handleselect={handleselect} hostelName={hostelName} createby={createby} statusShow={statusShow} customerUser_Id={customerUser_Id} hostelIds={hostelIds}
          statusAmni={statusAmni} handleStatusAmnities={handleStatusAmnities} handleAddUserAmnities={handleAddUserAmnities} currentRowAmnities={currentRowAmnities} amnitiescurrentPage={amnitiescurrentPage} handleAdhaarChange={handleAdhaarChange} /> : null
      }

      {
        showMenu == true ? <UserlistForm
          AfterEditHostels={AfterEditHostel}
          AfterEditFloors={AfterEditFloor}
          AfterEditRoomses={AfterEditRooms}
          AfterEditBeds={AfterEditBed}

          showMenu={showMenu} displayDetail={addBasicDetail} setShowMenu={setShowMenu} handleShow={handleShow} edit={edit} setEdit={setEdit} EditObj={EditObj} setEditObj={setEditObj} handleMenuClick={handleMenuClick} setShowForm={setShowForm} showForm={showForm} setUserClicked={setUserClicked} handleEdit={handleEdit} handleShowAddBed={handleShowAddBed} roomDetail={roomDetail} setRoomDetail={setRoomDetail} userList={userList} setUserList={setUserList} OnShowTable={OnShowTableForCustomer} /> : null
      }

    </div>

  )
}

export default UserList