import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction } from '../Action/smartStayAction';

function* CreateAccountPage(args) {
    try {
      const response = yield call(CreateAccountAction, args.payload);
      if (response.status === 200) {
        yield put({ type: 'CREATEACCOUNT', payload: response.data });
      }
    } catch (error) {
        console.log("error",error);
    }
  }
  
  
  function* CreateAccountSaga() {
    yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
  
  }
  export default CreateAccountSaga;