import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction, TwoStepVerification, AccountDetails, Addaccount, UpdateProfile, UpdatePassword } from '../Action/LoginAction';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* handleApiError(error) {
  const status = error?.response?.status || error?.status;

  if (status === 401) {
    yield put({
      type: "UN-AUTHORIZED",
      payload: "Access Denied",
    });
  }
  else if (status === 500) {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });

  }
  else if (error.code === "ERR_NETWORK") {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });

  }
  else if (status === 403) {
    yield put({ type: "ACCESS_RESTRICTION_ERROR", payload: "Access Restricted" });
  }
}

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

    if (response?.status === 201) {
      yield put({ type: 'CREATEACCOUNTPAGE', payload: { response: response.data, statusCode: response?.status } });

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
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.response.data.emailStatus !== "") {
        yield put({ type: 'EMAIL_ERROR', payload: error.response.data.emailStatus });
      } else if (error.response.data.mobileStatus !== "") {
        yield put({ type: 'MOBILE_ERROR', payload: error.response.data.mobileStatus });
      }
    }
  }
}


function* CreateAccountPage(action) {
  try {
    const response = yield call(CreateAccountAction, action.payload);

    if (response?.status === 200) {
      yield put({
        type: 'CREATEACCOUNT',
        payload: { response: response.data, statusCode: response?.status }
      });


    }
    if (response) {
      refreshToken(response)
    }
  } catch (error) {
    yield* handleApiError(error);

  }
}

function* ProfileUpdate(action) {
  try {
    const response = yield call(UpdateProfile, action.payload);


    if (response?.status === 200) {
      yield put({
        type: 'PROFILEUPDATE',
        payload: { response: response.data, statusCode: response?.status }
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
      toast.success(response.data.message, {
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
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
             if (error.response.data.emailStatus !== "") {
                yield put({ type: 'UPDATE_PROFILE_EMAIL_ERROR', payload: error.response.data.emailStatus });
             } else if (error.response.data.mobileStatus !== "") {
                yield put({ type: 'UPDATE_PROFILE_PHONE_NUM_ERROR', payload: error.response.data.mobileStatus });
             }
          }
    
  }
}


function* handlepasswordUpdate(action) {
  try {
    const response = yield call(UpdatePassword, action.payload);


    if (response?.status === 200) {
      yield put({
        type: 'PASSWORD-UPDATE',
        payload: { response: response.data, statusCode: response?.status, message: response?.data?.message }

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
   
  }
  catch (error) {
    yield* handleApiError(error);
 if (error.status === 400 || error.status === 403) {
      yield put({ type: 'UPDATE_CHANGEPASSWORD_ERROR', payload: error.response.data });
    }
  }
}



function* HandleTwoStepVerification(action) {
  try {
    const response = yield call(TwoStepVerification, action.payload)

    if (response?.status === 200) {
      yield put({ type: 'TWO_STEP_VERIFY', payload: { response: response.data, statusCode: response?.status } })
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
      yield put({ type: 'ERROR', payload: response?.data?.message })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);

  }
}

function* handleAccountDetails(args) {
  try {
    const response = yield call(AccountDetails, args.payload)

    if (response?.status === 200) {
      yield put({ type: 'ACCOUNT_DETAILS', payload: { response: response.data, statusCode: response?.status } })
    }
    else {
      yield put({ type: 'ERROR', payload: response?.data?.message })
    }
    if (response) {
      refreshToken(response)
    }
  } catch (error) {
    yield* handleApiError(error);

  }
}







function refreshToken(response) {
  if (response?.data && response.data?.refresh_token) {
    const refreshTokenGet = response.data?.refresh_token
    const cookies = new Cookies()
    cookies.set('token', refreshTokenGet, { path: '/' });
  } else if (response?.status === 206) {
    const message = response?.status
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


}
export default CreateAccountSaga;