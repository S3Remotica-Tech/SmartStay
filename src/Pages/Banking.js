import Filters from "../Assets/Images/Filters.svg";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import "./Banking.css";
import React, { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { borderRadius } from "@mui/system";
import more from "../Assets/Images/New_images/more (1).png";
import { Dropdown, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import squre from "../Assets/Images/New_images/minus-square.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingAddForm from "./BankingAddForm";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import Modal from "react-bootstrap/Modal";
import BankingEditTransaction from "./BankingTransaction";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import money from "../Assets/Images/New_images/Group 1261154824.png";
import { MdError } from "react-icons/md";

function Banking() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const editRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dotsshowbank, setdotsshowbank] = useState(false);
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
  const [changeAmount, setchangeAmount] = useState("");
  const [editAddBank, setEditAddBank] = useState("");
  const [edit, setEdit] = useState(false);
  const [AddBankName, setAddBankName] = useState("");
  const [AddBankAmount, setAddBankAmount] = useState("");
  const [updateTransaction,setUpdateTransaction] = useState("")
  const [deleteBankId,setDeleteBankId]=useState("")
  const[trnseId,setDeleteTransId] =useState("")
  const [bankingrolePermission, setBankingRolePermission] = useState("");
  const [bankingpermissionError, setBankingPermissionError] = useState("");
  const [bankingAddPermission,setBankingAddPermission]= useState("")
  const [bankingDeletePermission,setBankingDeletePermission]=useState("")
  const [bankingEditPermission,setBankingEditPermission]=useState("")
  const [hostel_id,setHostel_Id]=useState("")

 useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id)
  }, [state?.login?.selectedHostel_Id]);


  useEffect(() => {
    setBankingRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner == 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_view == 1
    ) {
      setBankingPermissionError("");
    } else {
      setBankingPermissionError("Permission Denied");
    }
  }, [bankingrolePermission]);



  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner == 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_create == 1
    ) {
      setBankingAddPermission("");
    } else {
      setBankingAddPermission("Permission Denied");
    }
  }, [bankingrolePermission]);


  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner == 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_delete == 1
    ) {
      setBankingDeletePermission("");
    } else {
      setBankingDeletePermission("Permission Denied");
    }
  }, [bankingrolePermission]);
  useEffect(() => {
    if (
      bankingrolePermission[0]?.is_owner == 1 ||
      bankingrolePermission[0]?.role_permissions[16]?.per_edit == 1
    ) {
      setBankingEditPermission("");
    } else {
      setBankingEditPermission("Permission Denied");
    }
  }, [bankingrolePermission]);

  useEffect(() => {
    // setLoading(true);
    dispatch({ type: "BANKINGLIST",payload:{hostel_id:hostel_id}});
  }, [hostel_id]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

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
    setShowAccountTypeOptions((prevId) => (prevId === item.id ? null : item.id));
  };

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAccountTypeOptions(null); 
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAccount);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);
 
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
      dispatch({ type: "BANKINGLIST",payload:{hostel_id:hostel_id} });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DEFAULT_ACCOUNT" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForDefaultAccount]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBankingAmount === 200) {
      // setLoading(false);
      handleCloseAddBalance();
      dispatch({ type: "BANKINGLIST",payload:{hostel_id:hostel_id} });
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
    setEdit(false);
    setShowForm(true);
    setEditAddBank("");
    setOpenMenuId(false);
  };
  const handleDeleteForm = (v) => {
    setDeleteBankId(v.id)
    setDeleteShow(true);
    setdotsshowbank(false);
    setOpenMenuId(false);
  };
  const handleDeleteBank=()=>{
    dispatch({
      type: "DELETEBANKDETAILS",
      payload: { id:deleteBankId},
    });
  }
  useEffect(()=>{
    if(state.bankingDetails.statusCodeDeleteBank === 200){
      handleCloseDelete()
      dispatch({ type: "BANKINGLIST" ,payload:{hostel_id:hostel_id}});
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING" });
      }, 1000);
    }
  },[state.bankingDetails.statusCodeDeleteBank])
  
  const handleCloseDelete = () => {
    setDeleteShow(false);
    setdotsshowbank(false);
  };

  const handleEditTrans = (id) => {
    setEditTransaction((prevId) => (prevId === id ? null : id));
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
    setUpdateTransaction(item)
    setEditTransactionForm(true);
    setEditTransaction(false);
    setDeleteTransactionForm(false);
    setOpenMenuId(null);
  };
  const handleCloseTransactionDelete = () => {
    setDeleteTransactionForm(false);
  };
  const handleDeleteTransForm = (u) => {
    setDeleteTransId(u.id)
    setDeleteTransactionForm(true);
    setEditTransactionForm(false);
    setEditTransaction(false);
  };
  const handleDeleteTransSubmit=()=>{
    dispatch({
      type: "DELETEBANKTRANSACTIONS",
      payload: { id:trnseId},
    });
  }
  useEffect(()=>{
    if(state.bankingDetails.statusCodeForDeleteTrans === 200){
      handleCloseTransactionDelete()
      dispatch({ type: "BANKINGLIST",payload:{hostel_id:hostel_id} });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BANKING_TRANSACTION" });
      }, 1000);
    }
  },[state.bankingDetails.statusCodeForDeleteTrans])

  const handleShowAddBalance = (item) => {
    setAddBankName(item.bank_name);
    setTypeId(item.id);
    setshowAddBalance(true);
    setdotsshowbank(false);
  };
  const handleCloseAddBalance = () => {
    setshowAddBalance(false);
    setAddBankAmount("");
  };

  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };
  const handleCloseSearch = () => {
    setSearch(false);
    // setFilterInput("")
  };
  const handleAddBankAmount = (e) => {
    setAddBankAmount(e.target.value);
  };
  const handleAddAmountSubmit = () => {
    dispatch({
      type: "ADDBANKAMOUNT",
      payload: { id: typeId, amount: AddBankAmount,hostel_id:hostel_id },
    });
  };



  // const transactionrowsPerPage = 5;
    const [transactionrowsPerPage, setTransactionrowsPerPage] = useState(10);
  const [transactioncurrentPage, settransactioncurrentPage] = useState(1);
  const [transactionFilterddata, settransactionFilterddata] = useState([]);
  const indexOfLastRowTransaction = transactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowTransaction = indexOfLastRowTransaction - transactionrowsPerPage;
  const currentRowTransaction = transactionFilterddata?.slice(indexOfFirstRowTransaction, indexOfLastRowTransaction);


  // const handleTransactionPageChange = (transactionpageNumber) => {
  //   settransactioncurrentPage(transactionpageNumber);
  // };
  const handlePageChange = (pageNumber) => {
    settransactioncurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setTransactionrowsPerPage(Number(event.target.value));
  };


  const totalPagesTransaction = Math.ceil(transactionFilterddata?.length / transactionrowsPerPage);

  // const renderPageNumbersTransaction = () => {
  //   const pageNumbersTransaction = [];
  //   let startPageTransaction = transactioncurrentPage - 1;
  //   let endPageTransaction = transactioncurrentPage + 1;

  //   if (transactioncurrentPage === 1) {
  //     startPageTransaction = 1;
  //     endPageTransaction = 3;
  //   }

  //   if (transactioncurrentPage === totalPagesTransaction) {
  //     startPageTransaction = totalPagesTransaction - 2;
  //     endPageTransaction = totalPagesTransaction;
  //   }

  //   if (transactioncurrentPage === 2) {
  //     startPageTransaction = 1;
  //     endPageTransaction = 3;
  //   }

  //   if (transactioncurrentPage === totalPagesTransaction - 1) {
  //     startPageTransaction = totalPagesTransaction - 2;
  //     endPageTransaction = totalPagesTransaction;
  //   }

  //   for (let i = startPageTransaction; i <= endPageTransaction; i++) {
  //     if (i > 0 && i <= totalPagesTransaction) {
  //       pageNumbersTransaction.push(
  //         <li key={i} style={{ margin: '0 5px' }}>
  //           <button
  //             style={{
  //               padding: '5px 10px',
  //               textDecoration: 'none',
  //               color: i === transactioncurrentPage ? '#007bff' : '#000000',
  //               cursor: 'pointer',
  //               borderRadius: '5px',
  //               display: 'inline-block',
  //               minWidth: '30px',
  //               textAlign: 'center',
  //               backgroundColor: i === transactioncurrentPage ? 'transparent' : 'transparent',
  //               border: i === transactioncurrentPage ? '1px solid #ddd' : 'none'
  //             }}
  //             onClick={() => handleTransactionPageChange(i)}
  //           >
  //             {i}
  //           </button>
  //         </li>
  //       );
  //     }
  //   }

  //   return pageNumbersTransaction;
  // };

  useEffect(() => {
    settransactionFilterddata(state?.bankingDetails?.bankingList?.bank_trans)
  }, [state?.bankingDetails?.bankingList?.bank_trans])

  return (

   <>
   {
    bankingpermissionError ? (
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
    {/* Image */}
    <img
      src={emptyimg}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {/* Permission Error */}
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
        <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bankingpermissionError}</span>
      </div>
    )}
  </div></>
    ):
    <div style={{ padding: 10, marginLeft: 10 }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <label
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Banking
          </label>
        </div>

        <div className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap">
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
                    marginTop: "10px",
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
                      //   value={filterInput}
                      //   onChange={(e) => handlefilterInput(e)}
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

                {/* {isDropdownVisible && filteredUsers?.length > 0 && (
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
                               
                                <span>{ user.Name }</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )} */}
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

          {/* <BsSearch class=" me-4" onClick={handleiconshow} /> 
        
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
            </div> */}

          <div>
            <Button
            disabled={bankingAddPermission}
              onClick={handleShowForm}
              style={{
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 12,
                width: 123,
                padding: "16px, 24px, 16px, 24px",
                color: "#FFF",
                fontFamily: "Gilroy",
              }}
            >
              {" "}
              + Add Bank
            </Button>
          </div>
        </div>
      </div>
      {/* {filterInput && (
        <div  className='container ms-4 mb-4'   style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
          {filteredUsers.length > 0 ? (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
              {filteredUsers.length} result{filteredUsers.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{filterInput}"</span>
            </span>
          ) : (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{filterInput}"</span></span>
          )}
        </div>
      )} */}

      <div className="d-flex overflow-auto">
        {state?.bankingDetails?.bankingList?.banks?.length > 0 ? (
          state.bankingDetails.bankingList.banks.map((item) => {
            return (
              <div
                key={item.id}
                className="card mx-2"
                style={{
                  minWidth: "280px",
                  borderRadius: "12px",
                  overflow: "visible",
                  height: 187,
                  position: "relative",
                }}
              >
                {/* Card Body */}
                <div className="card-body">
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
                        Savings A/C
                      </p>
                    </div>
                    <img
                      src={more}
                      width={20}
                      height={20}
                      onClick={() => handleShowDots(item.id)}
                      alt="More options"
                      style={{ cursor: "pointer" }}
                    />
                    {openMenuId === item.id && (
                      <div
                        ref={popupRef}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#F9F9F9",
                          position: "absolute",
                          right: 10,
                          top: 60,
                          width: 160,
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
    cursor:bankingEditPermission ? "not-allowed" : "pointer",
    pointerEvents: bankingEditPermission ? "none" : "auto",
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
      cursor: bankingEditPermission ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>

<div
  className="mb-2 d-flex justify-content-start align-items-center gap-2"
  style={{
    cursor: bankingDeletePermission ? "not-allowed" : "pointer",
    pointerEvents:bankingDeletePermission ? "none" : "auto",
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
      cursor: bankingDeletePermission ? "not-allowed" : "pointer",
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
                         color: bankingAddPermission ? "#ccc" : "#007bff", 
                         cursor: bankingAddPermission ? "not-allowed" : "pointer", 
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

                    <a
  href={bankingAddPermission ? "#" : undefined} 
  onClick={(e) => {
    if (bankingAddPermission) {
      e.preventDefault(); 
    } else {
      handleAccountTypeChange(item); 
    }
  }}
  className={bankingAddPermission ? "text-muted" : "text-primary"} 
  style={{
    textAlign: "end",
    fontSize: 14,
    fontFamily: "Gilroy",
    fontWeight: 600,
    textDecoration: "none",
    cursor: bankingAddPermission ? "not-allowed" : "pointer", 
  }}
>
  Change
</a>

                  </div>
                  {showAccountTypeOptions === item.id && (
                    <div
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
                          checked={selectedAccountType == 1}
                          onChange={handleAccountTypeSelection}
                        />{" "}
                        Credit A/C
                      </label>
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        <input
                          type="radio"
                          name={`accountType-${item.id}`}
                          value={2}
                          checked={selectedAccountType == 2}
                          onChange={handleAccountTypeSelection}
                        />{" "}
                        Debit A/C
                      </label>
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        <input
                          type="radio"
                          name={`accountType-${item.id}`}
                          value={3}
                          checked={selectedAccountType == 3}
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
                   <img src={money} width={18} height={18} style={{marginTop:"-5px"}}/> Balance
                  </span>
                  {item.balance === 0 ||
                  item.balance === "" ||
                  item.balance === null ? (
                    <a
                    href={bankingAddPermission ? "#" : undefined} 
                    className={bankingAddPermission ? "text-muted" : "text-primary"} 
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      color: bankingAddPermission ? "gray" : "blue",
                      textDecoration: "none",
                      cursor: bankingAddPermission ? "not-allowed" : "pointer", 
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
                  </a>
                  
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
          <div
            className="card mx-2"
            style={{
              minWidth: "280px",
              borderRadius: "12px",
              overflow: "visible",
              height: 187,
            }}
          >
            {/* Card Body */}
            <div className="card-body">
            <div>
        <div style={{ textAlign: "center" }}>
          <img
            src={emptyimg}
            width={50}
            height={50}
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
          No Bank{" "}
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
          There are no Bank Details available.{" "}
        </div>
        <div style={{ textAlign: "center" }}>
        <Button
              onClick={handleShowForm}
              disabled={bankingAddPermission}
              style={{
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 12,
                width: 123,
                padding: "10px, 20px, 10px, 20px",
                color: "#FFF",
                fontFamily: "Gilroy",
              }}
            >
              {" "}
              + Add Bank
            </Button>
                  </div>
        
      </div>
             
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 30 }}>
      {currentRowTransaction?.length > 0 ? (
        <div  style={{
          // height: "400px",
          height: currentRowTransaction.length >= 4 ? "280px" : "auto",
          overflowY: "auto",
          borderRadius: "24px",
          border: "1px solid #DCDCDC",
          // borderBottom:"none"
        }}>
         <Table
         responsive="md"
         className="Table_Design"
         style={{ border: "1px solid #DCDCDC",borderBottom:"1px solid transparent",borderEndStartRadius:0,borderEndEndRadius:0}}
         
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
                 color: "#939393",
                 fontSize: "14px",
                 fontWeight: 500,
                 fontFamily: "Gilroy",
               }}
             >
               Account Name
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
               Date
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
               Amount
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
               Description
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
               Transaction
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
             ></th>
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
              
             </th>
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

             let formattedDate = `${year} ${formattedMonth} ${day}`;

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
                   }}
                 >
                   {user.bank_name}
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
                   {user.description}
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
                       backgroundColor:
                         user.type === 1
                           ? "#C8E6C9"
                           : user.type === 2
                           ? "#FFE0B2"
                           : "#FFEFCF",
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
                     border: "none",
                     textAlign: "start",
                     fontSize: "16px",
                     fontWeight: 500,
                     fontFamily: "Gilroy",
                     paddingTop: 15,
                     position: "relative",
                     zIndex:EditTransaction === user.id ? 1000 : "auto",
                   }}
                   onClick={() => handleEditTrans(user.id)}
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
                         position: "absolute",
                         right: 80,
                         top: 8,
                         width: 160,
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
    cursor: bankingEditPermission ? "not-allowed" : "pointer",
    pointerEvents: bankingEditPermission ? "none" : "auto",
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
      cursor: bankingEditPermission ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>

<div
  className="mb-2 d-flex justify-content-start align-items-center gap-2"
  style={{
    cursor: bankingDeletePermission ? "not-allowed" : "pointer",
    pointerEvents: bankingDeletePermission ? "none" : "auto",
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
      cursor: bankingDeletePermission ? "not-allowed" : "pointer",
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
      ):(
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
      )}
       
        {currentRowTransaction?.length > 0 && (
                          <nav
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "end", // Align dropdown and pagination
                                                padding: "10px",
                                                // borderTop: "1px solid #ddd",
                                              }}
                                            >
                                              {/* Dropdown for Items Per Page */}
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
                                                      color: transactioncurrentPage === 1 ? "#ccc" : "#1E45E1",
                                                      cursor: transactioncurrentPage === 1 ? "not-allowed" : "pointer",
                                                      borderRadius: "50%",
                                                      display: "inline-block",
                                                      minWidth: "30px",
                                                      textAlign: "center",
                                                      backgroundColor: "transparent",
                                                      border: "none",
                                                    }}
                                                    onClick={() => handlePageChange(transactioncurrentPage - 1)}
                                                    disabled={transactioncurrentPage === 1}
                                                  >
                                                    <ArrowLeft2 size="16" color={transactioncurrentPage === 1 ? "#ccc" : "#1E45E1"} />
                                                  </button>
                                                </li>
                                            
                                                {/* Current Page Indicator */}
                                                <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                                                  {transactioncurrentPage} of {totalPagesTransaction}
                                                </li>
                                            
                                                {/* Next Button */}
                                                <li style={{ margin: "0 10px" }}>
                                                  <button
                                                    style={{
                                                      padding: "5px",
                                                      textDecoration: "none",
                                                      color: transactioncurrentPage === totalPagesTransaction ? "#ccc" : "#1E45E1",
                                                      cursor: transactioncurrentPage === totalPagesTransaction ? "not-allowed" : "pointer",
                                                      borderRadius: "50%",
                                                      display: "inline-block",
                                                      minWidth: "30px",
                                                      textAlign: "center",
                                                      backgroundColor: "transparent",
                                                      border: "none",
                                                    }}
                                                    onClick={() => handlePageChange(transactioncurrentPage + 1)}
                                                    disabled={transactioncurrentPage === totalPagesTransaction}
                                                  >
                                                    <ArrowRight2
                                                      size="16"
                                                      color={transactioncurrentPage === totalPagesTransaction ? "#ccc" : "#1E45E1"}
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
            Delete Banking?
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
          Are you sure you want to delete this Bank-details?
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
        <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Add balance
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseAddBalance}
            style={{
              position: "absolute",
              right: "10px",
              top: "16px",
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: "24px", paddingBottom: "4px" }}
            >
              &times;
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12" style={{ marginTop: "-30px" }}>
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

          <div className="col-12">
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
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="col-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: "50px",
              borderRadius: "12px",
              fontSize: "1rem",
              fontFamily: "Montserrat, sans-serif",
              marginTop: "20px",
            }}
            onClick={handleAddAmountSubmit}
          >
            Add balance
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteTransactionForm}
        onHide={() => handleCloseTransactionDelete()}
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
            Delete Transaction?
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
          Are you sure you want to delete this Transaction?
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
            onClick={handleCloseTransactionDelete}
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
            onClick={handleDeleteTransSubmit}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {EditTransactionForm == true ? (
        <BankingEditTransaction
          setEditTransactionForm={setEditTransactionForm}
          EditTransactionForm={EditTransactionForm}
          setDeleteTransactionForm={setDeleteTransactionForm}
          deleteTransactionForm={deleteTransactionForm}
          setUpdateTransaction = {setUpdateTransaction}
          updateTransaction = {updateTransaction}
        />
      ) : null}

      {showForm == true ? (
        <BankingAddForm
          handleShowForm={handleShowForm}
          showForm={showForm}
          setShowForm={setShowForm}
          editAddBank={editAddBank}
          setEditAddBank={setEditAddBank}
          setEdit={setEdit}
          edit={edit}
          updateTransaction = {updateTransaction}
        />
      ) : null}
    </div>



   }
    
   </>
  );
}
export default Banking;
