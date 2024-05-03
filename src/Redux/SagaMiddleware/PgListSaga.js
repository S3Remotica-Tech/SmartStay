import { takeEvery, call, put } from "redux-saga/effects";
import {createPgList,createRoom,CheckRoomId,CheckBedDetails,Checkeblist,CreateEbbill,EB_Customerlist,EB_startmeterlist} from "../Action/PgListAction"
import Swal from 'sweetalert2';


function* handlePgList(datum){
    const response = yield call (createPgList,datum.payload);
    if (response.status === 200) {
       yield put ({type:'PG_LIST',payload:response.data,roomCount:['']})
       yield put ({type:'AFTER_CREATE_PG_MSG',message:'PG created succesfully'})

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
   console.log("response create room",response);
   if (response.status === 200) {
      yield put ({type:'CREATE_ROOM',payload:response.data})
      yield put({ type: 'UPDATE_MESSAGE_AFTER_CREATION', message: 'CREATED SUCCESSFULLY'})

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


function* handleCheckEblist(){
   const response = yield call(EB_Customerlist);
   if (response.status === 200) {
      yield put ({type:'EB_LIST',payload:response.data})
         }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}

function* handleCheckEbStartmeterlist(){
   const response = yield call(EB_startmeterlist);
   if (response.status === 200) {
      yield put ({type:'EB_STARTMETER_LIST',payload:response.data})
         }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}


function* handleCheckEB(action){
   console.log("action.payload",action.payload);
   const response = yield call(Checkeblist,action.payload.hostelcheckedvalues);
   if (response.status === 200) {
      yield put ({type:'CHECK_EB',payload:response.data})
         }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}


function* handleCreateEB(action){
   console.log("action.payload",action.payload);
   const response = yield call(CreateEbbill,action.payload);
   if (response.status === 200) {
      yield put ({type:'CREATE_EB',payload:response.data})
         }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}

function* handleCheckBedDetails(action){
   const response = yield call (CheckBedDetails,action.payload);

   console.log("action.payload",action.payload)
   console.log("responseBed", response.status)

   if (response.status === 200) {
      yield put ({type:'BED_DETAILS',payload:{ response:response.data,statusCode:response.status}})
   }
   else if(response.status === 201) {
      yield put ({type:'NO_USER_BED', payload: { response:response.data.message,statusCode:response.status}})

   }
}

 function* PgListSaga() {
    yield takeEvery('PGLIST',handlePgList)
    yield takeEvery('CREATEROOM',handleCreateRoom)
    yield takeEvery('CHECKROOM',handleCheckRoom)
    yield takeEvery('BEDDETAILS',handleCheckBedDetails)
    yield takeEvery('CHECKEB',handleCheckEB)
    yield takeEvery('CREATEEB',handleCreateEB)
    yield takeEvery('EBLIST',handleCheckEblist)
    yield takeEvery('EBSTARTMETERLIST',handleCheckEbStartmeterlist)
    
}
export default PgListSaga;