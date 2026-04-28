export const initialState = {
    Pass: '',
    errorMessage: '',
    errorPassword: '',
    OTP: '',
    forgotPasswordError: '',
    emailError: '',
    statusCode: 0,
    status_Code: 0,
    status_Emai_Error: 0,
    sendEmailError: '',
    sendEmailStatusCode: '',
    status_codes: 0,
    EmailErrorStatusCode: 0,
    otpVerify: '',
    statusCodeForgotOtp: 0,
    otpInvalidError: '',
    userId: "",
    Otp : ""
}

const ForgetReducer = (state = initialState, action) => {


    switch (action.type) {

        case 'RESET_ALL':
            return initialState;
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'ERRORPASSWORD':
            return { ...state, errorPassword: action.payload }

        case 'NEWPASSWORD_LIST':
            return {
                ...state,
                status_codes: action.payload.statusCode
            }
        case 'CLEAR_NEW_PASSWORD_STATUS_CODE':
            return { ...state, status_codes: 0 }
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' }
        case 'OTP_SEND':
            return {
                ...state,
                statusCode: action.payload.statusCode,
                userId: action.payload.userId
            }
        case 'CLEAR_OTP_STATUS_CODE':
            return { ...state, statusCode: 0 }
        case 'EMAIL_ERROR':
            return { ...state, emailError: action.payload }
        case 'CLEAR_EMAIL_ERROR':
            return { ...state, emailError: "" }
        case 'FORGOT_CHANGE_ERROR':
            return { ...state, forgotPasswordError: action.payload }

case 'REMOVE_FORGOT_CHANGE_ERROR':
            return { ...state, forgotPasswordError:  }


        case 'SEND_EMAIL_ERROR':
            return { ...state, sendEmailError: action.payload}
        case 'CLEAR_SEND_EMAIL_ERROR':
            return { ...state, sendEmailError: "" }
        case 'OTPVERIFY_FORGOT_PASSWORD':
            return {
                ...state,
                statusCodeForgotOtp: action.payload.statusCode,
                Otp: action.payload.Otp
            }
        case 'REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE':
            return { ...state, statusCodeForgotOtp: 0,  }
        case 'OTP_INVALID_ERROR':
            return { ...state, otpInvalidError: action.payload }
        case 'CLEAR_OTP_INVALID_ERROR':
            return { ...state, otpInvalidError: '' }

        default:
            return state;
    }


}


export default ForgetReducer;