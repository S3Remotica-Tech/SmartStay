import { takeEvery, call, put } from "redux-saga/effects";
import {GetExpenseCatogory,AddExpense, GetExpense, DeleteExpense} from "../Action/ExpensesAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';




function* handleGetCategory() {
   const response = yield call (GetExpenseCatogory);
   console.log("response for get",response)
   if (response.status === 200){
      yield put ({type : 'CATEGORY_LIST' , payload:{response:response.data.data, statusCode:response.status}})


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
    console.log("response for getExpense",response.status)
    if (response.status === 200){
       yield put ({type : 'EXPENSES_LIST' , payload:{response:response.data.data,  statusCode:response.status}})
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
    console.log("response",response)
    if (response.status === 200){
       yield put ({type : 'ADD_EXPENSE' , payload:{response:response.data.data, statusCode:response.status}})
       Swal.fire({
        text: `${response.data.message}`,
        icon: "success",
        timer: 1000,
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
    console.log("response",response)
    if (response.status === 200){
       yield put ({type : 'DELETE_EXPENSE' , payload:{response:response.data.data, statusCode:response.status}})
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
   console.log("refreshTokenGet",refreshTokenGet)
   const cookies = new Cookies()
   cookies.set('token', refreshTokenGet, { path: '/' });
}else if (response.status === 206) {
   const message = response.status
   const cookies = new Cookies()
   cookies.set('access-denied', message, { path: '/' });
  
}

}





function* ExpenseSaga() {
    yield takeEvery('CATEGORYLIST', handleGetCategory)
    yield takeEvery('ADDEXPENSE', handleAddExpense)
    yield takeEvery('EXPENSELIST', handleGetExpenses)
    yield takeEvery('DELETEEXPENSE', handleDeleteExpense)
   
  }
export default ExpenseSaga;