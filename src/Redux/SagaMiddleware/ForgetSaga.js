import { takeEvery, call, put } from "redux-saga/effects";
import { forgetpage, otpSend, OTPverificationForForgotPassword } from "../Action/ForgetAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* handleApiError(error) {
  const status = error?.response?.status || error?.status;

  if (status === 401) {
    yield put({
      type: "UN-AUTHORIZED",
      payload: "Access Denied",
    });
  } 
  else if (status === 500) {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
    toast.error("Network error occurred", {
      style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } 
  else if (error.code === "ERR_NETWORK") {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
    toast.error("Network error occurred", {
      style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } 
  else {
    const msg = error?.message || "Something went wrong";
    yield put({ type: "NETWORK_ERROR", payload: msg });
    toast.error(msg, {
      style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
function* handleforgetpage(rpsd) {
    try {
        const response = yield call(forgetpage, rpsd.payload)

        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "auto",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

        };

        if (response?.status === 200 ) {
            yield put({ type: 'NEWPASSWORD_LIST', payload: { response: response.data, statusCode: response?.status  } })

            toast.success('updated successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle,
            });


        }
        else if (response?.status === 203 ) {
            yield put({ type: 'ERROR', payload:  response?.data?.message })
          

        } else if (response?.status === 201 ) {
            yield put({ type: 'OTP_ERROR', payload:  response?.data?.message })
          
        }
    }
    catch (error) {
       yield* handleApiError(error);
   }

}


function* handleSendOtp(action) {
    try{
    const response = yield call(otpSend, action.payload);
    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "fit-content",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };
    if (response?.status === 200 ) {
        yield put({ type: 'OTP_SEND', payload: { response: response.data, statusCode: response?.status  } })
        toast.success(`Check your inbox! We've sent you an OTP`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
        });
    } else if (response?.status === 201 ) {
        yield put({ type: 'EMAIL_ERROR', payload: { response: response.data.message, statusCode: response?.status  } })
       
    }
    else if (response?.status === 203 ) {
        yield put({ type: 'SEND_EMAIL_ERROR', payload: { response: response.data.message, statusCode: response?.status  } })
       
    }
     }
 catch (error) {
     yield* handleApiError(error);
   }
}

function* handleOtpVerifyforForgotPassword(action) {
    try{
    const response = yield call(OTPverificationForForgotPassword, action.payload);
    if (response?.status === 200 ) {
        yield put({ type: 'OTPVERIFY_FORGOT_PASSWORD', payload: { response: response.data, statusCode: response?.status } })
    } else if (response?.status === 201 ) {

        yield put({ type: 'OTP_INVALID_ERROR', payload:  response?.data?.message })

    }
    else {
        yield put({ type: 'ERROR', payload:  response?.data?.message })
    }
 }
 catch (error) {
      yield* handleApiError(error);
   }
}


function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
    yield takeEvery('OTPSEND', handleSendOtp)
    yield takeEvery('OTPVERIFYFORGOTPASSWORD', handleOtpVerifyforForgotPassword)

}
export default ForgetSaga;