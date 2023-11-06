import "./FrontPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Screen from "../Assets/Images/screen.png";
import Logo from "../Assets/Images/Logo-color.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import Lock from "../Assets/Images/Lock.png";
import Container from 'react-bootstrap/Container';
import Copy from '../Assets/Images/copyright.png';
import Heart from '../Assets/Images/heart.png';
import { BiCopyright } from "react-icons/bi";

function FrontPage() {

  let navigate = useNavigate();


  const handleSignIn = () => {
    navigate('/login-Page')
  }
  const handleSignUp = () => {
    navigate('/create-account')
  }

  return (
    <>

      <div class="m-0 p-0" style={{ width: "100%", height: "100vh" }}>
        <Navbar
          expand="lg"
          className="navigation" style={{ height: "auto", width: "100%", display: "flex" }}>
          <img src={Logo}
            class="smartstay"
          ></img>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav class="navbar12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Nav.Link href="#action1" className="mainNavbar">Home</Nav.Link>
              <Nav.Link href="#action2" className="mainNavbar">Why smart stay?</Nav.Link>
              <Nav.Link href="#action3" className="mainNavbar">About Smartstay</Nav.Link>
              <Nav.Link href="#action4" className="mainNavbar">FAQ</Nav.Link>
              <Nav.Link href="#action5" className="mainNavbar">Contact</Nav.Link>


              <Nav.Link href="#action6" className="sign-in d-flex justify-content-center align-items-center" onClick={() => handleSignIn()}>
                <img src={Lock} style={{ height: "15px", width: "15px" }} /> <label style={{cursor:"pointer"}}>Sign-In</label>
              </Nav.Link>
              <Nav.Link href="#action7">
                <button type="button"
                  className="btn btn-primary btn-sm rounded-pill bg-primary signup ps-4 pe-4 ms-4"
                  onClick={() => handleSignUp()}>
                  Sign-Up
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div class="join" style={{ position: "relative" }} >
          <div class="paragraph" style={{ backgroundColor: "" }}>
            <h2 className="mb-3">Join. Promote. Earn.</h2>
            <p style={{ fontSize: "15px", color: "gray", textAlign: "justify", wordSpacing: -2 }} >
              Generate revenue from your audience by promoting
              Smartstay hostels and homes. Be a part of Smartstay
              Circle, an invite-only, global community of social
              media influencers and affiliate networks.
              <button type="button" class="btn btn-primary rounded-pill bg-primary startNow d-flex justify-content-center align-items-center" style={{ fontSize: "13px", width: 200, height: 35 }} >
                Start Now
              </button>
            </p>
          </div>
          <div calss="image" style={{ backgroundColor: "" }}>
            <img src={Screen} alt="Laptop"
              className="screen"
            ></img>
          </div>
        </div>

        <div class="row m-0 pt-3" style={{ position: "absolute", bottom: 0, backgroundColor: "#EDF1F2", width: "100%", height: "6vh", color: "black", }}>
          <div class="col-lg-3 offset-lg-1 p-0" >
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
              <BiCopyright  class="mb-0" style={{ height:12, color: "gray" }} />
              <p class="ps-0 mb-0" style={{ fontSize: "11px", fontWeight: "500", color: "gray" }}>All rights reserved</p>
            </div>
          </div>

          <div class="col-lg-3 offset-lg-5" >
            <div>
              <p style={{ fontSize: "11px", fontWeight: "500", color: "gray" }}>Brought to you with <span><img src={Heart} style={{ height: 10, width: 10 }} /></span> by the Smartstay Team</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default FrontPage;