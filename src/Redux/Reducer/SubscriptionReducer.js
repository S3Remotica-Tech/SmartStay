const initialState = {
    newsubscription: '',
    statusCodeForSubscriptin:0 
 }
 const SubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SUBSCRIPTION":
        return {
          ...state,
          newsubscription: action.payload,
          statusCodeForSubscriptin: action.payload.statusCode,
        };
      case "CLEAR_NEW_SUBSCRIPTION":
        return { ...state, statusCodeForSubscriptin: 0 };
    }
    return state;
  };
  export default SubscriptionReducer;