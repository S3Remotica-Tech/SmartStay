import AxiosConfig from "../../WebService/AxiosConfig"


export async function userlist() {
    return await AxiosConfig.get('/users/user-list',{
    })
  }

