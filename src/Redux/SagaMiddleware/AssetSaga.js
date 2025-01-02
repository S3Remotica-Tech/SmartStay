import { takeEvery, call, put } from "redux-saga/effects";
import { GetAsset, AddAsset, DeleteAssetList, getHostelRooms, AssignAsset } from "../Action/AssetAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';



function* handleGetAsset(action) {
   const response = yield call(GetAsset, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ASSET_LIST', payload: { response: response.data.assets, statusCode: response.status || response.statusCode } })
   }
   else if (response.status === 201 || response.statusCode === 201){
      yield put({ type: 'NO_ASSET_LIST', payload: { response: response.data.assets, statusCode: response.status || response.statusCode } })
   }
   if (response) {
      refreshToken(response)
   }
}


function* handleAddAsset(action) {
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

   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ADD_ASSET', payload: { response: response.data.assets, statusCode: response.status || response.statusCode } })
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
   else  if(response.status === 201 || response.statusCode === 201) {
            yield put ({type:'SERIAL_NUMBER_ERROR', payload:response.data.message})
   } else  if(response.status === 202 || response.statusCode === 202) {
     
      yield put ({type:'ASSET_NAME_ERROR', payload:response.data.message})
  }
   if (response) {
      refreshToken(response)
   }
}


function* handleDeleteAsset(action) {
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
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'DELETE_ASSET', payload: { response: response.data, statusCode: response.status || response.statusCode } })
  
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
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}



function* handleGetHostelRooms(action) {
   const response = yield call(getHostelRooms, action.payload);
   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'GET_ROOMS', payload: { response: response.data.data, statusCode: response.status || response.statusCode } })
   }
   else {
      yield put({ type: 'ERROR', payload: response.data.message })
   }
   if (response) {
      refreshToken(response)
   }

}

function* handleAssignAsset(action) {
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


   if (response.status === 200 || response.statusCode === 200) {
      yield put({ type: 'ASSIGN_ASSET', payload: { response: response.data, statusCode: response.status || response.statusCode } })
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





function* AssetSaga() {
   yield takeEvery('ASSETLIST', handleGetAsset)
   yield takeEvery('ADDASSET', handleAddAsset)
   yield takeEvery('DELETEASSET', handleDeleteAsset)
   yield takeEvery('GETROOMS', handleGetHostelRooms)
   yield takeEvery('ASSIGNASSET', handleAssignAsset)
}
export default AssetSaga;