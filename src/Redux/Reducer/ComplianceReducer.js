const initialState = {
    Compliance: [],
    message:'',
    messageShow:false,
    errorMessage:''
    }
    
    const ComplianceReducer = (state = initialState, action) => {
       
        switch(action.type) {
            case 'COMPLIANCE_LIST':
                return {...state, Compliance: action.payload}
            case 'COMPLIANCE_ADD':
               return {...state, message:action.payload, messageShow:true}
               case 'ERROR':
                return {...state,errorMessage:action.payload}
                case 'CLEAR_ERROR':
                    return { ...state, errorMessage: ''}
        }
        return state;
    } 
 export default ComplianceReducer;