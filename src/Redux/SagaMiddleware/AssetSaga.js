import { takeEvery, call, put } from "redux-saga/effects";
import {GetAsset, AddAsset,  DeleteAssetList, getHostelRooms, AssignAsset} from "../Action/AssetAction"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';




function* handleGetAsset() {
   const response = yield call (GetAsset);
   console.log("response for get",response.status)
   if (response.status === 200){
      yield put ({type : 'ASSET_LIST' , payload:{response:response.data.assets, statusCode:response.status}})


   }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
}


function* handleAddAsset(action) {
    const response = yield call (AddAsset, action.payload);
  console.log("response add",response.status)
     if (response.status === 200){
       yield put ({type : 'ADD_ASSET' , payload:{response:response.data.assets, statusCode:response.status}})
       Swal.fire({
         text: `${response.data.message}`,
         icon: "success",
         timer: 1000,
     });

    }
    else {
       yield put ({type:'ERROR', payload:response.data.message})
    }
    if(response){
       refreshToken(response)
    }
 }


 function* handleDeleteAsset(action) {
   const response = yield call (DeleteAssetList,action.payload);
 console.log(" response", response)
   if (response.status === 200){
      yield put ({type : 'DELETE_ASSET' , payload:{response:response.data, statusCode:response.status}})
        }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
  
}



function* handleGetHostelRooms(action) {
   const response = yield call (getHostelRooms,action.payload);
 console.log(" response", response)
   if (response.status === 200){
      yield put ({type : 'GET_ROOMS' , payload:{response:response.data.data, statusCode:response.status}})
        }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
  
}

function* handleAssignAsset(action) {
   const response = yield call (AssignAsset,action.payload);
 console.log(" response", response)
   if (response.status === 200){
      yield put ({type : 'ASSIGN_ASSET' , payload:{response:response.data, statusCode:response.status}})
      Swal.fire({
         text: `${response.data.message}`,
         icon: "success",
         timer: 1000,
     });

        }
   else {
      yield put ({type:'ERROR', payload:response.data.message})
   }
   if(response){
      refreshToken(response)
   }
  
}












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





function* AssetSaga() {
    yield takeEvery('ASSETLIST', handleGetAsset)
    yield takeEvery('ADDASSET',handleAddAsset)
    yield takeEvery('DELETEASSET',handleDeleteAsset)
    yield takeEvery('GETROOMS',handleGetHostelRooms)
    yield takeEvery('ASSIGNASSET',handleAssignAsset)
  }
export default AssetSaga;