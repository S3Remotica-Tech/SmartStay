
// import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
// V1
// export async function GetAsset(asset) {
//   return await AxiosConfig.post('/all_assets',asset,{
//     data:asset
//       })
// }

// V2

export async function GetAsset(hostelId) {
  return await AxiosConfigV2.get(`/v2/assets/${hostelId}`);
}
// /v2/assets/all-assets/{hostelId}  ==> v2/assets/{hostelId}

export async function getRoleBasedPermission(roleId) {
  return await AxiosConfigV2.get(`/v2/role/${roleId}`);
}



// v1

// export async function AddAsset(asset) {
 
//     return await AxiosConfig.post('/add_asset',asset,{
//         data:asset
//         })
//   }


  // v2

  export async function AddAsset(asset) {
     return await AxiosConfigV2.post(`/v2/assets/${asset.hostelId}`,asset,{
        data:asset
        })
  }
  
// v2

export async function updateAsset(asset) {
     return await AxiosConfigV2.put(`/v2/assets/${asset.hostelId}/${asset.assetId}`,asset,{
        data:asset
        })
  }



// v1

  // export async function DeleteAssetList(asset) {
  //   return await AxiosConfig.post('/remove_asset', asset, {
  //     data: asset
  //   })
  // } 

  // v2

  export async function DeleteAssetList(asset) {
    return await AxiosConfigV2.delete(`/v2/assets/${asset.assetId}`)
  } 

  
  export function getHostelRooms(room) {
     new Promise((resolve, reject) => {
  resolve({status: 200});
})
  } 

 
  export async function AssignAsset(asset) {
    return await AxiosConfigV2.put(`/v2/assets/assign/${asset.assetId}`,asset, {
      data:asset
    })
  } 

   