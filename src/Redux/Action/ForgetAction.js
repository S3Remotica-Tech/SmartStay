import AxiosConfig from "../../WebService/AxiosConfig"
import axios from 'axios'

import ConfigV1 from '../../WebService/ConfigV1';



export  function forgetpage(datum) {
   new Promise((resolve, reject) => {
  resolve({status: 200});
})
  }
 
export  function registerStudent(params) {
    
    new Promise((resolve, reject) => {
  resolve({status: 200});
})
 }
   
 export  function otpSend(datum) {
 new Promise((resolve, reject) => {
  resolve({status: 200});
})
}

// export async function otpVerify(datum) {
//   console.log("datum for otp",datum)
// return await AxiosConfig.post('/otp-verify/otp', datum,{
//     data:datum
// })
// }


export function OTPverificationForForgotPassword(datum) {
    new Promise((resolve, reject) => {
  resolve({status: 200});
})
   } 