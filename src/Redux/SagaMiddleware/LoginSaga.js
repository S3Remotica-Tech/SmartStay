import { call, takeEvery, put } from 'redux-saga/effects';
import { login, OTPverification, loginV2 ,GetAllNotification, FCM_Token,LogoutAdmin,ReadNotification} from '../Action/LoginAction';


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
     
   }
   else if (error.code === "ERR_NETWORK") {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
     
   }
 
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

function* handleNotification(action) {
  try {
    const response = yield call(GetAllNotification, action.payload);

    if (response?.status === 200) {
      yield put({ type: 'ALL_NOTIFICATION', payload: { response: response.data, statusCode: response?.status }  })

    }
  }
  catch (error) {
    yield* handleApiError(error);

  }


}


function* handleFCM_Token(args) {
  try {
    const response = yield call(FCM_Token, args.payload);
    // console.log("response",response)
    if (response?.status === 200) {
      yield put({ type: 'FCM_TOKEN', payload: { response: response.data, statusCode: response?.status } });

    }
      }
  catch (error) {
    yield* handleApiError(error);
  }

}

function* handleLogoutAdmin(args) {
  try {
    const response = yield call(LogoutAdmin, args.payload);
    // console.log("response",response)
    if (response?.status === 200) {
      yield put({ type: 'LOGOUT_ADMIN', payload: { response: response.data, statusCode: response?.status } });

    }
      }
  catch (error) {
    yield* handleApiError(error);
  }

}


function* handleReadNotification(action) {
  try {
    const response = yield call(ReadNotification, action.payload)

    if (response?.status === 200) {
      yield put({ type: 'READ_NOTIFICATION', payload: { response: response.data, statusCode: response?.status } })

    }
  }
  catch (error) {
    yield* handleApiError(error);

  }

}




function* LoginSaga() {
  yield takeEvery('LOGOUTADMINSAGA',handleLogoutAdmin)
  yield takeEvery('FCMTOKENSAGA',handleFCM_Token)
  yield takeEvery('ALLNOTIFICATION', handleNotification)
  yield takeEvery('LOGININFO', handleLogin)
  yield takeEvery('OTPVERIFY', handleOTPVerified)
  yield takeEvery('LOGINVERSION2', handleLoginV2)
  yield takeEvery('READNOTIFICATION', handleReadNotification)


}
export default LoginSaga;