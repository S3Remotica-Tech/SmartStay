const initialState = {
    Pass: '',
    errorMessage: '',
    errorPassword: '',
    OTP: '',
    OtpError: '',
    emailError: '',
    statusCode: 0,
    status_Code: 0,
    status_Emai_Error: 0,
    sendEmailError: '',
    sendEmailStatusCode: '',
    status_codes: 0,
    EmailErrorStatusCode: 0,
}

const ForgetReducer = (state = initialState, action) => {


    switch (action.type) {


        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'ERRORPASSWORD':
            return { ...state, errorPassword: action.payload }

        case 'NEWPASSWORD_LIST':
            return { ...state, Pass: action.payload, status_codes: action.payload.statusCode }
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' }
        case 'OTP_SEND':
            return { ...state, OTP: action.payload, statusCode: action.payload.statusCode }
        case 'CLEAR_OTP_STATUS_CODE':
            return { ...state, statusCode: 0 }
        case 'EMAIL_ERROR':
            return { ...state, emailError: action.payload, EmailErrorStatusCode: action.payload.statusCode }
        case 'CLEAR_EMAIL_ERROR':
            return { ...state, EmailErrorStatusCode: 0 }
        case 'OTP_ERROR':
            return { ...state, OtpError: action.payload }
        case 'SEND_EMAIL_ERROR':
            return { ...state, sendEmailError: action.payload, sendEmailStatusCode: action.payload.statusCode }
        case 'CLEAR_SEND_EMAIL_ERROR':
            return {...state, sendEmailStatusCode:0}
        // case 'OTP_VERIFY':
        //     return {...state,otpVerify:action.payload,statusCodeForOtp: action.payload.statusCode }
    }

    return state;
}


export default ForgetReducer;