/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import Emptystate from '../../Assets/Images/Empty-State.jpg'
import 'flatpickr/dist/themes/material_blue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import Filters from "../../Assets/Images/Filters.svg";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../Compliants/Compliance.css'
// import '../../../Pages/Complaints/Compliance.css'
import Profile from '../../Assets/Images/New_images/profile-picture.png';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import ComplianceList from '../Compliants/ComplianceList';
import 'react-datepicker/dist/react-datepicker.css';
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PropTypes from "prop-types";
import Select from "react-select";
import { toast } from 'react-toastify';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const Compliance = () => {


  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const initialValuesRef = useRef({});
  const [formLoading, setFormLoading] = useState(false)
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [complaintId, setComplaintId] = useState('')
  const [Complainttype, setComplainttype] = useState('');
  const [description, setDescription] = useState('')
  const [Assign, setAssign] = useState('');
  const [Status, setStatus] = useState('');
  // const [hostel_Id, setHostel_Id] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [room_name, setRoomName] = useState('')
  const [beds, setBeds] = useState('');
  const [bed_name, setBedName] = useState('');
  const [userid, setUser_Id] = useState('')
  const [hosId, setHosId] = useState("")
  const [floorname, setFloorname] = useState('')
  const [loading, setLoading] = useState(false);

  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const [ExcelFilterDates, setExcelFilterDates] = useState([])
  const [filterStatus, setFilterStatus] = useState(false);
  const [statusfilter, setStatusfilter] = useState('')

  const [compliancerolePermission, setComplianceRolePermission] = useState("");

  const [compliancepermissionError, setCompliancePermissionError] = useState("");
  const [complianceAddPermission, setComplianceAddPermission] = useState("")
  const [complianceDeletePermission, setComplianceDeletePermission] = useState("")
  const [complianceEditPermission, setComplianceEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
    

  const {
    canWriteModule: canWriteComplaints,
    canReadModule: canReadComplaints,
    // canUpdateModule: canUpdateBanking,
    // canDeleteModule: canDeleteBanking,
  } = useHasPermission("Complaints");


console.log(state,"state")

  // const canReadComplaints = useHasPermission("Complaints", "canRead");
  // const canWriteComplaints = useHasPermission("Complaints", "canWrite");


  const complaintList = useSelector((state) => state.Settings.Complainttypelist);


  const filterOptions = useSelector((state) => state.ComplianceList.filterOptions);


  useEffect(() => {
    if (!canReadComplaints) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [canReadComplaints]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHosId(state.login.selectedHostel_Id)
    }
  }, [state.login.selectedHostel_Id])


  useEffect(() => {
    if (hosId) {
      dispatch({ type: "COMPLAINT-TYPE-LIST", payload: { hostel_id: state?.login?.selectedHostel_Id } });
    }
  }, [hosId])




  useEffect(() => {
    if (state.UsersList?.exportComplianceDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportComplianceDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportComplianceDetails?.response?.fileUrl]);




  const handleComplianceeExcel = () => {

    if (ExcelFilterDates.length === 2) {
      dispatch({
        type: "EXPORTCOMPLIANCEDETAILS", payload: {
          type: "complaint", hostel_id: hosId,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD")
        }
      })
      setExcelFilterDates([])
      setStatusfilter("")
    }
    else if (statusfilter && statusfilter !== "date" && statusfilter !== "All") {
      dispatch({
        type: "EXPORTCOMPLIANCEDETAILS",
        payload: {
          type: "complaint",
          hostel_id: hosId,
          status: statusfilter,
        }
      });
      setExcelFilterDates([]);
      setStatusfilter("");
    }

    else {
      dispatch({ type: "EXPORTCOMPLIANCEDETAILS", payload: { type: "complaint", hostel_id: hosId } });
    }

    setIsDownloadTriggered(true)
  };


  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {

      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();

      setTimeout(() => {
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
      setLoading(false)
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
    const userType = compliancerolePermission[0]?.user_details?.user_type
    const isAdmin = userType === "admin" || userType === "agent";
    if (isAdmin) {
      if (state?.login?.planStatus === 0) {
        setCompliancePermissionError("");
        setComplianceAddPermission("Permission Denied");
        setComplianceEditPermission("Permission Denied");
        setComplianceDeletePermission("Permission Denied");

      } else if (state?.login?.planStatus === 1) {
        setCompliancePermissionError("");
        setComplianceAddPermission("");
        setComplianceEditPermission("");
        setComplianceDeletePermission("");
      }
    }

  }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, compliancerolePermission])




  useEffect(() => {
    const compliancePermission = compliancerolePermission[0]?.role_permissions?.find(
      (perm) => perm.permission_name === "Complaints"
    );

    const isOwner = compliancerolePermission[0]?.user_details?.user_type === "staff";
    const planActive = state?.login?.planStatus === 1;

    if (!compliancePermission || !isOwner) return;


    if (compliancePermission.per_view === 1 && planActive) {
      setCompliancePermissionError("");
    } else {
      setCompliancePermissionError("Permission Denied");
    }


    if (compliancePermission.per_create === 1 && planActive) {
      setComplianceAddPermission("");
    } else {
      setComplianceAddPermission("Permission Denied");
    }


    if (compliancePermission.per_delete === 1 && planActive) {
      setComplianceDeletePermission("");
    } else {
      setComplianceDeletePermission("Permission Denied");
    }


    if (compliancePermission.per_edit === 1 && planActive) {
      setComplianceEditPermission("");
    } else {
      setComplianceEditPermission("Permission Denied");
    }
  }, [compliancerolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);


  useEffect(() => {
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {

      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: hosId } })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_COMPLIANCE' })
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance])

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // setLoading(true)
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })
    }
    else {
      setFilteredUsers([]);
      setLoading(false)
    }

  }, [state.login?.selectedHostel_Id])




  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!state.login.selectedHostel_Id) {
  //       setFilteredUsers([]);
  //       setLoading(false);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);






  useEffect(() => {
    if (state.ComplianceList.statusCodeForAddCompliance === 201) {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } });
      handleClose()
      setTimeout(() => {
        dispatch({ type: 'CLEAR_COMPLIANCE_STATUS_CODE' });
      }, 500);
    }

    // if (state.ComplianceList.Compliance) {
    //   const filteredItems = state.ComplianceList?.Compliance?.filter((user) =>
    //     user?.complaintResponseDto?.customerName
    //       ?.toLowerCase()
    //       .includes(filterInput.toLowerCase())
    //   );

    //   setFilteredUsers(filteredItems);

    // } else {
    //   setFilteredUsers(state.ComplianceList?.Compliance || []);
    // }

  }, [state.ComplianceList.statusCodeForAddCompliance])





  useEffect(() => {
    if (state.ComplianceList.statusCodeForEditCompliant === 200) {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } });
      handleClose()
      setTimeout(() => {
        dispatch({ type: 'CLEAR_EDIT_COMPLIANT_STATUS_CODE' });
      }, 500);
    }
  }, [state.ComplianceList.statusCodeForEditCompliant]);


  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const options = {
    dateFormat: 'd/m/Y',
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };



  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
      setDateErrmsg('')
    }
  }, [selectedDate])





  // const [itemsPerPage, setItemsPerPage] = useState(6);
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const filteredUsers =
  //   filterInput.length > 0
  //     ? filteredUsers
  //     : filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);





  // const handleItemsPerPageChange = (selectedOption) => {
  //   if (selectedOption) {
  //     setItemsPerPage(Number(selectedOption.value));
  //     setCurrentPage(1);
  //   }
  // };


  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const [hostelname, setHostelName] = useState('')

  const [dateerrmsg, setDateErrmsg] = useState('')
  const [usererrmsg, setUserErrmsg] = useState('')
  const [complaint_typeerrmsg, setComplaintTypeErrmsg] = useState('')
  const [totalErrormsg, setTotalErrmsg] = useState('')





  const handleCloseSearch = () => {
    setSearch(false)
    setFilterInput("")
    setDropdownVisible(false);
  }


  const handleSearch = () => {
    setSearch(!search)
  }

  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
    dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })
  }



  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    setDropdownVisible(e.target.value.length > 0)
  }

  const handleUserSelect = (user) => {
    setFilterInput(user.customerName)
    dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id, customerName: user.customerName } })

    setDropdownVisible(false)
  }


  useEffect(() => {
    if (!filterInput) {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })

    }

  }, [filterInput])


  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusfilter(value);

    let statusValue = value;
    if (value === "null") {
      statusValue = null;
    }

    if (value === "All") {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })
    } else {
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id, status: statusValue } })
    }
  };


  const [selectedDateRange, setSelectedDateRange] = useState([])

  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) {
      setSelectedDateRange([])
      setStatusfilter("All")
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })
      return
    }



    setSelectedDateRange(dates);
    const newStartDate = dayjs(dates[0]).startOf("day");
    const newEndDate = dayjs(dates[1]).endOf("day");
    setExcelFilterDates([newStartDate, newEndDate])

    const filtered = (state.ComplianceList?.Compliance || []).filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.isSameOrAfter(dayjs(dates[0]), 'day') &&
        itemDate.isSameOrBefore(dayjs(dates[1]), 'day')
      );
    });



    setFilteredUsers(filtered);
    // setCurrentPage(1);
  };




  useEffect(() => {
    if (selectedDateRange?.length === 2) {
      const newStartDate = dayjs(selectedDateRange[0]).startOf("day").format("DD-MM-YYYY");
      const newEndDate = dayjs(selectedDateRange[1]).endOf("day").format("DD-MM-YYYY");

      if (newStartDate && newEndDate) {
        dispatch({
          type: "COMPLIANCE-LIST",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            startDate: newStartDate,
            endDate: newEndDate,
          },
        });
      }
    }
  }, [selectedDateRange]);





  useEffect(() => {
    if (!filterStatus) {
      setStatusfilter("All");
      setSelectedDateRange([]);
    }
  }, [filterStatus]);



  // useEffect(() => {


  //   if (statusfilter === "date" && ExcelFilterDates.length === 2) {
  //     dispatch({
  //       type: 'COMPLIANCE-LIST', payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         from_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
  //         to_date: ExcelFilterDates[1]?.format("YYYY-MM-DD")
  //       }
  //     })
  //   }
  // }, [ExcelFilterDates]);


  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {

      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_USER' })
      }, 1000)
    }

  }, [state.UsersList.UserListStatusCode])






  const [selectedUsername, setSelectedUserName] = useState('')

  useEffect(() => {
    if (selectedUsername) {
      const filteredDetails = state.UsersList.Users.filter(item => {
        return item.customerId === selectedUsername
      }
      )
      if (filteredDetails.length > 0) {



        const firstFilteredDetail = filteredDetails[0];



        // setHostel_Id(firstFilteredDetail.Hostel_Id || '');
        setHostelName(firstFilteredDetail.HostelName || '');
        setFloor(firstFilteredDetail.floorId || '');
        setBeds(firstFilteredDetail.bedId || '');
        setBedName(firstFilteredDetail.bedName || '')
        setRooms(firstFilteredDetail.roomId || '');
        setUser_Id(firstFilteredDetail.customerId || '');
        setRoomName(firstFilteredDetail.roomName || '')
        setFloorname(firstFilteredDetail.floorName || '')

      } else {
        setHostelName('');
        setBeds('')
        setBedName('')
        setFloor('');
        setRooms('');
        setFloorname('');
      }
    } else {
      setHostelName('');
      setBeds('')
      setBedName('')
      setFloor('');
      setRooms('');
      setFloorname('')
    }
  }, [selectedUsername]);

  const handleCheckoutChange = (selectedOption) => {
    setSelectedUserName(selectedOption?.value || '');
    if (!selectedOption) {
      setUserErrmsg("Please Select Name")
    }
    else {
      setUserErrmsg('')
    }
  };





  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding Compliance information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    dispatch({ type: "USERLIST", payload: { hostel_id: hosId } });
    setEdit(false)
    setShow(true);
  }

  const handleClose = () => {
    setJoingDateErrmsg('');
    setShow(false);
    setFormLoading(false)
    setSelectedUserName('');
    setComplaintId('')
    setComplainttype('');
    setAssign('');
    setDescription('');
    setSelectedDate('')
    setBeds('')
    setBedName('')
    setFloor('');
    setRooms('');
    setHostelName('');
    setStatus('');
    setFloorname('')
    setRoomName('')
    setUserErrmsg('')
    setDateErrmsg('')
    setComplaintTypeErrmsg('')
    setEdit(false)
  }

  const [Assignpopupshow, setAssignpopupshow] = useState(false);

  const handleAssignShow = () => {
    setAssignpopupshow(true);
  }
  const handleAssignClose = () => {
    setAssignpopupshow(false);
  }

  const [edit, setEdit] = useState(false)


  const handleComplaintType = (selectedOption) => {
    setComplainttype(selectedOption?.value || '')
    if (!selectedOption) {
      setComplaintTypeErrmsg("Please Select ComplaintType");
    } else {
      setComplaintTypeErrmsg("");
    }
  }


  function parseDMY(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    return null;  
  }

  const parts = dateStr.split("/");
  if (parts.length !== 3) {
    return null;
  }

  const [day, month, year] = parts;
  return new Date(`${year}-${month}-${day}`);
}





const currentDate = parseDMY(selectedDate);
const initialDate = parseDMY(initialValuesRef.current.selectedDate);


let hasChanges =
  description !== initialValuesRef?.current?.Description ||
  currentDate?.getTime() !== initialDate?.getTime();




  const handleAddcomplaint = () => {


    if (edit && !hasChanges) {
      setTotalErrmsg('No changes detected');
      setTimeout(() => {
        setTotalErrmsg('');
      }, 10000);
      return;
    }
    let isValid = true;

    if (!selectedUsername) {
      setUserErrmsg('Please Select  Customer')
      isValid = false;
    }

    if (!Complainttype) {
      setComplaintTypeErrmsg('Please Select  Complaint Type')
      isValid = false;
    }

    if (!selectedDate) {
      setDateErrmsg('Please Select date')
      isValid = false;
    }


    if (!isValid) return;

    // setEdit(false)

console.log("state",state.login.selectedHostel_Id  , Complainttype , selectedDate , Floor , Rooms)

    if (state.login.selectedHostel_Id  && Complainttype && selectedDate && Floor && Rooms) {
      // const formattedDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
      const formattedDate = selectedDate ? selectedDate.format("DD/MM/YYYY") : null
      const payload = {
        customerId: userid,
        complaintTypeId: Complainttype,
        floorId: Floor,
        roomId: Rooms,
        bedId: beds,
        complaintDate: formattedDate,
        description: description || "",
        hostelId: state.login.selectedHostel_Id
      }
      if (complaintId) {
        dispatch({
          type: "EDIT_COMPLAINT",
          payload: {
            complaintId: complaintId,
            complaintDate: formattedDate,
            description: description,
          },
        });
        setFormLoading(true)
      }
      else {
        dispatch({ type: 'COMPLIANCE-ADD', payload })
        setFormLoading(true)

       
      }


    }

  }

  useEffect(() => {
    if (hasChanges) {
      setTotalErrmsg('');
    }
  }, [selectedUsername, Complainttype, Assign, description, selectedDate, beds, Rooms, hostelname, Floor, Status]);


  const [editcomplainttype, setEditcomplainttype] = useState('')


  const handleEditcomplaint = (Complaintdata) => {

    setEdit(true)

 dispatch({ type: "USERLIST", payload: { hostel_id: hosId } });
    if (Complaintdata) {

      dispatch({ type: "PARTICULAR_COMPLIANT", payload: { complaintId: Complaintdata.complaintId } })

      setShow(true);


      setComplaintId(Complaintdata.complaintId)
      setSelectedUserName(Complaintdata?.customerId);
      setComplainttype(Complaintdata.complaintTypeId);
      setEditcomplainttype(Complaintdata.complaintTypeId)
      setAssign(Complaintdata.Assign);
      setDescription(Complaintdata.description);
      // setSelectedDate(Complaintdata.complaintDate);
      setSelectedDate(
        Complaintdata.complaintDate
          ? dayjs(Complaintdata.complaintDate, "DD/MM/YYYY")
          : null
      );

      // setHostel_Id(Complaintdata?.Hostel_id)
      setBeds(Complaintdata.bedId)
      setBedName(Complaintdata.bedName)
      setFloor(Complaintdata.Floor_id);
      setRooms(Complaintdata.Room);
      setHostelName(Complaintdata.hostelname);
      setStatus(Complaintdata.Status)


     initialValuesRef.current = {
  Description: Complaintdata.description,
  selectedDate: parseDMY(Complaintdata.complaintDate)
};

    }
  }



  const [EditComplaintDetails, setEditComplaintDetails] = useState({})

  useEffect(() => {
    if (state.ComplianceList.statusCodeforgetparticularCompliant === 200) {
      setEditComplaintDetails(state.ComplianceList.ParticularComplaint)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_PARTICULAR_COMPLIANT_STATUS' });
      }, 500);
    }
  }, [state.ComplianceList.statusCodeforgetparticularCompliant])


  // useEffect(() => {
  //   if(edit && EditComplaintDetails){
  //           setComplaintId(EditComplaintDetails.complaintId)
  //     setSelectedUserName(EditComplaintDetails.customerId);
  //     setComplainttype(EditComplaintDetails.complaintTypeId);
  //     setEditcomplainttype(EditComplaintDetails.complaintTypeId)
  //     setAssign(EditComplaintDetails.Assign);
  //     setDescription(EditComplaintDetails.Description);
  //     setSelectedDate(new Date(EditComplaintDetails.complaintDate));
  //     setHostel_Id(EditComplaintDetails?.Hostel_id)
  //     setBeds(EditComplaintDetails.bedId)
  //     setBedName(EditComplaintDetails.bedName)
  //     setFloor(EditComplaintDetails.Floor_id);
  //     setRooms(EditComplaintDetails.Room);
  //     setHostelName(EditComplaintDetails.hostelname);
  //     setStatus(EditComplaintDetails.Status)


  //       initialValuesRef.current = {
  //       Assign: EditComplaintDetails.Assign,
  //       Description: EditComplaintDetails.Description,
  //       Status: EditComplaintDetails.Status,
  //       selectedDate: new Date(EditComplaintDetails.date)
  //     };
  //   }

  // } , [edit , EditComplaintDetails])






  


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
  //   if (hosId) {
  //     dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: hosId } });
  //   }
  // }, [hosId]);

  useEffect(() => {
    if (state.Settings.StatusForaddSettingStaffList === 200) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_USER_STAFF_LIST' });
      }, 500);
    }
  }, [state.Settings.StatusForaddSettingStaffList])


  useEffect(() => {
    setComplainttypelist(state.Settings.Complainttypelist)
  }, [state.Settings.Complainttypelist])


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
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



  // useEffect(() => {
  //   if (
  //     filteredUsers.length > 0 &&
  //     filteredUsers.length === 0 &&
  //     currentPage > 1
  //   ) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }, [filteredUsers])



  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])



  const uniqueCompliance = Array.isArray(state.ComplianceList?.Compliance)
    ? state.ComplianceList.Compliance.filter(
      (item, index, self) =>
        index === self.findIndex((t) => (
          t.customerId === item.customerId
        ))
    )
    : [];

  const filterUsers = uniqueCompliance?.filter((user) =>
    user?.customerName
      ?.toLowerCase()
      .includes(filterInput.toLowerCase())
  );

  const blockedStatus = [
  "Vacated",
  "Booked",
  "Inactive",
  "Settlement Generated",
];

  return (
    <>


      <div style={{ width: "100%", fontFamily: "Gilroy", position: "relative" }} >
        <div >

          {loading &&
            <div
              style={{
                position: 'fixed',
                top: '53%',
                left: '57%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                zIndex: 1050,
              }}
            >
              <div
                style={{
                  borderTop: '4px solid #1E45E1',
                  borderRight: '4px solid transparent',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>
          }



          <div
            className="container-fluid sticky-top bg-white py-2"
            style={{ zIndex: 1000, height: 'auto' }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap" style={{ paddingTop: 11 }}>
              <div className=" ms-2" >
                <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, marginTop: 5, marginLeft: 3, fontFamily: "Gilroy" }}>Complaints</label>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">

                {search ? (
                  <div className="position-relative" style={{ minWidth: 160 }}>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Image src={searchteam} style={{ height: 20, width: 20 }} />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                          borderColor: "rgb(207,213,219)",
                          borderRight: "none",
                        }}
                        value={filterInput}
                        onChange={(e) => handlefilterInput(e)}
                      />
                      <span className="input-group-text bg-white border-start-0">
                        <img
                          src={closecircle}
                          alt="close"
                          style={{ height: 20, width: 20, cursor: "pointer" }}
                          onClick={handleCloseSearch}
                        />
                      </span>
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
                          width: "100%",
                        }}
                      >

                        <ul className="show-scroll p-0 m-0" style={{
                          listStyleType: "none",
                          borderRadius: 8,
                          maxHeight: "174px",
                          overflowY: "auto",
                          backgroundColor: "#fff",
                          boxSizing: "border-box",
                          width: "100%",
                        }}>
                          {filterUsers?.length > 0 ? (
                            filterUsers.map((user, index) => {
                              const imagedrop = user?.complaintResponseDto?.customerProfile || Profile;
                              return (
                                <li
                                  key={index}
                                  className="d-flex align-items-center"
                                  style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: 8,
                                    backgroundColor: hoveredIndex === index ? "#1E45E1" : "#fff",
                                    color: hoveredIndex === index ? "#fff" : "#000",
                                    cursor: "pointer",
                                    boxSizing: "border-box",
                                    fontFamily: "Gilroy",
                                  }}
                                  onClick={() => handleUserSelect(user.complaintResponseDto)}
                                  onMouseEnter={() => setHoveredIndex(index)}
                                  onMouseLeave={() => setHoveredIndex(null)}
                                >
                                  <Image
                                    src={imagedrop}
                                    alt={user?.Name || "Default Profile"}
                                    roundedCircle
                                    style={{
                                      height: "30px",
                                      width: "30px",
                                      marginRight: "10px",
                                      flexShrink: 0,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = Profile;
                                    }}
                                  />
                                  <div style={{ flexGrow: 1 }}>
                                    {user?.complaintResponseDto?.customerName || "Unnamed"}
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                            <li
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: 8,
                                backgroundColor: "#fff",
                                color: "#000",
                                boxSizing: "border-box",
                                fontFamily: "Gilroy",
                              }}
                            >
                              No Customer found
                            </li>
                          )}

                        </ul>

                      </div>
                    )}
                  </div>
                ) : (
                  <div className='me-2' style={{ cursor: "pointer" }}>
                    <Image
                      src={searchteam}
                      style={{
                        height: "24px", width: "24px",
                        cursor: canReadComplaints ? "pointer" : "not-allowed",
                        opacity: canReadComplaints ? 1 : 0.4,
                        pointerEvents: canReadComplaints ? "auto" : "none",
                        transition: "opacity 0.3s ease"
                      }}
                      onClick={() => canReadComplaints && handleSearch()}
                    />
                  </div>
                )}

                <div className='me-2' style={{ cursor: "pointer" }}>
                  <Image
                    src={Filters}
                    style={{
                      height: "50px", width: "50px", cursor: canReadComplaints ? "pointer" : "not-allowed",
                      opacity: canReadComplaints ? 1 : 0.4,
                      pointerEvents: canReadComplaints ? "auto" : "none",
                      transition: "opacity 0.3s ease"
                    }}
                    onClick={handleFilterd}
                  />
                </div>

                {
                  filterStatus &&

                  <div className='me-3' style={{ border: "1px solid #D4D4D4", borderRadius: 8, width: "140px" }}>
                    <Form.Select
                      onChange={(e) => handleStatusFilter(e)}
                      value={statusfilter}
                      aria-label="Select Price Range"
                      className=''
                      id="statusselect"
                      style={{ color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy", cursor: "pointer" }}
                    >
                      <option value="All">All</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="date">Date</option>


                    </Form.Select>
                  </div>

                }
                {statusfilter === 'date' && (
                  <div style={{ paddingRight: 30 }}>
                    <RangePicker
                      value={selectedDateRange}
                      onChange={handleDateChange}
                      format="DD-MM-YYYY"
                      style={{ height: 40, cursor: "pointer", fontFamily: "Gilroy" }}
                    />
                  </div>
                )}

                <div className='me-2' style={{ cursor: "pointer" }}>
                  <img
                    src={excelimg}
                    alt="excel"
                    width={38}
                    height={38}
                    onClick={handleComplianceeExcel}
                    style={{
                      cursor: canReadComplaints ? "pointer" : "not-allowed",
                      opacity: canReadComplaints ? 1 : 0.4,
                      pointerEvents: canReadComplaints ? "auto" : "none",
                      transition: "opacity 0.3s ease"
                    }}
                  />
                </div>

                <div className='me-2' style={{ paddingRight: 4 }}>
                  <Button
                    disabled={!canWriteComplaints || state?.login?.planStatus === 0}
                    onClick={handleShow}
                    style={{
                      fontSize: 13, backgroundColor: "#1E45E1", fontWeight: 600, borderRadius: 8,
                      color: '#FFF', fontFamily: 'Montserrat',
                      whiteSpace: "nowrap",
                      width: 146,
                      height: 45,
                      textAlign: "center"
                    }} > + Complaint</Button>
                </div>
              </div>
            </div>
          </div>

          {
            !canReadComplaints ? (
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
                  <img
                    src={Emptystate}
                    alt="Empty State"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />


                  <ErrorMessage message={['You do not have access to view Compliants']} type="warning" />

                </div>
              </>
            ) :
              <div className='row row-gap-3 p-4 '
                style={{
                  height: "500px",
                  overflowY: "auto",
                  // position: "relative",
                  // paddingRight: 20

                }}
              >
                {filteredUsers.length > 0 && filteredUsers.map((complaints) => (
                  <div key={complaints.ID} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                    <ComplianceList complaints={complaints} onEditComplaints={handleEditcomplaint} onAssignshow={handleAssignShow} complianceAddPermission={complianceAddPermission} complianceEditPermission={complianceEditPermission} complianceDeletePermission={complianceDeletePermission} disableActions={state?.login?.planStatus === 0} />
                  </div>
                ))
                }


                {!loading && filteredUsers.length === 0 &&

                  <div className='d-flex align-items-center justify-content-center fade-in'
                    style={{ width: "100%", height: 350, marginTop: 40 }}>
                    <div>
                      <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>No Active complaint </div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>There are no active complaints </div>


                    </div>
                    <div>

                    </div>
                  </div>


                }

              </div>
          }
          {/* {filteredUsers && filteredUsers?.length > 6 && (

                  <nav className=" mb-0"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      padding: "10px",
                      borderRadius: "5px",
                      position: "fixed",
                      zIndex: 1000,
                      width: '83%',
                      bottom: 0,
                      left: '17%',
                      right: '16px'
                    }}
                  >

                    <div>

                      <Select
                        options={pageSizeOptions}
                        value={itemsPerPage ? { value: itemsPerPage, label: `${itemsPerPage}` } : null}
                        onChange={handleItemsPerPageChange}
                        placeholder="Items per page"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        noOptionsMessage={() => "No options"}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            color: "#1E45E1",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            border: "1px solid #1E45E1",
                            boxShadow: "0 0 0 1px #1E45E1",
                            cursor: "pointer",
                            width: 90,
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                            fontFamily: "Gilroy",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            maxHeight: "200px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                            fontFamily: "Gilroy",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#1E45E1",
                            cursor: "pointer",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer",
                            backgroundColor: state.isFocused ? "#1E45E1" : "white",
                            color: state.isFocused ? "#FFF" : "#000",
                          }),
                        }}
                      />
                    </div>

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

                      <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                        {currentPage} of {totalPages}
                      </li>

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
                )} */}
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
              <Modal.Dialog style={{ minWidth: "auto", paddingRight: "10px", borderRadius: "30px", }} className='m-0 p-0'>

                <Modal.Header style={{}}>
                  <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>{edit ? "Edit Compliant" : "Add an complaint"}</div>

                  <CloseCircle size="24" color="#000" onClick={handleClose}
                    style={{ cursor: 'pointer' }} />

                </Modal.Header>
                <Modal.Body style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll pt-1 mt-2 me-3">

                  {Array.isArray(complaintList) && complaintList.length === 0 && (
                    <ErrorMessage message={[" Please Create Complaint Type in Settings-Complaint  before adding an complaint"]} type="error" />

                  )}

                  <div className='row '>

                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "Gilroy", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                          Customer {" "}  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>


                        <Select
                          options={
                            state?.UsersList?.Users?.filter(
                              (u) =>
                                u.floorId &&
                                u.roomId &&
                                !blockedStatus.includes(u.currentStatus)
                            ).map((u) => ({
                              value: u.customerId,
                              label: u.firstName,
                            })) || []
                          }
                          onChange={handleCheckoutChange}
                          value={
                            selectedUsername
                              ? state?.UsersList?.Users?.find((u) => u.customerId === selectedUsername) && {
                                value: selectedUsername,
                                label:
                                  state?.UsersList?.Users?.find((u) => u.customerId === selectedUsername)
                                    ?.firstName || "",
                              }
                              : null
                          }
                          placeholder="Select a customer"
                          classNamePrefix="custom"
                          // menuPlacement="auto"
                          isDisabled={edit}
                          noOptionsMessage={() => "No Tenant available"}
                          components={
                            edit
                              ? { DropdownIndicator: () => null, IndicatorSeparator: () => null }
                              : undefined
                          }
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              backgroundColor: edit ? "#E7F1FF" : "#fff",
                              cursor: "pointer",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#555",
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              opacity: 1,
                              cursor: edit ? "not-allowed" : "pointer",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: edit ? "not-allowed" : "pointer",
                              backgroundColor: state.isFocused ? "lightblue" : "white",
                              color: "#000",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                          }}
                        />



                        {usererrmsg.trim() !== "" && (
                          <ErrorMessage message={usererrmsg} type="error" />
                        )}
                      </Form.Group>



                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                      <label
                        style={{
                          fontSize: 14,
                          color: "#222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          marginBottom: 5,
                          display: "block",
                        }}
                      >
                        Complaint Type {" "}   <span style={{ color: "red", fontSize: "16px" }}>*</span>
                      </label>



                      <Select
                        options={
                          Array.isArray(complainttypelist) && complainttypelist.length > 0
                            ? complainttypelist.map((u) => ({
                              value: u.complaintTypeId,
                              label: u.complaintTypeName,
                            }))
                            : []
                        }
                        onChange={handleComplaintType}
                        value={
                          edit && editcomplainttype
                            ? {
                              value: editcomplainttype,
                              label:
                                complainttypelist.find(
                                  (c) => c.complaintTypeId === editcomplainttype
                                )?.complaintTypeName || editcomplainttype,
                            }
                            : Complainttype
                              ? {
                                value: Complainttype,
                                label:
                                  complainttypelist.find(
                                    (c) => c.complaintTypeId === Complainttype
                                  )?.complaintTypeName || Complainttype,
                              }
                              : null
                        }
                        placeholder="Select a type"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        isDisabled={edit}
                        components={
                          edit
                            ? { DropdownIndicator: () => null, IndicatorSeparator: () => null }
                            : undefined
                        }
                        noOptionsMessage={() => "No complaint types available"}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "50px",
                            border: "1px solid #D9D9D9",
                            borderRadius: "8px",
                            fontSize: "16px",
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            backgroundColor: edit ? "#E7F1FF" : "#fff",
                            cursor: "pointer",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                            fontFamily: "Gilroy",
                            cursor: "pointer",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                            fontFamily: "Gilroy",
                            cursor: "pointer",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer",
                            color: state.isSelected ? "#fff" : "#000",
                            fontFamily: "Gilroy",
                          }),
                        }}
                      />

                      {complaint_typeerrmsg.trim() !== "" && (
                        <ErrorMessage message={complaint_typeerrmsg} type="error" />
                      )}


                    </div>


                    {state?.Settings?.Complainttypelist && state?.Settings?.Complainttypelist?.complaint_types?.length === 0 && <>
                      <label className="pb-1" style={{ fontSize: 14, color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>*
                        Please add a &apos;ComplaintType&apos; option in Settings, accessible after  adding an Complaints.</label></>}



                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 '>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label
                          style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                          Floor {" "} <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Floor"
                          value={floorname}
                          readOnly
                          style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        />
                      </Form.Group>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 '>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label
                          style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                          Room {" "}  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Rooms"
                          value={room_name}
                          readOnly
                          style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        />
                      </Form.Group>
                    </div>



                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label
                          style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                          Bed {" "} <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Beds"
                          value={bed_name}
                          readOnly
                          style={{ backgroundColor: "#E7F1FF", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        />
                      </Form.Group>
                    </div>



                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <Form.Group className='' controlId="purchaseDate">
                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500, marginBottom: '2px', }}>
                          Complaint Date {" "}  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>

                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                          <DatePicker
                            style={{ width: "100%", height: 50, cursor: "pointer", fontFamily: "Gilroy" }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={selectedDate ? dayjs(selectedDate) : null}
                            // onChange={(date) => {
                            //   setDateErrmsg('');
                            //   setJoingDateErrmsg('');
                            //   setSelectedDate(date ? date.toDate() : null);
                            // }}
                            onChange={(date) => {
                              setDateErrmsg('');
                              setJoingDateErrmsg('');
                              setSelectedDate(date);
                            }}

                            disabledDate={(current) => {

                              if (!selectedUsername) {
                                return true
                              }

                              const selectedUser = state?.UsersList?.Users?.find(
                                (item) => item.customerId === userid
                              );

                              if (!selectedUser || !selectedUser.actualJoining) {
                                return current && current > dayjs().endOf("day");
                              }

                              const bookedDate = dayjs(selectedUser.actualJoining, "DD/MM/YYYY");
                              return (
                                (current && current < bookedDate.startOf("day")) ||
                                (current && current > dayjs().endOf("day"))
                              );
                            }}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest(".datepicker-wrapper")
                            }
                          />

                        </div>
                        {dateerrmsg.trim() !== "" && (
                          <ErrorMessage message={dateerrmsg} type="error" />

                        )}
                        {joiningDateErrmsg.trim() !== "" && (
                          <ErrorMessage message={joiningDateErrmsg} type="error" />
                        )}

                      </Form.Group>



                    </div>







                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2'>
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Description</Form.Label>
                        <Form.Control
                          value={description} onChange={(e) => { setDescription(e.target.value) }}
                          type="text" placeholder="Enter description" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                      </Form.Group>

                    </div>
                  </div>



                </Modal.Body>


                {formLoading && <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    opacity: 0.75,
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      borderTop: '4px solid #1E45E1',
                      borderRight: '4px solid transparent',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      animation: 'spin 1s linear infinite',
                    }}
                  ></div>
                </div>}


                {totalErrormsg.trim() !== "" && (
                  <div className='d-flex justify-content-center mb-2'>
<ErrorMessage message={totalErrormsg} type="error" />
                  </div>
                  
                )}


                {/* {state.createAccount?.networkError ?
                  <div className="d-flex justify-content-center mt-1 mb-1">
                    <ErrorMessage message={state.createAccount?.networkError} type="error" /></div>
                  : null} */}




                <Modal.Footer style={{ border: "none", paddingTop: 0 }}>

                  <Button  disabled={formLoading} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
                    onClick={handleAddcomplaint}
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



                        </Form.Select>
                      </Form.Group>

                    </div>

                  </div>

                </Modal.Body>




                {/* {state.createAccount?.networkError ?
                  <div className="d-flex justify-content-center mt-1 mb-1">
                    <ErrorMessage message={state.createAccount?.networkError} type="error" /></div>
                  : null} */}

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
  );
};

Compliance.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};
export default withErrorBoundary(Compliance);