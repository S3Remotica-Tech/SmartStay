import AxiosConfig from "../../WebService/AxiosConfig";


export async function login(EmailId,Password){
   console.log("Email",EmailId)
   console.log("password", Password)
    return await AxiosConfig.get('/login/login', {
      params: EmailId,Password
    })
  }


  // params= {EmailId: EmailId, password: password}

  // params = {EmailId, password}

  