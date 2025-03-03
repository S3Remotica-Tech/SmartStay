import { takeEvery, call, put } from "redux-saga/effects";
import { handleSubscription } from "../Action/SubscriptionAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';


function* handleNewsubscription(action) {
   const response = yield call(handleSubscription, action.payload);
   if (response.status === 200 ) {
      yield put({ type: 'NEW_SUBSCRIPTION', payload: { response: response.data, statusCode: response.status} })
   }

   else if (response.status === 201 || response.data.statusCode === 201){
      yield put({ type: 'NO_NEW_SUBSCRIPTION', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function refreshToken(response) {
   if (response.data && response.data.refresh_token) {
      const refreshTokenGet = response.data.refresh_token
      const cookies = new Cookies()
      cookies.set('token', refreshTokenGet, { path: '/' });
   } else if (response.status === 206) {
      const message = response.status
      const cookies = new Cookies()
      cookies.set('access-denied', message, { path: '/' });

   }

}

function* SubscriptionSaga() {
   yield takeEvery('NEWSUBSCRIPTION', handleNewsubscription)
}
export default SubscriptionSaga;