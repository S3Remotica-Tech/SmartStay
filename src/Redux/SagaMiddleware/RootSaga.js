import {all} from 'redux-saga/effects';
import LoginSaga from '../SagaMiddleware/LoginSaga';
// import CreateAccountSaga from './CreateAccountSaga';
import ForgetSaga from './ForgetSaga';



function* RootSaga() {
    
yield all([
    LoginSaga(),
    // CreateAccountSaga(),
    ForgetSaga(),
])
}
export default RootSaga;