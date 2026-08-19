/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import Form from "react-bootstrap/Form";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from '@mui/material/styles';
import Button from "react-bootstrap/Button";
import "../../Pages/Settings/SettingSecurityPage.css";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const Profile_Security = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const LoginId = localStorage.getItem("loginId");
    const Loginemail = localStorage.getItem("emilidd");
  
  const [email_IdForLoginUser, setEmail_IdForLoginUser] = useState("");

  useEffect(() => {
    if (LoginId) {
      try {
        
        const decryptedDataemail = CryptoJS.AES.decrypt(Loginemail, "abcd");
        const decryptedStringemail = decryptedDataemail.toString(
          CryptoJS.enc.Utf8,
        );
                setEmail_IdForLoginUser(decryptedStringemail);

              } catch (error) {
        console.error("Error decrypting LoginId:", error);
      }
    }
  }, [LoginId]);

  const [isChecked, setIsChecked] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [initialIsEnable, setInitialIsEnable] = useState(null);

  const [isCheckedvalue, setIsCheckedvalue] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);

    if (newValue !== initialIsEnable) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSwitchChange = (e) => {
    // Prevent the switch from toggling
    e.preventDefault();
    setIsCheckedvalue(false);
  };

  const handleTwoStepVerify = () => {
    dispatch({
      type: "TWOSTEPVERIFY",
      payload: { emailId: email_IdForLoginUser, isEnable: isChecked },
    });
    dispatch({ type: "CLEAR_ERROR" });
  };

  useEffect(() => {
    if (state.createAccount.statusCodeTwo === 200) {
      dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODE_TWO_STEP" });
      }, 100);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUSCODE" });
      }, 200);
    }
  }, [state.createAccount.statusCodeTwo]);

  useEffect(() => {
    const UserIsEnable =
      state.createAccount.accountList[0]?.user_details.isEnable;
    const isEnableInitialValue = UserIsEnable === 1;

    setIsChecked(isEnableInitialValue);
    setInitialIsEnable(isEnableInitialValue); // Set the initial value

    if (UserIsEnable === 1) {
      localStorage.setItem("IsEnable", "");
    }

    setIsChanged(false);
  }, [state.createAccount.accountList]);

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="overflow-hidden w-full">
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center mt-2 w-full">
        <label className="text-black font-gilroy font-semibold text-lg w-full md:w-auto">
          Security
        </label>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full mt-2">
        <div className="w-full md:w-2/3">
          <h6 className="text-[#222222] font-gilroy font-semibold text-[16px] md:text-[14px] lg:text-[16px] leading-normal">
            Enable Two-factor Authentication
          </h6>
          <p className="font-montserrat font-medium text-[#4B4B4B] leading-[19.6px] text-[14px] md:text-[12px] lg:text-[14px]">
            Enhance your account security by enabling two-factor authentication.
            This adds an extra layer of protection, ensuring only you can access
            your account.
          </p>
        </div>
        <div className="w-full md:w-1/6 flex items-center mt-2 md:mt-0">
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={isChecked}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full mt-2">
        <div className="w-full md:w-2/3">
          <h6 className="text-[#222222] font-gilroy font-semibold text-[16px] md:text-[14px] lg:text-[16px] leading-normal">
            Email Setup
          </h6>
          <p className="font-montserrat font-medium text-[#4B4B4B] leading-[19.6px] text-[14px] md:text-[12px] lg:text-[14px]">
            Configure email authentication to receive security notifications and
            verification codes directly in your inbox.
          </p>
        </div>
        <div className="w-full md:w-1/6 flex items-center mt-2 md:mt-0">
          <Form.Check
            type="switch"
            id="custom-switch-email"
            checked={isCheckedvalue}
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full mt-2">
        <div className="w-full md:w-2/3">
          <h6 className="text-[#222222] font-gilroy font-semibold text-[16px] md:text-[14px] lg:text-[16px] leading-normal">
            SMS Setup
          </h6>
          <p className="font-montserrat font-medium text-[#4B4B4B] leading-[19.6px] text-[14px] md:text-[12px] lg:text-[14px]">
            Set up SMS authentication to receive security alerts and
            verification codes via text messages for added account protection.
          </p>
        </div>
        <div className="w-full md:w-1/6 flex items-center mt-2 md:mt-0">
          <Form.Check
            type="switch"
            id="custom-switch-sms"
            checked={isCheckedvalue}
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      <div className="flex justify-start mt-3 mb-2 w-full">
        <Button
          onClick={handleTwoStepVerify}
          disabled={!isChanged}
          className="!font-gilroy !font-semibold !text-sm !text-white !bg-[#1E45E1] rounded-md py-3 px-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
export default withErrorBoundary(Profile_Security);
