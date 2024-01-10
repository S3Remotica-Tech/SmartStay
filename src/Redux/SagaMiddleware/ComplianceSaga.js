import { takeEvery, call, put } from "redux-saga/effects";
import {compliance,Compliancedetails} from "../Action/ComplianceAction"


 function* handlecompliancelist (){
    const response = yield call (compliance);
    if (response.status === 200){
       yield put ({type : 'COMPLIANCE_LIST' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}

function* handleComplianceadd (params) {
   const response = yield call (Compliancedetails,params.payload);
   if (response.status === 200){
      yield put ({type : 'COMPLIANCE_ADD' , payload:{response:response.data}})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}

function* ComplianceSaga() {
    yield takeEvery('COMPLIANCE-LIST', handlecompliancelist)
    yield takeEvery('COMPLIANCE-ADD', handleComplianceadd) 

}
export default ComplianceSaga;