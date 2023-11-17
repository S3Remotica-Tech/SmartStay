const initialState = {
    
    id: 0,
    EmailId: '',
    Password: '',
    MobileNo:'',
    Name:'',
    errorMessage:'',
   
   }
 const CreateAccountReducer = (state = initialState, action) => {
   console.log("action:",action.payload);
    switch (action.type) {
       case 'ERROR':
          return { ...state, errorMessage: action.payload }
       case 'CREATEACCOUNT':
          return { ...state,MobileNo:action.payload.mobileNo,EmailId:action.payload.emailId,Password:action.payload.password,Name:action.payload.name}
    }
 
    return state
 }
 export default CreateAccountReducer;