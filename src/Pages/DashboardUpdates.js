import React from "react";
import { MdError } from "react-icons/md";
import Emptystate from '../Assets/Images/Empty-State.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Pages/Dashboard.css";


function DashboardUpdates(props){
    return(
        <>

        {
            props.updatePermissionError ? (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
  {/* Image */}
  <img src={Emptystate} alt="Empty State" style={{ maxWidth: "100%", height: "auto" }} />

  {/* Permission Error */}
  {props.updatePermissionError && (
    <div style={{ color: "red", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
      <MdError size={20} />
      <span>{props.updatePermissionError}</span>
    </div>
  )}
</div>
            ):
            <div className="dashfirst" >
         <div style={{flex:1}}>
           
    
      <div class="border rounded-4 p-4 text-start shadow-sm" style={{height:190}}>
        <div class="text-primary mb-3">
          <i class="bi bi-house-door-fill fs-3"></i>
        </div>
        <h6 class="text-muted">Total Room</h6>
        <h4 class="mb-0">50</h4>
      </div>
    
         </div>
         <div className="spacedash" style={{flex:1}}>
         <div class="d-flex flex-column gap-3 dashthree">
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">8</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Free Bed</h6>
          <h4 class="mb-0">9</h4>
        </div>
      </div>
         </div>
         <div className="spacedash" style={{flex:3}}>
           
<div className="dashtwo" style={{backgroundColor:"#E0ECFF"}}>
<div class="d-flex flex-column gap-3 dashfour" style={{flex:1,padding:5}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">10</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Free Bed</h6>
          <h4 class="mb-0">18</h4>
        </div>
      </div>
      <div class="d-flex flex-column gap-3 dashfive" style={{flex:1,padding:5}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">1</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Free Bed</h6>
          <h4 class="mb-0">2</h4>
        </div>
      </div>
      <div class="d-flex flex-column gap-3 " style={{flex:1,paddingTop:5,paddingBottom:10,paddingRight:16,paddingLeft:16}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm" style={{height:190}}>
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">1</h4>
        </div>
        </div>
     
</div>



     
         </div>
          </div>



          
        }
       
        </>
    )
}
export default DashboardUpdates;






