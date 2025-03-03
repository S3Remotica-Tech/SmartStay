import ForgetReducer, { initialState } from "../../Redux/Reducer/ForgetReducer"




describe('It should check forgot reducer', () => {

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message"
        }
        expect(ForgetReducer(initialState, action)).toStrictEqual({
            Pass: '',
            errorMessage: 'error message',
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })


    it('it should check for ERRORPASSWORD', () => {
        const action = {
            type: 'ERRORPASSWORD',
            payload: "error password"
        }
        expect(ForgetReducer(initialState, action)).toStrictEqual({
            Pass: '',
            errorMessage: '',
            errorPassword: 'error password',
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })



    it('it should check for NEWPASSWORD_LIST', () => {
        const action = {
            type: 'NEWPASSWORD_LIST',
            payload: {
                statusCode: 200
            }
        }
        expect(ForgetReducer(initialState, action)).toStrictEqual({
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
            status_codes: 200,
            EmailErrorStatusCode: 0,
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })



    it('it should check for  CLEAR_NEW_PASSWORD_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_NEW_PASSWORD_STATUS_CODE',

        }
        expect(ForgetReducer({ ...initialState, status_codes: 200 }, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })



    it('it should check for  CLEAR_ERROR', () => {
        const action = {
            type: 'CLEAR_ERROR',
            payload: ""

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })


    it('It should check for  OTP_SEND', () => {
        const action = {
            type: 'OTP_SEND',
            payload: {
                statusCode: 200
            }

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            Pass: '',
            errorMessage: '',
            errorPassword: '',
            OTP: '',
            OtpError: '',
            emailError: '',
            statusCode: 200,
            status_Code: 0,
            status_Emai_Error: 0,
            sendEmailError: '',
            sendEmailStatusCode: '',
            status_codes: 0,
            EmailErrorStatusCode: 0,
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })



    it('It should check for   CLEAR_OTP_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_OTP_STATUS_CODE',

        }
        expect(ForgetReducer({ ...initialState, statusCode: 200 }, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })

    it('It should check for   EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: {
                response: "",
                statusCode: 200

            }

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
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
            EmailErrorStatusCode: 200,
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })

    it('It should check for  CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',


        }
        expect(ForgetReducer({ ...initialState, EmailErrorStatusCode: 200 }, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })

    it('It should check for  OTP_ERROR', () => {
        const action = {
            type: 'OTP_ERROR',
            payload: "otp error"


        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            Pass: '',
            errorMessage: '',
            errorPassword: '',
            OTP: '',
            OtpError: 'otp error',
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

        })
    })


    it('It should check for  SEND_EMAIL_ERROR', () => {
        const action = {
            type: 'SEND_EMAIL_ERROR',
            payload: {
                response: '',
                statusCode: 200
            }


        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
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
            sendEmailStatusCode: 200,
            status_codes: 0,
            EmailErrorStatusCode: 0,
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })

    it('It should check for  CLEAR_SEND_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_SEND_EMAIL_ERROR',



        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
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
            sendEmailStatusCode: 0,
            status_codes: 0,
            EmailErrorStatusCode: 0,
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })

    it('It should check for OTPVERIFY_FORGOT_PASSWORD', () => {
        const action = {
            type: 'OTPVERIFY_FORGOT_PASSWORD',
            payload: {
                statusCode: 200
            }



        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 200,
            otpInvalidError: '',

        })
    })


    it('It should check for REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE', () => {
        const action = {
            type: 'REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE',
                   }
        expect(ForgetReducer({ ...initialState,statusCodeForgotOtp : 200}, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })



    it('It should check for OTP_INVALID_ERROR', () => {
        const action = {
            type: 'OTP_INVALID_ERROR',
            payload : "otp is invalid"
                   }
        expect(ForgetReducer({ ...initialState}, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: 'otp is invalid',

        })
    })

    


    it('It should check for CLEAR_OTP_INVALID_ERROR', () => {
        const action = {
            type: 'CLEAR_OTP_INVALID_ERROR',
            payload : ""
                   }
        expect(ForgetReducer({ ...initialState}, action)).toStrictEqual({
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
            otpVerify: '',
            statusCodeForgotOtp: 0,
            otpInvalidError: '',

        })
    })
















































})