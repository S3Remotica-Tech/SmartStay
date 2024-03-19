const initialState = {
   id: 0,
   statusCodeTwo:0,
   EmailId: '',
   Password: '',
   MobileNo: '',
   Name: '',
   errorMessage: '',
   accountMgs: {},
   IsEnable: '',
   accountList:[]

}
const CreateAccountReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'CREATEACCOUNT':
         return { ...state, MobileNo: action.payload.mobileNo, EmailId: action.payload.emailId, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload }

      case 'TWO_STEP_VERIFY':
         return { ...state, EmailId:action.payload.emailId, IsEnable:action.payload.isEnable, statusCodeTwo:action.payload.statusCode }
case 'CLEAR_STATUS_CODE_TWO_STEP':
   return { ...state,statusCodeTwo:0 }
   case 'ACCOUNT_DETAILS':
      return{...state, accountList:action.payload}


   }

   return state
}
export default CreateAccountReducer;