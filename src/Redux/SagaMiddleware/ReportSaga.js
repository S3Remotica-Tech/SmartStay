import { takeEvery, call, put } from "redux-saga/effects";
import { GlobalHostelId } from "../../Utils/GlobalResponse";
import 'react-toastify/dist/ReactToastify.css';
import {getReportsDetails} from "../Action/ReportsAction"


function* handleApiError(error) {
   const status = error?.response?.status || error?.status;

   if (status === 401) {
      yield put({
         type: "UN-AUTHORIZED",
         payload: "Access Denied",
      });
   }
   else if (status === 500) {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
        }
   else if (error.code === "ERR_NETWORK") {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
     
   }
   
}

function* handleReportsDetails(action) {
   try {
      const response = yield call(getReportsDetails, action.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
              }
      if (response?.status === 200) {
         yield put({ type: 'GET_REPORTS_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}

function* ReportSaga() {
   yield takeEvery('GET_REEPORTS_SAGA', handleReportsDetails)
   

}
export default ReportSaga;