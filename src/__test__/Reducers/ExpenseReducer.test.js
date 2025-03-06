import ExpenseReducer, { initialState } from "../../Redux/Reducer/ExpenseReducer";




describe('It should check expense reducer', () => {

    it('it should check for CATEGORY_LIST', () => {
        const action = {
            type: 'CATEGORY_LIST',
            payload: {
                response: []
            }
        }
        expect(ExpenseReducer(initialState, action)).toStrictEqual({
            ...initialState,
            categoryList: [],
        })
    })


    it('it should check for  TRANSACTION_HISTORY', () => {
        const action = {
            type: 'TRANSACTION_HISTORY',
            payload: {
                response: []
            }
        }
        expect(ExpenseReducer(initialState, action)).toStrictEqual({
            ...initialState,
            categoryList: [],

        })
    })

    it('it should check for  ADD_EXPENSE', () => {
        const action = {
            type: 'ADD_EXPENSE',
            payload: {
                statusCode: 200
            }
        }
        expect(ExpenseReducer(initialState, action)).toStrictEqual({
            ...initialState,
            StatusCodeForAddExpenseSuccess: 200,

        })
    })

    it('it should check for  CLEAR_ADD_EXPENSE_SATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_EXPENSE_SATUS_CODE',

        }
        expect(ExpenseReducer({ ...initialState, StatusCodeForAddExpenseSuccess: 200 }, action)).toStrictEqual({
            ...initialState,
            StatusCodeForAddExpenseSuccess: 0,

        })
    })



    it('it should check for  EXPENSES_LIST', () => {
        const action = {
            type: 'EXPENSES_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(ExpenseReducer(initialState, action)).toStrictEqual({
            ...initialState,
            expenseList: [],
            getExpenseStatusCode: 200,
        })
    })


    it('it should check for  CLEAR_EXPENSE_SATUS_CODE', () => {
        const action = {
            type: 'CLEAR_EXPENSE_SATUS_CODE',

        }
        expect(ExpenseReducer({ ...initialState, getExpenseStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            getExpenseStatusCode: 0,

        })
    })


    it('it should check for  DELETE_EXPENSE', () => {
        const action = {
            type: 'DELETE_EXPENSE',
            payload: {
                statusCode: 200
            }

        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteExpenseStatusCode: 200,
        })
    })

    it('it should check for CLEAR_DELETE_EXPENSE', () => {
        const action = {
            type: 'CLEAR_DELETE_EXPENSE',


        }
        expect(ExpenseReducer({ ...initialState, deleteExpenseStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            deleteExpenseStatusCode: 0,

        })
    })

    it('it should check for NOEXPENSEDATA', () => {
        const action = {
            type: 'NOEXPENSEDATA',
            payload: {
                statusCode: 201,
            }


        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            nodataGetExpenseStatusCode: 201,

        })
    })

    it('it should check for CLEAR_NOEXPENSEdATA', () => {
        const action = {
            type: 'CLEAR_NOEXPENSEdATA',


        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            nodataGetExpenseStatusCode: 0,
        })
    })

    it('it should check for ADD_EXPENSE_TAG', () => {
        const action = {
            type: 'ADD_EXPENSE_TAG',
            payload: {
                statusCode: 200
            }


        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            StatusCodeForAddExpenseTagSuccess: 200,

        })
    })


    it('it should check for CLEAR_ADD_EXPENSE_TAG_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_EXPENSE_TAG_STATUS_CODE',


        }
        expect(ExpenseReducer({ ...initialState, StatusCodeForAddExpenseTagSuccess: 200 }, action)).toStrictEqual({
            ...initialState,
            StatusCodeForAddExpenseTagSuccess: 0,
        })
    })


    it('it should check for EXPENCE_NETBANKIG', () => {
        const action = {
            type: 'EXPENCE_NETBANKIG',
            payload: "expense net banking check"


        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            expenceNetBanking: 'expense net banking check'

        })
    })

    it('it should check for CLEAR_EXPENCE_NETBANKIG', () => {
        const action = {
            type: 'CLEAR_EXPENCE_NETBANKIG',
            payload: ""


        }
        expect(ExpenseReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            expenceNetBanking: ''

        })
    })














})