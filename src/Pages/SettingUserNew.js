/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import {
    Button,
    Modal,
} from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import AddUser from '../Pages/UserFile/AddUser'

function SettingNewUser() {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const [usersFilterddata, setUsersFilterddata] = useState([]);
    const [addUserForm, setAddUserForm] = useState(false)
    const [showDots, setShowDots] = useState(null);
    const [editDetails, setEditDetails] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [loading, setLoading] = useState(true)
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [edit, setEdit] = useState(false)


    // Function Declare//////////////////////////////////////////////////////////


    const handleDotsClick = (index, event) => {

        event.stopPropagation();
        setShowDots((prev) => (prev === index ? null : index));
        const { top, left, height } = event.target.getBoundingClientRect();
        const popupTop = top + (height / 2);
        const popupLeft = left - 150;

        setPopupPosition({ top: popupTop, left: popupLeft });

    };



    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };

    //add user
    //       const [showPopup, setShowPopup] = useState(false);
    // const handleOpenAddUser = () =>{

    //        setAddUserForm(true)
    // }
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenAddUser = () => {
        if (!state.login.selectedHostel_Id) {
            setShowPopup(true);
            return;
        }
        setAddUserForm(true);
        setEdit(false)
    };


    const handleCloseAddUser = () => {
        setAddUserForm(false)
    }

    const handleEditForm = (item) => {
        setAddUserForm(true)
        setEditDetails(item)
        setEdit(true)
    }

    const handleDeleteForm = (item) => {
        setDeleteId(item.id)
        setIsConfirmDelete(true)
    }

    const handleClose = () => {
        setIsConfirmDelete(false)

    }


    const handleDelete = () => {
        if (deleteId) {
            dispatch({ type: 'DELETEUSER', payload: { id: deleteId } })
        }
    }



    // useEffect/////////////////////

    useEffect(() => {
        dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: state.login.selectedHostel_Id } });
    }, [state.login.selectedHostel_Id])



    useEffect(() => {
        if (state.InvoiceList?.deleteUserSuccessStatusCode === 200) {
            setIsConfirmDelete(false)
            dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: state.login.selectedHostel_Id } });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_DELETE_USER_STATUS_CODE' })
            }, 2000)

        }


    }, [state.InvoiceList?.deleteUserSuccessStatusCode])










    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (state.Settings?.StatusForaddSettingStaffList === 200) {
            setUsersFilterddata(state.Settings?.addSettingStaffList)
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: "CLEAR_USER_STAFF_LIST" });
            }, 200)
        }
    }, [state.Settings?.StatusForaddSettingStaffList])

    useEffect(() => {
        if (state.Settings?.errorUser) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: "REMOVE_ERROR_USER" });
            }, 100)

        }

    }, [state.Settings?.errorUser])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usersFilterddata?.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = usersFilterddata?.length && Math.ceil(usersFilterddata.length / itemsPerPage);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };






    return (

        <div className="container" style={{ position: "relative" }}>

            {loading &&
                <div
                style={{
                  position: 'fixed',
                  top: '48%',
                  left: '68%',
                  transform: 'translate(-50%, -50%)',
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  zIndex: 1050,
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




            <div 
            // className='d-flex justify-content-between align-items-center'
            className="d-flex flex-column flex-md-row justify-content-between align-items-center"
            style={{
                    // display: "flex", flexDirection: "row", justifyContent: "space-between", 
                    position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                }}  >
                <div 
                className="w-100 text-md-start text-center"
                style={{ marinTop: -4 }}>
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Users</label>
                </div>
                <div className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0">
                    <Button
                        onClick={handleOpenAddUser}
                        // style={{
                        //     fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white",
                        //     fontWeight: 600, borderRadius: 8, padding: "12px 16px 12px 16px",
                        // }}
                        style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "11px 52px",
                            // width: "auto",
                            maxWidth: "100%",
                            maxHeight: 50,
                            marginTop: 5,
                            whiteSpace: "nowrap",
                            
                        }}
                        disabled={showPopup}
                    >


                        {" "}
                        +  User
                    </Button>
                </div>
            </div>
            {showPopup && (
                <div className="d-flex flex-wrap">
                    <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
                        Please add a hostel before adding User information.
                    </p>


                </div>


            )}





            <div className="mt-4">
                {currentItems?.length > 0 ? (

                    <div style={{
                        height: currentItems.length >= 6 ? "400px" : "auto",
                        overflowY:
                            currentItems.length >= 6 ? "auto" : "visible",
                        borderRadius: "24px",
                        border: "1px solid #DCDCDC",
                    }}>
                        <Table
                            responsive="md"
                            className='Table_Design'
                            style={{
                                border: "1px solid #DCDCDC",
                                borderBottom: "1px solid transparent",
                                borderEndStartRadius: 0,
                                borderEndEndRadius: 0,
                            }}
                        >
                            <thead style={{
                                backgroundColor: "#E7F1FF",
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                            }}>
                                <tr>
                                    <th
                                        style={{
                                            color: "rgb(147, 147, 147)",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            fontFamily: "Gilroy",
                                            borderTopLeftRadius: "24px",
                                            textAlign: "start",
                                            padding: "10px",
                                            paddingLeft:"25px"
                                        }}
                                    >
                                        Users
                                    </th>
                                    <th
                                        style={{
                                            color: "rgb(147, 147, 147)",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            fontFamily: "Gilroy",
                                            padding: "10px",
                                            textAlign: "start",
                                        }}
                                    >
                                        Email
                                    </th>
                                    <th
                                        style={{
                                            color: "rgb(147, 147, 147)",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            fontFamily: "Gilroy",
                                            padding: "10px",
                                            textAlign: "start",
                                        }}
                                    >
                                        Mobile No
                                    </th>
                                    <th
                                        style={{
                                            color: "rgb(147, 147, 147)",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            fontFamily: "Gilroy",
                                            padding: "10px",
                                            textAlign: "start",
                                        }}
                                    >
                                        Role
                                    </th>
                                    <th
                                        style={{
                                            color: "rgb(147, 147, 147)",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            fontFamily: "Gilroy",
                                            padding: "10px",
                                            borderTopRightRadius: "24px",
                                            textAlign: "start",
                                        }}
                                    >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems?.map((item, index) => {
                                        // const imageUrl = item.profile || Profile;
                                        return (
                                            <tr key={index} style={{ overflowX: 'auto' }}>
                                                <td title={item.first_name}
                                                    style={{
                                                        border: "none",
                                                        // display: "flex",
                                                        padding: "10px",
                                                        textAlign: "start",
                                                        paddingTop: 18,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        paddingLeft:"25px"
                                                    }}
                                                >
                                                    {/* <Image
                                                    src={imageUrl}
                                                    alt={item.first_name || "Default Profile"}
                                                    roundedCircle
                                                    style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        marginRight: "10px",
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = Profile;
                                                    }}
                                                /> */}
                                                    <span
                                                        className="Customer_Name_Hover"
                                                        style={{
                                                            fontSize: "16px",
                                                            fontWeight: 500,
                                                            fontFamily: "Gilroy",
                                                            cursor: "pointer",
                                                            marginTop: 10

                                                        }}

                                                    >
                                                        {item.first_name}
                                                    </span>
                                                </td>
                                                <td title={item.email_Id}
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: "16px",
                                                        fontFamily: "Gilroy",
                                                        textAlign: "start",
                                                        paddingTop: 17,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis", whiteSpace: "nowrap"

                                                    }}
                                                >
                                                    {item.email_Id}
                                                </td>

                                                <td title={item.mobileNo}
                                                    style={{
                                                        paddingTop: 17,
                                                        border: "none",
                                                        textAlign: "start",
                                                        fontSize: "16px",
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy",
                                                        marginTop: 10,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }}
                                                >
                                                    {/* +
                                                    {item &&
                                                        String(item.mobileNo).slice(
                                                            0,
                                                            String(item.mobileNo).length - 10
                                                        )}{" "}
                                                    {item && String(item.mobileNo).slice(-10)} */}
                                                     +
                                        {item &&
                                          String(item.mobileNo)?.slice(
                                            0,
                                            String(item.mobileNo).length - 10
                                          )}{" "}
                                        {item && String(item.mobileNo)?.slice(-10)}
                                                </td>
                                                
                                                <td title={item.role_name}
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: "16px",
                                                        fontFamily: "Gilroy",
                                                        textAlign: "start",
                                                        paddingTop: 17,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis", whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {item.role_name}
                                                </td>
                                                <td style={{
                                                    textAlign: "center", display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                    <div
                                                        style={{
                                                            height: "35px",
                                                            width: "35px",
                                                            borderRadius: "50%",
                                                            border: "1px solid #EFEFEF",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            // zIndex: showDots ? 1000 : "auto",
                                                            position: "relative",
                                                            cursor: "pointer",
                                                            // backgroundColor: showDots  ? "#E7F1FF" : "white",
                                                            backgroundColor: showDots === index ? "#E7F1FF" : "white",


                                                        }}

                                                        onClick={(e) => handleDotsClick(index, e)}
                                                    >
                                                        <PiDotsThreeOutlineVerticalFill
                                                            style={{
                                                                height: "18px", width: "18px",
                                                                cursor: "pointer",
                                                            }}
                                                        />

                                                        {showDots === index && (
                                                            <div
                                                                ref={popupRef}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    backgroundColor: "#F9F9F9",
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
                                                                }}
                                                            >
                                                                <div
                                                                    className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                                                    onClick={() => handleEditForm(item)}
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
                                                                <div className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                                                    onClick={() => handleDeleteForm(item)}
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
                                                </td>
                                            </tr>
                                        )
                                    })

                                }

                            </tbody>
                        </Table></div>

                ) : !loading && (
                    <div style={{ marginTop: 90, alignItems: "center", justifyContent: "center" }}>
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
                            No Users{" "}
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
                            There are no Users available.{" "}
                        </div>


                    </div>
                )
                }
            </div>




            {
                usersFilterddata?.length >= 5 &&
                <nav className='position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center'
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

                        {/* Current Page Indicator */}
                        <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                            {currentPage} of {totalPages}
                        </li>

                        {/* Next Button */}
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
            }


            {
                isConfirmDelete &&

                <Modal show={isConfirmDelete} onHide={handleClose}
                    centered
                    backdrop="static"
                   dialogClassName="custom-delete-modal"
                    >
                    <Modal.Header style={{ borderBottom: "none" }} >
                        <Modal.Title 
                        className="w-100 text-center"
                        style={{
                            fontSize: "18px",
                            fontFamily: "Gilroy",
                            
                            fontWeight: 600,
                            color: "#222222",
                            
                        }}
                        >Delete User ?</Modal.Title>
                    </Modal.Header>



                    <Modal.Body 
                    className="text-center"
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        color: "#646464",
                       
                        marginTop: "-10px",
                    }}>
                        Are you sure you want to delete the User ?    </Modal.Body>
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

            }










            {addUserForm && <AddUser show={addUserForm} handleClose={handleCloseAddUser} editDetails={editDetails} hostelid={state.login.selectedHostel_Id} setAddUserForm={setAddUserForm} edit={edit} setEdit={setEdit} />}









        </div>
    )
}
export default SettingNewUser;