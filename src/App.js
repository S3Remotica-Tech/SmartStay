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
        <Route index element={<FrontPage />} />
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

