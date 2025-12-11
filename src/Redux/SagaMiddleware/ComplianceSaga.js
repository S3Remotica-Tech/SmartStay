import { takeEvery, call, put } from "redux-saga/effects";
import { complaintsView, updateVendor, ComplianceChangeStatus, complianceList, Compliancedetails, VendorList, addVendor, DeleteVendorList, ComplianceAssign, complianceDelete, getComplianceComment, addComplianceComment, EditComplaint, ParticularcomplianceDetails } from "../Action/ComplianceAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalHostelId } from "../../Utils/GlobalResponse";



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

function* handleUpdateVendor(action) {
   try {
      const response = yield call(updateVendor, action.payload);



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
         yield put({ type: 'UPDATE_VENDOR', payload: { response: response.data, statusCode: response?.status } })
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
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ALREADY_VENDOR_ERROR', payload: error.response.data });
         }
      }
   }
}



function* handleParticularcompliant(action) {

   try {
      const { complaintId } = action.payload
      const response = yield call(ParticularcomplianceDetails, complaintId)

      if (response?.status === 200) {
         yield put({
            type: 'PARTICULAR-COMPLIANT', payload: {
               response: response.data || [],
               statusCode: response?.status
            }
         })
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



function* handlecompliancelist(action) {
   try {
      const response = yield call(complianceList, action.payload)
      const hostelId = GlobalHostelId(response);

      if (hostelId) {   
          yield put({ type: "STORE_HOSTEL_DATA", payload: hostelId });
          const cookies = new Cookies()
                cookies.set('selected_hostelId', hostelId, { path: '/' });
         // yield put({ type: "SET_HOSTEL_ID", payload: hostelId });
         // localStorage.setItem("selectedResponseHostelId", hostelId);
      }

      if (response?.status === 200) {
         yield put({
            type: 'COMPLIANCE_LIST', payload: {
               response: response.data.complaintsList || [], filterOptions: response.data.filterOptions || [],
               statusCode: response?.status
            }
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response?.data?.message })
      }

   }
   catch (error) {
      yield* handleApiError(error);

   }

}

function* handleComplianceadd(params) {
   try {

      const response = yield call(Compliancedetails, params.payload);

      if (response?.status === 201) {
         yield put({ type: 'COMPLIANCE_ADD', payload: { response: response.data, statusCode: response?.status } })
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
            style: toastStyle
         })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}

function* handleEditComplaint(action) {
   try {
      const response = yield call(EditComplaint, action.payload);
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
         yield put({ type: "EDIT_COMPLAINT_SUCCESS", payload: { response: response.data, statusCode: response?.status } });

         toast.success(response.data, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle
         })
      } else {
         yield put({ type: "EDIT_COMPLAINT_FAILURE", payload: response.data });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);

   }
}


function* handleVendorGet(action) {
   try {
      const response = yield call(VendorList, action.payload);



      if (response?.status === 200) {
         yield put({ type: 'VENDOR_LIST', payload: { response: response.data, statusCode: response?.status } })
      }
      else if (response?.status === 201) {
         yield put({ type: 'ERROR_VENDOR_LIST', payload: { statusCode: response?.status } })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}


function* handleAddVendor(action) {
   try {
      const response = yield call(addVendor, action.payload);

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
         yield put({ type: 'ADD_VENDOR', payload: { response: response.data, statusCode: response?.status } })
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
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.code === 'ERR_BAD_REQUEST') {
         if (error.status === 400) {
            yield put({ type: 'ALREADY_VENDOR_ERROR', payload: error.response.data });
         }
      }
   }
}



function* handleComplianceChange(action) {
   try {
      const response = yield call(ComplianceChangeStatus, action.payload);

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
         yield put({ type: 'COMPLIANCE_CHANGE_STATUS', payload: { response: response.data, statusCode: response?.status } })



         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: toastStyle,
         });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.status === 400 || error.status === 404) {
         yield put({ type: 'COMPLIANCE_CHANGE_STATUS_ERROR', payload: error.response.data });
      }
   }

}






function* handleComplianceChangeAssign(action) {
   try {
      const response = yield call(ComplianceAssign, action.payload);

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
         yield put({ type: 'COMPLIANCE_CHANGE_ASSIGN', payload: { response: response.data, statusCode: response?.status } })
         toast.success(`${response.data}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: toastStyle,
         });
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
      if (error.status === 400 || error.status === 404) {
         yield put({ type: 'COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR', payload: error.response.data });
      }
   }

}




function* handleDeleteVendor(action) {
   try {
      const response = yield call(DeleteVendorList, action.payload);

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
         yield put({ type: 'DELETE_VENDOR', payload: { response: response.data, statusCode: response?.status } })
         toast.success('Vendor has been successfully deleted!', {
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


function* handleDeleteCompliance(action) {
   try {


      const response = yield call(complianceDelete, action.payload);


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
         yield put({ type: 'DELETE_COMPLIANCE', payload: { response: response.data, statusCode: response?.status } })
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



function* handleGetComplianceComment(action) {
   try {
      const response = yield call(getComplianceComment, action.payload);
      if (response?.status === 200) {
         yield put({ type: 'COMPLIANCE_COMENET_LIST', payload: { response: response.data, statusCode: response?.status } })
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






function* handleAddComplianceComment(action) {
   try {
      // const response = yield call(addComplianceComment, action.payload);
      const { complaintId, data } = action.payload;
      const response = yield call(addComplianceComment, complaintId, data);

      if (response?.status === 201) {
         yield put({ type: 'COMPLIANCE_ADD_COMMENT', payload: { response: response.data, statusCode: response?.status } })
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
            style: toastStyle
         })
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

function* handleCompliantsView(action) {
   try {
      const response = yield call(complaintsView, action.payload);

      if (response?.status === 200) {
         yield put({ type: 'COMPLAINTS_VIEW', payload: { response: response.data, statusCode: response?.status } })
      }

      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
      yield* handleApiError(error);
   }
}



function* ComplianceSaga() {
   yield takeEvery('COMPLAINTSVIEW', handleCompliantsView)
   yield takeEvery('COMPLIANCE-LIST', handlecompliancelist)
   yield takeEvery('COMPLIANCE-ADD', handleComplianceadd)
   yield takeEvery('EDIT_COMPLAINT', handleEditComplaint)
   yield takeEvery('VENDORLIST', handleVendorGet)
   yield takeEvery('ADDVENDOR', handleAddVendor)
   yield takeEvery('UPDATEVENDOR', handleUpdateVendor)
   yield takeEvery('DELETEVENDOR', handleDeleteVendor)
   yield takeEvery('COMPLIANCECHANGESTATUS', handleComplianceChange)
   yield takeEvery('DELETECOMPLIANCE', handleDeleteCompliance)
   yield takeEvery('COMPLIANCEASSIGN', handleComplianceChangeAssign)
   yield takeEvery('GET_COMPLIANCE_COMMENT', handleGetComplianceComment)
   yield takeEvery('Add_COMPLIANCE_COMMENT', handleAddComplianceComment)
   yield takeEvery('PARTICULAR_COMPLIANT', handleParticularcompliant)
}
export default ComplianceSaga;