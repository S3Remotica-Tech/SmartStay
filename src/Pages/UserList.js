import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Dropdown, Table } from "react-bootstrap";
import { Button, Offcanvas, Form ,FormControl} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Plus from "../Assets/Images/Create-button.png";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BsSearch } from "react-icons/bs";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import Image from "react-bootstrap/Image";
import UserlistForm from "./UserlistForm";
import UserListRoomDetail from "./UserListRoomDetail";
import CryptoJS from "crypto-js";
import Filters from "../Assets/Images/Filters.svg";
import squre from "../Assets/Images/New_images/minus-square.png";
import Modal from "react-bootstrap/Modal";
import Emptystate from '../Assets/Images/Empty-State.jpg'

import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
  MoreCircle,
} from "iconsax-react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Search from "../Assets/Images/search-normal.png";
import Close from "../Assets/Images/close.svg";
import UserlistBookings from "./UserlistBookings";
import UserlistCheckout from "./UserlistCheckout";
import UserlistWalkin from "./UserlistWalkin";
import Addbooking from "./Addbookingform";
import CheckOutForm from "./UserListCheckoutForm";
import UserlistWalkinForm from "./UserlistWalkinForm";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import addcircle from "../Assets/Images/New_images/add-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";

function UserList(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const selectRef = useRef("select");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "USERLIST" });
  }, []);

  const [showLoader, setShowLoader] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = React.useState("1");

  useEffect(() => {
    // Only filter when value is "1"
    if (value === "1") {
      const FilterUser = state.UsersList.Users.filter((item) => {
        return item.Name.toLowerCase().includes(filterInput.toLowerCase());
      });

      setFilteredUsers(FilterUser);
      console.log("FilterUser", FilterUser);
    }
    if (value === "2") {
      const FilterUsertwo = state.UsersList.hostelList.filter((item) => {
        return item.Name.toLowerCase().includes(filterInput.toLowerCase());
      });
      setFilteredUsers(FilterUsertwo);
      console.log("FilterUsertwo", FilterUsertwo);
    }
    if (value === "4") {
      const FilterUsertwo = state.UsersList.hostelList.filter((item) => {
        return item.Name.toLowerCase().includes(filterInput.toLowerCase());
      });
      setFilteredUsers(FilterUsertwo);
      console.log("FilterUsertwo", FilterUsertwo);
    }
  }, [filterInput, state.UsersList.Users, value]);

  // useEffect(() => {

  //   const FilterUser = state.UsersList.Users.filter((item) => {
  //     return item.Name.toLowerCase().includes(filterInput.toLowerCase());
  //   });

  //   setFilteredUsers(FilterUser);
  //   console.log("FilterUser",FilterUser)
  // }, [filterInput, state.UsersList.Users]);

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    console.log("e,,,,", e.target.value);
    setDropdownVisible(e.target.value.length > 0);
  };

  const handleUserSelect = (user) => {
    setFilterInput(user.Name);
    setFilteredUsers([]);
    setDropdownVisible(false);
    console.log("User selected:", user);
  };

  const handleCloseSearch = () => {
    setSearch(false);
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

  useEffect(() => {
    const toTriggerPDF = state.InvoiceList?.toTriggerPDF;
    if (toTriggerPDF) {
      setTimeout(() => {
        let pdfWindow;
        const InvoicePDf =
          state.InvoiceList?.Invoice &&
          state.InvoiceList.Invoice.filter(
            (view) =>
              view.User_Id == selectedItems.User_Id &&
              view.id == selectedItems.id
          );
        if (InvoicePDf[0]?.invoicePDF) {
          pdfWindow = window.open(InvoicePDf[0]?.invoicePDF, "_blank");
          if (pdfWindow) {
            setShowLoader(false);
          }
        } else {
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
    if (activeRow === id) {
      setActiveRow(null); // Close if the same row is clicked again
    } else {
      setActiveRow(id); // Open dropdown for the clicked row
    }
    setSearch(false);
  };
  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDataPagination.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} style={{ margin: "0 5px" }}>
          <button
            style={{
              padding: "5px 10px",
              color: i === currentPage ? "#007bff" : "#000",
              cursor: "pointer",
              border: i === currentPage ? "1px solid #ddd" : "none",
              backgroundColor:
                i === currentPage ? "transparent" : "transparent",
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
    setAddBasicDetail(true);
    setEditObj(u);
    setemail_id(u.Email);
    console.log("u.Email...r?", u.Email);
  };

  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearch(false)
  };

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleCloseClick = () => {
    setSearchValue("");
    setShowInput(false);
  };

  console.log("state", state);

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode == 200) {
      console.log("invoice added executed");

      setOriginalData(state.UsersList.Users);

      const uniqueUsersList = state.UsersList.Users.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.Email === user.Email)
      );

      console.log("Filtered Unique Data:", uniqueUsersList);

      setfilteredDataPagination(state.UsersList.Users);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList?.UserListStatusCode]);

  const generatepagenumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (searchItem != "") {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredData(filteredItems);
    } else {
      setFilteredData(state.UsersList.Users);
    }
  };

  const handleiconshow = () => {
    setSearchicon(!searchicon);
    setFiltericon(false);
  };
  const handleFiltershow = () => {
    setFiltericon(!filtericon);
    setSearchicon(false);
  };
  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm);
    if (searchTerm == "ALL") {
      setFilteredData(state.UsersList.Users);
    } else {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };

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
    console.log("userData", userData);
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

    console.log("u for assign bed", u);
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(false);
    setEditObj(u);
    console.log("uu", u);
    setemail_id(u.Email);
    console.log("u.Email", u.Email);
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
  console.log("userDetails", userDetails);

  console.log("bedIds", bedIds, hostelIds, floorIds, roomsIds);
  useEffect(() => {
    const ParticularUserDetails = state.UsersList?.Users?.filter((item) => {
      console.log("item", item);

      return item.User_Id == customerUser_Id;
    });
    console.log("ParticularUserDetails", ParticularUserDetails);

    setUserDetails(ParticularUserDetails);

    let User_Id = null;
    if (ParticularUserDetails.length > 0) {
      User_Id = ParticularUserDetails[0]?.User_Id;
      const filteredData =
        state.InvoiceList?.Invoice &&
        state.InvoiceList?.Invoice?.filter((user) => user.User_Id == User_Id);

      setFilteredDataForUser(filteredData);
    }
  }, [
    roomDetail,
    state.UsersList?.Users,
    hostelIds,
    bedIds,
    floorIds,
    roomsIds,
    email_id,
  ]);

  const customCheckboxStyle = {
    appearance: "none",
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    border: "2px solid #DCDCDC",
    borderRadius: "4px",
    display: "inline-block",
    position: "relative",
  };

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({ type: "USERLIST" });

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
  useEffect(() => {
    dispatch({ type: "COUNTRYLIST" });
  }, []);

  const [search, setSearch] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(true);

  const Amenitiesname = state.UsersList?.customerdetails?.data?.amentites;
  console.log("amenties", Amenitiesname);

  const billPaymentHistory = state.UsersList.billPaymentHistory;
  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  const [filterByInvoice, setFilterByInvoice] = useState("");

  useEffect(() => {
    if (state.InvoiceList?.Invoice && filteredDataForUser.length > 0) {
      let filteredData = [...filteredDataForUser];

      if (filterByStatus !== "ALL") {
        filteredData = filteredData.filter(
          (item) => item.Status === filterByStatus
        );
      }

      if (filterByInvoice) {
        filteredData = filteredData.filter((item) =>
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
  const handleSearch = () => {
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
    console.log("userIduserId", id);
  }, [id]);
  useEffect(() => {
    if (id) {
      console.log("user_id", id);
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
      // setAmnnityhistory(state.UsersList?.amnetieshistory)
    }
    console.log("userIduserId....?", id);
  }, [id]);

  const [selectAmneties, setselectAmneties] = useState("");
  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  console.log("selectedAmenityName", selectedAmenityName);
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [createby, setcreateby] = useState("");
  const [amnityEdit, setamnityEdit] = useState("");
  const [deleteShow,setDeleteShow] =useState(false)
  console.log("createby", createby);

  const handleselect = (e) => {
    const value = e.target.value;
    setselectAmneties(value);
    setamnitytableshow(true);
    console.log("e.target.value", value);

    const amenitiesHistory = state.UsersList.amnetieshistory.filter((item) => {
      return item.amenity_Id == value;
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
const handleCloseDelete=() =>{
setDeleteShow(false)
}

const handleDeleteShow = ()=>{
setDeleteShow(true)
}

  useEffect(() => {
    if (
      state.UsersList.customerdetails.all_amenities &&
      state.UsersList.customerdetails.all_amenities.length > 0 &&
      selectAmneties
    ) {
      console.log(
        "state.UsersList.customerdetails.all_amenities",
        state.UsersList.customerdetails.all_amenities
      );
      const AmnitiesNamelist =
        state.UsersList.customerdetails.all_amenities.filter((item) => {
          return item.Amnities_Id == selectAmneties;
        });
      console.log("AmnitiesNamelist", AmnitiesNamelist);
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
    console.log("eee.ttt.v", e.target.value);
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
  console.log(
    "state.UsersList?.customerdetails?.all_amenities?",
    state.UsersList?.customerdetails?.all_amenities
  );

  console.log(
    "state.UsersList?.statusCustomerAddUser",
    state.UsersList.statusCustomerAddUser
  );
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

  console.log("state For Add userAminity", state);
  const handleEdit = (v) => {
    console.log("vvv", v);

    setamnityEdit(v);
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };
  const OnShowTableForCustomer = (isVisible) => {
    setUserList(isVisible);
    setRoomDetail(false);
  };

  const amentiesrowsPerPage = 10;
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(
    indexOfFirstRowamnities,
    indexOfLastRowamneties
  );
  console.log("currentRowAmnities", currentRowAmnities);

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
        payload: { user_id: customer_Id, aadhar_number: aadhaarNo },
      });
    }
  };

  const [ref_id, setRef_Id] = useState("");

  const handleVerifyOtp = (customer_Id) => {
    if (!kycOtpValue || !/^\d+$/.test(kycOtpValue)) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a valid otp",
      });
      return;
    }
    if (kycOtpValue) {
      dispatch({
        type: "KYCVALIDATEOTPVERIFY",
        payload: {
          user_id: customer_Id,
          aadhar_number: aadhaarNo,
          ref_id: ref_id,
          otp: kycOtpValue,
        },
      });

      setKycOtpValue("");
      setAdhaarNo("");
      setShowOtpValidation(false);
    }
  };

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
  // Add form
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
    setWalkinForm(!checkoutForm);
  };
  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  return (
    <div className="usercustomer p-2">
      <Addbooking show={showbookingForm} handleClose={closeModal} />

      <CheckOutForm show={checkoutForm} handleClose={checkoutcloseModal} />

      <UserlistWalkinForm
        show={walkInForm}
        handleClose={walkinFormcloseModal}
      />

      {userList && (
        <div style={{margin:"px"}}>
          <div className="customer">
            <div className="cuslable">
              <label
                style={{
                  fontSize: 24,
                  color: "#000000",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Customers
              </label>
            </div>

            <div className="customerfilling d-flex justify-content-between align-items-center ">
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
                        style={{ marginRight: 20, height: 50, width: 280 }}
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
                          }}
                          value={filterInput}
                          onChange={(e) => handlefilterInput(e)}
                        />
                      </div>
                    </div>

                    {isDropdownVisible && filteredUsers.length > 0 && (
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
                              filteredUsers.length > 1 ? "174px" : "auto",
                            minHeight: 100,
                            overflowY:
                              filteredUsers.length > 1 ? "auto" : "hidden",

                            margin: "0",
                            listStyleType: "none",
                            borderRadius: 8,
                            boxSizing: "border-box",
                          }}
                        >
                          {filteredUsers.map((user, index) => {
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
                  onClick={handleSearch}
                />
              </div>

              <div className="buttons">
                {value === "1" && (
                  <Button
                    onClick={handleShow}
                    style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 56,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 171,
                      padding: "18px, 20px, 18px, 20px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Add Customer
                  </Button>
                )}
                {value === "2" && (
                  <Button
                    onClick={toggleForm}
                    style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 56,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 171,
                      padding: "18px, 20px, 18px, 20px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Add Bookings
                  </Button>
                )}
                {value === "3" && (
                  <Button
                    onClick={checkOutForm}
                    style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 56,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 171,
                      padding: "18px, 20px, 18px, 20px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Add Check-out
                  </Button>
                )}
                {value === "4" && (
                  <Button
                    onClick={walkinForm}
                    style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      height: 56,
                      fontWeight: 600,
                      borderRadius: 12,
                      width: 171,
                      padding: "18px, 20px, 18px, 20px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    + Add Walkin
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div
            className="pl-4"
            style={{
              paddingLeft: "10px",
              fontFamily: "Gilroy",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            <TabContext value={value}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor=""
              >
                <Tab
                  className="tab-label"
                  style={{ textTransform: "capitalize" }}
                  label="All Customers"
                  value="1"
                />
                <Tab
                  className="tab-label"
                  style={{ textTransform: "capitalize" }}
                  label="Bookings"
                  value="2"
                />
                <Tab
                  className="tab-label"
                  style={{ textTransform: "capitalize" }}
                  label="Check-out"
                  value="3"
                />
                <Tab
                  className="tab-label"
                  style={{ textTransform: "capitalize" }}
                  label="Walk-in"
                  value="4"
                />
              </Tabs>

              <TabPanel value="1" style={{paddingLeft:10,paddingRight:20}}>

              <div>
<div >


    {currentItems.length == 0 && 

<div>
<div style={{ textAlign: "center"}}> <img src={Emptystate} alt="emptystate" /></div>
<div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No Active Customer </div>
  <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no active Customer </div>
  <div style={{ textAlign: "center"}}>         
        <Button
               onClick={handleShow}
               style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Add Customer</Button>
           </div>
</div>

    
    }

            {currentItems && currentItems.length > 0 && (
              <Table
                responsive="md"
                className="Table_Design"
                style={{
                  height: "auto",
                  overflow: "visible",
                  tableLayout: "auto",
                  borderRadius: "24px",
                  border: "1px solid #DCDCDC",
                  

                }}
              >
                <thead
                  style={{
                    backgroundColor: "#E7F1FF",
                  }}
                >
                  <tr>
                    <th
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
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
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
                        fontWeight: 600,
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
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 600,
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
                        fontWeight: 600,
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
                        fontWeight: 600,
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
                        fontWeight: 600,
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
                    ? Array.from({ length: currentItems?.length || 5 }).map(
                      (_, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton circle={true} height={40} width={40} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={80} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={120} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={120} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={120} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={50} />
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
                            <Skeleton width={50} />
                          </td>
                        </tr>
                      )
                    )
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
                          <td style={{ padding: "10px", border: "none" }}>
                            <img src={squre} height={20} width={20} />
                          </td>
                          <td
                            style={{
                              border: "none",
                              display: "flex",
                              padding: "10px",
                            }}
                          >
                            <Image
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
                            />
                            <span
                              className="Customer_Name_Hover"
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "#1E45E1",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRoomDetailsPage(user)}
                            >
                              {user.Name}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {user.Email}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            +
                            {user &&
                              String(user.Phone).slice(
                                0,
                                String(user.Phone).length - 10
                              )}{" "}
                            {user && String(user.Phone).slice(-10)}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
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
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {" "}
                            {!user.Rooms ||
                              user.Rooms === "undefined" ||
                              user.Rooms === "0" ||
                              user.Rooms === "" ||
                              user.Rooms === "null"

                                ? "-"
                                : user.Rooms}
                            </td>
                           
                      
                        
                          <td
                            // className={user.Bed === 0 ? 'assign-bed' : ''}
                            // onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
                            style={{
                              padding: "10px",
                              border: "none",
                              cursor: "pointer",
                              color:
                                user.Bed === "undefined" ? "blue" : "inherit",
                              textDecoration:
                                user.Bed === "undefined" ? "none" : "initial",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {user.Bed === "undefined" ||

                              user.Bed === "0" ||
                              user.Bed === "" ||
                              user.Bed === "null"
                              ? "-"
                              : user.Bed}
                          </td>
                          <td style={{ padding: "10px", border: "none" }}>
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
                              onClick={() => handleShowDots(user.ID)}
                            >
                              <PiDotsThreeOutlineVerticalFill
                                style={{ height: 20, width: 20 }}
                              />
                              {activeRow === user.ID && (
                                <>
                                  <div
                                    ref={popupRef}
                                    style={{
                                      cursor: "pointer",
                                      backgroundColor: "#fff",
                                      position: "absolute",
                                      right: 50,
                                      top: 20,
                                      width: 163,
                                      height: "auto",
                                      border: "1px solid #EBEBEB",
                                      borderRadius: 10,
                                      display: "flex",
                                      justifyContent: "start",
                                      padding: 10,
                                      alignItems: "center",
                                      zIndex: showDots ? 1000 : "auto",
                                    }}
                                  >
                                    <div
                                      style={{ backgroundColor: "#fff" }}
                                      className=""
                                    >
                                      {(user.Bed === "undefined" ||
                                        user.Bed === "null" ||
                                        user.Bed === "0" ||
                                        user.Bed === "") && (
                                          <div
                                            className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                            // onClick={() => handleInvoicepdf(user)}
                                            style={{ backgroundColor: "#fff" }}
                                            onClick={() =>
                                              handleShowAddBed(user)
                                            }
                                          >
                                            <img
                                              src={addcircle}
                                              style={{ height: 16, width: 16 }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy,sans-serif",
                                                color: "#222222",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Assign Bed
                                            </label>
                                          </div>
                                        )}
                                      <div
                                        className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                        style={{ backgroundColor: "#fff" }}
                                        onClick={() =>
                                          handleRoomDetailsPage(user)
                                        }
                                      >
                                        <img
                                          src={Edit}
                                          style={{ height: 16, width: 16 }}
                                        />{" "}
                                        <label
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            fontFamily: "Gilroy,sans-serif",
                                            color: "#222222",
                                            cursor: "pointer",
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
                                          className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                          style={{ backgroundColor: "#fff" }}
                                       onClick={handleDeleteShow} >
                                          <img
                                            src={Delete}
                                            style={{ height: 16, width: 16 }}
                                          />{" "}
                                          <label
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy,sans-serif",
                                              color: "#FF0000",
                                              cursor: "pointer",
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
            )}
          </div>
          {currentItems.length > 0 && (
            <nav>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyleType: "none",
                  padding: 0,
                  justifyContent: "end",
                }}
              >
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: currentPage === 1 ? "#ccc" : "#007bff",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    
                    <ArrowLeft2 size="16" color="#1E45E1" />
                  </button>
                 
                </li>
                {currentPage > 3 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
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
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                )}
                <li style={{ margin: "0 5px" }}>
               
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: currentPage === totalPages ? "#ccc" : "#007bff",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                 
                    <ArrowRight2 size="16" color="#1E45E1" />
                  </button>
                </li>
              </ul>
            </nav>
          )}





</div>
        



              
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







        </div>
       
      )}
      

{/* <Modal show={deleteShow} onHide={handleCloseDelete} backdrop="static" centered>
  <Modal.Body style={{ padding: "20px", borderRadius: "30px" }}>
    <div className="d-flex flex-column align-items-center">
      <Modal.Header className="w-100" style={{ borderBottom: "none" }}>
        <h5 style={{ width: "100%", textAlign: "center", margin: 0 }}>
          Delete Customer?
        </h5>
      </Modal.Header>

      <p className="mt-4" style={{ textAlign: "center" }}>
        Are you sure you want to delete this customer?
      </p>

      <div
        className="d-flex justify-content-between w-100"
        style={{ marginTop: "20px", gap: "20px" }} // Adjusted gap between buttons
      >
        <Button
          onClick={handleCloseDelete}
          style={{
            backgroundColor:"transparent",
            color: "#1E45E1",
            fontWeight: 600,
            height: 50,
            width: "100%", // Ensure buttons take equal space
            borderRadius: 12,
            fontSize: 16,
            fontFamily: "Montserrat",
            border: "1px solid #ccc", // Optional border for consistency
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCloseDelete}
          style={{
            backgroundColor: "#1E45E1",
            color: "#fff",
            fontWeight: 600,
            height: 50,
            width: "100%", // Ensure buttons take equal space
            borderRadius: 12,
            fontSize: 16,
            fontFamily: "Montserrat",
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  </Modal.Body>
</Modal> */}

<Modal
  show={deleteShow}
  onHide={handleCloseDelete}
  centered
  backdrop="static"
  style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }} 
>
  <Modal.Header style={{ borderBottom: 'none' }}> 
    <Modal.Title 
      style={{
        fontSize: '18px',
        fontFamily: 'Gilroy',
        textAlign: 'center',
        fontWeight: 600,
        color: '#222222',
        flex: 1
      }}
    >
      Delete Check-out?
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Gilroy',
      color: '#646464',
      textAlign: 'center',
      marginTop: '-20px'
    }}
  >
    Are you sure you want to delete this check-out?
  </Modal.Body>
  
  <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}> 
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#fff',
        color: '#1E45E1',
        border: '1px solid #1E45E1',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px',
        marginRight: 10
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
        padding: '12px 20px',
        background: '#1E45E1',
        color: '#FFFFFF',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px'
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
          handleVerifyOtp={handleVerifyOtp}
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
          currentRowAmnities={currentRowAmnities}
          amnitiescurrentPage={amnitiescurrentPage}
          handleAdhaarChange={handleAdhaarChange}
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
        />
      ) : null}
    </div>
  );
}

export default UserList;
