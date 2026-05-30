export const initialState = {
  statusCodeForAddBanking: 0,
  statusCodeForEditBanking: 0,
  bankingList: [],
  statusCodeForBankingNoData: 0,
  statusCodeForGetBanking: 0,
  statusCodeForDefaultAccount: 0,
  statusCodeForAddBankingAmount: 0,
  editTransaction: [],
  statusEditTrasactionCode: 0,
  statusCodeDeleteBank: 0,
  statusCodeForDeleteTrans: 0,
  bankingCreateError: "",
  selfTransferInitialize: "",
  statusSelfTransferInitialize: 0,
  statusSuccessSelfTransfer: 0,
};

const BankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return initialState;
    case "ADD_USER_BANKING":
      return {
        ...state,
        statusCodeForAddBanking: action.payload.statusCode,
      };
    case "CLEAR_ADD_USER_BANKING":
      return { ...state, statusCodeForAddBanking: 0 };

    // case 'ERROR_BOOKING':
    //   return { ...state, bankingError: action.payload }

    // case 'REMOVE_ERROR_BOOKING':
    //   return { ...state, bankingError: '' }

    case "CREATE_BANKING_ERROR":
      return { ...state, bankingCreateError: action.payload };

    case "REMOVE_CREATE_BANKING_ERROR":
      return { ...state, bankingCreateError: "" };

    case "SELF_TRANSFER_INITIALIZE_REDUCER":
      return {
        ...state,
        selfTransferInitialize: action.payload.response,
        statusSelfTransferInitialize: action.payload.statusCode,
      };

    case "SELF_TRANSFER__REDUCER":
      return {
        ...state,
        statusSuccessSelfTransfer: action.payload.statusCode,
      };

    case "REMOVE_SELF_TRANSFER__REDUCER":
      return {
        ...state,
        statusSuccessSelfTransfer: 0,
      };

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
        statusCodeForBankingNoData: action.payload.statusCode,
      };
    case "CLEAR_NO_BANKING":
      return { ...state, statusCodeForBankingNoData: 0 };

    case "DEFAULT_ACCOUNT":
      return {
        ...state,
        statusCodeForDefaultAccount: action.payload.statusCode,
      };
    case "CLEAR_DEFAULT_ACCOUNT":
      return { ...state, statusCodeForDefaultAccount: 0 };

    case "DELETE_BANKING":
      return {
        ...state,
        statusCodeDeleteBank: action.payload.statusCode,
      };
    case "CLEAR_DELETE_BANKING":
      return { ...state, statusCodeDeleteBank: 0 };
    case "DELETE_BANKING_TRANSACTION":
      return {
        ...state,
        statusCodeForDeleteTrans: action.payload.statusCode,
      };
    case "CLEAR_DELETE_BANKING_TRANSACTION":
      return { ...state, statusCodeForDeleteTrans: 0 };

    case "EDITBANKING":
      return {
        ...state,
        statusCodeForEditBanking: action.payload.statusCode,
      };
    case "CLEAR_EDITBANKING":
      return { ...state, statusCodeForEditBanking: 0 };

    default:
      return state;
  }
};
export default BankingReducer;
