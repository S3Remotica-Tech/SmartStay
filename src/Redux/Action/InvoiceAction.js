import AxiosConfig from "../../WebService/AxiosConfig"


export async function invoicelist() {
    return await AxiosConfig.get('/invoice/invoice-list',{
    })
  }