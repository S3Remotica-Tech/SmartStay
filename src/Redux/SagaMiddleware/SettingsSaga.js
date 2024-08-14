import { takeEvery, call, put } from "redux-saga/effects";
import { AddExpencesCategory, ExpencesCategorylist, DeleteExpencesCategoryList, Addcomplainttype, Complainttypelist, DeletecomplaintType, AddEBBillingUnit, GetEBBillingUnit } from "../Action/SettingsAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';


function* handleCategorylist(action) {
   const response = yield call(ExpencesCategorylist, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EXPENCES_CATEGORY_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } 
   else if (response.status === 401 || response.statusCode === 401) {
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
      });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleCategoryAdd(params) {
   console.log("settings saga", params.payload);
   const response = yield call(AddExpencesCategory, params.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EXPENCES_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}



function* handleDeleteExpencescategory(action) {
   const response = yield call(DeleteExpencesCategoryList, action.payload);
   console.log(" response", response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_EXPENCES', payload: { response: response.data, statusCode: response.status ||  response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}




function* handleComplainttypelist(action) {
   const response = yield call(Complainttypelist, action.payload);
   console.log("actionfortypelist", action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode, message: response.data.message } })
   } else if (response.status === 401 || response.statusCode === 401) {
      Swal.fire({
         icon: 'warning',
         title: 'Error',
         text: response.data.message,
      });
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleComplaintTypeAdd(params) {
   console.log("settings saga", params.payload);
   const response = yield call(Addcomplainttype, params.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'COMPLAINT_TYPE_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode , message: response.data.message } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}



function* handleDeleteComplainttype(action) {
   const response = yield call(DeletecomplaintType, action.payload);
   console.log(" response", response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_COMPLAINT_TYPE', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}


function* handleEBBillingUnitAdd(params) {
   console.log("settings saga", params.payload);
   const response = yield call(AddEBBillingUnit, params.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EB_BILLING_UNIT_ADD', payload: { response: response.data, statusCode: response.status || response.statusCode , message: response.data.message } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleEBBillingUnitGet(action) {
   const response = yield call(GetEBBillingUnit, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'EB_BILLING_UNIT_LIST', payload: { response: response.data, statusCode: response.status || response.statusCode  } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
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





function* SettingsSaga() {

   yield takeEvery('EXPENCES-CATEGORY-LIST', handleCategorylist)
   yield takeEvery('EXPENCES-CATEGORY-ADD', handleCategoryAdd)
   yield takeEvery('DELETE-EXPENCES-CATEGORY', handleDeleteExpencescategory)
   yield takeEvery('COMPLAINT-TYPE-LIST', handleComplainttypelist)
   yield takeEvery('COMPLAINT-TYPE-ADD', handleComplaintTypeAdd)
   yield takeEvery('DELETE-COMPLAINT-TYPE', handleDeleteComplainttype)
   yield takeEvery('EB-BILLING-UNIT-ADD', handleEBBillingUnitAdd)
   yield takeEvery('EB-BILLING-UNIT-LIST', handleEBBillingUnitGet)
}
export default SettingsSaga;