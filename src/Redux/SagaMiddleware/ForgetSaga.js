import { takeEvery, call, put } from "redux-saga/effects";
import { forgetpage, otpSend ,otpVerify} from "../Action/ForgetAction";
import Swal from 'sweetalert2'


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

// function* handleOtpVerify(action) {
//     console.log("action",action)
//     console.log("action.payload",action.payload)
//     const response = yield call(otpVerify, action.payload);
//         console.log("response for  otp VERIFY",response)
//     if (response.status === 200) {
//         yield put({ type: 'OTP_VERIFY', payload:{ response:response.data,statusCode:response.status}})
//     }else if(response.status === 201){
       
//     }
//     else {
//         yield put({ type: 'ERROR', payload: response.data.message })
//     }
// }

function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
    yield takeEvery('OTPSEND', handleSendOtp)
    // yield takeEvery('OTPVERIFY', handleOtpVerify)

}
export default ForgetSaga;