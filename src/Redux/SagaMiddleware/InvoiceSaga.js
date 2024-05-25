import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist, invoiceList,UpdateInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, UpdateAmenities,AmenitiesSettings,ManualInvoice} from "../Action/InvoiceAction"
import Swal from 'sweetalert2'

 function* handleinvoicelist (){
    const response = yield call (invoicelist);
    if (response.status === 200){
       yield put ({type : 'INVOICE-ITEM' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}


function* handleInvoiceList(action) {
   const response = yield call(invoiceList, action.payload)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_LIST', payload: {response:response.data,statusCode:response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleAddInvoiceDetails (param){
   const response = yield call (UpdateInvoice,param.payload)
   if (response.status === 200) {
      yield put({ type: 'UPDATEINVOICE_DETAILS', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleInvoiceSettings(param){
       const response = yield call (InvoiceSettings,param.payload)
     
      if (response.statusCode === 200) {
         yield put({ type: 'INVOICE_SETTINGS',  payload:{response:response.data, statusCode: response.statusCode} })
      //    Swal.fire({
      //       title: "Good job!",
      //       text: "Invoice Settings updated successfully!",
      //       icon: "success",
      //       timer: 1000,
      //   });
   
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
   
  
}


function* handleInvoicePdf(action) {
   const response = yield call(InvoicePDf, action.payload)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_PDF', payload: {response:response.data,statusCode:response.status}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleAmenitiesSettings(action){
   const response = yield call (AmenitiesSettings,action.payload)
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_SETTINGS', payload: {response:response.data ,statusCode:response.status}})
      Swal.fire({
         title: "Good job!",
         text: "Amenities Insert successfully",
         icon: "success",
         timer: 1000,
     });

   }
   else if(response.status === 203){
      Swal.fire({
         title: "Amenities already exists for this Hostel",
         icon: "warning",
         // timer: 1000,
     });
     
   }else{
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleGetAmenities() {
   const response = yield call(GetAmenities)
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_LIST', payload:{response: response.data, statusCode:response.status}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleUpdateAmenities(action) {
   const response = yield call(UpdateAmenities, action.payload)
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_UPDATE',  payload:{response: response.data, statusCode:response.status} })
      Swal.fire({
         title: "Good job!",
         text: "Amenities Update successfully",
         icon: "success",
         timer: 1000,
     });

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}



function* handleManualInvoice() {
   const response = yield call(ManualInvoice)
   if (response.status === 200) {
      yield put({ type: 'MANUAL_INVOICE',  payload:{response: response.data, statusCode:response.status} })
        }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}


function* InvoiceSaga() {
    yield takeEvery('INVOICEITEM', handleinvoicelist)
    yield takeEvery('INVOICELIST', handleInvoiceList)
    yield takeEvery('UPDATEINVOICEDETAILS',handleAddInvoiceDetails)
    yield takeEvery('INVOICESETTINGS',handleInvoiceSettings)
    yield takeEvery('INVOICEPDF',handleInvoicePdf)
    yield takeEvery('AMENITIESSETTINGS',handleAmenitiesSettings)
    yield takeEvery('AMENITIESLIST',handleGetAmenities)
    yield takeEvery('AMENITIESUPDATE',handleUpdateAmenities)
   yield takeEvery('MANUALINVOICE',handleManualInvoice)
}
export default InvoiceSaga;