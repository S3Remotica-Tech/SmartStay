 export const initialState = {

   id: 0,
   email_Id: '',
   password: '',
   isLoggedIn: false,
   errorEmail: '',
   errorPassword: '',
   errorMessage: '',
   statusCode: 0,
   loginInformation: [],
   otpSuccessStatusCode: 0,
   sendOtpValue: [],
   OtpVerifyStatusCode: 0,
   JWTtoken: '',
   Notification: [],
   UpdateNotificationMessage: '',
   twoStepOtpError: '',
   selectedHostel_Id: '',
   Settings_Hostel_Id: '',
   IsVisible: null,

}
const SmartStayReducer = (state = initialState, action) => {
   switch (action.type) {
      case "STORE_HOSTEL_DATA":
         return { ...state, selectedHostel_Id: action.payload };
      case "CLEAR_HOSTEL_DATA":
         return { ...state, selectedHostel_Id: '' };

      case "SETTINGS_STORE_HOSTEL_DATA":
         return { ...state, Settings_Hostel_Id: action.payload };

      case "TERMS_CONDITION":
         return { ...state, IsVisible: 1 }
      case "PRIVACY_POLICY":
         return { ...state, IsVisible: 2 }
      case "CONTACT_US":
        
         return { ...state, IsVisible: 3 }
      case "COOKIES_FOOTER":
        
         return { ...state, IsVisible: 4 }
      case "CLOSE_TERMS_PRIVACY":
         return { ...state, IsVisible: null }
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'LOGIN-INFO':
         return { ...state, loginInformation: action.payload.response.Data, email_Id: action.payload.response.email_Id, password: action.payload.response.password, errorEmail: '', errorPassword: '', errorMessage: '', statusCode: action.payload.statusCode, JWTtoken: action.payload.response.token }
      case 'ERROR_EMAIL':
         return { ...state, errorEmail: action.payload }
      case 'ERROR_PASSWORD':
         return { ...state, errorPassword: action.payload }
      case 'CLEAR_EMAIL_ERROR':
         return { ...state, errorEmail: '' }
      case 'CLEAR_PASSWORD_ERROR':
         return { ...state, errorPassword: '' }
      case 'LOGIN-SUCCESS':
         return { ...state, isLoggedIn: true }
      case 'LOG_OUT':
         return { ...state, isLoggedIn: false  , selectedHostel_Id: null}
      case 'CLEAR_STATUSCODE':
         return { ...state, statusCode: 0 }
      case 'OTP_SUCCESS':
         return { ...state, loginInformation: action.payload.response.Data, otpSuccessStatusCode: action.payload.statusCode }
      case 'CLEAR_OTP_STATUSCODE':
         return { ...state, otpSuccessStatusCode: 0 }
      case 'OTP_VERIFY':
         return { ...state, sendOtpValue: action.payload.response.Data, OtpVerifyStatusCode: action.payload.statusCode, JWTtoken: action.payload.response.token }
      case 'CLEAR_OTP_VERIFIED':
         return { ...state, OtpVerifyStatusCode: 0 }
      case 'ALL_NOTIFICATION_LIST':
         return { ...state, Notification: action.payload }
      case 'UPDATE_NOTIFICATION':
         return { ...state, UpdateNotificationMessage: action.payload.response }
      case 'AFTER_UPDATE_NOTIFICATION':
         return { ...state, UpdateNotificationMessage: action.message }

      case 'ERROR_OTP_CODE':
         return { ...state, twoStepOtpError: action.payload }
      case 'CLEAR_ERROR_OTP_CODE':
         return { ...state, twoStepOtpError: '' }

         default:
            return state;
   }

   
}
export default SmartStayReducer;