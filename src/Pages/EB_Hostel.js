import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/Logo-Icon.png'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Roombased from './EB_RoomBased';
import CryptoJS from "crypto-js";
import Filter from '../Assets/Images/New_images/Group 13.png';
import Button from 'react-bootstrap/Button';
import './EB_Hostel.css'
import dottt from "../Assets/Images/Group 14.png"
import { Dropdown, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FormControl } from 'react-bootstrap';


function EB_Hostel() {



  const dispatch = useDispatch();
  const state = useSelector((state) => state.UsersList);
  console.log("state",state)


  const [loginid, setLoginid] = useState();
  const loginId = localStorage.getItem('loginId');
  useEffect(() => {
    dispatch({ type: 'HOSTELLIST' })
  }, []);


  const [isvisible, setISVisible] = useState(false);
  const [backbtn, setBackbtn] = useState(true)
  const [hosteldetails, setHosteldetails] = useState('')
  const [transactionshow, settransactionshow] = useState(true);
  const [ebShow, setebshow] = useState(false);
  const [addEbDetail, setaddEbDetail] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState([]);
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [roomsByFloor, setRoomsByFloor] = useState([]);


  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value)
    setFloor("")
    setRooms("")
  };
  const handleFloor = (e) => {
    setFloor(e.target.value)
    const filteredRooms = state.hosteldetailslist.filter(room => room.floor_id == e.target.value);
    console.log("filteredRooms",filteredRooms)
    setRoomsByFloor(filteredRooms);
    setRooms("")
  };
  
  const handleRoom = (e) => {
    setRooms(e.target.value)
  };


  useEffect(() => {
    if (selectedHostel && Floor) {

      dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: selectedHostel, floor_Id: Floor } })
    }
  }, [Floor])

  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: selectedHostel } })
  }, [selectedHostel]);


  useEffect(() => {
    dispatch({ type: 'EB-BILLING-UNIT-LIST' })
  }, [])


  const handleEbbill = (hostel) => {
    setISVisible(true)
    setHosteldetails(hostel)
  }



  const handleback = (isShow) => {
    setBackbtn(isShow)
    setISVisible(false)
  }
  const handleAddEbDetails = () => {
    if (ebShow) {
      setaddEbDetail(true)
    }
    else {
      setaddEbDetail(false)
    }

  }

  const handleTransactionsShow = () => {
    settransactionshow(true)
    setebshow(false)


  };
  const handleebViewShow = () => {
    setebshow(true)
    settransactionshow(false)

  };



  return (

    <div style={{ width: "100%", padding: 20 }}>



      {/* {
      isvisible ?
       <Roombased visibility={handleback} hosteldetails = {hosteldetails}/> :
       <div className='row mt-4 ms-4 me-4'>
        <h4 style={{fontSize:16,fontWeight:600}}>EB Plan</h4>
        <p style={{fontSize:13}}>Manage your account settings</p>
      
        {state.hostelList.length > 0 && state.hostelList.map((hostel) => (
      
        <div className='col-lg-4 col-md-6 col-xs-12 col-sm-12  mt-3'>
       
        <Card style={{height:"auto",backgroundColor:"#F6F7FB"}} onClick={()=>{handleEbbill(hostel)}}>
            <Card.Body>
              <div className='row d-flex align-items-center justify-content-center' >
              <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 col-12" style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width:55, height:55, borderRadius: 100, padding:20 }}>
                      <Image src={hostel.profile == null ? Logo : hostel.profile} roundedCircle
                          style={{
                              height: 50,
                              width: 50,
                              borderRadius: '50%',
                             
                          }} />
      
                      </div>
                      <div className="col-lg-8 col-md-4 col-xs-12 col-sm-12 col-12">
                        <h6>{hostel.Name}</h6>
                      </div>
              </div>
           
                      
            </Card.Body>
          </Card>
       
        </div>
         ))}
      
         
        </div>
      }  */}

      <div className="d-flex justify-content-between align-items-center ms-3 mb-3">
        <div>
          <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Transactions</label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className='me-3'>
            <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
          </div>

          <div>
            <Button style={{ fontFamily: "Montserrat", fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 184, height: 56, padding: "18px, 20px, 18px, 20px" }} onClick={handleAddEbDetails}> + Add transaction</Button>
          </div>
        </div>
      </div>

      < div style={{ display: "flex", flexDirection: "row" }} >
        <div className={`tab-path ${transactionshow ? 'active' : ''}`} onClick={handleTransactionsShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16, marginLeft: 5 }}>General</div>

        <div className={`tab-path ${ebShow ? 'active' : ''}`} onClick={handleebViewShow} style={{ fontFamily: "Gilroy", fontWeight: 500, fontSize: 16, marginLeft: 10 }}>Electricity Bill</div>

      </div>

      {
        transactionshow &&
        <div style={{ padding: 15 }}>
          <Table className="ebtable mt-3" responsive >
            <thead style={{ color: "gray", fontSize: "11px", backgroundColor: "#E7F1FF" }}>
              <tr className="" style={{ height: "30px" }}>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }}>Name</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>category</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Date</th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Made of pyment</th>
                <th ></th>

              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" }}>
              {/* {currentRowTransaction.map((v) => { */}
              {/* let Dated = new Date(v.created_at);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; // Months are zero-based
                            let year = Dated.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate); */}
              {/* return ( */}
              <tr>

                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>Name</td>
                <td ><span style={{ backgroundColor: "#FFEFCF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>type</span></td>
                <td><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>date</span></td>
                {/* <td>₹{view.BalanceDue}</td> */}
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>₹amount</td>
                <td><span style={{ backgroundColor: "#D9E9FF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>payment</span></td>
                <td> <img src={dottt} style={{ height: 40, width: 40 }} /></td>


              </tr>
              {/* ) */}

              {/* })} */}
              {/* {currentRowTransaction.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )} */}

            </tbody>
          </Table>
        </div>
      }
      {
        ebShow &&

        <div style={{ padding: 15 }}>
          <Table className="ebtable mt-3" responsive >
            <thead style={{ color: "gray", fontSize: "11px", backgroundColor: "#E7F1FF" }}>
              <tr className="" style={{ height: "30px" }}>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }}>Name</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Room no</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Start meter</th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>End meter</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Dated</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Units</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                <th ></th>

              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" }}>
              {/* {currentRowTransaction.map((v) => { */}
              {/* let Dated = new Date(v.created_at);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; // Months are zero-based
                            let year = Dated.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate); */}
              {/* return ( */}
              <tr>

                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>Nametytytyy</td>
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "start" }}>Room no</td>
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "start" }}>12345</td>
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "start" }}>12345</td>
                {/* <td>₹{view.BalanceDue}</td> */}

                <td><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>Dated</span></td>
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "start" }}>Units</td>
                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "start" }}>Amount</td>
                <td> <img src={dottt} style={{ height: 40, width: 40 }} /></td>


              </tr>
              {/* ) */}

              {/* })} */}
              {/* {currentRowTransaction.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )} */}

            </tbody>
          </Table>
        </div>
      }


      {!transactionshow && (
        <Modal show={addEbDetail} onHide={() => setaddEbDetail(false)} centered>
          <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18 }} className="text-center">Add a transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row mt-4'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Start meter</Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder='6542310'
                    type="text"
                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                  />
                </Form.Group>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>End meter</Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder='6542310'
                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                  />
                </Form.Group>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest</Form.Label>
                <Form.Select aria-label="Default select example"
                    className='border' value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                    <option style={{ fontSize: 14, fontWeight: 600, }} selected value=''>Select PG</option>
                    {state.hostelList && state.hostelList.map((item) => (
                      <>
                        <option key={item.id} value={item.id} >{item.Name}</option></>
                    ))}

                  </Form.Select>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Floor</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className='border'
                  value={Floor}
                  onChange={(e) => handleFloor(e)}
                  style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                >
                  <option style={{ fontSize: 14, fontWeight: 600, }} selected value=''>Select Floor</option>
                   {state?.hosteldetailslist && state?.hosteldetailslist.map((item) => (
                      <>
                        <option key={item.floor_id} value={item.floor_id} >{item.floor_id}</option></>
                    ))}
                  
                </Form.Select>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Room</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className='border'
                  value={Rooms}
                  onChange={(e) => handleRoom(e)}
                  style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                >
                  <option>Select a Room</option>
                  {state.roomdetails && state.roomdetails.map((item) => (
                      <>
                        <option key={item.Room_Id} value={item.Room_Id} >{item.Room_Id}</option></>
                    ))}
                </Form.Select>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Date</Form.Label>
                  <FormControl
                    type="phone"
                    id="form-controls"
                    placeholder='Select Date'
                    maxLength={10}
                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                  />
                  <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center'>
            <Button className='col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 20,
            }}>
              Add transaction
            </Button>
          </Modal.Footer>
        </Modal>
      )}




    </div>






  )
}

export default EB_Hostel