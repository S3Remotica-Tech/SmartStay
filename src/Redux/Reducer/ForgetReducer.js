const initialState = {
    Pass: '',
    errorMessage: '',
    errorPassword:''

}

const ForgetReducer = (state = initialState, action) => {
    console.log("action.payload", action.payload);
    
    switch (action.type) {
        
        
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
            case 'ERRORPASSWORD':
            return { ...state, errorPassword: action.payload }
            
        case 'NEWPASSWORD_LIST':
            return { ...state, Pass: action.payload }
            case 'CLEAR_ERROR':
                return { ...state, errorMessage:'' }
    }
    
    return state;
}


export default ForgetReducer;