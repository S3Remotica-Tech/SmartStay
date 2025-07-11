import CreateAccountReducer, { initialState } from "../../Redux/Reducer/CreateAccountReducer";

describe('It should check create account reducer', () => {


    it('it should check for RESET_ALL', () => {

        const modifyState = {
            id: 0,
            statusCodeTwo: 0,
            EmailId: '',
            Password: '',
            MobileNo: '',
            Name: '',
            errorMessage: '',
            accountMgs: {},
            IsEnable: '',
            accountList: [],
            statusCodeForAccount: 0,
            statusCodeCreateAccount: 0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',
            networkError: ''
        }
        const action = {
            type: 'RESET_ALL',

        }
        const result = CreateAccountReducer(modifyState, action);
        expect(result).toStrictEqual(initialState);
    })


 it('it should check for NETWORK_ERROR', () => {
        const action = {
            type: 'NETWORK_ERROR',
            payload: "error message"
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            networkError: 'error message',

        })
    })

 it('it should check for CLEAR_NETWORK_ERROR', () => {
        const action = {
            type: 'CLEAR_NETWORK_ERROR',
            payload: ""
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            networkError: ''

        })
    })




    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message"
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            errorMessage: 'error message',

        })
    })


    it('it should check for CREATEACCOUNTPAGE', () => {
        const action = {
            type: 'CREATEACCOUNTPAGE',
            payload: {
                mobileNo: "9999999999",
                emailId: "test@gmail.com",
                password: "Password",
                name: "Test",
                response: {},
                statusCode: 200
            }
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            EmailId: 'test@gmail.com',
            Password: 'Password',
            MobileNo: '9999999999',
            Name: 'Test',
            statusCodeCreateAccount: 200,

        })
    })

    it('it should check for CLEAR_STATUS_CODE_CREATE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT',

        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeCreateAccount: 0,

        })
    })

    it('it should check for CREATEACCOUNT', () => {
        const action = {
            type: 'CREATEACCOUNT',
            payload: {
                mobileNo: "9999999999",
                emailId: "test@gmail.com",
                password: "Password",
                name: "Test",
                response: {},
                statusCode: 200
            }
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            ...initialState,
            EmailId: 'test@gmail.com',
            Password: 'Password',
            MobileNo: '9999999999',
            Name: 'Test',
            statusCodeForAccount: 200,

        })
    })

    it('it should check for CLEAR_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_ACCOUNT',

        }
        expect(CreateAccountReducer({ ...initialState, statusCodeForAccount: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAccount: 0,
            toTriggerProfile: true

        })
    })




    it('it should check for PROFILEUPDATE', () => {
        const action = {
            type: 'PROFILEUPDATE',
            payload: {
                statusCode: 200
            }

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statuscodeforUpdateprofile: 200,

        })
    })

    it('it should check for CLEAR_UPDATE_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT',


        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statuscodeforUpdateprofile: 0,

        })
    })



    it('it should check for PASSWORD-UPDATE', () => {
        const action = {
            type: 'PASSWORD-UPDATE',
            payload: {
                message: "some text message"
            }

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            message: 'some text message',

        })
    })

    it('it should check for TWO_STEP_VERIFY', () => {
        const action = {
            type: 'TWO_STEP_VERIFY',
            payload: {
                emailId: "test@gmail.com",
                isEnable: 1,
                statusCode: 200

            }

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeTwo: 200,
            EmailId: 'test@gmail.com',
            IsEnable: 1,

        })
    })



    it('it should check for  CLEAR_STATUS_CODE_TWO_STEP', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_TWO_STEP',

        }
        expect(CreateAccountReducer({ ...initialState, statusCodeTwo: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeTwo: 0,

        })
    })


    it('it should check for  ACCOUNT_DETAILS', () => {
        const action = {
            type: 'ACCOUNT_DETAILS',
            payload: {
                response: [],
                statusCode: 200

            }

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            accountList: [[]],
            statusCodeForAccountList: 200,
            statuscodeforUpdateprofile: 0,
        })
    })

    it('it should check for  CLEAR_ACCOUNT_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ACCOUNT_STATUS_CODE',

        }
        expect(CreateAccountReducer({ ...initialState, statusCodeForAccountList: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAccountList: 0,
        })
    })

    it('it should check for  EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: "already email error"

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            emailError: 'already email error',

        })
    })

    it('it should check for  CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ""

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            emailError: '',

        })
    })


    it('it should check for  MOBILE_ERROR', () => {
        const action = {
            type: 'MOBILE_ERROR',
            payload: "already mobile error"

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            mobileError: 'already mobile error',

        })
    })


    it('it should check for  CLEAR_MOBILE_ERROR', () => {
        const action = {
            type: 'CLEAR_MOBILE_ERROR',
            payload: ""

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            mobileError: '',
        })
    })




    it('it should check for  EMAIL_MOBILE_ERROR', () => {
        const action = {
            type: 'EMAIL_MOBILE_ERROR',
            payload: "already mobile & email error"

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            email_mobile_Error: 'already mobile & email error',

        })
    })




    it('it should check for   CLEAR_EMAIL_MOBILE_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_MOBILE_ERROR',
            payload: ""

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            email_mobile_Error: '',

        })
    })


    it('it should check for  PASSWORD_DOESNT_ERROR', () => {
        const action = {
            type: 'PASSWORD_DOESNT_ERROR',
            payload: "password doesnt match"

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            passwordDoesnotMatchError: 'password doesnt match',

        })
    })


    it('it should check for   CLEAR_PASSWORD_DOESNT_ERROR', () => {
        const action = {
            type: 'CLEAR_PASSWORD_DOESNT_ERROR',
            payload: ""

        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            passwordDoesnotMatchError: '',

        })
    })


    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(CreateAccountReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })

})