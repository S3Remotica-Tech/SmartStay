/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
// import "./UserList.css";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";
import UserlistForm from "./UserlistForm";

import Modal from "react-bootstrap/Modal";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import ChangeBedTenantWay from "./ChangeBedTenantWay";
import { AddCircle, Trash, ArrowDown2, ArrowUp2 } from "iconsax-react";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import UserlistBookings from "./UserlistBookings";
import UserlistCheckout from "./UserlistCheckout";
import UserlistWalkin from "./UserlistWalkin";
import Addbooking from "./Addbookingform";
import CheckOutForm from "./UserListCheckoutForm";
import UserlistWalkinForm from "./UserlistWalkinForm";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MoveToNoticePGAndTenant from "./MoveToNoticePGAndTenant";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Closebtn from "../../Assets/Images/CloseCircle.png";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import Filters from "../../Assets/Images/Filters.svg";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Addbook from "../../Assets/Images/New_images/calendar-tick.svg";
import logout from "../../Assets/Images/New_images/logout.png";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";
import AddCustomer from "../PayingGuestFile/AddCustomerPG";
import BookedCheckIn from "./BookedCheckIn";
import MakeAsInactive from "./MakeAsInactive";
// import FinalSettlement from "./FinalSettlement";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import BackToCheckIn from "./BackToCheckIn";
import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { Tabs, Tab } from "react-bootstrap";
import FinalOld from "./FinalOld";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowSwapVertical,
  Setting3,
  SearchNormal1,
  Buildings,
  ArrowDown,
} from "iconsax-react";
import Select from "react-select";
import { IoMdMenu } from "react-icons/io";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TiTick } from "react-icons/ti";
// import zIndex from "@mui/material/styles/zIndex";
import TenantListFilter from "./TenantListFilter";
import ApiPagination from "../../Components/ApiPagination";
import { ButtonGroupButtonContext } from "@mui/material";
import NoData from "../../Assets/v2Images/NoData.svg";
import DataSearch from "../../Assets/v2Images/DataSearch.svg";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import AddTenant from "../PayingGuestFile/AddTenant";

import BookingToCheckin from "./BookingToCheckin";
function UserList(props) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [chips, setChips] = useState([]);
  const { RangePicker } = DatePicker;
  const [searchParams] = useSearchParams();
  dayjs.extend(isBetween);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const [excelDownload, setExcelDownload] = useState("");
  const [excelDownloadBooking, setExcelDownloadBooking] = useState("");
  const [excelDownloadChecout, setExcelDownloadCheckout] = useState("");
  const [excelDownloadCheckIn, setExcelDownloadChecIn] = useState("");
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [reAssignDetail, setReasignDetail] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [customername, setCustomerName] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [billLoading, setBillLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [newRows, setNewRows] = useState([]);
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteDetails, setDeleteDetails] = useState({ room: null, bed: null });
  const [isroomReading, setIsRoomReading] = useState(false);
  const [ishostelReading, setIsHostelReading] = useState(false);
  const [isReading, setIsReading] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [reading, setReading] = useState("");
  const [readingError, setReadingError] = useState("");
  const [formError, setFormError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [isreader, setIsReader] = useState("");
  const [checkoutaddform, setAddCheckoutForm] = useState(true);

  const [hos_Name, setHos_Name] = useState("");

  const [hostelDelete, setHostelDelete] = useState(false);
  const [roomDelete, setRoomDelete] = useState(false);

  const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
  const [formatduedate, setFormatDueDate] = useState(null);
  const [id, setId] = useState("");
  const [tableErrmsg, setTableErrmsg] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [billsAddshow, setBillsAddShow] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [add_bookingshow, setAddBookingsShow] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const location = useLocation();
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  // console.log("pageeeeeeeeeeeeeee", page);

  const [isScrolling, setIsScrolling] = useState(false);

  const [view, setView] = useState("List");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const tableRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [DraftTenantDetails, setDraftTenantDetails] = useState("");

  const dropdownRef = useRef(null);
  // console.log("isScrolling", isScrolling);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    canWriteModule: canWriteTenant,
    canReadModule: canReadTenant,
    canDeleteModule: canDeleteTenant,
    // canUpdateModule: canUpdateTenant
  } = useHasPermission("Customers");

  const { canWriteModule: canWriteWalkin, canReadModule: canReadWalkin } =
    useHasPermission("Walk in");

  const { canReadModule: canReadCheckout, canWriteModule: canWriteCheckout } =
    useHasPermission("Checkout");

  const {
    canWriteModule: canWriteBooking,
    // canReadModule: canReadBooking,
  } = useHasPermission("Booking");

  const isTenantForm = location.state?.isTenantForm || false;
  const isCheckoutWay = location.state?.isCheckoutWay || false;
  const isSearching = chips.length > 0 || filterInput?.trim() !== "";

  // useEffect(() => {
  //   const pageParam = Number(searchParams.get("page")) || 1;
  //   const sizeParam = Number(searchParams.get("size")) || 20;

  //   setPage(pageParam);
  //   setSize(sizeParam);
  // }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      setPage(1);
      setFilterInput("");
    }
  }, [value, state.login.selectedHostel_Id]);

  useEffect(() => {
    if (isTenantForm) {
      setValue("4");
      setShowMenu(true);
    } else if (isCheckoutWay) {
      setValue("3");
    }
  }, [isTenantForm, isCheckoutWay]);

  const [debouncedInput, setDebouncedInput] = useState(filterInput);
  const [statusfilter, setStatusFilter] = useState("ALL");

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleStatusFilter = (selected) => {
    setStatusFilter(selected?.value || "");
  };

  const handleInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  };

  useEffect(() => {
    if (state.AssetList.accessRestricted) {
      setLoading(false);
    }
  }, [state.AssetList.accessRestricted]);

  useEffect(() => {
    if (!canReadTenant) {
      setLoading(false);
    }
  }, [canReadTenant]);

  // console.log("state", state);

  const options = [
    { key: "Name", label: "Name" },
    { key: "Status", label: "Status" },
    { key: "Mobile No", label: "Mobile No" },
    { key: "Joining Date", label: "Joining Date" },
    { key: "Floor", label: "Floor" },
    { key: "Room", label: "Room" },
    { key: "Bed", label: "Bed" },
    { key: "Email ID", label: "Email ID" },
    { key: "Booking Date", label: "Booking Date" },
    { key: "Monthly Rent", label: "Monthly Rent" },
    { key: "Advance", label: "Advance" },
    { key: "Booking amount", label: "Booking amount" },
  ];
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const ListOptions = [
    { key: "List", label: "List", img: Setting3 },
    { key: "Room", label: "Room", img: Buildings },
  ];

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!listRef.current) return;

      if (!listRef.current.contains(event.target)) {
        // if (isOpen) {
        //   setCustomizeItems([...initialCustomizeItems]);
        // }

        setIsOpen(false);
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, initialCustomizeItems]);

  useEffect(() => {
    if (!open) {
      setError("");
      setCustomizeItems([...initialCustomizeItems]);
    }
  }, [open, initialCustomizeItems]);

  const handleResetCustomize = () => {
    setCustomizeItems([...initialCustomizeItems]);
    setError("");
  };

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      if (value === "1") {
        // dispatch({
        //   type: "USERLIST",
        //   payload: {
        //     hostel_id: state.login.selectedHostel_Id,
        //     page: page,
        //     size: size,
        //   },
        // });
        // setLoading(true);
      } else if (value === "3") {
        dispatch({
          type: "CHECKOUTCUSTOMERLIST",
          payload: { hostelId: state.login.selectedHostel_Id },
        });
      } else if (value === "4") {
        dispatch({
          type: "TENANT_LIST_SAGA",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            purpose: "WALK_IN",
          },
        });
      }
    }
  }, [value, state.login.selectedHostel_Id]);

  useEffect(() => {
    const statusValue = statusfilter === "ALL" ? "" : statusfilter;
    const shouldResetPage =
      !!debouncedInput || !!statusValue || !!selectedMonth?.value;
    if (state.login.selectedHostel_Id && value === "1") {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          name: debouncedInput || "",
          type: statusValue,
          page: shouldResetPage ? 1 : page,
          size: size,
          period: selectedMonth?.value,
        },
      });
      setLoading(true);
    }

    const filters = {
      status: statusfilter ? [statusfilter] : [],
      search: debouncedInput?.trim() || "",
      period: selectedMonth?.value ? selectedMonth?.value : "",
      periodLabel: selectedMonth?.label ? selectedMonth?.label : "",
    };

    dispatch({
      type: "SET_TENANT_TABLE_FILTERS",
      payload: filters,
    });
  }, [
    debouncedInput,
    statusfilter,
    page,
    size,
    selectedMonth,
    value,
    state.login.selectedHostel_Id,
  ]);

  useEffect(() => {
    if (state.UsersList.customerdetails.invoiceResponseList) {
      const mappedRows = [];

      state.UsersList.customerdetails.invoiceResponseList.forEach((invoice) => {
        if (invoice.invoiceType === "Rent") {
          mappedRows.push({
            am_name: "RoomRent",
            amount: invoice.totalAmount.toString(),
          });
        }
      });

      setNewRows(mappedRows);
    }
  }, [state.UsersList.customerdetails.invoiceResponseList]);

  useEffect(() => {
    if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {
      setInvoiceNumber(state.InvoiceList.ManualInvoiceNUmber.invoice_number);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_MANUAL_INVOICE_NUMBER_GET" });
      }, 100);
    }
  }, [
    state.InvoiceList.ManualInvoiceNUmber.invoice_number,
    state.InvoiceList.Manulainvoicenumberstatuscode,
  ]);

  const handleEditItem = () => {
    setBillsAddShow(true);
    // setCurrentView(null);
    setCustomerName(id);
    // setTimeout(() => {
    //   setCurrentView(details);
    // }, 0);
  };

  // useEffect(() => {
  //   if (isAddMode && !currentView && !billsAddshow) {
  //     setCustomerName(id);
  //   }
  // }, [isAddMode, billsAddshow]);
  const handleAddItems = () => {
    setIsAddMode(true);
    setBillsAddShow(true);
    setCustomerName(id);
  };
  const handleDeleteItem = (detail) => {
    setDeleteId(detail);
  };

  const handleEditRoomReading = (value) => {
    setIsReader(value);
  };

  useEffect(() => {
    if (isreader) {
      const matchingFloor = state?.UsersList?.hosteldetailslist?.find(
        (item) => item.floor_name === isreader.floor_name,
      );

      if (matchingFloor) {
        setFloor(matchingFloor.floor_id);
      }

      const matchingRoom = state?.UsersList?.roomdetails?.find(
        (item) => String(item.Room_Id) === String(isreader.Room_Id),
      );

      if (matchingRoom) {
        setRooms(matchingRoom.Room_Id);
      }

      setReading(isreader.unit);

      if (isreader.reading_date) {
        const parsedDate = new Date(isreader.reading_date);
        if (!isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate);
        }
      }
    }
  }, [
    isreader,
    state?.UsersList?.hosteldetailslist,
    state?.UsersList?.roomdetails,
  ]);

  const handleEditHostelReading = (users) => {
    setIsReading(users);
  };

  const handleNewRowChange = (index, field, value) => {
    setNewRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    );
    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const handleDeleteBilling = () => {
    dispatch({
      type: "MANUAL-INVOICE-DELETE",
      payload: {
        id: deleteId,
      },
    });
    setIsDeleting(false);
  };

  const handleInvoiceDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDate(date);
    if (!selectedDates) {
      setInvoiceDateErrmsg("Please Select Date");
    } else {
      setInvoiceDateErrmsg("");
    }
    const formatDateForPayloadmanualinvoice = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = formatDateForPayloadmanualinvoice(date);
    setFormatInvoiceDate(formattedDate);
  };

  const handleDueDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDueDate(date);
    if (!selectedDates) {
      setInvoiceDueDateErrmsg("Please Select Date");
    } else {
      setInvoiceDueDateErrmsg("");
    }

    const formatDateForPayloadmanualinvoice = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = formatDateForPayloadmanualinvoice(date);
    setFormatDueDate(formattedDate);
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const deletedRow = prevRows[index];
      const updatedRows = prevRows.filter((_, i) => i !== index);

      const name = deletedRow.am_name?.toLowerCase().replace(/\s/g, "");
      if (name === "roomrent") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "RoomRent"),
        );
      } else if (name === "eb") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "EB"),
        );
      }

      return updatedRows;
    });

    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const handleCloseDeleteroom = () => {
    setRoomDelete(false);
  };
  const handleCloseDeleteHostel = () => {
    setHostelDelete(false);
  };

  const handleBackBill = () => {
    setIsAddMode(false);
    setIsEditing(false);
    setDropdownValue("");
    setSelectedTypes("");
    setRoomDetail(true);
    // setCustomerName("");
    setInvoiceNumber("");
    setInvoiceDate("");
    setInvoiceDueDate("");

    setTotalAmount("");
    setCustomerErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setNewRows("");
    setTableErrmsg("");
    dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    dispatch({ type: "REMOVE_MANUAL_INVOICE_NUMBER_GET" });
  };

  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);
    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode]);

  useEffect(() => {
    if (isReading) {
      setHos_Name(isReading.HostelName);
      setReading(isReading.unit);
      setSelectedDate(new Date(isReading.reading_date));
    }
  }, [isReading]);

  useEffect(() => {
    setUniqostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);

  const [userListDetail, setUserListDetail] = useState([]);

  // useEffect(() => {
  //   if (state.UsersList?.Users) {
  //     setLoading(false);
  //   }
  // }, [state.UsersList?.Users]);

  useEffect(() => {
    if (state.UsersList?.Users) {
      setLoading(false);
      setIsFilterOpen(false);
      setUserListDetail(state.UsersList?.Users);
      dispatch({ type: "REMOVE_STATUS_CODE_USER" });
    }
  }, [state.UsersList?.Users]);

  // console.log("state.UsersList.Users", state.UsersList.Users);

  useEffect(() => {
    if (state.UsersList.userRoomfor) {
      // setIsEditing(true);
      setRoomDetail(false);

      // dispatch({ type: "USERROOMAVAILABLEFALSE" });
    }
  }, [state.UsersList.userRoomfor]);

  useEffect(() => {
    if (!isEditing) {
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    }
  }, [isEditing]);

  useEffect(() => {
    if (state.UsersList.userProfilebill) {
      setIsDeleting(true);
      setRoomDetail(true);
      dispatch({ type: "USERPROFILEBILLFALSE" });
    }
  }, [state.UsersList.userProfilebill]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      setBillLoading(false);

      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });

      setLoading(false);
      setIsEditing(false);
      setRoomDetail(true);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceEditStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceAddStatusCode === 201) {
      navigate(`/tenant/details/${customername}`);
      if (customername) {
        dispatch({
          type: "CUSTOMERDETAILS",
          payload: { customerId: customername },
        });
      }

      setBillLoading(false);
      handleBackBill();
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
        setLoading(false);
      }, 300);
    }
  }, [state.InvoiceList.manualInvoiceAddStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceDeleteStatusCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceDeleteStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);

  useEffect(() => {
    if (state.UsersList.userReading) {
      setIsRoomReading(true);
      setRoomDetail(true);
      dispatch({ type: "USERREADINGFALSE" });
    }
  }, [state.UsersList.userReading]);

  useEffect(() => {
    if (state.UsersList.userHostelRead) {
      setIsHostelReading(true);
      setRoomDetail(true);
      dispatch({ type: "USERHOSTELREADINGFALSE" });
    }
  }, [state.UsersList.userHostelRead]);

  useEffect(() => {
    if (state.UsersList.userReadingdelete) {
      setRoomDelete(true);
      dispatch({ type: "USERREADING_DELETEFALSE" });
    }
  }, [state.UsersList.userReadingdelete]);

  useEffect(() => {
    if (state.UsersList.userHosteldelete) {
      setHostelDelete(true);
      dispatch({ type: "USERHOSTEL_READING_DELETEFALSE" });
    }
  }, [state.UsersList.userHosteldelete]);

  const handleCloseHostel = () => {
    setIsHostelReading(false);
    setRoomDetail(true);
    setReading("");
    setSelectedDate("");
    setDateError("");
    setReadingError("");
    setFormError("");
    setDateError("");
  };

  const handleCloseRoom = () => {
    setIsRoomReading(false);
    setRoomDetail(true);
    setFormError("");
  };

  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setFormError("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);
    setRooms("");
    setfloorError("");
    setFormError("");
  };
  const handleReadingChange = (e) => {
    setReading(e.target.value);
    setReadingError("");
    setFormError("");
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
    setDateError("");
    setFormError("");
  };

  const handleCustomerReAssign = (reuser) => {
    if (reuser?.customerId) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: reuser?.customerId },
      });
    }
    setReasignDetail(reuser);
    setCustomerReAssign(true);
  };
  const handleCustomerCheckout = (item) => {
    setCustomerCheckoutpage(true);
    setCustomerCheckoutData(item);
  };

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);

  const [walkingCustomer, setWalkingCustomer] = useState([]);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "WALKINCUSTOMERLIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id },
  //     });
  //   }
  // }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.getWalkInStatusCode === 200) {
      setWalkingCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList?.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingCustomer([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode === 201) {
      setUserListDetail([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 1000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

  // useEffect(() => {
  //   if (state.UsersList?.UserListStatusCode === 200) {
  //     setUserList(state.UsersList.Users);
  //     dispatch({ type: "REMOVE_STATUS_CODE_USER" });
  //   }
  // }, [state.UsersList?.UserListStatusCode]);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "CHECKOUTCUSTOMERLIST",
  //       payload: { hostelId: state.login.selectedHostel_Id },
  //     });
  //   }
  // }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      setCheckOutCustomer(state.UsersList?.CheckOutCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 2000);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);

  const [customerBooking, setCustomerBooking] = useState("");

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "GET_BOOKING_LIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id },
  //     });

  //   }
  // }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.Booking.statusCodeGetBooking === 200) {
      setCustomerBooking(state.Booking?.CustomerBookingList?.bookings);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_LIST" });
      }, 2000);
    }
  }, [state.Booking.statusCodeGetBooking]);

  useEffect(() => {
    if (state.UsersList.cancelCheckoutStatusCode === 200) {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setBacktoCheckInForm(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_CANCEL_CHECKOUT" });
      }, 100);
    }
  }, [state.UsersList.cancelCheckoutStatusCode]);

  const handlefilterInput = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setFilterInput(searchValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(filterInput);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filterInput]);

  // console.log("selectedMonth **********", selectedMonth);

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    setDropdownVisible(false);
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
  const [showMenuNewTenant, setShowMenuNewTenant] = useState(false);
  const [bookingOnly, setBookingOnly] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState("");
  const [EditObj, setEditObj] = useState("");
  const [addBasicDetail, setAddBasicDetail] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);

  const isDev = import.meta.env.MODE === "development";

  const handleShowDots = (id, event) => {
    setActiveRow((prev) => (prev === id ? null : id));
    setSearch(false);

    const rect = event.currentTarget.getBoundingClientRect();

    const popupHeight = 120;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < popupHeight) {
      setShowAbove(true);
    } else {
      setShowAbove(false);
    }

    setPopupPosition({
      top: rect.bottom,
      left: rect.left,
    });
  };

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;

      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

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

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      //  handleCloseBooking()
      handleCloseAddBooking();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  const [search, setSearch] = useState(false);

  const stats = [
    {
      label: "Total",
      value: `${userListDetail?.tenantSummary?.totalTenantsCount || 0}`,
      icon: true,
      highlight: true,
    },
    {
      label: "Active",
      value: `${userListDetail?.tenantSummary?.checkedInCounts || 0}`,
    },
    {
      label: "Booked",
      value: `${userListDetail?.tenantSummary?.bookedCounts || 0}`,
    },
    {
      label: "Notice Period",
      value: `${userListDetail?.tenantSummary?.noticePeriodCounts || 0}`,
    },
    {
      label: "Settlement Generate",
      value: `${userListDetail?.tenantSummary?.settlementGenerated || 0}`,
    },
    {
      label: "Check out",
      value: `${userListDetail?.tenantSummary?.vacatedCount || 0}`,
    },
  ];

  const handleMenuClick = () => {
    setShowForm(true);
  };

  const handleShow = (u) => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding customer information.", {
        hideProgressBar: true,
        autoClose: 1500,
        // style: {
        //   color: "#000",
        //   borderBottom: "5px solid red",
        //   fontFamily: "Gilroy",
        // },
        className: "text-black font-gilroy border-b-4 border-red-500",
      });
      return;
    }
    handleMenuClick();
    setShowMenu(true);
    setAddCheckoutForm(false);
    setAddBasicDetail(true);
    setEditObj(u);
  };

  const handleShowAddTenant = (isWhat) => {
    // console.log("isWhat", isWhat);
    setShowMenuNewTenant(true);
    setShowDropdown(false);
    setDraftTenantDetails("");
    setBookingOnly(isWhat ? true : false);
  };

  const handleShowDraftTenant = (user) => {
    setShowMenuNewTenant(true);
    setShowDropdown(false);
    setDraftTenantDetails(user);
    setBookingOnly(false);
  };

  const handleChange = (key) => {
    setValue(key);
    setSearch(false);
    setExcelDownload("");
    setExcelDownloadBooking("");
    setExcelDownloadChecIn("");
    setExcelDownloadCheckout("");
    setIsDownloadTriggered(false);
    setFilterInput("");
    setFilterStatus("");

    // if(String(newValue) === "3"){
    //   navigate(`/checkout/${state.login.selectedHostel_Id}`)
    // }
  };

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode) {
      setLoading(false);
      setUserDetails([]);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 2000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

  const [roomDetail, setRoomDetail] = useState(false);
  const [userList, setUserList] = useState(true);

  const [hostelName, sethosName] = useState("");
  // const [customerUser_Id, setcustomerUser_Id] = useState("");
  const [advanceForm, setAdvanceForm] = useState(false);
  // const [userDatafull, setUserData] = useState("");

  const handleRoomDetailsPage = (userData) => {
    // setHostelIds(userData.Hostel_Id);
    // setUserData(userData);
    setId(userData?.customerId);
    // sethosName(userData.HostelName);
    // setcustomerUser_Id(userData.customerId);
    // setRoomDetail(true);
    setUserList(false);
    navigate(`/tenant/details/${userData.customerId}`, {
      state: {
        customerId: userData.customerId,
        hostelId: state.login.selectedHostel_Id,
        name: userData.fullName,
        isTenantWay: true,
      },
    });
    dispatch({ type: "UPDATE_USERSLIST_FALSE" });
  };

  const [userDetail, setUserDetail] = useState({});
  const [bookingDet, setBookingDet] = useState("");

  const handleCloseAddBooking = () => {
    setAddBookingsShow(false);
    setUserList(true);
  };

  const handleShowAddBed = (u) => {
    setEdit("Edit");
    handleMenuClick();
    setShowMenu(true);
    setAdvanceForm(false);
    setAddCheckoutForm(false);
    setAddBasicDetail(false);
    setEditObj(u);
  };
  // const handleShowAssignBed = (u) => {
  //   setEdit("Edit");
  //   handleMenuClick();
  //   setShowMenu(false);
  //   setShowAssignMenu(true);
  //   setAdvanceForm(false);
  //   setAddCheckoutForm(false);
  //   setAddBasicDetail(false);
  //   setEditObj(u);
  // };

  const [hostelIds, setHostelIds] = useState("");

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const users = Array.isArray(userListDetail) ? userListDetail : [];

    const ParticularUserDetails = users.filter((item) => {
      return item.User_Id === id;
    });

    setUserDetails(ParticularUserDetails);
  }, [id, state.InvoiceList?.Invoice]);

  useEffect(() => {
    if (
      state.UsersList?.statusCodeForAddUser === 201 ||
      state.UsersList?.statusCodeForAddCustomerSaveInfo === 201
    ) {
      handleCloseAddCustomer();
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  const handleBack = () => {
    setUserList(true);
    setRoomDetail(false);
  };

  const handleShowSearch = () => {
    setSearch(!search);
  };
  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };
  const [checkInDateRange, setCheckInDateRange] = useState([]);
  const [bookingDateRange, setBookingDateRange] = useState([]);
  const [checkoutDateRange, setCheckoutDateRange] = useState([]);
  const [walkinDateRange, setWalkinDateRange] = useState([]);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const [resetPage, setResetPage] = useState(false);
  const [statusFilterCheckout, setStatusFilterCheckout] = useState("");

  useEffect(() => {
    if (id) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
    }
  }, [id]);

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteShow = (user) => {
    setDeleteShow(true);
    setDeleteDetails({ room: user.Rooms, bed: user.Bed, user: user });
  };

  const handleDeleteCustomer = () => {
    if (deleteDetails?.user?.customerId) {
      dispatch({
        type: "DELETECUSTOMER",
        payload: {
          customerId: deleteDetails?.user?.customerId,
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
    setFormLoading(true);
  };

  const handleDeleteBill = () => {
    setIsDeleting(false);
  };

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

  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      setTimeout(() => {
        dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });
        dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDUSER_AMNETIES" });
      }, 1000);
    }
  }, [state.UsersList.statusCustomerAddUser]);

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

  const handleValidateAadhaar = () => {
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

  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess === 200) {
      setShowOtpValidation(true);
      setShowValidate(false);
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
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding booking information.", {
        hideProgressBar: true,
        autoClose: 1500,
        // style: {
        //   color: "#000",
        //   borderBottom: "5px solid red",
        //   fontFamily: "Gilroy",
        // },
        className: "text-black font-gilroy border-b-[5px] border-red-500",
      });
      return;
    }
    setShowbookingForm(!showbookingForm);
  };
  // const closeModal = () => {
  //   setShowbookingForm(false);
  // };
  const [checkoutForm, setcheckoutForm] = useState(false);

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const [walkInForm, setWalkinForm] = useState(false);

  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  useEffect(() => {
    if (state.UsersList.addWalkInCustomerStatusCode === 200) {
      setWalkinForm(false);
    }
  }, [state.UsersList.addWalkInCustomerStatusCode]);

  useEffect(() => {
    if (
      state.UsersList.addCheckoutCustomerStatusCode === 201 &&
      value === "1"
    ) {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setcheckoutForm(false);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);

  useEffect(() => {
    if (state.UsersList?.exportDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportBookingDetails?.response?.fileUrl) {
      setExcelDownloadBooking(
        state.UsersList?.exportBookingDetails?.response?.fileUrl,
      );
    }
  }, [state.UsersList?.exportBookingDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportCheckoutDetails?.response?.fileUrl) {
      setExcelDownloadCheckout(
        state.UsersList?.exportCheckoutDetails?.response?.fileUrl,
      );
    }
  }, [state.UsersList?.exportCheckoutDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportWalkinDetails?.response?.fileUrl) {
      setExcelDownloadChecIn(
        state.UsersList?.exportWalkinDetails?.response?.fileUrl,
      );
    }
  }, [state.UsersList?.exportWalkinDetails?.response?.fileUrl]);

  // const handleCustomerExcel = () => {
  //   if (value === "1") {
  //     dispatch({
  //       type: "EXPORTDETAILS",
  //       payload: {
  //         type: "customers",
  //         hostel_id: uniqueostel_Id,
  //       },
  //     });
  //     setIsDownloadTriggered(true);
  //   }
  // };

  // const handleBookingExcel = () => {
  //   if (value === "2") {
  //     dispatch({
  //       type: "EXPORTBOOKINGDETAILS",
  //       payload: { type: "booking", hostel_id: uniqueostel_Id },
  //     });
  //     setIsDownloadTriggered(true);
  //   }
  // };

  // const handlecheckoutExcel = () => {
  //   if (value === "3") {
  //     dispatch({
  //       type: "EXPORTCHECKOUTDETAILS",
  //       payload: { type: "checkout", hostel_id: uniqueostel_Id },
  //     });
  //     setIsDownloadTriggered(true);
  //   }
  // };

  // const handlewalkinExcel = () => {
  //   if (value === "4") {
  //     dispatch({
  //       type: "EXPORTWALKINGDETAILS",
  //       payload: { type: "walkin", hostel_id: uniqueostel_Id },
  //     });
  //     setIsDownloadTriggered(true);
  //   }
  // };
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

  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100 relative"
        onClick={props.onClick}
      >
        <FormControl
          type="text"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          className={`date_input w-full h-[50px] border border-[#D9D9D9] rounded-[8px] p-[9px] box-border text-[14px] font-gilroy shadow-none ${props.value ? "font-semibold" : "font-medium"}`}
        />
        <img
          src={Calendars}
          className="h-[24px] w-[24px] ml-[10px] cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2"
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setBillLoading(false);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

  // const [bookingDate, setBookingDate] = useState(null);

  // useEffect(() => {
  //   if (props?.makeasinactive) {
  //     setUserList(false);
  //     setInActiveForm(true)
  //     setInactiveDetails(props?.customer_details)
  //     setBookingId(props?.customer_details?.booking_id)
  //     const bookingDateStr = props?.customer_details?.booking_booking_date; // from API
  //     const bookingDatevalue = bookingDateStr ? dayjs(bookingDateStr).startOf("day") : null;
  //     setBookingDate(bookingDatevalue)
  //   }

  // }, [props.makeasinactive])

  const [inActiveDetails, setInactiveDetails] = useState("");

  const [inactiveForm, setInActiveForm] = useState(false);

  // const [bookingId, setBookingId] = useState("")

  const handleInActive = (item) => {
    setInActiveForm(true);
    // setBookingId(item.booking_id)
    setInactiveDetails(item);
    // const bookingDateStr = item?.booking_booking_date; // from API
    // const bookingDatevalue = bookingDateStr ? dayjs(bookingDateStr).startOf("day") : null;
    // setBookingDate(bookingDatevalue)
  };

  const handleCloseInActive = () => {
    if (typeof props?.handleCloseBed === "function") {
      props.handleCloseBed();
    }
    dispatch({ type: "REMOVE_ERROR_MAKEASINACTIVE" });

    setInActiveForm(false);
    // setIsACtiveDateError("")
    // setInActiveComments("")
    // setInActiveDate("")
  };

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setFormLoading(false);
      handleCloseInActive();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_InActive" });
      }, 1000);
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  useEffect(() => {
    if (
      state.UsersList?.bookingToCheckinStatusCode === 200 ||
      state.UsersList?.bookingToCheckinStatusCode === 201
    ) {
      setBookingAssignForm(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_BOOKING_TO_CHECKIN" });
      }, 100);
    }
  }, [state.UsersList?.bookingToCheckinStatusCode]);

  const [BookingAssignForm, setBookingAssignForm] = useState(false);

  const handleCloseBooking = () => {
    setBookingAssignForm(false);
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR_BOOKED" });
  };

  useEffect(() => {
    if (state.UsersList?.bookingToCheckinSuccessCode === 201) {
      setBookingAssignForm(false);

      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });

      dispatch({ type: "REMOVE_BOOKING_TO_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.bookingToCheckinSuccessCode]);

  const handleBookingAssign = (book) => {
    setEdit("Edit");
    handleMenuClick();
    setShowMenu(false);
    setBookingAssignForm(true);
    setAdvanceForm(false);
    setAddCheckoutForm(false);
    setAddBasicDetail(false);
    setEditObj(book);
  };
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false);

  const handleCloseAddCustomer = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setShowMenu(false);
  };

  const handleCloseAddTenant = () => {
    setShowMenuNewTenant(false);
  };

  const handleCloseBackToCheckIn = () => {
    dispatch({ type: "REMOVE_CANCEL_CHECKOUT_ERROR" });
    setBacktoCheckInForm(false);
  };

  const handleBacktoCheckout = (item) => {
    handleMenuClick();
    setShowMenu(false);
    setBookingAssignForm(false);
    setAdvanceForm(false);
    setAddCheckoutForm(false);
    setAddBasicDetail(false);
    setEditObj(item);
    setBacktoCheckInForm(true);
  };
  const [DueCustomerShow, setDueCustomerShow] = useState(false);
  const [CheckOutDetails, setCheckOutDetails] = useState("");
  const [finalsettlepage, setFinalSettlePage] = useState(false);
  const [finalsettledData, setFinalsettledData] = useState("");

  const handleConformCheckout = (item) => {
    setDueCustomerShow(true);
    setCheckOutDetails(item);
    setFinalSettlePage(false);

    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      payload: { id: item.ID, hostel_id: item.Hostel_Id },
    });
  };
  const handleCloseDuePopup = () => {
    setDueCustomerShow(false);
  };
  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      setDueCustomerShow(false);

      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);

  useEffect(() => {
    if (state.UsersList.statusCodegetConfirmCheckout && CheckOutDetails) {
      // setDueCustomerShow(true);
    }

    setTimeout(() => {
      dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
    }, 500);
  }, [state.UsersList.statusCodegetConfirmCheckout, CheckOutDetails]);

  // const handleCheckoutGenrate = (item) => {
  //   setFinalsettledData(item)
  //   console.log("item", item)
  //   setFinalSettlePage(true)
  //   setDueCustomerShow(false);

  //   dispatch({
  //     type: "GETCONFIRMCHECKOUTCUSTOMER",
  //     payload: { id: item?.customerId, hostel_id: item?.Hostel_Id },
  //   });
  // }

  const handleCheckoutGenrateNew = (item) => {
    // console.log("/tenant/final-settlement", item);
    navigate(`/tenant/final-settlement/${item?.apiCall?.customerId}`, {
      state: {
        data: item,
      },
    });
  };

  const handleClosefinal = () => {
    setFinalSettlePage(false);
  };
  const handleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    if (state.InvoiceList?.unableAddInvoiceDetailsError) {
      setBillLoading(false);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
      }, 3000);
    }
  }, [state.InvoiceList.unableAddInvoiceDetailsError]);

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSize((prev) => {
          const newSize = window.innerWidth >= 1440 ? 20 : 10;
          return prev !== newSize ? newSize : prev;
        });
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const handleChangeSelectOptions = (e) => {
    setView(e.target.value);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const current = container.scrollLeft;
      if (current === 0) {
        setIsScrolling(false);
        lastScrollLeftRef.current = current;
        return;
      }

      if (Math.abs(current - lastScrollLeftRef.current) < 2) {
        return;
      }
      if (current > lastScrollLeftRef.current) {
        setIsScrolling(true);
      } else {
        setIsScrolling(true);
      }

      lastScrollLeftRef.current = current;
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const statusStyles = {
    "Checked In": {
      bg: "#EFFFF2",
      text: "#038C3D",
    },
    Booked: {
      bg: "#E7F1FFB2",
      text: "#1E45E1",
    },
    "Notice Period": {
      bg: "#FFF4E5",
      text: "#F79009",
    },
    "Settlement Generated": {
      bg: "#FEE4E2",
      text: "#D92D20",
    },
  };

  const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <label
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-3 text-sm cursor-pointer bg-white"
      >
        <span
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <IoMdMenu className="text-[#28303F] text-xl cursor-grab" />
        </span>

        <input
          type="checkbox"
          checked={item.selected}
          className="w-4 h-4 accent-[#1E45E1] rounded"
          onChange={() => {
            setCustomizeItems((prev = []) =>
              prev.map((i) =>
                i.key === item.key ? { ...i, selected: !i.selected } : i,
              ),
            );
          }}
        />

        <span className="text-[#101828] text-base">{item.fieldName}</span>
      </label>
    );
  };

  const CustomStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      width: "100%",
      border: `1px solid ${state.hasValue ? "#1E45E1" : "#D1D5DB"}`,
      borderRadius: "8px",
      fontSize: "12px",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",
      backgroundColor: state.hasValue ? "#1E45E1" : "#fff",

      "&:hover": {
        borderColor: state.hasValue ? "#1E45E1" : "#D1D5DB",
      },
    }),

    singleValue: (base) => ({
      ...base,
      color: "#FFF",
      fontWeight: 500,
    }),

    option: (base, state) => {
      const isSelected = state.isSelected;

      return {
        ...base,
        position: "relative",
        fontSize: 13,
        padding: "6px 12px",
        // margin: "2px 10px",
        backgroundColor: isSelected
          ? "#EEF2FF"
          : state.isFocused
            ? "#F3F4F6"
            : "#fff",
        color: "#111827",
        cursor: "pointer",

        whiteSpace: "nowrap",
        overflow: "visible",

        paddingLeft: isSelected ? "9px" : "12px",

        ...(isSelected && {
          borderLeft: "3px solid #1E45E1",
          fontWeight: 500,
        }),
      };
    },

    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "6px 0",
      zIndex: 9999,
      width: "max-content",
      minWidth: "100%",
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      padding: 0,
      overflowY: "auto",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: "32px",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };
  const tabs = [
    { key: "1", label: "Tenants" },
    { key: "4", label: "Walk-in" },
    { key: "3", label: "Check-out" },
  ];

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const headerKeyMap = {
    "Profile Pic": "profilePic",
    "Full Name": "fullName",
    Status: "status",
    "Joining Date": "joiningDate",
    "Mobile No": "mobile",
    Floor: "floorName",
    Room: "roomName",
    Bed: "bedName",
    "Email ID": "emailId",
    "Booking Date": "bookingDate",
    "Monthly Rent": "monthlyRent",
    Advance: "advanceAmount",
    "Booking Amount": "bookingAmount",
  };

  const formattedData = (userListDetail?.tenants || []).map((row) => {
    const obj = {};

    (userListDetail?.tableHeaders || []).forEach((header, index) => {
      const key = headerKeyMap[header];
      const value = row[index];

      if (key) {
        obj[key] = value ?? "-";
      }
    });

    const apiData = row[row.length - 1];

    obj.apiCall = {
      customerId: apiData?.customerId || null,
      status: apiData?.status || null,
    };

    return obj;
  });

  // console.log("formattedData", formattedData);
  // console.log("userListDetail", userListDetail);

  const filterOptionsData = useSelector(
    (state) => state.UsersList?.Users?.filterOptions,
  );

  const selectOptions = [
    { value: "ALL", label: "All" },
    ...(filterOptionsData?.status?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || []),
  ];

  const monthOptions =
    filterOptionsData?.periods?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  useEffect(() => {
    const cols = state?.UsersList?.Users?.columnList || [];

    const formatted = cols.map((col) => ({
      ...col,
      key: col.fieldName,
      selected: col.selected,
    }));

    setCustomizeItems(formatted);
    setInitialCustomizeItems(formatted);
  }, [state?.UsersList?.Users?.columnList]);

  // console.log("statusfilter", statusfilter);

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  // useEffect(() => {
  //   console.log("formattedData", formattedData);
  // }, [formattedData]);

  const columnStyles = {
    "Profile Pic": "px-4 whitespace-nowrap",
    "Full Name": "px-4 whitespace-nowrap",
    Status: "px-4",
    "Joining Date": "px-4 whitespace-nowrap",
    "Mobile No": "px-4 whitespace-nowrap",
    Floor: "px-4",
    Room: "px-4",
    Bed: "px-4",
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_TENANT_TABLE_FILTERS",
        payload: {
          status: [],
          tenantStatusLabel: [],
          search: "",
          period: [],
          periodLabel: [],
          sharingType: "",
          sharingTypeLabel: "",
        },
      });
    };
  }, [state.login.selectedHostel_Id]);

  const handleReset = () => {
    dispatch({
      type: "SET_TENANT_TABLE_FILTERS",
      payload: {
        status: [],
        tenantStatusLabel: [],
        search: "",
        period: [],
        periodLabel: [],
        sharingType: "",
        sharingTypeLabel: "",
      },
    });
    dispatch({
      type: "USERLIST",
      payload: {
        hostel_id: state.login.selectedHostel_Id,
        page: page,
        size: size,
      },
    });
    setStatusFilter("ALL");
    setChips([]);
    setSelectedMonth("");
    setFilterInput("");
  };

  useEffect(() => {
    const tenantFilters = state.UsersList?.tenantFilters;
    const filterData = [];
    if (
      tenantFilters?.status?.length &&
      !tenantFilters.status.includes("ALL")
    ) {
      filterData.push({
        key: "status",
        label: "Status is",
        type: "status",
        value:
          tenantFilters.tenantStatusLabel?.join(", ") ||
          tenantFilters.status.join(", "),
      });
    }

    if (tenantFilters?.search) {
      filterData.push({
        key: "search",
        label: "Tenant",
        type: "search",
        value: tenantFilters.search,
      });
    }

    if (
      tenantFilters?.period &&
      tenantFilters.period !== "" &&
      !(
        Array.isArray(tenantFilters.period) && tenantFilters.period.length === 0
      )
    ) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "period",
        value: tenantFilters.periodLabel || tenantFilters.period,
      });
    }

    if (tenantFilters?.sharingType) {
      filterData.push({
        key: "sharingType",
        label: "Sharing Type",
        type: "sharingType",
        value: tenantFilters.sharingTypeLabel || tenantFilters.sharingType,
      });
    }

    setChips(filterData);
  }, [state.UsersList?.tenantFilters]);

  const getLeftOffset = (index) => {
    let left = 80;

    for (let i = 0; i < index; i++) {
      left += 150;
    }
    return left;
  };

  const handleSave = () => {
    setError("");
    const hasSelected = customizeItems.some((item) => item.selected);
    if (!hasSelected) {
      setError("Please select at least one column");
      return;
    }
    const payload = customizeItems.map((item, index) => ({
      fieldName: item.key,
      isSelected: item.selected,
      order: index + 1,
    }));

    if (payload) {
      dispatch({
        type: "CUSTOMIZE_TENANT_COLUMNS_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customize: payload,
        },
      });
      setCustomizeLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.successTenantCustomizeColumns === 200) {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setOpen(false);
      setCustomizeLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_CUSTOMIZE_TENANT_COLUMNS_REDUCER" });
      }, 100);
    }
  }, [state.UsersList?.successTenantCustomizeColumns]);

  const currentPage = state?.UsersList?.Users?.currentPage ?? 1;

  const totalPages = state?.UsersList?.Users?.totalPages ?? 1;

  const totalRecords = state?.UsersList?.Users?.totalCustomers ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  return (
    <div className=" bg-white font-gilroy ">
      {userList && (
        <div className="font-gilroy font-medium text-base relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[9999]">
              <div className="w-[40px] h-[40px] rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin" />
            </div>
          )}

          <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
            <div className="flex gap-6">
              {tabs?.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleChange(tab.key)}
                  className={`text-[16px] font-medium font-gilroy pb-1 border-b-2 transition
            ${
              value === tab.key
                ? "text-[#222222] border-[#1E45E1]"
                : "text-[#4B4B4B] border-transparent"
            }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {value === "1" && (
                <div className="relative min-w-[180px] max-w-[260px]">
                  <div
                    className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
    ${
      canReadTenant
        ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
        : "border-gray-200 opacity-60 cursor-not-allowed"
    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={filterInput}
                      onChange={handlefilterInput}
                      disabled={!canReadTenant}
                      className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
                    />
                    <SearchNormal1
                      size="18"
                      color={canReadTenant ? "#6B7280" : "#A0A0A0"}
                      className="mr-2"
                    />
                  </div>
                </div>
              )}

              {value === "4" && (
                <>
                  <button
                    disabled={!canWriteWalkin}
                    onClick={handleShow}
                    className="bg-[#1E45E1] text-white text-sm font-semibold rounded-lg px-4 py-2 whitespace-nowrap disabled:opacity-50"
                  >
                    + Walk-In
                  </button>
                </>
              )}

              {value === "1" && (
                <div className="relative flex" ref={dropdownRef}>
                  <button
                    disabled={!canWriteWalkin}
                    onClick={() => handleShowAddTenant(false)}
                    className="bg-[#1E45E1] text-white flex items-center gap-1 text-sm font-semibold rounded-l-lg px-4 py-2 whitespace-nowrap disabled:opacity-50"
                  >
                    <AddCircle size="16" />
                    Add Tenant
                  </button>

                  <button
                    disabled={!canWriteWalkin}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="bg-[#1E45E1] border-l border-[#4B6BEE] text-white px-2 rounded-r-lg flex items-center justify-center disabled:opacity-50"
                  >
                    {showDropdown ? (
                      <ArrowUp2 size="16" />
                    ) : (
                      <ArrowDown2 size="16" />
                    )}
                  </button>

                  {showDropdown && (
                    <div
                      className="fixed  right-10 top-16 w-56 z-50
                     bg-white rounded-lg shadow-lg border border-[#E5E7EB]  "
                    >
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleShowAddTenant(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F7FF]  rounded-t-lg"
                      >
                        New Tenant
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          // handleShowAddShortStay?.();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F7FF]"
                      >
                        New Tenant (Shortstay)
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleShowAddTenant(true);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F7FF]"
                      >
                        Booking
                      </button>

                      {/* <button
                        onClick={() => {
                          setShowDropdown(false);
                          // handleEnquiry?.();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F7FF] rounded-b-lg"
                      >
                        Enquiry
                      </button> */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {value === "1" && (
            <>
              {!canReadTenant ? (
                <PermissionDeniedMessage />
              ) : (
                <div className="">
                  <div className="w-full my-2 bg-[#F9F9F9] rounded-xl px-6 py-3 flex items-center gap-24 font-gilroy ">
                    {stats?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {item.highlight && (
                          <div className="w-10 h-10 rounded-full bg-[#FFEFE5] flex items-center justify-center text-[#F97316] font-semibold">
                            {item.icon && (
                              <ArrowDown
                                color="#FF9500"
                                size="18"
                                className="rotate-[310deg]"
                              />
                            )}
                          </div>
                        )}

                        <div>
                          <div className="text-xs text-[#6B7280] flex items-center gap-1">
                            {item.label}
                          </div>

                          <div className="text-lg font-semibold text-[#111827]">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-40  bg-white h-[40px]">
                    <div className="flex flex-wrap items-center gap-3">
                      <div
                        className={`border border-gray-300 rounded-lg w-36 ${
                          statusfilter
                            ? "bg-gray-100 text-gray-700"
                            : "bg-white"
                        }`}
                      >
                        <Select
                          options={selectOptions}
                          styles={CustomStyles}
                          isDisabled={!canReadTenant}
                          menuPlacement="auto"
                          classNamePrefix="custom"
                          onChange={(e) => handleStatusFilter(e)}
                          value={
                            selectOptions.find(
                              (opt) => opt.value === statusfilter,
                            ) || null
                          }
                          id="statusselect"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <Select
                          isDisabled={!canReadTenant}
                          options={monthOptions}
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No options"}
                          styles={CustomStyles}
                        />
                      </div>

                      <div
                        className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                      >
                        <Filter
                          size={16}
                          onClick={() => {
                            if (canReadTenant) {
                              setIsFilterOpen(true);
                            }
                          }}
                          className={`transition-opacity duration-300 ${
                            canReadTenant
                              ? "cursor-pointer opacity-100 pointer-events-auto"
                              : "cursor-not-allowed opacity-40 pointer-events-none"
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={` flex items-center justify-end gap-2 mr-2 `}
                    >
                      <button
                        disabled
                        className="relative disabled:opacity-50 disabled:cursor-not-allowed  "
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                          }}
                          className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 bg-gray-100 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {(() => {
                            const SelectedIcon = ListOptions.find(
                              (item) => item.key === view,
                            )?.img;
                            return SelectedIcon ? (
                              <SelectedIcon size="18" color="#4B4B4B" />
                            ) : null;
                          })()}

                          <span className="text-sm text-gray-700">{view}</span>

                          <ArrowDown2
                            size="16"
                            color="#4B4B4B"
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {isOpen && (
                          <div
                            ref={listRef}
                            className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-[9999]"
                          >
                            {ListOptions.map((item) => {
                              const Icon = item.img;

                              return (
                                <div
                                  key={item.key}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setView(item.key);
                                    setIsOpen(false);
                                  }}
                                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                                    view === item.key
                                      ? "bg-[#F7FAFF] font-medium "
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`flex items-center gap-2 px-1 text-sm cursor-pointer hover:bg-gray-100 ${
                                      view === item.key
                                        ? "bg-[#F7FAFF] font-medium border-l-4 border-[#1E45E1] rounded-sm"
                                        : ""
                                    }`}
                                  >
                                    <Icon size="16" color="#4B4B4B" />
                                    {item.label}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </button>
                      <div>
                        <Setting3
                          onClick={() => setOpen(!open)}
                          className="cursor-pointer"
                          size="22"
                          color="#4B4B4B"
                        />
                      </div>

                      {formattedData?.length > 0 && (
                        <ApiPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalRecords={totalRecords}
                          onPageChange={handlePageChange}
                          onSizeChange={handleSizeChange}
                          isTenantPagination={true}
                          size={size}
                        />
                      )}
                    </div>
                  </div>
                  {chips?.length > 0 && (
                    <div className="flex flex-wrap items-start gap-3 p-3 mx-3 mt-3 mb-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex flex-wrap gap-2 flex-1">
                        {chips.map((chip) => (
                          <span
                            key={chip.key}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 bg-blue-100 text-gray-800 flex-shrink-0"
                          >
                            {chip.label} :
                            <span className="text-gray-900">{chip.value}</span>
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-blue-600 text-sm font-medium cursor-pointer"
                        onClick={handleReset}
                      >
                        Reset
                      </span>
                    </div>
                  )}
                  {formattedData?.length > 0 ? (
                    <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        ref={tableContainerRef}
                        className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                      >
                        <table className=" w-full font-gilroy ">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                            <tr className="h-9">
                              {selectedColumns?.map((col, index) => {
                                let stickyClass = "";

                                if (index === 0) {
                                  stickyClass =
                                    "sticky left-[0px] z-40 bg-[#F9FAFB] w-[80px]";
                                }
                                //  else if (index === 1) {
                                //   stickyClass =
                                //     "sticky left-[80px] z-40 bg-[#F9FAFB]";
                                // }

                                return (
                                  <th
                                    key={col.key}
                                    className={`px-4 py-2.5 uppercase whitespace-nowrap text-start ${stickyClass}`}
                                  >
                                    {col.fieldName}
                                  </th>
                                );
                              })}

                              <th className="px-4 py-2.5 uppercase sticky right-0 z-20 bg-[#F9FAFB] text-center">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(formattedData) &&
                              formattedData?.length > 0 &&
                              formattedData?.map((user, index) => {
                                return (
                                  <tr
                                    onClick={() =>
                                      handleRoomDetailsPage(user?.apiCall)
                                    }
                                    key={user?.apiCall?.customerId || index}
                                    className="text-sm font-gilroy border-b border-[#E8E8E8] h-10 
                                    cursor-pointer group  hover:!bg-gray-50"
                                  >
                                    {selectedColumns?.map((col, index) => {
                                      const baseClass = `
  ${columnStyles[col.fieldName] || "px-4"}
  hover:!bg-gray-50 group-hover:!bg-gray-50 whitespace-nowrap text-[14px]
`;

                                      let stickyClass = "";

                                      if (index === 0) {
                                        stickyClass = `sticky left-[0px] z-20  w-[80px] ${
                                          isScrolling
                                            ? "!bg-white"
                                            : "!bg-white"
                                        }`;
                                      }
                                      // else if (index === 1) {
                                      //   stickyClass = `sticky left-[85px] z-30 ${
                                      //     isScrolling
                                      //       ? "!bg-white"
                                      //       : "!bg-transparent"
                                      //   }`;
                                      // }

                                      const finalClass = `${baseClass} ${stickyClass}`;

                                      switch (col.fieldName) {
                                        case "Profile Pic":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`px-4 ${finalClass}`}
                                            >
                                              {typeof user?.profilePic ===
                                                "string" &&
                                              user.profilePic.startsWith(
                                                "http",
                                              ) ? (
                                                <img
                                                  src={user.profilePic}
                                                  className="w-8 h-8 rounded-full"
                                                  alt="profile"
                                                />
                                              ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                                  {typeof user?.profilePic ===
                                                  "string"
                                                    ? user.profilePic
                                                    : "NA"}
                                                </div>
                                              )}
                                            </td>
                                          );

                                        case "Full Name":
                                          return (
                                            <td
                                              key={col.key}
                                              className={finalClass}
                                            >
                                              <div className="relative group w-[100px] ">
                                                <span className="block w-full truncate text-sm text-[#111928] ">
                                                  {user.fullName}
                                                </span>

                                                <div
                                                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2
        hidden group-hover:!block
       bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
        z-[9999] pointer-events-none"
                                                >
                                                  {user?.fullName}
                                                </div>
                                              </div>
                                            </td>
                                          );

                                        case "Status":
                                          return (
                                            <td
                                              key={col.key}
                                              className={finalClass}
                                            >
                                              <span
                                                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                                                style={{
                                                  backgroundColor:
                                                    statusStyles[user.status]
                                                      ?.bg || "#EEE",
                                                }}
                                              >
                                                <span
                                                  className="h-2 w-2 rounded-full"
                                                  style={{
                                                    backgroundColor:
                                                      statusStyles[user.status]
                                                        ?.text || "#333",
                                                  }}
                                                ></span>

                                                {user.status}
                                              </span>
                                            </td>
                                          );

                                        case "Joining Date":
                                          return (
                                            <td
                                              key={col.key}
                                              className={`${finalClass} truncate text-[#6B7280] font-medium`}
                                            >
                                              {user.joiningDate}
                                            </td>
                                          );

                                        case "Mobile No":
                                          return (
                                            <td
                                              key={col.key}
                                              className={finalClass}
                                            >
                                              {user.mobile}
                                            </td>
                                          );

                                        case "Floor":
                                          return (
                                            <td
                                              key={col.key}
                                              className={finalClass}
                                            >
                                              {user.floorName}
                                            </td>
                                          );

                                        case "Room":
                                          return (
                                            <td
                                              key={col.key}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.roomName}
                                            </td>
                                          );

                                        case "Bed":
                                          return (
                                            <td
                                              key={col.key}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.bedName}
                                            </td>
                                          );
                                        case "Email ID":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.emailId}
                                            </td>
                                          );
                                        case "Booking Date":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.bookingDate}
                                            </td>
                                          );
                                        case "Monthly Rent":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.monthlyRent}
                                            </td>
                                          );
                                        case "Advance":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.advanceAmount}
                                            </td>
                                          );
                                        case "Booking Amount":
                                          return (
                                            <td
                                              key={col.fieldName}
                                              className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                            >
                                              {user.bookingAmount}
                                            </td>
                                          );
                                        default:
                                          return (
                                            <td
                                              key={col.key}
                                              className={finalClass}
                                            >
                                              {typeof user[
                                                headerKeyMap[col.fieldName]
                                              ] === "object"
                                                ? "-"
                                                : (user[
                                                    headerKeyMap[col.fieldName]
                                                  ] ?? "-")}
                                            </td>
                                          );
                                      }
                                    })}

                                    <td
                                      className={`${
                                        isScrolling ? "!bg-white" : "bg-white"
                                      } px-4 py-1 sticky right-0 !z-20 hover:!bg-gray-50 group-hover:!bg-gray-50 text-[#111928]`}
                                    >
                                      {" "}
                                      <div
                                        className="relative mt-1 flex cursor-pointer items-center justify-center"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleShowDots(
                                            user.apiCall.customerId,
                                            e,
                                          );
                                        }}
                                      >
                                        <PiDotsThreeOutlineVerticalFill
                                          className={`h-5 w-5 rotate-90 ${
                                            activeRow ===
                                            user?.apiCall?.customerId
                                              ? "text-[#1E45E1]"
                                              : "text-gray-500"
                                          }`}
                                        />

                                        {activeRow ===
                                          user?.apiCall?.customerId && (
                                          <div
                                            ref={popupRef}
                                            className="  rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] px-2  max-w-[200px] shadow-md z-[9999]"
                                            style={{
                                              top: showAbove
                                                ? popupPosition.top -
                                                  (popupRef.current
                                                    ?.offsetHeight || 120) -
                                                  10
                                                : popupPosition.top + 5,
                                              left: popupPosition.left - 250,
                                              position: "fixed",
                                              zIndex: 1000,
                                            }}
                                          >
                                            <div className="flex flex-col py-2 ">
                                              {user.status === "Checked In" && (
                                                <>
                                                  <div
                                                    onClick={() =>
                                                      canWriteCheckout &&
                                                      handleCustomerCheckout(
                                                        user,
                                                      )
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteCheckout ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      className={`h-4 w-4 ${!canWriteCheckout && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Move to Notice Period
                                                    </span>
                                                  </div>

                                                  <div
                                                    onClick={() =>
                                                      canWriteTenant &&
                                                      handleCustomerReAssign(
                                                        user,
                                                      )
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteTenant ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={Addbook}
                                                      className={`h-4 w-4 ${!canWriteTenant && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Change Bed
                                                    </span>
                                                  </div>
                                                </>
                                              )}

                                              {user.status ===
                                                "Notice Period" && (
                                                <>
                                                  <div
                                                    onClick={() =>
                                                      canWriteTenant &&
                                                      handleBacktoCheckout(user)
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteTenant ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={Addbook}
                                                      className={`h-4 w-4 ${!canWriteTenant && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Cancel Check-Out
                                                    </span>
                                                  </div>

                                                  <div
                                                    onClick={() =>
                                                      canWriteCheckout &&
                                                      handleCheckoutGenrateNew(
                                                        user,
                                                      )
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteCheckout ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={logout}
                                                      className={`h-4 w-4 ${!canWriteCheckout && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy">
                                                      Generate
                                                    </span>
                                                  </div>
                                                </>
                                              )}

                                              {user.status ===
                                                "Settlement Generated" && (
                                                <div
                                                  onClick={() =>
                                                    canWriteCheckout &&
                                                    handleConformCheckout(user)
                                                  }
                                                  className={`flex items-center gap-2  px-3 py-2 transition rounded-md min-w-[150px]
                ${canWriteCheckout ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  style={{ marginLeft: 12 }}
                                                >
                                                  <img
                                                    src={logout}
                                                    className={`h-4 w-4 ${!canWriteCheckout && "grayscale"}`}
                                                  />
                                                  <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                    Check-Out
                                                  </span>
                                                </div>
                                              )}

                                              {user.status === "Booked" && (
                                                <>
                                                  <div
                                                    onClick={() =>
                                                      canWriteTenant &&
                                                      handleBookingAssign(user)
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteTenant ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      className={`h-4 w-4 ${!canWriteTenant && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Check-In
                                                    </span>
                                                  </div>

                                                  <div
                                                    onClick={() =>
                                                      canWriteBooking &&
                                                      handleInActive(user)
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteBooking ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      src={Addbook}
                                                      className={`h-4 w-4 ${!canWriteBooking && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Make as Inactive
                                                    </span>
                                                  </div>
                                                </>
                                              )}

                                              {user.status === "Draft" && (
                                                <div
                                                  onClick={() =>
                                                    canWriteTenant &&
                                                    handleShowDraftTenant(user)
                                                  }
                                                  className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteTenant ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                >
                                                  <img
                                                    src={Addbook}
                                                    className={`h-4 w-4 ${!canWriteTenant && "grayscale"}`}
                                                  />
                                                  <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                    Draft Continue
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>

                        {open && (
                          <>
                            <div
                              className="fixed inset-0 bg-black/20 z-50 "
                              onClick={() => setOpen(false)}
                            />

                            <div
                              className={`
        fixed top-[180px] right-10 h-fit w-[350px]
        bg-white z-50
        border-r border-[#E5E7EB]
        shadow-xl  rounded-xl border border-[#E5E7EB] shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
                            >
                              <div className="relative">
                                <div className="p-3 border-b ">
                                  <div className="flex items-center gap-2 justify-between mb-2">
                                    <div className="text-[16px] text-[#333333] font-semibold ">
                                      Customize Tabs{" "}
                                    </div>
                                    <div
                                      onClick={() => {
                                        setCustomizeItems((prev) =>
                                          prev.map((i) => ({
                                            ...i,
                                            selected: !allSelected,
                                          })),
                                        );

                                        setError("");
                                      }}
                                      className="text-[#338BFF] text-[13px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      {" "}
                                      <TiTick className="text-[#338BFF] text-[13px] font-semibold cursor-pointer" />{" "}
                                      <span>
                                        {allSelected
                                          ? "Unselect all"
                                          : "Select all"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                                    <SearchNormal1 size={16} color="#98A2B3" />
                                    <input
                                      value={searchText}
                                      onChange={(e) =>
                                        setSearchText(e.target.value)
                                      }
                                      placeholder="Search"
                                      className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
                                    />
                                  </div>
                                </div>

                                <DndContext
                                  collisionDetection={closestCenter}
                                  onDragEnd={(event) => {
                                    const { active, over } = event;
                                    if (!over) return;
                                    if (active.id !== over?.id) {
                                      const oldIndex = customizeItems.findIndex(
                                        (i) => i.key === active.id,
                                      );
                                      const newIndex = customizeItems.findIndex(
                                        (i) => i.key === over.id,
                                      );

                                      setCustomizeItems(
                                        arrayMove(
                                          customizeItems,
                                          oldIndex,
                                          newIndex,
                                        ),
                                      );
                                    }
                                  }}
                                >
                                  <SortableContext
                                    items={customizeItems.map((i) => i.key)}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    <div className="max-h-[220px] overflow-y-auto px-3 py-2 space-y-2 show-scrolls">
                                      {filteredCustomizeItems.length === 0 ? (
                                        <div className="text-sm text-gray-400 text-center py-3">
                                          No results found
                                        </div>
                                      ) : (
                                        filteredCustomizeItems.map((item) => (
                                          <SortableItem
                                            key={item.key}
                                            item={item}
                                          />
                                        ))
                                      )}
                                    </div>
                                  </SortableContext>
                                </DndContext>
                              </div>
                              {error && (
                                <div className="flex justify-center my-2">
                                  <ErrorMessage
                                    message={error}
                                    type="warning"
                                  />
                                </div>
                              )}

                              <div className="p-3 border-t flex gap-2">
                                <button
                                  onClick={handleResetCustomize}
                                  className="flex-1 py-2 text-sm border rounded-lg text-[#344054]"
                                >
                                  Reset
                                </button>
                                <button
                                  onClick={handleSave}
                                  disabled={customizeLoading}
                                  className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg disabled:opacity-70"
                                >
                                  {customizeLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      Saving...
                                    </div>
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage
                      label="Tenants"
                      isSearching={isSearching}
                      isClearSearch={true}
                      handleClear={() => {
                        setFilterInput("");
                      }}
                    />
                  )}
                </div>
              )}

              {customerReassign === true ? (
                <ChangeBedTenantWay
                  customerReassign={customerReassign}
                  setCustomerReAssign={setCustomerReAssign}
                  reAssignDetail={reAssignDetail}
                />
              ) : null}

              {customerCheckoutpage === true ? (
                <MoveToNoticePGAndTenant
                  customerCheckoutpage={customerCheckoutpage}
                  setCustomerCheckoutpage={setCustomerCheckoutpage}
                  // uniqueostel_Id={uniqueostel_Id}
                  bedData={customercheckoutdata}
                />
              ) : null}
            </>
          )}

          {value === "3" && (
            <UserlistCheckout
              id={props.id}
              uniqueostel_Id={uniqueostel_Id}
              setUniqostel_Id={setUniqostel_Id}
              // filteredUsers={filteredUsers}
              filterInput={filterInput}
              setAddCheckoutForm={setAddCheckoutForm}
              checkoutaddform={checkoutaddform}
              search={search}
              checkoutDateRange={checkoutDateRange}
              filterStatus={filterStatus}
              resetPage={resetPage}
              setResetPage={setResetPage}
            />
          )}

          {value === "4" && (
            <UserlistWalkin
              id={props.id}
              // customerrolePermission={customerrolePermission}
              // customerWalkInAddPermission={customerWalkInAddPermission}
              uniqueostel_Id={uniqueostel_Id}
              setUniqostel_Id={setUniqostel_Id}
              // filteredUsers={filteredUsers}
              filterInput={filterInput}
              search={search}
              walkinDateRange={walkinDateRange}
              filterStatus={filterStatus}
              resetPage={resetPage}
              setResetPage={setResetPage}
            />
          )}
        </div>
      )}

      {isFilterOpen && (
        <TenantListFilter
          show={isFilterOpen}
          handleClose={handleCloseFilter}
          size={size}
          page={page}
        />
      )}
      <CheckOutForm
        show={checkoutForm}
        handleClose={checkoutcloseModal}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
        setAddCheckoutForm={setAddCheckoutForm}
        checkoutaddform={checkoutaddform}
      />

      <UserlistWalkinForm
        show={walkInForm}
        handleClose={walkinFormcloseModal}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        backdrop="static"
        centered
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header
          style={{
            borderBottom: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "12px 16px",
          }}
        >
          <h5
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              fontWeight: 600,
              color: "#222222",
              margin: 0,
              textAlign: "center",
            }}
          >
            Delete Tenant?
          </h5>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this Tenant?
        </Modal.Body>
        {formLoading && (
          <div
            style={{
              position: "absolute",
              top: 70,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: "4px solid #1E45E1",
                borderRight: "4px solid transparent",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
        >
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleDeleteCustomer}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {inactiveForm && (
        <MakeAsInactive
          show={inactiveForm}
          handleCloseInActive={handleCloseInActive}
          inActiveDetails={inActiveDetails}
        />
      )}

      {showMenu && (
        <AddCustomer showMenu={showMenu} handleClose={handleCloseAddCustomer} />
      )}

      {showMenuNewTenant && (
        <AddTenant
          showMenu={showMenuNewTenant}
          handleClose={handleCloseAddTenant}
          alreadySaveDraftTenantDetails={DraftTenantDetails}
          bookingOnly={bookingOnly}
        />
      )}

      {/* {BookingAssignForm && (
        <BookedCheckIn
          BookingAssignForm={BookingAssignForm}
          handleClose={handleCloseBooking}
          bookingDetails={EditObj}
        />
      )} */}

      {BookingAssignForm && (
        <BookingToCheckin
          show={BookingAssignForm}
          handleClose={handleCloseBooking}
          tenantDetails={EditObj}
        />
      )}

      {bactocheckinForm && (
        <BackToCheckIn
          show={bactocheckinForm}
          handleClose={handleCloseBackToCheckIn}
          checkInDetails={EditObj}
        />
      )}

      {(advanceForm || showAssignMenu) && (
        <UserlistForm
          // setShowMenu={setShowMenu}
          advanceForm={advanceForm}
          // showMenu={showMenu}
          showAssignMenu={showAssignMenu}
          setShowAssignMenu={setShowAssignMenu}
          displayDetail={addBasicDetail}
          setAdvanceForm={setAdvanceForm}
          handleShow={handleShow}
          edit={edit}
          setEdit={setEdit}
          EditObj={EditObj}
          setEditObj={setEditObj}
          handleMenuClick={handleMenuClick}
          setShowForm={setShowForm}
          showForm={showForm}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}

          // bactocheckinForm={bactocheckinForm}
          // setBacktoCheckInForm={setBacktoCheckInForm}
        />
      )}

      {finalsettlepage && (
        <FinalOld
          show={finalsettlepage}
          data={finalsettledData}
          handleClose={handleClosefinal}
        />
      )}

      {add_bookingshow && (
        <Addbooking
          add_bookingshow={add_bookingshow}
          userDetail={userDetail}
          setAddBookingsShow={setAddBookingsShow}
          handleCloseAddBooking={handleCloseAddBooking}
          bookingDet={bookingDet}
        />
      )}
      {DueCustomerShow && (
        <DueCustomerConfirmCheckout
          show={DueCustomerShow}
          data={CheckOutDetails}
          handleClose={handleCloseDuePopup}
        />
      )}
    </div>
  );
}

UserList.propTypes = {
  id: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  makeasinactive: PropTypes.func.isRequired,
  handleCloseBed: PropTypes.func.isRequired,
  customer_details: PropTypes.func.isRequired,
};
export default withErrorBoundary(UserList);
