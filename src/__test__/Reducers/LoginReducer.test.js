import SmartStayReducer, { initialState } from "../../Redux/Reducer/smartStayReducer"

describe('it should check login reducers', () => {

    it('it should check for STORE_HOSTEL_DATA', () => {
        const action = {
            type: 'STORE_HOSTEL_DATA',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            selectedHostel_Id: 1,
        })
    })



    it('it should check for  CLEAR_HOSTEL_DATA', () => {
        const action = {
            type: 'CLEAR_HOSTEL_DATA',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            selectedHostel_Id: "",
        })
    })


    it('it should check for SETTINGS_STORE_HOSTEL_DATA', () => {
        const action = {
            type: 'SETTINGS_STORE_HOSTEL_DATA',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            Settings_Hostel_Id: 1,
        })
    })


    it('it should check for TERMS_CONDITION', () => {
        const action = {
            type: 'TERMS_CONDITION',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            IsVisible: 1,
        })
    })

    it('it should check for PRIVACY_POLICY', () => {
        const action = {
            type: 'PRIVACY_POLICY',
            payload: 2

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            IsVisible: 2,
        })
    })


    it('it should check for CONTACT_US', () => {
        const action = {
            type: 'CONTACT_US',
            payload: 3

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            IsVisible: 3,
        })
    })




    it('it should check for COOKIES_FOOTER', () => {
        const action = {
            type: 'COOKIES_FOOTER',
            payload: 4

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            IsVisible: 4,
        })
    })





    it('it should check for   CLOSE_TERMS_PRIVACY', () => {
        const action = {
            type: 'CLOSE_TERMS_PRIVACY',
            payload: null

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            IsVisible: null,
        })
    })


    it('it should check for   ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message displayed"

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessage: 'error message displayed',
        })
    })

    it('it should check for LOGIN-INFO', () => {
        const action = {
            type: 'LOGIN-INFO',
            payload: {
                response: {
                    Data: [],
                    email_Id: 'test@gmail.com',
                    password: '@123',
                    token: 'huhuhbbhdbh',

                },
                statusCode: 200


            }
        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            email_Id: 'test@gmail.com',
            password: '@123',
            statusCode: 200,
            JWTtoken: 'huhuhbbhdbh',
        })
    })


    it('it should check for CLEAR_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_STATUSCODE',

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCode: 0,
                   })
    })



    it('it should check for ERROR_EMAIL', () => {
        const action = {
            type: 'ERROR_EMAIL',
            payload: {
                 response: "enter valid email",
            statusCode: 200
            }

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
           ...initialState,
            errorEmail: 'enter valid email',
            errorStatusCode: 200

                  })
    })


    it('it should check for CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
          ...initialState,
            errorEmail: '',
                   })
    })


    it('it should check for ERROR_PASSWORD', () => {
        const action = {
            type: 'ERROR_PASSWORD',
            payload: {
                response: "enter valid password",
            statusCode: 200
            }

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
           ...initialState,
            errorPassword: 'enter valid password',
            errorPasswordStatusCode: 200,
                 })
    })

    it('it should check for CLEAR_PASSWORD_ERROR', () => {
        const action = {
            type: 'CLEAR_PASSWORD_ERROR',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorPassword: '',
                   })
    })


    it('it should check for LOGIN-SUCCESS', () => {
        const action = {
            type: 'LOGIN-SUCCESS',


        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isLoggedIn: true,
           
        })
    })


    it('it should check for LOG_OUT', () => {
        const action = {
            type: 'LOG_OUT',


        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isLoggedIn: false,
            selectedHostel_Id: null
                   })
    })




    it('it should check for OTP_SUCCESS', () => {
        const action = {
            type: 'OTP_SUCCESS',
            payload: {
                response: {
                    Data: []
                },
                statusCode: 200
            }


        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            ...initialState,
            loginInformation: [],
            otpSuccessStatusCode: 200,
            
        })
    })



    it('it should check for CLEAR_OTP_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_OTP_STATUSCODE',

        }
        expect(SmartStayReducer({ ...initialState, otpSuccessStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            otpSuccessStatusCode: 0,
                   })
    })


    it('it should check for OTP_VERIFY', () => {
        const action = {
            type: 'OTP_VERIFY',
            payload: {
                response: {
                    Data: [],
                    token: 'token',

                },
                statusCode: 200


            }

        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            sendOtpValue: [],
            OtpVerifyStatusCode: 200,
            JWTtoken: 'token',
                   })
    })


    it('it should check for CLEAR_OTP_VERIFIED', () => {
        const action = {
            type: 'CLEAR_OTP_VERIFIED',


        }
        expect(SmartStayReducer({ ...initialState, OtpVerifyStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            OtpVerifyStatusCode: 0,
                   })
    })



    it('it should check for ALL_NOTIFICATION_LIST', () => {
        const action = {
            type: 'ALL_NOTIFICATION_LIST',
            payload: []


        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            Notification: [],
                   })
    })




    it('it should check for UPDATE_NOTIFICATION', () => {
        const action = {
            type: 'UPDATE_NOTIFICATION',
            payload: {
                response: 'some notification'
            }


        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UpdateNotificationMessage: 'some notification',
                   })
    })


    it('it should check for AFTER_UPDATE_NOTIFICATION', () => {
        const action = {
            type: 'AFTER_UPDATE_NOTIFICATION',
            message: 'some notification'
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            UpdateNotificationMessage: 'some notification',
        })
    })

    it('it should check for ERROR_OTP_CODE', () => {
        const action = {
            type: 'ERROR_OTP_CODE',
            payload: 'error for otp code'
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            twoStepOtpError: 'error for otp code',
                    })
    })


    it('it should check for CLEAR_ERROR_OTP_CODE', () => {
        const action = {
            type: 'CLEAR_ERROR_OTP_CODE',
            payload: ''
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            twoStepOtpError: '',
                    })
    })

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',
           

        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
                   })

    })
})