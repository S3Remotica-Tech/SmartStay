import { takeEvery, call, put } from "redux-saga/effects";
import {DeletePG, DeleteBed, createBed,createPgList, createRoom, CheckRoomId, CheckBedDetails, Checkeblist, CreateEbbill, EB_Customerlist, EB_startmeterlist, createAllPGDetails } from "../Action/PgListAction"
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

function* handlePgList(datum) {
   const response = yield call(createPgList, datum.payload);
console.log("response PG",response)
   if (response.statusCode === 200) {
      yield put({ type: 'PG_LIST', payload:{response: response.data , statusCode:response.statusCode}})
          Swal.fire({
         icon: 'success',
         title: 'Hostel Details saved Successfully',

      });

   }
   else if(response && response.statusCode === 201){
          Swal.fire({
         icon: 'warning',
         title: 'Hostel name already exist' ,
         timer: 1000
              });
        }else {
      console.log('Unhandled status code:', response.statusCode); 
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCreateRoom(datum) {
   const response = yield call(createRoom, datum.payload);

   if (response.status === 200) {
      yield put({ type: 'CREATE_ROOM', payload: { response: response.data, statusCode: response.status } })
      yield put({ type: 'UPDATE_MESSAGE_AFTER_CREATION', message: 'CREATED SUCCESSFULLY' })

      Swal.fire({
         icon: 'success',
         title: "Room created successfully",
     })

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCheckRoom() {
   const response = yield call(CheckRoomId);
   if (response.status === 200) {
      yield put({ type: 'CHECK_ROOM', payload: response.data.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleCheckEblist() {
   const response = yield call(EB_Customerlist);
   console.log("response for eb list", response)
   if (response.status === 200) {
      yield put({ type: 'EB_LIST', payload: response.data.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCheckEbStartmeterlist() {
   const response = yield call(EB_startmeterlist);
   if (response.status === 200) {
      console.log("....responsePG",response)
      yield put({ type: 'EB_STARTMETER_LIST', payload: response.data.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleCheckEB(action) {
   const response = yield call(Checkeblist, action.payload.hostelcheckedvalues);
   if (response.status === 200) {
      yield put({ type: 'CHECK_EB', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleCreateEB(action) {
   const response = yield call(CreateEbbill, action.payload);

   if (response.status === 200) {
      yield put({ type: 'CREATE_EB', payload: { response: response.data, statusCode: response.status } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCreatePGDashboard(action) {
   console.log("action dashboard", action.payload)
   const response = yield call(createAllPGDetails, action.payload);
   console.log("response for dashboard", response)

   if (response.status === 200) {
      yield put({ type: 'CREATE_PG_DASHBOARD', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCheckBedDetails(action) {
   const response = yield call(CheckBedDetails, action.payload);
   if (response.status === 200) {
      yield put({ type: 'BED_DETAILS', payload: { response: response.data, statusCode: response.status } })
   }
   else if (response.status === 201) {
      yield put({ type: 'NO_USER_BED', payload: { response: response.data.message, statusCode: response.status } })
   }
   if(response){
      refreshToken(response)
   }
}



function* handleCreateBed(action) {
   const response = yield call(createBed, action.payload);
   console.log("response create Bed", response.status)
   if (response.status === 200) {
      yield put({ type: 'CREATE_BED', payload: { response: response.data, statusCode: response.status } })
      Swal.fire({
         icon: 'success',
         title: "Bed created successfully",
     })
   }
   else if (response.status === 201) {
      // yield put({ type: 'ALREADY_BED', payload: { response: response.data.message, statusCode: response.status } })
        Swal.fire({
         icon: 'warning',
         title: response.data.message,
         timer: 1000
              });
   }
   if(response){
      refreshToken(response)
   }
}



function* handleDeleteBed(action) {
   const response = yield call(DeleteBed, action.payload);
   console.log("response delete Bed", response.status)
   if (response.status === 200) {
      yield put({ type: 'DELETE_BED', payload: { response: response.data, statusCode: response.status } })
      Swal.fire({
         icon: 'success',
         title: "Bed created successfully",
     })
   }
   else if (response.status === 201) {
       Swal.fire({
         icon: 'warning',
         title: response.data.message,
         timer: 1000
              });
   }
   if(response){
      refreshToken(response)
   }
}

function* handleDeletePG(action) {
   const response = yield call(DeletePG, action.payload);
   console.log("response delete PG", response)
   if (response.status === 200) {
      yield put({ type: 'DELETE_PG', payload: { response: response.data, statusCode: response.status } })
      Swal.fire({
         icon: 'success',
         title: "Hostel deleted successfully",
     })
   }
   else if (response.status === 201) {
       Swal.fire({
         icon: 'warning',
         title: response.data.message,
       
              });
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



function* PgListSaga() {
   yield takeEvery('PGLIST', handlePgList)
   yield takeEvery('CREATEROOM', handleCreateRoom)
   yield takeEvery('CHECKROOM', handleCheckRoom)
   yield takeEvery('BEDDETAILS', handleCheckBedDetails)
   yield takeEvery('CHECKEB', handleCheckEB)
   yield takeEvery('CREATEEB', handleCreateEB)
   yield takeEvery('EBLIST', handleCheckEblist)
   yield takeEvery('EBSTARTMETERLIST', handleCheckEbStartmeterlist)
   yield takeEvery('PGDASHBOARD', handleCreatePGDashboard)
   yield takeEvery('CREATEBED',handleCreateBed)
   yield takeEvery('DELETEBED',handleDeleteBed)
   yield takeEvery('DELETEPG',handleDeletePG)
}
export default PgListSaga;