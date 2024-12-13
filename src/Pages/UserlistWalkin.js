import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Modal, Button, Pagination } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './UserlistWalkin.css';
import minus from '../Assets/Images/New_images/minus-square.png';
import Ellipse1 from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/Edit-Linear-32px.png';
import CustomerForm from './UserlistWalkinForm';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import 'react-toastify/dist/ReactToastify.css';
import Emptystate from '../Assets/Images/Empty-State.jpg'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MdError } from "react-icons/md";



function UserlistWalkin(props) {






    const state = useSelector(state => state)
    const dispatch = useDispatch();



    console.log("state for walk in", state)








    // const [customers, setCustomers] = useState(initialCustomers);
    const [showForm, setShowForm] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [dotsButton, setDotsButton] = useState(null);
    const [walkInPermissionError, setWalkInPermissionError] = useState("");
  const [walkInEditPermissionError, setWalkInEditPermissionError] = useState("");
  const [walkInDeletePermissionError, setWalkInDeletePermissionError] = useState("");





  useEffect(() => {
    console.log("===customerrolePermission[0]", props.customerrolePermission);
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
    console.log("===rolePermission", props.customerrolePermission[0]);
  
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
    console.log("===rolePermission", props.customerrolePermission[0]);
  
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
    const itemsPerPage = 7;
    // delete

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    const [walkInCustomer, setWalkInCustomer] = useState([])

    useEffect(() => {
        dispatch({ type: 'WALKINCUSTOMERLIST' })
    }, [])



    useEffect(() => {
        if (state.UsersList.getWalkInStatusCode == 200) {
            setWalkInCustomer(state.UsersList.WalkInCustomerList)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_WALK_IN_STATUS_CODE' })
            }, 2000)

        }

    }, [state.UsersList.getWalkInStatusCode])



    useEffect(() => {
        if (state.UsersList.NoDataWalkInCustomerStatusCode == 201) {
            setWalkInCustomer([])
            setTimeout(() => {
                dispatch({ type: 'CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE' })
            }, 2000)

        }

    }, [state.UsersList.NoDataWalkInCustomerStatusCode])

    useEffect(() => {
        if (state.UsersList.addWalkInCustomerStatusCode == 200 || state.UsersList.deleteWalkInCustomerStatusCode == 200) {
            dispatch({ type: 'WALKINCUSTOMERLIST' })

            setShowForm(false);

            setTimeout(() => {
                dispatch({ type: 'CLEAR_ADD_WALK_IN_CUSTOMER' })
            }, 4000)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_WALK_IN_CUSTOMER' })
            }, 4000)
            setShowDeleteModal(false);
        }

    }, [state.UsersList.addWalkInCustomerStatusCode, state.UsersList.deleteWalkInCustomerStatusCode])

    console.log("setShowForm(false);", showForm)



    const handleDotsClick = (id) => {
        setDotsButton(prevId => (prevId === id ? null : id));
    };

    const handleDelete = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
        setDotsButton(null);
    };


    const confirmDelete = () => {
        if (customerToDelete.id) {
            dispatch({ type: 'DELETEWALKINCUSTOMER', payload: { id: customerToDelete.id } })
        }
    };

    console.log("customerToDelete", customerToDelete)

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setCustomerToDelete(null);
    };



    const handleEdit = (customer) => {
        console.log("customer", customer)

        setSelectedCustomer(customer);
        setShowForm(true);
        setDotsButton(null);
        setModalType("edit");
    };



    const handleFormClose = () => {
        setShowForm(false);
        setSelectedCustomer(null);
        setModalType(null);
    };

    const handleFormSubmit = (data) => {
        // if (modalType === "edit") {

        //     setCustomers(customers.map((customer) =>
        //         customer.id === data.id ? { ...customer, ...data } : customer
        //     ));

        //     toast.success('Changes saved successfully!');
        // } else {

        //     const newCustomer = {
        //         ...data,
        //         id: customers.length + 1,
        //         avatar: Ellipse1
        //     };
        //     setCustomers([...customers, newCustomer]);
        //     // toast.success);
        //     toast.success('Walk-in added successfully!!');
        // }
        // handleFormClose();
        // setDotsButton(null);
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
    const currentCustomers = walkInCustomer.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(walkInCustomer.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [walkInCustomer, currentPage, totalPages]);


    const handleShowWalk = () => {
        setModalType("add");
        setShowForm(true);
        setSelectedCustomer(null);
    }













    return (
        <>
{
    walkInPermissionError ?(
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
                <MdError size={20} />
                <span>{walkInPermissionError}</span>
              </div>
            )}
          </div></>
    ):<>
    <div style={{ marginLeft: "-20px" }}>
                {currentCustomers.length > 0 ? (
                    <div className=' walkin_table_custom'>
                        <Table responsive="md" className="table_walkin">
                            <thead style={{ border: "none" }}>
                                <tr>
                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none",
                                        borderTopLeftRadius: "24px"
                                    }}>
                                        <img src={minus} height={20} width={20} alt="minus icon" style={{}} />
                                    </th>
                                    <th style={{
                                        textAlign: "start",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Name</th>
                                    <th style={{
                                        textAlign: "start",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Email ID</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Mobile no</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Walkin date</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none"
                                    }}>Address</th>

                                    <th style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        color: "#4B4B4B",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        background: "#E7F1FF",
                                        border: "none",
                                        borderTopRightRadius: "24px"
                                    }}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {currentCustomers.map((customer) => (
                                    <tr key={customer.id} className="customer-row">
                                        <td style={{
                                            textAlign: "center",
                                            padding: "10px",
                                            border: "none"
                                        }}>
                                            <img src={minus} height={20} width={20} alt="minus icon" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Image src={Ellipse1} roundedCircle height={40} width={40} alt="avatar" />
                                                <span style={{
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    fontFamily: "Gilroy",
                                                    color: "#222222",
                                                    paddingLeft: "12px"
                                                }}
                                                    className=" customer-name">
                                                    {customer.customer_Name}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "start"
                                        }}>{customer.email_Id || '-'}</td>
                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "center"
                                        }}>{customer.mobile_Number}</td>

                                        <td style={{
                                            padding: "8px",
                                            border: "none",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy"
                                        }}>
                                            <span style={{
                                                padding: "3px 7px",
                                                borderRadius: "60px",
                                                backgroundColor: "#EBEBEB",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                fontFamily: "Gilroy"
                                            }}>
                                                {moment(customer.walk_In_Date).format('DD/MMM/YYYY')}
                                            </span>
                                        </td>

                                        <td style={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            color: "#000000",
                                            textAlign: "center"
                                        }}>{customer.comments || "-"}</td>


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
                                                    zIndex: dotsButton === customer.id ? 1000 : 'auto'
                                                }}
                                                onClick={() => handleDotsClick(customer.id)}
                                            >
                                                <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                                {dotsButton === customer.id && (
                                                    <div
                                                        ref={popupRef}
                                                        style={{
                                                            cursor: "pointer",
                                                            backgroundColor: "#F9F9F9",
                                                            position: "absolute",
                                                            left: -170,
                                                            // bottom:0,
                                                            top: 30,
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
                                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
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
    cursor:walkInEditPermissionError ? "not-allowed" : "pointer",
    pointerEvents:walkInEditPermissionError ? "none" : "auto",
    opacity:walkInEditPermissionError ? 0.5 : 1,
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
    cursor: walkInDeletePermissionError ? "not-allowed" : "pointer",
    pointerEvents:walkInDeletePermissionError ? "none" : "auto",
    opacity:walkInDeletePermissionError ? 0.5 : 1,
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


                        <Pagination className=" d-flex justify-content-end align-items-center">
                            <Pagination.Prev
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                <ArrowLeft2 size="16" color="#1E45E1" />
                            </Pagination.Prev>

                            {Array.from({ length: totalPages }, (_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={idx + 1 === currentPage}
                                    onClick={() => handlePageChange(idx + 1)}
                                    style={{
                                        fontSize: '8px',
                                    }}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                <ArrowRight2 size="16" color="#1E45E1" />
                            </Pagination.Next>
                        </Pagination>
                    </div>
                ) : (

                    <div className='d-flex align-items-center justify-content-center ' style={{ width: "100%", height: 350, margin: "0px auto" }}>
                        <div>

                            <div className="no-data-container">
                                <Image src={Emptystate} alt="No Data" />
                                <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)", paddingTop: "10px" }}>No Walk-in available</div>
                                <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no Walk-in added. </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button
                                disabled={props.customerWalkInAddPermission}
                                    onClick={handleShowWalk}
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#1E45E1",
                                        color: "white",
                                        height: 56,
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        width: 200,
                                        padding: "18px 20px",
                                        fontFamily: 'Montserrat',
                                        marginTop: "20px"
                                    }}
                                >
                                    + Add Walk-in
                                </Button>

                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                )}
            </div></>
}
            

            {

                showForm && <CustomerForm
                    show={showForm}
                    handleClose={handleFormClose}
                    // onSubmit={handleFormSubmit}
                    initialData={selectedCustomer}
                // modalType={modalType}
                />
            }

            {/* Delete  Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered style={{ margin: "40px" }}>

                <Modal.Title style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "18px", textAlign: "center", color: "#222222", paddingTop: "20px" }}>
                    Delete walk-in?</Modal.Title>

                {customerToDelete && (
                    <p style={{ color: "#646464", fontFamily: "Gilroy", fontWeight: 500, textAlign: "center", fontSize: "16px", paddingTop: "20px" }}>Are you sure you want to delete this walk-in?</p>
                )}




                <div class="d-flex justify-content-evenly" style={{ margin: "20px" }}>
                    <button
                        style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "16px",
                            width: "160px",
                            height: "52px",
                            borderColor: "#1E45E1",
                            color: "#1E45E1",
                            transition: "all 0.3s ease"
                        }}
                        type="button"
                        className="btn hover-button"
                        onClick={cancelDelete}
                    >
                        Cancel
                    </button>

                    <button
                        style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "16px",
                            width: "160px",
                            height: "52px",
                            borderColor: "#1E45E1",
                            color: "#1E45E1",
                            transition: "all 0.3s ease"
                        }}
                        type="button"
                        className="btn hover-button"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                </div>



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
export default UserlistWalkin;














