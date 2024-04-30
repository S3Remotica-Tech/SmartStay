import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import "../Pages/UserList.css";
import Plus from '../Assets/Images/Create-button.png';
import Profile from '../Assets/Images/Profile.jpg';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

function UserlistForm(props) {
  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
      };

  const bottomBorderStyles = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    };





  const [id, setId] = useState('')
  const [file, setFile] = useState(null)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [Phone, setPhone] = useState('')
  const [hostel_Id, setHostel_Id] = useState('')
  const [HostelName, setHostelName] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [Bed, setBed] = useState('')
  const [RoomRent, setRoomRent] = useState('')
  const [BalanceDue, setBalanceDue] = useState('')
  const [PaymentType, setPaymentType] = useState('')
  const [AdvanceAmount, setAdvanceAmount] = useState('')
  const [Address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
const [isActive, setIsActive] = useState('')
  const [AadharNo, setAadharNo] = useState('')
  const [PancardNo, setPancardNo] = useState('')
  const [licence, setLicence] = useState('')
  const [bedArray, setBedArray] = useState('');
  const [Arrayset, setArrayset] = useState([])
  const [Bednum, setBednum] = useState(null)
  const [romnum, setRoomnum] = useState('')





  const state = useSelector(state => state)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'USERLIST' })
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])

  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: hostel_Id } })
  }, [hostel_Id]);
  useEffect(() => {
    const temparry = state.UsersList.roomdetails.filter((item) => item.Room_Id == Rooms);
    setBedArray(temparry);

    const temp2 = state.UsersList.Users.filter((item) => {
      return item.Rooms == Rooms && item.Floor == Floor && item.Hostel_Id == hostel_Id;
    });

    const arrayToDisplay = [];
    for (let i = 0; i < temparry[0]?.Number_Of_Beds; i++) {

      const filteredData = temp2.filter((item2) => {
        return i == item2.Bed - 1
      })
      if (filteredData.length == 0) {
        arrayToDisplay.push(i + 1);
      }
    }
    setArrayset(arrayToDisplay);
  }, [Rooms, state.UsersList.roomdetails]);
  useEffect(() => {
    if (hostel_Id && Floor) {

      dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: hostel_Id, floor_Id: Floor } })
    }
  }, [Floor])
  useEffect(() => {
    const Roomdetail = state.UsersList.Users.filter((item) => {
      return item.Hostel_Id == hostel_Id && item.Floor == Floor
    })


    setRoomnum(Roomdetail)
  }, [state.UsersList.roomdetails]);
  const handleFirstName = (e) => {
    setFirstname(e.target.value)
  }
  const handleLastName = (e) => {
    setLastname(e.target.value)
  }


  const handlePhone = (e) => {
    setPhone(e.target.value)
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(e.target.value)
    if (isValidMobileNo && e.target.value.length === 10) {
      document.getElementById('MobileNumberError').innerHTML = ''
    }
    else {
      document.getElementById('MobileNumberError').innerHTML = 'invalid mobile number *'
    }
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    const email = e.target.value
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      document.getElementById('emailIDError').innerHTML = ''
    }
    else {
      document.getElementById('emailIDError').innerHTML = 'invalid Email Id *'
    }
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

const handleIsActiveUser = (e) =>{
  setIsActive(e.target.value)
 }
console.log("setIsActive",isActive)



  const handleHostelId = (e) => {

    const selectedHostelId = e.target.value;
    const selectedHostel = state.UsersList.hostelList && state.UsersList.hostelList.filter(item => item.id == e.target.value);
    setHostel_Id(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : '');

    setFloor("")
    setRooms("")
    setBed("")
  }
  const handleFloor = (e) => {
    setFloor(e.target.value)
  }
  const handleRooms = (e) => {
    setRooms(e.target.value);
  }

  
const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    setRoomRent(roomRentValue);
    let newBalanceDue =0 ; 
    let BalanceDuelength = 0 ;


    if(AdvanceAmount <= roomRentValue){
      newBalanceDue = roomRentValue - AdvanceAmount  ;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(BalanceDuelength);
         }else if(AdvanceAmount >= roomRentValue) {
      newBalanceDue = AdvanceAmount - roomRentValue;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(-BalanceDuelength);
      // - sign
    }
      
  }






  const handleBed = (e) => {
    setBed(e.target.value);
  };
  const handlePaymentType = (e) => {
    setPaymentType(e.target.value)
  }

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount)
    let newBalanceDue =0 ; 
    let BalanceDuelength = 0 ;
 
    if(advanceAmount <= RoomRent){
      newBalanceDue = RoomRent - advanceAmount  ;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(BalanceDuelength);
         }else if(advanceAmount >= RoomRent) {
      newBalanceDue = advanceAmount - RoomRent;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(-BalanceDuelength);
      // - sign
    }
  }



  const handleAadharNo = (e) => {
    setAadharNo(e.target.value)
  }
  const handlePancardNo = (e) => {
    setPancardNo(e.target.value)
  }
  const handlelicence = (e) => {
    setLicence(e.target.value)
  }
  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];

    if (fileimgage) {
      setFile(fileimgage);
    }
  };


  const handleClose = () => {
    setFirstname('');
    setLastname('');
    setAddress('');
    setAadharNo('');
    setPancardNo('');
    setLicence('');
    setPhone('');
    setEmail('');
    setHostel_Id('');
    setFloor('');
    setRooms('');
    setBed('');
    setAdvanceAmount('');
    setRoomRent('');
    setPaymentType('');
    setBalanceDue('');
    props.setShowMenu(false);
    props.setUserClicked(false);
    props.setShowForm(false);


  };
  useEffect(() => {
    if (props.EditObj && props.EditObj.ID) {
      props.setEdit('Edit')
      setBednum(props.EditObj)
      setId(props.EditObj.ID);
      let value = props.EditObj.Name.split(" ");
      setFirstname(value[0]);
      setLastname(value[1]);
      setAddress(props.EditObj.Address);
      setAadharNo(props.EditObj.AadharNo);
      setPancardNo(props.EditObj.PancardNo);
      setLicence(props.EditObj.licence);
      setPhone(props.EditObj.Phone);
      setEmail(props.EditObj.Email);
      setHostelName(props.EditObj.HostelName);
      setHostel_Id(props.EditObj.Hostel_Id);
      setFloor(props.EditObj.Floor);
      setRooms(props.EditObj.Rooms);
      setBed(props.EditObj.Bed);
      setAdvanceAmount(props.EditObj.AdvanceAmount);
      setRoomRent(props.EditObj.RoomRent);
      setPaymentType(props.EditObj.PaymentType);
      setBalanceDue(props.EditObj.BalanceDue);
      setIsActive(props.EditObj.isActive)
    }
    else {
      props.setEdit('Add')
    }

  }, [])
  const handleSaveUserlist = () => {
    if (
      firstname &&
      lastname &&
      Phone &&
      Email &&
      Address &&
      AadharNo &&
      PancardNo &&
      licence &&
      hostel_Id &&
      Floor &&
      Rooms &&
      Bed &&
      AdvanceAmount &&
      RoomRent &&
      PaymentType
         ) {
      dispatch({
        type: 'ADDUSER',
        payload: {
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: Address,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: hostel_Id,
          Floor: Floor,
          Rooms: Rooms,
          Bed: Bed,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          isActive:isActive,
          ID: props.edit === 'Edit' ? id : '',
        },
      });
      Swal.fire({
        icon: 'success',
        title: props.edit === 'Add' ? 'Detail Send Successfully' : 'Detail Updated Successfully',
        text: 'You have been Created successfully!',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
        
          props.AfterEditHostels(hostel_Id)
          props.AfterEditFloors(Floor)
          props.AfterEditRoomses(Rooms)
          props.AfterEditBeds(Bed)
          setFirstname('');
          setLastname('');
          setAddress('');
          setAadharNo('');
          setPancardNo('');
          setLicence('');
          setPhone('');
          setEmail('');
          setHostel_Id('');
          setFloor('');
          setRooms('');
          setBed('');
          setAdvanceAmount('');
          setRoomRent('');
          setPaymentType('');
          setBalanceDue('');
          handleClose()
        }
      });

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        confirmButtonText: 'Ok',
      });
    }
  };


  return (
    <div>
      <Offcanvas placement="end" show={props.showMenu} onHide={handleClose} style={{ width: "69vh" }}>

        <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >
          {props.edit && props.edit === 'Add' ? "Add User" : "EditUser"}
        </Offcanvas.Title>
        <Offcanvas.Body>
          <div class="d-flex flex-row bd-highlight mb-4  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
            <div class="p-1 bd-highlight user-menu">
              <ul className={props.showForm ? 'active' : ''} onClick={props.handleMenuClick}  >
                User Details
              </ul>
            </div>
            <div class="p-1 bd-highlight  user-menu">
              <ul className={props.showForm ? '' : 'active'}
                onClick={() => props.setShowForm(false)}
              >KYC Details</ul>
            </div>
          </div>
          {props.showForm ?
            <div>
              <p className="mb-1" style={{ textAlign: "center", fontSize: "15px", marginTop: "-30px" }}>Upload Profile</p>
              <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                {file ? <>
                  <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                </> :
                  <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                }
                <label htmlFor="imageInput" className=''>
                  <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }} />
              </div>
              <div className='container' style={{ marginTop: "30px" }}>
                <div className='row' >
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                      <FormControl
                        id="form-controls"
                        type="text"
                        value={firstname} onChange={(e) => handleFirstName(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Last Name</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={lastname} onChange={(e) => handleLastName(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Phone Number</Form.Label>
                      <FormControl
                        type="phone"
                        id="form-controls"
                        maxLength={10}
                        value={Phone} onChange={(e) => handlePhone(e)}
                        style={bottomBorderStyle}
                      />
                      <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Email Id</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={Email} onChange={(e) => handleEmail(e)}
                        style={bottomBorderStyle}
                      />
                      <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Address</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={Address} onChange={(e) => handleAddress(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-lg-12'>
                    <Form.Label style={{ fontSize: "12px" }}>Select PG</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyles}
                      id="form-selects"
                      value={hostel_Id} onChange={(e) => handleHostelId(e)}>
                      <option>Select hostel</option>
                      {
                        state.UsersList?.hostelList?.map((item) => {
                          return (
                            <>

                              <option key={item.id} value={item.id}>{item.Name}</option>
                            </>
                          )
                        })
                      }

                    </Form.Select>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-lg-6'>
                    <Form.Label style={{ fontSize: "12px" }}>Select Floor</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyles}
                      id="form-selects"
                      value={Floor} onChange={(e) => handleFloor(e)}>
                      <option>Selected Floor</option>


                      {state.UsersList?.hosteldetailslist
                        ?.filter((item, index, array) => array.findIndex(i => i.Floor_Id == item.Floor_Id) == index)
                        .map((u) => (
                          <option key={u.Floor_Id} >
                            {u.Floor_Id}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                  <div className='col-lg-6 mt-1'>
                    <Form.Label style={{ fontSize: '12px' }}>Select Room</Form.Label>
                    <Form.Select
                      aria-label='Default select example'
                      style={bottomBorderStyles}
                      value={Rooms}
                      id="form-selects"
                      onChange={(e) => handleRooms(e)}
                    >
                      <option>Selected Room</option>


                      {state.UsersList.roomdetails && state.UsersList?.roomdetails.map((item) => {
                        return (
                          <>
                            <option key={item.Room_Id} >
                              {item.Room_Id}</option>
                          </>
                        )

                      })
                      }



                    </Form.Select>
                  </div>
                  <div className='col-lg-12 mt-3'>
                    <Form.Label style={{ fontSize: '12px' }}>Select Bed</Form.Label>
                    <Form.Select
                      aria-label='Default select example'
                      style={bottomBorderStyles}
                      value={Bed}
                      id="form-selects"

                      onChange={(e) => handleBed(e)}
                    >

                      <option>Selected Bed</option>
                      {props.edit === 'Edit' && Bednum && Bednum.Bed && (
                        <option value={Bednum.Bed} selected>{Bednum.Bed}</option>
                      )}
                      {Arrayset.map((item) => (
                        <option key={item} value={item} >{item}</option>
                      ))}



                    </Form.Select>

                  </div>

                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <Form.Group className="">
                      <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Advance Amount</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={AdvanceAmount} onChange={(e) => handleAdvanceAmount(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Room Rent (Monthly)</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={RoomRent} onChange={(e) => handleRoomRent(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Label style={{ fontSize: '12px' }}>PaymentType</Form.Label>
                    <Form.Select
                      id="form-selects"
                      aria-label='Default select example'
                      style={bottomBorderStyles}
                      value={PaymentType}
                      onChange={(e) => handlePaymentType(e)}
                    >
                      <option>Selected PaymentType</option>
                      <option value="Cash">Cash</option>
                      <option value="Online">Online</option>
                    </Form.Select>

                  </div>

                  <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>BalanceDue:</Form.Label>
                      <h1 style={{ fontSize: "12px", backgroundColor: "#F6F7FB", padding: 8 }}>{BalanceDue}</h1>


                    </Form.Group>
                  </div>
                  <div className='col-lg-6'>
                  {props.edit === 'Edit' ? <>
                    <Form.Label style={{ fontSize: '12px' }}>Active</Form.Label>
                    <Form.Select
                      aria-label='Default select example'
                      style={bottomBorderStyles}
                      value={isActive}
                      onChange={(e) => handleIsActiveUser(e)}
                    >
                      <option>Selected Type</option>
                      <option value="1">CheckIn</option>
                      <option value="0">CheckOut</option>
                    </Form.Select>
                    </> :
                    null}

                  </div>
                </div>

              </div>


              <hr />
              <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                <Button variant="white" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}
                  onClick={() => props.setShowForm(false)}>
                  Next
                </Button>
              </div>
            </div>
            :
            <div>
              <div className='container' style={{ marginTop: "30px" }}>
                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Aadhaar Card Number</Form.Label>
                      <FormControl
                        type="text"
                        value={AadharNo}
                        onChange={(e) => handleAadharNo(e)}
                        style={bottomBorderStyle}
                        maxLength={12}
                        disabled={props.edit !== 'Add'}
                        pattern="\d*"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Pan Card Number</Form.Label>
                      <FormControl
                        type="text"
                        disabled={props.edit !== 'Add'}
                        value={PancardNo} onChange={(e) => handlePancardNo(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Licence</Form.Label>
                      <FormControl
                        type="text"
                        disabled={props.edit !== 'Add'}
                        value={licence} onChange={(e) => handlelicence(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              <hr />
              <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                <Button variant="white" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSaveUserlist}>
                  {props.edit === 'Add' ? "Save" : "Update"}
                </Button>
              </div>
            </div>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default UserlistForm;