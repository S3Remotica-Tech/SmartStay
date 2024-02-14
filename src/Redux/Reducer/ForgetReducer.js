const initialState = {
    Pass: '',
    errorMessage: '',
    errorPassword: '',
    OTP: '',
    OtpError: '',
    emailError:'',
}

const ForgetReducer = (state = initialState, action) => {

    switch (action.type) {


        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'ERRORPASSWORD':
            return { ...state, errorPassword: action.payload }

        case 'NEWPASSWORD_LIST':
            return { ...state, Pass: action.payload }
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' }

        case 'OTP_SEND':
            return { ...state, OTP: action.payload }
            case 'EMAIL_ERROR':
                return {...state, emailError:action.payload }
        case 'OTP_ERROR':
            return { ...state, OtpError: action.payload }
    }

    return state;
}


export default ForgetReducer;