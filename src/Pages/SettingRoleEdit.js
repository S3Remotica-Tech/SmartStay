import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import role from "../Assets/Images/New_images/security-user.png"
import "./Settings.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import {Button, Offcanvas,Form,FormControl,FormSelect,} from "react-bootstrap";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";

function RolesDesign(props){
    const state = useSelector(state => state)
    console.log("RolesDesign",state)
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const [roleName,setRoleNme]=useState('')
    const[permissionRole,setPermissionRole]=useState([])
    const [activeRow, setActiveRow] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [editRolePermission,setEditRolePermission] =useState("")
    const [roleinEdit,setroleinEdit] = useState("")
    const [rolepermissionId,setEditRolePermissionId]=useState("")
    console.log("roleinEdit...?",roleinEdit);
    const [edit,setEdit]=useState(false)
    

    const handleShowDots = (id, e) => {
      if (activeRow === id) {
        setActiveRow(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        setPopupPosition({
          top: rect.top + window.scrollY + 40, // Adjust this offset as needed
          left: rect.left + window.scrollX + 10, // Adjust this offset as needed
        });
        setActiveRow(id);
      }
    };

    // const handleShowDots = (id) => {
    //   if (activeRow === id) {
    //     setActiveRow(null);
    //   } else {
    //     setActiveRow(id);
    //   }
    // };

const handleRoleName=(e)=>{
    setRoleNme(e.target.value)
}
const handlePrev=()=>{
   props.setRoleEdit(false)

}
console.log("editPage",props.editPage)

useEffect(()=>{
    setRoleNme(props.editPage.role_name)
    setEditRolePermission(props.editPage.id)
},[])

const handleEditUserRole =(item)=>{
  setActiveRow(null)
  console.log("handleEditUserRole",item)
  setEdit(true)
  setEditRolePermission(item.id)
  setRoleNme(item.role_name)
 
  
   
}
// const saveChanges=()=>{
  
// }
const RolePermission = state.Settings?.editRolePermission?.role_details;
    console.log("RolePermission updated:", RolePermission);


// useEffect(() => {
//   if (RolePermission) {  
//     console.log("RolePermission updated:", RolePermission);

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
    Profile:18
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
  };
  useEffect(() => {
    if (!checkboxValues || typeof checkboxValues !== 'object') {
      console.error("checkboxValues is undefined or not an object:", checkboxValues);
      return;
    }
  
    const permissions = Object.entries(checkboxValues).map(([key, values]) => {
      if (!permissionMapping[key]) {
        console.error(`Permission mapping for key "${key}" is missing.`);
        return null;
      }
      if (!Array.isArray(values)) {
        console.error(`Values for key "${key}" are not an array:`, values);
        return null;
      }
      
      return {
        permission_id: permissionMapping[key],
        per_create: values[0] ? 1 : 0,
        per_view: values[1] ? 1 : 0,
        per_edit: values[2] ? 1 : 0,
        per_delete: values[3] ? 1 : 0
      };
    }).filter(Boolean); // Filter out any null values in case of errors
  
    console.log(JSON.stringify(permissions, null, 4));
  
    // Set permissions only if they differ from the current permissionRole
    setPermissionRole(prev => {
      const prevPermissionsString = JSON.stringify(prev);
      const newPermissionsString = JSON.stringify(permissions);
      return prevPermissionsString !== newPermissionsString ? permissions : prev;
    });
    
    
  }, [checkboxValues, permissionMapping]); // Add dependencies here
  

  console.log('Checkbox values:', permissionRole);


  // Function to handle form submission
  const handleSubmit = () => {
    // e.preventDefault();
    if(edit || editRolePermission){
      dispatch({ type: "EDITSETTINGROLEPERMISSION", payload: {role_name:roleName,permissions:permissionRole,id:editRolePermission}});
    }
    else{
      dispatch({ type: "SETTING_ADD_ROLE_LIST", payload: {role_name:roleName,permissions:permissionRole}});
    }
   
    
    // Send checkboxValues to your backend or API
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
        dispatch({ type: "SETTING_ROLE_LIST" });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ADD_SETTING_ROLE" });
    }, 1000);
  
  },[state.Settings.statusCodeForAddRole])

useEffect(()=>{
  if(state.Settings.StatusForEditPermission === 200){
    setRoleNme("")
    setEdit(false)
    setPermissionRole([])
    props.setRoleEdit("")
    setCheckboxValues(prevValues => {
        const resetValues = {};
        Object.keys(prevValues).forEach(key => {
          resetValues[key] = prevValues[key].map(() => false);
        });
        return resetValues;
      });
        dispatch({type: "SETTING_ROLE_LIST"});
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
              <button className="btn p-0" onClick={(e) => handleShowDots(u.id, e)}>
                <img src={round} width={34} height={34} alt="Menu Icon" />
              </button>
            </div>
            {activeRow === u.id && (
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
                </div>
              </div>
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
               
                    
                       
    
                        {/* Scrollable Permissions Table */}
                        <div className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto', border: "1px solid #DCDCDC", borderRadius: "16px" }}>
                        <table className="table mb-0">
                        <thead style={{ backgroundColor: "#E7F1FF" }}>
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
          
        </tbody>
      </table>
</div>

    
                      
                 
                <div className="d-flex justify-content-between mt-3">
                            <button className="btn" style={{ border: "1px solid #1E45E1",color:"#1E45E1"}} onClick={handlePrev}>Previous</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    
      
    )
}
export default RolesDesign;