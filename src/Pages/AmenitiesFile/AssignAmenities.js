import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { MdError } from "react-icons/md";
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import Forward from '../../Assets/Images/New_images/Forward.svg'
import BackWard from '../../Assets/Images/New_images/Backward.svg'
import Image from 'react-bootstrap/Image';


function AssignAmenities({ show, handleClose, hostelid, assignAmenitiesDetails }) {

  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const [unAssignedList, setUnassignedList] = useState([])
  const [AssignedList, setAssignedList] = useState([])
  const [unAssignedCheckedUsers, setUnassignedCheckedUsers] = useState([]);
  const [assignedCheckedUsers, setAssignedCheckedUsers] = useState([]);
  const [errorAssign, setErrorAssign] = useState('')
  const [errorUnAssign, setUnErrorAssign] = useState('')


  console.log("state", state)

  console.log("assignAmenitiesDetails", assignAmenitiesDetails)

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

    if (!assignedCheckedUsers || assignedCheckedUsers.length === 0) {
      setErrorAssign("Please select at least one user before assigning amenities.");
      return;
    }



    dispatch({ type: 'ASSIGNAMENITIES', payload: { hostel_id: hostelid, am_id: assignAmenitiesDetails.id, user_ids: assignedCheckedUsers } })
  }


  const handleUnAssignUser = () => {

    if (!unAssignedCheckedUsers || unAssignedCheckedUsers.length === 0) {
      setUnErrorAssign("Please select at least one user before Unassigning amenities.");
      return;
    }

    dispatch({ type: 'UNASSIGNAMENITIES', payload: { hostel_id: hostelid, am_id: assignAmenitiesDetails.id, user_ids: unAssignedCheckedUsers } })

  }

  useEffect(() => {
    dispatch({
      type: 'GETASSIGNAMENITIES', payload: {
        hostel_id: hostelid,
        am_id: assignAmenitiesDetails.id,
      }
    })
  }, [])


  useEffect(() => {
    if (state.InvoiceList.GetUnAssignAmenitiesList) {
      setUnassignedList(state.InvoiceList.GetUnAssignAmenitiesList)
    }

  }, [state.InvoiceList.GetUnAssignAmenitiesList])

  useEffect(() => {
    if (state.InvoiceList.GetAssignAmenitiesList) {
      setAssignedList(state.InvoiceList.GetAssignAmenitiesList)
    }

  }, [state.InvoiceList.GetAssignAmenitiesList])



  useEffect(() => {

    if (state.InvoiceList.assignAmenitiesSuccessStatusCode) {
      dispatch({
        type: 'GETASSIGNAMENITIES', payload: {
          hostel_id: hostelid,
          am_id: assignAmenitiesDetails.id,
        }
      })
    }
    setAssignedCheckedUsers([])

  }, [state.InvoiceList?.assignAmenitiesSuccessStatusCode])


  useEffect(() => {

    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode == 200) {
      dispatch({
        type: 'GETASSIGNAMENITIES', payload: {
          hostel_id: hostelid,
          am_id: assignAmenitiesDetails.id,
        }
      })
    }
    setUnassignedCheckedUsers([])

  }, [state.InvoiceList.UnAssignAmenitiesSuccessStatusCode])



  console.log("unAssignedCheckedUsers", unAssignedCheckedUsers)

  console.log("assignedCheckedUsers", assignedCheckedUsers)


  return (
    <div
      className="modal show"
      style={{
        display: 'block', position: 'initial'
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static" className="custom-modal-width-Amenities">
        <Modal.Dialog style={{
          maxWidth: 1000,
          width: '100%',

        }} className='m-0 p-0'>
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Assign Amenities</Modal.Title>
            <CloseCircle size="24" color="#000" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            {errorAssign && (
              <div className="d-flex align-items-center mt-1 mb-2">
                <MdError style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{errorAssign}</span>
              </div>
            )}

            {errorUnAssign && (
              <div className="d-flex align-items-center mt-1 mb-2">
                <MdError style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{errorUnAssign}</span>
              </div>
            )}

            <div className="row">
              <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12">
                <Card style={{ border: "1px solid #DCDCDC", borderRadius: 8, cursor: "pointer" }} className='h-100 ' >
                  <Card.Header style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unassigned</Card.Header>
                  <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scroll m-1 p-2">
                    {unAssignedList.length > 0 && unAssignedList.map((list) => {
                      return (
                        <div>
                          <div key={list.user_id} className='d-flex justify-content-between'>
                            <div>
                              <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>{list.user_Name}</label>

                            </div>

                            <div>
                              <Form.Check aria-label="option 1" style={{ cursor: "pointer", boxShadow: "none" }}

                                checked={assignedCheckedUsers.includes(list.user_id)}
                                onChange={() => handleAssignedCheckboxChange(list.user_id)}

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


              <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex flex-column align-items-center justify-content-center" style={{ position: 'relative' }}>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div>
                    <Image src={Forward} onClick={handleAssignUser} style={{ cursor: "pointer" }} />
                  </div>
                  <div>
                    <Image src={BackWard} onClick={handleUnAssignUser} style={{ cursor: "pointer" }} />
                  </div>
                </div>
              </div>


              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <Card style={{ border: "1px solid #DCDCDC", borderRadius: 8, cursor: "pointer" }} className='h-100 ' >
                  <Card.Header style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Assigned</Card.Header>
                  <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scroll m-1 p-2">
                    {AssignedList.length > 0 && AssignedList.map((list) => {
                      return (
                        <div>
                          <div key={list.user_id} className='d-flex justify-content-between'>
                            <div>
                              <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>{list.user_Name}</label>

                            </div>

                            <div>
                              <Form.Check aria-label="option 1"
                                style={{
                                  cursor: "pointer",
                                  boxShadow: "none",
                                }}

                                checked={unAssignedCheckedUsers.includes(list.user_id)}
                                onChange={() => handleUnassignedCheckboxChange(list.user_id)}

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

          <Modal.Footer style={{ border: "none" }}>


          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}

export default AssignAmenities