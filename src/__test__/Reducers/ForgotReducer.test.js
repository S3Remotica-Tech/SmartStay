import ForgetReducer, { initialState } from "../../Redux/Reducer/ForgetReducer"




describe('It should check forgot reducer', () => {



    it('it should check for RESET_ALL', () => {

        const modifyState = {
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
        }
        const action = {
            type: 'RESET_ALL',

        }
        const result = ForgetReducer(modifyState, action);
        expect(result).toStrictEqual(initialState);
    })

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message"
        }
        expect(ForgetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessage: 'error message',
        })
    })


    it('it should check for ERRORPASSWORD', () => {
        const action = {
            type: 'ERRORPASSWORD',
            payload: "error password"
        }
        expect(ForgetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorPassword: 'error password',
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
            ...initialState,
            status_codes: 200,
        })
    })



    it('it should check for  CLEAR_NEW_PASSWORD_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_NEW_PASSWORD_STATUS_CODE',

        }
        expect(ForgetReducer({ ...initialState, status_codes: 200 }, action)).toStrictEqual({
            ...initialState,
            status_codes: 0,
        })
    })



    it('it should check for  CLEAR_ERROR', () => {
        const action = {
            type: 'CLEAR_ERROR',
            payload: ""

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            errorMessage: '',

        })
    })


    it('It should check for  OTP_SEND', () => {
        const action = {
            type: 'OTP_SEND',
            payload: {
                statusCode: 200,
                userId: 'user-1'
            }

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCode: 200,
            userId: 'user-1',
        })
    })



    it('It should check for   CLEAR_OTP_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_OTP_STATUS_CODE',

        }
        expect(ForgetReducer({ ...initialState, statusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCode: 0,
        })
    })

    it('It should check for   EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: "email error"
        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            emailError: 'email error',
        })
    })

    it('It should check for  CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',


        }
        expect(ForgetReducer({ ...initialState, emailError: 'email error' }, action)).toStrictEqual({
            ...initialState,
            emailError: '',
        })
    })

    it('It should check for  FORGOT_CHANGE_ERROR and REMOVE_FORGOT_CHANGE_ERROR', () => {
        const withError = ForgetReducer({ ...initialState }, { type: 'FORGOT_CHANGE_ERROR', payload: 'change error' })
        expect(withError).toStrictEqual({ ...initialState, forgotPasswordError: 'change error' })
        expect(ForgetReducer(withError, { type: 'REMOVE_FORGOT_CHANGE_ERROR' })).toStrictEqual({ ...initialState })
    })


    it('It should check for  SEND_EMAIL_ERROR', () => {
        const action = {
            type: 'SEND_EMAIL_ERROR',
            payload: 'send email error'
        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            sendEmailError: 'send email error',
        })
    })

    it('It should check for  CLEAR_SEND_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_SEND_EMAIL_ERROR',



        }
        expect(ForgetReducer({ ...initialState, sendEmailError: 'send email error' }, action)).toStrictEqual({
            ...initialState,
            sendEmailError: '',

        })
    })

    it('It should check for OTPVERIFY_FORGOT_PASSWORD', () => {
        const action = {
            type: 'OTPVERIFY_FORGOT_PASSWORD',
            payload: {
                statusCode: 200,
                Otp: '1234'
            }
        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForgotOtp: 200,
            Otp: '1234',

        })
    })


    it('It should check for REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE', () => {
        const action = {
            type: 'REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE',
        }
        expect(ForgetReducer({ ...initialState, statusCodeForgotOtp: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForgotOtp: 0,

        })
    })



    it('It should check for OTP_INVALID_ERROR', () => {
        const action = {
            type: 'OTP_INVALID_ERROR',
            payload: "otp is invalid"
        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            otpInvalidError: 'otp is invalid',

        })
    })




    it('It should check for CLEAR_OTP_INVALID_ERROR', () => {
        const action = {
            type: 'CLEAR_OTP_INVALID_ERROR',
            payload: ""
        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            otpInvalidError: '',

        })
    })


    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })



})