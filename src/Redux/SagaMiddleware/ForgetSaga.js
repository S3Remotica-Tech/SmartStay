import { takeEvery, call, put } from "redux-saga/effects";
import { forgetpage, otpSend } from "../Action/ForgetAction";
import Swal from 'sweetalert2'


function* handleforgetpage(rpsd) {
    try {
        const response = yield call(forgetpage, rpsd.payload)
        console.log("response", response)
        if (response.status === 200) {
            yield put({ type: 'NEWPASSWORD_LIST', payload: response.data })
            Swal.fire({
                title: "Good job!",
                text: "NewPassword is Updated",
                icon: "success",
                timer: 1000,
            });

        }
        else if (response.status === 201) {
            yield put({ type: 'ERROR', payload: response.data.message })

        } else if (response.status === 404) {
            yield put({ type: 'OTP_ERROR', payload: response.data.message })
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
            });
        }
    }
    catch (error) {
        // yield put({ type: 'ERROR', payload: 'Email Id Is Inorrect' })
        // Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "Email Id is InCorrect!",
        //     footer: '<a href="#">Why do I have this issue?</a>'
        // });

    }

}


function* handleSendOtp(action) {
    const response = yield call(otpSend, action.payload);
    console.log("action.payload",action.payload)
    console.log("response for send otp",response)

    if (response.status === 200) {
        yield put({ type: 'OTP_SEND', payload:{ response:response.data,statusCode:response.status}})
        Swal.fire({
            title: "Good job!",
            text: "OTP is Send your Email_id",
            icon: "success",
            timer: 1000,
        });
    }else if(response.status === 404){
        yield put({ type: 'EMAIL_ERROR', payload: response.data.message })
        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message 
                
            });
    }
    else {
        yield put({ type: 'ERROR', payload: response.data.message })
    }
}



function* ForgetSaga() {
    yield takeEvery('FORGETPAGE', handleforgetpage)
    yield takeEvery('OTPSEND', handleSendOtp)

}
export default ForgetSaga;