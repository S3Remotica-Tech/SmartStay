const initialState = {
    
    id: 0,
    EmailId: '',
    Password: '',
    isLoggedIn: false,
    errorEmail: '',
    errorPassword:'',
    errorMessage:'',
   
   }
 const SmartStayReducer = (state = initialState, action) => {
   
    switch (action.type) {
       case 'ERROR':
          return { ...state, errorMessage: action.payload }
       case 'LOGIN-INFO':
          return { ...state, EmailId:action.payload.EmailId,Password:action.payload.Password,isLoggedIn:true}
       case 'ERROR_EMAIL':
         return {...state, errorEmail:action.payload}
         case 'ERROR_PASSWORD':
            return {...state, errorPassword:action.payload}
    }
 
    return state
 }
 export default SmartStayReducer;