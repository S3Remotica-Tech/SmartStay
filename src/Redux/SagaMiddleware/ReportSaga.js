import { takeEvery, call, put } from "redux-saga/effects";
import { GlobalHostelId } from "../../Utils/GlobalResponse";
import 'react-toastify/dist/ReactToastify.css';
import { getReportsDetails, getInvoiceRegister, getExpenseRegister, getReceiptRegister, getTenantRegister } from "../Action/ReportsAction"


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
   else if (status === 403) {
      yield put({ type: "ACCESS_RESTRICTION_ERROR", payload: "Access Restricted" });
   }
}

function* handleReportsDetails(action) {
   try {
      const { hostelId, filters } = action.payload;
      const response = yield call(getReportsDetails, hostelId, filters)

      const hostel_Id = GlobalHostelId(response);
      if (hostel_Id) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostel_Id })
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



function* handleGetInvoiceRegister(action) {
   try {
      const { hostelId, filters } = action.payload;
      const response = yield call(getInvoiceRegister, hostelId, filters)

      if (response?.status === 200) {
         yield put({ type: 'GET_REPORTS_INVOICE_REGISTER_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);
      if (error?.response?.status || error?.status) {
         yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      }


   }


}

function* handleGetExpenseRegister(action) {
   try {

      const { hostelId, filters } = action.payload;
      const response = yield call(getExpenseRegister, hostelId, filters)
      if (response?.status === 200) {
         yield put({ type: 'GET_REPORTS_EXPENSE_REGISTER_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);
      if (error?.response?.status || error?.status) {
         yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      }

   }


}

function* handleGetReceiptRegister(action) {
   try {

      const { hostelId, filters } = action.payload;
      const response = yield call(getReceiptRegister, hostelId, filters)
      if (response?.status === 200) {
         yield put({ type: 'GET_REPORTS_RECEIPT_REGISTER_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }
   if (error?.response?.status || error?.status) {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
   }


}


function* handleGetTenantRegister(action) {
   try {

      const { hostelId, filters } = action.payload;
      const response = yield call(getTenantRegister, hostelId, filters)
      if (response?.status === 200) {
         yield put({ type: 'GET_REPORTS_TENANT_REGISTER_REDUCER', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

console.log("error mathu", error)
      if (error?.code === "ERR_BAD_REQUEST") {
         yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      }

   }


}

function* ReportSaga() {
   yield takeEvery('GET_REEPORTS_SAGA', handleReportsDetails)
   yield takeEvery('GET_REPORTS_INVOICE_REGISTER_SAGA', handleGetInvoiceRegister)
   yield takeEvery('GET_REPORTS_EXPENSE_REGISTER_SAGA', handleGetExpenseRegister)
   yield takeEvery('GET_REPORTS_RECEIPT_REGISTER_SAGA', handleGetReceiptRegister)
   yield takeEvery('GET_REPORTS_TENANT_REGISTER_SAGA', handleGetTenantRegister)

}
export default ReportSaga;