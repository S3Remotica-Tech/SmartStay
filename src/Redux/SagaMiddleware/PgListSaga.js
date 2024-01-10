import { takeEvery, call, put } from "redux-saga/effects";
import {createPgList,createRoom} from "../Action/PgListAction"
import Swal from 'sweetalert2';


function* handlePgList(datum){
    const response = yield call (createPgList,datum.payload);
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

 function* handleCreateRoom(datum){
   const response = yield call (createRoom,datum.payload);
   if (response.status === 200) {
      yield put ({type:'CREATE_ROOM',payload:response.data})

      Swal.fire({
        icon: 'success',
        title: 'Room Details saved Successfully',
        timer:1000
               });

   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}
 function* PgListSaga() {
    yield takeEvery('PGLIST',handlePgList)
    yield takeEvery('CREATEROOM',handleCreateRoom)
}
export default PgListSaga;