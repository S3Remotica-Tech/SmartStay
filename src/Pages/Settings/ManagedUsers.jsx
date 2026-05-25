/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Shield } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useHasPermission } from "../../Utils/Permission";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import AddUser from "../../Pages/UserFile/AddUser";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import DeleteStaff from "./DeleteStaff";
import NoDataMessage from "../../Utils/NoDataMessage";

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

  const { canUpdateModule: canUpdateUser, canDeleteModule: canDeleteUser } =
    useHasPermission("User");

  const ellipsisStyle = {
    maxWidth: 160,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "GETUSERSTAFF",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  const handleDotsClick = (index, event) => {
    event.stopPropagation();
    setShowDots((prev) => (prev === index ? null : index));

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
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
    setShowDots(null);
    setAddUserForm(true);
    setEditDetails(item);
    setEdit(true);
  };

  const handleCloseAddUser = () => {
    setAddUserForm(false);
    setEdit(false);
  };

  const handleDeleteForm = (item) => {
    setShowDots(null);
    setDeleteId(item.userId);
    setIsConfirmDelete(true);
  };

  const handleClose = () => {
    setIsConfirmDelete(false);
  };

  useEffect(() => {
    if (state.InvoiceList?.deleteUserSuccessStatusCode === 200) {
      setIsConfirmDelete(false);
      dispatch({
        type: "GETUSERSTAFF",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
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
    <div className="w-full  ">
      {state.Settings?.addSettingStaffList?.length > 0 && (
        <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
          <div
            id="tableContainer"
            // ref={tableContainerRef}
            className="overflow-auto relative  h-[400px]  rounded-xl show-scrolls"
          >
            <table className="w-full font-gilroy">
              <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                <tr className="">
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold whitespace-nowrap">
                    USER NAME
                  </th>
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold whitespace-nowrap">
                    ROLE ASSIGN
                  </th>
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold">
                    MAIL ID
                  </th>
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold">
                    MOBILE NO
                  </th>
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold">
                    DESCRIPTION
                  </th>
                  <th className="px-3 py-2.5 text-[#6B7280] text-[12px] font-semibold">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {state.Settings?.addSettingStaffList.length > 0 &&
                  state.Settings?.addSettingStaffList?.map((user, index) => (
                    <tr key={index}>
                      <td
                        className="px-3 py-2.5 truncate text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px]"
                        title={`${user?.firstName} ${user?.lastName}`}
                      >
                        {user?.firstName} {user?.lastName}
                      </td>

                      <td className="px-3 py-2.5 flex items-center whitespace-nowrap">
                        <span className="inline-flex items-center bg-[#FFF7ED] text-[#FF9900] px-2 py-1 rounded-md text-[13px] font-medium flex-shrink-0 ">
                          <Shield size={14} color="#FF9900" />
                        </span>
                        <span
                          className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] ml-2 truncate inline-block align-middle max-w-[140px]"
                          title={user.roleName}
                        >
                          {user.roleName}
                        </span>
                      </td>
                      <td
                        className="px-3 py-2.5 text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] truncate font-normal"
                        title={user.mailId}
                      >
                        {user.mailId}
                      </td>

                      <td
                        className="px-3 py-2.5 text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] truncate font-normal"
                        title={user.mobileNo}
                      >
                        + {user?.countryCode} {user?.mobileNo}
                      </td>

                      <td
                        className="px-3 py-2.5 text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] truncate font-normal text-[#4B4B4B]"
                        title={user.description}
                      >
                        {user.description || "-"}
                      </td>

                      <td className="text-center">
                        <PiDotsThreeOutlineVerticalFill
                          className="cursor-pointer"
                          size={20}
                          onClick={(e) => handleDotsClick(index, e)}
                        />

                        {showDots === index && (
                          <div
                            ref={popupRef}
                            className="bg-white border border-gray-300 rounded-[10px] shadow-md w-[140px] z-[1000] fixed"
                            style={{
                              top: showAbove
                                ? popupPosition.top -
                                  (popupRef.current?.offsetHeight || 100) -
                                  20
                                : popupPosition.top - 5,
                              left: popupPosition.left + 44,
                            }}
                          >
                            <div>
                              <div
                                onClick={() =>
                                  canUpdateUser && handleEditForm(user)
                                }
                                className={`flex items-center gap-2 w-full px-3 py-2 transition-colors duration-200 ease-in-out rounded-t-[10px] ${canUpdateUser ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#F0F4FF")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                <img
                                  src={Edit}
                                  width={16}
                                  height={16}
                                  alt="Edit"
                                  style={{
                                    filter: canUpdateUser
                                      ? "none"
                                      : "grayscale(100%)",
                                  }}
                                />
                                <span
                                  className={`text-[14px] font-medium font-gilroy ${canUpdateUser ? "cursor-pointer text-[#1E45E1]" : "cursor-not-allowed text-[#A0A0A0]"}`}
                                >
                                  Edit
                                </span>
                              </div>

                              <div className="h-px bg-gray-200 m-0" />
                              <div
                                onClick={() =>
                                  canDeleteUser && handleDeleteForm(user)
                                }
                                className={`flex items-center gap-2 w-full px-3 py-2 transition-colors duration-200 ease-in-out rounded-b-[10px] ${canDeleteUser ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#FFF3F3")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                <img
                                  src={Delete}
                                  width={16}
                                  height={16}
                                  alt="Delete"
                                  style={{
                                    filter: canDeleteUser
                                      ? "none"
                                      : "grayscale(100%)",
                                  }}
                                />
                                <span
                                  className={`text-[14px] font-medium font-gilroy ${canDeleteUser ? "text-red-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
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
            </table>
          </div>
        </div>
      )}

      {state.Settings?.addSettingStaffList?.length === 0 && (
        <NoDataMessage label="Staff" isHeightChanged={true} />
      )}

      {isConfirmDelete && (
        <DeleteStaff
          show={isConfirmDelete}
          handleClose={handleClose}
          deleteId={deleteId}
        />
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

export default ManagedUsers;
