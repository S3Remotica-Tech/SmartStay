import { takeEvery, call, put } from "redux-saga/effects";
import {compliance} from "../Action/ComplianceAction"


 function* handlecompliancelist (){
    const response = yield call (compliance);
    console.log("response",response);
    if (response.status === 200){
       yield put ({type : 'COMPLIANCE_LIST' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}

function* ComplianceSaga() {
    yield takeEvery('COMPLIANCE-LIST', handlecompliancelist)
 

}
export default ComplianceSaga;