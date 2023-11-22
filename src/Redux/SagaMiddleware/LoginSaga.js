import { call, takeEvery, put } from 'redux-saga/effects';
import { login } from '../Action/smartStayAction';
import Swal from 'sweetalert2';

function* Login(args) {
  try {
    const response = yield call(login, args.payload);
    console.log('Response:', response);
    if (response.status === 200) {
      yield put({ type: 'LOGIN-INFO', payload: response.data });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have been logged in successfully!',
      });
    } else if (response.status === 201) {
      yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
    } else if (response.status === 203) {
      yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
    }
  } catch (error) {
    yield put({ type: 'ERROR', payload: 'An error occurred.' });
  }
}


function* LoginSaga() {
  console.log("Execute LoginSaga")
  yield takeEvery('LOGININFO', Login)
}
export default LoginSaga;