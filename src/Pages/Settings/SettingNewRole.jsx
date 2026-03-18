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
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";

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
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
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


      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Role
          </label>
        </div>


        <div className="w-full flex justify-center md:justify-end">
          <button
            onClick={handleAddRole}
            disabled={!canWriteRole}
            className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${canWriteRole
                ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            +  Role
          </button>
        </div>
      </div>

      {
        !canReadRole ? (

          <div className="flex flex-col items-center justify-center h-[80vh] mt-24">
            <img src={Emptystate} alt="Empty State" />
            <ErrorMessage message={['You do not have access to view Role']} type="warning" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-2 mt-2 mb-3 !max-h-[475px] overflow-auto">
            {roleList.length > 0 ? (
              roleList.map((view, index) => (
                <div key={index} className="border rounded flex items-center justify-between p-3 h-16 w-full bg-white">
                  <div className="flex items-center">
                    <img src={role} width={24} height={24} alt="Role Icon" />
                    <span className="ml-3 !text-base !font-medium !font-gilroy text-gray-900 truncate">
                      {view.name}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-center border rounded-full !h-[35px] !w-[35px] cursor-pointer relative"
                    onClick={(e) => handleShowDots(e, index)}
                  >
                    <PiDotsThreeOutlineVerticalFill className="!h-5 !w-5 rotate-90 text-gray-500" />
                    {showDots === index && view.editable && (
                      <div
                        ref={popupRef}
                        className="pg-card !bg-white !fixed !border !border-gray-200 !rounded-lg !shadow-md !w-[140px] !z-[1000]"
                        style={{
                          top: popupPosition.top,
                          left: popupPosition.left,
                        }}
                      >
                        <div
                          className={`flex items-center gap-2 px-3 py-2 w-full transition-colors ${view.editable && canUpdateRole
                            ? 'cursor-pointer hover:bg-blue-50 opacity-100'
                            : 'cursor-not-allowed opacity-50'
                            }`}
                          onClick={() => {
                            if (view.editable && canUpdateRole) handleEditForm(view);
                          }}
                        >
                          <img
                            src={Edit}
                            width={16}
                            height={16}
                            alt="Edit"
                            className={view.editable && canUpdateRole ? '' : 'filter grayscale'}
                          />
                          <span
                            className={`!text-sm !font-medium !font-gilroy ${view.editable && canUpdateRole ? 'text-blue-700' : 'text-gray-400'
                              }`}
                          >
                            Edit
                          </span>
                        </div>

                        <div className="h-px !bg-gray-200 m-0" />

                        <div
                          className={`flex items-center gap-2 px-3 py-2 w-full transition-colors ${view.editable && canDeleteRole
                            ? 'cursor-pointer hover:bg-blue-50 opacity-100'
                            : 'cursor-not-allowed opacity-50'
                            }`}
                          onClick={() =>
                            view.editable && canDeleteRole && handleDeleteForm(view)
                          }
                        >
                          <img
                            src={Delete}
                            width={16}
                            height={16}
                            alt="Delete"
                            className={view.editable && canDeleteRole ? '' : 'filter grayscale'}
                          />
                          <span
                            className={`!text-sm !font-medium !font-gilroy ${view.editable && canDeleteRole ? 'text-red-600' : 'text-gray-400'
                              }`}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !loading && (
                <div className="flex items-center justify-center w-full mt-24 2xl:mt-52 2xl:ml-80 ml-64">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <img src={EmptyState} alt="Empty state" />
                    </div>

                    <div className="text-center font-semibold font-gilroy text-lg text-[#4B4B4B]">
                      No Roles
                    </div>

                    <div className="text-center font-medium font-gilroy text-sm text-[#4B4B4B]">
                      There are no Roles available
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )
      }

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="w-10 h-10 border-t-4 border-blue-700 border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

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

          <Modal.Header className="border-0">
            <Modal.Title className="w-full text-center mt-2 !text-lg font-gilroy !font-semibold text-[#222222]">
              Delete Role?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center text-[14px] font-gilroy font-medium text-[#646464] -mt-7">
            Are you sure you want to delete this Role?
          </Modal.Body>

          <Modal.Footer className="flex justify-center border-0 -mt-2 gap-1">
            <Button
              className="!w-full !max-w-[160px] !h-[52px] !rounded-lg !px-5 !py-3 bg-white !text-[#1E45E1] !border !border-[#1E45E1] !font-gilroy !font-semibold !text-[14px]"
              onClick={handleCloseDeleteForm}
            >
              Cancel
            </Button>
            <Button
              className="!w-full !max-w-[160px] !h-[52px] !rounded-lg !px-5 !py-3 !bg-[#1E45E1] !text-white !font-gilroy !font-semibold! text-[14px]"
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