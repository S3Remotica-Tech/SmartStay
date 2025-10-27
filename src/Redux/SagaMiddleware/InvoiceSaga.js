import { takeEvery, call, put } from "redux-saga/effects";
import { createRefund, getInitializeRefund, getParticularReceiptDetails, getParticularBillsDetails, getFinalSettlementList, CustomerRecurringEnableDisable, UnAssignAmenities, ParticularAmentityList, AssignAmenities, DeleteUser, DeleteAmenities, invoicelist, invoiceList, RecordPayment, InvoiceSettings, InvoicePDf, GetAmenities, UpdateAmenities, AddAmenity, ManualInvoice, ManualInvoiceUserData, AddManualInvoiceBill, EditManualInvoiceBill, DeleteManualInvoiceBill, ManualInvoiceNumber, GetManualInvoices, RecurrInvoiceamountData, AddRecurringBill, GetRecurrBills, DeleteRecurrBills, InvoiceRecurringsettings, GetReceiptData, AddReceipt, ReferenceIdGet, DeleteReceipt, EditReceipt, ReceiptPDf, AddRecurrBillsUsers, GetBillsPdfDetails, ReceiptPDFNewChanges } from "../Action/InvoiceAction";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* handleApiError(error) {
   if (error?.status === 401 || error?.response?.status === 401) {
      yield put({
         type: "UN-AUTHORIZED",
         payload: "Access Denied",
      });
   }

}

function* handleCreateRefund(action) {

   try {
      const response = yield call(createRefund, action.payload)

         if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'CREATE_REFUND', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}







function* handleGetInitializeRefund(action) {

   try {
      const response = yield call(getInitializeRefund, action.payload)

         if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'GET_INITIALIZE_REFUND_DETAILS', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}




function* handleGetFinalSettlementList(action) {

   try {
      const response = yield call(getFinalSettlementList, action.payload)


      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'GET_FINAL_SETTLEMENT', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}


function* handleGetParticularBillsDetails(action) {

   try {
      const response = yield call(getParticularBillsDetails, action.payload)

      console.log("response",response)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'GET_PARTICULAR_BILL_DETAILS', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}


function* handleGetParticularReceiptDetails(action) {

   try {
      const response = yield call(getParticularReceiptDetails, action.payload)
      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'GET_PARTICULAR_RECEIPT_DETAILS', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}



function* handleDeleteUser(action) {

   try {
      const response = yield call(DeleteUser, action.payload)


      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'DELETE_USER', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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

         toast.success(response.data, {
            position: "bottom-center",
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
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         yield put({ type: 'NETWORK_ERROR', payload: error.response.data });
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}

function* handleDeleteAmenities(action) {
   try{
    const { amenityId , hostelId   } = action.payload
    const response = yield call(DeleteAmenities, amenityId , hostelId);

   var toastStyle = {
      backgroundColor: "#E6F6E6",
      color: "black",
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

   }

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_AMENITIES', payload: { response: response.data.data || [], statusCode: response.status || response.statusCode } })

      toast.success(response.data, {
         position: "bottom-center",
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
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ALREADY_ASSIGN_ERROR', payload: { statusCode: response.status || response.statusCode } })
      toast.error('This amenity is assigned and cannot be deleted', {
         position: "bottom-center",
         autoClose: 2000,
         hideProgressBar: true,
         closeButton: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      })

   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}


function* handleAssignAmenities(action) {
  try {
    const { hostelId, amenityId, customers } = action.payload;

    const response = yield call(AssignAmenities, hostelId, amenityId, customers);

    if (response.status === 200) {
      yield put({
        type: 'ASSIGN_AMENITIES',
        payload: {
          response: response.data.data,
          statusCode: response.status,
        },
      });

      toast.success(response?.data || "Amenities assigned successfully!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        style: {
          backgroundColor: "#E6F6E6",
          color: "black",
          fontFamily: "Gilroy",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "start",
          borderRadius: "60px",
          padding: "10px",
        },
      });
    } else {
      yield put({
        type: 'ERROR',
        payload: response.data.message || "Failed to assign amenities",
      });
    }

    if (response) {
      yield call(refreshToken, response);
    }
  } catch (error) {
         yield* handleApiError(error);
    const errorMsg =
      error.code === 'ERR_NETWORK'
        ? 'Network error occurred'
        : error.message || 'Something went wrong';

    yield put({ type: 'NETWORK_ERROR', payload: errorMsg });
  }
}



function* handleUnAssignAmenities(action) {
   try {
      const { hostelId, amenityId, customers } = action.payload;
      const response = yield call(UnAssignAmenities, hostelId, amenityId, customers);
      // const response = yield call(UnAssignAmenities, action.payload)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'UN_ASSIGN_AMENITIES', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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


         toast.success(response?.data || "Amenities UnAssigned successfully!", {
            position: "bottom-center",
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
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleGetParticularAmentityList(action) {
   try{
       const {hostelId , amenityId } = action.payload
          const response = yield call(ParticularAmentityList, hostelId,amenityId);

          console.log("response", response);
          

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'GET_ASSIGN_AMENITIES', payload: { unAssigned: response?.data?.unassignedCustomers, Assigned: response?.data?.assignedCustomers, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}








function* handleinvoicelist() {
   try{
   const response = yield call(invoicelist);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'invoicelist', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}


function* handleInvoiceList(action) {
   try{
   const response = yield call(invoiceList, action.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'INVOICE_LIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleRecordPaymentUpdate(action) {
   try {
      const { hostelId, invoiceId, data } = action.payload
      const response = yield call(RecordPayment, hostelId, invoiceId, data)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'RECORD-PAYMENT', payload: { response: response.data, statusCode: response.status || response.statusCode } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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

         toast.success(response.data, {
            position: "bottom-center",
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
      else if (response.data.statusCode === 201 || response.status === 201) {

         yield put({ type: 'PAYABLE_AMOUNT', payload: response.data.message });
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleInvoiceSettings(param) {
   try {
      const response = yield call(InvoiceSettings, param.payload)

      if (response.statusCode === 200 || response.status === 200) {
         yield put({ type: 'INVOICE_SETTINGS', payload: { response: response.data, statusCode: response.statusCode || response.status } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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

         toast.success(response.message, {
            position: "bottom-center",
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
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}


function* handleInvoicePdf(action) {
   try {
      const response = yield call(InvoicePDf, action.payload)
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
      if (response.status === 200 || response.statusCode === 200) {
         yield put({
            type: 'INVOICE_PDF', payload: {
               response: response.data.pdf_url, statusCode: response.status || response.statusCode
            }
         })
      }
      else if (response.status === 201 || response.statusCode === 201) {
         yield put({ type: 'PDF_ERROR', payload: { response: response.data.message, statusCode: response.status || response.statusCode } })

         toast.error(response.data.message, {
            position: "top-center",
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
      if (response) {
         refreshToken(response)
      }

   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleAddAmenity(action) {
   try {
          const {hostelId , data} = action.payload
          const response = yield call(AddAmenity, hostelId , data);
      // const response = yield call(AddAmenity, action.payload)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'AMENITIES_SETTINGS', payload: { response: response.data, statusCode: response.status || response.statusCode } })


         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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

         toast.success(response.data, {
            position: "bottom-center",
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
      else if (response.status === 203) {
         yield put({ type: 'ERROR_AMENITIES_SETTINGS', payload: { response: response.data.message } })

      } else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleGetAmenities(action) {
   try{
   const response = yield call(GetAmenities, action.payload)

   console.log("response", response);
   

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMENITIES_LIST', payload: { response: response?.data || [], statusCode: response.status || response.statusCode } })
   }
    else if (response.status === 201 || response.statusCode === 201) {
       yield put({ type: 'NO_AMENITIES_LIST', payload: { statusCode: response.statusCode } })
     }
   else {
      yield put({ type: 'ERROR_AMENITIES', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleUpdateAmenities(action) {
   try {
           const {hostelId , amenityId , data} = action.payload
          const response = yield call(UpdateAmenities, hostelId,amenityId,data);
      // const response = yield call(UpdateAmenities, action.payload)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'AMENITIES_UPDATE', payload: { response: response.data, statusCode: response.status || response.statusCode } })



         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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
         toast.success(response.data, {
            position: "bottom-center",
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
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}



function* handleManualInvoice() {
   try{
   const response = yield call(ManualInvoice)

   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleManualInvoiceNumber(params) {
   try{
   const response = yield call(ManualInvoiceNumber, params.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE_NUMBER_GET', payload: { response: response.data, statusCode: response.status || response.statusCode } })
   }
   else if (response.data.statusCode === 201 || response.status === 201) {

      yield put({ type: 'INVALID_DETAILS_ERROR', payload: response.data.message });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleManualInvoiceGetData(params) {
   try{
   const response = yield call(ManualInvoiceUserData, params.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE_AMOUNT_GET', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      toast.success(response.data.message, {
         position: "bottom-center",
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleRecurrbillamountData(params) {
   try{
   const response = yield call(RecurrInvoiceamountData, params.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECURRING_BILL_GET_AMOUNT', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      toast.success(response.data.message, {
         position: "bottom-center",
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

   else if (response.status === 202 || response.statusCode === 202) {
      yield put({ type: 'FAIL_ADD_RECURRING_BILL', payload: { response: response.data.recure, statusCode: response.status || response.statusCode, message: response.data.message } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleManualInvoiceAdd(params) {
   try {
      const response = yield call(AddManualInvoiceBill, params.payload);

      if (response.status === 201 || response.statusCode === 200) {
         yield put({ type: 'MANUAL_INVOICE_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode } })
         var toastStyle = {
            backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data, {
            position: "bottom-center",
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

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400 || error.status === 403) {
            yield put({ type: 'UNABLE_ADD_INVOICE_DETAILS', payload: error.response.data });
         }
      } else if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleManualInvoiceEdit(params) {
   try {
      const response = yield call(EditManualInvoiceBill, params.payload);
      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'MANUAL_INVOICE_EDIT', payload: { response: response.data, statusCode: response.status || response.statusCode } })
         var toastStyle = {
            backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "top-center",
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
      else if (response.status === 201 || response.statusCode === 201) {
         yield put({ type: 'MANUAL_INVOICE_ERROR', payload: response.data.message })
         toast.error(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleManualInvoiceDelete(params) {
try{
   const response = yield call(DeleteManualInvoiceBill, params.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE_DELETE', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      var toastStyle = {
         backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px",

      };

      toast.success(response.data.message, {
         position: "bottom-center",
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
   else if (response.status === 201 || response.data.statusCode === 201) {
      yield put({ type: 'DELETE_MANUAL_ERROR', payload: response.data.message })

      toast.error(response.data.message, {
         position: "top-center",
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

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}


function* handleRecurrBillsAdd(params) {
   try {
      const response = yield call(AddRecurringBill, params.payload);


      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'RECURRING_BILLS_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode } })
         var toastStyle = {
            backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "bottom-center",
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

      else if (response.status === 201 || response.data.statusCode === 201) {
         yield put({ type: 'ERROR_RECURE', payload: { response: response.data.message, statusCode: response.status || response.data.statusCode } })
      }

      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleGetManualInvoice(action) {
   try {
      const response = yield call(GetManualInvoices, action.payload)

      if (response.status === 200 || response.data.statusCode === 200) {
         yield put({ type: 'MANUAL_INVOICES_LIST', payload: { response: response?.data || [], statusCode: response.status || response.data.statusCode } })
      }
      else if (response.status === 201 || response.statusCode === 201) {
         yield put({ type: 'NODATA_BILL_LIST', payload: { response: response.message, statusCode: response.status || response.statusCode } })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }

}

function* handleGetRecurrbills(action) {
   try{
   const response = yield call(GetRecurrBills, action.payload)


   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECURRING_BILLS_LIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'NODATA_RECURRINGBILLS_LIST', payload: { response: response.message, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleDeleteRecuringBills(action) {
   try{
   const response = yield call(DeleteRecurrBills, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_RECURRING_BILLS', payload: { response: response.data, statusCode: response.status || response.statusCode } })


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      toast.success(response.data.message, {
         position: "bottom-center",
         autoClose: 2000,
         hideProgressBar: true,
         closeButton: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         style: toastStyle
      });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}

}


function* handleAddInvoiceRecurringSettings(param) {
   try {
      const response = yield call(InvoiceRecurringsettings, param.payload)


      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'SETTINGS_ADD_RECURRING', payload: { response, statusCode: response.status || response.data.statusCode } })

         var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
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

         toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}


function* handleGetReceipts(action) {

   try {
      const response = yield call(GetReceiptData, action.payload)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'RECEIPTS_LIST', payload: { response: response?.data || [], statusCode: response.status || response.statusCode } })
      }
      else if (response.status === 400 || response.statusCode === 400) {
         yield put({ type: 'NODATA_RECEIPTS_LIST', payload: { response: response.message, statusCode: response.status || response.data.statusCode } })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }


}


function* handleAddReceipt(action) {
   try {
      const response = yield call(AddReceipt, action.payload);



      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'RECEIPTS_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode } })
         var toastStyle = {
            backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "bottom-center",
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
      else if (response.status === 201 || response.statusCode === 201) {
         yield put({ type: 'ERROR_RECEIPTS_ADD', payload: { response: response.data.message, statusCode: response.status || response.statusCode } })
      }

      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleEditReceipt(action) {
   try {
      const response = yield call(EditReceipt, action.payload);
      if (response.status === 200 || response.data.statusCode === 200) {
         yield put({ type: 'RECEIPTS_EDIT', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
         var toastStyle = {
            backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "10px",

         };

         toast.success(response.data.message, {
            position: "bottom-center",
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


      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleDeleteReceipt(action) {
   try{
   const response = yield call(DeleteReceipt, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETERECEIPT', payload: { response: response.data, statusCode: response.status || response.statusCode } })


      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      toast.success(response.data.message, {
         position: "bottom-center",
         autoClose: 2000,
         hideProgressBar: true,
         closeButton: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         style: toastStyle
      });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}

}


function* handleReference_Id() {
   try{
   const response = yield call(ReferenceIdGet)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'REFERENCEID_GET', payload: { response: response.data.reference_id, statusCode: response.status || response.statusCode } })
      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      toast.success(response.data.message, {
         position: "bottom-center",
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}

function* handleReceiptPdf(action) {
   try {
      const response = yield call(ReceiptPDf, action.payload)

      if (response.status === 200 || response.statusCode === 200) {
         yield put({
            type: 'RECEIPT_PDF', payload: {
               response: response.data.pdf_url, statusCode: response.status || response.statusCode
            }
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleFilterRecurrCustomer(action) {
   try{
   const response = yield call(AddRecurrBillsUsers, action.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'FILTER_RECURR_CUSTOMERS', payload: { response: response.data.user_data, statusCode: response.status || response.statusCode } })

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}



function* handleGetBillPdfDetails(action) {
   try{
   const response = yield call(GetBillsPdfDetails, action.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'GET-BILLS-PDF-DETAILS', payload: { response: response.data.receipt, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
      yield* handleApiError(error);
}
}




function* handleReceiptPdfNewChanges(action) {
   try {
         const response = yield call(getParticularReceiptDetails, action.payload);

      if (response.status === 200 || response.data.statusCode === 200) {
         yield put({
            type: 'RECEIPT_PDF_CHANGES',
            payload: response.data,
            statusCode: response.status || response.data.statusCode
         });
      } else {
         yield put({
            type: 'ERROR',
            payload: response.data.message
         });
      }

      if (response) {
         refreshToken(response);
      }
   } catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleCustomerRecurringEnableDisable(params) {
   try {
      const response = yield call(CustomerRecurringEnableDisable, params.payload)

      var toastStyle = {
         backgroundColor: "#E6F6E6",
         color: "black",
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

      const toastStyleWarning = {
         backgroundColor: "#FFFBE6",
         color: "#856404",
         width: "100%",
         borderRadius: "60px",
         height: "auto",
         fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center",
         padding: "10px 16px",
         border: "1px solid #ffeeba",
         boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
      };



      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'CUSTOMER_RECURRING_ENABLE_DISABLE', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })


         toast.success(response.data.message, {
            position: "bottom-center",
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

      else if (response.status === 201 || response.statusCode === 201) {
         toast.warn(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyleWarning
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         yield* handleApiError(error);
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
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


function* InvoiceSaga() {
   yield takeEvery('CREATEREFUND',handleCreateRefund)
   yield takeEvery('GETINITIALIZEREFUNDDETAILS',handleGetInitializeRefund)
   yield takeEvery('GETPARTICULARRECEIPTSDETAILS', handleGetParticularReceiptDetails)
   yield takeEvery('GETPARTICULARBILLSDETAILS', handleGetParticularBillsDetails)
   yield takeEvery('GETFINALSETTLEMENT', handleGetFinalSettlementList)
   yield takeEvery('INVOICEITEM', handleinvoicelist)
   yield takeEvery('INVOICELIST', handleInvoiceList)
   yield takeEvery('RECORD_PAYMENT', handleRecordPaymentUpdate)
   yield takeEvery('INVOICESETTINGS', handleInvoiceSettings)
   yield takeEvery('INVOICEPDF', handleInvoicePdf)
   yield takeEvery('ADD_AMENITIY', handleAddAmenity)
   yield takeEvery('AMENITIESLIST', handleGetAmenities)
   yield takeEvery('AMENITIESUPDATE', handleUpdateAmenities)
   yield takeEvery('MANUALINVOICE', handleManualInvoice)
   yield takeEvery('MANUAL-INVOICE-NUMBER-GET', handleManualInvoiceNumber)
   yield takeEvery('GET-MANUAL-INVOICE-AMOUNTS', handleManualInvoiceGetData)
   yield takeEvery('GET-RECURRING-BILL-AMOUNTS', handleRecurrbillamountData)
   yield takeEvery('MANUAL-INVOICE-ADD', handleManualInvoiceAdd)
   yield takeEvery('MANUAL-INVOICE-EDIT', handleManualInvoiceEdit)
   yield takeEvery('MANUAL-INVOICE-DELETE', handleManualInvoiceDelete)
   yield takeEvery('RECURRING-BILLS-ADD', handleRecurrBillsAdd)
   yield takeEvery('MANUALINVOICESLIST', handleGetManualInvoice)
   yield takeEvery('RECURRING-BILLS-LIST', handleGetRecurrbills)
   yield takeEvery('DELETE-RECURRING-BILLS', handleDeleteRecuringBills)
   yield takeEvery('SETTINGSADDRECURRING', handleAddInvoiceRecurringSettings)
   yield takeEvery('DELETEUSER', handleDeleteUser)
   yield takeEvery('DELETEAMENITIES', handleDeleteAmenities)
   yield takeEvery('ASSIGNAMENITIES', handleAssignAmenities)
   yield takeEvery('UNASSIGNAMENITIES', handleUnAssignAmenities)
   yield takeEvery('GET_PARTICULAR_AMENITIES', handleGetParticularAmentityList)

   yield takeEvery('RECEIPTSLIST', handleGetReceipts)
   yield takeEvery('ADD_RECEIPT', handleAddReceipt)
   yield takeEvery('EDIT_RECEIPTS', handleEditReceipt)
   yield takeEvery('DELETE_RECEIPT', handleDeleteReceipt)
   yield takeEvery('GET_REFERENCE_ID', handleReference_Id)
   yield takeEvery('RECEIPTPDF', handleReceiptPdf)
   yield takeEvery('FILTERRECURRCUSTOMERS', handleFilterRecurrCustomer)
   yield takeEvery('BILL_PDF_DETAILS', handleGetBillPdfDetails)
   yield takeEvery('RECEIPTPDF_NEWCHANGES', handleReceiptPdfNewChanges)
   yield takeEvery('CUSTOMERRECURRINGENABLEDISABLE', handleCustomerRecurringEnableDisable)



}
export default InvoiceSaga;