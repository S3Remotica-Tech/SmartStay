import { takeEvery, call, put } from "redux-saga/effects";
import {userlist} from "../Action/UserListAction"


 function* handleuserlist (){
    const response = yield call (userlist);
    console.log("response",response);
    if (response.status === 200){
       yield put ({type : 'USERS_LIST' , payload:response.data})
    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
}

function* UserListSaga() {
    yield takeEvery('USERLIST', handleuserlist)
 

}
export default UserListSaga;