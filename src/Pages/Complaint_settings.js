import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Closebtn from '../Assets/Images/CloseCircle.png';
import Swal from 'sweetalert2';
import { MdError } from "react-icons/md"; 
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../Assets/Images/New_images/empty_image.png';



   const ComplaintSettings = () => {

      const state = useSelector(state => state)
      const dispatch = useDispatch()


    const [type, setType] = useState('');
    const [typeerrmsg, setTypeErrmsg] = useState('')
    const [types, setTypes] = useState([]);
    const [compliancerolePermission, setComplianceRolePermission] = useState("");

  const [compliancepermissionError, setCompliancePermissionError] = useState("");
  const [complianceAddPermission,setComplianceAddPermission]= useState("")
  const [complianceDeletePermission,setComplianceDeletePermission]=useState("")
  const [complianceEditPermission,setComplianceEditPermission]=useState("")

  useEffect(() => {
    setComplianceRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_view == 1
    ) {
      setCompliancePermissionError("");
    } else {
      setCompliancePermissionError("Permission Denied");
    }
  }, [compliancerolePermission]);



  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_create == 1
    ) {
      setComplianceAddPermission("");
    } else {
      setComplianceAddPermission("Permission Denied");
    }
  }, [compliancerolePermission]);


  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_delete == 1
    ) {
      setComplianceDeletePermission("");
    } else {
      setComplianceDeletePermission("Permission Denied");
    }
  }, [compliancerolePermission]);
  useEffect(() => {
    if (
      compliancerolePermission[0]?.is_owner == 1 ||
      compliancerolePermission[0]?.role_permissions[13]?.per_edit == 1
    ) {
      setComplianceEditPermission("");
    } else {
      setComplianceEditPermission("Permission Denied");
    }
  }, [compliancerolePermission]);


  const handleType = (e) => {
    setType(e.target.value)
    if(!e.target.value){
      setTypeErrmsg("Please Enter a complaint Type")
    }
    else {
      setTypeErrmsg('')
    }
  }

  const addType = () => {

    if (!type){
      setTypeErrmsg("Please Enter  a complaint Type")
      return;
    }

    if (type !== '') {
      if (type.trim()) {
        setTypes([...types, type]);
        dispatch({ type: 'COMPLAINT-TYPE-ADD', payload: { complaint_name: type } })
        setType('');
      }
    }

    

  };

  
  useEffect(() => {
    if (state.Settings?.alreadytypeerror) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ALREADY_COMPLAINTTYPE_ERROR' });
      }, 3000);    
    }
  }, [state.Settings?.alreadytypeerror])



  useEffect(() => {
    if (state.Settings.addComplaintSuccessStatusCode === 200 || state.Settings.deletecomplaintStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: 'COMPLAINT-TYPE-LIST' })
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_COMPLAINT_STATUS_CODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE' })
      }, 1000)
    }
  }, [state.Settings.addComplaintSuccessStatusCode, state.Settings.deletecomplaintStatuscode])

  const [deleteItem, setDeleteItem] = useState(null); 
  const [deleteShow, setDeleteShow] = useState(false);
  
  const handleshow = () => {
    setDeleteShow(true);
  };
  
  const handleCloseDelete = () => {
    setDeleteShow(false);
    setDeleteItem(null); // Reset delete item when canceled
  };
  
  const handleDeleteType = (item) => {
    setDeleteItem(item); // Store item to delete in state
    setDeleteShow(true);  
  };
  
  const confirmDelete = () => {
    if (deleteItem) {
      dispatch({
        type: 'DELETE-COMPLAINT-TYPE',
        payload: {
          id: deleteItem.id
        }
      });
    }
    setDeleteShow(false); // Close modal after delete
    setDeleteItem(null);  
  };
  

  const [complainttypelist, setComplainttypelist] = useState([])

  useEffect(() => {
    dispatch({ type: 'COMPLAINT-TYPE-LIST' })

  }, [])

  useEffect(() => {
    if (state.Settings.getcomplainttypeStatuscode === 200) {
      setComplainttypelist(state.Settings.Complainttypelist.complaint_types)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE' })
      }, 100)
    }


  }, [state.Settings.getcomplainttypeStatuscode])

  return (
    <>
    {
      compliancepermissionError ? (
        <>
        <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // height: "100vh",
    }}
  >
    {/* Image */}
    <img
      src={EmptyState}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {/* Permission Error */}
    {compliancepermissionError && (
      <div
        style={{
          color: "red",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <MdError size={20} />
        <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{compliancepermissionError}</span>
      </div>
    )}
  </div>
        </>

      ):
      <div>
      <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Complaint type</Form.Label>
          <Form.Control
            style={{ padding: '20px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
            type="text"
            placeholder="Enter a complaint type"
            value={type}
            onChange={(e) => handleType(e)}
          />

            {typeerrmsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {typeerrmsg !== " " && <MdError style={{  color: 'red' }} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {typeerrmsg}</span>
    </p>
  </div>
)}
        </Form.Group>
      </div>

      {state.Settings?.alreadytypeerror && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.Settings?.alreadytypeerror}
                        </label>
                    </div>
                )}
      <div style={{ marginTop: '30px' }}>
        <Button
          style={{ fontSize: 16, fontFamily: 'Montserrat', backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 500, borderRadius: 12, width: 200 }}
          disabled={complianceAddPermission}
          onClick={addType}
        >
          + Add type
        </Button>
        <div className="mt-3">
          <h5 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Existing complaint types</h5>
          <div className="mt-4 mb-2 d-flex flex-wrap">
            {complainttypelist.length > 0 && complainttypelist.map((item, index) => (
              <p key={index} className='m-1 mt-3' style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                <span style={{ backgroundColor: '#FFEFCF', padding: '8px 12px', color: '#222222', borderRadius: '14px' }}>
                  {item.complaint_name} <span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeleteType(item)}><img src={Closebtn} height={15} width={15} /></span>
                </span>
              </p>
              
            ))}
          </div>
        </div>

     

        <Modal
  show={deleteShow}
  onHide={handleCloseDelete}
  centered
  backdrop="static"
  style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }} 
>
  <Modal.Header style={{ borderBottom: 'none' }}> 
    <Modal.Title 
      style={{
        fontSize: '18px',
        fontFamily: 'Gilroy',
        textAlign: 'center',
        fontWeight: 600,
        color: '#222222',
        flex: 1
      }}
    >
      Delete ComplaintType?
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Gilroy',
      color: '#646464',
      textAlign: 'center',
      marginTop: '-20px'
    }}
  >
    Are you sure you want to delete this Complaint-type?
  </Modal.Body>
  
  <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}> 
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#fff',
        color: '#1E45E1',
        border: '1px solid #1E45E1',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px',
        marginRight: 10
      }}
      onClick={handleCloseDelete}  // Cancel, close modal
    >
      Cancel
    </Button>
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#1E45E1',
        color: '#FFFFFF',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px'
      }}
      onClick={confirmDelete}  // Confirm delete, dispatch action
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>

      </div>
    </div>

    }
  
    </>
  );
};

export default ComplaintSettings;
