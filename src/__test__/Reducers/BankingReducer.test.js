import BankingReducer, { initialState } from "../../Redux/Reducer/BankingReducer";

describe('it should check banking reducers', () => {


    it('it should check for RESET_ALL', () => {

        const modifyState = {
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForBankingNoData: 0,
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        }
        const action = {
            type: 'RESET_ALL',

        }
        const result = BankingReducer(modifyState, action);
        expect(result).toStrictEqual(initialState);
    })




    it('it should check for ADD_USER_BANKING', () => {
        const action = {
            type: 'ADD_USER_BANKING',
            payload: {
                statusCode: 200
            }
        }
        expect(BankingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBanking: 200,

        })
    })




    it('it should check for  CLEAR_ADD_USER_BANKING', () => {
        const action = {
            type: 'CLEAR_ADD_USER_BANKING',

        }
        expect(BankingReducer({ ...initialState, statusCodeForAddBanking: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBanking: 0,
        })
    })



    it('it should check for  ERROR_BOOKING', () => {
        const action = {
            type: 'ERROR_BOOKING',
            payload: 'error booking'

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            bankingError: 'error booking'
        })
    })


    it('it should check for  REMOVE_ERROR_BOOKING', () => {
        const action = {
            type: 'REMOVE_ERROR_BOOKING',
            payload: ''

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            bankingError: ''
        })


    })



    it('it should check for   EDIT_BANK_TRANSACTION', () => {
        const action = {
            type: 'EDIT_BANK_TRANSACTION',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            editTransaction: [],
            statusEditTrasactionCode: 200,

        })


    })


    it('it should check for   CLEAR_EDIT_BANK_TRANSACTION', () => {
        const action = {
            type: 'CLEAR_EDIT_BANK_TRANSACTION',

        }
        expect(BankingReducer({ ...initialState, statusEditTrasactionCode: 200 }, action)).toStrictEqual({
            ...initialState,
            statusEditTrasactionCode: 0,

        })


    })


    it('it should check for   ADD_BANK_AMOUNT', () => {
        const action = {
            type: 'ADD_BANK_AMOUNT',
            payload: {
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBankingAmount: 200,
        })


    })



    it('it should check for   CLEAR_ADD_BANK_AMOUNT', () => {
        const action = {
            type: 'CLEAR_ADD_BANK_AMOUNT',
        }
        expect(BankingReducer({ ...initialState, statusCodeForAddBankingAmount: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBankingAmount: 0,

        })


    })




    it('it should check for  BANKING_LIST', () => {
        const action = {
            type: 'BANKING_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            bankingList: [],
            statusCodeForGetBanking: 200,
        })


    })


    it('it should check for  CLEAR_BANKING_LIST', () => {
        const action = {
            type: 'CLEAR_BANKING_LIST',

        }
        expect(BankingReducer({ ...initialState, statusCodeForGetBanking: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForGetBanking: 0,
        })


    })


    it('it should check for  DEFAULT_ACCOUNT', () => {
        const action = {
            type: 'DEFAULT_ACCOUNT',
            payload: {
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDefaultAccount: 200,

        })
    })

    it('it should check for  CLEAR_DEFAULT_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_DEFAULT_ACCOUNT',

        }
        expect(BankingReducer({ ...initialState, statusCodeForDefaultAccount: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDefaultAccount: 0,
        })
    })


    it('it should check for  DELETE_BANKING', () => {
        const action = {
            type: 'DELETE_BANKING',
            payload: {
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeDeleteBank: 200,

        })
    })


    it('it should check for  CLEAR_DELETE_BANKING', () => {
        const action = {
            type: 'CLEAR_DELETE_BANKING',

        }
        expect(BankingReducer({ ...initialState, statusCodeDeleteBank: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeDeleteBank: 0,
        })
    })

    it('it should check for  DELETE_BANKING_TRANSACTION', () => {
        const action = {
            type: 'DELETE_BANKING_TRANSACTION',
            payload: {
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteTrans: 200,

        })
    })


    it('it should check for  CLEAR_DELETE_BANKING_TRANSACTION', () => {
        const action = {
            type: 'CLEAR_DELETE_BANKING_TRANSACTION',

        }
        expect(BankingReducer({ ...initialState, statusCodeForDeleteTrans: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteTrans: 0,

        })
    })



    it('it should check for  NO_BANKING', () => {
        const action = {
            type: 'NO_BANKING',
            payload: {
                statusCode: 200
            }

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForBankingNoData: 200,

        })
    })


    it('it should check for  CLEAR_NO_BANKING', () => {
        const action = {
            type: 'CLEAR_NO_BANKING',

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForBankingNoData: 0,

        })
    })

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })






})

