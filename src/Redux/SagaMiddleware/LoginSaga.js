import { call, takeEvery, put } from 'redux-saga/effects';
import { login, OTPverification, loginV2 } from '../Action/smartStayAction';


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
   // else {
   //    const msg = error?.message || "Something went wrong";
   //    yield put({ type: "NETWORK_ERROR", payload: msg });
   //    toast.error(msg, {
   //       style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
   //       position: "top-right",
   //       autoClose: 2000,
   //       hideProgressBar: true,
   //       closeButton: false,
   //       closeOnClick: true,
   //       pauseOnHover: true,
   //       draggable: true,
   //       progress: undefined,
   //    });
   // }
}


function* handleLogin(args) {

  try {
    const response = yield call(login, args.payload);



    if (response?.status === 200) {
      yield put({ type: 'LOGIN-INFO', payload: { response: response.data, statusCode: response?.status } });
    }
    else if (response?.status === 201) {
      yield put({ type: 'ERROR_EMAIL', payload: { response: response.data.message, statusCode: response?.status } });

    } else if (response?.status === 202) {
      yield put({ type: 'ERROR_PASSWORD', payload: { response: response.data.message, statusCode: response?.status } });

    }
    else if (response?.status === 203) {
      yield put({ type: 'OTP_SUCCESS', payload: { response: response.data, statusCode: response?.status } });
    }
  }
  catch (error) {

    yield* handleApiError(error);
    if (error?.status === 403) {
      yield put({
        type: 'INVALID_CREDENTIALS',
        payload: 'Invalid email or password'
      });
    }

  }

}


function* handleLoginV2(args) {
  try {
    const response = yield call(loginV2, args.payload);
    if (response?.status === 200) {
      yield put({ type: 'LOGIN_VERSION_2', payload: { response: response.data, statusCode: response?.status } });

    }
    else if (response?.status === 203) {
      yield put({ type: 'OTP_SUCCESS', payload: { response: response.data, statusCode: response?.status } });
    }
  }
  catch (error) {

    yield* handleApiError(error);

    if (error?.status === 403) {
      yield put({
        type: 'INVALID_CREDENTIALS',
        payload: 'Invalid email or password'
      });
    }

  }

}



function* handleOTPVerified(args) {
  try {
    const response = yield call(OTPverification, args.payload);
    if (response?.status === 200) {
      yield put({ type: 'OTP_VERIFY', payload: { response: response.data, statusCode: response?.status } });

    } else if (response?.status === 201) {
      yield put({ type: 'ERROR_OTP_CODE', payload: response?.data?.message });


    }
  } catch (error) {
     yield* handleApiError(error);
   
  }
}




function* LoginSaga() {
  yield takeEvery('LOGININFO', handleLogin)
  yield takeEvery('OTPVERIFY', handleOTPVerified)
  yield takeEvery('LOGINVERSION2', handleLoginV2)



}
export default LoginSaga;