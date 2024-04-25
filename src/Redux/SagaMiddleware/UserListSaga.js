import { takeEvery, call, put } from "redux-saga/effects";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { userlist, addUser, hostelList, roomsCount,hosteliddetail,userBillPaymentHistory,createFloor,roomFullCheck} from "../Action/UserListAction"


function* handleuserlist(user) {
   const response = yield call(userlist,user.payload);
   if (response.status === 200) {
      yield put({ type: 'USER_LIST', payload:{response: response.data, statusCode:response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}
function* handleHostelList(hostel) {
   const response = yield call(hostelList,hostel.payload)
   if (response.status === 200) {
      yield put({ type: 'HOSTEL_LIST', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleNumberOfRooms(ID) {
   console.log("payload", ID.payload)
   const response = yield call(roomsCount, ID.payload)
   if (response.status === 200) {
      yield put({ type: 'ROOM_COUNT', payload: response.data })
   }
   else {
      console.log("response.dataForRoomCount",response.data);
      yield put({ type: 'ERROR', payload: {response:response.data.message,floor_Id:ID.payload.floor_Id} })
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

function* handleCreateFloor(data) {
   const response = yield call(createFloor,data.payload);
   if (response.status === 200) {
      yield put({ type: 'CREATE_FLOOR', payload: response.data })
      yield put({ type: 'UPDATE_MESSAGE_FLOOR', message: 'CREATED SUCCESSFULLY'})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}

function* handleRoomsDetails(ID) {
   const response = yield call(roomsCount, ID.payload)
   if (response.status === 200) {
      yield put({ type: 'ROOM_DETAILS', payload: response.data })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
}



function* handleAddUser(datum) {
      const response = yield call(addUser, datum.payload);
      if (response.status === 200) {
         yield put({ type: 'ADD_USER',payload:{response: response.data, statusCode:response.status}})
      }
      else if(response.status === 202) {
         Swal.fire({
            icon: 'warning',
           title: 'Error',
           html: `<span style="color: red">${datum.payload.Phone}</span> is already exist in the database`,
           
         });
      }
      else if(response.status === 203) {
         Swal.fire({
           icon: 'warning',
           title: 'Error',
           html: `<span style="color: red">${datum.payload.Email}</span> is already exist in the database`,
         });
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
   }


   function* handleRoomCheck(action) {
      console.log("action",action)
      console.log('ROOM_FULL saga triggered. Payload:', action.payload);
      const response = yield call(roomFullCheck, action.payload)
        console.log("response",response)
      if (response.status === 200 && response.data.length > 0) {
         yield put({ type: 'ROOM_FULL', payload: response.data })
         console.log("response.data",response.data)
            }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
   }

function* UserListSaga() {
   yield takeEvery('USERLIST', handleuserlist)
   yield takeEvery('ADDUSER', handleAddUser)
   yield takeEvery('HOSTELLIST', handleHostelList)
   yield takeEvery('ROOMCOUNT', handleNumberOfRooms)
   yield takeEvery('HOSTELDETAILLIST', handlehosteliddetail)
   yield takeEvery('BILLPAYMENTHISTORY',handleUserBillPaymentHistory)
   yield takeEvery('CREATEFLOOR',handleCreateFloor)
   yield takeEvery('ROOMDETAILS',handleRoomsDetails)
   yield takeEvery('ROOMFULL', handleRoomCheck)
   
  
}
export default UserListSaga;