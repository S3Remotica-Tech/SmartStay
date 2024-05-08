import { call, takeEvery, put } from 'redux-saga/effects';
import { login, OTPverification } from '../Action/smartStayAction';
import Swal from 'sweetalert2';

function* Login(args) {
  try {
    const response = yield call(login, args.payload);
    console.log("response",response)
    if (response.status === 200) {
      yield put({ type: 'LOGIN-INFO', payload:{ response:response.data,statusCode:response.status} });
      
    } else if (response.status === 201) {
      yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `invalied credentials`,
      });

    } else if (response.status === 203) {
      yield put({ type: 'OTP_SUCCESS', payload: {response: response.data, statusCode:response.status} });
      // Swal.fire({
      //   icon: 'success',
      //   text: 'OTP Send your Email id',
      //   timer: 1000,
      //   showConfirmButton: false,
      // });
    }
  } catch (error) {
    // yield put({ type: 'ERROR', payload: 'An error occurred.' });
  }
}


function* handleOTPVerified(args) {
  try {
    const response = yield call(OTPverification, args.payload);
    console.log("response",response)
    if (response.status === 200) {
      yield put({ type: 'OTP_VERIFY', payload:{ response:response.data,statusCode:response.status} });
      
    } else if (response.status === 201) {
      yield put({ type: 'ERROR_OTP_CODE', payload: response.data.message });
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `Enter Valid Otp`,
      });

    } 
  } catch (error) {
     }
}




function* LoginSaga() {
  yield takeEvery('LOGININFO', Login)
  yield takeEvery('OTPVERIFY', handleOTPVerified)
}
export default LoginSaga;