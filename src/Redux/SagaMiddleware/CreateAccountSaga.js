import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction, TwoStepVerification, AccountDetails, Addaccount, GetAllNotification, UpdateNotification, UpdateProfile, UpdatePassword } from '../Action/smartStayAction';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function* CreateNewAccount(args) {
  try {
    const response = yield call(Addaccount, args.payload);
    var toastStyle = {
      backgroundColor: "#E6F6E6",
      color: "black",
      width: "auto",
      borderRadius: "60px",
      height: "20px",
      fontFamily: "Gilroy",
      fontWeight: 600,
      fontSize: 14,
      textAlign: "start",
      display: "flex",
      alignItems: "center",
      padding: "10px",

    };

    if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'CREATEACCOUNTPAGE', payload: { response: response.data, statusCode: response.status || response.statusCode } });

      toast.success('created successfully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
      });
    } else if (response.status === 210 || response.statusCode === 210) {

      yield put({ type: 'PASSWORD_DOESNT_ERROR', payload: response.data.message });
    }
    else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'EMAIL_ERROR', payload: response.data.message });

    } else if (response.status === 202 || response.statusCode === 202) {
      yield put({ type: 'MOBILE_ERROR', payload: response.data.message });

    } else if (response.status === 203 || response.statusCode === 203) {
      yield put({ type: 'EMAIL_MOBILE_ERROR', payload: response.data.message });

    }
    if (response) {
      refreshToken(response)
    }
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }
  }
}


function* CreateAccountPage(action) {
  try {
    const response = yield call(CreateAccountAction, action.payload);

    if (response.statusCode === 200 || response.status === 200) {
      yield put({
        type: 'CREATEACCOUNT',
        payload: { response: response.data, statusCode: response.statusCode || response.status }
      });


    }
    if (response) {
      refreshToken(response)
    }
  } catch (error) {
    console.error("error", error);
  }
}

function* ProfileUpdate(action) {
  try {
    const response = yield call(UpdateProfile, action.payload);


    if (response.statusCode === 200 || response.status === 200) {
      yield put({
        type: 'PROFILEUPDATE',
        payload: { response: response.data, statusCode: response.statusCode || response.status }
      });


      var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "100%",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

      };



      toast.success(response.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle
      })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }

  }
}


function* handlepasswordUpdate(action) {
  try {
    const response = yield call(UpdatePassword, action.payload);


    if (response.statusCode === 200 || response.status === 200) {
      yield put({
        type: 'PASSWORD-UPDATE',
        payload: { response: response.data, statusCode: response.statusCode || response.status, message: response.data.message }

      });

      var toastStyle = {
        backgroundColor: 'green',
        color: 'white',
        width: "100%"
      };

      toast.success(response.data.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle
      })




    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }

  }
}



function* HandleTwoStepVerification(action) {
  try {
    const response = yield call(TwoStepVerification, action.payload)

    if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'TWO_STEP_VERIFY', payload: { response: response.data, statusCode: response.status || response.statusCode } })
      var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

      };

      toast.success(response.data.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
      })
    }
    else {
      yield put({ type: 'ERROR', payload: response.data.message })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    } else {
      yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
    }

  }
}

function* handleAccountDetails(args) {
  try {
    const response = yield call(AccountDetails, args.payload)

    if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ACCOUNT_DETAILS', payload: { response: response.data, statusCode: response.status || response.statusCode } })
    }
    else {
      yield put({ type: 'ERROR', payload: response.data.message })
    }
    if (response) {
      refreshToken(response)
    }
  } catch (error) {
    console.error("Error in handleAccountDetails:", error);
    yield put({ type: 'ERROR', payload: 'Failed to fetch account details' });
  }
}


function* handlenotificationlist(action) {
  const response = yield call(GetAllNotification, action.payload);

  if (response.status === 200 || response.statusCode === 200) {
    yield put({ type: 'ALL_NOTIFICATION_LIST', payload: response.data.notification })

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
  refreshToken(response)
}


function* HandleUpdateNotification(action) {
  const response = yield call(UpdateNotification, action.payload)

  if (response.status === 200 || response.statusCode === 200) {

    yield put({ type: 'UPDATE_NOTIFICATION', payload: { response: response.data.message, statusCode: response.status || response.statusCode } })

  }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
  refreshToken(response)
}

function refreshToken(response) {
  if (response.data && response.data.refresh_token) {
    const refreshTokenGet = response.data.refresh_token
    const cookies = new Cookies()
    cookies.set('token', refreshTokenGet, { path: '/' });
  } else if (response.status === 206) {
    const message = response.status
    const cookies = new Cookies()
    cookies.set('access-denied', message, { path: '/' });

  }

}



function* CreateAccountSaga() {
  yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
  yield takeEvery('PROFILE-UPDATE', ProfileUpdate)
  yield takeEvery('PASSWORD_UPDATE', handlepasswordUpdate)
  yield takeEvery('TWOSTEPVERIFY', HandleTwoStepVerification)
  yield takeEvery('ACCOUNTDETAILS', handleAccountDetails)
  yield takeEvery('CREATE_ACCOUNT_PAGE', CreateNewAccount)
  yield takeEvery('ALL-NOTIFICATION-LIST', handlenotificationlist)
  yield takeEvery('UPDATE-NOTIFICATION', HandleUpdateNotification)

}
export default CreateAccountSaga;