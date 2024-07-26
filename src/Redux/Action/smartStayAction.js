import AxiosConfig from "../../WebService/AxiosConfig";

import axios from 'axios'



export async function login(EmailId, Password) {
  return await axios.get('http://13.126.102.54:1010/login/login', {
    params: EmailId, Password
  })
}

export async function CreateAccountAction(params) {

  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("mobileNo", params.mobileNo);
  formData.append("emailId", params.emailId);
  formData.append("Address", params.Address);
  formData.append("Country", params.Country);
  formData.append("City", params.City);
  formData.append("State", params.State);
  formData.append("id", params.id);
  formData.append("profile", params.profile);
  
  try {
    const response = await AxiosConfig.post('/create/create-account',formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
           onUploadProgress: (event) => {
       
              }
    });
    console.log("response for Api", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
         }

} 

export async function Addaccount (datum) {
  return await AxiosConfig.post('/newaccount/create-account',datum,{
    data:datum
  })
}
  
export async function UpdateProfile (datum) {
  return await AxiosConfig.post('/update_account_details',datum,{
    data:datum
  })
}

export async function UpdatePassword (datum) {
  return await AxiosConfig.post('/forget/select-list ',datum,{
    data:datum
  })
}//update password



export async function TwoStepVerification(datum) {
  return await AxiosConfig.post('/create/isEnable',datum, {
    data: datum
  })
} 

// export async function AccountDetails() {
//   return await AxiosConfig.get('/get/userAccount',{
//   })
// }





export async function AccountDetails(user) {
  // console.log("user",user)
   return await AxiosConfig.post('/get_user_details',user,{
    data:user
   
  })
}

export async function OTPverification(datum) {
  return await axios.post('http://13.126.102.54:1010/otp-send/response',datum, {
    data: datum
  })
} 


export async function GetAllNotification() {
  return await AxiosConfig.get('/all_notifications',{
  })
}


export async function UpdateNotification(message) {
   return await AxiosConfig.post('/update_notification',message,{
    data:message
   
  })
}
// http://localhost:2001