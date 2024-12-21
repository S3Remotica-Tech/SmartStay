import { takeEvery, call, put } from "redux-saga/effects";
import { UnAssignAmenities, GetAssignAmenities,AssignAmenities, DeleteUser, DeleteAmenities, invoicelist, invoiceList,UpdateInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, UpdateAmenities,AmenitiesSettings,ManualInvoice,ManualInvoiceUserData,AddManualInvoiceBill,ManualInvoiceNumber,GetManualInvoices,RecurrInvoiceamountData,AddRecurringBill,GetRecurrBills,DeleteRecurrBills , InvoiceRecurringsettings} from "../Action/InvoiceAction"
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function* handleDeleteUser(action) {
   const response = yield call(DeleteUser, action.payload)
  
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'DELETE_USER', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
  
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
 
       toast.success('Deleted Successfully', {
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

function* handleDeleteAmenities(action) {
   const response = yield call(DeleteAmenities, action.payload)
  
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'DELETE_AMENITIES', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
 
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
 
       toast.success('Deleted Successfully', {
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


function* handleAssignAmenities(action) {
   const response = yield call(AssignAmenities, action.payload)
  
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'ASSIGN_AMENITIES', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
  
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
 
      
       toast.success('Assigned Successfully', {
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


function* handleUnAssignAmenities(action) {
   const response = yield call(UnAssignAmenities, action.payload)
  
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'UN_ASSIGN_AMENITIES', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
  
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
 
      
       toast.success('UnAssigned Successfully', {
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


function* handleGetAssignAmenities(action) {
   const response = yield call(GetAssignAmenities, action.payload)
  
   console.log("assign",response)
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'GET_ASSIGN_AMENITIES', payload: {unAssigned : response.data.unselected, Assigned : response.data.selected, statusCode:response.status || response.statusCode} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}








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
     console.log("invoiceresponse",response)
      if (response.statusCode === 200 || response.status === 200) {
         yield put({ type: 'INVOICE_SETTINGS',  payload:{response:response.data, statusCode: response.statusCode || response.status} })
         
         
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
      if(response){
         refreshToken(response)
      }
  
}


function* handleInvoicePdf(action) {
   const response = yield call(InvoicePDf, action.payload)
   console.log("responseInvoice",response);
   
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
   //  yield put({type: 'HOSTEL_LIST'})

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

function* handleGetAmenities(action) {
   const response = yield call(GetAmenities, action.payload)
   
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
  console.log("response",response);
  
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

function* handleRecurrbillamountData(params) {
   const response = yield call(RecurrInvoiceamountData , params.payload)
  console.log("response",response);
  
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'RECURRING_BILL_GET_AMOUNT' , payload:{response:response.data.data, statusCode:response.status || response.statusCode }})
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
 
console.log("responseformanualinvoiceadd",response);


   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_ADD' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
      // Define the style
      var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
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

function* handleRecurrBillsAdd (params) {
   const response = yield call (AddRecurringBill,params.payload);
 
console.log("responseformanualinvoiceadd",response);


   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'RECURRING_BILLS_ADD' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
      // Define the style
      var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
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


function* handleGetManualInvoice(action) {
   const response = yield call(GetManualInvoices,action.payload)
   console.log("responseManual", response);
   
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICES_LIST', payload:{response: response.data.bill_details, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleGetRecurrbills() {
   const response = yield call(GetRecurrBills)
   console.log("responseManual", response);
   
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECURRING_BILLS_LIST', payload:{response: response.data.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleDeleteRecuringBills(action) {
   const response = yield call(DeleteRecurrBills, action.payload);
   console.log(" response", response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_RECURRING_BILLS', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
     
        
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
       toast.success(response.data.message , {
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


function* handleAddInvoiceRecurringSettings (param){
   const response = yield call (InvoiceRecurringsettings,param.payload)
   
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'SETTINGS_ADD_RECURRING', payload: { response,statusCode:response.status || response.data.statusCode }})
   
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
   yield takeEvery('GET-RECURRING-BILL-AMOUNTS',handleRecurrbillamountData)
   yield takeEvery('MANUAL-INVOICE-ADD',handleManualInvoiceAdd)
   yield takeEvery('RECURRING-BILLS-ADD',handleRecurrBillsAdd)
   yield takeEvery('MANUAL-INVOICES-LIST',handleGetManualInvoice)
   yield takeEvery('RECURRING-BILLS-LIST',handleGetRecurrbills)
   yield takeEvery('DELETE-RECURRING-BILLS',handleDeleteRecuringBills)
   yield takeEvery('SETTINGSADDRECURRING',handleAddInvoiceRecurringSettings)
      yield takeEvery('DELETEUSER',handleDeleteUser)
      yield takeEvery('DELETEAMENITIES',handleDeleteAmenities)
      yield takeEvery('ASSIGNAMENITIES', handleAssignAmenities)
      yield takeEvery('UNASSIGNAMENITIES', handleUnAssignAmenities)
          yield takeEvery('GETASSIGNAMENITIES', handleGetAssignAmenities)

     
      
      

}
export default InvoiceSaga;