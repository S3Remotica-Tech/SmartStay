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
import Profile from '../Assets/Images/New_images/profile.png';
import squre from '../Assets/Images/New_images/minus-square.png';







function UserList() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const selectRef = useRef('select');
  console.log("state", state)


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
  const [currentPage, setCurrentPage] = useState(1);
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




  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // console.log("filteredDatas", filteredDatas)

  const [currentPages, setCurrentPages] = useState(1);
  const itemsPerPages = 7;
  const totalPagesFor = Math.ceil(filteredDatas.length / itemsPerPages);

  // console.log("totalPagesFor", totalPagesFor)
  const indexOfLastItems = currentPages * itemsPerPages;
  const indexOfFirstItems = indexOfLastItems - itemsPerPages;
  const currentItemsForInvoice = filteredDatas.slice(indexOfFirstItems, indexOfLastItems);

  console.log("currentItemsForInvoice", currentItemsForInvoice)

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

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
    }

  }

  const handleNextInvoice = () => {
    if (currentPages < totalPagesFor) {
      setCurrentPages((prevPage) => prevPage === totalPagesFor ? prevPage : prevPage + 1);
    }
  };

  const handlePreviousInvoice = () => {
    if (currentPages > 1) {
      setCurrentPages((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
    }

  }








  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handlePageChanges = (pageNumber) => {
    setCurrentPages(pageNumber);
  };

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

  const handleRoomDetailsPage = (userData, bed, room, floor, hostel_id) => {
    const clickedUserDataArray = Array.isArray(userData) ? userData : [userData];
    console.log("userData", userData)
    // sethostel(hostel_id)
    // setFloors_Id(floor)
    // setRoomsId(room)
    // setBed_Id(bed)
    setHostelIds(hostel_id)
    setBedIds(bed)
    setFloorIds(floor)
    setRoomsIds(room)
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


    // const filteredUserDetails = ParticularUserDetails.filter(details => details.length !== 0);

    setUserDetails(ParticularUserDetails);

    let User_Id = null;
    if (ParticularUserDetails.length > 0) {
      User_Id = ParticularUserDetails[0]?.User_Id;
      const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice?.filter(user => user.User_Id == User_Id);

      setFilteredDataForUser(filteredData);

    }

    // if (User_Id) {
    //   const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice.filter(user => user.User_Id == User_Id);

    //   setFilteredDataForUser(filteredData);

    //   }
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

      // setTimeout(()=>{
      //   dispatch({ type: 'MANUALINVOICE' })
      // },3000)

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
  const [Amnityuserdetail,setAmnityuserdetail]=useState([])

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
console.log("state.UsersList.CustomerdetailsgetStatuscode",state.UsersList.CustomerdetailsgetStatuscode)
  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      // dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
      setAmnityuserdetail(state.UsersList?.customerdetail?.all_amenities)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
      }, 1000)

    }
    
  }, [state.UsersList.CustomerdetailsgetStatuscode]);

 console.log("state.UsersList.AmentiesHistorygetStatuscode",state.UsersList.AmentiesHistorygetStatuscode)
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
  
    const amenitiesHistory = state.UsersList.amnetieshistory.filter((item)=>{
      return item.amenity_Id == value
    });
    console.log("state.UsersList.amnetieshistory.data", amenitiesHistory);
  
    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory && amenitiesHistory[0].status == 0) {
        console.log("Status is 0, setting add amenity show to true");
        setaddamenityShow(true);
        setstatusShow(false);
       
      }

      // const selectedAmenity = amenitiesHistory.find(item => item.amenity_Id == value);
  
      // if (selectedAmenity) {
      //   console.log("selectedAmenity", selectedAmenity);
      //   setaddamenityShow(false);
      //   setFiltshow(true);
      //   setSelectedAmenityName([selectedAmenity]);
      // } else {
      //   setaddamenityShow(true);
      //   setstatusShow(false);
      //   setSelectedAmenityName([]);
      // }
    } else {
      console.log("else");
      setaddamenityShow(true);
      setstatusShow(false);
      setSelectedAmenityName([]);
    }
  
    
     
  };




  
  

  // const handleselect = (e) => {
  //   const value = e.target.value;
  //   setselectAmneties(value);
  //   setamnitytableshow(true)
  //   console.log("e.target.value", value);

  //   const amenitiesHistory = state.UsersList.amnetieshistory;
  //   console.log("state.UsersList.amnetieshistory.data", amenitiesHistory);

  //   if (amenitiesHistory && amenitiesHistory.length > 0) {
  //     const selectedAmenity = amenitiesHistory.find(item => item.amenity_Id == value);

  //     if (selectedAmenity) {
  //       console.log("selectedAmenity", selectedAmenity);
  //       setaddamenityShow(false);
  //       setFiltshow(true)
  //       setSelectedAmenityName([selectedAmenity]);
  //     } else {
  //       setaddamenityShow(true);
  //       setstatusShow(false)
  //       setSelectedAmenityName([]);

  //     }
  //   } else {
  //     console.log("else");
  //     setaddamenityShow(true);
  //     setstatusShow(false)
  //     setSelectedAmenityName([]);
  //   }
  // }


  // const handleselect=((e)=>{
  //   setselectAmneties(e.target.value)
  //   console.log("e.target.value",e.target.value)
  //   console.log("state.UsersList.amnetieshistory.data",state.UsersList.amnetieshistory.data);
  //   if(state.UsersList.amnetieshistory.data && state.UsersList.amnetieshistory.data.length > 0){
  //   for (let i = 0; i < state.UsersList.amnetieshistory.data.length; i++) {
  //    if(state.UsersList.amnetieshistory.data[i].amenity_Id == e.target.value){
  //     console.log("state.UsersList.amnetieshistory.data[i].amenity_Id",state.UsersList.amnetieshistory.data[i].amenity_Id)
  //     setaddamenityShow(false)
  //     const selectedAmenity = state.UsersList?.amnetieshistory?.data && state.UsersList.amnetieshistory.data.filter((item) => {return item.amenity_Id == e.target.value});
  //     console.log("selectedAmenity",selectedAmenity)
  //     setSelectedAmenityName(selectedAmenity)
  //     break
  //    }
  //    else{
  //     setaddamenityShow(true)
  //     setSelectedAmenityName([])
  //    }
  //   }
  // }
  // else{
  //   console.log("else")
  //   setaddamenityShow(true)
  //   setSelectedAmenityName([])
  //  }

  // }
  // )
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




  // const handleselect = (e) => {
  //   setselectAmneties(e.target.value);
  //   console.log("e.target.value", e.target.value);

  //   const selectedAmenity = state.UsersList.amnetieshistory.data?.find(
  //     (item) => item.amenity_Id == e.target.value
  //   );

  //   if (selectedAmenity) {
  //     setaddamenityShow(false);
  //     console.log("selectedAmenity", selectedAmenity);
  //     setSelectedAmenityName(selectedAmenity);
  //     console.log("selectedAmenity.......?",selectedAmenity)
  //   } else {
  //     setaddamenityShow(true);
  //   }
  // };


  const uniqueAmenities = [];
  const seenNames = new Set();

  // if (state.UsersList?.amnetieshistory?.data) {
  //   state.UsersList.amnetieshistory.data.forEach((amenity) => {
  //     if (!seenNames.has(amenity.Amnities_Name)) {
  //       seenNames.add(amenity.Amnities_Name);
  //       uniqueAmenities.push(amenity);
  //     }
  //   });
  // }



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

  // const uniqueAmenities = [];
  // const seenNames = new Set();

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
          status: statusAmni
        }

      });
      setStatusAmni('')
    } else {
      dispatch({
        type: 'AddUserAmnities',
        payload: {
          hostelID: hostelIds,
          userID: customerUser_Id,
          amenityID: selectAmneties,
          created_By: createbyamni
        }
      });
      setStatusAmni('')
    }
   
    
   
  };
  console.log("state.UsersList?.customerdetails?.all_amenities?",state.UsersList?.customerdetails?.all_amenities);
  // useEffect(() => {
  //   if (id && state?.UsersList?.addUserAmnities) {
  //     dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } });
  //     dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } });
  //   }
  // }, [id, state?.UsersList?.addUserAmnities]);
  console.log("state.UsersList?.statusCustomerAddUser",state.UsersList.statusCustomerAddUser)
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser == 200 ) {
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
  // useEffect(() => {
  //   if (state.UsersList?.statusCustomerAddUser === 200) {
  //   setcustomerUser_Id('')
  //   setselectAmneties('')
  //   setStatusAmni('')
  //   }
  // }, [state.UsersList?.statusCustomerAddUser])

  // const removeAmnity = (v) => {
  //   setamnitynotshow([...amnitynotshow, v.amenity_Id]);
  //   setSelectedAmenityName(selectedAmenityName.filter(item => item.amenity_Id !== v.amenity_Id));
  //   setamnitytableshow(false);
  // };

  // const handleAddUserAmnities = () => {
  //   if (statusAmni) {
  //     dispatch({
  //       type: 'AddUserAmnities',
  //       payload: {
  //         userID: customerUser_Id,
  //         amenityID: selectAmneties,
  //         status: statusAmni
  //       }
  //     });
  //     dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
  //     dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } });
  //     setstatusShow(false)
  //     setaddamenityShow(false);

  //   }
  //   else {
  //     dispatch({
  //       type: 'AddUserAmnities',
  //       payload: {
  //         hostelID: hostelIds,
  //         userID: customerUser_Id,
  //         amenityID: selectAmneties,
  //         created_By: createbyamni
  //       }
  //     });
  //     dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
  //     dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } });
  //     setaddamenityShow(false);
  //   }


  // };


  // useEffect(() => {
  //   console.log("state For Add userAminity", state);
  // }, [state]);

  // useEffect(() => {
  //   if (id && state.UsersList.addUserAmnities) {
  //     dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: id } })
  //     console.log("user_id", id);
  //     dispatch({ type: 'AMENITESHISTORY', payload: { user_id: id } });
  //   }
  //   console.log("userIduserId", id);
  // }, [id, state.UsersList.addUserAmnities]);


  console.log("state For Add userAminity", state);
  const handleEdit = (v) => {
    console.log("vvv", v)

    setamnityEdit(v)
    setaddamenityShow(true);
    setstatusShow(true)
    setselectAmneties(v.amenity_Id)


  }


  // const removeAmnity =(v)=>{
  //   console.log("amenity,,,,,,123",v)
  //   setamnitynotshow([...amnitynotshow, v.amenity_Id]);
  //   // setamnitynotshow(amenity.amenity_Id)



  // }
  // const removeAmnity = (v) => {
  //   console.log("amenity,,,,,,123", v);
  //   setamnitynotshow([...amnitynotshow, v.amenity_Id]);
  //   const amntrem = setSelectedAmenityName(selectedAmenityName.filter(item => item.amenity_Id !== v.amenity_Id));
  //   console.log("amntrem", amntrem)
  //   setamnitytableshow(false)

  // };


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
        </div> */}
        <div className='container d-flex justify-content-end align-items-center mr-3'>

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
</div>
        <div className="d-flex justify-content-between align-items-center p-4 ">
          <div>
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, marginTop: 20 }}>Customers</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>

            <div>
              <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 151, padding: "18px, 20px, 18px, 20px" }}> + Add Customer</Button>
            </div>
          </div>
        </div>

        <div className="p-2" style={{ paddingBottom: 50 }} >


          {/* <Table className="ebtable" responsive  >
            <thead>
              <tr>
                <th><img src={squre} height={20} width={20}/>
                </th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone</th>
                <th>Paying Guest</th>
                <th>Room</th>
                <th>Bed</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {loading ? (
                Array.from({ length: currentItems?.length || 5 }).map((_, index) => (
                  <tr key={index}>
                    <td><Skeleton circle={true} height={40} width={40} /></td>
                    <td><Skeleton width={80} /></td>
                    <td><Skeleton width={120} /></td>
                    <td><Skeleton width={120} /></td>
                    <td><Skeleton width={120} /></td>
                    <td><Skeleton width={50} /></td>
                    <td><Skeleton width={50} /></td>
                  </tr>
                ))
              ) : (
                currentItems.map((user) => (
                  <tr key={user.Email} style={{ fontSize: "16px", fontWeight: 600, font: "Gilroy", textAlign: "center" }}>
                    <td > <img src={squre} height={20} width={20}/>
                    </td>
                    <td ><img src={User} alt={user.Name} style={{ height: 40, width: 40 }} />

                      <span style={{ fontSize: "16px", fontWeight: 600, font: "Gilroy" }} onClick={() => handleRoomDetailsPage(user, user.Bed, user.Rooms, user.Floor, user.Hostel_Id)}> {user.Name}</span>
                    </td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>
                    <td><span style={{ padding: "8px 16px 8px 16px", borderRadius: "60px", backgroundColor: "#FFEFCF", gap: "10px", height: "Hug (32px)", width: "Fixed (150px)" }}>{user.HostelName}</span></td>
                    <td>{user.Rooms}</td>
                    <td className={user.Bed === 0 ? 'assign-bed' : ''} onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null} style={{ textDecoration: "none" }}>
                      {user.Bed === 0 ? '+ Assign Bed' : user.Bed}
                    </td>
                    <td >
                      <img src={more} style={{ height: 20, width: 20 }} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </Table> */}
      {/* <Table  style={{  border: "1px solid #ddd", borderRadius: "10px"}}>
  <thead >
    <tr>
      <th style={{ textAlign: "center", padding: "10px" }}>
        <img src={squre} height={20} width={20} />
      </th>
      <th style={{ textAlign: "start", padding: "10px"}}>Name</th>
      <th style={{ textAlign: "start", padding: "10px"}} >Email ID</th>
      <th style={{ textAlign: "start", padding: "10px",  }}>Phone</th>
      <th style={{ textAlign: "start", padding: "10px",  }}>Paying Guest</th>
      <th style={{ textAlign: "start", padding: "10px",  }}>Room</th>
      <th style={{ textAlign: "start", padding: "10px",  }}>Bed</th>
      <th style={{ textAlign: "start", padding: "10px",  }}></th>
    </tr>
  </thead>
  <tbody style={{ textAlign: "center", border: "none",borderBottom:"none" }}>
    {loading ? (
      Array.from({ length: currentItems?.length || 5 }).map((_, index) => (
        <tr key={index} >
          <td style={{ padding: "10px", }}><Skeleton circle={true} height={40} width={40} /></td>
          <td style={{ padding: "10px",  }}><Skeleton width={80} /></td>
          <td style={{ padding: "10px", }}><Skeleton width={120} /></td>
          <td style={{ padding: "10px",  }}><Skeleton width={120} /></td>
          <td style={{ padding: "10px", }}><Skeleton width={120} /></td>
          <td style={{ padding: "10px",  }}><Skeleton width={50} /></td>
          <td style={{ padding: "10px",  }}><Skeleton width={50} /></td>
        </tr>
      ))
    ) : (
      currentItems.map((user) => (
        <tr key={user.Email} style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}>
          <td style={{ padding: "10px",bordor:"none" }}>
            <img src={squre} height={20} width={20} />
          </td>
          <td style={{ padding: "10px", display: "flex", alignItems: "center" }}>
            <img src={User} alt={user.Name} style={{ height: 40, width: 40, marginRight: "10px" }} />
            <span onClick={() => handleRoomDetailsPage(user, user.Bed, user.Rooms, user.Floor, user.Hostel_Id)}>
              {user.Name}
            </span>
          </td>
          <td style={{ padding: "10px",textAlign:"start" }}>{user.Email}</td>
          <td style={{ padding: "10px",textAlign:"start" }}>{user.Phone}</td>
          <td style={{ padding: "10px",textAlign:"start" }}>
            <span style={{ padding: "8px 16px", borderRadius: "60px", backgroundColor: "#FFEFCF",textAlign:"start" }}>{user.HostelName}</span>
          </td>
          <td style={{ padding: "10px",textAlign:"center" }}>{user.Rooms}</td>
          <td
            className={user.Bed === 0 ? 'assign-bed' : ''}
            onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
            style={{ padding: "10px", textDecoration: user.Bed === 0 ? "none" : "initial" }}
          >
            {user.Bed === 0 ? '+ Assign Bed' : user.Bed}
          </td>
          <td style={{ padding: "10px"}}>
            <img src={more} style={{ height: 20, width: 20 }} />
          </td>
        </tr>
      ))
    )}
  </tbody>
</Table> */}

<Table style={{ borderCollapse: "separate", borderSpacing: 0, border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center", padding: "10px" }}>
        <img src={squre} height={20} width={20} />
      </th>
      <th style={{ textAlign: "start", padding: "10px",color:"#939393" }}>Name</th>
      <th style={{ textAlign: "start", padding: "10px",color:"#939393" }}>Email ID</th>
      <th style={{ textAlign: "start", padding: "10px",color:"#939393" }}>Phone</th>
      <th style={{ textAlign: "start", padding: "10px" ,color:"#939393"}}>Paying Guest</th>
      <th style={{ textAlign: "start", padding: "10px",color:"#939393" }}>Room</th>
      <th style={{ textAlign: "start", padding: "10px",color:"#939393" }}>Bed</th>
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
        const imageUrl = user.profile || User;
        console.log('Image URL:', imageUrl);
        return(
          <tr key={user.Email} style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}>
          <td style={{ padding: "10px", border: "none" }}>
            <img src={squre } height={20} width={20} />
          </td>
          <td style={{ padding: "10px", border: "none", display: "flex", alignItems: "center" }}>
            {/* <img src={user.profile ? user.profile:User}  style={{ height: 40, width: 40, marginRight: "10px" }} /> */}
            {/* <Image src={user.profile ? user.profile:User} roundedCircle style={{ height: "40px", width: "40px" }} /> */}
            <Image
      src={imageUrl}
      alt={user.Name || "Default Profile"}
      roundedCircle
      style={{ height: "40px", width: "40px", marginRight: "10px" }}
      onError={(e) => {
        e.target.onerror = null; // Prevents infinite loop
        e.target.src = User; // Fallback to default image
      }}
    />
            <span onClick={() => handleRoomDetailsPage(user, user.Bed, user.Rooms, user.Floor, user.Hostel_Id)}>
              {user.Name}
            </span>
          </td>
          <td style={{ padding: "10px", border: "none", textAlign: "start" }}>{user.Email}</td>
          <td style={{ padding: "10px", border: "none", textAlign: "start" }}>{user.Phone}</td>
          <td style={{ padding: "10px", border: "none", textAlign: "start" }}>
            <span style={{ padding: "8px 16px", borderRadius: "60px", backgroundColor: "#FFEFCF", textAlign: "start" }}>{user.HostelName}</span>
          </td>
          <td style={{ padding: "10px", border: "none", textAlign: "center" }}>{user.Rooms}</td>
          {/* <td
            className={user.Bed === 0 ? 'assign-bed' : ''}
            onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
            style={{ padding: "10px", border: "none", textDecoration: user.Bed === 0 ? "none" : "initial" }}
          >
            {user.Bed === 0 ? '+ Assign Bed' : user.Bed}
          </td> */}
    <td
  className={user.Bed === 0 ? 'assign-bed' : ''}
  onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
  style={{
    padding: "10px",
    border: "none",
    color: user.Bed === 0 ? "blue" : "inherit",
    textDecoration: user.Bed === 0 ? "none" : "initial"
  }}
>
  {user.Bed === 0 ? '+ Assign Bed' : user.Bed}
</td>
          <td style={{ padding: "10px", border: "none" }}>
            <img src={dottt} style={{ height: 20, width: 20 }} />
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



        {/* <div className="p-3" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}> */}

        {/* <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
            </div>
            <Dropdown onSelect={(eventKey) => handlePageChange(parseInt(eventKey))} >
              <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
                {activePage} - {currentPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {generatepagenumbers().map((pageNumber) => (
                  <Dropdown.Item key={pageNumber} eventKey={pageNumber}>
                    {currentPage} - {pageNumber}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
              of <label>{currentPage}</label>
            </div>
          </div> */}

        <div style={{ display: "flex", flexDirection: "row", alignItems: "end", justifyContent: "flex-end" }}>

          <div onClick={handlePrevious} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
            Prev
          </div>
          <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD', padding: 10, borderRadius: "50%", height: 20, width: 20, marginTop: 20 }}> {currentPage}  </span>
          <div onClick={handleNext} disabled={currentPage === totalPages} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
            Next
          </div>
        </div>
        {/* </div> */}




      </>}


      {
        roomDetail && (
          <>
            {userDetails && userDetails.map((item, index) => {
                const imageUrl = item.profile || User;
            return(
              <div className="container mt-2">
              <div className='d-flex justify-content-end align-items-center m-4'>

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
              </div>

              <div style={{ marginLeft: 20, paddingBottom: 50 }}><img src={leftarrow} onClick={handleBack} /><span style={{ fontWeight: 600, fontSize: "20px", marginLeft: 15 }}>UserProfile</span> </div>
              <div className="card" style={{ height: 100 }}>
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {/* <img src={item.profile ? item.profile:User} alt="Profile" className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} /> */}
                    <Image
      src={imageUrl}
      alt={item.Name || "Default Profile"}
      roundedCircle
      style={{ height: "40px", width: "40px", marginRight: "10px" }}
      onError={(e) => {
        e.target.onerror = null; // Prevents infinite loop
        e.target.src = User; // Fallback to default image
      }}
    />
                    <div>
                      <h5 className="card-title mb-0">
                        {item.Name} <span className="text-primary"><i className="bi bi-check-circle-fill"></i></span>
                      </h5>
                      {/* <p className="mb-0">{getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed} | {getFloorName(item.Floor)}</p> */}
                      <p style={{marginTop:10}}>
                        <span style={{ backgroundColor: '#FFE0D9',padding:"3px 3px 3px 3px",borderRadius:"10px" }}>
                          {getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}
                        </span>
                        {' | '}
                        <span style={{ backgroundColor: '#FFEFCF',padding:"3px 3px 3px 3px",borderRadius:"10px" }}>
                          {getFloorName(item.Floor)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <img src={dottt} width={40} height={40} alt="More options" onClick={() => { handleShowAddBed(item) }} />
                </div>
              </div>



              <div className="tapppinfour" style={{ font: "Gilory", fontWeight: 500, fontSize: 16 }}>
                <div className={`tab-item ${overviewshow ? 'active' : ''}`} onClick={handleoverviewShow}>OverView</div>

                <div className={`tab-item ${ebShow ? 'active' : ''}`} onClick={handleebViewShow}>EB Reading</div>
                <div className={`tab-item ${invoiceshow ? 'active' : ''}`} onClick={handleinvoiceShow}>Invoice</div>
                <div className={`tab-item ${amnitiesshow ? 'active' : ''}`} onClick={handleamnitiesShow}>Amnities</div>
                <div className={`tab-item ${transshow ? 'active' : ''}`} style={{ marginRight: "25%" }} onClick={handletransShow}>Transaction</div>

              </div>

            

            




                {
                  overviewshow &&
                  <div className="overdue">
                    <div style={{ flex: 1 }}>
                      <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center" style={{backgroundColor:"white"}}>
                          <div style={{ fontSize: 16, fontWeight: 600 }}>
                            Basic Information
                          </div>
                          <div>
                            <img src={dottt} alt="More Options" onClick={() => { handleShow(item) }} />
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="row mb-3">
                            <div class="col-sm-6">
                              <strong>Paying Guest</strong>
                              <p><img src={building} /><span style={{marginLeft:5}}>{item.HostelName}</span></p>
                            </div>
                            <div class="col-sm-6 text-right">
                              <strong>Room/Bed</strong>
                              <p ><img src={Group} /><span style={{marginLeft:5}}>{getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}</span></p>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <div class="col-sm-6">
                              <strong>Email</strong>
                              <p><img src={sms} /> {item.Email}</p>
                            </div>
                            <div class="col-sm-6 text-right">
                              <strong>Mobile no.</strong>
                              <p><img src={call} /> {item.Phone}</p>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <div class="col-sm-6">
                              <strong>Address</strong>
                              <p><img src={house} /> {item.Address}</p>
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
                            <div class="card">
                              <div class="card-header d-flex justify-content-between align-items-center" style={{backgroundColor:"white"}}>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>
                                  Detailed Information
                                </div>
                                <div>
                                  <img src={dottt} alt="More Options" />
                                </div>
                              </div>
                              <div class="card-body">
                                <div class="row mb-3">
                                  <div class="col-sm-4">
                                    <strong>Advance Amount</strong>
                                    <p>₹{g.AdvanceAmount}</p>
                                  </div>
                                  <div class="col-sm-4">
                                    <strong>Rent Amount</strong>
                                    <p>₹{g.RoomRent}/m</p>
                                  </div>

                                </div>
                                <div class="row mb-3">
                                  <div class="col-sm-12">
                                    <strong>Amenities</strong>

                                    <div class="d-flex flex-wrap mt-2">
                                      {
                                        g?.amentites?.length > 0 && g?.amentites.map((p) => {
                                          return (
                                            <div  style={{ backgroundColor: "#E0ECFF", borderRadius: "10px",paddingLeft:"12px",paddingRight:"12px",fontSize:"13px",fontWeight:500,paddingTop:"2px",paddingBottom:"3px",margin:"10px" }}>{p.Amnities_Name}</div>

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
                }

                {
                  ebShow &&
                  <div>




                    <div>
                      <Table className="ebtable" responsive  >
                        <thead >
                          <tr >

                            <th style={{ paddingLeft: "40px", color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Floor</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Room no</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Start meter</th>

                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>End meter</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Dated</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Total units</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Units used</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Amount</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}></th>
                          </tr>
                        </thead>
                        <tbody style={{ height: "50px", fontSize: "11px" }}>
                          {state.UsersList.customerdetails.eb_data.map((u) => {
                            let Dated = new Date(u.Date);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; // Months are zero-based
                            let year = Dated.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate);
                            return (
                              <tr key={u.id} style={{ lineHeight: "20px" }}>

                                <td style={{ paddingLeft: "40px", fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.Floor_Id}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.Room_No}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>₹{u.start_Meter_Reading}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.end_Meter_Reading}</td>
                                <td> <span style={{ backgroundColor: "#EBEBEB", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{formattedDate}</span></td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.Eb_Unit}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.Eb_Unit}</td>
                                <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{u.pay_eb_amount}</td>
                                <td >
                                  <img src={dottt} style={{ height: 40, width: 40 }} /></td>

                              </tr>
                            )


                          })}
                          {currentItemsForInvoice.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )}

                        </tbody>
                      </Table>

                    </div>





                  </div>
                }


                {
                  invoiceshow &&
                  <div>

                    <Table className="ebtable" responsive >
                      <thead style={{ color: "gray", fontSize: "11px", marginLeft: 10 }}>
                        <tr className="" style={{ height: "30px" }}>
                          <th style={{ paddingLeft: "40px", color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Invoice number</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Created</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Due Date</th>

                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Amount</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Due</th>

                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody style={{ height: "50px", fontSize: "11px" }}>
                        {state.UsersList.customerdetails.invoice_details.map((view) => {
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
                              <td style={{ paddingLeft: "40px", fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{view.Invoices}</td>

                              <td ><span style={{ backgroundColor: "#EBEBEB", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{formattedDate}</span></td>
                              <td ><span style={{ backgroundColor: "#EBEBEB", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{DueformattedDate}</span></td>
                              <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>₹{view.Amount}</td>
                              <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>₹{view.BalanceDue}</td>
                              <td><span style={{
                                color: "black",
                                backgroundColor: view.Status === 'Success' ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                                padding: "5px 10px",
                                fontSize: "16px",
                                fontWeight: 500,
                                borderRadius: "10px"
                              }}>{view.Status === 'Success' ? 'Paid' : 'UnPaid'}</span></td>
                              {/* <td style={view.Status === "Paid" ? { color: "green", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"} : { color: "red", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"}}>{view.Status == Paid ? 'Paid' : 'UnPaid'}</td> */}
                              <td> <img src={dottt} style={{ height: 40, width: 40 }} /></td>

                            </tr>

                          )

                        })}
                        {currentItemsForInvoice.length === 0 && (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                          </tr>
                        )}

                      </tbody>
                    </Table>
                  </div>
                }

                {
                  amnitiesshow &&


                  <div className="container mt-2">
                    <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                      <Form.Label style={{ fontSize: "14px", fontWeight: 600, font: "Gilroy" }}>Amnities</Form.Label>
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
                        <option>Select Amnities</option>
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


                        {/* <div className='mb-3 ps-2 pe-2'>
            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
            <Form.Select aria-label="Default select example" style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
              <option style={{ fontSize: 14, fontWeight: 600 }}>Select Status</option>
              <option value="1">Active</option>
              <option value="0">In Active</option>
            </Form.Select>
          </div> */}
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


                    {/* <div className="d-flex flex-wrap mt-2">
{selectedAmenityName.length > 0 ? (
  state.UsersList.amnetieshistory
    .filter((amenity) => !amnitynotshow.includes(amenity.amenity_Id))
    .map((amenity, index) => (
      <div
        key={index}
        className="p-2 m-2"
        style={{ backgroundColor: "#E0ECFF", borderRadius: "20px" }}
      >
        {amenity.Amnities_Name} - ₹{amenity.Amount}
        <img
          src={cross}
          width={15}
          height={15}
          alt="Remove"
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => removeAmnity(amenity)}
        />
      </div>
    ))
) : (
  <div>No amenities available</div>
)}
</div> */}
<div className="d-flex flex-wrap mt-2">
                    {
                      state.UsersList.amnetieshistory && state.UsersList.amnetieshistory && state.UsersList.amnetieshistory && state.UsersList.amnetieshistory.map((v) => {
                        return (
                          <div style={{ marginTop: 20 }} key={v.Amnities_Name}>
                            <span className="btn btn-sm rounded-pill" style={{ backgroundColor: "#D9E9FF",margin:10 }}>
                              {v.Amnities_Name} - ₹{v.Amount}/m
                              <img
                                src={cross}
                                width={15}
                                height={15}
                                alt="Remove"
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                                // onClick={() => removeAmnity(v)}
                              />
                            </span>
                          </div>
                        );

                      })
                    }
</div>
                    
                      
                       
                          <Table className="ebtable" responsive style={{ marginTop: 30, }}>
                            <thead >
                              <tr>
                                <th scope="col" style={{ paddingLeft: "40px", color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Amenities</th>
                                <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Date</th>
                                <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Subscription</th>
                                <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Amount</th>
                                <th scope="col" style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Status</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                   
                            <tbody>
                              {state.UsersList.amnetieshistory && state.UsersList.amnetieshistory.map((v) => {
                                let Datform = new Date(v.created_At);
                                console.log("Datform..?", Datform);

                                let day = Datform.getDate();
                                let month = Datform.getMonth() + 1; // Months are zero-based
                                let year = Datform.getFullYear();

                                let formattedDate = `${day}/${month}/${year}`;
                                console.log("Formatted Date:", formattedDate);

                                return (
                                  <tr key={v.amenity_Id}>
                                    <td style={{ paddingLeft: "40px", fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{v.Amnities_Name}</td>
                                    <td><span style={{ backgroundColor: "#EBEBEB", padding: "3px 3px 3px 3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0" }}>{formattedDate}</span></td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>Monthly</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>{v.Amount}</td>
                                    <td style={{ fontWeight: 500, fontSize: "16px", font: "Gilroy" }}>
                                      <span style={{
                                        color: "black",
                                        backgroundColor: v.status === 1 ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                                        padding: "5px 10px",
                                        borderRadius: "5px"
                                      }}>
                                        {v.status == 1 ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td>
                                      <img src={dottt} style={{ height: 40, width: 40 }} onClick={() => handleEdit(v)} alt="edit" />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                      
                  



                  </div>

                }

                {
                  transshow &&

                  <div>
                    <Table className="ebtable" responsive >
                      <thead style={{ color: "gray", fontSize: "11px" }}>
                        <tr className="" style={{ height: "30px" }}>

                          <th style={{ paddingLeft: "40px", color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Transaction ID</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>category</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Date</th>

                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Amount</th>
                          <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", font: "Gilroy" }}>Made of pyment</th>
                          <th ></th>

                        </tr>
                      </thead>
                      <tbody style={{ height: "50px", fontSize: "11px" }}>
                        {state.UsersList.customerdetails.transactions.map((v) => {
                          let Dated = new Date(v.created_at);
                          console.log("Dated..?", Dated);

                          let day = Dated.getDate();
                          let month = Dated.getMonth() + 1; // Months are zero-based
                          let year = Dated.getFullYear();

                          let formattedDate = `${day}/${month}/${year}`;
                          console.log("Formatted Date:", formattedDate);
                          return (
                            <tr key={v.id}>

                              <td style={{ paddingLeft: "40px", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{v.user_id}</td>
                              <td ><span style={{ backgroundColor: "#FFEFCF", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{v.type}</span></td>
                              <td><span style={{ backgroundColor: "#EBEBEB", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>{formattedDate}</span></td>
                              {/* <td>₹{view.BalanceDue}</td> */}
                              <td style={{ fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>₹{v.amount}</td>
                              <td><span style={{ backgroundColor: "#D9E9FF", padding: "5px 10px 6px 10px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, font: "Gilroy" }}>Cash</span></td>
                              <td> <img src={dottt} style={{ height: 40, width: 40 }} /></td>


                            </tr>
                          )


                        })}
                        {currentItemsForInvoice.length === 0 && (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                          </tr>
                        )}

                      </tbody>
                    </Table>

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

          showMenu={showMenu} displayDetail={addBasicDetail} setShowMenu={setShowMenu} handleShow={handleShow} edit={edit} setEdit={setEdit} EditObj={EditObj} setEditObj={setEditObj} handleMenuClick={handleMenuClick} setShowForm={setShowForm} showForm={showForm} setUserClicked={setUserClicked} handleEdit={handleEdit} handleShowAddBed={handleShowAddBed}/> : null
      }

    </div>

  )
}

export default UserList