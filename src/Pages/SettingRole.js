import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import role from "../Assets/Images/New_images/security-user.png"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import RolesDesign from "./SettingDesign";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import SettingRoleEdit from './SettingRoleEdit';



function RolePage(){
  const state = useSelector(state => state)
console.log("RolePage",state)
const dispatch = useDispatch();
const popupRef = useRef(null);


 const [rolePage,setRolePage] = useState(false)
 const [activeRow, setActiveRow] = useState(null);
 const [RoleEdit,setRoleEdit] =useState(false)
 const[editPage,setEditPage] = useState("")
 const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


 const handleShowDots = (id, e) => {
  if (activeRow === id) {
    setActiveRow(null);
  } else {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY + 30,
      left: rect.left + window.scrollX - 120,
    });
    setActiveRow(id);
  }
};
const handleEditUserRole =(item)=>{
  console.log("item...?",item)
  setEditPage(item)
  setRoleEdit(true)
  setActiveRow(null)
}

 useEffect(()=>{
  dispatch({ type: 'SETTING_ROLE_LIST' })
},[])

    const handleCreateNew=()=>{
        setRolePage(true)
    }
    return(
<>
      {RoleEdit == true ? (
        <SettingRoleEdit setRoleEdit={setRoleEdit} editPage={editPage} />
               ):
               
               
               
               <>
               {rolePage == true ? (
         <RolesDesign rolePage={rolePage} setRolePage={setRolePage} />
               ): <div className="container">
               <div className="row">
                 {/* Role Card */}
                 {
                   state.Settings?.getsettingRoleList?.response?.roles.map((u)=>{
         return(
           <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                   <div
                     className="d-flex align-items-center justify-content-between p-3 border rounded"
                     style={{ height: 64, width: "100%" }}
                   >
                     <div className="d-flex align-items-center">
                       <img src={role} width={24} height={24} alt="Role Icon" />
                       <span
                         style={{
                           marginLeft: 20,
                           fontSize: 16,
                           fontWeight: 600,
                           fontFamily: "Gilroy",
                           color: "#222222",
                         }}
                       >
                       {u.role_name}
                       </span>
                     </div>
                     <button className="btn p-0">
                       <img src={round} width={34} height={34} alt="Menu Icon" onClick={(e) => handleShowDots(u.id, e)}/>
                     </button>
                   </div>
                   
                   {activeRow === u.id && (
                       <div
                         ref={popupRef}
                         className="position-absolute"
                         style={{
                           cursor: "pointer",
                           backgroundColor: "#fff",
                           top: popupPosition.top,
                           left: popupPosition.left,
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
                 
         )
                   })
                 }
                 
         
                 {/* Create New Card */}
                 <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                   <div
                     className="d-flex align-items-center justify-content-between p-3 rounded"
                     style={{
                       backgroundColor: "#E7F1FF",
                       height: 64,
                       width: "100%",
                       border: "none",
                     }}
                   >
                     <div className="d-flex align-items-center" onClick={handleCreateNew}>
                       <img src={rolecircle} width={24} height={24} alt="Create Icon" />
                       <span
                         style={{
                           marginLeft: 20,
                           fontSize: 16,
                           fontWeight: 600,
                           fontFamily: "Gilroy",
                           color: "#222222",
                         }}
                       >
                         Create New
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>}
         
         
         
             
         
               </>
              }
              </>


    
      
    )
}
export default RolePage;