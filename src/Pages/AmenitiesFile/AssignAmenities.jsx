/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
// import { MdError } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircle } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import Forward from '../../Assets/Images/New_images/Forward.svg'
import BackWard from '../../Assets/Images/New_images/Backward.svg'
import Image from 'react-bootstrap/Image';
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'


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


  console.log("assignedCheckedUsers", assignedCheckedUsers)

  useEffect(() => {
    dispatch({
      type: 'GET_PARTICULAR_AMENITIES',
      payload: {
        hostelId: state.login.selectedHostel_Id,
        amenityId: assignAmenitiesDetails.amenityId,
      },
    });
  }, [])




  // useEffect(() => {
  //   if (assignAmenitiesDetails) {
  //     setUnassignedList(assignAmenitiesDetails?.unassignedCustomers)
  //   }

  // }, [assignAmenitiesDetails])

  // useEffect(() => {
  //   if (assignAmenitiesDetails) {
  //     setAssignedList(assignAmenitiesDetails?.assignedCustomers)
  //   }

  // }, [assignAmenitiesDetails])


  useEffect(() => {
    if (state.InvoiceList.getAssignAmenitiesSuccessStatusCode === 200) {
      setAssignedList(state?.InvoiceList?.GetAssignAmenitiesList || [])
      setUnassignedList(state?.InvoiceList?.GetUnAssignAmenitiesList || [])

    }

    setTimeout(() => {
      dispatch({ type: 'REMOVE_GET_ASSIGN_AMENITIES_STATUS_CODE' })
    }, 500)


  }, [state.InvoiceList.getAssignAmenitiesSuccessStatusCode])




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
    setUnassignedCheckedUsers((prevChecked) =>
      prevChecked.includes(user_id)
        ? prevChecked.filter((id) => id !== user_id)
        : [...prevChecked, user_id]
    );
  };

  const handleAssignedCheckboxChange = (user_id) => {
    setErrorAssign('')
    setAssignedCheckedUsers((prevChecked) =>
      prevChecked.includes(user_id)
        ? prevChecked.filter((id) => id !== user_id)
        : [...prevChecked, user_id]
    );
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

  return (
    <div
      className="modal show"
      style={{
        display: 'block',
      }}
    >
      <Modal show={show} onHide={handleClose}
        centered backdrop="static"
        dialogClassName="responsive-modal-fix"
        style={{ border: "none" }}>
        <Modal.Dialog className="m-0 p-0"
        >

          <Modal.Header
            style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{
              fontSize: 18,
              color: "#222222",
              fontFamily: "Gilroy", fontWeight: 600
            }}>
              Assign Amenities</Modal.Title>
            <CloseCircle size="24" color="#000"
              onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>
          <Modal.Body style={{ border: "none" }}>
            {errorAssign && (
              <ErrorMessage message={errorAssign} type="error" />
            )}

            {errorUnAssign && (
              <ErrorMessage message={errorUnAssign} type="error" />
            )}

            <div className="row">
              <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12">
                <Card style={{ border: "1px solid #DCDCDC", borderRadius: 8, cursor: "pointer" }} className='h-100 ' >
                  <Card.Header style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unassigned</Card.Header>
                  <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scroll m-1 p-2">
                    {unAssignedList.length > 0 && unAssignedList.map((list) => {
                      return (
                        <div key={list.customerId}>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>{list.customerName}</label>

                            </div>

                            <div>
                              <Form.Check aria-label="option 1"

                                checked={assignedCheckedUsers.includes(list.customerId)}
                                onChange={() => handleAssignedCheckboxChange(list.customerId)}
                                style={{ cursor: "pointer", boxShadow: "none" }}
                              />
                            </div>
                          </div>
                          <hr style={{ border: "1px solid #ccc" }} className='p-0 m-1' />
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
                  <div className="mb-3">
                    <Image src={Forward} onClick={handleAssignUser} style={{ cursor: "pointer" }} />
                  </div>
                  <div>
                    <Image src={BackWard} onClick={handleUnAssignUser} style={{ cursor: "pointer" }} />
                  </div>
                </div>
              </div>



              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 mb-3 mb-lg-0">
                <Card style={{ border: "1px solid #DCDCDC", borderRadius: 8, cursor: "pointer" }} className='h-100 ' >
                  <Card.Header style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Assigned</Card.Header>
                  <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scroll m-1 p-2">
                    {AssignedList.length > 0 && AssignedList.map((list) => {
                      return (
                        <div key={list.customerId}>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>{list.customerName}</label>

                            </div>

                            <div>
                              <Form.Check aria-label="option 1"
                                style={{
                                  cursor: "pointer",
                                  boxShadow: "none",
                                }}

                                checked={unAssignedCheckedUsers.includes(list.customerId)}
                                onChange={() => handleUnassignedCheckboxChange(list.customerId)}

                              />
                            </div>
                          </div>
                          <hr style={{ border: "1px solid #ccc" }} className='p-0 m-1' />
                        </div>
                      )

                    })
                    }
                  </Card.Body>
                </Card>




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
          <Modal.Footer style={{ border: "none" }}>


          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}
AssignAmenities.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  assignAmenitiesDetails: PropTypes.func.isRequired,
};


export default AssignAmenities