/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import FrontPage from './NewLandingPage/Topbar';
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreSelectedHostelAction } from './Redux/Action/smartStayAction';
import LoaderComponent from './Pages/LoaderComponent';
import ThankYou from './NewLandingPage/ThankYou';
import Sidebar from './Components/Sidebar';
// import PaymentPreview from "./Pages/SubscriptionFile/PaymentPreview";

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);




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



  useEffect(() => {
    if (state.AssetList?.unAuthorized) {
      dispatch({ type: 'LOG_OUT' });
      setData(false);
      localStorage.clear();

    }

  }, [state.AssetList?.unAuthorized])




  useEffect(() => {
    if (!state.login?.isLoggedIn && !data) {
      dispatch({ type: 'CLEAR_DASHBOARD' })
      dispatch(StoreSelectedHostelAction(""))
      cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
      localStorage.clear();
      localStorage.removeItem("lastPage");
      localStorage.removeItem("currentPage")
      localStorage.setItem("selectedResponseHostelId", "");
      

    }
  }, [state.login?.isLoggedIn]);


  if (loading) {
    return <LoaderComponent />;
  }





  return (

    <> <ToastContainer />


      <Router future={{ v7_startTransition: true }}>
        {data || state.login?.isLoggedIn ? (
          <>
          <Sidebar />
           
           
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<FrontPage />} />
               {/* <Route path="/payment-preview" element={<PaymentPreview />} /> */}
              <Route path="/hostel-management-login" element={<LoginPage />} />
              <Route path="/hostel-management-signup" element={<CreateAccount />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/hostel-management-features" element={<FrontPage />} />
              <Route path="/hostel-software-pricing" element={<FrontPage />} />
              <Route path="/pg-software-contact" element={<FrontPage />} />
              <Route path="/privacy-policy" element={<FrontPage />} />
              <Route path="/refund_policy" element={<FrontPage />} />
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
