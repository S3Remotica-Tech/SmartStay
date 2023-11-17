const initialState = {

   id: 0,
   email_Id: '',
   password: '',
   isLoggedIn: false,
   errorEmail: '',
   errorPassword: '',
   errorMessage: '',


}
const SmartStayReducer = (state = initialState, action) => {

   switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'LOGIN-INFO':
         return { ...state, email_Id: action.payload.email_Id, password: action.payload.password, isLoggedIn: true, errorEmail: '', errorPassword: '', errorMessage: '' }
      case 'ERROR_EMAIL':
         return { ...state, errorEmail: action.payload }
      case 'ERROR_PASSWORD':
         return { ...state, errorPassword: action.payload }
      case 'CLEAR_EMAIL_ERROR':
         return { ...state, errorEmail: '' }
      case 'CLEAR_PASSWORD_ERROR':
         return { ...state, errorPassword: '' }

   }

   return state
}
export default SmartStayReducer;