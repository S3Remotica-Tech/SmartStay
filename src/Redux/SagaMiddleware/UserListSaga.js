import { takeEvery, call, put } from "redux-saga/effects";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { checkOutUser, userlist, addUser, hostelList, roomsCount,hosteliddetail,userBillPaymentHistory,createFloor,roomFullCheck,deleteFloor,deleteRoom,deleteBed,CustomerDetails,amenitieshistory,amnitiesnameList,amenitieAddUser,beddetailsNumber} from "../Action/UserListAction"
import Cookies from 'universal-cookie';

function* handleuserlist(user) {
   const response = yield call(userlist,user.payload);
   
   console.log("response for user list",response)
   if (response.status === 200) {
      yield put({ type: 'USER_LIST', payload:{response: response.data.hostelData, statusCode:response.status} })
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
   if (response.status === 200) {
      yield put({ type: 'HOSTEL_LIST', payload:{ response: response.data.data, statusCode: response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

function* handleNumberOfRooms(ID) {
   const response = yield call(roomsCount, ID.payload)
  
console.log("response",response)

   if (response.status === 200) {
      yield put({ type: 'ROOM_COUNT',payload:{response: response.data.responseData ,statusCode:response.status}})
   }
   else if(response.status === 201){
      yield put({ type: 'NO_ROOMS', payload: {response:response.data.message,floor_Id:ID.payload.floor_Id, statusCode:response.status} })
   }
   if(response){
      refreshToken(response)
   }
}

function* handlehosteliddetail(data) {
   const response = yield call(hosteliddetail,data.payload);
  
   if (response.status === 200) {
      yield put({ type: 'HOSTEL_DETAIL_LIST', payload: response.data.data })

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

   if (response.status === 200) {
      yield put ({type:'BILL_PAYMENT_HISTORY',payload:response.data})
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
  
   if (response.status === 200) {
      yield put({ type: 'CREATE_FLOOR', payload: response.data })
      yield put({ type: 'UPDATE_MESSAGE_FLOOR', message: 'CREATED SUCCESSFULLY'})
      Swal.fire({
         icon: 'success',
         title: `${response.data.message}`,
                 timer:1000,
       })
   }
   else if(response.status === 202) {
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
 
   if (response.status === 200) {
      yield put({ type: 'ROOM_DETAILS', payload: response.data.responseData })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}



function* handleAddUser(datum) {
      const response = yield call(addUser, datum.payload);
      console.log("responsetytytyytyyy",response);
      if (response.statusCode === 200) {
         
         yield put({ type: 'ADD_USER',payload:{response: response.message, statusCode:response.statusCode}})
            console.log("datum.payload..?",datum.payload)
            Swal.fire({
               icon: 'success',
               title: `${response.message}`,
               confirmButtonText: 'Ok',
               timer:1000,
             })
    
      }

      else if(response.statusCode === 202) {
         Swal.fire({
            icon: 'warning',
           title: 'Error',
           html: `<span style="color: red">${datum.payload.Phone}</span> is already exist in the database`,
           
         });
      }
      else if(response.statusCode === 203) {
         Swal.fire({
           icon: 'warning',
           title: 'Error',
           html: `<span style="color: red">${datum.payload.Email}</span> is already exist in the database`,
         });
      }
      if(response){
         refreshToken(response)
      }
   }


   function* handleRoomCheck(action) {
      const response = yield call(roomFullCheck, action.payload)
     
      if (response.status === 200 && response.data.length > 0) {
         yield put({ type: 'ROOM_FULL', payload: response.data.data })
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
     
      if (response.status === 200) {
         yield put({ type: 'CHECKOUT_USER', payload:{response: response.data, statusCode:response.status} })
          Swal.fire({
            icon: 'success',
         text: 'User Check Out Successfully',
        timer: 2000,
        showConfirmButton: false,
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
      if(response.status === 200){
         yield put({ type: 'DELETE_FLOOR', payload:{message: response.data.message, statusCode:response.status} })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if(response){
         refreshToken(response)
      }
   }

function* handleDeleteRoom(roomDetails){
   const response = yield call(deleteRoom,roomDetails.payload)
   if(response.status === 200){
      yield put({ type: 'DELETE_ROOM', payload:{message: response.data.message, statusCode:response.status} })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if(response){
      refreshToken(response)
   }
}

// function* handleDeleteBed(bedDetails){
//    const response = yield call(deleteBed,bedDetails.payload)
//    if(response.status === 200){
//       yield put({ type: 'DELETE_BED', payload:{message: response.data.message, statusCode:response.status} })
//    }
//    else {
//       yield put({ type: 'ERROR', payload: response.data.message })
//    }
//    if(response){
//       refreshToken(response)
//    }
   
// }  


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
         if(response.status === 200){
            yield put({ type: 'CUSTOMER_DETAILS', payload: response.data,statusCode:response.status })
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
         
         if (response.status === 200){
            yield put ({type : 'AMNITIES_NAME' , payload:response.data})
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
         if(response.status === 200){
            yield put({ type: 'AMENITIES_HISTORY', payload: {response:response.data.data,statusCode:response.status }})
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
      if(response.status == 200){
         yield put({ type: 'ADD_USER_AMENITIES', payload: {message:response.data.message,statusCode:response.status} })
         Swal.fire({
            icon: "success",
            text: response.data.message,
          });
      }
      else if(response.status === 201){
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
      if(response.status === 200){
         yield put({ type: 'BED_NUMBER_DETAILS', payload: response.data,statusCode:response.status })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
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
}
export default UserListSaga;