import React, { useRef, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Calendars from '../Assets/Images/New_images/calendar.png'
import Emptystate from '../Assets/Images/Empty-State.jpg'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Table, Dropdown } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import addcircle from "../Assets/Images/New_images/add-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import Filters from "../Assets/Images/Filters.svg";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'sweetalert2/dist/sweetalert2.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import '../Pages/Compliance.css'
import CryptoJS from "crypto-js";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ArrowLeft2, ArrowRight2, MoreCircle, } from "iconsax-react";


import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import { FaSearch } from 'react-icons/fa';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
// import AddVendor from './AddVendormodal';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
// import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Tickicon from '../Assets/Images/tick-circle.png'
import Profile_add from '../Assets/Images/profile-add.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import User from '../Assets/Images/Profile-complaint.png';
import Calendor from '../Assets/Images/calendar.png';
import Badge from 'react-bootstrap/Badge';
import { Description, Room } from '@material-ui/icons';
import closecircle from "../Assets/Images/New_images/close-circle.png";
import ComplianceList from './ComplianceList';
import { MdError } from "react-icons/md";
// import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import excelimg from "../Assets/Images/New_images/excel_blue.png";

const Compliance = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState(state.ComplianceList.Compliance);

  const initialValuesRef = useRef({});

  const bottomBorderStyles = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "",
    paddingLeft: "2px",
    backgroundColor: "#E6ECF8"
  };


  const [id, setId] = useState('')
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Complainttype, setComplainttype] = useState('');
  const [description, setDescription] = useState('')
  const [Assign, setAssign] = useState('');
  const [Status, setStatus] = useState('')
  const [date, setDate] = useState('');
  const [editbtn, setEditbtn] = useState(false)
  const [hostel_Id, setHostel_Id] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [room_name, setRoomName] = useState('')
  const [beds, setBeds] = useState('');
  const [userid, setUser_Id] = useState('')
  const [loading, setLoading] = useState(true);
  const [hosId, setHosId] = useState("")
  const [floorname,setFloorname] = useState('')


  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState(false);

  const [filterByDate, setFilterByDate] = useState("");
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState("ALL");
  const LoginId = localStorage.getItem("loginId")
  const [login_Id, setLogin_Id] = useState('')

  const [compliancerolePermission, setComplianceRolePermission] = useState("");

  const [compliancepermissionError, setCompliancePermissionError] = useState("");
  const [complianceAddPermission, setComplianceAddPermission] = useState("")
  const [complianceDeletePermission, setComplianceDeletePermission] = useState("")
  const [complianceEditPermission, setComplianceEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHosId(state.login.selectedHostel_Id)
    }
  }, [state.login.selectedHostel_Id])
  

  useEffect(()=>{
    if(hosId){
      dispatch({ type: "COMPLAINT-TYPE-LIST", payload: {hostel_id: hosId}});
    }
  
  },[hosId])

  useEffect(() => {
    if (state.UsersList?.exportComplianceDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportComplianceDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportComplianceDetails?.response?.fileUrl]);

  const handleComplianceeExcel = () => {
    dispatch({ type: "EXPORTCOMPLIANCEDETAILS", payload: { type: "complaint", hostel_id: hosId } });
    setIsDownloadTriggered(true)
  };
  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {

      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        ;
        setExcelDownload("");
        setIsDownloadTriggered(false)
      }, 500);
    }
  }, [excelDownload && isDownloadTriggered]);
  useEffect(() => {
    if (state.UsersList?.statusCodeForExportcompliance === 200) {

      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_COMPLIANCE_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportcompliance])

  useEffect(() => {
    if (state.ComplianceList?.statusCodeCompliance === 200) {
      setFilteredUsers(state.ComplianceList.Compliance);

      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_LIST" });
      }, 1000);
    }
  }, [state.ComplianceList?.statusCodeCompliance,])

  useEffect(() => {
    setComplianceRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_view == 1
    ) {
      setCompliancePermissionError("");
    } else {
      setCompliancePermissionError("Permission Denied");
    }
  }, [compliancerolePermission]);



  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_create == 1
    ) {
      setComplianceAddPermission("");
    } else {
      setComplianceAddPermission("Permission Denied");
    }
  }, [compliancerolePermission]);


  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_delete == 1
    ) {
      setComplianceDeletePermission("");
    } else {
      setComplianceDeletePermission("Permission Denied");
    }
  }, [compliancerolePermission]);
  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_edit == 1
    ) {
      setComplianceEditPermission("");
    } else {
      setComplianceEditPermission("Permission Denied");
    }
  }, [compliancerolePermission]);
  useEffect(() => {
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {

      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostel_id: hosId } })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_COMPLIANCE' })
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance])

  useEffect(() => {
    if(hosId){
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostel_id: hosId } })
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: hosId },
      });
    }
  
  }, [hosId])
  useEffect(() => {
    // Run whenever there's an update in statusCodeForAddCompliance or filterInput
    if (state.ComplianceList.statusCodeForAddCompliance === 200) {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostel_id: hosId } });

      setTimeout(() => {
        dispatch({ type: 'CLEAR_COMPLIANCE_STATUS_CODE' });
      }, 500);
    }

    if (state.ComplianceList.Compliance) {
      const filteredItems = state.ComplianceList.Compliance.filter((user) =>
        user.Name.toLowerCase().includes(filterInput.toLowerCase())
      );
      setFilteredUsers(filteredItems);
    } else {
      setFilteredUsers(state.ComplianceList.Compliance || []);
    }

  }, [state.ComplianceList.statusCodeForAddCompliance, filterInput]);




  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const options = {
    dateFormat: 'd/m/Y',
    defaultDate: null,
    // defaultDate: selectedDate,
    maxDate: new Date(),
    minDate: null,
  };



  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
      setDateErrmsg('')
    }
  }, [selectedDate])



  // useEffect(() => {
  //   if (state?.ComplianceList?.Compliance && filteredUsers.length === 0) {
  //     setFilteredUsers(state.ComplianceList.Compliance);
  //   }
  // }, [state?.ComplianceList?.Compliance, filteredUsers]);




  // const itemsPerPage = 7;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems =
  filterInput.length > 0
    ? filteredUsers 
    : filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [file, setFile] = useState(null)
  const [filtericon, setFiltericon] = useState(false)
  const [statusfilter, setStatusfilter] = useState('')



  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [hostelname, setHostelName] = useState('')


  const [assignerrormsg, setAssignErrmsg] = useState('');
  const [statsuserrormsg, setStatusErrmsg] = useState('');
  const [dateerrmsg, setDateErrmsg] = useState('');
  const [usererrmsg, setUserErrmsg] = useState('');
  const [complaint_typeerrmsg, setComplaintTypeErrmsg] = useState('')
  const [totalErrormsg, setTotalErrmsg] = useState('')



  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("")
  };


  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };
  
const handleFilterd = () => {
  setFilterStatus(!filterStatus);
}



  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    setDropdownVisible(e.target.value.length > 0);
  };

  const handleUserSelect = (user) => {
    setFilterInput(user.Name);

    // Set filteredUsers to only the selected user's data
    const selectedUserData = state.ComplianceList.Compliance.filter(
      (item) => item.Name === user.Name
    );
    setFilteredUsers(selectedUserData);

    setDropdownVisible(false);  // Close the dropdown after selection
  };


  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }

  const handleStatusFilter = (event) => {
    const searchTerm = event.target.value;
    console.log("searchTerm",searchTerm)
    setStatusfilter(searchTerm)
    if (searchTerm == "All") {
      setFilteredUsers(state.ComplianceList.Compliance)
    }
    else {
      const filteredItems = state.ComplianceList.Compliance.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredUsers(filteredItems);
      
    }
  }
  console.log("data",data)

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };


  const handleFormclose = () => {
    handleMenuClick();
    setShowMenu(false);
    setId('')
    setName('')
    setPhone('')
    setComplainttype('')
    setAssign('')
    setDescription('')
    setDate('')
    setStatus('')
    setHostel_Id('')
    setFloor('')
    setRooms('')
    setFloorname('')
  }

  const handlePhone = (e) => {
    let phoneNo = e.target.value;
    setPhone(e.target.value)
    if (phoneNo.length === 10) {
      setPhone(phoneNo)
    }

  }




  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchTerm != '') {
      const filteredItems = state.ComplianceList.Compliance.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setData(filteredItems);
    }
    else {
      setData(state.ComplianceList.Compliance)
    }
  }







  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }

  const handleNextClick = () => {

    setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
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
  const handleDatePicker = (e) => {
    setDate(e.target.value)
  }


  const [usersId, setUsersId] = useState('')





  useEffect(() => {
    if (state.UsersList?.UserListStatusCode == 200) {
      const uniqueOptions = Array.from(new Set(state.UsersList?.Users.map((item) => item.User_Id)));


      setUsersId(uniqueOptions);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_USER' })
      }, 1000)
    }

  }, [state.UsersList.UserListStatusCode])






  const [selectedUsername, setSelectedUserName] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);



  useEffect(() => {
    if (selectedUsername) {
      const filteredDetails = state.UsersList.Users.filter(item => {
        return item.Name == selectedUsername
      }
      )
      if (filteredDetails.length > 0) {
        console.log('filteredDetails',filteredDetails );
        
        setFilteredUserDetails(filteredDetails);
        const firstFilteredDetail = filteredDetails[0];
        // setName(firstFilteredDetail.Name || '');
        // setPhone(firstFilteredDetail.Phone || '');
        setHostel_Id(firstFilteredDetail.Hostel_Id || '');
        setHostelName(firstFilteredDetail.HostelName || '');
        setFloor(firstFilteredDetail.Floor || '');
        setBeds(firstFilteredDetail.Bed || '');
        setRooms(firstFilteredDetail.room_id || '');
        setUser_Id(firstFilteredDetail.User_Id || '');
        setRoomName(firstFilteredDetail.Rooms || '')
        setFloorname(firstFilteredDetail.floor_name || '')

      } else {
        setFilteredUserDetails([]);
        setName('');
        // setPhone('');
        setHostelName('');
        setBeds('')
        setFloor('');
        setRooms('');
        setFloorname('');
      }
    } else {
      setFilteredUserDetails([]);
      setName('');
      // setPhone('');
      setHostelName('');
      setBeds('')
      setFloor('');
      setRooms('');
      setFloorname ('')
    }
  }, [selectedUsername]);

  const handleCheckoutChange = (event, newValue) => {
    setSelectedUserName(event.target.value);
    if (!event.target.value) {
      setUserErrmsg("Please Select Name")
    }
    else {
      setUserErrmsg('')
    }
  };



  const [show, setShow] = useState(false);

  const handleShow = () => {
    setEdit(false)
    setShow(true);
  }
  const handleClose = () => {
    // setEdit(!edit)
    setShow(false);
    setSelectedUserName('');
    setComplainttype('');
    setAssign('');
    setDescription('');
    setSelectedDate('')
    setDate('');
    setBeds('')
    setFloor('');
    setRooms('');
    setHostelName('');
    setStatus('');
    setFloorname('')
  }

  const [Assignpopupshow, setAssignpopupshow] = useState(false);

  const handleAssignShow = () => {
    setAssignpopupshow(true);
  }
  const handleAssignClose = () => {
    setAssignpopupshow(false);
  }

  const [edit, setEdit] = useState(false)


  const handleComplaintType = (e) => {
    setComplainttype(e.target.value)
    if (!e.target.value) {
      setComplaintTypeErrmsg("Please Select ComplaintType");
    } else {
      setComplaintTypeErrmsg("");
    }
  }

  const handleAssign = (e) => {
    setAssign(e.target.value)
    if (!e.target.value) {
      setAssignErrmsg("Please Enter Assign");
    } else {
      setAssignErrmsg("");
    }
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
    if (!e.target.value) {
      setStatusErrmsg("Please Enter Status");
    } else {
      setStatusErrmsg("");
    }
  }


  const handleAddcomplaint = () => {


    //   if(!selectedUsername || !Complainttype || !selectedDate  ||  !Status){
    //     setTotalErrmsg('Please Enter All field')
    //     setTimeout(()=> {
    //       setTotalErrmsg('')
    //     },2000)
    //     return;
    // }

    if (!selectedUsername) {
      setUserErrmsg('Please Select  Customer')
      // return;
    }

    if (!Complainttype) {
      setComplaintTypeErrmsg('Please Select  Complaint Type')
      // return;
    }




    if (!Status) {
      setStatusErrmsg('Please Select status')
      // return;
    }

    if (!selectedDate) {
      setDateErrmsg('Please Select date')
      // return;
    }


    setEdit(false)

    if (Complainttype && selectedDate && hostelname && beds && Rooms) {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      if (id && hasChanges) {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: formattedDate, Hostel_id: hostel_Id, Bed: beds, Room: Rooms, hostelname: hostelname, Floor_id: Floor, Status: Status, User_id: userid, id: id, Description: description } })
        handleClose()
        setSelectedUserName('');
        setComplainttype('');
        setAssign('');
        setDescription('');
        setSelectedDate('')
        setBeds('')
        setFloor('');
        setRooms('');
        setHostelName('');
        setStatus('');
        setId('');
        setHostel_Id('')
      }
      else {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: formattedDate, Hostel_id: hostel_Id, Bed: beds, Room: Rooms, hostelname: hostelname, Floor_id: Floor, User_id: userid, Status: Status, Description: description } })
        handleClose()
        setSelectedUserName('');
        setComplainttype('');
        setAssign('');
        setDescription('');
        setSelectedDate('')
        setBeds('')
        setFloor('');
        setRooms('');
        setHostelName('');
        setStatus('');
        setId('');
        setHostel_Id('')
      }


    }

  }



  const [editdata, setEditData] = useState('')
  const [editcomplainttype, setEditcomplainttype] = useState('')
  const [floor_name, setFloorName] = useState('')
  // const [room_name, setRoomName] = useState('')


  const handleEditcomplaint = (Complaintdata) => {

    setEdit(true)
    if (Complaintdata) {
      setEditData(Complaintdata)
      setShow(true);
      // setCheck('EDIT')
      setId(Complaintdata.ID)
      setSelectedUserName(Complaintdata.Name);
      setComplainttype(Complaintdata.Complainttype);
      setEditcomplainttype(Complaintdata.complaint_name)
      setAssign(Complaintdata.Assign);
      setDescription(Complaintdata.Description);
      // setDate(format(new Date(Complaintdata.date), 'yyyy-MM-dd'));
      setSelectedDate(new Date(Complaintdata.date), 'dd/MM/yyyy');
      setHostel_Id(Complaintdata.Hostel_id)
      setBeds(Complaintdata.Bed)
      setFloor(Complaintdata.Floor_id);
      setRooms(Complaintdata.Room);
      setHostelName(Complaintdata.hostelname);
      setStatus(Complaintdata.Status)


      initialValuesRef.current = {
        Assign: Complaintdata.Assign,
        Description: Complaintdata.Description,
        Status: Complaintdata.Status
      };
    }
  };

  let hasChanges =
    Assign !== initialValuesRef.current.Assign ||
    description !== initialValuesRef.current.Description ||
    Status !== initialValuesRef.current.Status ||


    // useEffect(() => {
    //   handleEditcomplaint(editdata)
    // }, [editdata]);


    console.log("description", description);
  console.log("date", date);
  console.log("assign", Assign);

  useEffect(() => {
    const closeButton = document.querySelector('button[aria-label="close-button"]');
    if (closeButton) {
      closeButton.style.backgroundColor = 'white';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '10px';
      closeButton.style.height = '10px';
      closeButton.style.border = '1.5px solid #000000';
      closeButton.style.padding = '9px';
    }
  }, []);

  const [complainttypelist, setComplainttypelist] = useState([])

  // useEffect(() => {
    
  //     dispatch({ type: 'GETUSERSTAFF', payload: { hostel_id: hosId}})
    
  // }, [hosId])
  useEffect(() => {
      if (hosId) {
        dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: hosId } });
      }
    }, [hosId]);
    useEffect(()=>{
    if(state.Settings.StatusForaddSettingStaffList === 200){
      setTimeout(() => {
        dispatch({ type: 'CLEAR_USER_STAFF_LIST' });
      }, 500);
    }
      },[state.Settings.StatusForaddSettingStaffList])

  
  useEffect(() => {
    setComplainttypelist(state.Settings.Complainttypelist)
  }, [state.Settings.Complainttypelist])


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });


  const customDateInput = (props) => {
    return (
      <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
        <FormControl
          type="text"
          className='date_input'
          value={props.value || 'DD/MM/YYYY'}
          readOnly
          disabled={edit}
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
          src={Calendars}
          style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {
        compliancepermissionError ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              {/* Image */}
              <img
                src={Emptystate}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              {compliancepermissionError && (
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{compliancepermissionError}</span>
                </div>
              )}
            </div>
          </>
        ) :
          <>
            <div style={{ width: "100%", fontFamily: "Gilroy", position: "relative" }} className='container'>
              <div >
                {/* <div className='d-flex justify-content-end align-items-center mb-4'>

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

                <div
                  className="container justify-content-between d-flex align-items-center"
                  style={{
                    position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                  }}
                >
                  <div style={{marginTop:-8}}>
                    <label style={{ fontSize: 18, color: "#000000", fontWeight: 600,}}>Complaints</label>
                  </div>

                  <div className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap">


                    {search ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            marginRight: 20,
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              marginTop: '10px',
                              marginBottom: '10px'
                            }}
                          >
                            <Image
                              src={searchteam}
                              alt="Search"
                              style={{
                                position: "absolute",
                                left: "10px",
                                width: "24px",
                                height: "24px",
                                pointerEvents: "none",
                              }}
                            />
                            <div
                              className="input-group"
                              style={{ marginRight: 20 }}
                            >
                              <span className="input-group-text bg-white border-end-0">
                                <Image
                                  src={searchteam}
                                  style={{ height: 20, width: 20 }}
                                />
                              </span>
                              <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                  boxShadow: "none",
                                  outline: "none",
                                  borderColor: "rgb(207,213,219)",
                                  borderRight: "none"

                                }}
                                value={filterInput}
                                onChange={(e) => handlefilterInput(e)}
                              />
                              <span className="input-group-text bg-white border-start-0">
                                <img src={closecircle} onClick={handleCloseSearch}
                                  style={{ height: 20, width: 20 }}
                                />
                              </span>
                            </div>
                          </div>

                          {isDropdownVisible && filteredUsers?.length > 0 && (
                            <div
                              style={{
                                border: "1px solid #d9d9d9 ",
                                position: "absolute",
                                top: 60,
                                left: 0,
                                zIndex: 1000,
                                padding: 10,
                                borderRadius: 8,
                                backgroundColor: "#fff",
                                width: "94%",
                              }}
                            >
                              <ul
                                className="show-scroll p-0"
                                style={{
                                  backgroundColor: "#fff",
                                  borderRadius: "4px",
                                  // maxHeight: 174,
                                  maxHeight:
                                    filteredUsers?.length > 1 ? "174px" : "auto",
                                  minHeight: 100,
                                  overflowY:
                                    filteredUsers?.length > 1 ? "auto" : "hidden",

                                  margin: "0",
                                  listStyleType: "none",
                                  borderRadius: 8,
                                  boxSizing: "border-box",
                                }}
                              >
                                {currentItems?.map((user, index) => {
                                  const imagedrop = user.profile || Profile;
                                  return (
                                    <li
                                      key={index}
                                      className="list-group-item d-flex align-items-center"
                                      style={{
                                        cursor: "pointer",
                                        padding: "10px 5px",
                                        borderBottom:
                                          index !== filteredUsers.length - 1
                                            ? "1px solid #eee"
                                            : "none",
                                      }}
                                      onClick={() => handleUserSelect(user)}
                                    >
                                      <Image
                                        src={imagedrop}
                                        alt={user.Name || "Default Profile"}
                                        roundedCircle
                                        style={{
                                          height: "30px",
                                          width: "30px",
                                          marginRight: "10px",
                                        }}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = Profile;
                                        }}
                                      />
                                      {/* <span>{user.Name}</span> */}
                                      <span>{user.Name}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="me-3">
                          <Image
                            src={searchteam}
                            roundedCircle
                            style={{ height: "24px", width: "24px" }}
                            onClick={handleSearch}
                          />
                        </div>
                      </>
                    )}

                    <div className="me-3">
                      <Image
                        src={Filters}
                        roundedCircle
                        style={{ height: "50px", width: "50px" }}
                        onClick={handleFilterd}
                      />
                    </div>


                    {
                    filterStatus &&

                    <div className='me-3' style={{border: "1px solid #D4D4D4",borderRadius:8, width: search ? "250px" : "140px"}}>
  <Form.Select 
  onChange={(e)=>handleStatusFilter(e)}
  value={statusfilter}
    aria-label="Select Price Range"
    className='' 
    id="statusselect" 
    style={{ color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}
  >
    <option value="All">All</option>
    <option value="open">Open</option>
    <option value="in-progress">In Progress</option>
    <option value="resolved">Resolved</option>
    
   
  </Form.Select>
</div>

                  }

                    {/* <BsSearch class=" me-4" onClick={handleiconshow} /> 
        
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
            </div> */}
                    <div style={{ paddingRight: "15px" }}>
                      <img src={excelimg} width={38} height={38}
                        onClick={handleComplianceeExcel}
                        
                      />
                    </div>

                    <div >
                      <Button
                        disabled={complianceAddPermission}
                        onClick={handleShow}
                        style={{marginTop:-10,
                          fontSize: 13, backgroundColor: "#1E45E1", color: "white", height: 43, fontWeight: 600, borderRadius: 8,
                           
                          padding: "14px 30px", color: '#FFF', fontFamily: 'Montserrat', whiteSpace: "nowrap",maxWidth: "100%",
                        }} > + Complaint</Button>
                    </div>
                  </div>
                </div>

                <div className='row row-gap-3 p-4'
                  style={{
                    maxHeight: "470px",
                    overflowY: "auto",
                  }}>
                  {currentItems.length > 0 && currentItems.map((complaints) => (
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                      <ComplianceList complaints={complaints} onEditComplaints={handleEditcomplaint} onAssignshow={handleAssignShow} complianceAddPermission={complianceAddPermission} complianceEditPermission={complianceEditPermission} complianceDeletePermission={complianceDeletePermission} />
                    </div>
                  ))
                  }


                  {currentItems && currentItems.length == 0 &&

                    <div className='d-flex align-items-center justify-content-center fade-in'
                      style={{ width: "100%", height: 350, marginTop: 40 }}>
                      <div>
                        <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No Active complaint </div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no active complaints </div>


                      </div>
                      <div>

                      </div>
                    </div>


                  }

                </div>
                {filteredUsers?.length > itemsPerPage && (
                  <nav className='position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center'
                  // style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "end", // Align dropdown and pagination
                  //   padding: "10px",

                  // }}
                  >
                    {/* Dropdown for Items Per Page */}
                    <div>
                      <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        style={{
                          padding: "5px",
                          border: "1px solid #1E45E1",
                          borderRadius: "5px",
                          color: "#1E45E1",
                          fontWeight: "bold",
                          cursor: "pointer",
                          outline: "none",
                          boxShadow: "none",

                        }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    {/* Pagination Controls */}
                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        listStyleType: "none",
                        position: "sticky",
                        right: "0",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {/* Previous Button */}
                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: currentPage === 1 ? "#ccc" : "#1E45E1",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                        </button>
                      </li>

                      {/* Current Page Indicator */}
                      <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                        {currentPage} of {totalPages}
                      </li>

                      {/* Next Button */}
                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ArrowRight2
                            size="16"
                            color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                          />
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
                    display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
                  }}
                >
                  <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    backdrop="static">
                    <Modal.Dialog style={{ maxWidth: 950, paddingRight: "10px", paddingRight: "10px", borderRadius: "30px" }} className='m-0 p-0'>


                      <Modal.Body>
                        <div>

                          <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                            <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>{edit ? "Edit Compliant" : "Add an complaint"}</div>
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

                            {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : ""}</Modal.Title> */}
                          </Modal.Header>
                        </div>

                        <div className='row mt-1'>

                          {/* Customer */}
                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                                Customer <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <Form.Select className='border'
                                value={selectedUsername}
                                onChange={handleCheckoutChange}
                                disabled={edit}
                                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              >
                                <option value="">Select a customer</option>

                                {state.UsersList?.Users && state.UsersList?.Users.length > 0 && state.UsersList?.Users?.filter(u =>
                                  u.Bed !== 'undefined' &&
                                  u.Bed !== '0' &&
                                  typeof u.Bed === 'string' &&
                                  u.Bed.trim() !== '' &&
                                  u.Rooms !== 'undefined' &&
                                  u.Rooms !== '0' &&
                                  typeof u.Rooms === 'string' &&
                                  u.Rooms.trim() !== '')
                                  .map(u => (
                                    <option value={u.Name}>{u.Name}</option>
                                  ))
                                }







                              </Form.Select>
                              {usererrmsg.trim() !== "" && (
                                <div>
                                  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                                    {usererrmsg !== " " && <MdError style={{ color: 'red' }} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{usererrmsg}</span>
                                  </p>
                                </div>
                              )}
                            </Form.Group>



                          </div>

                          {/* complaint type */}
                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                              <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                                Complaint Type <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <Form.Select
                                className='border'
                                value={Complainttype}
                                onChange={(e) => handleComplaintType(e)}
                                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              >
                                {edit ? (
                                  <option value={Complainttype}>{editcomplainttype}</option>
                                ) : (
                                  <>
                                    <option value="">Select a type</option>
                                    {
                                      Array.isArray(complainttypelist) && complainttypelist?.length > 0 ? (
                                        complainttypelist.map((u, index) => (
                                          <option key={index} value={u.id}>{u.complaint_name}</option>
                                        ))
                                      ) : (
                                        <option value="" disabled>No complaint types available</option>
                                      )
                                    }
                                  </>
                                )}
                              </Form.Select>
                              {complaint_typeerrmsg.trim() !== "" && (
                                <div>
                                  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                                    {complaint_typeerrmsg !== " " && <MdError style={{ color: 'red' }} />} <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{complaint_typeerrmsg}</span>
                                  </p>
                                </div>
                              )}
                            </Form.Group>
                          </div>


                          {state?.Settings?.Complainttypelist && state?.Settings?.Complainttypelist?.complaint_types?.length == 0 && <>
                            <label className="pb-1" style={{ fontSize: 14, color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>*
                              Please add a 'ComplaintType' option in Settings, accessible after  adding an Complaints.</label></>}

                          {/* 
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        //  style={labelStyle}
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Paying Guests<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Paying Guests"
                        value={hostelname}
                        readOnly
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div> */}

                          {/* //floor  */}
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label
                                //  style={labelStyle}
                                style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                              >
                                Floor<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Floor"
                                value={floorname}
                                readOnly
                                style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              // style={inputStyle}
                              />
                            </Form.Group>
                          </div>

                          {/* bed  */}
                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      // style={labelStyle}
                      >
                        Beds<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Beds"
                        value={beds}
                        readOnly
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div> */}

                          {/* Room  */}
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                              <Form.Label
                                style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                              >
                                Room <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Rooms"
                                value={room_name}
                                readOnly
                                style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              // style={inputStyle}
                              />
                            </Form.Group>
                          </div>

                          {/* {!edit &&  Assign == !null( */}
                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Assignee<span style={{ color: 'transparent', fontSize: '20px' }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className='border'
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        value={Assign}
                        onChange={(e) =>  handleAssign(e) }
                      >
                        {edit ? (
                          <option selected value={Assign}>{Assign}</option>
                        ) : (
                          <>
                            <option value="">Select assignee</option>
                            <option value="John">John</option>
                            <option value="Josh">Josh</option>
                          </>
                        )}
                      </Form.Select>
                     
                    </Form.Group>
                  </div> */}

                          {/* status  */}
                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Status<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className='border'
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        value={Status}
                        onChange={(e) =>  handleStatus(e)}
                      > */}
                          {/* {edit ? (
          <option selected value={Status}>{Status}</option>

        ) : (
          <> */}
                          {/* <option value="">Select a status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option> */}
                          {/* </> */}
                          {/* )} */}
                          {/* </Form.Select>
    

{statsuserrormsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {statsuserrormsg !== " " && <MdError style={{ color: 'red' }} />} {statsuserrormsg}
    </p>
  </div>
)}
                    </Form.Group>
                  </div> */}
                          {/* )} */}


                          {/* Floor no*/}
                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Room no<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Rooms"
                        value={Rooms}
                        readOnly
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div> */}

                          {/* bet */}

                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label
                                style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                                // style={labelStyle}
                              >
                                Bed<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Beds"
                                value={beds}
                                readOnly
                                style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              // style={inputStyle}
                              />
                            </Form.Group>
                          </div>

                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Complaint date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                  

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", 
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (calendarRef.current) {
                            calendarRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={calendarRef}
                        options={options}
                        value={selectedDate}
                        onChange={(selectedDates) => {
                          setSelectedDate(selectedDates[0]);
                        }}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>







                    {dateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                          {dateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {dateerrmsg}
                        </p>
                      </div>
                    )}
                  </div> */}


                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-2" controlId="purchaseDate">
                              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                Complaint date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                              <div style={{ position: 'relative', width: "100%" }}>
                                <DatePicker
                                  selected={selectedDate}
                                  onChange={(date) => {

                                    setDateErrmsg('')

                                    setSelectedDate(date);
                                    setDateErrmsg('')
                                  }}
                                  dateFormat="dd/MM/yyyy"
                                  maxDate={null}
                                  disabled={edit}
                                  customInput={customDateInput({
                                    value: selectedDate ? selectedDate.toLocaleDateString('en-GB') : '',
                                  })}
                                />
                              </div>
                            </Form.Group>

                            {dateerrmsg.trim() !== "" && (
                              <div className="d-flex align-items-center p-1">
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                  {dateerrmsg}
                                </label>
                              </div>
                            )}

                          </div>
















                          {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Date</Form.Label>
                                    <Form.Control className="custom-date-input"
                                        value={date}
                                        onChange={handleDatePicker}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>
                            </div> */}
                          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500 }}>Complaint date</Form.Label>
                      <Form.Control
                        //  value={address} onChange={(e) => handleAddressChange(e)}
                        type="text" placeholder="Enter Address" style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group> */}



                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Description</Form.Label>
                              <Form.Control
                                value={description} onChange={(e) => { setDescription(e.target.value) }}
                                type="text" placeholder="Enter description" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                            </Form.Group>

                          </div>
                        </div>

                      </Modal.Body>

                      {totalErrormsg.trim() !== "" && (
                        <div>
                          <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                            {totalErrormsg !== " " && <MdError style={{ color: 'red' }} />} <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {totalErrormsg}</span>
                          </p>
                        </div>
                      )}

                      <Modal.Footer style={{ border: "none" }}>

                        <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
                          disabled={edit && !hasChanges} onClick={handleAddcomplaint}
                        >
                          {edit ? "Save complaint" : "Add complaint"}
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal>
                </div>
              }

              {Assignpopupshow &&
                <div
                  className="modal show"
                  style={{
                    display: 'block', position: 'initial', fontFamily: "Gilroy",
                  }}
                >
                  <Modal
                    show={Assignpopupshow} onHide={handleAssignClose}
                    centered>
                    <Modal.Dialog style={{ width: '100%' }} className='m-0 p-0 col-4'>
                      <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}> Assign Complaint</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>


                        <div className='row mt-4'>
                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                Assignee
                              </Form.Label>
                              <Form.Select className='border'
                                selected value={selectedUsername}
                                onChange={handleCheckoutChange}
                                style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                              >
                                <option value="">Select Assignee</option>
                                <option>John</option>
                                <option>Ruban</option>
                                {/* {
                          state.UsersList?.Users.map((u, index) => (
                            <option key={index} value={u.id}>{u.Name}</option>
                          )

                          )
                        } */}


                              </Form.Select>
                            </Form.Group>

                          </div>

                        </div>

                      </Modal.Body>
                      <Modal.Footer style={{ border: "none" }}>

                        <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}
                          onClick={handleAddcomplaint}
                        >
                          Add complaint
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal>
                </div>
              }





            </div>
          </>
      }






    </>


    //     <div class=' ps-3 pe-3' style={{ marginTop: "20px" }} >
    //       <div class="row g-0" style={{ width: "100%" }}>
    //         <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
    //           <div class="pt-1 ps-0" >
    //             <h6 style={{ fontSize: "16px" }}>Compliance</h6>
    //           </div>
    //         </div>
    //         <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
    //           <div class="p-1 d-flex justify-content-end align-items-center"  >
    //             {
    //               searchicon &&
    //               <>
    //                 <input
    //                   type="text"
    //                   value={searchItem}
    //                   onChange={(e) => handleInputChange(e)}
    //                   placeholder='Type to search'
    //                   class="form-control ps-4 pe-1   searchinput"
    //                   style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

    //                 />
    //               </>
    //             }
    //             <BsSearch class=" me-4" onClick={handleiconshow} />
    //             {
    //               filtericon &&
    //               <>
    //                 <select value={statusfilter} onChange={(e) => handleStatusFilter(e)} class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
    //                 >
    //                   <option selected value="ALL"> ALL</option>
    //                   <option value="Success">Success</option>
    //                   <option value="Hold">Hold</option>
    //                   <option value="Pending">Pending</option>
    //                 </select>
    //               </>
    //             }
    //             <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
    //             <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Compliance</button>
    //           </div>
    //         </div>
    //         <div>

    //         </div>
    //         <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: '69vh' }}>
    //           <Offcanvas.Title className="d-flex align-items-center" style={{ background: '#2F74EB', color: 'white', padding: '5px 20px', height: '40px', fontSize: 15 }}>
    //             {editbtn ? "Edit Compliance" : "Add Compliance"}
    //           </Offcanvas.Title>
    //           <Offcanvas.Body>
    //             <div class="d-flex flex-row bd-highlight mb-3 item" style={{ marginTop: '-20px' }}>
    //               <div class="p-1 bd-highlight user-menu">
    //                 <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
    //                   Compliance Details
    //                 </ul>
    //               </div>

    //             </div>

    //             {showForm && (
    //               <Form>
    //                 <p style={{ textAlign: 'center', marginTop: '-20px', marginBottom: 2 }}>Upload Profile</p>
    //                 <div className="d-flex justify-content-center mt-0" style={{ position: 'relative' }}>
    //                   {file ? <>
    //                     <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
    //                   </> :
    //                     <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
    //                   }
    //                   <label htmlFor="imageInput" className=''>
    //                     <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
    //                   </label>

    //                   <input
    //                     type="file"
    //                     accept="image/*"
    //                     multiple
    //                     className="sr-only"
    //                     id="imageInput"
    //                     onChange={handleImageChange}
    //                     style={{ display: "none" }} />
    //                 </div>
    //                 <Box
    //                   component="form"
    //                   sx={{
    //                     '& > :not(style)': { m: 0.6, width: '22ch' },
    //                   }}
    //                 >


    //                   <div className='row d-flex justify-content-between w-100 g-1 row-gap-1' style={{ backgroundColor: "" }}>

    //                       <div className='col-12 mb-3'>

    //                         <Form.Label style={{ fontSize: "14px", marginBottom: 5, fontWeight: 600 }}>Select User ID</Form.Label>
    //                         <Autocomplete
    //                           value={selectedUserId}
    //                           onChange={handleCheckoutChange}
    //                           label='Amenities'
    //                           id="free-solo-dialog-demo"
    //                           options={usersId}
    //                           selectOnFocus
    //                           clearOnBlur
    //                           disabled={editbtn}
    //                           handleHomeEndKeys
    //                           renderOption={(props, option) => (
    //                             <li {...props}>
    //                               {option}
    //                             </li>
    //                           )}

    //                           style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa", width: '97%', marginLeft: '1%' }}
    //                           sx={{ width: 300 }}

    //                           renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, placeholder: 'Enter or Select UserId' }} />}
    //                         />
    //                       </div>
    //                     {/* } */}

    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Name" value={Name} InputProps={{ readOnly: true }} onChange={(e) => { setName(e.target.value) }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Phone Number" value={Phone} InputProps={{ readOnly: true }} onChange={(e) => { handlePhone(e) }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>





    //                     <div className='col-6'>


    //                       <TextField id="standard-basic" label="Hostel Name" value={hostelname} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />


    //                     </div>
    //                     <div className='col-6'>

    //                       <TextField id="standard-basic" label="Floor" value={Floor} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>

    //                       <TextField id="standard-basic" label="Room" value={Rooms} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" type='date'
    //                         value={date}
    //                         disabled={editbtn}
    //                         onChange={(e) => { handleDatePicker(e) }}
    //                         variant="standard" style={{ width: '20ch', marginTop: "18px" }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }}
    //                       />
    //                     </div>
    //                     <div className='col-6'>
    //                       <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
    //                         <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Complaint Type</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-standard-label"
    //                           id="demo-simple-select-standard"
    //                           label="Select Room No"
    //                           value={Complainttype}
    //                           onChange={(e) => { setComplainttype(e.target.value) }}
    //                           style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" }}
    //                         >
    //                           <MenuItem value="none">
    //                             <em>None</em>
    //                           </MenuItem>

    //                           <MenuItem value="Invoice">
    //                             Invoice

    //                           </MenuItem>
    //                           <MenuItem value="Others">
    //                             Others

    //                           </MenuItem>

    //                         </Select>
    //                       </FormControl>
    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField
    //                         id="standard-multiline-flexible"
    //                         label="Description"
    //                         multiline
    //                         maxRows={4}
    //                         variant="standard"
    //                         sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }}
    //                         style={{ m: 1, width: "20ch", marginTop: '4px' }}
    //                         value={description} onChange={(e) => { setDescription(e.target.value) }}
    //                       />
    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Assign" value={Assign} onChange={(e) => { setAssign(e.target.value) }} variant="standard" style={{ m: 1, width: '20ch', marginTop: '4px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>

    //                     <div className='col-6'>
    //                       <FormControl variant="standard" sx={{ width: "20ch" }}>
    //                         <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Status</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-standard-label"
    //                           id="demo-simple-select-standard"
    //                           label="Status"
    //                           value={Status}
    //                           onChange={(e) => { setStatus(e.target.value) }}
    //                           style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" }}
    //                         >
    //                           <MenuItem value="none">

    //                           </MenuItem>
    //                           <MenuItem value="Pending">Pending</MenuItem>
    //                           <MenuItem value="Success">Success</MenuItem>

    //                         </Select>
    //                       </FormControl>
    //                     </div>

    //                   </div>
    //                 </Box>

    //                 <div class="d-flex justify-content-end" style={{ marginTop: '20px' }}>
    //                   <Button variant="outline-secondary" size="sm" onClick={handleFormclose} style={{ borderRadius: '20vh', width: '100px', marginRight: '15px' }}>
    //                     Cancel
    //                   </Button>
    //                   <Button variant="outline-primary" size="sm" style={{ borderRadius: '20vh', width: '100px' }} onClick={handleSubmit}>
    //                     {editbtn ? "Update" : "Save"}
    //                   </Button>
    //                 </div>



    //               </Form>
    //             )}
    //           </Offcanvas.Body>
    //         </Offcanvas>
    //       </div>
    //       <Table responsive>
    //         <thead style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
    //           <tr >
    //             <th style={{ color: "#91969E" }}>Date</th>
    //             <th style={{ color: "#91969E" }}>Request ID</th>
    //             <th style={{ color: "#91969E" }}>Name & Phone</th>
    //             <th style={{ color: "#91969E" }}>Hostel Name</th>
    //             <th style={{ color: "#91969E" }}>Floor No</th>
    //             <th style={{ color: "#91969E" }}>Room No </th>
    //             <th style={{ color: "#91969E" }}>Compliant Type</th>
    //             <th style={{ color: "#91969E" }}>Description</th>
    //             <th style={{ color: "#91969E" }}>Assign</th>
    //             <th style={{ color: "#91969E" }}>Status</th>
    //             <th style={{ color: "#91969E" }}>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody style={{ fontSize: "10px" }}>
    //         {loading ? (

    //           Array.from({ length: state?.ComplianceList?.Compliance.length || 5 }).map((_, index) => (
    //             <tr key={index}>
    //               <td><Skeleton width={80} /></td>
    //               <td><Skeleton width={120} /></td>
    //               <td>
    //                 <div className="d-flex">
    //                   <span className="i-circle">
    //                     <Skeleton circle width={24} height={24} />
    //                   </span>
    //                   <div className="ms-2">
    //                     <Skeleton width={80} /><br />
    //                     <Skeleton width={100} />
    //                   </div>
    //                 </div>
    //               </td>
    //               <td><Skeleton width={120} /></td>
    //               <td><Skeleton width={50} /></td>
    //               <td><Skeleton width={50} /></td>
    //               <td><Skeleton width={100} /></td>
    //               <td><Skeleton width={150} /></td>
    //               <td><Skeleton width={100} /></td>
    //               <td><Skeleton width={60} /></td>
    //               <td><Skeleton width={40} /></td>
    //             </tr>
    //           ))
    //         ) : (
    //           currentItems.map((item) => (
    //             <tr key={item.ID}>
    //               <td style={{ color: "black", fontWeight: 500 }}>{moment(item.date).format('DD-MM-YYYY')}</td>
    //               <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Requestid}</td>
    //               <td>
    //                 <div className="d-flex">
    //                   {item.Name && (
    //                     <span className="i-circle">
    //                       <p className="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name.match(/(^\S\S?|\s\S)?/g).map(v => v.trim()).join("").match(/(^\S|\S$)?/g).join("").toLocaleUpperCase()}</p>
    //                     </span>
    //                   )}
    //                   <div className="ms-2">
    //                     <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
    //                     <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.Phone}</label>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td style={{ color: "#91969E" }}>{item.hostelname}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Floor_id}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Room}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Complainttype}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Description}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Assign}</td>
    //               <td style={(item.Status && item.Status.toUpperCase() === "SUCCESS") ? { color: "green" } : { color: "red" }}>{item.Status}</td>
    //               <td className=""><img src={List} height="20" width="20" />
    //                 <img className="ms-1" src={Edit} height="20" width="20" onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} /></td>
    //             </tr>
    //           ))
    // )}


    //         </tbody>
    //       </Table>

    //       <div className="d-flex justify-content-center" style={{width:"100%"}}>
    // {currentItems.length === 0 && !loading && <h5 style={{fontSize: 12, color: "red"}}>No Data Found</h5>}
    // </div>
    //       <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

    //         <div style={{ display: "flex", flexDirection: "row" }}>
    //           <div>
    //             <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
    //           </div>
    //           <Dropdown onSelect={(eventKey) => handlePageSelect(eventKey)}>
    //             <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
    //               {currentPage} - {currentPage}
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu>
    //               {generatePageNumbers().map((page) => (
    //                 <Dropdown.Item key={page} eventKey={page}>
    //                   {currentPage} - {page}
    //                 </Dropdown.Item>
    //               ))}
    //             </Dropdown.Menu>
    //           </Dropdown>
    //           <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
    //             of <label>{currentPage}</label>
    //           </div>
    //         </div>
    //         <div style={{ display: "flex", flexDirection: "row" }}>

    //           <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
    //             Prev
    //           </div>
    //           <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
    //           <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
    //             Next
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Compliance;