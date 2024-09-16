import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import AddCustomer from './AddCustomerPG';
import { MdError } from "react-icons/md";


function DeleteBed({ show, handleClose,deleteBedDetails}) {

  
  const state = useSelector(state => state)
  const dispatch = useDispatch();

console.log("state ",state)

console.log("deleteBedDetails",deleteBedDetails)

const [actionType, setActionType] = useState('addCustomer');
const [showAddCustomer, setShowAddCustomer] = useState(false)

const {bed, room } = deleteBedDetails




console.log("showAddCustomer",showAddCustomer)

const handleAddCustomer = () => {
    setShowAddCustomer(true);

      };




const handleCloseAddCustomer = () =>{
  setShowAddCustomer(false)
}

const handleDeleteBed = () =>{
   
      if(deleteBedDetails.room.Hostel_Id && deleteBedDetails.room.Floor_Id && deleteBedDetails.room.Room_Id && deleteBedDetails.bed.bed_no){
        dispatch({ type: 'DELETEBED', payload:{  hostelId:room.Hostel_Id , floorId : room.Floor_Id, roomNo :room.Room_Id, bed_id :bed.bed_no }})
     
    
    
    
    }
   
  
  }






  const handleShow = (type) => {
    setActionType(type);
    };

    useEffect(() => {
      if (state.PgList?.deleteBedError) {
        setTimeout(() => {
          dispatch({ type: 'CLEAR_DELETE_BED_ERROR' });
        }, 3000);    
      }
    }, [state.PgList?.deleteBedError]);
  

    useEffect(() => {
      if (state.PgList.statusCodeDeleteBed == 200) {
        handleClose()
    
      }
  
    }, [state.PgList.statusCodeDeleteBed])

  return (
    <div>  
        
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <div>
            <Nav fill variant="tabs" >
      <Nav.Item onClick={() => handleShow('addCustomer')}>
        <Nav.Link  style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy", color:actionType === 'addCustomer' ? "#FFF" : "rgba(36, 0, 255, 1)" , backgroundColor:actionType === 'addCustomer' ? "rgba(36, 0, 255, 1)" : "#FFF"}}>Add Customer</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={() => handleShow('deleteBed')}>
        <Nav.Link  style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy", color:actionType === 'deleteBed' ? "#FFF" : "rgba(36, 0, 255, 1)" , backgroundColor:actionType === 'deleteBed' ? "rgba(36, 0, 255, 1)" : "#FFF"}}>Delete Bed</Nav.Link>
      </Nav.Item>
     
    </Nav>
            </div>
        
           

            {state.PgList?.deleteBedError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.PgList?.deleteBedError}
                        </label>
                    </div>
                )}
      <Modal.Body style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}> {actionType === 'addCustomer' ? 'Are you sure you want to add this customer?' : `Are you sure you want to delete the bed ${deleteBedDetails.bed.bed_no}?`}</Modal.Body>

   
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleClose} style={{width:130,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"#FFF",color:"rgba(36, 0, 255, 1)",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
         
          {actionType === 'addCustomer' && (
            <Button style={{width:130,height:52,borderRadius:8, border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} 
              onClick={handleAddCustomer}
              >
              Add Customer
            </Button>
          )}
          {actionType === 'deleteBed' && (
            <Button style={{width:130,height:52,borderRadius:8, border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} 
              onClick={handleDeleteBed}>
              Delete
            </Button>
          )}

    </Modal.Footer>
  </Modal>
  {
    showAddCustomer && <AddCustomer show={showAddCustomer} handleClosing={handleCloseAddCustomer} currentItem={deleteBedDetails} />
  }
  </div>
  )
}

export default DeleteBed;
