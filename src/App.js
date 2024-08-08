import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import FrontPage from "./Components/FrontPage"
import FrontPage from './LandingPage/All_Landing_pages';
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import RoyalGrandHostel from './Components/RoyalGrandHostel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import BedDetails from './Pages/Bed';
import DashboardRoomList from './Pages/DashBoardRoomsList';
import CryptoJS from "crypto-js";
import InvoiceDetail from './Pages/InvoiceDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Token } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import Spinner from 'react-bootstrap/Spinner';
import KYC from './Pages/KycValidation'



function App() {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const loginId = localStorage.getItem("loginId")

  const login = localStorage.getItem("login");


  console.log("login data", data)


  // console.log("stateLogin.JWTtoken", token)

  // const tokenCookies = cookies.get('token');
  // console.log("tokenCookies", tokenCookies)



  // useEffect(() => {
  //   if(state.login.statusCode == 200){
  //         dispatch({ type: 'ACCOUNTDETAILS'})
  //     console.log("executed account details")
  //     setTimeout(()=>{
  //       dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE'})
  //       },2000)
  //        }
  //    }, [state.login.statusCode])


  const tokenAccessDenied = cookies.get('access-denied')
  console.log("tokenAccessDenied", tokenAccessDenied)


  useEffect(() => {
    if (tokenAccessDenied === 206) {
      setTimeout(() => {
        dispatch({ type: 'LOG_OUT' })
        setData(false)
        cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
      }, 100)

    }

  }, [tokenAccessDenied])


  useEffect(() => {
    let parseData = null;
    try {
      const is_Enable = state.createAccount?.accountList[0]?.user_details.isEnable;
      if (login) {
        const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        parseData = JSON.parse(decryptedString);
      }
      if (is_Enable === 1 || parseData === false) {
        setData(false);
      } else {
        setData(true);
      }
    } catch (error) {
      console.error("Error parsing decrypted data:", error);
    } finally {
      setLoading(false);
    }
  }, [login, state.createAccount]);
  


  // useEffect(() => {
  //   let parseData;
  //   try {
  //       const is_Enable = state.createAccount?.accountList[0]?.user_details.isEnable
  //       console.log("is_Enable", is_Enable)
  //       if(login){
  //       const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
  //       const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
  //       parseData = JSON.parse(decryptedString);
  //       console.log("parseData", parseData)
  //       // setIsLoading(false)
  //       }
  //       if (is_Enable == 1 || parseData == false) {
  //         setData(false);
  //         console.log("execute data true case enable is 1")
  //       } else {
  //         setData(true);
  //         console.log("execute data true case enable is 0")
  //       }
  //      }
  //   catch (error) {
  //     console.error("Error parsing decrypted data:", error);
  //   }
        
  // }, [login]);


  // useEffect(() => {
  //   if (!state.login?.isLoggedIn && login){
  //     let parseData;
  //     setTimeout(()=>{
  //     const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
  //     const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
  //      parseData = JSON.parse(decryptedString);
  //     console.log("parseData", parseData)
  //     if (parseData == false) {
  //       setData(false);
  //     }
  //     },2000)
   
     
  //   }
  // }, [state.login?.isLoggedIn])


console.log("state.login?.isLoggedIn",state)

console.log("login",login)



useEffect(() => {
  if (!state.login?.isLoggedIn && login) {
    let parseData = null;
    setTimeout(() => {
      const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
      const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
      parseData = JSON.parse(decryptedString);
      if (parseData === false) {
        setData(false);
      }
      setLoading(false);
    }, 2000);
  } else {
    setLoading(false);
  }
}, [state.login?.isLoggedIn, login]);

if (loading) {
  return <div >Loading ......</div>; // Display loading component while processing
}



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

  // const [isLoading, setIsLoading] = useState(true);


  // if (isLoading) {
  //   return <div style={{ display: 'flex', justifyContent: 'center' }}> <Spinner animation="border" variant="primary" /></div>
  // }



  return (
    // <div>

    //   {
    //     data ||
    //       state.login?.isLoggedIn ?
    //       <Router>
    //         <Routes>

    //           <Route index path="/" element={<RoyalGrandHostel />}></Route>
    //           <Route path='/Bed' element={< BedDetails />} ></Route>
    //           <Route path='/roomList' element={<DashboardRoomList />} />
    //           {/* <Route path="/login-Page" element={<LoginPage />} /> */}
    //           <Route path="*" element={<Navigate to="/" replace />} />
    //         </Routes>
    //       </Router>
    //       : 
    //       <Router>
    //         <Routes>
    //           <Route path="/"  element={<FrontPage />} />
    //           <Route path="/login-Page" element={<LoginPage />} />
    //           <Route path="/create-account" element={<CreateAccount />} />
    //           <Route path="/forget-password" element={< ForgetPassword />} />
    //           <Route path="*" element={<Navigate to="/login-page" replace />} />
    //         </Routes>
    //       </Router>

    //   }
    // </div>
    <>
      <Router>
      <Routes>
   
        {data || state.login?.isLoggedIn ? (
          <>
            <Route path="/" element={<RoyalGrandHostel />} />
            <Route path="/bed" element={<BedDetails />} />
            <Route path="/roomList" element={<DashboardRoomList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
           <Route path="/" element={<FrontPage />} />
            <Route path="/login-Page" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            {/* <Route path="/kyc" element={<KYC />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
           

          </>
        )}
      </Routes>
    </Router>
    </>
  );
}

export default App;
