import {all} from 'redux-saga/effects';
import LoginSaga from '../SagaMiddleware/LoginSaga'



function* RootSaga() {
    
yield all([
    LoginSaga()
])
}
export default RootSaga;