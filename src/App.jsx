/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import FrontPage from './LandingPage/FrontPage';
import FrontPage from './NewLandingPage/Topbar';
// import Policy from "./NewLandingPage/PrivacyPolicy"
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
// import Hostel from './Components/Hostel_Management';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreSelectedHostelAction } from './Redux/Action/smartStayAction';
import LoaderComponent from './Pages/LoaderComponent';
// import Contact from './NewLandingPage/Contact';
import ThankYou from './NewLandingPage/ThankYou';
import Sidebar from './Components/Sidebar';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  // const [tokenAccessDenied, setTokenAccessDenied] = useState(Number(cookies.get('access-denied')));


  const login = localStorage.getItem("login");
  const TwoStepEnable = localStorage.getItem("IsEnable");


  useEffect(() => {

    try {
      if (login) {

        const decryptedData = CryptoJS.AES.decrypt(login, "abcd");
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parseData = JSON.parse(decryptedString);


        const decryptedDataTwoStepEnable = CryptoJS.AES.decrypt(TwoStepEnable, "abcd");
        const decryptedStringTwoStepEnable = decryptedDataTwoStepEnable?.toString(CryptoJS.enc.Utf8);

        let parseDataTwoStepEnable = false;
        try {
          parseDataTwoStepEnable = JSON.parse(decryptedStringTwoStepEnable);
        } catch {
          parseDataTwoStepEnable = decryptedStringTwoStepEnable === "true";
        }



        if (parseDataTwoStepEnable === true || !parseData) {
          setData(false);
        } else if (parseDataTwoStepEnable === false && parseData) {
          setData(true);
        }
      }
    } catch {
      setData(false);
    } finally {
      setLoading(false);
    }
  }, [state.createAccount?.accountList, state.login?.isLoggedIn, login, TwoStepEnable]);



  // useEffect(() => {
  //   const token = cookies.get('v2-token');
  //   if (token) {
  //     dispatch({ type: "LOGIN_SUCCESS", payload: { token } });
  //     setData(true); 
  //   }
  // }, []);



  // useEffect(() => {
  //   if (tokenAccessDenied === 206) {
  //    
  //     cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
  //     localStorage.clear();

  //   }
  // }, [tokenAccessDenied]);


useEffect(()=>{
  if(state.AssetList?.unAuthorized){
    dispatch({ type: 'LOG_OUT' });
    setData(false);
    localStorage.clear();

  }

},[state.AssetList?.unAuthorized])


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTokenAccessDenied(Number(cookies.get('access-denied')));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    if (!state.login?.isLoggedIn && !data) {

      dispatch({ type: 'CLEAR_DASHBOARD' })
      dispatch(StoreSelectedHostelAction(""))
      cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
      localStorage.clear();
       localStorage.removeItem("lastPage");
       localStorage.removeItem("currentPage")
      //  cookies.remove('v2-token', { path: '/' });

    }
  }, [state.login?.isLoggedIn]);


  if (loading) {
    return <LoaderComponent />;
  }





  return (

    <> <ToastContainer />


      <Router future={{ v7_startTransition: true }}>
        {/* <Routes> */}
        {data || state.login?.isLoggedIn ? (
          <>
            {/* <Route path="/" element={<Sidebar />} />
              <Route path="*" element={<Navigate to="/" replace />} /> */}
            <Sidebar />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              {/* <Route path="/Terms-Condition" element={<TermsAndCondition />} />
              <Route path="/Privacy-Policy" element={<Privacy />} />
              <Route path="/Contact-Us" element={<Contact />} />
              <Route path="/Cookies" element={<Cookies_policy />} /> */}
              <Route path="/hostel-management-login" element={<LoginPage />} />
              <Route path="/hostel-management-signup" element={<CreateAccount />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/hostel-management-features" element={<FrontPage />} />
              <Route path="/hostel-software-pricing" element={<FrontPage />} />
              <Route path="/pg-software-contact" element={<FrontPage />} />
              <Route path="/privacy-policy" element={<FrontPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/thankyou" element={<ThankYou />} />
            </Routes>
          </>
        )}

      </Router>
    </>
  );
}

export default App;
