import { takeEvery, call, put } from "redux-saga/effects";
import {createPgList} from "../Action/PgListAction"
import Swal from 'sweetalert2';


function* handlePgList(datum){
    console.log("datum...saga",datum);
    const response = yield call (createPgList,datum.payload);
    console.log("response",response);
    if (response.status === 200) {
       yield put ({type:'PG_LIST',payload:response.data})

       Swal.fire({
         icon: 'success',
         title: 'Hostel Details saved Successful',
                });

    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
 }


 function* PgListSaga() {
    yield takeEvery('PGLIST',handlePgList)
    
}
export default PgListSaga;