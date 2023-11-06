import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from "./Components/FrontPage"
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import RoyalGrandHostel from './Components/RoyalGrandHostel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
  
function App() {


  const state = useSelector(state => state)
  console.log("state", state)
  return (
    <div>
         <Router>
        <Routes>
        <Route path="/" element={<FrontPage />} />
          <Route path="/login-Page" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forget-password" element={< ForgetPassword />} />
          <Route path="/royalgrandhostel" element={< RoyalGrandHostel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 


// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// function Example() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch
//       </Button>

//       <Offcanvas show={show} onHide={handleClose}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           Some text as placeholder. In real life you can have the elements you
//           have chosen. Like, text, images, lists, etc.
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export default Example;

