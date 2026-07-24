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
  selfError: "",
  newBankingList: [],
  getBankingSuccessCode: 0,
  statusCodeForCreateBanking: 0,
  createBankingError: "",
  responsiblepersonList: [],
  addPaymentMethodSuccessCode: 0,
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

    case "ADD_BANKING_ERROR":
      return { ...state, createBankingError: action.payload };

    case "REMOVE_ADD_BANKING_ERROR":
      return { ...state, createBankingError: "" };

    case "ADD_BANKING_REDUCER":
      return {
        ...state,
        statusCodeForCreateBanking: action.payload.statusCode,
      };
    case "REMOVE_ADD_BANKING_REDUCER":
      return {
        ...state,
        statusCodeForCreateBanking: 0,
      };

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

    case "SELF_TRANSFER_REDUCER":
      return {
        ...state,
        statusSuccessSelfTransfer: action.payload.statusCode,
      };

    case "REMOVE_SELF_TRANSFER_REDUCER":
      return {
        ...state,
        statusSuccessSelfTransfer: 0,
      };

    case "SELF_TRANSFER_ERROR":
      return {
        ...state,
        selfError: action.payload,
      };
    case "REMOVE_SELF_TRANSFER_ERROR":
      return {
        ...state,
        selfError: "",
      };

    case "EDIT_BANK_TRANSACTION":
      return {
        ...state,
        editTransaction: action.payload.response,
        statusEditTrasactionCode: action.payload.statusCode,
      };
    case "CLEAR_EDIT_BANK_TRANSACTION":
      return { ...state, statusEditTrasactionCode: 0 };

    case "RESPONSIBLE_PERSON_LIST_REDUCER":
      return {
        ...state,
        responsiblepersonList: action.payload.response,
      };

    case "ADD_BANK_AMOUNT":
      return {
        ...state,
        statusCodeForAddBankingAmount: action.payload.statusCode,
      };
    case "CLEAR_ADD_BANK_AMOUNT":
      return { ...state, statusCodeForAddBankingAmount: 0 };

    case "ADD_PAYMENT_METHOD_REDUCER":
      return {
        ...state,
        addPaymentMethodSuccessCode: action.payload.statusCode,
      };

    case "REMOVE_ADD_PAYMENT_METHOD_REDUCER":
      return {
        ...state,
        addPaymentMethodSuccessCode: 0,
      };

    case "BANKING_LIST":
      return {
        ...state,
        bankingList: action.payload.response,
        statusCodeForGetBanking: action.payload.statusCode,
      };
    case "CLEAR_BANKING_LIST":
      return { ...state, statusCodeForGetBanking: 0 };

    case "BANKING_LIST_REDUCER":
      return {
        ...state,
        newBankingList: action.payload.response,
        getBankingSuccessCode: action.payload.statusCode,
      };
    case "REMOVE_BANKING_LIST_REDUCER":
      return {
        ...state,
        getBankingSuccessCode: 0,
      };

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
