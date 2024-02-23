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

    bedCount: [],
    createFloorMessage: '',

    errormessage:{}
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
            return { ...state, 
                createFloorMessage: action.payload.message, 
                number_of_floor: action.payload.number_of_floors }
        case 'UPDATE_MESSAGE_FLOOR':
            return { ...state, createFloorMessage: action.message }
        case 'BILL_PAYMENT_HISTORY':
            return { ...state, billPaymentHistory: action.payload }
        case 'USER_LIST':
            return { ...state, Users: action.payload }
        case 'ADD_USER':
            return { ...state, addUser: action.payload }
        case 'ERROR':
            return { ...state, errorMessage: action.payload }
        case 'HOSTEL_LIST':
            return { ...state, hostelList: action.payload }
        case 'HOSTEL_DETAIL_LIST':
            return { ...state, hosteldetailslist: action.payload }
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