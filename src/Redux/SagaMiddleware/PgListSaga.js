import { takeEvery, call, put } from "redux-saga/effects";
import {createPgList,createRoom,CheckRoomId} from "../Action/PgListAction"
import Swal from 'sweetalert2';


function* handlePgList(datum){
    const response = yield call (createPgList,datum.payload);
    if (response.status === 200) {
       yield put ({type:'PG_LIST',payload:response.data,roomCount:['']})

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
   console.log("datum",datum);
   const response = yield call (createRoom,datum.payload);
   console.log("response create room",response);
   if (response.status === 200) {
      yield put ({type:'CREATE_ROOM',payload:response.data})

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Room Details saved Successfully',
      //   timer:1000
      //          });

   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}

function* handleCheckRoom(){
   const response = yield call(CheckRoomId);
   if (response.status === 200) {
      yield put ({type:'CHECK_ROOM',payload:response.data})
         }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}

 function* PgListSaga() {
    yield takeEvery('PGLIST',handlePgList)
    yield takeEvery('CREATEROOM',handleCreateRoom)
    yield takeEvery('CHECKROOM',handleCheckRoom)
}
export default PgListSaga;