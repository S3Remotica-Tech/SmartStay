import { takeEvery, call, put } from "redux-saga/effects";
import {compliance,Compliancedetails, VendorList,addVendor, DeleteVendorList} from "../Action/ComplianceAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';


 function* handlecompliancelist (action){
    const response = yield call (compliance, action.payload);
    console.log("response for compliance",response)
    
    if (response.status === 200){
       yield put ({type : 'COMPLIANCE_LIST' , payload:response.data.hostelData})
    }else if(response.status === 401){
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
       });
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
 
   if (response.status === 200){
      yield put ({type : 'COMPLIANCE_ADD' , payload:{response:response.data, statusCode:response.status}})
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
 
   if (response.status === 200){
      yield put ({type : 'VENDOR_LIST' , payload:{response:response.data.VendorList, statusCode:response.status}})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleAddVendor(action) {
   const response = yield call (addVendor,action.payload);
 console.log("response", response)
   if (response.statusCode === 200){
      yield put ({type : 'ADD_VENDOR' , payload:{response:response.data, statusCode:response.statusCode}})
      Swal.fire({
         text: response.message,
         icon: "success",
         // timer: 2000,
         // showConfirmButton: false,
     });
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
  
}



function* handleDeleteVendor(action) {
   const response = yield call (DeleteVendorList,action.payload);
 console.log(" response", response)
   if (response.status === 200){
      yield put ({type : 'DELETE_VENDOR' , payload:{response:response.data, statusCode:response.status}})
      Swal.fire({
         text: "To delete a Vendor is Successfully!",
         icon: "success",
         // timer: 1000,
         // showConfirmButton: false,
     });
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
   console.log("refreshTokenGet",refreshTokenGet)
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

}
export default ComplianceSaga;