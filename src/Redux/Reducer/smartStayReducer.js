const initialState = {

   id: 0,
   email_Id: '',
   password: '',
   isLoggedIn: false,
   errorEmail: '',
   errorPassword: '',
   errorMessage: '',
   statusCode: 0,
   loginInformation:[]

}
const SmartStayReducer = (state = initialState, action) => {

   switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'LOGIN-INFO':
         return { ...state,loginInformation:action.payload.response.Data, email_Id: action.payload.response.email_Id, password: action.payload.response.password, errorEmail: '', errorPassword: '', errorMessage: '', statusCode: action.payload.statusCode }
      case 'ERROR_EMAIL':
         return { ...state, errorEmail: action.payload }
      case 'ERROR_PASSWORD':
         return { ...state, errorPassword: action.payload }
      case 'CLEAR_EMAIL_ERROR':
         return { ...state, errorEmail: '' }
      case 'CLEAR_PASSWORD_ERROR':
         return { ...state, errorPassword: '' }
      case 'LOGIN-SUCCESS':
         return { ...state, isLoggedIn: true }
   }

   return state
}
export default SmartStayReducer;