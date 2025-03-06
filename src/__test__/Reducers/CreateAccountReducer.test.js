import CreateAccountReducer, { initialState } from "../../Redux/Reducer/CreateAccountReducer";

describe('It should check create account reducer', () => {

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: "error message"
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: '',
            Password: '',
            MobileNo: '',
            Name: '',
            errorMessage: 'error message',
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

        })
    })


    it('it should check for CREATEACCOUNTPAGE', () => {
        const action = {
            type: 'CREATEACCOUNTPAGE',
            payload: {
            mobileNo : "9999999999",
            emailId: "test@gmail.com",
             password:"Password", 
             name: "Test", 
             response: {},
             statusCode : 200
            }
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'test@gmail.com',
            Password: 'Password',
            MobileNo: '9999999999',
            Name: 'Test',
            errorMessage: '',
            accountMgs: {},
            IsEnable: '',
            accountList: [],
            statusCodeForAccount: 0,
            statusCodeCreateAccount:200,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for CLEAR_STATUS_CODE_CREATE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT',
            
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
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

        })
    })

    it('it should check for CREATEACCOUNT', () => {
        const action = {
            type: 'CREATEACCOUNT',
            payload: {
            mobileNo : "9999999999",
            emailId: "test@gmail.com",
             password:"Password", 
             name: "Test", 
             response: {},
             statusCode : 200
            }
        }
        expect(CreateAccountReducer(initialState, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'test@gmail.com',
            Password: 'Password',
            MobileNo: '9999999999',
            Name: 'Test',
            errorMessage: '',
            accountMgs: {},
            IsEnable: '',
            accountList: [],
            statusCodeForAccount: 200,
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for CLEAR_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_ACCOUNT',
           
        }
        expect(CreateAccountReducer({...initialState, statusCodeForAccount: 200}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: true,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })


    

    it('it should check for PROFILEUPDATE', () => {
        const action = {
            type: 'PROFILEUPDATE',
            payload:{
                statusCode: 200
            }
           
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 200,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for CLEAR_UPDATE_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT',
           
           
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    

    it('it should check for PASSWORD-UPDATE', () => {
        const action = {
            type: 'PASSWORD-UPDATE',
            payload:{
                message: "some text message"
            }
           
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: 'some text message',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for TWO_STEP_VERIFY', () => {
        const action = {
            type: 'TWO_STEP_VERIFY',
            payload:{
                emailId: "test@gmail.com",
                isEnable: 1,
                statusCode:200

            }
           
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 200,
            EmailId: 'test@gmail.com',
            Password: '',
            MobileNo: '',
            Name: '',
            errorMessage: '',
            accountMgs: {},
            IsEnable: 1,
            accountList: [],
            statusCodeForAccount: 0,
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

   

    it('it should check for  CLEAR_STATUS_CODE_TWO_STEP', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_TWO_STEP',
                      
        }
        expect(CreateAccountReducer({...initialState, statusCodeTwo : 200}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

   
    it('it should check for  ACCOUNT_DETAILS', () => {
        const action = {
            type: 'ACCOUNT_DETAILS',
            payload:{
               response: [],
                statusCode:200

            }
           
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: '',
            Password: '',
            MobileNo: '',
            Name: '',
            errorMessage: '',
            accountMgs: {},
            IsEnable: '',
            accountList: [[]],
            statusCodeForAccount: 0,
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 200,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for  CLEAR_ACCOUNT_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ACCOUNT_STATUS_CODE',
                      
        }
        expect(CreateAccountReducer({...initialState,  statusCodeForAccountList: 200}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for  EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: "already email error"
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: 'already email error',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

    it('it should check for  CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ""
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })


    it('it should check for  MOBILE_ERROR', () => {
        const action = {
            type: 'MOBILE_ERROR',
            payload: "already mobile error"
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: 'already mobile error',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })

   
    it('it should check for  CLEAR_MOBILE_ERROR', () => {
        const action = {
            type: 'CLEAR_MOBILE_ERROR',
            payload: ""
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })


   

    it('it should check for  EMAIL_MOBILE_ERROR', () => {
        const action = {
            type: 'EMAIL_MOBILE_ERROR',
            payload: "already mobile & email error"
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: 'already mobile & email error',
            passwordDoesnotMatchError: '',

        })
    })

   


    it('it should check for   CLEAR_EMAIL_MOBILE_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_MOBILE_ERROR',
            payload: ""
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',

        })
    })


    it('it should check for  PASSWORD_DOESNT_ERROR', () => {
        const action = {
            type: 'PASSWORD_DOESNT_ERROR',
            payload: "password doesnt match"
                      
        }
        expect(CreateAccountReducer({...initialState}, action)).toStrictEqual({
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
            statusCodeCreateAccount:0,
            toTriggerProfile: false,
            statusCodeForAccountList: 0,
            statuscodeforUpdateprofile: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: 'password doesnt match',

        })
    })



})