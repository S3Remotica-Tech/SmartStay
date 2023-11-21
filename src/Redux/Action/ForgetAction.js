import AxiosConfig from "../../WebService/AxiosConfig"






export async function forgetpage(datum) {
    console.log("datum")
    return await AxiosConfig.post('/forget/select-list', datum,{
         data:datum
    })
  }
  
export async function registerStudent(params) {
    
     return await AxiosConfig.get('/register/get-list', {
         params: params
     })
 }
   
 