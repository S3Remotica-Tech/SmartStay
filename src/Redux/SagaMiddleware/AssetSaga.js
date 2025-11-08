import { takeEvery, call, put } from "redux-saga/effects";
import {getRoleBasedPermission,  updateAsset, GetAsset, AddAsset, DeleteAssetList, getHostelRooms, AssignAsset } from "../Action/AssetAction"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';


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
      toast.error("Network error occurred", {
         style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
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
   else if (error.code === "ERR_NETWORK") {
      yield put({ type: "NETWORK_ERROR", payload: "Network error occurred" });
      toast.error("Network error occurred", {
         style: { fontFamily: "Gilroy", color: "#000", borderBottom: "5px solid red" },
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







function* handleGetRoleBasedPermission(action) {
   try {
      const response = yield call(getRoleBasedPermission, action.payload);



      if (response?.status === 200 || response?.data?.statusCode === 200) {
         yield put({ type: 'PERMISSION_ROLE_LIST', payload: { response: response?.data || [], statusCode: response?.status || response?.data?.statusCode } })
      }
     
      if (response) {
         refreshToken(response)
      }
   }

   catch (error) {
      yield* handleApiError(error);
     
  
   }
}

function* handleGetAsset(action) {
   try {
      const hostelId = action.payload;
      const response = yield call(GetAsset, hostelId);

      if (response?.status === 200 || response?.data?.statusCode === 200) {
         yield put({ type: 'ASSET_LIST', payload: { response: response?.data || [], statusCode: response?.status || response?.data?.statusCode } })
      }
      else if (response?.status === 201 || response?.statusCode === 201) {
         yield put({ type: 'NO_ASSET_LIST', payload: { response: response?.data?.assets || [], statusCode: response?.status  } })
      }
      if (response) {
         refreshToken(response)
      }
   }

   catch (error) {
         yield* handleApiError(error);
      
   }
}


function* handleAddAsset(action) {
   try {
      const response = yield call(AddAsset, action.payload);
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

      if (response?.status === 200 ) {
         yield put({ type: 'ADD_ASSET', payload: { response: response?.data?.assets, statusCode: response?.status  } })
         toast.success(`Created successfully`, {
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
      if (error?.code === 'ERR_BAD_REQUEST') {
         if (error?.status === 400 || error?.status === 403) {
            if (error.response?.data === 'Serial number already exists') {
               yield put({ type: 'SERIAL_NUMBER_ERROR', payload: error.response?.data });
            } else {
               yield put({ type: 'ASSET_NAME_ERROR', payload: error.response?.data });
            }
         }
      }
   }


}

function* handleUpdateAsset(action) {
   try {
      const response = yield call(updateAsset, action.payload);
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

      if (response?.status === 200 ) {
         yield put({ type: 'UPDATE_ASSET', payload: { statusCode: response?.status  } })
         toast.success(`Updated successfully`, {
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
         if (error.status === 400 || error.status === 403) {
            if (error.response?.data === 'Serial number already exists') {
               yield put({ type: 'SERIAL_NUMBER_ERROR', payload: error.response?.data });
            } else {
               yield put({ type: 'ASSET_NAME_ERROR', payload: error.response?.data });
            }
         }
      } 
   }


}

function* handleDeleteAsset(action) {
   try{
   const response = yield call(DeleteAssetList, action.payload);
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
   if (response?.status === 200 ) {
      yield put({ type: 'DELETE_ASSET', payload: { response: response?.data, statusCode: response?.status  } })

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
   else {
      yield put({ type: 'ERROR', payload: response?.data.message })
   }
   if (response) {
      refreshToken(response)
   }
}
catch(error){
   yield* handleApiError(error);
}

}



function* handleGetHostelRooms(action) {
   const response = yield call(getHostelRooms, action.payload);
   if (response?.status === 200 ) {
      yield put({ type: 'GET_ROOMS', payload: { response: response?.data?.data, statusCode: response?.status } })
   }
   else {
      yield put({ type: 'ERROR', payload: response?.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleAssignAsset(action) {
   try {
      const response = yield call(AssignAsset, action.payload);




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


      if (response?.status === 200 ) {
         yield put({ type: 'ASSIGN_ASSET', payload: { response: response?.data, statusCode: response?.status  } })
         toast.success(`${response?.data}`, {
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












function refreshToken(response) {
   if (response?.data && response?.data?.refresh_token) {
      const refreshTokenGet = response.data.refresh_token
      const cookies = new Cookies()
      cookies.set('token', refreshTokenGet, { path: '/' });
   } else if (response?.status === 206) {
      const message = response.status
      const cookies = new Cookies()
      cookies.set('access-denied', message, { path: '/' });

   }

}





function* AssetSaga() {
    yield takeEvery('PERMISSIONROLELIST',handleGetRoleBasedPermission)
   yield takeEvery('ASSETLIST', handleGetAsset)
   yield takeEvery('ADDASSET', handleAddAsset)
   yield takeEvery('UPDATEASSET', handleUpdateAsset)
   yield takeEvery('DELETEASSET', handleDeleteAsset)
   yield takeEvery('GETROOMS', handleGetHostelRooms)
   yield takeEvery('ASSIGNASSET', handleAssignAsset)
}
export default AssetSaga;