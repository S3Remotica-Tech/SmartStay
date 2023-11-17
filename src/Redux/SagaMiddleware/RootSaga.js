import {all} from 'redux-saga/effects';
import LoginSaga from '../SagaMiddleware/LoginSaga';
import CreateAccountSaga from './CreateAccountSaga';



function* RootSaga() {
    
yield all([
    LoginSaga(),CreateAccountSaga()
])
}
export default RootSaga;