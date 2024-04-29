import React ,{useState,useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Hostel from '../Assets/Images/hostel.png';
import Image from 'react-bootstrap/Image';
import Notification from '../Assets/Images/Notification.png';
import Settings from '../Assets/Images/Settings.png';
import Men from '../Assets/Images/men.jpg';


function NavScrollExample() {

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])
  const state = useSelector((state) => state);
  console.log("state for topbar",state);
  const LoginId = localStorage.getItem("loginId")

  const [filterhostellist,setFilterhostellist] = useState([]);

  useEffect(() => {
    if (LoginId) {
      try{
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = decryptedString;
        const filteredList = state.UsersList?.hostelList?.filter((view) =>{ 
          console.log("parsedData",parsedData);
          console.log("created_By",view.created_By);
          console.log("view.created_By == parsedData",view.created_By == parsedData);
        return view.created_By == parsedData;
      
        
        });
        console.log("topbar_filteredlist",filteredList);
         setFilterhostellist(filteredList)
      }
      
        catch(error){
       console.log("Error decrypting loginid",error);
        }

  
    }

  }, [LoginId])


  
  
  return (
    <Navbar bg="light" expand="lg" style={{ backgroundColor: "#FFFFFF", padding: "0px 0px", boxShadow: "1px 1px 2px lightgray" }} >
      <Container fluid style={{ backgroundColor: "#FFFFFF", padding: "0px" }}>
        <div class="d-flex justify-content-start" style={{ marginLeft: "0px" }} >
          <Navbar.Brand href="#"  style={{ padding:"5px 8px",backgroundColor: "#2E75EA", height: "100%", width:"auto" }}><img class="img-fluid" src={Smart} style={{ height: "30px", width: "30px" }} alt='Smart'/></Navbar.Brand>
        </div>


        <div className="d-flex justify-content-start align-items-center w-100">
            <Image src={Hostel} roundedCircle style={{ height: "30px", width: "30px" }} />
            <div className="d-block ps-2 w-100">
              <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray", fontWeight: 600 }}>PG Detail</p>

              <select  class="form-select ps-2" aria-label="Default select example" style={{ backgroundColor: "#f8f9fa", padding:8, border: "none", boxShadow: "none", width: "100%", fontSize: 9, fontWeight: 700,textTransform:"capitalize",borderRadius:"none" }}>
                <option disabled selected className='p-3' style={{ fontSize: 15,textTransform:"capitalize" }}>Select Hostel</option>
                {filterhostellist.length>0 && filterhostellist.map((obj) => {
                  return (<>
                    <option style={{ fontSize: 15,textTransform:"capitalize" }}>{obj.Name}</option>
                  </>)
                })}

              </select>

            </div>
            <div style={{ borderLeft: "1px solid #cccccc99", height: "45px" }} className="vertical-line ms-1 me-2"></div>
          </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div style={{ margin: "0px auto" }}>
            <Nav className="my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll >
              <Nav.Link href="#action1" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }}>Dashboard</Nav.Link>
              <Nav.Link href="#action2" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }}>Invoice</Nav.Link>
              <Nav.Link href="#action1" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }}>Compliances</Nav.Link>
              <Nav.Link href="#action2" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }}>Reports</Nav.Link>
            </Nav>
          </div>
          <Form className="d-flex">
            <div class="justify-content-evenly">
              <img src={Notification} class="me-3" style={{ height: "25px", width: "25px" }} alt='Notification'/>
              <img src={Settings} class="me-3" style={{ height: "25px", width: "25px" }} alt='Settings'/>
            </div>
            <Image src={Men} roundedCircle style={{ height: "30px", width: "30px" }} />
        <div class="d-block ms-2">
          <p style={{ fontSize: "12px", marginBottom: "0px",fontWeight: "800" }}>Rahul Sharma</p>
          <p style={{ fontSize: "10px", marginBottom: "0px", marginRight: "0px", color: "gray" }}>Edit profile</p>
        </div>
       
          </Form>
          <Form.Select class="me-5 pt-3" aria-label="Default select example" style={{ border: "none", height: "10px", width: "40px" }} >
          <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
         </Form.Select>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavScrollExample;