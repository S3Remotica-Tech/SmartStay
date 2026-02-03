/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import AddRole from '../../Pages/RoleFile/AddRole';
import role from "../../Assets/Images/New_images/security-user.png"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import Modal from "react-bootstrap/Modal";
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import '../../Pages/Settings/SettingNewRole.css';
import { useHasPermission } from '../../Utils/Permission';
import ErrorMessage from '../../Components/ErrorMessage'
import withErrorBoundary from "../../Hoc/WithErrorBountry";


function SettingNewRole() {

 

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

  const [loading, setLoading] = useState(false)




  // const canReadRole = useHasPermission("Role", "canRead")
  // const canWriteRole = useHasPermission("Role", "canWrite");
  // const canUpdateRole = useHasPermission("Role", "canUpdate");
  // const canDeleteRole = useHasPermission("Role", "canDelete");

const {
      canWriteModule: canWriteRole,
      canReadModule: canReadRole,
      canUpdateModule: canUpdateRole,
      canDeleteModule: canDeleteRole,
    } = useHasPermission("Role");




useEffect(() => {
      if (!canReadRole) {
        setLoading(false);
      }
    }, [canReadRole]);

  useEffect(() => {
    dispatch({ type: 'GETMODULES' })
  }, [])


   useEffect(() => {
          if (roleList.length === 0) {
            setLoading(false);
          }
      
        }, [roleList])

  const handleAddRole = () => {

    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding Role information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowRole(true);
    setAddRole(true);

    setEditRoleDetails('');
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event, index) => {
    setShowDots((prev) => (prev === index ? null : index));
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });


  }




  const handleDeleteForm = (view) => {
    setDeleteRole(true)
    setDeletedId(view.id)
  }

  const handleCloseDeleteForm = () => {
    setDeleteRole(false)
  }

  useEffect(() => {
    if (state.Settings?.assignedUserRoleStatusCode === 400) {
      setDeleteRole(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ASSIGNED_ERROR' })
      })
    }

  }, [state.Settings?.assignedUserRoleStatusCode])




  const handleDeleteRole = () => {
    if (deletedId) {
      dispatch({ type: "DELETESETTINGROLEPERMISSION", payload: { id: deletedId } });

    }

  }





 useEffect(() => {
  const hostelId = state?.login?.selectedHostel_Id;

  if (!hostelId || hostelId === "null" || hostelId === "undefined" || hostelId === "") return;

  dispatch({ type: 'SETTING_ROLE_LIST', payload: hostelId });
  setLoading(true);

}, [state?.login?.selectedHostel_Id]);





  useEffect(() => {
    if (state.Settings.statusCodeForRoleList === 200) {
      setRoleList(state.Settings.getsettingRoleList)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ROLE_LIST' })
      }, 2000)
    }
  }, [state.Settings.statusCodeForRoleList])



  useEffect(() => {
    if (state.Settings.errorRole) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ERROR_ROLE' })
      }, 200)
    }
  }, [state.Settings.errorRole])


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };


  const handleEditForm = (view) => {
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


  useEffect(() => {
    if (state.Settings.statusCodeForAddRole === 201 && state.login.selectedHostel_Id)

      setShowRole(false)
    dispatch({ type: 'SETTING_ROLE_LIST', payload: state.login.selectedHostel_Id });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
    }, 1000);

  }, [state.Settings.statusCodeForAddRole])


  useEffect(() => {
    if (state.Settings.StatusForDeletePermission === 204 && state.login.selectedHostel_Id) {
      setDeleteRole(false)
      dispatch({ type: 'SETTING_ROLE_LIST', payload: state.login.selectedHostel_Id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
      }, 1000);
    }
  }, [state.Settings.StatusForDeletePermission])


  useEffect(() => {
    if (state.Settings.StatusForEditPermission === 200 && state.login.selectedHostel_Id) {
      setShowRole(false)
      dispatch({ type: 'SETTING_ROLE_LIST', payload: state.login.selectedHostel_Id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_SETTING_ROLE" });
        dispatch({ type: "CLEAR_EDIT_PERMISSION" });
      }, 1000);
    }

  }, [state.Settings.StatusForEditPermission])





  return (
    <div>
    <div className="sticky top-0 z-[1000] bg-white h-[50px] pr-[1px]
                flex flex-col md:flex-row md:items-center md:justify-between">


  <div className="w-full flex justify-center md:justify-start">
    <label className="font-[Gilroy] text-[20px] font-semibold text-[#222] whitespace-nowrap">
      Role
    </label>
  </div>

  <div className="w-full flex justify-center md:justify-end mt-2 md:mt-0">
    <button
      disabled={!canWriteRole}
      onClick={handleAddRole}
      className="
        mt-3
        px-[53px] py-[11px]
        rounded-lg
        bg-[#1E45E1] text-white
        text-[14px] font-semibold font-[Gilroy]
        whitespace-nowrap
        disabled:opacity-40 disabled:cursor-not-allowed
      "
    >
      + Role
    </button>
  </div>

</div>



      {
        !canReadRole ? (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh"
            }}
          >

            <ErrorMessage message={['You do not have access to view Role']} type="warning" />

          </div>


        )
          : (

            <div
              className="row mt-3 mb-3 overflow-auto  show-scrolls"
              style={{ maxHeight: 475, overflowY: "auto" }}
            >
              {roleList.length > 0 ? (
                roleList.map((view, index) => (
                  <div key={index} className="col-12  col-sm-12 col-md-12 col-lg-4 col-xs-12 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-between p-3 border rounded position-relative"
                      style={{ height: 64, width: "100%" }}
                    >
                      <div className="d-flex align-items-center">
                        <img src={role} width={24} height={24} alt="Role Icon" />
                        <span
                          title={view.role_name}
                          className="ms-3  text-truncate d-inline-block"
                          style={{ fontSize: 16, maxWidth: 100, fontWeight: 500, fontFamily: "Gilroy" }}
                        >
                          {view.name}
                        </span>
                      </div>

                      <div
                        className="d-flex justify-content-center align-items-center border rounded-circle"
                        style={{
                          height: "35px",
                          width: "35px",
                          cursor: "pointer",
                          // backgroundColor: showDots === index ? "#E7F1FF" : "white",
                          position: "relative",
                        }}
                        onClick={(e) => handleShowDots(e, index)}
                      >
                        <PiDotsThreeOutlineVerticalFill
                          style={{ height: "20px", width: "20px" }}
                        />
                        {showDots === index && view.editable && (
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
                                onClick={() => {
                                  if (view.editable && canUpdateRole) handleEditForm(view);
                                }}
                                style={{
                                  padding: "8px 12px",
                                  width: "100%",
                                  cursor: view.editable && canUpdateRole ? "pointer" : "not-allowed",
                                  transition: "background 0.2s ease-in-out",
                                  opacity: view.editable && canUpdateRole ? 1 : 0.5,
                                }}
                                onMouseEnter={(e) =>
                                  view.editable &&
                                  (e.currentTarget.style.backgroundColor = "#F0F4FF")
                                }
                                onMouseLeave={(e) =>
                                  view.editable &&
                                  (e.currentTarget.style.backgroundColor = "transparent")
                                }
                              >
                                <img src={Edit} width={16} height={16} alt="Edit" style={{ filter: view.editable && canUpdateRole ? "none" : "grayscale(100%)" }} />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    cursor: view.editable && canUpdateRole ? "pointer" : "not-allowed",
                                    color: view.editable && canUpdateRole ? "#1E45E1" : "#A0A0A0",
                                  }}
                                >
                                  Edit
                                </span>
                              </div>

                              <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

                              <div
                                className="d-flex gap-2 align-items-center"
                                onClick={() => view.editable && canDeleteRole && handleDeleteForm(view)}
                                style={{
                                  padding: "8px 12px",
                                  width: "100%",
                                  cursor: view.editable && canDeleteRole ? "pointer" : "not-allowed",
                                  opacity: view.editable && canDeleteRole ? 1 : 0.5,
                                  transition: "background 0.2s ease-in-out",
                                }}
                                onMouseEnter={(e) =>
                                  view.editable &&
                                  (e.currentTarget.style.backgroundColor = "#F0F4FF")
                                }
                                onMouseLeave={(e) =>
                                  view.editable &&
                                  (e.currentTarget.style.backgroundColor = "transparent")
                                }
                              >
                                <img src={Delete} width={16} height={16} alt="Delete" style={{ filter: view.editable && canDeleteRole ? "none" : "grayscale(100%)" }} />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    color: view.editable && canDeleteRole ? "#FF0000" : "A0A0A0",
                                    cursor: view.editable && canDeleteRole ? "pointer" : "not-allowed",
                                  }}
                                >
                                  Delete
                                </span>
                              </div>

                            </div>
                          </div>

                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                !loading && (





                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 90,
                      paddingLeft: "0px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={EmptyState}
                        alt="emptystate"
                        style={{ maxWidth: "250px" }}
                      />
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
                        No Roles{" "}
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
                        There are no Roles available.{" "}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )
      }


















      {loading &&
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


      {
        showRole && <AddRole showRole={showRole} addRole={addRole} hostelid={state.login.selectedHostel_Id} editRoleDetails={editRoleDetails} setShowRole={setShowRole} />
      }


      {
        <Modal
          show={deleteRole}
          onHide={handleCloseDeleteForm}
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
              Delete Role?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            className="text-center  "
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Gilroy",
              color: "#646464",

              marginTop: "-27px",
            }}
          >
            Are you sure you want to delete this Role?
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
              onClick={handleCloseDeleteForm}
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
SettingNewRole.propTypes = {
  hostelid: PropTypes.func.isRequired,
};
export default withErrorBoundary(SettingNewRole);