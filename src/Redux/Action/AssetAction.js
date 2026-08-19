import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


export async function GetAsset(hostelId) {
  return await AxiosConfigV2.get(`/v2/assets/${hostelId}`);
}

export async function GetAllVendorList(vendor) {
  return await AxiosConfigV2.get(`/v2/vendors/hostel/${vendor.hostelId}/vendors`);
}


export async function getRoleBasedPermission(roleId) {
  return await AxiosConfigV2.get(`/v2/role/${roleId}`);
}




export async function AddAsset(asset) {
  return await AxiosConfigV2.post(`/v2/assets/${asset.hostelId}`, asset, {
    data: asset,
  });
}



export async function updateAsset(asset) {
  return await AxiosConfigV2.put(
    `/v2/assets/${asset.hostelId}/${asset.assetId}`,
    asset,
    {
      data: asset,
    },
  );
}



export async function DeleteAssetList(asset) {
  return await AxiosConfigV2.delete(`/v2/assets/${asset.assetId}`);
}

export function getHostelRooms() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function AssignAsset(asset) {
  return await AxiosConfigV2.put(`/v2/assets/assign/${asset.assetId}`, asset, {
    data: asset,
  });
}
