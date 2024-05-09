import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction, TwoStepVerification, AccountDetails, Addaccount } from '../Action/smartStayAction';
import Swal from 'sweetalert2';




function* CreateNewAccount(args) {
  try {
    const response = yield call(Addaccount, args.payload);
    // console.log("args.payload", args.payload);
    // console.log("response for createAccount Api", response);

    if (response.status === 200) {
      yield put({ type: 'CREATEACCOUNTPAGE', payload: { response: response.data, statusCode: response.status } });

      yield Swal.fire({
        icon: 'success',
        text: response.data.message,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 201) {
      yield Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.emailId}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 202) {
      yield Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.mobileNo}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    } else if (response.status === 203) {
      yield Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${args.payload.mobileNo} & ${args.payload.emailId}</span> This ${response.data.message}`,
        confirmButtonText: 'Ok'
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}


function* CreateAccountPage(args) {
  try {
    const response = yield call(CreateAccountAction, args.payload);
    console.log(" args.payload", args.payload)
    console.log("response for createAccount Api", response)
    if (response.statusCode === 200) {
      yield put({
        type: 'CREATEACCOUNT',
        payload: { response: response.data, statusCode: response.statusCode }
      });
      // Swal.fire({
      //   icon: 'success',
      //   text: response.data.message,
      //   confirmButtonText: 'Ok'
      // })

    }

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
}

function* handleAccountDetails() {
  const response = yield call(AccountDetails)
  if (response.status === 200) {
    yield put({ type: 'ACCOUNT_DETAILS', payload: response.data })
  }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
}



function* CreateAccountSaga() {
  yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
  yield takeEvery('TWOSTEPVERIFY', HandleTwoStepVerification)
  yield takeEvery('ACCOUNTDETAILS', handleAccountDetails)
  yield takeEvery('CREATE_ACCOUNT_PAGE', CreateNewAccount)
}
export default CreateAccountSaga;