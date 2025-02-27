import { call, takeEvery, put } from 'redux-saga/effects';
import { login, OTPverification } from '../Action/smartStayAction';





function* Login(args) {

  try {
    const response = yield call(login, args.payload);
    if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'LOGIN-INFO', payload:{ response:response.data,statusCode:response.status || response.statusCode } });
          }
     else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Error',
      //   text: response.data.message,
      // });

    } else if (response.status === 202 || response.statusCode === 202 ) {
      yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Error',
      //   text: response.data.message,
      // });

    } 
    else if (response.status === 203 || response.statusCode === 203 ) {
      yield put({ type: 'OTP_SUCCESS', payload: {response: response.data, statusCode:response.status || response.statusCode} });
         }
  } catch (error) {
    console.log(error);
    
    // yield put({ type: 'ERROR', payload: 'An error occurred.' });
  }
}


function* handleOTPVerified(args) {
  try {
    const response = yield call(OTPverification, args.payload);
    if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'OTP_VERIFY', payload:{ response:response.data,statusCode:response.status || response.statusCode} });
      
    } else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR_OTP_CODE', payload: response.data.message });
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Error',
      //   html: `Enter Valid Otp`,
      // });

    } 
  } catch (error) {
    console.log(error);
     }
}




  function* LoginSaga() {
    yield takeEvery('LOGININFO', Login)
    yield takeEvery('OTPVERIFY', handleOTPVerified)
  }
  export default LoginSaga;