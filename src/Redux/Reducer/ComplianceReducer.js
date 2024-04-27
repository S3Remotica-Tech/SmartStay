const initialState = {
    Compliance: [],
    message:'',
    statusCodeForAddCompliance:0,
    messageShow:false,
    errorMessage:''
    }
    
    const ComplianceReducer = (state = initialState, action) => {
       
        switch(action.type) {
            case 'COMPLIANCE_LIST':
                return {...state, Compliance: action.payload}
            case 'COMPLIANCE_ADD':
               return {...state, message:action.payload, messageShow:true, statusCodeForAddCompliance:action.payload.statusCode}
              case 'CLEAR_COMPLIANCE_STATUS_CODE':
                return {...state,statusCodeForAddCompliance:0 }
               case 'ERROR':
                return {...state,errorMessage:action.payload}
                case 'CLEAR_ERROR':
                    return { ...state, errorMessage: ''}
        }
        return state;
    } 
 export default ComplianceReducer;