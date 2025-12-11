import { takeEvery, call, put } from "redux-saga/effects";
import { GetInitializeExpense, GetExpenseCatogory, AddExpense, GetExpense, DeleteExpense, transactionHistory, AddExpenseTag } from "../Action/ExpensesAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { GlobalHostelId } from "../../Utils/GlobalResponse";

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



function* handleGetCategory() {
   try {
      const response = yield call(GetExpenseCatogory);
      if (response?.status === 200) {
         yield put({ type: 'CATEGORY_LIST', payload: { response: response.data.data, statusCode: response?.status } })


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

function* handleGetExpenses(action) {
   try {
      const response = yield call(GetExpense, action.payload);
       const hostelId = GlobalHostelId(response);
    if (hostelId) {
      yield put({ type: "STORE_HOSTEL_DATA", payload: hostelId });
      const cookies = new Cookies()
      cookies.set('selected_hostelId', hostelId, { path: '/' });
    }
      

      if (response?.status === 200) {
         yield put({ type: 'EXPENSES_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'NOEXPENSEDATA', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleGetInitializeExpense(action) {
   try {
      const response = yield call(GetInitializeExpense, action.payload);

       const hostelId = GlobalHostelId(response);
          if (hostelId) {
            yield put({ type: "STORE_HOSTEL_DATA", payload: hostelId });
            const cookies = new Cookies()
            cookies.set('selected_hostelId', hostelId, { path: '/' });
          }


      if (response?.status === 200) {
         yield put({ type: 'INITIALIZE_EXPENSES_LIST', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}






function* handleAddExpense(action) {
   try {
      const response = yield call(AddExpense, action.payload);

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
         yield put({ type: 'ADD_EXPENSE', payload: { response: response.data.data, statusCode: response?.status } })
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
         if (error.status === 400 || error.status === 403) {
            yield put({ type: 'BANK_INSUFFICIANT_FUND_ERROR', payload: error.response.data });

         }
      }
   }
   
}






function* handleAddExpenseTag(action) {
   try {
      const response = yield call(AddExpenseTag, action.payload);

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

      if (response?.status === 200) {
         yield put({ type: 'ADD_EXPENSE_TAG', payload: { response: response.data.data, statusCode: response?.status } })
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
      else if (response?.status === 201) {
         yield put({ type: 'EXPENCE_NETBANKIG', payload: response?.data?.message })
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

function* handleDeleteExpense(action) {
   try {
      const response = yield call(DeleteExpense, action.payload);
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

      if (response?.status === 200) {
         yield put({ type: 'DELETE_EXPENSE', payload: { response: response.data.data, statusCode: response?.status } })

         toast.success('Deleted successfully', {
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


function* HandleTransactionHistory(action) {
   try {
      const response = yield call(transactionHistory, action.payload)
      if (response?.status === 200) {
         yield put({ type: 'TRANSACTION_HISTORY', payload: { response: response.data.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      refreshToken(response)
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* ExpenseSaga() {
   yield takeEvery('CATEGORYLIST', handleGetCategory)
   yield takeEvery('ADDEXPENSE', handleAddExpense)
   yield takeEvery('EXPENSELIST', handleGetExpenses)
   yield takeEvery('DELETEEXPENSE', handleDeleteExpense)
   yield takeEvery('TRANSACTIONHISTORY', HandleTransactionHistory)
   yield takeEvery('ADDEXPENSETAG', handleAddExpenseTag)
   yield takeEvery('INITIALIZEEXPENSESLIST', handleGetInitializeExpense)

}
export default ExpenseSaga;