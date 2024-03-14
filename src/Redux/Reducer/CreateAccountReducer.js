const initialState = {
   id: 0,
   EmailId: '',
   Password: '',
   MobileNo: '',
   Name: '',
   errorMessage: '',
   accountMgs: {},
   IsEnable: '',

}
const CreateAccountReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'CREATEACCOUNT':
         return { ...state, MobileNo: action.payload.mobileNo, EmailId: action.payload.emailId, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload }

      case 'TWO_STEP_VERIFY':
         return { ...state, EmailId:action.payload.emailId, IsEnable:action.payload.isEnable }
   }

   return state
}
export default CreateAccountReducer;