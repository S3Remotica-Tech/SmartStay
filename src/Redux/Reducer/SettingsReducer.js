const initialState = {
    Expences: [],
    message: '',
    getExpensesStatuscode:0,
    addexpencesStatuscode: 0,
    deleteexpencesStatusCode: 0,
    Complainttypelist :[],
    getcomplainttypeStatuscode:0,
    addComplaintSuccessStatusCode:0,
    deletecomplaintStatuscode :0,
    addEbbillingUnitStatuscode: 0,
    EBBillingUnitlist:[]
}

const SettingsReducer = (state = initialState, action) => {
     console.log("action for settings",action);
    switch (action.type) {
        case 'EXPENCES_CATEGORY_LIST':
            return { ...state, Expences: action.payload.response , getExpensesStatuscode : action.payload.statusCode}
        case 'CLEAR_GET_EXPENSES_STATUS_CODE':
                return { ...state, getExpensesStatuscode: 0}
        case 'EXPENCES_ADD':
            return { ...state, message: action.payload.message  , addexpencesStatuscode : action.payload.statusCode}
        case 'CLEAR_ADD_EXPENCES_STATUS_CODE':
            return { ...state, addexpencesStatuscode: 0 }
        case 'DELETE_EXPENCES':
            return { ...state, deleteexpencesStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_EXPENCES_STATUS_CODE':
            return { ...state, deleteexpencesStatusCode: 0 }

//Complaint Type for settings ==>
            case 'COMPLAINT_TYPE_LIST':
                return { ...state, Complainttypelist: action.payload.response ,getcomplainttypeStatuscode :action.payload.statusCode }
                case 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE':
                    return { ...state, getcomplainttypeStatuscode: 0 }
            case 'COMPLAINT_TYPE_ADD':


            
                return { ...state, message: action.payload.message ,addComplaintSuccessStatusCode :action.payload.statusCode}
                case 'CLEAR_ADD_COMPLAINT_STATUS_CODE':
                    return { ...state, addComplaintSuccessStatusCode: 0 }
             case 'DELETE_COMPLAINT_TYPE':
                    return { ...state, deletecomplaintStatuscode: action.payload.statusCode }
            case 'CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE':
                    return { ...state, deletecomplaintStatuscode: 0 }
//Expenses category for settings ==>
             case 'EB_BILLING_UNIT_ADD':
                return { ...state, message: action.payload.message  , addEbbillingUnitStatuscode : action.payload.statusCode}
                case 'CLEAR_ADD_EB_BILLING_STATUS_CODE':
                    return { ...state, addEbbillingUnitStatuscode: 0 }

                    case 'EB_BILLING_UNIT_LIST':
                        return { ...state, EBBillingUnitlist: action.payload.response }
                    
            }
    return state;
}
export default SettingsReducer;