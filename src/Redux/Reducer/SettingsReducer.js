const initialState = {
    Expences: [],
    message: '',
    getExpensesStatuscode:0,
    addexpencesStatuscode: 0,
    alreadycategoryerror:'',
    deleteexpencesStatusCode: 0,
    Complainttypelist :[],
    getcomplainttypeStatuscode:0,
    addComplaintSuccessStatusCode:0,
    alreadytypeerror:'',
    deletecomplaintStatuscode :0,
    addEbbillingUnitStatuscode: 0,
    EBBillingUnitlist:[],
    getebStatuscode:0,
    getsettingRoleList:[],
    statusCodeForRoleList:0,
    addRoleSetting:[],
    statusCodeForAddRole:0

}

const SettingsReducer = (state = initialState, action) => {
     console.log("action for settings",action);
    switch (action.type) {
        //Expenses category for settings ==>
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

        case 'ALREADY_EXPENCE_CATEGORY_ERROR':
            return { ...state, alreadycategoryerror: action.payload }
    
        case 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR':
            return { ...state, alreadycategoryerror: '' }

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

                    case 'ALREADY_COMPLAINTTYPE_ERROR':
                                return { ...state, alreadytypeerror: action.payload }
                    
                            case 'CLEAR_ALREADY_COMPLAINTTYPE_ERROR':
                                return { ...state, alreadytypeerror: '' }
//EbBillings for settings ==>
             case 'EB_BILLING_UNIT_ADD':
                return { ...state, message: action.payload.message  , addEbbillingUnitStatuscode : action.payload.statusCode}
                case 'CLEAR_ADD_EB_BILLING_STATUS_CODE':
                    return { ...state, addEbbillingUnitStatuscode: 0 }

                    case 'EB_BILLING_UNIT_LIST':
                        return { ...state, EBBillingUnitlist: action.payload.response , getebStatuscode:action.payload.statusCode}
                        case 'CLEAR_GET_EBBILLINGS_STATUS_CODE':
                            return { ...state, getebStatuscode: 0 }
                           //settingRole

                           case "ROLE_LIST":
                            return {
                              ...state,
                              getsettingRoleList: action.payload,
                              statusCodeForRoleList: action.payload.statusCode,
                            };
                          case "CLEAR_DELETE_BANKING_TRANSACTION":
                            return { ...state, statusCodeForRoleList: 0 };


                            case "ADD_SETTING_ROLE":
                            return {
                              ...state,
                              addRoleSetting: action.payload,
                              statusCodeForAddRole: action.payload.statusCode,
                            };
                          case "CLEAR_ADD_SETTING_ROLE":
                            return { ...state, statusCodeForAddRole: 0 };
            }
    return state;
}
export default SettingsReducer;