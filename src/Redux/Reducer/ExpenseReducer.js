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
    expenceNetBanking: ''

}

const ExpenseReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CATEGORY_LIST':
            return { ...state, categoryList: action.payload.response }
        case 'TRANSACTION_HISTORY':
            return { ...state, transactionHistory: action.payload.response }
        case 'ADD_EXPENSE':
            return { ...state, StatusCodeForAddExpenseSuccess: action.payload.statusCode }
        case 'CLEAR_ADD_EXPENSE_SATUS_CODE':
            return { ...state, StatusCodeForAddExpenseSuccess: 0 }
        case 'EXPENSES_LIST':
            return { ...state, expenseList: action.payload.response, getExpenseStatusCode: action.payload.statusCode }
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

    }
    return state;
}
export default ExpenseReducer;