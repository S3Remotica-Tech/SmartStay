import React, { useEffect, useState } from 'react'
import role from "../Assets/Images/New_images/security-user.png"
import "./Settings.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import rolecircle from "../Assets/Images/New_images/role_circle.png"

function RolesDesign(props){
const handlePrev=()=>{
   props.setRolePage(false)
}
    return(
        <div className="container mt-4">
        <div className="row">
            
            {/* Left Side - Scrollable Role Cards */}
            <div className="col-md-5 show-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="row">
                    {/* Repeat each role card here */}
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200 }}>
                            <div className="d-flex align-items-center">
                                <img src={role} width={24} height={24} alt="Role Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Role 1
                                </span>
                            </div>
                            <button className="btn p-0">
                                <img src={round} width={34} height={34} alt="Menu Icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mb-3">
                        <div className="d-flex align-items-center justify-content-between p-3 border rounded" style={{ height: '64px', width: 200,backgroundColor: "#E7F1FF",border:"none" }}>
                            <div className="d-flex align-items-center">
                            <img src={rolecircle} width={24} height={24} alt="Create Icon" />
                                <span style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, fontFamily: 'Gilroy', color: "#222222" }}>
                                    Create New
                                </span>
                            </div>
                           
                        </div>
                    </div>
                
                    {/* Add more role cards as necessary */}
                </div>
            </div>
    
            {/* Vertical Divider */}
            <div className="col-md-1 d-flex justify-content-center">
                <div style={{ borderLeft: '1px solid #E7F1FF', height: 'auto', marginLeft: "-50px" }}></div>
            </div>
    
            {/* Right Side - Role Permissions */}
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="roleName">Role Name</label>
                            <input type="text" className="form-control" id="roleName" placeholder="Select a paying guest" />
                        </div>
    
                        {/* Scrollable Permissions Table */}
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Permission</th>
                                        <th>Read</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Customer Reading</td>
                                        <td><input type="checkbox" /></td>
                                        <td><input type="checkbox" /></td>
                                        <td><input type="checkbox" /></td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
    
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-secondary">Previous</button>
                            <button className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    
      
    )
}
export default RolesDesign;