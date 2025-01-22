import { takeEvery, call, put } from "redux-saga/effects";
import {compliance,Compliancedetails, VendorList,addVendor, DeleteVendorList, ComplianceChange,complianceDelete,getComplianceComment,addComplianceComment} from "../Action/ComplianceAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 function* handlecompliancelist (action){
    const response = yield call (compliance, action.payload);
    console.log("handlecompliancelist",response)
    if (response.status === 200  || response.data.statusCode === 200){
       yield put ({type : 'COMPLIANCE_LIST' , payload:{response:response.data.hostelData, statusCode:response.status || response.data.statusCode}})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response){
      refreshToken(response)
   }
}

function* handleComplianceadd (params) {
   const response = yield call (Compliancedetails,params.payload);
 console.log("handleComplianceadd",response)
   if (response.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'COMPLIANCE_ADD' , payload:{response:response.data, statusCode:response.status || response.data.statusCode }})
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


function* handleVendorGet(action) {
   const response = yield call (VendorList,action.payload); 
   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'VENDOR_LIST' , payload:{response:response.data.VendorList, statusCode:response.status || response.statusCode}})
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put ({type:'ERROR_VENDOR_LIST', payload:{ statusCode:response.status || response.statusCode}})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleAddVendor(action) {
   const response = yield call (addVendor,action.payload);

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

   if (response.statusCode === 200 || response.status === 200){
      yield put ({type : 'ADD_VENDOR' , payload:{response:response.data, statusCode:response.statusCode || response.status}})
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
   else if(response.statusCode === 202 || response.status === 202) {
      
      yield put ({type:'ALREADY_VENDOR_ERROR', payload:response.message})

   //    Swal.fire({
   //       text: response.message,
   //       icon: "warning",
   //       // timer: 2000,
   //       // showConfirmButton: false,
   //   });



   }
   if(response){
      refreshToken(response)
   }
  
}

// ComplianceChange

function* handleComplianceChange(action) {
   const response = yield call (ComplianceChange,action.payload);
console.log("handleComplianceChange",response)
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

   if (response.statusCode === 200 || response.status === 200){
      yield put ({type : 'COMPLIANCE_CHANGE_STATUS' , payload:{response:response.data, statusCode:response.statusCode || response.status}})
      toast.success(`${response.data.message}`, {
         position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: undefined,
      style: toastStyle,
       });
   }
   else{
      
      yield put ({type:'COMPLIANCE_CHANGE_STATUS_ERROR', payload:response.message})
   }
   if(response){
      refreshToken(response)
   }
  
}






function* handleComplianceChangeAssign(action) {
   const response = yield call (ComplianceChange,action.payload);
console.log("handleComplianceChange",response)
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

   if (response.statusCode === 200 || response.status === 200){
      yield put ({type : 'COMPLIANCE_CHANGE_ASSIGN' , payload:{response:response.data, statusCode:response.statusCode || response.status}})
      toast.success(`${response.data.message}`, {
         position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: undefined,
      style: toastStyle,
       });
   }
   else{
      
      yield put ({type:'COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR', payload:response.message})
   }
   if(response){
      refreshToken(response)
   }
  
}
function* handleDeleteVendor(action) {
   const response = yield call (DeleteVendorList,action.payload);

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

   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'DELETE_VENDOR' , payload:{response:response.data, statusCode:response.status || response.statusCode}})
      toast.success('Vendor has been successfully deleted!', {
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


function* handleDeleteCompliance(action) {
   const response = yield call (complianceDelete,action.payload);
   console.log("handleDeleteCompliance",response)

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

   if (response.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'DELETE_COMPLIANCE' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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



function* handleGetComplianceComment (action){
   const response = yield call (getComplianceComment, action.payload);
   console.log("handleGetCompliance",response)
   if (response.status === 200  || response.data.statusCode === 200){
      yield put ({type : 'COMPLIANCE_COMENET_LIST' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
     refreshToken(response)
  }
}






function* handleAddComplianceComment(action) {
   const response = yield call (addComplianceComment,action.payload);
 console.log("handleAddComplianceComment",response)
   if (response.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'COMPLIANCE_ADD_COMMENT' , payload:{response:response.data, statusCode:response.status || response.data.statusCode }})
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





function* ComplianceSaga() {
    yield takeEvery('COMPLIANCE-LIST', handlecompliancelist)
    yield takeEvery('COMPLIANCE-ADD', handleComplianceadd) 
    yield takeEvery('VENDORLIST',handleVendorGet)
    yield takeEvery('ADDVENDOR',handleAddVendor)
    yield takeEvery('DELETEVENDOR',handleDeleteVendor)
    yield takeEvery('COMPLIANCE-CHANGE-STATUS',handleComplianceChange)
    yield takeEvery('DELETECOMPLIANCE',handleDeleteCompliance)
    yield takeEvery('COMPLIANCEASSIGN',handleComplianceChangeAssign)
    yield takeEvery('GET_COMPLIANCE_COMMENT',handleGetComplianceComment) 
    yield takeEvery('Add_COMPLIANCE_COMMENT',handleAddComplianceComment)      

}
export default ComplianceSaga;