/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import ChangeBedTenantWay from "./ChangeBedTenantWay";
import { AddCircle, ArrowDown2, ArrowUp2, Trash } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import UserlistCheckout from "./UserlistCheckout";
import UserlistWalkin from "./UserlistWalkin";
import CheckOutForm from "./UserListCheckoutForm";
import UserlistWalkinForm from "./UserlistWalkinForm";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import MoveToNoticePGAndTenant from "./MoveToNoticePGAndTenant";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Addbook from "../../Assets/Images/New_images/calendar-tick.svg";
import logout from "../../Assets/Images/New_images/logout.png";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";
import AddCustomer from "../PayingGuestFile/AddCustomerPG";
import MakeAsInactive from "./MakeAsInactive";
import ErrorMessage from "../../Components/ErrorMessage";
import BackToCheckIn from "./BackToCheckIn";
import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import { Filter, Setting3, SearchNormal1, ArrowDown } from "iconsax-react";
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
import TenantListFilter from "./TenantListFilter";
import ApiPagination from "../../Components/ApiPagination";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import AddTenant from "../PayingGuestFile/AddTenant";
import BookingToCheckin from "./BookingToCheckin";
import DeleteDraftTenant from "./DeleteDraftTenant";

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

function UserList(props) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [chips, setChips] = useState([]);
  dayjs.extend(isBetween);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const [BookingAssignForm, setBookingAssignForm] = useState(false);
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuNewTenant, setShowMenuNewTenant] = useState(false);
  const [deleteDraftTenant, setDeleteDraftTenant] = useState(false);
  const [bookingOnly, setBookingOnly] = useState(false);
  const [EditObj, setEditObj] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [reAssignDetail, setReasignDetail] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");
  const [selectedMonth, setSelectedMonth] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [checkoutaddform, setAddCheckoutForm] = useState(true);
  const [id, setId] = useState("");
  const [filterStatus, setFilterStatus] = useState(false);
  const location = useLocation();
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  // const [view, setView] = useState("List");
  const [isOpen, setIsOpen] = useState(false);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [DraftTenantDetails, setDraftTenantDetails] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    canWriteModule: canWriteTenant,
    canReadModule: canReadTenant,
    canDeleteModule: canDeleteTenant,
  } = useHasPermission("Customers");
  const { canWriteModule: canWriteWalkin } = useHasPermission("Walk in");
  const {
    canWriteModule: canWriteCheckout,
    canUpdateModule: canUpdateCheckout,
  } = useHasPermission("Checkout");

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");
  const isTenantForm = location.state?.isTenantForm || false;
  const isCheckoutWay = location.state?.isCheckoutWay || false;
  const isSearching = chips.length > 0 || filterInput?.trim() !== "";
  const [debouncedInput, setDebouncedInput] = useState(filterInput);
  const [statusfilter, setStatusFilter] = useState("ALL");
  const [userListDetail, setUserListDetail] = useState([]);

  const [search, setSearch] = useState(false);
  const [userList, setUserList] = useState(true);
  const [resetPage, setResetPage] = useState(false);
  const [checkoutForm, setcheckoutForm] = useState(false);
  const [walkInForm, setWalkinForm] = useState(false);
  const [inActiveDetails, setInactiveDetails] = useState("");

  const [inactiveForm, setInActiveForm] = useState(false);
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false);
  const [DueCustomerShow, setDueCustomerShow] = useState(false);
  const [CheckOutDetails, setCheckOutDetails] = useState("");

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleStatusFilter = (selected) => {
    setStatusFilter(selected?.value || "");
  };

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

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

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      if (value === "3") {
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
    const tenantFilters = state.UsersList?.tenantFilters;
    // console.log("tenantFilters", tenantFilters);
    const statusValue1 = statusfilter === "ALL" ? "" : statusfilter;
    const statusValue2 = tenantFilters?.status?.includes("ALL")
      ? ""
      : tenantFilters?.status || [];

    const shouldResetPage =
      !!debouncedInput || !!statusValue1 || !!selectedMonth?.value;
    if (state.login.selectedHostel_Id && value === "1") {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          name: debouncedInput || tenantFilters?.search,
          type: statusValue1 || statusValue2,
          page: shouldResetPage ? 1 : page,
          size: size,
          period: selectedMonth?.value || tenantFilters?.period,
          sharingType: tenantFilters?.sharingType,
          sharingTypeLabel: tenantFilters?.sharingTypeLabel,
        },
      });

      setLoading(true);
    }

    const filters = {
      search: debouncedInput || tenantFilters?.search,
      status: statusValue1 || statusValue2,
      tenantStatusLabel: statusValue1 || statusValue2,
      period: selectedMonth?.value || tenantFilters?.period,
      periodLabel: selectedMonth?.label || tenantFilters?.periodLabel,
      sharingType: tenantFilters?.sharingType,
      sharingTypeLabel: tenantFilters?.sharingTypeLabel,
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
    if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {
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

  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);
    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode]);

  useEffect(() => {
    setUniqostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.Users) {
      setLoading(false);
      setIsFilterOpen(false);
      setUserListDetail(state.UsersList?.Users);
      dispatch({ type: "REMOVE_STATUS_CODE_USER" });
    }
  }, [state.UsersList?.Users]);

  useEffect(() => {
    if (!isEditing) {
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    }
  }, [isEditing]);

  useEffect(() => {
    if (state.UsersList.userProfilebill) {
      dispatch({ type: "USERPROFILEBILLFALSE" });
    }
  }, [state.UsersList.userProfilebill]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });

      setLoading(false);
      setIsEditing(false);
      // setRoomDetail(true);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceEditStatusCode]);

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
    if (state.UsersList?.getWalkInStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode === 201) {
      setUserListDetail([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 1000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 2000);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);

  useEffect(() => {
    if (state.Booking.statusCodeGetBooking === 200) {
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

  useEffect(() => {
    if (filterInput.trim() === "") {
      setDebouncedInput("");

      dispatch({
        type: "SET_TENANT_TABLE_FILTERS",
        payload: {
          ...state.UsersList?.tenantFilters,
          search: "",
        },
      });
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedInput(filterInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterInput]);

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

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode) {
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 2000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

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

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

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

  useEffect(() => {
    dispatch({ type: "AMENITESNAMES" });
  }, []);

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

  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_KYC_VALIDATE_SATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.kycValidateSendOtpSuccess]);

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

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
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
    if (state.UsersList?.deleteDraftTenantSuccessCode === 204) {
      setDeleteDraftTenant(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });

      dispatch({ type: "REMOVE_DELETE_DRAFT_TENANT_REDUCER" });
    }
  }, [state.UsersList?.deleteDraftTenantSuccessCode]);

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

  useEffect(() => {
    if (state.InvoiceList?.unableAddInvoiceDetailsError) {
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

  const handleResetCustomize = () => {
    setCustomizeItems([...initialCustomizeItems]);
    setError("");
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

  const handlefilterInput = (e) => {
    const searchValue = e.target.value;
    setFilterInput(searchValue);
  };

  // const isDev = import.meta.env.MODE === "development";

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

  const handleShow = (u) => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding customer information.", {
        hideProgressBar: true,
        autoClose: 1500,

        className: "text-black font-gilroy border-b-4 border-red-500",
      });
      return;
    }

    setShowMenu(true);
    setAddCheckoutForm(false);

    setEditObj(u);
  };

  const handleShowAddTenant = (isWhat) => {
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

  const handleDeleteTenant = (user) => {
    setDeleteDraftTenant(true);
    setDraftTenantDetails(user.apiCall?.customerId);
  };

  const handleCloseDeleteDraftTenant = () => {
    setDeleteDraftTenant(false);
  };

  const handleChange = (key) => {
    setValue(key);
    setSearch(false);

    setFilterInput("");
    setFilterStatus("");
  };

  const handleRoomDetailsPage = (userData) => {
    setId(userData?.customerId);

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

  const handleCloseAddBooking = () => {
    setUserList(true);
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

  const amenities = state.UsersList?.amnetieshistory;

  if (amenities) {
    amenities.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  const handleInActive = (item) => {
    setInActiveForm(true);

    setInactiveDetails(item);
  };

  const handleCloseInActive = () => {
    if (typeof props?.handleCloseBed === "function") {
      props.handleCloseBed();
    }
    dispatch({ type: "REMOVE_ERROR_MAKEASINACTIVE" });

    setInActiveForm(false);
  };

  const handleCloseBooking = () => {
    setBookingAssignForm(false);
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR_BOOKED" });
  };

  const handleBookingAssign = (book) => {
    setShowMenu(false);
    setBookingAssignForm(true);

    setAddCheckoutForm(false);

    setEditObj(book);
  };

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
    setShowMenu(false);
    setBookingAssignForm(false);

    setAddCheckoutForm(false);

    setEditObj(item);
    setBacktoCheckInForm(true);
  };

  const handleConformCheckout = (item) => {
    setDueCustomerShow(true);
    setCheckOutDetails(item);

    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      payload: { id: item.ID, hostel_id: item.Hostel_Id },
    });
  };
  const handleCloseDuePopup = () => {
    setDueCustomerShow(false);
  };

  const handleCheckoutGenrateNew = (item) => {
    navigate(`/tenant/final-settlement/${item?.apiCall?.customerId}`, {
      state: {
        data: item,
      },
    });
  };

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
  SortableItem.propTypes = {
    item: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      selected: PropTypes.bool.isRequired,
      fieldName: PropTypes.string.isRequired,
    }).isRequired,
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

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

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
                      {/* <button
                        disabled
                        className="relative disabled:opacity-50 disabled:cursor-not-allowed  "
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                          }}
                          className="flex items-center gap-2 border border-gray-300 rounded-lg 
                          px-3 py-1 bg-gray-100 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    // setView(item.key);
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
                      </button> */}
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
                                      canReadTenant &&
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
                                                      canUpdateCheckout &&
                                                      handleCustomerCheckout(
                                                        user,
                                                      )
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canUpdateCheckout ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      alt="image"
                                                      src={addcircle}
                                                      className={`h-4 w-4 ${!canUpdateCheckout && "grayscale"}`}
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
                                                      alt="image"
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
                                                      alt="image"
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
                                                      alt="image"
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
                                                    alt="image"
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
                                                      alt="image"
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
                                                      alt="image"
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
                                                <>
                                                  <div
                                                    onClick={() =>
                                                      canWriteTenant &&
                                                      handleShowDraftTenant(
                                                        user,
                                                      )
                                                    }
                                                    className={`flex items-center gap-2  px-3 py-2 transition rounded-md
                  ${canWriteTenant ? "cursor-pointer hover:bg-blue-100" : "cursor-not-allowed opacity-60"}`}
                                                  >
                                                    <img
                                                      alt="image"
                                                      src={Addbook}
                                                      className={`h-4 w-4 ${!canWriteTenant && "grayscale"}`}
                                                    />
                                                    <span className="text-sm font-medium font-gilroy whitespace-nowrap">
                                                      Draft Continue
                                                    </span>
                                                  </div>

                                                  <button
                                                    type="button"
                                                    disabled={!canDeleteTenant}
                                                    onClick={() =>
                                                      handleDeleteTenant(user)
                                                    }
                                                    className={`flex items-center gap-2 px-3 py-2 transition rounded-md
    ${
      canDeleteTenant
        ? "cursor-pointer hover:bg-red-50"
        : "cursor-not-allowed opacity-60"
    }`}
                                                  >
                                                    <Trash
                                                      size={16}
                                                      variant="Linear"
                                                      color={
                                                        canDeleteTenant
                                                          ? "#EF4444"
                                                          : "#9CA3AF"
                                                      }
                                                    />

                                                    <span
                                                      className="text-sm font-medium font-gilroy 
                                                    whitespace-nowrap text-[#EF4444]"
                                                    >
                                                      Delete
                                                    </span>
                                                  </button>
                                                </>
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
              filterInput={filterInput}
              setAddCheckoutForm={setAddCheckoutForm}
              checkoutaddform={checkoutaddform}
              search={search}
              filterStatus={filterStatus}
              resetPage={resetPage}
              setResetPage={setResetPage}
            />
          )}

          {value === "4" && (
            <UserlistWalkin
              id={props.id}
              uniqueostel_Id={uniqueostel_Id}
              setUniqostel_Id={setUniqostel_Id}
              filterInput={filterInput}
              search={search}
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

      {DueCustomerShow && (
        <DueCustomerConfirmCheckout
          show={DueCustomerShow}
          data={CheckOutDetails}
          handleClose={handleCloseDuePopup}
        />
      )}

      {deleteDraftTenant && (
        <DeleteDraftTenant
          open={deleteDraftTenant}
          onClose={handleCloseDeleteDraftTenant}
          deleteTenantId={DraftTenantDetails}
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
