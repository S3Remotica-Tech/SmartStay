import AxiosConfig from "../../WebService/AxiosConfig";


export async function login(EmailId, Password) {
  return await AxiosConfig.get('/login/login', {
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
  
export async function TwoStepVerification(datum) {
  return await AxiosConfig.post('/create/isEnable',datum, {
    data: datum
  })
} 

export async function AccountDetails() {
  return await AxiosConfig.get('/get/userAccount',{
  })
}


export async function OTPverification(datum) {
  return await AxiosConfig.post('/otp-send/response',datum, {
    data: datum
  })
} 