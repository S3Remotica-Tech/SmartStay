import {all} from 'redux-saga/effects';
import LoginSaga from '../SagaMiddleware/LoginSaga';
import CreateAccountSaga from './CreateAccountSaga';
import ForgetSaga from './ForgetSaga';
import UserListSaga from './UserListSaga';
import InvoiceSaga from './InvoiceSaga';
import ComplianceSaga from './ComplianceSaga';
import PgListSaga from './PgListSaga';


function* RootSaga() {
    
yield all([
    LoginSaga(),
    CreateAccountSaga(),
    ForgetSaga(),
    UserListSaga(),
    InvoiceSaga(),
    ComplianceSaga(),
    PgListSaga()
])
}
export default RootSaga;