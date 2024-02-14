import AxiosConfig from "../../WebService/AxiosConfig"






export async function forgetpage(datum) {
    return await AxiosConfig.post('/forget/select-list', datum,{
         data:datum
    })
  }
 
export async function registerStudent(params) {
    
     return await AxiosConfig.get('/register/get-list', {
         params: params
     })
 }
   
 export async function otpSend(datum) {
     console.log("datum for otp",datum)
  return await AxiosConfig.post('/otp-send/send-mail', datum,{
       data:datum
  })
}

 