import { takeEvery, call, put } from "redux-saga/effects";
import {
  AddBooking,
  GetBooking,
  DeleteBooking,
  assignBooking,
  assignBookingBed,
  bookingInActive,
  ApplyInvoice,
  advanceRedeemInitialize,
  ApplyAdvanceInvoice,
} from "../Action/BookingAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

function* handleApiError(error) {
  const status = error?.response?.status || error?.status;

  if (status === 401) {
    yield put({
      type: "UN-AUTHORIZED",
      payload: "Access Denied",
    });
  } else if (status === 500) {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
  } else if (error.code === "ERR_NETWORK") {
    yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
  } else if (status === 403) {
    yield put({
      type: "ACCESS_RESTRICTION_ERROR",
      payload: "Access Restricted",
    });
  }
}

function* handleAdvanceRedeemInitialize(action) {
  try {
    const response = yield call(advanceRedeemInitialize, action.payload);

    if (response?.status === 200) {
      yield put({
        type: "REDEEM_ADVANCE_INITIALIZE",
        payload: { response: response.data, statusCode: response?.status },
      });
    }
  } catch (error) {
    yield* handleApiError(error);
  }
}

function* handleAddBooking(action) {
  try {
    const response = yield call(AddBooking, action.payload);

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
        type: "ADD_USER_BOOKING",
        payload: { response: response.data, statusCode: response?.status },
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
    }

    if (response) {
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);

    if (error.code === "ERR_BAD_REQUEST") {
      if (error.status === 400) {
        yield put({ type: "ERROR_BOOKING", payload: error.response.data });
      }
    }
  }
}

function* handleApplyAdvanceInvoice(action) {
  try {
    const response = yield call(ApplyAdvanceInvoice, action.payload);
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
      yield put({
        type: "APPLY_ADVANCE_INVOICE_REDUCER",
        payload: { response: response.data, statusCode: response?.status },
      });
      toast.success(`Updated Successfully`, {
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
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);

    if (error.code === "ERR_BAD_REQUEST") {
      if (error.status) {
        yield put({
          type: "ERROR_APPLY_ADVANCE_INVOICE",
          payload: error.response.data,
        });
      }
    }
  }
}

function* handleApplyInvoice(action) {
  try {
    const response = yield call(ApplyInvoice, action.payload);

    console.log("response", response);

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
      yield put({
        type: "APPLY_INVOICE_REDUCER",
        payload: { response: response.data, statusCode: response?.status },
      });
      toast.success(`Updated Successfully`, {
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
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);

    if (error.code === "ERR_BAD_REQUEST") {
      if (error.status) {
        yield put({
          type: "ERROR_APPLY_INVOICE",
          payload: error.response.data,
        });
      }
    }
  }
}

function* handleGetBooking(action) {
  try {
    const response = yield call(GetBooking, action.payload);

    if (response?.status === 200) {
      yield put({
        type: "BOOKING_LIST",
        payload: { response: response.data, statusCode: response?.status },
      });
    }
  } catch (error) {
    yield* handleApiError(error);
  }
}

function* handleDeleteBooking(action) {
  try {
    const response = yield call(DeleteBooking, action.payload);

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
        type: "DELETE_BOOKING",
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
    } else if (response?.status === 201) {
      yield put({
        type: "DELETE_BOOKING_ERROR",
        payload: response?.data?.message,
      });
    }
    if (response) {
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);
  }
}

function* handleAsignBooking(action) {
  try {
    const response = yield call(assignBooking, action.payload);
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
        type: "ASSIGN_USER_BOOKING",
        payload: {
          response: response.data,
          statusCode: response?.status === 200,
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
    } else if (response?.status === 201) {
      yield put({ type: "ERROR_BOOKING_DATE", payload: response.data.message });
    } else if (response?.status === 202) {
      yield put({
        type: "ERROR_ASSIGN_BOOKING",
        payload: response.data.message,
      });
    } else if (response?.status === 203) {
      yield put({
        type: "ALREADY_MOBILE_ERROR",
        payload: response.data.message,
      });
    }
    if (response) {
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);
  }
}

function* handleBookingBed(userDetails) {
  try {
    const response = yield call(assignBookingBed, userDetails.payload);
    if (response?.status === 200) {
      yield put({
        type: "BOOKING_BED_DETAILS",
        payload: response.data,
        statusCode: response?.status,
      });
    } else {
      yield put({ type: "ERROR", payload: response?.data?.message });
    }
    if (response) {
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);
  }
}

function* handleBookingInActive(action) {
  try {
    const response = yield call(bookingInActive, action.payload);

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
        type: "BOOKING_INACTIVE",
        payload: { response: response.data, statusCode: response?.status },
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
    }

    if (response) {
      refreshToken(response);
    }
  } catch (error) {
    yield* handleApiError(error);
    if (error.code === "ERR_BAD_REQUEST") {
      if (error.status === 400) {
        yield put({
          type: "ERROR_MAKEASINACTIVE",
          payload: error.response.data,
        });
      }
    }
  }
}

function refreshToken(response) {
  if (response.data && response.data.refresh_token) {
    const refreshTokenGet = response.data.refresh_token;
    const cookies = new Cookies();
    cookies.set("token", refreshTokenGet, { path: "/" });
  } else if (response?.status === 206) {
    const message = response?.status;
    const cookies = new Cookies();

    cookies.set("access-denied", message, { path: "/" });
  }
}

function* CreateBookinSaga() {
  yield takeEvery(
    "REDEEM_ADVANCE_INITIALIZE_SAGA",
    handleAdvanceRedeemInitialize,
  );
  yield takeEvery("APPLY_ADVANCE_INVOICE_SAGA", handleApplyAdvanceInvoice);
  yield takeEvery("ADD_BOOKING", handleAddBooking);
  yield takeEvery("APPLY_INVOICE_SAGA", handleApplyInvoice);
  yield takeEvery("GET_BOOKING_LIST", handleGetBooking);
  yield takeEvery("DELETE_BOOKING_CUSTOMER", handleDeleteBooking);
  yield takeEvery("ASSIGN_BOOKING", handleAsignBooking);
  yield takeEvery("BOOKINGBEDDETAILS", handleBookingBed);
  yield takeEvery("BOOKINGACTIVE", handleBookingInActive);
}
export default CreateBookinSaga;
