/* eslint-disable react-hooks/exhaustive-deps */
import Filters from "../../Assets/Images/Filters.svg";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import "./Banking.css";
import React, { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingAddForm from "../Banking/BankingAddForm";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import { Edit, Trash } from "iconsax-react";
import money from "../../Assets/Images/New_images/Amount.png";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import transArrow from "../../Assets/Images/New_images/arrow-transfer.png";
import banklogo from "../../Assets/Images/New_images/bank_loga.png";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import { Setting3, SearchNormal1 } from "iconsax-react";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import SelfTransfer from "./SelfTransfer";

function Banking() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const popupRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [typeId, setTypeId] = useState(null);
  const [showAccountTypeOptions, setShowAccountTypeOptions] = useState(null);
  const [showAddBalance, setshowAddBalance] = useState(false);
  const [defaltType, setDefaultType] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editAddBank, setEditAddBank] = useState("");
  const [edit, setEdit] = useState(false);
  const [AddBankName, setAddBankName] = useState("");
  const [AddBankAmount, setAddBankAmount] = useState("");
  const [deleteBankId, setDeleteBankId] = useState("");
  // const [bankingrolePermission, setBankingRolePermission] = useState("");
  // const [bankingpermissionError, setBankingPermissionError] = useState("");
  // const [bankingAddPermission, setBankingAddPermission] = useState("");
  // const [bankingDeletePermission, setBankingDeletePermission] = useState("");
  // const [bankingEditPermission, setBankingEditPermission] = useState("");
  const [hostel_id, setHostel_Id] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [originalBills, setOriginalBills] = useState([]);
  const [statusfilter, setStatusfilter] = useState("");
  const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
  const [transactionFilterddata, settransactionFilterddata] = useState([]);
  const [bankking, setBanking] = useState("");
  const tableContainerRef = useRef(null);
  const [selfTranfer, setSelfTransfer] = useState(false);
  const [selfDetails, setSelfDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const location = useLocation();
  const {
    canWriteModule: canWriteBanking,
    canReadModule: canReadBanking,
    canUpdateModule: canUpdateBanking,
    canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");

  // const canReadBanking = useHasPermission("Banking", "canRead");
  // const canWriteBanking = useHasPermission("Banking", "canWrite");
  // const canUpdateBanking = useHasPermission("Banking", "canUpdate");
  // const canDeleteBanking = useHasPermission("Banking", "canDelete");

  // console.log("transactionFilterddata", transactionFilterddata)
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
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);

  // useEffect(() => {
  //   setBankingRolePermission(state.createAccount.accountList);
  // }, [state.createAccount.accountList]);

  useEffect(() => {
    if (hostel_id) {
      setLoader(true);
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
    } else {
      setLoader(false);
    }
  }, [hostel_id]);

  useEffect(() => {
    if (state.bankingDetails?.statusSuccessSelfTransfer === 200) {
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      setSelfTransfer(false);
      dispatch({ type: "REMOVE_SELF_TRANSFER_REDUCER" });
    }
  }, [state.bankingDetails?.statusSuccessSelfTransfer]);

  // console.log('state.bankingDetails?.bankingList?', state.bankingDetails?.bankingList)

  useEffect(() => {
    setLoader(false);
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      settransactionFilterddata(
        state.bankingDetails?.bankingList?.listTransactions || [],
      );
      setOriginalBillsFilter(
        state.bankingDetails?.bankingList?.listTransactions,
      );
      setBanking(state.bankingDetails?.bankingList?.listBanks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [
    state.bankingDetails.statusCodeForGetBanking,
    state.bankingDetails?.bankingList,
  ]);

  useEffect(() => {
    setLoader(false);
  }, [
    state.bankingDetails?.bankingList?.listTransactions,
    state.bankingDetails?.bankingList?.listBanks,
  ]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForBankingNoData === 201) {
      setLoader(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_BANKING" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForBankingNoData]);

  const handleShowDots = (bankingId) => {
    if (openMenuId === bankingId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(bankingId);
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

  const handleAccountTypeChange = (item) => {
    setTypeId(item.bankingId);
    const defaultType = item.isDefault ? item.isDefault : 3;
    setDefaultType(defaultType);
    setSelectedAccountType(defaultType);
    setShowAccountTypeOptions((prevId) =>
      prevId === item.bankingId ? null : item.bankingId,
    );
  };

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

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleAccountTypeSelection = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedAccountType(selectedValue);
    dispatch({
      type: "DEFAULTACCOUNT",
      payload: { id: typeId, type: selectedValue },
    });
  };
  useEffect(() => {
    if (showAccountTypeOptions !== null) {
      setSelectedAccountType(defaltType);
    }
  }, [showAccountTypeOptions, defaltType]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForDefaultAccount === 200) {
      setFormLoading(false);
      setShowAccountTypeOptions(null);
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DEFAULT_ACCOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDefaultAccount]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBankingAmount === 200) {
      setFormLoading(false);
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      handleCloseAddBalance();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BANK_AMOUNT" });
      }, 100);
    }
  }, [state.bankingDetails.statusCodeForAddBankingAmount]);

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
    setShowForm(true);
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
  const handleDeleteBank = () => {
    dispatch({
      type: "DELETEBANKDETAILS",
      payload: { id: deleteBankId },
    });
  };
  useEffect(() => {
    if (state.bankingDetails.statusCodeDeleteBank === 200) {
      handleCloseDelete();
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeDeleteBank]);

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleCloseTransactionDelete = () => {};

  // useEffect(() => {
  //   if (
  //     transactionFilterddata.length > 0 &&
  //     currentRowTransaction.length === 0 &&
  //     transactioncurrentPage > 1
  //   ) {
  //     settransactioncurrentPage(transactioncurrentPage - 1);
  //   }
  // }, [transactionFilterddata])
  useEffect(() => {
    if (state.bankingDetails.statusCodeForDeleteTrans === 200) {
      handleCloseTransactionDelete();
      dispatch({ type: "BANKINGLIST", payload: hostel_id });
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

  const [amountError, setAmountError] = useState("");

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

  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return transactionFilterddata;

  //   const sorted = [...transactionFilterddata].sort((a, b) => {
  //     const valueA = a[sortConfig.key];
  //     const valueB = b[sortConfig.key];

  //     if (!isNaN(valueA) && !isNaN(valueB)) {
  //       return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
  //     }

  //     if (typeof valueA === 'string' && typeof valueB === 'string') {
  //       return sortConfig.direction === 'asc'
  //         ? valueA.localeCompare(valueB)
  //         : valueB.localeCompare(valueA);
  //     }

  //     return 0;
  //   });

  //   return sorted;
  // }, [transactionFilterddata, sortConfig]);

  // const handleSort = (key, direction) => {
  //   setSortConfig({ key, direction });
  // };

  // const sortedData = React.useMemo(() => {
  //   return Array.isArray(transactionFilterddata) ? transactionFilterddata : [];
  // }, [transactionFilterddata]);

  // console.log("sortedData",sortedData)

  useEffect(() => {
    if (transactionFilterddata?.length > 0 && originalBills?.length === 0) {
      setOriginalBills(transactionFilterddata);
    }
  }, [transactionFilterddata]);

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    settransactionFilterddata(originalBills);
    setDropdownVisible(false);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
    settransactionFilterddata(originalBillsFilter);
  };

  const handlefilterInput = (e) => {
    const input = e.target.value;
    setFilterInput(input);
    setDropdownVisible(input.length > 0);

    if (input.trim() === "") {
      settransactionFilterddata(originalBillsFilter);
    } else {
      const filtered = originalBillsFilter.filter((item) =>
        item.benificiary_name.toLowerCase().includes(input.toLowerCase()),
      );
      settransactionFilterddata(filtered);
    }
  };

  const handleUserSelect = (user) => {
    setFilterInput(user.benificiary_name);

    const selectedUserData = originalBillsFilter?.filter(
      (item) => item.benificiary_name === user.benificiary_name,
    );
    settransactionFilterddata(selectedUserData);

    setDropdownVisible(false);
  };

  const [dateRange, setDateRange] = useState(null);

  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusfilter(value);

    if (value === "All") {
      settransactionFilterddata(originalBillsFilter);
    } else if (value === "date") {
      settransactionFilterddata(originalBillsFilter);
    } else {
      const filtered = originalBillsFilter?.filter((user) => {
        const isCredit = user.desc === "Invoice";
        const isDebit = user.desc !== "Invoice";

        return (value === "1" && isCredit) || (value === "2" && isDebit);
      });
      settransactionFilterddata(filtered);
    }
  };
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);

    if (!dates || dates.length !== 2) {
      settransactionFilterddata(originalBillsFilter);
      setStatusfilter("All");
      return;
    }

    const [start, end] = dates;

    const filtered = originalBillsFilter?.filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.isSameOrAfter(dayjs(start), "day") &&
        itemDate.isSameOrBefore(dayjs(end), "day")
      );
    });

    settransactionFilterddata(filtered);
  };

  useEffect(() => {
    if (!filterStatus) {
      setStatusfilter("All");
      setDateRange(null);
    }
  }, [filterStatus]);

  useEffect(() => {
    if (
      originalBillsFilter?.length === 0 &&
      transactionFilterddata?.length > 0
    ) {
      setOriginalBillsFilter(transactionFilterddata);
    }
  }, [transactionFilterddata]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedTransactions = transactionFilterddata?.slice(
    startIndex,
    endIndex,
  );
  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="w-full p-0">
          <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
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
                      className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] disabled:cursor-not-allowed"
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

              <div className="pr-4">
                <Image
                  src={Filters}
                  roundedCircle
                  className={`w-12 h-12 rounded-full transition-opacity duration-300 ease-in-out
      ${canReadBanking ? "cursor-pointer opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"}`}
                  onClick={handleFilterd}
                />
              </div>

              {filterStatus && (
                <div className="mr-4 border border-[#D4D4D4] rounded-md w-30">
                  <Form.Select
                    onChange={(e) => handleStatusFilter(e)}
                    value={statusfilter}
                    aria-label="Select Price Range"
                    id="statusselect"
                    className="text-gray-900 font-semibold font-gilroy cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="1">Credit</option>
                    <option value="2">Debit</option>
                    <option value="date">Date</option>
                  </Form.Select>
                </div>
              )}
              {statusfilter === "date" && (
                <div className="mr-4">
                  <RangePicker
                    value={dateRange}
                    format="DD-MM-YYYY"
                    onChange={handleDateRangeChange}
                    className="h-9 rounded-md cursor-pointer"
                  />
                </div>
              )}

              <div className="mr-2">
                <Button
                  disabled={!canWriteBanking}
                  onClick={handleShowForm}
                  className="!font-gilroy text-[14px] !bg-[#1e45e1] text-white !font-semibold rounded-[8px] p-2 mb-2.5 w-[146px] whitespace-nowrap"
                >
                  + Add
                </Button>
              </div>
            </div>
          </div>
          {!canReadBanking ? (
            <>
              <PermissionDeniedMessage />
            </>
          ) : (
            <>
              <div
                className="
    flex flex-row gap-4 mt-1 ml-1
    overflow-x-auto overflow-y-hidden
    whitespace-nowrap
    pb-2
    scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
  "
              >
                {bankking && bankking.length > 0
                  ? bankking.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={` flex-shrink-0
            w-[280px]
            h-[200px]
            flex flex-col justify-between
            
            rounded-xl
            overflow-hidden
            relative
           ${item.isDeleted ? "bg-gray-200 border border-gray-400 opacity-70" : "bg-white border border-gray-300 hover:shadow-md transition"} `}
                        >
                          <div className="p-4 overflow-y-auto">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-semibold font-gilroy mb-0">
                                  Type: {item?.accountType}
                                </p>

                                <p className="text-sm font-semibold text-gray-600 font-gilroy mb-0">
                                  {item.accountHolderName ||
                                    item.benificiary_name}
                                </p>
                              </div>

                              <div
                                className={`h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center
    ${item.isDeleted ? "cursor-not-allowed opacity-50 " : "cursor-pointer"}
    ${openMenuId === item.bankingId && !item.isDeleted ? "bg-blue-100" : "bg-white"}
  `}
                                onClick={() => {
                                  if (!item.isDeleted) {
                                    handleShowDots(item.bankingId);
                                  }
                                }}
                              >
                                <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />
                              </div>

                              {openMenuId === item.bankingId && (
                                <div
                                  ref={popupRef}
                                  className="absolute right-7 top-12 w-40 bg-gray-50 border border-gray-200 rounded-xl z-[9999]"
                                >
                                  <button
                                    disabled={
                                      !(canWriteBanking && !item.isDeleted)
                                    }
                                    onClick={() => handleOpenSelfTransfer(item)}
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
                                    disabled={
                                      !(canUpdateBanking && !item.isDeleted)
                                    }
                                    onClick={() => handleEditAddBank(item)}
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
                                    onClick={() => handleDeleteForm(item)}
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

                            <p className="mt-2 text-lg font-medium font-gilroy">
                              {item?.accountNumber ||
                                item?.upiId ||
                                item.creditCardNumber}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                              <div>
                                <p className="text-sm text-gray-500 font-medium font-gilroy mb-0">
                                  {item.isDefault
                                    ? `Default: ${
                                        item.transactionType === "BOTH"
                                          ? "Both A/C"
                                          : item.transactionType + " A/C"
                                      }`
                                    : ""}
                                </p>

                                {item.isDefault === 0 && (
                                  <p
                                    className={`text-sm font-semibold font-gilroy ${
                                      canWriteBanking
                                        ? "text-blue-600 cursor-pointer"
                                        : "text-gray-300 cursor-not-allowed"
                                    }`}
                                    onClick={() => {
                                      if (canWriteBanking) {
                                        handleAccountTypeChange(item);
                                      }
                                    }}
                                  >
                                    Set as default account
                                  </p>
                                )}
                              </div>

                              <span
                                className={`text-sm font-semibold font-gilroy ${
                                  canWriteBanking
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                Change
                              </span>
                            </div>
                            <div className="flex justify-end my-1">
                              <span
                                className={`text-sm font-semibold font-gilroy ${
                                  canWriteBanking && !item.isDeleted
                                    ? "text-blue-600 cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => {
                                  if (canWriteBanking && !item.isDeleted) {
                                    handleShowAddBalance(item);
                                  }
                                }}
                              >
                                +Add Amount
                              </span>
                            </div>
                            {showAccountTypeOptions === item.bankingId && (
                              <div
                                className="
                  absolute top-16 left-12
                  bg-white
                  border border-gray-200
                  rounded-xl
                  p-2
                  w-36
                  shadow-md
                  z-[1000]
                "
                                onMouseDown={(e) => e.stopPropagation()}
                              >
                                <label className="block text-sm mb-1 font-gilroy font-medium">
                                  <input
                                    type="radio"
                                    name={`accountType-${item.bankingId}`}
                                    value={1}
                                    checked={selectedAccountType === 1}
                                    onChange={handleAccountTypeSelection}
                                  />{" "}
                                  Credit A/C
                                </label>

                                <label className="block text-sm mb-1 font-gilroy font-medium">
                                  <input
                                    type="radio"
                                    name={`accountType-${item.bankingId}`}
                                    value={2}
                                    checked={selectedAccountType === 2}
                                    onChange={handleAccountTypeSelection}
                                  />{" "}
                                  Debit A/C
                                </label>

                                <label className="block text-sm mb-1 font-gilroy font-medium">
                                  <input
                                    type="radio"
                                    name={`accountType-${item.bankingId}`}
                                    value={3}
                                    checked={selectedAccountType === 3}
                                    onChange={handleAccountTypeSelection}
                                  />{" "}
                                  Both A/C
                                </label>
                              </div>
                            )}
                          </div>

                          <div className="bg-[#F9FAFB] px-4 py-2 flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                              <img
                                src={money}
                                alt="money"
                                className="h-4 w-4"
                              />
                              Balance
                            </span>

                            <span className="text-sm font-semibold text-black font-gilroy">
                              ₹{item.accountBalance || 0}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className=" m-2">
                <div className="flex justify-end items-center gap-2 mr-2 mb-3">
                  <div>
                    <Setting3
                      // onClick={() => setOpen(!open)}
                      className="cursor-not-allowed"
                      size="22"
                      color="#4B4B4B"
                    />
                  </div>
                  <PaginationList
                    totalItems={transactionFilterddata.length}
                    itemsPerPage={pageSize}
                    currentPage={page}
                    onPageChange={(p) => setPage(p)}
                    onPageSizeChange={(size) => setPageSize(size)}
                  />
                </div>

                <div className="relative ">
                  {transactionFilterddata?.length > 0 ? (
                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        ref={tableContainerRef}
                        className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                      >
                        <table className=" w-full font-gilroy">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                            <tr className="h-9">
                              <th className="w-[230px] px-2">Account Name</th>
                              <th className="w-[230px] px-2">Date</th>
                              <th className="w-[230px] px-2">Amount</th>
                              <th className="w-[230px] px-2">Description</th>
                              <th className="w-[230px] px-2">Transaction</th>
                            </tr>
                          </thead>

                          <tbody>
                            {paginatedTransactions?.map((user) => (
                              <tr
                                key={user.id}
                                className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                              >
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {user.accountHolder}
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {user.createdAt}
                                </td>
                                <td className="w-[230px] px-2 py-1">
                                  {user.amount}
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {user.source}
                                </td>
                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {user.type}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {!loader &&
                        transactionFilterddata.length === 0 &&
                        canReadBanking && <NoDataMessage label="Transaction" />}

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

          <Modal
            show={deleteShow}
            onHide={handleCloseDelete}
            centered
            backdrop="static"
            dialogClassName="custom-delete-modal"
          >
            <Modal.Header className="!border-t-0">
              <Modal.Title className="w-full text-center !font-semibold !text-[18px] !font-gilroy !text-[#222222]">
                Delete Banking?
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center !text-[14px] !font-medium !font-gilroy !text-[#646464] -mt-2.5">
              Are you sure you want to delete this Bank-details?
            </Modal.Body>

            <Modal.Footer className="flex content-center !border-t-0 -mt-2.5">
              <Button
                className="me-2 w-full max-w-[160px] h-[52px] rounded-[8px] px-5 py-3 bg-white !text-[#1E45E1] !border !border-[#1E45E1] !font-gilroy !font-semibold !text-[14px]"
                onClick={handleCloseDelete}
              >
                Cancel
              </Button>

              <Button
                disabled
                className="w-full max-w-[160px] h-[52px] rounded-[8px] px-3 py-3 !bg-[#1E45E1] !text-white !font-gilroy !font-semibold !text-[14px] !disabled:opacity-50 !disabled:cursor-not-allowed"
                onClick={handleDeleteBank}
              >
                {/* Delete */} Coming Soon
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showAddBalance}
            onHide={() => handleCloseAddBalance()}
            backdrop="static"
            centered
            className="modal-dialog-centered max-w-[353px] w-[80vw]"
          >
            <Modal.Header className="relative">
              <div className="text-[1.25rem] font-semibold font-gilroy">
                Add Balance
              </div>
              <CloseCircle
                size="24"
                color="#000"
                className="cursor pointer"
                onClick={handleCloseAddBalance}
              />
            </Modal.Header>
            <Modal.Body className="pt-2">
              <div className="w-full">
                <Form.Group className="mb-2">
                  <Form.Label className="!text-[14px] !text-[#222222] !font-gilroy !font-medium">
                    Account{" "}
                    <span className="text-red-500 text-[20px]"> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Account"
                    value={AddBankName}
                    className="text-[16px] text-[#4B4B4B] font-gilroy font-medium shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px]"
                  />
                </Form.Group>
              </div>

              <div className="w-full">
                <Form.Group className="mb-3">
                  <Form.Label className="text-[0.875rem] text-[#222222] font-gilroy font-medium">
                    Balance {""}
                    <span className="text-red-500 text-[20px]"> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Amount"
                    value={AddBankAmount}
                    onChange={(e) => handleAddBankAmount(e)}
                    className="text-[1rem] text-[#4B4B4B] font-gilroy font-medium shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px]"
                  />
                  {amountError && (
                    <ErrorMessage message={amountError} type="error" />
                  )}
                </Form.Group>

                {/* {state.createAccount?.networkError ?
                <div className="d-flex justify-content-center mt-1 mb-1">
                  <ErrorMessage message={state.createAccount?.networkError} type="error" />
                  </div>
                  : null} */}

                <Button
                  className="w-full !bg-[#1E45E1] !font-semibold h-[50px] rounded-[12px] !text-[16px] !font-gilroy mt-2.5"
                  onClick={handleAddAmountSubmit}
                >
                  Add balance
                </Button>
              </div>
            </Modal.Body>

            {formLoading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="w-[40px] h-[40px] rounded-full border-t-[4px] border-t-[#1E45E1] border-r-[4px] border-r-transparent animate-spin"></div>
              </div>
            )}
          </Modal>

          {selfTranfer && (
            <SelfTransfer
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
    </>
  );
}
export default withErrorBoundary(Banking);
