import SmartStayReducer, { initialState } from "../../Redux/Reducer/smartStayReducer"

describe('it should check login reducers', () => {

    it('it should check for STORE_HOSTEL_DATA', () => {
        const action = {
            type: 'STORE_HOSTEL_DATA',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: 1,
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })



    it('it should check for  CLEAR_HOSTEL_DATA', () => {
        const action = {
            type: 'CLEAR_HOSTEL_DATA',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for SETTINGS_STORE_HOSTEL_DATA', () => {
        const action = {
            type: 'SETTINGS_STORE_HOSTEL_DATA',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: 1,
            IsVisible: null,
        })
    })


    it('it should check for TERMS_CONDITION', () => {
        const action = {
            type: 'TERMS_CONDITION',
            payload: 1

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: 1,
        })
    })

    it('it should check for PRIVACY_POLICY', () => {
        const action = {
            type: 'PRIVACY_POLICY',
            payload: 2

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: 2,
        })
    })


    it('it should check for CONTACT_US', () => {
        const action = {
            type: 'CONTACT_US',
            payload: 3

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: 3,
        })
    })




    it('it should check for COOKIES_FOOTER', () => {
        const action = {
            type: 'COOKIES_FOOTER',
            payload: 4

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: 4,
        })
    })





    it('it should check for   CLOSE_TERMS_PRIVACY', () => {
        const action = {
            type: 'CLOSE_TERMS_PRIVACY',
            payload: null

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for   ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message displayed"

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            id: 0,
            email_Id: '',
            password: '',
            isLoggedIn: false,
            errorEmail: '',
            errorPassword: '',
            errorMessage: 'error message displayed',
            statusCode: 0,
            loginInformation: [],
            otpSuccessStatusCode: 0,
            sendOtpValue: [],
            OtpVerifyStatusCode: 0,
            JWTtoken: '',
            Notification: [],
            UpdateNotificationMessage: '',
            twoStepOtpError: '',
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
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
            id: 0,
            email_Id: 'test@gmail.com',
            password: '@123',
            isLoggedIn: false,
            errorEmail: '',
            errorPassword: '',
            errorMessage: '',
            statusCode: 200,
            loginInformation: [],
            otpSuccessStatusCode: 0,
            sendOtpValue: [],
            OtpVerifyStatusCode: 0,
            JWTtoken: 'huhuhbbhdbh',
            Notification: [],
            UpdateNotificationMessage: '',
            twoStepOtpError: '',
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for CLEAR_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_STATUSCODE',

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })



    it('it should check for ERROR_EMAIL', () => {
        const action = {
            type: 'ERROR_EMAIL',
            payload: "enter valid email"

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            id: 0,
            email_Id: '',
            password: '',
            isLoggedIn: false,
            errorEmail: 'enter valid email',
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for ERROR_PASSWORD', () => {
        const action = {
            type: 'ERROR_PASSWORD',
            payload: "enter valid password"

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            id: 0,
            email_Id: '',
            password: '',
            isLoggedIn: false,
            errorEmail: '',
            errorPassword: 'enter valid password',
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })

    it('it should check for CLEAR_PASSWORD_ERROR', () => {
        const action = {
            type: 'CLEAR_PASSWORD_ERROR',
            payload: ""

        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for LOGIN-SUCCESS', () => {
        const action = {
            type: 'LOGIN-SUCCESS',


        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
            id: 0,
            email_Id: '',
            password: '',
            isLoggedIn: true,
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
            selectedHostel_Id: "",
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for LOG_OUT', () => {
        const action = {
            type: 'LOG_OUT',


        }
        expect(SmartStayReducer(initialState, action)).toStrictEqual({
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
            selectedHostel_Id: null,
            Settings_Hostel_Id: '',
            IsVisible: null,
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
            id: 0,
            email_Id: '',
            password: '',
            isLoggedIn: false,
            errorEmail: '',
            errorPassword: '',
            errorMessage: '',
            statusCode: 0,
            loginInformation: [],
            otpSuccessStatusCode: 200,
            sendOtpValue: [],
            OtpVerifyStatusCode: 0,
            JWTtoken: '',
            Notification: [],
            UpdateNotificationMessage: '',
            twoStepOtpError: '',
            selectedHostel_Id: '',
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })



    it('it should check for CLEAR_OTP_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_OTP_STATUSCODE',

        }
        expect(SmartStayReducer({ ...initialState, otpSuccessStatusCode: 200 }, action)).toStrictEqual({
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
            OtpVerifyStatusCode: 200,
            JWTtoken: 'token',
            Notification: [],
            UpdateNotificationMessage: '',
            twoStepOtpError: '',
            selectedHostel_Id: '',
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for CLEAR_OTP_VERIFIED', () => {
        const action = {
            type: 'CLEAR_OTP_VERIFIED',


        }
        expect(SmartStayReducer({ ...initialState, OtpVerifyStatusCode: 200 }, action)).toStrictEqual({
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
        })
    })



    it('it should check for ALL_NOTIFICATION_LIST', () => {
        const action = {
            type: 'ALL_NOTIFICATION_LIST',
            payload: []


        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
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
            UpdateNotificationMessage: 'some notification',
            twoStepOtpError: '',
            selectedHostel_Id: '',
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for AFTER_UPDATE_NOTIFICATION', () => {
        const action = {
            type: 'AFTER_UPDATE_NOTIFICATION',
            message: 'some notification'
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
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
            UpdateNotificationMessage: 'some notification',
            twoStepOtpError: '',
            selectedHostel_Id: '',
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })

it('it should check for ERROR_OTP_CODE', () => {
        const action = {
            type: 'ERROR_OTP_CODE',
            payload: 'error for otp code'
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
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
            twoStepOtpError: 'error for otp code',
            selectedHostel_Id: '',
            Settings_Hostel_Id: '',
            IsVisible: null,
        })
    })


    it('it should check for CLEAR_ERROR_OTP_CODE', () => {
        const action = {
            type: 'CLEAR_ERROR_OTP_CODE',
            payload: ''
        }
        expect(SmartStayReducer({ ...initialState }, action)).toStrictEqual({
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
        })
    })





})