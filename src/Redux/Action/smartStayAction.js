import AxiosConfig from "../../WebService/AxiosConfig";


export async function login(email_Id,password){
   
    return await AxiosConfig.get('/login/login', {
      params:  email_Id , password
    })
  }

