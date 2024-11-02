const initialState = {
  addBanking: [],
  statusCodeForAddBanking: 0,
  bankingList: [],
  statusCodeForGetBanking: 0,
  defaultAccount: [],
  statusCodeForDefaultAccount: 0,
  addBankingAmount:[],
  statusCodeForAddBankingAmount:0

};

const BankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_BANKING":
      return {
        ...state,
        addBanking: action.payload,
        statusCodeForAddBanking: action.payload.statusCode,
      };
    case "CLEAR_ADD_USER_BANKING":
      return { ...state, statusCodeForAddBanking: 0 };


      case "ADD_BANK_AMOUNT":
        return {
          ...state,
          addBankingAmount: action.payload,
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

    case "DEFAULT_ACCOUNT":
      return {
        ...state,
        defaultAccount: action.payload,
        statusCodeForDefaultAccount: action.payload.statusCode,
      };
    case "CLEAR_DEFAULT_ACCOUNT":
      return { ...state, statusCodeForDefaultAccount: 0 };
  }
  return state;
};
export default BankingReducer;
