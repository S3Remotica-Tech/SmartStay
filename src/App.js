import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import FrontPage from "./Components/FrontPage"
import FrontPage from './LandingPage/All_Landing_pages';
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import Hostel from './Components/Hostel_Management';
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
import { Circles } from 'react-loader-spinner';


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
          }, 100);
        } else if (login) {
          const decryptedData = CryptoJS.AES.decrypt(login, 'abcd');
          const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
          const parseData = JSON.parse(decryptedString);
          const is_Enable = state.createAccount?.accountList[0]?.user_details.isEnable;


          console.log("login", parseData)

          if (is_Enable === 1 || !parseData) {
            setData(false);
          } else {
            setData(true);
          }
        }
        //  else if (state.login?.isLoggedIn) {
        //   setData(true);
        // } else {
        //   setData(false);
        // }
      } catch (error) {
        console.error('Error during login validation:', error);
        setData(false);
      } finally {
        setLoading(false); // Stop loading regardless of the result
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
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {data || state.login?.isLoggedIn ? (
          <>
            <Route path="/Hostel-Management" element={<Hostel />} />
            {/* <Route path="/bed" element={<BedDetails />} />
            <Route path="/roomList" element={<DashboardRoomList />} /> */}
            <Route path="*" element={<Navigate to="/Hostel-Management" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login-Page" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
