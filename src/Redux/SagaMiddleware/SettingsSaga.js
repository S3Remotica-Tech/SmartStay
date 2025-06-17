import { takeEvery, call, put } from "redux-saga/effects";
import { RecurringRole, AddExpencesCategory,EditExpencesCategory, ExpencesCategorylist, DeleteExpencesCategoryList, Addcomplainttype, Complainttypelist, DeletecomplaintType, AddEBBillingUnit, GetEBBillingUnit,GetAllRoles,AddSettingRole,AddSettingPermission,editRolePermission,deleteRolePermission,addStaffUser,GetAllStaff,GetAllReport,AddGeneral,GetAllGeneral,passwordChangesinstaff,generalDelete,passwordCheck, Editcomplainttype , DeleteElectricity,newSubscription,SubscriptionList , SubscriptionPdfDownload , SettingsAddRecurring , GetBillsFrequncyTypes , GetBillsNotificationTypes , SettingsGetRecurring , AddInvoiceSettings , SettingsGetInvoice} from "../Action/SettingsAction"

import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function* handleRecurringRole(action) {
   const response = yield call(RecurringRole, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'RECURRING_ROLE', payload: { response: response.data, statusCode: response.status || response.statusCode } })
  
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
 
      
       toast.success(`${response.data.message}`, {
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







function* handleCategorylist(action) {
   const response = yield call(ExpencesCategorylist, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EXPENCES_CATEGORY_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else if (response.status === 401 || response.statusCode === 401) {
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
      });
   }
   else {
      yield put({ type: 'ERROR_CATEGORY', payload: {statusCode: response.status || response.statusCode} })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleCategoryAdd(params) {
   const response = yield call(AddExpencesCategory, params.payload);
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EXPENCES_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message , Type: response.data.type} })
      
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
   else  if(response.status === 201 || response.statusCode === 201) {
     
      
      yield put({ type: 'ALREADY_EXPENCE_CATEGORY_ERROR', payload: response.data.message })
      
      
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleEditCategory(params) {
   const response = yield call(EditExpencesCategory, params.payload);
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EDIT-EXPENCES-CATEGORY', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
      
      var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600, fontSize: 14,  textAlign: "start", display: "flex",  alignItems: "center",  padding: "10px",  };
       toast.success(response.data.message, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true,   pauseOnHover: true, draggable: true,  progress: undefined, style: toastStyle
       })
   }
 
   else if(response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR', payload: response.data.message })
      toast.error(response.data.message, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true,   pauseOnHover: true, draggable: true,  progress: undefined,
      })
   }
   if (response) {
      refreshToken(response)
   }
}



function* handleDeleteExpencescategory(action) {
   const response = yield call(DeleteExpencesCategoryList, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_EXPENCES', payload: { response: response.data, statusCode: response.status ||  response.statusCode } })
     
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




function* handleComplainttypelist(action) {
   const response = yield call(Complainttypelist, action.payload);
   
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_LIST', payload: { response: response.data.complaint_types, statusCode: response.status || response.data.statusCode, message: response.data.message } })
   } else if (response.status === 401 || response.statusCode === 401) {
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
      });
   }
   else {
      yield put({ type: 'ERROR_COMPLIANTS', payload: {statusCode: response.status || response.data.statusCode} })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleComplaintTypeAdd(params) {
   const response = yield call(Addcomplainttype, params.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode , message: response.data.message } })
     
     
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
   else  if(response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: response.data.message })
      
      toast.error(response.data.message, {
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

    else  if(response.status === 403 || response.statusCode === 403) {
      yield put({ type: 'PLAN-EXPIRED', payload: response.data.message })}
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleComplaintTypeEdit(action) {
   const response = yield call(Editcomplainttype, action.payload);
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_EDIT', payload: { response: response.data, statusCode: response.status || response.data.statusCode , message: response.data.message } })
     
     
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
   else  if(response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: response.data.message })
      
      toast.error(response.data.message, {
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleDeleteComplainttype(action) {
   const response = yield call(DeletecomplaintType, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_COMPLAINT_TYPE', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
     
        
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
 
       toast.success('ComplaintType has been successfully deleted!', {
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
   else if(response.status === 201 || response.statusCode === 201){
      toast.error(response.data.message, {
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}


function* handleEBBillingUnitAdd(params) {
   
   const response = yield call(AddEBBillingUnit, params.payload);

   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EB_BILLING_UNIT_ADD', payload: { response: response.data, statusCode: response.status || response.data.statusCode , message: response.data.message } })
    
        
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
   else if(response.data.statusCode === 201) {
      yield put({ type: 'EB_UNIT_ERROR', payload: response.data.message});
   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleEBBillingUnitGet(action) {
   const response = yield call(GetEBBillingUnit, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EB_BILLING_UNIT_LIST', payload: { response: response.data.eb_settings, statusCode: response.status || response.statusCode  } })
   }
   else {
      yield put({ type: 'ERROR_EB_BILLING_UNIT_LIST', payload: {  statusCode: response.status || response.statusCode  } })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleDeleteElectricity(action) {
   const response = yield call(DeleteElectricity, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_ELECTRICITY', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
     
        
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
   else if(response.status === 201 || response.statusCode === 201){
      toast.error(response.data.message, {
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleGetAllRoles(action) {
   const response = yield call(GetAllRoles, action.payload)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROLE_LIST', payload:{response: response.data.roles, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR_ROLE', payload: {statusCode:response.status || response.statusCode}})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleAddSettingRole(action) {
   const response = yield call (AddSettingRole, action.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'ADD_SETTING_ROLE' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }

   else if (response.data.status === 201 || response.data.statusCode === 201) {
     
      yield put({ type: 'ROLE_ERROR', payload: response.data.message });
   }
   if(response){
      refreshToken(response)
   }
}



function* handlepermissionEdit(userDetails){
   const response = yield call(AddSettingPermission,userDetails.payload)
   if(response.status === 200 || response.statusCode === 200){
      yield put({ type: 'EDIT_PERMISSION', payload: response.data,statusCode:response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
   
}


function* handleEditRolePermission(detail) {
   const response = yield call (editRolePermission, detail.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'EDIT_SETTING_ROLE' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }

   else if (response.data.status === 201 || response.data.statusCode === 201) {
     
      yield put({ type: 'ROLE_EDIT_ERROR', payload: response.data.message });
   }

   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}



function* handleDeleteRolePermission(detail) {
   const response = yield call (deleteRolePermission, detail.payload);



   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'DELETE_SETTING_ROLE' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }

  else if (response.data.status === 202 || response.data.statusCode === 202 || response.status === 202){
      yield put ({type : 'ASSIGNED_ERROR' , payload:{statusCode:response.data.status || response.data.statusCode }});
      toast.error("This role is assigned to user", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }


   // else {
   //    yield put ({type:'ERROR', payload:response.data.message})
   // }
   if(response){
      refreshToken(response)
   }
}



//settingUser
function* handleAddStaffUserPage(detail) {
   const response = yield call (addStaffUser, detail.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'ADD_STAFF_USER' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }

   else if(response.data.statusCode === 202) {
     
      yield put({ type: 'EMAIL_ID_ERROR', payload: response.data.message });
   }

   else if(response.data.statusCode === 203) {
         
      yield put({ type: 'PHONE_NUM_ERROR', payload: response.data.message });
   }
   
   if(response){
      refreshToken(response)
   }
}

function* handleGetAllStaffs(action) {
   const response = yield call(GetAllStaff,action.payload)
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'USER_STAFF_LIST', payload:{response: response.data.user_details, statusCode:response.status || response.data.statusCode}})
   }
   else {
      yield put({ type: 'ERROR_USER', payload:{statusCode:response.status || response.data.statusCode}  })
   }
   if(response){
      refreshToken(response)
   }
}
function* handleGetAllReports() {
   const response = yield call(GetAllReport)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'REPORT_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleAddGeneralPage(action) {
   const response = yield call (AddGeneral, action.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.statusCode === 200){
      yield put ({type : 'SETTING_GENERAL_ADD' , payload:{response:response, statusCode: response.statusCode}})
      toast.success(`${response.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }
   else if(response.statusCode === 202) {
         
      yield put({ type: 'GENERAL_EMAIL_ERROR', payload: response.message });
   }
   else if(response.statusCode === 203) {
     
      yield put({ type: 'MOBILE_ERROR', payload: response.message});
   }

   else {
      yield put ({type:'ERROR', payload:response.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleGetAllGeneral() {
   const response = yield call(GetAllGeneral)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'GET_ALL_GENERAL', payload:{response: response.data.general_users, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}




function* handleChangePasswordinStaff(action) {
   const response = yield call (passwordChangesinstaff, action.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'GENERAL_PASSWORD_CHANGES' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }
   else if(response.data.statusCode === 201) {
         
      yield put({ type: 'CONFORM_PASSWORD_MATCHES', payload: response.data.message });
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCheckPassword(action) {
   const response = yield call (passwordCheck, action.payload);

   var toastStyle = {
     backgroundColor: "#E6F6E6",
     color: "black",
     width: "auto",
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

   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'GENERAL_PASSWORD_CHECK' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
      toast.success(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
     });
   }
   else if(response.data.statusCode === 201) {
         
      yield put({ type: 'PASSWORD_ERROR', payload: response.data.message });
   }

   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}



function* handleDeleteGenerlPage(action) {
   const response = yield call(generalDelete, action.payload);
 
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
 
   if (response.status === 200 || response.statusCode === 200) {
     yield put({
       type: "DELETE_GENERAL",
       payload: {
         response: response.data,
         statusCode: response.status || response.statusCode,
       },
     });
     toast.success("Deleted successfully", {
       position: "bottom-center",
       autoClose: 2000,
       hideProgressBar: true,
       closeButton: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       style: toastStyle,
     });
   } else if (response.status === 201 || response.statusCode === 201) {
     yield put({ type: "DELETE_GENERAL_ERROR", payload: response.data.message });
    
   }
   if (response) {
     refreshToken(response);
   }
 }


function* handleNewSubscriptionpage(action) {
   const response = yield call(newSubscription, action.payload);
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
 
   if (response.status === 200 || response.statusCode === 200) {
     yield put({
       type: "NEW_SUBSCRIPTION",
       payload: {
         response: response.data.data, 
         statusCode: response.status || response.statusCode,
       },
     });
    toast.success(response.message,  {
       position: "bottom-center",
       autoClose: 2000,
       hideProgressBar: true,
       closeButton: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       style: toastStyle,
     });
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
    
   
   if (response) {
     refreshToken(response);
   }
 }


function* handleNewSubscriptionList(action) {
    const { customerId } = action.payload;

   const response = yield call(SubscriptionList, customerId);
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'NEW_SUBSCRIPTION_LIST', payload: {response:response.data, statusCode: response.status || response.data.statusCode} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleSubscriptionPdf(action) {
   const response = yield call(SubscriptionPdfDownload, action.payload)

   
   
     if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'SUBSCRIPTION_PDF', payload: {response:response.data.pdf_url , statusCode:response.status || response.statusCode
      }})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleSettingsRecurring(action) {
   const response = yield call(SettingsAddRecurring, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'SETTINGSADDRECURRING', payload: { response: response.data, statusCode: response.status || response.statusCode } })
  
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
 
      
       toast.success(`${response.data.message}`, {
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


function* handleGetBillsFrequencyTypes() {
   const response = yield call(GetBillsFrequncyTypes );
   
   if (response.status === 200 || response.data.statusCode  === 200) {
      yield put({ type: 'FREQUENCYTYPESLIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else {
      yield put({ type: 'ERROR', payload: {statusCode: response.status || response.statusCode} })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleGetBillsNotificationTypes(action) {
   const response = yield call(GetBillsNotificationTypes, action.payload);
    
   if (response.status === 200 || response.data.statusCode  === 200) {
      yield put({ type: 'NOTIFICATIONTYPESLIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else {
      yield put({ type: 'ERROR', payload: {statusCode: response.status || response.statusCode} })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleGetSettingsRecurrringBill(action) {
   const response = yield call(SettingsGetRecurring , action.payload );
   
   if (response.status === 200 || response.data.statusCode  === 200) {
      yield put({ type: 'SETTINGSGETRECURRING', payload: { response: response.data.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else {
      yield put({ type: 'ERROR', payload: {statusCode: response.status || response.statusCode} })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleAddInvoiceSettings(params) {
   const response = yield call(AddInvoiceSettings, params.payload);

   if (response.successCode === 200 ||  response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ADDINVOICE_SETTINGS', payload: { response: response.data, statusCode: response.successCode || response.statusCode , message: response.message } })
     
      var toastStyle = { backgroundColor: "#E6F6E6", color: "black", width: "100%", borderRadius: "60px", height: "20px", fontFamily: "Gilroy", fontWeight: 600,  fontSize: 14,  textAlign: "start", display: "flex", alignItems: "center",  padding: "10px",  };
 toast.success(response.message, {  position: "bottom-center", autoClose: 2000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,  style: toastStyle })
   }
   
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleGetSettingsInvoice(action) {
   const response = yield call(SettingsGetInvoice , action.payload );

   
   
   if (response.status === 200 || response.data.statusCode  === 200) {
      yield put({ type: 'SETTINGSGETINVOICE', payload: { response: response.data.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else if (response.status === 201 || response.data.statusCode  === 201){
      yield put({ type: "ERROR_SETTINGS_GETINVOICE", payload: {message : response.data.message , statusCode: response.status || response.statusCode || response.data.statusCode }});
   }
   else {
      yield put({ type: 'ERROR', payload: {statusCode: response.status || response.statusCode} })
   }
   if (response) {
      refreshToken(response)
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





function* SettingsSaga() {

   yield takeEvery('EXPENCES-CATEGORY-LIST', handleCategorylist)
   yield takeEvery('EXPENCES-CATEGORY-ADD', handleCategoryAdd)
   yield takeEvery('EDIT_EXPENCES_CATEGORY', handleEditCategory)
   yield takeEvery('DELETE-EXPENCES-CATEGORY', handleDeleteExpencescategory)
   yield takeEvery('COMPLAINT-TYPE-LIST', handleComplainttypelist)
   yield takeEvery('COMPLAINT-TYPE-ADD', handleComplaintTypeAdd)
   yield takeEvery('COMPLAINT-TYPE-EDIT', handleComplaintTypeEdit)
   yield takeEvery('DELETE-COMPLAINT-TYPE', handleDeleteComplainttype)
   yield takeEvery('EB-BILLING-UNIT-ADD', handleEBBillingUnitAdd)
   yield takeEvery('EB-BILLING-UNIT-LIST', handleEBBillingUnitGet)
   yield takeEvery('DELETE-ELECTRICITY', handleDeleteElectricity)
   yield takeEvery('SETTING_ROLE_LIST', handleGetAllRoles)
   yield takeEvery('SETTING_ADD_ROLE_LIST', handleAddSettingRole)
   yield takeEvery('EDITPERMISSIONROLE', handlepermissionEdit)
   yield takeEvery('EDITSETTINGROLEPERMISSION', handleEditRolePermission)
   yield takeEvery('DELETESETTINGROLEPERMISSION', handleDeleteRolePermission)
   yield takeEvery('ADDSTAFFUSER', handleAddStaffUserPage)
   yield takeEvery('GETUSERSTAFF',handleGetAllStaffs)
   yield takeEvery('GETUSERREPORT',handleGetAllReports)
   yield takeEvery('ADDGENERALSETTING',handleAddGeneralPage)
   yield takeEvery('GETALLGENERAL',handleGetAllGeneral)
   yield takeEvery('GENERALPASSWORDCHANGES',handleChangePasswordinStaff)
   yield takeEvery('GENERALDELETEGENERAL',handleDeleteGenerlPage)  
   yield takeEvery('RECURRINGROLE',handleRecurringRole)
   yield takeEvery('CHECKPASSWORD',handleCheckPassword)
   yield takeEvery('NEWSUBSCRIPTION',handleNewSubscriptionpage)
   yield takeEvery('NEWSUBSCRIPTIONDETAILS',handleNewSubscriptionList)
   yield takeEvery('SUBSCRIPTIONPDF',handleSubscriptionPdf)
   yield takeEvery('SETTINGSADD_RECURRING',handleSettingsRecurring)
   yield takeEvery('FREQUENCY_TYPES_LIST',handleGetBillsFrequencyTypes)
   yield takeEvery('NOTIFICATION_TYPES_LIST',handleGetBillsNotificationTypes)
   yield takeEvery('SETTINGS_GET_RECURRING',handleGetSettingsRecurrringBill)
   yield takeEvery('ADD_INVOICE_SETTINGS',handleAddInvoiceSettings)
   yield takeEvery('SETTINGS_GET_INVOICE',handleGetSettingsInvoice)
}
export default SettingsSaga;