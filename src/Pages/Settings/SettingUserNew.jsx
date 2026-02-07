/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
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

  

  const sortedData = React.useMemo(() => {
    return Array.isArray(usersFilterddata) ? usersFilterddata : [];
  }, [usersFilterddata]);




  return (
    <div >
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Staff
          </label>
        </div>


        <div className="w-full flex justify-center md:justify-end">
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




      {loading && (
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
              borderTop: "4px solid #1E45E1",
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
      {
        !canReadUser ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh"
            }}
          >
<img src={Emptystate} alt="Empty State"/>
            <ErrorMessage message={['You do not have access to view User']} type="warning" />

          </div>
        )
          :
          (
            <div className="mt-2">
              {sortedData?.length > 0 ? (
                <div
                  className="me-2"
                  style={{}}
                >
                  <div
                    className="show-scrolls"
                    style={{
                      height:
                        sortedData?.length >= 5 || sortedData?.length >= 5
                          ? "450px"
                          : "auto",
                      overflow: "auto",
                      overflowX: 'hidden',
                      borderTop: "1px solid #E8E8E8",
                      // marginBottom: 20,
                      // marginTop: "20px",
                      paddingRight: 0,
                      paddingLeft: 0,
                    }}
                  >
                    <Table
                      responsive="md"
                      style={{
                        fontFamily: "Gilroy",
                        color: "rgba(34, 34, 34, 1)",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: 500,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        borderRadius: 0,
                      }}
                    >
                      <thead
                        style={{
                          fontFamily: "Gilroy",
                          backgroundColor: "rgba(231, 241, 255, 1)",
                          color: "rgba(34, 34, 34, 1)",
                          fontSize: 14,
                          fontStyle: "normal",
                          fontWeight: 500,
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        <tr>
                          <th
                            style={{
                              color: "rgb(147, 147, 147)",
                              fontWeight: 500,
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              textAlign: "start",
                              padding: "10px",
                              paddingLeft: "25px",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <ArrowUp2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("first_name", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("first_name", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div> */}
                              Staff Name
                            </div>
                          </th>
                          <th
                            style={{
                              color: "rgb(147, 147, 147)",
                              fontWeight: 500,
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              padding: "10px",
                              textAlign: "start",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <ArrowUp2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("email_Id", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("email_Id", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div> */}
                              Email
                            </div>
                          </th>
                          <th
                            style={{
                              color: "rgb(147, 147, 147)",
                              fontWeight: 500,
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              padding: "10px",
                              textAlign: "start",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <ArrowUp2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("mobileNo", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("mobileNo", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div> */}
                              Mobile No
                            </div>
                          </th>
                          <th
                            style={{
                              color: "rgb(147, 147, 147)",
                              fontWeight: 500,
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              padding: "10px",
                              textAlign: "start",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <ArrowUp2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("role_name", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("role_name", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div> */}
                              Roles
                            </div>
                          </th>
                          <th
                            style={{
                              color: "rgb(147, 147, 147)",
                              fontWeight: 500,
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              padding: "10px",
                              textAlign: "center",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <PaginationList display={true}>
                          {sortedData?.map((item, index) => {
                            return (
                              <tr key={index} style={{ overflowX: "auto" }}>
                                <td
                                  title={item.firstName}
                                  style={{
                                    border: "none",
                                    // padding: "10px",
                                    textAlign: "start",
                                    // paddingTop: 18,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    // paddingLeft: "20px",
                                    borderBottom: "1px solid #E8E8E8",
                                  }}
                                  className=""
                                >
                                  <span
                                    className="Customer_Name_Hover ps-3"
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      cursor: "pointer",
                                      marginTop: 10,
                                    }}
                                  >
                                    {item?.firstName} {""} {item?.lastName}
                                  </span>
                                </td>
                                <td
                                  title={item?.mailId}
                                  style={{
                                    fontWeight: 500,
                                    fontSize: "13px",
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                    // paddingTop: 17,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    borderBottom: "1px solid #E8E8E8",
                                  }}
                                  className=""
                                >
                                  <div className="">
                                    {item?.mailId}
                                  </div>

                                </td>

                                <td
                                  title={item?.mobileNo}
                                  style={{
                                    // paddingTop: 17,
                                    border: "none",
                                    textAlign: "start",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    marginTop: 10,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderBottom: "1px solid #E8E8E8",
                                  }}
                                  className=""
                                >
                                  + {item?.countryCode}
                                  {item &&
                                    String(item?.mobileNo)?.slice(
                                      0,
                                      String(item?.mobileNo).length - 10
                                    )}{" "}
                                  {item && String(item?.mobileNo)?.slice(-10)}
                                </td>

                                <td
                                  title={item?.role_name}
                                  style={{
                                    fontWeight: 500,
                                    fontSize: "13px",
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                    // paddingTop: 17,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    borderBottom: "1px solid #E8E8E8",
                                  }}
                                  className=""
                                >
                                  {item?.roleName}
                                </td>
                                <td
                                  style={{
                                    // textAlign: "center",
                                    // display: "flex",
                                    // // paddingTop: 17,
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                    borderBottom: "1px solid #E8E8E8",
                                  }}
                                >
                                  <div
                                    style={{
                                      // height: "35px",
                                      // width: "35px",
                                      // borderRadius: "50%",
                                      // border: "1px solid #EFEFEF",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      cursor: "pointer",
                                      // backgroundColor:
                                      //   showDots === index ? "#E7F1FF" : "white",
                                    }}
                                    onClick={(e) => handleDotsClick(index, e)}
                                  >
                                    <PiDotsThreeOutlineVerticalFill
                                      style={{
                                        height: "18px",
                                        width: "18px",
                                        cursor: "pointer",
                                        transform: "rotate(90deg)",
                                        color: showDots === index ? "#1E45E1" : "#6B7280"

                                      }}
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
                                            onClick={() => canUpdateUser && handleEditForm(item)}
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
                                            onClick={() => canDeleteUser && handleDeleteForm(item)}
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
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </PaginationList>
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                !loading && (


                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "100%",
                      margin: "0px auto",
                      backgroundColor: "",
                      marginTop: 110,
                      justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div>
                      <div className="d-flex  justify-content-center">
                        <img
                          src={emptyimg}

                          alt="Empty state"
                        />
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
                        {"There are no staff's available"} {" "}
                      </div>

                    </div>
                    <div></div>
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
