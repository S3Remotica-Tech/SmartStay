const initialState = {
    Compliance: []
    
    }
    
    const ComplianceReducer = (state = initialState, action) => {
        console.log("action",action);
        switch(action.type) {
            case 'COMPLIANCE_LIST':
                return {...state, Compliance: action.payload}
        }
        return state;
    } 
 export default ComplianceReducer;