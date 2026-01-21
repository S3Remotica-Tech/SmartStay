import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

export async function getReportsDetails(hostelId) {
  return await AxiosConfigV2.get(`/v2/reports/${hostelId}`)
}