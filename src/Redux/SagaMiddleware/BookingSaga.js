import { takeEvery, call, put } from "redux-saga/effects";
import { AddBooking,GetAddBooking,DeleteBooking,assignBooking,assignBookingBed } from "../Action/BookingAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleAddBooking(action) {
    const response = yield call (AddBooking, action.payload);

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

    console.log("responseinggggg",response)
    if (response.status === 200 || response.statusCode === 200){
      yield put ({type : 'ADD_USER_BOOKING' , payload:{response:response.data, statusCode:response.status ||  response.statusCode}})
      toast.success(`${response.message}`, {
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

    else if(response.statusCode === 202 ) {
      yield put({ type: 'BOOKING_EMAIL_ERROR', payload: response.message });
   }

    else if(response.statusCode === 203 )  {   
      yield put({ type: 'BOOKING_PHONE_ERROR', payload: response.message });
   }
  
    else {
       yield put ({type:'ERROR_BOOKING', payload:response.message})
    }
    if(response){
       refreshToken(response)
    }
 }




 function* handleGetBooking(action) {
   const response = yield call(GetAddBooking, action.payload)
   console.log("response.....///",response)
   
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'BOOKING_LIST', payload:{response: response.data, statusCode:response.status || response.statusCode}})
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}




function* handleDeleteBooking(action) {
   const response = yield call(DeleteBooking, action.payload);
   console.log("response delete BOOKING", response);
 
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
       type: "DELETE_BOOKING",
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
     yield put({ type: "DELETE_BOOKING_ERROR", payload: response.data.message });
    
   }
   if (response) {
     refreshToken(response);
   }
 }



 function* handleAsignBooking(action) {
   console.log("dataaa");
   
   const response = yield call (assignBooking, action.payload);
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

   console.log("responseinggggg",response)
   if (response.data.status === 200 || response.data.statusCode === 200){
      yield put ({type : 'ASSIGN_USER_BOOKING' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
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
      yield put ({type:'ERROR_ASSIGN_BOOKING', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleBookingBed(userDetails){
   const response = yield call(assignBookingBed,userDetails.payload)
   console.log("response...?",response)
   if(response.status === 200 || response.statusCode === 200){
      yield put({ type: 'BOOKING_BED_DETAILS', payload: response.data,statusCode:response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
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

 function* CreateBookinSaga() {
    yield takeEvery('ADD_BOOKING', handleAddBooking)
    yield takeEvery('GET_BOOKING_LIST', handleGetBooking)
    yield takeEvery('DELETE_BOOKING_CUSTOMER', handleDeleteBooking)
    yield takeEvery('ASSIGN_BOOKING', handleAsignBooking)
    yield takeEvery('BOOKINGBEDDETAILS', handleBookingBed)
 }
 export default CreateBookinSaga;