import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Assets/Images/New_images/Group.png';
import Smart from '../Assets/Images/New_images/logo_front.png';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";



function CollapsibleExample() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  
  let navigate = useNavigate();

  const handleSignIn = () => { 
    navigate('/login-Page')
  }
 
  const handleSignUp = () => {
    navigate('/create-account')
  }

  





  
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="" style={{backgroundColor:"#FFFFFF"}} transparent>
      <Container>
        <Navbar.Brand href="#home"><img src={Logo} style={{ height: 33, width: 33 }} /> <img src={Smart} style={{ height: 20, width: 133 }} />
       </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            
          <Nav className="mx-auto">
            <Nav.Link href="#features" style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Home</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Features</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Pricing</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}}>Testimonials</Nav.Link>
          </Nav>
          <Nav className='align-items-center justi-content-start'>
            <Nav.Link href="#deets" style={{fontSize:16, fontWeight:600, color:"rgba(0, 0, 0, 1)",fontFamily:"Montserrat"}} onClick={handleSignIn}>Sign in</Nav.Link>
            <Button onClick={handleSignUp} variant="" style={{backgroundColor:"rgba(30, 69, 225, 1)", color:"rgba(255, 255, 255, 1)", fontWeight:600, fontSize:16, fontFamily:"Montserrat",width:161,height:60, borderRadius:16, padding:"20px 24px 20px 24px"}}>Get Started</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>






</>

  );
}

export default CollapsibleExample;