import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup, Pagination } from "react-bootstrap";
import { MdError } from "react-icons/md";

function UserAdditionalContact(props){
const state = useSelector((state) => state);
  console.log("UserAdditionalContact...",state)
  const dispatch = useDispatch();

  const [userName,setUserName] = useState("")
  const [guardian,setGuardian] = useState("")
  const [Phone,setPhone] = useState("")
  const [address,setAddress]= useState("")
   const [phoneError, setPhoneError] = useState("");
    const [countryCode, setCountryCode] = useState("91");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [userId,setUserId]=useState("")

    const MobileNumber = `${countryCode}${Phone}`;

console.log("props.contactList",props.id)




useEffect(() => {
    dispatch({ type: "COUNTRYLIST" });
  }, []);

const handleUserName=(e)=>{
  setUserName(e.target.value)
}
const handleGuardian=(e)=>{
setGuardian(e.target.value)
}
const handleAddress=(e)=>{
  setAddress(e.target.value)
  }

const handleSubmitContact=()=>{
  console.log("/////duhufurigr")
  dispatch({
    type: 'CUSTOMERADDCONTACT', payload: {
      user_name:userName,
      guardian:guardian,
      mob_no:MobileNumber,
      address:address,
      user_id:props.id
    }
  })
}


// useEffect(()=>{
// if(state.UsersList.statusCodeForCustomerCoatact === 200){
//   handleCloseAdditionalForm()
//   dispatch({ type: "CUSTOMERALLDETAILS",payload:{user_id:props.id} });


// setTimeout(() => {
//   dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT"});
// }, 200);

// }
// },[state.UsersList.statusCodeForCustomerCoatact])


const handleCountryCodeChange = (e) => {
  setCountryCode(e.target.value);
};

const handlePhone = (e) => {
  setPhone(e.target.value);
  const pattern = /^\d{1,10}$/;
  const isValidMobileNo = pattern.test(e.target.value);

  if (isValidMobileNo && e.target.value.length === 10) {
    setPhoneError("");
  } else {
    setPhoneError("Invalid mobile number *");
  }
  setPhoneErrorMessage("");
  // dispatch({ type: "CLEAR_PHONE_ERROR" });
};

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
onChange={(e)=>handleUserName(e)}
value={userName}
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
onChange={(e)=>handleGuardian(e)}
value={guardian}
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
<Form.Group  controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Mobile number{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>

                      <InputGroup>
                        <Form.Select
                          value={countryCode}
                          id="vendor-select-pg"
                          onChange={handleCountryCodeChange}
                          style={{
                            border: "1px solid #D9D9D9",

                            borderRadius: "8px 0 0 8px",
                            height: 50,
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: countryCode ? 600 : 500,
                            boxShadow: "none",
                            backgroundColor: "#fff",
                            maxWidth: 90,
                            paddingRight: 10,
                          }}
                        >
                          {state.UsersList?.countrycode?.country_codes?.map(
                            (item) => {
                              return (
                                console.log(
                                  "item.country_flag",
                                  item.country_flag
                                ),
                                (
                                  <>
                                    <option value={item.country_code}>
                                      +{item.country_code}
                                    </option>
                                  </>
                                )
                              );
                            }
                          )}
                        </Form.Select>
                        <Form.Control
                          value={Phone}
                          onChange={handlePhone}
                          type="text"
                          placeholder="9876543210"
                          maxLength={10}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: Phone ? 600 : 500,
                            boxShadow: "none",
                            borderLeft: "unset",
                            borderRight: "1px solid #D9D9D9",
                            borderTop: "1px solid #D9D9D9",
                            borderBottom: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: "0 8px 8px 0",
                          }}
                        />
                      </InputGroup>
                      <p
                        id="MobileNumberError"
                        style={{ color: "red", fontSize: 11, marginTop: 5 }}
                      ></p>
                      {phoneError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phoneError}
                        </div>
                      )}
                      {/* {phonenumError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phonenumError}
                        </div>
                      )} */}
                      {/* {phoneErrorMessage && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phoneErrorMessage}
                        </div>
                      )} */}
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
placeholder="Enter amount"
onChange={(e)=>handleAddress(e)}
value={address}
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
               onClick={handleSubmitContact}
             >
             Add Contact
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