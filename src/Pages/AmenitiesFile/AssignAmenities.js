/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { MdError } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  CloseCircle} from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import Forward from '../../Assets/Images/New_images/Forward.svg'
import BackWard from '../../Assets/Images/New_images/Backward.svg'
import Image from 'react-bootstrap/Image';
import PropTypes from "prop-types";


function AssignAmenities({ show, handleClose,assignAmenitiesDetails }) {

  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const [unAssignedList, setUnassignedList] = useState([])
  const [AssignedList, setAssignedList] = useState([])
  const [unAssignedCheckedUsers, setUnassignedCheckedUsers] = useState([]);
  const [assignedCheckedUsers, setAssignedCheckedUsers] = useState([]);
  const [errorAssign, setErrorAssign] = useState('')
  const [errorUnAssign, setUnErrorAssign] = useState('')



  useEffect(() => {
    dispatch({
      type: 'GETASSIGNAMENITIES', payload: {
        hostel_id: state.login.selectedHostel_Id,
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
          hostel_id: state.login.selectedHostel_Id,
          am_id: assignAmenitiesDetails.id,
        }
      })


      setTimeout(()=>{
        dispatch({ type: 'REMOVE_ASSIGN_AMENITIES_STATUS_CODE'})
      },100)


    }
    setAssignedCheckedUsers([])

  }, [state.InvoiceList?.assignAmenitiesSuccessStatusCode])


  useEffect(() => {

    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode === 200) {
      dispatch({
        type: 'GETASSIGNAMENITIES', payload: {
          hostel_id: state.login.selectedHostel_Id,
          am_id: assignAmenitiesDetails.id,
        }
      })

      setTimeout(()=>{
        dispatch({ type: 'REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE'})
      },100)


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

    if (!assignedCheckedUsers || assignedCheckedUsers.length === 0) {
      setErrorAssign("Please Select at Least One User Before Assigning Amenities");
      return;
    }



    dispatch({ type: 'ASSIGNAMENITIES', payload: { hostel_id: state.login.selectedHostel_Id, am_id: assignAmenitiesDetails.id, user_ids: assignedCheckedUsers } })
  }


  const handleUnAssignUser = () => {

    if (!unAssignedCheckedUsers || unAssignedCheckedUsers.length === 0) {
      setUnErrorAssign("Please Select at Least One User Before Unassigning Amenities");
      return;
    }

    dispatch({ type: 'UNASSIGNAMENITIES', payload: { hostel_id: state.login.selectedHostel_Id, am_id: assignAmenitiesDetails.id, user_ids: unAssignedCheckedUsers } })

  }

 


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
      // className="custom-modal-width-Amenities" 
      style={{border:"none"}}>
         <Modal.Dialog className="m-0 p-0" 
        // style={{
        //   maxWidth: 1000,
        //   width: '100%',
        //   position:"fixed",
        //   top:100

        // }} 
         > 
        
          <Modal.Header 
          style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{ fontSize: 18, 
            color: "#222222", 
              fontFamily: "Gilroy", fontWeight: 600 }}>
              Assign Amenities</Modal.Title>
            <CloseCircle size="24" color="#000" 
            onClick={handleClose} style={{cursor:"pointer"}} />
          </Modal.Header>
          <Modal.Body style={{border:"none"}}>
            {errorAssign && (
              <div className="d-flex align-items-center mt-1 mb-2">
                <MdError style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', 
                  fontWeight: 500 }}>
                    {errorAssign}</span>
              </div>
            )}

            {errorUnAssign && (
              <div className="d-flex align-items-center mt-1 mb-2">
                <MdError style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', 
                  fontWeight: 500 }}>
                  {errorUnAssign}</span>
              </div>
            )}

            <div className="row">
              <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12">
                <Card style={{ border: "1px solid #DCDCDC", borderRadius: 8, cursor: "pointer" }} className='h-100 ' >
                  <Card.Header style={{ backgroundColor: "#E7F1FF", fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unassigned</Card.Header>
                  <Card.Body style={{ maxHeight: 350, overflowY: "auto" }} className="show-scroll m-1 p-2">
                    {unAssignedList.length > 0 && unAssignedList.map((list) => {
                      return (
                        <div key={list.user_id}>
                          <div  className='d-flex justify-content-between'>
                            <div>
                              <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>{list.user_Name}</label>

                            </div>

                            <div>
                              <Form.Check aria-label="option 1" 

                                checked={assignedCheckedUsers.includes(list.user_id)}
                                onChange={() => handleAssignedCheckboxChange(list.user_id)}
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
                        <div key={list.user_id}>
                          <div  className='d-flex justify-content-between'>
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
AssignAmenities.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  assignAmenitiesDetails: PropTypes.func.isRequired, 
};


export default AssignAmenities