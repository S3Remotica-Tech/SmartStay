import { call, takeEvery, put } from 'redux-saga/effects';
import { login, OTPverification, loginV2 } from '../Action/smartStayAction';





function* handleLogin(args) {

  try {
    const response = yield call(login, args.payload);

 

    if (response?.status === 200 ) {
      yield put({ type: 'LOGIN-INFO', payload: { response: response.data, statusCode: response?.status  } });
    }
    else if (response?.status === 201 ) {
      yield put({ type: 'ERROR_EMAIL', payload: { response: response.data.message, statusCode: response?.status  } });

    } else if (response?.status === 202 ) {
      yield put({ type: 'ERROR_PASSWORD', payload: { response: response.data.message, statusCode: response?.status } });

    }
    else if (response?.status === 203 ) {
      yield put({ type: 'OTP_SUCCESS', payload: { response: response.data, statusCode: response?.status } });
    }
  }
  catch (error) {
    

    if (error?.status === 403) {
      yield put({
        type: 'INVALID_CREDENTIALS',
        payload: 'Invalid email or password'
      });
    } else if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({
        type: 'NETWORK_ERROR',
        payload: error.message || 'Something went wrong'
      });
    }
  }

}


function* handleLoginV2(args) {
  try {
    const response = yield call(loginV2, args.payload);
    if (response?.status === 200) {
      yield put({ type: 'LOGIN_VERSION_2', payload: { response: response.data, statusCode: response?.status  } });
      // yield put({ type: 'LOGININFO', payload: { email_Id: 'shree@gmail.com', password: 'Shree@2025' } });
    }
    else if (response?.status === 203 ) {
      yield put({ type: 'OTP_SUCCESS', payload: { response: response.data, statusCode: response?.status } });
    }
  }
  catch (error) {
    

    if (error?.status === 403) {
      yield put({
        type: 'INVALID_CREDENTIALS',
        payload: 'Invalid email or password'
      });
    } else if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({
        type: 'NETWORK_ERROR',
        payload: error.message || 'Something went wrong'
      });
    }
  }

}



function* handleOTPVerified(args) {
  try {
    const response = yield call(OTPverification, args.payload);
    if (response?.status === 200 ) {
      yield put({ type: 'OTP_VERIFY', payload: { response: response.data, statusCode: response?.status } });

    } else if (response?.status === 201 ) {
      yield put({ type: 'ERROR_OTP_CODE', payload:  response?.data?.message });


    }
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
    }
  }
}




function* LoginSaga() {
  yield takeEvery('LOGININFO', handleLogin)
  yield takeEvery('OTPVERIFY', handleOTPVerified)
  yield takeEvery('LOGINVERSION2', handleLoginV2)
  

  
}
export default LoginSaga;