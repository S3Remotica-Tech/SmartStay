import ForgetReducer, { initialState } from "../../Redux/Reducer/ForgetReducer"




describe('It should check forgot reducer', () => {

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
                statusCode: 200
            }

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCode: 200,
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
            payload: {
                response: "",
                statusCode: 201

            }

        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            emailError: '',
            EmailErrorStatusCode: 201,

        })
    })

    it('It should check for  CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',


        }
        expect(ForgetReducer({ ...initialState, EmailErrorStatusCode: 201 }, action)).toStrictEqual({
            ...initialState,
            EmailErrorStatusCode: 0,
                    })
    })

    it('It should check for  OTP_ERROR', () => {
        const action = {
            type: 'OTP_ERROR',
            payload: "otp error"


        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            OtpError: 'otp error',
           
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
            ...initialState,
            sendEmailError: '',
            sendEmailStatusCode: 200,
           
        })
    })

    it('It should check for  CLEAR_SEND_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_SEND_EMAIL_ERROR',



        }
        expect(ForgetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            sendEmailStatusCode: 0,
         
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
            ...initialState,
            statusCodeForgotOtp: 200,
            
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
















































})