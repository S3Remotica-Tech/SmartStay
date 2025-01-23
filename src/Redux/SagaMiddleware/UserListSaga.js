import { takeEvery, call, put } from "redux-saga/effects";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AvailableCheckOutCustomer, DeleteCheckOutCustomer, AddCheckOutCustomer, getCheckOutCustomer, AddWalkInCustomer, DeleteWalkInCustomer, getWalkInCustomer, KYCValidateOtpVerify, KYCValidate, checkOutUser, userlist, addUser, hostelList, roomsCount, hosteliddetail, userBillPaymentHistory, createFloor, roomFullCheck, deleteFloor, deleteRoom, deleteBed, CustomerDetails, amenitieshistory, amnitiesnameList, amenitieAddUser, beddetailsNumber, countrylist, exportDetails, GetConfirmCheckOut, AddConfirmCheckOut,customerReAssignBed,customerAddContact,customerAllContact,deleteContact,generateAdvance,uploadDocument } from "../Action/UserListAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RepeatOneSharp } from "@mui/icons-material";

function* handleuserlist(user) {
   const response = yield call(userlist, user.payload);

   if (response.status === 200 ) {
      yield put({ type: 'USER_LIST', payload: { response: response.data.hostelData, statusCode: response.status} })
   }

   else if (response.status === 201 || response.statusCode === 201){
      yield put({ type: 'NO_USER_LIST', payload: { response: response.data.hostelData, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleHostelList(hostel) {
   const response = yield call(hostelList, hostel.payload)
   console.log("handleHostelList",response)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'HOSTEL_LIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'NO_HOSTEL', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleAllHostelList(action) {
   const response = yield call(hostelList, action.payload)
   console.log("handleAllHostelList",response)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'HOSTEL_LIST_All', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'NO_HOSTEL_DETAILS', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleNumberOfRooms(ID) {
   const response = yield call(roomsCount, ID.payload)


   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROOM_COUNT', payload: { response: response.data.responseData, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201) {
      yield put({ type: 'NO_ROOMS', payload: { response: response.data.message, floor_Id: ID.payload.floor_Id, statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handlehosteliddetail(data) {
   const response = yield call(hosteliddetail, data.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'HOSTEL_DETAIL_LIST', payload: response.data.hostel_data, statusCode: response.status || response.statusCode })

   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleUserBillPaymentHistory() {
   const response = yield call(userBillPaymentHistory)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'BILL_PAYMENT_HISTORY', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleCreateFloor(data) {
   const response = yield call(createFloor, data.payload);

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
      yield put({ type: 'CREATE_FLOOR', payload: { response: response.data, statusCode: response.status || response.statusCode } })

      toast.success('Created successfully!', {
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
   else if (response.status === 202 || response.statusCode === 202) {
      // Swal.fire({
      //    icon: 'warning',
      //   title: 'Error',
      //   html: `<span style="color: red">${response.data.message }</span> `,

      // });
      yield put({ type: 'ALREADY_FLOOR_ERROR', payload: response.data.message })

   }
   if (response) {
      refreshToken(response)
   }
}

function* handleRoomsDetails(ID) {
   const response = yield call(roomsCount, ID.payload)


   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ROOM_DETAILS', payload: response.data.responseData, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}



// function* handleAddUser(datum) {
//    try {
//      const response = yield call(addUser, datum.payload);

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

//      if (response.statusCode === 200 || response.status === 200) {
//        yield put({
//          type: 'ADD_USER',
//          payload: { response: response.message, statusCode: response.statusCode || response.status },
//        });

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({
         type: 'ADD_USER',
         payload: { response: response.message, statusCode: response.statusCode || response.status },
      });

      // Define the style
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

      toast.success(response.message, {
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
   else if (response.statusCode === 202) {

      yield put({ type: 'PHONE_ERROR', payload: response.message });
   }
   else if (response.statusCode === 203) {

      yield put({ type: 'EMAIL_ERROR', payload: response.message });
   }


   if (response) {
      refreshToken(response)
   }
}


function* handleRoomCheck(action) {
   const response = yield call(roomFullCheck, action.payload)

   if (response.status === 200 || response.statusCode === 200 && response.data.length > 0) {
      yield put({ type: 'ROOM_FULL', payload: response.data.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleCheckOut(action) {
   const response = yield call(checkOutUser, action.payload)

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'CHECKOUT_USER', payload: { response: response.data, statusCode: response.status || response.statusCode } })
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
   if (response) {
      refreshToken(response)
   }
}

function* handleDeleteFloor(hosteID) {
   const response = yield call(deleteFloor, hosteID.payload)

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
      yield put({ type: 'DELETE_FLOOR', payload: { message: response.data.message, statusCode: response.status || response.statusCode } })

      toast.success('Deleted successfully!', {
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
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'DELETE_FLOOR_ERROR', payload: response.data.message })
      //    Swal.fire({
      //       icon: 'warning',
      //    text: 'Please delete rooms before deleting the floor',
      // //   timer: 2000,
      // //   showConfirmButton: false,
      // });
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleDeleteRoom(roomDetails) {
   const response = yield call(deleteRoom, roomDetails.payload)


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
      yield put({ type: 'DELETE_ROOM', payload: { message: response.data.message, statusCode: response.status || response.statusCode } })
      toast.success('Deleted successfully!', {
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
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'DELETE_ROOM_ERROR', payload: response.data.message })
      //    Swal.fire({
      //       icon: 'warning',
      //    text: `Please delete the bed before deleting the room`,
      //   });
   }
   if (response) {
      refreshToken(response)
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


function* handlecustomerdetails(userDetails) {
   const response = yield call(CustomerDetails, userDetails.payload)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'CUSTOMER_DETAILS', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleAmnitiesName() {
   const response = yield call(amnitiesnameList);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMNITIES_NAME', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleamenityhistory(amnityDetails) {
   const response = yield call(amenitieshistory, amnityDetails.payload)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'AMENITIES_HISTORY', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}


function* handleuserAddAmnitiesName(amnity) {
   const response = yield call(amenitieAddUser, amnity.payload)
   if (response.status == 200 || response.statusCode === 200) {
      yield put({ type: 'ADD_USER_AMENITIES', payload: { message: response.data.message, statusCode: response.status || response.statusCode } })
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
      //  toast.success(response.data.message, {
      //    position: 'top-center',
      //    autoClose: 2000, 
      //    hideProgressBar: false,
      //    closeOnClick: true,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      //    style: toastStyle
      //  })
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
      });

   }
   else if (response.status === 201 || response.statusCode === 201) {

      var toastStyle = {
         backgroundColor: 'red',
         color: 'white',
         width: "100%"
      };

      toast.error(response.data.message, {
         position: 'top-center',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         style: toastStyle,
      })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handlebedNumberDetails(bedDetails) {
   const response = yield call(beddetailsNumber, bedDetails.payload)
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'BED_NUMBER_DETAILS', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}



function* handleKYCValidate(action) {
   const response = yield call(KYCValidate, action.payload)
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
      yield put({ type: 'KYC_VALIDATE', payload: { response: response.data.result.ref_id, statusCode: response.status || response.statusCode } })

      toast.success(`${response.data.result.message}`, {
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
   else if (response.status === 201) {
      toast.error('Enter valid Aadhaar No.', {
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


function* handleKYCValidateOtpVerify(action) {
   const response = yield call(KYCValidateOtpVerify, action.payload)

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
      yield put({ type: 'KYC_VALIDATE_OTP_VERIFY', payload: { response: response.data, statusCode: response.status || response.statusCode } })
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
   else if(response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR', payload: response.data.message })
      toast.error(`${response.data.message}`, {
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





function* handleCountrylist() {
   const response = yield call(countrylist);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'COUNTRY_LIST', payload: response.data, statusCode: response.status || response.statusCode })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleGetWalkInCustomer(action) {
   const response = yield call(getWalkInCustomer, action.payload);
  console.log("response", response);
  

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'WALK_IN_CUSTOMER_LIST', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'WALK_IN_CUSTOMER_LIST_ERROR', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleAddWalkInCustomer(action) {
   const response = yield call(AddWalkInCustomer, action.payload);

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'ADD_WALK_IN_CUSTOMER', payload: { response: response.data, statusCode: response.statusCode || response.status } })
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
   else if (response.statusCode === 201 || response.status === 201) {

      yield put({ type: 'ALREADY_EXIST_ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleDeleteWalkInCustomer(action) {
   const response = yield call(DeleteWalkInCustomer, action.payload);

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'DELETE_WALK_IN_CUSTOMER', payload: { response: response.data, statusCode: response.statusCode || response.status } })
      toast.success('Deleted Successfully', {
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


function* handleCheckoutCustomer(action) {
   const response = yield call(getCheckOutCustomer, action.payload);

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'CHECKOUT_CUSTOMER_LIST', payload: { response: response.data.checkout_details, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'CHECKOUT_CUSTOMER_LIST_ERROR', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleAddCheckoutCustomer(action) {
   const response = yield call(AddCheckOutCustomer, action.payload);

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'ADD_CHECKOUT_CUSTOMER', payload: { response: response.data, statusCode: response.statusCode || response.status } })
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
   } else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ADD_CHECKOUT_CUSTOMER_LIST_ERROR', payload: response.data.message })
   }



   if (response) {
      refreshToken(response)
   }

}


function* handleDeleteCheckOUtCustomer(action) {
   const response = yield call(DeleteCheckOutCustomer, action.payload);

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'DELETE_CHECK_OUT_CUSTOMER', payload: { response: response.data, statusCode: response.statusCode || response.status } })
      toast.success('Deleted Successfully', {
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




function* handleAvailableCheckOUtCustomer(action) {
   const response = yield call(AvailableCheckOutCustomer, action.payload);

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'AVAILABLE_CHECK_OUT_CUSTOMER', payload: { response: response.data.user_list } })
   }

   if (response) {
      refreshToken(response)
   }

}

function* handlegetConfirmCheckOUtCustomer(action) {
   const response = yield call(GetConfirmCheckOut, action.payload);

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'GET_CONFIRM_CHECK_OUT_CUSTOMER', payload: { response: response.data, statusCode: response.statusCode || response.status } })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleAddConfirmCheckout(action) {
   const response = yield call(AddConfirmCheckOut, action.payload);

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

   if (response.statusCode === 200 || response.status === 200) {
      yield put({ type: 'ADD_CONFIRM_CHECK_OUT_CUSTOMER', payload: { statusCode: response.statusCode || response.status } })
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
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}




function* handleExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleAssetsExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_ASSETS_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleElectricityExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_EB_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleExpenceExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_EXPENSE_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleComplianceExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_COMPLIANCE_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleBookingExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_BOOKING_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleWalkinExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_WALKIN_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleCheckoutExportDetails(action) {
   const response = yield call(exportDetails, action.payload);
   if (response.data.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'EXPORT_CHECKOUT_DETAILS', payload: { response: response.data, statusCode: response.data.status || response.data.statusCode } })

   }

   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
function* handleReAssignPage(action) {
   const response = yield call (customerReAssignBed, action.payload);

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
   if (response.status === 200 ||response.data.statusCode === 200){
     
      yield put ({type : 'REASSIGN_BED' , payload: { response: response.data, statusCode: response.status || response.data.statusCode }})
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
      yield put ({type:'ERROR', payload:response.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleCustomerAddContact(action) {
      const response = yield call (customerAddContact, action.payload);
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
 
      if (response.status === 200 ||response.data.statusCode === 200){
        
         yield put ({type : 'CUSTOMER_ADD_CONTACT' , payload: { response: response.data, statusCode: response.status || response.data.statusCode }})
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
         yield put ({type:'ERROR', payload:response.message})
      }
      if(response){
         refreshToken(response)
      }
   }





 function* handleCustomerAllDetails(action) {
   const response = yield call(customerAllContact,action.payload);
   console.log("handleCustomerAllDetails",response)
   if (response.status === 200 || response.data.statusCode === 200) {
     yield put({ type: "CUSTOMER_ALL_DETAILS", payload: {response: response.data , statusCode: response.status || response.data.statusCode}  });
   } else {
     yield put({ type: "ERROR", payload: response.data.message });
   }
   if (response) {
     refreshToken(response);
   }
 }



 function* handleDeleteContact(action) {
    const response = yield call(deleteContact, action.payload);
  
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
        type: "DELETE_CONTACT",
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
    }  else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
    if (response) {
      refreshToken(response);
    }
  }



  function* handleGenerateAdvance(action) {
   const response = yield call(generateAdvance, action.payload);
 console.log("handleGenerateAdvance",response)
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
       type: "GENERATE_ADVANCE",
       payload: {
         response: response.data,
         statusCode: response.status || response.data.statusCode,
       },
     });
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
   }  else {
     yield put({ type: 'ERROR', payload: response.data.message })
  }
   if (response) {
     refreshToken(response);
   }
 }



 function* handleUploadDocument(data) {
   const response = yield call(uploadDocument, data.payload);
console.log("handleUploadDocument",response)
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
      yield put({ type: 'UPLOAD_DOCUMENT', payload: { response: response.data, statusCode: response.status || response.statusCode } })

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
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ADHAR_UPLOAD_ERROR', payload: { response: response.message, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put ({type:'ERROR', payload:response.message})
   }

   
   if (response) {
      refreshToken(response)
   }
}




function* handleUploadOtherDocument(data) {
   const response = yield call(uploadDocument, data.payload);
console.log("handleUploadOtherDocument",response)
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
      yield put({ type: 'UPLOAD_OTHER_DOCUMENT', payload: { response: response.data, statusCode: response.status || response.statusCode } })

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
   else {
      yield put ({type:'ERROR', payload:response.message})
   }

   
   if (response) {
      refreshToken(response)
   }
}
function* UserListSaga() {
   yield takeEvery('USERLIST', handleuserlist)
   yield takeEvery('ADDUSER', handleAddUser)
   yield takeEvery('HOSTELLIST', handleHostelList)
   yield takeEvery('ROOMCOUNT', handleNumberOfRooms)
   yield takeEvery('HOSTELDETAILLIST', handlehosteliddetail)
   yield takeEvery('BILLPAYMENTHISTORY', handleUserBillPaymentHistory)
   yield takeEvery('CREATEFLOOR', handleCreateFloor)
   yield takeEvery('ROOMDETAILS', handleRoomsDetails)
   yield takeEvery('ROOMFULL', handleRoomCheck)
   yield takeEvery('CHECKOUTUSER', handleCheckOut)
   yield takeEvery('DELETEFLOOR', handleDeleteFloor)
   yield takeEvery('DELETEROOM', handleDeleteRoom)
   // yield takeEvery('DELETEBED',handleDeleteBed) 
   yield takeEvery('CUSTOMERDETAILS', handlecustomerdetails)
   yield takeEvery('AMENITESHISTORY', handleamenityhistory)
   yield takeEvery('AMENITESNAMES', handleAmnitiesName)
   yield takeEvery('AddUserAmnities', handleuserAddAmnitiesName)
   yield takeEvery('BEDNUMBERDETAILS', handlebedNumberDetails)
   yield takeEvery('KYCVALIDATE', handleKYCValidate)
   yield takeEvery('KYCVALIDATEOTPVERIFY', handleKYCValidateOtpVerify)
   yield takeEvery('COUNTRYLIST', handleCountrylist)
   yield takeEvery('WALKINCUSTOMERLIST', handleGetWalkInCustomer)
   yield takeEvery('ADDWALKINCUSTOMER', handleAddWalkInCustomer)
   yield takeEvery('DELETEWALKINCUSTOMER', handleDeleteWalkInCustomer)
   yield takeEvery('CHECKOUTCUSTOMERLIST', handleCheckoutCustomer)
   yield takeEvery('ADDCHECKOUTCUSTOMER', handleAddCheckoutCustomer)
   yield takeEvery('DELETECHECKOUTCUSTOMER', handleDeleteCheckOUtCustomer)
   yield takeEvery('AVAILABLECHECKOUTCUSTOMER', handleAvailableCheckOUtCustomer)
   yield takeEvery('EXPORTDETAILS', handleExportDetails)
   yield takeEvery('EXPORTASSETSDETAILS', handleAssetsExportDetails)
   yield takeEvery('EXPORTEBSDETAILS', handleElectricityExportDetails)
   yield takeEvery('EXPORTEXPENCESDETAILS', handleExpenceExportDetails)
   yield takeEvery('EXPORTCOMPLIANCEDETAILS', handleComplianceExportDetails)
   yield takeEvery('EXPORTBOOKINGDETAILS', handleBookingExportDetails)
   yield takeEvery('EXPORTWALKINGDETAILS', handleWalkinExportDetails)
   yield takeEvery('EXPORTCHECKOUTDETAILS', handleCheckoutExportDetails)
   yield takeEvery('GETCONFIRMCHECKOUTCUSTOMER', handlegetConfirmCheckOUtCustomer)
   yield takeEvery('ADDCONFIRMCHECKOUTCUSTOMER', handleAddConfirmCheckout)
   yield takeEvery('CUSTOMERREASSINBED', handleReAssignPage)
   yield takeEvery('CUSTOMERADDCONTACT', handleCustomerAddContact)
   yield takeEvery('CONTACTALLDETAILS', handleCustomerAllDetails)
   yield takeEvery('CONTACTDELETE', handleDeleteContact)
   yield takeEvery('ALL_HOSTEL_DETAILS', handleAllHostelList)
   yield takeEvery('ADVANCEGENERATE', handleGenerateAdvance)
   yield takeEvery('UPLOADDOCUMENT', handleUploadDocument)
   yield takeEvery('UPLOADOTHERDOCUMENT', handleUploadOtherDocument)



}
export default UserListSaga;