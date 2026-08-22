/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLandingPage from "./NewV2LandingPage/MainLandingPage";
import LoginPage from "./Components/LoginPage";
import CreateAccount from "./Components/CreateAccount";
import ForgetPassword from "./Components/Forgetpass";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreSelectedHostelAction } from "./Redux/Action/LoginAction";
import ThankYou from "./NewV2LandingPage/ThankYou";
import Sidebar from "./Components/Sidebar";
import { messaging, onMessageListener } from "./Utils/FirebaseNotification";
import { getToken } from "firebase/messaging";
import WebNotification from "./Utils/WebNotification";

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = localStorage.getItem("login");
  const TwoStepEnable = localStorage.getItem("IsEnable");

  useEffect(() => {
    try {
      if (login) {
        const decryptedData = CryptoJS.AES.decrypt(login, "abcd");
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parseData = JSON.parse(decryptedString);

        const decryptedDataTwoStepEnable = CryptoJS.AES.decrypt(
          TwoStepEnable,
          "abcd",
        );
        const decryptedStringTwoStepEnable =
          decryptedDataTwoStepEnable?.toString(CryptoJS.enc.Utf8);

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
  }, [
    state.createAccount?.accountList,
    state.login?.isLoggedIn,
    login,
    TwoStepEnable,
  ]);

  useEffect(() => {
    if (state.AssetList?.unAuthorized) {
      dispatch({ type: "LOG_OUT" });
      setData(false);
      localStorage.clear();
      cookies.remove("selected_hostelId", { path: "/" });
    }
  }, [state.AssetList?.unAuthorized]);

  useEffect(() => {
    if (state.login?.isLoggedIn) {
      const askPermission = async () => {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BMXC5Wm4kkMiJDq2o98v_QMaXMctNWwtuFlpezETQ-hpSLG1HIKsN0SIFKW-ebfg8tILguRwWisjb0-syzlRgFE",
          });

          if (token) {
            dispatch({
              type: "FCMTOKENSAGA",
              payload: { token: token, source: "Web" },
            });
          }
        }
      };

      askPermission();
    }
  }, [state.login?.isLoggedIn]);

  const [notification, setNotification] = useState(null);

  // const showBrowserNotification = (title, body, type) => {
  //   if (!("Notification" in window)) {

  //     return;
  //   }

  //   if (Notification.permission === "granted") {
  //     new Notification(title, {
  //       body,
  //       // icon: "/firebase-logo.png" // optional
  //     });
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         new Notification(title, { body });
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      const title = payload?.data?.title || "New Notification";
      const message = payload?.data?.description || "You have a new message";

      setNotification({
        title,
        message,
      });
      setTimeout(() => setNotification(null), 5000);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const token = cookies.get("v2-token");
  useEffect(() => {
    if (!token) {
      dispatch({ type: "LOG_OUT" });
      setData(false);
    }
  }, [token]);

  useEffect(() => {
    if (!state.login?.isLoggedIn && !data) {
      dispatch({ type: "CLEAR_DASHBOARD" });
      dispatch(StoreSelectedHostelAction(""));
      cookies.set("access-denied", null, { path: "/", expires: new Date(0) });
      localStorage.clear();
      localStorage.removeItem("lastPage");
      localStorage.removeItem("currentPage");
      // localStorage.setItem("selectedResponseHostelId", "");
      // cookies.remove('selected_hostelId', { path: '/' });
    }
  }, [state.login?.isLoggedIn]);

  // if (loading) {
  //   return <LoaderComponent />;
  // }

  useEffect(() => {
    if (state.login?.logoutLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state.login?.logoutLoading]);

  return (
    <>
      {" "}
      <ToastContainer />
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <WebNotification
            title={notification.title}
            message={notification.message}
            image={notification.image}
            time={notification.time}
          />
        </div>
      )}
      <Router future={{ v7_startTransition: true }}>
        {data || state.login?.isLoggedIn ? (
          <>
            <Sidebar />
          </>
        ) : (
          <>
            <Routes>
              {/* <Route path="/" element={<FrontPage />} /> */}
              <Route path="/" element={<MainLandingPage />} />
              {/* <Route path="/payment-preview" element={<PaymentPreview />} /> */}
              <Route path="/hostel-management-login" element={<LoginPage />} />
              <Route
                path="/hostel-management-signup"
                element={<CreateAccount />}
              />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/hostel-management-features"
                element={<MainLandingPage />}
              />
              <Route
                path="/hostel-software-pricing"
                element={<MainLandingPage />}
              />
              <Route
                path="/pg-software-contact"
                element={<MainLandingPage />}
              />
              <Route path="/privacy-policy" element={<MainLandingPage />} />
              <Route path="/refund_policy" element={<MainLandingPage />} />
              <Route path="/demo" element={<MainLandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/thankyou" element={<ThankYou />} />
            </Routes>
          </>
        )}
      </Router>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-[99999]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#1E45E1] border-t-transparent rounded-full animate-spin"></div>

            <p className="text-[#1E45E1] font-semibold font-gilroy text-sm">
              Logging out...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
