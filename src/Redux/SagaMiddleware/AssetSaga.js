import { takeEvery, call, put } from "redux-saga/effects";
import {GetAsset, AddAsset} from "../Action/AssetAction"
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
         text: "To Create a Asset is Successfully!",
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
  }
export default AssetSaga;