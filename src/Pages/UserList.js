import React, { useState, useEffect, useRef } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./UserList.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import img1 from '../Assets/Images/list-report.png';
import img2 from '../Assets/Images/edit.png';
// import Profile from '../Assets/Images/Profile.jpg';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import { Dropdown, Table } from 'react-bootstrap';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BsSearch } from "react-icons/bs";
import List from '../Assets/Images/list-report.png';
import Edits from '../Assets/Images/edit.png';
import Login from '../Assets/Images/login.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Image from 'react-bootstrap/Image';
import UserlistForm from "./UserlistForm";
import CryptoJS from "crypto-js";
import LoaderComponent from './LoaderComponent';
import User from '../Assets/Images/Ellipse 1.png';
import more from '../Assets/Images/more.png';
import building from '../Assets/Images/buildings.png';
import house from '../Assets/Images/house.png';
import Group from '../Assets/Images/Group.png';
import sms from '../Assets/Images/sms.png';
import call from "../Assets/Images/call.png"
import dottt from "../Assets/Images/Group 14.png"
import leftarrow from "../Assets/Images/arrow-left.png"
import { Dot } from "recharts";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Filter from '../Assets/Images/New_images/Group 13.png';
import cross from '../Assets/Images/cross.png';
import { textAlign } from "@mui/system";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Select from 'react-select';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import Notify from '../Assets/Images/New_images/notify.png';
// import Profile from '../Assets/Images/New_images/profile.png';
import squre from '../Assets/Images/New_images/minus-square.png';
import leftArrow from '../Assets/Images/New_images/left-arrow.png';
import rightarrow from '../Assets/Images/New_images/right-arrow.png'
import Money from '../Assets/Images/New_images/Money.png';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2 ,MoreCircle} from 'iconsax-react';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function UserList() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const selectRef = useRef('select');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   setLoading(true)
    if (state?.UsersList?.Users) {
      setTimeout(() => {
        dispatch({ type: 'USERLIST' })
        dispatch({ type: 'INVOICELIST' })
        setLoading(false);
      }, 800);
    }
    else {
      setLoading(true)
    }
  }, [])

  //  to trigger invoice pdf

  const [showLoader, setShowLoader] = useState(false)
  const [selectedItems, setSelectedItems] = useState('')

  const handleInvoiceDetail = (item) => {
    console.log("item invoice", item)
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
  const [activePage, setActivePage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isUserClicked, setUserClicked] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [edit, setEdit] = useState('')
  const [filtericon, setFiltericon] = useState(false)
  const [statusfilter, setStatusfilter] = useState('')
  const [EditObj, setEditObj] = useState('')
  const [addBasicDetail, setAddBasicDetail] = useState('')
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [overviewshow, setoverviewshow] = useState(true);
  const [ebShow, setebshow] = useState(false);
  const [transshow, settaransshow] = useState(false);
  const [invoiceshow, setinvoiceshow] = useState(false);
  const [amnitiesshow, setamnitiesshow] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAmenities, setSelectedAmenities] = useState("");

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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


  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);




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


  const handleoverviewShow = () => {
    setoverviewshow(true)
    setebshow(false)
    setamnitiesshow(false)
    settaransshow(false)
    setinvoiceshow(false)
  };
  const handleebViewShow = () => {
    setebshow(true)
    setoverviewshow(false)
    setamnitiesshow(false)
    settaransshow(false)
    setinvoiceshow(false)
  };
  const handleamnitiesShow = () => {
    setamnitiesshow(true)
    setoverviewshow(false)
    setebshow(false)
    settaransshow(false)
    setinvoiceshow(false)
  };
  const handletransShow = () => {
    setamnitiesshow(false)
    setoverviewshow(false)
    setebshow(false)
    settaransshow(true)
    setinvoiceshow(false)
  };

  const handleinvoiceShow = () => {
    setamnitiesshow(false)
    setoverviewshow(false)
    setebshow(false)
    settaransshow(false)
    setinvoiceshow(true)
  };

  const handleShowAddBed = (u) => {
    console.log("u for assign bed", u)
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(false)
    setEditObj(u)
    console.log("uu", u)
    setemail_id(u.Email)
    console.log("u.Email", u.Email)

  };



  console.log("state", state)


  useEffect(() => {
    setFilteredData(state.UsersList.Users);
  }, [state.UsersList.Users])


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
  const [amniAmount, setamniAmount] = useState("");
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

  useEffect(() => {
    const ParticularUserDetails = state.UsersList?.Users?.filter(item => {


      return item.Bed == bedIds &&
        item.Hostel_Id == hostelIds &&
        item.Floor == floorIds &&
        item.Rooms == Number(roomsIds) &&
        item.Email == email_id

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




  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setSearch] = useState(false)
  const [isOpenTab, setIsOpenTab] = useState(true)

  const handleOpen = () => {
    setIsOpenTab(!isOpenTab)
  }

  const Amenitiesname = state.UsersList?.customerdetails?.data?.amentites
  console.log("amenties", Amenitiesname);

  const billPaymentHistory = state.UsersList.billPaymentHistory;
  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  const [filterByInvoice, setFilterByInvoice] = useState('');


  const handleFilterByInvoice = (e) => {
    const searchInvoice = e.target.value;
    setFilterByInvoice(searchInvoice);
  }


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
    setebshow(false)
    setamnitiesshow(false)
    settaransshow(false)
    setinvoiceshow(false)
    setoverviewshow(true)
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
  const [amnnityhistory, setAmnnityhistory] = useState([])
  const [Amnityuserdetail, setAmnityuserdetail] = useState([])

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
  console.log("state.UsersList.CustomerdetailsgetStatuscode", state.UsersList.CustomerdetailsgetStatuscode)
  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      // dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
      setAmnityuserdetail(state.UsersList?.customerdetail?.all_amenities)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
      }, 1000)

    }

  }, [state.UsersList.CustomerdetailsgetStatuscode]);

  console.log("state.UsersList.AmentiesHistorygetStatuscode", state.UsersList.AmentiesHistorygetStatuscode)
  useEffect(() => {
    if (state.UsersList.AmentiesHistorygetStatuscode === 200) {
      console.log("user_id", id)
      // dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } })
      setAmnnityhistory(state.UsersList?.amnetieshistory)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_AMENITIES_HISTORY_DETAILS' })
      }, 1000)
    }
    console.log("userIduserId....?", id)
  }, [state.UsersList.AmentiesHistorygetStatuscode]);

  const [selectAmneties, setselectAmneties] = useState("")
  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  console.log("selectedAmenityName", selectedAmenityName)
  const [addamenityShow, setaddamenityShow] = useState(false)
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('')
  const [createby, setcreateby] = useState('')
  const [amnityEdit, setamnityEdit] = useState('')
  const [filtshow, setFiltshow] = useState(false)
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
  const EbrowsPerPage = 10;
  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);



  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;
  const currentRowsEb = EbFilterddata?.slice(indexOfFirstRowEb, indexOfLastRowEb);
  console.log("currentRowsEb", currentRowsEb)
  const handleEbPageChange = (EbpageNumber) => {
    setEbCurrentPage(EbpageNumber);
  };
  const totalPagesEb = Math.ceil(EbFilterddata?.length / EbrowsPerPage);
  const renderPageNumbersEb = () => {
    const pageNumbersEb = [];
    let startPageEb = EbcurrentPage - 1;
    let endPageEb = EbcurrentPage + 1;

    if (EbcurrentPage === 1) {
      startPageEb = 1;
      endPageEb = 3;
    }

    if (EbcurrentPage === totalPagesEb) {
      startPageEb = totalPages - 2;
      endPageEb = totalPages;
    }

    if (EbcurrentPage === 2) {
      startPageEb = 1;
      endPageEb = 3;
    }

    if (EbcurrentPage === totalPages - 1) {
      startPageEb = totalPages - 2;
      endPageEb = totalPages;
    }

    for (let i = startPageEb; i <= endPageEb; i++) {
      if (i > 0 && i <= totalPagesEb) {
        pageNumbersEb.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === EbcurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === EbcurrentPage ? 'transparent' : 'transparent',
                border: i === EbcurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleEbPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersEb;
  };

  useEffect(() => {
    setEbFilterddata(state.UsersList.customerdetails.eb_data)
  }, [state.UsersList.customerdetails.eb_data])

  const invoicerowsPerPage = 10;
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  const currentRowinvoice = invoiceFilterddata?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);

  const handleInvoicePageChange = (InvoicepageNumber) => {
    setinvoicecurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(invoiceFilterddata?.length / invoicerowsPerPage);

  const renderPageNumbersInvoice = () => {
    const pageNumbersInvoice = [];
    let startPageInvoice = invoicecurrentPage - 1;
    let endPageInvoice = invoicecurrentPage + 1;

    if (invoicecurrentPage === 1) {
      startPageInvoice = 1;
      endPageInvoice = 3;
    }

    if (invoicecurrentPage === totalPagesinvoice) {
      startPageInvoice = totalPagesinvoice - 2;
      endPageInvoice = totalPagesinvoice;
    }

    if (invoicecurrentPage === 2) {
      startPageInvoice = 1;
      endPageInvoice = 3;
    }

    if (invoicecurrentPage === totalPagesinvoice - 1) {
      startPageInvoice = totalPagesinvoice - 2;
      endPageInvoice = totalPagesinvoice;
    }

    for (let i = startPageInvoice; i <= endPageInvoice; i++) {
      if (i > 0 && i <= totalPagesinvoice) {
        pageNumbersInvoice.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === invoicecurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === invoicecurrentPage ? 'transparent' : 'transparent',
                border: i === invoicecurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleInvoicePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersInvoice;
  };
  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details)
  }, [state.UsersList.customerdetails.invoice_details])

  const amentiesrowsPerPage = 10;
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(indexOfFirstRowamnities, indexOfLastRowamneties);
  console.log("currentRowAmnities", currentRowAmnities)


  const handleAmnitiesPageChange = (amnitiespageNumber) => {
    setAmnitycurrentPage(amnitiespageNumber);
  };

  const totalPagesAmnities = Math.ceil(amnitiesFilterddata?.length / amentiesrowsPerPage);


  const renderPageNumbersAmnities = () => {
    const pageNumbersAmnities = [];
    let startPageAmnities = amnitiescurrentPage - 1;
    let endPageAmnities = amnitiescurrentPage + 1;

    if (amnitiescurrentPage === 1) {
      startPageAmnities = 1;
      endPageAmnities = 3;
    }

    if (amnitiescurrentPage === totalPagesAmnities) {
      startPageAmnities = totalPagesAmnities - 2;
      endPageAmnities = totalPagesAmnities;
    }

    if (invoicecurrentPage === 2) {
      startPageAmnities = 1;
      endPageAmnities = 3;
    }

    if (amnitiescurrentPage === totalPagesAmnities - 1) {
      startPageAmnities = totalPagesAmnities - 2;
      endPageAmnities = totalPagesAmnities;
    }

    for (let i = startPageAmnities; i <= endPageAmnities; i++) {
      if (i > 0 && i <= totalPagesAmnities) {
        pageNumbersAmnities.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === amnitiescurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === amnitiescurrentPage ? 'transparent' : 'transparent',
                border: i === amnitiescurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleAmnitiesPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersAmnities;
  };



  useEffect(() => {
    setamnitiesFilterddata(state.UsersList?.amnetieshistory)
  }, [state.UsersList?.amnetieshistory])

  const transactionrowsPerPage = 10;
  const [transactioncurrentPage, settransactioncurrentPage] = useState(1);
  const [transactionFilterddata, settransactionFilterddata] = useState([]);




  const indexOfLastRowTransaction = transactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowTransaction = indexOfLastRowTransaction - transactionrowsPerPage;
  const currentRowTransaction = transactionFilterddata?.slice(indexOfFirstRowTransaction, indexOfLastRowTransaction);


  const handleTransactionPageChange = (transactionpageNumber) => {
    settransactioncurrentPage(transactionpageNumber);
  };


  const totalPagesTransaction = Math.ceil(transactionFilterddata?.length / transactionrowsPerPage);

  const renderPageNumbersTransaction = () => {
    const pageNumbersTransaction = [];
    let startPageTransaction = transactioncurrentPage - 1;
    let endPageTransaction = transactioncurrentPage + 1;

    if (transactioncurrentPage === 1) {
      startPageTransaction = 1;
      endPageTransaction = 3;
    }

    if (transactioncurrentPage === totalPagesTransaction) {
      startPageTransaction = totalPagesTransaction - 2;
      endPageTransaction = totalPagesTransaction;
    }

    if (transactioncurrentPage === 2) {
      startPageTransaction = 1;
      endPageTransaction = 3;
    }

    if (transactioncurrentPage === totalPagesTransaction - 1) {
      startPageTransaction = totalPagesTransaction - 2;
      endPageTransaction = totalPagesTransaction;
    }

    for (let i = startPageTransaction; i <= endPageTransaction; i++) {
      if (i > 0 && i <= totalPagesTransaction) {
        pageNumbersTransaction.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === transactioncurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === transactioncurrentPage ? 'transparent' : 'transparent',
                border: i === transactioncurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleTransactionPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersTransaction;
  };

  useEffect(() => {
    settransactionFilterddata(state.UsersList.customerdetails.transactions)
  }, [state.UsersList.customerdetails.transactions])

  const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const filteredReports = reports.filter(report =>
  //   report.ReportsName.toLowerCase().includes(searchQuery.toLowerCase())
  // );


  //  Aadhaar integration

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

  console.log("state.UsersList.Kyc_Ref_Id",state.UsersList.Kyc_Ref_Id)

const handleVerifyOtp = (customer_Id) => {

  if (!kycOtpValue || !/^\d+$/.test(kycOtpValue)) {
    Swal.fire({
      icon: 'warning',
      title: 'Please enter a valid otp',
    });
    return;
  }
  if(kycOtpValue){
 dispatch({ type: 'KYCVALIDATEOTPVERIFY', payload: { user_id: customer_Id, aadhar_number: aadhaarNo ,ref_id: ref_id , otp: kycOtpValue }})
 
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

 const handleKycOtpChange = (e) =>{
  setKycOtpValue(e.target.value)
 }




  return (
    <div className=' p-2' >

      {userList && <>
        {/* <div className="user ps-3 pe-3" >

          <div className="user1" >
            <h6>User List</h6>
          </div>
          <div className="user2">
            {
              searchicon &&
              <>
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='Search Here'
                  class="form-control ps-4 pe-1   searchinput"
                  style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "250px", borderRadius: "5px", padding: "2px", border: "1px Solid lightgray", height: "30px", color: "#2E75EA" }}
                />
              </>
            }

            <IoIosSearch className='me-3' style={{ fontSize: 20 }}
              onClick={handleiconshow}
            />
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
           
            <button type="button" class="me-2" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} class="me-1" height="12" width="12" alt="Plus" />Add User</button>



          </div>
        </div>  */}
        {/* <div className='customerprofile'>

         

<div className="searchGroup">
        <InputGroup >
          <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
            <CiSearch style={{ fontSize: 20 }} />
          </InputGroup.Text>
          <FormControl
           value={searchItem}
           onChange={(e) => handleInputChange(e)}
            size="lg"
           
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderLeft: "none",
              fontSize: 15,
              fontWeight: 600,
            }}
            placeholder="Search..."
          />
        </InputGroup>
      </div>
          <div className="mr-3">
            <img src={Notify} alt="notification" />
          </div>

          <div className="mr-3">
            <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
          </div>
        </div> */}
        <div className="customer p-4" >
          <div className="cuslable">
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, marginTop: 20, fontFamily: "Gilroy" }}>Customers</label>
          </div>

          <div className="customerfilling d-flex justify-content-between align-items-center ">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>

            <div>
              <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 171, padding: "18px, 20px, 18px, 20px", fontFamily: "Montserrat" }}> + Add Customer</Button>
            </div>
          </div>
        </div>

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
                currentRows.map((user) => {
                  const imageUrl = user.profile || Profile;
                  console.log('Image URL:', imageUrl);
                  return (
                    <tr key={user.Email} style={{ fontSize: "16px", fontWeight: 600, textAlign: "center", marginTop: 10 }}>
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
                            e.target.onerror = null; // Prevents infinite loop
                            e.target.src = Profile; // Fallback to default image
                          }}
                        />
                        <span className="Customer_Name_Hover" style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy", color: "#1E45E1" ,cursor:"pointer"}} onClick={() => handleRoomDetailsPage(user)}>
                          {user.Name}
                        </span>
                      </td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>{user.Email}</td>
                      <td style={{ padding: "10px", border: "none", textAlign: "start", fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>{user.Phone}</td>
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
                      
                      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                      
                        {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                      </td>
                    </tr>

                  )


                })
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center" style={{ width: "100%" }}>
            {currentItems.length === 0 && !loading && <h5 style={{ fontSize: 12, color: "red" }}>No Data Found</h5>}
          </div>
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

      </>}


      {
        roomDetail && (
          <>
            {userDetails && userDetails.map((item, index) => {
              const imageUrl = item.profile || Profile;
              { console.log("single User", item) }
              return (
                <div key={item.ID} className="container mt-2">
                  {/* <div className='d-flex justify-content-end align-items-center m-4'>

                    <div>
                      <InputGroup>
                        <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                          <CiSearch style={{ fontSize: 20 }} />
                        </InputGroup.Text>
                        <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
                          placeholder="Search..."
                        />
                      </InputGroup>
                    </div>
                    <div className="mr-3">
                      <img src={Notify} alt="notification" />
                    </div>

                    <div className="mr-3">

                      <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
                    </div>
                  </div> */}

                  <div style={{ marginLeft: 25, paddingBottom: 20 }}>
                    <img src={leftarrow}
                      onClick={handleBack} style={{cursor:"pointer"}}/><span style={{ fontWeight: 600, fontSize: "20px", marginLeft: 15, fontFamily: "Gilroy" }}>User Profile</span> </div>
                  <div className="card" style={{ height: 130, borderRadius: "20px" }}>
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Image
                          src={imageUrl}
                          alt={item.Name || "Default Profile"}
                          roundedCircle
                          style={{ height: "80px", width: "80px", marginRight: "10px" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Profile;
                          }}
                        />
                        <div style={{ marginLeft: 10 }}>
                          <span className="card-title mb-0" style={{ fontSize: "20px", fontWeight: 600, fontFamily: "Gilroy" }}>
                            {item.Name}
                          </span>
                          <p style={{ marginTop: 10 }}>
                            <span style={{ backgroundColor: '#FFE0D9', borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>
                              {getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}
                            </span>

                            <span style={{ backgroundColor: '#FFEFCF', paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", marginLeft: 10, fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>
                              {getFloorName(item.Floor)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                      {/* <img src={dottt} width={40} height={40} alt="More options" style={{ marginBottom: "30px",cursor:"pointer" }} /> */}
                    </div>
                  </div>


                  <div className="tapppinfour" >
                    <div className={`tab-item ${overviewshow ? 'active' : ''}`} onClick={handleoverviewShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16, marginLeft: 10 }}>OverView</div>

                    <div className={`tab-item ${ebShow ? 'active' : ''}`} onClick={handleebViewShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16 }}>EB Reading</div>
                    <div className={`tab-item ${invoiceshow ? 'active' : ''}`} onClick={handleinvoiceShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16 }}>Invoice</div>
                    <div className={`tab-item ${amnitiesshow ? 'active' : ''}`} onClick={handleamnitiesShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16 }}>Amnities</div>
                    <div className={`tab-item ${transshow ? 'active' : ''}`} style={{ marginRight: "35%", fontFamily: "Gilroy", fontWeight: 500, fontSize: 16 }} onClick={handletransShow} >Transaction</div>

                  </div>

                  {
                    overviewshow &&
                    <>
                      <div className="overdue mt-3" >
                        <div style={{ flex: 1 }}>
                          <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                            <div class="card-header d-flex justify-content-between align-items-center " style={{ backgroundColor: "transparent" }}>
                              <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                Basic Information
                              </div>
                              <div style={{cursor:"pointer"}}>
                              <div onClick={() => { handleShow(item) }} style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                                {/* <img src={dottt} height={32} width={32} alt="More Options"  /> */}
                              </div>
                            </div>
                            <div class="card-body">
                              <div class="row ">
                                <div class="col-sm-6">
                                  <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Paying Guest</p>
                                  <p> <Buildings
                                    size="16"
                                    color="#1E45E1"
                                  /> <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", marginLeft: 5 }}>{item.HostelName}</span></p>

                                  {/* <img src={building} /> */}
                                </div>
                                <div class="col-sm-6 text-right">
                                  <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Room/Bed</p>
                                  <p ><img src={Group} onClick={() => { handleShowAddBed(item) }} /><span onClick={() => { handleShowAddBed(item) }} style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}</span></p>
                                </div>
                              </div>
                              <div class="row ">
                                <div class="col-sm-6">
                                  <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email</p>
                                  <p><Sms
                                    size="16"
                                    color="#1E45E1"
                                  />
                                    {/* <img src={sms} />  */}
                                    <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Email}</span></p>
                                </div>
                                <div class="col-sm-6 text-right">
                                  <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Mobile no.</p>
                                  <p><Call
                                    size="16"
                                    color="#1E45E1"
                                  />
                                    {/* <img src={call} />  */}
                                    <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Phone}</span></p>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-sm-6">
                                  <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Address</p>
                                  <p><House
                                    size="16"
                                    color="#1E45E1"
                                  />
                                    {/* <img src={house} /> */}
                                    <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Address}</span> </p>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div style={{ flex: 1 }}>

                          {
                            state.UsersList?.customerdetails?.data?.length > 0 && state.UsersList?.customerdetails?.data.map((g) => {
                              console.log("g", g)

                              return (
                                <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                                  <div class="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "transparent" }}>
                                    <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                      Detailed Information
                                    </div>
                                    <div style={{cursor:"pointer"}}>
                                    <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                                      {/* <img src={dottt} width={32} height={32} alt="More Options" /> */}
                                    </div>
                                  </div>
                                  <div class="card-body">
                                    <div class="row mb-3">
                                      <div class="col-sm-4">
                                        <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Advance Amount</strong>
                                        <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "gilroy" }}><img src={Money} />   ₹{g.AdvanceAmount}</p>
                                      </div>
                                      <div class="col-sm-4">
                                        <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Rent Amount</strong>
                                        <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "gilroy" }}> <img src={Money} /> ₹{g.RoomRent}/m</p>
                                      </div>

                                    </div>
                                    <div class="row mb-3">
                                      <div class="col-sm-12">
                                        <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Amenities</strong>

                                        <div class="d-flex flex-wrap mt-2">
                                          {
                                            g?.amentites?.length > 0 && g?.amentites.map((p) => {
                                              return (
                                                <div key={p.Amnities_Name} style={{ backgroundColor: "#E0ECFF", borderRadius: "10px", paddingLeft: "12px", paddingRight: "12px", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500, paddingTop: "2px", paddingBottom: "3px", margin: "10px" }}>{p.Amnities_Name}</div>

                                              )
                                            })
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }

                        </div>



                      </div>

                      <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5, marginTop: 30 }}>
                        <div class="card-header d-flex justify-content-between align-items-center " style={{ backgroundColor: "transparent" }}>
                          <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                            KYC details
                          </div>

                        </div>
                        <div class="card-body">
                          <div className="row">
                            <div className='col-lg-5 col-md-6 col-sm-12 col-xs-12'>
                              <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Aadhaar Number</Form.Label>
                                <FormControl
                                  id="form-controls"
                                  placeholder='987654321012'
                                  type="text"
                                  value={aadhaarNo}
                                  maxLength={12}
                                  onChange={(e) => handleAdhaarChange(e)}
                                  style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                />
                              </Form.Group>
                            </div>




                            {showOtpValidation && <>
                              <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3">
                                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>OTP</Form.Label>
                                  <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder='****'
                                    value={kycOtpValue}
                                    
                                    onChange={(e) => handleKycOtpChange(e)}
                                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                  />
                                </Form.Group>
                                <span style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}> Didn’t receive OTP? <a href="#" style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }} onClick={() => handleValidateAadhaar(item.id)}> Resend</a></span>
                              </div>
                            </>
                            }

                            {showValidate &&
                              <div className="mt-2" style={{ marginBottom: 20 }}>
                                <Button style={{ fontFamily: 'Montserrat', fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 52, letterSpacing: 1, borderRadius: 12, width: "fit-content", padding: "10px, 3px, 10px, 3px", }} onClick={() => handleValidateAadhaar(item.id)}>Validate Aadhaar</Button>

                              </div>
                            }
                            {showOtpValidation &&
                              <div style={{ marginBottom: 20 }}>
                                <Button style={{ fontFamily: 'Montserrat', fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 52, letterSpacing: 1, borderRadius: 12, width: 152, padding: "10px, 3px, 10px, 3px" }} onClick={()=>handleVerifyOtp(item.id)}> Save Changes</Button>

                              </div>}

                          </div>


                        </div>
                      </div>
                    </>
                  }

                  {
                    ebShow &&
                    <div>

                      <div>
                        <Table className="ebtable mt-3" responsive  >
                          <thead style={{ backgroundColor: "#E7F1FF" }}>
                            <tr >

                              <th style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Floor</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Room no</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Start meter</th>

                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>End meter</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Dated</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Total units</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Units used</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amount</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>
                            </tr>
                          </thead>
                          <tbody style={{ height: "50px", fontSize: "11px" }}>
                            {currentRowsEb?.map((u) => {
                              let Dated = new Date(u.Date);
                              console.log("Dated..?", Dated);

                              let day = Dated.getDate();
                              let month = Dated.getMonth() + 1; // Months are zero-based
                              let year = Dated.getFullYear();

                              let formattedDate = `${day}/${month}/${year}`;
                              console.log("Formatted Date:", formattedDate);
                              return (
                                <tr key={u.id} style={{ lineHeight: "20px" }}>

                                  <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Floor_Id}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Room_No}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{u.start_Meter_Reading}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.end_Meter_Reading}</td>
                                  <td> <span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.pay_eb_amount}</td>
                                  <td  style={{cursor:"pointer"}}>
                                  <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                                    {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                                    </td>

                                </tr>
                              )

                            })}
                            {currentRowsEb?.length === 0 && (
                              <tr>
                                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                              </tr>
                            )}

                          </tbody>
                        </Table>

                      </div>

                      {currentRowsEb?.length > 0 && (

                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: EbcurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: EbcurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleEbPageChange(EbcurrentPage - 1)}
                                disabled={EbcurrentPage === 1}
                              >
                                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                              <span
                                onClick={() => handleEbPageChange(EbcurrentPage - 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: EbcurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  color: EbcurrentPage === 1 ? '#ccc' : '#007bff'
                                }}
                              >
                                Previous
                              </span>
                            </li>
                            {EbcurrentPage > 3 && (
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
                                  onClick={() => handleEbPageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {EbcurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersEb()}
                            {EbcurrentPage < totalPagesEb - 2 && <span>...</span>}
                            {EbcurrentPage < totalPagesEb - 2 && (
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
                                  onClick={() => handleEbPageChange(totalPagesEb)}
                                >
                                  {totalPagesEb}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                              <span
                                onClick={() => handleEbPageChange(EbcurrentPage + 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: EbcurrentPage === totalPagesEb ? 'not-allowed' : 'pointer',
                                  color: EbcurrentPage === totalPagesEb ? '#ccc' : '#007bff'
                                }}
                              >
                                Next
                              </span>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: EbcurrentPage === EbcurrentPage ? '#ccc' : '#007bff',
                                  cursor: EbcurrentPage === EbcurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleEbPageChange(EbcurrentPage + 1)}
                                disabled={EbcurrentPage === totalPagesEb}
                              >
                                {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  }

                  {
                    invoiceshow &&
                    <>
                      <div>

                        <Table className="ebtable mt-3" responsive >
                          <thead style={{ color: "gray", fontSize: "11px", marginLeft: 10, backgroundColor: "#E7F1FF" }}>
                            <tr className="" style={{ height: "30px" }}>
                              <th style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Invoice number</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Created</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Due Date</th>

                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Due</th>

                              <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody style={{ height: "50px", fontSize: "11px" }}>
                            {currentRowinvoice?.map((view) => {
                              let Dated = new Date(view.Date);
                              console.log("Dated..?", Dated);

                              let day = Dated.getDate();
                              let month = Dated.getMonth() + 1; // Months are zero-based
                              let year = Dated.getFullYear();

                              let formattedDate = `${day}/${month}/${year}`;
                              console.log("Formatted Date:", formattedDate);


                              let dueDated = new Date(view.DueDate);
                              console.log("dueDated..?", dueDated);

                              let daydue = dueDated.getDate();
                              let monthdue = dueDated.getMonth() + 1; // Months are zero-based
                              let yeardue = dueDated.getFullYear();

                              let DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;
                              console.log("DueformattedDate:", DueformattedDate);

                              return (
                                <tr key={view.id}>
                                  <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{view.Invoices}</td>

                                  <td ><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                                  <td ><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{DueformattedDate}</span></td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{view.Amount}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{view.BalanceDue}</td>
                                  <td><span style={{
                                    color: "black",
                                    backgroundColor: view.Status === 'Success' ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                                    paddingLeft: "10px", paddingRight: "10px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    borderRadius: "10px"
                                  }}>{view.Status === 'Success' ? 'Paid' : 'UnPaid'}</span></td>
                                  {/* <td style={view.Status === "Paid" ? { color: "green", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"} : { color: "red", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"}}>{view.Status == Paid ? 'Paid' : 'UnPaid'}</td> */}
                                  <td>  <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                                    {/* <img src={dottt} style={{ height: 40, width: 40, cursor:"pointer" }} /> */}
                                    </td>

                                </tr>

                              )

                            })}
                            {currentRowinvoice.length === 0 && (
                              <tr>
                                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                              </tr>
                            )}

                          </tbody>
                        </Table>
                      </div>

                      {currentRowinvoice.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: invoicecurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                                disabled={invoicecurrentPage === 1}
                              >                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                              </button>
                              <span
                                onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  color: invoicecurrentPage === 1 ? '#ccc' : '#007bff'
                                }}
                              >
                                Previous
                              </span>
                            </li>
                            {invoicecurrentPage > 3 && (
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
                                  onClick={() => handleInvoicePageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {invoicecurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersInvoice()}
                            {invoicecurrentPage < totalPagesinvoice - 2 && <span>...</span>}
                            {invoicecurrentPage < totalPagesinvoice - 2 && (
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
                                  onClick={() => handleInvoicePageChange(totalPagesinvoice)}
                                >
                                  {totalPagesinvoice}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                              <span
                                onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: invoicecurrentPage === totalPagesinvoice ? 'not-allowed' : 'pointer',
                                  color: invoicecurrentPage === totalPagesinvoice ? '#ccc' : '#007bff'
                                }}
                              >
                                Next
                              </span>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: invoicecurrentPage === invoicecurrentPage ? '#ccc' : '#007bff',
                                  cursor: invoicecurrentPage === invoicecurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                                disabled={invoicecurrentPage === totalPagesinvoice}
                              >
                                {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </>

                  }

                  {
                    amnitiesshow &&
                    <div className="container mt-3">
                      {state.UsersList?.customerdetails?.all_amenities && state.UsersList?.customerdetails?.all_amenities.length === 0 && <>

                        <label className="pb-1" style={{ fontSize: 14, color: "red", fontFamily: "Gilroy", fontWeight: 500 }}> Please add a 'Amenities' option in Settings, accessible after assign an amenities.</label>


                      </>}

                      <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                        <Form.Label style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>Amnities</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className='border'
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy,sans-serif",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: 8
                          }}

                          value={selectAmneties}
                          onChange={(e) => handleselect(e)}
                        >
                          <option style={{ fontSize: 16, fontWeight: 500, fontFamily: "Gilroy" }}>Select an amenity</option>
                          {state.UsersList?.customerdetails?.all_amenities?.map((item) => (
                            <option key={item.Amnities_Id} value={item.Amnities_Id}>
                              {item.Amnities_Name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>

                      <Modal show={addamenityShow} onHide={() => setaddamenityShow(false)} centered>
                        <Modal.Header closeButton style={{ backgroundColor: "#F5F5FF" }} className="text-center">
                          <Modal.Title style={{ fontSize: 18 }} className="text-center">Add Amnities</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className='mb-3 ps-2 pe-2'>
                            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amnities_Name</label>
                            <Form.Control
                              placeholder="Amnities Name"
                              aria-label="Recipient's username"
                              className='border custom-input'
                              aria-describedby="basic-addon2"
                              value={selectAmneties}
                              style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                              }}
                            />
                          </div>
                          <div className='mb-3 ps-2 pe-2'>
                            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Hostel_Name</label>
                            <Form.Control
                              placeholder="HostelName"
                              aria-label="Recipient's username"
                              className='border custom-input'
                              aria-describedby="basic-addon2"
                              value={hostelName}
                              style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                              }}
                            />
                          </div>

                          <div className='mb-3 ps-2 pe-2'>
                            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amount</label>
                            <Form.Control
                              placeholder="Amount"
                              aria-label="Recipient's username"
                              className='border custom-input'
                              aria-describedby="basic-addon2"
                              value={createby[0]?.Amount}
                              style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                              }}
                            />
                          </div>
                          {
                            statusShow &&
                            <div className='mb-3 ps-2  pe-2'>
                              <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
                              <Form.Select aria-label="Default select example" value={statusAmni} onChange={(e) => handleStatusAmnities(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
                                <option style={{ fontSize: 14, fontWeight: 600, }} >Select Status</option>

                                <option value="1" >Active</option>
                                <option value="0" >In Active</option>
                              </Form.Select>
                            </div>
                          }

                        </Modal.Body>
                        <Modal.Footer className='d-flex justify-content-center'>
                          <Button className='col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{

                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            height: 50,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Montserrat, sans-serif",
                            marginTop: 20,
                          }}
                            onClick={handleAddUserAmnities}
                          >
                            Add Amnities
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <div className="d-flex flex-wrap mt-2">
                        {
                          state.UsersList.amnetieshistory &&
                          [...new Map(state.UsersList.amnetieshistory.map(item => [item['Amnities_Name'], item])).values()].map((v) => {
                            return (
                              <div style={{ marginTop: 20 }} key={v.Amnities_Name}>
                                <span className="btn btn-sm rounded-pill" style={{ backgroundColor: "#D9E9FF", margin: 10, fontFamily: "Gilroy", fontWeight: 500, fontSize: 14 }}>
                                  {v.Amnities_Name} - ₹{v.Amount}/m
                                  <img
                                    src={cross}
                                    width={15}
                                    height={15}
                                    alt="Remove"
                                    style={{ marginLeft: '10px', cursor: 'pointer' }}

                                  />
                                </span>
                              </div>
                            );
                          })
                        }
                      </div>
                      <Table className="ebtable" responsive style={{ marginTop: 30, }}>
                        <thead style={{ backgroundColor: "#E7F1FF" }} >
                          <tr>
                            <th scope="col" style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amenities</th>
                            <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Date</th>
                            <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Subscription</th>
                            <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                            <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Status</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRowAmnities && currentRowAmnities?.map((v) => {
                            let Datform = new Date(v.created_At);
                            console.log("Datform..?", Datform);

                            let day = Datform.getDate();
                            let month = Datform.getMonth() + 1;
                            let year = Datform.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate);

                            return (
                              <tr key={v.amenity_Id}>
                                <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{v.Amnities_Name}</td>
                                <td><span style={{ backgroundColor: "#EBEBEB", padding: "3px 3px 3px 3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>Monthly</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{v.Amount}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>
                                  <span style={{
                                    color: "black",
                                    backgroundColor: v.status === 1 ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                                    paddingTop: "2px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "2px",
                                    borderRadius: "5px"
                                  }}>
                                    {v.status == 1 ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td>
                                <div onClick={() => handleEdit(v)} style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>

                                  {/* <img src={dottt} style={{ height: 40, width: 40,cursor:"pointer" }}  alt="edit" /> */}
                                </td>
                              </tr>
                            );
                          })}
                          {currentRowAmnities.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {currentRowAmnities.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: amnitiescurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: amnitiescurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleAmnitiesPageChange(amnitiescurrentPage - 1)}
                                disabled={amnitiescurrentPage === 1}
                              >
                                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                              <span
                                onClick={() => handleAmnitiesPageChange(amnitiescurrentPage - 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: amnitiescurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  color: amnitiescurrentPage === 1 ? '#ccc' : '#007bff'
                                }}
                              >
                                Previous
                              </span>
                            </li>
                            {amnitiescurrentPage > 3 && (
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
                                  onClick={() => handleAmnitiesPageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {amnitiescurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersAmnities()}
                            {amnitiescurrentPage < totalPagesAmnities - 2 && <span>...</span>}
                            {amnitiescurrentPage < totalPagesAmnities - 2 && (
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
                                  onClick={() => handleAmnitiesPageChange(totalPagesAmnities)}
                                >
                                  {totalPagesAmnities}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                              <span
                                onClick={() => handleAmnitiesPageChange(amnitiescurrentPage + 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: amnitiescurrentPage === totalPagesAmnities ? 'not-allowed' : 'pointer',
                                  color: amnitiescurrentPage === totalPagesAmnities ? '#ccc' : '#007bff'
                                }}
                              >
                                Next
                              </span>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: amnitiescurrentPage === amnitiescurrentPage ? '#ccc' : '#007bff',
                                  cursor: amnitiescurrentPage === amnitiescurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleAmnitiesPageChange(amnitiescurrentPage + 1)}
                                disabled={amnitiescurrentPage === totalPagesAmnities}
                              >
                                {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                            </li>
                          </ul>
                        </nav>

                      )}


                    </div>

                  }

                  {
                    transshow &&

                    <div>
                      <Table className="ebtable mt-3" responsive >
                        <thead style={{ color: "gray", fontSize: "11px", backgroundColor: "#E7F1FF" }}>
                          <tr className="" style={{ height: "30px" }}>

                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }}>Transaction ID</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>category</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Date</th>

                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Made of pyment</th>
                            <th ></th>

                          </tr>
                        </thead>
                        <tbody style={{ height: "50px", fontSize: "11px" }}>
                          {currentRowTransaction.map((v) => {
                            let Dated = new Date(v.created_at);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; // Months are zero-based
                            let year = Dated.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate);
                            return (
                              <tr key={v.id}>

                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>{v.user_id}</td>
                                <td ><span style={{ backgroundColor: "#FFEFCF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{v.type}</span></td>
                                <td><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                                {/* <td>₹{view.BalanceDue}</td> */}
                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>₹{v.amount}</td>
                                <td><span style={{ backgroundColor: "#D9E9FF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{v.payment_type}</span></td>
                                <td> 
                                <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex:  1000 }} >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                            </div>
                                  {/* <img src={dottt} style={{ height: 40, width: 40,cursor:"pointer"}} /> */}
                                  </td>


                              </tr>
                            )

                          })}
                          {currentRowTransaction.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )}

                        </tbody>
                      </Table>


                      {currentRowTransaction.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: transactioncurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: transactioncurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleTransactionPageChange(transactioncurrentPage - 1)}
                                disabled={transactioncurrentPage === 1}
                              >
                                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                              <span
                                onClick={() => handleTransactionPageChange(transactioncurrentPage - 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: transactioncurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  color: transactioncurrentPage === 1 ? '#ccc' : '#007bff'
                                }}
                              >
                                Previous
                              </span>
                            </li>
                            {transactioncurrentPage > 3 && (
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
                                  onClick={() => handleTransactionPageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {transactioncurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersTransaction()}
                            {transactioncurrentPage < totalPagesTransaction - 2 && <span>...</span>}
                            {transactioncurrentPage < totalPagesTransaction - 2 && (
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
                                  onClick={() => handleTransactionPageChange(totalPagesTransaction)}
                                >
                                  {totalPagesTransaction}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                              <span
                                onClick={() => handleTransactionPageChange(transactioncurrentPage + 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: transactioncurrentPage === totalPagesTransaction ? 'not-allowed' : 'pointer',
                                  color: transactioncurrentPage === totalPagesTransaction ? '#ccc' : '#007bff'
                                }}
                              >
                                Next
                              </span>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: transactioncurrentPage === transactioncurrentPage ? '#ccc' : '#007bff',
                                  cursor: transactioncurrentPage === transactioncurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleTransactionPageChange(transactioncurrentPage + 1)}
                                disabled={transactioncurrentPage === totalPagesTransaction}
                              >
                                {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>

                  }


                </div>
              )
            })}

          </>

        )
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