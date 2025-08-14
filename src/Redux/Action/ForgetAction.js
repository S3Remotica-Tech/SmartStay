import AxiosConfig from "../../WebService/AxiosConfig"
import axios from 'axios'

import ConfigV1 from '../../WebService/ConfigV1';



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
  return await AxiosConfig.post('/otp-send/send-mail', datum ,{
       data:datum
  })
}

// export async function otpVerify(datum) {
//   console.log("datum for otp",datum)
// return await AxiosConfig.post('/otp-verify/otp', datum,{
//     data:datum
// })
// }


export async function OTPverificationForForgotPassword(datum) {
     return await axios.post(`${ConfigV1.apiBaseUrl}/forgot_otp_response`,datum, {
       data: datum
     })
   } 