import AxiosConfig from "../../WebService/AxiosConfig";


export async function login(EmailId, Password) {
  return await AxiosConfig.get('/login/login', {
    params: EmailId, Password
  })
}

export async function CreateAccountAction(userList) {
  return await AxiosConfig.post('/create/create-account',userList, {
    data: userList
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