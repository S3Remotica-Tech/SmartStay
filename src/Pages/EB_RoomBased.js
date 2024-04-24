import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/menu.jpeg'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import "./EB_Roombased.css"

const EBROOM = (props) => {

     console.log("props",props.hosteldetails)
    const handlebackbtn = () => {
        props.visibility(true)
    }

    useEffect(() => {
        dispatch({ type: 'HOSTELLIST' })
        dispatch({ type: 'EBLIST' })
        dispatch({ type: 'HOSTELDETAILLIST',payload:{hostel_Id:props.hosteldetails.id}})
}, [])

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log("state for EB based",state)
    console.log("room",state.UsersList.roomdetails);

    const [floorId,setFloorId]= useState('');
    const [RoomId,setRoomID] = useState('');
    const [startmeter,setStartmeter] = useState(0);
    const [endmeter,setEndmeter] = useState('');
    const [amount,setAmount] = useState('');
    const [roomsByFloor, setRoomsByFloor] = useState([]);
    console.log("roomsByFloor",roomsByFloor);


 

const handleFloorChange = (e) => {
    const selectedFloorId = e.target.value;
    console.log("e.target.value",e.target.value);
    setFloorId(e.target.value);
    const filteredRooms = state.UsersList.hosteldetailslist.filter(room => room.Floor_Id == selectedFloorId);
    console.log('filteredRooms',filteredRooms);
    setRoomsByFloor(filteredRooms);
}

    const handleRoomchange = (e) => {
        setRoomID(e.target.value)
    }

    const handlestartmeter = (e) => {
        setStartmeter(e.target.value)
    }

    const handleendmeter = (e) => {
        setEndmeter(e.target.value)
    }

    const handleamount = (e) => {
        setAmount(e.target.value)
    }

    const handleSaveEbBill = () => {
        if(props.hosteldetails.id && startmeter && endmeter && amount){
            dispatch({ type: 'CREATEEB', payload: {Hostel_Id: props.hosteldetails.id, Floor: floorId, Room: RoomId, start_Meter_Reading: startmeter, end_Meter_Reading: endmeter, EbAmount: amount } })
            Swal.fire({
                icon: "success",
                title: 'EB Added successfully',
                confirmButtonText: "ok"
              }).then((result) => {
                dispatch({ type: 'CREATEEB' })
                if (result.isConfirmed) {
                }
              });
        }
        else {
            Swal.fire({
              icon: "warning",
              title: 'Please Enter All Field',
              confirmButtonText: "ok"
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
      
    }
    const [filtervalue, setFilteredvalue] = useState([]);

    useEffect(() => {
        // Filter the array based on the condition
        const filteredArray = state.PgList.EB_Customerlist.filter(item => item.Hostel_Id === props.hosteldetails.id);
        setFilteredvalue(filteredArray);
    }, [props.hosteldetails.id, state.PgList.EB_Customerlist]); 
    
    console.log("Filtered array:", filtervalue);
    
    // Rest of your component code
    
    
    


    return (
        <div className="container ms-2 me-2">
            <div className="d-flex row justify-content-between mt-2 me-4 pt-3">
                <div className='col-lg-8 col-md-6 col-sm-12'>
                    <h1 style={{ fontSize: "20px" }}>{props.hosteldetails.isHostelBased == 0 ? "Equally divided by Room based" : "Equally divided by Hostel based"}</h1>
                    <p>Manage your account settings</p> 
                </div>
                <div className='col-lg-2 col-md-6 col-sm-12'>
                <MdOutlineKeyboardDoubleArrowLeft style={{fontSize:'22px'}} onClick={handlebackbtn}/>
                 </div>
                
                </div>

                <div style={{display:'flex',flexDirection:'row', backgroundColor: "#F6F7FB", borderRadius: '10px',padding:'10px' }} className="col-3 ">
                    <div style={{backgroundColor:'white',height:'60px',width:'60px',borderRadius:'50%'}}>
                    <Image src={props.hosteldetails.profile} roundedCircle
                        style={{
                            height: 35,
                            width: 35,
                            borderRadius: '50%',
                            border: "1px solid lightgray",
                            marginLeft:'12px',
                            marginTop:'12px'
                        }} />
                    </div>
                    

                    <h6 className="ms-4 mt-3">{props.hosteldetails.Name}</h6>
                </div>
        {props.hosteldetails.isHostelBased == 0 && 
        <div style={{display:'flex',flexDirection:'row'}}>
        <div className="col-4 mt-3 mb-2 me-4" style={{display:'flex',flexDirection:'column'}}>
            <label style={{fontSize:'13px',fontWeight:700,marginBottom:'5px'}}>Select floor</label>
        <select 
        class="RoomSelectBox"
         aria-label="Default select example"
         value={floorId}
         onChange={(e)=>handleFloorChange(e)}>
<option selected>select floor</option>
{state.UsersList?.hosteldetailslist
            ?.filter((item, index, array) => array.findIndex(i => i.Floor_Id == item.Floor_Id) == index)
            .map((u) => (
              <option key={u.Floor_Id} >
                {u.Floor_Id}
              </option>
            ))}


</select>
</div>

           <div className="col-4 mt-3 mb-2"  style={{display:'flex',flexDirection:'column'}}>
           <label style={{fontSize:'13px',fontWeight:700,marginBottom:'5px'}}>Select Room</label>
           <select 
        class="RoomSelectBox"
         aria-label="Default select example"
         value={RoomId}
         onChange={(e)=>handleRoomchange(e)}
         >
<option selected>select Room</option>
{roomsByFloor.map((item) => {
                return (
                    <>
                        <option key={item.Room_Id} >
                            {item.Room_Id}</option>
                    </>
                )

            })
            }

</select>
</div>
    </div>
        }
                


                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className="col-4 mt-2 mb-2 me-4">
                    <label style={{fontSize:'13px',fontWeight:700}}>Start Meter Reading</label>
                    <Form.Control
                        placeholder="123-098"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        disabled 
                        value={startmeter}
                     onChange={(e)=>handlestartmeter(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop:'9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}

                    />
                    </div>
                     
                     <div className="col-4 mt-2 mb-2">
                     <label style={{fontSize:'13px',fontWeight:700}}>End Meter Reading</label>
                    <Form.Control
                        placeholder="123-098"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        value={endmeter}
                     onChange={(e)=>handleendmeter(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop:'9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}

                    /></div>


                </div>

                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className="col-4 mt-2 mb-2 me-4">
                    <label style={{fontSize:'13px',fontWeight:700}}>Amount</label>
                    <Form.Control
                        placeholder="Amount"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
                        value={amount}
                     onChange={(e)=>handleamount(e)}
                        style={{
                            border: "1px solid lightgray",
                            fontSize: 12,
                            fontWeight: "530",
                            opacity: 1,
                            marginTop:'9px',
                            borderRadius: "4px",
                            color: "gray",
                            '::placeholder': { color: "gray", fontSize: 12 }
                        }}

                    /></div>
                    <div class="col-4 mt-2 mb-2 me-4">
                <button onClick={handleSaveEbBill}
                 type="button"  style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px',marginTop:'34px' }}  >Submit</button>
                   </div>
                    </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop:'20px' }}>
                    <div className="col-3">
                    <h4 style={{fontSize:'20px'}}>EB Detail</h4>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <div >
                        <input class="input-field date" type="date" placeholder="Previous month EB"/>
                        </div>
                      <div>
                      <button type="button" class="mb-2 ms-2" style={{ backgroundColor: "#E1EAFF", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA", marginRight: '10px' }}  >See All</button>
                      </div>
                    </div>
                </div>

                <div class="table-responsive mt-3" style={{ width: "100%" }}>
                    <table class="table text-center" >
                        <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                            <tr >
                                <th scope="col">Customer <i class="bi bi-caret-down-fill ms-2"></i></th>
                                <th scope="col">Room Number <i class="bi bi-caret-down-fill ms-2"></i></th>
                                <th scope="col">Unit <i class="bi bi-caret-down-fill ms-2"></i></th>
                                <th scope="col">EB Amount <i class="bi bi-caret-down-fill ms-2"></i></th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                        {filtervalue.length > 0 && filtervalue.map((item) => (
                            <tr>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Name}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Room_No}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Eb_Unit}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >{item.Room_Based}</td>
                                <td className='text-center' style={{ fontSize: 14 }} >
                                    <span><i class="bi bi-pencil-fill me-2"></i></span> 
                                    <span><i class="bi bi-trash3"></i></span>
                                    
                                </td>
                            </tr>
                             ))}
                        </tbody>
                    </table>
                </div>



            
        </div>
    )

}
export default EBROOM;