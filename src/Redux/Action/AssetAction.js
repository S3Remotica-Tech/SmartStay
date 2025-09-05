
import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
// V1
// export async function GetAsset(asset) {
//   return await AxiosConfig.post('/all_assets',asset,{
//     data:asset
//       })
// }

// V2

export async function GetAsset(hostelId) {
  return await AxiosConfigV2.get(`/v2/assets/all-assets/${hostelId}`);
}


// v1

// export async function AddAsset(asset) {
 
//     return await AxiosConfig.post('/add_asset',asset,{
//         data:asset
//         })
//   }


  // v2

  export async function AddAsset(asset) {
     return await AxiosConfigV2.post('/v2/assets/add-assets',asset,{
        data:asset
        })
  }
  
// v2

export async function updateAsset(asset) {
     return await AxiosConfigV2.put(`/v2/assets/${asset.assetId}`,asset,{
        data:asset
        })
  }





  export async function DeleteAssetList(asset) {
    return await AxiosConfig.post('/remove_asset', asset, {
      data: asset
    })
  } 

  
  export async function getHostelRooms(room) {
    return await AxiosConfig.post('/list/rooms-list',room, {
      data:room
    })
  } 

  

  export async function AssignAsset(asset) {
    return await AxiosConfig.post('/assign_asset',asset, {
      data:asset
    })
  } 