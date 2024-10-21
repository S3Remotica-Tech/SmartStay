const initialState = {
  addBookind: [],
  statusCodeForAddBooking: 0,
  CustomerBookingList:[],
  statusCodeGetBooking:0,
  bookingError:'',
  deleteBooking:[],
  statusCodeForDeleteBooking:''


};
const BookingReducer = (state = initialState, action) => {
  console.log("actionBooking",action)
  switch (action.type) {
    case "ADD_USER_BOOKING":
      return { ...state, addBookind:action.payload,statusCodeForAddBooking:action.payload.statusCode};
      case "ERROR_BOOKING":
        return { ...state,bookingError:action.payload};
        case 'CLEAR_ERROR_BOOKING':
            return { ...state, bookingError: '' }
    case "CLEAR_ADD_USER_BOOKING":
      return { ...state, statusCodeForAddBooking: 0 };
      case 'BOOKING_LIST':
            return { ...state, CustomerBookingList: action.payload.response, StatusCodeAmenitiesGet:action.payload.statusCode}
        case 'CLEAR_BOOKING_LIST':
            return { ...state, statusCodeGetBooking: 0 }

            case 'DELETE_BOOKING':
              return { ...state, deleteBooking: action.payload, statusCodeForDeleteBooking: action.payload.statusCode}
          case 'CLEAR_DELETE_BOOKING':
              return { ...state, statusCodeForDeleteBooking: 0 }
  }
  return state;
};
export default BookingReducer;
