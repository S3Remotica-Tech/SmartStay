import { takeEvery, call, put } from "redux-saga/effects";
import {userlist,addUser,hostelList} from "../Action/UserListAction"


 function* handleuserlist (){
    const response = yield call (userlist);
   //  console.log("response",response);
    if (response.status === 200){
       yield put ({type : 'USER_LIST' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}
function* handleAddUser (datum) {
   console.log("datum...saga",datum);
   const response = yield call (addUser,datum.payload);
   console.log("response",response);
   if (response.status === 200) {
      yield put ({type:'ADD_USER',payload:response.data})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}
function* handleHostelList (){
   const response = yield call (hostelList)
   console.log("response.....hostelList",response);
   if (response.status === 200) {
      yield put ({type:'HOSTEL_LIST',payload:response.data})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
}
function* UserListSaga() {
    yield takeEvery('USERLIST', handleuserlist)
    yield takeEvery('ADDUSER',handleAddUser)
    yield takeEvery('HOSTELLIST',handleHostelList)

}
export default UserListSaga;