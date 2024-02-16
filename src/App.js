import React, { useEffect ,useState} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import CryptoJS from "crypto-js";


function App() {


  const state = useSelector(state => state)
  const [data,setData]= useState('');

// useEffect(()=>{
//   const login = localStorage.getItem("login")
//   if(login){
//     const decryptedData = CryptoJS.AES.decrypt(login, 'abcd')
//     console.log("decryptedData",JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8)));
//     setData(JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8)))
//   }
  
// },[])

const login = localStorage.getItem("login");
 

useEffect(() => {
  const login = localStorage.getItem("login");
  if (login) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
      const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
      console.log("decryptedData", parsedData);
      setData(parsedData);
    
    } 
    catch (error) {
      console.error("Error parsing decrypted data:", error);
      
    }
    
  }
  setIsLoading(false);
}, []);

 useEffect (()=>{
  if(state.login.isLoggedIn===true){
    localStorage.setItem("login",true)
  } 
},[state.login.isLoggedIn])
console.log("state.login.isLoggedIn", state.login.isLoggedIn ? "1":"0");


  
 console.log("data",data);


 const [isLoading, setIsLoading] = useState(true);


 if (isLoading) {
  return <div style={{display:'flex',justifyContent:'center'}}>Loading...</div>
}


  return (
    <div>
      
      {
        data ||
          state.login?.isLoggedIn ? 
          <Router>
            <Routes>
            
              <Route index path="/" element={<RoyalGrandHostel />}></Route>
              <Route path='/Bed' element={< BedDetails />} ></Route>
              <Route path='/roomList' element={<DashboardRoomList />} />
              <Route path="/login-Page" element={<LoginPage />} />
            </Routes>
          </Router>
          :
          <Router>
            <Routes>
              <Route index  element={<FrontPage />} />
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

