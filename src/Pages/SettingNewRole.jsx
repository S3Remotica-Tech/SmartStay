/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import AddRole from '../Pages/RoleFile/AddRole';
import role from "../Assets/Images/New_images/security-user.png"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import Modal from "react-bootstrap/Modal";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import PropTypes from "prop-types";
import './SettingNewRole.css';


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

  const [loading, setLoading] = useState(true)




  const [showPopup, setShowPopup] = useState(false);
  const handleAddRole = () => {
    if (!hostelid) {
      setShowPopup(true);
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
    if (state.Settings?.assignedUserRoleStatusCode === 202) {
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
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'SETTING_ROLE_LIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    }
  }, [state.login.selectedHostel_Id])


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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = roleList?.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = roleList?.length > 0 ? Math.ceil(roleList.length / itemsPerPage) : 1;


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };



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
    if (state.Settings.statusCodeForAddRole === 200)

      setShowRole(false)
    dispatch({ type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
    }, 1000);

  }, [state.Settings.statusCodeForAddRole])


  useEffect(() => {
    if (state.Settings.StatusForDeletePermission === 200) {
      setDeleteRole(false)
      dispatch({ type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
      }, 1000);
    }
  }, [state.Settings.StatusForDeletePermission])


  useEffect(() => {
    if (state.Settings.StatusForEditPermission === 200) {
      setShowRole(false)
      dispatch({ type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_SETTING_ROLE" });
        dispatch({ type: "CLEAR_EDIT_PERMISSION" });
      }, 1000);
    }

  }, [state.Settings.StatusForEditPermission])


  useEffect(() => {
    if (
      roleList.length > 0 &&
      currentItems.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  }, [roleList])

  return (
    <div style={{ position: "relative", paddingRight: 10, paddingLeft: 10 }}>
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
          paddingRight: 1
        }}>
        <div
          className="w-100 d-flex justify-content-center justify-content-md-start mt-3"
          style={{ marinTop: -4 }}>
          <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Role</label>


        </div>
        <div className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0">
          <Button
            onClick={handleAddRole}
            style={{
              fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white",
              fontWeight: 600, borderRadius: 8, padding: "11px 53px", paddingLeft: 52, marginTop: 12,
              whiteSpace: "nowrap",
            }}
            disabled={showPopup}
          >


            {" "}
            + Role
          </Button>
        </div>

      </div>


      {showPopup && (
        <div className="d-flex flex-wrap">
          <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Role information.
          </p>

        </div>


      )}


      <div
        className="row mt-3 mb-3 overflow-auto scroll-issue"

      >
        {currentItems.length > 0 ? (
          currentItems.map((view, index) => (
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
                    {view.role_name}
                  </span>
                </div>

                <div
                  className="d-flex justify-content-center align-items-center border rounded-circle"
                  style={{
                    height: "35px",
                    width: "35px",
                    cursor: "pointer",
                    backgroundColor: showDots === index ? "#E7F1FF" : "white",
                    position: "relative",
                  }}
                  onClick={(e) => handleShowDots(e, index)}
                >
                  <PiDotsThreeOutlineVerticalFill
                    style={{ height: "20px", width: "20px" }}
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
                          onClick={() => handleEditForm(view)}
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
                              fontFamily: "Gilroy",
                              color: "#1E45E1",
                            }}
                          >
                            Edit
                          </span>
                        </div>

                        <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

                        <div
                          className="d-flex gap-2 align-items-center"
                          onClick={() => handleDeleteForm(view)}
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
                              fontFamily: "Gilroy",
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
              </div>
            </div>
          ))
        ) : (
          !loading && (
           


          <div
            style={{
              textAlign: "center",
              marginTop: 90,
              height: '35vh',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={EmptyState} alt="emptystate" />
            <div
              className="pb-1"
              style={{
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: 18,
                color: "rgba(75, 75, 75, 1)",
              }}
            >
             No Role Available
            </div>
          
          </div>
          )
        )}
      </div>




      {
        roleList.length >= 10 &&
        <nav
          className='position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center' style={{ backgroundColor: "white" }}

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


            <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
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
        showRole && <AddRole showRole={showRole} addRole={addRole} hostelid={hostelid} editRoleDetails={editRoleDetails} setShowRole={setShowRole} />
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
export default SettingNewRole;