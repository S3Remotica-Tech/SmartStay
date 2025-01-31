import { takeEvery, call, put } from "redux-saga/effects";
import {GetExpenseCatogory,AddExpense, GetExpense, DeleteExpense,transactionHistory, AddExpenseTag} from "../Action/ExpensesAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';


function* handleGetCategory() {
   const response = yield call (GetExpenseCatogory);
   if (response.status === 200 || response.statusCode === 200 ){
      yield put ({type : 'CATEGORY_LIST' , payload:{response:response.data.data, statusCode:response.status || response.statusCode}})


   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleGetExpenses(action) {
    const response = yield call (GetExpense, action.payload);
    if (response.status === 200 || response.statusCode === 200){
       yield put ({type : 'EXPENSES_LIST' , payload:{response:response.data.data,  statusCode:response.status || response.statusCode}})
     }
    else if (response.status === 201){
       yield put ({type:'NOEXPENSEDATA', payload: {statusCode:response.status}})
    }
    if(response){
       refreshToken(response)
    }
 }
function* handleAddExpense(action) {
    const response = yield call (AddExpense, action.payload);
console.log("handleAddExpense",response)
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

    if (response.status === 200 || response.statusCode === 200){
       yield put ({type : 'ADD_EXPENSE' , payload:{response:response.data.data, statusCode:response.status || response.statusCode}})
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
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response){
       refreshToken(response)
    }
 }


 function* handleAddExpenseTag(action) {
   const response = yield call (AddExpenseTag, action.payload);

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

   if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'ADD_EXPENSE_TAG' , payload:{response:response.data.data, statusCode:response.status || response.statusCode}})
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
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

 function* handleDeleteExpense(action) {
    const response = yield call ( DeleteExpense, action.payload);
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

    if (response.status === 200 || response.statusCode === 200){
       yield put ({type : 'DELETE_EXPENSE' , payload:{response:response.data.data, statusCode:response.status || response.statusCode}})
     
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
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response){
       refreshToken(response)
    }
 }

function refreshToken(response){
if(response.data && response.data.refresh_token){
   const refreshTokenGet = response.data.refresh_token
   const cookies = new Cookies()
   cookies.set('token', refreshTokenGet, { path: '/' });
}else if (response.status === 206) {
   const message = response.status
   const cookies = new Cookies()
   cookies.set('access-denied', message, { path: '/' });
  
}

}


function* HandleTransactionHistory(action) {
   const response = yield call(transactionHistory, action.payload)
  
   if (response.status === 200 || response.statusCode === 200) {
      
     yield put({ type: 'TRANSACTION_HISTORY', payload: { response: response.data.data, statusCode: response.status || response.statusCode} })
 
   }
   else {
     yield put({ type: 'ERROR', payload: response.data.message })
   }
   refreshToken(response)
 }


function* ExpenseSaga() {
    yield takeEvery('CATEGORYLIST', handleGetCategory)
    yield takeEvery('ADDEXPENSE', handleAddExpense)
    yield takeEvery('EXPENSELIST', handleGetExpenses)
    yield takeEvery('DELETEEXPENSE', handleDeleteExpense)
    yield takeEvery('TRANSACTIONHISTORY', HandleTransactionHistory)
    yield takeEvery('ADDEXPENSETAG', handleAddExpenseTag)
  }
export default ExpenseSaga;