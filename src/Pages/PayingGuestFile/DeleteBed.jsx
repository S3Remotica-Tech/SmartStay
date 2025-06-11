/* eslint-disable react-hooks/exhaustive-deps */ 
import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import AddCustomer from './AddCustomerPG';
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";


function DeleteBed({ show, handleClose,deleteBedDetails}) {

  
  const state = useSelector(state => state)
  const dispatch = useDispatch();

const [actionType, setActionType] = useState('addCustomer');
const [showAddCustomer, setShowAddCustomer] = useState(false)
const [rolePermission, setRolePermission] = useState("");
const [customerAddPermission,setCustomerAddPermission]= useState("")
const [customerDeletePermission,setCustomerDeletePermission]=useState("")
const {bed, room } = deleteBedDetails


useEffect(() => {
  setRolePermission(state.createAccount.accountList);
}, [state.createAccount.accountList]);


useEffect(() => {
  if (
    rolePermission[0]?.is_owner === 1 ||
    rolePermission[0]?.role_permissions[4]?.per_create === 1
  ) {
    setCustomerAddPermission("");
  } else {
    setCustomerAddPermission("Permission Denied");
  }
}, [rolePermission]);

useEffect(() => {
  if (
    rolePermission[0]?.is_owner === 1 ||
    rolePermission[0]?.role_permissions[4]?.per_delete === 1
  ) {
    setCustomerDeletePermission("");
  } else {
    setCustomerDeletePermission("Permission Denied");
  }
}, [rolePermission]);


const handleAddCustomer = () => {
    setShowAddCustomer(true);

      };




const handleCloseAddCustomer = () =>{
  setShowAddCustomer(false)
  dispatch({ type: "CLEAR_PHONE_ERROR" });
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
      if (state.PgList.statusCodeDeleteBed === 200) {
        handleClose()
    
      }
  
    }, [state.PgList.statusCodeDeleteBed])

  return (
    <div>  

      
        
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <div>
            <Nav fill variant="tabs" >
      <Nav.Item onClick={() => handleShow('addCustomer')}>
        <Nav.Link  style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy",borderColor:'#e0ecff',borderTopRightRadius:'0px', color:actionType === 'addCustomer' ? "black" : "black" , backgroundColor:actionType === 'addCustomer' ? "#e0ecff" : "#FFF"}}>Add Customer</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={() => handleShow('deleteBed')}>
        <Nav.Link  style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy",borderColor:'#e0ecff',borderTopLeftRadius:'0px', color:actionType === 'deleteBed' ? "black" : "black" , backgroundColor:actionType === 'deleteBed' ? "#e0ecff" : "#FFF"}}>Delete Bed</Nav.Link>
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
    <Button  onClick={handleClose} style={{width:130,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid #1E45E1",backgroundColor:"#FFF",color:"#1E45E1",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
         
          {actionType === 'addCustomer' && (
            <Button style={{width:130,height:52,borderRadius:8, border:"1px solid #1E45E1",backgroundColor:"#1E45E1",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} 
            disabled={customerAddPermission}  onClick={handleAddCustomer}
              >
              Add Customer
            </Button>
          )}
          {actionType === 'deleteBed' && (
            <Button style={{width:130,height:52,borderRadius:8, border:"1px solid #1E45E1",backgroundColor:"#1E45E1",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} 
            disabled={customerDeletePermission}  onClick={handleDeleteBed}>
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
DeleteBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteBedDetails: PropTypes.func.isRequired
}
export default DeleteBed;
