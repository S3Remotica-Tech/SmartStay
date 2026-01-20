/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
    Shield
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useHasPermission } from '../../Utils/Permission';
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import AddUser from "../../Pages/UserFile/AddUser";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import DeleteStaff from "./DeleteStaff";







function ManagedUsers() {

    // const users = [
    //     {
    //         name: "Raja",
    //         role: "Co Admin",
    //         email: "raja@smartstay.com",
    //         mobile: "+91 78564 98322",
    //         description: "Manage all except Banking"
    //     },
    //     {
    //         name: "Priya M",
    //         role: "Warden",
    //         email: "priya@smartstay.com",
    //         mobile: "+91 78564 98322",
    //         description: "Read access for tenants and rooms"
    //     },
    //     {
    //         name: "Gowtham",
    //         role: "Receptionist",
    //         email: "gowtham@smartstay.com",
    //         mobile: "+91 78564 98322",
    //         description: "Can manage tenants, bookings"
    //     },
    //     {
    //         name: "Sanjay L",
    //         role: "Accountant",
    //         email: "sanjay@smartstay.com",
    //         mobile: "+91 78564 98322",
    //         description: "Manages billing, invoices, collections"
    //     }
    // ];

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [showDots, setShowDots] = useState(null);


    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const [showAbove, setShowAbove] = useState(false);

    const popupRef = useRef(null);


    const {
        canUpdateModule: canUpdateUser,
        canDeleteModule: canDeleteUser,
    } = useHasPermission("User");



    const ellipsisStyle = {
        maxWidth: 160,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    };


    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "GETUSERSTAFF", payload: { hostelId: state.login.selectedHostel_Id } });
        }

    }, [state.login.selectedHostel_Id]);



    const handleDotsClick = (index, event) => {
        event.stopPropagation();
        setShowDots((prev) => (prev === index ? null : index));

        const { top, left, height } = event.target.getBoundingClientRect();
        const popupTop = top + (height / 2);
        const popupLeft = left - 200;

        setPopupPosition({ top: popupTop, left: popupLeft });

    };

    useEffect(() => {
        if (popupRef.current) {
            const popupHeight = popupRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - popupPosition.top;


            setShowAbove(spaceBelow < popupHeight + 20);
        }
    }, [popupPosition]);



    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };

    const [addUserForm, setAddUserForm] = useState(false);
    const [editDetails, setEditDetails] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);

    const [edit, setEdit] = useState(false);

    const handleEditForm = (item) => {
        setAddUserForm(true);
        setEditDetails(item);
        setEdit(true);
    };


    const handleCloseAddUser = () => {
        setAddUserForm(false);
        setEdit(false);
    };

    const handleDeleteForm = (item) => {
        setDeleteId(item.userId);
        setIsConfirmDelete(true);
    };


    const handleClose = () => {
        setIsConfirmDelete(false);
    };


    useEffect(() => {
        if (state.InvoiceList?.deleteUserSuccessStatusCode === 200) {
            setIsConfirmDelete(false);
            dispatch({ type: "GETUSERSTAFF", payload: { hostelId: state.login.selectedHostel_Id } });
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





    return (
        <div style={{
            width: "100%", overflowX: "hidden", overflowY: "auto",
            maxHeight: 400,
        }}>


            {
                state.Settings?.addSettingStaffList?.length > 0 &&

                <div className="table-responsive " style={{
                    fontFamily: "Gilroy", marginTop: 10, border: "1px solid #DCDCDC", borderRadius: 10,
                    maxHeight: 320,
                    overflowY: "auto"
                }}>
                    <Table className="align-middle">
                        <thead style={{
                            background: "#F9FAFB", position: "sticky",
                            top: 0,
                            zIndex: 10,
                        }}>
                            <tr >
                                <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>USER NAME</th>
                                <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>ROLE ASSIGN</th>
                                <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>MAIL ID</th>
                                <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>MOBILE NO</th>
                                <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>DESCRIPTION</th>
                                <th className="text-center" style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.Settings?.addSettingStaffList.length > 0 && state.Settings?.addSettingStaffList?.map((user, index) => (
                                <tr key={index} >
                                    {/* USER NAME */}
                                    <td style={{ ...ellipsisStyle, fontWeight: 600 }}
                                        title={user?.firstName}>{user?.firstName} {""} {user?.lastName}</td>

                                    {/* ROLE */}
                                    <td className="d-flex align-items-center"
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                background: "#FFF7ED",
                                                color: "#FF9900",
                                                padding: "4px 8px",
                                                borderRadius: 8,
                                                fontSize: 13,
                                                fontWeight: 500,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Shield size={14} color="#FF9900" />
                                        </span>

                                        <span
                                            className="ms-2"
                                            style={{
                                                ...ellipsisStyle,
                                                fontWeight: 600,
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                                maxWidth: 140,
                                            }}
                                            title={user.roleName}
                                        >
                                            {user.roleName}
                                        </span>
                                    </td>



                                    <td style={{ ...ellipsisStyle, fontWeight: 400 }}
                                        title={user.mailId}>{user.mailId}</td>


                                    <td style={{ ...ellipsisStyle, fontWeight: 400 }}
                                        title={user.mobileNo}>
                                        + {user?.countryCode} {user?.mobileNo}

                                    </td>


                                    <td style={{
                                        ...ellipsisStyle,
                                        color: "#4B4B4B",
                                        fontWeight: 400
                                    }}
                                        title={user.description}>
                                        {user.description}
                                    </td>


                                    <td className="text-center">
                                        <PiDotsThreeOutlineVerticalFill
                                            style={{ cursor: "pointer" }}
                                            size={20} onClick={(e) => handleDotsClick(index, e)}
                                        />


                                        {showDots === index && (
                                            <div
                                                ref={popupRef}
                                                className="pg-card"
                                                style={{
                                                    backgroundColor: "#fff",
                                                    position: "fixed",
                                                    top: showAbove
                                                        ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
                                                        : popupPosition.top - 35,
                                                    left: popupPosition.left - 0,
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
                                                        onClick={() => canUpdateUser && handleEditForm(user)}
                                                        style={{
                                                            padding: "8px 12px",
                                                            width: "100%",
                                                            cursor: canUpdateUser ? "pointer" : "not-allowed",
                                                            transition: "background 0.2s ease-in-out",
                                                            opacity: canUpdateUser ? 1 : 0.5, borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0F4FF")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                                    >
                                                        <img src={Edit} width={16} height={16} alt="Edit" style={{ filter: canUpdateUser ? "none" : "grayscale(100%)" }} />
                                                        <span
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy, sans-serif",
                                                                cursor: canUpdateUser ? "pointer" : "not-allowed",
                                                                color: canUpdateUser ? "#1E45E1" : "#A0A0A0",
                                                            }}
                                                        >
                                                            Edit
                                                        </span>
                                                    </div>


                                                    <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                                    <div
                                                        className="d-flex gap-2 align-items-center"
                                                        onClick={() => canDeleteUser && handleDeleteForm(user)}
                                                        style={{
                                                            padding: "8px 12px",
                                                            width: "100%",
                                                            cursor: canDeleteUser ? "pointer" : "not-allowed",
                                                            transition: "background 0.2s ease-in-out",
                                                            opacity: canDeleteUser ? 1 : 0.5
                                                            , borderBottomLeftRadius: 10,
                                                            borderBottomRightRadius: 10,
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF3F3")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                                    >
                                                        <img src={Delete} width={16} height={16} alt="Delete" style={{ filter: canDeleteUser ? "none" : "grayscale(100%)" }} />
                                                        <span
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy, sans-serif",
                                                                color: canDeleteUser ? "#FF0000" : "A0A0A0",
                                                                cursor: canDeleteUser ? "pointer" : "not-allowed",
                                                            }}
                                                        >
                                                            Delete
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        )}


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
            {
                state.Settings?.addSettingStaffList?.length === 0 &&

                <div style={{ marginTop: 5 }} className="animated-text d-flex justify-content-center align-items-center">
                    <div>
                        <div style={{ textAlign: "center" }}>
                            {" "}
                            <img src={Emptystate} alt="emptystate" />
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
                            No Staff{" "}
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
                           There are no staff{"'"}s available

                        </div>
                    </div>
                </div>

            }


            {isConfirmDelete && (
                <DeleteStaff show={isConfirmDelete} handleClose={handleClose} deleteId={deleteId} />
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
    )
}

export default ManagedUsers