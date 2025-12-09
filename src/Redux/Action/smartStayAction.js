// import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";
// import ConfigV1 from '../../WebService/ConfigV1';
import ConfigV2 from "../../WebService/ConfigV2";
import axios from 'axios'


// v1

export  function login() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await axios.get(`${ConfigV1.apiBaseUrl}/login/login`, {
  //   params: EmailId, Password
  // })
}


// v2

export async function loginV2(loginInfo) {
    return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/login`,loginInfo, {
   data:loginInfo

  });
}






export  function CreateAccountAction() {
  new Promise((resolve) => {
  resolve({status: 200});
})

  // const formData = new FormData();
  // formData.append("name", params.name);
  // formData.append("mobileNo", params.mobileNo);
  // formData.append("emailId", params.emailId);
  // formData.append("Address", params.Address);
  // formData.append("Country", params.Country);
  // formData.append("City", params.City);
  // formData.append("State", params.State);
  // formData.append("id", params.id);
  // formData.append("profile", params.profile);
  
  // try {
  //   const response = await AxiosConfig.post('/create/create-account',formData, {
  //     headers: {
  //       "Content-type": "multipart/form-data",
  //     },
  //     timeout: 100000000,
          
      
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("Axios Error", error);
  //        }

} 
//  create-account api version 1

// export async function Addaccount (datum) {
//   return await AxiosConfig.post('/newaccount/create-account',datum,{
//     data:datum
//   })
// }


//  create-account api version 2

export async function Addaccount (datum) {
  return await AxiosConfigV2.post('/v2/users',datum,{
    data:datum
  })
}
  
export function UpdateProfile () {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // const formData = new FormData();
  // formData.append("first_name", params.first_name);
  // formData.append("last_name", params.last_name);
  // formData.append("phone", params.phone);
  // formData.append("email_id", params.email_id);
  // formData.append("address", params.address);
  //  formData.append("id", params.id);
  // formData.append("profile", params.profile);
  
  // try {
  //   const response = await AxiosConfig.post('/update_account_details',formData, {
  //     headers: {
  //       "Content-type": "multipart/form-data",
  //     },
  //     timeout: 100000000,
        
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("Axios Error", error);
  //        }

  
}

export  function UpdatePassword () {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post('/forget/select-list ',datum,{
  //   data:datum
  // })
}




export  function TwoStepVerification() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post('/create/isEnable',datum, {
  //   data: datum
  // })
} 

// export async function AccountDetails() {
//   return await AxiosConfig.get('/get/userAccount',{
//   })
// }



// v1

// export async function AccountDetails(user) {
//    return await AxiosConfig.post('/get_user_details',user,{
//     data:user
   
//   })
// }


//v2

export async function AccountDetails() {
   return await AxiosConfigV2.get('/v2/profile')
}


// v1

// export async function OTPverification(datum) {
//   return await axios.post(`${ConfigV1.apiBaseUrl}/otp-send/response`,datum, {
//     data: datum
//   })
// } 


// v2

export async function OTPverification(datum) {
  return await axios.post(`${ConfigV2.apiBaseUrl}/v2/users/verify-otp`,datum, {
    data: datum
  })
} 


export async function GetAllNotification(hostelId) {
 
  return await AxiosConfigV2.get(`/v2/notification/${hostelId}`)
}


export function UpdateNotification() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  //  return await AxiosConfig.post('/update_notification',message,{
  //   data:message
   
  // })
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


export const  triggerPG = (pg) => ({
  type: "TRIGGER_PG",
  payload: pg,
});



export const  clickedBedForChange = (bed) => ({
  type: "SET_CLICKED_BED",
  payload: bed,
});


export const  changeBedForChange = (bed) => ({
  type: "SET_CHANGE_CLICKED_BED",
  payload: bed,
});

export const setPaymentHtml = (html) => ({
  type: "SET_PAYMENT_HTML",
  payload: html,
});
