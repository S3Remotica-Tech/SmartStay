import AxiosConfig from "../../WebService/AxiosConfig"




export async function createPgList(datum){
    return await AxiosConfig.post('/add/new-hostel',datum,{
      data:datum
    })
  }