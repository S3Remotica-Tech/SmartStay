import ConfigV2 from "../../WebService/ConfigV2";
import axios from "axios";

export async function forgetpage(verify) {
   return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/reset-password`, verify);
}

export function registerStudent() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}

export async function otpSend(emailId) {
  return await axios.get(
    `${ConfigV2.apiBaseUrl}/v2/users/request-otp/${emailId}`,
  );
}

export async function OTPverificationForForgotPassword(verify) {
  return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/verify-otp`, verify);
}
