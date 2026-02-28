import { takeEvery, call, put } from "redux-saga/effects";
import { GlobalHostelId } from "../../Utils/GlobalResponse";
import 'react-toastify/dist/ReactToastify.css';
import { ReportsExpensePDF, ReportsInvoicePDF, ReportsTenantRegisterPDF, ReportsReceiptsPDF, getReportsDetails, getInvoiceRegister, getExpenseRegister, getReceiptRegister, getTenantRegister } from "../Action/ReportsAction"


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
      if (error?.response?.status || error?.status) {
         yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      }


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

      if (error?.code === "ERR_BAD_REQUEST") {
         yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      }

   }


}

function* handleReportsTenantRegisterPDF(action) {
   try {
      const response = yield call(ReportsTenantRegisterPDF, action.payload)


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "red",
         width: "100%",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };
      if (response?.status === 200) {
         yield put({
            type: 'REPORTS_TENANT_REGISTER_PDF_REDUCER', payload:
            {
               response: response.data, statusCode: response?.status
            }
         })
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.status === 400) {
         yield put({ type: 'REPORTS_PDF_EXPORT_ERROR', payload: { response: error.response.data } })
         toast.error(error.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
   }
}


function* handleReportsReceiptsPDF(action) {
   try {
      const response = yield call(ReportsReceiptsPDF, action.payload)


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "red",
         width: "100%",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };
      if (response?.status === 200) {
         yield put({
            type: 'REPORTS_RECEIPT_REGISTER_PDF_REDUCER', payload:
            {
               response: response.data, statusCode: response?.status
            }
         })
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.status === 400) {
          yield put({ type: 'REPORTS_PDF_EXPORT_ERROR', payload: { response: error.response.data } })
         toast.error(error.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
   }
}

function* handleReportsInvoicePDF(action) {
   try {
      const response = yield call(ReportsInvoicePDF, action.payload)


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "red",
         width: "100%",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };
      if (response?.status === 200) {
         yield put({
            type: 'REPORTS_INVOICE_REGISTER_PDF_REDUCER', payload:
            {
               response: response.data, statusCode: response?.status
            }
         })
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.status === 400) {
          yield put({ type: 'REPORTS_PDF_EXPORT_ERROR', payload: { response: error.response.data } })
         toast.error(error.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
   }
}


function* handleReportsExpensePDF(action) {
   try {
      const response = yield call(ReportsExpensePDF, action.payload)


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "red",
         width: "100%",
         borderRadius: "60px",
         height: "20px",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };
      if (response?.status === 200) {
         yield put({
            type: 'REPORTS_EXPENSE_REGISTER_PDF_REDUCER', payload:
            {
               response: response.data, statusCode: response?.status
            }
         })
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.status === 400) {
         yield put({ type: 'REPORTS_PDF_EXPORT_ERROR', payload: { response: error.response.data } })
         toast.error(error.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
   }
}




function* ReportSaga() {
   yield takeEvery('GET_REEPORTS_SAGA', handleReportsDetails)
   yield takeEvery('GET_REPORTS_INVOICE_REGISTER_SAGA', handleGetInvoiceRegister)
   yield takeEvery('GET_REPORTS_EXPENSE_REGISTER_SAGA', handleGetExpenseRegister)
   yield takeEvery('GET_REPORTS_RECEIPT_REGISTER_SAGA', handleGetReceiptRegister)
   yield takeEvery('GET_REPORTS_TENANT_REGISTER_SAGA', handleGetTenantRegister)
   yield takeEvery('REPORTS_TENANT_REGISTER_PDFSAGA', handleReportsTenantRegisterPDF)
   yield takeEvery('REPORTS_RECEIPT_REGISTER_PDFSAGA', handleReportsReceiptsPDF)
    yield takeEvery('REPORTS_INVOICE_REGISTER_PDFSAGA',handleReportsInvoicePDF)
    yield takeEvery('REPORTS_EXPENSE_REGISTER_PDFSAGA',handleReportsExpensePDF)

}
export default ReportSaga;