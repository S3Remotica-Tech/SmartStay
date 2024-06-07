import { takeEvery, call, put } from "redux-saga/effects";
import {compliance,Compliancedetails} from "../Action/ComplianceAction"
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
    refreshToken(response)
}

function* handleComplianceadd (params) {
   const response = yield call (Compliancedetails,params.payload);
 
   if (response.status === 200){
      yield put ({type : 'COMPLIANCE_ADD' , payload:{response:response.data, statusCode:response.status}})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   refreshToken(response)
}

function refreshToken(response){

if(response.data.refresh_token){
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

}
export default ComplianceSaga;