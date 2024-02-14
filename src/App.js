import React,{useState,useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import FrontPage from "./Components/FrontPage"
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import RoyalGrandHostel from './Components/RoyalGrandHostel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import BedDetails from './Pages/Bed';
import DashboardRoomList from './Pages/DashBoardRoomsList';



   function App() {


 const state = useSelector(state => state)

 console.log("state for app.js",state)

const isLoggedIn = useSelector(state => state.login.isLoggedIn);

console.log("isLoggedIn",isLoggedIn)
 const rememberMe = localStorage.getItem('login');



console.log("rememberMe",rememberMe)




  return (
    <div>
{
    isLoggedIn && rememberMe ?
    <Router>
    <Routes>
    <Route index element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<RoyalGrandHostel />} />
        <Route path='/Bed' element={< BedDetails />} />
        <Route path='/roomList' element ={<DashboardRoomList />} />
      </Routes>  
    </Router>
    :
    <Router>
      <Routes>
        <Route index element={<FrontPage />} />
        <Route path="/login-Page" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forget-password" element={< ForgetPassword />} />
      </Routes>
    </Router>

}

    </div>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import FrontPage from "./Components/FrontPage";
// import LoginPage from './Components/LoginPage';
// import CreateAccount from './Components/CreateAccount';
// import ForgetPassword from "./Components/Forgetpass";
// import OtpSend from './Components/OtpSend';
// import RoyalGrandHostel from './Components/RoyalGrandHostel';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// import BedDetails from './Pages/Bed';
// import './App.css'
// import DashboardRoomList from './Pages/DashBoardRoomsList';

// function App() {
//   const isLoggedIn = useSelector(state => state.login.isLoggedIn);
//   const rememberMe = localStorage.getItem('login');

//   console.log("rememberMe",rememberMe)
// console.log("isLoggedIn",isLoggedIn)
//   return (
//     <Router>
//       <Routes>
        
//       <Route
//       path="/dashboard" element={isLoggedIn || rememberMe ? <RoyalGrandHostel />: isLoggedIn && !rememberMe ? <Navigate to="/login-Page" />
//          : 
//           <Navigate to="/" />
//               }
//     />


//         <Route path='/Bed' element={isLoggedIn && rememberMe ? <BedDetails /> : <Navigate to="/" />} />
//         <Route path='/roomList' element={isLoggedIn && rememberMe ? <DashboardRoomList /> : <Navigate to="/" />} />
//         <Route path="/" element={<FrontPage />} />
//         <Route path="/login-Page" element={<LoginPage />} />
//         <Route path="/create-account" element={<CreateAccount />} />
//         <Route path="/forget-password" element={<ForgetPassword />} />
//         {/* <Route path="/forget-password" element={<OtpSend />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

