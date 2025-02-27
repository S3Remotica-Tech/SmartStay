import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import role from "../Assets/Images/New_images/security-user.png"
import "./Settings.css";
import round from "../Assets/Images/dot_round.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import {Button,Form,FormControl} from "react-bootstrap";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import { MdError } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

function RolesDesign(props){
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const [roleName,setRoleNme]=useState('')
    const[permissionRole,setPermissionRole]=useState([])
    const [activeRow, setActiveRow] = useState(null);
    const [editRolePermission,setEditRolePermission] =useState("")
    const [edit,setEdit]=useState(false)
    const [errorForm,setErrorForm] =useState("")
    const [errorPermission,setErrorPermission] =useState("")
    const [deleteId,setDeleteId]= useState("")
    const [deleteRleForm,setDeleteRleForm] =useState(false)
    

    const handleShowDots = (id) => {
      if (activeRow === id) {
        setActiveRow(null);
      } else {
        // const rect = e.currentTarget.getBoundingClientRect();
       
        setActiveRow(id);
      }
    };

    const [initialState, setInitialState] = useState({
      roleName: "",
      permissionRole: ""
    });

    // const handleShowDots = (id) => {
    //   if (activeRow === id) {
    //     setActiveRow(null);
    //   } else {
    //     setActiveRow(id);
    //   }
    // };

const handleRoleName=(e)=>{
    setRoleNme(e.target.value)
    setErrorForm("")
}
const handlePrev=()=>{
   props.setRoleEdit(false)

}

useEffect(()=>{
    setRoleNme(props.editPage.role_name)
    setEditRolePermission(props.editPage.id)
},[])

const handleEditUserRole =(item)=>{
  setActiveRow(null)
  setEdit(true)
  setEditRolePermission(item.id)
  setRoleNme(item.role_name)  

  setInitialState({ 
    roleName: item.role_name || "",
  });
}
const handleDeleteUserRole=(v)=>{
  setDeleteId(v.id)
  setDeleteRleForm(true)
  setActiveRow(false)
}
const handleCloseRoleDelete=()=>{
  setDeleteRleForm(false)
}
const handleDeleteRole=()=>{
  dispatch({ type: "DELETESETTINGROLEPERMISSION", payload: {id:deleteId}});
  
}
useEffect(()=>{
  if(state.Settings.StatusForDeletePermission === 200){
    handleCloseRoleDelete()
    setRoleNme("")
    setPermissionRole([])
    setCheckboxValues(prevValues => {
        const resetValues = {};
        Object.keys(prevValues).forEach(key => {
          resetValues[key] = prevValues[key].map(() => false);
        });
        return resetValues;
      });
    dispatch({type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id}});
    setTimeout(() => {
      dispatch({ type: "CLEAR_DELETE_SETTING_ROLE" });
    }, 1000);
  }
},[state.Settings.StatusForDeletePermission])
// const saveChanges=()=>{
  
// }
const RolePermission = state.Settings?.editRolePermission?.role_details;
   
    


// useEffect(() => {
//   if (RolePermission) {  

//     const updatedCheckboxValues = { ...checkboxValues };

//     RolePermission.forEach(permission => {
//       if (updatedCheckboxValues[permission.permission_name]) {
//         updatedCheckboxValues[permission.permission_name] = [
//           permission.per_view === 1,
//           permission.per_create === 1,
//           permission.per_edit === 1,
//           permission.per_delete === 1
//         ];
//       }
//     });
  
//     setCheckboxValues(updatedCheckboxValues);


//     setroleinEdit(RolePermission);
//   }
// }, [RolePermission]);

// useEffect(()=>{
//     dispatch({ type: "EDITPERMISSIONROLE", payload: {role_id:rolepermissionId}});
//   },[rolepermissionId])

useEffect(()=>{
  dispatch({ type: "EDITPERMISSIONROLE", payload: {role_id:editRolePermission}});
},[editRolePermission])

const [checkboxValues, setCheckboxValues] = useState({
    Dashboard: [false, false, false, false],
    Announcement: [false, false, false, false],
    Updates: [false, false, false, false],
    PayingGuest: [false, false, false, false],
    Customers: [false, false, false, false],
    Bookings: [false, false, false, false],
    Checkout: [false, false, false, false],
    WalkIn: [false, false, false, false],
    Assets: [false, false, false, false],
    Vendor: [false, false, false, false],
    Bills: [false, false, false, false],
    RecuringBills: [false, false, false, false],
    Electricity: [false, false, false, false],
    Complaints: [false, false, false, false],
    Expenses: [false, false, false, false],
    Reports: [false, false, false, false],
    Bankings: [false, false, false, false],
    Profile: [false, false, false, false],
    Amenities: [false, false, false, false],

  });
  const permissionMapping = {
    Dashboard: 1,
    Announcement: 2,
    Updates: 3,
    PayingGuest: 4,
    Customers: 5,
    Bookings: 6,
    Checkout: 7,
    WalkIn: 8,
    Assets: 9,
    Vendor: 10,
    Bills: 11,
    RecuringBills:12,
    Electricity:13,
    Complaints:14,
    Expenses:15,
    Reports:16,
    Bankings:17,
    Profile:18,
    Amenities:19
  };

  useEffect(() => {
    if (RolePermission) {
      const updatedCheckboxValues = { ...checkboxValues };
  
      RolePermission.forEach((permission) => {
        const permissionName = Object.keys(permissionMapping).find(
          (key) => permissionMapping[key] === permission.permission_id
        );
  
        if (permissionName) {
          updatedCheckboxValues[permissionName] = [
            permission.per_create === 1,
            permission.per_view === 1,
            permission.per_edit === 1,
            permission.per_delete === 1,
          ];
        }
      });
  
      setCheckboxValues(updatedCheckboxValues);
      dispatch({ type: "CLEAR_ADD_SETTING_ROLE"});
      
    }
  }, [RolePermission]);
  

  const handleCheckboxChange = (row, index) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [row]: prevValues[row].map((value, i) => (i === index ? !value : value))
    }));
    setErrorPermission("")
  };
  useEffect(() => {
    if (!checkboxValues || typeof checkboxValues !== 'object') {
        return;
    }

    // Map checkbox values to permissions
    const permissions = Object.entries(checkboxValues).map(([key, values]) => {
        if (!permissionMapping[key]) {
            return null;
        }
        if (!Array.isArray(values)) {
            return null;
        }

        return {
            permission_id: permissionMapping[key],
            per_create: values[0] ? 1 : 0,
            per_view: values[1] ? 1 : 0,
            per_edit: values[2] ? 1 : 0,
            per_delete: values[3] ? 1 : 0,
        };
    }).filter(Boolean); // Filter out any null values in case of errors


    // Update permissionRole only if the permissions have changed
    setPermissionRole(prev => {
        const prevPermissionsString = JSON.stringify(prev);
        const newPermissionsString = JSON.stringify(permissions);
        return prevPermissionsString !== newPermissionsString ? permissions : prev;
    });

    // Update initialState for permissionRole if it's undefined or differs
    setInitialState(prev => ({
        ...prev,
        permissionRole: prev.permissionRole ? prev.permissionRole : permissions,
    }));
}, [checkboxValues, permissionMapping, setInitialState]);

  // useEffect(() => {
  //   if (!checkboxValues || typeof checkboxValues !== 'object') {
  //     return;
  //   }
  
  //   const permissions = Object.entries(checkboxValues).map(([key, values]) => {
  //     if (!permissionMapping[key]) {
  //       return null;
  //     }
  //     if (!Array.isArray(values)) {
  //       return null;
  //     }
      
  //     return {
  //       permission_id: permissionMapping[key],
  //       per_create: values[0] ? 1 : 0,
  //       per_view: values[1] ? 1 : 0,
  //       per_edit: values[2] ? 1 : 0,
  //       per_delete: values[3] ? 1 : 0
  //     };

  //   }).filter(Boolean); // Filter out any null values in case of errors
  
  
  //   // Set permissions only if they differ from the current permissionRole
  //   setPermissionRole(prev => {
  //     const prevPermissionsString = JSON.stringify(prev);
  //     const newPermissionsString = JSON.stringify(permissions);
  //     return prevPermissionsString !== newPermissionsString ? permissions : prev;
  //   });
    
  //   setInitialState({ 
  //     permissionRole: preision || "",
  //   });
    
  // }, [checkboxValues, permissionMapping]); 
  



  // Function to handle form submission
  const handleSubmit = () => {
  
    if (!roleName.trim()) {
        setErrorForm("Role name cannot be empty.");
        return;
    } 
    const hasPermissionSelected = permissionRole.some(permission => 
        permission.per_create !== 0 || permission.per_delete !== 0 || permission.per_edit !== 0 || permission.per_view !== 0
    ); 

    if (!hasPermissionSelected) {
        setErrorPermission("At least one permission must be selected.");
        return;
    }
    const isChanged = !(
      roleName === initialState.roleName &&
      JSON.stringify(permissionRole) === JSON.stringify(initialState.permissionRole)
  );

  if (!isChanged) {
      setErrorForm("No changes detected.");
      return;
  } else {
      setErrorForm("");
  }
    const payload = {
        role_name: roleName,
        permissions: permissionRole,
    };
    if (edit || editRolePermission) {
        dispatch({ type: "EDITSETTINGROLEPERMISSION", payload: { ...payload, id: editRolePermission } });
    } else {
        dispatch({ type: "SETTING_ADD_ROLE_LIST", payload });
    }
};


  useEffect(()=>{
    if(state.Settings.statusCodeForAddRole === 200)
        setRoleNme("")
    setPermissionRole([])
    setCheckboxValues(prevValues => {
        const resetValues = {};
        Object.keys(prevValues).forEach(key => {
          resetValues[key] = prevValues[key].map(() => false);
        });
        return resetValues;
      });
        dispatch({ type: "SETTING_ROLE_LIST" , payload: { hostel_id: state.login.selectedHostel_Id}});
    setTimeout(() => {
      dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
    }, 1000);
  
  },[state.Settings.statusCodeForAddRole])

useEffect(()=>{
  if(state.Settings.StatusForEditPermission === 200){
    setRoleNme("")
    setEdit(false)
    setPermissionRole([])
    // props.setRoleEdit(false)
    setCheckboxValues(prevValues => {
        const resetValues = {};
        Object.keys(prevValues).forEach(key => {
          resetValues[key] = prevValues[key].map(() => false);
        });
        return resetValues;
      });
        dispatch({type: "SETTING_ROLE_LIST", payload: { hostel_id: state.login.selectedHostel_Id}});
        // dispatch({ type: "EDITPERMISSIONROLE", payload: {role_id:editRolePermission}});
    setTimeout(() => {
      dispatch({ type: "CLEAR_EDIT_SETTING_ROLE"});
      dispatch({ type: "CLEAR_EDIT_PERMISSION"});     
    }, 1000);

  }

},[state.Settings.StatusForEditPermission])


  const renderRow = (rowName, label) => (
    <tr key={rowName}>
      <td style={{ paddingLeft: '16px' }}>{label}</td>
      {checkboxValues[rowName].map((checked, index) => (
        <td key={index}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheckboxChange(rowName, index)}
          />
        </td>
      ))}
    </tr>
  );
  // const handleEditClick=()=>{

  // }
// useEffect(()=>{
//     dispatch({ type: 'SETTING_ROLE_LIST' })
// },[])
    return(
      <div className="container mt-4">
      <div className="row">
          
      
      <div className="col-md-5 show-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <div className="row">
      {state.Settings?.getsettingRoleList?.response?.roles.map((u) => (
        <div className="col-12 col-sm-6 mb-3" key={u.id} style={{ position: 'relative' }}>
          <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px' }}>
            <div className="d-flex align-items-center">
              <img src={role} width={24} height={24} alt="Role Icon" />
              <span className="ml-3 font-weight-bold" style={{ fontSize: "16px", fontFamily: 'Gilroy', color: "#222222" }}>
                {u.role_name}
              </span>
            </div>
            <button className="btn p-0  hover:cursor-pointer"  onClick={(e) => handleShowDots(u.id, e)} style={{cursor:"pointer"}}>
              <img src={round} width={34} height={34} alt="Menu Icon" style={{cursor:"pointer"}} />
            </button>
          </div>
          {activeRow === u.id && (
            <>
             <div
              ref={popupRef}
              className="position-absolute"
              style={{
                cursor: "pointer",
                backgroundColor: "#fff",
                top: "40px",
                left: "10px",
                width: 163,
                border: "1px solid #EBEBEB",
                borderRadius: 10,
                display: "flex",
                justifyContent: "start",
                padding: 10,
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div>
                <div
                  className="mb-3 d-flex justify-content-start align-items-center gap-2"
                  onClick={() => handleEditUserRole(u)}
                >
                  <img src={Edit} style={{ height: 16, width: 16 }} />
                  <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222" }}>
                    Edit
                  </label>
                </div>
                <div
             className="mb-2 d-flex justify-content-start align-items-center gap-2"
             style={{ backgroundColor: "#fff" }}
          onClick={()=> handleDeleteUserRole(u)} >
             <img
               src={Delete}
               style={{ height: 16, width: 16 }}
             />{" "}
             <label
               style={{
                 fontSize: 14,
                 fontWeight: 500,
                 fontFamily: "Gilroy,sans-serif",
                 color: "#FF0000",
                 cursor: "pointer",
               }}
             >
               Delete
             </label>
           </div>
              </div>
            </div>
          
            </>
           
            
          )}
        </div>
      ))}
      <div className="col-12 col-sm-6 mb-3">
        <div className="d-flex align-items-center justify-content-between p-3 rounded" style={{ height: '64px', backgroundColor: "#E7F1FF" }}>
          <div className="d-flex align-items-center">
            <img src={rolecircle} width={24} height={24} alt="Create Icon" />
            <span className="ml-3 font-weight-bold" style={{ fontSize: "16px", fontFamily: 'Gilroy', color: "#222222" }}>
              Create New
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Middle Divider Line */}
  <div className="col-md-1 d-none d-md-flex justify-content-center">
    <div className="border-left" style={{ height: '100%', borderLeft: '1px solid #E7F1FF' }}></div>
  </div>
  
          <div className="col-md-6" style={{marginTop:"-5px"}}>
          {errorForm && (
                                    <div style={{ color: "red" }}>
                                      {" "}
                                      <MdError
                                        style={{ width: 20, height: 20 }}
                                      />
                                      {errorForm}
                                    </div>
                                  )}
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Role Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Enter role"
                        type="text"
                        value={roleName}
                        onChange={(e) => handleRoleName(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                    {/* {firstnameError && (
                      <div style={{ color: "red" }}>
                        {" "}
                        <MdError style={{ width: 20, height: 20 }} />
                        {firstnameError}
                      </div>
                    )} */}
                  </div>
             
                  
                     
                  {errorPermission && (
                                    <div style={{ color: "red" }}>
                                      {" "}
                                      <MdError
                                        style={{ width: 20, height: 20 }}
                                      />
                                      {errorPermission}
                                    </div>
                                  )}
                      {/* Scrollable Permissions Table */}
                      <div className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto', border: "1px solid #DCDCDC", borderRadius: "16px" }}>
                      <table className="table mb-0">
                      <thead style={{ backgroundColor: "#E7F1FF",
                       position:"sticky",
                       top:0,
                       zIndex:1,

                       }}>
          <tr >
              <th style={{ paddingLeft: '16px',fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#4B4B4B" }}>Permission</th>
              <th style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#4B4B4B"}}>Add</th>
              <th style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#4B4B4B"}}>Read</th>
              <th style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#4B4B4B"}}>Edit</th>
              <th style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#4B4B4B"}}>Delete</th>
          </tr>
      </thead>
      <tbody>
        {renderRow('Dashboard', 'Dashboard')}
        {renderRow('Announcement', 'Announcement')}
        {renderRow('Updates', 'Updates')}
        {renderRow('PayingGuest', 'PayingGuest')}
        {renderRow('Customers', 'Customers')}
        {renderRow('Bookings', 'Bookings')}
        {renderRow('Checkout', 'Checkout')}
        {renderRow('WalkIn', 'WalkIn')}
        {renderRow('Assets', 'Assets')}
        {renderRow('Vendor', 'Vendor')}
        {renderRow('Bills', 'Bills')}
        {renderRow('RecuringBills', 'RecuringBills')}
        {renderRow('Electricity', 'Electricity')}
        {renderRow('Complaints', 'Complaints')}
        {renderRow('Expenses', 'Expenses')}
        {renderRow('Reports', 'Reports')}
        {renderRow('Bankings', 'Bankings')}
        {renderRow('Profile', 'Profile')}
        {renderRow('Amenities', 'Amenities')}
        
      </tbody>
    </table>
</div>

  
                    
               
              <div className="d-flex justify-content-between mt-3">
                          <button className="btn" style={{ border: "1px solid #1E45E1",color:"#1E45E1"}} onClick={handlePrev}>Previous</button>
                          <button className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                      </div>
          </div>
      </div>


      <Modal
      show={deleteRleForm}
      onHide={() => handleCloseRoleDelete()}
      centered
      backdrop="static"
      style={{
        width: 388,
        height: 250,
        marginLeft: "500px",
        marginTop: "200px",
      }}
    >
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title
          style={{
            fontSize: "18px",
            fontFamily: "Gilroy",
            textAlign: "center",
            fontWeight: 600,
            color: "#222222",
            flex: 1,
          }}
        >
          Delete Role?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Gilroy",
          color: "#646464",
          textAlign: "center",
          marginTop: "-20px",
        }}
      >
        Are you sure you want to delete this Role?
      </Modal.Body>

      <Modal.Footer
        style={{
          justifyContent: "center",
          borderTop: "none",
          marginTop: "-10px",
        }}
      >
        <Button
          style={{
            width: 160,
            height: 52,
            borderRadius: 8,
            padding: "12px 20px",
            background: "#fff",
            color: "#1E45E1",
            border: "1px solid #1E45E1",
            fontWeight: 600,
            fontFamily: "Gilroy",
            fontSize: "14px",
            marginRight: 10,
          }}
          onClick={handleCloseRoleDelete}
        >
          Cancel
        </Button>
        <Button
          style={{
            width: 160,
            height: 52,
            borderRadius: 8,
            padding: "12px 20px",
            background: "#1E45E1",
            color: "#FFFFFF",
            fontWeight: 600,
            fontFamily: "Gilroy",
            fontSize: "14px",
          }}
          onClick={handleDeleteRole}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>


  </div>
    
    
    
    
    
    
    
      
    )
}

RolesDesign.propTypes = {
  setRoleEdit: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired
};
export default RolesDesign;