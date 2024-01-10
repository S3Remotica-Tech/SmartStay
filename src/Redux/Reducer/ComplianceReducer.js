const initialState = {
    Compliance: [],
    messageShow:false,
    errorMessage:''
    }
    
    const ComplianceReducer = (state = initialState, action) => {
        switch(action.type) {
            case 'COMPLIANCE_LIST':
                return {...state, Compliance: action.payload}
            case 'COMPLIANCE_ADD':
               return {...state, messageShow:true}
               case 'ERROR':
                return {...state,errorMessage:action.payload}
        }
        return state;
    } 
 export default ComplianceReducer;