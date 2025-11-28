import { takeEvery, call, put } from "redux-saga/effects";
import { updatePgList,UpdateBed, getAllBed, updateRoom, getAllRoom, add_sub_comments, get_comments, add_comments, delete_announcement, deleteHostelImages, UpdateFloor, DeletePG, DeleteBed, createBed, createPgList, createRoom, CheckRoomId, CheckBedDetails, Checkeblist, CreateEbbill, EB_Customerlist, EB_startmeterlist, dashboardReports, OccupiedCustomer, EB_CustomerListTable, editElectricity, deleteElectricity, dashboardFilter, ebAddHostelReading, ebHostelBasedRead, ebAddHostelEdit, ebAddHostelDelete, announcement_list, add_announcement, DeleteHostel } from "../Action/PgListAction";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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










function* handleUpdateBed(datum) {
  try {
    const response = yield call(UpdateBed, datum.payload);
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
        type: "UPDATE_BED",
        payload: {
          response: response.data,
          statusCode: response?.status
        },
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
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 409) {
        yield put({ type: 'ALREADY_BED', payload: error.response.data });
      }
    }
  }
}





function* handleGetAllRooms(action) {
  try {
    const response = yield call(getAllRoom, action.payload);
    if (response?.status === 200) {
      yield put({ type: 'GET_ALL_ROOMS', payload: { response: response.data, statusCode: response?.status } })

    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);

  }
}

function* handleGetAllBed(action) {
  try {
    const response = yield call(getAllBed, action.payload);



    if (response?.status === 200) {
      yield put({ type: 'GET_ALL_BEDS', payload: { response: response.data, statusCode: response?.status } })

    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);

  }
}



function* handlePgList(datum) {
  try {
    const response = yield call(createPgList, datum.payload);



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
      yield put({
        type: "CREATE_PG",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
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

    // if (response?.response?.status === 500) {
    //   throw response;
    // }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
  
 yield* handleApiError(error);

  }
}



function* handleUpdatePgList(datum) {
  try {
    const response = yield call(updatePgList, datum.payload);



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
      yield put({
        type: "UPDATE_PG",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
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
  }
  catch (error) {
  
 yield* handleApiError(error);

  }
}












function* handleCreateRoom(datum) {
  try {
    const response = yield call(createRoom, datum.payload);
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
      yield put({
        type: "CREATE_ROOM",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
      });
      yield put({
        type: "UPDATE_MESSAGE_AFTER_CREATION",
        message: "CREATED SUCCESSFULLY",
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
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 409) {
        yield put({ type: 'ALREADY_ROOM_ERROR', payload: error.response.data });
      }
    }

  }
}


function* handleUpdateRoom(datum) {
  try {
    const response = yield call(updateRoom, datum.payload);
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
        type: "UPDATE_ROOM",
        payload: {
          response: response.data,
          statusCode: response?.status
        },
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
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 409) {
        yield put({ type: 'ALREADY_ROOM_ERROR', payload: error.response.data });
      }
    }
  }
}









function* handleCheckRoom() {
  const response = yield call(CheckRoomId);
  if (response?.status === 200) {
    yield put({ type: "CHECK_ROOM", payload: response.data.data });
  } else {
    yield put({ type: "ERROR", payload: response?.data?.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEblist() {
  const response = yield call(EB_Customerlist);
  if (response?.status === 200) {
    yield put({ type: "EB_LIST", payload: response.data.data });
  } else {
    yield put({ type: "ERROR", payload: response?.data?.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEbStartmeterlist(action) {
  const response = yield call(EB_startmeterlist, action.payload);

  if (response?.status === 200) {
    yield put({ type: "EB_STARTMETER_LIST", payload: { response: response.data.data, statusCode: response?.status } });
  }
  else if (response?.status === 201) {
    yield put({ type: 'NO_ROOM_BASED', payload: { statusCode: response?.status } })
  }

  else {
    yield put({ type: "ERROR", payload: response?.data?.message });
  }
  if (response) {
    refreshToken(response);
  }
}
function* handleCustomerEblist(action) {
  const response = yield call(EB_CustomerListTable, action.payload);
  if (response?.status === 200) {

    yield put({ type: "EB_CUSTOMER_EBLIST", payload: { response: response.data.eb_details, statusCode: response?.status } });

  }
  else if (response?.status === 201) {
    yield put({ type: 'NO_HOSTEL', payload: { statusCode: response?.status } })
  }
  else {
    yield put({ type: "ERROR", payload: response?.data?.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEB(action) {
  const response = yield call(Checkeblist, action.payload);

  if (response?.status === 200) {
    yield put({ type: "CHECK_EB", payload: response.data });
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
    toast.success(response.data.message, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastStyle
    })
  } else {
    yield put({ type: "ERROR", payload: response?.data?.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCreateEB(action) {
  try {
    const response = yield call(CreateEbbill, action.payload);

    if (response?.status === 200) {
      yield put({
        type: "CREATE_EB",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
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
    // else if (response?.status === 201) {
    //   yield put({ type: "EB_ERROR", payload:  response?.data?.message });
    // }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}


function* handleCreatePGDashboard(action) {
  try {
    const response = yield call(dashboardReports, action.payload);

    if (response?.status === 200) {
      yield put({
        type: "CREATE_PG_DASHBOARD",
        payload: {
          response: response?.data,
          statusCode: response?.status,
        },
      });
    }



    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}

function* handleCheckBedDetails(action) {
  const response = yield call(CheckBedDetails, action.payload);
  if (response?.status === 200) {
    yield put({
      type: "BED_DETAILS",
      payload: {
        response: response.data,
        statusCode: response?.status,
      },
    });
  } else if (response?.status === 201) {
    yield put({
      type: "NO_USER_BED",
      payload: {
        response: response.data.message,
        statusCode: response?.status,
      },
    });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCreateBed(action) {
  try {
    const response = yield call(createBed, action.payload);



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
      yield put({
        type: "CREATE_BED",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
      });

      toast.success("Created successfully", {
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
  }
  catch (error) {

    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 409) {
        yield put({ type: 'ALREADY_BED', payload: error.response.data });
      }
    }
    
  }
}

function* handleDeleteBed(action) {
  try {
    const response = yield call(DeleteBed, action.payload);

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
        type: "DELETE_BED",
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
      yield put({ type: "DELETE_BED_ERROR", payload: response?.data?.message });

    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}

function* handleDeletePG(action) {
  try {
    const response = yield call(DeletePG, action.payload);
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
        type: "DELETE_PG",
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
    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 400) {
        yield put({ type: 'DELETE_PG_ERROR', payload: error.response.data });
      }
    }
  }
}

function* handleUpdateFloor(action) {
  try {
    const response = yield call(UpdateFloor, action.payload);
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
        type: "UPDATE_FLOOR",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
      });
      toast.success("Updated successfully ", {
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
  }
  catch (error) {
    yield* handleApiError(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.status === 409) {
        yield put({ type: 'UPDATE_FLOOR_ERROR', payload: error.response.data });
      }
    }
  }
}


function* handleOccupiedCustomer(action) {
  try {
    const response = yield call(OccupiedCustomer, action.payload);



    if (response?.status === 200) {
      yield put({
        type: "OCCUPIED_CUSTOMER",
        payload: {
          response: response.data,
          statusCode: response?.status,
        },
      });

    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}


function* handleDeleteHostelImages(action) {
  try {
    const response = yield call(deleteHostelImages, action.payload);
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
        type: "DELETE_HOSTEL_IMAGES",
        payload: {
          response: response.data.message,
          statusCode: response?.status,
        },
      });
      toast.success("Deleted successfully ", {
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
      yield put({ type: "ERROR", payload: response?.data?.message });
    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}

function* handleEditElectricity(action) {
  try {
    const response = yield call(editElectricity, action.payload);

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
      yield put({ type: 'EDIT_ELECTRICITY', payload: { response: response.data, statusCode: response?.status } })
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

    // else if (response?.status === 201) {
    //   yield put({ type: 'ERROR_EDIT_ELECTRICITY', payload:  response?.data?.message })
    // }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
   
  }
}

function* handleDeleteElectricity(action) {
  try {
    const response = yield call(deleteElectricity, action.payload);

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
      yield put({ type: 'DELETE_ELECTRICITY', payload: { response: response.data, statusCode: response?.status } })
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


function* handleDropFilter(action) {
  try {


    const response = yield call(dashboardFilter, action.payload);

    if (response?.status === 200) {
      yield put({ type: 'DASHBOARD_FILTER_DETAILS', payload: { response: response.data, statusCode: response?.status } })

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
function* handleDropFilterCashBack(action) {
  try {
    const response = yield call(dashboardFilter, action.payload);
    if (response?.status === 200) {
      yield put({ type: 'DASHBOARD_FILTER_CASHBACK', payload: { response: response.data, statusCode: response?.status } })

    }

    else if (response?.status === 201) {
      yield put({ type: 'NO_DASHBOARD_LIST', payload: { statusCode: response?.status } })

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



function* handleDropFilterRevenue(action) {
  try {
    const response = yield call(dashboardFilter, action.payload);

    if (response?.status === 200) {
      yield put({ type: 'DASHBOARD_FILTER_REVENUE', payload: { response: response.data, statusCode: response?.status } })

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

function* handleDropFilterAdvance(action) {
  try {
    const response = yield call(dashboardFilter, action.payload);

    if (response?.status === 200) {
      yield put({ type: 'DASHBOARD_FILTER_ADVANCE', payload: { response: response.data, statusCode: response?.status } })

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


function* handleAddHostelElectricity(action) {
  try {
    const response = yield call(ebAddHostelReading, action.payload);

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
      yield put({ type: 'ADD_HOSTEL_BASED', payload: { response: response.data, statusCode: response?.status } })
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

    // else if (response.data.statusCode === 201) {
    //   yield put({ type: 'SAME_DATE_ALREADY', payload: { response:  response?.data?.message } })
    // }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
   
  }
}

function* handleHostelEditElectricity(action) {
  try {
    const response = yield call(ebAddHostelEdit, action.payload);

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
      yield put({ type: 'EDIT_HOSTEL_BASED', payload: { response: response.data, statusCode: response?.status } })
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
      yield put({ type: 'EDIT_SAME_DATE_ALREADY', payload: { response: response?.data?.message } })
    }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
    
  }
}

function* handleHostelDeleteElectricity(action) {
  try {
    const response = yield call(ebAddHostelDelete, action.payload);

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
      yield put({ type: 'DELETE_HOSTEL_BASED', payload: { response: response.data, statusCode: response?.status } })
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

function* handleHostelBasedEblist(action) {
  try {
    const response = yield call(ebHostelBasedRead, action.payload);
    if (response?.status === 200) {
      yield put({ type: "EB_CUSTOMER_HOSTEL_EBLIST", payload: response.data });
    }
    else if (response?.status === 201) {
      yield put({ type: 'NO_EB_HOSTEL_BASED', payload: { statusCode: response?.status } })

    }

    else {
      yield put({ type: "ERROR", payload: response?.data?.message });
    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}





function* handleAnnouncementList(action) {
  try {
    const response = yield call(announcement_list, action.payload);

    if (response?.status === 200) {
      yield put({ type: "ANNOUNCEMENT_LIST", payload: { response: response.data, statusCode: response?.status } });
    } else {
      yield put({ type: "ERROR", payload: response?.data?.message });
    }
    if (response) {
      refreshToken(response);
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}



function* handleAddAnnounce(action) {
  try {
    const response = yield call(add_announcement, action.payload);


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
      yield put({ type: 'ADD_ANNOUNCEMENT', payload: { response: response.data, statusCode: response?.status } })
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

    // else if (response.data.statusCode === 201) {

    //   yield put({ type: 'SAME_TITLE', payload: { response: response.data.message, statusCode: response.data.statusCode } })
    // } else if (response.data.statusCode === 202) {

    //   yield put({ type: 'TITTLE_UNIQUE', payload: { response: response.data.message, statusCode: response.data.statusCode } });
    // }
    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
   
  }
}



function* handleDeleteAnnounce(action) {
  try {
    const response = yield call(delete_announcement, action.payload);
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
      yield put({ type: 'DELETE_ANNOUNCEMENT', payload: { response: response.data, statusCode: response?.status } })
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


function* handleGetComments(action) {
  try {
    const response = yield call(get_comments, action.payload);

    if (response?.status === 200) {
      yield put({ type: 'GET_COMMENTS', payload: { response: response.data.comments, statusCode: response?.status } })
    }


    if (response) {
      refreshToken(response)
    }
  }
  catch (error) {
    yield* handleApiError(error);
  }
}






function* handleCreateComments(action) {
  try {
    const response = yield call(add_comments, action.payload);
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
      yield put({ type: 'CREATE_COMMENTS', payload: { response: response.data, statusCode: response?.status } })
      toast.success('Send Successfully', {
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



function* handleCreateSubComments(action) {
  try {
    const response = yield call(add_sub_comments, action.payload);
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
      yield put({ type: 'CREATE_SUB_COMMENTS', payload: { response: response.data, statusCode: response?.status } })
      toast.success('Send Successfully', {
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


function* handleDeleteHostel(action) {
  try {
    const response = yield call(DeleteHostel, action.payload);

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
        type: "DELETE_HOSTEL",
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
    }
    if (response) {
      refreshToken(response);
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
        // yield put({ type: 'DELETE_HOSTEL_ERROR', payload: error.response.data });
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

function* PgListSaga() {
  yield takeEvery("UPDATEBED", handleUpdateBed);
  yield takeEvery("GETALLROOMSLIST", handleGetAllRooms);
  yield takeEvery("GETALLBEDSLIST", handleGetAllBed)
  yield takeEvery("CREATEPG", handlePgList);
   yield takeEvery("UPDATEPG",handleUpdatePgList)
  yield takeEvery("CREATEROOM", handleCreateRoom);
  yield takeEvery("UPDATEROOM", handleUpdateRoom);
  yield takeEvery("CHECKROOM", handleCheckRoom);
  yield takeEvery("BEDDETAILS", handleCheckBedDetails);
  yield takeEvery("CHECKEB", handleCheckEB);
  yield takeEvery("CREATEEB", handleCreateEB);
  yield takeEvery("EBLIST", handleCheckEblist);
  yield takeEvery("EBSTARTMETERLIST", handleCheckEbStartmeterlist);
  yield takeEvery("PGDASHBOARD", handleCreatePGDashboard);
  yield takeEvery("CREATEBED", handleCreateBed);
  yield takeEvery("DELETEBED", handleDeleteBed);
  yield takeEvery("DELETEPG", handleDeletePG);
  yield takeEvery("UPDATEFLOOR", handleUpdateFloor);
  yield takeEvery("OCCUPIEDCUSTOMER", handleOccupiedCustomer);
  yield takeEvery("CUSTOMEREBLIST", handleCustomerEblist);
  yield takeEvery("DELETEHOSTELIMAGES", handleDeleteHostelImages);
  yield takeEvery("EDITELECTRICITY", handleEditElectricity);
  yield takeEvery("DELETEECTRICITY", handleDeleteElectricity);
  yield takeEvery("DASHBOARDFILTER", handleDropFilter);
  yield takeEvery("DASHBOARDFILTERCASHBACK", handleDropFilterCashBack);
  yield takeEvery("DASHBOARDFILTERREVENUE", handleDropFilterRevenue);
  yield takeEvery("DASHBOARDFILTERADVANCE", handleDropFilterAdvance);
  yield takeEvery("HOSTELBASEDEBLIST", handleHostelBasedEblist);
  yield takeEvery("HOSTELBASEDDELETEEB", handleHostelDeleteElectricity);
  yield takeEvery("HOSTELBASEDEDITEB", handleHostelEditElectricity);
  yield takeEvery("HOSTELBASEDADDEB", handleAddHostelElectricity);
  yield takeEvery("ANNOUNCEMENTLIST", handleAnnouncementList);
  yield takeEvery("ADDANNOUNCEMENT", handleAddAnnounce);
  yield takeEvery("DELETEANNOUNCEMENT", handleDeleteAnnounce)
  yield takeEvery("CREATECOMMENTS", handleCreateComments)
  yield takeEvery("GETCOMMENTS", handleGetComments)
  yield takeEvery("CREATESUBCOMMENTS", handleCreateSubComments)
  yield takeEvery("DELETEHOSTEL", handleDeleteHostel)

}
export default PgListSaga;
