import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import {
    Button,
    Offcanvas,
    Modal,
    Form,
    FormControl,
    FormSelect, InputGroup
} from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import AddUser from '../Pages/UserFile/AddUser'
import close from '../Assets/Images/close.svg';

function SettingNewUser({ hostelid }) {

    /////////////////////////// state
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
    const [edit,setEdit] =useState(false)


    // Function Declare//////////////////////////////////////////////////////////

    const handleDotsClick = (index,event) => {

        event.stopPropagation();
        setShowDots((prev) => (prev === index ? null : index));
        const { top, left, width, height } = event.target.getBoundingClientRect();
const popupTop = top + height / 2;
const popupLeft = left - 200;
            

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
        console.log("Opening Add User Form...");
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
        if (state.InvoiceList?.deleteUserSuccessStatusCode == 200) {
            setIsConfirmDelete(false)
            dispatch({ type: "GETUSERSTAFF", payload: { hostel_id:state.login.selectedHostel_Id } });
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
        if (state.Settings?.StatusForaddSettingStaffList == 200) {
            setUsersFilterddata(state.Settings?.addSettingStaffList)
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: "CLEAR_USER_STAFF_LIST" });
            }, 200)
        }
    }, [state.Settings?.StatusForaddSettingStaffList])

useEffect(()=>{
    if(state.Settings?.errorUser){
        setLoading(false)
        setTimeout(() => {
            dispatch({ type: "REMOVE_ERROR_USER" });
        }, 100)

    }

},[state.Settings?.errorUser])
    

    return (

        <div className="container" style={{ position: "relative" }}>

            {loading &&
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: '200px',
                        height: "60vh",
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




            <div className='d-flex justify-content-between align-items-center'
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between", position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                }}  >
                <div>
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Users</label>
                </div>
                <div>
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
                            padding: "8px 10px",
                            // width: "auto",
                            maxWidth: "100%",
                            maxHeight: 50,

                
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
                    <p style={{ color: "red", fontFamily:"Gilroy", fontSize:14}} className="col-12 col-sm-6 col-md-6 col-lg-9">
                        Please add a hostel before adding User information.
                    </p>


                </div>


            )}





            <div className="container mt-4">
                {usersFilterddata?.length > 0 ? (

<div style={{ maxHeight: "400px", overflowY: "auto" }}> 
                    <Table
                        responsive="md"
                        className='Table_Design'
                        style={{
                            height: "auto",
                            // tableLayout: "auto",
                            overflow: "visible",
                            borderRadius: "24px",
                            border: "1px solid #DCDCDC",
                            tableLayout: "fixed",
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
                                        color: "#222",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        fontFamily: "Gilroy",
                                        borderTopLeftRadius: "24px",
                                        textAlign: "start",
                                        paddingLeft: 20
                                    }}
                                >
                                    Users
                                </th>
                                <th
                                    style={{
                                        color: "#222",
                                        fontWeight: 600,
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
                                        color: "#222",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        fontFamily: "Gilroy",
                                        padding: "10px",
                                        textAlign: "start",
                                    }}
                                >
                                    Mobile
                                </th>
                                <th
                                    style={{
                                        color: "#222",
                                        fontWeight: 600,
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
                                        padding: "10px",
                                        borderTopRightRadius: "24px",
                                        textAlign: "center",
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersFilterddata?.map((item, index) => {
                                    const imageUrl = item.profile || Profile;
                                    return (
                                        <tr style={{ overflowX: 'auto' }}>
                                            <td
                                                style={{
                                                    border: "none",
                                                    // display: "flex",
                                                    padding: "10px",
                                                    paddingLeft: "20px",
                                                    paddingTop:18
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
                                            <td
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: "16px",
                                                    fontFamily: "Gilroy",
                                                    textAlign: "start",
                                                    paddingTop: 17

                                                }}
                                            >
                                                {item.email_Id}
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
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                +
                                                {item &&
                                                    String(item.mobileNo).slice(
                                                        0,
                                                        String(item.mobileNo).length - 10
                                                    )}{" "}
                                                {item && String(item.mobileNo).slice(-10)}
                                            </td>
                                            <td
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: "16px",
                                                    fontFamily: "Gilroy",
                                                    textAlign: "start",
                                                    paddingTop: 15
                                                }}
                                            >
                                                {item.role_name}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <div
                                                    style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        borderRadius: "50%",
                                                        border: "1px solid #EFEFEF",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        zIndex: showDots ? 1000 : "auto",
                                                        position: "relative",
                                                        cursor: "pointer",
                                                        // backgroundColor: showDots  ? "#E7F1FF" : "white",
                                                        backgroundColor: showDots === index ?"#E7F1FF" : "white",
                                                      
                                                        
                                                    }}

                                                    onClick={(e) => handleDotsClick(index,e)}
                                                >
                                                    <PiDotsThreeOutlineVerticalFill
                                                        style={{ height: "20px", width: "20px",
                                                            cursor: "pointer",
                                                         }}
                                                    />

                                                    {showDots === index && (
                                                        <div
                                                            ref={popupRef}
                                                            style={{
                                                                cursor: "pointer",
                                                                backgroundColor: "#F9F9F9",
                                                                position: "absolute",
                                                                position: "fixed",
                                                                top: popupPosition.top,
                                                                left: popupPosition.left,
                                                                width: 160,
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
                isConfirmDelete &&

                <Modal show={isConfirmDelete} onHide={handleClose} centered backdrop="static">
                    <Modal.Header style={{ display: "flex", justifyContent: "center" }} >
                        <Modal.Title style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>Delete User ?</Modal.Title>
                    </Modal.Header>



                    <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}>
                        Are you sure you want to delete the User ?    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
                        <Button
                            onClick={handleClose}
                            style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                            Cancel
                        </Button>

                        <Button style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>

                    </Modal.Footer>
                </Modal>

            }










            {addUserForm && <AddUser show={addUserForm} handleClose={handleCloseAddUser} editDetails={editDetails} hostelid={state.login.selectedHostel_Id} setAddUserForm={setAddUserForm} edit={edit} setEdit={setEdit}/>}









        </div>
    )
}
export default SettingNewUser;