/* eslint-disable react-hooks/exhaustive-deps */
import Filters from "../Assets/Images/Filters.svg";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import "./Banking.css";
import React, { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingAddForm from "./BankingAddForm";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import Modal from "react-bootstrap/Modal";
import BankingEditTransaction from "./BankingTransaction";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import {ArrowLeft2,ArrowRight2,} from "iconsax-react";
import money from "../Assets/Images/New_images/Amount.png";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {CloseCircle} from "iconsax-react";




function Banking() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
   const { RangePicker } = DatePicker;
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
  const [EditTransaction, setEditTransaction] = useState(null);
  const [EditTransactionForm, setEditTransactionForm] = useState(false);
  const [deleteTransactionForm, setDeleteTransactionForm] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editAddBank, setEditAddBank] = useState("");
  const [edit, setEdit] = useState(false);
  const [AddBankName, setAddBankName] = useState("");
  const [AddBankAmount, setAddBankAmount] = useState("");
  const [updateTransaction, setUpdateTransaction] = useState("");
  const [deleteBankId, setDeleteBankId] = useState("");
  const [trnseId, setDeleteTransId] = useState("");
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

  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    setBankingRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner === 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_view === 1
    ) {
      setBankingPermissionError("");
    } else {
      setBankingPermissionError("Permission Denied");
    }
  }, [bankingrolePermission]);

  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner === 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_create === 1
    ) {
      setBankingAddPermission("");
    } else {
      setBankingAddPermission("Permission Denied");
    }
  }, [bankingrolePermission]);

  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner === 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_delete === 1
    ) {
      setBankingDeletePermission("");
    } else {
      setBankingDeletePermission("Permission Denied");
    }
  }, [bankingrolePermission]);
  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner === 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_edit === 1
    ) {
      setBankingEditPermission("");
    } else {
      setBankingEditPermission("Permission Denied");
    }
  }, [bankingrolePermission]);

  useEffect(() => {
    setLoader(true);
    dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
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
    // setSearch(false);
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
  

  // useEffect(() => {
  //   const handleClickOutsideAccount = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setShowAccountTypeOptions(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutsideAccount);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideAccount);
  //   };
  // }, []);

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
      setSelectedAccountType(defaltType); // Set the selectedAccountType to the default
    }
  }, [showAccountTypeOptions, defaltType]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForDefaultAccount === 200) {
      // setLoading(false);
      setShowAccountTypeOptions(null);
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DEFAULT_ACCOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDefaultAccount]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBankingAmount === 200) {
      // setLoading(false);
      handleCloseAddBalance();
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BANK_AMOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBankingAmount]);
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
    // setdotsshowbank(false);
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
    // setdotsshowbank(false);
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleEditTrans = (id, event) => {
    setEditTransaction((prevId) => (prevId === id ? null : id));

    const { top, left} = event.target.getBoundingClientRect();
    const popupTop = top - 10;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setEditTransaction(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditTransForm = (item) => {
    setUpdateTransaction(item);
    setEditTransactionForm(true);
    setEditTransaction(false);
    setDeleteTransactionForm(false);
    setOpenMenuId(null);
  };
  const handleCloseTransactionDelete = () => {
    setDeleteTransactionForm(false);
  };
  const handleDeleteTransForm = (u) => {
    setDeleteTransId(u.id);
    setDeleteTransactionForm(true);
    setEditTransactionForm(false);
    setEditTransaction(false);
  };
  const handleDeleteTransSubmit = () => {
    dispatch({
      type: "DELETEBANKTRANSACTIONS",
      payload: { id: trnseId },
    });
  };
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
    setAddBankName(item.bank_name);
    setAddBankName(item.acc_name);
    setTypeId(item.id);
    setshowAddBalance(true);
    // setdotsshowbank(false);
  };
  const handleCloseAddBalance = () => {
    setshowAddBalance(false);
    setAddBankAmount("");
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
  };

  const [transactionrowsPerPage, setTransactionrowsPerPage] = useState(5);
  const [transactioncurrentPage, settransactioncurrentPage] = useState(1);

  const indexOfLastRowTransaction =
    transactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowTransaction =
    indexOfLastRowTransaction - transactionrowsPerPage;
  // const currentRowTransaction = transactionFilterddata?.slice(
  //   indexOfFirstRowTransaction,
  //   indexOfLastRowTransaction
  // );
  const currentRowTransaction =
    filterInput.length > 0
      ? transactionFilterddata
      : transactionFilterddata?.slice(indexOfFirstRowTransaction, indexOfLastRowTransaction);

  const handlePageChange = (pageNumber) => {
    settransactioncurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setTransactionrowsPerPage(Number(event.target.value));
  };

  const totalPagesTransaction = Math.ceil(
    transactionFilterddata?.length / transactionrowsPerPage
  );


  useEffect(() => {
    const FilterUser = Array.isArray(transactionFilterddata)
      ? transactionFilterddata?.filter((item) =>
        item.bank_name?.toLowerCase().includes(filterInput.toLowerCase())
      )
      : [];

    settransactionFilterddata(FilterUser);
  }, [filterInput]);
  useEffect(() => {
    if (transactionFilterddata.length > 0 && originalBills?.length === 0) {
      setOriginalBills(transactionFilterddata);
    }
  }, [transactionFilterddata]);

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    settransactionFilterddata(originalBills);
  };

  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };

  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    setDropdownVisible(e.target.value.length > 0);
    settransactionFilterddata(originalBillsFilter)
  };
  const handleUserSelect = (user) => {
    setFilterInput(user.bank_name);


    const selectedUserData = transactionFilterddata?.filter(
      (item) => item.bank_name === user.bank_name
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
      // Don't filter yet - wait for date selection
      settransactionFilterddata(originalBillsFilter);
    } else {
      const filtered = originalBillsFilter?.filter((user) => {
        return user.type !== undefined && String(user.type) === String(value);
      });
      settransactionFilterddata(filtered);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  
    if (!dates || dates.length !== 2) {
      settransactionFilterddata(originalBillsFilter);  // Reset to all data
      setStatusfilter("All");                          // Reset dropdown to "All"
      return;
    }
  
    const [start, end] = dates;
  
    const filtered = originalBillsFilter?.filter((item) => {
      const itemDate = dayjs(item.date); // Replace with your actual field
      return itemDate.isAfter(dayjs(start).subtract(1, "day")) &&
             itemDate.isBefore(dayjs(end).add(1, "day"));
    });
  
    settransactionFilterddata(filtered);
  };
  
  // const handleDateRangeChange = (dates) => {
  //   setDateRange(dates);
  
  //   if (!dates || dates.length !== 2) {
  //     settransactionFilterddata(originalBillsFilter);
  //     return;
  //   }
  
  //   const [start, end] = dates;
  
  //   const filtered = originalBillsFilter?.filter((item) => {
  //     const itemDate = dayjs(item.date); // Assuming your bill data has a `date` field
  //     return itemDate.isAfter(start.subtract(1, "day")) && itemDate.isBefore(end.add(1, "day"));
  //   });
  
  //   settransactionFilterddata(filtered);
  // };
  // const handleStatusFilter = (event) => {
  //   const searchTerm = event.target.value;;
  //   setStatusfilter(searchTerm);

  //   if (searchTerm === "All") {
  //     settransactionFilterddata(originalBillsFilter);
  //   } else {
  //     const filteredItems = originalBillsFilter?.filter((user) => {
  //       return (
  //         user.type !== undefined && String(user.type) === String(searchTerm)
  //       );
  //     });

  //     settransactionFilterddata(filteredItems);
  //   }
  // };

  useEffect(() => {
    if (originalBillsFilter.length === 0 && transactionFilterddata.length > 0) {
      setOriginalBillsFilter(transactionFilterddata);
    }
  }, [transactionFilterddata]);

  

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

        style={{paddingLeft:4,paddingRight:4, marginTop:3}}  >
            <div className="ms-2">
              <label style={{
                fontSize: 18,
                color: "#000000",
                fontWeight: 600,
                fontFamily: "Gilroy",
                marginTop:17
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
                    // width: "100%",
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
                         cursor:"pointer",
                        
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

                        // style={{ marginRight: 20 }}

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
                            width:"160px",
                            height:40
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
                            // const imagedrop = user.profile || Profile;
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
                                
                                <span>{user.bank_name}</span>
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

                  <div style={{ paddingRight: 15 ,cursor:"pointer"}}>
                    <Image
                      src={searchteam}
                      roundedCircle
                      style={{ height: "24px", width: "24px" }}
                      onClick={handleSearch}
                    />
                  </div>
                </>
              )}


              <div style={{ paddingRight: 15,cursor:"pointer" }}>
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
                style={{ border: "1px solid #D4D4D4", borderRadius: 8,    width: search ? "120px" : "120px", }}>

                  <Form.Select
                    onChange={(e) => handleStatusFilter(e)}
                    value={statusfilter}
                    aria-label="Select Price Range"
                    id="statusselect"
                    style={{
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      cursor:"pointer"
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
        format="YYYY-MM-DD"
        onChange={handleDateRangeChange}
        style={{ height: "38px", borderRadius: 8,cursor:"pointer"}}
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
  + Bank
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
                            {item.bank_name}
                          </p>
                          <p
                            className="text-muted mb-0"
                            style={{
                              fontSize: 12,
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "#4B4B4B",
                            }}
                          >
                            {item.acc_name}-Savings A/C
                          </p>
                        </div>
                        {/* <img
                          src={more}
                          width={20}
                          height={20}
                          onClick={() => handleShowDots(item.id)}
                          alt="More options"
                          style={{ cursor: "pointer" }}
                        /> */}
                        <div style={{ cursor: "pointer",
                              height: 40,
                              width: 40,
                              borderRadius: 100,
                              border: "1px solid #EFEFEF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              backgroundColor: openMenuId === item.id   ? "#E7F1FF": "white"
                             
                                }} onClick={() => handleShowDots(item.id)}>
                        <PiDotsThreeOutlineVerticalFill
                         
                          alt="More options"
                              style={{ height: 20, width: 20,cursor:"pointer" }}
                            />
                            </div>
                        {openMenuId === item.id && (
                          <div
                            ref={popupRef}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#F9F9F9",
                              position: "absolute",
                              right: 10,
                              top: 60,
                              width: 120,
                              height: 70,
                              border: "1px solid #EBEBEB",
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              alignItems: "start",
                              zIndex: 9999,
                            }}
                          >
                            <div
                              className="mb-2 d-flex justify-content-start align-items-center gap-2"
                              style={{
                                cursor: bankingEditPermission
                                  ? "not-allowed"
                                  : "pointer",
                                pointerEvents: bankingEditPermission
                                  ? "none"
                                  : "auto",
                                opacity: bankingEditPermission ? 0.5 : 1,
                              }}
                              onClick={() => {
                                if (!bankingEditPermission) {
                                  handleEditAddBank(item);
                                }
                              }}
                            >
                              <img
                                src={Edit}
                                style={{ height: 16, width: 16 }}
                                alt="Edit"
                              />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy, sans-serif",
                                  color: "#000000",
                                  cursor: bankingEditPermission
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                Edit
                              </label>
                            </div>

                            <div
                              className="mb-2 d-flex justify-content-start align-items-center gap-2"
                              style={{
                                cursor: bankingDeletePermission
                                  ? "not-allowed"
                                  : "pointer",
                                pointerEvents: bankingDeletePermission
                                  ? "none"
                                  : "auto",
                                opacity: bankingDeletePermission ? 0.5 : 1,
                              }}
                              onClick={() => {
                                if (!bankingDeletePermission) {
                                  handleDeleteForm(item);
                                }
                              }}
                            >
                              <img
                                src={Delete}
                                style={{ height: 16, width: 16 }}
                                alt="Delete"
                              />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy, sans-serif",
                                  color: "#FF0000",
                                  cursor: bankingDeletePermission
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                Delete
                              </label>
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
                        {item.acc_num}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
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
    onMouseDown={(e) => e.stopPropagation()} // ← this line is key
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

                    {/* Card Footer */}
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

          <div style={{ marginTop: 30 }} className="container">
            {currentRowTransaction?.length > 0 ? (
              <div
                style={{
                  // height: "400px",
                  height: currentRowTransaction.length >= 4 ? "240px" : "auto",
                  overflowY:
                    currentRowTransaction.length >= 4 ? "auto" : "visible",
                  borderRadius: "24px",
                  border: "1px solid #DCDCDC",

                  // borderBottom:"none"
                }}
              >

                <Table
                  responsive="md"
                  className="Table_Design"
                  style={{
                    border: "1px solid #DCDCDC",
                    borderBottom: "1px solid transparent",
                    borderEndStartRadius: 0,
                    borderEndEndRadius: 0,
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#E7F1FF",
                      zIndex: 1,
                      position: "sticky",
                      top: 0,
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          textAlign: "start",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          paddingLeft: "20px",
                          borderTopLeftRadius: 24,
                        }}
                      >
                        Account Name
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          textAlign: "start",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          textAlign: "start",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Description
                      </th>

                      <th
                        style={{
                          textAlign: "start",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Transaction
                      </th>
                      <th
                        style={{
                          textAlign: "start",
                          padding: "10px",
                          color: "rgb(147, 147, 147)",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      ></th>
                      <th
                        style={{
                          textAlign: "center",
                          fontFamily: "Gilroy",
                          color: "rgb(147, 147, 147)",
                          fontSize: 14,
                          fontWeight: 500,
                          borderTopRightRadius: 24,
                        }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {currentRowTransaction?.map((user) => {
                      let Dated = new Date(user.date);

                      let day = Dated.getDate();
                      let month = Dated.getMonth();
                      let year = Dated.getFullYear();

                      // Array of month names abbreviated to the first 3 letters
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
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                            marginTop: 10,
                          }}
                        >
                          <td
                            style={{
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              paddingTop: 15,
                              paddingLeft: "20px",
                            }}
                          >
                            {user.bank_name}
                          </td>
                          <td
                            style={{
                              paddingTop: 15,
                              border: "none",
                              textAlign: "center",
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              marginTop: 10,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                paddingTop: "3px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                paddingBottom: "3px",
                                borderRadius: "60px",
                                // backgroundColor: "#FFEFCF",
                                textAlign: "start",
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                              }}
                            >
                              {formattedDate}
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
                            {user.amount}
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
                            {user.desc}
                          </td>
                          <td
                            style={{
                              paddingTop: 15,
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                paddingTop: "3px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                paddingBottom: "3px",
                                borderRadius: "60px",
                                // backgroundColor: "#FFEFCF",
                                // backgroundColor:
                                //   user.type === 1
                                //     ? "#C8E6C9"
                                //     : user.type === 2
                                //       ? "#FFE0B2"
                                //       : "#FFEFCF",
                                textAlign: "start",
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                              }}
                            >
                              {user.type === 1
                                ? "Credit"
                                : user.type === 2
                                  ? "Debit"
                                  : "Account"}
                            </span>
                          </td>

                          <td
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
                              marginTop: 10,
                              backgroundColor:
                                EditTransaction === user.id
                                  ? "#E7F1FF"
                                  : "white",
                              //zIndex:
                                //EditTransaction === user.id ? 1000 : "auto",
                            }}
                            onClick={(e) => handleEditTrans(user.id, e)}
                          >
                            <PiDotsThreeOutlineVerticalFill
                              style={{ height: 20, width: 20 }}
                            />
                            {EditTransaction === user.id && (
                              <div
                                ref={popupRef}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#F9F9F9",
                                  // position: "absolute",
                                  // right: 80,
                                  // top: 8,
                                  marginLeft:10,
                                  position: "fixed",
                                  top: popupPosition.top,
                                  left: popupPosition.left,
                                  width: 120,
                                  height: 70,
                                  border: "1px solid #EBEBEB",
                                  borderRadius: 10,
                                  display: "flex",
                                  flexDirection: "column",
                                  padding: 10,
                                  alignItems: "start",
                                  // zIndex: 9999,
                                }}
                              >
                                <div
                                  className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                  style={{
                                    cursor: bankingEditPermission
                                      ? "not-allowed"
                                      : "pointer",
                                    pointerEvents: bankingEditPermission
                                      ? "none"
                                      : "auto",
                                    opacity: bankingEditPermission ? 0.6 : 1,
                                  }}
                                  onClick={() => {
                                    if (!bankingEditPermission) {
                                      handleEditTransForm(user);
                                    }
                                  }}
                                >
                                  <img
                                    src={Edit}
                                    style={{ height: 16, width: 16 }}
                                    alt="Edit"
                                  />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      color: "#000000",
                                      cursor: bankingEditPermission
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    Edit
                                  </label>
                                </div>

                                <div
                                  className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                  style={{
                                    cursor: bankingDeletePermission
                                      ? "not-allowed"
                                      : "pointer",
                                    pointerEvents: bankingDeletePermission
                                      ? "none"
                                      : "auto",
                                    opacity: bankingDeletePermission ? 0.6 : 1,
                                  }}
                                  onClick={() => {
                                    if (!bankingDeletePermission) {
                                      handleDeleteTransForm(user);
                                    }
                                  }}
                                >
                                  <img
                                    src={Delete}
                                    style={{ height: 16, width: 16 }}
                                    alt="Delete"
                                  />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      color: "#FF0000",
                                      cursor: bankingDeletePermission
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    Delete
                                  </label>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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
                        fontSize: 20,
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
                        fontSize: 16,
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

            {transactionFilterddata?.length >= 5 && (
              // <nav
              //   style={{
              //     display: "flex",
              //     alignItems: "center",
              //     justifyContent: "end",
              //     padding: "10px",
              //     position: "fixed",
              //     bottom: "10px",
              //     right: "10px",
              //     backgroundColor: "#fff",
              //     borderRadius: "5px",
              //     zIndex: 1000,
              //     marginTop: 10
              //   }}
              // >
              // <nav className='pagination-code'
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "end",
              //   padding: "15px",
              //   backgroundColor: "#fff",
              //   borderRadius: "5px",
              //   width: "100%", 
              //   marginTop: "20px", 
              //   position: "relative", 
              //   zIndex: 1000,
              // }}
              // >
              <nav className="pagination-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                padding: "10px",
                position: "fixed",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >

                <div>
                  <select
                    value={transactionrowsPerPage}
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
              style={{ marginBottom: "30px", position: "relative" }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Add balance
              </div>
              <CloseCircle size="24" color="#000" onClick={handleCloseAddBalance} 
            style={{ cursor: 'pointer' }}/>
              {/* <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleCloseAddBalance}
                style={{
                  position: "absolute",
                  right: "15px",
                  marginTop: -5,
                  border: "1px solid black",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                }}
              >
              <span
                        aria-hidden="true"
                        style={{
                          fontSize: "30px",
                          paddingBottom: "5px",
                        }}
                      >
                        &times;
                      </span>
              </button> */}
            </Modal.Header>
            <Modal.Body>
              <div className="col-12" style={{ marginTop: "-35px" }}>
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
                    placeholder="Enter amount"
                    value={AddBankName}
                    // onChange={(e) => handleAccountName(e)}
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

              <div className="col-12" style={{marginTop:-10}}>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: "0.875rem",
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Balance
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
                </Form.Group>
                 
                {amountError && (
                  <div style={{ color: "red", fontSize: "14px", marginTop: "5px",textAlign:"center" }}>
                     <MdError style={{fontSize:"14",marginRight:"5px"}}/>
                    {amountError}</div>)}
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
            {/* <Modal.Footer className="d-flex justify-content-center"> */}
             
            {/* </Modal.Footer> */}
          </Modal>

          <Modal
            show={deleteTransactionForm}
            onHide={() => handleCloseTransactionDelete()}
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
                Delete Transaction?
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
              Are you sure you want to delete this Transaction?
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
                onClick={handleCloseTransactionDelete}
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
                onClick={handleDeleteTransSubmit}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {EditTransactionForm === true ? (
            <BankingEditTransaction
              setEditTransactionForm={setEditTransactionForm}
              EditTransactionForm={EditTransactionForm}
              setDeleteTransactionForm={setDeleteTransactionForm}
              deleteTransactionForm={deleteTransactionForm}
              setUpdateTransaction={setUpdateTransaction}
              updateTransaction={updateTransaction}
            />
          ) : null}

          {showForm === true ? (
            <BankingAddForm
              handleShowForm={handleShowForm}
              showForm={showForm}
              setShowForm={setShowForm}
              editAddBank={editAddBank}
              setEditAddBank={setEditAddBank}
              setEdit={setEdit}
              edit={edit}
              updateTransaction={updateTransaction}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
export default Banking;
