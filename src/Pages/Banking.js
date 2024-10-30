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

function Banking() {
  const popupRef = useRef(null);
  const editRef = useRef(null);
  const [search, setSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dotsshowbank, setdotsshowbank] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showAccountTypeOptions, setShowAccountTypeOptions] = useState(false);
  const [showAddBalance, setshowAddBalance] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("Both");
  const [EditTransaction, setEditTransaction] = useState(false);
  const [EditTransactionForm, setEditTransactionForm] = useState(false);
  const [deleteTransactionForm, setDeleteTransactionForm] = useState(false);

  const handleShowDots = () => {
    setdotsshowbank((prev) => !prev);
  };

  const handleShowForm = () => {
    
    setShowForm(true);
    console.log("showForm",showForm)
    setdotsshowbank(false);
  };
  const handleDeleteForm = () => {
    setDeleteShow(true);
    setdotsshowbank(false);
  };
  const handleCloseDelete = () => {
    setDeleteShow(false);
    setdotsshowbank(false);
  };
  const handleAccountTypeChange = () => {
    setShowAccountTypeOptions(!showAccountTypeOptions);
  };
  const handleAccountTypeSelection = (e) => {
    setSelectedAccountType(e.target.value);
  };
  const handleEditTrans = () => {
    setEditTransaction(!EditTransaction);
    // setdotsshowbank(false)
  };
  const handleEditTransForm = () => {
    setEditTransactionForm(true);
    console.log("EditTransactionForm",EditTransactionForm)
    setEditTransaction(false)
    setDeleteTransactionForm(false)

  };
  const handleCloseTransactionDelete=()=>{
    setDeleteTransactionForm(false)
  }
  const handleDeleteTransForm = () => {
    setDeleteTransactionForm(true)
    setEditTransactionForm(false);
    console.log("deleteTransactionForm",deleteTransactionForm)
    setEditTransaction(false)
  }

  const handleShowAddBalance = () => {
    setshowAddBalance(true);
    setdotsshowbank(false);
  };
  const handleCloseAddBalance = () => {
    setshowAddBalance(false);
  };

  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };
  const handleCloseSearch = () => {
    setSearch(false);
    // setFilterInput("")
  };

  return (
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

      <div className="d-flex overflow-auto ">
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
                  HSBC BANK
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
                onClick={handleShowDots}
                alt="More options"
              />

              {dotsshowbank && (
                <div
                  ref={popupRef}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F9F9F9",
                    position: "absolute",
                    right: 10,
                    top: 60, // Set top position to 150
                    width: 160,
                    height: 70,
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    padding: 10,
                    alignItems: "start",
                    zIndex: 9999, // Ensure high z-index
                  }}
                >
                  <div
                    className="mb-2 d-flex justify-content-start align-items-center gap-2"
                    onClick={handleShowForm}
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
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </label>
                  </div>
                  <div
                    className="mb-2 d-flex justify-content-start align-items-center gap-2"
                    onClick={handleDeleteForm}
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
                        cursor: "pointer",
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
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 500 }}
            >
              4561 2013 6210 6540
            </p>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  color: "#4B4B4B",
                }}
              >
                Default A/C
              </p>
              <a
                href="#"
                onClick={handleAccountTypeChange}
                className="text-primary"
                style={{
                  textAlign: "end",
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Change
              </a>
            </div>

            {/* {showAccountTypeOptions && (
        <div style={{ position: "absolute", top: "160px", right: "40px", backgroundColor: "#FFFFFF", border: "1px solid #EBEBEB", borderRadius: "10px", padding: "10px", zIndex: 1000, height: 105, width: 133 }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="radio" name="accountType" value="Credit" checked={selectedAccountType === "Credit"} onChange={handleAccountTypeSelection} /> Credit A/C
          </label>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="radio" name="accountType" value="Debit" checked={selectedAccountType === "Debit"} onChange={handleAccountTypeSelection} /> Debit A/C
          </label>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="radio" name="accountType" value="Both" checked={selectedAccountType === "Both"} onChange={handleAccountTypeSelection} /> Both A/C
          </label>
        </div>
      )} */}
          </div>

          <div
            className="card-footer d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
          >
            <span
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
            >
              Balance
            </span>
            <a
              href="#"
              className="text-primary"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onClick={handleShowAddBalance}
            >
              + Add Balance
            </a>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 20 }}>
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
              zIndex: 1,
              position: "sticky",
              top: 0,
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
                {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                        </div> */}
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {/* {loading
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
                        return ( */}
            <tr
              // key={user.ID}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <td style={{ padding: "10px", border: "none" }}>
                <img
                  src={squre}
                  height={20}
                  width={20}
                  style={{ marginTop: 10 }}
                />
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
                Account Name
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
                  Date
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
                Amount
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
                Description
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
                Transaction
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
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />
              </td>
            </tr>
            <tr
              // key={user.ID}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <td style={{ padding: "10px", border: "none" }}>
                <img
                  src={squre}
                  height={20}
                  width={20}
                  style={{ marginTop: 10 }}
                />
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
                Account Name
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
                  Date
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
                Amount
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
                Description
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
                Transaction
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
                onClick={handleEditTrans}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />
              </td>
            </tr>
            <tr
              // key={user.ID}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <td style={{ padding: "10px", border: "none" }}>
                <img
                  src={squre}
                  height={20}
                  width={20}
                  style={{ marginTop: 10 }}
                />
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
                Account Name
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
                  Date
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
                Amount
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
                Description
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
                Transaction
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
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />
              </td>
            </tr>
            <tr
              // key={user.ID}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <td style={{ padding: "10px", border: "none" }}>
                <img
                  src={squre}
                  height={20}
                  width={20}
                  style={{ marginTop: 10 }}
                />
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
                Account Name
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
                  Date
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
                Amount
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
                Description
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
                Transaction
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
                onClick={handleEditTrans}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />
              </td>
            </tr>
            {/* );
                      })} */}
          </tbody>
        </Table>

        {EditTransaction && (
          <div
            ref={editRef}
            style={{
              cursor: "pointer",
              backgroundColor: "#F9F9F9",
              position: "absolute",
              right: 80,
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
              onClick={handleEditTransForm}
            >
              <img src={Edit} style={{ height: 16, width: 16 }} alt="Edit" />
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Gilroy, sans-serif",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                Edit
              </label>
            </div>
            <div
              className="mb-2 d-flex justify-content-start align-items-center gap-2"
             
            >
              <img
                src={Delete}
                style={{ height: 16, width: 16 }}
                alt="Delete"
                onClick={handleDeleteTransForm}
              />
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Gilroy, sans-serif",
                  color: "#FF0000",
                  cursor: "pointer",
                }}
              >
                Delete
              </label>
            </div>
          </div>
        )}

        {showAccountTypeOptions && (
          <div
            style={{
              position: "absolute",
              top: "-70px",
              left: "120px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              padding: "10px",
              zIndex: 1000,
              height: 105,
              width: 133,
              backgroundColor: "#F9F9F9",
            }}
          >
            <label style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="radio"
                name="accountType"
                value="Credit"
                checked={selectedAccountType === "Credit"}
                onChange={handleAccountTypeSelection}
              />{" "}
              Credit A/C
            </label>
            <label style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="radio"
                name="accountType"
                value="Debit"
                checked={selectedAccountType === "Debit"}
                onChange={handleAccountTypeSelection}
              />{" "}
              Debit A/C
            </label>
            <label style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="radio"
                name="accountType"
                value="Both"
                checked={selectedAccountType === "Both"}
                onChange={handleAccountTypeSelection}
              />{" "}
              Both A/C
            </label>
          </div>
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
            // onClick={handleCloseDelete}
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
            <Form.Label
              style={{
                fontSize: "0.875rem",
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              Account{" "}
              <span style={{ color: "red", fontSize: "20px" }}> * </span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="border"
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
            >
              <option>Select a Account</option>
            </Form.Select>
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
            // onClick={handleCloseDelete}
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
            onClick={handleCloseTransactionDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {EditTransactionForm == true ? (
        <BankingEditTransaction
          setEditTransactionForm={setEditTransactionForm}
          EditTransactionForm={EditTransactionForm}
          setDeleteTransactionForm ={setDeleteTransactionForm}
          deleteTransactionForm = {deleteTransactionForm}
        />
      ) : null}

      {showForm == true ? (
        <BankingAddForm
          handleShowForm={handleShowForm}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : null}
    </div>
  );
}
export default Banking;
