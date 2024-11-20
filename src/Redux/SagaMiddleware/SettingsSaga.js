import { takeEvery, call, put } from "redux-saga/effects";
import { AddExpencesCategory, ExpencesCategorylist, DeleteExpencesCategoryList, Addcomplainttype, Complainttypelist, DeletecomplaintType, AddEBBillingUnit, GetEBBillingUnit,GetAllRoles,AddSettingRole,AddSettingPermission,editRolePermission,deleteRolePermission,addStaffUser,GetAllStaff} from "../Action/SettingsAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleCategoryAdd(params) {
   console.log("settings saga", params.payload);
   const response = yield call(AddExpencesCategory, params.payload);
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EXPENCES_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
      
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



function* handleDeleteExpencescategory(action) {
   const response = yield call(DeleteExpencesCategoryList, action.payload);
   console.log(" response", response)
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
   console.log("actionfortypelist", action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } else if (response.status === 401 || response.statusCode === 401) {
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
      });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleComplaintTypeAdd(params) {
   console.log("settings saga", params.payload);
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
   else  if(response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ALREADY_COMPLAINTTYPE_ERROR', payload: response.data.message })
 
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
   console.log(" response", response)
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
 
       // Use the toast with the defined style
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
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}


function* handleEBBillingUnitAdd(params) {
   
   const response = yield call(AddEBBillingUnit, params.payload);
   console.log("settingssaga", response);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EB_BILLING_UNIT_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode , message: response.data.message } })
    
        
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
      yield put({ type: 'EB_BILLING_UNIT_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleGetAllRoles() {
   const response = yield call(GetAllRoles)
   console.log("response.....///",response)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROLE_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
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

   console.log("handleAddSettingRole",response)
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

   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}



function* handlepermissionEdit(userDetails){
   const response = yield call(AddSettingPermission,userDetails.payload)
   console.log("response...?",response)
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

   console.log("handleEditRolePermission",response)
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

   console.log("handleDeleteRolePermission",response)
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

   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
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

   console.log("handleAddStaffUserPage",response)
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

function* handleGetAllStaffs() {
   const response = yield call(GetAllStaff)
   console.log("response.....///",response)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'USER_STAFF_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}



function refreshToken(response) {

   if (response.data && response.data.refresh_token) {
      const refreshTokenGet = response.data.refresh_token
      console.log("refreshTokenGet", refreshTokenGet)
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
   yield takeEvery('DELETE-EXPENCES-CATEGORY', handleDeleteExpencescategory)
   yield takeEvery('COMPLAINT-TYPE-LIST', handleComplainttypelist)
   yield takeEvery('COMPLAINT-TYPE-ADD', handleComplaintTypeAdd)
   yield takeEvery('DELETE-COMPLAINT-TYPE', handleDeleteComplainttype)
   yield takeEvery('EB-BILLING-UNIT-ADD', handleEBBillingUnitAdd)
   yield takeEvery('EB-BILLING-UNIT-LIST', handleEBBillingUnitGet)
   yield takeEvery('SETTING_ROLE_LIST', handleGetAllRoles)
   yield takeEvery('SETTING_ADD_ROLE_LIST', handleAddSettingRole)
   yield takeEvery('EDITPERMISSIONROLE', handlepermissionEdit)
   yield takeEvery('EDITSETTINGROLEPERMISSION', handleEditRolePermission)
   yield takeEvery('DELETESETTINGROLEPERMISSION', handleDeleteRolePermission)
   yield takeEvery('ADDSTAFFUSER', handleAddStaffUserPage)
   yield takeEvery('GETUSERSTAFF',handleGetAllStaffs)
}
export default SettingsSaga;