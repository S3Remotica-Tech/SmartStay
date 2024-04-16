import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist, invoiceList,addInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, GetAmenitiesName,AmenitiesSettings} from "../Action/InvoiceAction"
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


function* handleInvoiceList() {
   const response = yield call(invoiceList)
   if (response.status === 200) {
      yield put({ type: 'INVOICE_LIST', payload: {response:response.data,statusCode:response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleAddInvoiceDetails (param){
   const response = yield call (addInvoice,param.payload)
   if (response.status === 200) {
      yield put({ type: 'ADDINVOICE_DETAILS', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleInvoiceSettings(param){
   try{
      const response = yield call (InvoiceSettings,param.payload)
      if (response.status === 200) {
         yield put({ type: 'INVOICE_SETTINGS',  payload:response.data })
         Swal.fire({
            title: "Good job!",
            text: "Invoice Settings updated successfully!",
            icon: "success",
            timer: 1000,
        });
   
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
   }catch(error){
      console.error('Error in invoiceSettings:', error);
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleGetAmenities() {
   const response = yield call(GetAmenities)
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_LIST', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleGetAmenitiesName() {
   const response = yield call(GetAmenitiesName)
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_NAME', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}



function* InvoiceSaga() {
    yield takeEvery('INVOICEITEM', handleinvoicelist)
    yield takeEvery('INVOICELIST', handleInvoiceList)
    yield takeEvery('ADDINVOICEDETAILS',handleAddInvoiceDetails)
    yield takeEvery('INVOICESETTINGS',handleInvoiceSettings)
    yield takeEvery('INVOICEPDF',handleInvoicePdf)
    yield takeEvery('AMENITIESSETTINGS',handleAmenitiesSettings)
    yield takeEvery('AMENITIESLIST',handleGetAmenities)
    yield takeEvery('AMENITIESNAME',handleGetAmenitiesName)
}
export default InvoiceSaga;