import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist, invoiceList,UpdateInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, UpdateAmenities,AmenitiesSettings,ManualInvoice} from "../Action/InvoiceAction"
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';


 function* handleinvoicelist (){
    const response = yield call (invoicelist);
    
    if (response.status === 200){
       yield put ({type : 'INVOICE-ITEM' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response.data && response.data.refresh_token){
      refreshToken(response)
   }
}


function* handleInvoiceList(action) {
   const response = yield call(invoiceList, action.payload)
   console.log("response for invoice list",response)
  
   if (response.status === 200) {
      yield put({ type: 'INVOICE_LIST', payload: {response:response.data.data,statusCode:response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response.data && response.data.refresh_token){
      refreshToken(response)
   }
}

function* handleAddInvoiceDetails (param){
   const response = yield call (UpdateInvoice,param.payload)
   console.log("response.....>",response);
   
   if (response.status === 200) {
      yield put({ type: 'UPDATEINVOICE_DETAILS', payload: response })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response.data && response.data.refresh_token){
      refreshToken(response)
   }
}

function* handleInvoiceSettings(param){
       const response = yield call (InvoiceSettings,param.payload)
   //   console.log("invoice response",response.statusCode === 200)
      if (response.statusCode === 200) {
         yield put({ type: 'INVOICE_SETTINGS',  payload:{response:response.data, statusCode: response.statusCode} })
          
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if(response.data && response.data.refresh_token){
         refreshToken(response)
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
   if(response.data && response.data.refresh_token){
      refreshToken(response)
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
   if(response.data && response.data.refresh_token){
      refreshToken(response)
   }
}

function* handleGetAmenities() {
   const response = yield call(GetAmenities)
   
   if (response.status === 200) {
      yield put({ type: 'AMENITIES_LIST', payload:{response: response.data.data, statusCode:response.status}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response.data && response.data.refresh_token){
      refreshToken(response)
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
   if(response.data && response.data.refresh_token){
      refreshToken(response)
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
   if(response.data && response.data.refresh_token){
      refreshToken(response)
   }
}

function refreshToken(response){
   if(response.data && response.data.refresh_token){
      const refreshTokenGet = response.data.refresh_token
      console.log("refreshTokenGet",refreshTokenGet)
      const cookies = new Cookies()
      cookies.set('token', refreshTokenGet, { path: '/' });
   }else if (response.status === 206) {
      const message = response.status
      const cookies = new Cookies()
      cookies.set('access-denied', message, { path: '/' });
    
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