import { call, takeEvery, put } from 'redux-saga/effects';
import { login } from '../Action/smartStayAction';
import Swal from 'sweetalert2';

function* Login(args) {
  try {
    const response = yield call(login, args.payload);
    if (response.status === 200) {
      yield put({ type: 'LOGIN-INFO', payload:{ response:response.data,statusCode:response.status} });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have been logged in successfully!',
        timer: 1000, 
        showConfirmButton: false, 
      });
    } else if (response.status === 201) {
      yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `invalied credentials`,
      });

    } else if (response.status === 203) {
      yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Password not exist in the  database',
      });
    }
  } catch (error) {
    yield put({ type: 'ERROR', payload: 'An error occurred.' });
  }
}


function* LoginSaga() {
  yield takeEvery('LOGININFO', Login)
}
export default LoginSaga;