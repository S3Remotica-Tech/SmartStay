const initialState = {
    Users: [],
    addUser: [],
    errorMessage: {},
    hostelList: [],
    roomCount: [],
    billPaymentHistory: [],
    number_of_floor: '',
    roomdetails: []
}

const UserListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: '',
            };
        case 'ROOM_DETAILS':
            return { ...state, roomdetails: action.payload }
        case 'CREATE_FLOOR':
            return { ...state, number_of_floor: action.payload.number_of_floors }
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
        case 'ROOM_COUNT':
            if (state.roomCount.length > 0) {
                if (action.payload.length > 0) {
                    let tempArray = state.roomCount.filter((item) => {
                        return item[0]?.Floor_Id === action.payload[0].Floor_Id
                    })

                    if (tempArray.length > 0) {
                        return { ...state }
                    }

                }
            }

            return { ...state, roomCount: [...state.roomCount, action.payload] }
    }
    return state;
}
export default UserListReducer;