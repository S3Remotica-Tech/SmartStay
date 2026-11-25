/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import AddRole from "../../../Pages/Settings/RoleFile/AddRole";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHasPermission } from "../../../Utils/Permission";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import { IoMdMore } from "react-icons/io";
import { AddCircle, Profile2User, Shield } from "iconsax-react";
import PaginationList from "../../../Components/PaginationList";
import PermissionDeniedMessage from "../../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../../Utils/NoDataMessage";


// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function SettingNewRole() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [showRole, setShowRole] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [showDots, setShowDots] = useState(null);
  const [deleteRole, setDeleteRole] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [editRoleDetails, setEditRoleDetails] = useState("");
  const [addRole, setAddRole] = useState(false);

  const [loading, setLoading] = useState(false);


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

  const modulesCalledRef = useRef(false);

  useEffect(() => {
    if (modulesCalledRef.current) return;

    modulesCalledRef.current = true;

    dispatch({ type: "GETMODULES" });
  }, []);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);
  useEffect(() => {
    if (roleList.length === 0) {
      setLoading(false);
    }
  }, [roleList]);

  const handleAddRole = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding Role information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setShowRole(true);
    setAddRole(true);

    setEditRoleDetails("");
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event, index) => {
    setShowDots((prev) => (prev === index ? null : index));
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleDeleteForm = (view) => {
    setDeleteRole(true);
    setDeletedId(view.id);
  };

  const handleCloseDeleteForm = () => {
    setDeleteRole(false);
  };

  useEffect(() => {
    if (state.Settings?.assignedUserRoleStatusCode === 400) {
      setDeleteRole(false);
      setDeleteLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ASSIGNED_ERROR" });
      });
    }
  }, [state.Settings?.assignedUserRoleStatusCode]);

  const handleDeleteRole = () => {
    if (deletedId) {
      dispatch({
        type: "DELETESETTINGROLEPERMISSION",
        payload: { id: deletedId },
      });
      setDeleteLoading(true);
    }
  };

  const previousHostelIdRef = useRef(null);

  useEffect(() => {
    const hostelId = state?.login?.selectedHostel_Id;
    if (!hostelId || previousHostelIdRef.current === hostelId) return;
    previousHostelIdRef.current = hostelId;
    setLoading(true);
    dispatch({
      type: "SETTING_ROLE_LIST",
      payload: hostelId,
    });
  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.Settings.statusCodeForRoleList === 200) {
      setRoleList(state.Settings.getsettingRoleList);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ROLE_LIST" });
      }, 2000);
    }
  }, [state.Settings.statusCodeForRoleList]);

  useEffect(() => {
    if (state.Settings.errorRole) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ERROR_ROLE" });
      }, 200);
    }
  }, [state.Settings.errorRole]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  const handleEditForm = (view) => {
    setShowRole(true);
    setAddRole(false);
    setEditRoleDetails(view);
    setShowDots(false);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = roleList.slice(startIndex, endIndex);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      state.Settings.statusCodeForAddRole === 201 &&
      state.login.selectedHostel_Id
    ) {
      setShowRole(false);

      dispatch({
        type: "SETTING_ROLE_LIST",
        payload: state.login.selectedHostel_Id,
      });

      const timeout = setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [state.Settings.statusCodeForAddRole, state.login.selectedHostel_Id]);



  useEffect(() => {
    if (
      state.Settings.StatusForDeletePermission === 204 &&
      state.login.selectedHostel_Id
    ) {
      setDeleteRole(false);
      dispatch({
        type: "SETTING_ROLE_LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
      }, 100);
    }
  }, [state.Settings.StatusForDeletePermission]);

  useEffect(() => {
    if (
      state.Settings.StatusForEditPermission === 200 &&
      state.login.selectedHostel_Id
    ) {
      setShowRole(false);
      dispatch({
        type: "SETTING_ROLE_LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_SETTING_ROLE" });
        dispatch({ type: "CLEAR_EDIT_PERMISSION" });
      }, 100);
    }
  }, [state.Settings.StatusForEditPermission]);

  return (
    <div className="flex flex-col bg-[#F9FAFF] font-gilroy relative ">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="w-10 h-10 border-t-4 border-blue-700 border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[60px] whitespace-nowrap">
        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Roles
          </label>
        </div>

        <div className="w-full flex justify-center md:justify-end items-center">
          <div className="flex items-center gap-2">
            <div className="">
              <PaginationList
                totalItems={roleList?.length}
                itemsPerPage={pageSize}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(size) => setPageSize(size)}
              />
            </div>

            <button
              onClick={handleAddRole}
              disabled={!canWriteRole}
              className={`h-[38px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition flex justify-center items-center gap-1
        ${canWriteRole
                  ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <AddCircle color="#FFFFFF" size="16" /> Create Role
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {!canReadRole ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : paginatedData.length > 0 ? (
          <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
            <div
              id="tableContainer"
              // ref={tableContainerRef}
              className="overflow-auto relative max-h-[calc(100vh-140px)] show-scrolls"
            >
              <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                <thead className="sticky top-0 z-40">
                  <tr>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>Role Name</th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>Description</th>
                    <th className={`${TABLE_HEADER_CELL} text-center`}>Users</th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>Created</th>
                    <th className={`${TABLE_HEADER_CELL} text-center sticky right-0 z-[2] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((view, index) => (
                    <tr key={index}>
                      <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center bg-[#FFF7ED] text-[#FF9900] px-2 py-1 rounded-md text-[13px] font-medium flex-shrink-0">
                            <Shield size={14} color="#FF9900" />
                          </span>

                          <span className="font-semibold text-[#111928] text-[14px]">
                            {view.name}
                          </span>
                        </div>
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                        {view.description || "-"}
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-center`}>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#111928]">
                          <Profile2User size={14} color="#62748E" />
                          {view.userCount || 0}
                        </span>
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                        {view.createdAt || "-"}
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-center sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928]`}>
                        <div
                          className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] cursor-pointer ${showDots === index
                            ? "border-[#1E45E1] bg-[#EFF6FF]"
                            : "border-[#E2E8F0] bg-white hover:bg-[#F1F5FF]"
                            }`}
                          onClick={(e) => handleShowDots(e, index)}
                        >
                          <IoMdMore className={`text-lg pointer-events-none ${showDots === index ? "text-[#1E45E1]" : "text-[#4A5565]"}`} />
                        </div>

                        {showDots === index && view.editable && (
                          createPortal(
                          <div
                            ref={popupRef}
                            className="font-gilroy fixed bg-white border border-gray-200 rounded-lg shadow-md px-2 py-2 w-[140px] z-[1000]"
                            style={{
                              top: popupPosition.top,
                              left: popupPosition.left,
                            }}
                          >
                            <div
                              className={`flex items-center gap-2 px-3 py-2 rounded ${view.editable && canUpdateRole
                                ? "cursor-pointer hover:bg-blue-50"
                                : "opacity-50 cursor-not-allowed"
                                }`}
                              onClick={() => {
                                if (view.editable && canUpdateRole)
                                  handleEditForm(view);
                              }}
                            >
                              <i className="isax isax-edit text-blue-600"></i>
                              <span className="text-sm font-medium text-blue-700">
                                Edit
                              </span>
                            </div>

                            <div
                              className={`flex items-center gap-2 px-3 py-2  rounded ${view.editable && canDeleteRole
                                ? "cursor-pointer hover:bg-blue-50"
                                : "opacity-50 cursor-not-allowed"
                                }`}
                              onClick={() =>
                                view.editable &&
                                canDeleteRole &&
                                handleDeleteForm(view)
                              }
                            >
                              <i className="isax isax-trash text-red-600"></i>
                              <span className="text-sm font-medium text-red-600">
                                Delete
                              </span>
                            </div>
                          </div>,
                          document.body,
                        )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !loading && <NoDataMessage label="Role" />
        )}
      </div>

      {showRole && (
        <AddRole
          showRole={showRole}
          addRole={addRole}
          hostelid={state.login.selectedHostel_Id}
          editRoleDetails={editRoleDetails}
          setShowRole={setShowRole}
        />
      )}

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
              disabled={deleteLoading}
              onClick={handleDeleteRole}
              className={`
    !w-full 
    !max-w-[160px] 
    !h-[52px] 
    !rounded-lg 
    !px-5 
    !py-3 
    !bg-[#1E45E1] 
    !text-white 
    !font-gilroy 
    !font-semibold 
    !text-[14px]
    !flex 
    !items-center 
    !justify-center 
    !gap-2
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
            >
              {deleteLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
SettingNewRole.propTypes = {
  hostelid: PropTypes.func.isRequired,
};
export default withErrorBoundary(SettingNewRole);
