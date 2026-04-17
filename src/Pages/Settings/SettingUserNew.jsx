/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
// import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import AddUser from "../../Pages/UserFile/AddUser";
import { toast } from 'react-toastify';
import "../../Pages/Settings/SettingUsers.css";
import PaginationList from "../../Components/PaginationList";
import { useHasPermission } from '../../Utils/Permission';
import ErrorMessage from '../../Components/ErrorMessage';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import DeleteStaff from "./DeleteStaff";
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";

function SettingNewUser() {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [usersFilterddata, setUsersFilterddata] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [showDots, setShowDots] = useState(null);
  const [editDetails, setEditDetails] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [edit, setEdit] = useState(false);
  const [showAbove, setShowAbove] = useState(false);


  // const canReadUser = useHasPermission("User", "canRead")
  // const canWriteUser = useHasPermission("User", "canWrite");
  // const canUpdateUser = useHasPermission("User", "canUpdate");
  // const canDeleteUser = useHasPermission("User", "canDelete");

  const {
    canWriteModule: canWriteUser,
    canReadModule: canReadUser,
    canUpdateModule: canUpdateUser,
    canDeleteModule: canDeleteUser,
  } = useHasPermission("User");



  useEffect(() => {
    if (!canReadUser) {
      setLoading(false);
    }
  }, [canReadUser]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
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


  const handleOpenAddUser = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding User information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setAddUserForm(true);
    setEdit(false);
  };

  const handleCloseAddUser = () => {
    setAddUserForm(false);
    setEdit(false);
  };

  const handleEditForm = (item) => {
    setAddUserForm(true);
    setEditDetails(item);
    setEdit(true);
  };

  const handleDeleteForm = (item) => {
    setDeleteId(item.userId);
    setIsConfirmDelete(true);
  };

  const handleClose = () => {
    setIsConfirmDelete(false);
  };

  // const handleDelete = () => {
  //   if (deleteId) {
  //     dispatch({ type: "DELETEUSER", payload: { userId: deleteId, hostelId: state.login.selectedHostel_Id } });
  //   }
  // };

  const [hostel_Id, setHostel_Id] = useState("")


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state?.login?.selectedHostel_Id]);




  useEffect(() => {
    if (hostel_Id) {
      setLoading(true);
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: hostel_Id } });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

  }, [hostel_Id]);

  useEffect(() => {
    if (state.InvoiceList?.deleteUserSuccessStatusCode === 200) {
      setIsConfirmDelete(false);
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: hostel_Id } });
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

  useEffect(() => {
    if (state.Settings?.StatusForaddSettingStaffList === 200) {
      // dispatch({type: "GETUSERSTAFF"});
      setUsersFilterddata(state.Settings?.addSettingStaffList);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_USER_STAFF_LIST" });
      }, 200);
    }
  }, [state.Settings?.StatusForaddSettingStaffList]);


  useEffect(() => {
    if (state.Settings?.addSettingStaffList) {
      setLoading(false);
    }

  }, [state.Settings?.addSettingStaffList])


  useEffect(() => {
    if (state.Settings?.StatusForNoStaffList === 204) {
      setUsersFilterddata([]);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_STAFF_LIST_ERROR" });
      }, 200);
    }
  }, [state.Settings?.StatusForNoStaffList]);


  useEffect(() => {
    if (state.Settings?.errorUser) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ERROR_USER" });
      }, 100);
    }
  }, [state.Settings?.errorUser]);



  


const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10
  );

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

  const paginatedData = usersFilterddata?.slice(startIndex, endIndex);

  return (
    <div >
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Staff
          </label>
        </div>


        <div className="w-full flex justify-center md:justify-end">

 <div className='flex items-center gap-2'>
            <div className="">
                <PaginationList
                  totalItems={usersFilterddata?.length}
                  itemsPerPage={pageSize}
                  currentPage={page}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => setPageSize(size)}
                />
              </div>

          <button
            disabled={!canWriteUser}
            onClick={handleOpenAddUser}
            className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${canWriteUser
                ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            + Staff
          </button>
           </div>
        </div>
      </div>

      {loading && (
        <div className="fixed top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex items-center justify-center bg-transparent z-[1050]">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
        </div>
      )}
      {
        !canReadUser ? (
          <div className="flex flex-col items-center justify-center h-[80vh] mt-24">
            <img src={Emptystate} alt="Empty State" />
            <ErrorMessage message={['You do not have access to view User']} type="warning" />

          </div>
        )
          :
          (
            <div className="mt-2">
              {usersFilterddata?.length > 0 ? (
                <div className="ml-2"
                >
                  <div className={`show-scrolls overflow-auto overflow-x-hidden border-t border-gray-200 mx-2 font-gilroy ${usersFilterddata?.length >= 5 ? "h-[450px]" : "h-auto"
                    }`}
                  >
                    <Table
                      responsive="md"
                      className="font-gilroy text-[#222222] sticky top-0 z-1"
                    >
                      <thead className="font-gilroy bg-blue-100 sticky top-0 z-10 font-medium text-sm text-black sticky top-0 z-1"
                      >
                        <tr>
                          <th className="whitespace-nowrap">Staff Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Roles</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-black font-gilroy">
                     
                          {paginatedData?.map((item, index) => {
                            return (
                              <tr className="border-b border-gray-200">

                                <td
                                  title={`${item?.fullName}`}
                                  className="text-sm font-medium text-gray-800 max-w-[120px] truncate whitespace-nowrap overflow-hidden"
                                >
                                  {item?.fullName}
                                </td>

                                <td
                                  title={item?.mailId}
                                  className="text-sm text-gray-700 max-w-[220px] truncate whitespace-nowrap overflow-hidden"
                                >
                                  {item?.mailId}
                                </td>

                                <td className="text-sm text-gray-700 truncate">
                                  +{item?.countryCode} {item?.mobileNo}
                                </td>

                                <td className=" text-sm text-gray-700 truncate">
                                  {item?.roleName}
                                </td>

                                <td className="border-b border-gray-200 p-0 text-left align-middle">
                                  <div
                                    className="relative flex items-center cursor-pointer pl-2"
                                    onClick={(e) => handleDotsClick(index, e)}
                                  >
                                    <PiDotsThreeOutlineVerticalFill
                                      className={`h-[20px] w-[20px] rotate-90 cursor-pointer ${showDots === index ? "text-[#1E45E1]" : "text-gray-500"
                                        }`}
                                    />

                                    {showDots === index && (
                                      <div
                                        ref={popupRef}
                                        className="fixed z-[1000] w-[140px] rounded-lg border border-gray-200 bg-white "
                                        style={{
                                          top: showAbove
                                            ? popupPosition.top -
                                            (popupRef.current?.offsetHeight || 100) -
                                            20
                                            : popupPosition.top - 35,
                                          left: popupPosition.left,
                                        }}
                                      >
                                        <div>
                                          <div
                                            onClick={() => canUpdateUser && handleEditForm(item)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-t-lg transition ${canUpdateUser
                                              ? "cursor-pointer hover:bg-[#F0F4FF]"
                                              : "cursor-not-allowed opacity-50"
                                              }`}
                                          >
                                            <img
                                              src={Edit}
                                              width={16}
                                              height={16}
                                              alt="Edit"
                                              className={canUpdateUser ? "" : "grayscale"}
                                            />
                                            <span
                                              className={`text-sm font-medium font-gilroy ${canUpdateUser ? "text-[#1E45E1]" : "text-gray-400"
                                                }`}
                                            >
                                              Edit
                                            </span>
                                          </div>

                                          <div className="h-px bg-gray-100" />

                                          <div
                                            onClick={() => canDeleteUser && handleDeleteForm(item)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-b-lg transition ${canDeleteUser
                                              ? "cursor-pointer hover:bg-[#FFF3F3]"
                                              : "cursor-not-allowed opacity-50"
                                              }`}
                                          >
                                            <img
                                              src={Delete}
                                              width={16}
                                              height={16}
                                              alt="Delete"
                                              className={canDeleteUser ? "" : "grayscale"}
                                            />
                                            <span
                                              className={`text-sm font-medium font-gilroy ${canDeleteUser ? "text-red-500" : "text-gray-400"
                                                }`}
                                            >
                                              Delete
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                       
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                !loading && (
                  <div className="flex items-center justify-center w-full lg:mt-[140px] md:mt-[90px] 2xl:mt-52 animated-text">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <img src={emptyimg} alt="Empty state" />
                      </div>

                      <div className="pb-1 mt-1 text-center font-gilroy font-semibold text-lg text-gray-700">
                        No Staff 
                      </div>

                      <div className="text-center font-gilroy font-medium text-sm text-gray-700">
                        There are no staff's available
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )
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
  );
}
export default withErrorBoundary(SettingNewUser);
