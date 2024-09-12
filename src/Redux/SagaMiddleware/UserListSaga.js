import { takeEvery, call, put } from "redux-saga/effects";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {KYCValidateOtpVerify, KYCValidate, checkOutUser, userlist, addUser, hostelList, roomsCount,hosteliddetail,userBillPaymentHistory,createFloor,roomFullCheck,deleteFloor,deleteRoom,deleteBed,CustomerDetails,amenitieshistory,amnitiesnameList,amenitieAddUser,beddetailsNumber,countrylist} from "../Action/UserListAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* handleuserlist(user) {
   const response = yield call(userlist,user.payload);
   
   console.log("response for user list",response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'USER_LIST', payload:{response: response.data.hostelData, statusCode:response.status || response.statusCode} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}
function* handleHostelList(hostel) {
   const response = yield call(hostelList,hostel.payload)
   
   console.log("response hostel list", response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'HOSTEL_LIST', payload:{ response: response.data.data, statusCode: response.status || response.statusCode} })
   }
   else if(response.status === 201 || response.statusCode === 201){
      yield put({ type: 'NO_HOSTEL',  payload:{  statusCode: response.status || response.statusCode} })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleNumberOfRooms(ID) {
   const response = yield call(roomsCount, ID.payload)
  
console.log("response",response)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROOM_COUNT',payload:{response: response.data.responseData ,statusCode:response.status || response.statusCode }})
   }
   else if(response.status === 201){
      yield put({ type: 'NO_ROOMS', payload: {response:response.data.message,floor_Id:ID.payload.floor_Id, statusCode:response.status || response.statusCode} })
   }
   if(response){
      refreshToken(response)
   }
}

function* handlehosteliddetail(data) {
   const response = yield call(hosteliddetail,data.payload);
  console.log("response....Floor",response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'HOSTEL_DETAIL_LIST', payload: response.data.hostel_data ,statusCode:response.status || response.statusCode })

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}
function* handleUserBillPaymentHistory(){
   const response = yield call(userBillPaymentHistory)

   if (response.status === 200 || response.statusCode === 200) {
      yield put ({type:'BILL_PAYMENT_HISTORY',payload:response.data,statusCode:response.status || response.statusCode})
   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}

function* handleCreateFloor(data) {
   const response = yield call(createFloor,data.payload);
  console.log("response floor", response)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'CREATE_FLOOR', payload: {response:response.data, statusCode:response.status || response.statusCode} })
      // yield put({ type: 'UPDATE_MESSAGE_FLOOR', message: 'CREATED SUCCESSFULLY'})
      Swal.fire({
         icon: 'success',
         title: `${response.data.message}`,
               //   timer:1000,
               //   showConfirmButton: false,
       })
   }
   else if(response.status === 202 || response.statusCode === 202) {
      Swal.fire({
         icon: 'warning',
        title: 'Error',
        html: `<span style="color: red">${response.data.message }</span> `,
        
      });
      yield put({ type: 'ERROR', payload: response.data.message })

   }
   if(response){
      refreshToken(response)
   }
}

function* handleRoomsDetails(ID) {
   const response = yield call(roomsCount, ID.payload)
 
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROOM_DETAILS', payload: response.data.responseData,statusCode:response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}



// function* handleAddUser(datum) {
//    try {
//      const response = yield call(addUser, datum.payload);
//      console.log("Response:", response);
 
//      // Define toastStyle within the try block to ensure it is accessible where needed
//      const toastStyle = {
//        position: 'fixed',
//        display: 'flex',
//        alignItems: 'center',
//        justifyContent: 'center',
//        top: '50%',
//        left: '50%',
//        transform: 'translate(-50%, -50%)',
//        zIndex: 9999, // Ensures it appears above other elements
//        backgroundColor: 'green', // Background color red
//        color: 'white', // Text color white
//      };
 
//      if (response.statusCode === 200 || response.status === 200) {
//        yield put({
//          type: 'ADD_USER',
//          payload: { response: response.message, statusCode: response.statusCode || response.status },
//        });
//        console.log("datum.payload..?", datum.payload);
 
//        toast.success(response.message, {
//          position: "top-right",
//          autoClose: 5000, // Duration in milliseconds
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//          style: toastStyle, // Applying the defined style
//        });
 
//      } else if (response.statusCode === 202) {
//        toast.warn(`Phone number ${datum.payload.Phone} already exists in the database`, {
//          position: "top-right",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//          style: toastStyle, // Applying the defined style
//        });
 
//      } else if (response.statusCode === 203) {
//        toast.warn(`Email ${datum.payload.Email} already exists in the database`, {
//          position: "top-right",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//          style: toastStyle, // Applying the defined style
//        });
//      }
 
//      // Handle token refresh if needed
//      if (response) {
//        refreshToken(response);
//      }
 
//    } catch (error) {
//      console.error("Error adding user:", error);
//      toast.error("An error occurred while adding the user.", {
//        position: "top-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        style: {
//          position: 'fixed',
//          display: 'flex',
//          alignItems: 'center',
//          justifyContent: 'center',
//          top: '50%',
//          left: '50%',
//          transform: 'translate(-50%, -50%)',
//          zIndex: 9999, // Ensures it appears above other elements
//          backgroundColor: 'red', // Background color red
//          color: 'white', // Text color white
//        },
//      });
//    }
//  }




// function* handleAddUser(datum) {
//    try {
//      const response = yield call(addUser, datum.payload);
//      console.log("Response:", response);
 
//      if (response.statusCode === 200 || response.status === 200) {
//        yield put({
//          type: 'ADD_USER',
//          payload: { response: response.message, statusCode: response.statusCode || response.status },
//        });
//        console.log("datum.payload..?", datum.payload);
 
//        toast.success(response.message, {
//          position: "top-right",
//          autoClose: 5000, // You can set your desired duration
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//        });
 
//      } else if (response.statusCode === 202) {
//        toast.warn(`Phone number ${datum.payload.Phone} is already exist in the database`, {
//          position: "top-right",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//        });
 
//      } else if (response.statusCode === 203) {
//        toast.warn(`Email ${datum.payload.Email} is already exist in the database`, {
//          position: "top-right",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//        });
//      }
 
//      // Handle token refresh if needed
//      if (response) {
//        refreshToken(response);
//      }
 
//    } catch (error) {
//      console.error("Error adding user:", error);
//      toast.error("An error occurred while adding the user.", {
//        position: "top-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//      });
//    }
//  }

function* handleAddUser(datum) {
      const response = yield call(addUser, datum.payload);
      console.log("responsetytytyytyyy",response);
     
    if (response.statusCode === 200 || response.status === 200) {
      yield put({
        type: 'ADD_USER',
        payload: { response: response.message, statusCode: response.statusCode || response.status },
      });
      console.log("datum.payload..?", datum.payload);

      // Define the style
      const toastStyle = {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999, // To ensure it appears above other elements
        backgroundColor: 'green', // Background color
        color: 'white', // Text color
      };

      // Use the toast with the defined style
      toast.success(response.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
      })}
      else if(response.statusCode === 202) {
         // Swal.fire({
         //    icon: 'warning',
         //   title: 'Error',
         //   html: `<span style="color: red">${datum.payload.Phone}</span> is already exist in the database`,
           
         // });
         yield put({ type: 'PHONE_ERROR', payload: response.message });
      }
      else if(response.statusCode === 203) {
         // Swal.fire({
         //   icon: 'warning',
         //   title: 'Error',
         //   html: `<span style="color: red">${datum.payload.Email}</span> is already exist in the database`,
         // });
         yield put({ type: 'EMAIL_ERROR', payload: response.message });
      }


      if(response){
         refreshToken(response)
      }
   }


   function* handleRoomCheck(action) {
      const response = yield call(roomFullCheck, action.payload)
     
      if (response.status === 200 || response.statusCode === 200 && response.data.length > 0) {
         yield put({ type: 'ROOM_FULL', payload: response.data.data,statusCode:response.status || response.statusCode })
            }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
   }
   

   function* handleCheckOut(action) {
      const response = yield call(checkOutUser, action.payload)
     
      if (response.status === 200 || response.statusCode === 200) {
         yield put({ type: 'CHECKOUT_USER', payload:{response: response.data, statusCode:response.status || response.statusCode} })
          Swal.fire({
            icon: 'success',
         text: 'User Check Out Successfully',
      //   timer: 2000,
      //   showConfirmButton: false,
      });

      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
   }

   function* handleDeleteFloor(hosteID){
      const response = yield call(deleteFloor,hosteID.payload)
      console.log("response",response);
      if(response.status === 200 || response.statusCode === 200){
         yield put({ type: 'DELETE_FLOOR', payload:{message: response.data.message, statusCode:response.status || response.statusCode} })
    
         Swal.fire({
            icon: 'success',
         text: 'Floor Delete Successfully',
      //   timer: 2000,
      //   showConfirmButton: false,
      });
     
     
      }
      else if(response.status === 201 || response.statusCode === 201){
         Swal.fire({
            icon: 'warning',
         text: 'Please delete rooms before deleting the floor',
      //   timer: 2000,
      //   showConfirmButton: false,
      });
      }
      if(response){
         refreshToken(response)
      }
   }

function* handleDeleteRoom(roomDetails){
   const response = yield call(deleteRoom,roomDetails.payload)
   if(response.status === 200 || response.statusCode === 200){
      yield put({ type: 'DELETE_ROOM', payload:{message: response.data.message, statusCode:response.status || response.statusCode} })
      Swal.fire({
         icon: 'success',
      text: 'Room Delete Successfully',
     });
 
 
 
   }
   else  if(response.status === 201 || response.statusCode === 201) {
      Swal.fire({
         icon: 'warning',
      text: `Please delete the bed before deleting the room`,
     });
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


      function* handlecustomerdetails(userDetails){
         const response = yield call(CustomerDetails,userDetails.payload)
         console.log("response...?",response)
         if(response.status === 200 || response.statusCode === 200){
            yield put({ type: 'CUSTOMER_DETAILS', payload: response.data,statusCode:response.status || response.statusCode })
         }
         else {
            yield put({ type: 'ERROR', payload: response.data.message })
         }
         if(response){
            refreshToken(response)
         }
         
      }
      
      function* handleAmnitiesName (){
         const response = yield call (amnitiesnameList);
         
         if (response.status === 200 || response.statusCode === 200){
            yield put ({type : 'AMNITIES_NAME' , payload:response.data,statusCode:response.status || response.statusCode})
         }
         else {
            yield put ({type:'ERROR', payload:response.data.message})
         }
         if(response){
           refreshToken(response)
        }
     }
      function* handleamenityhistory(amnityDetails){
         const response = yield call(amenitieshistory,amnityDetails.payload)
         console.log("response...?12",response)
         if(response.status === 200 || response.statusCode === 200){
            yield put({ type: 'AMENITIES_HISTORY', payload: {response:response.data.data,statusCode:response.status || response.statusCode }})
         }
         else {
            yield put({ type: 'ERROR', payload: response.data.message })
         }
         if(response){
            refreshToken(response)
         }
         
      } 
     

     function* handleuserAddAmnitiesName(amnity){
      console.log("aminity add aminityuser",amnity);
      const response = yield call(amenitieAddUser,amnity.payload)
      console.log("response...?",response)
      if(response.status == 200 || response.statusCode === 200){
         yield put({ type: 'ADD_USER_AMENITIES', payload: {message:response.data.message,statusCode:response.status || response.statusCode} })
         Swal.fire({
            icon: "success",
            text: response.data.message,
          });
      }
      else if(response.status === 201 || response.statusCode === 201){
         Swal.fire({
          text:response.data.message,
            icon: "warning",
            
        });
      }   
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
      
   } 

   function* handlebedNumberDetails(bedDetails){
      const response = yield call(beddetailsNumber,bedDetails.payload)
      console.log("response...?",response)
      if(response.status === 200 || response.statusCode === 200){
         yield put({ type: 'BED_NUMBER_DETAILS', payload: response.data,statusCode:response.status || response.statusCode })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
      
   }
  


   function* handleKYCValidate(action){
      const response = yield call(KYCValidate,action.payload)
      console.log("response...?",response)
      if(response.status === 200 || response.statusCode === 200){
         yield put({ type: 'KYC_VALIDATE', payload: {response:response.data.result.ref_id,statusCode:response.status || response.statusCode }})
         Swal.fire({
            icon: "success",
            text: response.data.result.message,
          });
     
      }
      else if (response.status === 201){
      
         Swal.fire({
            icon: "warning",
            text: "Enter valid Aadhaar No.",
          });

      }


      if(response){
         refreshToken(response)
      }
      
   }
     

   function* handleKYCValidateOtpVerify(action){
      const response = yield call(KYCValidateOtpVerify,action.payload)
      console.log("response...?",response)
      if(response.status === 200 ||response.statusCode === 200){
         yield put({ type: 'KYC_VALIDATE_OTP_VERIFY', payload: {response:response.data,statusCode:response.status || response.statusCode }})
             Swal.fire({
            icon: "success",
            text: response.data.message,
          });
             }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
      
   }





   function* handleCountrylist (){
      const response = yield call (countrylist);
      
      if (response.status === 200 || response.statusCode === 200){
         yield put ({type : 'COUNTRY_LIST' , payload:response.data,statusCode:response.status || response.statusCode})
      }
      else {
         yield put ({type:'ERROR', payload:response.data.message})
      }
      if(response){
        refreshToken(response)
     }
  }











function* UserListSaga() {
   yield takeEvery('USERLIST', handleuserlist)
   yield takeEvery('ADDUSER', handleAddUser)
   yield takeEvery('HOSTELLIST', handleHostelList)
   yield takeEvery('ROOMCOUNT', handleNumberOfRooms)
   yield takeEvery('HOSTELDETAILLIST', handlehosteliddetail)
   yield takeEvery('BILLPAYMENTHISTORY',handleUserBillPaymentHistory)
   yield takeEvery('CREATEFLOOR',handleCreateFloor)
   yield takeEvery('ROOMDETAILS',handleRoomsDetails)
   yield takeEvery('ROOMFULL', handleRoomCheck)
   yield takeEvery('CHECKOUTUSER',handleCheckOut)
   yield takeEvery('DELETEFLOOR',handleDeleteFloor)
   yield takeEvery('DELETEROOM',handleDeleteRoom)
   // yield takeEvery('DELETEBED',handleDeleteBed) 
   yield takeEvery('CUSTOMERDETAILS',handlecustomerdetails)    
   yield takeEvery('AMENITESHISTORY',handleamenityhistory) 
   yield takeEvery('AMENITESNAMES',handleAmnitiesName) 
   yield takeEvery('AddUserAmnities',handleuserAddAmnitiesName)
   yield takeEvery('BEDNUMBERDETAILS',handlebedNumberDetails) 
   yield takeEvery('KYCVALIDATE',handleKYCValidate) 
   yield takeEvery('KYCVALIDATEOTPVERIFY',handleKYCValidateOtpVerify) 
   yield takeEvery('COUNTRYLIST',handleCountrylist)

}
export default UserListSaga;