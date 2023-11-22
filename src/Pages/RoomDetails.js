import React, { useState } from 'react'
import Room from '../Assets/Images/Room.png'
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Pages/RoomDetails.css'
import Plus from '../Assets/Images/Create-button.png';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edits from '../Assets/Images/edit.png';
import Login from '../Assets/Images/login.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";




function RoomDetails() {


    const data = [
        { id: 1, Date: '02-01-2023', Invoices: '20230102-407', Amount: '₹6500.00', BalanceDue: '00.00', Status: 'Success' },
        { id: 2, Date: '02-12-2022', Invoices: '20230102-407', Amount: '₹6500.00', BalanceDue: '700.00', Status: 'Overdue by 13 days' },
        { id: 3, Date: '02-11-2022', Invoices: '20220102-364', Amount: '₹6500.00', BalanceDue: '00.00', Status: 'Success' },

    ];

    const [isOpenTab, setIsOpenTab] = useState(true)

    const handleOpen = () => {
        setIsOpenTab(!isOpenTab)
    }




    const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };


    // popovers

    // const [showPopover1, setShowPopover1] = useState(false);
    // const [showPopover2, setShowPopover2] = useState(false);

    // const target1 = useRef(null);
    // const target2 = useRef(null);

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         // setShowPopover1(true);
    //         // setShowPopover2(true);
    //     }, 10);
    // }, []);




    return (
        <>

            <div class="row g-0 w-100 p-2">
                <div class="col-lg-4 col-md-12 col-xs-12 col-sm-12" style={{ backgroundColor: "" }}>
                    <div class="d-flex justify-content-between">
                        <div style={{ height: "40px", width: "35px", backgroundColor: "#F6F7FB", borderRadius: "50px" }} class="d-flex justify-content-center align-items-center" >
                            <Image src={Room} roundedCircle style={{ height: "25px", width: "25px", backgroundColor: "#F6F7FB" }} />
                        </div>
                        <div class="d-block ms-2">
                            <p class="ms-1" style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>Ground Floor</p>
                            <select class="ms-1" aria-label="Default select example" style={{ border: "none", fontSize: "12px", fontWeight: "700" }}>
                                <option selected style={{ fontSize: "10px", fontWeight: "700" }}>Room No - F001</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="vertical-rule ms-3"></div>

                        <div class="ms-5">
                            <Nav variant="underline" >
                                <Nav.Item>
                                    <Nav.Link href="#" onClick={handleOpen} style={{ fontSize: "12px", fontWeight: "700" }}>Bed - 001</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>


                    </div>
                </div>
                <div class="col-lg-3 offset-lg-5 col-md-12 col-xs-12 col-sm-12" style={{ backgroundColor: "" }}>
                    <div class="d-flex">
                        <button type="button" class="" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}><img src={Edits} height="12" width="12" alt='Edits'/> Edit</button>
                        <button type="button" class="ms-2" style={{ fontSize: "12px", fontWeight: "700", backgroundColor: "white", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" alt='Plus'/> Create Bed</button>
                    </div>
                </div>

            </div>

            <hr class="m-0 p-0" style={{ color: "#ccc" }} />
            {isOpenTab && <>
                <div class="row d-flex g-0">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="d-flex justify-content-start align-items-start ps-1 pt-1 mb-0">
                            <p style={{ fontWeight: "700" }}>Bed-001 (Dhaskshan Sri)</p>
                        </div>

                        <hr class="mt-0 mb-2" />

                        <div class="row g-0">
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                <Image src={Login} roundedCircle style={{ height: "45px", width: "45px", backgroundColor: "#F6F7FB" }} />
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                                <div class="d-block">
                                    <p style={{ fontWeight: "700" }} class="mb-0">Dhaskshan Sri</p>
                                    <button type="button" class="btn btn-light p-1" style={{ color: "#0D99FF", height: "4vh", fontSize: "12px" }}>Edit</button>
                                    <button type="button" class="btn btn-light p-1 ms-2" style={{ color: "#0D99FF", height: "4vh", fontSize: "12px" }}>Delete</button>
                                </div>
                            </div>
                            <div class="col-lg-5 offset-lg-1">
                                <p style={{ fontSize: "12px", padding: "1px" }} >Joining Date:25-11-2022</p>
                            </div>
                        </div>




                        <div class="d-flex justify-content-between pt-1 mb-0">
                            <p style={{ fontSize: "12px", fontWeight: '700' }} class="mb-2">USER DETAIL</p>
                            <img src={Edits} style={{ height: "18px", width: "18px" }} alt='Edits'/>
                        </div>
                        <hr class="m-0 mb-2" />
                        <div class="d-flex justify-content-between">
                            <p style={{ fontSize: "12px", fontWeight: '200', color: "gray" }}>Phone No</p>
                            <p style={{ fontSize: "12px" }}>+91 9025022738</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p style={{ fontSize: "12px", fontWeight: '200', color: "gray" }}>Email Id</p>
                            <p style={{ fontSize: "12px" }}>dhaskahansri@gmail.com</p>
                        </div>

                        <div class="d-flex justify-content-between pt-1 mb-0">
                            <p style={{ fontSize: "12px", fontWeight: '700' }} >ADDRESS DETAIL</p>
                            <img src={Edits} style={{ height: "18px", width: "18px" }} alt='Edits'/>
                        </div>
                        <hr class="m-0 mb-2" />
                        <div class="d-block">
                            <p class="mb-1" style={{ fontSize: "12px" }} >PERMANENT ADDRESS</p>
                            <p class="mb-1" style={{ fontSize: "12px" }}>Sivaswamy Street, opp.Town railway Station</p>
                            <p class="mb-1" style={{ fontSize: "12px" }}>Salem, TamilNadu -36001</p>
                        </div>

                        <div class="d-flex">
                            <p style={{ color: "#0D99FF", fontSize: "13px" }}>Add Additional Address</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p style={{ fontSize: "12px", fontWeight: '700' }} >KYC DETAIL</p>
                            <img src={Edits} style={{ height: "18px", width: "18px" }} alt='Edits'/>
                        </div>
                        <hr class="m-0 mb-2" />

                        <div class="d-flex justify-content-between">
                            <p style={{ fontSize: "12px" }}>Aadhar Card  No</p>
                            <p style={{ fontSize: "12px" }}>2354 5689 ** **</p>
                            <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                        </div>

                        <div class="d-flex justify-content-between">
                            <p style={{ fontSize: "12px" }}>Pan Card  No</p>
                            <p style={{ fontSize: "12px" }}>AGD2562**</p>
                            <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <p style={{ fontSize: "12px" }}>licence</p>
                            <p style={{ fontSize: "12px" }}>TN52 071892****</p>
                            <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                        </div>
                    </div>
                    <div className="col-lg-1  col-md-12  d-none d-md-block" style={{ width: "5vh" }}>
                        <div className="vertical-rules"></div>
                    </div>

                    <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                        <div class="d-flex justify-content-between" style={{ backgroundColor: "", width: "100%" }}>
                            <div class="p-2" style={{ backgroundColor: "" }}>
                                <h6 style={{ fontSize: "16px" }}>Bill Payment</h6>
                            </div>
                            <div class=" p-2" style={{ backgroundColor: "" }} >
                                <BsSearch class="ms-2" />
                                <IoFilterOutline class="ms-2" />
                            </div>
                        </div>

                        <Table responsive>
                            <thead style={{ backgroundColor: "#F6F7FB", color: "gray", fontSize: "11px" }}>
                                <tr style={{ height: "50px" }}>
                                    <th>Date</th>
                                    <th>Invoices#</th>
                                    <th>Amount</th>
                                    <th>Balance Due</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ height: "50px", fontSize: "11px" }}>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.Date}</td>
                                        <td style={{ color: "#0D99FF" }}>{item.Invoices}</td>
                                        <td>{item.Amount} </td>
                                        <td>{item.BalanceDue}</td>
                                        <td style={item.Status == "Success" ? { color: "green" } : { color: "red" }}>{item.Status}</td>
                                        <td class="justify-content-between"><img src={List} height="20" width="20" alt='List'/><img class="ms-1" src={Edits} height="20" width="20" alt='Edits'/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                        <div class="d-flex justify-content-between mb-">
                            <p>Comments</p>
                            <p style={{ color: "#0D99FF", fontSize: "13px" }}>+ Add Comment</p>
                        </div>

                        {/* 
                        <div class="row g-0" style={{ marginTop: "10px", paddingTop: "5px", backgroundColor: "" }}>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{ backgroundColor: "" }}>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "30vh" }}>
                                    <div>
                                        <p class="mb-0">05-01-2023</p>
                                        <p>07.23PM</p>
                                    </div>
                                    <div>
                                        <p class="mb-0">05-01-2023</p>
                                        <p>07.20PM</p>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" style={{ backgroundColor: "", }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: '', height: "" }}>
                                    <Stepper activeStep={activeStep} orientation="vertical" style={{ color: "#2F74EB", height: "" }}>
                                        <Step sx={{ color: "#2F74EB" }} >
                                            <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                                                <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                                            </div>
                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>
                                        </Step>
                                        <Step sx={{ color: "#2F74EB", }}>
                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>

                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>

</Step>
                                        <div>
                                            <Step sx={{ color: "#2F74EB" }} >
                                                <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                                                    <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                                                </div>
                                            </Step>
                                        </div>

                                    </Stepper>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">


                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div style={{padding:25,borderWidth:1,borderColor:'#888888',borderStyle:'solid',display:'flex',flexDirection:'row',alignItems:'center',position:'relative',width:"60vh",borderRadius:2}}>
           <div class="d-block">
           <p class="mb-1" style={{ fontSize: '11px' }}>Invoice updated</p>
           
                   
                    <p class="mb-1" style={{ fontSize: '11px' }}>Invoice Dhaskshan Sri emailed by <strong>SmartStay</strong> <span style={{ color: '#2F74EB' }}> - View Details</span></p>
                        </div>                               
              
                <div style={{width:12,height:12,borderLeftWidth:1,borderTopWidth:0,borderBottomWidth:1,borderRightWidth:0,borderLeftColor:'#888888',borderBottomColor:'#888888',borderStyle:'solid',position:'absolute',left:-7,transform:'rotate(45deg)',backgroundColor:'#FFFFFF'}}></div>
            </div>
        </div>


                            </div>
                        </div> */}

                        <div class="row" style={{ marginTop:30 }}>

                            <div class="col-lg-3 offset-lg-1 col-md-12 col-xs-12 d-flex justify-content-center align-items-center" style={{ backgroundColor: "", }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: '', height: "" }}>
                                    <Stepper activeStep={activeStep} orientation="vertical" style={{ color: "#2F74EB", height: "" }}>
                                        <Step sx={{ color: "#2F74EB" }} style={{ position: "relative" }} >
                                            <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                                                <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                                            </div>
                                            <div style={{ position: "absolute", left: -100, top: 0 }}>
                                                <p class="mb-0" style={{ color: "black",fontSize: '11px' }}>05-01-2023</p>
                                                <p style={{ color: "black",fontSize: '11px' }}>07.23PM</p>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',position:"absolute",left:50,top:-30 }}>
                                                <div className="pop-overs" style={{padding:"20px", borderWidth: 1, borderColor: '#888888', borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', width:"70vh", borderRadius: 5 }}>
                                                    <div class="d-block">
                                                        <p class="mb-1" style={{ fontSize: '11px',color:"black" }}>Invoice updated</p>
                                                       <p class="mb-1" style={{ fontSize: '11px',color:"black" }}>Invoice Dhaskshan Sri emailed by <strong>SmartStay</strong> <span style={{ color: '#2F74EB' }}> - View Details</span></p>
                                                    </div>

                                                    <div style={{ width: 12, height: 12, borderLeftWidth: 1, borderTopWidth: 0, borderBottomWidth: 1, borderRightWidth: 0, borderLeftColor: '#888888', borderBottomColor: '#888888', borderStyle: 'solid', position: 'absolute', left: -7, transform: 'rotate(45deg)', backgroundColor: '#FFFFFF' }}></div>
                                                </div>
                                            </div>





                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>
                                        </Step>
                                        <Step sx={{ color: "#2F74EB", }}>
                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>

                                        </Step>
                                        <Step sx={{ color: "#2F74EB" }}>

                                        </Step>
                                        
                                        <div>
                                            <Step sx={{ color: "#2F74EB" }} style={{ position: "relative" }}>
                                                <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                                                    <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                                                </div>
                                                <div style={{ position: "absolute", left: -100, top: 0 }}>
                                                    <p class="mb-0" style={{ color: "black",fontSize: '11px' }} >05-01-2023</p>
                                                    <p style={{ color: "black",fontSize: '11px'}}>07.20PM</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',position:"absolute",left:50,top:-30 }}>
                                                <div className="pop-overs" style={{padding:"20px", borderWidth: 1, borderColor: '#888888', borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', width:"70vh", borderRadius: 5 }}>
                                                    <div class="d-block">
                                                        <p class="mb-1" style={{ fontSize: '11px',color:"black" }}>Invoice added</p>
                                                       <p class="mb-1" style={{ fontSize: '11px',color:"black" }}>Invoice Dhaskshan Sri amount of ₹500.00 created by <strong>SmartStay</strong> <span style={{ color: '#2F74EB' }}> - View Details</span></p>
                                                    </div>

                                                    <div style={{ width: 12, height: 12, borderLeftWidth: 1, borderTopWidth: 0, borderBottomWidth: 1, borderRightWidth: 0, borderLeftColor: '#888888', borderBottomColor: '#888888', borderStyle: 'solid', position: 'absolute', left: -7, transform: 'rotate(45deg)', backgroundColor: '#FFFFFF' }}></div>
                                                </div>
                                            </div>



                                            </Step>
                                        </div>

                                    </Stepper>
                                </div>
                            </div>
                        </div>





                        <div class="">









                        </div>

                    </div>
                </div>
            </>}
        </>
    )
}

export default RoomDetails;


