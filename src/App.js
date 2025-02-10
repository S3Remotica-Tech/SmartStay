import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FrontPage from './LandingPage/FrontPage';
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import Hostel from './Components/Hostel_Management';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Circles } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsAndCondition from "./LandingPage/TermsCondition"
import { StoreSelectedHostelAction } from './Redux/Action/smartStayAction';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = localStorage.getItem("login");
  const [tokenAccessDenied, setTokenAccessDenied] = useState(Number(cookies.get('access-denied')));




  useEffect(() => {

    try {
      if (login) {
        const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parseData = JSON.parse(decryptedString);
        const is_Enable = state.createAccount?.accountList[0]?.user_details?.isEnable;



        if (is_Enable === 1 || !parseData) {
          setData(false);
        } else {
          setData(true);
        }
      }

    } catch (error) {
      console.error('Error during login validation:', error);
      setData(false);
    } finally {
      setLoading(false);
    }



  }, [login, state.createAccount, state.login?.isLoggedIn]);


  useEffect(() => {
    if (tokenAccessDenied == 206) {
      dispatch({ type: 'LOG_OUT' });
      setData(false);
      cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
      localStorage.clear();

    }
  }, [tokenAccessDenied]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTokenAccessDenied(Number(cookies.get('access-denied')));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (!state.login?.isLoggedIn && !data) {
      // dispatch({ type: 'CLEAR_HOSTEL_LIST' });
      dispatch({ type: 'CLEAR_DASHBOARD' })
      dispatch(StoreSelectedHostelAction(""))
      cookies.set('access-denied', null, { path: '/', expires: new Date(0) });
    }
  }, [state.login?.isLoggedIn]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Circles
          height="80"
          width="80"
          color="#1E45E1"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }





  return (

    <> <ToastContainer />


      <Router future={{ v7_startTransition: true }}>
        <Routes>
          {data || state.login?.isLoggedIn ? (
            <>
              <Route path="/" element={<Hostel />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          ) : (
            <>
              <Route path="/" element={<FrontPage />} />
              <Route path="/Terms-Condition" element={<TermsAndCondition />} />
              <Route path="/Privacy-Policy" element={<TermsAndCondition />} />
              <Route path="/Contact-Us" element={<TermsAndCondition />} />
              <Route path="/Cookies" element={<TermsAndCondition />} />
              <Route path="/login-Page" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
