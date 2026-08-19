import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
import ConfigV2 from "../../WebService/ConfigV2";
import axios from "axios";

export function login() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function loginV2(loginInfo) {
  return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/login`, loginInfo, {
    data: loginInfo,
  });
}

export function CreateAccountAction() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function Addaccount(datum) {
  return await AxiosConfigV2.post("/v2/users", datum, {
    data: datum,
  });
}

export async function UpdateProfile(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.payloads) {
    const payloadBlob = new Blob([JSON.stringify(params.payloads)], {
      type: "application/json",
    });
    formData.append("payloads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.put("/v2/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 100000000,
    });
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

export async function UpdatePassword(datum) {
  return await AxiosConfigV2.post(`/v2/profile/reset-password`, datum);
}

export function TwoStepVerification() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function AccountDetails() {
  return await AxiosConfigV2.get("/v2/profile");
}

export async function OTPverification(datum) {
  return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/verify-otp`, datum, {
    data: datum,
  });
}

export async function GetAllNotification(hostelId) {
  return await AxiosConfigV2.get(`/v2/notification/${hostelId}`);
}

export async function ReadNotification(hostelId) {
  return await AxiosConfigV2.put(`/v2/notification/read/${hostelId}`);
}

export async function FCM_Token(token) {
  return await AxiosConfigV2.put("/v2/profile/fcm", token, {
    data: token,
  });
}

export async function LogoutAdmin(logout) {
  return await AxiosConfigV2.post("/v2/profile/logout", logout, {
    data: logout,
  });
}

export async function demoRequest(demo) {
  return await axios.post(`${ConfigV2.apiBaseUrl}/v2/demo/request`, demo, {
    data: demo,
  });
}

export const StoreSelectedHostelAction = (data) => {
  return {
    type: "STORE_HOSTEL_DATA",
    payload: data,
  };
};

export const SettingsStoreSelectedHostelAction = (data) => {
  return {
    type: "SETTINGS_STORE_HOSTEL_DATA",
    payload: data,
  };
};

export const setPlanStatus = (planStatus) => ({
  type: "SET_PLAN_STATUS",
  payload: planStatus,
});

export const JoininDatecustomer = (joiningdate) => ({
  type: "SET_JOINING_DATE",
  payload: joiningdate,
});

export const checkoutCustomerProfile = (checoutprofile) => ({
  type: "SET_CHECKOUT_PROFILE",
  payload: checoutprofile,
});

export const triggerPG = (pg) => ({
  type: "TRIGGER_PG",
  payload: pg,
});

export const clickedBedForChange = (bed) => ({
  type: "SET_CLICKED_BED",
  payload: bed,
});

export const changeBedForChange = (bed) => ({
  type: "SET_CHANGE_CLICKED_BED",
  payload: bed,
});

export const setPaymentHtml = (html) => ({
  type: "SET_PAYMENT_HTML",
  payload: html,
});

export const saveResponseHostel = (data) => {
  return {
    type: "SAVE_RESPONSE_HOSTEL",
    payload: data,
  };
};
