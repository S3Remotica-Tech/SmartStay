const initialState = {
   id: 0,
   statusCodeTwo: 0,
   EmailId: '',
   Password: '',
   MobileNo: '',
   Name: '',
   errorMessage: '',
   accountMgs: {},
   IsEnable: '',
   accountList:[],
   statusCodeForAccount: 0,
   statusCodeCreateAccount:0,
   toTriggerProfile:false,
   statusCodeForAccountList:0,

}
const CreateAccountReducer = (state = initialState, action) => {

   console.log("action",action.payload)

     switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
         case 'CREATEACCOUNTPAGE':
         return { ...state, MobileNo: action.payload.mobileNo, EmailId: action.payload.emailId, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload.response ,statusCodeCreateAccount:action.payload.statusCode}
         
      case 'CREATEACCOUNT':
         return { ...state, MobileNo: action.payload.mobileNo, EmailId: action.payload.emailId, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload.response, statusCodeForAccount:action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_ACCOUNT':
         return { ...state, statusCodeForAccount: 0, toTriggerProfile:true }
      case 'TWO_STEP_VERIFY':
         return { ...state, EmailId: action.payload.emailId, IsEnable: action.payload.isEnable, statusCodeTwo: action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_TWO_STEP':
         return { ...state, statusCodeTwo: 0 }
      case 'ACCOUNT_DETAILS':
                return { ...state, accountList:[ action.payload.response ], statusCodeForAccountList:action.payload.statusCode}
  
  case 'CLEAR_ACCOUNT_STATUS_CODE':
   return {...state, statusCodeForAccountList:0}
               }

   return state
}
export default CreateAccountReducer;