/* eslint-disable react-hooks/exhaustive-deps */
import Filters from "../Assets/Images/Filters.svg";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import "./Banking.css";
import React, { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingAddForm from "./BankingAddForm";


import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2, Edit, Trash  } from "iconsax-react";
import money from "../Assets/Images/New_images/Amount.png";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import transArrow from "../Assets/Images/New_images/arrow-transfer.png";
import banklogo from "../Assets/Images/New_images/bank_loga.png";
import Select from "react-select";



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
  const [bankingrolePermission, setBankingRolePermission] = useState("");
  const [bankingpermissionError, setBankingPermissionError] = useState("");
  const [bankingAddPermission, setBankingAddPermission] = useState("");
  const [bankingDeletePermission, setBankingDeletePermission] = useState("");
  const [bankingEditPermission, setBankingEditPermission] = useState("");
  const [hostel_id, setHostel_Id] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [originalBills, setOriginalBills] = useState([]);
  const [statusfilter, setStatusfilter] = useState("");
  const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
  const [transactionFilterddata, settransactionFilterddata] = useState([]);
  const [bankking, setBanking] = useState("")
  const [selfTranfer, setSelfTransfer] = useState(false)
  const [amount, setAmount] = useState("");
  const [formLoading, setFormLoading] = useState(false)


  const transactionPageOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];


  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);



  useEffect(() => {
    setBankingRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

 



   useEffect(() => {
       const isAdmin = bankingrolePermission[0]?.user_details?.user_type === "admin";
       if (isAdmin) {
      if (state?.login?.planStatus === 0) {
        setBankingPermissionError("");
        setBankingAddPermission("Permission Denied");
        setBankingEditPermission("Permission Denied");
        setBankingDeletePermission("Permission Denied");
  
      } else if (state?.login?.planStatus === 1) {
        setBankingPermissionError("");
        setBankingAddPermission("");
        setBankingEditPermission("");
        setBankingDeletePermission("");
      }
    }
  
    }, [state?.login?.planStatus, state?.login?.selectedHostel_Id,bankingrolePermission])



     useEffect(() => {
         const bankingPermission = bankingrolePermission[0]?.role_permissions?.find(
           (perm) => perm.permission_name === "Banking"
         );
       
         const isOwner = bankingrolePermission[0]?.user_details?.user_type === "staff";
         const planActive = state?.login?.planStatus === 1;
        
         if (!bankingPermission || !isOwner) return;
       
         
         if (bankingPermission.per_view === 1 && planActive) {
           setBankingPermissionError("");
         } else {
           setBankingPermissionError("Permission Denied");
         }
       
         
         if (bankingPermission.per_create === 1 && planActive) {
           setBankingAddPermission("");
         } else {
           setBankingAddPermission("Permission Denied");
         }
       
        
         if (bankingPermission.per_edit === 1 && planActive) {
           setBankingEditPermission("");
         } else {
           setBankingEditPermission("Permission Denied");
         }
       
         if (bankingPermission.per_delete === 1 && planActive) {
           setBankingDeletePermission("");
         } else {
           setBankingDeletePermission("Permission Denied");
         }
       }, [bankingrolePermission, state?.login?.planStatus,state?.login?.selectedHostel_Id]);


;

  



 

  






      
  

  useEffect(() => {
    if (hostel_id) {
      setLoader(true);
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
    }
  }, [hostel_id]);

  useEffect(() => {
    setLoader(false);
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      settransactionFilterddata(state.bankingDetails?.bankingList?.bank_trans);
      setOriginalBillsFilter(state.bankingDetails?.bankingList?.bank_trans)
      setBanking(state.bankingDetails.bankingList.banks)
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);


  useEffect(() => {
    if (state.bankingDetails.statusCodeForBankingNoData === 201) {
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_BANKING" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForBankingNoData]);

  const handleShowDots = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
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
    setTypeId(item.id);
    const defaultType = item.setus_default ? item.setus_default : 3;
    setDefaultType(defaultType);
    setSelectedAccountType(defaultType);
    setShowAccountTypeOptions((prevId) =>
      prevId === item.id ? null : item.id
    );
  };

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      const clickedInside = event.target.closest('.account-type-wrapper');
      if (!clickedInside) {
        setShowAccountTypeOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideAccount);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideAccount);
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
      setFormLoading(false)
      setShowAccountTypeOptions(null);
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DEFAULT_ACCOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDefaultAccount]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBankingAmount === 200) {
      setFormLoading(false)
      handleCloseAddBalance();
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BANK_AMOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBankingAmount]);

  const handleOpenSelfTransfer = () => {
    setOpenMenuId(null)
    setSelfTransfer(true)
  }
  const handleCloseSElfTransfer = () => {
    setSelfTransfer(false)
  }

  const handleEditAddBank = (item) => {
    setEdit(true);
    setShowForm(true);
    setEditAddBank(item);
    setOpenMenuId(false);
  };

  const handleShowForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding bank information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
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
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeDeleteBank]);

  const handleCloseDelete = () => {
    setDeleteShow(false);

  };







  const handleCloseTransactionDelete = () => {

  };

  useEffect(() => {
    if (
      transactionFilterddata.length > 0 &&
      currentRowTransaction.length === 0 &&
      transactioncurrentPage > 1
    ) {
      settransactioncurrentPage(transactioncurrentPage - 1);
    }
  }, [transactionFilterddata])
  useEffect(() => {
    if (state.bankingDetails.statusCodeForDeleteTrans === 200) {
      handleCloseTransactionDelete();
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING_TRANSACTION" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDeleteTrans]);

  const handleShowAddBalance = (item) => {
    setAddBankName(`${item.benificiary_name} - ${item.type}`);

    setTypeId(item.id);
    setshowAddBalance(true);

  };
  const handleCloseAddBalance = () => {
    setshowAddBalance(false);
    setAddBankAmount("");
    setAmountError("")
  };


  const [amountError, setAmountError] = useState("");

  const handleAddBankAmount = (e) => {
    const value = (e.target.value)
    if (!/^\d*$/.test(value)) {
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
    dispatch({
      type: "ADDBANKAMOUNT",
      payload: { id: typeId, amount: AddBankAmount, hostel_id: hostel_id },
    });
    setFormLoading(true)
  };

  const [transactionrowsPerPage, setTransactionrowsPerPage] = useState(5);
  const [transactioncurrentPage, settransactioncurrentPage] = useState(1);

  const indexOfLastRowTransaction =
    transactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowTransaction =
    indexOfLastRowTransaction - transactionrowsPerPage;

  const currentRowTransaction =
    filterInput.length > 0
      ? transactionFilterddata
      : transactionFilterddata?.slice(indexOfFirstRowTransaction, indexOfLastRowTransaction);

  const handlePageChange = (pageNumber) => {
    settransactioncurrentPage(pageNumber);
  };


  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentRowTransaction;

    const sorted = [...currentRowTransaction].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];


      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentRowTransaction, sortConfig]);
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };
  const handleItemsPerPageChange = (selectedOption) => {
    setTransactionrowsPerPage(Number(selectedOption.value));
    settransactioncurrentPage(1);
  };


  const totalPagesTransaction = Math.ceil(
    transactionFilterddata?.length / transactionrowsPerPage
  );




  useEffect(() => {
    if (transactionFilterddata.length > 0 && originalBills?.length === 0) {
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
        item.benificiary_name.toLowerCase().includes(input.toLowerCase())
      );
      settransactionFilterddata(filtered);
    }
  };




  const handleUserSelect = (user) => {
    setFilterInput(user.benificiary_name);

    const selectedUserData = originalBillsFilter?.filter(
      (item) => item.benificiary_name === user.benificiary_name
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
    }

    else {
      const filtered = originalBillsFilter?.filter((user) => {
        const isCredit = user.desc === "Invoice";
        const isDebit = user.desc !== "Invoice";

        return (
          (value === "1" && isCredit) ||
          (value === "2" && isDebit)
        );
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
      return itemDate.isSameOrAfter(dayjs(start), 'day') &&
        itemDate.isSameOrBefore(dayjs(end), 'day');
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
    if (originalBillsFilter.length === 0 && transactionFilterddata.length > 0) {
      setOriginalBillsFilter(transactionFilterddata);
    }
  }, [transactionFilterddata]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  return (
    <>
      {bankingpermissionError ? (
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
              src={emptyimg}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />


            {bankingpermissionError && (
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
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {bankingpermissionError}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container" >
          <div
            className="d-flex flex-wrap justify-content-between align-items-center "

            style={{ paddingLeft: 4, paddingRight: 4, marginTop: 3 }}  >
            <div className="ms-2">
              <label style={{
                fontSize: 18,
                color: "#000000",
                fontWeight: 600,
                fontFamily: "Gilroy",
                marginTop: 17
              }}>Banking</label>
            </div>

            <div style={{ marginTop: 19, }} className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap">
              {search ? (
                <>
                  <div

                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0px",
                      marginBottom: "5px",
                    }}

                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        cursor: "pointer",

                      }}
                    >
                      <Image
                        src={searchteam}
                        alt="Search"
                        style={{
                          position: "absolute",

                          width: "24px",
                          height: "24px",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        className="input-group"



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
                            borderRight: "none",
                            width: "160px",
                            height: 40
                          }}
                          value={filterInput}
                          onChange={(e) => handlefilterInput(e)}
                        />
                        <span className="input-group-text bg-white border-start-0">
                          <img src={closecircle} alt="close" onClick={handleCloseSearch}
                            style={{ height: 20, width: 20 }}
                          />
                        </span>
                      </div>
                    </div>

                    {isDropdownVisible && transactionFilterddata?.length > 0 && (
                      <div
                        style={{
                          border: "1px solid #d9d9d9 ",
                          position: "absolute",
                          top: 45,
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
                            maxHeight: "174px",
                            minHeight: transactionFilterddata?.length > 1 ? "100px" : "auto",
                            overflowY: transactionFilterddata?.length > 3 ? "auto" : "hidden",
                            margin: "0",
                            listStyleType: "none",
                            borderRadius: 8,
                            boxSizing: "border-box",
                          }}
                        >
                          {transactionFilterddata?.map((user, index) => {
                            return (
                              <li
                                key={index}
                                className="list-group-item d-flex align-items-center"
                                style={{
                                  cursor: "pointer",
                                  padding: "10px 5px",
                                  borderBottom:
                                    index !== transactionFilterddata.length - 1
                                      ? "1px solid #eee"
                                      : "none",
                                }}
                                onClick={() => handleUserSelect(user)}
                              >

                                <span>{user.benificiary_name}</span>
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

                  <div style={{ paddingRight: 15, cursor: "pointer" }}>
                    <Image
                      src={searchteam}
                      roundedCircle
                      style={{ height: "24px", width: "24px" }}
                      onClick={handleSearch}
                    />
                  </div>
                </>
              )}


              <div style={{ paddingRight: 15, cursor: "pointer" }}>
                <Image
                  src={Filters}
                  roundedCircle
                  style={{ height: "50px", width: "50px", }}
                  onClick={handleFilterd}
                />
              </div>


              {
                filterStatus &&


                <div className='me-3'
                  style={{ border: "1px solid #D4D4D4", borderRadius: 8, width: search ? "120px" : "120px", }}>

                  <Form.Select
                    onChange={(e) => handleStatusFilter(e)}
                    value={statusfilter}
                    aria-label="Select Price Range"
                    id="statusselect"
                    style={{
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      cursor: "pointer"
                    }}
                  >
                    <option value="All">All</option>
                    <option value="1">Credit</option>
                    <option value="2">Debit</option>
                    <option value="date">Date</option>
                  </Form.Select>
                </div>

              }
              {statusfilter === "date" && (
                <div className="me-3">
                  <RangePicker
                    value={dateRange}
                    format="DD-MM-YYYY"
                    onChange={handleDateRangeChange}
                    style={{ height: "38px", borderRadius: 8, cursor: "pointer" }}
                  />
                </div>
              )}


              <div className="me-2">

                <Button
                  disabled={bankingAddPermission}
                  onClick={handleShowForm}
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "14px",
                    backgroundColor: "#1E45E1",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    maxHeight: 45,
                    width: "146px",
                    whiteSpace: "nowrap"
                  }}
                >
                  + Add
                </Button>

              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto mt-3"  >
            {bankking && bankking?.length > 0 ? (
              bankking?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="card mx-2"
                    style={{
                      minWidth: "280px",
                      border: "1px, solid, #ddd",
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: 187,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",

                    }}
                  >

                    <div
                      className="card-body"
                      style={{ overflowY: "auto", scrollBehavior: "smooth" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p
                            className="mb-0"
                            style={{
                              fontSize: 14,
                              fontFamily: "Gilroy",
                              fontWeight: 600,
                            }}
                          >
                            Type: {item.type}
                          </p>
                          <p
                            className="text-muted mb-0"
                            style={{
                              fontSize: 13,
                              fontFamily: "Gilroy",
                              fontWeight: 600,
                              color: "#4B4B4B",
                            }}
                          >
                            {item.acc_name || item.benificiary_name}
                          </p>

                        </div>

                        <div style={{
                          cursor: "pointer",
                          height: 40,
                          width: 40,
                          borderRadius: 100,
                          border: "1px solid #EFEFEF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          backgroundColor: openMenuId === item.id ? "#E7F1FF" : "white"

                        }} onClick={() => handleShowDots(item.id)}>
                          <PiDotsThreeOutlineVerticalFill

                            alt="More options"
                            style={{ height: 20, width: 20, cursor: "pointer" }}
                          />
                        </div>
                        {openMenuId === item.id && (
                          <div
                            ref={popupRef}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#F9F9F9",
                              position: "absolute",
                              right: 30,
                              top: 50,
                              width: 160,
                              height: "auto",
                              border: "1px solid #EBEBEB",
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              zIndex: 9999,
                              padding: 0,
                            }}
                          >
                            <div style={{ width: "100%", borderRadius: 10, backgroundColor: "#F9F9F9" }}>


                              <div
                                className="d-flex justify-content-start align-items-center gap-2"
                                onClick={() => {
                                  if (!bankingAddPermission) {
                                    handleOpenSelfTransfer(item);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  if (!bankingAddPermission)
                                    e.currentTarget.style.backgroundColor = "#EDF2FF";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#F9F9F9";
                                }}
                                style={{
                                  padding: "8px 12px",
                                  width: "100%",
                                  backgroundColor: "#F9F9F9",
                                  cursor: bankingAddPermission ? "not-allowed" : "pointer",
                                  pointerEvents: bankingAddPermission ? "none" : "auto",
                                  opacity: bankingAddPermission ? 0.5 : 1,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                }}
                              >
                                <img src={transArrow} style={{ height: 16, width: 16 }} alt="transArrow" />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy, sans-serif",
                                   
                                      color: bankingAddPermission ? "#A9A9A9" : "#000000",
                      cursor:bankingAddPermission ? "not-allowed" : "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Self Transfer
                                </label>
                              </div>

                              <div style={{ height: 1, backgroundColor: "#F0F0F0" }} />

                              <div
                                className="d-flex justify-content-start align-items-center gap-2"
                                onClick={() => {
                                  if (!bankingEditPermission) {
                                    handleEditAddBank(item);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  if (!bankingEditPermission)
                                    e.currentTarget.style.backgroundColor = "#EDF2FF";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#F9F9F9";
                                }}
                                style={{
                                  padding: "8px 12px",
                                  width: "100%",
                                  backgroundColor: "#F9F9F9",
                                  cursor: bankingEditPermission ? "not-allowed" : "pointer",
                                  pointerEvents: bankingEditPermission ? "none" : "auto",
                                  opacity: bankingEditPermission ? 0.5 : 1,
                                }}
                              >
                              
                                 <Edit
                                                    size="16"
                                                    color={bankingEditPermission ? "#A9A9A9" : "#1E45E1"}
                                                  />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy, sans-serif",
                                   color: bankingEditPermission ? "#A9A9A9" : "#222222",
                      cursor: bankingEditPermission ? "not-allowed" : "pointer",
                                  }}
                                >
                                  Edit
                                </label>
                              </div>

                              <div style={{ height: 1, backgroundColor: "#F0F0F0" }} />


                              <div
                                className="d-flex justify-content-start align-items-center gap-2"
                                onClick={() => {
                                  if (!bankingDeletePermission) {
                                    handleDeleteForm(item);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  if (!bankingDeletePermission)
                                    e.currentTarget.style.backgroundColor = "#FFF0F0";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#F9F9F9";
                                }}
                                style={{
                                  padding: "8px 12px",
                                  width: "100%",
                                  backgroundColor: "#F9F9F9",
                                  cursor: bankingDeletePermission ? "not-allowed" : "pointer",
                                  pointerEvents: bankingDeletePermission ? "none" : "auto",
                                  opacity: bankingDeletePermission ? 0.5 : 1,
                                  borderBottomLeftRadius: 10,
                                  borderBottomRightRadius: 10,
                                }}
                              >
                                {/* <img src={Delete} style={{ height: 16, width: 16 }} alt="Delete" /> */}
                                 <Trash
                                                    size="16"
                                                    color={bankingDeletePermission ? "#A9A9A9" : "red"}
                                                  />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy, sans-serif",
                                     color: bankingDeletePermission ? "#A9A9A9" : "#FF0000",
                      cursor:bankingDeletePermission ? "not-allowed" : "pointer",
                                  }}
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>

                        )}
                      </div>

                      <p
                        className="mt-3"
                        style={{
                          fontSize: 20,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {item.acc_num || item.upi_id || item.card_no}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div style={{ fontFamily: "Gilroy", }}>
                          <p
                            className="text-muted mb-0"
                            style={{
                              fontSize: 14,
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "#4B4B4B",
                            }}
                          >
                            {item.setus_default === 1
                              ? "Default:Credit A/C"
                              : item.setus_default === 2
                                ? "Default:Debit A/C"
                                : item.setus_default === 3
                                  ? "Default:Both A/C"
                                  : ""}
                          </p>

                          {item.setus_default === 0 && (
                            <p
                              style={{
                                color: bankingAddPermission
                                  ? "#ccc"
                                  : "#007bff",
                                cursor: bankingAddPermission
                                  ? "not-allowed"
                                  : "pointer",
                                marginBottom: 0,
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                              }}
                              onClick={() => {
                                if (!bankingAddPermission) {
                                  handleAccountTypeChange(item);
                                }
                              }}
                            >
                              Set as default account
                            </p>
                          )}
                        </div>

                        <span
                          href={bankingAddPermission ? "#" : undefined}
                          onClick={(e) => {
                            if (bankingAddPermission) {
                              e.preventDefault();
                            } else {
                              handleAccountTypeChange(item);
                            }
                          }}
                          className={
                            bankingAddPermission ? "text-muted" : "text-primary"
                          }
                          style={{
                            textAlign: "end",
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            textDecoration: "none",
                            cursor: bankingAddPermission
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          Change
                        </span>
                      </div>
                      {showAccountTypeOptions === item.id && (
                        <div
                          className="account-type-dropdown"
                          onMouseDown={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute",
                            top: 70,
                            left: 50,
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #EBEBEB",
                            borderRadius: "10px",
                            padding: "10px",
                            zIndex: 1000,
                            width: 150,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <label style={{ display: "block", marginBottom: "5px" }}>
                            <input
                              type="radio"
                              name={`accountType-${item.id}`}
                              value={1}
                              checked={selectedAccountType === 1}
                              onChange={handleAccountTypeSelection}
                            />{" "}
                            Credit A/C
                          </label>
                          <label style={{ display: "block", marginBottom: "5px" }}>
                            <input
                              type="radio"
                              name={`accountType-${item.id}`}
                              value={2}
                              checked={selectedAccountType === 2}
                              onChange={handleAccountTypeSelection}
                            />{" "}
                            Debit A/C
                          </label>
                          <label style={{ display: "block", marginBottom: "5px" }}>
                            <input
                              type="radio"
                              name={`accountType-${item.id}`}
                              value={3}
                              checked={selectedAccountType === 3}
                              onChange={handleAccountTypeSelection}
                            />{" "}
                            Both A/C
                          </label>
                        </div>
                      )}

                    </div>

                    <div
                      className="card-footer d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <img
                          src={money}
                          alt="money"
                          width={18}
                          height={18}
                          style={{ marginTop: "-5px" }}
                        />{" "}
                        Balance
                      </span>
                      {item.balance === 0 ||
                        item.balance === "" ||
                        item.balance === null ? (
                        <span
                          href={bankingAddPermission ? "#" : undefined}
                          className={
                            bankingAddPermission ? "text-muted" : "text-primary"
                          }
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: bankingAddPermission ? "gray" : "blue",
                            textDecoration: "none",
                            cursor: bankingAddPermission
                              ? "not-allowed"
                              : "pointer",
                          }}
                          onClick={(e) => {
                            if (bankingAddPermission) {
                              e.preventDefault();
                            } else {
                              handleShowAddBalance(item);
                            }
                          }}
                        >
                          +Add Amount
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: "black",
                          }}
                        >
                          ₹{item.balance}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <></>

            )}
          </div>

          <div style={{ marginTop: 30 }} className="container bankingtab-table ms-2 me-4">

            {sortedData?.length > 0 ? (
              <div
                className=" booking-table-userlist  booking-table"
                style={{ paddingBottom: "20px", marginLeft: "-22px" }}
              >
                <div

                  className='show-scrolls'
                  style={{

                    height: sortedData?.length >= 5 || sortedData?.length >= 5 ? "250px" : "auto",
                    overflow: "auto",
                    borderTop: "1px solid #E8E8E8",
                    marginBottom: 20,
                    marginTop: "20px",
                    paddingRight: 0,
                    paddingLeft: 0
                  }}
                >
                  <Table
                    responsive="md"

                    style={{
                      fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                      top: 0,
                      zIndex: 1,
                      borderRadius: 0
                    }}
                  >
                    <thead style={{
                      fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                      top: 0,
                      zIndex: 1
                    }}>
                      <tr>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            paddingLeft: "20px",
                            whiteSpace: "nowrap"

                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bank_name", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bank_name", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Account Name</div>
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("date", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("date", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Date</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Amount</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("desc", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("desc", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Description</div>
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("type", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("type", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Transaction</div>
                        </th>

                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {sortedData?.map((user) => {
                        let Dated = new Date(user.date);

                        let day = Dated.getDate();
                        let month = Dated.getMonth();
                        let year = Dated.getFullYear();


                        const monthNames = [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ];

                        let formattedMonth = monthNames[month];

                        let formattedDate = `${day} ${formattedMonth} ${year}`;

                        return (
                          <tr
                            key={user.id}
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              textAlign: "center",
                              marginTop: 10,
                            }}
                          >
                            <td
                              style={{
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                paddingTop: 15,
                                marginLeft: 20
                              }}
                              className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                            >
                              <div className="ps-2 ps-lg-2">
                                {user.benificiary_name} - {user.type}
                              </div>

                            </td>
                            <td
                              style={{
                                paddingTop: 15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                marginTop: 10,
                                whiteSpace: "nowrap",

                              }}
                              className="ps-2 ps-lg-2"
                            >
                              <span
                                style={{
                                  paddingTop: "3px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  marginLeft: 8,
                                  paddingBottom: "3px",
                                  borderRadius: "60px",
                                  textAlign: "center",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  backgroundColor: "#EBEBEB",
                                }}
                              >
                                {formattedDate}
                              </span>
                            </td>
                            <td
                              style={{
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                paddingTop: 15,
                              }}
                              className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                            >
                              {user.amount}
                            </td>
                            <td
                              style={{
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                paddingTop: 15,
                              }}
                              className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                            >
                              {user.desc}
                            </td>
                            <td
                              style={{
                                paddingTop: 15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                              }}
                              className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",

                                  backgroundColor: "#EBEBEB",

                                  textAlign: "start",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >

                                {user.desc === "Invoice"
                                  ? "Credit" : "Debit"
                                }
                              </span>
                            </td>


                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>

            ) : (

              <div>
                {!loader && currentRowTransaction.length === 0 &&

                  <div>

                    <div style={{ textAlign: "center" }}>
                      <img
                        src={emptyimg}
                        width={240}
                        height={240}
                        alt="emptystate"
                      />
                    </div>
                    <div
                      className="pb-1"
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 18,
                        color: "rgba(75, 75, 75, 1)",
                      }}
                    >
                      No Transaction{" "}
                    </div>
                    <div
                      className="pb-1"
                      style={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        fontSize: 14,
                        color: "rgba(75, 75, 75, 1)",
                      }}
                    >
                      There are no Transaction available.{" "}
                    </div>
                  </div>
                }
                {loader &&
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: '200px',
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
                  </div>
                }
              </div>
            )}

            {transactionFilterddata?.length > 5 && (
              <nav
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
                  right: '16px',
                  backgroundColor: "#fff"
                }}
              >
                <div>
                  <Select
                    options={transactionPageOptions}
                    value={
                      transactionrowsPerPage
                        ? { value: transactionrowsPerPage, label: `${transactionrowsPerPage}` }
                        : null
                    }
                    onChange={handleItemsPerPageChange}
                    placeholder="Rows per page"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No options"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "40px",
                        border: "1px solid #1E45E1",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: "#1E45E1",
                       fontWeight: 600,
                        fontFamily: "Gilroy",
                        boxShadow: "0 0 0 1px #1E45E1",
                        cursor: "pointer",
                         width:90,
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
                        color: state.isFocused ? "#fff" : "#000",
                      }),
                    }}
                  />
                </div>

                <ul className="selectoption"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >

                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color:
                          transactioncurrentPage === 1 ? "#ccc" : "#1E45E1",
                        cursor:
                          transactioncurrentPage === 1
                            ? "not-allowed"
                            : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() =>
                        handlePageChange(transactioncurrentPage - 1)
                      }
                      disabled={transactioncurrentPage === 1}
                    >
                      <ArrowLeft2
                        size="16"
                        color={
                          transactioncurrentPage === 1 ? "#ccc" : "#1E45E1"
                        }
                      />
                    </button>
                  </li>

                  <li
                    style={{
                      margin: "0 10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {transactioncurrentPage} of {totalPagesTransaction}
                  </li>

                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color:
                          transactioncurrentPage === totalPagesTransaction
                            ? "#ccc"
                            : "#1E45E1",
                        cursor:
                          transactioncurrentPage === totalPagesTransaction
                            ? "not-allowed"
                            : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() =>
                        handlePageChange(transactioncurrentPage + 1)
                      }
                      disabled={
                        transactioncurrentPage === totalPagesTransaction
                      }
                    >
                      <ArrowRight2
                        size="16"
                        color={
                          transactioncurrentPage === totalPagesTransaction
                            ? "#ccc"
                            : "#1E45E1"
                        }
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <Modal
            show={deleteShow}
            onHide={handleCloseDelete}
            centered
            backdrop="static"
            dialogClassName="custom-delete-modal"
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                className="w-100 text-center"
                style={{
                  fontSize: "18px",
                  fontFamily: "Gilroy",

                  fontWeight: 600,
                  color: "#222222",

                }}
              >
                Delete Banking?
              </Modal.Title>
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
              Are you sure you want to delete this Bank-details?
            </Modal.Body>

            <Modal.Footer
              className="d-flex justify-content-center"
              style={{

                borderTop: "none",
                marginTop: "-10px",
              }}
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
                onClick={handleDeleteBank}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showAddBalance}
            onHide={() => handleCloseAddBalance()}
            backdrop="static"
            centered
            className="modal-dialog-centered"
            style={{
              maxWidth: "353px",
              width: "80vw",
            }}
          >
            <Modal.Header
              style={{ position: "relative" }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Add Balance
              </div>
              <CloseCircle size="24" color="#000" onClick={handleCloseAddBalance}
                style={{ cursor: 'pointer' }} />

            </Modal.Header>
            <Modal.Body className="pt-2">
              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Account{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Account"
                    value={AddBankName}

                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-12" style={{ marginTop: -10 }}>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: "0.875rem",
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Balance {""}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Amount"
                    value={AddBankAmount}
                    onChange={(e) => handleAddBankAmount(e)}
                    style={{
                      fontSize: "1rem",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: "50px",
                      borderRadius: "8px",
                    }}
                  />
                  {amountError && (
                    <div style={{ color: "red", fontSize: "14px", marginTop: "5px", fontFamily: "Gilroy" }}>
                      <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                      {amountError}</div>)}
                </Form.Group>





                {state.createAccount?.networkError ?
                  <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                  </div>
                  : null}



                <Button
                  className="col-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: "50px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontFamily: "Gilroy",
                    marginTop: "10px",
                  }}
                  onClick={handleAddAmountSubmit}
                >
                  Add balance
                </Button>
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
          </Modal>




          <Modal show={selfTranfer} onHide={handleCloseSElfTransfer} centered backdrop="static">

            <Modal.Header
              style={{ position: "relative" }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  color: "#1E45E1"
                }}
              >
                Self Transfer
              </div>
              <CloseCircle size="24" color="#000" onClick={handleCloseSElfTransfer}
                style={{ cursor: 'pointer' }} />

            </Modal.Header>

            <Modal.Body>
              <div>
                <h6 style={{ color: "#4B4B4B", fontSize: 16, fontWeight: 500, fontFamily: "Gilroy" }}>From</h6>

                <div className="d-flex align-items-center p-3" style={{ borderBottom: "1px solid #ccc" }}>
                  <img
                    src={banklogo}
                    style={{ marginTop: "-10px" }}
                    width="50"
                    height="50"
                    className="me-3"
                    alt="bank"
                  />

                  <div className="w-100 d-flex justify-content-between align-items-start">
                    <div>
                      <div style={{ fontWeight: 600, color: "#1A1A1A", fontFamily: "Gilroy", fontSize: 14 }}>Canara Bank</div>
                      <div className="small text-muted" style={{ fontFamily: "Gilroy", fontSize: 12 }}>Savings A/C</div>
                    </div>

                    <div className="text-end" style={{ fontFamily: "Gilroy" }}>
                      <div style={{ fontWeight: 500, color: "#1A1A1A", fontSize: 14 }}>Immanuel</div>
                      <div className="small" style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400 }}>4561 2013 6210 6540</div>
                      <div className="small fw-semibold" style={{ color: "#1E45E1" }}>
                        Avl Bal : ₹10,000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="mb-3">
                <h6 className="mt-1" style={{ color: "#4B4B4B", fontSize: 16, fontWeight: 500, fontFamily: "Gilroy" }}>To</h6>

                <div className="d-flex align-items-center p-3" >
                  <img
                    src={banklogo}
                    style={{ marginTop: "-10px" }}
                    width="50"
                    height="50"
                    className="me-3"
                    alt="bank"
                  />

                  <div className="w-100 d-flex justify-content-between align-items-start">
                    <div>
                      <div style={{ fontWeight: 600, color: "#1A1A1A", fontFamily: "Gilroy", fontSize: 14 }}> State Bank of India</div>
                      <div className="small text-muted" style={{ fontFamily: "Gilroy", fontSize: 12 }}>Savings A/C</div>
                    </div>

                    <div className="text-end" style={{ fontFamily: "Gilroy" }}>
                      <div style={{ fontWeight: 500, color: "#1A1A1A", fontSize: 14 }}>Immanuel</div>
                      <div className="small" style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400 }}>4561 2013 6210 6540</div>
                      <div className="small fw-semibold" style={{ color: "#1E45E1" }}>
                        Avl Bal : ₹10,000.00
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3" style={{ marginTop: "-10px" }}>
                  <img
                    src={banklogo}
                    style={{ marginTop: "-10px" }}
                    width="50"
                    height="50"
                    className="me-3"
                    alt="bank"
                  />

                  <div className="w-100 d-flex justify-content-between align-items-start">
                    <div>
                      <div style={{ fontWeight: 600, color: "#1A1A1A", fontFamily: "Gilroy", fontSize: 14 }}> ICICI</div>
                      <div className="small text-muted" style={{ fontFamily: "Gilroy", fontSize: 12 }}>Savings A/C</div>
                    </div>

                    <div className="text-end" style={{ fontFamily: "Gilroy" }}>
                      <div style={{ fontWeight: 500, color: "#1A1A1A", fontSize: 14 }}>Immanuel</div>
                      <div className="small" style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400 }}>4561 2013 6210 6540</div>
                      <div className="small fw-semibold" style={{ color: "#1E45E1" }}>
                        Avl Bal : ₹10,000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 rounded-start">₹</span>
                <input
                  type="text"
                  className="form-control border-start-0 rounded-end"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleChange}
                  style={{ boxShadow: 'none', outline: "none", fontFamily: "Gilroy" }}
                />
              </div>


              <div className="text-end mt-3">
                <Button variant="primary" >
                  Transfer
                </Button>
              </div>
            </Modal.Body>
          </Modal>





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
      )}
    </>
  );
}
export default Banking;
