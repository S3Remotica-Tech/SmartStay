import { takeEvery, call, put } from "redux-saga/effects";
import { AddBankingDetails,GetAddBanking,AddDefaultAccount } from "../Action/BankingAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleAddBanking(action) {
   const response = yield call (AddBankingDetails, action.payload);

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

   console.log("handleAddBanking",response)
   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'ADD_USER_BANKING' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
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
      yield put ({type:'ERROR_BOOKING', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleGetBanking() {
   const response = yield call(GetAddBanking)
   console.log("response.....///",response)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'BANKING_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}


function* handleDefaultAccount(action) {
   const response = yield call (AddDefaultAccount, action.payload);

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

   console.log("handleDefaultAccount",response)
   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'DEFAULT_ACCOUNT' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
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
      yield put ({type:'ERROR_BOOKING', payload:response.data.message})
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

function* CreateBankingSaga() {
   yield takeEvery('ADD_BANKING', handleAddBanking)
   yield takeEvery('BANKINGLIST', handleGetBanking)
   yield takeEvery('DEFAULTACCOUNT', handleDefaultAccount)
   
}
export default CreateBankingSaga;