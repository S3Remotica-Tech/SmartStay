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
  selfTransferInitializeV3: "",
  selfInitializeError: "",
  statusSelfTransferInitialize: 0,
  statusSuccessSelfTransfer: 0,
  selfError: "",
  newBankingList: [],
  getBankingSuccessCode: 0,
  statusCodeForCreateBanking: 0,
  createBankingError: "",
  responsiblepersonList: [],
  addPaymentMethodSuccessCode: 0,
  linkedPaymentMethodsList: "",
  getUpiCardTypes: [],
  addPaymentError: "",
  OverviewBankDetails: "",
  getAllPaymentMethodList: [],
  addMoneySuccess: 0,
  allTransactionList: [],
  allTransactionSuccess: 0,
};

const BankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return initialState;

    case "SELF_TRANSFER_INITIALIZE_V3_ERROR":
      return { ...state, selfInitializeError: action.payload };

    case "STOREBANK_DETAILS":
      return { ...state, OverviewBankDetails: action.payload };

    case "ADD_USER_BANKING":
      return {
        ...state,
        statusCodeForAddBanking: action.payload.statusCode,
      };
    case "CLEAR_ADD_USER_BANKING":
      return { ...state, statusCodeForAddBanking: 0 };

    case "ADD_MONEY_REDUCER":
      return { ...state, addMoneySuccess: action.payload.statusCode };
    case "REMOVE_ADD_MONEY_REDUCER":
      return { ...state, addMoneySuccess: 0 };

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

    case "SELF_TRANSFER_INITIALIZE_V3_REDUCER":
      return {
        ...state,
        selfTransferInitializeV3: action.payload.response,
        statusSelfTransferInitialize: action.payload.statusCode,
      };

    case "CLEAR_SELF_REDUCER":
      return {
        ...state,
        selfTransferInitializeV3: "",
        statusSelfTransferInitialize: 0,
      };

    case "GET_ALL_TRANSACTION_REDUCER":
      return {
        ...state,
        allTransactionList: action.payload.response,
        allTransactionSuccess: action.payload.statusCode,
      };

    case "REMOVE_GET_ALL_TRANSACTION_REDUCER":
      return {
        ...state,

        allTransactionSuccess: 0,
      };

    case "REMOVE_SELF_TRANSFER_REDUCER":
      return {
        ...state,
        statusSuccessSelfTransfer: 0,
      };

    case "GET_ALL_PAYMENTS_METHODS_REDUCER":
      return { ...state, getAllPaymentMethodList: action.payload.response };

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

    case "ADD_PAYEMNT_METHOD_BANKING_ERROR":
      return { ...state, addPaymentError: action.payload };

    case "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR":
      return { ...state, addPaymentError: "" };

    case "LINKED_PAYMENT_METHOD_REDUCER":
      return {
        ...state,
        linkedPaymentMethodsList: action.payload.response,
      };

    case "GET_UPI_CARD_TYPES_REDUCER":
      return { ...state, getUpiCardTypes: action.payload.response };

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
