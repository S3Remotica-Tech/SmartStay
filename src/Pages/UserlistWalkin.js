import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button } from "react-bootstrap";
import "./UserlistWalkin.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/Edit-blue.png";
import CustomerForm from "./UserlistWalkinForm";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

function UserlistWalkin(props) {
  const state = useSelector((state) => state);
  console.log("UserlistWalkin", state)
  console.log("props", props);

  const dispatch = useDispatch();
  // const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dotsButton, setDotsButton] = useState(null);
  const [walkInPermissionError, setWalkInPermissionError] = useState("");
  const [walkInEditPermissionError, setWalkInEditPermissionError] = useState("");
  const [walkInDeletePermissionError, setWalkInDeletePermissionError] = useState("");
 

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_view == 1
    ) {
      setWalkInPermissionError("");
    } else {
      setWalkInPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_edit == 1
    ) {
      setWalkInEditPermissionError("");
    } else {
      setWalkInEditPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_delete == 1
    ) {
      setWalkInDeletePermissionError("");
    } else {
      setWalkInDeletePermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  const popupRef = useRef(null);
  // const itemsPerPage = 7;
  // delete
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [walkInCustomer, setWalkInCustomer] = useState([]);
  const [walkinLoader,setWalkingLoader] = useState(true)

  useEffect(() => {
    if(state.login.selectedHostel_Id){
      setWalkingLoader(true)
      dispatch({
        type: "WALKINCUSTOMERLIST",
        payload: { hostel_id:state.login.selectedHostel_Id},
      });
    }

  }, [state.login.selectedHostel_Id]);

  console.log("state.UsersList.getWalkInStatusCode", state.UsersList.getWalkInStatusCode)



//  useEffect(() => {
//   setLoader(true)
//   }, [state.login.selectedHostel_Id]);
// //  useEffect(() => {
//     if (state.UsersList?.getWalkInStatusCode == 200) {
//       setLoader(false)
//     }
//   }, [state.UsersList?.getWalkInStatusCode]);

  // useEffect(() => {
  //   if (state.UsersList?.NoDataWalkInCustomerStatusCode == 201) {
  //     setLoader(false)
  //   }
  // }, [state.UsersList?.NoDataWalkInCustomerStatusCode]);



  useEffect(() => {
    if (state.UsersList.getWalkInStatusCode == 200) {
      setWalkingLoader(false)
      setWalkInCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingLoader(false)
      setWalkInCustomer([]);
      
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    if (
      state.UsersList.addWalkInCustomerStatusCode == 200 ||
      state.UsersList.deleteWalkInCustomerStatusCode == 200
    ) {
      dispatch({
        type: "WALKINCUSTOMERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setShowForm(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
      }, 4000);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_WALK_IN_CUSTOMER" });
      }, 4000);
      setShowDeleteModal(false);
    }
  }, [
    state.UsersList.addWalkInCustomerStatusCode,
    state.UsersList.deleteWalkInCustomerStatusCode,
  ]);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const handleDotsClick = (id, event) => {
    setDotsButton((prevId) => (prevId === id ? null : id));

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;


    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
    setDotsButton(null);
  };

  const confirmDelete = () => {
    if (customerToDelete.id) {
      dispatch({
        type: "DELETEWALKINCUSTOMER",
        payload: { id: customerToDelete.id },
      });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
    setDotsButton(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCustomer(null);
  };

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setDotsButton(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  // const currentCustomers = props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const currentCustomers = props.filterInput.length > 0 ? props.filteredUsers : walkInCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // const totalPages = Math.ceil(props.filteredUsers?.length / itemsPerPage);
  const totalPages = Math.ceil(
    (props.search ? props.filteredUsers?.length : walkInCustomer?.length) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };
  // useEffect(() => {
  //     if (currentPage > totalPages && totalPages > 0) {
  //         setCurrentPage(totalPages);
  //     }
  // }, [walkInCustomer, currentPage, totalPages]);

 

  return (
    <>
    
      {walkInPermissionError ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // height: "100vh",
            }}
          >
            {/* Image */}
            <img
              src={Emptystate}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            {/* Permission Error */}
            {walkInPermissionError && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <MdError />
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {walkInPermissionError}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div style={{ marginLeft: "-20px" }}>
           
          {walkinLoader ? (
            <div
 style={{
   position: "absolute",
   top: 0,
   right: 0,
   bottom: 0,
   left: "200px",
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
) : currentCustomers?.length > 0 && (
  <div className=" walkin_table_custom">
                <div style={{
                  // height: "400px",
                  height: currentCustomers.length >= 6 ? "380px" : "auto",
                  overflowY: currentCustomers.length >= 6 ? "auto" : "visible",
                  borderRadius: "24px",
                  border: "1px solid #DCDCDC",
                  // borderBottom:"none"
                }}>
                  <Table responsive="md" className="table_walkin" style={{ border: "1px solid #DCDCDC", borderBottom: "1px solid transparent", borderEndStartRadius: 0, borderEndEndRadius: 0 }}>
                    <thead style={{
                      border: "none", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>
                      <tr>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            borderTopLeftRadius: 24,
                            paddingLeft: "20px"
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Email ID
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Mobile no
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Walkin date
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Address
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            borderTopRightRadius: "24px",
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCustomers?.map((customer) => (
                        <tr key={customer.id} className="customer-row">

                          <td style={{ verticalAlign: "middle" }}>
                            <div className="d-flex align-items-center">
                              {/* <Image
                                src={Ellipse1}


                                roundedCircle
                                height={30}
                                width={30}
                                alt="avatar"
                                style={{ textAlign: "start" }}
                              /> */}
                              <span
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  fontFamily: "Gilroy",
                                  color: "#222222",
                                  textAlign: "start",
                                  paddingLeft: "10px",
                                }}
                                className=" customer-name"
                              >
                                {customer.first_name} {customer.last_name}
                              </span>
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#000000",
                              textAlign: "start",
                              verticalAlign: "middle"
                            }}
                          >
                            {customer.email_Id || "-"}
                          </td>
                          <td
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#000000",
                              textAlign: "start",
                              verticalAlign: "middle",
                              padding: "10px",
                            }}
                          >
                            {customer.mobile_Number}
                          </td>

                          <td
                            style={{
                              border: "none",

                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              padding: "10px",
                              verticalAlign: "middle"
                            }}
                          >
                            <span
                              style={{
                                padding: "3px 7px",
                                borderRadius: "60px",
                                backgroundColor: "#EBEBEB",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                verticalAlign: "middle"
                              }}
                            >
                              {moment(customer.walk_In_Date).format(
                                "DD/MMM/YYYY"
                              )}
                            </span>
                          </td>

                          <td
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#000000",
                              textAlign: "start",
                              padding: "10px",
                              whiteSpace: "nowrap",
                              verticalAlign: "middle"
                            }}
                          >
                            {customer.comments || "-"}
                          </td>

                          <td>
                            <div
                              style={{
                                cursor: "pointer",
                                height: 40,
                                width: 40,
                                borderRadius: "50%",
                                border: "1px solid #EFEFEF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                backgroundColor: dotsButton === customer.id ? "#E7F1FF" : "white",
                                zIndex:
                                  dotsButton === customer.id ? 1000 : "auto",
                              }}
                              onClick={(e) => handleDotsClick(customer.id, e)}
                            >
                              <PiDotsThreeOutlineVerticalFill
                                style={{ height: 20, width: 20 }}
                              />
                              {dotsButton === customer.id && (
                                <div
                                  ref={popupRef}
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: "#F9F9F9",
                                    position: "fixed",
                                    top: popupPosition.top,
                                    left: popupPosition.left,
                                    overflow: "visible ! important",
                                    marginButtom: "30px",
                                    width: 163,
                                    height: 92,
                                    border: "1px solid #EBEBEB",
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: 15,
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <div
                                    className="mb-2 d-flex align-items-center"
                                    onClick={() => {
                                      if (!walkInEditPermissionError) {
                                        handleEdit(customer);
                                      }
                                    }}
                                    style={{
                                      cursor: walkInEditPermissionError
                                        ? "not-allowed"
                                        : "pointer",
                                      pointerEvents: walkInEditPermissionError
                                        ? "none"
                                        : "auto",
                                      opacity: walkInEditPermissionError
                                        ? 0.5
                                        : 1,
                                    }}
                                  >
                                    <img
                                      src={Edit}
                                      style={{
                                        height: 16,
                                        width: 16,
                                        marginRight: "8px",
                                      }}
                                      alt="Edit icon"
                                    />
                                    <label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: "#222222",
                                        cursor: "pointer"
                                      }}
                                    >
                                      Edit
                                    </label>
                                  </div>

                                  <div
                                    className="d-flex align-items-center"
                                    onClick={() => {
                                      if (!walkInDeletePermissionError) {
                                        handleDelete(customer);
                                      }
                                    }}
                                    style={{
                                      cursor: walkInDeletePermissionError
                                        ? "not-allowed"
                                        : "pointer",
                                      pointerEvents: walkInDeletePermissionError
                                        ? "none"
                                        : "auto",
                                      opacity: walkInDeletePermissionError
                                        ? 0.5
                                        : 1,
                                    }}
                                  >
                                    <img
                                      src={Delete}
                                      style={{
                                        height: 16,
                                        width: 16,
                                        marginRight: "8px",
                                      }}
                                      alt="Delete icon"
                                    />
                                    <label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: "#FF0000",
                                        cursor: "pointer"
                                      }}
                                    >
                                      Delete
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
              </div>
)}

{
   !walkinLoader && currentCustomers?.length == 0 && 

   <div style={{ marginTop: 30 }}>
   <div style={{ textAlign: "center" }}>
     <img src={Emptystate} alt="emptystate" />
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
     No Walk-in available
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
     There are no Walk-in added.
   </div>
 </div>
}
                 
          </div>
          {(props.search ? props.filteredUsers?.length : walkInCustomer?.length) >= 5 && (
                  
                  <nav
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      padding: "10px",
                      position: "fixed", // Keeps the nav fixed on the screen
                      bottom: "10px", // Positions it 10px from the bottom
                      right: "10px", // Positions it 10px from the right
                      backgroundColor: "#fff", // Optional: Adds background for better visibility
                      borderRadius: "5px", // Optional: Rounded corners
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
                      zIndex: 1000, // Ensures it stays above other elements
                    }}
                  >
                    <div>
                      <select
                        value={itemsPerPage}
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
                          <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                        </button>
                      </li>

                      <li
                        style={{
                          margin: "0 10px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {currentPage} of {totalPages}
                      </li>

                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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

        </>
      )}

      {showForm && (
        <CustomerForm
          show={showForm}
          handleClose={handleFormClose}
          // onSubmit={handleFormSubmit}
          initialData={selectedCustomer}
        // modalType={modalType}
        />
      )}

      {/* Delete  Modal */}
      <Modal
        show={showDeleteModal}
        onHide={cancelDelete}
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
            Delete walk-in
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
          Are you sure you want to delete this walk-in?
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
            onClick={cancelDelete}
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
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
                toastStyle={{
                    backgroundColor: "#EBF5FF",
                    color: "#222222",
                    borderRadius: "60px",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "16px"
                }}
            /> */}
    </>
  );
}
UserlistWalkin.propTypes = {
  customerrolePermission: PropTypes.func.isRequired,
  filterInput: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  filteredUsers: PropTypes.func.isRequired,
};

export default UserlistWalkin;
