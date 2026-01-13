/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Cookies from 'universal-cookie';
function Logout({show, handleClose}) {

const state = useSelector((state) => state);
  const dispatch = useDispatch();
    const cookies = new Cookies();
 const handleLogout = () => {
      dispatch({ type: 'LOGOUTADMINSAGA', payload: { source: "WEB" } })
      const token = cookies.get('v2-token');
  
      if (!token) {
        dispatch({ type: "LOG_OUT" });
        dispatch({ type: 'RESET_ALL' })
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
        localStorage.setItem("login", encryptData.toString());
        return;
      }
    };
  
  
    useEffect(() => {
      if (state.login?.logoutAdminStatusCode === 200) {
        dispatch({ type: "LOG_OUT" });
        dispatch({ type: 'RESET_ALL' })
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
        localStorage.setItem("login", encryptData.toString());
        cookies.remove('selected_hostelId', { path: '/' });
        cookies.remove('v2-token', { path: '/' });
        cookies.remove('token', { path: '/' });
        localStorage.setItem("loginId", "");
        localStorage.setItem("phoneId", "");
        localStorage.setItem("emilidd", "");
        localStorage.setItem("selectedHostelName", "");
        localStorage.removeItem("lastPage");
        localStorage.removeItem("currentPage")
  
  
        setTimeout(() => {
          dispatch({ type: 'REMOVE_LOGOUT_ADMIN' })
        }, 1000)
      }
  
    }, [state.login?.logoutAdminStatusCode])


  return (
     <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            className="logout-card d-flex justify-content-center align-items-center"
            dialogClassName="custom-modal-width"
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                style={{
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#222222",
                  flex: 1,
                }}
              >
                Logout?
              </Modal.Title>
            </Modal.Header>
    
            <Modal.Body
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Gilroy",
                color: "#646464",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              Are you sure you want Logout?
            </Modal.Body>
    
            <Modal.Footer
              style={{
                justifyContent: "center",
                borderTop: "none",
                marginTop: "-10px",
              }}
            >
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#fff",
                  color: "#1E45E1",
                  border: "1px solid #1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  marginRight: 10,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#1E45E1",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
  )
}
Logout.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Logout