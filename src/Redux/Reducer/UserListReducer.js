const initialState = {
    Users: [],
    addUser: [],
    errorMessage: {},
    hostelList: [],
    roomCount: [],
    billPaymentHistory: [],
    number_of_floor: '',
    roomdetails: [],
    message: {},
    roomFullCheck: [],
    beddetails: [],
    UserListStatusCode: 0,
    bedCount: [],
    createFloorMessage: '',
    statusCodeForAddUser: '',
    errormessage: {},
    CheckOut: [],
    checkOutStatusCode:0,
    hosteListStatusCode:0,
}

const UserListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: '',
            };
        case 'BED_COUNTING_LIST':
            return { ...state, bedCount: action.payload }
        case 'BED_DETAILS':
            return { ...state, beddetails: action.payload }
        case 'SET_ERROR':
            return { ...state, errormessage: action.payload }
        case 'ROOM_DETAILS':
            return { ...state, roomdetails: action.payload }
        case 'CREATE_FLOOR':
            return {
                ...state,
                createFloorMessage: action.payload.message,
                number_of_floor: action.payload.number_of_floors
            }
        case 'UPDATE_MESSAGE_FLOOR':
            return { ...state, createFloorMessage: action.message }
        case 'BILL_PAYMENT_HISTORY':
            return { ...state, billPaymentHistory: action.payload }
        case 'USER_LIST':
            return { ...state, Users: action.payload.response, UserListStatusCode: action.payload.statusCode }
        case 'REMOVE_STATUS_CODE_USER':
            return { ...state, UserListStatusCode: 0 }
        case 'ADD_USER':
            return { ...state, addUser: action.payload.response, statusCodeForAddUser: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeForAddUser: '' }
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'HOSTEL_LIST':
            return { ...state, hostelList: action.payload.response, hosteListStatusCode:action.payload.statusCode }
       case 'CLEAR_HOSTELLIST_STATUS_CODE':
        return {...state, hosteListStatusCode:0}
       
            case 'HOSTEL_DETAIL_LIST':
            return { ...state, hosteldetailslist: action.payload }
        case 'CHECKOUT_USER':
            return { ...state, CheckOut: action.payload.response, checkOutStatusCode:action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_CHECK_OUT':
        return { ...state,  checkOutStatusCode:0}
           
            case 'ROOM_FULL':
            if (state.roomFullCheck?.length > 0 && action.payload.length > 0) {
                return { ...state, roomFullCheck: [...state.roomFullCheck, action.payload] };
            } else {
                return { ...state, roomFullCheck: action.payload };
            }
    }
    return state;
}
export default UserListReducer;