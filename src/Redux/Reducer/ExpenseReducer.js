export const initialState = {
    categoryList: [],
    StatusCodeForAddExpenseSuccess: 0,
    expenseList: [],
    getExpenseStatusCode: 0,
    deleteExpenseStatusCode: 0,
    assetList: [],
    vendorList: [],
    categorylist: [],
    paymentModeList: [],
    nodataGetExpenseStatusCode: 0,
    transactionHistory: [],
    StatusCodeForAddExpenseTagSuccess: 0,
    expenceNetBanking: '',
    getInitializeExpenseList: [],
    getInitializeExpenseStatusCode: 0,
    insufficiantFundError: "",
    StatusCodeForUpdateExpenseSuccess: 0
}

const ExpenseReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET_ALL':
            return initialState;
        case 'INITIALIZE_EXPENSES_LIST':
            return { ...state, getInitializeExpenseList: action.payload.response, getInitializeExpenseStatusCode: action.payload.statusCode }
        case 'REMOVE_INITIALIZE_EXPENSES_LIST':
            return { ...state, getInitializeExpenseStatusCode: 0 }
        case 'CATEGORY_LIST':
            return { ...state, categoryList: action.payload.response }
        case 'TRANSACTION_HISTORY':
            return { ...state, transactionHistory: action.payload.response }
        case 'ADD_EXPENSE':
            return { ...state, StatusCodeForAddExpenseSuccess: action.payload.statusCode }
        case 'CLEAR_ADD_EXPENSE_SATUS_CODE':
            return { ...state, StatusCodeForAddExpenseSuccess: 0 }

        case 'UPDATE_EXPENSE_REDUCER':
            return { ...state, StatusCodeForUpdateExpenseSuccess: action.payload.statusCode }
        case 'REMOVE_UPDATE_EXPENSE_REDUCER':
            return { ...state, StatusCodeForUpdateExpenseSuccess: 0 }

        case 'EXPENSES_LIST':
            return { ...state, expenseList: action.payload.response, paymentModeList: action.payload.paymentmode, getExpenseStatusCode: action.payload.statusCode }
        case 'CLEAR_EXPENSE_SATUS_CODE':
            return { ...state, getExpenseStatusCode: 0 }
        case 'DELETE_EXPENSE':
            return { ...state, deleteExpenseStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_EXPENSE':
            return { ...state, deleteExpenseStatusCode: 0 }
        case 'NOEXPENSEDATA':
            return { ...state, nodataGetExpenseStatusCode: action.payload.statusCode }
        case 'CLEAR_NOEXPENSEdATA':
            return { ...state, nodataGetExpenseStatusCode: 0 }

        case 'ADD_EXPENSE_TAG':
            return { ...state, StatusCodeForAddExpenseTagSuccess: action.payload.statusCode }
        case 'CLEAR_ADD_EXPENSE_TAG_STATUS_CODE':
            return { ...state, StatusCodeForAddExpenseTagSuccess: 0 }


        case 'EXPENCE_NETBANKIG':
            return { ...state, expenceNetBanking: action.payload }
        case 'CLEAR_EXPENCE_NETBANKIG':
            return { ...state, expenceNetBanking: '' }

        case 'BANK_INSUFFICIANT_FUND_ERROR':
            return { ...state, insufficiantFundError: action.payload }
        case 'REMOVE_BANK_INSUFFICIANT_FUND_ERROR':
            return { ...state, insufficiantFundError: "" }
        default:
            return state;

    }


}
export default ExpenseReducer;