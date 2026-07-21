/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
// import { MdError } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircle, Tag2, SearchNormal, Filter, ArrowDown, ArrowUp } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage';
import './AssignAmenities.css';
import { RiShareForwardFill } from "react-icons/ri";
import { IoArrowUndoSharp } from "react-icons/io5";

function AssignAmenities({ show, handleClose, assignAmenitiesDetails }) {

  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const [unAssignedList, setUnassignedList] = useState([])
  const [AssignedList, setAssignedList] = useState([])
  const [unAssignedCheckedUsers, setUnassignedCheckedUsers] = useState([]);
  const [assignedCheckedUsers, setAssignedCheckedUsers] = useState([]);
  const [errorAssign, setErrorAssign] = useState('')
  const [errorUnAssign, setUnErrorAssign] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [selectAll, setSelectAll] = useState(false);
  const [assignedSelectAll, setAssignedSelectAll] = useState(false);


  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    const [day, month, year] = dateStr.split("/");
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-GB");
  };


  useEffect(() => {
    dispatch({
      type: 'GET_PARTICULAR_AMENITIES',
      payload: {
        hostelId: state.login.selectedHostel_Id,
        amenityId: assignAmenitiesDetails.amenityId,
      },
    });
  }, [])





  useEffect(() => {
    if (state.InvoiceList.getAssignAmenitiesSuccessStatusCode === 200) {
      setSelectAll(false);
      setAssignedSelectAll(false)
      setAssignedList(state?.InvoiceList?.GetAssignAmenitiesList || [])
      setUnassignedList(state?.InvoiceList?.GetUnAssignAmenitiesList || [])

    }

    setTimeout(() => {
      dispatch({ type: 'REMOVE_GET_ASSIGN_AMENITIES_STATUS_CODE' })
    }, 500)


  }, [state.InvoiceList.getAssignAmenitiesSuccessStatusCode])


  const handleGlobalSelectAll = () => {
    if (selectAll) {
      setAssignedCheckedUsers([]);
      setSelectAll(false);
    } else {

      const selectableUsers = unAssignedList
        .filter(item => item.canAssign === true)
        .map(item => item.customerId);

      setAssignedCheckedUsers(selectableUsers);
      setSelectAll(true);
    }
  };


  const handleAssignedGlobalSelectAll = () => {
    if (assignedSelectAll) {
      setUnassignedCheckedUsers([]);
      setAssignedSelectAll(false);
    } else {
      const ids = AssignedList.map(item => item.customerId);

      setUnassignedCheckedUsers(ids);
      setAssignedSelectAll(true);
    }
  };


  useEffect(() => {

    if (state.InvoiceList.assignAmenitiesSuccessStatusCode) {
      setFormLoading(false)
      dispatch({
        type: 'GET_PARTICULAR_AMENITIES',
        payload: {
          hostelId: state.login.selectedHostel_Id,
          amenityId: assignAmenitiesDetails.amenityId,
        },
      });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ASSIGN_AMENITIES_STATUS_CODE' })
      }, 100)


    }
    setAssignedCheckedUsers([])

  }, [state.InvoiceList?.assignAmenitiesSuccessStatusCode])


  useEffect(() => {

    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode === 200) {
      setFormLoading(false)
      dispatch({
        type: 'GET_PARTICULAR_AMENITIES',
        payload: {
          hostelId: state.login.selectedHostel_Id,
          amenityId: assignAmenitiesDetails.amenityId,
        },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE' })
      }, 100)


    }
    setUnassignedCheckedUsers([])

  }, [state.InvoiceList.UnAssignAmenitiesSuccessStatusCode])





  const handleUnassignedCheckboxChange = (user_id) => {
    setUnErrorAssign('')
    setUnassignedCheckedUsers((prev) => {
      let updated;

      if (prev.includes(user_id)) {
        updated = prev.filter((id) => id !== user_id);
      } else {
        updated = [...prev, user_id];
      }

      const totalAssignable = AssignedList
        .filter(item => item.canAssign)
        .map(item => item.customerId);

      setAssignedSelectAll(updated.length === totalAssignable.length);

      return updated;
    });
  };



  const handleAssignedCheckboxChange = (user_id) => {
    setErrorAssign('');

    setAssignedCheckedUsers((prevChecked) => {
      let updated;

      if (prevChecked.includes(user_id)) {
        updated = prevChecked.filter((id) => id !== user_id);
      } else {
        updated = [...prevChecked, user_id];
      }

      const allAssignableIds = unAssignedList
        .filter(item => item.canAssign === true)
        .map(item => item.customerId);

      setSelectAll(updated.length === allAssignableIds.length);

      return updated;
    });
  };



  const handleAssignUser = () => {
    setUnErrorAssign('')
    if (!assignedCheckedUsers || assignedCheckedUsers.length === 0) {
      setErrorAssign("Please Select at Least One User Before Assigning Amenities");
      return;
    }



    dispatch({
      type: 'ASSIGNAMENITIES',
      payload: {
        hostelId: state.login.selectedHostel_Id,
        amenityId: assignAmenitiesDetails.amenityId,
        customers: assignedCheckedUsers

      },
    })
    setFormLoading(true)

  }


  const handleUnAssignUser = () => {
    setErrorAssign('')
    if (!unAssignedCheckedUsers || unAssignedCheckedUsers.length === 0) {
      setUnErrorAssign("Please Select at Least One User Before Unassigning Amenities");
      return;
    }

    dispatch({
      type: 'UNASSIGNAMENITIES',
      payload: {
        hostelId: state.login.selectedHostel_Id,
        amenityId: assignAmenitiesDetails.amenityId,
        customers: unAssignedCheckedUsers

      },
    })
    setFormLoading(true)
  }


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  const ellipsisStyle = {
    maxWidth: "180px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
  };


  return (

    <Modal show={show} onHide={handleClose}
      centered backdrop="static"
      dialogClassName="responsive-modal-fix"
      className="!border-none"
    >
      <Modal.Dialog className="m-0 p-0 min-w-[850px] pr-2 rounded-[35px]">

        <Modal.Header className="border-2 border-gray-200">
          <Modal.Title className="w-full">
            <div className="flex items-center gap-3">
              <div className="bg-[#EFF2FF] p-2 rounded-lg flex items-center justify-center">
                <Tag2 size={32} color="#1E45E1" />
              </div>

              <div className="flex flex-col">
                <span
                  key={assignAmenitiesDetails?.amenityId}
                  className="font-gilroy font-semibold text-[16px] text-[#222] flex items-center"
                >
                  {assignAmenitiesDetails?.amenityName}
                </span>
                <span
                  key={assignAmenitiesDetails?.amenityId}
                  className="font-gilroy font-medium text-[14px] text-[#4B4B4B] flex items-center"
                >
                  ₹{assignAmenitiesDetails?.amenityAmount}/m
                </span>
              </div>
            </div>
          </Modal.Title>

          <CloseCircle
            size={24}
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>

        <Modal.Body className='border-0 pt-2'>
          {errorAssign && (
            <div className="mb-2 mt-0">
              <ErrorMessage message={errorAssign} type="error" />
            </div>

          )}

          {errorUnAssign && (
            <div className="mb-2 mt-0">
              <ErrorMessage message={errorUnAssign} type="error" />
            </div>
          )}

          {/* {state.createAccount?.networkError ?
                         <div className="d-flex justify-content-center mt-1 mb-1">
                          <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
                          : null}
             */}

          {/* <div className="row g-0">
            <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12">
              <Card style={{ border: "1px solid #E7E7E7", borderRadius: 10, cursor: "pointer" }} className='h-100 ' >


                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12, padding: 10
                }}>


                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    border: "1px solid #D6D6D6",
                    borderRadius: 30,
                    width: 260,
                    backgroundColor: "#fff"
                  }}>
                    <input
                      type="text"
                      placeholder="Search"
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        fontSize: 14,
                        color: "#333",
                        fontFamily: "Gilroy"
                      }}
                    />
                    <SearchNormal size={20} color="#6F6F6F" />
                  </div>


                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid #D6D6D6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}>
                    <Filter size={20} color="#4b4b4b" />
                  </div>

                </div>

                <Card.Header className='d-flex justify-content-between' style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500, border: "none" }} >
                  <div style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>
                    Unassigned
                  </div>

                  <div>
                    <Form.Check className='me-0 pe-0'
                      aria-label="option 1"
                      checked={selectAll}
                      onChange={handleGlobalSelectAll}
                      style={{
                        cursor: "pointer", boxShadow: "none", transform: "scale(1.2)",
                        transformOrigin: "center",
                      }}
                    />

                  </div>


                </Card.Header>
                <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scrolls m-1 pe-1 ps-2">
                  {unAssignedList.length > 0 && unAssignedList.map((list) => {
                    return (
                      <div key={list.customerId}>
                        <div className='d-flex justify-content-between mb-3'>
                          <div className='d-flex gap-3'>
                            <div>
                              {list?.profilePic &&
                                list?.profilePic !== "0" ? (
                                <Image
                                  src={list?.profilePic}
                                  roundedCircle
                                  style={{ height: 35, width: 35 }}
                                  alt="image"
                                />
                              ) : (
                                <div
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: "50%",
                                    backgroundColor: "#E2E8F0",
                                    color: "#44536A",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 14,
                                    fontWeight: "600",
                                    fontFamily: "Gilroy"
                                  }}
                                >
                                  {list?.initials || "-"}
                                </div>
                              )}
                            </div>

                            <div>

                              <div className='d-flex align-items-center justify-content-start gap-2 '>


                                <div>
                                  <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 600, ...ellipsisStyle }} title={list.customerName}>{list.customerName}</label>

                                </div>
                                <div>
                                  {
                                    list?.canAssign === false ?
                                      <ArrowDown className='mb-1'
                                        size="16"
                                        color="#FF0000"
                                      />
                                      :
                                      <ArrowUp className='mb-1'
                                        size="16"
                                        color="#1E45E1"
                                      />

                                  }
                                </div>
                              </div>
                              {
                                list?.canAssign === false ?

                                  <div>
                                    <label
                                      style={{
                                        fontSize: 14,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500, ...ellipsisStyle
                                      }}
                                    >
                                      {list?.mobile ? `${list.countryCode} ${list.mobile}` : "-"}
                                    </label>

                                  </div>
                                  :
                                  <div className='d-flex flex-wrap  gap-3'>
                                    <div style={{ backgroundColor: "#FFEFCF", borderRadius: 10, display: "flex", justifyContent: "center", width: "fit-content", padding: "2px 8px" }} >
                                      <label style={{ fontSize: 12, color: "#222222", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.floorName}>{list?.floorName || "N/A"}</label>

                                    </div>
                                    <div style={{ backgroundColor: "#F1F7FF", borderRadius: 10, display: "flex", justifyContent: "center", width: "fit-content", padding: "2px 8px", gap: 2 }} >
                                      <label style={{ fontSize: 12, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.roomName}>{list?.roomName || "N/A"} {" "} -  {" "}</label>
                                      <label style={{ fontSize: 12, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.bedName}>{list?.bedName || "N/A"}</label>

                                    </div>
                                  </div>
                              }
                            </div>
                          </div>





                          <div>
                            {
                              list?.canAssign === false ? "" :

                                <Form.Check aria-label="option 1"
                                  disabled={list?.canAssign === false}
                                  checked={assignedCheckedUsers.includes(list.customerId)}
                                  onChange={() => handleAssignedCheckboxChange(list.customerId)}
                                  style={{ cursor: "pointer", boxShadow: "none" }}
                                />}
                          </div>
                        </div>

                      </div>
                    )

                  })
                  }
                </Card.Body>
              </Card>
            </div>


            <div

              className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex flex-column align-items-center justify-content-center mt-5 mt-lg-0"
              style={{
                position: 'relative',
                minHeight: '100px'
              }}>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="  mb-3 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#EEFFF0", borderRadius: 5, padding: 10 }}>
                  <RiShareForwardFill onClick={handleAssignUser} style={{ cursor: "pointer", color: "#038C3D", fontSize: 22 }} />
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ backgroundColor: "#FFF4F4", borderRadius: 5, padding: 10 }}>
                  <IoArrowUndoSharp onClick={handleUnAssignUser} style={{ cursor: "pointer", color: "#DC1515", fontSize: 22 }} />
                </div>
              </div>
            </div>



            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 mb-3 mb-lg-0">
              <Card style={{ border: "1px solid #E7E7E7", borderRadius: 10, cursor: "pointer" }} className='h-100 ' >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12, padding: 10
                }}>


                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    border: "1px solid #D6D6D6",
                    borderRadius: 30,
                    width: 260,
                    backgroundColor: "#fff"
                  }}>
                    <input
                      type="text"
                      placeholder="Search"
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        fontSize: 14,
                        color: "#333",
                        fontFamily: "Gilroy"
                      }}
                    />
                    <SearchNormal size={20} color="#6F6F6F" />
                  </div>


                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid #D6D6D6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}>
                    <Filter size={20} color="#4b4b4b" />
                  </div>

                </div>

                <Card.Header className='d-flex justify-content-between' style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500, border: "none" }} >
                  <div style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>
                    Assigned
                  </div>

                  <div>
                    <Form.Check className='ms-1 pe-0'
                      aria-label="option 1"
                      checked={assignedSelectAll}
                      onChange={handleAssignedGlobalSelectAll}
                      style={{
                        cursor: "pointer", boxShadow: "none", transform: "scale(1.2)",
                        transformOrigin: "center",
                      }}
                    />

                  </div>


                </Card.Header>
                <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scrolls m-1 pe-2 ps-2">
                  {AssignedList.length > 0 && AssignedList.map((list) => {
                    return (
                      <div key={list.customerId} className='mb-2' style={{ height: "fit-content", backgroundColor: list.ending ? "#FFF3F3" : "#FFF", border: list.ending && "1px solid #FFD6D6", borderRadius: list.ending && 8, padding: list.ending && 8 }} >
                        <div className='d-flex justify-content-between'>

                          <div className='d-flex gap-3'>
                            <div>
                              {list?.profilePic &&
                                list?.profilePic !== "0" ? (
                                <Image
                                  src={list?.profilePic}
                                  roundedCircle
                                  style={{ height: 35, width: 35 }}
                                  alt="image"
                                />
                              ) : (
                                <div
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: "50%",
                                    backgroundColor: "#E2E8F0",
                                    color: "#44536A",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 14,
                                    fontWeight: "600",
                                    fontFamily: "Gilroy"
                                  }}
                                >
                                  {list?.initials || "-"}
                                </div>
                              )}
                            </div>

                            <div>

                              <div>
                                <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 600, ...ellipsisStyle }} title={list.customerName}>{list.customerName}</label>

                              </div>


                              <div className='d-flex flex-wrap  gap-3'>
                                <div style={{ backgroundColor: "#FFEFCF", borderRadius: 10, display: "flex", justifyContent: "center", width: "fit-content", padding: "2px 8px" }} >
                                  <label style={{ fontSize: 12, color: "#222222", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.floorName}>{list?.floorName || "N/A"}</label>

                                </div>
                                <div style={{ backgroundColor: "#F1F7FF", borderRadius: 10, display: "flex", justifyContent: "center", width: "fit-content", padding: "2px 8px", gap: 2 }} >
                                  <label style={{ fontSize: 12, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.roomName}>{list?.roomName || "N/A"} {" "} -  {" "}</label>
                                  <label style={{ fontSize: 12, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 400, ...ellipsisStyle }} title={list.bedName}>{list?.bedName || "N/A"}</label>

                                </div>
                              </div>
                              {list?.ending && (
                                <div style={{ marginTop: 4 }} className='mb-2'>
                                  <span
                                    style={{
                                      fontSize: 12,
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      color: "#D32F2F",
                                      backgroundColor: "#FFE5E5",
                                      padding: "2px 8px",
                                      borderRadius: 8,
                                      display: "inline-block",
                                    }}
                                    title={formatDate(list.endDate)}
                                  >
                                    Ending on {formatDate(list.endDate)}
                                  </span>
                                </div>
                              )}
                           
                            </div>
                          </div>


                          <div>
                            <Form.Check aria-label="option 1"

                              style={{
                                cursor: list?.ending ? "not-allowed" : "pointer",
                                boxShadow: "none",
                              }}
                              disabled={list?.ending}

                              checked={unAssignedCheckedUsers.includes(list.customerId)}
                              onChange={() => handleUnassignedCheckboxChange(list.customerId)}

                            />
                          </div>
                        </div>

                      </div>
                    )

                  })
                  }
                </Card.Body>
              </Card>




            </div>
          </div> */}

          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-5">
              <div className="h-full border border-gray-300 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3 p-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[30px] bg-white w-[260px]">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full border-none outline-none text-sm text-gray-800 font-semibold font-gilroy"
                    />
                    <SearchNormal size={20} color="#6F6F6F" />
                  </div>
                  <div className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer">
                    <Filter size={20} color="#4b4b4b" />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#E7F1FF] text-gray-900 font-gilroy font-semibold px-3 py-2 rounded-tl-xl rounded-tr-xl">
                  <div className="text-gray-900 font-bold text-sm">Unassigned</div>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleGlobalSelectAll}
                      className="cursor-pointer scale-125"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[350px] p-1 pe-2 ps-2 show-scrolls">
                  {unAssignedList.length > 0 &&
                    unAssignedList.map((list) => (
                      <div key={list.customerId} className="mb-3 flex justify-between pb-2">
                        <div className="flex gap-3">
                          <div>
                            {list?.profilePic && list?.profilePic !== "0" ? (
                              <img
                                src={list.profilePic}
                                alt="image"
                                className="rounded-full w-9 h-9"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold font-gilroy">
                                {list?.initials || "-"}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col mt-1">
                            <div className="flex items-center gap-2">
                              <label
                                className="text-gray-900 text-sm font-semibold font-gilroy truncate"
                                title={list.customerName}
                              >
                                {list.customerName}
                              </label>
                              {
                                list.isBooked ?  <ArrowUp size={16} color="#1E45E1" className="mb-1" /> : 
                                list.onNotice ? <ArrowDown size={16} color="#FF0000" className="mb-1" /> : null
                              }
                              {/* {list?.canAssign === false ? (
                                <ArrowDown size={16} color="#FF0000" className="mb-1" />
                              ) : (
                                <ArrowUp size={16} color="#1E45E1" className="mb-1" />
                              )} */}
                            </div>

                            {list?.canAssign === false ? (
                              <label
                                className="text-gray-600 text-sm font-medium font-gilroy truncate"
                              >
                                {list?.mobile ? `${list.countryCode} ${list.mobile}` : "-"}
                              </label>
                            ) : (
                              <div className="flex flex-wrap gap-3">
                                <div className="bg-yellow-100 rounded-xl flex justify-center px-2 py-[2px]">
                                  <label
                                    className="text-gray-900 text-xs font-medium font-gilroy truncate"
                                    title={list.floorName}
                                  >
                                    {list?.floorName || "N/A"}
                                  </label>
                                </div>
                                <div className="bg-blue-100 rounded-xl flex justify-center px-2 py-[2px] gap-1">
                                  <label
                                    className="text-blue-600 text-xs font-medium font-gilroy truncate"
                                    title={list.roomName}
                                  >
                                    {list?.roomName || "N/A"} -
                                  </label>
                                  <label
                                    className="text-blue-600 text-xs font-medium font-gilroy truncate"
                                    title={list.bedName}
                                  >
                                    {list?.bedName || "N/A"}
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          {list?.canAssign !== false && (
                            <input
                              type="checkbox"
                              checked={assignedCheckedUsers.includes(list.customerId)}
                              onChange={() => handleAssignedCheckboxChange(list.customerId)}
                              className="cursor-pointer mt-3.5"
                              disabled={list?.ending}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-12 md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center mt-5 lg:mt-0 relative min-h-[100px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                <div className="bg-green-100 rounded-md p-2 cursor-pointer">
                  <RiShareForwardFill
                    onClick={handleAssignUser}
                    className="text-green-700 text-2xl"
                  />
                </div>
                <div className="bg-red-100 rounded-md p-2 cursor-pointer">
                  <IoArrowUndoSharp
                    onClick={handleUnAssignUser}
                    className="text-red-600 text-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 mb-3 mb-lg-0">
              <div className="h-full border border-gray-300 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3 p-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[30px] bg-white w-[260px]">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full border-none outline-none text-sm text-gray-800 font-semibold font-gilroy"
                    />
                    <SearchNormal size={20} color="#6F6F6F" />
                  </div>
                  <div className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer">
                    <Filter size={20} color="#4b4b4b" />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#E7F1FF] text-gray-900 font-gilroy font-semibold px-2 py-2 rounded-tl-xl rounded-tr-xl">
                  <div className="text-gray-900 font-bold text-sm">Assigned</div>
                  <div>
                    <input
                      type="checkbox"
                      checked={assignedSelectAll}
                      onChange={handleAssignedGlobalSelectAll}
                      className="cursor-pointer scale-125"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[350px] p-2 show-scrolls">
                  {AssignedList.length > 0 &&
                    AssignedList.map((list) => (
                      <div
                        key={list.customerId}
                        className={`mb-3 ${list.ending ? "bg-red-50 border border-red-300 rounded-lg p-2 pb-2" : ""
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            {list?.profilePic && list?.profilePic !== "0" ? (
                              <img
                                src={list.profilePic}
                                alt="image"
                                className="rounded-full w-12 h-12"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold font-gilroy">
                                {list?.initials || "-"}
                              </div>
                            )}

                            <div className="flex flex-col mt-1">
                              <div>
                                <label
                                  className="text-gray-900 text-sm font-semibold font-gilroy truncate"
                                  title={list.customerName}
                                >
                                  {list.customerName}
                                </label>
                              </div>
                              <div className="flex flex-wrap gap-3 -mt-1">
                                <div className="bg-yellow-100 rounded-xl flex justify-center px-2 py-[2px]">
                                  <label
                                    className="text-gray-900 text-xs font-medium font-gilroy truncate"
                                    title={list.floorName}
                                  >
                                    {list?.floorName || "N/A"}
                                  </label>
                                </div>
                                <div className="bg-blue-100 rounded-xl flex justify-center px-2 py-[2px] gap-1">
                                  <label
                                    className="text-blue-600 text-xs font-medium font-gilroy truncate"
                                    title={list.roomName}
                                  >
                                    {list?.roomName || "N/A"} -
                                  </label>
                                  <label
                                    className="text-blue-600 text-xs font-medium font-gilroy truncate"
                                    title={list.bedName}
                                  >
                                    {list?.bedName || "N/A"}
                                  </label>
                                </div>
                              </div>

                              {list?.ending && (
                                <span
                                  className="mt-1 inline-block text-red-700 text-xs font-medium font-gilroy bg-red-100 px-2 py-[2px] rounded-md"
                                  title={formatDate(list.endDate)}
                                >
                                  Ending on {formatDate(list.endDate)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div>
                            <input
                              type="checkbox"
                              checked={unAssignedCheckedUsers.includes(list.customerId)}
                              onChange={() =>
                                handleUnassignedCheckboxChange(list.customerId)
                              }
                              className={`mt-3 cursor-pointer ${list.ending ? "cursor-not-allowed" : ""}`}
                              disabled={list?.ending}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>



        {formLoading &&
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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


      </Modal.Dialog>
    </Modal>

  )
}
AssignAmenities.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  assignAmenitiesDetails: PropTypes.func.isRequired,
};


export default AssignAmenities