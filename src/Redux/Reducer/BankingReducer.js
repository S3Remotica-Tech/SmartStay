export const initialState = {
  // addBanking: [],
  statusCodeForAddBanking: 0,
  bankingList: [],
  statusCodeForBankingNoData:0,
  statusCodeForGetBanking: 0,
  // defaultAccount: [],
  statusCodeForDefaultAccount: 0,
  // addBankingAmount: [],
  statusCodeForAddBankingAmount: 0,
  editTransaction: [],
  statusEditTrasactionCode: 0,
  // deleteBank: [],
  statusCodeDeleteBank: 0,
  // deleteBankTransaction: [],
  statusCodeForDeleteTrans: 0,
  bankingError: ''
};

const BankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_BANKING":
      return {
        ...state,
        // addBanking: action.payload,
        statusCodeForAddBanking: action.payload.statusCode,
      };
    case "CLEAR_ADD_USER_BANKING":
      return { ...state, statusCodeForAddBanking: 0 };

    case 'ERROR_BOOKING':
      return { ...state, bankingError: action.payload }

    case 'REMOVE_ERROR_BOOKING':
      return { ...state, bankingError: '' }

    case "EDIT_BANK_TRANSACTION":
      return {
        ...state,
        editTransaction: action.payload.response,
        statusEditTrasactionCode: action.payload.statusCode,
      };
    case "CLEAR_EDIT_BANK_TRANSACTION":
      return { ...state, statusEditTrasactionCode: 0 };

    case "ADD_BANK_AMOUNT":
      return {
        ...state,
        // addBankingAmount: action.payload,
        statusCodeForAddBankingAmount: action.payload.statusCode,
      };
    case "CLEAR_ADD_BANK_AMOUNT":
      return { ...state, statusCodeForAddBankingAmount: 0 };

    case "BANKING_LIST":
      return {
        ...state,
        bankingList: action.payload.response,
        statusCodeForGetBanking: action.payload.statusCode,
      };
    case "CLEAR_BANKING_LIST":
      return { ...state, statusCodeForGetBanking: 0 };

      case "NO_BANKING":
        return {
          ...state,
          // defaultAccount: action.payload,
          statusCodeForBankingNoData: action.payload.statusCode,
        };
      case "CLEAR_NO_BANKING":
        return { ...state, statusCodeForBankingNoData: 0 };




    case "DEFAULT_ACCOUNT":
      return {
        ...state,
        // defaultAccount: action.payload,
        statusCodeForDefaultAccount: action.payload.statusCode,
      };
    case "CLEAR_DEFAULT_ACCOUNT":
      return { ...state, statusCodeForDefaultAccount: 0 };


    case "DELETE_BANKING":
      return {
        ...state,
        // deleteBank: action.payload,
        statusCodeDeleteBank: action.payload.statusCode,
      };
    case "CLEAR_DELETE_BANKING":
      return { ...state, statusCodeDeleteBank: 0 };
    case "DELETE_BANKING_TRANSACTION":
      return {
        ...state,
        // deleteBankTransaction: action.payload,
        statusCodeForDeleteTrans: action.payload.statusCode,
      };
    case "CLEAR_DELETE_BANKING_TRANSACTION":
      return { ...state, statusCodeForDeleteTrans: 0 };

      default:
        return state;
  }
 
};
export default BankingReducer;
