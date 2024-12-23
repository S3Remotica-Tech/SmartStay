
import AxiosConfig from "../../WebService/AxiosConfig"


export async function GetAsset(asset) {
  console.log("action asset @@@", asset)
  return await AxiosConfig.post('/all_assets',asset,{
    data:asset
      })
}


export async function AddAsset(asset) {
 
    return await AxiosConfig.post('/add_asset',asset,{
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