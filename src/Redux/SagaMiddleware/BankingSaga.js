import { takeEvery, call, put } from "redux-saga/effects";
import { AddBankingDetails, GetAddBanking, AddDefaultAccount, AddBankAmount, editBankTrans, DeleteBanking, DeleteTransactionId } from "../Action/BankingAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleAddBanking(action) {
  try {
    const response = yield call(AddBankingDetails, action.payload);

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

    if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'ADD_USER_BANKING', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })
      toast.success(`${response.data.message}`, {
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

    else {
      yield put({ type: 'ERROR_BOOKING', payload: response.data.message })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
}

function* handleGetBanking(action) {
  const response = yield call(GetAddBanking, action.payload)
  if (response.status === 200 || response.data.statusCode === 200) {
    yield put({ type: 'BANKING_LIST', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
  }

  else if (response.status === 201 || response.data.statusCode === 201) {
    yield put({ type: 'NO_BANKING', payload: { statusCode: response.data.statusCode } })
  }
  else {
    yield put({ type: 'ERROR', payload: response.data.message })
  }
  if (response) {
    refreshToken(response)
  }
}


function* handleDefaultAccount(action) {
  const response = yield call(AddDefaultAccount, action.payload);

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

  if (response.data.status === 200 || response.data.statusCode === 200) {
    yield put({ type: 'DEFAULT_ACCOUNT', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })
    toast.success(`${response.data.message}`, {
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

  else {
    yield put({ type: 'ERROR_BOOKING', payload: response.data.message })
  }
  if (response) {
    refreshToken(response)
  }
}



function* handleAddBankAmount(action) {
  try{
  const response = yield call(AddBankAmount, action.payload);

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

  if (response.data.status === 200 || response.data.statusCode === 200) {
    yield put({ type: 'ADD_BANK_AMOUNT', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })
    toast.success(`${response.data.message}`, {
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

  else {
    yield put({ type: 'ERROR_ADD_AMOUNT', payload: response.data.message })
  }
  if (response) {
    refreshToken(response)
  }
   }
 catch (error) {
       if (error.code === 'ERR_NETWORK') {
          yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
       } else {
          yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
       }
    }
}


function* handleEditBankTrans(action) {
  try{
  const response = yield call(editBankTrans, action.payload);

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

  if (response.status === 200 || response.data.statusCode === 200) {
    yield put({ type: 'EDIT_BANK_TRANSACTION', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
    toast.success(`${response.data.message}`, {
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
          yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
       }
    }
}


function* handleDeleteBanking(action) {
  const response = yield call(DeleteBanking, action.payload);

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

  if (response.status === 200 || response.data.statusCode === 200) {
    yield put({
      type: "DELETE_BANKING",
      payload: {
        response: response.data,
        statusCode: response.status || response.data.statusCode,
      },
    });
    toast.success("Deleted successfully", {
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
  } else if (response.status === 201 || response.data.statusCode === 201) {
    yield put({ type: "DELETE_BANKING_ERROR", payload: response.data.message });

  }
  if (response) {
    refreshToken(response);
  }
}



function* handleDeleteBankTransaction(action) {
  try{
  const response = yield call(DeleteTransactionId, action.payload);

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

  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "DELETE_BANKING_TRANSACTION",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
      },
    });
    toast.success("Deleted successfully", {
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
  } else if (response.status === 201 || response.statusCode === 201) {
    yield put({ type: "DELETE_TRANS_ERROR", payload: response.data.message });

  }
  if (response) {
    refreshToken(response);
  }
   }
 catch (error) {
      if (error.code === 'ERR_NETWORK') {
         yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
      } else {
         yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
      }
   }
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

function* CreateBankingSaga() {
  yield takeEvery('ADD_BANKING', handleAddBanking)
  yield takeEvery('BANKINGLIST', handleGetBanking)
  yield takeEvery('DEFAULTACCOUNT', handleDefaultAccount)
  yield takeEvery('ADDBANKAMOUNT', handleAddBankAmount)
  yield takeEvery('EDITBANKTRANSACTION', handleEditBankTrans)
  yield takeEvery('DELETEBANKDETAILS', handleDeleteBanking)
  yield takeEvery('DELETEBANKTRANSACTIONS', handleDeleteBankTransaction)

}
export default CreateBankingSaga;