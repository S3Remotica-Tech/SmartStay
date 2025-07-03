import { takeEvery, call, put } from "redux-saga/effects";
import { forgetpage, otpSend, OTPverificationForForgotPassword } from "../Action/ForgetAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

        if (response.status === 200 || response.statusCode === 200) {
            yield put({ type: 'NEWPASSWORD_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode } })

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
        else if (response.status === 203 || response.statusCode === 203) {
            yield put({ type: 'ERROR', payload: response.data.message })
          

        } else if (response.status === 201 || response.statusCode === 201) {
            yield put({ type: 'OTP_ERROR', payload: response.data.message })
          
        }
    }
    catch (error) {
        yield put({ type: 'ERROR', payload: 'Email Id Is Inorrect' })
       console.error(error)
      

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
    if (response.status === 200 || response.statusCode === 200) {
        yield put({ type: 'OTP_SEND', payload: { response: response.data, statusCode: response.status || response.statusCode } })
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
    } else if (response.status === 201 || response.statusCode === 201) {
        yield put({ type: 'EMAIL_ERROR', payload: { response: response.data.message, statusCode: response.status || response.statusCode } })
       
    }
    else if (response.status === 203 || response.statusCode === 203) {
        yield put({ type: 'SEND_EMAIL_ERROR', payload: { response: response.data.message, statusCode: response.status || response.statusCode } })
       
    }
     }
  catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }

  }
}

function* handleOtpVerifyforForgotPassword(action) {
    try{
    const response = yield call(OTPverificationForForgotPassword, action.payload);
    if (response.status === 200 || response.statusCode === 200) {
        yield put({ type: 'OTPVERIFY_FORGOT_PASSWORD', payload: { response: response.data, statusCode: response.status || response.statusCode } })
    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'OTP_INVALID_ERROR', payload: response.data.message })

    }
    else {
        yield put({ type: 'ERROR', payload: response.data.message })
    }
 }
  catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }

  }
}


function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
    yield takeEvery('OTPSEND', handleSendOtp)
    yield takeEvery('OTPVERIFYFORGOTPASSWORD', handleOtpVerifyforForgotPassword)

}
export default ForgetSaga;