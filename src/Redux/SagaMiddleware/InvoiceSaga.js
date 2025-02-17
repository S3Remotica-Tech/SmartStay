import { takeEvery, call, put } from "redux-saga/effects";
import { UnAssignAmenities, GetAssignAmenities,AssignAmenities, DeleteUser, DeleteAmenities, invoicelist, invoiceList,UpdateInvoice ,InvoiceSettings,InvoicePDf,GetAmenities, UpdateAmenities,AmenitiesSettings,ManualInvoice,ManualInvoiceUserData,AddManualInvoiceBill,EditManualInvoiceBill,DeleteManualInvoiceBill, ManualInvoiceNumber,GetManualInvoices,RecurrInvoiceamountData,AddRecurringBill,GetRecurrBills,DeleteRecurrBills , InvoiceRecurringsettings , GetReceiptData , AddReceipt , ReferenceIdGet , DeleteReceipt , EditReceipt , ReceiptPDf , AddRecurrBillsUsers} from "../Action/InvoiceAction"
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
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'DELETE_AMENITIES', payload: {response:response.data.data, statusCode:response.status || response.statusCode} })
  
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
   else  if (response.status === 201 || response.statusCode === 201 ) {
      yield put({ type: 'ALREADY_ASSIGN_ERROR', payload: { statusCode:response.status || response.statusCode} })
      toast.error('This amenity is assigned and cannot be deleted', {
         position: "bottom-center",
         autoClose: 2000,
         hideProgressBar: true,
         closeButton: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         // style: toastStyle
       })

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

       console.log("responseinvoiceupdate", response);
       
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'UPDATEINVOICE_DETAILS', payload: {response:response.data ,statusCode:response.status || response.statusCode}  })
   
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
   console.log("responses",response);
   
     if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'INVOICE_PDF', payload: {response:response.data.pdf_url,statusCode:response.status || response.statusCode
      }})
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
      yield put({ type: 'ERROR_AMENITIES', payload: {statusCode:response.status || response.statusCode} })
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
  
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICE',  payload:{response: response.data, statusCode:response.status || response.data.statusCode} })
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
   
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_NUMBER_GET' , payload:{response:response.data, statusCode:response.status || response.statusCode }})      
      // Define the style  
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

function* handleRecurrbillamountData(params) {
   const response = yield call(RecurrInvoiceamountData , params.payload)
  
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

   else if (response.status === 202 || response.statusCode === 202){
      yield put ({type : 'FAIL_ADD_RECURRING_BILL' , payload:{response:response.data.recure, statusCode:response.status || response.statusCode  , message: response.data.message}})
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


function* handleManualInvoiceEdit (params) {
   console.log("paramss",params);
   
   const response = yield call (EditManualInvoiceBill,params.payload);
 
console.log("API response",response);


   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_EDIT' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
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
   else if(response.status === 201 || response.statusCode === 201) {
      yield put ({type:'MANUAL_INVOICE_ERROR', payload:response.data.message})
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
   if(response){
      refreshToken(response)
   }
}


function* handleManualInvoiceDelete (params) {
   
   const response = yield call (DeleteManualInvoiceBill,params.payload);
 
  if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'MANUAL_INVOICE_DELETE' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
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
   else if (response.status === 201 || response.data.statusCode === 201) {
      yield put({ type: 'DELETE_MANUAL_ERROR', payload: response.data.message })
      var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy",
         fontWeight: 600,
         fontSize: 14,
         textAlign: "start",
         display: "flex",
         alignItems: "center", 
         padding: "10px",
        
       };
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
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleRecurrBillsAdd (params) {
   const response = yield call (AddRecurringBill,params.payload);
 console.log("handleRecurrBillsAdd",response)


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

   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR_RECURE', payload: { response: response.message, statusCode: response.status || response.statusCode } })
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
   
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'MANUAL_INVOICES_LIST', payload:{response: response.data.bill_details, statusCode:response.status || response.data.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleGetRecurrbills(action) {
   const response = yield call(GetRecurrBills, action.payload)
   
   
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


function* handleGetReceipts(action) {
   const response = yield call(GetReceiptData, action.payload)
   
    console.log("responseforreceipt", response);
    
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECEIPTS_LIST', payload:{response: response.data.all_receipts, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleAddReceipt (action) {
   const response = yield call (AddReceipt,action.payload);
 


   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'RECEIPTS_ADD' , payload:{response:response.data, statusCode:response.status || response.statusCode }})
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

function* handleEditReceipt (action) {
   const response = yield call (EditReceipt,action.payload);
 
   console.log("responsereceiptedit",response);
   

   if (response.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'RECEIPTS_EDIT' , payload:{response:response.data, statusCode:response.status || response.data.statusCode }})
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

function* handleDeleteReceipt(action) {
   const response = yield call(DeleteReceipt, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETERECEIPT', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
     
        
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


function* handleReference_Id() {
   const response = yield call(ReferenceIdGet )

   console.log("response", response);
   
   
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'REFERENCEID_GET' , payload:{response:response.data.reference_id, statusCode:response.status || response.statusCode }})      
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

function* handleReceiptPdf(action) {
   const response = yield call(ReceiptPDf, action.payload)
   console.log("response",response);
   
     if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECEIPT_PDF', payload: {response:response.data.pdf_url , statusCode:response.status || response.statusCode
      }})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleFilterRecurrCustomer(action) {
   const response = yield call(AddRecurrBillsUsers, action.payload)
  
   console.log("response", response);
   
  
   if (response.status === 200 || response.statusCode === 200 ) {
      yield put({ type: 'FILTER_RECURR_CUSTOMERS', payload: {response:response.data.user_data, statusCode:response.status || response.statusCode} }) 
   
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
   yield takeEvery('MANUAL-INVOICE-EDIT',handleManualInvoiceEdit)
   yield takeEvery('MANUAL-INVOICE-DELETE',handleManualInvoiceDelete)
   yield takeEvery('RECURRING-BILLS-ADD',handleRecurrBillsAdd)
   yield takeEvery('MANUALINVOICESLIST',handleGetManualInvoice)
   yield takeEvery('RECURRING-BILLS-LIST',handleGetRecurrbills)
   yield takeEvery('DELETE-RECURRING-BILLS',handleDeleteRecuringBills)
   yield takeEvery('SETTINGSADDRECURRING',handleAddInvoiceRecurringSettings)
      yield takeEvery('DELETEUSER',handleDeleteUser)
      yield takeEvery('DELETEAMENITIES',handleDeleteAmenities)
      yield takeEvery('ASSIGNAMENITIES', handleAssignAmenities)
      yield takeEvery('UNASSIGNAMENITIES', handleUnAssignAmenities)
          yield takeEvery('GETASSIGNAMENITIES', handleGetAssignAmenities)

          yield takeEvery('RECEIPTSLIST',handleGetReceipts)
          yield takeEvery('ADD_RECEIPT',handleAddReceipt)
          yield takeEvery('EDIT_RECEIPTS',handleEditReceipt)
          yield takeEvery('DELETE_RECEIPT',handleDeleteReceipt)
          yield takeEvery('GET_REFERENCE_ID',handleReference_Id)
          yield takeEvery('RECEIPTPDF',handleReceiptPdf)
          yield takeEvery('FILTERRECURRCUSTOMERS',handleFilterRecurrCustomer)
}
export default InvoiceSaga;