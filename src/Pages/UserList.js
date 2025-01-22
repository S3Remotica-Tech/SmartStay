import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";
import UserlistForm from "./UserlistForm";
import UserListRoomDetail from "./UserListRoomDetail";
import Filters from "../Assets/Images/Filters.svg";
import squre from "../Assets/Images/New_images/minus-square.png";
import Modal from "react-bootstrap/Modal";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import excelimg from "../Assets/Images/New_images/excel_blue.png";
import CustomerReAssign from "./CustomerReAssign";
import { ArrowLeft2, ArrowRight2, MoreCircle, } from "iconsax-react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import UserlistBookings from "./UserlistBookings";
import UserlistCheckout from "./UserlistCheckout";
import UserlistWalkin from "./UserlistWalkin";
import Addbooking from "./Addbookingform";
import CheckOutForm from "./UserListCheckoutForm";
import UserlistWalkinForm from "./UserlistWalkinForm";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import addcircle from "../Assets/Images/New_images/add-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import { SearchNormal1 } from 'iconsax-react';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdError } from "react-icons/md";
import CustomerCheckout from "./CustomerCheckout";

function UserList(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const selectRef = useRef("select");
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = React.useState("1");
  const [customerrolePermission, setCustomerRolePermission] = useState("");
  const [customerpermissionError, setCustomerPermissionError] = useState("");
  const [customerAddPermission, setCustomerAddPermission] = useState("");
  const [customerDeletePermission, setCustomerDeletePermission] = useState("");
  const [customerEditPermission, setCustomerEditPermission] = useState("");
  const [customerBookingAddPermission, setCustomerBookingAddPermission] = useState("");
  const [customerWalkInAddPermission, setCustomerWalkInAddPermission] = useState("");
  const [customerCheckoutPermission, setCustomerCheckoutAddPermission] = useState("");
  const [excelDownload, setExcelDownload] = useState("");
  const [excelDownloadBooking, setExcelDownloadBooking] = useState("");
  const [excelDownloadChecout, setExcelDownloadCheckout] = useState("");
  const [excelDownloadCheckIn, setExcelDownloadChecIn] = useState("");
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [reAssignDetail, setReasignDetail] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");
  const [selectAmneties, setselectAmneties] = useState("");
  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [createby, setcreateby] = useState("");
  const [amnityEdit, setamnityEdit] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);

  useEffect(() => {
    setUniqostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "USERLIST",
      payload: { hostel_id: uniqueostel_Id },
    });
  }, [uniqueostel_Id]);

  const handleCustomerReAssign = (reuser) => {
    setReasignDetail(reuser);
    setCustomerReAssign(true);
  };
  const handleCustomerCheckout = (item) => {
    setCustomerCheckoutpage(true);
    setCustomerCheckoutData(item);
  };

  useEffect(() => {
    setCustomerRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_view == 1
    ) {
      setCustomerPermissionError("");
    } else {
      setCustomerPermissionError("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_create == 1
    ) {
      setCustomerAddPermission("");
    } else {
      setCustomerAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_edit == 1
    ) {
      setCustomerEditPermission("");
    } else {
      setCustomerEditPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_delete == 1
    ) {
      setCustomerDeletePermission("");
    } else {
      setCustomerDeletePermission("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[5]?.per_create == 1
    ) {
      setCustomerBookingAddPermission("");
    } else {
      setCustomerBookingAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[7]?.per_create == 1
    ) {
      setCustomerWalkInAddPermission("");
    } else {
      setCustomerWalkInAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner == 1 ||
      customerrolePermission[0]?.role_permissions[6]?.per_create == 1
    ) {
      setCustomerCheckoutAddPermission("");
    } else {
      setCustomerCheckoutAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    // Only filter when value is "1"
    if (value === "1") {
      const FilterUser = state.UsersList.Users.filter((item) => {
        return item.Name.toLowerCase().includes(filterInput.toLowerCase());
      });

      setFilteredUsers(FilterUser);
    }
    // if (value === "2") {
    //   const FilterUsertwo =
    //     state?.Booking?.CustomerBookingList?.bookings?.filter((item) => {
    //       return item.first_name
    //         .toLowerCase()
    //         .includes(filterInput.toLowerCase());
    //     });
    //   setFilteredUsers(FilterUsertwo);
    // }
    if (value === "2") {
      const FilterUsertwo =
        state?.Booking?.CustomerBookingList?.bookings?.filter((item) => {
          const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
          return fullName.includes(filterInput.toLowerCase());
        });
      setFilteredUsers(FilterUsertwo);
    }
    // if (value === "4") {
    //   const FilterUsertwo = state.UsersList.WalkInCustomerList.filter((item) => {
    //     return item.customer_Name.toLowerCase().includes(filterInput?.toLowerCase());
    //   });
    //   setFilteredUsers(FilterUsertwo);
    // }
    if (value === "4" && Array.isArray(state.UsersList.WalkInCustomerList)) {
      const FilterUsertwo = state.UsersList.WalkInCustomerList.filter((item) => {
        return item.first_name?.toLowerCase().includes(filterInput?.toLowerCase() || "");
      });
      setFilteredUsers(FilterUsertwo);
    }
  }, [
    filterInput,
    state.UsersList.Users,
    value,
    state?.Booking?.CustomerBookingList?.bookings, state.UsersList.WalkInCustomerList
  ]);
  // useEffect(() => {
  //   let FilterUser = [];

  //   if (value === "1") {
  //     FilterUser = Array.isArray(state.UsersList?.Users)
  //       ? state.UsersList.Users?.filter((item) =>
  //           item.Name?.toLowerCase().includes(filterInput.toLowerCase())
  //         )
  //       : [];
  //   } else if (value === "2") {
  //     FilterUser = Array.isArray(state?.Booking?.CustomerBookingList?.bookings)
  //       ? state.Booking.CustomerBookingList.bookings?.filter((item) =>
  //           item.first_name?.toLowerCase().includes(filterInput.toLowerCase())
  //         )
  //       : [];
  //   } else if (value === "4") {
  //     FilterUser = Array.isArray(state.UsersList?.hostelList)
  //       ? state.UsersList.hostelList?.filter((item) =>
  //           item.Name?.toLowerCase().includes(filterInput.toLowerCase())
  //         )
  //       : [];
  //   }

  //   setFilteredUsers(FilterUser)
  // }, [
  //   filterInput,
  //   state.UsersList?.Users,
  //   value,
  //   state?.Booking?.CustomerBookingList?.bookings,
  //   state.UsersList?.hostelList,
  // ]);


  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    setDropdownVisible(e.target.value?.length > 0);
  };
  const handleUserSelect = (user) => {
    if (value === "1") {
      setFilterInput(user.Name);
    } else if (value === "2") {
      setFilterInput(`${user.first_name} ${user.last_name}`);
    } else if (value === "4") {
      setFilterInput(user.first_name);
    }

    setFilteredUsers([]);
    setDropdownVisible(false);
  };


  // const handleUserSelect = (user) => {
  //   if (value === "1") {
  //     setFilterInput(user.Name);
  //   } else if (value === "2") {
  //     setFilterInput(user.first_name);
  //   }

  //   setFilteredUsers([]);
  //   setDropdownVisible(false);
  // };

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
  };
  useEffect(() => {
    if (state.InvoiceList.statusCodeForPDf === 200) {
      dispatch({ type: "INVOICELIST" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_LIST" });
      }, 100);
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
      }, 200);
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [searchicon, setSearchicon] = useState(false);
  const [edit, setEdit] = useState("");
  const [filtericon, setFiltericon] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  const [EditObj, setEditObj] = useState("");
  const [addBasicDetail, setAddBasicDetail] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store original data from API
  const [filteredDataPagination, setfilteredDataPagination] = useState([]);
  const [showDots, setShowDots] = useState("");
  const [activeRow, setActiveRow] = useState(null);

  const handleShowDots = (id) => {
    if (activeRow == id) {
      setActiveRow(null);
    } else {
      setActiveRow(id);
    }
    setSearch(false);
  };

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAccount);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(
  //       <li key={i} style={{ margin: "0 5px" }}>
  //         <button
  //           style={{
  //             padding: "5px 10px",
  //             color: i === currentPage ? "#007bff" : "#000",
  //             cursor: "pointer",
  //             border: i === currentPage ? "1px solid #ddd" : "none",
  //             backgroundColor:
  //               i === currentPage ? "transparent" : "transparent",
  //           }}
  //           onClick={() => handlePageChange(i)}
  //         >
  //           {i}
  //         </button>
  //       </li>
  //     );
  //   }
  //   return pageNumbers;
  // };

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleShow = (u) => {
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(true);
    setEditObj(u);
    setemail_id(u.Email);
  };

  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearch(false);
    setExcelDownload("");
    setExcelDownloadBooking("");
    setExcelDownloadChecIn("");
    setExcelDownloadCheckout("");
    setIsDownloadTriggered(false);
    setFilterInput("")
  };

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {
      setFilteredUsers(state.UsersList.Users);

      const uniqueUsersList = Array.isArray(state.UsersList?.Users);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList?.UserListStatusCode]);

  const [roomDetail, setRoomDetail] = useState(false);
  const [userList, setUserList] = useState(true);
  const [clickedUserData, setClickedUserData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState("ALL");

  const [hostel, sethostel] = useState("");
  const [floors_Id, setFloors_Id] = useState("");
  const [rooms_id, setRoomsId] = useState("");
  const [beds_id, setBed_Id] = useState("");
  const [emaill_id, setemaill_id] = useState("");
  const [id, setId] = useState("");
  const [hostelName, sethosName] = useState("");
  const [customerUser_Id, setcustomerUser_Id] = useState("");
  const [createbyamni, setcreatebyamni] = useState("");
  const [amnitytableshow, setamnitytableshow] = useState(false);

  const handleRoomDetailsPage = (userData) => {
    const clickedUserDataArray = Array.isArray(userData)
      ? userData
      : [userData];
    setHostelIds(userData.Hostel_Id);
    setBedIds(userData.Bed);
    setFloorIds(userData.Floor);
    setRoomsIds(userData.Rooms);
    setemail_id(userData.Email);
    setId(userData.ID);
    setcreatebyamni(userData.created_By);
    sethosName(userData.HostelName);
    setcustomerUser_Id(userData.User_Id);
    setRoomDetail(true);
    setUserList(false);
    setClickedUserData(clickedUserDataArray);
  };
  const handleShowAddBed = (u) => {
    setEdit("Edit");
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(false);
    setEditObj(u);
    setemail_id(u.Email);
  };

  const [propsHostel, setPropsHostel] = useState("");
  const [propsFloor, setPropsFloor] = useState("");
  const [propsRooms, setPropsRooms] = useState("");
  const [propsBeds, setPropsBeds] = useState("");
  const [propsEmil, setPropsemail] = useState("");

  const AfterEditHostel = (hostel_id) => {
    setPropsHostel(hostel_id);
  };

  const AfterEditFloor = (Floor_ID) => {
    setPropsFloor(Floor_ID);
  };

  const AfterEditRooms = (room) => {
    setPropsRooms(room);
  };

  const AfterEditBed = (bedsId) => {
    setPropsBeds(bedsId);
  };
  const AfterEditEmail = (emmail) => {
    setPropsemail(emmail);
  };

  const [hostelIds, setHostelIds] = useState(hostel);
  const [bedIds, setBedIds] = useState(beds_id);
  const [floorIds, setFloorIds] = useState(floors_Id);
  const [roomsIds, setRoomsIds] = useState(rooms_id);
  const [email_id, setemail_id] = useState("");

  const [filteredDataForUser, setFilteredDataForUser] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const users = Array.isArray(state.UsersList?.Users)
      ? state.UsersList.Users
      : [];

    // Filter Particular User Details
    const ParticularUserDetails = users.filter((item) => {
      return item.User_Id == customerUser_Id;
    });

    setUserDetails(ParticularUserDetails);

    if (ParticularUserDetails.length > 0) {
      const User_Id = ParticularUserDetails[0]?.User_Id;

      const invoices = Array.isArray(state.InvoiceList?.Invoice)
        ? state.InvoiceList.Invoice
        : [];

      const filteredData = invoices.filter((user) => user.User_Id == User_Id);

      setFilteredDataForUser(filteredData);
    } else {
      setFilteredDataForUser([]);
    }
  }, [customerUser_Id, state.UsersList?.Users, state.InvoiceList?.Invoice]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: uniqueostel_Id },
      });

      setHostelIds(propsHostel);
      setBedIds(propsBeds);
      setFloorIds(propsFloor);
      setRoomsIds(propsRooms);
      setemail_id(propsEmil);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 2000);
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    propsHostel,
    propsBeds,
    propsFloor,
    propsRooms,
    propsEmil,
  ]);
  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  const [search, setSearch] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(true);

  const Amenitiesname = state.UsersList?.customerdetails?.data?.amentites;

  const billPaymentHistory = state.UsersList.billPaymentHistory;
  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  const [filterByInvoice, setFilterByInvoice] = useState("");

  useEffect(() => {
    if (state.InvoiceList?.Invoice && filteredDataForUser.length > 0) {
      let filteredData = [...filteredDataForUser];

      if (filterByStatus !== "ALL") {
        filteredData = filteredData?.filter(
          (item) => item.Status === filterByStatus
        );
      }

      if (filterByInvoice) {
        filteredData = filteredData?.filter((item) =>
          item.Invoices.toLowerCase().includes(filterByInvoice.toLowerCase())
        );
      }

      setFilteredDatas(filteredData);
    }
  }, [
    filterByStatus,
    filterByInvoice,
    filteredDataForUser,
    state.InvoiceList?.Invoice,
  ]);

  const getFloorName = (Floor) => {
    if (Floor === 1) {
      return "Ground Floor";
    } else if (Floor === 2) {
      return "1st Floor";
    } else if (Floor === 3) {
      return "2nd Floor";
    } else {
      const adjustedFloor = Floor - 1;
      const lastDigit = adjustedFloor % 10;
      let suffix = "th";

      switch (lastDigit) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
      }

      return `${adjustedFloor}${suffix} Floor`;
    }
  };

  const getFormattedRoomId = (Floor, Rooms) => {
    const floor = parseInt(Floor);
    const roomIdString = String(Rooms);
    switch (floor) {
      case 1:
        return `G${roomIdString.padStart(3, "0")}`;
      case 2:
        return `F${roomIdString.padStart(3, "0")}`;
      case 3:
        return `S${roomIdString.padStart(3, "0")}`;
      case 4:
        return `T${roomIdString.padStart(3, "0")}`;
      default:
        const floorAbbreviation = getFloorAbbreviation(floor);
        return `${floorAbbreviation}${roomIdString.padStart(3, "0")}`;
    }
  };

  const getFloorAbbreviation = (floor) => {
    switch (floor) {
      case 5:
        return "F";
      case 6:
        return "S";
      case 8:
        return "E";
      case 9:
        return "N";
      case 10:
        return "T";
      default:
        return `${floor}`;
    }
  };

  const handleBack = () => {
    setUserList(true);
    setRoomDetail(false);
  };
  const handleFilterByDate = (e) => {
    const searchDate = e.target.value;
    setFilterByDate(searchDate);
  };
  const handleShowSearch = () => {
    setSearch(!search);
    setFilterStatus(false);
  };

  const handleFliterByStatus = () => {
    setFilterStatus(!filterStatus);
    setSearch(false);
  };

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterByStatus(selectedStatus);
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
    }
  }, [id]);

  const handleselect = (e) => {
    const value = e.target.value;
    setselectAmneties(value);
    setamnitytableshow(true);

    const amenitiesHistory = state.UsersList.amnetieshistory?.filter((item) => {
      return item.amenity_Id == value;
    });

    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory && amenitiesHistory[0].status == 0) {
        setaddamenityShow(true);
        setstatusShow(false);
      }
    } else {
      setaddamenityShow(true);
      setstatusShow(false);
      setSelectedAmenityName([]);
    }
  };
  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteShow = () => {
    setDeleteShow(true);
  };

  useEffect(() => {
    if (
      state.UsersList.customerdetails.all_amenities &&
      state.UsersList.customerdetails.all_amenities.length > 0 &&
      selectAmneties
    ) {
      const AmnitiesNamelist =
        state.UsersList.customerdetails.all_amenities?.filter((item) => {
          return item.Amnities_Id == selectAmneties;
        });
      setcreateby(AmnitiesNamelist);
    }
  }, [state.UsersList?.customerdetails?.all_amenities, selectAmneties]);

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
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "AMENITESNAMES" });
  }, []);

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

  const [statusAmni, setStatusAmni] = useState(false);
  const [statusShow, setstatusShow] = useState(false);
  const [amnitynotshow, setamnitynotshow] = useState([]);
  const handleStatusAmnities = (e) => {
    setStatusAmni(e.target.value);
  };

  const handleAddUserAmnities = () => {
    if (statusAmni) {
      dispatch({
        type: "AddUserAmnities",
        payload: {
          userID: customerUser_Id,
          amenityID: selectAmneties,
          Status: statusAmni,
          hostelID: hostelIds,
        },
      });
      setStatusAmni("");
      setselectAmneties("");
    } else {
      dispatch({
        type: "AddUserAmnities",
        payload: {
          hostelID: hostelIds,
          userID: customerUser_Id,
          amenityID: selectAmneties,
        },
      });
      setStatusAmni("");
      setselectAmneties("");
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser == 200) {
      setaddamenityShow(false);
      setTimeout(() => {
        dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
        dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDUSER_AMNETIES" });
      }, 1000);
    }
  }, [state.UsersList.statusCustomerAddUser]);

  const handleEdit = (v) => {
    setamnityEdit(v);
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };
  const OnShowTableForCustomer = (isVisible) => {
    setUserList(isVisible);
    setRoomDetail(false);
  };

  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [showValidate, setShowValidate] = useState(true);
  const [aadhaarNo, setAdhaarNo] = useState("");

  const handleAdhaarChange = (e) => {
    setAdhaarNo(e.target.value);
  };

  const handleValidateAadhaar = (customer_Id) => {
    if (!aadhaarNo || !/^\d+$/.test(aadhaarNo)) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a valid aadhaar no.",
      });
      return;
    }
    if (aadhaarNo) {
      dispatch({
        type: "KYCVALIDATE",
        payload: { user_id: id, aadhar_number: aadhaarNo },
      });
    }
  };

  const [ref_id, setRef_Id] = useState("");



  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess == 200) {
      setShowOtpValidation(true);
      setShowValidate(false);
      setRef_Id(state.UsersList && state.UsersList.Kyc_Ref_Id);
      setTimeout(() => {
        dispatch({ type: "CLEAR_KYC_VALIDATE_SATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.kycValidateSendOtpSuccess]);

  const [kycOtpValue, setKycOtpValue] = useState("");

  const handleKycOtpChange = (e) => {
    setKycOtpValue(e.target.value);
  };
  const [showbookingForm, setShowbookingForm] = useState(false);
  const toggleForm = () => {
    setShowbookingForm(!showbookingForm);
  };
  const closeModal = () => {
    setShowbookingForm(false);
  };
  //checkout form
  const [checkoutForm, setcheckoutForm] = useState(false);
  const checkOutForm = () => {
    setcheckoutForm(!checkoutForm);
  };
  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };
  // walkin from

  const [walkInForm, setWalkinForm] = useState(false);
  const walkinForm = () => {
    setWalkinForm(true);
  };
  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  useEffect(() => {
    if (state.UsersList.addWalkInCustomerStatusCode == 200) {
      setWalkinForm(false);
    }
  }, [state.UsersList.addWalkInCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode == 200) {
      setcheckoutForm(false);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false); // To control downloads

  useEffect(() => {
    if (state.UsersList?.exportDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportBookingDetails?.response?.fileUrl) {
      setExcelDownloadBooking(
        state.UsersList?.exportBookingDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportBookingDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportCheckoutDetails?.response?.fileUrl) {
      setExcelDownloadCheckout(
        state.UsersList?.exportCheckoutDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportCheckoutDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportWalkinDetails?.response?.fileUrl) {
      setExcelDownloadChecIn(
        state.UsersList?.exportWalkinDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportWalkinDetails?.response?.fileUrl]);

  const handleCustomerExcel = () => {
    if (value === "1") {
      dispatch({
        type: "EXPORTDETAILS",
        payload: {
          type: "customers",
          hostel_id: uniqueostel_Id,
        },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handleBookingExcel = () => {
    if (value === "2") {
      dispatch({
        type: "EXPORTBOOKINGDETAILS",
        payload: { type: "booking", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handlecheckoutExcel = () => {
    if (value === "3") {
      dispatch({
        type: "EXPORTCHECKOUTDETAILS",
        payload: { type: "checkout", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handlewalkinExcel = () => {
    if (value === "4") {
      dispatch({
        type: "EXPORTWALKINGDETAILS",
        payload: { type: "walkin", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };
  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownload, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadBooking && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadBooking;
      link.download = "smartstay_file.xlsx";
      link.click();

      // Reset states after download
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownloadBooking("");
      }, 500);
    }
  }, [excelDownloadBooking, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadChecout && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadChecout;
      link.download = "smartstay_file.xlsx";
      link.click();

      // Reset states after download
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownloadChecout, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadCheckIn && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadCheckIn;
      link.download = "smartstay_file.xlsx";
      link.click();

      // Reset states after download
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownloadCheckIn, isDownloadTriggered]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportDetails === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportDetails]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportWalkin === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_WALKIN_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportWalkin]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportBooking === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_BOOKING_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportBooking]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportCheckout === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_CHECKOUT_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportCheckout]);


  useEffect(()=> {
    dispatch({ type: "WALKINCUSTOMERLIST",payload:{hostel_id:uniqueostel_Id} });
  },[uniqueostel_Id])

  useEffect(() => {
    if (state.UsersList?.getWalkInStatusCode === 200) {
      // dispatch({ type: "WALKINCUSTOMERLIST",payload:{hostel_id:uniqueostel_Id} });
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.getWalkInStatusCode]);

  return (
    // <div style={{ padding: 10, marginLeft: 20 }}>
    <div>
      <Addbooking
        show={showbookingForm}
        handleClose={closeModal}
        setShowbookingForm={setShowbookingForm}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      <CheckOutForm
        show={checkoutForm}
        handleClose={checkoutcloseModal}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      <UserlistWalkinForm
        show={walkInForm}
        handleClose={walkinFormcloseModal}
        customerrolePermission={customerrolePermission}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      {userList && (
        <div style={{ margin: "12px" }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <label
                style={{
                  fontSize: 18,
                  color: "#000000",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  marginLeft: 20,
                  marginRight: 20

                }}
              >
                Customers
              </label>
            </div>

            <div className="d-flex flex-wrap flex-md-nowrap">
              {search ? (
                <>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      marginRight: 20,
                      marginTop: "-10px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "20px",
                        marginBottom: "10px",
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
                      <div className="input-group" style={{ marginRight: 20 }}>
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
                            borderRight: "none",
                          }}
                          value={filterInput}
                          onChange={(e) => handlefilterInput(e)}
                        />
                        <span className="input-group-text bg-white border-start-0">
                          <img
                            src={closecircle}
                            onClick={handleCloseSearch}
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
                          {filteredUsers?.map((user, index) => {
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
                                {/* <span>
                                  {value === "1"
                                    ? user.Name
                                    : value === "2"
                                    ? user.first_name
                                    : ""}
                                </span> */}
                                <span>
                                  {value === "1"
                                    ? user.Name
                                    : value === "2"
                                      ? `${user.first_name} ${user.last_name}`
                                      : value === "4"
                                        ? user.first_name
                                        : ""}
                                </span>

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
                  <div className=" " style={{ marginTop: "10px" }}>
                    <Image
                      src={searchteam}

                      style={{ height: "28px", width: "28px" }}
                      onClick={handleShowSearch}
                    />
                  </div>
                </>
              )}

              <div className="me-4 " style={{}}>
                <Image
                  src={Filters}

                  style={{ height: "50px", width: "50px" }}
                  onClick={handleShowSearch}
                />
              </div>
              <div style={{ paddingRight: "10px" }}>
                {value === "1" && (
                  <img
                    src={excelimg}
                    width={38}
                    height={38}
                    style={{ marginLeft: "-20px", marginTop: 5 }}
                    onClick={handleCustomerExcel}
                  />
                )}
                {value === "2" && (
                  <img
                    src={excelimg}
                    width={38}
                    height={38}
                    style={{ marginLeft: "-20px", marginTop: 5 }}
                    onClick={handleBookingExcel}
                  />
                )}
                {value === "3" && (
                  <img
                    src={excelimg}
                    width={38}
                    height={38}
                    style={{ marginLeft: "-20px", marginTop: 5 }}
                    onClick={handlecheckoutExcel}
                  />
                )}
                {value === "4" && (
                  <img
                    src={excelimg}
                    width={38}
                    height={38}
                    style={{ marginLeft: "-20px", marginTop: 5 }}
                    onClick={handlewalkinExcel}
                  />
                )}
              </div>

              <div className="buttons">
                {value === "1" && (
                  <Button
                    disabled={customerAddPermission}
                    onClick={handleShow}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 52,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 152,
                      padding: "16px, 24px, 16px, 24px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    +  Customer
                  </Button>
                )}
                {value === "2" && (
                  <Button
                    disabled={customerBookingAddPermission}
                    onClick={toggleForm}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 52,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 152,
                      padding: "16px, 24px, 16px, 24px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Bookings
                  </Button>
                )}
                {value === "3" && (
                  <Button
                    disabled={customerCheckoutPermission}
                    onClick={checkOutForm}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 52,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 152,
                      padding: "16px, 24px, 16px, 24px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Check-out
                  </Button>
                )}
                {value === "4" && (
                  <Button
                    disabled={customerWalkInAddPermission}
                    onClick={walkinForm}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 52,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 152,
                      padding: "12px, 16px, 12px, 16px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    +  Walk-in
                  </Button>
                )}
              </div>
            </div>
          </div>
          {filterInput && (
            <div
              className="container ms-4 mb-4"
              style={{ marginTop: "20px", fontWeight: 600, fontSize: 16 }}
            >
              {filteredUsers.length > 0 ? (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  {filteredUsers.length} result
                  {filteredUsers.length > 1 ? "s" : ""} found for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    "{filterInput}"
                  </span>
                </span>
              ) : (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  No results found for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    "{filterInput}"
                  </span>
                </span>
              )}
            </div>
          )}
          <div
            className="pl-4"
            style={{
              paddingLeft: "7px",
              fontFamily: "Gilroy",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "left",
              marginTop: "-20px",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <TabList
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  // value={value}
                  onChange={handleChange}
                  // indicatorColor="primary"
                  // textColor=""
                  aria-label="lab API tabs example"
                  className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                >
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "1" ? "#222222" : "#4B4B4B",
                    }}
                    label="All Customers"
                    value="1"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "2" ? "#222222" : "#4B4B4B",
                    }}
                    label="Bookings"
                    value="2"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "3" ? "#222222" : "#4B4B4B",
                    }}
                    label="Check-out"
                    value="3"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "4" ? "#222222" : "#4B4B4B",
                    }}
                    label="Walk-in"
                    value="4"
                  />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ paddingLeft: 0 }}>
                {customerpermissionError ? (
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
                      {/* Image */}
                      <img
                        src={Emptystate}
                        alt="Empty State"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />

                      {/* Permission Error */}
                      {customerpermissionError && (
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
                          <span>{customerpermissionError}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{  marginLeft: "6px" }}>
                    <div>
                      {currentItems?.length == 0 && (
                        <div>
                          <div style={{ textAlign: "center" }}>
                            {" "}
                            <img src={Emptystate} alt="emptystate" />
                          </div>
                          <div
                            className="pb-1"
                            style={{
                              textAlign: "center",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              fontSize: 20,
                              color: "rgba(75, 75, 75, 1)",
                            }}
                          >
                            No Active Customer{" "}
                          </div>
                          <div
                            className="pb-1"
                            style={{
                              textAlign: "center",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              fontSize: 16,
                              color: "rgba(75, 75, 75, 1)",
                            }}
                          >
                            There are no active Customer{" "}
                          </div>

                        </div>
                      )}

                      {currentItems && currentItems.length > 0 && (
                        <div
                          style={{
                            // height: "400px",
                            position: "relative",
                            height: currentItems.length >= 6 ? "400px" : "auto",
                            overflowY: currentItems.length >= 6 ? "auto" : "visible",
                            borderRadius: "24px",
                            border: "1px solid #DCDCDC",
                            // borderBottom:"none"
                          }}
                        >

                          <Table
                            responsive="md"
                            className="Table_Design"
                            style={{ border: "1px solid #DCDCDC", borderBottom: "1px solid transparent", borderEndStartRadius: 0, borderEndEndRadius: 0 }}
                          >
                            <thead
                              style={{
                                backgroundColor: "#E7F1FF",
                                position: "sticky",
                                top: 0,
                                zIndex: 1,

                              }}
                            >
                              <tr>
                                {/* <th
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Gilroy",
                                    color: "rgba(34, 34, 34, 1)",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    borderTopLeftRadius: 24,
                                  }}
                                >
                                  <img src={squre} height={20} width={20} />
                                </th> */}
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    borderTopLeftRadius: 24,
                                    paddingLeft: "20px"
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Paying Guest
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Email ID
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Mobile no
                                </th>

                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Room
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Bed
                                </th>
                                <th
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Gilroy",
                                    color: "rgba(34, 34, 34, 1)",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    borderTopRightRadius: 24,
                                  }}
                                >
                                  {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
        </div> */}
                                </th>
                              </tr>
                            </thead>
                            <tbody style={{ textAlign: "center" }}>
                              {loading
                                ? Array.from({
                                  length: currentItems?.length || 5,
                                }).map((_, index) => (
                                  <tr key={index}>
                                    <td
                                      style={{
                                        borderBottom:
                                          index === 0
                                            ? "none"
                                            : "1px solid #DCDCDC",
                                      }}
                                    >
                                      <Skeleton
                                        circle={true}
                                        height={40}
                                        width={40}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={80} />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={120} />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={120} />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={120} />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={50} />
                                    </td>
                                    <td
                                      style={{
                                        padding: "10px",
                                        border: "none",
                                      }}
                                    >
                                      <Skeleton width={50} />
                                    </td>
                                  </tr>
                                ))
                                : currentItems.map((user) => {
                                  const imageUrl = user.profile || Profile;
                                  return (
                                    <tr
                                      key={user.ID}
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        marginTop: 10,

                                      }}
                                    >
                                      {/* <td
                                          style={{
                                            padding: "10px",
                                            border: "none",
                                          }}
                                        >
                                          <img
                                            src={squre}
                                            height={20}
                                            width={20}
                                            style={{ marginTop: 10 }}
                                          />
                                        </td> */}
                                      <td
                                        style={{
                                          border: "none",
                                          padding: "10px",
                                          textAlign: "start",
                                          paddingLeft: "20px"
                                        }}
                                      >
                                        {/* <Image
                                            src={imageUrl}
                                            alt={user.Name || "Default Profile"}
                                            roundedCircle
                                            style={{
                                              height: "40px",
                                              width: "40px",
                                              marginRight: "10px",
                                            }}
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src = Profile;
                                            }}
                                          /> */}
                                        <span
                                          className="Customer_Name_Hover"
                                          style={{
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            color: "#1E45E1",
                                            cursor: "pointer",
                                            marginTop: 10,

                                          }}
                                          onClick={() =>
                                            handleRoomDetailsPage(user)
                                          }
                                        >
                                          {user.Name}
                                        </span>
                                      </td>

                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,

                                        }}
                                      >
                                        <span
                                          style={{
                                            paddingTop: "3px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingBottom: "3px",
                                            borderRadius: "60px",
                                            backgroundColor: "#FFEFCF",
                                            textAlign: "start",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                          }}
                                        >
                                          {user.HostelName}
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          paddingTop: 15,
                                        }}
                                      >
                                        {user.Email}
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        +
                                        {user &&
                                          String(user.Phone)?.slice(
                                            0,
                                            String(user.Phone).length - 10
                                          )}{" "}
                                        {user &&
                                          String(user.Phone)?.slice(-10)}
                                      </td>

                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "16px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        {" "}
                                        {!user.Rooms ? "-" : user.Rooms}
                                      </td>

                                      <td
                                        // className={user.Bed === 0 ? 'assign-bed' : ''}
                                        // onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          cursor: "pointer",
                                          textAlign: "start",
                                          fontSize: "16px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                        }}
                                      >
                                        {!user.Bed ? "-" : user.Bed}
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 12,
                                          border: "none",
                                        }}
                                      >
                                        {/* <MoreCircle  variant="Outline"  size="40" color="#dcdcdc" style={{transform:"rotate(90deg)"}}/>  */}

                                        <div
                                          style={{
                                            cursor: "pointer",
                                            height: 40,
                                            width: 40,
                                            borderRadius: 100,
                                            border: "1px solid #EFEFEF",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "relative",
                                            zIndex: 1000,
                                          }}
                                          onClick={() =>
                                            handleShowDots(user.ID)
                                          }
                                        >
                                          <PiDotsThreeOutlineVerticalFill
                                            style={{ height: 20, width: 20 }}
                                          />
                                          {activeRow === user.ID && (
                                            <>
                                              <div
                                                ref={popupRef}
                                                style={{
                                                  position: "absolute", 
                                                  right: 50,
                                                    top: 15, 
                                                  width: "163px",
                                                  backgroundColor: "#fff",
                                                  border: "1px solid #EBEBEB",
                                                  borderRadius: "10px",
                                                  zIndex: 1000, 
                                                  padding: "10px",
                                                  display: "flex",
                                                  justifyContent: "start",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    backgroundColor: "#fff",
                                                  }}
                                                  className=""
                                                >
                                                  {!user.Bed && (
                                                    <div
                                                      className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                      onClick={() => {
                                                        if (
                                                          !customerAddPermission
                                                        ) {
                                                          handleShowAddBed(
                                                            user
                                                          );
                                                        }
                                                      }}
                                                      style={{
                                                        backgroundColor:
                                                          "#fff",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                        opacity:
                                                          customerAddPermission
                                                            ? 0.6
                                                            : 1,
                                                      }}
                                                    >
                                                      <img
                                                        src={addcircle}
                                                        style={{
                                                          height: 16,
                                                          width: 16,
                                                          filter:
                                                            customerAddPermission
                                                              ? "grayscale(100%)"
                                                              : "none",
                                                        }}
                                                      />
                                                      <label
                                                        style={{
                                                          fontSize: 14,
                                                          fontWeight: 500,
                                                          fontFamily:
                                                            "Gilroy, sans-serif",
                                                          color:
                                                            customerAddPermission
                                                              ? "#888888"
                                                              : "#222222",
                                                          cursor:
                                                            customerAddPermission
                                                              ? "not-allowed"
                                                              : "pointer",
                                                        }}
                                                      >
                                                        Assign Bed
                                                      </label>
                                                    </div>
                                                  )}

                                                  {user.Bed && (
                                                    <div
                                                      className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                      // onClick={() => {
                                                      //   if (!customerAddPermission) {
                                                      //     handleShowAddBed(user);
                                                      //   }
                                                      // }}
                                                      onClick={() =>
                                                        handleCustomerCheckout(
                                                          user
                                                        )
                                                      }
                                                      style={{
                                                        backgroundColor:
                                                          "#fff",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                        opacity:
                                                          customerAddPermission
                                                            ? 0.6
                                                            : 1,
                                                      }}
                                                    >
                                                      <img
                                                        src={addcircle}
                                                        style={{
                                                          height: 16,
                                                          width: 16,
                                                          filter:
                                                            customerAddPermission
                                                              ? "grayscale(100%)"
                                                              : "none",
                                                        }}
                                                      />
                                                      <label
                                                        style={{
                                                          fontSize: 14,
                                                          fontWeight: 500,
                                                          fontFamily:
                                                            "Gilroy, sans-serif",
                                                          color:
                                                            customerAddPermission
                                                              ? "#888888"
                                                              : "#222222",
                                                          cursor:
                                                            customerAddPermission
                                                              ? "not-allowed"
                                                              : "pointer",
                                                        }}
                                                      >
                                                        Checkout
                                                      </label>
                                                    </div>
                                                  )}
                                                  {user.Bed && (
                                                    <div
                                                      className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                      // onClick={() => {
                                                      //   if (!customerAddPermission) {
                                                      //     handleShowAddBed(user);
                                                      //   }
                                                      // }}
                                                      onClick={() =>
                                                        handleCustomerReAssign(
                                                          user
                                                        )
                                                      }
                                                      style={{
                                                        backgroundColor:
                                                          "#fff",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                        opacity:
                                                          customerAddPermission
                                                            ? 0.6
                                                            : 1,
                                                      }}
                                                    >
                                                      <img
                                                        src={addcircle}
                                                        style={{
                                                          height: 16,
                                                          width: 16,
                                                          filter:
                                                            customerAddPermission
                                                              ? "grayscale(100%)"
                                                              : "none",
                                                        }}
                                                      />
                                                      <label
                                                        style={{
                                                          fontSize: 14,
                                                          fontWeight: 500,
                                                          fontFamily:
                                                            "Gilroy, sans-serif",
                                                          color:
                                                            customerAddPermission
                                                              ? "#888888"
                                                              : "#222222",
                                                          cursor:
                                                            customerAddPermission
                                                              ? "not-allowed"
                                                              : "pointer",
                                                        }}
                                                      >
                                                        Re Assign
                                                      </label>
                                                    </div>
                                                  )}

                                                  <div
                                                    className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                    style={{
                                                      backgroundColor: "#fff",
                                                      cursor:
                                                        customerEditPermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      opacity:
                                                        customerEditPermission
                                                          ? 0.6
                                                          : 1,
                                                    }}
                                                    onClick={() => {
                                                      if (
                                                        !customerEditPermission
                                                      ) {
                                                        handleRoomDetailsPage(
                                                          user
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    <img
                                                      src={Edit}
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter:
                                                          customerEditPermission
                                                            ? "grayscale(100%)"
                                                            : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily:
                                                          "Gilroy, sans-serif",
                                                        color:
                                                          customerEditPermission
                                                            ? "#888888"
                                                            : "#222222",
                                                        cursor:
                                                          customerEditPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                      }}
                                                    >
                                                      Edit
                                                    </label>
                                                  </div>

                                                  {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                onClick={() => { handleShowform(props) }}
                                style={{ backgroundColor: "#fff" }}
                            >
                                <img src={Assign} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Record Payment</label>

                            </div> */}

                                                  <div
                                                    className={
                                                      "mb-2 d-flex justify-content-start align-items-center gap-2"
                                                    }
                                                    style={{
                                                      backgroundColor: "#fff",
                                                      cursor:
                                                        customerDeletePermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      opacity:
                                                        customerDeletePermission
                                                          ? 0.6
                                                          : 1,
                                                    }}
                                                    onClick={
                                                      !customerDeletePermission
                                                        ? handleDeleteShow
                                                        : null
                                                    }
                                                  >
                                                    <img
                                                      src={Delete}
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                      }}
                                                      alt="Delete Icon"
                                                    />{" "}
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily:
                                                          "Gilroy, sans-serif",
                                                        color:
                                                          customerDeletePermission
                                                            ? "#888888"
                                                            : "#FF0000", // Greyed-out text if disabled
                                                      }}
                                                    >
                                                      Delete
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>

                                        {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>

                        </div>
                      )}
                    </div>
                    {currentItems?.length > 0 && (
                      // <nav>
                      //   <ul
                      //     style={{
                      //       display: "flex",
                      //       alignItems: "center",
                      //       listStyleType: "none",
                      //       padding: 0,
                      //       justifyContent: "end",
                      //     }}
                      //   >
                      //     <li style={{ margin: "0 5px" }}>
                      //       <button
                      //         style={{
                      //           padding: "5px 10px",
                      //           textDecoration: "none",
                      //           color: currentPage === 1 ? "#ccc" : "#007bff",
                      //           cursor:
                      //             currentPage === 1 ? "not-allowed" : "pointer",
                      //           borderRadius: "5px",
                      //           display: "inline-block",
                      //           minWidth: "30px",
                      //           textAlign: "center",
                      //           backgroundColor: "transparent",
                      //           border: "none",
                      //         }}
                      //         onClick={() => handlePageChange(currentPage - 1)}
                      //         disabled={currentPage === 1}
                      //       >
                      //         <ArrowLeft2 size="16" color="#1E45E1" />
                      //       </button>
                      //     </li>
                      //     {currentPage > 3 && (
                      //       <li style={{ margin: "0 5px" }}>
                      //         <button
                      //           style={{
                      //             padding: "5px 10px",
                      //             textDecoration: "none",
                      //             color: "white",
                      //             cursor: "pointer",
                      //             borderRadius: "5px",
                      //             display: "inline-block",
                      //             minWidth: "30px",
                      //             textAlign: "center",
                      //             backgroundColor: "transparent",
                      //             border: "none",
                      //           }}
                      //           onClick={() => handlePageChange(1)}
                      //         >
                      //           1
                      //         </button>
                      //       </li>
                      //     )}
                      //     {currentPage > 3 && <span>...</span>}
                      //     {renderPageNumbers()}
                      //     {currentPage < totalPages - 2 && <span>...</span>}
                      //     {currentPage < totalPages - 2 && (
                      //       <li style={{ margin: "0 5px" }}>
                      //         <button
                      //           style={{
                      //             padding: "5px 10px",
                      //             textDecoration: "none",
                      //             cursor: "pointer",
                      //             borderRadius: "5px",
                      //             display: "inline-block",
                      //             minWidth: "30px",
                      //             textAlign: "center",
                      //             backgroundColor: "transparent",
                      //             border: "none",
                      //           }}
                      //           onClick={() => handlePageChange(totalPages)}
                      //         >
                      //           {totalPages}
                      //         </button>
                      //       </li>
                      //     )}
                      //     <li style={{ margin: "0 5px" }}>
                      //       <button
                      //         style={{
                      //           padding: "5px 10px",
                      //           textDecoration: "none",
                      //           color:
                      //             currentPage === totalPages
                      //               ? "#ccc"
                      //               : "#007bff",
                      //           cursor:
                      //             currentPage === totalPages
                      //               ? "not-allowed"
                      //               : "pointer",
                      //           borderRadius: "5px",
                      //           display: "inline-block",
                      //           minWidth: "30px",
                      //           textAlign: "center",
                      //           backgroundColor: "transparent",
                      //           border: "none",
                      //         }}
                      //         onClick={() => handlePageChange(currentPage + 1)}
                      //         disabled={currentPage === totalPages}
                      //       >
                      //         <ArrowRight2 size="16" color="#1E45E1" />
                      //       </button>
                      //     </li>
                      //   </ul>
                      // </nav>

                      //   <nav
                      //   style={{
                      //     display: "flex",
                      //     alignItems: "center",
                      //     justifyContent: "end", 
                      //     padding: "10px",
                      //   }}
                      // >
                      //   <div>
                      //     <select
                      //       value={itemsPerPage}
                      //       onChange={handleItemsPerPageChange}
                      //       style={{
                      //         padding: "5px",
                      //         border: "1px solid #1E45E1",
                      //         borderRadius: "5px",
                      //         color: "#1E45E1",
                      //         fontWeight: "bold",
                      //         cursor: "pointer",
                      //         outline: "none",
                      //         boxShadow: "none",

                      //       }}
                      //     >
                      //        <option value={5}>5</option>
                      //       <option value={10}>10</option>
                      //       <option value={50}>50</option>
                      //       <option value={100}>100</option>
                      //     </select>
                      //   </div>
                      //   <ul
                      //     style={{
                      //       display: "flex",
                      //       alignItems: "center",
                      //       listStyleType: "none",
                      //       margin: 0,
                      //       padding: 0,
                      //     }}
                      //   >
                      //     {/* Previous Button */}
                      //     <li style={{ margin: "0 10px" }}>
                      //       <button
                      //         style={{
                      //           padding: "5px",
                      //           textDecoration: "none",
                      //           color: currentPage === 1 ? "#ccc" : "#1E45E1",
                      //           cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      //           borderRadius: "50%",
                      //           display: "inline-block",
                      //           minWidth: "30px",
                      //           textAlign: "center",
                      //           backgroundColor: "transparent",
                      //           border: "none",
                      //         }}
                      //         onClick={() => handlePageChange(currentPage - 1)}
                      //         disabled={currentPage === 1}
                      //       >
                      //         <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                      //       </button>
                      //     </li>

                      //     {/* Current Page Indicator */}
                      //     <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                      //       {currentPage} of {totalPages}
                      //     </li>

                      //     {/* Next Button */}
                      //     <li style={{ margin: "0 10px" }}>
                      //       <button
                      //         style={{
                      //           padding: "5px",
                      //           textDecoration: "none",
                      //           color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                      //           cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      //           borderRadius: "50%",
                      //           display: "inline-block",
                      //           minWidth: "30px",
                      //           textAlign: "center",
                      //           backgroundColor: "transparent",
                      //           border: "none",
                      //         }}
                      //         onClick={() => handlePageChange(currentPage + 1)}
                      //         disabled={currentPage === totalPages}
                      //       >
                      //         <ArrowRight2
                      //           size="16"
                      //           color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                      //         />
                      //       </button>
                      //     </li>
                      //   </ul>
                      // </nav>

                      <nav
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                          padding: "10px",
                          position: "fixed",
                          bottom: "10px",
                          right: "10px",
                          backgroundColor: "#fff", // Optional: to give a background for better visibility
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: to add some shadow
                          borderRadius: "5px", // Optional: to make edges rounded
                        }}
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
                )}

                {customerReassign == true ? (
                  <CustomerReAssign
                    customerReassign={customerReassign}
                    setCustomerReAssign={setCustomerReAssign}
                    reAssignDetail={reAssignDetail}
                  />
                ) : null}

                {customerCheckoutpage == true ? (
                  <CustomerCheckout
                    customerCheckoutpage={customerCheckoutpage}
                    setCustomerCheckoutpage={setCustomerCheckoutpage}
                    uniqueostel_Id={uniqueostel_Id}
                    data={customercheckoutdata}
                  />
                ) : null}
              </TabPanel>
              <TabPanel value="2">
                <UserlistBookings
                  id={props.id}
                  setFilteredUsers={setFilteredUsers}
                  filteredUsers={filteredUsers}
                  currentItems={currentItems}
                  showbookingForm={showbookingForm}
                  toggleForm={toggleForm}
                  customerBookingAddPermission={customerBookingAddPermission}
                  customerrolePermission={customerrolePermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                />
              </TabPanel>
              <TabPanel value="3">
                <UserlistCheckout
                  id={props.id}
                  customerrolePermission={customerrolePermission}
                  customerCheckoutPermission={customerCheckoutPermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                />
              </TabPanel>
              <TabPanel value="4">
                <UserlistWalkin
                  id={props.id}
                  customerrolePermission={customerrolePermission}
                  customerWalkInAddPermission={customerWalkInAddPermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                  filteredUsers={filteredUsers}
                />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      )}

      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        centered
        backdrop="static"
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete Check-out?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete this check-out?
        </Modal.Body>

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleCloseDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {roomDetail == true ? (
        <UserListRoomDetail
          AfterEditHostels={AfterEditHostel}
          AfterEditFloors={AfterEditFloor}
          AfterEditRoomses={AfterEditRooms}
          AfterEditBeds={AfterEditBed}
          showMenu={showMenu}
          displayDetail={addBasicDetail}
          setShowMenu={setShowMenu}
          handleShow={handleShow}
          edit={edit}
          setEdit={setEdit}
          EditObj={EditObj}
          setEditObj={setEditObj}
          handleMenuClick={handleMenuClick}
          setShowForm={setShowForm}
          showForm={showForm}
          setUserClicked={setUserClicked}
          handleEdit={handleEdit}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          userDetails={userDetails}
          handleBack={handleBack}
          getFormattedRoomId={getFormattedRoomId}
          getFloorName={getFloorName}
          id={id}
          aadhaarNo={aadhaarNo}
          handleValidateAadhaar={handleValidateAadhaar}
          showOtpValidation={showOtpValidation}
          kycOtpValue={kycOtpValue}
          handleKycOtpChange={handleKycOtpChange}
          showValidate={showValidate}
          selectAmneties={selectAmneties}
          handleselect={handleselect}
          hostelName={hostelName}
          createby={createby}
          statusShow={statusShow}
          customerUser_Id={customerUser_Id}
          hostelIds={hostelIds}
          statusAmni={statusAmni}
          handleStatusAmnities={handleStatusAmnities}
          handleAddUserAmnities={handleAddUserAmnities}
          handleAdhaarChange={handleAdhaarChange}
          customerEditPermission={customerEditPermission}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}
        />
      ) : null}

      {showMenu == true ? (
        <UserlistForm
          AfterEditHostels={AfterEditHostel}
          AfterEditFloors={AfterEditFloor}
          AfterEditRoomses={AfterEditRooms}
          AfterEditBeds={AfterEditBed}
          showMenu={showMenu}
          displayDetail={addBasicDetail}
          setShowMenu={setShowMenu}
          handleShow={handleShow}
          edit={edit}
          setEdit={setEdit}
          EditObj={EditObj}
          setEditObj={setEditObj}
          handleMenuClick={handleMenuClick}
          setShowForm={setShowForm}
          showForm={showForm}
          setUserClicked={setUserClicked}
          handleEdit={handleEdit}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}
        />
      ) : null}
    </div>
  );
}

export default UserList;
