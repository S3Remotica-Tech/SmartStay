import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { Label } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';




function Checkout() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state for checkout", state)

  const [selectedUserId, setSelectedUserId] = useState('')


  useEffect(() => {
    const LoginId = localStorage.getItem("loginId")
    if (LoginId) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedIdString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedIdString);
        dispatch({ type: 'USERLIST', payload: { loginId: parsedData } })
      }
      catch (error) {
        console.log("Error decrypting loginid", error);
      }
    }

  }, [])

  const [usersId, setUsersId] = useState([])
  const [UserDetails, setUserDetails] = useState('')
  const [CheckOutDate, setCheckOutDate]  = useState('')
  const [isActive, setIsActive] = useState('')



console.log("usersId *&*",usersId)

const handleDateChange = (e) =>{
  setCheckOutDate(e.target.value)
}

const handleStatusChange = (e) => {
  setIsActive(e.target.value)
}


  useEffect(() => {
    if (state.UsersList?.UserListStatusCode == 200) {
           const uniqueOptions = Array.from(new Set(state.UsersList?.Users.map((item) => item.User_Id)));
       console.log("uniqueOptions",uniqueOptions)
           setUsersId(uniqueOptions);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_USER' })
      }, 1000)
    }

  }, [state.UsersList.UserListStatusCode])

  


  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users.filter(item => {
        console.log("item.User_Id", item.User_Id)
        console.log("selectedUserId", selectedUserId)
        return item.User_Id == selectedUserId
      }
      )
      

      setUserDetails(filteredDetails)
      console.log("fill", filteredDetails);
    }
  }, [selectedUserId])


  const handleCheckoutChange = (event,newValue) => {
    setSelectedUserId(newValue);
  };



const handleSaveCheckOut = () =>{
  dispatch({ type: 'CHECKOUTUSER', payload: { User_Id : selectedUserId, isActive : isActive ,CheckOutDate: CheckOutDate }})
} 

  return (
    <>
      <div style={{ width: "100%" }} className="p-5">
        <h4>User CheckOut</h4>
        <div className='row p-2' style={{ backgroundColor: "" }} >
          <div className='col-lg-10 pb-5 ps-5 pe-5 pt-4' style={{ backgroundColor: "#F8F9FA", height: "auto" }}>
            <div className="row pb-3 d-flex align-items-center">
              <div className="col-lg-6 col-xs-6 col-sm-6 col-6 " style={{backgroundColor:""}}>
                <div className='mb-3 '>
                  <Form.Label style={{ fontSize: "14px", marginBottom: 5, fontWeight: 600 }}>Select User ID</Form.Label>
                 
                 
                  <Autocomplete
                    value={selectedUserId}
                    onChange={handleCheckoutChange}
                    // onInputChange={handleInputChange}
                         id="free-solo-dialog-demo"
                    options={usersId}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option}
                      </li>
                    )}

                    style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa", width: '97%', marginLeft: '1%' }}
                    sx={{ width: 300 }}

                    renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, placeholder: 'Enter or Select UserId' }} />}
                  />



                </div>



              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6 col-6 d-flex justify-content-end">
                <button type="button"  onClick = {handleSaveCheckOut} className="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} >Save change</button>

              </div>

            </div>
            {UserDetails && UserDetails.map((view) =>

            <Card style={{ border: "none" }} className="p-2">
                <Card.Body>
                  <div>
                    <h5 className="mb-4">{view.HostelName}</h5>
                  </div>
                  <div className="mb-3">
                    <label  style={{fontSize:14}}>User :  </label> 
                    <Badge  bg="light" text="dark" className="ms-2 p-2 me-2">
                      <span classNameName="ps-2 pe-2">{view.Name}</span> 
                      </Badge>
                      <span style={{borderLeft:' 1px solid lightgray', paddingLeft: "5px", paddingRight:" 3px"}}></span> 
                    
                      <Badge  bg="light" text="dark" className="ms-2 p-2 me-2">
                      <span  className="ps-2 pe-2">{view.Email}</span> 
                      </Badge> 
                       <span  style={{borderLeft:' 1px solid lightgray', paddingLeft: "5px", paddingRight:" 3px"}}></span>
                       <Badge  bg="light" text="dark" className="ms-2 p-2">
                       <span>{view.Phone}</span>
                       </Badge>
                      
                  </div>
                  <div className="mb-3">
                    <span  style={{fontSize:14}} className="mb-2">Booking Date:</span>
                    <Badge  bg="light" text="dark" className="ms-3 p-2">
                      <span style={{fontSize:14,padding:5}}>{moment(view.createdAt).format('DD/MM/YYYY')}</span>
                    </Badge>
                  </div>

                  <div className="mb-3" >
                    <label style={{fontSize:14}}>Price:</label>
                    <Badge  bg="light" text="dark" className="ms-3 p-2">
                    <span style={{fontSize:14,padding:5}}>{view.RoomRent}</span>
                    </Badge>
                  </div>

                  <div className="mb-3 row" > 
                <div className="col-md-5 d-flex col-xs-12 col-sm-12 d-flex align-items-center justify-content-start">
                <div>
                 <label   style={{fontSize:14}} className="mb-2">Checkout Date:</label>
                  </div> 
                  <div>
                  <Form.Control type="date" placeholder="Select check date" style={{fontWeight:700}} value={CheckOutDate} onChange={handleDateChange} className="w-100 ms-3"/>
                  </div>
                </div>
                 
                                               
                 
<div className="col-md-6 col-xs-12 col-sm-12 d-flex align-items-center justify-content-start">
  <div>
  <label   style={{fontSize:14}} className="mb-2">Status:</label>
  </div>
<div>
<Form.Select aria-label="Default select example" style={{fontSize:14, fontWeight:700}} value={isActive} onChange={handleStatusChange}>
<option>Selected Type</option>
<option value="1">CheckIn</option>
<option value="0">CheckOut</option>
    </Form.Select>
</div>

</div>
</div>          

</Card.Body>
            
            </Card>
              )}
          </div>
        </div>
      </div>

    </>
  )
}

export default Checkout