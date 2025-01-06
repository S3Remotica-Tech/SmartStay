import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FrontPage from './LandingPage/All_Landing_pages';
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
import ContactUs from './LandingPage/ContactUs';
import CookiesFooter from './LandingPage/Cookies'



function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = localStorage.getItem("login");
  const tokenAccessDenied = cookies.get('access-denied');

  useEffect(() => {
    const validateLogin = async () => {
      try {
        if (tokenAccessDenied === 206) {
          setTimeout(() => {
            dispatch({ type: 'LOG_OUT' });
            setData(false);
            cookies.set('access-denied', null, { path: '/', expires: new Date(0) });

            localStorage.setItem("loginId", '')
            localStorage.setItem("NameId", '')
            localStorage.setItem("phoneId", '')
            localStorage.setItem("emilidd", '')
            localStorage.setItem("Password", '');
            localStorage.setItem("login", '')




          }, 100);
        } else if (login) {
          const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
          const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
          const parseData = JSON.parse(decryptedString);
          const is_Enable = state.createAccount?.accountList[0]?.user_details.isEnable;



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
    };

    validateLogin();
  }, [login, state.createAccount, state.login?.isLoggedIn, tokenAccessDenied]);

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
   

    <Router>
      <Routes>
        {data || state.login?.isLoggedIn ? (
          <>
            <Route path="/" element={<Hostel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
           
          </>
        ) : (
          <>
            <Route path="/" element={<FrontPage />} />
            <Route path="/Terms-Condition" element={ <TermsAndCondition />} />
            <Route path="/Privacy-Policy" element={ <TermsAndCondition />} />
            <Route path="/Contact-Us" element={ <TermsAndCondition/>} />
            <Route path="/Cookies" element={ <TermsAndCondition/>} />
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
