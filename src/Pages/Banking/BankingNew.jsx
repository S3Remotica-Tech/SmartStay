/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingAddForm from "../Banking/BankingAddForm";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDown2,
  Bank,
  Edit,
  Location,
  MoneyRecive,
  Profile,
  Trash,
  Wallet,
  ArrowUp,
  ArrowDown,
  ArrowSwapVertical,
} from "iconsax-react";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import { CloseCircle, Filter } from "iconsax-react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import transArrow from "../../Assets/Images/New_images/arrow-transfer.png";
import banklogo from "../../Assets/Images/New_images/bank_loga.png";
import PaginationList from "../../Components/PaginationList";
import ApiPagination from "../../Components/ApiPagination";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import { Setting3, SearchNormal1 } from "iconsax-react";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import SelfTransferNew from "./SelfTransferNew";
import { BsExclamationCircle } from "react-icons/bs";
import Select from "react-select";
import BankingOverview from "./BankingOverview";
import { useNavigate } from "react-router-dom";

import TenantPayment from "./TenantPayment";
import CreditCardPayment from "./CreditCardPayment";
import Invesment from "./Invesment";
import AddNewAccount from "./AddNewAccount";
import { StoreBankDetails } from "../../Redux/Action/BankingAction";
import VendorPayment from "./VendorPayment";
import TransactionFilter from "./TransactionFilter";

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
function BankingNew() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const popupRef = useRef(null);

  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [typeId, setTypeId] = useState(null);
  const [showAccountTypeOptions, setShowAccountTypeOptions] = useState(null);
  const [showAddBalance, setshowAddBalance] = useState(false);
  const [defaltType, setDefaultType] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [bankDetails, setBankDetails] = useState("");
  const [showBankInfo, setShowBankInfo] = useState(null);
  const [editAddBank, setEditAddBank] = useState("");
  const [edit, setEdit] = useState(false);
  const popupRef2 = useRef(null);
  const iconRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [AddBankName, setAddBankName] = useState("");
  const [AddBankAmount, setAddBankAmount] = useState("");
  const [deleteBankId, setDeleteBankId] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  // const [originalBills, setOriginalBills] = useState([]);
  // const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
  const [transactionFilterddata, setTransactionFilterddata] = useState([]);
  const [amountError, setAmountError] = useState("");
  const [banking, setBanking] = useState([]);
  const tableContainerRef = useRef(null);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [sizeTransaction, setSizeTransaction] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );
  const [pageTransaction, setPageTransaction] = useState(1);

  const [selfTranfer, setSelfTransfer] = useState(false);
  const [selfDetails, setSelfDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const location = useLocation();
  const [showOverview, setShowOverview] = useState(false);
  const [bankingOverviewDetails, setBankingOverviewDetails] = useState("");
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showTenantPaymentForm, setShowTenantPaymentForm] = useState(false);
  const [showCreditCardForm, seShowCreditCardForm] = useState(false);
  const [showInvestmentForm, seShowInvestmentForm] = useState(false);
  const [addNewAccount, setAddNewAccount] = useState(false);

  const [showTransactionMenu, setShowTransactionMenu] = useState(false);
  const dropdownRef = useRef(null);

  const [period, setPeriod] = useState("ALL");
  const [source, setSource] = useState(null);
  const [chips, setChips] = useState([]);

  const handlePeriodChange = (selected) => {
    setPeriod(selected);
  };

  const handleSourceChange = (selected) => {
    setSource(selected);
  };

  const {
    canWriteModule: canWriteBanking,
    canReadModule: canReadBanking,
    canUpdateModule: canUpdateBanking,
    canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");

  const { canWriteModule: canWriteExpense } = useHasPermission("Expense");

  // console.log("banking", banking);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const monthOptions = [];
  const selectOptions = [{ value: "ALL", label: "All" }];
  const [statusfilter, setStatusFilter] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef2.current &&
        !popupRef2.current.contains(e.target) &&
        !iconRef.current?.contains(e.target)
      ) {
        setShowBankInfo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusFilter = (selected) => {
    setStatusFilter(selected?.value || "");
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleAddAccount = () => {
    setAddNewAccount(true);
  };

  const handleCloseAccount = () => {
    setAddNewAccount(false);
  };

  useEffect(() => {
    if (!canReadBanking) {
      setLoader(false);
    }
  }, [canReadBanking]);

  const isBankingForm = location.state?.isBankingForm || false;

  const handleCloseSelfTransfer = () => {
    setSelfTransfer(false);
  };

  useEffect(() => {
    setShowForm(isBankingForm);
  }, [isBankingForm]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTransactionMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     setLoader(true);
  //     // dispatch({
  //     //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
  //     //   payload: {
  //     //     hostelId: state.login.selectedHostel_Id,
  //     //     // page: page,
  //     //     // size: size,
  //     //   },
  //     // });
  //     // dispatch({
  //     //   type: "BANKING_LIST_SAGA",
  //     //   payload: {
  //     //     hostelId: state.login.selectedHostel_Id,
  //     //     page: page,
  //     //     size: size,
  //     //   },
  //     // });
  //   } else {
  //     setLoader(false);
  //   }
  // }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      const bankFilterReducer = state.bankingDetails?.bankFilters;
      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
          dateFilter: period?.value || bankFilterReducer?.period,
          source: source?.value || bankFilterReducer?.source,
          fromDate: bankFilterReducer?.startDate,
          toDate: bankFilterReducer?.endDate,
        },
      });
      setLoader(true);
      const bankFilter = {
        period: period?.value,
        source: source?.value,
      };

      dispatch({
        type: "SET_BANK_TRANSACTION_FILTERS",
        payload: bankFilter,
      });
    }
  }, [
    state.login.selectedHostel_Id,
    pageTransaction,
    sizeTransaction,
    period,
    source,
  ]);

  useEffect(() => {
    if (state?.bankingDetails?.addPaymentMethodSuccessCode === 201) {
      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });
    }
  }, [state?.bankingDetails?.addPaymentMethodSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails?.statusSuccessSelfTransfer === 200) {
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });

      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });
      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      setSelfTransfer(false);
      dispatch({ type: "REMOVE_SELF_TRANSFER_REDUCER" });
    }
  }, [state.bankingDetails?.statusSuccessSelfTransfer]);

  // useEffect(() => {
  //   setLoader(false);
  //   if (state.bankingDetails.getAllPaymentsSuccessCode === 200) {
  //     // setBanking(state.bankingDetails?.newBankingList?.banks);
  //     setBanking(state.bankingDetails?.getAllPaymentMethodList);

  //     dispatch({ type: "REMOVE_GET_ALL_PAYMENTS_METHODS_REDUCER" });
  //   }
  // }, [state.bankingDetails.getAllPaymentsSuccessCode]);

  // useEffect(() => {
  //   if (state.bankingDetails.getBankingSuccessCode === 200) {
  //     setLoader(false);
  //     setBanking(state.bankingDetails?.newBankingList?.banks);

  //     dispatch({ type: "REMOVE_BANKING_LIST_REDUCER" });
  //   }
  // }, [state.bankingDetails.getBankingSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails.allTransactionSuccess === 200) {
      setTransactionFilterddata(state.bankingDetails?.allTransactionList || []);
      setBanking(state.bankingDetails?.allTransactionList?.bankList);
      setLoader(false);
      dispatch({ type: "REMOVE_GET_ALL_TRANSACTION_REDUCER" });
    }
  }, [state.bankingDetails.allTransactionSuccess]);

  useEffect(() => {
    setLoader(false);
  }, [
    state.bankingDetails?.bankingList?.listTransactions,
    state.bankingDetails?.bankingList?.listBanks,
  ]);

  const handleShowDots = (bankingId, index) => {
    if (openMenuId === index) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      const clickedInside = event.target.closest(".account-type-wrapper");
      if (!clickedInside) {
        setShowAccountTypeOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);

  useEffect(() => {
    if (showAccountTypeOptions !== null) {
      setSelectedAccountType(defaltType);
    }
  }, [showAccountTypeOptions, defaltType]);

  // useEffect(() => {
  //   if (state.bankingDetails.statusCodeForDefaultAccount === 200) {
  //     setFormLoading(false);
  //     setShowAccountTypeOptions(null);
  //     // dispatch({
  //     //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
  //     //   payload: {
  //     //     hostelId: state.login.selectedHostel_Id,
  //     //     // page: page,
  //     //     // size: size,
  //     //   },
  //     // });

  //     // dispatch({
  //     //   type: "BANKING_LIST_SAGA",
  //     //   payload: {
  //     //     hostelId: state.login.selectedHostel_Id,
  //     //     page: page,
  //     //     size: size,
  //     //   },
  //     // });

  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_DEFAULT_ACCOUNT" });
  //     }, 1000);
  //   }
  // }, [state.bankingDetails.statusCodeForDefaultAccount]);

  useEffect(() => {
    if (state?.bankingDetails?.addMoneySuccess === 200) {
      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      dispatch({ type: "REMOVE_ADD_MONEY_REDUCER" });
    }
  }, [state?.bankingDetails?.addMoneySuccess]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBankingAmount === 200) {
      setFormLoading(false);
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });

      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      handleCloseAddBalance();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BANK_AMOUNT" });
      }, 100);
    }
  }, [state.bankingDetails.statusCodeForAddBankingAmount]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForCreateBanking === 201) {
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });
      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      dispatch({ type: "REMOVE_ADD_BANKING_REDUCER" });
    }
  }, [state.bankingDetails.statusCodeForCreateBanking]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForEditBanking === 200) {
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });

      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      dispatch({ type: "CLEAR_EDITBANKING" });
    }
  }, [state.bankingDetails.statusCodeForEditBanking]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_BANK_TRANSACTION_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          period: "",
          source: "",
          search: "",
          size: "",
          page: "",
        },
      });

      setChips([]);
      setPeriod("");
      setSource("");
    };
  }, []);

  const handleReset = () => {
    dispatch({
      type: "SET_BANK_TRANSACTION_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        period: "",
        source: "",
        search: "",
        size: "",
        page: "",
      },
    });
    dispatch({
      type: "GET_ALL_TRANSACTION_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        page: pageTransaction,
        size: sizeTransaction,
      },
    });

    setChips([]);
    setPeriod("ALL");
    setSource("");
  };

  useEffect(() => {
    const bankFilter = state.bankingDetails?.bankFilters;

    console.log("bankFilter", bankFilter);

    const filterData = [];

    if (bankFilter?.search) {
      filterData.push({
        key: "search",
        label: "Search",
        type: "search",
        value: bankFilter.search,
      });
    }

    if (bankFilter?.period) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "period",
        value: bankFilter?.period,
      });
    }

    if (bankFilter?.source) {
      filterData.push({
        key: "source",
        label: "Source",
        type: "source",
        value: bankFilter?.source,
      });
    }

    if (bankFilter?.startDate && bankFilter?.endDate) {
      filterData.push({
        key: "date",
        label: "Date",
        type: "date",
        value: `${bankFilter.startDate} - ${bankFilter.endDate}`,
      });
    } else if (bankFilter?.startDate) {
      filterData.push({
        key: "startDate",
        label: "From",
        type: "date",
        value: bankFilter.startDate,
      });
    } else if (bankFilter?.endDate) {
      filterData.push({
        key: "endDate",
        label: "To",
        type: "date",
        value: bankFilter.endDate,
      });
    }

    setChips(filterData);
  }, [state.bankingDetails?.bankFilters]);

  const handleOpenSelfTransfer = (item) => {
    setOpenMenuId(null);
    setSelfTransfer(true);
    setSelfDetails(item);
  };
  const handleCloseSElfTransfer = () => {
    setSelfTransfer(false);
  };

  const handleEditAddBank = (item) => {
    setEdit(true);
    setAddNewAccount(true);
    setEditAddBank(item);
    setOpenMenuId(false);
  };

  const handleShowForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding bank information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setEdit(false);
    setShowForm(true);
    setEditAddBank("");
    setOpenMenuId(false);
  };
  const handleDeleteForm = (v) => {
    setDeleteBankId(v.id);
    setDeleteShow(true);
    setOpenMenuId(false);
  };

  useEffect(() => {
    if (state.bankingDetails.statusCodeDeleteBank === 200) {
      handleCloseDelete();
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });

      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeDeleteBank]);

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleCloseTransactionDelete = () => {};

  useEffect(() => {
    if (state.bankingDetails.statusCodeForDeleteTrans === 200) {
      handleCloseTransactionDelete();
      // dispatch({
      //   type: "GET_ALL_PAYMENTS_METHODS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     // page: page,
      //     // size: size,
      //   },
      // });

      // dispatch({
      //   type: "BANKING_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     page: page,
      //     size: size,
      //   },
      // });

      dispatch({
        type: "GET_ALL_TRANSACTION_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: pageTransaction,
          size: sizeTransaction,
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING_TRANSACTION" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDeleteTrans]);

  const handleShowAddBalance = (item) => {
    setAddBankName(`${item.accountHolderName} - ${item.accountType}`);

    setTypeId(item.bankingId);
    setshowAddBalance(true);
  };
  const handleCloseAddBalance = () => {
    setshowAddBalance(false);
    setAddBankAmount("");
    setAmountError("");
  };

  const handleAddBankAmount = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    if (/^0+$/.test(value)) {
      return;
    }
    setAddBankAmount(value);
    setAmountError("");
  };
  const handleAddAmountSubmit = () => {
    if (!AddBankAmount.trim()) {
      setAmountError("Please Enter Amount");
      return;
    }
    const hostelId = state.login.selectedHostel_Id;
    dispatch({
      type: "ADDBANKAMOUNT",
      payload: {
        hostelId,
        data: { bankId: typeId, balance: AddBankAmount },
      },
    });
    setFormLoading(true);
  };

  // useEffect(() => {
  //   if (transactionFilterddata?.length > 0 && originalBills?.length === 0) {
  //     setOriginalBills(transactionFilterddata);
  //   }
  // }, [transactionFilterddata]);

  const handlefilterInput = (e) => {
    const input = e.target.value;
    setFilterInput(input);
  };

  useEffect(() => {
    if (!filterStatus) {
      setStatusFilter("All");
    }
  }, [filterStatus]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleShowOverview = (item) => {
    setShowOverview(true);
    setBankingOverviewDetails(item);
    dispatch(StoreBankDetails(item));
  };

  const handleAddExpense = () => {
    navigate(`/add-expense/${state.login.selectedHostel_Id}`, {
      state: {
        isBankingWayTrigger: true,
      },
    });
    setShowTransactionMenu(false);
  };

  const handleVendorPayment = () => {
    setShowSettlementForm(true);
    setShowTransactionMenu(false);
  };

  const handleCloseSettlement = () => {
    setShowSettlementForm(false);
  };

  const handleTenantPayment = () => {
    setShowTransactionMenu(false);
    setShowTenantPaymentForm(true);
  };

  const handleClosePayment = () => {
    setShowTenantPaymentForm(false);
  };

  const handleCreditPayment = () => {
    setShowTransactionMenu(false);
    seShowCreditCardForm(true);
  };

  const handleCloseCreditPayment = () => {
    seShowCreditCardForm(false);
  };

  const handleInvestment = (bankId) => {
    setShowTransactionMenu(false);
    seShowInvestmentForm(true);
    setOpenMenuId(null);
    setBankDetails(bankId);
  };

  const handleCloseInvestment = () => {
    seShowInvestmentForm(false);
  };

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
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSizeTransaction((prev) => {
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

  const filterOptionsData = useSelector(
    (state) => state.bankingDetails?.allTransactionList?.filterOptions,
  );

  const periodOptions =
    filterOptionsData?.dateFilter?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const sourceOptions =
    filterOptionsData?.source?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const currentPage = state.bankingDetails?.newBankingList?.currentPage ?? 1;

  const totalPages = state.bankingDetails?.newBankingList?.totalPages ?? 1;

  const totalRecords = state.bankingDetails?.newBankingList?.totalRecords ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  const currentPageTransaction =
    state.bankingDetails?.allTransactionList?.currentPage ?? 1;

  // console.log("currentPageTransaction", currentPageTransaction);

  const totalPagesTransaction =
    state.bankingDetails?.allTransactionList?.totalPages ?? 1;

  const totalRecordsTransaction =
    state.bankingDetails?.allTransactionList?.totalRecords ?? 0;

  const handlePageChangeTransaction = (page) => {
    setPageTransaction(page);
  };

  const handleSizeChangeTransaction = (sizeValue) => {
    setSizeTransaction(sizeValue);
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="w-full p-0">
          <div className="flex items-center justify-between sticky top-0 bg-white z-40  min-h-[60px] sm:min-h-[60px]">
            <div className="flex lg:justify-start justify-center items-center flex-wrap">
              <label className="text-lg text-black font-semibold font-gilroy">
                Banking
              </label>
            </div>

            <div className="flex justify-between items-center flex-wrap md:flex-nowrap mt-2.5">
              <div className="relative flex items-center mt-0 mb-[5px]">
                <div className="relative flex items-center w-full cursor-pointer">
                  <div
                    className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
    ${
      canReadBanking
        ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
        : "border-gray-200 opacity-60 cursor-not-allowed"
    }`}
                  >
                    <input
                      disabled
                      // disabled={!canReadBanking}
                      type="text"
                      className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF]
                       disabled:cursor-not-allowed"
                      placeholder="Search"
                      aria-label="Search"
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                    />
                    <SearchNormal1
                      size="18"
                      color={canReadBanking ? "#6B7280" : "#A0A0A0"}
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="mx-2">
                <button
                  disabled={!canWriteBanking}
                  onClick={handleShowForm}
                  className="!font-gilroy text-[14px] !bg-[#1e45e1] text-white !font-semibold rounded-[8px] p-2 mb-2.5 w-[146px] whitespace-nowrap"
                >
                  + Add
                </button>
              </div> */}

              <div className="relative mx-2">
                <button
                  disabled={!canWriteBanking}
                  onClick={() => setShowTransactionMenu((prev) => !prev)}
                  className="flex items-center justify-between gap-2 !font-gilroy text-[14px] !bg-[#1e45e1] 
                  text-white !font-semibold rounded-[8px] px-3 py-2 mb-2.5 w-[170px] whitespace-nowrap"
                >
                  Add Transaction
                  <ArrowDown2
                    size="16"
                    className={`transition-transform ${
                      showTransactionMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showTransactionMenu && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full right-[20px] mt-1 bg-white border border-[#E5E7EB] 
                    rounded-[8px] shadow-lg  min-w-[220px]"
                  >
                    <button
                      disabled={!canWriteExpense}
                      onClick={() => handleAddExpense()}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      Add Expense
                    </button>

                    <button
                      onClick={() => handleTenantPayment()}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      Tenant Payment
                    </button>

                    <button
                      disabled={!canWriteBanking}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSelfTransfer();
                      }}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      Self Transfer
                    </button>

                    <button
                      onClick={() => handleVendorPayment()}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      Vendor Payment
                    </button>

                    <button
                      onClick={() => handleCreditPayment()}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      Credit Card Payment
                    </button>
                    <button
                      disabled={!canWriteBanking}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInvestment();
                      }}
                      className=" disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px]   hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      <span
                        className={`text-sm font-medium font-gilroy ${
                          canWriteBanking ? "text-[#111827]" : "text-gray-400"
                        }`}
                      >
                        Investment
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!canReadBanking ? (
            <>
              <PermissionDeniedMessage />
            </>
          ) : (
            <>
              {/* <div className="flex  items-center justify-end gap-2">
                {state.bankingDetails?.newBankingList?.banks?.length > 0 && (
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
              </div> */}
              <div
                className="
    flex flex-row  gap-2 justify-between
    
  "
              >
                <div
                  className="flex flex-row   gap-4 mt-1 ml-1 overflow-x-auto 
    whitespace-nowrap
    pb-2
    scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 show-scrolls"
                >
                  {banking && banking.length > 0 ? (
                    banking.map((item, index) => {
                      return (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowOverview(item);
                          }}
                          key={item.id}
                          className={` flex-shrink-0
            w-[280px]
            h-auto
            flex flex-col justify-between
            cursor-pointer
            rounded-xl
            
            relative
           ${item.isDeleted ? "bg-gray-200 border border-gray-400 opacity-70" : "bg-white border-1 border-gray-100 shadow-md hover:shadow-md transition"} `}
                        >
                          <div className="p-2">
                            <div className="flex justify-between items-center">
                              <div className="flex justify-between items-center gap-2">
                                <div
                                  className={`${item?.accountType === "CASH" ? "bg-[#E9FFEE]" : "bg-[#E8ECFF]"} rounded-full px-2 py-2`}
                                >
                                  {item?.accountType === "CASH" ? (
                                    <Wallet color="#038C3D" size="16" />
                                  ) : (
                                    <Bank color="#1E45E1" size="16" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold font-gilroy mb-1 text-[#222222]">
                                    {item?.paymentMethod
                                      ? `${item.displayName} - ${item.paymentMethod}`
                                      : item?.accountType === "CASH"
                                        ? item?.cashAccountType
                                        : item?.bankName}
                                  </p>

                                  <p className="text-xs font-semibold text-gray-500 font-gilroy mb-0 capitalize">
                                    {item?.paymentMethod ||
                                      (item?.accountType
                                        ? `${item.accountType.toLowerCase()} Account`
                                        : "")}
                                  </p>
                                </div>
                              </div>

                              <div
                                className={` flex items-center justify-center
    ${item.isDeleted ? "cursor-not-allowed opacity-50 " : "cursor-pointer"}
    }
  `}
                                onClick={(e) => {
                                  if (!item.isDeleted) {
                                    e.stopPropagation();
                                    handleShowDots(item.bankId, index);
                                  }
                                }}
                              >
                                <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />
                              </div>

                              {openMenuId === index && (
                                <div
                                  ref={popupRef}
                                  className="absolute right-7 top-12 w-40 bg-gray-50 border border-gray-200 rounded-xl z-[9999]"
                                >
                                  {!item?.paymentMethod && (
                                    <>
                                      <button
                                        disabled={
                                          !(canWriteBanking && !item.isDeleted)
                                        }
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenSelfTransfer(item);
                                        }}
                                        className="flex w-full items-center gap-2 px-3 py-2 rounded-t-xl
    disabled:cursor-not-allowed disabled:opacity-50
    enabled:hover:bg-blue-100"
                                      >
                                        <img
                                          src={transArrow}
                                          alt="transArrow"
                                          className="h-4 w-4"
                                        />

                                        <span className="text-sm font-semibold font-gilroy">
                                          Self Transfer
                                        </span>
                                      </button>

                                      <div className="h-px bg-gray-200" />
                                      <button
                                        disabled={!canWriteBanking}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleInvestment(item.bankId);
                                        }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 rounded-b-xl
    ${
      canWriteBanking
        ? "hover:bg-red-50 cursor-pointer"
        : "cursor-not-allowed opacity-50"
    }`}
                                      >
                                        <MoneyRecive
                                          size={16}
                                          className={
                                            canWriteBanking
                                              ? "text-[#1E45E1]"
                                              : "text-gray-400"
                                          }
                                        />
                                        <span
                                          className={`text-sm font-semibold font-gilroy ${
                                            canWriteBanking
                                              ? "text-black"
                                              : "text-gray-400"
                                          }`}
                                        >
                                          Investment
                                        </span>
                                      </button>
                                    </>
                                  )}
                                  <div className="h-px bg-gray-200" />
                                  <button
                                    disabled
                                    // disabled={
                                    //   !(canUpdateBanking && !item.isDeleted)
                                    // }
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // handleEditAddBank(item);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2
      disabled:cursor-not-allowed disabled:opacity-50
      enabled:hover:bg-blue-100"
                                  >
                                    <Edit
                                      size={16}
                                      className="text-[#1E45E1] disabled:text-gray-400"
                                    />
                                    <span className="text-sm font-semibold font-gilroy">
                                      Edit
                                    </span>
                                  </button>

                                  <div className="h-px bg-gray-200" />

                                  <button
                                    disabled
                                    // disabled={!(canDeleteBanking && !item.isDeleted)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteForm(item);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 rounded-b-xl
    disabled:cursor-not-allowed disabled:opacity-50
    enabled:hover:bg-red-50"
                                  >
                                    <Trash
                                      size={16}
                                      className="text-red-500 disabled:text-gray-400"
                                    />
                                    <span className="text-sm font-semibold text-red-500 font-gilroy">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between">
                              <div>
                                <span className="text-[20px] font-semibold text-black font-gilroy">
                                  ₹{item.balance || 0}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-medium font-gilroy text-[#4B4B4B]">
                                  Balance
                                </span>
                              </div>
                              <div className="relative">
                                <BsExclamationCircle
                                  ref={iconRef}
                                  className="text-[#64748B] cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    const rect =
                                      e.currentTarget.getBoundingClientRect();

                                    setPopupPos({
                                      top: rect.bottom + window.scrollY + 20,
                                      left: rect.right + window.scrollX - 280,
                                    });

                                    setShowBankInfo(
                                      showBankInfo === item.bankId
                                        ? null
                                        : item.bankId,
                                    );
                                  }}
                                />

                                {showBankInfo === item.bankId && (
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    ref={popupRef2}
                                    className="fixed z-[9999] w-72 rounded-xl bg-white border border-gray-200 shadow-xl p-3"
                                    style={{
                                      top: popupPos.top,
                                      left: popupPos.left,
                                    }}
                                  >
                                    <div className="space-y-3 text-sm">
                                      <div className="flex">
                                        <span className="w-28 text-gray-500">
                                          Bank Name
                                        </span>
                                        <span className="mr-2">:</span>
                                        <span className="font-semibold text-[#222]">
                                          {item.bankName || "-"}
                                        </span>
                                      </div>

                                      <div className="flex">
                                        <span className="w-28 text-gray-500">
                                          Beneficiary
                                        </span>
                                        <span className="mr-2">:</span>
                                        <span className="font-semibold text-[#222]">
                                          {item.accountHolderName || "-"}
                                        </span>
                                      </div>

                                      <div className="flex">
                                        <span className="w-28 text-gray-500">
                                          Account No
                                        </span>
                                        <span className="mr-2">:</span>
                                        <span className="font-semibold text-[#222] whitespace-wrap">
                                          {item.accountNumber || "-"}
                                        </span>
                                      </div>

                                      <div className="flex">
                                        <span className="w-28 text-gray-500">
                                          IFSC Code
                                        </span>
                                        <span className="mr-2">:</span>
                                        <span className="font-semibold text-[#222]">
                                          {item.ifscCode || "-"}
                                        </span>
                                      </div>

                                      <div className="flex items-start">
                                        <span className="w-28 shrink-0 text-gray-500">
                                          Description
                                        </span>

                                        <span className=" shrink-0">:</span>

                                        <span className="flex-1 font-semibold text-[#222] break-words whitespace-pre-wrap">
                                          {item.description || "-"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-between my-3 gap-2">
                              {item.paymentMethod && (
                                <div
                                  className="flex gap-2 items-center  px-2 py-1 bg-[#FFF5E6]
                               text-[#8F5C09] border-1 border-[FFF5E6] text-[11px] rounded-md"
                                >
                                  <Bank size="16" /> {item?.bankName}
                                </div>
                              )}

                              {item.paymentMethod && (
                                <div
                                  className="flex gap-2 items-center  px-2 py-1 bg-[#F1F1FF]
                               text-[#1E45E1] border-1 border-[#1E45E1] text-[11px] rounded-md"
                                >
                                  **** **** ****{item?.cardNumber}
                                </div>
                              )}

                              {item.accountType === "BANK" &&
                                !item.paymentMethod && (
                                  <>
                                    <div
                                      className="flex gap-2 items-center  px-2 py-1 bg-[#FFF5E6]
                               text-[#8F5C09] border-1 border-[FFF5E6] text-[11px] rounded-md"
                                    >
                                      <Location size="12" color="#8F5C09" />{" "}
                                      {item?.branchName}
                                    </div>
                                    {item?.upiId && (
                                      <div
                                        className="flex gap-2 items-center  px-2 py-1 bg-[#9EB1FF2B]
                               text-[#1E45E1] border-1 border-[#9EB1FF2B] text-[11px] rounded-md"
                                      >
                                        UPI : {item?.upiId}
                                      </div>
                                    )}
                                  </>
                                )}

                              {item.accountType === "CASH" && (
                                <div
                                  className="flex gap-2 items-center  px-2 py-1 bg-[#F1F1FF]
                               text-[#1E45E1] border-1 border-[#1E45E1] text-[11px] rounded-md"
                                >
                                  <Profile color="#1E45E1" size="16" />{" "}
                                  {(item.accountType === "CASH" &&
                                    item?.displayName) ||
                                    "-"}
                                </div>
                              )}
                            </div>
                            {!item.paymentMethod ? (
                              <div className="flex justify-end my-1">
                                <label className="text-[#4B4B4B] text-xs font-medium">
                                  Last Txn : {item?.lastTransactionDate}
                                </label>
                              </div>
                            ) : (
                              <div className="flex justify-end my-1">
                                <label className="text-[#4B4B4B] text-xs font-medium">
                                  Due Date : {item?.dueDate || "-"}
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      onClick={() => canWriteBanking && handleAddAccount()}
                      className={`border-1  max-w-[150px] w-full min-w-[120px] rounded-md px-10 py-6 m-1 flex items-center justify-center transition-colors ${
                        canWriteBanking
                          ? "cursor-pointer hover:bg-[#F8FAFF] border-dashed border-[#1E45E1]"
                          : "cursor-not-allowed pointer-events-none border-dashed border-gray-500"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-[#F1F6FF] border border-[#ECF0FF] p-2 rounded-full flex items-center justify-center mb-3">
                          <Bank
                            size="20"
                            color={canWriteBanking ? "#1E45E1" : "#9CA3AF"}
                          />
                        </div>

                        <div
                          className={`text-sm sm:text-base font-medium leading-6 break-words whitespace-normal w-full ${
                            canWriteBanking
                              ? "text-[#1E45E1]"
                              : "text-[#9CA3AF]"
                          }`}
                        >
                          Add New Bank / Cash
                          <br />
                          Account
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {banking && banking?.length > 0 && (
                  <div
                    onClick={() => canWriteBanking && handleAddAccount()}
                    className={`border-1 w-[150px]  rounded-md px-10 py-6 m-1 flex items-center justify-center transition-colors ${
                      canWriteBanking
                        ? "cursor-pointer hover:bg-[#F8FAFF] border-dashed border-[#1E45E1]"
                        : "cursor-not-allowed pointer-events-none border-dashed border-gray-500"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#F1F6FF] border border-[#ECF0FF] p-2 rounded-full flex items-center justify-center mb-3">
                        <Bank
                          size="20"
                          color={canWriteBanking ? "#1E45E1" : "#9CA3AF"}
                        />
                      </div>

                      <div
                        className={`text-base font-medium leading-6 ${
                          canWriteBanking
                            ? "text-[#1E45E1]"
                            : "text-[#9CA3AF] cursor-not-allowed"
                        }`}
                      >
                        Add New Bank / Cash
                        <br />
                        Account
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="my-2 mx-2">
                <label className="text-lg text-black font-semibold font-gilroy">
                  All Transactions
                </label>
              </div>
              <div className=" my-2">
                <div className="flex justify-between items-center gap-2 ">
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`border border-gray-300 rounded-lg w-36 ${
                        statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
                      }`}
                    >
                      <Select
                        isDisabled={!canReadBanking}
                        styles={CustomStyles}
                        placeholder="Select Period"
                        options={periodOptions}
                        value={periodOptions.find(
                          (option) => option.value === period,
                        )}
                        onChange={handlePeriodChange}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Select
                        isDisabled={!canReadBanking}
                        styles={CustomStyles}
                        placeholder="Select Source"
                        options={sourceOptions}
                        value={source}
                        onChange={handleSourceChange}
                      />
                    </div>

                    <div
                      className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                    >
                      <Filter
                        size={16}
                        onClick={() => {
                          if (canReadBanking) {
                            setIsFilterOpen(true);
                          }
                        }}
                        className={`transition-opacity duration-300 ${
                          canReadBanking
                            ? "cursor-pointer opacity-100 pointer-events-auto"
                            : "cursor-not-allowed opacity-40 pointer-events-none"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex  items-center gap-2">
                    {transactionFilterddata?.transactions?.length > 0 && (
                      <ApiPagination
                        currentPage={currentPageTransaction}
                        totalPages={totalPagesTransaction}
                        totalRecords={totalRecordsTransaction}
                        onPageChange={handlePageChangeTransaction}
                        onSizeChange={handleSizeChangeTransaction}
                        isTenantPagination={true}
                        size={sizeTransaction}
                      />
                    )}
                  </div>
                </div>

                {chips?.length > 0 && (
                  <div className="flex flex-wrap items-start gap-3 p-3 my-3 rounded-lg bg-gray-50 border border-gray-200">
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

                <div className="relative ">
                  {transactionFilterddata?.transactions?.length > 0 ? (
                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        className="overflow-x-auto overflow-y-auto h-[calc(100vh-140px)] rounded-xl show-scrolls"
                      >
                        <table className="min-w-[1100px] font-gilroy">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
                            <tr className="h-9">
                              <th className="sticky left-0 z-40 bg-[#F9FAFB] w-[230px] px-2 whitespace-nowrap">
                                date & Time
                              </th>
                              <th className="sticky left-[140px] z-40 bg-[#F9FAFB] w-[230px] px-2">
                                Type
                              </th>
                              <th className="w-[230px] px-2 whitespace-nowrap">
                                Account / Method
                              </th>
                              <th className="w-[230px] px-2">Description</th>
                              <th className="w-[230px] px-2 whitespace-nowrap">
                                Source / Beneficiary
                              </th>
                              <th className="w-[230px] px-2">Amount</th>
                              <th className="w-[230px] px-2 whitespace-nowrap">
                                Running Balance
                              </th>
                              <th className="sticky right-0 z-40 bg-[#F9FAFB] w-[80px] px-2">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {transactionFilterddata?.transactions?.map(
                              (user, index) => (
                                <tr
                                  key={user.index}
                                  className="text-xs font-gilroy border-b border-[#E8E8E8] h-10"
                                >
                                  <td className="sticky left-0 z-20 bg-white w-[230px] px-2 py-1 whitespace-nowrap text-[#6B7280]">
                                    {user.createdAt
                                      ? dayjs(user.createdAt).format(
                                          "DD-MM-YYYY HH:mm:ss",
                                        )
                                      : "-"}
                                  </td>
                                  <td className="sticky left-[140px] z-20 bg-white text-[#000000] w-[230px] px-2 py-1 whitespace-nowrap">
                                    <div className="flex items-center gap-2 capitalize">
                                      {["DEPOSIT", "INVOICE"].includes(
                                        user.source,
                                      ) ? (
                                        <>
                                          <ArrowUp size={16} color="#16A34A" />
                                          <span>{user.source}</span>
                                        </>
                                      ) : [
                                          "EXPENSE",
                                          "ASSETS",
                                          "BOOKING_REFUND",
                                          "RENT_REFUND",
                                        ].includes(user.source) ? (
                                        <>
                                          <ArrowDown
                                            size={16}
                                            color="#DC2626"
                                          />
                                          <span>{user.source}</span>
                                        </>
                                      ) : user.source === "SELF_TRANSFER" ? (
                                        <>
                                          <ArrowSwapVertical
                                            size={16}
                                            color="#1E45E1"
                                          />
                                          <span>{user.source}</span>
                                        </>
                                      ) : (
                                        <span>{user.source}</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="w-[230px] px-2 py-1 text-[#111928] whitespace-nowrap">
                                    {user.cashAccountType || user?.bankName} -{" "}
                                    <span className="text-xs">
                                      {user.displayName}
                                    </span>
                                    {/* {user?.source} */}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap text-[#111928]">
                                    {user.description || "-"}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap text-[#111928]">
                                    {/* {user?.displayName} */}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap text-[#111928]">
                                    {user.transactionAmount}
                                  </td>
                                  <td className="w-[230px] px-2 py-1 whitespace-nowrap text-[#111928]">
                                    {user.accountBalance}
                                  </td>
                                  <td className="sticky right-0 z-20 bg-white w-[80px] px-2 py-1 whitespace-nowrap">
                                    <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {transactionFilterddata.transactions?.length === 0 &&
                        canReadBanking && (
                          <div className="my-2">
                            {" "}
                            <NoDataMessage label="Transaction" />{" "}
                          </div>
                        )}

                      {loader && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                          <div className="w-10 h-10 rounded-full border-t-4 border-[#1E45E1] border-r-4 border-r-transparent animate-spin"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {isFilterOpen && (
            <TransactionFilter
              show={isFilterOpen}
              handleClose={handleCloseFilter}
              size={sizeTransaction}
              page={pageTransaction}
            />
          )}

          {showSettlementForm && (
            <VendorPayment
              show={showSettlementForm}
              handleClose={handleCloseSettlement}
              isBanking={true}
            />
          )}

          {showTenantPaymentForm && (
            <TenantPayment
              show={showTenantPaymentForm}
              handleClose={handleClosePayment}
            />
          )}

          {showCreditCardForm && (
            <CreditCardPayment
              show={showCreditCardForm}
              handleClose={handleCloseCreditPayment}
            />
          )}
          {showInvestmentForm && (
            <Invesment
              show={showInvestmentForm}
              handleClose={handleCloseInvestment}
              bankDetails={bankDetails}
            />
          )}

          {showOverview && (
            <BankingOverview
              show={showOverview}
              onClose={() => setShowOverview(false)}
              bankingOverviewDetails={bankingOverviewDetails}
            />
          )}

          {selfTranfer && (
            <SelfTransferNew
              show={selfTranfer}
              handleClose={handleCloseSelfTransfer}
              selfDetails={selfDetails}
            />
          )}

          {showForm === true ? (
            <BankingAddForm
              handleShowForm={handleShowForm}
              showForm={showForm}
              setShowForm={setShowForm}
              editAddBank={editAddBank}
              setEditAddBank={setEditAddBank}
              setEdit={setEdit}
              edit={edit}
            />
          ) : null}
        </div>
      </div>

      {addNewAccount && (
        <AddNewAccount show={addNewAccount} handleClose={handleCloseAccount} />
      )}
    </>
  );
}
export default withErrorBoundary(BankingNew);
