import BankingReducer, { initialState } from "../../Redux/Reducer/BankingReducer";

describe('it should check banking reducers', () => {

    it('it should check for ADD_USER_BANKING', () => {
        const action = {
            type: 'ADD_USER_BANKING',
            payload: {
                statusCode: 200
            }
        }
        expect(BankingReducer(initialState, action)).toStrictEqual({
            statusCodeForAddBanking: 200,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })
    })




    it('it should check for  CLEAR_ADD_USER_BANKING', () => {
        const action = {
            type: 'CLEAR_ADD_USER_BANKING',

        }
        expect(BankingReducer({ ...initialState, statusCodeForAddBanking: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })
    })



    it('it should check for  ERROR_BOOKING', () => {
        const action = {
            type: 'ERROR_BOOKING',
            payload: 'error booking'

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,

            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: 'error booking'
        })
    })


    it('it should check for  REMOVE_ERROR_BOOKING', () => {
        const action = {
            type: 'REMOVE_ERROR_BOOKING',
            payload: ''

        }
        expect(BankingReducer({ ...initialState }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 200,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })


    })


    it('it should check for   CLEAR_EDIT_BANK_TRANSACTION', () => {
        const action = {
            type: 'CLEAR_EDIT_BANK_TRANSACTION',

        }
        expect(BankingReducer({ ...initialState, statusEditTrasactionCode: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 200,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })


    })



    it('it should check for   CLEAR_ADD_BANK_AMOUNT', () => {
        const action = {
            type: 'CLEAR_ADD_BANK_AMOUNT',
        }
        expect(BankingReducer({ ...initialState, statusCodeForAddBankingAmount: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 200,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })


    })


    it('it should check for  CLEAR_BANKING_LIST', () => {
        const action = {
            type: 'CLEAR_BANKING_LIST',

        }
        expect(BankingReducer({ ...initialState, statusCodeForGetBanking: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 200,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })
    })

    it('it should check for  CLEAR_DEFAULT_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_DEFAULT_ACCOUNT',

        }
        expect(BankingReducer({ ...initialState, statusCodeForDefaultAccount: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 200,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })
    })


    it('it should check for  CLEAR_DELETE_BANKING', () => {
        const action = {
            type: 'CLEAR_DELETE_BANKING',

        }
        expect(BankingReducer({ ...initialState, statusCodeDeleteBank: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
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
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 200,
            bankingError: ''
        })
    })


    it('it should check for  CLEAR_DELETE_BANKING_TRANSACTION', () => {
        const action = {
            type: 'CLEAR_DELETE_BANKING_TRANSACTION',
           
        }
        expect(BankingReducer({ ...initialState,statusCodeForDeleteTrans: 200 }, action)).toStrictEqual({
            statusCodeForAddBanking: 0,
            bankingList: [],
            statusCodeForGetBanking: 0,
            statusCodeForDefaultAccount: 0,
            statusCodeForAddBankingAmount: 0,
            editTransaction: [],
            statusEditTrasactionCode: 0,
            statusCodeDeleteBank: 0,
            statusCodeForDeleteTrans: 0,
            bankingError: ''
        })
    })
})

