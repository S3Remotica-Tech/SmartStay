import { takeEvery, call, put } from "redux-saga/effects";
import { userlist, addUser, hostelList, roomsCount,hosteliddetail,userBillPaymentHistory} from "../Action/UserListAction"


function* handleuserlist() {
   const response = yield call(userlist);
   if (response.status === 200) {
      yield put({ type: 'USER_LIST', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}
function* handleAddUser(datum) {
   const response = yield call(addUser, datum.payload);
   if (response.status === 200) {
      yield put({ type: 'ADD_USER', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}
function* handleHostelList() {
   const response = yield call(hostelList)
   if (response.status === 200) {
      yield put({ type: 'HOSTEL_LIST', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleNumberOfRooms(ID) {
   const response = yield call(roomsCount, ID.payload)
   if (response.status === 200) {
      yield put({ type: 'ROOM_COUNT', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handlehosteliddetail(data) {
   const response = yield call(hosteliddetail,data.payload);
   if (response.status === 200) {
      yield put({ type: 'HOSTEL_DETAIL_LIST', payload: response.data })

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}
function* handleUserBillPaymentHistory(){
   const response = yield call(userBillPaymentHistory)
   if (response.status === 200) {
      yield put ({type:'BILL_PAYMENT_HISTORY',payload:response.data})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}
function* UserListSaga() {
   yield takeEvery('USERLIST', handleuserlist)
   yield takeEvery('ADDUSER', handleAddUser)
   yield takeEvery('HOSTELLIST', handleHostelList)
   yield takeEvery('ROOMCOUNT', handleNumberOfRooms)
   yield takeEvery('HOSTELDETAILLIST', handlehosteliddetail)
   yield takeEvery('BILLPAYMENTHISTORY',handleUserBillPaymentHistory)
}
export default UserListSaga;