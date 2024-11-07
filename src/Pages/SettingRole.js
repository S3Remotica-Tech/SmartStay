import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import role from "../Assets/Images/New_images/security-user.png"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import RolesDesign from "./SettingDesign";



function RolePage(){
  const state = useSelector(state => state)
console.log("RolePage",state)
const dispatch = useDispatch();


 const [rolePage,setRolePage] = useState(false)

 useEffect(()=>{
  dispatch({ type: 'SETTING_ROLE_LIST' })
},[])

    const handleCreateNew=()=>{
        setRolePage(true)
    }
    return(
    <>
      {rolePage == true ? (
<RolesDesign rolePage={rolePage} setRolePage={setRolePage}/>
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
              <img src={round} width={34} height={34} alt="Menu Icon" />
            </button>
          </div>
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

    )
}
export default RolePage;