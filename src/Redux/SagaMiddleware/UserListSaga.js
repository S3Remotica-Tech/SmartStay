import { takeEvery, call, put } from "redux-saga/effects";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {finalAddRoomReading,
   cancelCheckoutInitialize, getInitializeCheckout, EditTenantAmount, editAdvanceAmount, deleteReading,
   editBasicDetails, CancelCheckOutCustomer, getParticularCustomerReading, getParticularRoomReading, getCustomerReading,
   cancelBookingGet, bookingToCheckIn, addRoomReading, getRoomReading, editHostelReading,
   bookedDetails, availableBedDetailsForDate, checkoutDetailView, customerSaveInfo, CheckIn, GetAllFloor, getParticularHostelList, ConfirmCheckout_Due_Customer, deleteCustomer,
   AvailableCheckOutCustomer, DeleteCheckOutCustomer, AddCheckOutCustomer, getCheckOutCustomer, AddWalkInCustomer, DeleteWalkInCustomer,
   getWalkInCustomer, KYCValidateOtpVerify, KYCValidate, checkOutUser, userlist, addUser, hostelList, roomsCount, hosteliddetail,
   userBillPaymentHistory, createFloor, roomFullCheck, deleteFloor, deleteRoom, CustomerDetails, amenitieshistory, amnitiesnameList,
   amenitieAddUser, availableBedDetails, exportDetails, GetConfirmCheckOut, AddConfirmCheckOut, customerReAssignBed,
   customerAddContact, customerAllContact, deleteContact, generateAdvance, uploadDocument, hostelDetailsId, EditConfirmCheckOut,
   handleKycVerify, handlegetCustomerDetailsKyc, CustomerUnAssign, backtoCheckin, GenerateDetails, conformCheckout
} from "../Action/UserListAction"
import { GlobalHostelId } from "../../Utils/GlobalResponse";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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




function* handleGetInitializeCheckout(action) {
   try {
      const response = yield call(getInitializeCheckout, action.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'GET_INITIALIZE_CHECKOUT', payload: { response: response.data, statusCode: response?.status } })
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}


function* handleCancelCheckoutInitialize(reading) {
   try {
      const response = yield call(cancelCheckoutInitialize, reading.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
      }
      if (response?.status === 200) {
         yield put({ type: 'INITIALIZE_CANCEL_CHECKOUT', payload: { response: response.data, statusCode: response?.status } })
      }
     
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}







function* handleEditAdvance(action) {
   try {
      const response = yield call(editAdvanceAmount, action.payload)
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
         yield put({ type: 'EDIT_ADVANCE', payload: { response: response.data, statusCode: response?.status } })

         toast.success(response.data, {
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
            yield put({ type: 'EDIT_ADVANCE_ERROR', payload: error.response.data });
         }
      }
   }



}






function* handleEditBasicDetails(reading) {
   try {
      const response = yield call(editBasicDetails, reading.payload)
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
         yield put({ type: 'EDIT_BASIC_DETAILS', payload: { response: response.data, statusCode: response?.status } })

         toast.success(response.data, {
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
            yield put({ type: 'ALREADY_MOBILE_BASIC_ERROR', payload: error.response.data });
         }
      }
   }



}



function* handleEditTenantAmount(args) {
   try {
      const response = yield call(EditTenantAmount, args.payload)
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
         yield put({ type: 'EDIT_AMOUNT_DETAILS', payload: { response: response.data, statusCode: response?.status } })

         toast.success(response.data, {
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
            yield put({ type: 'TENANT_UPDATE_ERROR', payload: error.response.data });
         }
      }
   }



}












function* handleCancelCheckout(reading) {
   try {
      const response = yield call(CancelCheckOutCustomer, reading.payload)

      if (response?.status === 200) {
         yield put({ type: 'CANCEL_CHECKOUT', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'CANCEL_CHECKOUT_ERROR', payload: error.response.data });
         }
      }
   }



}











function* handleGetParticularCustomerReading(reading) {
   try {
      const response = yield call(getParticularCustomerReading, reading.payload)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'GET_PARTICULAR_CUSTOMER_READING', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      yield* handleApiError(err);

   }


}







function* handleGetCustomerReading(reading) {
   try {
      const response = yield call(getCustomerReading, reading.payload)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'GET_CUSTOMER_READING', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}

function* handleGetParticularRoomReading(reading) {
   try {
      const response = yield call(getParticularRoomReading, reading.payload)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }

      if (response?.status === 200) {
         yield put({ type: 'GET_PARTICULAR_ROOM_READING', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}



function* handleBookingToCheckIn(reading) {
   try {
      const response = yield call(bookingToCheckIn, reading.payload)

      if (response?.status === 201 || response?.status === 200) {
         yield put({ type: 'BOOKING_TO_CHECKIN', payload: { response: response.data, statusCode: response?.status } })

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

         toast.success(response.data, {
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
            yield put({ type: 'BED_AVAILABLE_ERROR_BOOKED', payload: error.response.data });
         }
      }
   }


}



function* handleCancelBookingGet(reading) {
   try {
      const response = yield call(cancelBookingGet, reading.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }



      if (response?.status === 200) {
         yield put({ type: 'INITIALIZE_CANCEL_BOOKING', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}










function* handleGetRoomReading(reading) {
   try {
      const response = yield call(getRoomReading, reading.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'GET_ROOM_READING', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}


function* handleAddRoomReading(reading) {
   try {
      const response = yield call(addRoomReading, reading.payload)

      if (response?.status === 201 || response?.status === 200) {
         yield put({ type: 'ADD_ROOM_READING', payload: { response: response.data, statusCode: response?.status } })

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

         toast.success(response.data, {
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
            yield put({ type: 'ROOM_READING_ERROR', payload: error.response.data });
         }
      }
   }


}
function* handleFinalSettlementAddRoomReading(reading) {
   try {
      const response = yield call(finalAddRoomReading, reading.payload)

      if (response?.status === 201 || response?.status === 200) {
         yield put({ type: 'FINAL_SETTLEMENT_ADD_ROOM_READING', payload: { response: response.data, statusCode: response?.status } })

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

         toast.success(response.data, {
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
            yield put({ type: 'ROOM_READING_ERROR', payload: error.response.data });
         }
      }
   }


}


function* handleEditHostelReading(reading) {
   try {
      const response = yield call(editHostelReading, reading.payload)

      if (response?.status === 201 || response?.status === 200) {
         yield put({ type: 'EDIT_HOSTEL_READING', payload: { response: response.data, statusCode: response?.status } })

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

         toast.success(response.data, {
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
            yield put({ type: 'ROOM_READING_ERROR', payload: error.response.data });
         }
      }
   }


}




function* handleAvailableBedDetailsForDate(bedDetails) {
   try {
      const response = yield call(availableBedDetailsForDate, bedDetails.payload)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }

      if (response?.status === 200) {
         yield put({ type: 'AVAILABLE_BED', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}


function* handleBookedDetails(action) {
   try {
      const response = yield call(bookedDetails, action.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }



      if (response?.status === 200) {
         yield put({ type: 'BOOKED_DETAILS', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'BED_AVAILABLE_ERROR_BOOKED', payload: error.response.data });
         }
      }
   }


}







function* handleCheckIn(datum) {
   try {
      const response = yield call(CheckIn, datum.payload);


      if (response?.status === 201) {
         yield put({
            type: 'CHECK_IN',
            payload: { response: response.message, statusCode: response?.status },
         });


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

         toast.success(response.data, {
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
            yield put({ type: 'BED_AVAILABLE_ERROR', payload: error.response.data });
         }
      }
   }
}



function* handleuserlist(user) {
   try {
      const response = yield call(userlist, user.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'USER_LIST', payload: { response: response.data, statusCode: response?.status } })
      }

      else if (response?.status === 201) {
         yield put({ type: 'NO_USER_LIST', payload: { response: response.data.hostelData || [], statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handleDeleteCustomer(customer) {
   try {
      const response = yield call(deleteCustomer, customer.payload);

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

      if (response?.status === 204) {
         yield put({ type: 'DELETE_CUSTOMER', payload: { response: response.data, statusCode: response?.status } })

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
      else if (response?.status === 201) {
         toast.error('Cannot delete, bed already assigned.', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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


function* handleDeleteReading(reading) {
   try {
      const response = yield call(deleteReading, reading.payload);

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

      if (response?.status === 204 || response?.status === 200) {
         yield put({ type: 'DELETE_READING', payload: { response: response.data, statusCode: response?.status } })

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

   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400 || error.status === 403) {

            toast.error(`${error.response.data}`, {
               style: { fontFamily: "Gilroy", font: "#000", borderBottom: "5px solid red" },
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: true,
               closeButton: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,

            });

         }
      }
   }
}





function* handleHostelList(hostel) {
   try {
      const response = yield call(hostelList, hostel.payload)


      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'HOSTEL_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'NO_HOSTEL', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleGetParticularHostelList(action) {
   try {
      const response = yield call(getParticularHostelList, action.payload)

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }



      if (response?.status === 200) {
         yield put({ type: 'HOSTEL_LIST_All', payload: { response: response.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'NO_HOSTEL_DETAILS', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleNumberOfRooms(ID) {
   try {
      const response = yield call(roomsCount, ID.payload)


      if (response?.status === 200) {
         yield put({ type: 'ROOM_COUNT', payload: { response: response.data.responseData, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'NO_ROOMS', payload: { response: response.data.message, floor_Id: ID.payload.floor_Id, statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}

function* handlehosteliddetail(data) {
   try {
      const response = yield call(hosteliddetail, data.payload);
      if (response?.status === 200) {
         yield put({ type: 'HOSTEL_DETAIL_LIST', payload: response.data.hostel_data, statusCode: response?.status })

      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};

      yield* handleApiError(error);

   }
}
function* handleUserBillPaymentHistory() {
   try {
      const response = yield call(userBillPaymentHistory)

      if (response?.status === 200) {
         yield put({ type: 'BILL_PAYMENT_HISTORY', payload: response.data, statusCode: response?.status })
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

function* handleCreateFloor(data) {
   try {
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


      if (response?.status === 201) {
         yield put({ type: 'CREATE_FLOOR', payload: { response: response.data, statusCode: response?.status } })

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
      else if (response?.status === 202) {

         yield put({ type: 'ALREADY_FLOOR_ERROR', payload: response?.data?.message })

      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 409) {
            yield put({ type: 'ALREADY_FLOOR_ERROR', payload: error.response.data });
         }
      }
   }
}

function* handleRoomsDetails(ID) {
   try {
      const response = yield call(roomsCount, ID.payload)


      if (response?.status === 200) {
         yield put({ type: 'ROOM_DETAILS', payload: response.data.responseData, statusCode: response?.status })
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



function* handleAddUser(datum) {
   try {
      const response = yield call(addUser, datum.payload);


      if (response?.status === 201) {
         yield put({
            type: 'ADD_USER',
            payload: { response: response.message, statusCode: response?.status },
         });


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

         toast.success(response.data, {
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
         if (error.response.data.emailStatus !== "") {
            yield put({ type: 'EMAIL_ERROR', payload: error.response.data.emailStatus });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'PHONE_ERROR', payload: error.response.data.mobileStatus });
         }
      }
   }
}



function* handleCustomerSaveInfo(datum) {
   try {
      const response = yield call(customerSaveInfo, datum.payload);


      if (response?.status === 201) {
         yield put({
            type: 'CREATE_CUSTOMER_SAVE_INFO',
            payload: { response: response.message, statusCode: response?.status },
         });


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

         toast.success(response.data, {
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
         const emailError = error.response?.data?.emailStatus;
         const mobileError = error.response?.data?.mobileStatus;
         if (emailError) {
            yield put({ type: 'EMAIL_ERROR', payload: emailError });
         } else if (error.response.data.mobileStatus !== "") {
            yield put({ type: 'PHONE_ERROR', payload: mobileError });
         }
      }
   }
}



function* handleRoomCheck(action) {
   try {


      const response = yield call(roomFullCheck, action.payload)

      if ((response?.status === 200) && response.data?.length > 0) {
         yield put({ type: 'ROOM_FULL', payload: response.data.data, statusCode: response?.status })
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


function* handleCheckOut(action) {
   try {
      const response = yield call(checkOutUser, action.payload)

      if (response?.status === 200) {
         yield put({ type: 'CHECKOUT_USER', payload: { response: response.data, statusCode: response?.status } })
         Swal.fire({
            icon: 'success',
            text: 'User Check Out Successfully',

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

function* handleDeleteFloor(hosteID) {
   try {
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
      if (response?.status === 200) {
         yield put({ type: 'DELETE_FLOOR', payload: { message: response.data.message, statusCode: response?.status } })

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

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {

            toast.error(`${error.response.data}`, {
               style: { fontFamily: "Gilroy", font: "#000", borderBottom: "5px solid red" },
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: true,
               closeButton: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,

            });

         }
      }
   }
}

function* handleDeleteRoom(roomDetails) {
   try {
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

      if (response?.status === 200) {
         yield put({ type: 'DELETE_ROOM', payload: { message: response.data.message, statusCode: response?.status } })
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

      if (response) {
         refreshToken(response)
      }
   } catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {

            toast.error(`${error.response.data}`, {
               style: { fontFamily: "Gilroy", font: "#000", borderBottom: "5px solid red" },
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: true,
               closeButton: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,

            });

         }
      }
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


function* handlecustomerdetails(userDetails) {
   try {
      const response = yield call(CustomerDetails, userDetails.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'CUSTOMER_DETAILS', payload: { response: response.data, statusCode: response?.status } })
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

function* handleAmnitiesName() {
   try {
      const response = yield call(amnitiesnameList);

      if (response?.status === 200) {
         yield put({ type: 'AMNITIES_NAME', payload: response?.data, statusCode: response?.status })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}
function* handleamenityhistory(amnityDetails) {
   try {
      const response = yield call(amenitieshistory, amnityDetails.payload)
      if (response?.status === 200) {
         yield put({ type: 'AMENITIES_HISTORY', payload: { response: response.data.data, statusCode: response?.status } })
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

function* handleuserAddAmnitiesName(amnity) {
   try {
      const response = yield call(amenitieAddUser, amnity.payload);


      let toastStyle = {
         width: "100%",
         color: "black",
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
         yield put({ type: 'ADD_USER_AMENITIES', payload: { message: response.data.message, statusCode: response?.status } });

         toastStyle.backgroundColor = "#E6F6E6";
         toastStyle.color = "black";

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


      } else if (response?.status === 201) {
         toastStyle.backgroundColor = "red";
         toastStyle.color = "white";


         toast.error(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

            style: toastStyle,
         });
      } else {
         yield put({ type: 'ERROR', payload: response?.data?.message });

      }

      if (response) {
         refreshToken(response);
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handlebedNumberDetails(bedDetails) {
   try {
      const response = yield call(availableBedDetails, bedDetails.payload)
      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'BED_NUMBER_DETAILS', payload: response.data, statusCode: response?.status })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }


}



function* handleKYCValidate(action) {
   try {
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
      if (response?.status === 200) {
         yield put({ type: 'KYC_VALIDATE', payload: { response: response.data.result.ref_id, statusCode: response?.status } })

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
      else if (response?.status === 201) {
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
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }

}


function* handleKYCValidateOtpVerify(action) {
   try {
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
      if (response?.status === 200) {
         yield put({ type: 'KYC_VALIDATE_OTP_VERIFY', payload: { response: response.data, statusCode: response?.status } })
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
         yield put({ type: 'ERROR', payload: response?.data?.message })
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
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }

}








function* handleGetWalkInCustomer(action) {
   try {


      const response = yield call(getWalkInCustomer, action.payload);


      if (response?.status === 200) {
         yield put({ type: 'WALK_IN_CUSTOMER_LIST', payload: { response: response.data.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'WALK_IN_CUSTOMER_LIST_ERROR', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleAddWalkInCustomer(action) {
   try {
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
      const statusCode = response?.statusCode || response?.status || response?.data?.statusCode;
      const message = response?.message || response?.data?.message;

      if (statusCode === 200) {
         yield put({ type: 'ADD_WALK_IN_CUSTOMER', payload: { response: response.data || response, statusCode } });

         toast.success(`${message}`, {
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
      } else if (statusCode === 201 || (message && message !== "")) {
         yield put({ type: 'ALREADY_EXIST_ERROR', payload: message });

      }

      if (response) {
         refreshToken(response);
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handleDeleteWalkInCustomer(action) {
   try {
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

      if (response?.status === 200) {
         yield put({ type: 'DELETE_WALK_IN_CUSTOMER', payload: { response: response.data, statusCode: response?.status } })
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
   catch (error) {
      yield* handleApiError(error);
   }

}


function* handleCheckoutCustomer(action) {
   try {
      const response = yield call(getCheckOutCustomer, action.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }


      if (response?.status === 200) {
         yield put({ type: 'CHECKOUT_CUSTOMER_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'CHECKOUT_CUSTOMER_LIST_ERROR', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}

function* handleAddCheckoutCustomer(action) {
   try {
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

      if (response?.status === 201) {
         yield put({ type: 'ADD_CHECKOUT_CUSTOMER', payload: { response: response.data, statusCode: response?.status } })
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
      // } else if (response?.status === 201 ) {
      //    yield put({ type: 'ADD_CHECKOUT_CUSTOMER_LIST_ERROR', payload: response?.data?.message })
      // }



      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ADD_CHECKOUT_CUSTOMER_LIST_ERROR', payload: error.response.data });
         }
      }
   }

}


function* handleDeleteCheckOUtCustomer(action) {
   try {
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

      if (response?.status === 200) {
         yield put({ type: 'DELETE_CHECK_OUT_CUSTOMER', payload: { response: response.data, statusCode: response?.status } })
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
   catch (error) {
      yield* handleApiError(error);
   }

}




function* handleAvailableCheckOUtCustomer(action) {
   try {
      const response = yield call(AvailableCheckOutCustomer, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'AVAILABLE_CHECK_OUT_CUSTOMER', payload: { response: response.data.user_list } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }

}

function* handlegetConfirmCheckOUtCustomer(action) {
   try {
      const response = yield call(GetConfirmCheckOut, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'GET_CONFIRM_CHECK_OUT_CUSTOMER', payload: { response: response.data, statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }

}

function* handleAddConfirmCheckout(action) {
   try {
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

      if (response?.status === 200) {
         yield put({ type: 'ADD_CONFIRM_CHECK_OUT_CUSTOMER', payload: { statusCode: response?.status } })
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
         yield put({ type: 'ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }


}


function* handleEditConfirmCheckout(action) {
   try {
      const response = yield call(EditConfirmCheckOut, action.payload);
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
         yield put({ type: 'EDIT_CONFIRM_CHECK_OUT_CUSTOMER', payload: { statusCode: response?.status } })
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
         yield put({ type: 'EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR', payload: response?.data?.message })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }

}



function* handleExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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


function* handleAssetsExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_ASSETS_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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


function* handleElectricityExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_EB_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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

function* handleExpenceExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_EXPENSE_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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
function* handleComplianceExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_COMPLIANCE_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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
function* handleBookingExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_BOOKING_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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

function* handleWalkinExportDetails(action) {
   try {


      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_WALKIN_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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
function* handleCheckoutExportDetails(action) {
   try {
      const response = yield call(exportDetails, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'EXPORT_CHECKOUT_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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


function* handleReAssignPage(action) {
   try {
      const { hostelId, customerId, datum } = action.payload;
      const response = yield call(customerReAssignBed, hostelId, customerId, datum);

      // const response = yield call(customerReAssignBed, action.payload);


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

         yield put({
            type: 'REASSIGN_BED',
            payload: {
               response: response.data,
               statusCode: response?.status
            }
         });

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
      } else {
         yield put({ type: 'ERROR', payload: response.message });
      }

      if (response) {

         refreshToken(response);
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'CHANGE_BED_ERROR', payload: error.response.data });
         }
      }
   }
}


function* handleCustomerAddContact(action) {
   try {
      const response = yield call(customerAddContact, action.payload);
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

         yield put({ type: 'CUSTOMER_ADD_CONTACT', payload: { response: response.data, statusCode: response?.status } })
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
         yield put({ type: 'CONTACT_ERROR', payload: { response: response.data.message, statusCode: response?.status } })
      }

      else {
         yield put({ type: 'ERROR', payload: response.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}





function* handleCustomerAllDetails(action) {
   try {
      const response = yield call(customerAllContact, action.payload);

      if (response?.status === 200) {
         yield put({ type: "CUSTOMER_ALL_DETAILS", payload: { response: response.data, statusCode: response?.status } });
      } else {
         yield put({ type: "ERROR", payload: response?.data?.message });
      }
      if (response) {
         refreshToken(response);
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}



function* handleDeleteContact(action) {
   try {
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

      if (response?.status === 200) {
         yield put({
            type: "DELETE_CONTACT",
            payload: {
               response: response.data,
               statusCode: response?.status,
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
      } else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response);
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}



function* handleGenerateAdvance(action) {
   try {
      const response = yield call(generateAdvance, action.payload);
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
            type: "GENERATE_ADVANCE",
            payload: {
               response: response.data,
               statusCode: response?.status,
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
      }
      else if (response?.status === 201) {
         yield put({ type: 'GENERATE_ERROR', payload: { response: response.message, statusCode: response?.status } })
      }

      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response);
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}



function* handleUploadDocument(data) {
   try {
      const response = yield call(uploadDocument, data.payload);
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
         yield put({ type: 'UPLOAD_DOCUMENT', payload: { response: response.data, statusCode: response?.status } })

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
      else if (response?.status === 201) {
         yield put({ type: 'ADHAR_UPLOAD_ERROR', payload: { response: response.message, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response.message })
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}




function* handleUploadOtherDocument(data) {
   try {
      const response = yield call(uploadDocument, data.payload);
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
         yield put({ type: 'UPLOAD_OTHER_DOCUMENT', payload: { response: response.data, statusCode: response?.status } })

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
         yield put({ type: 'ERROR', payload: response.message })
      }


      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handlehostelDetailsId() {
   const response = yield call(hostelDetailsId);
   if (response?.status === 200) {
      yield put({ type: 'HOSTEL_ID_LIST', payload: response.data, statusCode: response?.status })
   }
   else {
      yield put({ type: 'ERROR', payload: response?.data?.message })
   }
   if (response) {
      refreshToken(response)
   }
}









function* handleKYCVerifyNew(action) {
   try {
      const response = yield call(handleKycVerify, action.payload);

      const toastStyle = {
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
            type: 'KYC_VERIFY_NEW',
            payload: {
               response: response.data,
               statusCode: response?.status,
            },
         });

         toast.success(`${response?.data?.result?.message || "KYC verified successfully"}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: toastStyle,
         });
      } else {
         yield put({ type: 'ERROR', payload: response?.data?.message || "KYC verification failed" });
      }

      if (response) {
         refreshToken(response);
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handleCustomerDetailsKyc(action) {

   try {
      const response = yield call(handlegetCustomerDetailsKyc, action.payload);




      if (response?.status === 200) {
         yield put({
            type: 'KYC_CUSTOMER_DETAILS',
            payload: {
               response: response.data,
               statusCode: response?.status,
            },
         });



         yield call(refreshToken, response);
      }
      else if (response?.status === 201) {
         yield put({ type: 'KYC_NOT_ADDED', payload: { response: response.data, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message });
      }
   }
   catch (err) {

      const error = err || {};
      yield* handleApiError(error);

   }
}


function* handleConfirmCheckoutDueCustomer(data) {
   try {
      const response = yield call(ConfirmCheckout_Due_Customer, data.payload);

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
         yield put({ type: 'CONFIRM_CHECKOUT_DUE_CUSTOMER', payload: { statusCode: response?.status } })

         toast.success('Checkouted successfully!', {
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

         yield put({ type: 'DUE_ERROR', payload: response?.data?.message })

      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}




function* handlecustomerUnAssign(action) {

   try {
      const response = yield call(CustomerUnAssign, action.payload)


      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }
      if (response?.status === 200) {
         yield put({ type: 'UNASSIGN_CUSTOMER', payload: { response: response.data.listCustomers, statusCode: response?.status } })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }
      if (response) {
         refreshToken(response)
      }
   }

   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }

}




function* handleBackToCheckin(action) {
   try {
      const response = yield call(backtoCheckin, action.payload)


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
         yield put({ type: 'BACK_TO_CHECKIN_USER', payload: { response: response.data, statusCode: response?.status } })

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


function* handleGetAllFloor(floor) {
   try {
      const response = yield call(GetAllFloor, floor.payload);

      const hostelId = GlobalHostelId(response);
      if (hostelId) {
         yield put({ type: "SAVE_RESPONSE_HOSTEL", payload: hostelId })
         // const cookies = new Cookies()
         // cookies.set('selected_hostelId', hostelId, { path: '/' });
      }

      if (response?.status === 200) {
         yield put({ type: 'ALL_FLOOR_LIST', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (err) {
      const error = err || {};
      yield* handleApiError(error);

   }
}

function* handleGenerateDetails(reading) {
   try {
      const { customerId, data } = reading.payload
      const response = yield call(GenerateDetails, customerId, data)


      if (response?.status === 201 || response?.status === 200) {
         yield put({ type: 'FINAL_GENERATE', payload: { response: response.data, statusCode: response?.status } })

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

         toast.success(response.data, {
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
            yield put({ type: 'FINAL_GENERATE_ERROR', payload: error.response.data });
         }
      }
   }


}



function* handleConformCheckout(reading) {
   try {
      const response = yield call(conformCheckout, reading.payload)


      if (response?.status === 200) {
         yield put({ type: 'CONFORM_CHECKOUT', payload: { response: response.data, statusCode: response?.status } })

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

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'CONFORM_CHECKOUT_ERROR', payload: error.response.data });
         }
      }
   }


}



function* handleCheckoutProfile(action) {
   try {
      const response = yield call(checkoutDetailView, action.payload)



      if (response?.status === 200) {
         yield put({ type: 'CHECKOUT_PROFILE_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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


function* UserListSaga() {
 yield takeEvery('FINALSETTLEMENTADDROOMREADINGSAGA', handleFinalSettlementAddRoomReading)
   yield takeEvery('DELETEREADING', handleDeleteReading)
   yield takeEvery('INITIALIZECANCELCHECKOUT', handleCancelCheckoutInitialize)
   yield takeEvery('GETINITIALIZECHECKOUT', handleGetInitializeCheckout)
   yield takeEvery('EDITADVANCE', handleEditAdvance)
   yield takeEvery('EDITAMOUNTDETAILS', handleEditTenantAmount)
   yield takeEvery('EDITBASICDETAILS', handleEditBasicDetails)
   yield takeEvery('CANCELCHECKOUT', handleCancelCheckout)
   yield takeEvery('GETCUSTOMERREADING', handleGetCustomerReading)
   yield takeEvery('GETPARTICULARCUSTOMERREADING', handleGetParticularCustomerReading)
   yield takeEvery('GETPARTICULARROOMREADING', handleGetParticularRoomReading)
   yield takeEvery('GETROOMREADING', handleGetRoomReading)
   yield takeEvery('BOOKINGTOCHECKIN', handleBookingToCheckIn)
   yield takeEvery('INITIALIZECANCELBOOKING', handleCancelBookingGet)
   yield takeEvery('ADDROOMREADING', handleAddRoomReading)
   yield takeEvery('EDITHOSTELREADING', handleEditHostelReading)
   yield takeEvery('BOOKEDDETAILS', handleBookedDetails)
   yield takeEvery('AVAILBALEBEDDETAILS', handleAvailableBedDetailsForDate)
   yield takeEvery('CREATECUSTOMERSAVEINFO', handleCustomerSaveInfo)
   yield takeEvery('CHECKIN', handleCheckIn)
   yield takeEvery('ALLFLOORLIST', handleGetAllFloor)
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
   yield takeEvery('CUSTOMERDETAILS', handlecustomerdetails)
   yield takeEvery('AMENITESHISTORY', handleamenityhistory)
   yield takeEvery('AMENITESNAMES', handleAmnitiesName)
   yield takeEvery('AddUserAmnities', handleuserAddAmnitiesName)
   yield takeEvery('BEDNUMBERDETAILS', handlebedNumberDetails)
   yield takeEvery('KYCVALIDATE', handleKYCValidate)
   yield takeEvery('KYCVALIDATEOTPVERIFY', handleKYCValidateOtpVerify)
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
   yield takeEvery('PARTICULAR_HOSTEL_DETAILS', handleGetParticularHostelList)
   yield takeEvery('ADVANCEGENERATE', handleGenerateAdvance)
   yield takeEvery('UPLOADDOCUMENT', handleUploadDocument)
   yield takeEvery('UPLOADOTHERDOCUMENT', handleUploadOtherDocument)
   yield takeEvery('DELETECUSTOMER', handleDeleteCustomer)
   yield takeEvery('HOSTELIDDETAILS', handlehostelDetailsId)
   yield takeEvery('KYCVERIFYINGNEW', handleKYCVerifyNew)
   yield takeEvery("KYCCUSTOMERDETAILS", handleCustomerDetailsKyc)
   yield takeEvery('EDITCONFIRMCHECKOUTCUSTOMER', handleEditConfirmCheckout)
   yield takeEvery('CONFIRMCHECKOUTDUECUSTOMER', handleConfirmCheckoutDueCustomer)
   yield takeEvery('UNASSIGNCUSTOMER', handlecustomerUnAssign)
   yield takeEvery('BACKTOCHECKIN', handleBackToCheckin)
   yield takeEvery('CHECKOUTPROFILEDETAILS', handleCheckoutProfile)
   yield takeEvery('FINALSETTLEMENT', handleGenerateDetails)
   yield takeEvery('CONFIRMCHECKOUT', handleConformCheckout)


}
export default UserListSaga;