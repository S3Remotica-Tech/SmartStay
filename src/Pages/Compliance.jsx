/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import Emptystate from '../Assets/Images/Empty-State.jpg'
import 'flatpickr/dist/themes/material_blue.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchteam from "../Assets/Images/New_images/Search Team.png";
import Filters from "../Assets/Images/Filters.svg";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../Pages/Compliance.css'
import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import closecircle from "../Assets/Images/New_images/close-circle.png";
import ComplianceList from './ComplianceList';
import { MdError } from "react-icons/md";
import 'react-datepicker/dist/react-datepicker.css';
import excelimg from "../Assets/Images/New_images/excel_blue.png";
import PropTypes from "prop-types";
import Select from "react-select";
import { toast } from 'react-toastify';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {CloseCircle} from "iconsax-react";

const Compliance = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const initialValuesRef = useRef({});

  const [id, setId] = useState('')
  const [Complainttype, setComplainttype] = useState('');
  const [description, setDescription] = useState('')
  const [Assign, setAssign] = useState('');
  const [Status, setStatus] = useState('');
  const [hostel_Id, setHostel_Id] = useState('')
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

  const [filterStatus, setFilterStatus] = useState(false);

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


  useEffect(() => {
    if (hosId) {
      dispatch({ type: "COMPLAINT-TYPE-LIST", payload: { hostel_id: hosId } });
    }

  }, [hosId])

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
    if (
      compliancerolePermission[0]?.is_owner === 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_view === 1
    ) {
      setCompliancePermissionError("");
    } else {
      setCompliancePermissionError("Permission Denied");
    }
  }, [compliancerolePermission]);



  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner === 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_create === 1
    ) {
      setComplianceAddPermission("");
    } else {
      setComplianceAddPermission("Permission Denied");
    }
  }, [compliancerolePermission]);


  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner === 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_delete === 1
    ) {
      setComplianceDeletePermission("");
    } else {
      setComplianceDeletePermission("Permission Denied");
    }
  }, [compliancerolePermission]);
  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner === 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_edit === 1
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
    if (hosId) {
      setLoading(true)
      dispatch({ type: 'COMPLIANCE-LIST', payload: { hostel_id: hosId } })
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: hosId },
      });
    }

  }, [hosId])
  useEffect(() => {
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
    maxDate: new Date(),
    minDate: null,
  };



  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
      setDateErrmsg('')
    }
  }, [selectedDate])





  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filterInput.length > 0
      ? filteredUsers
      : filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  const [statusfilter, setStatusfilter] = useState('')



  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [hostelname, setHostelName] = useState('')

  const [dateerrmsg, setDateErrmsg] = useState('');
  const [usererrmsg, setUserErrmsg] = useState('');
  const [complaint_typeerrmsg, setComplaintTypeErrmsg] = useState('')
  const [totalErrormsg, setTotalErrmsg] = useState('')



 
  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("")
    setDropdownVisible(false);
  };


  const handleSearch = () => {
    setSearch(!search);
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

    const selectedUserData = state.ComplianceList.Compliance.filter(
      (item) => item.Name === user.Name
    );
    setFilteredUsers(selectedUserData);

    setDropdownVisible(false);  
  };


 

 
  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusfilter(value);
  
    if (value === "All") {
      setFilteredUsers(state.ComplianceList?.Compliance || []);
    }
    
    else {
      const filtered = (state.ComplianceList?.Compliance || []).filter(item =>
        item.Status?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1)
    }
  };
  
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      setSelectedDateRange([]);
      setStatusfilter("All"); 
      setFilteredUsers(state.ComplianceList?.Compliance); 
    } else {
      setSelectedDateRange(dates);
      const filtered = state.ComplianceList?.Compliance.filter((item) =>
        dayjs(item.date).isAfter(dayjs(dates[0]).subtract(1, 'day')) &&
        dayjs(item.date).isBefore(dayjs(dates[1]).add(1, 'day'))
      );
      setFilteredUsers(filtered);
      setCurrentPage(1)
    }
  };

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
        return item.Name === selectedUsername
      }
      )
      if (filteredDetails.length > 0) {
        
        const firstFilteredDetail = filteredDetails[0];
        setHostel_Id(firstFilteredDetail.Hostel_Id || '');
        setHostelName(firstFilteredDetail.HostelName || '');
        setFloor(firstFilteredDetail.Floor || '');
        setBeds(firstFilteredDetail.hstl_Bed || '');
        setBedName(firstFilteredDetail.Bed || '')
        setRooms(firstFilteredDetail.room_id || '');
        setUser_Id(firstFilteredDetail.User_Id || '');
        setRoomName(firstFilteredDetail.Rooms || '')
        setFloorname(firstFilteredDetail.floor_name || '')

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
                  hideProgressBar: true, autoClose: 1500,  style: { color: '#000', borderBottom:"5px solid red", fontFamily:"Gilroy"} 
              });
              return;
          }
    setEdit(false)
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
    setSelectedUserName('');
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

  

  const handleAddcomplaint = () => {

    if (edit && !hasChanges) {
      setTotalErrmsg('Please make some changes before saving');
      setTimeout(() => {
        setTotalErrmsg('');
      }, 10000);
      return;
    }



    

    if (!selectedUsername) {
      setUserErrmsg('Please Select  Customer')
    }

    if (!Complainttype) {
      setComplaintTypeErrmsg('Please Select  Complaint Type')
    }

    if (!selectedDate) {
      setDateErrmsg('Please Select date')
    }

    setEdit(false)

    if (Complainttype && selectedDate && hostelname && beds && Rooms) {
      const formattedDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';
      if (id && hasChanges) {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: formattedDate, Hostel_id: hostel_Id, Bed: Number(beds), Room: Rooms, hostelname: hostelname, Floor_id: Floor, Status: Status, User_id: userid, id: id} })
        handleClose()
        setSelectedUserName('');
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
        setId('');
        setHostel_Id('')
      }
      else {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: formattedDate, Hostel_id: hostel_Id, Bed: beds, Room: Rooms, hostelname: hostelname, Floor_id: Floor, User_id: userid, Status: Status,} })
        handleClose()
        setSelectedUserName('');
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
        setId('');
        setHostel_Id('')
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
    if (Complaintdata) {
      
      setShow(true);
      setId(Complaintdata.ID)
      setSelectedUserName(Complaintdata.Name);
      setComplainttype(Complaintdata.Complainttype);
      setEditcomplainttype(Complaintdata.complaint_name)
      setAssign(Complaintdata.Assign);
      setDescription(Complaintdata.Description);
      setSelectedDate(new Date(Complaintdata.date)); 
      setHostel_Id(Complaintdata.Hostel_id)
      setBeds(Complaintdata.Bed)
      setBedName(Complaintdata.bedName)
      setFloor(Complaintdata.Floor_id);
      setRooms(Complaintdata.Room);
      setHostelName(Complaintdata.hostelname);
      setStatus(Complaintdata.Status)


      initialValuesRef.current = {
        Assign: Complaintdata.Assign,
        Description: Complaintdata.Description,
        Status: Complaintdata.Status,
        selectedDate: new Date(Complaintdata.date) 
      };
    }
  };

  let hasChanges =
  Assign !== initialValuesRef.current.Assign ||
  description !== initialValuesRef.current.Description ||
  Status !== initialValuesRef.current.Status ||
  new Date(selectedDate).getTime() !== new Date(initialValuesRef.current.selectedDate).getTime(); 


    
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

 
  useEffect(() => {
    if (hosId) {
      dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: hosId } });
    }
  }, [hosId]);
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


  
      useEffect(() => {
            if (
              filteredUsers.length > 0 &&
              currentItems.length === 0 &&
              currentPage > 1
            ) {
              setCurrentPage(currentPage - 1);
            }
          }, [filteredUsers])


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
              <img
                src={Emptystate}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

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
            <div style={{ width: "100%", fontFamily: "Gilroy", position: "relative" }} >
              <div >
                   
              {loading  &&
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
  <div className="d-flex justify-content-between align-items-center flex-wrap" style={{paddingTop:11}}>
    <div className=" ms-2" >
      <label style={{ fontSize: 18, color: "#000000", fontWeight: 600,marginTop:5,marginLeft:3 }}>Complaints</label>
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
                              <ul
                                className="show-scroll p-0"
                                style={{
                                  backgroundColor: "#fff",
                                  maxHeight:
                                    filteredUsers?.length > 1 ? "174px" : "auto",
                                  minHeight: 50,
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
                                      <span>{user.Name}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
        </div>
      ) : (
        <div className='me-2' style={{ cursor: "pointer" }}>
          <Image
            src={searchteam}
            style={{ height: "24px", width: "24px" }}
            onClick={handleSearch}
          />
        </div>
      )}

     <div className='me-2' style={{ cursor: "pointer" }}>
        <Image
          src={Filters}
          style={{ height: "50px", width: "50px" }}
          onClick={handleFilterd}
        />
      </div>

      {
                          filterStatus &&

                          <div className='me-3' style={{ border: "1px solid #D4D4D4", borderRadius: 8, width:  "140px"}}>
                            <Form.Select
                              onChange={(e) => handleStatusFilter(e)}
                              value={statusfilter}
                              aria-label="Select Price Range"
                              className=''
                              id="statusselect"
                              style={{ color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy",cursor:"pointer" }}
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
          style={{ height: 40,cursor:"pointer" }}
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
        />
      </div>

      <div className='me-2' style={{paddingRight:4}}>
      <Button
                        disabled={complianceAddPermission}
                        onClick={handleShow}
                        style={{
                          fontSize: 13, backgroundColor: "#1E45E1", fontWeight: 600, borderRadius: 8,

                         
                          color: '#FFF', fontFamily: 'Montserrat',
                          whiteSpace: "nowrap",
                          width:146,
                          height:45,
                          textAlign:"center"
                        }} > + Complaint</Button>
      </div>
    </div>
  </div>
</div>


                <div className='row row-gap-3 p-4'
                  style={{
                    maxHeight: "470px",
                    overflowY: "auto",
                  }}>
                  {currentItems.length > 0 && currentItems.map((complaints) => (
                    <div key={complaints.ID} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                      <ComplianceList  complaints={complaints} onEditComplaints={handleEditcomplaint} onAssignshow={handleAssignShow} complianceAddPermission={complianceAddPermission} complianceEditPermission={complianceEditPermission} complianceDeletePermission={complianceDeletePermission} />
                    </div>
                  ))
                  }


                  { !loading  && currentItems.length === 0 &&

                    <div className='d-flex align-items-center justify-content-center fade-in'
                      style={{ width: "100%", height: 350, marginTop: 40 }}>
                      <div>
                        <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No Active complaint </div>
                        <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There are no active complaints </div>


                      </div>
                      <div>

                      </div>
                    </div>


                  }

                </div>
                {filteredUsers?.length >= 5 && (
              
                  <nav className="pagination-container mb-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "10px",
                    borderRadius: "5px",
                    position: "fixed",
                    zIndex: 1000,
                    width:'83%',
                    bottom:0,
                    left:'17%',
                    right:'16px'
                  }}
                >
                  
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
                    <Modal.Dialog style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }} className='m-0 p-0'>


                      <Modal.Body>
                        <div>

                          <Modal.Header style={{ marginBottom: "10px", position: "relative",marginTop:"-15px" }}>
                            <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>{edit ? "Edit Compliant" : "Add an complaint"}</div>
                           
                              <CloseCircle size="24" color="#000" onClick={handleClose} 
                                        style={{ cursor: 'pointer'}}/>

                          </Modal.Header>
                        </div>

                        <div className='row '>

                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                                Customer <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                            
                     
  <Select
    options={
      state?.UsersList?.Users?.filter(
        (u) =>
          u.Bed !== "undefined" &&
          u.Bed !== "0" &&
          typeof u.Bed === "string" &&
          u.Bed.trim() !== "" &&
          u.Rooms !== "undefined" &&
          u.Rooms !== "0" &&
          typeof u.Rooms === "string" &&
          u.Rooms.trim() !== ""
      ).map((u) => ({
        value: u.Name,
        label: u.Name,
      })) || []
    }
    onChange={handleCheckoutChange}
    value={
      selectedUsername
        ? state?.UsersList?.Users?.find((u) => u.Name === selectedUsername) && {
            value: selectedUsername,
            label: selectedUsername,
          }
        : null
    }
    placeholder="Select a customer"
    classNamePrefix="custom"
    menuPlacement="auto"
    isDisabled={edit}
    noOptionsMessage={() => "No customers available"}
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
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "120px",
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto",
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
                                <div>
                                  <p style={{ fontSize: '15px', color: 'red' }}>
                                    {usererrmsg !== " " && <MdError style={{ color: 'red', marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{usererrmsg}</span>
                                  </p>
                                </div>
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
                              Complaint Type <span style={{ color: "red", fontSize: "16px" }}>*</span>
                            </label>

                        
                        
  <Select
    options={
      Array.isArray(complainttypelist) && complainttypelist.length > 0
        ? complainttypelist.map((u) => ({
            value: u.id,
            label: u.complaint_name,
          }))
        : []
    }
    onChange={handleComplaintType}
    value={
      edit && editcomplainttype
        ? { value: editcomplainttype, label: editcomplainttype }
        : Complainttype
        ? {
            value: Complainttype,
            label: complainttypelist.find((c) => c.id === Complainttype)
              ?.complaint_name,
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
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "120px", 
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto", 
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
    }}
  />


                          </div>
                          {complaint_typeerrmsg.trim() !== "" && (
                                <div>
                                  <p style={{ fontSize: '15px', color: 'red' }}>
                                    {complaint_typeerrmsg !== " " && <MdError style={{ color: 'red', marginRight: "5px", fontSize: "13px"}} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{complaint_typeerrmsg}</span>
                                  </p>
                                </div>
                              )}


                          {state?.Settings?.Complainttypelist && state?.Settings?.Complainttypelist?.complaint_types?.length === 0 && <>
                            <label className="pb-1" style={{ fontSize: 14, color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>*
                              Please add a &apos;ComplaintType&apos; option in Settings, accessible after  adding an Complaints.</label></>}

                    

                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 '>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label
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
                              />
                            </Form.Group>
                          </div>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 '>
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
                              />
                            </Form.Group>
                          </div>



                          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label
                                style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                              >
                                Bed<span style={{ color: 'red', fontSize: '20px' }}>*</span>
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
                            <Form.Group className='mb-1' controlId="purchaseDate">
                              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                Complaint Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                              </Form.Label>
                             
                              <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                <DatePicker
                                  style={{ width: "100%", height: 48,cursor:"pointer" }}
                                  format="DD/MM/YYYY"
                                  placeholder="DD/MM/YYYY"
                                  value={selectedDate ? dayjs(selectedDate) : null}
                                  onChange={(date) => {
                                    setDateErrmsg('')
                                    setSelectedDate(date ? date.toDate() : null);
                                  }}
                                  getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                                />
                              </div>
                            </Form.Group>

                            {dateerrmsg.trim() !== "" && (
                              <div className="d-flex align-items-center">
                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                  {dateerrmsg}
                                </label>
                              </div>
                            )}

                          </div>





                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
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
                          <p className='text-center' style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                            {totalErrormsg !== " " && <MdError style={{ color: 'red' }} />} <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {totalErrormsg}</span>
                          </p>
                        </div>
                      )}

                      <Modal.Footer style={{ border: "none" }}>

                        <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
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
  );
};

Compliance.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};
export default Compliance;