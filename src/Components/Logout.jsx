/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Cookies from 'universal-cookie';
function Logout({ show, handleClose }) {

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
      dialogClassName="custom-delete-modal"
    >

      <Modal.Header className="border-0">
        <Modal.Title className="flex-1 text-center !text-lg !font-semibold !font-gilroy !text-gray-900">
          Logout?
        </Modal.Title>
      </Modal.Header>


      <Modal.Body className="text-sm font-medium font-gilroy text-gray-600 text-center -mt-5">
        Are you sure you want Logout?
      </Modal.Body>


      <Modal.Footer className="!flex !flex-row !flex-nowrap !justify-center !items-center !border-t-0 !-mt-2 !gap-2.5">
        <Button
          className="!w-40 !h-13 !rounded-lg !px-5 !py-3 !bg-white !text-[#1E45E1] !border !border-[#1E45E1] !font-gilroy !font-semibold !text-sm"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className="!w-40 !h-13 !rounded-lg !px-5 !py-3 !bg-[#1E45E1] !text-white !font-gilroy !font-semibold !text-sm"
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