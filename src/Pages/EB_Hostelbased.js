import React from "react";
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/menu.jpeg'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import "./EB_Roombased.css"

const EBROOM = () => {

    return (
        <div className="container">
            <div className="d-flex row justify-content-between mt-2 me-4 pt-3">
                <div className='col-lg-8 col-md-6 col-sm-12'>
                    <h1 style={{ fontSize: "26px" }}>Equally divided by room based</h1>
                    <p>Manage your account settings</p>
                </div>

                </div>

                <div style={{display:'flex',flexDirection:'row', backgroundColor: "#F6F7FB", borderRadius: '10px',padding:'10px' }} className="col-3 ">
                    <div style={{backgroundColor:'white',height:'60px',width:'60px',borderRadius:'50%'}}>
                    <Image src={Logo} roundedCircle
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: '50%',
                            border: "1px solid lightgray",
                            marginLeft:'10px',
                            marginTop:'10px'
                        }} />
                    </div>
                    

                    <h6 className="ms-4 mt-3">Sky Boys Hostel</h6>
                </div>

                {/* <div style={{display:'flex',flexDirection:'row'}}>
                    <div className="col-4 mt-3 mb-2 me-4">
                        <label style={{fontSize:'13px',fontWeight:700}}>Select floor</label>
                    <select class="form-select roomSelectBox" aria-label="Default select example">
  <option selected>select floor</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select></div>

                       <div className="col-4 mt-3 mb-2">
                       <label style={{fontSize:'13px',fontWeight:700}}>Select Room</label>
                       <select class="form-select roomSelectBox" aria-label="Default select example">
  <option selected>select room</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select></div>
                </div> */}
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className="col-4 mt-3 mb-2 me-4">
                    <label style={{fontSize:'13px',fontWeight:700}}>Start Meter Reading</label>
                    <Form.Control
                        placeholder="123-098"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
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
                     
                     <div className="col-4 mt-3 mb-2">
                     <label style={{fontSize:'13px',fontWeight:700}}>End Meter Reading</label>
                    <Form.Control
                        placeholder="123-098"
                        aria-label="Recipient's username"
                        className='custom-input'
                        aria-describedby="basic-addon2"
                        autoFocus
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

                    <button type="button" class="col-2 ms-2 mt-5" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  >Submit</button>

                </div>


                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop:'20px' }}>
                    <div className="col-3">
                    <h4>EB Detail</h4>
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
                            <tr>
                                <td className='text-center' style={{ fontSize: 14 }} >John Bushmill</td>
                                <td className='text-center' style={{ fontSize: 14 }} >G005-B02</td>
                                <td className='text-center' style={{ fontSize: 14 }} >245</td>
                                <td className='text-center' style={{ fontSize: 14 }} >300</td>
                                <td className='text-center' style={{ fontSize: 14 }} >
                                    <span><i class="bi bi-eye-fill me-2"></i></span>
                                    <span><i class="bi bi-trash"></i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>



            
        </div>
    )

}
export default EBROOM;