import React, { useEffect ,useState} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import InvoiceDetail from './Pages/InvoiceDetails';


function App() {


  const state = useSelector(state => state)
  const [data,setData]= useState('');

// const login = localStorage.getItem("login");
 


 

const LoginIds = localStorage.getItem("loginId")

console.log("LoginIds",LoginIds)





useEffect(() => {
  const login = localStorage.getItem("login");
  if (login) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
      const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
      setData(parsedData);
    
    } 
    catch (error) {
      console.error("Error parsing decrypted data:", error);
      
    }
    
  }


  setIsLoading(false);
}, []);

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
              {/* <Route path="/login-Page" element={<LoginPage />} /> */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          :
          <Router>
            <Routes>
              <Route index  element={<FrontPage />} />
              <Route path="/login-Page" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/forget-password" element={< ForgetPassword />} />
              <Route path="*" element={<Navigate to="/login-page" replace />} />
            </Routes>
          </Router>

      }
    </div>
  );
}

export default App;
