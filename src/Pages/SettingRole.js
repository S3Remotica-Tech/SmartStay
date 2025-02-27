import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import role from "../Assets/Images/New_images/security-user.png"
import round from "../Assets/Images/dot_round.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import RolesDesign from "./SettingDesign";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import SettingRoleEdit from './SettingRoleEdit';
import Modal from "react-bootstrap/Modal";




function RolePage() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const popupRef = useRef(null);


  const [rolePage, setRolePage] = useState(false)
  const [activeRow, setActiveRow] = useState(null);
  const [RoleEdit, setRoleEdit] = useState(false)
  const [editPage, setEditPage] = useState("")
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [deleteRleForm, setDeleteRleForm] = useState(false)
  const [deleteId, setDeleteId] = useState("")


  const handleShowDots = (id, e) => {
    if (activeRow === id) {
      setActiveRow(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY + 30,
        left: rect.left + window.scrollX - 120,
      });
      setActiveRow(id);
    }
  };
  const handleEditUserRole = (item) => {
    setEditPage(item)
    setRoleEdit(true)
    setActiveRow(null)
  }
  const handleDeleteUserRole = (v) => {
    setDeleteId(v.id)
    setDeleteRleForm(true)
    setActiveRow(false)
  }
  const handleCloseRoleDelete = () => {
    setDeleteRleForm(false)
  }
  const handleDeleteRole = () => {
    dispatch({ type: "DELETESETTINGROLEPERMISSION", payload: { id: deleteId } });

  }
  useEffect(() => {
    if (state.Settings.StatusForDeletePermission === 200) {
      handleCloseRoleDelete()
      dispatch({ type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
      }, 1000);
    }
  }, [state.Settings.StatusForDeletePermission])

  useEffect(() => {
    dispatch({ type: 'SETTING_ROLE_LIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [state.login.selectedHostel_Id])

  const handleCreateNew = () => {
    setRolePage(true)
  }
  return (
    <>
      {RoleEdit == true ? (
        <SettingRoleEdit setRoleEdit={setRoleEdit} editPage={editPage} />
      ) :





        <>
          {rolePage == true ? (
            <RolesDesign rolePage={rolePage} setRolePage={setRolePage} />
          ) : <div className="container">
            <div className="row">
              {/* Role Card */}
              {
                state.Settings?.getsettingRoleList?.response?.roles.map((u) => {
                  return (
                    <div key={u.id} className="col-12 col-sm-6 col-md-12 col-lg-3 mb-3">
                      <div
                        className="d-flex align-items-center justify-content-between p-3 border rounded"
                        style={{ height: 64, width: "100%" }}
                      >
                        <div className="d-flex align-items-center">
                          <img src={role} width={24} height={24} alt="Role Icon" />
                          <span
                            style={{
                              marginLeft: 20,
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#222222",
                            }}
                          >
                            {u.role_name}
                          </span>
                        </div>
                        <button className="btn p-0" style={{cursor:"pointer"}} >
                          <img src={round} width={30} height={30} alt="Menu Icon" onClick={(e) => handleShowDots(u.id, e)}
                            style={{ cursor: "pointer" }} />
                        </button>
                      </div>

                      {activeRow === u.id && (
                        <div
                          ref={popupRef}
                          className="position-absolute"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#fff",
                            top: popupPosition.top,
                            left: popupPosition.left,
                            width: 143,
                            border: "1px solid #EBEBEB",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "start",
                            padding: 10,
                            alignItems: "center",
                            zIndex: 1000,
                          }}
                        >
                          <div>
                            <div
                              className="mb-2 d-flex justify-content-start align-items-center gap-2"
                              onClick={() => handleEditUserRole(u)}
                            >
                              <img src={Edit} style={{ height: 16, width: 16 }} />
                              <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222" }}>
                                Edittttt
                              </label>
                            </div>
                            <div
                              className="mb-1 d-flex justify-content-start align-items-center gap-2"
                              style={{ backgroundColor: "#fff" }}
                              onClick={() => handleDeleteUserRole(u)} >
                              <img
                                src={Delete}
                                style={{ height: 16, width: 16 }}
                              />{" "}
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy,sans-serif",
                                  color: "#FF0000",
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </label>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>

                  )
                })
              }


              {/* Create New Card */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div
                  className="d-flex align-items-center justify-content-between p-3 rounded"
                  style={{
                    backgroundColor: "#E7F1FF",
                    height: 64,
                    width: "100%",
                    border: "none",
                  }}
                >
                  <div className="d-flex align-items-center" onClick={handleCreateNew}>
                    <img src={rolecircle} width={24} height={24} alt="Create Icon" />
                    <span
                      style={{
                        marginLeft: 20,
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        color: "#222222",
                      }}
                    >
                      Create New
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>}





        </>
      }


      <Modal
        show={deleteRleForm}
        onHide={() => handleCloseRoleDelete()}
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
            onClick={handleCloseRoleDelete}
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
    </>




  )
}
export default RolePage;