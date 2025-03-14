/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";






function DeleteFloor({ show, handleClose, currentItem }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();


  // const  getFloorName = (floor_Id)=> {
  //     // Mapping of numbers to words for easier conversion
  //     const numberToWord = {
  //       1: 'First',
  //       2: 'Second',
  //       3: 'Third',
  //       4: 'Fourth',
  //       5: 'Fifth',
  //       6: 'Sixth',
  //       7: 'Seventh',
  //       8: 'Eighth',
  //       9: 'Ninth',
  //       10: 'Tenth',
  //       11: 'Eleventh',
  //       12: 'Twelfth',
  //       13: 'Thirteenth',

  //     };


  //     if (floor_Id === 1) {
  //       return 'Ground Floor';
  //     } else if (numberToWord[floor_Id - 1]) {

  //       return `${numberToWord[floor_Id - 1]} Floor`;
  //     } else {

  //       const floorNumber = floor_Id - 1;
  //       const lastDigit = floorNumber % 10;
  //       let suffix = 'th';

  //       if (floorNumber !== 11 && floorNumber !== 12 && floorNumber !== 13) {
  //         switch (lastDigit) {
  //           case 1:
  //             suffix = 'st';
  //             break;
  //           case 2:
  //             suffix = 'nd';
  //             break;
  //           case 3:
  //             suffix = 'rd';
  //             break;
  //         }
  //       }

  //       return `${floorNumber}${suffix} Floor`;
  //     }
  //   }


  const handleDelete = () => {

    if (currentItem.hostel_Id && currentItem.floor_Id) {
      dispatch({ type: 'DELETEFLOOR', payload: { id: currentItem.hostel_Id, floor_id: currentItem.floor_Id } })
      // handleClose()
    }
  }


  // const [filteredDataRoom, setFilteredDataRoom] = useState([]);

  // useEffect(() => {
  //   const filtered = state.PgList.roomCount && state.PgList.roomCount.filter((view) => {
  //     return view.Hostel_Id === currentItem.hostel_Id && view.Floor_Id === currentItem.floor_Id;
  //   });
  //   setFilteredDataRoom(filtered);

  //   console.log("filtered",filtered);
  // }, [currentItem.hostel_Id, currentItem.floor_Id, state.PgList.roomCount]);
const [deleteFloorForm,setDeleteFloor] = useState("")

  useEffect(() => {
    if (state.UsersList?.deleteFloorError) {
      setDeleteFloor(state.UsersList?.deleteFloorError)
    }
  }, [state.UsersList?.deleteFloorError]);


  const handleCloseFormFloor = ()=>{
    handleClose()
    setDeleteFloor("")
    dispatch({type:'CLEAR_DELETE_FLOOR_ERROR'})
  }

  return (
    <div>
      <Modal show={show} onHide={handleCloseFormFloor} centered backdrop="static" dialogClassName="custom-delete-modal"
       >
        <Modal.Header style={{
          borderBottom: "none",
          justifyContent: "center",
          display: "flex"
        }} >
          <Modal.Title style={{
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "Gilroy"
          }}>Delete floor ?</Modal.Title>
        </Modal.Header>


       
        <Modal.Body style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center", marginTop: "-20px" }}>
          {`Are you sure you want to delete the ${currentItem.floor_Name}?`}
        </Modal.Body>
       {deleteFloorForm && (
                 <div className="d-flex justify-content-center align-items-center gap-2 ">
                   <MdError style={{ color: "red" }} />
                   <label
                     className="mb-0"
                     style={{
                       color: "red",
                       fontSize: "12px",
                       fontFamily: "Gilroy",
                       fontWeight: 500,
                       textAlign: "center",
                     }}
                   >
                     {deleteFloorForm}
                   </label>
                 </div>
               )}
        <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
          <Button onClick={handleCloseFormFloor} style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
            Cancel
          </Button>

          <Button style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }} onClick={handleDelete}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}
DeleteFloor.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
}
export default DeleteFloor
