export const initialState = {
  addBookind: [],
  statusCodeForAddBooking: 0,
  CustomerBookingList: [],
  statusCodeGetBooking: 0,
  bookingError: "",
  deleteBooking: [],
  statusCodeForDeleteBooking: "",
  assignBookingUser: [],
  statusCodeForAssignBooking: 0,
  bookingPhoneError: "",
  bookingEmailError: "",
  availableBedBooking: [],
  statusCodeForBedBooking: "",
  ErrorAssignBooking: "",
  ErrorAssignBookingDate: '',
  ErrorAssignBookingMobile: '',
  StatusCodeInactiveCode:0
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL':
      return initialState;
    case "ADD_USER_BOOKING":
      return {
        ...state,
        statusCodeForAddBooking: action.payload.statusCode,
      };

    case "BOOKING_PHONE_ERROR":
      return { ...state, bookingPhoneError: action.payload };
    case "CLEAR_PHONE_ERROR":
      return { ...state, bookingPhoneError: "" };
    case "BOOKING_EMAIL_ERROR":
      return { ...state, bookingEmailError: action.payload };
    case "CLEAR_EMAIL_ERROR":
      return { ...state, bookingEmailError: "" };
    case "CLEAR_ERROR_BOOKING":
      return { ...state, bookingError: "" };
    case "CLEAR_ADD_USER_BOOKING":
      return { ...state, statusCodeForAddBooking: 0 };
    case "BOOKING_LIST":
      return {
        ...state,
        CustomerBookingList: action.payload.response,
        statusCodeGetBooking: action.payload.statusCode,
      };
    case "CLEAR_BOOKING_LIST":
      return { ...state, statusCodeGetBooking: 0 };

    case "DELETE_BOOKING":
      return {
        ...state,
        statusCodeForDeleteBooking: action.payload.statusCode,
      };
    case "CLEAR_DELETE_BOOKING":
      return { ...state, statusCodeForDeleteBooking: 0 };
    case "ASSIGN_USER_BOOKING":
      return {
        ...state,
        statusCodeForAssignBooking: action.payload.statusCode,
      };
    case "CLEAR_ASSIGN_USER_BOOKING":
      return { ...state, statusCodeForAssignBooking: 0 };
    case "ERROR_BOOKING_DATE":
      return { ...state, ErrorAssignBookingDate: action.payload };
    case "REMOVE_ERROR_BOOKING_DATE":
      return { ...state, ErrorAssignBookingDate: "" };
case "ALREADY_MOBILE_ERROR":
    return { ...state, ErrorAssignBookingMobile: action.payload };
case "REMOVE_ALREADY_MOBILE_ERROR":
    return { ...state, ErrorAssignBookingMobile: "" };

    case "ERROR_ASSIGN_BOOKING":
      return { ...state, ErrorAssignBooking: action.payload };
    case "REMOVE_ERROR_ASSIGN_BOOKING":
      return { ...state, ErrorAssignBooking: "" };


    case "BOOKING_BED_DETAILS":
      return {
        ...state,
        statusCodeForBedBooking: action.payload.statusCode,
      };

      case 'BOOKING_InActive':
            return { ...state, StatusCodeInactiveCode: action.payload.statusCode }
        case 'CLEAR_BOOKING_InActive':
            return { ...state, StatusCodeInactiveCode: 0 }
    default:
      return state;
  }

};
export default BookingReducer;
