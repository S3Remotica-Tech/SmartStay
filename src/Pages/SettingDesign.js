import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import role from "../Assets/Images/New_images/security-user.png"
import "./Settings.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"
import {Button, Offcanvas,Form,FormControl,FormSelect,} from "react-bootstrap";

function RolesDesign(props){
    const state = useSelector(state => state)
    console.log("RolesDesign",state)
    const dispatch = useDispatch();


const handlePrev=()=>{
   props.setRolePage(false)

}
// useEffect(()=>{
//     dispatch({ type: 'SETTING_ROLE_LIST' })
// },[])
    return(
        <div className="container mt-4">
        <div className="row">
            
        
            <div className="col-md-5 show-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="row">
                    {
                        state.Settings?.getsettingRoleList?.response?.roles.map((u)=>{
return(
    <div className="col-12 col-sm-6 col-md-6 mb-3">
    <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px' }}>
        <div className="d-flex align-items-center">
            <img src={role} width={24} height={24} alt="Role Icon" />
            <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
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
                   
                    
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px',backgroundColor: "#E7F1FF",border:"none" }}>
                            <div className="d-flex align-items-center">
                            <img src={rolecircle} width={24} height={24} alt="Create Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Create New
                                </span>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
    
            
            <div className="col-md-1 d-flex justify-content-center">
                <div style={{ borderLeft: '1px solid #E7F1FF', height: 'auto', marginLeft: "-50px" }}></div>
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
                        //   value={firstname}
                        //   onChange={(e) => handleFirstName(e)}
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
            <tr>
                <td style={{ paddingLeft: '16px' }}>Customer Reading</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>AnnounceMent</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Updates</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>All Customer</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Booking</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Checkout</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>walkon</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Assets</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Vendor</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Bill</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Recurring Bills</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            <tr>
                <td style={{ paddingLeft: '16px' }}>Customer Reading</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
            {/* Add more rows as needed */}
        </tbody>
    </table>
</div>

    
                      
                 
                <div className="d-flex justify-content-between mt-3">
                            <button className="btn" style={{ border: "1px solid #1E45E1",color:"#1E45E1"}} onClick={handlePrev}>Previous</button>
                            <button className="btn btn-primary">Save changes</button>
                        </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    
      
    )
}
export default RolesDesign;