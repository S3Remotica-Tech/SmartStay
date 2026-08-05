export const initialState = {
  addBookind: [],
  statusCodeForAddBooking: 0,
  tenantBookingList: [],
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
  ErrorAssignBookingDate: "",
  ErrorAssignBookingMobile: "",
  StatusCodeInactiveCode: 0,
  bookingBedError: "",
  bookingMakeAsError: "",
  applyinvoiceSuccessCode: 0,
  initializeRedeemSuccessCode: 0,
  initializeRedeem: "",
  applyRedeemError: "",
  applyAdvanceInvoiceSuccessCode: 0,
  getRetainerInvoiceStatus: 0,
  getRetainerInvoice: "",
  applyAdvanceRedeemError: "",
  advanceInitialize: "",
  successBookingCustomizeColumns: 0,
  applyRetainerSuccessCode: 0,
  bookingFilters: {
    period: [],
    search: "",
    floor: [],
    room: [],
    minPaidAmount: "",
    maxPaidAmount: "",
    paymentMode: [],
  },
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return initialState;
    case "ADD_USER_BOOKING":
      return {
        ...state,
        statusCodeForAddBooking: action.payload.statusCode,
      };

    case "APPLY_INVOICE_REDUCER":
      return { ...state, applyinvoiceSuccessCode: action.payload.statusCode };
    case "REMOVE_APPLY_INVOICE_REDUCER":
      return { ...state, applyinvoiceSuccessCode: 0 };

    case "APPLY_RETAINER_REDUCER":
      return { ...state, applyRetainerSuccessCode: action.payload.statusCode };
    case "REMOVE_APPLY_RETAINER_REDUCER":
      return { ...state, applyRetainerSuccessCode: 0 };

    case "APPLY_ADVANCE_INVOICE_REDUCER":
      return {
        ...state,
        advanceInitialize: action.payload.response,
        applyAdvanceInvoiceSuccessCode: action.payload.statusCode,
      };

    case "REMOVE_APPLY_ADVANCE_INVOICE_REDUCER":
      return {
        ...state,
        applyAdvanceInvoiceSuccessCode: 0,
      };

    case "GET_RETAINER_INVOICE_REDUCER":
      return {
        ...state,
        getRetainerInvoice: action.payload.response,
        getRetainerInvoiceStatus: action.payload.statusCode,
      };

    case "REMOVE_GET_RETAINER_INVOICE_REDUCER":
      return {
        ...state,
        getRetainerInvoiceStatus: 0,
      };

    case "ERROR_APPLY_ADVANCE_INVOICE":
      return { ...state, applyAdvanceRedeemError: action.payload };

    case "REMOVE_ERROR_APPLY_ADVANCE_INVOICE":
      return { ...state, applyAdvanceRedeemError: "" };

    case "ERROR_APPLY_INVOICE":
      return { ...state, applyRedeemError: action.payload };

    case "REMOVE_ERROR_APPLY_INVOICE":
      return { ...state, applyRedeemError: "" };

    case "CUSTOMIZE_COLUMNS_BOOKING_REDUCER":
      return {
        ...state,
        successBookingCustomizeColumns: action.payload.statusCode,
      };
    case "REMOVE_CUSTOMIZE_COLUMNS_BOOKING_REDUCER":
      return { ...state, successBookingCustomizeColumns: 0 };

    case "REDEEM_ADVANCE_INITIALIZE":
      return {
        ...state,
        initializeRedeemSuccessCode: action.payload.statusCode,
        initializeRedeem: action.payload.response,
      };
    case "REMOVE_REDEEM_ADVANCE_INITIALIZE":
      return {
        ...state,
        initializeRedeemSuccessCode: 0,
      };

    case "BOOKING_PHONE_ERROR":
      return { ...state, bookingPhoneError: action.payload };
    case "CLEAR_PHONE_ERROR":
      return { ...state, bookingPhoneError: "" };

    case "ERROR_MAKEASINACTIVE":
      return { ...state, bookingMakeAsError: action.payload };

    case "REMOVE_ERROR_MAKEASINACTIVE":
      return { ...state, bookingMakeAsError: "" };

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
        tenantBookingList: action.payload.response,
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

    case "ERROR_BOOKING":
      return { ...state, bookingBedError: action.payload };
    case "ERROR_BOOKING_REMOVE":
      return { ...state, bookingBedError: "" };
    case "SET_BOOKING_FILTERS":
      return {
        ...state,
        bookingFilters: {
          ...state.bookingFilters,
          ...action.payload,
        },
      };

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

    case "BOOKING_INACTIVE":
      return { ...state, StatusCodeInactiveCode: action.payload.statusCode };
    case "CLEAR_BOOKING_InActive":
      return { ...state, StatusCodeInactiveCode: 0 };
    default:
      return state;
  }
};
export default BookingReducer;
