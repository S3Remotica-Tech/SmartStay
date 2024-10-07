import { takeEvery, call, put } from "redux-saga/effects";
import {invoicelist, invoiceList,UpdateInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, UpdateAmenities,AmenitiesSettings,ManualInvoice,ManualInvoiceUserData,AddManualInvoiceBill,ManualInvoiceNumber,GetManualInvoices} from "../Action/InvoiceAction"
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function* handleinvoicelist (){
    const response = yield call (invoicelist);
    
    if (response.status === 200 || response.statusCode === 200){
       yield put ({type : 'invoicelist' , payload:response.data,statusCode:response.status || response.statusCode})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response){
      refreshToken(response)
   }
}


function* handleInvoiceList(action) {
   const response = yield call(invoiceList, action.payload)
   console.log("response for invoice list",response)
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'INVOICE_LIST', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleAddInvoiceDetails (param){
   const response = yield call (UpdateInvoice,param.payload)
   console.log("response.....>",response);
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'UPDATEINVOICE_DETAILS', payload: response,statusCode:response.status || response.statusCode })
   
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
 
       // Use the toast with the defined style
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
   if(response){
      refreshToken(response)
   }
}

function* handleInvoiceSettings(param){
       const response = yield call (InvoiceSettings,param.payload)
   //   console.log("invoice response",response.statusCode === 200)
      if (response.statusCode === 200 || response.status === 200) {
         yield put({ type: 'INVOICE_SETTINGS',  payload:{response:response.data, statusCode: response.statusCode || response.status} })
         
         
         const toastStyle = {
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999, // To ensure it appears above other elements
            backgroundColor: 'green', // Background color
            color: 'white', // Text color
          };
    
          // Use the toast with the defined style
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
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if(response){
         refreshToken(response)
      }
  
}


function* handleInvoicePdf(action) {
   const response = yield call(InvoicePDf, action.payload)
     if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'INVOICE_PDF', payload: {response:response.data,statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleAmenitiesSettings(action){
   const response = yield call (AmenitiesSettings,action.payload)
  
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMENITIES_SETTINGS', payload: {response:response.data ,statusCode:response.status || response.statusCode}})
  

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

    // Use the toast with the defined style
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
   else if(response.status === 203){
      Swal.fire({
         title: "Amenities already exists for this Hostel",
         icon: "warning",
         // timer: 1000,
     });
     
   }else{
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleGetAmenities() {
   const response = yield call(GetAmenities)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMENITIES_LIST', payload:{response: response.data.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleUpdateAmenities(action) {
   const response = yield call(UpdateAmenities, action.payload)
  
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMENITIES_UPDATE',  payload:{response: response.data, statusCode:response.status || response.statusCode} })
     
     
  
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
       // Use the toast with the defined style
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
   if(response){
      refreshToken(response)
   }
}



function* handleManualInvoice() {
   const response = yield call(ManualInvoice)
  
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE',  payload:{response: response.data, statusCode:response.status || response.statusCode} })
        }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}
function* handleManualInvoiceNumber(params) {
   const response = yield call(ManualInvoiceNumber , params.payload)
   console.log("response",response);
   
  
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_NUMBER_GET' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
      console.log("MANUAL_INVOICE_NUMBER_GET success");
      
      // Define the style
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
 
       // Use the toast with the defined style
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
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleManualInvoiceGetData(params) {
   const response = yield call(ManualInvoiceUserData , params.payload)
  
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_AMOUNT_GET' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
      // Define the style
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
 
       // Use the toast with the defined style
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
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleManualInvoiceAdd (params) {
   const response = yield call (AddManualInvoiceBill,params.payload);
 
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_ADD' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
      // Define the style
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
 
       // Use the toast with the defined style
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
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleGetManualInvoice() {
   const response = yield call(GetManualInvoices)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICES_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
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
   yield takeEvery('MANUAL-INVOICE-NUMBER-GET',handleManualInvoiceNumber)
   yield takeEvery('GET-MANUAL-INVOICE-AMOUNTS',handleManualInvoiceGetData)
   yield takeEvery('MANUAL-INVOICE-ADD',handleManualInvoiceAdd)
   yield takeEvery('MANUAL-INVOICES-LIST',handleGetManualInvoice)
}
export default InvoiceSaga;