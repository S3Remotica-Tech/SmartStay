import { takeEvery, call, put } from "redux-saga/effects";
import { AddBankingDetails, GetAddBanking, AddDefaultAccount, AddBankAmount, editBankTrans, DeleteBanking, DeleteTransactionId , EditBankingDetails } from "../Action/BankingAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';


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
      // toast.error("Network error occurred", {
      //    style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
      //    position: "top-right",
      //    autoClose: 2000,
      //    hideProgressBar: true,
      //    closeButton: false,
      //    closeOnClick: true,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      // });
   }
   else if (error.code === "ERR_NETWORK") {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      // toast.error("Network error occurred", {
      //    style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
      //    position: "top-right",
      //    autoClose: 2000,
      //    hideProgressBar: true,
      //    closeButton: false,
      //    closeOnClick: true,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      // });
   }
   // else {
   //    const msg = error?.message || "Something went wrong";
   //    yield put({ type: "NETWORK_ERROR", payload: msg });
   //    toast.error(msg, {
   //       style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
   //       position: "top-right",
   //       autoClose: 2000,
   //       hideProgressBar: true,
   //       closeButton: false,
   //       closeOnClick: true,
   //       pauseOnHover: true,
   //       draggable: true,
   //       progress: undefined,
   //    });
   // }
}

function* handleAddBanking(action) {
  try {
      const {hostelId , data} = action.payload
    const response = yield call(AddBankingDetails, hostelId , data);

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

    if (response?.status === 201 ) {
      yield put({ type: 'ADD_USER_BANKING', payload: { response: response.data, statusCode: response?.status } })
      toast.success(`${response.data}`, {
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
           if (error.status === 400) {
             yield put({ type: 'CREATE_BANKING_ERROR', payload: error.response.data });
           }
         }
   }
}

function* handleEditBanking(action) {
  try {
      const {hostelId , bankId , data} = action.payload
    const response = yield call(EditBankingDetails, hostelId,bankId,data);

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

    if (response?.status === 200 ) {
      yield put({ type: 'EDITBANKING', payload: { response: response.data, statusCode:response?.status  } })
      toast.success(`${response.data}`, {
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
      yield put({ type: 'ERROR_ADDBANKING', payload:  response?.data?.message })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
      yield* handleApiError(error);
     
   }
}

function* handleGetBanking(action) {
  try{

  
  const response = yield call(GetAddBanking, action.payload)

  
  if (response?.status === 200 ) {
    yield put({ type: 'BANKING_LIST', payload: { response: response.data || [], statusCode:response?.status} })
  }

  else if (response?.status === 201 ) {
    yield put({ type: 'NO_BANKING', payload: { statusCode: response?.status } })
  }
  else {
    yield put({ type: 'ERROR', payload:  response?.data?.message })
  }
  if (response) {
    refreshToken(response)
  }
}
catch(error){
    yield* handleApiError(error);
}
}


function* handleDefaultAccount(action) {
  try{

  
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

  if (response?.status === 200 ) {
    yield put({ type: 'DEFAULT_ACCOUNT', payload: { response: response.data, statusCode: response?.status } })
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

  // else {
  //   yield put({ type: 'ERROR_BOOKING', payload:  response?.data?.message })
  // }
  if (response) {
    refreshToken(response)
  }
}
catch(error){
  yield* handleApiError(error);
}
}



function* handleAddBankAmount(action) {
  try{
    const {hostelId , data} = action.payload
    const response = yield call(AddBankAmount, hostelId , data);

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

  if (response?.status === 200 ) {
    yield put({ type: 'ADD_BANK_AMOUNT', payload: { response: response.data, statusCode: response?.status } })
    toast.success(`${response.data}`, {
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
    yield put({ type: 'ERROR_ADD_AMOUNT', payload:  response?.data?.message })
  }
  if (response) {
    refreshToken(response)
  }
   }
 catch (error) {
   yield* handleApiError(error);
      
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

  if (response?.status === 200 ) {
    yield put({ type: 'EDIT_BANK_TRANSACTION', payload: { response: response.data, statusCode: response?.status } })
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
    yield put({ type: 'ERROR', payload:  response?.data?.message })
  }
  if (response) {
    refreshToken(response)
  }
 }
 catch (error) {
   yield* handleApiError(error);
      
    }
}


function* handleDeleteBanking(action) {
  try{


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

  if (response?.status === 200) {
    yield put({
      type: "DELETE_BANKING",
      payload: {
        response: response.data,
        statusCode: response?.status ,
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
  } else if (response?.status === 201 ) {
    yield put({ type: "DELETE_BANKING_ERROR", payload:  response?.data?.message });

  }
  if (response) {
    refreshToken(response);
  }
}
catch(error){
   yield* handleApiError(error);
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

  if (response?.status === 200) {
    yield put({
      type: "DELETE_BANKING_TRANSACTION",
      payload: {
        response: response.data,
        statusCode: response?.status ,
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
  } else if (response?.status === 201 ) {
    yield put({ type: "DELETE_TRANS_ERROR", payload:  response?.data?.message });

  }
  if (response) {
    refreshToken(response);
  }
   }
 catch (error) {
   yield* handleApiError(error);
     
   }
}

function refreshToken(response) {
  if (response.data && response.data.refresh_token) {
    const refreshTokenGet = response.data.refresh_token
    const cookies = new Cookies()
    cookies.set('token', refreshTokenGet, { path: '/' });
  } else if (response?.status === 206) {
    const message = response?.status
    const cookies = new Cookies()
    cookies.set('access-denied', message, { path: '/' });
  }

}

function* CreateBankingSaga() {
  yield takeEvery('ADD_BANKING', handleAddBanking)
  yield takeEvery('EDIT_BANKING', handleEditBanking)
  yield takeEvery('BANKINGLIST', handleGetBanking)
  yield takeEvery('DEFAULTACCOUNT', handleDefaultAccount)
  yield takeEvery('ADDBANKAMOUNT', handleAddBankAmount)
  yield takeEvery('EDITBANKTRANSACTION', handleEditBankTrans)
  yield takeEvery('DELETEBANKDETAILS', handleDeleteBanking)
  yield takeEvery('DELETEBANKTRANSACTIONS', handleDeleteBankTransaction)

}
export default CreateBankingSaga;