import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
import qs from "qs";

export async function createPgList(params) {
  try {
    const formData = new FormData();

    if (params.payloads) {
      const payloadsBlob = new Blob([JSON.stringify(params.payloads)], {
        type: "application/json",
      });
      formData.append("payloads", payloadsBlob);
    }

    if (params.mainImage) {
      formData.append("mainImage", params.mainImage);
    }

    if (params.additionalImages && params.additionalImages.length > 0) {
      params.additionalImages.forEach((img) => {
        if (img) {
          formData.append("additionalImages", img);
        }
      });
    }

    const response = await AxiosConfigV2.post("/v2/hostel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 100000000,
    });

    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function updatePgList(params) {
  try {
    const formData = new FormData();

    if (params.payloads) {
      const payloadsBlob = new Blob([JSON.stringify(params.payloads)], {
        type: "application/json",
      });
      formData.append("payloads", payloadsBlob);
    }

    if (params.mainImage) {
      formData.append("mainImage", params.mainImage);
    }

    if (params.additionalImages && params.additionalImages.length > 0) {
      params.additionalImages.forEach((img) => {
        if (img) {
          formData.append("additionalImages", img);
        }
      });
    } else {
      formData.append("additionalImages", params.additionalImages);
    }

    const response = await AxiosConfigV2.put(
      `/v2/hostel/${params.hostelId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 100000000,
      },
    );

    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export function Checkeblist() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function CreateEbbill() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function EB_Customerlist() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function EB_startmeterlist() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function EB_CustomerListTable() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function createRoom(datum) {
  return await AxiosConfigV2.post("/v2/room", datum, {
    data: datum,
  });
}

export async function getAllRoom(datum) {
  return await AxiosConfigV2.get(`/v2/room/all-rooms/${datum.floor_Id}`);
}

export async function updateRoom(datum) {
  return await AxiosConfigV2.put(
    `/v2/room/${datum.roomId}/${datum.hostelId}`,
    datum,
    {
      data: datum,
    },
  );
}

export function CheckRoomId() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function CheckBedDetails() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function dashboardReports(hostelId) {
  return await AxiosConfigV2.get(`/v2/dashboard/${hostelId}`);
}

export async function dashboardNew(hostelId, filters = {}) {
  return AxiosConfigV2.get(`/v2/dashboard/new/${hostelId}`, {
    params: {
      billingFilter: filters?.billingFilter,
      complaintRequestFilter: filters?.complaintRequestFilter,
      financeFilter: filters?.financeFilter,
      occupancyFilter: filters?.occupancyFilter,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export async function createBed(datum) {
  return await AxiosConfigV2.post("/v2/bed", datum, {
    data: datum,
  });
}

export async function getAllBed(datum) {
  return await AxiosConfigV2.get(`/v2/bed/all-beds/${datum.roomId}`, datum, {
    data: datum,
  });
}

export async function DeleteBed(datum) {
  return await AxiosConfigV2.delete(`/v2/bed/${datum.bedId}`);
}

export function DeletePG() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function UpdateFloor(datum) {
  return await AxiosConfigV2.put(`/v2/floor/${datum.id}`, datum, {
    data: datum,
  });
}

export async function UpdateBed(datum) {
  return await AxiosConfigV2.put(`/v2/bed/${datum.bedId}`, datum, {
    data: datum,
  });
}

export async function OccupiedCustomer(datum) {
  return await AxiosConfigV2.get(`/v2/bed/${datum.bedId}`, datum, {
    data: datum,
  });
}

export async function deleteHostelImages(img) {
  return await AxiosConfigV2.delete(
    `/v2/hostel/${img.hostelId}/additional-images/${img.imageId}`,
  );
}

export function editElectricity() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function deleteElectricity() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function dashboardFilter() {
  return new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function ebHostelBasedRead() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function ebAddHostelReading() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function ebAddHostelEdit() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
export function ebAddHostelDelete() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function announcement_list() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function add_announcement() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function delete_announcement() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function get_comments() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function add_comments() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export function add_sub_comments() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function DeleteHostel(datum) {
  return await AxiosConfigV2.delete(`/v2/hostel/${datum.hostelId}`);
}
