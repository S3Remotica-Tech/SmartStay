import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction, TwoStepVerification, AccountDetails, Addaccount,GetAllNotification,UpdateNotification } from '../Action/smartStayAction';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';



function* CreateNewAccount(args) {
  try {
    const response = yield call(Addaccount, args.payload);
      if (response.status === 200) {
      yield put({ type: 'CREATEACCOUNTPAGE', payload: { response: response.data, statusCode: response.status } });

      Swal.fire({
        icon: 'success',
        text: response.data.message,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 201) {
       Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.emailId}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 202) {
     Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.mobileNo}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 203) {
     Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.mobileNo} & ${args.payload.emailId}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    }
    refreshToken(response)
  } catch (error) {
    console.log("error", error);
  }
}


function* CreateAccountPage(action) {
  console.log("action create account",action)
  try {
    const response = yield call(CreateAccountAction, action.payload);
    console.log("response for ca",response.statusCode)
       
    if (response.statusCode === 200) {
      yield put({
        type: 'CREATEACCOUNT',
        payload: { response: response.data, statusCode: response.statusCode }
      });

     
    }
    refreshToken(response)
  } catch (error) {
    console.log("error", error);
  }
}





function* HandleTwoStepVerification(action) {
  const response = yield call(TwoStepVerification, action.payload)
 
  if (response.status === 200) {
    yield put({ type: 'TWO_STEP_VERIFY', payload: { response: response.data, statusCode: response.status } })
    Swal.fire({
      icon: 'success',
      text: 'Updated successfully',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
  refreshToken(response)
}

function* handleAccountDetails(args) {
  try {
   const response = yield call(AccountDetails,args.payload)
// console.log("Response for account",response)

  if (response.status === 200) {
    yield put({ type: 'ACCOUNT_DETAILS', payload: { response: response.data, statusCode: response.status }})
     }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
  refreshToken(response)
} catch (error) {
  console.error("Error in handleAccountDetails:", error);
    yield put({ type: 'ERROR', payload: 'Failed to fetch account details' });
}
}


function* handlenotificationlist (action){
  const response = yield call (GetAllNotification, action.payload);
  console.log("response for notification",response)
  
  if (response.status === 200){
     yield put ({type : 'ALL_NOTIFICATION_LIST' , payload:response.data.notification})
  }else if(response.status === 401){
    Swal.fire({
       icon: 'warning',
       title: 'Error',
       text: response.data.message,
     });
  }
  else {
     yield put ({type:'ERROR', payload:response.data.message})
  }
  refreshToken(response)
}


function* HandleUpdateNotification(action) {
  const response = yield call(UpdateNotification, action.payload)
 
  if (response.status === 200) {
    yield put({ type: 'UPDATE_NOTIFICATION', payload: { response: response.data.message, statusCode: response.status } })
  }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
  refreshToken(response)
}

function refreshToken(response){
  if(response.data.refresh_token){
     const refreshTokenGet = response.data.refresh_token
     console.log("refreshTokenGet",refreshTokenGet)
     const cookies = new Cookies()
     cookies.set('token', refreshTokenGet, { path: '/' });
  }else if (response.status === 206) {
    const message = response.status
    const cookies = new Cookies()
    cookies.set('access-denied', message, { path: '/' });
  
 }
  
  }



function* CreateAccountSaga() {
  yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
  yield takeEvery('TWOSTEPVERIFY', HandleTwoStepVerification)
  yield takeEvery('ACCOUNTDETAILS', handleAccountDetails)
  yield takeEvery('CREATE_ACCOUNT_PAGE', CreateNewAccount)
  yield takeEvery('ALL-NOTIFICATION-LIST', handlenotificationlist)
  yield takeEvery('UPDATE-NOTIFICATION', HandleUpdateNotification)

}
export default CreateAccountSaga;