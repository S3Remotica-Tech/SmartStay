import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import "./UserList.css";

function UserAdditionalContact(props){
    const handleCloseAdditionalForm=()=>{
        props.setAdditionalForm(false)
    }
    
    return(
        <div>
        <Modal
   show={props.additionalForm}
   onHide={handleCloseAdditionalForm}
   backdrop="static"
   centered


 >
   <Modal.Dialog
     style={{
       maxWidth: "666px",
      
       paddingRight: "10px",
      
       borderRadius: "30px",
     }}
     className="m-0 p-0"
   >
     <Modal.Body>
       <div className="d-flex align-items-center">
         
           <div className="container">
             <div className="row mb-3"></div>

             <Modal.Header
               style={{ marginBottom: "30px", position: "relative" }}
             >
               <div
                 style={{
                   fontSize: 20,
                   fontWeight: 600,
                   fontFamily: "Gilroy",
                 }}
               >
                + Add Contact
               </div>
               <button
                 type="button"
                 className="close"
                 aria-label="Close"
                 onClick={handleCloseAdditionalForm}
                 style={{
                   position: "absolute",
                   right: "10px",
                   top: "16px",
                   border: "1px solid black",
                   background: "transparent",
                   cursor: "pointer",
                   padding: "0",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   width: "32px",
                   height: "32px",
                   borderRadius: "50%",
                 }}
               >
                 <span
                   aria-hidden="true"
                   style={{
                     fontSize: "30px",
                     paddingBottom: "6px",
                   }}
                 >
                   &times;
                 </span>
               </button>
             </Modal.Header>

             <div className="row mb-3">
               
             <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <Form.Group className="mb-3">
<Form.Label
style={{
 fontSize: 14,
 fontWeight: 500,
 fontFamily: "Gilroy",
 display: "flex",
 alignItems: "center",

}}
>
first Name

</Form.Label>
<FormControl
type="text"
id="form-controls"
placeholder="Enter name"
style={{
 fontSize: 16,
 color: "#4B4B4B",
 fontFamily: "Gilroy",
 fontWeight: 500,
 boxShadow: "none",
 border: "1px solid #D9D9D9",
 height: 50,
 borderRadius: 8,
 marginTop: 8,
}}
/>
</Form.Group>
</div>

<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <Form.Group className="mb-3">
<Form.Label
style={{
 fontSize: 14,
 fontWeight: 500,
 fontFamily: "Gilroy",
 display: "flex",
 alignItems: "center",

}}
>
Guardian

</Form.Label>
<FormControl
type="text"
id="form-controls"
placeholder="Enter name"
style={{
 fontSize: 16,
 color: "#4B4B4B",
 fontFamily: "Gilroy",
 fontWeight: 500,
 boxShadow: "none",
 border: "1px solid #D9D9D9",
 height: 50,
 borderRadius: 8,
 marginTop: 8,
}}
/>
</Form.Group>
</div>


               
<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <Form.Group className="mb-3">
<Form.Label
style={{
 fontSize: 14,
 fontWeight: 500,
 fontFamily: "Gilroy",
 display: "flex",
 alignItems: "center",

}}
>
Mobile Number

</Form.Label>
<FormControl
type="text"
id="form-controls"
placeholder="Enter amount"
style={{
 fontSize: 16,
 color: "#4B4B4B",
 fontFamily: "Gilroy",
 fontWeight: 500,
 boxShadow: "none",
 border: "1px solid #D9D9D9",
 height: 50,
 borderRadius: 8,
 marginTop: 8,
}}
/>
</Form.Group>
</div>

<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <Form.Group className="mb-3">
<Form.Label
style={{
 fontSize: 14,
 fontWeight: 500,
 fontFamily: "Gilroy",
 display: "flex",
 alignItems: "center",

}}
>
Address

</Form.Label>
<FormControl
type="text"
id="form-controls"
placeholder="Enter address"
style={{
 fontSize: 16,
 color: "#4B4B4B",
 fontFamily: "Gilroy",
 fontWeight: 500,
 boxShadow: "none",
 border: "1px solid #D9D9D9",
 height: 50,
 borderRadius: 8,
 marginTop: 8,
}}
/>
</Form.Group>
</div>
             </div>

             <Button
               className="w-100"
               style={{
                 backgroundColor: "#1E45E1",
                 fontWeight: 600,
                 height: 50,
                 borderRadius: 12,
                 fontSize: 16,
                 fontFamily: "Montserrat",
               }}
               // onClick={handleSaveUserlistAddUser}
             >
             Submit
             </Button>
           </div>
         {/* )} */}
       </div>
     </Modal.Body>

     <Modal.Footer style={{ border: "none" }}></Modal.Footer>
   </Modal.Dialog>
 </Modal>
   </div>
    )
}
export default UserAdditionalContact;