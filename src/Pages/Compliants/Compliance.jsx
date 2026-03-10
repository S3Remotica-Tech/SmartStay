/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import Emptystate from '../../Assets/Images/Empty-State.jpg'
import 'flatpickr/dist/themes/material_blue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import Filters from "../../Assets/Images/Filters.svg";
import { FiSearch } from "react-icons/fi";

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

  // const [compliancerolePermission, setComplianceRolePermission] = useState("");

  // const [compliancepermissionError, setCompliancePermissionError] = useState("");
  // const [complianceAddPermission, setComplianceAddPermission] = useState("")
  // const [complianceDeletePermission, setComplianceDeletePermission] = useState("")
  // const [complianceEditPermission, setComplianceEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const customerSelectRef = useRef(null);

  const {
    canWriteModule: canWriteComplaints,
    canReadModule: canReadComplaints,
    // canUpdateModule: canUpdateBanking,
    // canDeleteModule: canDeleteBanking,
  } = useHasPermission("Complaints");

  useEffect(() => {

    if (customerSelectRef.current) {
      customerSelectRef.current.focus();
    }
  }, []);
  // console.log(state,"state")

  // const canReadComplaints = useHasPermission("Complaints", "canRead");
  // const canWriteComplaints = useHasPermission("Complaints", "canWrite");


  const complaintList = useSelector((state) => state.Settings.Complainttypelist);


  // const filterOptions = useSelector((state) => state.ComplianceList.filterOptions);


  useEffect(() => {
    if (!canReadComplaints) {
      setLoading(false);
    }
  }, [canReadComplaints]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])










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
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {

      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: hosId } })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_COMPLIANCE' })
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance])

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true)
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostelId: state.login.selectedHostel_Id } })
    }
    else {
      setFilteredUsers([]);
      setLoading(false)
    }

  }, [state.login?.selectedHostel_Id])




  useEffect(() => {
    setLoading(false)
  }, [state.ComplianceList.Compliance]);






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
      const filteredDetails = state.UsersList.Users?.listCustomers?.filter(item => {
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
    if (edit) {
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



  // const [EditComplaintDetails, setEditComplaintDetails] = useState({})

  useEffect(() => {
    if (state.ComplianceList.statusCodeforgetparticularCompliant === 200) {
      // setEditComplaintDetails(state.ComplianceList.ParticularComplaint)
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



      <div>

        {loading && (
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent z-[1050]">
            <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="sticky top-1 bg-white z-[1000] m-1 h-auto font-gilroy">
          <div className="flex justify-between items-center flex-wrap">
            <div>
              <label className="text-lg text-black font-semibold font-gilroy">
                Complaints
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">

              {search ? (
                <div className="relative mt-2">

                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Image src={searchteam} className="h-5 w-5"
                      />
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control border-start-0 border border-l-0 border-r-0 border-[#CFD5DB] shadow-none outline-none px-2.5 py-2 w-full w-12 font-gilroy"
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img
                        src={closecircle}
                        alt="close"
                        className="h-5 w-5 cursor-pointer"
                        onClick={handleCloseSearch}
                      />
                    </span>
                  </div>

                  {isDropdownVisible && filteredUsers?.length > 0 && (
                    <div className="absolute top-15 left-0 z-50 w-full p-2.5 bg-white border border-gray-300 rounded-lg"
                    >

                      <ul className="show-scroll p-0 m-0 list-none rounded-lg max-h-44 overflow-y-auto bg-white w-full box-border">
                        {filterUsers?.length > 0 ? (
                          filterUsers.map((user, index) => {
                            const imagedrop = user?.complaintResponseDto?.customerProfile || Profile;
                            return (
                              <li
                                key={index}
                                className={`flex items-center w-full p-2.5 rounded-lg cursor-pointer box-border font-gilroy ${hoveredIndex === index
                                  ? "bg-blue-700 text-white"
                                  : "bg-white text-black"
                                  }`}

                                onClick={() => handleUserSelect(user.complaintResponseDto)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                              >
                                <Image
                                  src={imagedrop}
                                  alt={user?.Name || "Default Profile"}
                                  roundedCircle
                                  className="h-7.5 w-7.5 mr-2.5 flex-shrink-0"
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
                            className="flex items-center justify-center w-full p-2.5 rounded-lg bg-white text-black box-border font-gilroy"
                          >
                            No Customer found
                          </li>
                        )}

                      </ul>

                    </div>
                  )}
                </div>
              ) : (
                <div className='me-2 cursor-pointer'>
                  <Image
                    src={searchteam}
                    className={`h-6 w-6 transition-opacity duration-300 ease-in-out ${canReadComplaints
                      ? "cursor-pointer opacity-100 pointer-events-auto"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}

                    onClick={() => canReadComplaints && handleSearch()}
                  />
                </div>
              )}

              <div className='me-2 cursor-pointer'>
                <Image
                  src={Filters}
                  className={`h-12 w-12 transition-opacity duration-300 ease-in-out ${canReadComplaints
                    ? "cursor-pointer opacity-100 pointer-events-auto"
                    : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}

                  onClick={handleFilterd}
                />
              </div>

              {
                filterStatus &&

                <div className="mr-3 w-36 border border-gray-300 rounded-lg">
                  <Form.Select
                    onChange={(e) => handleStatusFilter(e)}
                    value={statusfilter}
                    aria-label="Select Price Range"
                    id="statusselect"
                    className="text-gray-900 font-semibold font-gilroy cursor-pointer"
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
                    className="h-10 cursor-pointer font-gilroy"
                  />
                </div>
              )}

              <div className='me-2 cursor-pointer'>
                <img
                  src={excelimg}
                  alt="excel"
                  width={38}
                  height={38}
                  onClick={handleComplianceeExcel}
                  className={`transition-opacity duration-300 ease-in-out ${canReadComplaints
                    ? "cursor-pointer opacity-100 pointer-events-auto"
                    : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}

                />
              </div>

              <div className='me-2 pr-1'>
                <Button
                  disabled={!canWriteComplaints || state?.login?.planStatus === 0}
                  onClick={handleShow}
                  className="!font-gilroy text-sm !font-semibold text-white !bg-blue-700 rounded-lg p-2 w-36 whitespace-nowrap"
                > + Complaint</Button>
              </div>
            </div>
          </div>
        </div>



        {
          !canReadComplaints ? (
            <>
              <div className="flex flex-col items-center justify-center min-h-screen">
                <img
                  src={Emptystate}
                  alt="Empty State"
                  className='h-[240px] w-[240px]'
                />

                <ErrorMessage
                  message={['You do not have access to view Compliants']}
                  type="warning"
                />
              </div>
            </>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 
  h-[530px] lg:h-[530px] xl:h-[530px] 2xl:h-[850px] 3xl:h-[850px] overflow-y-auto show-scroll">
  


              {filteredUsers.length > 0 &&
                filteredUsers.map((complaints) => (
                  <div
                    key={complaints.ID}
                    className="bg-white rounded-xl p-2.5"
                  >
                    <ComplianceList
                      complaints={complaints}
                      onEditComplaints={handleEditcomplaint}
                      onAssignshow={handleAssignShow}
                      // complianceAddPermission={complianceAddPermission}
                      // complianceEditPermission={complianceEditPermission} 
                      // complianceDeletePermission={complianceDeletePermission} 
                      disableActions={state?.login?.planStatus === 0}
                    />
                  </div>
                ))}

              {!loading && filteredUsers.length === 0 && (
                <div className="col-span-1 md:col-span-2 flex items-center justify-center fade-in">
                  <div className="flex flex-col items-center justify-center text-center mb-8">
                    <img
                      src={Emptystate}
                      alt="emptystate"
                        />

                    <div className="pb-1 font-semibold font-gilroy text-[18px] text-[rgba(75,75,75,1)]">
                      No Active complaint
                    </div>

                    <div className="pb-1 font-medium font-gilroy text-[14px] text-[rgba(75,75,75,1)]">
                      There are no active complaints
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
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
        <div className="modal show block static font-gilroy" >
          <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static">
            <Modal.Dialog className="m-0 p-0 pr-2 rounded-full">

              <Modal.Header>
                <div className="text-xl font-semibold font-gilroy">
                  {edit ? "Edit Compliant" : "Add an complaint"}
                </div>

                <CloseCircle
                  size="24"
                  color="#000"
                  onClick={handleClose}
                  className="cursor-pointer"
                />
              </Modal.Header>

              <Modal.Body className="show-scroll max-h-96 overflow-y-scroll pt-1 mt-2 mr-3">

                {Array.isArray(complaintList) && complaintList.length === 0 && (
                  <ErrorMessage message={[" Please Create Complaint Type in Settings-Complaint  before adding an complaint"]} type="error" />

                )}

                <div className='grid grid-cols-12 gap-3'>

                  <div className='col-span-12'>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal"
                      >
                        Customer {" "} <span className="text-red-600 text-xl">*</span>
                      </Form.Label>


                      <Select ref={customerSelectRef}
                        options={
                          state?.UsersList?.Users?.listCustomers?.filter(
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
                            ? state?.UsersList?.Users?.listCustomers?.find((u) => u.customerId === selectedUsername) && {
                              value: selectedUsername,
                              label:
                                state?.UsersList?.Users?.listCustomers?.find((u) => u.customerId === selectedUsername)
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

                  <div className="col-span-12 ">

                    <label className="block text-sm text-gray-900 font-medium font-gilroy mb-1">
                      Complaint Type {" "}   <span className='text-red-600 text-xl'>*</span>
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
                    <label className="pb-1 text-sm text-red-600 font-medium font-gilroy">*
                      Please add a &apos;ComplaintType&apos; option in Settings, accessible after  adding an Complaints.</label>
                  </>}

                  <div className='col-span-12 md:col-span-6 lg:col-span-6 -mt-2'>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label
                        className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal"
                      >
                        Floor {" "} <span className='text-red-600 text-xl'>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Floor"
                        value={floorname}
                        readOnly
                        className="!bg-[#E7F1FF] text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 !rounded-lg"

                      />
                    </Form.Group>
                  </div>

                  <div className='col-span-12 md:col-span-6 lg:col-span-6 -mt-2'>
                    <Form.Group controlId="exampleForm.ControlInput3">
                      <Form.Label
                        className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal"
                      >
                        Room {" "}  <span className='text-red-600 text-xl'>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Rooms"
                        value={room_name}
                        readOnly
                        className="!bg-[#E7F1FF] text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 !rounded-lg"
                      />
                    </Form.Group>
                  </div>

                  <div className='col-span-12 md:col-span-6 lg:col-span-6 -mt-2'>
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                      <Form.Label className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal">
                        Bed {" "} <span className='text-red-600 text-xl'>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Beds"
                        value={bed_name}
                        readOnly
                        className="!bg-[#E7F1FF] text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 !rounded-lg"
                      />
                    </Form.Group>
                  </div>

                  <div className='col-span-12 md:col-span-6 lg:col-span-6 -mt-2'>
                    <Form.Group controlId="purchaseDate">
                      <Form.Label className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal">
                        Complaint Date {" "}  <span className='text-red-600 text-xl'>*</span>
                      </Form.Label>

                      <div className="datepicker-wrapper w-full relative">
                        <DatePicker
                          className="w-full h-12 cursor-pointer font-gilroy"

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

                            const selectedUser = state?.UsersList?.Users?.listCustomers?.find(
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

                  <div className="col-span-12 ">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">

                      <Form.Label className="text-sm text-gray-900 font-medium font-gilroy not-italic leading-normal">
                        Description
                      </Form.Label>

                      <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Enter description"
                        className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                      />

                    </Form.Group>
                  </div>

                </div>



              </Modal.Body>


              {formLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  flex items-center justify-center bg-transparent opacity-75 z-10">
                  <div className="w-10 h-10 border-t-4 border-r-4 border-blue-700 border-r-transparent rounded-full animate-spin"></div>
                </div>
              )}



              {totalErrormsg.trim() !== "" && (
                <div className='d-flex justify-content-center mb-2'>
                  <ErrorMessage message={totalErrormsg} type="error" />
                </div>

              )}


              {/* {state.createAccount?.networkError ?
                  <div className="d-flex justify-content-center mt-1 mb-1">
                    <ErrorMessage message={state.createAccount?.networkError} type="error" /></div>
                  : null} */}

              <Modal.Footer className="!border-none pt-0">
                <Button
                  disabled={formLoading}
                  className="w-full !bg-blue-700 !font-gilroy text-white font-medium font-gilroy text-base h-12 rounded-xl"
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
        <div className="modal show block static !font-gilroy" >
          <Modal
            show={Assignpopupshow} onHide={handleAssignClose}
            centered>
            <Modal.Dialog className="w-full m-0 p-0 md:w-1/3">
              <Modal.Header closeButton closeLabel="close-button" >
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

    </>
  );
};

Compliance.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};
export default withErrorBoundary(Compliance);