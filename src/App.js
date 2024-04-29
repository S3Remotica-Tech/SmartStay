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
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import BedDetails from './Pages/Bed';
import DashboardRoomList from './Pages/DashBoardRoomsList';
import CryptoJS from "crypto-js";
import InvoiceDetail from './Pages/InvoiceDetails';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [data,setData]= useState('');

// const login = localStorage.getItem("login");
 
console.log("state app.js",state)

 
console.log("data", data)



useEffect(() => {
    dispatch({ type: 'ACCOUNTDETAILS' })
    console.log("executed account details")
}, [])


const loginId = localStorage.getItem("loginId")



useEffect(() => {
  // console.log("LoginIds",loginId)

  // const login = localStorage.getItem("login");
 
     try {

      const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
      const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
      console.log('Decrypted Login Id:', decryptedIdString);
      const parsedData = Number(decryptedIdString);

      console.log("parsedData",parsedData )


      const IsEnableCheckState = state.createAccount?.accountList.filter((view => view.id == parsedData))
      const is_Enable = IsEnableCheckState[0]?.isEnable
console.log("IsEnableCheck",IsEnableCheckState)
console.log("is_Enable",is_Enable)

  if (is_Enable == 1) {
    setData(false);
  } else {
       setData(true);
  }
      // const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
      // const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
      // const parsedData = JSON.parse(decryptedString);
    // setData(parsedData);
      
    } 
    catch (error) {
      console.error("Error parsing decrypted data:", error);
      
    }
      
  setIsLoading(false);
}, [state.createAccount.accountList]);



//  useEffect(() => {

//   console.log("executed")
//   const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
//   const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
//   const parsedData = decryptedString;


  
//   console.log("IsEnableCheckState", IsEnableCheckState)

//   const is_Enable = IsEnableCheckState[0]?.isEnable

//   console.log("is_Enable sidebar", is_Enable)

//   if (is_Enable == 1) {
//     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
//     console.log("encryptData", encryptData.toString());
//     localStorage.setItem("login", encryptData.toString());
//   } else {
//     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
//     console.log("encryptData", encryptData.toString());
//     localStorage.setItem("login", encryptData.toString());

//   }


// }, [state.createAccount.accountList, LoginId])
 
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
