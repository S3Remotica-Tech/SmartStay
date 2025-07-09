import { takeEvery, call, put } from "redux-saga/effects";
import { ComplianceChangeStatus, compliance, Compliancedetails, VendorList, addVendor, DeleteVendorList, ComplianceChange, complianceDelete, getComplianceComment, addComplianceComment } from "../Action/ComplianceAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* handlecompliancelist(action) {
   const response = yield call(compliance, action.payload);
 

   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'COMPLIANCE_LIST', payload: { response: response.data.hostelData, filterOptions: response.data.filterOptions, statusCode: response.status || response.data.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}

function* handleComplianceadd(params) {
   try {

      const response = yield call(Compliancedetails, params.payload);

      if (response.status === 200 || response.data.statusCode === 200) {
         yield put({ type: 'COMPLIANCE_ADD', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
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
            style: toastStyle
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
   catch (error) {
         if (error.code === 'ERR_NETWORK') {
            yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
         } else {
            yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
         }
      }
}


function* handleVendorGet(action) {
   const response = yield call(VendorList, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'VENDOR_LIST', payload: { response: response.data.VendorList, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201) {
      yield put({ type: 'ERROR_VENDOR_LIST', payload: { statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
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

      if (response.statusCode === 200 || response.status === 200) {
         yield put({ type: 'ADD_VENDOR', payload: { response: response.data, statusCode: response.statusCode || response.status } })
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
      else if (response.statusCode === 202 || response.status === 202) {

         yield put({ type: 'ALREADY_VENDOR_ERROR', payload: response.message })

      }
      else if (response.statusCode === 203 || response.status === 203) {

         yield put({ type: 'ALREADY_VENDOR_EMAIL_ERROR', payload: response.message })

      }
      if (response) {
         refreshToken(response)
      }
   }
  catch (error) {
        if (error.code === 'ERR_NETWORK') {
           yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
        } else {
           yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
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

      if (response.statusCode === 200 || response.status === 200) {
         yield put({ type: 'COMPLIANCE_CHANGE_STATUS', payload: { response: response.data, statusCode: response.statusCode || response.status } })



         toast.success(`${response.data.message}`, {
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
      else {

         yield put({ type: 'COMPLIANCE_CHANGE_STATUS_ERROR', payload: response.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
  catch (error) {
        if (error.code === 'ERR_NETWORK') {
           yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
        } else {
           yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
        }
     }

}






function* handleComplianceChangeAssign(action) {
   try {
      const response = yield call(ComplianceChange, action.payload);

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
         yield put({ type: 'COMPLIANCE_CHANGE_ASSIGN', payload: { response: response.data, statusCode: response.statusCode || response.status } })
         toast.success(`${response.data.message}`, {
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
      else {

         yield put({ type: 'COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR', payload: response.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
 catch (error) {
       if (error.code === 'ERR_NETWORK') {
          yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
       } else {
          yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
       }
    }

}




function* handleDeleteVendor(action) {
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

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_VENDOR', payload: { response: response.data, statusCode: response.status || response.statusCode } })
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
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}


function* handleDeleteCompliance(action) {
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

   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'DELETE_COMPLIANCE', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
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
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}



function* handleGetComplianceComment(action) {
   const response = yield call(getComplianceComment, action.payload);
   if (response.status === 200 || response.data.statusCode === 200) {
      yield put({ type: 'COMPLIANCE_COMENET_LIST', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}






function* handleAddComplianceComment(action) {
   try {
      const response = yield call(addComplianceComment, action.payload);

      if (response.status === 200 || response.data.statusCode === 200) {
         yield put({ type: 'COMPLIANCE_ADD_COMMENT', payload: { response: response.data, statusCode: response.status || response.data.statusCode } })
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
            style: toastStyle
         })
      }
      else {
         yield put({ type: 'ERROR', payload: response.data.message })
      }
      if (response) {
         refreshToken(response)
      }
   }
 catch (error) {
       if (error.code === 'ERR_NETWORK') {
          yield put({ type: 'NETWORK_ERROR', payload: 'Network error occurred' });
       } else {
          yield put({ type: 'NETWORK_ERROR', payload: error.message || 'Something went wrong' });
       }
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





function* ComplianceSaga() {
   yield takeEvery('COMPLIANCE-LIST', handlecompliancelist)
   yield takeEvery('COMPLIANCE-ADD', handleComplianceadd)
   yield takeEvery('VENDORLIST', handleVendorGet)
   yield takeEvery('ADDVENDOR', handleAddVendor)
   yield takeEvery('DELETEVENDOR', handleDeleteVendor)
   yield takeEvery('COMPLIANCECHANGESTATUS', handleComplianceChange)
   yield takeEvery('DELETECOMPLIANCE', handleDeleteCompliance)
   yield takeEvery('COMPLIANCEASSIGN', handleComplianceChangeAssign)
   yield takeEvery('GET_COMPLIANCE_COMMENT', handleGetComplianceComment)
   yield takeEvery('Add_COMPLIANCE_COMMENT', handleAddComplianceComment)

}
export default ComplianceSaga;