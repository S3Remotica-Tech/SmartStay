import { takeEvery, call, put } from "redux-saga/effects";
import { forgetpage, otpSend ,otpVerify,OTPverificationForForgotPassword} from "../Action/ForgetAction";
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';

function* handleforgetpage(rpsd) {
    try {
        const response = yield call(forgetpage, rpsd.payload)
        if (response.status === 200) {
            yield put({ type: 'NEWPASSWORD_LIST', payload:{ response:response.data,statusCode:response.status} })
            Swal.fire({
                title: "Good job!",
                text: "NewPassword is Updated",
                icon: "success",
                timer: 1000,
            });

        }
        else if (response.status === 203) {
            yield put({ type: 'ERROR', payload: response.data.message })
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: response.data.message ,
                timer: 1000,
            });

        } else if (response.status === 201) {
            yield put({ type: 'OTP_ERROR', payload: response.data.message })
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: response.data.message ,
                timer: 1000,
            });
        }
    }
    catch (error) {
        yield put({ type: 'ERROR', payload: 'Email Id Is Inorrect' })
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Id is InCorrect!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });

    }

}


function* handleSendOtp(action) {
    const response = yield call(otpSend, action.payload);

    if (response.status === 200) {
        yield put({ type: 'OTP_SEND', payload:{ response:response.data,statusCode:response.status}})
        Swal.fire({
            title: "Good job!",
            text: "OTP is Send your Email_id",
            icon: "success",
            timer: 1000,
        });
    }else if(response.status === 201){
        yield put({ type: 'EMAIL_ERROR', payload: { response:response.data.message,statusCode:response.status}})
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: response.data.message 
                
            });
    }
    else if(response.status === 203) {
        yield put({ type: 'SEND_EMAIL_ERROR', payload: {response: response.data.message ,statusCode:response.status}})
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: response.data.message ,
                timer:1000,
            });
    }
}

function* handleOtpVerifyforForgotPassword(action) {
     const response = yield call(OTPverificationForForgotPassword, action.payload);
        console.log("response for  otp VERIFY",response)
    if (response.status === 200) {
        yield put({ type: 'OTPVERIFY_FORGOT_PASSWORD', payload:{ response:response.data,statusCode:response.status}})
    }else if(response.status === 201){
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            html: `Enter Valid Otp`,
          });
    }
    else {
        yield put({ type: 'ERROR', payload: response.data.message })
    }
}

function refreshToken(response){
    if(response.data.refresh_token){
       const refreshTokenGet = response.data.refresh_token
       console.log("refreshTokenGet",refreshTokenGet)
       const cookies = new Cookies()
       cookies.set('token', refreshTokenGet, { path: '/' });
    }else if (response.status === 206) {
        const message = response.status
        const cookies = new Cookies()
        cookies.set('access-denied', message, { path: '/' });
      
     }
    
    }



function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
    yield takeEvery('OTPSEND', handleSendOtp)
    yield takeEvery('OTPVERIFYFORGOTPASSWORD', handleOtpVerifyforForgotPassword)

}
export default ForgetSaga;