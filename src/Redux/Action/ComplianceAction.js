import AxiosConfig from "../../WebService/AxiosConfig"


export async function compliance() {
    return await AxiosConfig.get('/compliance/compliance-list',{
    })
  }