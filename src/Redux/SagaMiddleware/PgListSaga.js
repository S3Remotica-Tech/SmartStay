import { takeEvery, call, put } from "redux-saga/effects";
import {add_sub_comments,get_comments,add_comments,delete_announcement,deleteHostelImages,UpdateFloor,DeletePG,DeleteBed,createBed,createPgList,createRoom,CheckRoomId,CheckBedDetails,Checkeblist,CreateEbbill,EB_Customerlist,EB_startmeterlist,createAllPGDetails,OccupiedCustomer,EB_CustomerListTable,editElectricity,deleteElectricity,dashboardFilter,ebAddHostelReading,ebHostelBasedRead,ebAddHostelEdit,ebAddHostelDelete,announcement_list,add_announcement} from "../Action/PgListAction";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FaCheckCircle } from "react-icons/fa";
// import {
//   borderRadius,
//   fontFamily,
//   fontSize,
//   fontWeight,
//   height,
//   padding,
//   textAlign,
//   width,
// } from "@mui/system";

function* handlePgList(datum) {
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

  if (response.statusCode === 200 || response.status === 200) {
    yield put({
      type: "PG_LIST",
      payload: {
        response: response.data,
        statusCode: response.statusCode || response.status,
      },
    });
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
  } else if (response.statusCode === 201 || response.status === 201){
    yield put({
      type: "UPGRADE_PLAN",
      payload: {
        response: response.data,
        statusCode: response.statusCode || response.status,
      },
    });
    toast.error(`${response.message}`, { style : { fontFamily:"Gilroy", font:"#000", borderBottom:"5px solid red" },
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
  
  if (response) {
    refreshToken(response);
  }
}

function* handleCreateRoom(datum) {
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
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "CREATE_ROOM",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
      },
    });
    yield put({
      type: "UPDATE_MESSAGE_AFTER_CREATION",
      message: "CREATED SUCCESSFULLY",
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
  } else if (response.status === 201 || response.statusCode === 201) {
    yield put({ type: "ALREADY_ROOM_ERROR", payload: response.data.message });

    // Swal.fire({
    //    icon: 'warning',
    //    title: response.data.message,
    //               });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckRoom() {
  const response = yield call(CheckRoomId);
  if (response.status === 200 || response.statusCode === 200) {
    yield put({ type: "CHECK_ROOM", payload: response.data.data });
  } else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEblist() {
  const response = yield call(EB_Customerlist);
  if (response.status === 200 || response.statusCode === 200) {
    yield put({ type: "EB_LIST", payload: response.data.data });
  } else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEbStartmeterlist(action) {
  const response = yield call(EB_startmeterlist,action.payload);

  if (response.status === 200 || response.data.statusCode === 200) {
    yield put({ type: "EB_STARTMETER_LIST", payload:{response :response.data.data , statusCode:response.status || response.data.statusCode }  });
  }
  else if (response.status === 201 || response.data.statusCode === 201){
    yield put ({type:'NO_ROOM_BASED', payload: {statusCode:response.data.statusCode || response.status}})
 }

   else {
    yield put({ type: "ERROR", payload: response.data.message});
  }
  if (response) {
    refreshToken(response);
  }
}
function* handleCustomerEblist(action) {
  const response = yield call(EB_CustomerListTable,action.payload);
  if (response.status === 200 || response.data.statusCode === 200) {
    
    yield put({ type: "EB_CUSTOMER_EBLIST", payload: {response :response.data.eb_details,statusCode:response.status || response.data.statusCode } });

  } 
  else if (response.status === 201 || response.data.statusCode === 201){
    yield put ({type:'NO_HOSTEL', payload: {statusCode:response.data.statusCode}})
 }
  else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckEB(action) {
  const response = yield call(Checkeblist, action.payload);
  if (response.status === 200 || response.statusCode === 200) {
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
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCreateEB(action) {
  const response = yield call(CreateEbbill, action.payload);

  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "CREATE_EB",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
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
  } else if(response.data.statusCode === 201) {
    yield put({ type: "EB_ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}
// function* handleCreateEB(action) {
//   const response = yield call(CreateEbbill, action.payload);

//   if (response.status === 200 || response.statusCode === 200) {
//     yield put({
//       type: "CREATE_EB",
//       payload: {
//         response: response.data,
//         statusCode: response.status || response.statusCode,
//       },
//     });

//     const customToast = (
//       <div
//         style={{
//           backgroundColor: "#E6F4EA",
//           borderRadius: "20px",
//           padding: "10px 20px",
//           display: "flex",
//           alignItems: "center",
//           color: "#333",
//         }}
//       >
//         <FaCheckCircle style={{ color: "#4CAF50", marginRight: "8px" }} />
//         <span>{response.data.message || "Eb added successfully!"}</span>
//       </div>
//     );
//      toast.success(customToast, {
//       position: "bottom-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//       // closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       style: {
//         background: "none",
//         boxShadow: "none",
//       },
//     });
//   } else {
//     yield put({ type: "EB_ERROR", payload: response.data.message });
//   }

//   if (response) {
//     refreshToken(response);
//   }
// }

function* handleCreatePGDashboard(action) {
 
  const response = yield call(createAllPGDetails, action.payload);

  if (response.status === 200 || response.statusCode === 200) {
    yield put({ type: "CREATE_PG_DASHBOARD", 
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
      },
    });
  }
  
 
  else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCheckBedDetails(action) {
  const response = yield call(CheckBedDetails, action.payload);
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "BED_DETAILS",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
      },
    });
  } else if (response.status === 201 || response.statusCode === 201) {
    yield put({
      type: "NO_USER_BED",
      payload: {
        response: response.data.message,
        statusCode: response.status || response.statusCode,
      },
    });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleCreateBed(action) {
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

  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "CREATE_BED",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
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
  } else if (response.status === 201 || response.statusCode === 201) {
    yield put({
      type: "ALREADY_BED",
      payload: { response: response.data.message, statusCode: response.status },
    });
    //   Swal.fire({
    //    icon: 'warning',
    //    title: response.data.message,
    //    // timer: 1000,
    //    // showConfirmButton: false,
    //         });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleDeleteBed(action) {
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

  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "DELETE_BED",
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
    yield put({ type: "DELETE_BED_ERROR", payload: response.data.message });
    //  Swal.fire({
    //    icon: 'warning',
    //    title: response.data.message,
    //    // timer: 1000,
    //    // showConfirmButton: false,
    //         });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleDeletePG(action) {
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
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "DELETE_PG",
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
    yield put({ type: "DELETE_PG_ERROR", payload: response.data.message });
    //  Swal.fire({
    //    icon: 'warning',
    //    title: response.data.message,

    //         });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleUpdateFloor(action) {
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
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "UPDATE_FLOOR",
      payload: {
        response: response.data,
        statusCode: response.status || response.statusCode,
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
  } else if (response.status === 202 || response.statusCode === 202) {
    yield put({ type: "UPDATE_FLOOR_ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}


function* handleOccupiedCustomer(action) {
  const response = yield call(OccupiedCustomer, action.payload);
 
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "OCCUPIED_CUSTOMER",
      payload: {
        response: response.data.user_details,
        statusCode: response.status || response.statusCode,
      },
    });
   
  } else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}


function* handleDeleteHostelImages(action) {
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
  if (response.status === 200 || response.statusCode === 200) {
    yield put({
      type: "DELETE_HOSTEL_IMAGES",
      payload: {
        response: response.data.message,
        statusCode: response.status || response.statusCode,
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
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}

function* handleEditElectricity(action) {
  const response = yield call (editElectricity, action.payload);

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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'EDIT_ELECTRICITY' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

  else if(response.data.statusCode === 201){
     yield put ({type:'ERROR_EDIT_ELECTRICITY', payload:response.data.message})
  }
  if(response){
     refreshToken(response)
  }
}

function* handleDeleteElectricity(action) {
  const response = yield call (deleteElectricity, action.payload);

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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DELETE_ELECTRICITY' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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


function* handleDropFilter(action) {
  const response = yield call (dashboardFilter, action.payload);

  if (response.data.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DASHBOARD_FILTER_DETAILS' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
 
  }

  else {
     yield put ({type:'ERROR', payload:response.data.message})
  }
  if(response){
     refreshToken(response)
  }
}
function* handleDropFilterCashBack(action) {
  const response = yield call (dashboardFilter, action.payload);
  if (response.data.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DASHBOARD_FILTER_CASHBACK' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
 
  }

  else if(response.status === 201 || response.data.statusCode === 201){
    yield put({ type: 'NO_DASHBOARD_LIST', payload: {statusCode: response.status || response.data.statusCode} })

 }

  else {
     yield put ({type:'ERROR', payload:response.data.message})
  }
  if(response){
     refreshToken(response)
  }
}



function* handleDropFilterRevenue(action) {
  const response = yield call (dashboardFilter, action.payload);

  if (response.data.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DASHBOARD_FILTER_REVENUE' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
 
  }

  else {
     yield put ({type:'ERROR', payload:response.data.message})
  }
  if(response){
     refreshToken(response)
  }
}


// hostelBased

function* handleAddHostelElectricity(action) {
  const response = yield call (ebAddHostelReading, action.payload);

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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'ADD_HOSTEL_BASED' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

  else if(response.data.statusCode === 201){
    yield put({ type: 'SAME_DATE_ALREADY', payload: {response:response.data.message}})
 }
  if(response){
     refreshToken(response)
  }
}

function* handleHostelEditElectricity(action) {
  const response = yield call (ebAddHostelEdit, action.payload);

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

  if (response.data.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'EDIT_HOSTEL_BASED' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
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

  else if(response.data.statusCode === 201){
    yield put({ type: 'EDIT_SAME_DATE_ALREADY', payload: {response:response.data.message}})
 }
  if(response){
     refreshToken(response)
  }
}

function* handleHostelDeleteElectricity(action) {
  const response = yield call (ebAddHostelDelete, action.payload);

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

  if (response.data.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DELETE_HOSTEL_BASED' , payload:{response:response.data, statusCode:response.data.status || response.data.statusCode}})
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

function* handleHostelBasedEblist(action) {
  const response = yield call(ebHostelBasedRead,action.payload);
  if (response.status === 200 || response.statusCode === 200) {
    yield put({ type: "EB_CUSTOMER_HOSTEL_EBLIST", payload: response.data });
  }
  else if(response.status === 201 || response.data.statusCode === 201){
    yield put({ type: 'NO_EB_HOSTEL_BASED', payload: {statusCode: response.status || response.data.statusCode} })

 }
  
  else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}





function* handleAnnouncementList(action) {
  const response = yield call(announcement_list, action.payload);

  if (response.status === 200 || response.data.statusCode === 200) {
    yield put({ type: "ANNOUNCEMENT_LIST",payload:{response:response.data, statusCode:response.status || response.data.statusCode} });
  } else {
    yield put({ type: "ERROR", payload: response.data.message });
  }
  if (response) {
    refreshToken(response);
  }
}



function* handleAddAnnounce(action) {
  const response = yield call (add_announcement, action.payload);


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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'ADD_ANNOUNCEMENT' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

  else if(response.data.statusCode === 201){
    
    yield put({ type: 'SAME_TITLE', payload: {response:response.data.message}})
  } else if (response.data.statusCode === 202) {
   
    yield put({ type: 'TITTLE_UNIQUE', payload: { response: response.data.message } });
  }
  if(response){
     refreshToken(response)
  }
}



function* handleDeleteAnnounce(action) {
  const response = yield call (delete_announcement, action.payload);
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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'DELETE_ANNOUNCEMENT' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

 
  if(response){
     refreshToken(response)
  }
}


function* handleGetComments(action) {
  const response = yield call (get_comments, action.payload);
 
  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'GET_COMMENTS' , payload:{response:response.data.comments, statusCode:response.status || response.data.statusCode}})
     }

 
  if(response){
     refreshToken(response)
  }
}






function* handleCreateComments(action) {
  const response = yield call (add_comments, action.payload);
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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'CREATE_COMMENTS' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

 
  if(response){
     refreshToken(response)
  }
}



function* handleCreateSubComments(action) {
  const response = yield call (add_sub_comments, action.payload);
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

  if (response.status === 200 || response.data.statusCode === 200){
     yield put ({type : 'CREATE_SUB_COMMENTS' , payload:{response:response.data, statusCode:response.status || response.data.statusCode}})
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

 
  if(response){
     refreshToken(response)
  }
}





function refreshToken(response) {
  if (response.data && response.data.refresh_token) {
    const refreshTokenGet = response.data.refresh_token;
    const cookies = new Cookies();
    cookies.set("token", refreshTokenGet, { path: "/" });
  } else if (response.status === 206) {
    const message = response.status;
    const cookies = new Cookies();
    cookies.set("access-denied", message, { path: "/" });
  }
}

function* PgListSaga() {
  yield takeEvery("PGLIST", handlePgList);
  yield takeEvery("CREATEROOM", handleCreateRoom);
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
  yield takeEvery("HOSTELBASEDEBLIST", handleHostelBasedEblist);
  yield takeEvery("HOSTELBASEDDELETEEB", handleHostelDeleteElectricity);
  yield takeEvery("HOSTELBASEDEDITEB", handleHostelEditElectricity);
  yield takeEvery("HOSTELBASEDADDEB", handleAddHostelElectricity);
  yield takeEvery("ANNOUNCEMENTLIST", handleAnnouncementList);
  yield takeEvery("ADDANNOUNCEMENT", handleAddAnnounce);
  yield takeEvery("DELETEANNOUNCEMENT", handleDeleteAnnounce)
   yield takeEvery("CREATECOMMENTS",  handleCreateComments)
  yield takeEvery("GETCOMMENTS",   handleGetComments)
  yield takeEvery("CREATESUBCOMMENTS",  handleCreateSubComments)



}
export default PgListSaga;
