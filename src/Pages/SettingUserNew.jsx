/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from "iconsax-react";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import AddUser from "../Pages/UserFile/AddUser";
import "./SettingUsers.css";
import Select from "react-select";

function SettingNewUser() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [usersFilterddata, setUsersFilterddata] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [showDots, setShowDots] = useState(null);
  const [editDetails, setEditDetails] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [edit, setEdit] = useState(false);

  const handleDotsClick = (index, event) => {
    event.stopPropagation();
    setShowDots((prev) => (prev === index ? null : index));
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenAddUser = () => {
    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setAddUserForm(true);
    setEdit(false);
  };

  const handleCloseAddUser = () => {
    setAddUserForm(false);
    setEdit(false);
  };

  const handleEditForm = (item) => {
    setAddUserForm(true);
    setEditDetails(item);
    setEdit(true);
  };

  const handleDeleteForm = (item) => {
    setDeleteId(item.id);
    setIsConfirmDelete(true);
  };

  const handleClose = () => {
    setIsConfirmDelete(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch({ type: "DELETEUSER", payload: { id: deleteId } });
    }
  };

  useEffect(() => {
    dispatch({
      type: "GETUSERSTAFF",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.InvoiceList?.deleteUserSuccessStatusCode === 200) {
      setIsConfirmDelete(false);
      dispatch({
        type: "GETUSERSTAFF",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_USER_STATUS_CODE" });
      }, 2000);
    }
  }, [state.InvoiceList?.deleteUserSuccessStatusCode]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.Settings?.StatusForaddSettingStaffList === 200) {
      setUsersFilterddata(state.Settings?.addSettingStaffList);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_USER_STAFF_LIST" });
      }, 200);
    }
  }, [state.Settings?.StatusForaddSettingStaffList]);

  useEffect(() => {
    if (state.Settings?.errorUser) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ERROR_USER" });
      }, 100);
    }
  }, [state.Settings?.errorUser]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usersFilterddata?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages =
    usersFilterddata?.length &&
    Math.ceil(usersFilterddata.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (selectedOption) => {
  setItemsPerPage(selectedOption.value);
  setCurrentPage(1);
};

const options = [
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentItems;

    const sorted = [...currentItems].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentItems, sortConfig]);
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (
      usersFilterddata.length > 0 &&
      currentItems.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  }, [usersFilterddata]);

  return (
    <div style={{ position: "relative", paddingRight: 10, paddingLeft: 10 }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "48%",
            left: "68%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            zIndex: 1050,
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

      <div
        className="d-flex flex-column flex-md-row justify-content-between align-items-center"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          height: 83,
          paddingRight: 1,
        }}
      >
        <div
          className="w-100 d-flex justify-content-center justify-content-md-start mt-3"
          style={{ marinTop: -4 }}
        >
          <label
            style={{
              fontFamily: "Gilroy",
              fontSize: 20,
              color: "#222",
              fontWeight: 600,
            }}
          >
            Users
          </label>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0">
          <Button
            onClick={handleOpenAddUser}
            style={{
              fontFamily: "Gilroy",
              fontSize: "14px",
              backgroundColor: "#1E45E1",
              color: "white",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "11px 52px",
              width: 146,
              height: 45,
              marginLeft: 5,
              marginTop: 12,
              whiteSpace: "nowrap",
            }}
            disabled={showPopup}
          >
            {" "}
            + User
          </Button>
        </div>
      </div>

      {showPopup && (
        <div className="d-flex flex-wrap">
          <p
            style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }}
            className="col-12 col-sm-6 col-md-6 col-lg-9"
          >
            Please add a hostel before adding User information.
          </p>
        </div>
      )}

      <div className="mt-4">
        {sortedData?.length > 0 ? (
          <div
            className=" booking-table-userlist  booking-table me-2"
            style={{ paddingBottom: "20px" }}
          >
            <div
              className="show-scrolls"
              style={{
                height:
                  sortedData?.length >= 5 || sortedData?.length >= 5
                    ? "450px"
                    : "auto",
                overflow: "auto",
                overflowX:'hidden',
                borderTop: "1px solid #E8E8E8",
                marginBottom: 20,
                marginTop: "20px",
                paddingRight: 0,
                paddingLeft: 0,
              }}
            >
              <Table
                responsive="md"
                style={{
                  fontFamily: "Gilroy",
                  color: "rgba(34, 34, 34, 1)",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: 500,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  borderRadius: 0,
                }}
              >
                <thead
                  style={{
                    fontFamily: "Gilroy",
                    backgroundColor: "rgba(231, 241, 255, 1)",
                    color: "rgba(34, 34, 34, 1)",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: 500,
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        color: "rgb(147, 147, 147)",
                        fontWeight: 500,
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        textAlign: "start",
                        padding: "10px",
                        paddingLeft: "25px",
                      }}
                    >
                      <div className="d-flex gap-1 align-items-center justify-content-start">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <ArrowUp2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("first_name", "asc")}
                            style={{ cursor: "pointer" }}
                          />
                          <ArrowDown2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("first_name", "desc")}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        Users
                      </div>
                    </th>
                    <th
                      style={{
                        color: "rgb(147, 147, 147)",
                        fontWeight: 500,
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        padding: "10px",
                        textAlign: "start",
                      }}
                    >
                      <div className="d-flex gap-1 align-items-center justify-content-start">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <ArrowUp2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("email_Id", "asc")}
                            style={{ cursor: "pointer" }}
                          />
                          <ArrowDown2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("email_Id", "desc")}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        Email
                      </div>
                    </th>
                    <th
                      style={{
                        color: "rgb(147, 147, 147)",
                        fontWeight: 500,
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        padding: "10px",
                        textAlign: "start",
                      }}
                    >
                      <div className="d-flex gap-1 align-items-center justify-content-start">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <ArrowUp2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("mobileNo", "asc")}
                            style={{ cursor: "pointer" }}
                          />
                          <ArrowDown2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("mobileNo", "desc")}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        Mobile No
                      </div>
                    </th>
                    <th
                      style={{
                        color: "rgb(147, 147, 147)",
                        fontWeight: 500,
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        padding: "10px",
                        textAlign: "start",
                      }}
                    >
                      <div className="d-flex gap-1 align-items-center justify-content-start">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <ArrowUp2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("role_name", "asc")}
                            style={{ cursor: "pointer" }}
                          />
                          <ArrowDown2
                            size="10"
                            variant="Bold"
                            color="#1E45E1"
                            onClick={() => handleSort("role_name", "desc")}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        Role
                      </div>
                    </th>
                    <th
                      style={{
                        color: "rgb(147, 147, 147)",
                        fontWeight: 500,
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData?.map((item, index) => {
                    return (
                      <tr key={index} style={{ overflowX: "auto" }}>
                        <td
                          title={item.first_name}
                          style={{
                            border: "none",
                            padding: "10px",
                            textAlign: "start",
                            paddingTop: 18,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingLeft: "20px",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                          className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                        >
                          <span
                            className="Customer_Name_Hover ps-3"
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              cursor: "pointer",
                              marginTop: 10,
                            }}
                          >
                            {item.first_name}
                          </span>
                        </td>
                        <td
                          title={item.email_Id}
                          style={{
                            fontWeight: 500,
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            textAlign: "start",
                            paddingTop: 17,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                          className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                        >
                          <div className="ps-2">
                            {item.email_Id}
                          </div>

                        </td>

                        <td
                          title={item.mobileNo}
                          style={{
                            paddingTop: 17,
                            border: "none",
                            textAlign: "start",
                            fontSize: "13px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            marginTop: 10,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                          className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                        >
                          +
                          {item &&
                            String(item.mobileNo)?.slice(
                              0,
                              String(item.mobileNo).length - 10
                            )}{" "}
                          {item && String(item.mobileNo)?.slice(-10)}
                        </td>

                        <td
                          title={item.role_name}
                          style={{
                            fontWeight: 500,
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            textAlign: "start",
                            paddingTop: 17,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                          className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                        >
                          {item.role_name}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                        >
                          <div
                            style={{
                              height: "35px",
                              width: "35px",
                              borderRadius: "50%",
                              border: "1px solid #EFEFEF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              cursor: "pointer",
                              backgroundColor:
                                showDots === index ? "#E7F1FF" : "white",
                            }}
                            onClick={(e) => handleDotsClick(index, e)}
                          >
                            <PiDotsThreeOutlineVerticalFill
                              style={{
                                height: "18px",
                                width: "18px",
                                cursor: "pointer",
                              }}
                            />

                            {showDots === index && (
                              <div
                                ref={popupRef}
                                className="pg-card"
                                style={{
                                  backgroundColor: "#fff",
                                  position: "fixed",
                                  top: popupPosition.top,
                                  left: popupPosition.left,
                                  border: "1px solid #E0E0E0",
                                  borderRadius: 10,
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                  width: 140,
                                  zIndex: 1000,
                                }}
                              >
                                <div>
                                 
                                  <div
                                    className="d-flex gap-2 align-items-center"
                                    onClick={() => handleEditForm(item)}
                                    style={{
                                      padding: "8px 12px",
                                      width: "100%",
                                      cursor: "pointer",
                                      transition: "background 0.2s ease-in-out",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0F4FF")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                  >
                                    <img src={Edit} width={16} height={16} alt="Edit" />
                                    <span
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy, sans-serif",
                                        color: "#1E45E1",
                                      }}
                                    >
                                      Edit
                                    </span>
                                  </div>

                                  
                                  <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

                                  
                                  <div
                                    className="d-flex gap-2 align-items-center"
                                    onClick={() => handleDeleteForm(item)}
                                    style={{
                                      padding: "8px 12px",
                                      width: "100%",
                                      cursor: "pointer",
                                      transition: "background 0.2s ease-in-out",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF3F3")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                  >
                                    <img src={Delete} width={16} height={16} alt="Delete" />
                                    <span
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy, sans-serif",
                                        color: "#FF0000",
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>

                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          !loading && (
           

               <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                      width: "100%",
                                      margin: "0px auto",
                                      backgroundColor: "",
                                      marginTop: 110,
                                      justifyContent: "center", alignItems: "center"
                                    }}
                                  >
                                    <div>
                                      <div className="d-flex  justify-content-center">
                                        <img
                                          src={emptyimg}
                                          
                                          alt="Empty state"
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
                                        No Users{" "}
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
                                        There are no Users available.{" "}
                                      </div>
            
                                    </div>
                                    <div></div>
                                  </div>
          )
        )}
      </div>

      {usersFilterddata?.length >= 10 && (
        <nav 
        className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center" style={{ backgroundColor: "white" , zIndex:1000}}>
         <div>
              <Select
                value={options.find((opt) => opt.value === itemsPerPage)}
                onChange={handleItemsPerPageChange}
                options={options}
                placeholder="Items per page"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No options"}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "40px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "#1E45E1",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    border: "1px solid #1E45E1",
                    boxShadow: "0 0 0 1px #1E45E1",
                    cursor: "pointer",
                    width: 90,
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
                    fontFamily: "Gilroy",
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
                <ArrowLeft2
                  size="16"
                  color={currentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
            >
              {currentPage} of {totalPages}
            </li>

            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
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

      {isConfirmDelete && (
        <Modal
          show={isConfirmDelete}
          onHide={handleClose}
          centered
          backdrop="static"
          dialogClassName="custom-delete-modal"
        >
          <Modal.Header style={{ borderBottom: "none" }}>
            <Modal.Title
              className="w-100 text-center mt-2"
              style={{
                fontSize: "18px",
                fontFamily: "Gilroy",

                fontWeight: 600,
                color: "#222222",
              }}
            >
              Delete User ?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            className="text-center"
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Gilroy",
              color: "#646464",

              marginTop: "-27px",
            }}
          >
            Are you sure you want to delete the User ?{" "}
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
              onClick={handleClose}
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {addUserForm && (
        <AddUser
          show={addUserForm}
          handleClose={handleCloseAddUser}
          editDetails={editDetails}
          hostelid={state.login.selectedHostel_Id}
          setAddUserForm={setAddUserForm}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
}
export default SettingNewUser;
