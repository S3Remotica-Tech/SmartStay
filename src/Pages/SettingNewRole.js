import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import AddRole from '../Pages/RoleFile/AddRole';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import role from "../Assets/Images/New_images/security-user.png"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import Modal from "react-bootstrap/Modal";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import close from '../Assets/Images/close.svg';

function SettingNewRole({ hostelid }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const [showRole, setShowRole] = useState(false);
    const [roleList, setRoleList] = useState([])
    const [showDots, setShowDots] = useState(null);
    const [deleteRole, setDeleteRole] = useState(false)
    const [deletedId, setDeletedId] = useState('')
const [editRoleDetails, setEditRoleDetails] = useState('')
const [addRole, setAddRole] = useState(false)






    const handleClose = () => {
        setShowRole(false)
        

    };
    //add role

    // const handleAddRole = () => {
    //     setShowRole(true)
    //     setAddRole(true)
    //     setEditRoleDetails('')
    // };
      const [showPopup, setShowPopup] = useState(false);
    const handleAddRole = () => {
      if (!hostelid) {
        setShowPopup(true); 
        return;
      }
      setShowRole(true);
      setAddRole(true);
      setEditRoleDetails('');
      console.log("Adding Role...");
    };
    


    const handleShowDots = (index) => {
        setShowDots((prev) => (prev === index ? null : index));
    }


    const handleDeleteForm = (view) =>{
                setDeleteRole(true)
        setDeletedId(view.id)
    }

    const handleCloseDeleteForm = () =>{
        setDeleteRole(false)
    }


    const handleDeleteRole = () => {
        if(deletedId){
            dispatch({ type: "DELETESETTINGROLEPERMISSION", payload: {id:deletedId}});

        }
        
      }

    useEffect(() => {
        if(state.login.Settings_Hostel_Id){
        dispatch({ type: 'SETTING_ROLE_LIST', payload: { hostel_id: state.login.Settings_Hostel_Id } })
        }
    }, [state.login.Settings_Hostel_Id])


    useEffect(() => {
        if (state.Settings.statusCodeForRoleList == 200) {
            setRoleList(state.Settings.getsettingRoleList)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_ROLE_LIST' })
            }, 2000)

        }

    }, [state.Settings.statusCodeForRoleList])


    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };


const handleEditForm = (view) =>{
    setShowRole(true);
    setAddRole(false)
    setEditRoleDetails(view)
}

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(()=>{
        if(state.Settings.statusCodeForAddRole == 200)
            
            setShowRole(false)
            dispatch({ type: "SETTING_ROLE_LIST" , payload: { hostel_id: state.login.Settings_Hostel_Id }});
        setTimeout(() => {
          dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
        }, 1000);
      
      },[state.Settings.statusCodeForAddRole])


      useEffect(()=>{
        if(state.Settings.StatusForDeletePermission == 200){
            setDeleteRole(false)
          dispatch({type: "SETTING_ROLE_LIST" , payload: { hostel_id: state.login.Settings_Hostel_Id }});
          setTimeout(() => {
            dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
          }, 1000);
        }
      },[state.Settings.StatusForDeletePermission])
      

      useEffect(()=>{
        if(state.Settings.StatusForEditPermission === 200){
                    setShowRole(false)
            dispatch({ type: "SETTING_ROLE_LIST" , payload: { hostel_id: state.login.Settings_Hostel_Id }});
            setTimeout(() => {
                dispatch({ type: "CLEAR_EDIT_SETTING_ROLE"});
                dispatch({ type: "CLEAR_EDIT_PERMISSION"});     
              }, 1000);
        }
      
      },[state.Settings.StatusForEditPermission])

    return (
        <div className="container">
            <div className='container d-flex justify-content-between align-items-center'
                style={{
                    position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                  }}>
                <div>
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Role</label>


                </div>
                <div>
                    <Button
                        onClick={handleAddRole}
                        style={{ fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white", 
                          fontWeight: 600, borderRadius: 8, padding: "12px 16px 12px 16px", }}
                        disabled={showPopup}
                  >


                        {" "}
                        + Role
                    </Button>
                </div>
                
            </div>
            {showPopup && (
        <div className="d-flex flex-wrap">
        <p style={{color: "red"}} className="col-12 col-sm-6 col-md-6 col-lg-9">
          !Please add a hostel before adding electricity information.
        </p>
        
        <img 
  src={close} 
  alt="close icon" 
  onClick={() => setShowPopup(false)}
  className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-end"
  style={{ width: '20px', height: 'auto' ,cursor:"pointer"}} 
/>

      </div>
      
      
      )}


            <div className="row mt-3 mb-3">

                {
                    roleList.length > 0 ? roleList.map((view, index) => {
                        return (
                            <div key={index} className="col-12 col-sm-6 col-md-12 col-lg-4 col-xs-12 mb-3 ">
                                <div
                                    className="d-flex align-items-center justify-content-between p-3 border rounded relative"
                                    style={{ height: 64, width: "100%" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <img src={role} width={24} height={24} alt="Role Icon" />
                                        <span
                                            style={{
                                                marginLeft: 20,
                                                fontSize: 16,
                                                fontWeight: 600,
                                                fontFamily: "Gilroy",
                                                color: "#222222",
                                            }}
                                        >
                                            {view.role_name}
                                        </span>
                                    </div>
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
                                                        position:"relative"
                                                    }}

                                                    onClick={()=>handleShowDots(index)}
                                                >
                                                    <PiDotsThreeOutlineVerticalFill
                                                        style={{ height: "20px", width: "20px" }}
                                                    />
                                                    
                                                    {showDots === index && (
                                                        <div
                                                            ref={popupRef}
                                                            style={{
                                                                cursor: "pointer",
                                                                backgroundColor: "#F9F9F9",
                                                                position: "absolute",
                                                               top:30,
                                                               right:30,
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
                                                               onClick={() => handleEditForm(view)}
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
                                                              onClick={() => handleDeleteForm(view)}
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
                                  

                                </div>


                            </div>

                        )
                    })


                    :
                        
                    <div style={{justifyContent:"center",alignItems:"center",marginTop:80}}>
                    <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                    <div className="pb-1 mt-3" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No Role available</div>
                   
                  </div>


                }


            </div>





            {
                showRole && <AddRole showRole={showRole} addRole= {addRole} handleClose={handleClose} hostelid={hostelid} editRoleDetails={editRoleDetails}/>
            }


{
    <Modal
    show={deleteRole}
    onHide={handleCloseDeleteForm}
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
        Delete Role?
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
      Are you sure you want to delete this Role?
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
        onClick={handleCloseDeleteForm}
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
        onClick={handleDeleteRole}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
}








        </div>
    )
}
export default SettingNewRole;