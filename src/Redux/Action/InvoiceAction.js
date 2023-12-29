import AxiosConfig from "../../WebService/AxiosConfig"


export async function invoicelist() {
    return await AxiosConfig.get('/invoice/invoice-list',{
    })
  }
 
export async function invoiceList() {
  return await AxiosConfig.get('/list/invoice-list',{
  })
}

export async function addInvoice(datum) {
  return await AxiosConfig.post('/add/invoice-add',datum,{
    data:datum
  })
}