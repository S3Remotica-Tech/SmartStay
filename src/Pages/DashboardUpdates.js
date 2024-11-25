import React from "react";
import { MdError } from "react-icons/md";
import Emptystate from '../Assets/Images/Empty-State.jpg'


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
            <div>DashboardUpdates</div>
        }
       
        </>
    )
}
export default DashboardUpdates;